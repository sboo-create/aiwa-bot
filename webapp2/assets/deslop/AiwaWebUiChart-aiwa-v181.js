import { r as p, a as ay, b as CO, c as sl, g as $O, R as IO, j as B, t as jO } from "./deslop-main-aiwa-v181.js?v=r29";
function oy(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (t = 0; t < i; t++) e[t] && (r = oy(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function ee() {
  for (var e, t, r = 0, n = "", i = arguments.length; r < i; r++) (e = arguments[r]) && (t = oy(e)) && (n && (n += " "), n += t);
  return n;
}
var MO = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"];
function ec(e) {
  if (typeof e != "string")
    return !1;
  var t = MO;
  return t.includes(e);
}
var DO = [
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
], TO = new Set(DO);
function ly(e) {
  return typeof e != "string" ? !1 : TO.has(e);
}
function uy(e) {
  return typeof e == "string" && e.startsWith("data-");
}
function St(e) {
  if (typeof e != "object" || e === null)
    return {};
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (ly(r) || uy(r)) && (t[r] = e[r]);
  return t;
}
function tc(e) {
  if (e == null)
    return null;
  if (/* @__PURE__ */ p.isValidElement(e) && typeof e.props == "object" && e.props !== null) {
    var t = e.props;
    return St(t);
  }
  return typeof e == "object" && !Array.isArray(e) ? St(e) : null;
}
function _t(e) {
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (ly(r) || uy(r) || ec(r)) && (t[r] = e[r]);
  return t;
}
function NO(e) {
  return e == null ? null : /* @__PURE__ */ p.isValidElement(e) ? _t(e.props) : typeof e == "object" && !Array.isArray(e) ? _t(e) : null;
}
var LO = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function Uu() {
  return Uu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Uu.apply(null, arguments);
}
function RO(e, t) {
  if (e == null) return {};
  var r, n, i = zO(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function zO(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var sy = /* @__PURE__ */ p.forwardRef((e, t) => {
  var {
    children: r,
    width: n,
    height: i,
    viewBox: a,
    className: o,
    style: l,
    title: u,
    desc: s
  } = e, c = RO(e, LO), f = a || {
    width: n,
    height: i,
    x: 0,
    y: 0
  }, d = ee("recharts-surface", o);
  return /* @__PURE__ */ p.createElement("svg", Uu({}, _t(c), {
    className: d,
    width: n,
    height: i,
    style: l,
    viewBox: "".concat(f.x, " ").concat(f.y, " ").concat(f.width, " ").concat(f.height),
    ref: t
  }), /* @__PURE__ */ p.createElement("title", null, u), /* @__PURE__ */ p.createElement("desc", null, s), r);
}), BO = ["children", "className"];
function Hu() {
  return Hu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Hu.apply(null, arguments);
}
function FO(e, t) {
  if (e == null) return {};
  var r, n, i = WO(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function WO(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var Et = /* @__PURE__ */ p.forwardRef((e, t) => {
  var {
    children: r,
    className: n
  } = e, i = FO(e, BO), a = ee("recharts-layer", n);
  return /* @__PURE__ */ p.createElement("g", Hu({
    className: a
  }, _t(i), {
    ref: t
  }), r);
}), KO = /* @__PURE__ */ p.createContext(null);
function le(e) {
  return function() {
    return e;
  };
}
const cy = Math.cos, eo = Math.sin, kt = Math.sqrt, to = Math.PI, cl = 2 * to, Gu = Math.PI, qu = 2 * Gu, Yr = 1e-6, UO = qu - Yr;
function fy(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t)
    this._ += arguments[t] + e[t];
}
function HO(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return fy;
  const r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let i = 1, a = n.length; i < a; ++i)
      this._ += Math.round(arguments[i] * r) / r + n[i];
  };
}
class GO {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? fy : HO(t);
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
    else if (d > Yr) if (!(Math.abs(f * u - s * c) > Yr) || !a)
      this._append`L${this._x1 = t},${this._y1 = r}`;
    else {
      let v = n - o, h = i - l, y = u * u + s * s, m = v * v + h * h, g = Math.sqrt(y), x = Math.sqrt(d), b = a * Math.tan((Gu - Math.acos((y + d - m) / (2 * g * x))) / 2), w = b / x, P = b / g;
      Math.abs(w - 1) > Yr && this._append`L${t + w * c},${r + w * f}`, this._append`A${a},${a},0,0,${+(f * v > c * h)},${this._x1 = t + P * u},${this._y1 = r + P * s}`;
    }
  }
  arc(t, r, n, i, a, o) {
    if (t = +t, r = +r, n = +n, o = !!o, n < 0) throw new Error(`negative radius: ${n}`);
    let l = n * Math.cos(i), u = n * Math.sin(i), s = t + l, c = r + u, f = 1 ^ o, d = o ? i - a : a - i;
    this._x1 === null ? this._append`M${s},${c}` : (Math.abs(this._x1 - s) > Yr || Math.abs(this._y1 - c) > Yr) && this._append`L${s},${c}`, n && (d < 0 && (d = d % qu + qu), d > UO ? this._append`A${n},${n},0,1,${f},${t - l},${r - u}A${n},${n},0,1,${f},${this._x1 = s},${this._y1 = c}` : d > Yr && this._append`A${n},${n},0,${+(d >= Gu)},${f},${this._x1 = t + n * Math.cos(a)},${this._y1 = r + n * Math.sin(a)}`);
  }
  rect(t, r, n, i) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}h${n = +n}v${+i}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function rc(e) {
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
  }, () => new GO(t);
}
function nc(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function dy(e) {
  this._context = e;
}
dy.prototype = {
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
function Xn(e) {
  return new dy(e);
}
function vy(e) {
  return e[0];
}
function py(e) {
  return e[1];
}
function ic(e, t) {
  var r = le(!0), n = null, i = Xn, a = null, o = rc(l);
  e = typeof e == "function" ? e : e === void 0 ? vy : le(e), t = typeof t == "function" ? t : t === void 0 ? py : le(t);
  function l(u) {
    var s, c = (u = nc(u)).length, f, d = !1, v;
    for (n == null && (a = i(v = o())), s = 0; s <= c; ++s)
      !(s < c && r(f = u[s], s, u)) === d && ((d = !d) ? a.lineStart() : a.lineEnd()), d && a.point(+e(f, s, u), +t(f, s, u));
    if (v) return a = null, v + "" || null;
  }
  return l.x = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : le(+u), l) : e;
  }, l.y = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : le(+u), l) : t;
  }, l.defined = function(u) {
    return arguments.length ? (r = typeof u == "function" ? u : le(!!u), l) : r;
  }, l.curve = function(u) {
    return arguments.length ? (i = u, n != null && (a = i(n)), l) : i;
  }, l.context = function(u) {
    return arguments.length ? (u == null ? n = a = null : a = i(n = u), l) : n;
  }, l;
}
function _r(e, t, r) {
  var n = null, i = le(!0), a = null, o = Xn, l = null, u = rc(s);
  e = typeof e == "function" ? e : e === void 0 ? vy : le(+e), t = typeof t == "function" ? t : le(t === void 0 ? 0 : +t), r = typeof r == "function" ? r : r === void 0 ? py : le(+r);
  function s(f) {
    var d, v, h, y = (f = nc(f)).length, m, g = !1, x, b = new Array(y), w = new Array(y);
    for (a == null && (l = o(x = u())), d = 0; d <= y; ++d) {
      if (!(d < y && i(m = f[d], d, f)) === g)
        if (g = !g)
          v = d, l.areaStart(), l.lineStart();
        else {
          for (l.lineEnd(), l.lineStart(), h = d - 1; h >= v; --h)
            l.point(b[h], w[h]);
          l.lineEnd(), l.areaEnd();
        }
      g && (b[d] = +e(m, d, f), w[d] = +t(m, d, f), l.point(n ? +n(m, d, f) : b[d], r ? +r(m, d, f) : w[d]));
    }
    if (x) return l = null, x + "" || null;
  }
  function c() {
    return ic().defined(i).curve(o).context(a);
  }
  return s.x = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : le(+f), n = null, s) : e;
  }, s.x0 = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : le(+f), s) : e;
  }, s.x1 = function(f) {
    return arguments.length ? (n = f == null ? null : typeof f == "function" ? f : le(+f), s) : n;
  }, s.y = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : le(+f), r = null, s) : t;
  }, s.y0 = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : le(+f), s) : t;
  }, s.y1 = function(f) {
    return arguments.length ? (r = f == null ? null : typeof f == "function" ? f : le(+f), s) : r;
  }, s.lineX0 = s.lineY0 = function() {
    return c().x(e).y(t);
  }, s.lineY1 = function() {
    return c().x(e).y(r);
  }, s.lineX1 = function() {
    return c().x(n).y(t);
  }, s.defined = function(f) {
    return arguments.length ? (i = typeof f == "function" ? f : le(!!f), s) : i;
  }, s.curve = function(f) {
    return arguments.length ? (o = f, a != null && (l = o(a)), s) : o;
  }, s.context = function(f) {
    return arguments.length ? (f == null ? a = l = null : l = o(a = f), s) : a;
  }, s;
}
class hy {
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
function my(e) {
  return new hy(e, !0);
}
function yy(e) {
  return new hy(e, !1);
}
const ac = {
  draw(e, t) {
    const r = kt(t / to);
    e.moveTo(r, 0), e.arc(0, 0, r, 0, cl);
  }
}, qO = {
  draw(e, t) {
    const r = kt(t / 5) / 2;
    e.moveTo(-3 * r, -r), e.lineTo(-r, -r), e.lineTo(-r, -3 * r), e.lineTo(r, -3 * r), e.lineTo(r, -r), e.lineTo(3 * r, -r), e.lineTo(3 * r, r), e.lineTo(r, r), e.lineTo(r, 3 * r), e.lineTo(-r, 3 * r), e.lineTo(-r, r), e.lineTo(-3 * r, r), e.closePath();
  }
}, gy = kt(1 / 3), YO = gy * 2, VO = {
  draw(e, t) {
    const r = kt(t / YO), n = r * gy;
    e.moveTo(0, -r), e.lineTo(n, 0), e.lineTo(0, r), e.lineTo(-n, 0), e.closePath();
  }
}, XO = {
  draw(e, t) {
    const r = kt(t), n = -r / 2;
    e.rect(n, n, r, r);
  }
}, ZO = 0.8908130915292852, by = eo(to / 10) / eo(7 * to / 10), QO = eo(cl / 10) * by, JO = -cy(cl / 10) * by, eP = {
  draw(e, t) {
    const r = kt(t * ZO), n = QO * r, i = JO * r;
    e.moveTo(0, -r), e.lineTo(n, i);
    for (let a = 1; a < 5; ++a) {
      const o = cl * a / 5, l = cy(o), u = eo(o);
      e.lineTo(u * r, -l * r), e.lineTo(l * n - u * i, u * n + l * i);
    }
    e.closePath();
  }
}, cu = kt(3), tP = {
  draw(e, t) {
    const r = -kt(t / (cu * 3));
    e.moveTo(0, r * 2), e.lineTo(-cu * r, -r), e.lineTo(cu * r, -r), e.closePath();
  }
}, ct = -0.5, ft = kt(3) / 2, Yu = 1 / kt(12), rP = (Yu / 2 + 1) * 3, nP = {
  draw(e, t) {
    const r = kt(t / rP), n = r / 2, i = r * Yu, a = n, o = r * Yu + r, l = -a, u = o;
    e.moveTo(n, i), e.lineTo(a, o), e.lineTo(l, u), e.lineTo(ct * n - ft * i, ft * n + ct * i), e.lineTo(ct * a - ft * o, ft * a + ct * o), e.lineTo(ct * l - ft * u, ft * l + ct * u), e.lineTo(ct * n + ft * i, ct * i - ft * n), e.lineTo(ct * a + ft * o, ct * o - ft * a), e.lineTo(ct * l + ft * u, ct * u - ft * l), e.closePath();
  }
};
function iP(e, t) {
  let r = null, n = rc(i);
  e = typeof e == "function" ? e : le(e || ac), t = typeof t == "function" ? t : le(t === void 0 ? 64 : +t);
  function i() {
    let a;
    if (r || (r = a = n()), e.apply(this, arguments).draw(r, +t.apply(this, arguments)), a) return r = null, a + "" || null;
  }
  return i.type = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : le(a), i) : e;
  }, i.size = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : le(+a), i) : t;
  }, i.context = function(a) {
    return arguments.length ? (r = a ?? null, i) : r;
  }, i;
}
function ro() {
}
function no(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6
  );
}
function xy(e) {
  this._context = e;
}
xy.prototype = {
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
        no(this, this._x1, this._y1);
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
        no(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function wy(e) {
  return new xy(e);
}
function Oy(e) {
  this._context = e;
}
Oy.prototype = {
  areaStart: ro,
  areaEnd: ro,
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
        no(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function Py(e) {
  return new Oy(e);
}
function Ay(e) {
  this._context = e;
}
Ay.prototype = {
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
        no(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function Sy(e) {
  return new Ay(e);
}
function _y(e) {
  this._context = e;
}
_y.prototype = {
  areaStart: ro,
  areaEnd: ro,
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
function Ey(e) {
  return new _y(e);
}
function cd(e) {
  return e < 0 ? -1 : 1;
}
function fd(e, t, r) {
  var n = e._x1 - e._x0, i = t - e._x1, a = (e._y1 - e._y0) / (n || i < 0 && -0), o = (r - e._y1) / (i || n < 0 && -0), l = (a * i + o * n) / (n + i);
  return (cd(a) + cd(o)) * Math.min(Math.abs(a), Math.abs(o), 0.5 * Math.abs(l)) || 0;
}
function dd(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t;
}
function fu(e, t, r) {
  var n = e._x0, i = e._y0, a = e._x1, o = e._y1, l = (a - n) / 3;
  e._context.bezierCurveTo(n + l, i + l * t, a - l, o - l * r, a, o);
}
function io(e) {
  this._context = e;
}
io.prototype = {
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
        fu(this, this._t0, dd(this, this._t0));
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
          this._point = 3, fu(this, dd(this, r = fd(this, e, t)), r);
          break;
        default:
          fu(this, this._t0, r = fd(this, e, t));
          break;
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r;
    }
  }
};
function ky(e) {
  this._context = new Cy(e);
}
(ky.prototype = Object.create(io.prototype)).point = function(e, t) {
  io.prototype.point.call(this, t, e);
};
function Cy(e) {
  this._context = e;
}
Cy.prototype = {
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
function $y(e) {
  return new io(e);
}
function Iy(e) {
  return new ky(e);
}
function jy(e) {
  this._context = e;
}
jy.prototype = {
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
        for (var n = vd(e), i = vd(t), a = 0, o = 1; o < r; ++a, ++o)
          this._context.bezierCurveTo(n[0][a], i[0][a], n[1][a], i[1][a], e[o], t[o]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
function vd(e) {
  var t, r = e.length - 1, n, i = new Array(r), a = new Array(r), o = new Array(r);
  for (i[0] = 0, a[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t) i[t] = 1, a[t] = 4, o[t] = 4 * e[t] + 2 * e[t + 1];
  for (i[r - 1] = 2, a[r - 1] = 7, o[r - 1] = 8 * e[r - 1] + e[r], t = 1; t < r; ++t) n = i[t] / a[t - 1], a[t] -= n, o[t] -= n * o[t - 1];
  for (i[r - 1] = o[r - 1] / a[r - 1], t = r - 2; t >= 0; --t) i[t] = (o[t] - i[t + 1]) / a[t];
  for (a[r - 1] = (e[r] + i[r - 1]) / 2, t = 0; t < r - 1; ++t) a[t] = 2 * e[t + 1] - i[t + 1];
  return [i, a];
}
function My(e) {
  return new jy(e);
}
function fl(e, t) {
  this._context = e, this._t = t;
}
fl.prototype = {
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
function Dy(e) {
  return new fl(e, 0.5);
}
function Ty(e) {
  return new fl(e, 0);
}
function Ny(e) {
  return new fl(e, 1);
}
function ar(e, t) {
  if ((o = e.length) > 1)
    for (var r = 1, n, i, a = e[t[0]], o, l = a.length; r < o; ++r)
      for (i = a, a = e[t[r]], n = 0; n < l; ++n)
        a[n][1] += a[n][0] = isNaN(i[n][1]) ? i[n][0] : i[n][1];
}
function ao(e) {
  for (var t = e.length, r = new Array(t); --t >= 0; ) r[t] = t;
  return r;
}
function aP(e, t) {
  return e[t];
}
function oP(e) {
  const t = [];
  return t.key = e, t;
}
function Ly() {
  var e = le([]), t = ao, r = ar, n = aP;
  function i(a) {
    var o = Array.from(e.apply(this, arguments), oP), l, u = o.length, s = -1, c;
    for (const f of a)
      for (l = 0, ++s; l < u; ++l)
        (o[l][s] = [0, +n(f, o[l].key, s, a)]).data = f;
    for (l = 0, c = nc(t(o)); l < u; ++l)
      o[c[l]].index = l;
    return r(o, c), o;
  }
  return i.keys = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : le(Array.from(a)), i) : e;
  }, i.value = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : le(+a), i) : n;
  }, i.order = function(a) {
    return arguments.length ? (t = a == null ? ao : typeof a == "function" ? a : le(Array.from(a)), i) : t;
  }, i.offset = function(a) {
    return arguments.length ? (r = a ?? ar, i) : r;
  }, i;
}
function Ry(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, i = 0, a = e[0].length, o; i < a; ++i) {
      for (o = r = 0; r < n; ++r) o += e[r][i][1] || 0;
      if (o) for (r = 0; r < n; ++r) e[r][i][1] /= o;
    }
    ar(e, t);
  }
}
function zy(e, t) {
  if ((i = e.length) > 0) {
    for (var r = 0, n = e[t[0]], i, a = n.length; r < a; ++r) {
      for (var o = 0, l = 0; o < i; ++o) l += e[o][r][1] || 0;
      n[r][1] += n[r][0] = -l / 2;
    }
    ar(e, t);
  }
}
function By(e, t) {
  if (!(!((o = e.length) > 0) || !((a = (i = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, i, a, o; n < a; ++n) {
      for (var l = 0, u = 0, s = 0; l < o; ++l) {
        for (var c = e[t[l]], f = c[n][1] || 0, d = c[n - 1][1] || 0, v = (f - d) / 2, h = 0; h < l; ++h) {
          var y = e[t[h]], m = y[n][1] || 0, g = y[n - 1][1] || 0;
          v += m - g;
        }
        u += f, s += v * f;
      }
      i[n - 1][1] += i[n - 1][0] = r, u && (r -= s / u);
    }
    i[n - 1][1] += i[n - 1][0] = r, ar(e, t);
  }
}
function Vu(e) {
  return e === "__proto__";
}
function Fy(e) {
  switch (typeof e) {
    case "number":
    case "symbol":
      return !1;
    case "string":
      return e.includes(".") || e.includes("[") || e.includes("]");
  }
}
function oc(e) {
  return typeof e == "string" || typeof e == "symbol" ? e : Object.is(e?.valueOf?.(), -0) ? "-0" : String(e);
}
function Wy(e) {
  if (e == null) return "";
  if (typeof e == "string") return e;
  if (Array.isArray(e)) return e.map(Wy).join(",");
  const t = String(e);
  return t === "0" && Object.is(Number(e), -0) ? "-0" : t;
}
function lc(e) {
  if (Array.isArray(e)) return e.map(oc);
  if (typeof e == "symbol") return [e];
  e = Wy(e);
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
function dr(e, t, r) {
  if (e == null) return r;
  switch (typeof t) {
    case "string": {
      if (Vu(t)) return r;
      const n = e[t];
      return n === void 0 ? Fy(t) && !Object.hasOwn(e, t) ? dr(e, lc(t), r) : r : n;
    }
    case "number":
    case "symbol": {
      typeof t == "number" && (t = oc(t));
      const n = e[t];
      return n === void 0 ? r : n;
    }
    default: {
      if (Array.isArray(t)) return lP(e, t, r);
      if (Object.is(t?.valueOf(), -0) ? t = "-0" : t = String(t), Vu(t)) return r;
      const n = e[t];
      return n === void 0 ? r : n;
    }
  }
}
function lP(e, t, r) {
  if (t.length === 0) return r;
  let n = e;
  for (let i = 0; i < t.length; i++) {
    if (n == null || Vu(t[i])) return r;
    n = n[t[i]];
  }
  return n === void 0 ? r : n;
}
var uP = 4;
function Er(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : uP, r = 10 ** t, n = Math.round(e * r) / r;
  return Object.is(n, -0) ? 0 : n;
}
function It(e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  return e.reduce((i, a, o) => {
    var l = r[o - 1];
    return typeof l == "string" ? i + l + a : l !== void 0 ? i + Er(l) + a : i + a;
  }, "");
}
var zt = (e) => e === 0 ? 0 : e > 0 ? 1 : -1, Yt = (e) => typeof e == "number" && e != +e, Xu = (e) => typeof e == "string" && e.indexOf("%") === e.length - 1, U = (e) => (typeof e == "number" || e instanceof Number) && !Yt(e), Bt = (e) => U(e) || typeof e == "string", sP = 0, Ci = (e) => {
  var t = ++sP;
  return "".concat(e || "").concat(t);
}, sn = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (!U(t) && typeof t != "string")
    return n;
  var a;
  if (Xu(t)) {
    if (r == null)
      return n;
    var o = t.indexOf("%");
    a = r * parseFloat(t.slice(0, o)) / 100;
  } else
    a = +t;
  return Yt(a) && (a = n), i && r != null && a > r && (a = r), a;
}, Ky = (e) => {
  if (!Array.isArray(e))
    return !1;
  for (var t = e.length, r = {}, n = 0; n < t; n++)
    if (!r[String(e[n])])
      r[String(e[n])] = !0;
    else
      return !0;
  return !1;
};
function Rt(e, t, r) {
  return U(e) && U(t) ? Er(e + r * (t - e)) : t;
}
function Uy(e, t, r) {
  if (!(!e || !e.length))
    return e.find((n) => n && (typeof t == "function" ? t(n) : dr(n, t)) === r);
}
var Ge = (e) => e === null || typeof e > "u", uc = (e) => Ge(e) ? e : "".concat(e.charAt(0).toUpperCase()).concat(e.slice(1));
function Je(e) {
  return e != null;
}
function Zn() {
}
var sc = (e, t) => {
  if (!e || typeof e == "function" || typeof e == "boolean")
    return null;
  var r = e;
  if (/* @__PURE__ */ p.isValidElement(e) && (r = e.props), typeof r != "object" && typeof r != "function")
    return null;
  var n = {};
  return Object.keys(r).forEach((i) => {
    ec(i) && typeof r[i] == "function" && (n[i] = ((a) => r[i](r, a)));
  }), n;
}, cP = (e, t, r) => (n) => (e(t, r, n), null), fP = (e, t, r) => {
  if (e === null || typeof e != "object" && typeof e != "function")
    return null;
  var n = null;
  return Object.keys(e).forEach((i) => {
    var a = e[i];
    ec(i) && typeof a == "function" && (n || (n = {}), n[i] = cP(a, t, r));
  }), n;
};
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
function dP(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pd(Object(r), !0).forEach(function(n) {
      vP(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : pd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function vP(e, t, r) {
  return (t = pP(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function pP(e) {
  var t = hP(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function hP(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ct(e, t) {
  var r = dP({}, e), n = t, i = Object.keys(t), a = i.reduce((o, l) => (o[l] === void 0 && n[l] !== void 0 && (o[l] = n[l]), o), r);
  return a;
}
function mP(e, t) {
  const r = /* @__PURE__ */ new Map();
  for (let n = 0; n < e.length; n++) {
    const i = e[n], a = t(i, n, e);
    r.has(a) || r.set(a, i);
  }
  return Array.from(r.values());
}
function yP(e, t) {
  return function(...r) {
    return e.apply(this, r.slice(0, t));
  };
}
function Hy(e) {
  return e;
}
function gP(e) {
  return function(t) {
    return dr(t, e);
  };
}
function Zu(e) {
  return e == null || typeof e != "object" && typeof e != "function";
}
function bP(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function xP(e) {
  return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
function cc(e) {
  return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
const wP = "[object RegExp]", Gy = "[object String]", qy = "[object Number]", Yy = "[object Boolean]", Vy = "[object Arguments]", OP = "[object Symbol]", PP = "[object Date]", AP = "[object Map]", SP = "[object Set]", _P = "[object Array]", EP = "[object ArrayBuffer]", kP = "[object Object]", CP = "[object DataView]", $P = "[object Uint8Array]", IP = "[object Uint8ClampedArray]", jP = "[object Uint16Array]", MP = "[object Uint32Array]", DP = "[object Int8Array]", TP = "[object Int16Array]", NP = "[object Int32Array]", LP = "[object Float32Array]", RP = "[object Float64Array]", hd = typeof globalThis == "object" && globalThis || typeof window == "object" && window || typeof self == "object" && self || typeof global == "object" && global || /* @__PURE__ */ (function() {
  return this;
})();
function zP(e) {
  return typeof hd.Buffer < "u" && hd.Buffer.isBuffer(e);
}
function BP(e, t) {
  return Qr(e, void 0, e, /* @__PURE__ */ new Map(), t);
}
function Qr(e, t, r, n = /* @__PURE__ */ new Map(), i = void 0) {
  const a = i?.(e, t, r, n);
  if (a !== void 0) return a;
  if (Zu(e)) return e;
  if (n.has(e)) return n.get(e);
  if (Array.isArray(e)) {
    const o = new Array(e.length);
    n.set(e, o);
    for (let l = 0; l < e.length; l++) o[l] = Qr(e[l], l, r, n, i);
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
    for (const [l, u] of e) o.set(l, Qr(u, l, r, n, i));
    return o;
  }
  if (e instanceof Set) {
    const o = /* @__PURE__ */ new Set();
    n.set(e, o);
    for (const l of e) o.add(Qr(l, void 0, r, n, i));
    return o;
  }
  if (zP(e)) return e.subarray();
  if (bP(e)) {
    const o = new (Object.getPrototypeOf(e)).constructor(e.length);
    n.set(e, o);
    for (let l = 0; l < e.length; l++) o[l] = Qr(e[l], l, r, n, i);
    return o;
  }
  if (e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer) return e.slice(0);
  if (e instanceof DataView) {
    const o = new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength);
    return n.set(e, o), bt(o, e, r, n, i), o;
  }
  if (typeof File < "u" && e instanceof File) {
    const o = new File([e], e.name, { type: e.type });
    return n.set(e, o), bt(o, e, r, n, i), o;
  }
  if (typeof Blob < "u" && e instanceof Blob) {
    const o = new Blob([e], { type: e.type });
    return n.set(e, o), bt(o, e, r, n, i), o;
  }
  if (e instanceof Error) {
    const o = structuredClone(e);
    return n.set(e, o), o.message = e.message, o.name = e.name, o.stack = e.stack, o.cause = e.cause, o.constructor = e.constructor, bt(o, e, r, n, i), o;
  }
  if (e instanceof Boolean) {
    const o = new Boolean(e.valueOf());
    return n.set(e, o), bt(o, e, r, n, i), o;
  }
  if (e instanceof Number) {
    const o = new Number(e.valueOf());
    return n.set(e, o), bt(o, e, r, n, i), o;
  }
  if (e instanceof String) {
    const o = new String(e.valueOf());
    return n.set(e, o), bt(o, e, r, n, i), o;
  }
  if (typeof e == "object" && FP(e)) {
    const o = Object.create(Object.getPrototypeOf(e));
    return n.set(e, o), bt(o, e, r, n, i), o;
  }
  return e;
}
function bt(e, t, r = e, n, i) {
  const a = [...Object.keys(t), ...xP(t)];
  for (let o = 0; o < a.length; o++) {
    const l = a[o], u = Object.getOwnPropertyDescriptor(e, l);
    (u == null || u.writable) && (e[l] = Qr(t[l], l, r, n, i));
  }
}
function FP(e) {
  switch (cc(e)) {
    case Vy:
    case _P:
    case EP:
    case CP:
    case Yy:
    case PP:
    case LP:
    case RP:
    case DP:
    case TP:
    case NP:
    case AP:
    case qy:
    case kP:
    case wP:
    case SP:
    case Gy:
    case OP:
    case $P:
    case IP:
    case jP:
    case MP:
      return !0;
    default:
      return !1;
  }
}
function WP(e) {
  return Qr(e, void 0, e, /* @__PURE__ */ new Map(), void 0);
}
function Ya(e, t) {
  return e === t || Number.isNaN(e) && Number.isNaN(t);
}
function Xy(e) {
  return e !== null && (typeof e == "object" || typeof e == "function");
}
function Zy(e, t, r) {
  return typeof r != "function" ? Zy(e, t, () => {
  }) : Qu(e, t, function n(i, a, o, l, u, s) {
    const c = r(i, a, o, l, u, s);
    return c !== void 0 ? !!c : Qu(i, a, n, s, !1);
  }, /* @__PURE__ */ new Map(), !0);
}
function Qu(e, t, r, n, i = !1) {
  if (t === e) return !0;
  switch (typeof t) {
    case "object":
      return KP(e, t, r, n);
    case "function":
      return Object.keys(t).length > 0 ? Qu(e, { ...t }, r, n, i) : Ya(e, t);
    default:
      return Xy(e) && i ? typeof t == "string" ? t === "" : !0 : Ya(e, t);
  }
}
function KP(e, t, r, n) {
  if (t == null) return !0;
  if (Array.isArray(t)) return Qy(e, t, r, n);
  if (t instanceof Map) return UP(e, t, r, n);
  if (t instanceof Set) return HP(e, t, r, n);
  const i = Object.keys(t);
  if (e == null || Zu(e)) return i.length === 0;
  if (i.length === 0) return !0;
  if (n?.has(t)) return n.get(t) === e;
  n?.set(t, e);
  try {
    for (let a = 0; a < i.length; a++) {
      const o = i[a];
      if (!Zu(e) && !(o in e) || t[o] === void 0 && e[o] !== void 0 || t[o] === null && e[o] !== null || !r(e[o], t[o], o, e, t, n)) return !1;
    }
    return !0;
  } finally {
    n?.delete(t);
  }
}
function UP(e, t, r, n) {
  if (t.size === 0) return !0;
  if (!(e instanceof Map)) return !1;
  for (const [i, a] of t.entries()) if (r(e.get(i), a, i, e, t, n) === !1) return !1;
  return !0;
}
function Qy(e, t, r, n) {
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
function HP(e, t, r, n) {
  return t.size === 0 ? !0 : e instanceof Set ? Qy([...e], [...t], r, n) : !1;
}
function Jy(e, t) {
  return Zy(e, t, () => {
  });
}
function GP(e) {
  return e = WP(e), (t) => Jy(t, e);
}
function qP(e, t) {
  return BP(e, (r, n, i, a) => {
    if (typeof e == "object") {
      if (cc(e) === "[object Object]" && typeof e.constructor != "function") {
        const o = {};
        return a.set(e, o), bt(o, e, i, a), o;
      }
      switch (Object.prototype.toString.call(e)) {
        case qy:
        case Gy:
        case Yy: {
          const o = new e.constructor(e?.valueOf());
          return bt(o, e), o;
        }
        case Vy: {
          const o = {};
          return bt(o, e), o.length = e.length, o[Symbol.iterator] = e[Symbol.iterator], o;
        }
        default:
          return;
      }
    }
  });
}
function YP(e) {
  return qP(e);
}
const VP = /^(?:0|[1-9]\d*)$/;
function eg(e, t = Number.MAX_SAFE_INTEGER) {
  switch (typeof e) {
    case "number":
      return Number.isInteger(e) && e >= 0 && e < t;
    case "symbol":
      return !1;
    case "string":
      return VP.test(e);
  }
}
function XP(e) {
  return e !== null && typeof e == "object" && cc(e) === "[object Arguments]";
}
function ZP(e, t) {
  let r;
  if (Array.isArray(t) ? r = t : typeof t == "string" && Fy(t) && e?.[t] == null ? r = lc(t) : r = [t], r.length === 0) return !1;
  let n = e;
  for (let i = 0; i < r.length; i++) {
    const a = r[i];
    if ((n == null || !Object.hasOwn(n, a)) && !((Array.isArray(n) || XP(n)) && eg(a) && a < n.length))
      return !1;
    n = n[a];
  }
  return !0;
}
function QP(e, t) {
  switch (typeof e) {
    case "object":
      Object.is(e?.valueOf(), -0) && (e = "-0");
      break;
    case "number":
      e = oc(e);
      break;
  }
  return t = YP(t), function(r) {
    const n = dr(r, e);
    return n === void 0 ? ZP(r, e) : t === void 0 ? n === void 0 : Jy(n, t);
  };
}
function JP(e) {
  if (e == null) return Hy;
  switch (typeof e) {
    case "function":
      return e;
    case "object":
      return Array.isArray(e) && e.length === 2 ? QP(e[0], e[1]) : GP(e);
    case "string":
    case "symbol":
    case "number":
      return gP(e);
  }
}
function eA(e) {
  return Number.isSafeInteger(e) && e >= 0;
}
function tg(e) {
  return e != null && typeof e != "function" && eA(e.length);
}
function tA(e) {
  return typeof e == "object" && e !== null;
}
function rA(e) {
  return tA(e) && tg(e);
}
function md(e, t = Hy) {
  return rA(e) ? mP(Array.from(e), yP(JP(t), 1)) : [];
}
var du = { exports: {} }, vu = {};
var yd;
function nA() {
  if (yd) return vu;
  yd = 1;
  var e = ay(), t = CO();
  function r(s, c) {
    return s === c && (s !== 0 || 1 / s === 1 / c) || s !== s && c !== c;
  }
  var n = typeof Object.is == "function" ? Object.is : r, i = t.useSyncExternalStore, a = e.useRef, o = e.useEffect, l = e.useMemo, u = e.useDebugValue;
  return vu.useSyncExternalStoreWithSelector = function(s, c, f, d, v) {
    var h = a(null);
    if (h.current === null) {
      var y = { hasValue: !1, value: null };
      h.current = y;
    } else y = h.current;
    h = l(
      function() {
        function g(O) {
          if (!x) {
            if (x = !0, b = O, O = d(O), v !== void 0 && y.hasValue) {
              var S = y.value;
              if (v(S, O))
                return w = S;
            }
            return w = O;
          }
          if (S = w, n(b, O)) return S;
          var A = d(O);
          return v !== void 0 && v(S, A) ? (b = O, S) : (b = O, w = A);
        }
        var x = !1, b, w, P = f === void 0 ? null : f;
        return [
          function() {
            return g(c());
          },
          P === null ? void 0 : function() {
            return g(P());
          }
        ];
      },
      [c, f, d, v]
    );
    var m = i(s, h[0], h[1]);
    return o(
      function() {
        y.hasValue = !0, y.value = m;
      },
      [m]
    ), u(m), m;
  }, vu;
}
var gd;
function iA() {
  return gd || (gd = 1, du.exports = nA()), du.exports;
}
var rg = iA(), fc = /* @__PURE__ */ p.createContext(null), aA = (e) => e, me = () => {
  var e = p.useContext(fc);
  return e ? e.store.dispatch : aA;
}, Va = () => {
}, oA = () => Va, lA = (e, t) => e === t;
function G(e) {
  var t = p.useContext(fc), r = p.useMemo(() => t ? (n) => {
    if (n != null)
      return e(n);
  } : Va, [t, e]);
  return rg.useSyncExternalStoreWithSelector(t ? t.subscription.addNestedSub : oA, t ? t.store.getState : Va, t ? t.store.getState : Va, r, lA);
}
function uA(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function sA(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object")
    throw new TypeError(t);
}
function cA(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((r) => typeof r == "function")) {
    const r = e.map(
      (n) => typeof n == "function" ? `function ${n.name || "unnamed"}()` : typeof n
    ).join(", ");
    throw new TypeError(`${t}[${r}]`);
  }
}
var bd = (e) => Array.isArray(e) ? e : [e];
function fA(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return cA(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function dA(e, t) {
  const r = [], { length: n } = e;
  for (let i = 0; i < n; i++)
    r.push(e[i].apply(null, t));
  return r;
}
var vA = class {
  constructor(t) {
    this.value = t;
  }
  deref() {
    return this.value;
  }
}, pA = typeof WeakRef < "u" ? WeakRef : vA, hA = 0, xd = 1;
function _a() {
  return {
    s: hA,
    v: void 0,
    o: null,
    p: null
  };
}
function ng(e, t = {}) {
  let r = _a();
  const { resultEqualityCheck: n } = t;
  let i, a = 0;
  function o() {
    let l = r;
    const { length: u } = arguments;
    for (let f = 0, d = u; f < d; f++) {
      const v = arguments[f];
      if (typeof v == "function" || typeof v == "object" && v !== null) {
        let h = l.o;
        h === null && (l.o = h = /* @__PURE__ */ new WeakMap());
        const y = h.get(v);
        y === void 0 ? (l = _a(), h.set(v, l)) : l = y;
      } else {
        let h = l.p;
        h === null && (l.p = h = /* @__PURE__ */ new Map());
        const y = h.get(v);
        y === void 0 ? (l = _a(), h.set(v, l)) : l = y;
      }
    }
    const s = l;
    let c;
    if (l.s === xd)
      c = l.v;
    else if (c = e.apply(null, arguments), a++, n) {
      const f = i?.deref?.() ?? i;
      f != null && n(f, c) && (c = f, a !== 0 && a--), i = typeof c == "object" && c !== null || typeof c == "function" ? new pA(c) : c;
    }
    return s.s = xd, s.v = c, c;
  }
  return o.clearCache = () => {
    r = _a(), o.resetResultsCount();
  }, o.resultsCount = () => a, o.resetResultsCount = () => {
    a = 0;
  }, o;
}
function mA(e, ...t) {
  const r = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, n = (...i) => {
    let a = 0, o = 0, l, u = {}, s = i.pop();
    typeof s == "object" && (u = s, s = i.pop()), uA(
      s,
      `createSelector expects an output function after the inputs, but received: [${typeof s}]`
    );
    const c = {
      ...r,
      ...u
    }, {
      memoize: f,
      memoizeOptions: d = [],
      argsMemoize: v = ng,
      argsMemoizeOptions: h = []
    } = c, y = bd(d), m = bd(h), g = fA(i), x = f(function() {
      return a++, s.apply(
        null,
        arguments
      );
    }, ...y), b = v(function() {
      o++;
      const P = dA(
        g,
        arguments
      );
      return l = x.apply(null, P), l;
    }, ...m);
    return Object.assign(b, {
      resultFunc: s,
      memoizedResultFunc: x,
      dependencies: g,
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
var _ = /* @__PURE__ */ mA(ng), yA = Object.assign(
  (e, t = _) => {
    sA(
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
  { withTypes: () => yA }
);
function gA(e, t = 1) {
  const r = [], n = Math.floor(t), i = (a, o) => {
    for (let l = 0; l < a.length; l++) {
      const u = a[l];
      Array.isArray(u) && o < n ? i(u, o + 1) : r.push(u);
    }
  };
  return i(e, 0), r;
}
function Ju(e, t, r) {
  return Xy(r) && (typeof t == "number" && tg(r) && eg(t) && t < r.length || typeof t == "string" && t in r) ? Ya(r[t], e) : !1;
}
function wd(e) {
  return typeof e == "symbol" ? 1 : e === null ? 2 : e === void 0 ? 3 : e !== e ? 4 : 0;
}
const bA = (e, t, r) => {
  if (e !== t) {
    const n = wd(e), i = wd(t);
    if (n === i && n === 0) {
      if (e < t) return r === "desc" ? 1 : -1;
      if (e > t) return r === "desc" ? -1 : 1;
    }
    return r === "desc" ? i - n : n - i;
  }
  return 0;
};
function ig(e) {
  return typeof e == "symbol" || e instanceof Symbol;
}
const xA = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, wA = /^\w*$/;
function OA(e, t) {
  return Array.isArray(e) ? !1 : typeof e == "number" || typeof e == "boolean" || e == null || ig(e) ? !0 : typeof e == "string" && (wA.test(e) || !xA.test(e)) || t != null;
}
function PA(e, t, r, n) {
  if (e == null) return [];
  r = r, Array.isArray(e) || (e = Object.values(e)), Array.isArray(t) || (t = t == null ? [null] : [t]), t.length === 0 && (t = [null]), Array.isArray(r) || (r = r == null ? [] : [r]), r = r.map((l) => String(l));
  const i = (l, u) => {
    let s = l;
    for (let c = 0; c < u.length && s != null; ++c) s = s[u[c]];
    return s;
  }, a = (l, u) => u == null || l == null ? u : typeof l == "object" && "key" in l ? Object.hasOwn(u, l.key) ? u[l.key] : i(u, l.path) : typeof l == "function" ? l(u) : Array.isArray(l) ? i(u, l) : typeof u == "object" ? u[l] : u, o = t.map((l) => (Array.isArray(l) && l.length === 1 && (l = l[0]), l == null || typeof l == "function" || Array.isArray(l) || OA(l) ? l : {
    key: l,
    path: lc(l)
  }));
  return e.map((l) => ({
    original: l,
    criteria: o.map((u) => a(u, l))
  })).slice().sort((l, u) => {
    for (let s = 0; s < o.length; s++) {
      const c = bA(l.criteria[s], u.criteria[s], r[s]);
      if (c !== 0) return c;
    }
    return 0;
  }).map((l) => l.original);
}
function gn(e, ...t) {
  const r = t.length;
  return r > 1 && Ju(e, t[0], t[1]) ? t = [] : r > 2 && Ju(t[0], t[1], t[2]) && (t = [t[0]]), PA(e, gA(t), ["asc"]);
}
var ag = (e) => e.legend.settings, AA = (e) => e.legend.size, SA = (e) => e.legend.payload;
_([SA, ag], (e, t) => {
  var {
    itemSorter: r
  } = t, n = e.flat(1);
  return r ? gn(n, r) : n;
});
function Le(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var _A = typeof Symbol == "function" && Symbol.observable || "@@observable", Od = _A, pu = () => Math.random().toString(36).substring(7).split("").join("."), EA = {
  INIT: `@@redux/INIT${/* @__PURE__ */ pu()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ pu()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${pu()}`
}, oo = EA;
function dc(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function og(e, t, r) {
  if (typeof e != "function")
    throw new Error(Le(2));
  if (typeof t == "function" && typeof r == "function" || typeof r == "function" && typeof arguments[3] == "function")
    throw new Error(Le(0));
  if (typeof t == "function" && typeof r > "u" && (r = t, t = void 0), typeof r < "u") {
    if (typeof r != "function")
      throw new Error(Le(1));
    return r(og)(e, t);
  }
  let n = e, i = t, a = /* @__PURE__ */ new Map(), o = a, l = 0, u = !1;
  function s() {
    o === a && (o = /* @__PURE__ */ new Map(), a.forEach((m, g) => {
      o.set(g, m);
    }));
  }
  function c() {
    if (u)
      throw new Error(Le(3));
    return i;
  }
  function f(m) {
    if (typeof m != "function")
      throw new Error(Le(4));
    if (u)
      throw new Error(Le(5));
    let g = !0;
    s();
    const x = l++;
    return o.set(x, m), function() {
      if (g) {
        if (u)
          throw new Error(Le(6));
        g = !1, s(), o.delete(x), a = null;
      }
    };
  }
  function d(m) {
    if (!dc(m))
      throw new Error(Le(7));
    if (typeof m.type > "u")
      throw new Error(Le(8));
    if (typeof m.type != "string")
      throw new Error(Le(17));
    if (u)
      throw new Error(Le(9));
    try {
      u = !0, i = n(i, m);
    } finally {
      u = !1;
    }
    return (a = o).forEach((x) => {
      x();
    }), m;
  }
  function v(m) {
    if (typeof m != "function")
      throw new Error(Le(10));
    n = m, d({
      type: oo.REPLACE
    });
  }
  function h() {
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
      subscribe(g) {
        if (typeof g != "object" || g === null)
          throw new Error(Le(11));
        function x() {
          const w = g;
          w.next && w.next(c());
        }
        return x(), {
          unsubscribe: m(x)
        };
      },
      [Od]() {
        return this;
      }
    };
  }
  return d({
    type: oo.INIT
  }), {
    dispatch: d,
    subscribe: f,
    getState: c,
    replaceReducer: v,
    [Od]: h
  };
}
function kA(e) {
  Object.keys(e).forEach((t) => {
    const r = e[t];
    if (typeof r(void 0, {
      type: oo.INIT
    }) > "u")
      throw new Error(Le(12));
    if (typeof r(void 0, {
      type: oo.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(Le(13));
  });
}
function lg(e) {
  const t = Object.keys(e), r = {};
  for (let a = 0; a < t.length; a++) {
    const o = t[a];
    typeof e[o] == "function" && (r[o] = e[o]);
  }
  const n = Object.keys(r);
  let i;
  try {
    kA(r);
  } catch (a) {
    i = a;
  }
  return function(o = {}, l) {
    if (i)
      throw i;
    let u = !1;
    const s = {};
    for (let c = 0; c < n.length; c++) {
      const f = n[c], d = r[f], v = o[f], h = d(v, l);
      if (typeof h > "u")
        throw l && l.type, new Error(Le(14));
      s[f] = h, u = u || h !== v;
    }
    return u = u || n.length !== Object.keys(o).length, u ? s : o;
  };
}
function lo(...e) {
  return e.length === 0 ? (t) => t : e.length === 1 ? e[0] : e.reduce((t, r) => (...n) => t(r(...n)));
}
function CA(...e) {
  return (t) => (r, n) => {
    const i = t(r, n);
    let a = () => {
      throw new Error(Le(15));
    };
    const o = {
      getState: i.getState,
      dispatch: (u, ...s) => a(u, ...s)
    }, l = e.map((u) => u(o));
    return a = lo(...l)(i.dispatch), {
      ...i,
      dispatch: a
    };
  };
}
function ug(e) {
  return dc(e) && "type" in e && typeof e.type == "string";
}
var sg = Symbol.for("immer-nothing"), Pd = Symbol.for("immer-draftable"), qe = Symbol.for("immer-state");
function xt(e, ...t) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var it = Object, Rn = it.getPrototypeOf, uo = "constructor", dl = "prototype", es = "configurable", so = "enumerable", Xa = "writable", $i = "value", or = (e) => !!e && !!e[qe];
function ht(e) {
  return e ? cg(e) || pl(e) || !!e[Pd] || !!e[uo]?.[Pd] || hl(e) || ml(e) : !1;
}
var $A = it[dl][uo].toString(), Ad = /* @__PURE__ */ new WeakMap();
function cg(e) {
  if (!e || !vc(e))
    return !1;
  const t = Rn(e);
  if (t === null || t === it[dl])
    return !0;
  const r = it.hasOwnProperty.call(t, uo) && t[uo];
  if (r === Object)
    return !0;
  if (!Cn(r))
    return !1;
  let n = Ad.get(r);
  return n === void 0 && (n = Function.toString.call(r), Ad.set(r, n)), n === $A;
}
function vl(e, t, r = !0) {
  Vi(e) === 0 ? (r ? Reflect.ownKeys(e) : it.keys(e)).forEach((i) => {
    t(i, e[i], e);
  }) : e.forEach((n, i) => t(i, n, e));
}
function Vi(e) {
  const t = e[qe];
  return t ? t.type_ : pl(e) ? 1 : hl(e) ? 2 : ml(e) ? 3 : 0;
}
var hu = (e, t, r = Vi(e)) => r === 2 ? e.has(t) : it[dl].hasOwnProperty.call(e, t), ts = (e, t, r = Vi(e)) => (
  // @ts-ignore
  r === 2 ? e.get(t) : e[t]
), co = (e, t, r, n = Vi(e)) => {
  n === 2 ? e.set(t, r) : n === 3 ? e.add(r) : e[t] = r;
};
function IA(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
var pl = Array.isArray, hl = (e) => e instanceof Map, ml = (e) => e instanceof Set, vc = (e) => typeof e == "object", Cn = (e) => typeof e == "function", mu = (e) => typeof e == "boolean";
function jA(e) {
  const t = +e;
  return Number.isInteger(t) && String(t) === e;
}
var Qt = (e) => e.copy_ || e.base_, pc = (e) => e.modified_ ? e.copy_ : e.base_;
function rs(e, t) {
  if (hl(e))
    return new Map(e);
  if (ml(e))
    return new Set(e);
  if (pl(e))
    return Array[dl].slice.call(e);
  const r = cg(e);
  if (t === !0 || t === "class_only" && !r) {
    const n = it.getOwnPropertyDescriptors(e);
    delete n[qe];
    let i = Reflect.ownKeys(n);
    for (let a = 0; a < i.length; a++) {
      const o = i[a], l = n[o];
      l[Xa] === !1 && (l[Xa] = !0, l[es] = !0), (l.get || l.set) && (n[o] = {
        [es]: !0,
        [Xa]: !0,
        // could live with !!desc.set as well here...
        [so]: l[so],
        [$i]: e[o]
      });
    }
    return it.create(Rn(e), n);
  } else {
    const n = Rn(e);
    if (n !== null && r)
      return { ...e };
    const i = it.create(n);
    return it.assign(i, e);
  }
}
function hc(e, t = !1) {
  return yl(e) || or(e) || !ht(e) || (Vi(e) > 1 && it.defineProperties(e, {
    set: Ea,
    add: Ea,
    clear: Ea,
    delete: Ea
  }), it.freeze(e), t && vl(
    e,
    (r, n) => {
      hc(n, !0);
    },
    !1
  )), e;
}
function MA() {
  xt(2);
}
var Ea = {
  [$i]: MA
};
function yl(e) {
  return e === null || !vc(e) ? !0 : it.isFrozen(e);
}
var fo = "MapSet", ns = "Patches", Sd = "ArrayMethods", fg = {};
function cn(e) {
  const t = fg[e];
  return t || xt(0, e), t;
}
var _d = (e) => !!fg[e], Ii, dg = () => Ii, DA = (e, t) => ({
  drafts_: [],
  parent_: e,
  immer_: t,
  // Whenever the modified draft contains a draft from another scope, we
  // need to prevent auto-freezing so the unowned draft can be finalized.
  canAutoFreeze_: !0,
  unfinalizedDrafts_: 0,
  handledSet_: /* @__PURE__ */ new Set(),
  processedForPatches_: /* @__PURE__ */ new Set(),
  mapSetPlugin_: _d(fo) ? cn(fo) : void 0,
  arrayMethodsPlugin_: _d(Sd) ? cn(Sd) : void 0
});
function Ed(e, t) {
  t && (e.patchPlugin_ = cn(ns), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function is(e) {
  as(e), e.drafts_.forEach(TA), e.drafts_ = null;
}
function as(e) {
  e === Ii && (Ii = e.parent_);
}
var kd = (e) => Ii = DA(Ii, e);
function TA(e) {
  const t = e[qe];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function Cd(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  if (e !== void 0 && e !== r) {
    r[qe].modified_ && (is(t), xt(4)), ht(e) && (e = $d(t, e));
    const { patchPlugin_: i } = t;
    i && i.generateReplacementPatches_(
      r[qe].base_,
      e,
      t
    );
  } else
    e = $d(t, r);
  return NA(t, e, !0), is(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== sg ? e : void 0;
}
function $d(e, t) {
  if (yl(t))
    return t;
  const r = t[qe];
  if (!r)
    return vo(t, e.handledSet_, e);
  if (!gl(r, e))
    return t;
  if (!r.modified_)
    return r.base_;
  if (!r.finalized_) {
    const { callbacks_: n } = r;
    if (n)
      for (; n.length > 0; )
        n.pop()(e);
    hg(r, e);
  }
  return r.copy_;
}
function NA(e, t, r = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && hc(t, r);
}
function vg(e) {
  e.finalized_ = !0, e.scope_.unfinalizedDrafts_--;
}
var gl = (e, t) => e.scope_ === t, LA = [];
function pg(e, t, r, n) {
  const i = Qt(e), a = e.type_;
  if (n !== void 0 && ts(i, n, a) === t) {
    co(i, n, r, a);
    return;
  }
  if (!e.draftLocations_) {
    const l = e.draftLocations_ = /* @__PURE__ */ new Map();
    vl(i, (u, s) => {
      if (or(s)) {
        const c = l.get(s) || [];
        c.push(u), l.set(s, c);
      }
    });
  }
  const o = e.draftLocations_.get(t) ?? LA;
  for (const l of o)
    co(i, l, r, a);
}
function RA(e, t, r) {
  e.callbacks_.push(function(i) {
    const a = t;
    if (!a || !gl(a, i))
      return;
    i.mapSetPlugin_?.fixSetContents(a);
    const o = pc(a);
    pg(e, a.draft_ ?? a, o, r), hg(a, i);
  });
}
function hg(e, t) {
  if (e.modified_ && !e.finalized_ && (e.type_ === 3 || e.type_ === 1 && e.allIndicesReassigned_ || (e.assigned_?.size ?? 0) > 0)) {
    const { patchPlugin_: n } = t;
    if (n) {
      const i = n.getPath(e);
      i && n.generatePatches_(e, i, t);
    }
    vg(e);
  }
}
function zA(e, t, r) {
  const { scope_: n } = e;
  if (or(r)) {
    const i = r[qe];
    gl(i, n) && i.callbacks_.push(function() {
      Za(e);
      const o = pc(i);
      pg(e, r, o, t);
    });
  } else ht(r) && e.callbacks_.push(function() {
    const a = Qt(e);
    e.type_ === 3 ? a.has(r) && vo(r, n.handledSet_, n) : ts(a, t, e.type_) === r && n.drafts_.length > 1 && (e.assigned_.get(t) ?? !1) === !0 && e.copy_ && vo(
      ts(e.copy_, t, e.type_),
      n.handledSet_,
      n
    );
  });
}
function vo(e, t, r) {
  return !r.immer_.autoFreeze_ && r.unfinalizedDrafts_ < 1 || or(e) || t.has(e) || !ht(e) || yl(e) || (t.add(e), vl(e, (n, i) => {
    if (or(i)) {
      const a = i[qe];
      if (gl(a, r)) {
        const o = pc(a);
        co(e, n, o, e.type_), vg(a);
      }
    } else ht(i) && vo(i, t, r);
  })), e;
}
function BA(e, t) {
  const r = pl(e), n = {
    type_: r ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : dg(),
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
  let i = n, a = po;
  r && (i = [n], a = ji);
  const { revoke: o, proxy: l } = Proxy.revocable(i, a);
  return n.draft_ = l, n.revoke_ = o, [l, n];
}
var po = {
  get(e, t) {
    if (t === qe)
      return e;
    let r = e.scope_.arrayMethodsPlugin_;
    const n = e.type_ === 1 && typeof t == "string";
    if (n && r?.isArrayOperationMethod(t))
      return r.createMethodInterceptor(e, t);
    const i = Qt(e);
    if (!hu(i, t, e.type_))
      return WA(e, i, t);
    const a = i[t];
    if (e.finalized_ || !ht(a) || n && e.operationMethod && r?.isMutatingArrayMethod(
      e.operationMethod
    ) && jA(t))
      return a;
    if (a === yu(e.base_, t) || FA(e, t, a)) {
      Za(e);
      const o = e.type_ === 1 ? +t : t, l = ls(e.scope_, a, e, o);
      return e.copy_[o] = l;
    }
    return a;
  },
  has(e, t) {
    return t in Qt(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(Qt(e));
  },
  set(e, t, r) {
    const n = mg(Qt(e), t);
    if (n?.set)
      return n.set.call(e.draft_, r), !0;
    if (!e.modified_) {
      const i = yu(Qt(e), t), a = i?.[qe];
      if (a && a.base_ === r)
        return e.copy_[t] = r, e.assigned_.set(t, !1), !0;
      if (IA(r, i) && (r !== void 0 || hu(e.base_, t, e.type_)))
        return !0;
      Za(e), os(e);
    }
    return e.copy_[t] === r && // special case: handle new props with value 'undefined'
    (r !== void 0 || hu(e.copy_, t, e.type_)) || // special case: NaN
    Number.isNaN(r) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = r, e.assigned_.set(t, !0), zA(e, t, r)), !0;
  },
  deleteProperty(e, t) {
    return Za(e), yu(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_.set(t, !1), os(e)) : e.assigned_.delete(t), e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const r = Qt(e), n = Reflect.getOwnPropertyDescriptor(r, t);
    return n && {
      [Xa]: !0,
      [es]: e.type_ !== 1 || t !== "length",
      [so]: n[so],
      [$i]: r[t]
    };
  },
  defineProperty() {
    xt(11);
  },
  getPrototypeOf(e) {
    return Rn(e.base_);
  },
  setPrototypeOf() {
    xt(12);
  }
}, ji = {};
for (let e in po) {
  let t = po[e];
  ji[e] = function() {
    const r = arguments;
    return r[0] = r[0][0], t.apply(this, r);
  };
}
ji.deleteProperty = function(e, t) {
  return ji.set.call(this, e, t, void 0);
};
ji.set = function(e, t, r) {
  return po.set.call(this, e[0], t, r, e[0]);
};
function yu(e, t) {
  const r = e[qe];
  return (r ? Qt(r) : e)[t];
}
function FA(e, t, r) {
  return e.type_ !== 1 || !e.allIndicesReassigned_ || e.assigned_?.get(t) || !ht(r) || r[qe] ? !1 : e.baseRefs_.has(r);
}
function WA(e, t, r) {
  const n = mg(t, r);
  return n ? $i in n ? n[$i] : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    n.get?.call(e.draft_)
  ) : void 0;
}
function mg(e, t) {
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
function os(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && os(e.parent_));
}
function Za(e) {
  e.copy_ || (e.assigned_ = /* @__PURE__ */ new Map(), e.copy_ = rs(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var KA = class {
  constructor(t) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.useStrictIteration_ = !1, this.produce = (r, n, i) => {
      if (Cn(r) && !Cn(n)) {
        const o = n;
        n = r;
        const l = this;
        return function(s = o, ...c) {
          return l.produce(s, (f) => n.call(this, f, ...c));
        };
      }
      Cn(n) || xt(6), i !== void 0 && !Cn(i) && xt(7);
      let a;
      if (ht(r)) {
        const o = kd(this), l = ls(o, r, void 0);
        let u = !0;
        try {
          a = n(l), u = !1;
        } finally {
          u ? is(o) : as(o);
        }
        return Ed(o, i), Cd(a, o);
      } else if (!r || !vc(r)) {
        if (a = n(r), a === void 0 && (a = r), a === sg && (a = void 0), this.autoFreeze_ && hc(a, !0), i) {
          const o = [], l = [];
          cn(ns).generateReplacementPatches_(r, a, {
            patches_: o,
            inversePatches_: l
          }), i(o, l);
        }
        return a;
      } else
        xt(1, r);
    }, this.produceWithPatches = (r, n) => {
      if (Cn(r))
        return (l, ...u) => this.produceWithPatches(l, (s) => r(s, ...u));
      let i, a;
      return [this.produce(r, n, (l, u) => {
        i = l, a = u;
      }), i, a];
    }, mu(t?.autoFreeze) && this.setAutoFreeze(t.autoFreeze), mu(t?.useStrictShallowCopy) && this.setUseStrictShallowCopy(t.useStrictShallowCopy), mu(t?.useStrictIteration) && this.setUseStrictIteration(t.useStrictIteration);
  }
  createDraft(t) {
    ht(t) || xt(8), or(t) && (t = He(t));
    const r = kd(this), n = ls(r, t, void 0);
    return n[qe].isManual_ = !0, as(r), n;
  }
  finishDraft(t, r) {
    const n = t && t[qe];
    (!n || !n.isManual_) && xt(9);
    const { scope_: i } = n;
    return Ed(i, r), Cd(void 0, i);
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
    const i = cn(ns).applyPatches_;
    return or(t) ? i(t, r) : this.produce(
      t,
      (a) => i(a, r)
    );
  }
};
function ls(e, t, r, n) {
  const [i, a] = hl(t) ? cn(fo).proxyMap_(t, r) : ml(t) ? cn(fo).proxySet_(t, r) : BA(t, r);
  return (r?.scope_ ?? dg()).drafts_.push(i), a.callbacks_ = r?.callbacks_ ?? [], a.key_ = n, r && n !== void 0 ? RA(r, a, n) : a.callbacks_.push(function(u) {
    u.mapSetPlugin_?.fixSetContents(a);
    const { patchPlugin_: s } = u;
    a.modified_ && s && s.generatePatches_(a, [], u);
  }), i;
}
function He(e) {
  return or(e) || xt(10, e), yg(e);
}
function yg(e) {
  if (!ht(e) || yl(e))
    return e;
  const t = e[qe];
  let r, n = !0;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, r = rs(e, t.scope_.immer_.useStrictShallowCopy_), n = t.scope_.immer_.shouldUseStrictIteration();
  } else
    r = rs(e, !0);
  return vl(
    r,
    (i, a) => {
      co(r, i, yg(a));
    },
    n
  ), t && (t.finalized_ = !1), r;
}
var UA = new KA(), gg = UA.produce;
function bg(e) {
  return ({ dispatch: r, getState: n }) => (i) => (a) => typeof a == "function" ? a(r, n, e) : i(a);
}
var HA = bg(), GA = bg, qA = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0)
    return typeof arguments[0] == "object" ? lo : lo.apply(null, arguments);
};
function lt(e, t) {
  function r(...n) {
    if (t) {
      let i = t(...n);
      if (!i)
        throw new Error(at(0));
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
  return r.toString = () => `${e}`, r.type = e, r.match = (n) => ug(n) && n.type === e, r;
}
var xg = class Si extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, Si.prototype);
  }
  static get [Symbol.species]() {
    return Si;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0]) ? new Si(...t[0].concat(this)) : new Si(...t.concat(this));
  }
};
function Id(e) {
  return ht(e) ? gg(e, () => {
  }) : e;
}
function ka(e, t, r) {
  return e.has(t) ? e.get(t) : e.set(t, r(t)).get(t);
}
function YA(e) {
  return typeof e == "boolean";
}
var VA = () => function(t) {
  const {
    thunk: r = !0,
    immutableCheck: n = !0,
    serializableCheck: i = !0,
    actionCreatorCheck: a = !0
  } = t ?? {};
  let o = new xg();
  return r && (YA(r) ? o.push(HA) : o.push(GA(r.extraArgument))), o;
}, wg = "RTK_autoBatch", Q = () => (e) => ({
  payload: e,
  meta: {
    [wg]: !0
  }
}), jd = (e) => (t) => {
  setTimeout(t, e);
}, XA = (e, t) => (r) => {
  let n = !1;
  const i = () => {
    n || (n = !0, cancelAnimationFrame(a), clearTimeout(o), r());
  }, a = e(i), o = setTimeout(i, t);
}, Og = (e = {
  type: "raf"
}) => (t) => (...r) => {
  const n = t(...r);
  let i = !0, a = !1, o = !1;
  const l = /* @__PURE__ */ new Set(), u = e.type === "tick" ? queueMicrotask : e.type === "raf" ? (
    // requestAnimationFrame won't exist in SSR environments. Fall back to a vague approximation just to keep from erroring.
    typeof window < "u" && window.requestAnimationFrame ? XA(window.requestAnimationFrame, 100) : jd(10)
  ) : e.type === "callback" ? e.queueNotification : jd(e.timeout), s = () => {
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
        return i = !c?.meta?.[wg], a = !i, a && (o || (o = !0, u(s))), n.dispatch(c);
      } finally {
        i = !0;
      }
    }
  });
}, ZA = (e) => function(r) {
  const {
    autoBatch: n = !0
  } = r ?? {};
  let i = new xg(e);
  return n && i.push(Og(typeof n == "object" ? n : void 0)), i;
};
function QA(e) {
  const t = VA(), {
    reducer: r = void 0,
    middleware: n,
    devTools: i = !0,
    preloadedState: a = void 0,
    enhancers: o = void 0
  } = e || {};
  let l;
  if (typeof r == "function")
    l = r;
  else if (dc(r))
    l = lg(r);
  else
    throw new Error(at(1));
  let u;
  typeof n == "function" ? u = n(t) : u = t();
  let s = lo;
  i && (s = qA({
    // Enable capture of stack traces for dispatched Redux actions
    trace: !1,
    ...typeof i == "object" && i
  }));
  const c = CA(...u), f = ZA(c);
  let d = typeof o == "function" ? o(f) : f();
  const v = s(...d);
  return og(l, a, v);
}
function Pg(e) {
  const t = {}, r = [];
  let n;
  const i = {
    addCase(a, o) {
      const l = typeof a == "string" ? a : a.type;
      if (!l)
        throw new Error(at(28));
      if (l in t)
        throw new Error(at(29));
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
function JA(e) {
  return typeof e == "function";
}
function eS(e, t) {
  let [r, n, i] = Pg(t), a;
  if (JA(e))
    a = () => Id(e());
  else {
    const l = Id(e);
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
        if (or(c)) {
          const v = f(c, u);
          return v === void 0 ? c : v;
        } else {
          if (ht(c))
            return gg(c, (d) => f(d, u));
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
var tS = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", rS = (e = 21) => {
  let t = "", r = e;
  for (; r--; )
    t += tS[Math.random() * 64 | 0];
  return t;
}, nS = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function iS(e, t) {
  return `${e}/${t}`;
}
function aS({
  creators: e
} = {}) {
  const t = e?.asyncThunk?.[nS];
  return function(n) {
    const {
      name: i,
      reducerPath: a = i
    } = n;
    if (!i)
      throw new Error(at(11));
    const o = (typeof n.reducers == "function" ? n.reducers(lS()) : n.reducers) || {}, l = Object.keys(o), u = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, s = {
      addCase(b, w) {
        const P = typeof b == "string" ? b : b.type;
        if (!P)
          throw new Error(at(12));
        if (P in u.sliceCaseReducersByType)
          throw new Error(at(13));
        return u.sliceCaseReducersByType[P] = w, s;
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
      const w = o[b], P = {
        reducerName: b,
        type: iS(i, b),
        createNotation: typeof n.reducers == "function"
      };
      sS(w) ? fS(P, w, s, t) : uS(P, w, s);
    });
    function c() {
      const [b = {}, w = [], P = void 0] = typeof n.extraReducers == "function" ? Pg(n.extraReducers) : [n.extraReducers], O = {
        ...b,
        ...u.sliceCaseReducersByType
      };
      return eS(n.initialState, (S) => {
        for (let A in O)
          S.addCase(A, O[A]);
        for (let A of u.sliceMatchers)
          S.addMatcher(A.matcher, A.reducer);
        for (let A of w)
          S.addMatcher(A.matcher, A.reducer);
        P && S.addDefaultCase(P);
      });
    }
    const f = (b) => b, d = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new WeakMap();
    let h;
    function y(b, w) {
      return h || (h = c()), h(b, w);
    }
    function m() {
      return h || (h = c()), h.getInitialState();
    }
    function g(b, w = !1) {
      function P(S) {
        let A = S[b];
        return typeof A > "u" && w && (A = ka(v, P, m)), A;
      }
      function O(S = f) {
        const A = ka(d, w, () => /* @__PURE__ */ new WeakMap());
        return ka(A, S, () => {
          const C = {};
          for (const [$, j] of Object.entries(n.selectors ?? {}))
            C[$] = oS(j, S, () => ka(v, S, m), w);
          return C;
        });
      }
      return {
        reducerPath: b,
        getSelectors: O,
        get selectors() {
          return O(P);
        },
        selectSlice: P
      };
    }
    const x = {
      name: i,
      reducer: y,
      actions: u.actionCreators,
      caseReducers: u.sliceCaseReducersByName,
      getInitialState: m,
      ...g(a),
      injectInto(b, {
        reducerPath: w,
        ...P
      } = {}) {
        const O = w ?? a;
        return b.inject({
          reducerPath: O,
          reducer: y
        }, P), {
          ...x,
          ...g(O, !0)
        };
      }
    };
    return x;
  };
}
function oS(e, t, r, n) {
  function i(a, ...o) {
    let l = t(a);
    return typeof l > "u" && n && (l = r()), e(l, ...o);
  }
  return i.unwrapped = e, i;
}
var Ae = /* @__PURE__ */ aS();
function lS() {
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
function uS({
  type: e,
  reducerName: t,
  createNotation: r
}, n, i) {
  let a, o;
  if ("reducer" in n) {
    if (r && !cS(n))
      throw new Error(at(17));
    a = n.reducer, o = n.prepare;
  } else
    a = n;
  i.addCase(e, a).exposeCaseReducer(t, a).exposeAction(t, o ? lt(e, o) : lt(e));
}
function sS(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function cS(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function fS({
  type: e,
  reducerName: t
}, r, n, i) {
  if (!i)
    throw new Error(at(18));
  const {
    payloadCreator: a,
    fulfilled: o,
    pending: l,
    rejected: u,
    settled: s,
    options: c
  } = r, f = i(e, a, c);
  n.exposeAction(t, f), o && n.addCase(f.fulfilled, o), l && n.addCase(f.pending, l), u && n.addCase(f.rejected, u), s && n.addMatcher(f.settled, s), n.exposeCaseReducer(t, {
    fulfilled: o || Ca,
    pending: l || Ca,
    rejected: u || Ca,
    settled: s || Ca
  });
}
function Ca() {
}
var dS = "task", Ag = "listener", Sg = "completed", mc = "cancelled", vS = `task-${mc}`, pS = `task-${Sg}`, us = `${Ag}-${mc}`, hS = `${Ag}-${Sg}`, bl = class {
  constructor(e) {
    this.code = e, this.message = `${dS} ${mc} (reason: ${e})`;
  }
  code;
  name = "TaskAbortError";
  message;
}, yc = (e, t) => {
  if (typeof e != "function")
    throw new TypeError(at(32));
}, ho = () => {
}, _g = (e, t = ho) => (e.catch(t), e), Eg = (e, t) => (e.addEventListener("abort", t, {
  once: !0
}), () => e.removeEventListener("abort", t)), an = (e) => {
  if (e.aborted)
    throw new bl(e.reason);
};
function kg(e, t) {
  let r = ho;
  return new Promise((n, i) => {
    const a = () => i(new bl(e.reason));
    if (e.aborted) {
      a();
      return;
    }
    r = Eg(e, a), t.finally(() => r()).then(n, i);
  }).finally(() => {
    r = ho;
  });
}
var mS = async (e, t) => {
  try {
    return await Promise.resolve(), {
      status: "ok",
      value: await e()
    };
  } catch (r) {
    return {
      status: r instanceof bl ? "cancelled" : "rejected",
      error: r
    };
  } finally {
    t?.();
  }
}, mo = (e) => (t) => _g(kg(e, t).then((r) => (an(e), r))), Cg = (e) => {
  const t = mo(e);
  return (r) => t(new Promise((n) => setTimeout(n, r)));
}, {
  assign: Dn
} = Object, Md = {}, xl = "listenerMiddleware", yS = (e, t) => {
  const r = (n) => Eg(e, () => n.abort(e.reason));
  return (n, i) => {
    yc(n);
    const a = new AbortController();
    r(a);
    const o = mS(async () => {
      an(e), an(a.signal);
      const l = await n({
        pause: mo(a.signal),
        delay: Cg(a.signal),
        signal: a.signal
      });
      return an(a.signal), l;
    }, () => a.abort(pS));
    return i?.autoJoin && t.push(o.catch(ho)), {
      result: mo(e)(o),
      cancel() {
        a.abort(vS);
      }
    };
  };
}, gS = (e, t) => {
  const r = async (n, i) => {
    an(t);
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
      const u = await kg(t, Promise.race(l));
      return an(t), u;
    } finally {
      a();
    }
  };
  return ((n, i) => _g(r(n, i)));
}, $g = (e) => {
  let {
    type: t,
    actionCreator: r,
    matcher: n,
    predicate: i,
    effect: a
  } = e;
  if (t)
    i = lt(t).match;
  else if (r)
    t = r.type, i = r.match;
  else if (n)
    i = n;
  else if (!i) throw new Error(at(21));
  return yc(a), {
    predicate: i,
    type: t,
    effect: a
  };
}, Ig = /* @__PURE__ */ Dn((e) => {
  const {
    type: t,
    predicate: r,
    effect: n
  } = $g(e);
  return {
    id: rS(),
    effect: n,
    type: t,
    predicate: r,
    pending: /* @__PURE__ */ new Set(),
    unsubscribe: () => {
      throw new Error(at(22));
    }
  };
}, {
  withTypes: () => Ig
}), Dd = (e, t) => {
  const {
    type: r,
    effect: n,
    predicate: i
  } = $g(t);
  return Array.from(e.values()).find((a) => (typeof r == "string" ? a.type === r : a.predicate === i) && a.effect === n);
}, ss = (e) => {
  e.pending.forEach((t) => {
    t.abort(us);
  });
}, bS = (e, t) => () => {
  for (const r of t.keys())
    ss(r);
  e.clear();
}, Td = (e, t, r) => {
  try {
    e(t, r);
  } catch (n) {
    setTimeout(() => {
      throw n;
    }, 0);
  }
}, jg = /* @__PURE__ */ Dn(/* @__PURE__ */ lt(`${xl}/add`), {
  withTypes: () => jg
}), xS = /* @__PURE__ */ lt(`${xl}/removeAll`), Mg = /* @__PURE__ */ Dn(/* @__PURE__ */ lt(`${xl}/remove`), {
  withTypes: () => Mg
}), wS = (...e) => {
  console.error(`${xl}/error`, ...e);
}, Xi = (e = {}) => {
  const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), n = (v) => {
    const h = r.get(v) ?? 0;
    r.set(v, h + 1);
  }, i = (v) => {
    const h = r.get(v) ?? 1;
    h === 1 ? r.delete(v) : r.set(v, h - 1);
  }, {
    extra: a,
    onError: o = wS
  } = e;
  yc(o);
  const l = (v) => (v.unsubscribe = () => t.delete(v.id), t.set(v.id, v), (h) => {
    v.unsubscribe(), h?.cancelActive && ss(v);
  }), u = ((v) => {
    const h = Dd(t, v) ?? Ig(v);
    return l(h);
  });
  Dn(u, {
    withTypes: () => u
  });
  const s = (v) => {
    const h = Dd(t, v);
    return h && (h.unsubscribe(), v.cancelActive && ss(h)), !!h;
  };
  Dn(s, {
    withTypes: () => s
  });
  const c = async (v, h, y, m) => {
    const g = new AbortController(), x = gS(u, g.signal), b = [];
    try {
      v.pending.add(g), n(v), await Promise.resolve(v.effect(
        h,
        // Use assign() rather than ... to avoid extra helper functions added to bundle
        Dn({}, y, {
          getOriginalState: m,
          condition: (w, P) => x(w, P).then(Boolean),
          take: x,
          delay: Cg(g.signal),
          pause: mo(g.signal),
          extra: a,
          signal: g.signal,
          fork: yS(g.signal, b),
          unsubscribe: v.unsubscribe,
          subscribe: () => {
            t.set(v.id, v);
          },
          cancelActiveListeners: () => {
            v.pending.forEach((w, P, O) => {
              w !== g && (w.abort(us), O.delete(w));
            });
          },
          cancel: () => {
            g.abort(us), v.pending.delete(g);
          },
          throwIfCancelled: () => {
            an(g.signal);
          }
        })
      ));
    } catch (w) {
      w instanceof bl || Td(o, w, {
        raisedBy: "effect"
      });
    } finally {
      await Promise.all(b), g.abort(hS), i(v), v.pending.delete(g);
    }
  }, f = bS(t, r);
  return {
    middleware: (v) => (h) => (y) => {
      if (!ug(y))
        return h(y);
      if (jg.match(y))
        return u(y.payload);
      if (xS.match(y)) {
        f();
        return;
      }
      if (Mg.match(y))
        return s(y.payload);
      let m = v.getState();
      const g = () => {
        if (m === Md)
          throw new Error(at(23));
        return m;
      };
      let x;
      try {
        if (x = h(y), t.size > 0) {
          const b = v.getState(), w = Array.from(t.values());
          for (const P of w) {
            let O = !1;
            try {
              O = P.predicate(y, b, m);
            } catch (S) {
              O = !1, Td(o, S, {
                raisedBy: "predicate"
              });
            }
            O && c(P, y, v, g);
          }
        }
      } finally {
        m = Md;
      }
      return x;
    },
    startListening: u,
    stopListening: s,
    clearListeners: f
  };
};
function at(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var OS = {
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
}, Dg = Ae({
  name: "chartLayout",
  initialState: OS,
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
  setMargin: PS,
  setLayout: AS,
  setChartSize: SS,
  setScale: _S
} = Dg.actions, ES = Dg.reducer;
function Tg(e, t, r) {
  return Array.isArray(e) && e && t + r !== 0 ? e.slice(t, r + 1) : e;
}
function Z(e) {
  return Number.isFinite(e);
}
function zn(e) {
  return typeof e == "number" && e > 0 && Number.isFinite(e);
}
function Nd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function $n(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Nd(Object(r), !0).forEach(function(n) {
      kS(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Nd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function kS(e, t, r) {
  return (t = CS(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function CS(e) {
  var t = $S(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function $S(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Be(e, t, r) {
  return Ge(e) || Ge(t) ? r : Bt(t) ? dr(e, t, r) : typeof t == "function" ? t(e) : r;
}
var IS = (e, t, r) => {
  if (t && r) {
    var {
      width: n,
      height: i
    } = r, {
      align: a,
      verticalAlign: o,
      layout: l
    } = t;
    if ((l === "vertical" || l === "horizontal" && o === "middle") && a !== "center" && U(e[a]))
      return $n($n({}, e), {}, {
        [a]: e[a] + (n || 0)
      });
    if ((l === "horizontal" || l === "vertical" && a === "center") && o !== "middle" && U(e[o]))
      return $n($n({}, e), {}, {
        [o]: e[o] + (i || 0)
      });
  }
  return e;
}, Xt = (e, t) => e === "horizontal" && t === "xAxis" || e === "vertical" && t === "yAxis" || e === "centric" && t === "angleAxis" || e === "radial" && t === "radiusAxis", Ng = (e, t, r, n) => {
  if (n)
    return e.map((l) => l.coordinate);
  var i, a, o = e.map((l) => (l.coordinate === t && (i = !0), l.coordinate === r && (a = !0), l.coordinate));
  return i || o.push(t), a || o.push(r), o;
}, Lg = (e, t, r) => {
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
  var h = l === "scaleBand" && o.bandwidth ? o.bandwidth() / 2 : 2, y = i === "category" && o.bandwidth ? o.bandwidth() / h : 0;
  if (y = v === "angleAxis" && a && a.length >= 2 ? zt(a[0] - a[1]) * 2 * y : y, f || d) {
    var m = (f || d || []).map((g, x) => {
      var b = n ? n.indexOf(g) : g, w = o.map(b);
      return Z(w) ? {
        // If the scaleContent is not a number, the coordinate will be NaN.
        // That could be the case for example with a PointScale and a string as domain.
        coordinate: w + y,
        value: g,
        offset: y,
        index: x
      } : null;
    }).filter(Je);
    return m;
  }
  return u && s ? s.map((g, x) => {
    var b = o.map(g);
    return Z(b) ? {
      coordinate: b + y,
      value: g,
      index: x,
      offset: y
    } : null;
  }).filter(Je) : o.ticks && c != null ? o.ticks(c).map((g, x) => {
    var b = o.map(g);
    return Z(b) ? {
      coordinate: b + y,
      value: g,
      index: x,
      offset: y
    } : null;
  }).filter(Je) : o.domain().map((g, x) => {
    var b = o.map(g);
    return Z(b) ? {
      coordinate: b + y,
      // @ts-expect-error can't use Date as an index
      value: n ? n[g] : g,
      index: x,
      offset: y
    } : null;
  }).filter(Je);
}, jS = (e) => {
  var t, r = e.length;
  if (!(r <= 0)) {
    var n = (t = e[0]) === null || t === void 0 ? void 0 : t.length;
    if (!(n == null || n <= 0))
      for (var i = 0; i < n; ++i)
        for (var a = 0, o = 0, l = 0; l < r; ++l) {
          var u = e[l], s = u?.[i];
          if (s != null) {
            var c = s[1], f = s[0], d = Yt(c) ? f : c;
            d >= 0 ? (s[0] = a, a += d, s[1] = a) : (s[0] = o, o += d, s[1] = o);
          }
        }
  }
}, MS = (e) => {
  var t, r = e.length;
  if (!(r <= 0)) {
    var n = (t = e[0]) === null || t === void 0 ? void 0 : t.length;
    if (!(n == null || n <= 0))
      for (var i = 0; i < n; ++i)
        for (var a = 0, o = 0; o < r; ++o) {
          var l = e[o], u = l?.[i];
          if (u != null) {
            var s = Yt(u[1]) ? u[0] : u[1];
            s >= 0 ? (u[0] = a, a += s, u[1] = a) : (u[0] = 0, u[1] = 0);
          }
        }
  }
}, DS = {
  sign: jS,
  // @ts-expect-error definitelytyped types are incorrect
  expand: Ry,
  // @ts-expect-error definitelytyped types are incorrect
  none: ar,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: zy,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: By,
  positive: MS
}, TS = (e, t, r) => {
  var n, i = (n = DS[r]) !== null && n !== void 0 ? n : ar, a = Ly().keys(t).value((l, u) => Number(Be(l, u, 0))).order(ao).offset(i), o = a(e);
  return o.forEach((l, u) => {
    l.forEach((s, c) => {
      var f = Be(e[c], t[u], 0);
      Array.isArray(f) && f.length === 2 && U(f[0]) && U(f[1]) && (s[0] = f[0], s[1] = f[1]);
    });
  }), o;
};
function NS(e) {
  return e == null ? void 0 : String(e);
}
function Ld(e) {
  var {
    axis: t,
    ticks: r,
    bandSize: n,
    entry: i,
    index: a,
    dataKey: o
  } = e;
  if (t.type === "category") {
    if (!t.allowDuplicatedCategory && t.dataKey && !Ge(i[t.dataKey])) {
      var l = Uy(r, "value", i[t.dataKey]);
      if (l)
        return l.coordinate + n / 2;
    }
    return r != null && r[a] ? r[a].coordinate + n / 2 : null;
  }
  var u = Be(i, Ge(o) ? t.dataKey : o), s = t.scale.map(u);
  return U(s) ? s : null;
}
var LS = (e) => {
  var t = e.flat(2).filter(U);
  return [Math.min(...t), Math.max(...t)];
}, RS = (e) => [e[0] === 1 / 0 ? 0 : e[0], e[1] === -1 / 0 ? 0 : e[1]], zS = (e, t, r) => {
  if (e != null)
    return RS(Object.keys(e).reduce((n, i) => {
      var a = e[i];
      if (!a)
        return n;
      var {
        stackedData: o
      } = a, l = o.reduce((u, s) => {
        var c = Tg(s, t, r), f = LS(c);
        return !Z(f[0]) || !Z(f[1]) ? u : [Math.min(u[0], f[0]), Math.max(u[1], f[1])];
      }, [1 / 0, -1 / 0]);
      return [Math.min(l[0], n[0]), Math.max(l[1], n[1])];
    }, [1 / 0, -1 / 0]));
}, Rd = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, zd = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Bd = (e, t, r) => {
  if (e && e.scale && e.scale.bandwidth) {
    var n = e.scale.bandwidth();
    return n;
  }
  if (e && t && t.length >= 2) {
    for (var i = gn(t, (c) => c.coordinate), a = 1 / 0, o = 1, l = i.length; o < l; o++) {
      var u = i[o], s = i[o - 1];
      a = Math.min((u?.coordinate || 0) - (s?.coordinate || 0), a);
    }
    return a === 1 / 0 ? 0 : a;
  }
  return r ? void 0 : 0;
};
function Fd(e) {
  var {
    tooltipEntrySettings: t,
    dataKey: r,
    payload: n,
    value: i,
    name: a
  } = e;
  return $n($n({}, t), {}, {
    dataKey: r,
    payload: n,
    value: i,
    name: a
  });
}
function Rg(e, t) {
  if (e)
    return String(e);
  if (typeof t == "string")
    return t;
}
var BS = (e, t) => {
  if (t === "horizontal")
    return e.relativeX;
  if (t === "vertical")
    return e.relativeY;
}, FS = (e, t) => t === "centric" ? e.angle : e.radius, vr = (e) => e.layout.width, pr = (e) => e.layout.height, WS = (e) => e.layout.scale, zg = (e) => e.layout.margin, wl = _((e) => e.cartesianAxis.xAxis, (e) => Object.values(e)), Ol = _((e) => e.cartesianAxis.yAxis, (e) => Object.values(e)), KS = "data-recharts-item-index", US = "data-recharts-item-id", Zi = 60;
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
function $a(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Wd(Object(r), !0).forEach(function(n) {
      HS(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Wd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function HS(e, t, r) {
  return (t = GS(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function GS(e) {
  var t = qS(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function qS(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var YS = (e) => e.brush.height;
function VS(e) {
  var t = Ol(e);
  return t.reduce((r, n) => {
    if (n.orientation === "left" && !n.mirror && !n.hide) {
      var i = typeof n.width == "number" ? n.width : Zi;
      return r + i;
    }
    return r;
  }, 0);
}
function XS(e) {
  var t = Ol(e);
  return t.reduce((r, n) => {
    if (n.orientation === "right" && !n.mirror && !n.hide) {
      var i = typeof n.width == "number" ? n.width : Zi;
      return r + i;
    }
    return r;
  }, 0);
}
function ZS(e) {
  var t = wl(e);
  return t.reduce((r, n) => n.orientation === "top" && !n.mirror && !n.hide ? r + n.height : r, 0);
}
function QS(e) {
  var t = wl(e);
  return t.reduce((r, n) => n.orientation === "bottom" && !n.mirror && !n.hide ? r + n.height : r, 0);
}
var Fe = _([vr, pr, zg, YS, VS, XS, ZS, QS, ag, AA], (e, t, r, n, i, a, o, l, u, s) => {
  var c = {
    left: (r.left || 0) + i,
    right: (r.right || 0) + a
  }, f = {
    top: (r.top || 0) + o,
    bottom: (r.bottom || 0) + l
  }, d = $a($a({}, f), c), v = d.bottom;
  d.bottom += n, d = IS(d, u, s);
  var h = e - d.left - d.right, y = t - d.top - d.bottom;
  return $a($a({
    brushBottom: v
  }, d), {}, {
    // never return negative values for height and width
    width: Math.max(h, 0),
    height: Math.max(y, 0)
  });
}), JS = _(Fe, (e) => ({
  x: e.left,
  y: e.top,
  width: e.width,
  height: e.height
})), Bg = _(vr, pr, (e, t) => ({
  x: 0,
  y: 0,
  width: e,
  height: t
})), e_ = /* @__PURE__ */ p.createContext(null), Ve = () => p.useContext(e_) != null, Pl = (e) => e.brush, Al = _([Pl, Fe, zg], (e, t, r) => ({
  height: e.height,
  x: U(e.x) ? e.x : t.left,
  y: U(e.y) ? e.y : t.top + t.height + t.brushBottom - (r?.bottom || 0),
  width: U(e.width) ? e.width : t.width
}));
function t_(e, t, { signal: r, edges: n } = {}) {
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
  }, h = () => {
    u();
  }, y = function(...m) {
    if (r?.aborted) return;
    i = this, a = m;
    const g = c == null;
    f(), o && g && u();
  };
  return y.schedule = f, y.cancel = v, y.flush = h, r?.addEventListener("abort", v, { once: !0 }), y;
}
function r_(e, t = 0, r = {}) {
  typeof r != "object" && (r = {});
  const { leading: n = !1, trailing: i = !0, maxWait: a } = r, o = Array(2);
  n && (o[0] = "leading"), i && (o[1] = "trailing");
  let l, u = null;
  const s = t_(function(...d) {
    l = e.apply(this, d), u = null;
  }, t, { edges: o }), c = function(...d) {
    return a != null && (u === null && (u = Date.now()), Date.now() - u >= a) ? (l = e.apply(this, d), u = Date.now(), s.cancel(), s.schedule(), l) : (s.apply(this, d), l);
  }, f = () => (s.flush(), l);
  return c.cancel = s.cancel, c.flush = f, c;
}
function n_(e, t = 0, r = {}) {
  const { leading: n = !0, trailing: i = !0 } = r;
  return r_(e, t, {
    leading: n,
    maxWait: t,
    trailing: i
  });
}
var Kd = function(t, r) {
  for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++)
    i[a - 2] = arguments[a];
  if (typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
    if (r === void 0)
      console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      var o = 0;
      console.warn(r.replace(/%s/g, () => i[o++]));
    }
}, i_ = {
  initialDimension: {
    width: -1,
    height: -1
  }
}, a_ = /* @__PURE__ */ p.createContext(i_.initialDimension), Fg = () => p.useContext(a_);
function gc(e) {
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
var Wg = () => {
  var e, t = Ve(), r = G(JS), n = G(Al), i = (e = G(Pl)) === null || e === void 0 ? void 0 : e.padding;
  return !t || !n || !i ? r : {
    width: n.width - i.left - i.right,
    height: n.height - i.top - i.bottom,
    x: i.left,
    y: i.top
  };
}, o_ = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 0,
  height: 0,
  brushBottom: 0
}, l_ = () => {
  var e;
  return (e = G(Fe)) !== null && e !== void 0 ? e : o_;
}, Kg = () => G(vr), Ug = () => G(pr), de = (e) => e.layout.layoutType, Qi = () => G(de), bc = () => {
  var e = Qi();
  if (e === "horizontal" || e === "vertical")
    return e;
}, Hg = (e) => {
  var t = e.layout.layoutType;
  if (t === "centric" || t === "radial")
    return t;
}, u_ = () => {
  var e = Qi();
  return e !== void 0;
}, Ji = (e) => {
  var t = me(), r = Ve(), {
    width: n,
    height: i
  } = e, a = Fg(), o = n, l = i;
  return a && (o = a.width > 0 ? a.width : n, l = a.height > 0 ? a.height : i), p.useEffect(() => {
    !r && zn(o) && zn(l) && t(SS({
      width: o,
      height: l
    }));
  }, [t, r, o, l]), null;
}, Gg = Symbol.for("immer-nothing"), Ud = Symbol.for("immer-draftable"), ut = Symbol.for("immer-state");
function wt(e, ...t) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var Mi = Object.getPrototypeOf;
function Bn(e) {
  return !!e && !!e[ut];
}
function fn(e) {
  return e ? qg(e) || Array.isArray(e) || !!e[Ud] || !!e.constructor?.[Ud] || ea(e) || _l(e) : !1;
}
var s_ = Object.prototype.constructor.toString(), Hd = /* @__PURE__ */ new WeakMap();
function qg(e) {
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
  let n = Hd.get(r);
  return n === void 0 && (n = Function.toString.call(r), Hd.set(r, n)), n === s_;
}
function yo(e, t, r = !0) {
  Sl(e) === 0 ? (r ? Reflect.ownKeys(e) : Object.keys(e)).forEach((i) => {
    t(i, e[i], e);
  }) : e.forEach((n, i) => t(i, n, e));
}
function Sl(e) {
  const t = e[ut];
  return t ? t.type_ : Array.isArray(e) ? 1 : ea(e) ? 2 : _l(e) ? 3 : 0;
}
function cs(e, t) {
  return Sl(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Yg(e, t, r) {
  const n = Sl(e);
  n === 2 ? e.set(t, r) : n === 3 ? e.add(r) : e[t] = r;
}
function c_(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function ea(e) {
  return e instanceof Map;
}
function _l(e) {
  return e instanceof Set;
}
function Vr(e) {
  return e.copy_ || e.base_;
}
function fs(e, t) {
  if (ea(e))
    return new Map(e);
  if (_l(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  const r = qg(e);
  if (t === !0 || t === "class_only" && !r) {
    const n = Object.getOwnPropertyDescriptors(e);
    delete n[ut];
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
    return Object.create(Mi(e), n);
  } else {
    const n = Mi(e);
    if (n !== null && r)
      return { ...e };
    const i = Object.create(n);
    return Object.assign(i, e);
  }
}
function xc(e, t = !1) {
  return El(e) || Bn(e) || !fn(e) || (Sl(e) > 1 && Object.defineProperties(e, {
    set: Ia,
    add: Ia,
    clear: Ia,
    delete: Ia
  }), Object.freeze(e), t && Object.values(e).forEach((r) => xc(r, !0))), e;
}
function f_() {
  wt(2);
}
var Ia = {
  value: f_
};
function El(e) {
  return e === null || typeof e != "object" ? !0 : Object.isFrozen(e);
}
var d_ = {};
function dn(e) {
  const t = d_[e];
  return t || wt(0, e), t;
}
var Di;
function Vg() {
  return Di;
}
function v_(e, t) {
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
function Gd(e, t) {
  t && (dn("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function ds(e) {
  vs(e), e.drafts_.forEach(p_), e.drafts_ = null;
}
function vs(e) {
  e === Di && (Di = e.parent_);
}
function qd(e) {
  return Di = v_(Di, e);
}
function p_(e) {
  const t = e[ut];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function Yd(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  return e !== void 0 && e !== r ? (r[ut].modified_ && (ds(t), wt(4)), fn(e) && (e = go(t, e), t.parent_ || bo(t, e)), t.patches_ && dn("Patches").generateReplacementPatches_(
    r[ut].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = go(t, r, []), ds(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== Gg ? e : void 0;
}
function go(e, t, r) {
  if (El(t))
    return t;
  const n = e.immer_.shouldUseStrictIteration(), i = t[ut];
  if (!i)
    return yo(
      t,
      (a, o) => Vd(e, i, t, a, o, r),
      n
    ), t;
  if (i.scope_ !== e)
    return t;
  if (!i.modified_)
    return bo(e, i.base_, !0), i.base_;
  if (!i.finalized_) {
    i.finalized_ = !0, i.scope_.unfinalizedDrafts_--;
    const a = i.copy_;
    let o = a, l = !1;
    i.type_ === 3 && (o = new Set(a), a.clear(), l = !0), yo(
      o,
      (u, s) => Vd(
        e,
        i,
        a,
        u,
        s,
        r,
        l
      ),
      n
    ), bo(e, a, !1), r && e.patches_ && dn("Patches").generatePatches_(
      i,
      r,
      e.patches_,
      e.inversePatches_
    );
  }
  return i.copy_;
}
function Vd(e, t, r, n, i, a, o) {
  if (i == null || typeof i != "object" && !o)
    return;
  const l = El(i);
  if (!(l && !o)) {
    if (Bn(i)) {
      const u = a && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
      !cs(t.assigned_, n) ? a.concat(n) : void 0, s = go(e, i, u);
      if (Yg(r, n, s), Bn(s))
        e.canAutoFreeze_ = !1;
      else
        return;
    } else o && r.add(i);
    if (fn(i) && !l) {
      if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1 || t && t.base_ && t.base_[n] === i && l)
        return;
      go(e, i), (!t || !t.scope_.parent_) && typeof n != "symbol" && (ea(r) ? r.has(n) : Object.prototype.propertyIsEnumerable.call(r, n)) && bo(e, i);
    }
  }
}
function bo(e, t, r = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && xc(t, r);
}
function h_(e, t) {
  const r = Array.isArray(e), n = {
    type_: r ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : Vg(),
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
  let i = n, a = wc;
  r && (i = [n], a = Ti);
  const { revoke: o, proxy: l } = Proxy.revocable(i, a);
  return n.draft_ = l, n.revoke_ = o, l;
}
var wc = {
  get(e, t) {
    if (t === ut)
      return e;
    const r = Vr(e);
    if (!cs(r, t))
      return m_(e, r, t);
    const n = r[t];
    return e.finalized_ || !fn(n) ? n : n === gu(e.base_, t) ? (bu(e), e.copy_[t] = hs(n, e)) : n;
  },
  has(e, t) {
    return t in Vr(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(Vr(e));
  },
  set(e, t, r) {
    const n = Xg(Vr(e), t);
    if (n?.set)
      return n.set.call(e.draft_, r), !0;
    if (!e.modified_) {
      const i = gu(Vr(e), t), a = i?.[ut];
      if (a && a.base_ === r)
        return e.copy_[t] = r, e.assigned_[t] = !1, !0;
      if (c_(r, i) && (r !== void 0 || cs(e.base_, t)))
        return !0;
      bu(e), ps(e);
    }
    return e.copy_[t] === r && // special case: handle new props with value 'undefined'
    (r !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(r) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = r, e.assigned_[t] = !0), !0;
  },
  deleteProperty(e, t) {
    return gu(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, bu(e), ps(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const r = Vr(e), n = Reflect.getOwnPropertyDescriptor(r, t);
    return n && {
      writable: !0,
      configurable: e.type_ !== 1 || t !== "length",
      enumerable: n.enumerable,
      value: r[t]
    };
  },
  defineProperty() {
    wt(11);
  },
  getPrototypeOf(e) {
    return Mi(e.base_);
  },
  setPrototypeOf() {
    wt(12);
  }
}, Ti = {};
yo(wc, (e, t) => {
  Ti[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
Ti.deleteProperty = function(e, t) {
  return Ti.set.call(this, e, t, void 0);
};
Ti.set = function(e, t, r) {
  return wc.set.call(this, e[0], t, r, e[0]);
};
function gu(e, t) {
  const r = e[ut];
  return (r ? Vr(r) : e)[t];
}
function m_(e, t, r) {
  const n = Xg(t, r);
  return n ? "value" in n ? n.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    n.get?.call(e.draft_)
  ) : void 0;
}
function Xg(e, t) {
  if (!(t in e))
    return;
  let r = Mi(e);
  for (; r; ) {
    const n = Object.getOwnPropertyDescriptor(r, t);
    if (n)
      return n;
    r = Mi(r);
  }
}
function ps(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && ps(e.parent_));
}
function bu(e) {
  e.copy_ || (e.copy_ = fs(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var y_ = class {
  constructor(t) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.useStrictIteration_ = !0, this.produce = (r, n, i) => {
      if (typeof r == "function" && typeof n != "function") {
        const o = n;
        n = r;
        const l = this;
        return function(s = o, ...c) {
          return l.produce(s, (f) => n.call(this, f, ...c));
        };
      }
      typeof n != "function" && wt(6), i !== void 0 && typeof i != "function" && wt(7);
      let a;
      if (fn(r)) {
        const o = qd(this), l = hs(r, void 0);
        let u = !0;
        try {
          a = n(l), u = !1;
        } finally {
          u ? ds(o) : vs(o);
        }
        return Gd(o, i), Yd(a, o);
      } else if (!r || typeof r != "object") {
        if (a = n(r), a === void 0 && (a = r), a === Gg && (a = void 0), this.autoFreeze_ && xc(a, !0), i) {
          const o = [], l = [];
          dn("Patches").generateReplacementPatches_(r, a, o, l), i(o, l);
        }
        return a;
      } else
        wt(1, r);
    }, this.produceWithPatches = (r, n) => {
      if (typeof r == "function")
        return (l, ...u) => this.produceWithPatches(l, (s) => r(s, ...u));
      let i, a;
      return [this.produce(r, n, (l, u) => {
        i = l, a = u;
      }), i, a];
    }, typeof t?.autoFreeze == "boolean" && this.setAutoFreeze(t.autoFreeze), typeof t?.useStrictShallowCopy == "boolean" && this.setUseStrictShallowCopy(t.useStrictShallowCopy), typeof t?.useStrictIteration == "boolean" && this.setUseStrictIteration(t.useStrictIteration);
  }
  createDraft(t) {
    fn(t) || wt(8), Bn(t) && (t = g_(t));
    const r = qd(this), n = hs(t, void 0);
    return n[ut].isManual_ = !0, vs(r), n;
  }
  finishDraft(t, r) {
    const n = t && t[ut];
    (!n || !n.isManual_) && wt(9);
    const { scope_: i } = n;
    return Gd(i, r), Yd(void 0, i);
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
    const i = dn("Patches").applyPatches_;
    return Bn(t) ? i(t, r) : this.produce(
      t,
      (a) => i(a, r)
    );
  }
};
function hs(e, t) {
  const r = ea(e) ? dn("MapSet").proxyMap_(e, t) : _l(e) ? dn("MapSet").proxySet_(e, t) : h_(e, t);
  return (t ? t.scope_ : Vg()).drafts_.push(r), r;
}
function g_(e) {
  return Bn(e) || wt(10, e), Zg(e);
}
function Zg(e) {
  if (!fn(e) || El(e))
    return e;
  const t = e[ut];
  let r, n = !0;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, r = fs(e, t.scope_.immer_.useStrictShallowCopy_), n = t.scope_.immer_.shouldUseStrictIteration();
  } else
    r = fs(e, !0);
  return yo(
    r,
    (i, a) => {
      Yg(r, i, Zg(a));
    },
    n
  ), t && (t.finalized_ = !1), r;
}
var b_ = new y_();
b_.produce;
var x_ = {
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
}, Qg = Ae({
  name: "legend",
  initialState: x_,
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
      prepare: Q()
    },
    replaceLegendPayload: {
      reducer(e, t) {
        var {
          prev: r,
          next: n
        } = t.payload, i = He(e).payload.indexOf(r);
        i > -1 && (e.payload[i] = n);
      },
      prepare: Q()
    },
    removeLegendPayload: {
      reducer(e, t) {
        var r = He(e).payload.indexOf(t.payload);
        r > -1 && e.payload.splice(r, 1);
      },
      prepare: Q()
    }
  }
}), {
  setLegendSize: TU,
  setLegendSettings: NU,
  addLegendPayload: w_,
  replaceLegendPayload: O_,
  removeLegendPayload: P_
} = Qg.actions, A_ = Qg.reducer, xu = { exports: {} }, wu = {};
var Xd;
function S_() {
  if (Xd) return wu;
  Xd = 1;
  var e = ay();
  function t(u, s) {
    return u === s && (u !== 0 || 1 / u === 1 / s) || u !== u && s !== s;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useSyncExternalStore, i = e.useRef, a = e.useEffect, o = e.useMemo, l = e.useDebugValue;
  return wu.useSyncExternalStoreWithSelector = function(u, s, c, f, d) {
    var v = i(null);
    if (v.current === null) {
      var h = { hasValue: !1, value: null };
      v.current = h;
    } else h = v.current;
    v = o(
      function() {
        function m(P) {
          if (!g) {
            if (g = !0, x = P, P = f(P), d !== void 0 && h.hasValue) {
              var O = h.value;
              if (d(O, P))
                return b = O;
            }
            return b = P;
          }
          if (O = b, r(x, P)) return O;
          var S = f(P);
          return d !== void 0 && d(O, S) ? (x = P, O) : (x = P, b = S);
        }
        var g = !1, x, b, w = c === void 0 ? null : c;
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
    var y = n(u, v[0], v[1]);
    return a(
      function() {
        h.hasValue = !0, h.value = y;
      },
      [y]
    ), l(y), y;
  }, wu;
}
var Zd;
function __() {
  return Zd || (Zd = 1, xu.exports = S_()), xu.exports;
}
__();
function E_(e) {
  e();
}
function k_() {
  let e = null, t = null;
  return {
    clear() {
      e = null, t = null;
    },
    notify() {
      E_(() => {
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
var Qd = {
  notify() {
  },
  get: () => []
};
function C_(e, t) {
  let r, n = Qd, i = 0, a = !1;
  function o(y) {
    c();
    const m = n.subscribe(y);
    let g = !1;
    return () => {
      g || (g = !0, m(), f());
    };
  }
  function l() {
    n.notify();
  }
  function u() {
    h.onStateChange && h.onStateChange();
  }
  function s() {
    return a;
  }
  function c() {
    i++, r || (r = e.subscribe(u), n = k_());
  }
  function f() {
    i--, r && i === 0 && (r(), r = void 0, n.clear(), n = Qd);
  }
  function d() {
    a || (a = !0, c());
  }
  function v() {
    a && (a = !1, f());
  }
  const h = {
    addNestedSub: o,
    notifyNestedSubs: l,
    handleChangeWrapper: u,
    isSubscribed: s,
    trySubscribe: d,
    tryUnsubscribe: v,
    getListeners: () => n
  };
  return h;
}
var $_ = () => typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", I_ = /* @__PURE__ */ $_(), j_ = () => typeof navigator < "u" && navigator.product === "ReactNative", M_ = /* @__PURE__ */ j_(), D_ = () => I_ || M_ ? p.useLayoutEffect : p.useEffect, T_ = /* @__PURE__ */ D_();
function Jd(e, t) {
  return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function Jg(e, t) {
  if (Jd(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  const r = Object.keys(e), n = Object.keys(t);
  if (r.length !== n.length) return !1;
  for (let i = 0; i < r.length; i++)
    if (!Object.prototype.hasOwnProperty.call(t, r[i]) || !Jd(e[r[i]], t[r[i]]))
      return !1;
  return !0;
}
var N_ = /* @__PURE__ */ Symbol.for("react-redux-context"), L_ = typeof globalThis < "u" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function R_() {
  if (!p.createContext) return {};
  const e = L_[N_] ??= /* @__PURE__ */ new Map();
  let t = e.get(p.createContext);
  return t || (t = p.createContext(
    null
  ), e.set(p.createContext, t)), t;
}
var z_ = /* @__PURE__ */ R_();
function B_(e) {
  const { children: t, context: r, serverState: n, store: i } = e, a = p.useMemo(() => {
    const u = C_(i);
    return {
      store: i,
      subscription: u,
      getServerState: n ? () => n : void 0
    };
  }, [i, n]), o = p.useMemo(() => i.getState(), [i]);
  T_(() => {
    const { subscription: u } = a;
    return u.onStateChange = u.notifyNestedSubs, u.trySubscribe(), o !== i.getState() && u.notifyNestedSubs(), () => {
      u.tryUnsubscribe(), u.onStateChange = void 0;
    };
  }, [a, o]);
  const l = r || z_;
  return /* @__PURE__ */ p.createElement(l.Provider, { value: a }, t);
}
var F_ = B_, W_ = /* @__PURE__ */ new Set([
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
function K_(e, t) {
  return e == null && t == null ? !0 : typeof e == "number" && typeof t == "number" ? e === t || e !== e && t !== t : e === t;
}
function kl(e, t) {
  var r = /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)]);
  for (var n of r)
    if (W_.has(n)) {
      if (e[n] == null && t[n] == null)
        continue;
      if (!Jg(e[n], t[n]))
        return !1;
    } else if (!K_(e[n], t[n]))
      return !1;
  return !0;
}
var U_ = () => !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout), ta = {
  isSsr: U_()
};
function H_() {
  var [e, t] = p.useState(() => ta.isSsr || !window.matchMedia ? !1 : window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  return p.useEffect(() => {
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
var G_ = () => {
  var e;
  return (e = G((t) => t.rootProps.accessibilityLayer)) !== null && e !== void 0 ? e : !0;
};
function ms() {
  return ms = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ms.apply(null, arguments);
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
      q_(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ev(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function q_(e, t, r) {
  return (t = Y_(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Y_(e) {
  var t = V_(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function V_(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var rv = {
  curveBasisClosed: Py,
  curveBasisOpen: Sy,
  curveBasis: wy,
  curveBumpX: my,
  curveBumpY: yy,
  curveLinearClosed: Ey,
  curveLinear: Xn,
  curveMonotoneX: $y,
  curveMonotoneY: Iy,
  curveNatural: My,
  curveStep: Dy,
  curveStepAfter: Ny,
  curveStepBefore: Ty
}, xo = (e) => Z(e.x) && Z(e.y), nv = (e) => e.base != null && xo(e.base) && xo(e), di = (e) => e.x, vi = (e) => e.y, X_ = (e, t) => {
  if (typeof e == "function")
    return e;
  var r = "curve".concat(uc(e));
  if ((r === "curveMonotone" || r === "curveBump") && t) {
    var n = rv["".concat(r).concat(t === "vertical" ? "Y" : "X")];
    if (n)
      return n;
  }
  return rv[r] || Xn;
}, iv = {
  connectNulls: !1,
  type: "linear"
}, Z_ = (e) => {
  var {
    type: t = iv.type,
    points: r = [],
    baseLine: n,
    layout: i,
    connectNulls: a = iv.connectNulls
  } = e, o = X_(t, i), l = a ? r.filter(xo) : r;
  if (Array.isArray(n)) {
    var u, s = r.map((h, y) => tv(tv({}, h), {}, {
      base: n[y]
    }));
    i === "vertical" ? u = _r().y(vi).x1(di).x0((h) => h.base.x) : u = _r().x(di).y1(vi).y0((h) => h.base.y);
    var c = u.defined(nv).curve(o), f = a ? s.filter(nv) : s;
    return c(f);
  }
  var d;
  i === "vertical" && U(n) ? d = _r().y(vi).x1(di).x0(n) : U(n) ? d = _r().x(di).y1(vi).y0(n) : d = ic().x(di).y(vi);
  var v = d.defined(xo).curve(o);
  return v(l);
}, Ou = (e) => {
  var {
    className: t,
    points: r,
    path: n,
    pathRef: i
  } = e, a = Qi();
  if ((!r || !r.length) && !n)
    return null;
  var o = {
    type: e.type,
    points: e.points,
    baseLine: e.baseLine,
    layout: e.layout || a,
    connectNulls: e.connectNulls
  }, l = r && r.length ? Z_(o) : n;
  return /* @__PURE__ */ p.createElement("path", ms({}, St(e), sc(e), {
    className: ee("recharts-curve", t),
    d: l === null ? void 0 : l,
    ref: i
  }));
};
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
      Q_(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : av(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Q_(e, t, r) {
  return (t = J_(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function J_(e) {
  var t = eE(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function eE(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var tE = (e) => e.replace(/([A-Z])/g, (t) => "-".concat(t.toLowerCase())), rE = (e, t, r) => e.map((n) => "".concat(tE(n), " ").concat(t, "ms ").concat(r)).join(","), nE = (e, t) => [Object.keys(e), Object.keys(t)].reduce((r, n) => r.filter((i) => n.includes(i))), Ni = (e, t) => Object.keys(t).reduce((r, n) => ov(ov({}, r), {}, {
  [n]: e(n, t[n])
}), {});
function lv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Oe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? lv(Object(r), !0).forEach(function(n) {
      iE(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : lv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function iE(e, t, r) {
  return (t = aE(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function aE(e) {
  var t = oE(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function oE(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var wo = (e, t, r) => e + (t - e) * r, ys = (e) => {
  var {
    from: t,
    to: r
  } = e;
  return t !== r;
}, eb = (e, t, r) => {
  var n = Ni((i, a) => {
    if (ys(a)) {
      var [o, l] = e(a.from, a.to, a.velocity);
      return Oe(Oe({}, a), {}, {
        from: o,
        velocity: l
      });
    }
    return a;
  }, t);
  return r < 1 ? Ni((i, a) => ys(a) && n[i] != null ? Oe(Oe({}, a), {}, {
    velocity: wo(a.velocity, n[i].velocity, r),
    from: wo(a.from, n[i].from, r)
  }) : a, t) : eb(e, n, r - 1);
};
function lE(e, t, r, n, i, a) {
  var o, l = n.reduce((d, v) => Oe(Oe({}, d), {}, {
    [v]: {
      from: e[v],
      velocity: 0,
      to: t[v]
    }
  }), {}), u = () => Ni((d, v) => v.from, l), s = () => !Object.values(l).filter(ys).length, c = null, f = (d) => {
    o || (o = d);
    var v = d - o, h = v / r.dt;
    l = eb(r, l, h), i(Oe(Oe(Oe({}, e), t), u())), o = d, s() || (c = a.setTimeout(f));
  };
  return () => (c = a.setTimeout(f), () => {
    var d;
    (d = c) === null || d === void 0 || d();
  });
}
function uE(e, t, r, n, i, a, o) {
  var l = null, u = i.reduce((f, d) => {
    var v = e[d], h = t[d];
    return v == null || h == null ? f : Oe(Oe({}, f), {}, {
      [d]: [v, h]
    });
  }, {}), s, c = (f) => {
    s || (s = f);
    var d = (f - s) / n, v = Ni((y, m) => wo(...m, r(d)), u);
    if (a(Oe(Oe(Oe({}, e), t), v)), d < 1)
      l = o.setTimeout(c);
    else {
      var h = Ni((y, m) => wo(...m, r(1)), u);
      a(Oe(Oe(Oe({}, e), t), h));
    }
  };
  return () => (l = o.setTimeout(c), () => {
    var f;
    (f = l) === null || f === void 0 || f();
  });
}
const sE = (e, t, r, n, i, a) => {
  var o = nE(e, t);
  return r == null ? () => (i(Oe(Oe({}, e), t)), () => {
  }) : r.isStepper === !0 ? lE(e, t, r, o, i, a) : uE(e, t, r, n, o, i, a);
};
var Oo = 1e-4, tb = (e, t) => [0, 3 * e, 3 * t - 6 * e, 3 * e - 3 * t + 1], rb = (e, t) => e.map((r, n) => r * t ** n).reduce((r, n) => r + n), uv = (e, t) => (r) => {
  var n = tb(e, t);
  return rb(n, r);
}, cE = (e, t) => (r) => {
  var n = tb(e, t), i = [...n.map((a, o) => a * o).slice(1), 0];
  return rb(i, r);
}, fE = (e) => {
  var t, r = e.split("(");
  if (r.length !== 2 || r[0] !== "cubic-bezier")
    return null;
  var n = (t = r[1]) === null || t === void 0 || (t = t.split(")")[0]) === null || t === void 0 ? void 0 : t.split(",");
  if (n == null || n.length !== 4)
    return null;
  var i = n.map((a) => parseFloat(a));
  return [i[0], i[1], i[2], i[3]];
}, dE = function() {
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
        var i = fE(r[0]);
        if (i)
          return i;
      }
    }
  return r.length === 4 ? r : [0, 0, 1, 1];
}, vE = (e, t, r, n) => {
  var i = uv(e, r), a = uv(t, n), o = cE(e, r), l = (s) => s > 1 ? 1 : s < 0 ? 0 : s, u = (s) => {
    for (var c = s > 1 ? 1 : s, f = c, d = 0; d < 8; ++d) {
      var v = i(f) - c, h = o(f);
      if (Math.abs(v - c) < Oo || h < Oo)
        return a(f);
      f = l(f - v / h);
    }
    return a(f);
  };
  return u.isStepper = !1, u;
}, sv = function() {
  return vE(...dE(...arguments));
}, pE = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, {
    stiff: r = 100,
    damping: n = 8,
    dt: i = 17
  } = t, a = (o, l, u) => {
    var s = -(o - l) * r, c = u * n, f = u + (s - c) * i / 1e3, d = u * i / 1e3 + o;
    return Math.abs(d - l) < Oo && Math.abs(f) < Oo ? [l, 0] : [d, f];
  };
  return a.isStepper = !0, a.dt = i, a;
}, hE = (e) => {
  if (typeof e == "string")
    switch (e) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return sv(e);
      case "spring":
        return pE();
      default:
        if (e.split("(")[0] === "cubic-bezier")
          return sv(e);
    }
  return typeof e == "function" ? e : null;
};
function mE(e) {
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
let yE = class {
  setTimeout(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = performance.now(), i = null, a = (o) => {
      o - n >= r ? t(o) : typeof requestAnimationFrame == "function" && (i = requestAnimationFrame(a));
    };
    return i = requestAnimationFrame(a), () => {
      i != null && cancelAnimationFrame(i);
    };
  }
};
function gE() {
  return mE(new yE());
}
var bE = /* @__PURE__ */ p.createContext(gE);
function xE(e, t) {
  var r = p.useContext(bE);
  return p.useMemo(() => t ?? r(e), [e, t, r]);
}
var wE = {
  begin: 0,
  duration: 1e3,
  easing: "ease",
  isActive: !0,
  canBegin: !0,
  onAnimationEnd: () => {
  },
  onAnimationStart: () => {
  }
}, cv = {
  t: 0
}, Pu = {
  t: 1
};
function nb(e) {
  var t = Ct(e, wE), {
    isActive: r,
    canBegin: n,
    duration: i,
    easing: a,
    begin: o,
    onAnimationEnd: l,
    onAnimationStart: u,
    children: s
  } = t, c = H_(), f = r === "auto" ? !ta.isSsr && !c : r, d = xE(t.animationId, t.animationManager), [v, h] = p.useState(f ? cv : Pu), y = p.useRef(null);
  return p.useEffect(() => {
    f || h(Pu);
  }, [f]), p.useEffect(() => {
    if (!f || !n)
      return Zn;
    var m = sE(cv, Pu, hE(a), i, h, d.getTimeoutController()), g = () => {
      y.current = m();
    };
    return d.start([u, o, g, i, l]), () => {
      d.stop(), y.current && y.current(), l();
    };
  }, [f, n, i, a, o, u, l, d]), s(v.t);
}
function ib(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "animation-", r = p.useRef(Ci(t)), n = p.useRef(e);
  return n.current !== e && (r.current = Ci(t), n.current = e), r.current;
}
var OE = ["radius"], PE = ["radius"], fv, dv, vv, pv, hv, mv, yv, gv, bv, xv;
function wv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ov(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wv(Object(r), !0).forEach(function(n) {
      AE(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : wv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function AE(e, t, r) {
  return (t = SE(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function SE(e) {
  var t = _E(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function _E(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Po() {
  return Po = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Po.apply(null, arguments);
}
function Pv(e, t) {
  if (e == null) return {};
  var r, n, i = EE(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function EE(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function jt(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var Av = (e, t, r, n, i) => {
  var a = Er(r), o = Er(n), l = Math.min(Math.abs(a) / 2, Math.abs(o) / 2), u = o >= 0 ? 1 : -1, s = a >= 0 ? 1 : -1, c = o >= 0 && a >= 0 || o < 0 && a < 0 ? 1 : 0, f;
  if (l > 0 && Array.isArray(i)) {
    for (var d = [0, 0, 0, 0], v = 0, h = 4; v < h; v++) {
      var y, m = (y = i[v]) !== null && y !== void 0 ? y : 0;
      d[v] = m > l ? l : m;
    }
    f = It(fv || (fv = jt(["M", ",", ""])), e, t + u * d[0]), d[0] > 0 && (f += It(dv || (dv = jt(["A ", ",", ",0,0,", ",", ",", ""])), d[0], d[0], c, e + s * d[0], t)), f += It(vv || (vv = jt(["L ", ",", ""])), e + r - s * d[1], t), d[1] > 0 && (f += It(pv || (pv = jt(["A ", ",", ",0,0,", `,
        `, ",", ""])), d[1], d[1], c, e + r, t + u * d[1])), f += It(hv || (hv = jt(["L ", ",", ""])), e + r, t + n - u * d[2]), d[2] > 0 && (f += It(mv || (mv = jt(["A ", ",", ",0,0,", `,
        `, ",", ""])), d[2], d[2], c, e + r - s * d[2], t + n)), f += It(yv || (yv = jt(["L ", ",", ""])), e + s * d[3], t + n), d[3] > 0 && (f += It(gv || (gv = jt(["A ", ",", ",0,0,", `,
        `, ",", ""])), d[3], d[3], c, e, t + n - u * d[3])), f += "Z";
  } else if (l > 0 && i === +i && i > 0) {
    var g = Math.min(l, i);
    f = It(bv || (bv = jt(["M ", ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", " Z"])), e, t + u * g, g, g, c, e + s * g, t, e + r - s * g, t, g, g, c, e + r, t + u * g, e + r, t + n - u * g, g, g, c, e + r - s * g, t + n, e + s * g, t + n, g, g, c, e, t + n - u * g);
  } else
    f = It(xv || (xv = jt(["M ", ",", " h ", " v ", " h ", " Z"])), e, t, r, n, -r);
  return f;
}, Sv = {
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
}, kE = (e) => {
  var t = Ct(e, Sv), r = p.useRef(null), [n, i] = p.useState(-1);
  p.useEffect(() => {
    if (r.current && r.current.getTotalLength)
      try {
        var H = r.current.getTotalLength();
        H && i(H);
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
    isAnimationActive: h,
    isUpdateAnimationActive: y
  } = t, m = p.useRef(l), g = p.useRef(u), x = p.useRef(a), b = p.useRef(o), w = p.useMemo(() => ({
    x: a,
    y: o,
    width: l,
    height: u,
    radius: s
  }), [a, o, l, u, s]), P = ib(w, "rectangle-");
  if (a !== +a || o !== +o || l !== +l || u !== +u || l === 0 || u === 0)
    return null;
  var O = ee("recharts-rectangle", c);
  if (!y) {
    var S = _t(t), {
      radius: A
    } = S, C = Pv(S, OE);
    return /* @__PURE__ */ p.createElement("path", Po({}, C, {
      x: Er(a),
      y: Er(o),
      width: Er(l),
      height: Er(u),
      radius: typeof s == "number" ? s : void 0,
      className: O,
      d: Av(a, o, l, u, s)
    }));
  }
  var $ = m.current, j = g.current, k = x.current, F = b.current, W = "0px ".concat(n === -1 ? 1 : n, "px"), K = "".concat(n, "px ").concat(n, "px"), Y = rE(["strokeDasharray"], d, typeof f == "string" ? f : Sv.animationEasing);
  return /* @__PURE__ */ p.createElement(nb, {
    animationId: P,
    key: P,
    canBegin: n > 0,
    duration: d,
    easing: f,
    isActive: y,
    begin: v
  }, (H) => {
    var ne = Rt($, l, H), J = Rt(j, u, H), D = Rt(k, a, H), Ee = Rt(F, o, H);
    r.current && (m.current = ne, g.current = J, x.current = D, b.current = Ee);
    var ie;
    h ? H > 0 ? ie = {
      transition: Y,
      strokeDasharray: K
    } : ie = {
      strokeDasharray: W
    } : ie = {
      strokeDasharray: K
    };
    var Te = _t(t), {
      radius: ge
    } = Te, ae = Pv(Te, PE);
    return /* @__PURE__ */ p.createElement("path", Po({}, ae, {
      radius: typeof s == "number" ? s : void 0,
      className: O,
      d: Av(D, Ee, ne, J, s),
      ref: r,
      style: Ov(Ov({}, ie), t.style)
    }));
  });
};
function _v(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ev(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _v(Object(r), !0).forEach(function(n) {
      CE(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _v(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function CE(e, t, r) {
  return (t = $E(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function $E(e) {
  var t = IE(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function IE(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var kv = Math.PI / 180, jE = (e) => e * 180 / Math.PI, Fn = (e, t, r, n) => ({
  x: e + Math.cos(-kv * n) * r,
  y: t + Math.sin(-kv * n) * r
}), ME = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(t - (n.left || 0) - (n.right || 0)), Math.abs(r - (n.top || 0) - (n.bottom || 0))) / 2;
}, DE = (e, t) => {
  var {
    x: r,
    y: n
  } = e, {
    x: i,
    y: a
  } = t;
  return Math.sqrt((r - i) ** 2 + (n - a) ** 2);
}, TE = (e, t) => {
  var {
    x: r,
    y: n
  } = e, {
    cx: i,
    cy: a
  } = t, o = DE({
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
    angle: jE(u),
    angleInRadian: u
  };
}, NE = (e) => {
  var {
    startAngle: t,
    endAngle: r
  } = e, n = Math.floor(t / 360), i = Math.floor(r / 360), a = Math.min(n, i);
  return {
    startAngle: t - a * 360,
    endAngle: r - a * 360
  };
}, LE = (e, t) => {
  var {
    startAngle: r,
    endAngle: n
  } = t, i = Math.floor(r / 360), a = Math.floor(n / 360), o = Math.min(i, a);
  return e + o * 360;
}, RE = (e, t) => {
  var {
    relativeX: r,
    relativeY: n
  } = e, {
    radius: i,
    angle: a
  } = TE({
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
  } = NE(t), c = a, f;
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
  return f ? Ev(Ev({}, t), {}, {
    radius: i,
    angle: LE(c, t)
  }) : null;
};
function zE(e) {
  return ig(e) ? NaN : Number(e);
}
function Au(e) {
  return e ? (e = zE(e), e === 1 / 0 || e === -1 / 0 ? (e < 0 ? -1 : 1) * Number.MAX_VALUE : e === e ? e : 0) : e === 0 ? e : 0;
}
function Cl(e, t, r) {
  r && typeof r != "number" && Ju(e, t, r) && (t = r = void 0), e = Au(e), t === void 0 ? (t = e, e = 0) : t = Au(t), r = r === void 0 ? e < t ? 1 : -1 : Au(r);
  const n = Math.max(Math.ceil((t - e) / (r || 1)), 0), i = new Array(n);
  for (let a = 0; a < n; a++)
    i[a] = e, e += r;
  return i;
}
var hr = (e) => e.chartData, ab = _([hr], (e) => {
  var t = e.chartData != null ? e.chartData.length - 1 : 0;
  return {
    chartData: e.chartData,
    computedData: e.computedData,
    dataEndIndex: t,
    dataStartIndex: 0
  };
}), ob = (e, t, r, n) => n ? ab(e) : hr(e), BE = (e, t, r) => r ? ab(e) : hr(e);
function Ht(e) {
  if (Array.isArray(e) && e.length === 2) {
    var [t, r] = e;
    if (Z(t) && Z(r))
      return !0;
  }
  return !1;
}
function Cv(e, t, r) {
  return r ? e : [Math.min(e[0], t[0]), Math.max(e[1], t[1])];
}
function lb(e, t) {
  if (t && typeof e != "function" && Array.isArray(e) && e.length === 2) {
    var [r, n] = e, i, a;
    if (Z(r))
      i = r;
    else if (typeof r == "function")
      return;
    if (Z(n))
      a = n;
    else if (typeof n == "function")
      return;
    var o = [i, a];
    if (Ht(o))
      return o;
  }
}
function FE(e, t, r) {
  if (!(!r && t == null)) {
    if (typeof e == "function" && t != null)
      try {
        var n = e(t, r);
        if (Ht(n))
          return Cv(n, t, r);
      } catch {
      }
    if (Array.isArray(e) && e.length === 2) {
      var [i, a] = e, o, l;
      if (i === "auto")
        t != null && (o = Math.min(...t));
      else if (U(i))
        o = i;
      else if (typeof i == "function")
        try {
          t != null && (o = i(t?.[0]));
        } catch {
        }
      else if (typeof i == "string" && Rd.test(i)) {
        var u = Rd.exec(i);
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
      else if (U(a))
        l = a;
      else if (typeof a == "function")
        try {
          t != null && (l = a(t?.[1]));
        } catch {
        }
      else if (typeof a == "string" && zd.test(a)) {
        var c = zd.exec(a);
        if (c == null || c[1] == null || t == null)
          l = void 0;
        else {
          var f = +c[1];
          l = t[1] + f;
        }
      } else
        l = t?.[1];
      var d = [o, l];
      if (Ht(d))
        return t == null ? d : Cv(d, t, r);
    }
  }
}
var Qn = 1e9, WE = {
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
}, Pc, fe = !0, mt = "[DecimalError] ", on = mt + "Invalid argument: ", Oc = mt + "Exponent out of range: ", Jn = Math.floor, Xr = Math.pow, KE = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, nt, Ce = 1e7, se = 7, ub = 9007199254740991, Ao = Jn(ub / se), z = {};
z.absoluteValue = z.abs = function() {
  var e = new this.constructor(this);
  return e.s && (e.s = 1), e;
};
z.comparedTo = z.cmp = function(e) {
  var t, r, n, i, a = this;
  if (e = new a.constructor(e), a.s !== e.s) return a.s || -e.s;
  if (a.e !== e.e) return a.e > e.e ^ a.s < 0 ? 1 : -1;
  for (n = a.d.length, i = e.d.length, t = 0, r = n < i ? n : i; t < r; ++t)
    if (a.d[t] !== e.d[t]) return a.d[t] > e.d[t] ^ a.s < 0 ? 1 : -1;
  return n === i ? 0 : n > i ^ a.s < 0 ? 1 : -1;
};
z.decimalPlaces = z.dp = function() {
  var e = this, t = e.d.length - 1, r = (t - e.e) * se;
  if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) r--;
  return r < 0 ? 0 : r;
};
z.dividedBy = z.div = function(e) {
  return nr(this, new this.constructor(e));
};
z.dividedToIntegerBy = z.idiv = function(e) {
  var t = this, r = t.constructor;
  return oe(nr(t, new r(e), 0, 1), r.precision);
};
z.equals = z.eq = function(e) {
  return !this.cmp(e);
};
z.exponent = function() {
  return he(this);
};
z.greaterThan = z.gt = function(e) {
  return this.cmp(e) > 0;
};
z.greaterThanOrEqualTo = z.gte = function(e) {
  return this.cmp(e) >= 0;
};
z.isInteger = z.isint = function() {
  return this.e > this.d.length - 2;
};
z.isNegative = z.isneg = function() {
  return this.s < 0;
};
z.isPositive = z.ispos = function() {
  return this.s > 0;
};
z.isZero = function() {
  return this.s === 0;
};
z.lessThan = z.lt = function(e) {
  return this.cmp(e) < 0;
};
z.lessThanOrEqualTo = z.lte = function(e) {
  return this.cmp(e) < 1;
};
z.logarithm = z.log = function(e) {
  var t, r = this, n = r.constructor, i = n.precision, a = i + 5;
  if (e === void 0)
    e = new n(10);
  else if (e = new n(e), e.s < 1 || e.eq(nt)) throw Error(mt + "NaN");
  if (r.s < 1) throw Error(mt + (r.s ? "NaN" : "-Infinity"));
  return r.eq(nt) ? new n(0) : (fe = !1, t = nr(Li(r, a), Li(e, a), a), fe = !0, oe(t, i));
};
z.minus = z.sub = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? fb(t, e) : sb(t, (e.s = -e.s, e));
};
z.modulo = z.mod = function(e) {
  var t, r = this, n = r.constructor, i = n.precision;
  if (e = new n(e), !e.s) throw Error(mt + "NaN");
  return r.s ? (fe = !1, t = nr(r, e, 0, 1).times(e), fe = !0, r.minus(t)) : oe(new n(r), i);
};
z.naturalExponential = z.exp = function() {
  return cb(this);
};
z.naturalLogarithm = z.ln = function() {
  return Li(this);
};
z.negated = z.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s || 0, e;
};
z.plus = z.add = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? sb(t, e) : fb(t, (e.s = -e.s, e));
};
z.precision = z.sd = function(e) {
  var t, r, n, i = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(on + e);
  if (t = he(i) + 1, n = i.d.length - 1, r = n * se + 1, n = i.d[n], n) {
    for (; n % 10 == 0; n /= 10) r--;
    for (n = i.d[0]; n >= 10; n /= 10) r++;
  }
  return e && t > r ? t : r;
};
z.squareRoot = z.sqrt = function() {
  var e, t, r, n, i, a, o, l = this, u = l.constructor;
  if (l.s < 1) {
    if (!l.s) return new u(0);
    throw Error(mt + "NaN");
  }
  for (e = he(l), fe = !1, i = Math.sqrt(+l), i == 0 || i == 1 / 0 ? (t = Ft(l.d), (t.length + e) % 2 == 0 && (t += "0"), i = Math.sqrt(t), e = Jn((e + 1) / 2) - (e < 0 || e % 2), i == 1 / 0 ? t = "5e" + e : (t = i.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new u(t)) : n = new u(i.toString()), r = u.precision, i = o = r + 3; ; )
    if (a = n, n = a.plus(nr(l, a, o + 2)).times(0.5), Ft(a.d).slice(0, o) === (t = Ft(n.d)).slice(0, o)) {
      if (t = t.slice(o - 3, o + 1), i == o && t == "4999") {
        if (oe(a, r + 1, 0), a.times(a).eq(l)) {
          n = a;
          break;
        }
      } else if (t != "9999")
        break;
      o += 4;
    }
  return fe = !0, oe(n, r);
};
z.times = z.mul = function(e) {
  var t, r, n, i, a, o, l, u, s, c = this, f = c.constructor, d = c.d, v = (e = new f(e)).d;
  if (!c.s || !e.s) return new f(0);
  for (e.s *= c.s, r = c.e + e.e, u = d.length, s = v.length, u < s && (a = d, d = v, v = a, o = u, u = s, s = o), a = [], o = u + s, n = o; n--; ) a.push(0);
  for (n = s; --n >= 0; ) {
    for (t = 0, i = u + n; i > n; )
      l = a[i] + v[n] * d[i - n - 1] + t, a[i--] = l % Ce | 0, t = l / Ce | 0;
    a[i] = (a[i] + t) % Ce | 0;
  }
  for (; !a[--o]; ) a.pop();
  return t ? ++r : a.shift(), e.d = a, e.e = r, fe ? oe(e, f.precision) : e;
};
z.toDecimalPlaces = z.todp = function(e, t) {
  var r = this, n = r.constructor;
  return r = new n(r), e === void 0 ? r : (Vt(e, 0, Qn), t === void 0 ? t = n.rounding : Vt(t, 0, 8), oe(r, e + he(r) + 1, t));
};
z.toExponential = function(e, t) {
  var r, n = this, i = n.constructor;
  return e === void 0 ? r = vn(n, !0) : (Vt(e, 0, Qn), t === void 0 ? t = i.rounding : Vt(t, 0, 8), n = oe(new i(n), e + 1, t), r = vn(n, !0, e + 1)), r;
};
z.toFixed = function(e, t) {
  var r, n, i = this, a = i.constructor;
  return e === void 0 ? vn(i) : (Vt(e, 0, Qn), t === void 0 ? t = a.rounding : Vt(t, 0, 8), n = oe(new a(i), e + he(i) + 1, t), r = vn(n.abs(), !1, e + he(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r);
};
z.toInteger = z.toint = function() {
  var e = this, t = e.constructor;
  return oe(new t(e), he(e) + 1, t.rounding);
};
z.toNumber = function() {
  return +this;
};
z.toPower = z.pow = function(e) {
  var t, r, n, i, a, o, l = this, u = l.constructor, s = 12, c = +(e = new u(e));
  if (!e.s) return new u(nt);
  if (l = new u(l), !l.s) {
    if (e.s < 1) throw Error(mt + "Infinity");
    return l;
  }
  if (l.eq(nt)) return l;
  if (n = u.precision, e.eq(nt)) return oe(l, n);
  if (t = e.e, r = e.d.length - 1, o = t >= r, a = l.s, o) {
    if ((r = c < 0 ? -c : c) <= ub) {
      for (i = new u(nt), t = Math.ceil(n / se + 4), fe = !1; r % 2 && (i = i.times(l), Iv(i.d, t)), r = Jn(r / 2), r !== 0; )
        l = l.times(l), Iv(l.d, t);
      return fe = !0, e.s < 0 ? new u(nt).div(i) : oe(i, n);
    }
  } else if (a < 0) throw Error(mt + "NaN");
  return a = a < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1, l.s = 1, fe = !1, i = e.times(Li(l, n + s)), fe = !0, i = cb(i), i.s = a, i;
};
z.toPrecision = function(e, t) {
  var r, n, i = this, a = i.constructor;
  return e === void 0 ? (r = he(i), n = vn(i, r <= a.toExpNeg || r >= a.toExpPos)) : (Vt(e, 1, Qn), t === void 0 ? t = a.rounding : Vt(t, 0, 8), i = oe(new a(i), e, t), r = he(i), n = vn(i, e <= r || r <= a.toExpNeg, e)), n;
};
z.toSignificantDigits = z.tosd = function(e, t) {
  var r = this, n = r.constructor;
  return e === void 0 ? (e = n.precision, t = n.rounding) : (Vt(e, 1, Qn), t === void 0 ? t = n.rounding : Vt(t, 0, 8)), oe(new n(r), e, t);
};
z.toString = z.valueOf = z.val = z.toJSON = z[Symbol.for("nodejs.util.inspect.custom")] = function() {
  var e = this, t = he(e), r = e.constructor;
  return vn(e, t <= r.toExpNeg || t >= r.toExpPos);
};
function sb(e, t) {
  var r, n, i, a, o, l, u, s, c = e.constructor, f = c.precision;
  if (!e.s || !t.s)
    return t.s || (t = new c(e)), fe ? oe(t, f) : t;
  if (u = e.d, s = t.d, o = e.e, i = t.e, u = u.slice(), a = o - i, a) {
    for (a < 0 ? (n = u, a = -a, l = s.length) : (n = s, i = o, l = u.length), o = Math.ceil(f / se), l = o > l ? o + 1 : l + 1, a > l && (a = l, n.length = 1), n.reverse(); a--; ) n.push(0);
    n.reverse();
  }
  for (l = u.length, a = s.length, l - a < 0 && (a = l, n = s, s = u, u = n), r = 0; a; )
    r = (u[--a] = u[a] + s[a] + r) / Ce | 0, u[a] %= Ce;
  for (r && (u.unshift(r), ++i), l = u.length; u[--l] == 0; ) u.pop();
  return t.d = u, t.e = i, fe ? oe(t, f) : t;
}
function Vt(e, t, r) {
  if (e !== ~~e || e < t || e > r)
    throw Error(on + e);
}
function Ft(e) {
  var t, r, n, i = e.length - 1, a = "", o = e[0];
  if (i > 0) {
    for (a += o, t = 1; t < i; t++)
      n = e[t] + "", r = se - n.length, r && (a += Or(r)), a += n;
    o = e[t], n = o + "", r = se - n.length, r && (a += Or(r));
  } else if (o === 0)
    return "0";
  for (; o % 10 === 0; ) o /= 10;
  return a + o;
}
var nr = /* @__PURE__ */ (function() {
  function e(n, i) {
    var a, o = 0, l = n.length;
    for (n = n.slice(); l--; )
      a = n[l] * i + o, n[l] = a % Ce | 0, o = a / Ce | 0;
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
      n[a] -= o, o = n[a] < i[a] ? 1 : 0, n[a] = o * Ce + n[a] - i[a];
    for (; !n[0] && n.length > 1; ) n.shift();
  }
  return function(n, i, a, o) {
    var l, u, s, c, f, d, v, h, y, m, g, x, b, w, P, O, S, A, C = n.constructor, $ = n.s == i.s ? 1 : -1, j = n.d, k = i.d;
    if (!n.s) return new C(n);
    if (!i.s) throw Error(mt + "Division by zero");
    for (u = n.e - i.e, S = k.length, P = j.length, v = new C($), h = v.d = [], s = 0; k[s] == (j[s] || 0); ) ++s;
    if (k[s] > (j[s] || 0) && --u, a == null ? x = a = C.precision : o ? x = a + (he(n) - he(i)) + 1 : x = a, x < 0) return new C(0);
    if (x = x / se + 2 | 0, s = 0, S == 1)
      for (c = 0, k = k[0], x++; (s < P || c) && x--; s++)
        b = c * Ce + (j[s] || 0), h[s] = b / k | 0, c = b % k | 0;
    else {
      for (c = Ce / (k[0] + 1) | 0, c > 1 && (k = e(k, c), j = e(j, c), S = k.length, P = j.length), w = S, y = j.slice(0, S), m = y.length; m < S; ) y[m++] = 0;
      A = k.slice(), A.unshift(0), O = k[0], k[1] >= Ce / 2 && ++O;
      do
        c = 0, l = t(k, y, S, m), l < 0 ? (g = y[0], S != m && (g = g * Ce + (y[1] || 0)), c = g / O | 0, c > 1 ? (c >= Ce && (c = Ce - 1), f = e(k, c), d = f.length, m = y.length, l = t(f, y, d, m), l == 1 && (c--, r(f, S < d ? A : k, d))) : (c == 0 && (l = c = 1), f = k.slice()), d = f.length, d < m && f.unshift(0), r(y, f, m), l == -1 && (m = y.length, l = t(k, y, S, m), l < 1 && (c++, r(y, S < m ? A : k, m))), m = y.length) : l === 0 && (c++, y = [0]), h[s++] = c, l && y[0] ? y[m++] = j[w] || 0 : (y = [j[w]], m = 1);
      while ((w++ < P || y[0] !== void 0) && x--);
    }
    return h[0] || h.shift(), v.e = u, oe(v, o ? a + he(v) + 1 : a);
  };
})();
function cb(e, t) {
  var r, n, i, a, o, l, u = 0, s = 0, c = e.constructor, f = c.precision;
  if (he(e) > 16) throw Error(Oc + he(e));
  if (!e.s) return new c(nt);
  for (fe = !1, l = f, o = new c(0.03125); e.abs().gte(0.1); )
    e = e.times(o), s += 5;
  for (n = Math.log(Xr(2, s)) / Math.LN10 * 2 + 5 | 0, l += n, r = i = a = new c(nt), c.precision = l; ; ) {
    if (i = oe(i.times(e), l), r = r.times(++u), o = a.plus(nr(i, r, l)), Ft(o.d).slice(0, l) === Ft(a.d).slice(0, l)) {
      for (; s--; ) a = oe(a.times(a), l);
      return c.precision = f, t == null ? (fe = !0, oe(a, f)) : a;
    }
    a = o;
  }
}
function he(e) {
  for (var t = e.e * se, r = e.d[0]; r >= 10; r /= 10) t++;
  return t;
}
function Su(e, t, r) {
  if (t > e.LN10.sd())
    throw fe = !0, r && (e.precision = r), Error(mt + "LN10 precision limit exceeded");
  return oe(new e(e.LN10), t);
}
function Or(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function Li(e, t) {
  var r, n, i, a, o, l, u, s, c, f = 1, d = 10, v = e, h = v.d, y = v.constructor, m = y.precision;
  if (v.s < 1) throw Error(mt + (v.s ? "NaN" : "-Infinity"));
  if (v.eq(nt)) return new y(0);
  if (t == null ? (fe = !1, s = m) : s = t, v.eq(10))
    return t == null && (fe = !0), Su(y, s);
  if (s += d, y.precision = s, r = Ft(h), n = r.charAt(0), a = he(v), Math.abs(a) < 15e14) {
    for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; )
      v = v.times(e), r = Ft(v.d), n = r.charAt(0), f++;
    a = he(v), n > 1 ? (v = new y("0." + r), a++) : v = new y(n + "." + r.slice(1));
  } else
    return u = Su(y, s + 2, m).times(a + ""), v = Li(new y(n + "." + r.slice(1)), s - d).plus(u), y.precision = m, t == null ? (fe = !0, oe(v, m)) : v;
  for (l = o = v = nr(v.minus(nt), v.plus(nt), s), c = oe(v.times(v), s), i = 3; ; ) {
    if (o = oe(o.times(c), s), u = l.plus(nr(o, new y(i), s)), Ft(u.d).slice(0, s) === Ft(l.d).slice(0, s))
      return l = l.times(2), a !== 0 && (l = l.plus(Su(y, s + 2, m).times(a + ""))), l = nr(l, new y(f), s), y.precision = m, t == null ? (fe = !0, oe(l, m)) : l;
    l = u, i += 2;
  }
}
function $v(e, t) {
  var r, n, i;
  for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; ) ++n;
  for (i = t.length; t.charCodeAt(i - 1) === 48; ) --i;
  if (t = t.slice(n, i), t) {
    if (i -= n, r = r - n - 1, e.e = Jn(r / se), e.d = [], n = (r + 1) % se, r < 0 && (n += se), n < i) {
      for (n && e.d.push(+t.slice(0, n)), i -= se; n < i; ) e.d.push(+t.slice(n, n += se));
      t = t.slice(n), n = se - t.length;
    } else
      n -= i;
    for (; n--; ) t += "0";
    if (e.d.push(+t), fe && (e.e > Ao || e.e < -Ao)) throw Error(Oc + r);
  } else
    e.s = 0, e.e = 0, e.d = [0];
  return e;
}
function oe(e, t, r) {
  var n, i, a, o, l, u, s, c, f = e.d;
  for (o = 1, a = f[0]; a >= 10; a /= 10) o++;
  if (n = t - o, n < 0)
    n += se, i = t, s = f[c = 0];
  else {
    if (c = Math.ceil((n + 1) / se), a = f.length, c >= a) return e;
    for (s = a = f[c], o = 1; a >= 10; a /= 10) o++;
    n %= se, i = n - se + o;
  }
  if (r !== void 0 && (a = Xr(10, o - i - 1), l = s / a % 10 | 0, u = t < 0 || f[c + 1] !== void 0 || s % a, u = r < 4 ? (l || u) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : l > 5 || l == 5 && (r == 4 || u || r == 6 && // Check whether the digit to the left of the rounding digit is odd.
  (n > 0 ? i > 0 ? s / Xr(10, o - i) : 0 : f[c - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7))), t < 1 || !f[0])
    return u ? (a = he(e), f.length = 1, t = t - a - 1, f[0] = Xr(10, (se - t % se) % se), e.e = Jn(-t / se) || 0) : (f.length = 1, f[0] = e.e = e.s = 0), e;
  if (n == 0 ? (f.length = c, a = 1, c--) : (f.length = c + 1, a = Xr(10, se - n), f[c] = i > 0 ? (s / Xr(10, o - i) % Xr(10, i) | 0) * a : 0), u)
    for (; ; )
      if (c == 0) {
        (f[0] += a) == Ce && (f[0] = 1, ++e.e);
        break;
      } else {
        if (f[c] += a, f[c] != Ce) break;
        f[c--] = 0, a = 1;
      }
  for (n = f.length; f[--n] === 0; ) f.pop();
  if (fe && (e.e > Ao || e.e < -Ao))
    throw Error(Oc + he(e));
  return e;
}
function fb(e, t) {
  var r, n, i, a, o, l, u, s, c, f, d = e.constructor, v = d.precision;
  if (!e.s || !t.s)
    return t.s ? t.s = -t.s : t = new d(e), fe ? oe(t, v) : t;
  if (u = e.d, f = t.d, n = t.e, s = e.e, u = u.slice(), o = s - n, o) {
    for (c = o < 0, c ? (r = u, o = -o, l = f.length) : (r = f, n = s, l = u.length), i = Math.max(Math.ceil(v / se), l) + 2, o > i && (o = i, r.length = 1), r.reverse(), i = o; i--; ) r.push(0);
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
      for (a = i; a && u[--a] === 0; ) u[a] = Ce - 1;
      --u[a], u[i] += Ce;
    }
    u[i] -= f[i];
  }
  for (; u[--l] === 0; ) u.pop();
  for (; u[0] === 0; u.shift()) --n;
  return u[0] ? (t.d = u, t.e = n, fe ? oe(t, v) : t) : new d(0);
}
function vn(e, t, r) {
  var n, i = he(e), a = Ft(e.d), o = a.length;
  return t ? (r && (n = r - o) > 0 ? a = a.charAt(0) + "." + a.slice(1) + Or(n) : o > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (i < 0 ? "e" : "e+") + i) : i < 0 ? (a = "0." + Or(-i - 1) + a, r && (n = r - o) > 0 && (a += Or(n))) : i >= o ? (a += Or(i + 1 - o), r && (n = r - i - 1) > 0 && (a = a + "." + Or(n))) : ((n = i + 1) < o && (a = a.slice(0, n) + "." + a.slice(n)), r && (n = r - o) > 0 && (i + 1 === o && (a += "."), a += Or(n))), e.s < 0 ? "-" + a : a;
}
function Iv(e, t) {
  if (e.length > t)
    return e.length = t, !0;
}
function db(e) {
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
        throw Error(on + a);
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
      return $v(o, a.toString());
    } else if (typeof a != "string")
      throw Error(on + a);
    if (a.charCodeAt(0) === 45 ? (a = a.slice(1), o.s = -1) : o.s = 1, KE.test(a)) $v(o, a);
    else throw Error(on + a);
  }
  if (i.prototype = z, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = db, i.config = i.set = UE, e === void 0 && (e = {}), e)
    for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
  return i.config(e), i;
}
function UE(e) {
  if (!e || typeof e != "object")
    throw Error(mt + "Object expected");
  var t, r, n, i = [
    "precision",
    1,
    Qn,
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
      if (Jn(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n;
      else throw Error(on + r + ": " + n);
  if ((n = e[r = "LN10"]) !== void 0)
    if (n == Math.LN10) this[r] = new this(n);
    else throw Error(on + r + ": " + n);
  return this;
}
var Pc = db(WE);
nt = new Pc(1);
const N = Pc;
function vb(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new N(e).abs().log(10).toNumber()) + 1, t;
}
function pb(e, t, r) {
  for (var n = new N(e), i = 0, a = []; n.lt(t) && i < 1e5; )
    a.push(n.toNumber()), n = n.add(r), i++;
  return a;
}
var hb = (e) => {
  var [t, r] = e, [n, i] = [t, r];
  return t > r && ([n, i] = [r, t]), [n, i];
}, Ac = (e, t, r) => {
  if (e.lte(0))
    return new N(0);
  var n = vb(e.toNumber()), i = new N(10).pow(n), a = e.div(i), o = n !== 1 ? 0.05 : 0.1, l = new N(Math.ceil(a.div(o).toNumber())).add(r).mul(o), u = l.mul(i);
  return t ? new N(u.toNumber()) : new N(Math.ceil(u.toNumber()));
}, mb = (e, t, r) => {
  var n;
  if (e.lte(0))
    return new N(0);
  var i = [1, 2, 2.5, 5], a = e.toNumber(), o = Math.floor(new N(a).abs().log(10).toNumber()), l = new N(10).pow(o), u = e.div(l).toNumber(), s = i.findIndex((v) => v >= u - 1e-10);
  if (s === -1 && (l = l.mul(10), s = 0), s += r, s >= i.length) {
    var c = Math.floor(s / i.length);
    s %= i.length, l = l.mul(new N(10).pow(c));
  }
  var f = (n = i[s]) !== null && n !== void 0 ? n : 1, d = new N(f).mul(l);
  return t ? d : new N(Math.ceil(d.toNumber()));
}, HE = (e, t, r) => {
  var n = new N(1), i = new N(e);
  if (!i.isint() && r) {
    var a = Math.abs(e);
    a < 1 ? (n = new N(10).pow(vb(e) - 1), i = new N(Math.floor(i.div(n).toNumber())).mul(n)) : a > 1 && (i = new N(Math.floor(e)));
  } else e === 0 ? i = new N(Math.floor((t - 1) / 2)) : r || (i = new N(Math.floor(e)));
  for (var o = Math.floor((t - 1) / 2), l = [], u = 0; u < t; u++)
    l.push(i.add(new N(u - o).mul(n)).toNumber());
  return l;
}, yb = function(t, r, n, i) {
  var a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0, o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : Ac;
  if (!Number.isFinite((r - t) / (n - 1)))
    return {
      step: new N(0),
      tickMin: new N(0),
      tickMax: new N(0)
    };
  var l = o(new N(r).sub(t).div(n - 1), i, a), u;
  t <= 0 && r >= 0 ? u = new N(0) : (u = new N(t).add(r).div(2), u = u.sub(new N(u).mod(l)));
  var s = Math.ceil(u.sub(t).div(l).toNumber()), c = Math.ceil(new N(r).sub(u).div(l).toNumber()), f = s + c + 1;
  return f > n ? yb(t, r, n, i, a + 1, o) : (f < n && (c = r > 0 ? c + (n - f) : c, s = r > 0 ? s : s + (n - f)), {
    step: l,
    tickMin: u.sub(new N(s).mul(l)),
    tickMax: u.add(new N(c).mul(l))
  });
}, jv = function(t) {
  var [r, n] = t, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", l = Math.max(i, 2), [u, s] = hb([r, n]);
  if (u === -1 / 0 || s === 1 / 0) {
    var c = s === 1 / 0 ? [u, ...Array(i - 1).fill(1 / 0)] : [...Array(i - 1).fill(-1 / 0), s];
    return r > n ? c.reverse() : c;
  }
  if (u === s)
    return HE(u, i, a);
  var f = o === "snap125" ? mb : Ac, {
    step: d,
    tickMin: v,
    tickMax: h
  } = yb(u, s, l, a, 0, f), y = pb(v, h.add(new N(0.1).mul(d)), d);
  return r > n ? y.reverse() : y;
}, Mv = function(t, r) {
  var [n, i] = t, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", [l, u] = hb([n, i]);
  if (l === -1 / 0 || u === 1 / 0)
    return [n, i];
  if (l === u)
    return [l];
  var s = o === "snap125" ? mb : Ac, c = Math.max(r, 2), f = s(new N(u).sub(l).div(c - 1), a, 0), d = [...pb(new N(l), new N(u), f), u];
  return a === !1 && (d = d.map((v) => Math.round(v))), n > i ? d.reverse() : d;
}, GE = (e) => e.rootProps.barCategoryGap, $l = (e) => e.rootProps.stackOffset, gb = (e) => e.rootProps.reverseStackOrder, Sc = (e) => e.options.chartName, bb = (e) => e.rootProps.syncId, qE = (e) => e.rootProps.syncMethod, xb = (e) => e.options.eventEmitter, YE = (e) => e.rootProps.baseValue, yt = {
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
}, Wr = {
  allowDecimals: !1,
  // if I set this to false then Tooltip synchronisation stops working in Radar, wtf
  allowDataOverflow: !1,
  angleAxisId: 0,
  reversed: !1,
  scale: "auto",
  tick: !0,
  type: "auto"
}, Mt = {
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
}, Il = (e, t) => {
  if (!(!e || !t))
    return e != null && e.reversed ? [t[1], t[0]] : t;
};
function jl(e, t, r) {
  if (r !== "auto")
    return r;
  if (e != null)
    return Xt(e, t) ? "category" : "number";
}
function Dv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function So(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Dv(Object(r), !0).forEach(function(n) {
      VE(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Dv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function VE(e, t, r) {
  return (t = XE(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function XE(e) {
  var t = ZE(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function ZE(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Tv = {
  allowDataOverflow: Wr.allowDataOverflow,
  allowDecimals: Wr.allowDecimals,
  allowDuplicatedCategory: !1,
  // defaultPolarAngleAxisProps.allowDuplicatedCategory has it set to true but the actual axis rendering ignores the prop because reasons,
  dataKey: void 0,
  domain: void 0,
  id: Wr.angleAxisId,
  includeHidden: !1,
  name: void 0,
  reversed: Wr.reversed,
  scale: Wr.scale,
  tick: Wr.tick,
  tickCount: void 0,
  ticks: void 0,
  type: Wr.type,
  unit: void 0,
  niceTicks: "auto"
}, Nv = {
  allowDataOverflow: Mt.allowDataOverflow,
  allowDecimals: Mt.allowDecimals,
  allowDuplicatedCategory: Mt.allowDuplicatedCategory,
  dataKey: void 0,
  domain: void 0,
  id: Mt.radiusAxisId,
  includeHidden: Mt.includeHidden,
  name: void 0,
  reversed: Mt.reversed,
  scale: Mt.scale,
  tick: Mt.tick,
  tickCount: Mt.tickCount,
  ticks: void 0,
  type: Mt.type,
  unit: void 0,
  niceTicks: "auto"
}, QE = (e, t) => {
  if (t != null)
    return e.polarAxis.angleAxis[t];
}, _c = _([QE, Hg], (e, t) => {
  var r;
  if (e != null)
    return e;
  var n = (r = jl(t, "angleAxis", Tv.type)) !== null && r !== void 0 ? r : "category";
  return So(So({}, Tv), {}, {
    type: n
  });
}), JE = (e, t) => e.polarAxis.radiusAxis[t], Ec = _([JE, Hg], (e, t) => {
  var r;
  if (e != null)
    return e;
  var n = (r = jl(t, "radiusAxis", Nv.type)) !== null && r !== void 0 ? r : "category";
  return So(So({}, Nv), {}, {
    type: n
  });
}), Ml = (e) => e.polarOptions, kc = _([vr, pr, Fe], ME), wb = _([Ml, kc], (e, t) => {
  if (e != null)
    return sn(e.innerRadius, t, 0);
}), Ob = _([Ml, kc], (e, t) => {
  if (e != null)
    return sn(e.outerRadius, t, t * 0.8);
}), ek = (e) => {
  if (e == null)
    return [0, 0];
  var {
    startAngle: t,
    endAngle: r
  } = e;
  return [t, r];
}, Pb = _([Ml], ek);
_([_c, Pb], Il);
var Ab = _([kc, wb, Ob], (e, t, r) => {
  if (!(e == null || t == null || r == null))
    return [t, r];
});
_([Ec, Ab], Il);
var Sb = _([de, Ml, wb, Ob, vr, pr], (e, t, r, n, i, a) => {
  if (!(e !== "centric" && e !== "radial" || t == null || r == null || n == null)) {
    var {
      cx: o,
      cy: l,
      startAngle: u,
      endAngle: s
    } = t;
    return {
      cx: sn(o, i, i / 2),
      cy: sn(l, a, a / 2),
      innerRadius: r,
      outerRadius: n,
      startAngle: u,
      endAngle: s,
      clockWise: !1
      // this property look useful, why not use it?
    };
  }
}), $e = (e, t) => t, Dl = (e, t, r) => r;
function Cc(e) {
  return e?.id;
}
function _b(e, t, r) {
  var {
    chartData: n = []
  } = t, {
    allowDuplicatedCategory: i,
    dataKey: a
  } = r, o = /* @__PURE__ */ new Map();
  return e.forEach((l) => {
    var u, s = (u = l.data) !== null && u !== void 0 ? u : n;
    if (!(s == null || s.length === 0)) {
      var c = Cc(l);
      s.forEach((f, d) => {
        var v = a == null || i ? d : String(Be(f, a, null)), h = Be(f, l.dataKey, 0), y;
        o.has(v) ? y = o.get(v) : y = {}, Object.assign(y, {
          [c]: h
        }), o.set(v, y);
      });
    }
  }), Array.from(o.values());
}
function $c(e) {
  return "stackId" in e && e.stackId != null && e.dataKey != null;
}
var Tl = (e, t) => e === t ? !0 : e == null || t == null ? !1 : e[0] === t[0] && e[1] === t[1];
function Nl(e, t) {
  return Array.isArray(e) && Array.isArray(t) && e.length === 0 && t.length === 0 ? !0 : e === t;
}
function tk(e, t) {
  if (e.length === t.length) {
    for (var r = 0; r < e.length; r++)
      if (e[r] !== t[r])
        return !1;
    return !0;
  }
  return !1;
}
var Ie = (e) => {
  var t = de(e);
  return t === "horizontal" ? "xAxis" : t === "vertical" ? "yAxis" : t === "centric" ? "angleAxis" : "radiusAxis";
}, ei = (e) => e.tooltip.settings.axisId;
function Ic(e) {
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
var rk = (e, t) => {
  if (t != null)
    switch (e) {
      case "linear": {
        if (!Ht(t)) {
          for (var r, n, i = 0; i < t.length; i++) {
            var a = t[i];
            Z(a) && ((r === void 0 || a < r) && (r = a), (n === void 0 || a > n) && (n = a));
          }
          return r !== void 0 && n !== void 0 ? [r, n] : void 0;
        }
        return t;
      }
      default:
        return t;
    }
};
function Cr(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function nk(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function jc(e) {
  let t, r, n;
  e.length !== 2 ? (t = Cr, r = (l, u) => Cr(e(l), u), n = (l, u) => e(l) - u) : (t = e === Cr || e === nk ? e : ik, r = e, n = e);
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
function ik() {
  return 0;
}
function Eb(e) {
  return e === null ? NaN : +e;
}
function* ak(e, t) {
  for (let r of e)
    r != null && (r = +r) >= r && (yield r);
}
const ok = jc(Cr), ra = ok.right;
jc(Eb).center;
class Lv extends Map {
  constructor(t, r = sk) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: r } }), t != null) for (const [n, i] of t) this.set(n, i);
  }
  get(t) {
    return super.get(Rv(this, t));
  }
  has(t) {
    return super.has(Rv(this, t));
  }
  set(t, r) {
    return super.set(lk(this, t), r);
  }
  delete(t) {
    return super.delete(uk(this, t));
  }
}
function Rv({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : r;
}
function lk({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r);
}
function uk({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) && (r = e.get(n), e.delete(n)), r;
}
function sk(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function ck(e = Cr) {
  if (e === Cr) return kb;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    const n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0);
  };
}
function kb(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0);
}
const fk = Math.sqrt(50), dk = Math.sqrt(10), vk = Math.sqrt(2);
function _o(e, t, r) {
  const n = (t - e) / Math.max(0, r), i = Math.floor(Math.log10(n)), a = n / Math.pow(10, i), o = a >= fk ? 10 : a >= dk ? 5 : a >= vk ? 2 : 1;
  let l, u, s;
  return i < 0 ? (s = Math.pow(10, -i) / o, l = Math.round(e * s), u = Math.round(t * s), l / s < e && ++l, u / s > t && --u, s = -s) : (s = Math.pow(10, i) * o, l = Math.round(e / s), u = Math.round(t / s), l * s < e && ++l, u * s > t && --u), u < l && 0.5 <= r && r < 2 ? _o(e, t, r * 2) : [l, u, s];
}
function gs(e, t, r) {
  if (t = +t, e = +e, r = +r, !(r > 0)) return [];
  if (e === t) return [e];
  const n = t < e, [i, a, o] = n ? _o(t, e, r) : _o(e, t, r);
  if (!(a >= i)) return [];
  const l = a - i + 1, u = new Array(l);
  if (n)
    if (o < 0) for (let s = 0; s < l; ++s) u[s] = (a - s) / -o;
    else for (let s = 0; s < l; ++s) u[s] = (a - s) * o;
  else if (o < 0) for (let s = 0; s < l; ++s) u[s] = (i + s) / -o;
  else for (let s = 0; s < l; ++s) u[s] = (i + s) * o;
  return u;
}
function bs(e, t, r) {
  return t = +t, e = +e, r = +r, _o(e, t, r)[2];
}
function xs(e, t, r) {
  t = +t, e = +e, r = +r;
  const n = t < e, i = n ? bs(t, e, r) : bs(e, t, r);
  return (n ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function zv(e, t) {
  let r;
  for (const n of e)
    n != null && (r < n || r === void 0 && n >= n) && (r = n);
  return r;
}
function Bv(e, t) {
  let r;
  for (const n of e)
    n != null && (r > n || r === void 0 && n >= n) && (r = n);
  return r;
}
function Cb(e, t, r = 0, n = 1 / 0, i) {
  if (t = Math.floor(t), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(e.length - 1, n)), !(r <= t && t <= n)) return e;
  for (i = i === void 0 ? kb : ck(i); n > r; ) {
    if (n - r > 600) {
      const u = n - r + 1, s = t - r + 1, c = Math.log(u), f = 0.5 * Math.exp(2 * c / 3), d = 0.5 * Math.sqrt(c * f * (u - f) / u) * (s - u / 2 < 0 ? -1 : 1), v = Math.max(r, Math.floor(t - s * f / u + d)), h = Math.min(n, Math.floor(t + (u - s) * f / u + d));
      Cb(e, t, v, h, i);
    }
    const a = e[t];
    let o = r, l = n;
    for (pi(e, r, t), i(e[n], a) > 0 && pi(e, r, n); o < l; ) {
      for (pi(e, o, l), ++o, --l; i(e[o], a) < 0; ) ++o;
      for (; i(e[l], a) > 0; ) --l;
    }
    i(e[r], a) === 0 ? pi(e, r, l) : (++l, pi(e, l, n)), l <= t && (r = l + 1), t <= l && (n = l - 1);
  }
  return e;
}
function pi(e, t, r) {
  const n = e[t];
  e[t] = e[r], e[r] = n;
}
function pk(e, t, r) {
  if (e = Float64Array.from(ak(e)), !(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return Bv(e);
    if (t >= 1) return zv(e);
    var n, i = (n - 1) * t, a = Math.floor(i), o = zv(Cb(e, a).subarray(0, a + 1)), l = Bv(e.subarray(a + 1));
    return o + (l - o) * (i - a);
  }
}
function hk(e, t, r = Eb) {
  if (!(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return +r(e[0], 0, e);
    if (t >= 1) return +r(e[n - 1], n - 1, e);
    var n, i = (n - 1) * t, a = Math.floor(i), o = +r(e[a], a, e), l = +r(e[a + 1], a + 1, e);
    return o + (l - o) * (i - a);
  }
}
function mk(e, t, r) {
  e = +e, t = +t, r = (i = arguments.length) < 2 ? (t = e, e = 0, 1) : i < 3 ? 1 : +r;
  for (var n = -1, i = Math.max(0, Math.ceil((t - e) / r)) | 0, a = new Array(i); ++n < i; )
    a[n] = e + n * r;
  return a;
}
function gt(e, t) {
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
function mr(e, t) {
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
const ws = Symbol("implicit");
function Mc() {
  var e = new Lv(), t = [], r = [], n = ws;
  function i(a) {
    let o = e.get(a);
    if (o === void 0) {
      if (n !== ws) return n;
      e.set(a, o = t.push(a) - 1);
    }
    return r[o % r.length];
  }
  return i.domain = function(a) {
    if (!arguments.length) return t.slice();
    t = [], e = new Lv();
    for (const o of a)
      e.has(o) || e.set(o, t.push(o) - 1);
    return i;
  }, i.range = function(a) {
    return arguments.length ? (r = Array.from(a), i) : r.slice();
  }, i.unknown = function(a) {
    return arguments.length ? (n = a, i) : n;
  }, i.copy = function() {
    return Mc(t, r).unknown(n);
  }, gt.apply(i, arguments), i;
}
function Dc() {
  var e = Mc().unknown(void 0), t = e.domain, r = e.range, n = 0, i = 1, a, o, l = !1, u = 0, s = 0, c = 0.5;
  delete e.unknown;
  function f() {
    var d = t().length, v = i < n, h = v ? i : n, y = v ? n : i;
    a = (y - h) / Math.max(1, d - u + s * 2), l && (a = Math.floor(a)), h += (y - h - a * (d - u)) * c, o = a * (1 - u), l && (h = Math.round(h), o = Math.round(o));
    var m = mk(d).map(function(g) {
      return h + a * g;
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
    return Dc(t(), [n, i]).round(l).paddingInner(u).paddingOuter(s).align(c);
  }, gt.apply(f(), arguments);
}
function $b(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return $b(t());
  }, e;
}
function yk() {
  return $b(Dc.apply(null, arguments).paddingInner(1));
}
function Tc(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e;
}
function Ib(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r;
}
function na() {
}
var Ri = 0.7, Eo = 1 / Ri, Tn = "\\s*([+-]?\\d+)\\s*", zi = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Gt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", gk = /^#([0-9a-f]{3,8})$/, bk = new RegExp(`^rgb\\(${Tn},${Tn},${Tn}\\)$`), xk = new RegExp(`^rgb\\(${Gt},${Gt},${Gt}\\)$`), wk = new RegExp(`^rgba\\(${Tn},${Tn},${Tn},${zi}\\)$`), Ok = new RegExp(`^rgba\\(${Gt},${Gt},${Gt},${zi}\\)$`), Pk = new RegExp(`^hsl\\(${zi},${Gt},${Gt}\\)$`), Ak = new RegExp(`^hsla\\(${zi},${Gt},${Gt},${zi}\\)$`), Fv = {
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
Tc(na, Bi, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Wv,
  // Deprecated! Use color.formatHex.
  formatHex: Wv,
  formatHex8: Sk,
  formatHsl: _k,
  formatRgb: Kv,
  toString: Kv
});
function Wv() {
  return this.rgb().formatHex();
}
function Sk() {
  return this.rgb().formatHex8();
}
function _k() {
  return jb(this).formatHsl();
}
function Kv() {
  return this.rgb().formatRgb();
}
function Bi(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = gk.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? Uv(t) : r === 3 ? new et(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? ja(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? ja(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = bk.exec(e)) ? new et(t[1], t[2], t[3], 1) : (t = xk.exec(e)) ? new et(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = wk.exec(e)) ? ja(t[1], t[2], t[3], t[4]) : (t = Ok.exec(e)) ? ja(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Pk.exec(e)) ? qv(t[1], t[2] / 100, t[3] / 100, 1) : (t = Ak.exec(e)) ? qv(t[1], t[2] / 100, t[3] / 100, t[4]) : Fv.hasOwnProperty(e) ? Uv(Fv[e]) : e === "transparent" ? new et(NaN, NaN, NaN, 0) : null;
}
function Uv(e) {
  return new et(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function ja(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new et(e, t, r, n);
}
function Ek(e) {
  return e instanceof na || (e = Bi(e)), e ? (e = e.rgb(), new et(e.r, e.g, e.b, e.opacity)) : new et();
}
function Os(e, t, r, n) {
  return arguments.length === 1 ? Ek(e) : new et(e, t, r, n ?? 1);
}
function et(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n;
}
Tc(et, Os, Ib(na, {
  brighter(e) {
    return e = e == null ? Eo : Math.pow(Eo, e), new et(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ri : Math.pow(Ri, e), new et(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new et(ln(this.r), ln(this.g), ln(this.b), ko(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Hv,
  // Deprecated! Use color.formatHex.
  formatHex: Hv,
  formatHex8: kk,
  formatRgb: Gv,
  toString: Gv
}));
function Hv() {
  return `#${Jr(this.r)}${Jr(this.g)}${Jr(this.b)}`;
}
function kk() {
  return `#${Jr(this.r)}${Jr(this.g)}${Jr(this.b)}${Jr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Gv() {
  const e = ko(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${ln(this.r)}, ${ln(this.g)}, ${ln(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function ko(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function ln(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Jr(e) {
  return e = ln(e), (e < 16 ? "0" : "") + e.toString(16);
}
function qv(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Ot(e, t, r, n);
}
function jb(e) {
  if (e instanceof Ot) return new Ot(e.h, e.s, e.l, e.opacity);
  if (e instanceof na || (e = Bi(e)), !e) return new Ot();
  if (e instanceof Ot) return e;
  e = e.rgb();
  var t = e.r / 255, r = e.g / 255, n = e.b / 255, i = Math.min(t, r, n), a = Math.max(t, r, n), o = NaN, l = a - i, u = (a + i) / 2;
  return l ? (t === a ? o = (r - n) / l + (r < n) * 6 : r === a ? o = (n - t) / l + 2 : o = (t - r) / l + 4, l /= u < 0.5 ? a + i : 2 - a - i, o *= 60) : l = u > 0 && u < 1 ? 0 : o, new Ot(o, l, u, e.opacity);
}
function Ck(e, t, r, n) {
  return arguments.length === 1 ? jb(e) : new Ot(e, t, r, n ?? 1);
}
function Ot(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
}
Tc(Ot, Ck, Ib(na, {
  brighter(e) {
    return e = e == null ? Eo : Math.pow(Eo, e), new Ot(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ri : Math.pow(Ri, e), new Ot(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, n = r + (r < 0.5 ? r : 1 - r) * t, i = 2 * r - n;
    return new et(
      _u(e >= 240 ? e - 240 : e + 120, i, n),
      _u(e, i, n),
      _u(e < 120 ? e + 240 : e - 120, i, n),
      this.opacity
    );
  },
  clamp() {
    return new Ot(Yv(this.h), Ma(this.s), Ma(this.l), ko(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = ko(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Yv(this.h)}, ${Ma(this.s) * 100}%, ${Ma(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Yv(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Ma(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function _u(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
}
const Nc = (e) => () => e;
function $k(e, t) {
  return function(r) {
    return e + r * t;
  };
}
function Ik(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r, function(n) {
    return Math.pow(e + n * t, r);
  };
}
function jk(e) {
  return (e = +e) == 1 ? Mb : function(t, r) {
    return r - t ? Ik(t, r, e) : Nc(isNaN(t) ? r : t);
  };
}
function Mb(e, t) {
  var r = t - e;
  return r ? $k(e, r) : Nc(isNaN(e) ? t : e);
}
const Vv = (function e(t) {
  var r = jk(t);
  function n(i, a) {
    var o = r((i = Os(i)).r, (a = Os(a)).r), l = r(i.g, a.g), u = r(i.b, a.b), s = Mb(i.opacity, a.opacity);
    return function(c) {
      return i.r = o(c), i.g = l(c), i.b = u(c), i.opacity = s(c), i + "";
    };
  }
  return n.gamma = e, n;
})(1);
function Mk(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0, n = t.slice(), i;
  return function(a) {
    for (i = 0; i < r; ++i) n[i] = e[i] * (1 - a) + t[i] * a;
    return n;
  };
}
function Dk(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function Tk(e, t) {
  var r = t ? t.length : 0, n = e ? Math.min(r, e.length) : 0, i = new Array(n), a = new Array(r), o;
  for (o = 0; o < n; ++o) i[o] = ti(e[o], t[o]);
  for (; o < r; ++o) a[o] = t[o];
  return function(l) {
    for (o = 0; o < n; ++o) a[o] = i[o](l);
    return a;
  };
}
function Nk(e, t) {
  var r = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(n) {
    return r.setTime(e * (1 - n) + t * n), r;
  };
}
function Co(e, t) {
  return e = +e, t = +t, function(r) {
    return e * (1 - r) + t * r;
  };
}
function Lk(e, t) {
  var r = {}, n = {}, i;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t)
    i in e ? r[i] = ti(e[i], t[i]) : n[i] = t[i];
  return function(a) {
    for (i in r) n[i] = r[i](a);
    return n;
  };
}
var Ps = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Eu = new RegExp(Ps.source, "g");
function Rk(e) {
  return function() {
    return e;
  };
}
function zk(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Bk(e, t) {
  var r = Ps.lastIndex = Eu.lastIndex = 0, n, i, a, o = -1, l = [], u = [];
  for (e = e + "", t = t + ""; (n = Ps.exec(e)) && (i = Eu.exec(t)); )
    (a = i.index) > r && (a = t.slice(r, a), l[o] ? l[o] += a : l[++o] = a), (n = n[0]) === (i = i[0]) ? l[o] ? l[o] += i : l[++o] = i : (l[++o] = null, u.push({ i: o, x: Co(n, i) })), r = Eu.lastIndex;
  return r < t.length && (a = t.slice(r), l[o] ? l[o] += a : l[++o] = a), l.length < 2 ? u[0] ? zk(u[0].x) : Rk(t) : (t = u.length, function(s) {
    for (var c = 0, f; c < t; ++c) l[(f = u[c]).i] = f.x(s);
    return l.join("");
  });
}
function ti(e, t) {
  var r = typeof t, n;
  return t == null || r === "boolean" ? Nc(t) : (r === "number" ? Co : r === "string" ? (n = Bi(t)) ? (t = n, Vv) : Bk : t instanceof Bi ? Vv : t instanceof Date ? Nk : Dk(t) ? Mk : Array.isArray(t) ? Tk : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? Lk : Co)(e, t);
}
function Lc(e, t) {
  return e = +e, t = +t, function(r) {
    return Math.round(e * (1 - r) + t * r);
  };
}
function Fk(e, t) {
  t === void 0 && (t = e, e = ti);
  for (var r = 0, n = t.length - 1, i = t[0], a = new Array(n < 0 ? 0 : n); r < n; ) a[r] = e(i, i = t[++r]);
  return function(o) {
    var l = Math.max(0, Math.min(n - 1, Math.floor(o *= n)));
    return a[l](o - l);
  };
}
function Wk(e) {
  return function() {
    return e;
  };
}
function $o(e) {
  return +e;
}
var Xv = [0, 1];
function Ye(e) {
  return e;
}
function As(e, t) {
  return (t -= e = +e) ? function(r) {
    return (r - e) / t;
  } : Wk(isNaN(t) ? NaN : 0.5);
}
function Kk(e, t) {
  var r;
  return e > t && (r = e, e = t, t = r), function(n) {
    return Math.max(e, Math.min(t, n));
  };
}
function Uk(e, t, r) {
  var n = e[0], i = e[1], a = t[0], o = t[1];
  return i < n ? (n = As(i, n), a = r(o, a)) : (n = As(n, i), a = r(a, o)), function(l) {
    return a(n(l));
  };
}
function Hk(e, t, r) {
  var n = Math.min(e.length, t.length) - 1, i = new Array(n), a = new Array(n), o = -1;
  for (e[n] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < n; )
    i[o] = As(e[o], e[o + 1]), a[o] = r(t[o], t[o + 1]);
  return function(l) {
    var u = ra(e, l, 1, n) - 1;
    return a[u](i[u](l));
  };
}
function ia(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function Ll() {
  var e = Xv, t = Xv, r = ti, n, i, a, o = Ye, l, u, s;
  function c() {
    var d = Math.min(e.length, t.length);
    return o !== Ye && (o = Kk(e[0], e[d - 1])), l = d > 2 ? Hk : Uk, u = s = null, f;
  }
  function f(d) {
    return d == null || isNaN(d = +d) ? a : (u || (u = l(e.map(n), t, r)))(n(o(d)));
  }
  return f.invert = function(d) {
    return o(i((s || (s = l(t, e.map(n), Co)))(d)));
  }, f.domain = function(d) {
    return arguments.length ? (e = Array.from(d, $o), c()) : e.slice();
  }, f.range = function(d) {
    return arguments.length ? (t = Array.from(d), c()) : t.slice();
  }, f.rangeRound = function(d) {
    return t = Array.from(d), r = Lc, c();
  }, f.clamp = function(d) {
    return arguments.length ? (o = d ? !0 : Ye, c()) : o !== Ye;
  }, f.interpolate = function(d) {
    return arguments.length ? (r = d, c()) : r;
  }, f.unknown = function(d) {
    return arguments.length ? (a = d, f) : a;
  }, function(d, v) {
    return n = d, i = v, c();
  };
}
function Rc() {
  return Ll()(Ye, Ye);
}
function Gk(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function Io(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), n = e.slice(0, r);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +e.slice(r + 1)
  ];
}
function Wn(e) {
  return e = Io(Math.abs(e)), e ? e[1] : NaN;
}
function qk(e, t) {
  return function(r, n) {
    for (var i = r.length, a = [], o = 0, l = e[0], u = 0; i > 0 && l > 0 && (u + l + 1 > n && (l = Math.max(1, n - u)), a.push(r.substring(i -= l, i + l)), !((u += l + 1) > n)); )
      l = e[o = (o + 1) % e.length];
    return a.reverse().join(t);
  };
}
function Yk(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(r) {
      return e[+r];
    });
  };
}
var Vk = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Fi(e) {
  if (!(t = Vk.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new zc({
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
Fi.prototype = zc.prototype;
function zc(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
zc.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function Xk(e) {
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
var jo;
function Zk(e, t) {
  var r = Io(e, t);
  if (!r) return jo = void 0, e.toPrecision(t);
  var n = r[0], i = r[1], a = i - (jo = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = n.length;
  return a === o ? n : a > o ? n + new Array(a - o + 1).join("0") : a > 0 ? n.slice(0, a) + "." + n.slice(a) : "0." + new Array(1 - a).join("0") + Io(e, Math.max(0, t + a - 1))[0];
}
function Zv(e, t) {
  var r = Io(e, t);
  if (!r) return e + "";
  var n = r[0], i = r[1];
  return i < 0 ? "0." + new Array(-i).join("0") + n : n.length > i + 1 ? n.slice(0, i + 1) + "." + n.slice(i + 1) : n + new Array(i - n.length + 2).join("0");
}
const Qv = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: Gk,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => Zv(e * 100, t),
  r: Zv,
  s: Zk,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16)
};
function Jv(e) {
  return e;
}
var ep = Array.prototype.map, tp = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function Qk(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? Jv : qk(ep.call(e.grouping, Number), e.thousands + ""), r = e.currency === void 0 ? "" : e.currency[0] + "", n = e.currency === void 0 ? "" : e.currency[1] + "", i = e.decimal === void 0 ? "." : e.decimal + "", a = e.numerals === void 0 ? Jv : Yk(ep.call(e.numerals, String)), o = e.percent === void 0 ? "%" : e.percent + "", l = e.minus === void 0 ? "−" : e.minus + "", u = e.nan === void 0 ? "NaN" : e.nan + "";
  function s(f, d) {
    f = Fi(f);
    var v = f.fill, h = f.align, y = f.sign, m = f.symbol, g = f.zero, x = f.width, b = f.comma, w = f.precision, P = f.trim, O = f.type;
    O === "n" ? (b = !0, O = "g") : Qv[O] || (w === void 0 && (w = 12), P = !0, O = "g"), (g || v === "0" && h === "=") && (g = !0, v = "0", h = "=");
    var S = (d && d.prefix !== void 0 ? d.prefix : "") + (m === "$" ? r : m === "#" && /[boxX]/.test(O) ? "0" + O.toLowerCase() : ""), A = (m === "$" ? n : /[%p]/.test(O) ? o : "") + (d && d.suffix !== void 0 ? d.suffix : ""), C = Qv[O], $ = /[defgprs%]/.test(O);
    w = w === void 0 ? 6 : /[gprs]/.test(O) ? Math.max(1, Math.min(21, w)) : Math.max(0, Math.min(20, w));
    function j(k) {
      var F = S, W = A, K, Y, H;
      if (O === "c")
        W = C(k) + W, k = "";
      else {
        k = +k;
        var ne = k < 0 || 1 / k < 0;
        if (k = isNaN(k) ? u : C(Math.abs(k), w), P && (k = Xk(k)), ne && +k == 0 && y !== "+" && (ne = !1), F = (ne ? y === "(" ? y : l : y === "-" || y === "(" ? "" : y) + F, W = (O === "s" && !isNaN(k) && jo !== void 0 ? tp[8 + jo / 3] : "") + W + (ne && y === "(" ? ")" : ""), $) {
          for (K = -1, Y = k.length; ++K < Y; )
            if (H = k.charCodeAt(K), 48 > H || H > 57) {
              W = (H === 46 ? i + k.slice(K + 1) : k.slice(K)) + W, k = k.slice(0, K);
              break;
            }
        }
      }
      b && !g && (k = t(k, 1 / 0));
      var J = F.length + k.length + W.length, D = J < x ? new Array(x - J + 1).join(v) : "";
      switch (b && g && (k = t(D + k, D.length ? x - W.length : 1 / 0), D = ""), h) {
        case "<":
          k = F + k + W + D;
          break;
        case "=":
          k = F + D + k + W;
          break;
        case "^":
          k = D.slice(0, J = D.length >> 1) + F + k + W + D.slice(J);
          break;
        default:
          k = D + F + k + W;
          break;
      }
      return a(k);
    }
    return j.toString = function() {
      return f + "";
    }, j;
  }
  function c(f, d) {
    var v = Math.max(-8, Math.min(8, Math.floor(Wn(d) / 3))) * 3, h = Math.pow(10, -v), y = s((f = Fi(f), f.type = "f", f), { suffix: tp[8 + v / 3] });
    return function(m) {
      return y(h * m);
    };
  }
  return {
    format: s,
    formatPrefix: c
  };
}
var Da, Bc, Db;
Jk({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function Jk(e) {
  return Da = Qk(e), Bc = Da.format, Db = Da.formatPrefix, Da;
}
function eC(e) {
  return Math.max(0, -Wn(Math.abs(e)));
}
function tC(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Wn(t) / 3))) * 3 - Wn(Math.abs(e)));
}
function rC(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, Wn(t) - Wn(e)) + 1;
}
function Tb(e, t, r, n) {
  var i = xs(e, t, r), a;
  switch (n = Fi(n ?? ",f"), n.type) {
    case "s": {
      var o = Math.max(Math.abs(e), Math.abs(t));
      return n.precision == null && !isNaN(a = tC(i, o)) && (n.precision = a), Db(n, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(a = rC(i, Math.max(Math.abs(e), Math.abs(t)))) && (n.precision = a - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(a = eC(i)) && (n.precision = a - (n.type === "%") * 2);
      break;
    }
  }
  return Bc(n);
}
function Ir(e) {
  var t = e.domain;
  return e.ticks = function(r) {
    var n = t();
    return gs(n[0], n[n.length - 1], r ?? 10);
  }, e.tickFormat = function(r, n) {
    var i = t();
    return Tb(i[0], i[i.length - 1], r ?? 10, n);
  }, e.nice = function(r) {
    r == null && (r = 10);
    var n = t(), i = 0, a = n.length - 1, o = n[i], l = n[a], u, s, c = 10;
    for (l < o && (s = o, o = l, l = s, s = i, i = a, a = s); c-- > 0; ) {
      if (s = bs(o, l, r), s === u)
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
function Nb() {
  var e = Rc();
  return e.copy = function() {
    return ia(e, Nb());
  }, gt.apply(e, arguments), Ir(e);
}
function Lb(e) {
  var t;
  function r(n) {
    return n == null || isNaN(n = +n) ? t : n;
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (e = Array.from(n, $o), r) : e.slice();
  }, r.unknown = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.copy = function() {
    return Lb(e).unknown(t);
  }, e = arguments.length ? Array.from(e, $o) : [0, 1], Ir(r);
}
function Rb(e, t) {
  e = e.slice();
  var r = 0, n = e.length - 1, i = e[r], a = e[n], o;
  return a < i && (o = r, r = n, n = o, o = i, i = a, a = o), e[r] = t.floor(i), e[n] = t.ceil(a), e;
}
function rp(e) {
  return Math.log(e);
}
function np(e) {
  return Math.exp(e);
}
function nC(e) {
  return -Math.log(-e);
}
function iC(e) {
  return -Math.exp(-e);
}
function aC(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function oC(e) {
  return e === 10 ? aC : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function lC(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function ip(e) {
  return (t, r) => -e(-t, r);
}
function Fc(e) {
  const t = e(rp, np), r = t.domain;
  let n = 10, i, a;
  function o() {
    return i = lC(n), a = oC(n), r()[0] < 0 ? (i = ip(i), a = ip(a), e(nC, iC)) : e(rp, np), t;
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
    let d = i(s), v = i(c), h, y;
    const m = l == null ? 10 : +l;
    let g = [];
    if (!(n % 1) && v - d < m) {
      if (d = Math.floor(d), v = Math.ceil(v), s > 0) {
        for (; d <= v; ++d)
          for (h = 1; h < n; ++h)
            if (y = d < 0 ? h / a(-d) : h * a(d), !(y < s)) {
              if (y > c) break;
              g.push(y);
            }
      } else for (; d <= v; ++d)
        for (h = n - 1; h >= 1; --h)
          if (y = d > 0 ? h / a(-d) : h * a(d), !(y < s)) {
            if (y > c) break;
            g.push(y);
          }
      g.length * 2 < m && (g = gs(s, c, m));
    } else
      g = gs(d, v, Math.min(v - d, m)).map(a);
    return f ? g.reverse() : g;
  }, t.tickFormat = (l, u) => {
    if (l == null && (l = 10), u == null && (u = n === 10 ? "s" : ","), typeof u != "function" && (!(n % 1) && (u = Fi(u)).precision == null && (u.trim = !0), u = Bc(u)), l === 1 / 0) return u;
    const s = Math.max(1, n * l / t.ticks().length);
    return (c) => {
      let f = c / a(Math.round(i(c)));
      return f * n < n - 0.5 && (f *= n), f <= s ? u(c) : "";
    };
  }, t.nice = () => r(Rb(r(), {
    floor: (l) => a(Math.floor(i(l))),
    ceil: (l) => a(Math.ceil(i(l)))
  })), t;
}
function zb() {
  const e = Fc(Ll()).domain([1, 10]);
  return e.copy = () => ia(e, zb()).base(e.base()), gt.apply(e, arguments), e;
}
function ap(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function op(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function Wc(e) {
  var t = 1, r = e(ap(t), op(t));
  return r.constant = function(n) {
    return arguments.length ? e(ap(t = +n), op(t)) : t;
  }, Ir(r);
}
function Bb() {
  var e = Wc(Ll());
  return e.copy = function() {
    return ia(e, Bb()).constant(e.constant());
  }, gt.apply(e, arguments);
}
function lp(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function uC(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function sC(e) {
  return e < 0 ? -e * e : e * e;
}
function Kc(e) {
  var t = e(Ye, Ye), r = 1;
  function n() {
    return r === 1 ? e(Ye, Ye) : r === 0.5 ? e(uC, sC) : e(lp(r), lp(1 / r));
  }
  return t.exponent = function(i) {
    return arguments.length ? (r = +i, n()) : r;
  }, Ir(t);
}
function Uc() {
  var e = Kc(Ll());
  return e.copy = function() {
    return ia(e, Uc()).exponent(e.exponent());
  }, gt.apply(e, arguments), e;
}
function cC() {
  return Uc.apply(null, arguments).exponent(0.5);
}
function up(e) {
  return Math.sign(e) * e * e;
}
function fC(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function Fb() {
  var e = Rc(), t = [0, 1], r = !1, n;
  function i(a) {
    var o = fC(e(a));
    return isNaN(o) ? n : r ? Math.round(o) : o;
  }
  return i.invert = function(a) {
    return e.invert(up(a));
  }, i.domain = function(a) {
    return arguments.length ? (e.domain(a), i) : e.domain();
  }, i.range = function(a) {
    return arguments.length ? (e.range((t = Array.from(a, $o)).map(up)), i) : t.slice();
  }, i.rangeRound = function(a) {
    return i.range(a).round(!0);
  }, i.round = function(a) {
    return arguments.length ? (r = !!a, i) : r;
  }, i.clamp = function(a) {
    return arguments.length ? (e.clamp(a), i) : e.clamp();
  }, i.unknown = function(a) {
    return arguments.length ? (n = a, i) : n;
  }, i.copy = function() {
    return Fb(e.domain(), t).round(r).clamp(e.clamp()).unknown(n);
  }, gt.apply(i, arguments), Ir(i);
}
function Wb() {
  var e = [], t = [], r = [], n;
  function i() {
    var o = 0, l = Math.max(1, t.length);
    for (r = new Array(l - 1); ++o < l; ) r[o - 1] = hk(e, o / l);
    return a;
  }
  function a(o) {
    return o == null || isNaN(o = +o) ? n : t[ra(r, o)];
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
    return e.sort(Cr), i();
  }, a.range = function(o) {
    return arguments.length ? (t = Array.from(o), i()) : t.slice();
  }, a.unknown = function(o) {
    return arguments.length ? (n = o, a) : n;
  }, a.quantiles = function() {
    return r.slice();
  }, a.copy = function() {
    return Wb().domain(e).range(t).unknown(n);
  }, gt.apply(a, arguments);
}
function Kb() {
  var e = 0, t = 1, r = 1, n = [0.5], i = [0, 1], a;
  function o(u) {
    return u != null && u <= u ? i[ra(n, u, 0, r)] : a;
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
    return Kb().domain([e, t]).range(i).unknown(a);
  }, gt.apply(Ir(o), arguments);
}
function Ub() {
  var e = [0.5], t = [0, 1], r, n = 1;
  function i(a) {
    return a != null && a <= a ? t[ra(e, a, 0, n)] : r;
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
    return Ub().domain(e).range(t).unknown(r);
  }, gt.apply(i, arguments);
}
const ku = /* @__PURE__ */ new Date(), Cu = /* @__PURE__ */ new Date();
function Se(e, t, r, n) {
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
  }, i.filter = (a) => Se((o) => {
    if (o >= o) for (; e(o), !a(o); ) o.setTime(o - 1);
  }, (o, l) => {
    if (o >= o)
      if (l < 0) for (; ++l <= 0; )
        for (; t(o, -1), !a(o); )
          ;
      else for (; --l >= 0; )
        for (; t(o, 1), !a(o); )
          ;
  }), r && (i.count = (a, o) => (ku.setTime(+a), Cu.setTime(+o), e(ku), e(Cu), Math.floor(r(ku, Cu))), i.every = (a) => (a = Math.floor(a), !isFinite(a) || !(a > 0) ? null : a > 1 ? i.filter(n ? (o) => n(o) % a === 0 : (o) => i.count(0, o) % a === 0) : i)), i;
}
const Mo = Se(() => {
}, (e, t) => {
  e.setTime(+e + t);
}, (e, t) => t - e);
Mo.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? Se((t) => {
  t.setTime(Math.floor(t / e) * e);
}, (t, r) => {
  t.setTime(+t + r * e);
}, (t, r) => (r - t) / e) : Mo);
Mo.range;
const tr = 1e3, pt = tr * 60, rr = pt * 60, lr = rr * 24, Hc = lr * 7, sp = lr * 30, $u = lr * 365, en = Se((e) => {
  e.setTime(e - e.getMilliseconds());
}, (e, t) => {
  e.setTime(+e + t * tr);
}, (e, t) => (t - e) / tr, (e) => e.getUTCSeconds());
en.range;
const Gc = Se((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * tr);
}, (e, t) => {
  e.setTime(+e + t * pt);
}, (e, t) => (t - e) / pt, (e) => e.getMinutes());
Gc.range;
const qc = Se((e) => {
  e.setUTCSeconds(0, 0);
}, (e, t) => {
  e.setTime(+e + t * pt);
}, (e, t) => (t - e) / pt, (e) => e.getUTCMinutes());
qc.range;
const Yc = Se((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * tr - e.getMinutes() * pt);
}, (e, t) => {
  e.setTime(+e + t * rr);
}, (e, t) => (t - e) / rr, (e) => e.getHours());
Yc.range;
const Vc = Se((e) => {
  e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
  e.setTime(+e + t * rr);
}, (e, t) => (t - e) / rr, (e) => e.getUTCHours());
Vc.range;
const aa = Se(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * pt) / lr,
  (e) => e.getDate() - 1
);
aa.range;
const Rl = Se((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / lr, (e) => e.getUTCDate() - 1);
Rl.range;
const Hb = Se((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / lr, (e) => Math.floor(e / lr));
Hb.range;
function bn(e) {
  return Se((t) => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setDate(t.getDate() + r * 7);
  }, (t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * pt) / Hc);
}
const zl = bn(0), Do = bn(1), dC = bn(2), vC = bn(3), Kn = bn(4), pC = bn(5), hC = bn(6);
zl.range;
Do.range;
dC.range;
vC.range;
Kn.range;
pC.range;
hC.range;
function xn(e) {
  return Se((t) => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setUTCDate(t.getUTCDate() + r * 7);
  }, (t, r) => (r - t) / Hc);
}
const Bl = xn(0), To = xn(1), mC = xn(2), yC = xn(3), Un = xn(4), gC = xn(5), bC = xn(6);
Bl.range;
To.range;
mC.range;
yC.range;
Un.range;
gC.range;
bC.range;
const Xc = Se((e) => {
  e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
Xc.range;
const Zc = Se((e) => {
  e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
Zc.range;
const ur = Se((e) => {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
ur.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Se((t) => {
  t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, r) => {
  t.setFullYear(t.getFullYear() + r * e);
});
ur.range;
const sr = Se((e) => {
  e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
sr.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Se((t) => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, r) => {
  t.setUTCFullYear(t.getUTCFullYear() + r * e);
});
sr.range;
function Gb(e, t, r, n, i, a) {
  const o = [
    [en, 1, tr],
    [en, 5, 5 * tr],
    [en, 15, 15 * tr],
    [en, 30, 30 * tr],
    [a, 1, pt],
    [a, 5, 5 * pt],
    [a, 15, 15 * pt],
    [a, 30, 30 * pt],
    [i, 1, rr],
    [i, 3, 3 * rr],
    [i, 6, 6 * rr],
    [i, 12, 12 * rr],
    [n, 1, lr],
    [n, 2, 2 * lr],
    [r, 1, Hc],
    [t, 1, sp],
    [t, 3, 3 * sp],
    [e, 1, $u]
  ];
  function l(s, c, f) {
    const d = c < s;
    d && ([s, c] = [c, s]);
    const v = f && typeof f.range == "function" ? f : u(s, c, f), h = v ? v.range(s, +c + 1) : [];
    return d ? h.reverse() : h;
  }
  function u(s, c, f) {
    const d = Math.abs(c - s) / f, v = jc(([, , m]) => m).right(o, d);
    if (v === o.length) return e.every(xs(s / $u, c / $u, f));
    if (v === 0) return Mo.every(Math.max(xs(s, c, f), 1));
    const [h, y] = o[d / o[v - 1][2] < o[v][2] / d ? v - 1 : v];
    return h.every(y);
  }
  return [l, u];
}
const [xC, wC] = Gb(sr, Zc, Bl, Hb, Vc, qc), [OC, PC] = Gb(ur, Xc, zl, aa, Yc, Gc);
function Iu(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function ju(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function hi(e, t, r) {
  return { y: e, m: t, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function AC(e) {
  var t = e.dateTime, r = e.date, n = e.time, i = e.periods, a = e.days, o = e.shortDays, l = e.months, u = e.shortMonths, s = mi(i), c = yi(i), f = mi(a), d = yi(a), v = mi(o), h = yi(o), y = mi(l), m = yi(l), g = mi(u), x = yi(u), b = {
    a: H,
    A: ne,
    b: J,
    B: D,
    c: null,
    d: hp,
    e: hp,
    f: qC,
    g: n$,
    G: a$,
    H: UC,
    I: HC,
    j: GC,
    L: qb,
    m: YC,
    M: VC,
    p: Ee,
    q: ie,
    Q: gp,
    s: bp,
    S: XC,
    u: ZC,
    U: QC,
    V: JC,
    w: e$,
    W: t$,
    x: null,
    X: null,
    y: r$,
    Y: i$,
    Z: o$,
    "%": yp
  }, w = {
    a: Te,
    A: ge,
    b: ae,
    B: pe,
    c: null,
    d: mp,
    e: mp,
    f: c$,
    g: x$,
    G: O$,
    H: l$,
    I: u$,
    j: s$,
    L: Vb,
    m: f$,
    M: d$,
    p: $t,
    q: Ne,
    Q: gp,
    s: bp,
    S: v$,
    u: p$,
    U: h$,
    V: m$,
    w: y$,
    W: g$,
    x: null,
    X: null,
    y: b$,
    Y: w$,
    Z: P$,
    "%": yp
  }, P = {
    a: $,
    A: j,
    b: k,
    B: F,
    c: W,
    d: vp,
    e: vp,
    f: BC,
    g: dp,
    G: fp,
    H: pp,
    I: pp,
    j: NC,
    L: zC,
    m: TC,
    M: LC,
    p: C,
    q: DC,
    Q: WC,
    s: KC,
    S: RC,
    u: CC,
    U: $C,
    V: IC,
    w: kC,
    W: jC,
    x: K,
    X: Y,
    y: dp,
    Y: fp,
    Z: MC,
    "%": FC
  };
  b.x = O(r, b), b.X = O(n, b), b.c = O(t, b), w.x = O(r, w), w.X = O(n, w), w.c = O(t, w);
  function O(M, T) {
    return function(V) {
      var I = [], ke = -1, re = 0, tt = M.length, rt, Fr, sd;
      for (V instanceof Date || (V = /* @__PURE__ */ new Date(+V)); ++ke < tt; )
        M.charCodeAt(ke) === 37 && (I.push(M.slice(re, ke)), (Fr = cp[rt = M.charAt(++ke)]) != null ? rt = M.charAt(++ke) : Fr = rt === "e" ? " " : "0", (sd = T[rt]) && (rt = sd(V, Fr)), I.push(rt), re = ke + 1);
      return I.push(M.slice(re, ke)), I.join("");
    };
  }
  function S(M, T) {
    return function(V) {
      var I = hi(1900, void 0, 1), ke = A(I, M, V += "", 0), re, tt;
      if (ke != V.length) return null;
      if ("Q" in I) return new Date(I.Q);
      if ("s" in I) return new Date(I.s * 1e3 + ("L" in I ? I.L : 0));
      if (T && !("Z" in I) && (I.Z = 0), "p" in I && (I.H = I.H % 12 + I.p * 12), I.m === void 0 && (I.m = "q" in I ? I.q : 0), "V" in I) {
        if (I.V < 1 || I.V > 53) return null;
        "w" in I || (I.w = 1), "Z" in I ? (re = ju(hi(I.y, 0, 1)), tt = re.getUTCDay(), re = tt > 4 || tt === 0 ? To.ceil(re) : To(re), re = Rl.offset(re, (I.V - 1) * 7), I.y = re.getUTCFullYear(), I.m = re.getUTCMonth(), I.d = re.getUTCDate() + (I.w + 6) % 7) : (re = Iu(hi(I.y, 0, 1)), tt = re.getDay(), re = tt > 4 || tt === 0 ? Do.ceil(re) : Do(re), re = aa.offset(re, (I.V - 1) * 7), I.y = re.getFullYear(), I.m = re.getMonth(), I.d = re.getDate() + (I.w + 6) % 7);
      } else ("W" in I || "U" in I) && ("w" in I || (I.w = "u" in I ? I.u % 7 : "W" in I ? 1 : 0), tt = "Z" in I ? ju(hi(I.y, 0, 1)).getUTCDay() : Iu(hi(I.y, 0, 1)).getDay(), I.m = 0, I.d = "W" in I ? (I.w + 6) % 7 + I.W * 7 - (tt + 5) % 7 : I.w + I.U * 7 - (tt + 6) % 7);
      return "Z" in I ? (I.H += I.Z / 100 | 0, I.M += I.Z % 100, ju(I)) : Iu(I);
    };
  }
  function A(M, T, V, I) {
    for (var ke = 0, re = T.length, tt = V.length, rt, Fr; ke < re; ) {
      if (I >= tt) return -1;
      if (rt = T.charCodeAt(ke++), rt === 37) {
        if (rt = T.charAt(ke++), Fr = P[rt in cp ? T.charAt(ke++) : rt], !Fr || (I = Fr(M, V, I)) < 0) return -1;
      } else if (rt != V.charCodeAt(I++))
        return -1;
    }
    return I;
  }
  function C(M, T, V) {
    var I = s.exec(T.slice(V));
    return I ? (M.p = c.get(I[0].toLowerCase()), V + I[0].length) : -1;
  }
  function $(M, T, V) {
    var I = v.exec(T.slice(V));
    return I ? (M.w = h.get(I[0].toLowerCase()), V + I[0].length) : -1;
  }
  function j(M, T, V) {
    var I = f.exec(T.slice(V));
    return I ? (M.w = d.get(I[0].toLowerCase()), V + I[0].length) : -1;
  }
  function k(M, T, V) {
    var I = g.exec(T.slice(V));
    return I ? (M.m = x.get(I[0].toLowerCase()), V + I[0].length) : -1;
  }
  function F(M, T, V) {
    var I = y.exec(T.slice(V));
    return I ? (M.m = m.get(I[0].toLowerCase()), V + I[0].length) : -1;
  }
  function W(M, T, V) {
    return A(M, t, T, V);
  }
  function K(M, T, V) {
    return A(M, r, T, V);
  }
  function Y(M, T, V) {
    return A(M, n, T, V);
  }
  function H(M) {
    return o[M.getDay()];
  }
  function ne(M) {
    return a[M.getDay()];
  }
  function J(M) {
    return u[M.getMonth()];
  }
  function D(M) {
    return l[M.getMonth()];
  }
  function Ee(M) {
    return i[+(M.getHours() >= 12)];
  }
  function ie(M) {
    return 1 + ~~(M.getMonth() / 3);
  }
  function Te(M) {
    return o[M.getUTCDay()];
  }
  function ge(M) {
    return a[M.getUTCDay()];
  }
  function ae(M) {
    return u[M.getUTCMonth()];
  }
  function pe(M) {
    return l[M.getUTCMonth()];
  }
  function $t(M) {
    return i[+(M.getUTCHours() >= 12)];
  }
  function Ne(M) {
    return 1 + ~~(M.getUTCMonth() / 3);
  }
  return {
    format: function(M) {
      var T = O(M += "", b);
      return T.toString = function() {
        return M;
      }, T;
    },
    parse: function(M) {
      var T = S(M += "", !1);
      return T.toString = function() {
        return M;
      }, T;
    },
    utcFormat: function(M) {
      var T = O(M += "", w);
      return T.toString = function() {
        return M;
      }, T;
    },
    utcParse: function(M) {
      var T = S(M += "", !0);
      return T.toString = function() {
        return M;
      }, T;
    }
  };
}
var cp = { "-": "", _: " ", 0: "0" }, je = /^\s*\d+/, SC = /^%/, _C = /[\\^$*+?|[\]().{}]/g;
function te(e, t, r) {
  var n = e < 0 ? "-" : "", i = (n ? -e : e) + "", a = i.length;
  return n + (a < r ? new Array(r - a + 1).join(t) + i : i);
}
function EC(e) {
  return e.replace(_C, "\\$&");
}
function mi(e) {
  return new RegExp("^(?:" + e.map(EC).join("|") + ")", "i");
}
function yi(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]));
}
function kC(e, t, r) {
  var n = je.exec(t.slice(r, r + 1));
  return n ? (e.w = +n[0], r + n[0].length) : -1;
}
function CC(e, t, r) {
  var n = je.exec(t.slice(r, r + 1));
  return n ? (e.u = +n[0], r + n[0].length) : -1;
}
function $C(e, t, r) {
  var n = je.exec(t.slice(r, r + 2));
  return n ? (e.U = +n[0], r + n[0].length) : -1;
}
function IC(e, t, r) {
  var n = je.exec(t.slice(r, r + 2));
  return n ? (e.V = +n[0], r + n[0].length) : -1;
}
function jC(e, t, r) {
  var n = je.exec(t.slice(r, r + 2));
  return n ? (e.W = +n[0], r + n[0].length) : -1;
}
function fp(e, t, r) {
  var n = je.exec(t.slice(r, r + 4));
  return n ? (e.y = +n[0], r + n[0].length) : -1;
}
function dp(e, t, r) {
  var n = je.exec(t.slice(r, r + 2));
  return n ? (e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1;
}
function MC(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n ? (e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1;
}
function DC(e, t, r) {
  var n = je.exec(t.slice(r, r + 1));
  return n ? (e.q = n[0] * 3 - 3, r + n[0].length) : -1;
}
function TC(e, t, r) {
  var n = je.exec(t.slice(r, r + 2));
  return n ? (e.m = n[0] - 1, r + n[0].length) : -1;
}
function vp(e, t, r) {
  var n = je.exec(t.slice(r, r + 2));
  return n ? (e.d = +n[0], r + n[0].length) : -1;
}
function NC(e, t, r) {
  var n = je.exec(t.slice(r, r + 3));
  return n ? (e.m = 0, e.d = +n[0], r + n[0].length) : -1;
}
function pp(e, t, r) {
  var n = je.exec(t.slice(r, r + 2));
  return n ? (e.H = +n[0], r + n[0].length) : -1;
}
function LC(e, t, r) {
  var n = je.exec(t.slice(r, r + 2));
  return n ? (e.M = +n[0], r + n[0].length) : -1;
}
function RC(e, t, r) {
  var n = je.exec(t.slice(r, r + 2));
  return n ? (e.S = +n[0], r + n[0].length) : -1;
}
function zC(e, t, r) {
  var n = je.exec(t.slice(r, r + 3));
  return n ? (e.L = +n[0], r + n[0].length) : -1;
}
function BC(e, t, r) {
  var n = je.exec(t.slice(r, r + 6));
  return n ? (e.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1;
}
function FC(e, t, r) {
  var n = SC.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function WC(e, t, r) {
  var n = je.exec(t.slice(r));
  return n ? (e.Q = +n[0], r + n[0].length) : -1;
}
function KC(e, t, r) {
  var n = je.exec(t.slice(r));
  return n ? (e.s = +n[0], r + n[0].length) : -1;
}
function hp(e, t) {
  return te(e.getDate(), t, 2);
}
function UC(e, t) {
  return te(e.getHours(), t, 2);
}
function HC(e, t) {
  return te(e.getHours() % 12 || 12, t, 2);
}
function GC(e, t) {
  return te(1 + aa.count(ur(e), e), t, 3);
}
function qb(e, t) {
  return te(e.getMilliseconds(), t, 3);
}
function qC(e, t) {
  return qb(e, t) + "000";
}
function YC(e, t) {
  return te(e.getMonth() + 1, t, 2);
}
function VC(e, t) {
  return te(e.getMinutes(), t, 2);
}
function XC(e, t) {
  return te(e.getSeconds(), t, 2);
}
function ZC(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function QC(e, t) {
  return te(zl.count(ur(e) - 1, e), t, 2);
}
function Yb(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? Kn(e) : Kn.ceil(e);
}
function JC(e, t) {
  return e = Yb(e), te(Kn.count(ur(e), e) + (ur(e).getDay() === 4), t, 2);
}
function e$(e) {
  return e.getDay();
}
function t$(e, t) {
  return te(Do.count(ur(e) - 1, e), t, 2);
}
function r$(e, t) {
  return te(e.getFullYear() % 100, t, 2);
}
function n$(e, t) {
  return e = Yb(e), te(e.getFullYear() % 100, t, 2);
}
function i$(e, t) {
  return te(e.getFullYear() % 1e4, t, 4);
}
function a$(e, t) {
  var r = e.getDay();
  return e = r >= 4 || r === 0 ? Kn(e) : Kn.ceil(e), te(e.getFullYear() % 1e4, t, 4);
}
function o$(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + te(t / 60 | 0, "0", 2) + te(t % 60, "0", 2);
}
function mp(e, t) {
  return te(e.getUTCDate(), t, 2);
}
function l$(e, t) {
  return te(e.getUTCHours(), t, 2);
}
function u$(e, t) {
  return te(e.getUTCHours() % 12 || 12, t, 2);
}
function s$(e, t) {
  return te(1 + Rl.count(sr(e), e), t, 3);
}
function Vb(e, t) {
  return te(e.getUTCMilliseconds(), t, 3);
}
function c$(e, t) {
  return Vb(e, t) + "000";
}
function f$(e, t) {
  return te(e.getUTCMonth() + 1, t, 2);
}
function d$(e, t) {
  return te(e.getUTCMinutes(), t, 2);
}
function v$(e, t) {
  return te(e.getUTCSeconds(), t, 2);
}
function p$(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function h$(e, t) {
  return te(Bl.count(sr(e) - 1, e), t, 2);
}
function Xb(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? Un(e) : Un.ceil(e);
}
function m$(e, t) {
  return e = Xb(e), te(Un.count(sr(e), e) + (sr(e).getUTCDay() === 4), t, 2);
}
function y$(e) {
  return e.getUTCDay();
}
function g$(e, t) {
  return te(To.count(sr(e) - 1, e), t, 2);
}
function b$(e, t) {
  return te(e.getUTCFullYear() % 100, t, 2);
}
function x$(e, t) {
  return e = Xb(e), te(e.getUTCFullYear() % 100, t, 2);
}
function w$(e, t) {
  return te(e.getUTCFullYear() % 1e4, t, 4);
}
function O$(e, t) {
  var r = e.getUTCDay();
  return e = r >= 4 || r === 0 ? Un(e) : Un.ceil(e), te(e.getUTCFullYear() % 1e4, t, 4);
}
function P$() {
  return "+0000";
}
function yp() {
  return "%";
}
function gp(e) {
  return +e;
}
function bp(e) {
  return Math.floor(+e / 1e3);
}
var On, Zb, Qb;
A$({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function A$(e) {
  return On = AC(e), Zb = On.format, On.parse, Qb = On.utcFormat, On.utcParse, On;
}
function S$(e) {
  return new Date(e);
}
function _$(e) {
  return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function Qc(e, t, r, n, i, a, o, l, u, s) {
  var c = Rc(), f = c.invert, d = c.domain, v = s(".%L"), h = s(":%S"), y = s("%I:%M"), m = s("%I %p"), g = s("%a %d"), x = s("%b %d"), b = s("%B"), w = s("%Y");
  function P(O) {
    return (u(O) < O ? v : l(O) < O ? h : o(O) < O ? y : a(O) < O ? m : n(O) < O ? i(O) < O ? g : x : r(O) < O ? b : w)(O);
  }
  return c.invert = function(O) {
    return new Date(f(O));
  }, c.domain = function(O) {
    return arguments.length ? d(Array.from(O, _$)) : d().map(S$);
  }, c.ticks = function(O) {
    var S = d();
    return e(S[0], S[S.length - 1], O ?? 10);
  }, c.tickFormat = function(O, S) {
    return S == null ? P : s(S);
  }, c.nice = function(O) {
    var S = d();
    return (!O || typeof O.range != "function") && (O = t(S[0], S[S.length - 1], O ?? 10)), O ? d(Rb(S, O)) : c;
  }, c.copy = function() {
    return ia(c, Qc(e, t, r, n, i, a, o, l, u, s));
  }, c;
}
function E$() {
  return gt.apply(Qc(OC, PC, ur, Xc, zl, aa, Yc, Gc, en, Zb).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function k$() {
  return gt.apply(Qc(xC, wC, sr, Zc, Bl, Rl, Vc, qc, en, Qb).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function Fl() {
  var e = 0, t = 1, r, n, i, a, o = Ye, l = !1, u;
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
      var v, h;
      return arguments.length ? ([v, h] = d, o = f(v, h), s) : [o(0), o(1)];
    };
  }
  return s.range = c(ti), s.rangeRound = c(Lc), s.unknown = function(f) {
    return arguments.length ? (u = f, s) : u;
  }, function(f) {
    return a = f, r = f(e), n = f(t), i = r === n ? 0 : 1 / (n - r), s;
  };
}
function jr(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function Jb() {
  var e = Ir(Fl()(Ye));
  return e.copy = function() {
    return jr(e, Jb());
  }, mr.apply(e, arguments);
}
function e0() {
  var e = Fc(Fl()).domain([1, 10]);
  return e.copy = function() {
    return jr(e, e0()).base(e.base());
  }, mr.apply(e, arguments);
}
function t0() {
  var e = Wc(Fl());
  return e.copy = function() {
    return jr(e, t0()).constant(e.constant());
  }, mr.apply(e, arguments);
}
function Jc() {
  var e = Kc(Fl());
  return e.copy = function() {
    return jr(e, Jc()).exponent(e.exponent());
  }, mr.apply(e, arguments);
}
function C$() {
  return Jc.apply(null, arguments).exponent(0.5);
}
function r0() {
  var e = [], t = Ye;
  function r(n) {
    if (n != null && !isNaN(n = +n)) return t((ra(e, n, 1) - 1) / (e.length - 1));
  }
  return r.domain = function(n) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let i of n) i != null && !isNaN(i = +i) && e.push(i);
    return e.sort(Cr), r;
  }, r.interpolator = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.range = function() {
    return e.map((n, i) => t(i / (e.length - 1)));
  }, r.quantiles = function(n) {
    return Array.from({ length: n + 1 }, (i, a) => pk(e, a / n));
  }, r.copy = function() {
    return r0(t).domain(e);
  }, mr.apply(r, arguments);
}
function Wl() {
  var e = 0, t = 0.5, r = 1, n = 1, i, a, o, l, u, s = Ye, c, f = !1, d;
  function v(y) {
    return isNaN(y = +y) ? d : (y = 0.5 + ((y = +c(y)) - a) * (n * y < n * a ? l : u), s(f ? Math.max(0, Math.min(1, y)) : y));
  }
  v.domain = function(y) {
    return arguments.length ? ([e, t, r] = y, i = c(e = +e), a = c(t = +t), o = c(r = +r), l = i === a ? 0 : 0.5 / (a - i), u = a === o ? 0 : 0.5 / (o - a), n = a < i ? -1 : 1, v) : [e, t, r];
  }, v.clamp = function(y) {
    return arguments.length ? (f = !!y, v) : f;
  }, v.interpolator = function(y) {
    return arguments.length ? (s = y, v) : s;
  };
  function h(y) {
    return function(m) {
      var g, x, b;
      return arguments.length ? ([g, x, b] = m, s = Fk(y, [g, x, b]), v) : [s(0), s(0.5), s(1)];
    };
  }
  return v.range = h(ti), v.rangeRound = h(Lc), v.unknown = function(y) {
    return arguments.length ? (d = y, v) : d;
  }, function(y) {
    return c = y, i = y(e), a = y(t), o = y(r), l = i === a ? 0 : 0.5 / (a - i), u = a === o ? 0 : 0.5 / (o - a), n = a < i ? -1 : 1, v;
  };
}
function n0() {
  var e = Ir(Wl()(Ye));
  return e.copy = function() {
    return jr(e, n0());
  }, mr.apply(e, arguments);
}
function i0() {
  var e = Fc(Wl()).domain([0.1, 1, 10]);
  return e.copy = function() {
    return jr(e, i0()).base(e.base());
  }, mr.apply(e, arguments);
}
function a0() {
  var e = Wc(Wl());
  return e.copy = function() {
    return jr(e, a0()).constant(e.constant());
  }, mr.apply(e, arguments);
}
function ef() {
  var e = Kc(Wl());
  return e.copy = function() {
    return jr(e, ef()).exponent(e.exponent());
  }, mr.apply(e, arguments);
}
function $$() {
  return ef.apply(null, arguments).exponent(0.5);
}
const Wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  scaleBand: Dc,
  scaleDiverging: n0,
  scaleDivergingLog: i0,
  scaleDivergingPow: ef,
  scaleDivergingSqrt: $$,
  scaleDivergingSymlog: a0,
  scaleIdentity: Lb,
  scaleImplicit: ws,
  scaleLinear: Nb,
  scaleLog: zb,
  scaleOrdinal: Mc,
  scalePoint: yk,
  scalePow: Uc,
  scaleQuantile: Wb,
  scaleQuantize: Kb,
  scaleRadial: Fb,
  scaleSequential: Jb,
  scaleSequentialLog: e0,
  scaleSequentialPow: Jc,
  scaleSequentialQuantile: r0,
  scaleSequentialSqrt: C$,
  scaleSequentialSymlog: t0,
  scaleSqrt: cC,
  scaleSymlog: Bb,
  scaleThreshold: Ub,
  scaleTime: E$,
  scaleUtc: k$,
  tickFormat: Tb
}, Symbol.toStringTag, { value: "Module" }));
function I$(e) {
  if (e in Wt)
    return Wt[e]();
  var t = "scale".concat(uc(e));
  if (t in Wt)
    return Wt[t]();
}
function xp(e, t, r) {
  if (typeof e == "function")
    return e.copy().domain(t).range(r);
  if (e != null) {
    var n = I$(e);
    if (n != null)
      return n.domain(t).range(r), n;
  }
}
function tf(e, t, r, n) {
  if (!(r == null || n == null))
    return typeof e.scale == "function" ? xp(e.scale, r, n) : xp(t, r, n);
}
function j$(e) {
  return "scale".concat(uc(e));
}
function M$(e) {
  return j$(e) in Wt;
}
var o0 = (e, t, r) => {
  if (e != null) {
    var {
      scale: n,
      type: i
    } = e;
    if (n === "auto")
      return i === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !t) ? "point" : i === "category" ? "band" : "linear";
    if (typeof n == "string")
      return M$(n) ? n : "point";
  }
};
function D$(e, t) {
  for (var r = 0, n = e.length, i = e[0] < e[e.length - 1]; r < n; ) {
    var a = Math.floor((r + n) / 2);
    (i ? e[a] < t : e[a] > t) ? r = a + 1 : n = a;
  }
  return r;
}
function l0(e, t) {
  if (e) {
    var r = t ?? e.domain(), n = r.map((a) => {
      var o;
      return (o = e(a)) !== null && o !== void 0 ? o : 0;
    }), i = e.range();
    if (!(r.length === 0 || i.length < 2))
      return (a) => {
        var o, l, u = D$(n, a);
        if (u <= 0)
          return r[0];
        if (u >= r.length)
          return r[r.length - 1];
        var s = (o = n[u - 1]) !== null && o !== void 0 ? o : 0, c = (l = n[u]) !== null && l !== void 0 ? l : 0;
        return Math.abs(a - s) <= Math.abs(a - c) ? r[u - 1] : r[u];
      };
  }
}
function T$(e) {
  if (e != null)
    return "invert" in e && typeof e.invert == "function" ? e.invert.bind(e) : l0(e, void 0);
}
function wp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function No(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wp(Object(r), !0).forEach(function(n) {
      N$(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : wp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function N$(e, t, r) {
  return (t = L$(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function L$(e) {
  var t = R$(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function R$(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Ss = [0, "auto"], xe = {
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
}, u0 = (e, t) => e.cartesianAxis.xAxis[t], yr = (e, t) => {
  var r = u0(e, t);
  return r ?? xe;
}, we = {
  allowDataOverflow: !1,
  allowDecimals: !0,
  allowDuplicatedCategory: !0,
  angle: 0,
  dataKey: void 0,
  domain: Ss,
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
  width: Zi
}, s0 = (e, t) => e.cartesianAxis.yAxis[t], gr = (e, t) => {
  var r = s0(e, t);
  return r ?? we;
}, z$ = {
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
}, rf = (e, t) => {
  var r = e.cartesianAxis.zAxis[t];
  return r ?? z$;
}, Xe = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return yr(e, r);
    case "yAxis":
      return gr(e, r);
    case "zAxis":
      return rf(e, r);
    case "angleAxis":
      return _c(e, r);
    case "radiusAxis":
      return Ec(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, B$ = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return yr(e, r);
    case "yAxis":
      return gr(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, oa = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return yr(e, r);
    case "yAxis":
      return gr(e, r);
    case "angleAxis":
      return _c(e, r);
    case "radiusAxis":
      return Ec(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, c0 = (e) => e.graphicalItems.cartesianItems.some((t) => t.type === "bar") || e.graphicalItems.polarItems.some((t) => t.type === "radialBar");
function f0(e, t) {
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
var d0 = (e) => e.graphicalItems.cartesianItems, F$ = _([$e, Dl], f0), v0 = (e, t, r) => e.filter(r).filter((n) => t?.includeHidden === !0 ? !0 : !n.hide), la = _([d0, Xe, F$], v0, {
  memoizeOptions: {
    resultEqualityCheck: Nl
  }
}), p0 = _([la], (e) => e.filter((t) => t.type === "area" || t.type === "bar").filter($c)), h0 = (e) => e.filter((t) => !("stackId" in t) || t.stackId === void 0), W$ = _([la], h0), m0 = (e) => e.map((t) => t.data).filter(Boolean).flat(1), K$ = _([la], m0, {
  memoizeOptions: {
    resultEqualityCheck: Nl
  }
}), y0 = (e, t) => {
  var {
    chartData: r = [],
    dataStartIndex: n,
    dataEndIndex: i
  } = t;
  return e.length > 0 ? e : r.slice(n, i + 1);
}, nf = _([K$, ob], y0), g0 = (e, t, r) => t?.dataKey != null ? e.map((n) => ({
  value: Be(n, t.dataKey)
})) : r.length > 0 ? r.map((n) => n.dataKey).flatMap((n) => e.map((i) => ({
  value: Be(i, n)
}))) : e.map((n) => ({
  value: n
})), ua = _([nf, Xe, la], g0);
function Nn(e) {
  if (Bt(e) || e instanceof Date) {
    var t = Number(e);
    if (Z(t))
      return t;
  }
}
function Op(e) {
  if (Array.isArray(e)) {
    var t = [Nn(e[0]), Nn(e[1])];
    return Ht(t) ? t : void 0;
  }
  var r = Nn(e);
  if (r != null)
    return [r, r];
}
function cr(e) {
  return e.map(Nn).filter(Je);
}
function U$(e, t) {
  var r = Nn(e), n = Nn(t);
  return r == null && n == null ? 0 : r == null ? -1 : n == null ? 1 : r - n;
}
var H$ = _([ua], (e) => e?.map((t) => t.value).sort(U$));
function b0(e, t) {
  switch (e) {
    case "xAxis":
      return t.direction === "x";
    case "yAxis":
      return t.direction === "y";
    default:
      return !1;
  }
}
function G$(e, t, r) {
  return !r || typeof t != "number" || Yt(t) ? [] : r.length ? cr(r.flatMap((n) => {
    var i = Be(e, n.dataKey), a, o;
    if (Array.isArray(i) ? [a, o] = i : a = o = i, !(!Z(a) || !Z(o)))
      return [t - a, t + o];
  })) : [];
}
var Me = (e) => {
  var t = Ie(e), r = ei(e);
  return oa(e, t, r);
}, sa = _([Me], (e) => e?.dataKey), q$ = _([p0, ob, Me], _b), x0 = (e, t, r, n) => {
  var i = {}, a = t.reduce((o, l) => {
    if (l.stackId == null)
      return o;
    var u = o[l.stackId];
    return u == null && (u = []), u.push(l), o[l.stackId] = u, o;
  }, i);
  return Object.fromEntries(Object.entries(a).map((o) => {
    var [l, u] = o, s = n ? [...u].reverse() : u, c = s.map(Cc);
    return [l, {
      // @ts-expect-error getStackedData requires that the input is array of objects, Recharts does not test for that
      stackedData: TS(e, c, r),
      graphicalItems: s
    }];
  }));
}, w0 = _([q$, p0, $l, gb], x0), O0 = (e, t, r, n) => {
  var {
    dataStartIndex: i,
    dataEndIndex: a
  } = t;
  if (n == null && r !== "zAxis") {
    var o = zS(e, i, a);
    if (!(o != null && o[0] === 0 && o[1] === 0))
      return o;
  }
}, Y$ = _([Xe], (e) => e.allowDataOverflow), af = (e) => {
  var t;
  if (e == null || !("domain" in e))
    return Ss;
  if (e.domain != null)
    return e.domain;
  if ("ticks" in e && e.ticks != null) {
    if (e.type === "number") {
      var r = cr(e.ticks);
      return [Math.min(...r), Math.max(...r)];
    }
    if (e.type === "category")
      return e.ticks.map(String);
  }
  return (t = e?.domain) !== null && t !== void 0 ? t : Ss;
}, P0 = _([Xe], af), A0 = _([P0, Y$], lb), V$ = _([w0, hr, $e, A0], O0, {
  memoizeOptions: {
    resultEqualityCheck: Tl
  }
}), of = (e) => e.errorBars, X$ = (e, t, r) => e.flatMap((n) => t[n.id]).filter(Boolean).filter((n) => b0(r, n)), Lo = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var i = r.filter(Boolean);
  if (i.length !== 0) {
    var a = i.flat(), o = Math.min(...a), l = Math.max(...a);
    return [o, l];
  }
}, S0 = (e, t, r, n, i) => {
  var a, o;
  if (r.length > 0 && e.forEach((l) => {
    r.forEach((u) => {
      var s, c, f = (s = n[u.id]) === null || s === void 0 ? void 0 : s.filter((g) => b0(i, g)), d = Be(l, (c = t.dataKey) !== null && c !== void 0 ? c : u.dataKey), v = G$(l, d, f);
      if (v.length >= 2) {
        var h = Math.min(...v), y = Math.max(...v);
        (a == null || h < a) && (a = h), (o == null || y > o) && (o = y);
      }
      var m = Op(d);
      m != null && (a = a == null ? m[0] : Math.min(a, m[0]), o = o == null ? m[1] : Math.max(o, m[1]));
    });
  }), t?.dataKey != null && e.forEach((l) => {
    var u = Op(Be(l, t.dataKey));
    u != null && (a = a == null ? u[0] : Math.min(a, u[0]), o = o == null ? u[1] : Math.max(o, u[1]));
  }), Z(a) && Z(o))
    return [a, o];
}, Z$ = _([nf, Xe, W$, of, $e], S0, {
  memoizeOptions: {
    resultEqualityCheck: Tl
  }
});
function Q$(e) {
  var {
    value: t
  } = e;
  if (Bt(t) || t instanceof Date)
    return t;
}
var J$ = (e, t, r) => {
  var n = e.map(Q$).filter((i) => i != null);
  return r && (t.dataKey == null || t.allowDuplicatedCategory && Ky(n)) ? Cl(0, e.length) : t.allowDuplicatedCategory ? n : Array.from(new Set(n));
}, _0 = (e) => e.referenceElements.dots, ri = (e, t, r) => e.filter((n) => n.ifOverflow === "extendDomain").filter((n) => t === "xAxis" ? n.xAxisId === r : n.yAxisId === r), eI = _([_0, $e, Dl], ri), E0 = (e) => e.referenceElements.areas, tI = _([E0, $e, Dl], ri), k0 = (e) => e.referenceElements.lines, rI = _([k0, $e, Dl], ri), C0 = (e, t) => {
  if (e != null) {
    var r = cr(e.map((n) => t === "xAxis" ? n.x : n.y));
    if (r.length !== 0)
      return [Math.min(...r), Math.max(...r)];
  }
}, nI = _(eI, $e, C0), $0 = (e, t) => {
  if (e != null) {
    var r = cr(e.flatMap((n) => [t === "xAxis" ? n.x1 : n.y1, t === "xAxis" ? n.x2 : n.y2]));
    if (r.length !== 0)
      return [Math.min(...r), Math.max(...r)];
  }
}, iI = _([tI, $e], $0);
function aI(e) {
  var t;
  if (e.x != null)
    return cr([e.x]);
  var r = (t = e.segment) === null || t === void 0 ? void 0 : t.map((n) => n.x);
  return r == null || r.length === 0 ? [] : cr(r);
}
function oI(e) {
  var t;
  if (e.y != null)
    return cr([e.y]);
  var r = (t = e.segment) === null || t === void 0 ? void 0 : t.map((n) => n.y);
  return r == null || r.length === 0 ? [] : cr(r);
}
var I0 = (e, t) => {
  if (e != null) {
    var r = e.flatMap((n) => t === "xAxis" ? aI(n) : oI(n));
    if (r.length !== 0)
      return [Math.min(...r), Math.max(...r)];
  }
}, lI = _([rI, $e], I0), uI = _(nI, lI, iI, (e, t, r) => Lo(e, r, t)), j0 = (e, t, r, n, i, a, o, l) => {
  if (r != null)
    return r;
  var u = o === "vertical" && l === "xAxis" || o === "horizontal" && l === "yAxis", s = u ? Lo(n, a, i) : Lo(a, i);
  return FE(t, s, e.allowDataOverflow);
}, sI = _([Xe, P0, A0, V$, Z$, uI, de, $e], j0, {
  memoizeOptions: {
    resultEqualityCheck: Tl
  }
}), cI = [0, 1], M0 = (e, t, r, n, i, a, o) => {
  if (!((e == null || r == null || r.length === 0) && o === void 0)) {
    var {
      dataKey: l,
      type: u
    } = e, s = Xt(t, a);
    if (s && l == null) {
      var c;
      return Cl(0, (c = r?.length) !== null && c !== void 0 ? c : 0);
    }
    return u === "category" ? J$(n, e, s) : i === "expand" ? cI : o;
  }
}, lf = _([Xe, de, nf, ua, $l, $e, sI], M0), ni = _([Xe, c0, Sc], o0), D0 = (e, t, r) => {
  var {
    niceTicks: n
  } = t;
  if (n !== "none") {
    var i = af(t), a = Array.isArray(i) && (i[0] === "auto" || i[1] === "auto");
    if ((n === "snap125" || n === "adaptive") && t != null && t.tickCount && Ht(e)) {
      if (a)
        return jv(e, t.tickCount, t.allowDecimals, n);
      if (t.type === "number")
        return Mv(e, t.tickCount, t.allowDecimals, n);
    }
    if (n === "auto" && r === "linear" && t != null && t.tickCount) {
      if (a && Ht(e))
        return jv(e, t.tickCount, t.allowDecimals, "adaptive");
      if (t.type === "number" && Ht(e))
        return Mv(e, t.tickCount, t.allowDecimals, "adaptive");
    }
  }
}, uf = _([lf, oa, ni], D0), T0 = (e, t, r, n) => {
  if (
    /*
     * Angle axis for some reason uses nice ticks when rendering axis tick labels,
     * but doesn't use nice ticks for extending domain like all the other axes do.
     * Not really sure why? Is there a good reason,
     * or is it just because someone added support for nice ticks to the other axes and forgot this one?
     */
    n !== "angleAxis" && e?.type === "number" && Ht(t) && Array.isArray(r) && r.length > 0
  ) {
    var i, a, o = t[0], l = (i = r[0]) !== null && i !== void 0 ? i : 0, u = t[1], s = (a = r[r.length - 1]) !== null && a !== void 0 ? a : 0;
    return [Math.min(o, l), Math.max(u, s)];
  }
  return t;
}, fI = _([Xe, lf, uf, $e], T0), dI = _(ua, Xe, (e, t) => {
  if (!(!t || t.type !== "number")) {
    var r = 1 / 0, n = Array.from(cr(e.map((f) => f.value))).sort((f, d) => f - d), i = n[0], a = n[n.length - 1];
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
}), N0 = _(dI, de, GE, Fe, (e, t, r, n, i) => i, (e, t, r, n, i) => {
  if (!Z(e))
    return 0;
  var a = t === "vertical" ? n.height : n.width;
  if (i === "gap")
    return e * a / 2;
  if (i === "no-gap") {
    var o = sn(r, e * a), l = e * a / 2;
    return l - o - (l - o) / a * o;
  }
  return 0;
}), vI = (e, t, r) => {
  var n = yr(e, t);
  return n == null || typeof n.padding != "string" ? 0 : N0(e, "xAxis", t, r, n.padding);
}, pI = (e, t, r) => {
  var n = gr(e, t);
  return n == null || typeof n.padding != "string" ? 0 : N0(e, "yAxis", t, r, n.padding);
}, hI = _(yr, vI, (e, t) => {
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
}), mI = _(gr, pI, (e, t) => {
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
}), yI = _([Fe, hI, Al, Pl, (e, t, r) => r], (e, t, r, n, i) => {
  var {
    padding: a
  } = n;
  return i ? [a.left, r.width - a.right] : [e.left + t.left, e.left + e.width - t.right];
}), gI = _([Fe, de, mI, Al, Pl, (e, t, r) => r], (e, t, r, n, i, a) => {
  var {
    padding: o
  } = i;
  return a ? [n.height - o.bottom, o.top] : t === "horizontal" ? [e.top + e.height - r.bottom, e.top + r.top] : [e.top + r.top, e.top + e.height - r.bottom];
}), ca = (e, t, r, n) => {
  var i;
  switch (t) {
    case "xAxis":
      return yI(e, r, n);
    case "yAxis":
      return gI(e, r, n);
    case "zAxis":
      return (i = rf(e, r)) === null || i === void 0 ? void 0 : i.range;
    case "angleAxis":
      return Pb(e);
    case "radiusAxis":
      return Ab(e, r);
    default:
      return;
  }
}, L0 = _([Xe, ca], Il), bI = _([ni, fI], rk), sf = _([Xe, ni, bI, L0], tf), R0 = (e, t, r, n) => {
  if (!(r == null || r.dataKey == null)) {
    var {
      type: i,
      scale: a
    } = r, o = Xt(e, n);
    if (o && (i === "number" || a !== "auto"))
      return t.map((l) => l.value);
  }
}, cf = _([de, ua, oa, $e], R0), Hn = _([sf], Ic);
_([sf], T$);
_([sf, H$], l0);
_([la, of, $e], X$);
function z0(e, t) {
  return e.id < t.id ? -1 : e.id > t.id ? 1 : 0;
}
var Kl = (e, t) => t, Ul = (e, t, r) => r, xI = _(wl, Kl, Ul, (e, t, r) => e.filter((n) => n.orientation === t).filter((n) => n.mirror === r).sort(z0)), wI = _(Ol, Kl, Ul, (e, t, r) => e.filter((n) => n.orientation === t).filter((n) => n.mirror === r).sort(z0)), B0 = (e, t) => ({
  width: e.width,
  height: t.height
}), OI = (e, t) => {
  var r = typeof t.width == "number" ? t.width : Zi;
  return {
    width: r,
    height: e.height
  };
}, PI = _(Fe, yr, B0), AI = (e, t, r) => {
  switch (t) {
    case "top":
      return e.top;
    case "bottom":
      return r - e.bottom;
    default:
      return 0;
  }
}, SI = (e, t, r) => {
  switch (t) {
    case "left":
      return e.left;
    case "right":
      return r - e.right;
    default:
      return 0;
  }
}, _I = _(pr, Fe, xI, Kl, Ul, (e, t, r, n, i) => {
  var a = {}, o;
  return r.forEach((l) => {
    var u = B0(t, l);
    o == null && (o = AI(t, n, e));
    var s = n === "top" && !i || n === "bottom" && i;
    a[l.id] = o - Number(s) * u.height, o += (s ? -1 : 1) * u.height;
  }), a;
}), EI = _(vr, Fe, wI, Kl, Ul, (e, t, r, n, i) => {
  var a = {}, o;
  return r.forEach((l) => {
    var u = OI(t, l);
    o == null && (o = SI(t, n, e));
    var s = n === "left" && !i || n === "right" && i;
    a[l.id] = o - Number(s) * u.width, o += (s ? -1 : 1) * u.width;
  }), a;
}), kI = (e, t) => {
  var r = yr(e, t);
  if (r != null)
    return _I(e, r.orientation, r.mirror);
}, CI = _([Fe, yr, kI, (e, t) => t], (e, t, r, n) => {
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
}), $I = (e, t) => {
  var r = gr(e, t);
  if (r != null)
    return EI(e, r.orientation, r.mirror);
}, II = _([Fe, gr, $I, (e, t) => t], (e, t, r, n) => {
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
}), jI = _(Fe, gr, (e, t) => {
  var r = typeof t.width == "number" ? t.width : Zi;
  return {
    width: r,
    height: e.height
  };
}), F0 = (e, t, r, n) => {
  if (r != null) {
    var {
      allowDuplicatedCategory: i,
      type: a,
      dataKey: o
    } = r, l = Xt(e, n), u = t.map((s) => s.value);
    if (o && l && a === "category" && i && Ky(u))
      return u;
  }
}, ff = _([de, ua, Xe, $e], F0), Pp = _([de, B$, ni, Hn, ff, cf, ca, uf, $e], (e, t, r, n, i, a, o, l, u) => {
  if (t != null) {
    var s = Xt(e, u);
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
}), MI = (e, t, r, n, i, a, o, l, u) => {
  if (!(t == null || n == null)) {
    var s = Xt(e, u), {
      type: c,
      ticks: f,
      tickCount: d
    } = t, v = (
      // @ts-expect-error This is testing for `scaleBand` but for band axis the type is reported as `band` so this looks like a dead code with a workaround elsewhere?
      r === "scaleBand" && typeof n.bandwidth == "function" ? n.bandwidth() / 2 : 2
    ), h = c === "category" && n.bandwidth ? n.bandwidth() / v : 0;
    h = u === "angleAxis" && a != null && a.length >= 2 ? zt(a[0] - a[1]) * 2 * h : h;
    var y = f || i;
    return y ? y.map((m, g) => {
      var x = o ? o.indexOf(m) : m, b = n.map(x);
      return Z(b) ? {
        index: g,
        coordinate: b + h,
        value: m,
        offset: h
      } : null;
    }).filter(Je) : s && l ? l.map((m, g) => {
      var x = n.map(m);
      return Z(x) ? {
        coordinate: x + h,
        value: m,
        index: g,
        offset: h
      } : null;
    }).filter(Je) : n.ticks ? n.ticks(d).map((m, g) => {
      var x = n.map(m);
      return Z(x) ? {
        coordinate: x + h,
        value: m,
        index: g,
        offset: h
      } : null;
    }).filter(Je) : n.domain().map((m, g) => {
      var x = n.map(m);
      return Z(x) ? {
        coordinate: x + h,
        // @ts-expect-error can't use Date as index
        value: o ? o[m] : m,
        index: g,
        offset: h
      } : null;
    }).filter(Je);
  }
}, W0 = _([de, oa, ni, Hn, uf, ca, ff, cf, $e], MI), DI = (e, t, r, n, i, a, o) => {
  if (!(t == null || r == null || n == null || n[0] === n[1])) {
    var l = Xt(e, o), {
      tickCount: u
    } = t, s = 0;
    return s = o === "angleAxis" && n?.length >= 2 ? zt(n[0] - n[1]) * 2 * s : s, l && a ? a.map((c, f) => {
      var d = r.map(c);
      return Z(d) ? {
        coordinate: d + s,
        value: c,
        index: f,
        offset: s
      } : null;
    }).filter(Je) : r.ticks ? r.ticks(u).map((c, f) => {
      var d = r.map(c);
      return Z(d) ? {
        coordinate: d + s,
        value: c,
        index: f,
        offset: s
      } : null;
    }).filter(Je) : r.domain().map((c, f) => {
      var d = r.map(c);
      return Z(d) ? {
        coordinate: d + s,
        // @ts-expect-error can't use unknown as index
        value: i ? i[c] : c,
        index: f,
        offset: s
      } : null;
    }).filter(Je);
  }
}, K0 = _([de, oa, Hn, ca, ff, cf, $e], DI), U0 = _(Xe, Hn, (e, t) => {
  if (!(e == null || t == null))
    return No(No({}, e), {}, {
      scale: t
    });
}), TI = _([Xe, ni, lf, L0], tf), NI = _([TI], Ic);
_((e, t, r) => rf(e, r), NI, (e, t) => {
  if (!(e == null || t == null))
    return No(No({}, e), {}, {
      scale: t
    });
});
var LI = _([de, wl, Ol], (e, t, r) => {
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
}), RI = (e, t, r) => {
  var n;
  return (n = e.renderedTicks[t]) === null || n === void 0 ? void 0 : n[r];
};
_([RI], (e) => {
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
var H0 = (e) => e.options.defaultTooltipEventType, G0 = (e) => e.options.validateTooltipEventTypes;
function q0(e, t, r) {
  if (e == null)
    return t;
  var n = e ? "axis" : "item";
  return r == null ? t : r.includes(n) ? n : t;
}
function Y0(e, t) {
  var r = H0(e), n = G0(e);
  return q0(t, r, n);
}
var V0 = (e, t) => {
  var r, n = Number(t);
  if (!(Yt(n) || t == null))
    return n >= 0 ? e == null || (r = e[n]) === null || r === void 0 ? void 0 : r.value : void 0;
}, zI = (e) => e.tooltip.settings, Ar = {
  active: !1,
  index: null,
  dataKey: void 0,
  graphicalItemId: void 0,
  coordinate: void 0
}, BI = {
  itemInteraction: {
    click: Ar,
    hover: Ar
  },
  axisInteraction: {
    click: Ar,
    hover: Ar
  },
  keyboardInteraction: Ar,
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
}, X0 = Ae({
  name: "tooltip",
  initialState: BI,
  reducers: {
    addTooltipEntrySettings: {
      reducer(e, t) {
        e.tooltipItemPayloads.push(t.payload);
      },
      prepare: Q()
    },
    replaceTooltipEntrySettings: {
      reducer(e, t) {
        var {
          prev: r,
          next: n
        } = t.payload, i = He(e).tooltipItemPayloads.indexOf(r);
        i > -1 && (e.tooltipItemPayloads[i] = n);
      },
      prepare: Q()
    },
    removeTooltipEntrySettings: {
      reducer(e, t) {
        var r = He(e).tooltipItemPayloads.indexOf(t.payload);
        r > -1 && e.tooltipItemPayloads.splice(r, 1);
      },
      prepare: Q()
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
  addTooltipEntrySettings: FI,
  replaceTooltipEntrySettings: WI,
  removeTooltipEntrySettings: KI,
  setTooltipSettingsState: RU,
  setActiveMouseOverItemIndex: UI,
  mouseLeaveItem: zU,
  mouseLeaveChart: Z0,
  setActiveClickItemIndex: BU,
  setMouseOverAxisIndex: Q0,
  setMouseClickAxisIndex: HI,
  setSyncInteraction: Ap,
  setKeyboardInteraction: Ro
} = X0.actions, GI = X0.reducer;
function Sp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ta(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Sp(Object(r), !0).forEach(function(n) {
      qI(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Sp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function qI(e, t, r) {
  return (t = YI(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function YI(e) {
  var t = VI(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function VI(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function XI(e, t, r) {
  return t === "axis" ? r === "click" ? e.axisInteraction.click : e.axisInteraction.hover : r === "click" ? e.itemInteraction.click : e.itemInteraction.hover;
}
function ZI(e) {
  return e.index != null;
}
var J0 = (e, t, r, n) => {
  if (t == null)
    return Ar;
  var i = XI(e, t, r);
  if (i == null)
    return Ar;
  if (i.active)
    return i;
  if (e.keyboardInteraction.active)
    return e.keyboardInteraction;
  if (e.syncInteraction.active && e.syncInteraction.index != null)
    return e.syncInteraction;
  var a = e.settings.active === !0;
  if (ZI(i)) {
    if (a)
      return Ta(Ta({}, i), {}, {
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
  return Ta(Ta({}, Ar), {}, {
    coordinate: i.coordinate
  });
};
function QI(e) {
  if (typeof e == "number")
    return Number.isFinite(e) ? e : void 0;
  if (e instanceof Date) {
    var t = e.valueOf();
    return Number.isFinite(t) ? t : void 0;
  }
  var r = Number(e);
  return Number.isFinite(r) ? r : void 0;
}
function JI(e, t) {
  var r = QI(e), n = t[0], i = t[1];
  if (r === void 0)
    return !1;
  var a = Math.min(n, i), o = Math.max(n, i);
  return r >= a && r <= o;
}
function ej(e, t, r) {
  if (r == null || t == null)
    return !0;
  var n = Be(e, t);
  return n == null || !Ht(r) ? !0 : JI(n, r);
}
var df = (e, t, r, n) => {
  var i = e?.index;
  if (i == null)
    return null;
  var a = Number(i);
  if (!Z(a))
    return i;
  var o = 0, l = 1 / 0;
  t.length > 0 && (l = t.length - 1);
  var u = Math.max(o, Math.min(a, l)), s = t[u];
  return s == null || ej(s, r, n) ? String(u) : null;
}, ex = (e, t, r, n, i, a, o) => {
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
}, tx = (e, t, r, n) => {
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
}, rx = (e) => e.options.tooltipPayloadSearcher, fa = (e) => e.tooltip;
function _p(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ep(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _p(Object(r), !0).forEach(function(n) {
      tj(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _p(Object(r)).forEach(function(n) {
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
function ij(e) {
  if (typeof e == "string" || typeof e == "number")
    return e;
}
function aj(e) {
  if (typeof e == "string" || typeof e == "number" || typeof e == "boolean")
    return e;
}
function oj(e) {
  if (typeof e == "string" || typeof e == "number")
    return e;
  if (typeof e == "function")
    return (t) => e(t);
}
function kp(e) {
  if (typeof e == "string")
    return e;
}
function lj(e) {
  if (!(e == null || typeof e != "object")) {
    var t = "name" in e ? ij(e.name) : void 0, r = "unit" in e ? aj(e.unit) : void 0, n = "dataKey" in e ? oj(e.dataKey) : void 0, i = "payload" in e ? e.payload : void 0, a = "color" in e ? kp(e.color) : void 0, o = "fill" in e ? kp(e.fill) : void 0;
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
function uj(e, t) {
  return e ?? t;
}
var nx = (e, t, r, n, i, a, o) => {
  if (!(t == null || a == null)) {
    var {
      chartData: l,
      computedData: u,
      dataStartIndex: s,
      dataEndIndex: c
    } = r, f = [];
    return e.reduce((d, v) => {
      var h, {
        dataDefinedOnItem: y,
        settings: m
      } = v, g = uj(y, l), x = Array.isArray(g) ? Tg(g, s, c) : g, b = (h = m?.dataKey) !== null && h !== void 0 ? h : n, w = m?.nameKey, P;
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
      o === "axis" ? P = Uy(x, n, i) : P = a(x, t, u, w), Array.isArray(P))
        P.forEach((S) => {
          var A, C, $ = lj(S), j = $?.name, k = $?.dataKey, F = $?.payload, W = Ep(Ep({}, m), {}, {
            name: j,
            unit: $?.unit,
            // Preserve item-level color/fill from graphical items.
            color: (A = $?.color) !== null && A !== void 0 ? A : m?.color,
            fill: (C = $?.fill) !== null && C !== void 0 ? C : m?.fill
          });
          d.push(Fd({
            tooltipEntrySettings: W,
            dataKey: k,
            payload: F,
            value: Be(F, k),
            name: j == null ? void 0 : String(j)
          }));
        });
      else {
        var O;
        d.push(Fd({
          tooltipEntrySettings: m,
          dataKey: b,
          payload: P,
          // getValueByDataKey does not validate the output type
          value: Be(P, b),
          // getValueByDataKey does not validate the output type
          name: (O = Be(P, w)) !== null && O !== void 0 ? O : m?.name
        }));
      }
      return d;
    }, f);
  }
}, vf = _([Me, c0, Sc], o0), sj = _([(e) => e.graphicalItems.cartesianItems, (e) => e.graphicalItems.polarItems], (e, t) => [...e, ...t]), cj = _([Ie, ei], f0), ii = _([sj, Me, cj], v0, {
  memoizeOptions: {
    resultEqualityCheck: Nl
  }
}), fj = _([ii], (e) => e.filter($c)), dj = _([ii], m0, {
  memoizeOptions: {
    resultEqualityCheck: Nl
  }
}), ai = _([dj, hr], y0), vj = _([fj, hr, Me], _b), pf = _([ai, Me, ii], g0), ix = _([Me], af), pj = _([Me], (e) => e.allowDataOverflow), ax = _([ix, pj], lb), hj = _([ii], (e) => e.filter($c)), mj = _([vj, hj, $l, gb], x0), yj = _([mj, hr, Ie, ax], O0), gj = _([ii], h0), bj = _([ai, Me, gj, of, Ie], S0, {
  memoizeOptions: {
    resultEqualityCheck: Tl
  }
}), xj = _([_0, Ie, ei], ri), wj = _([xj, Ie], C0), Oj = _([E0, Ie, ei], ri), Pj = _([Oj, Ie], $0), Aj = _([k0, Ie, ei], ri), Sj = _([Aj, Ie], I0), _j = _([wj, Sj, Pj], Lo), Ej = _([Me, ix, ax, yj, bj, _j, de, Ie], j0), da = _([Me, de, ai, pf, $l, Ie, Ej], M0), kj = _([da, Me, vf], D0), Cj = _([Me, da, kj, Ie], T0), ox = (e) => {
  var t = Ie(e), r = ei(e), n = !1;
  return ca(e, t, r, n);
}, lx = _([Me, ox], Il), $j = _([Me, vf, Cj, lx], tf), Ij = _([$j], Ic), jj = _([de, pf, Me, Ie], F0), Mj = _([de, pf, Me, Ie], R0), Dj = (e, t, r, n, i, a, o, l) => {
  if (t) {
    var {
      type: u
    } = t, s = Xt(e, l);
    if (n) {
      var c = r === "scaleBand" && n.bandwidth ? n.bandwidth() / 2 : 2, f = u === "category" && n.bandwidth ? n.bandwidth() / c : 0;
      return f = l === "angleAxis" && i != null && i?.length >= 2 ? zt(i[0] - i[1]) * 2 * f : f, s && o ? o.map((d, v) => {
        var h = n.map(d);
        return Z(h) ? {
          coordinate: h + f,
          value: d,
          index: v,
          offset: f
        } : null;
      }).filter(Je) : n.domain().map((d, v) => {
        var h = n.map(d);
        return Z(h) ? {
          coordinate: h + f,
          // @ts-expect-error can't use Date as an index
          value: a ? a[d] : d,
          index: v,
          offset: f
        } : null;
      }).filter(Je);
    }
  }
}, Mr = _([de, Me, vf, Ij, ox, jj, Mj, Ie], Dj), hf = _([H0, G0, zI], (e, t, r) => q0(r.shared, e, t)), ux = (e) => e.tooltip.settings.trigger, mf = (e) => e.tooltip.settings.defaultIndex, va = _([fa, hf, ux, mf], J0), Wi = _([va, ai, sa, da], df), sx = _([Mr, Wi], V0), Tj = _([va], (e) => {
  if (e)
    return e.dataKey;
});
_([va], (e) => {
  if (e)
    return e.graphicalItemId;
});
var cx = _([fa, hf, ux, mf], tx), Nj = _([vr, pr, de, Fe, Mr, mf, cx], ex), Lj = _([va, Nj], (e, t) => e != null && e.coordinate ? e.coordinate : t), Rj = _([va], (e) => {
  var t;
  return (t = e?.active) !== null && t !== void 0 ? t : !1;
}), zj = _([cx, Wi, hr, sa, sx, rx, hf], nx), Bj = _([zj], (e) => {
  if (e != null) {
    var t = e.map((r) => r.payload).filter((r) => r != null);
    return Array.from(new Set(t));
  }
});
function Cp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Pn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Cp(Object(r), !0).forEach(function(n) {
      Fj(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Cp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Fj(e, t, r) {
  return (t = Wj(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Wj(e) {
  var t = Kj(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Kj(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Uj = (e, t, r, n) => {
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
}, Hj = (e, t, r, n) => {
  var i = t.find((s) => s && s.index === r);
  if (i) {
    if (e === "centric") {
      var a = i.coordinate, {
        radius: o
      } = n;
      return Pn(Pn(Pn({}, n), Fn(n.cx, n.cy, o, a)), {}, {
        angle: a,
        radius: o
      });
    }
    var l = i.coordinate, {
      angle: u
    } = n;
    return Pn(Pn(Pn({}, n), Fn(n.cx, n.cy, l, u)), {}, {
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
function Gj(e, t) {
  var {
    relativeX: r,
    relativeY: n
  } = e;
  return r >= t.left && r <= t.left + t.width && n >= t.top && n <= t.top + t.height;
}
var fx = (e, t, r, n, i) => {
  var a, o = (a = t?.length) !== null && a !== void 0 ? a : 0;
  if (o <= 1 || e == null)
    return 0;
  if (n === "angleAxis" && i != null && Math.abs(Math.abs(i[1] - i[0]) - 360) <= 1e-6)
    for (var l = 0; l < o; l++) {
      var u, s, c, f, d, v = l > 0 ? (u = r[l - 1]) === null || u === void 0 ? void 0 : u.coordinate : (s = r[o - 1]) === null || s === void 0 ? void 0 : s.coordinate, h = (c = r[l]) === null || c === void 0 ? void 0 : c.coordinate, y = l >= o - 1 ? (f = r[0]) === null || f === void 0 ? void 0 : f.coordinate : (d = r[l + 1]) === null || d === void 0 ? void 0 : d.coordinate, m = void 0;
      if (!(v == null || h == null || y == null))
        if (zt(h - v) !== zt(y - h)) {
          var g = [];
          if (zt(y - h) === zt(i[1] - i[0])) {
            m = y;
            var x = h + i[1] - i[0];
            g[0] = Math.min(x, (x + v) / 2), g[1] = Math.max(x, (x + v) / 2);
          } else {
            m = v;
            var b = y + i[1] - i[0];
            g[0] = Math.min(h, (b + h) / 2), g[1] = Math.max(h, (b + h) / 2);
          }
          var w = [Math.min(h, (m + h) / 2), Math.max(h, (m + h) / 2)];
          if (e > w[0] && e <= w[1] || e >= g[0] && e <= g[1]) {
            var P;
            return (P = r[l]) === null || P === void 0 ? void 0 : P.index;
          }
        } else {
          var O = Math.min(v, y), S = Math.max(v, y);
          if (e > (O + h) / 2 && e <= (S + h) / 2) {
            var A;
            return (A = r[l]) === null || A === void 0 ? void 0 : A.index;
          }
        }
    }
  else if (t)
    for (var C = 0; C < o; C++) {
      var $ = t[C];
      if ($ != null) {
        var j = t[C + 1], k = t[C - 1];
        if (C === 0 && j != null && e <= ($.coordinate + j.coordinate) / 2 || C === o - 1 && k != null && e > ($.coordinate + k.coordinate) / 2 || C > 0 && C < o - 1 && k != null && j != null && e > ($.coordinate + k.coordinate) / 2 && e <= ($.coordinate + j.coordinate) / 2)
          return $.index;
      }
    }
  return -1;
}, qj = () => G(Sc), yf = (e, t) => t, dx = (e, t, r) => r, gf = (e, t, r, n) => n, Yj = _(Mr, (e) => gn(e, (t) => t.coordinate)), bf = _([fa, yf, dx, gf], J0), xf = _([bf, ai, sa, da], df), vx = _([fa, yf, dx, gf], tx), zo = _([vr, pr, de, Fe, Mr, gf, vx], ex);
_([bf, zo], (e, t) => {
  var r;
  return (r = e.coordinate) !== null && r !== void 0 ? r : t;
});
var Vj = _([Mr, xf], V0);
_([vx, xf, hr, sa, Vj, rx, yf], nx);
_([bf, xf], (e, t) => ({
  isActive: e.active && t != null,
  activeIndex: t
}));
var Xj = (e, t, r, n, i, a, o) => {
  if (!(!e || !r || !n || !i) && Gj(e, o)) {
    var l = BS(e, t), u = fx(l, a, i, r, n), s = Uj(t, i, u, e);
    return {
      activeIndex: String(u),
      activeCoordinate: s
    };
  }
}, Zj = (e, t, r, n, i, a, o) => {
  if (!(!e || !n || !i || !a || !r)) {
    var l = RE(e, r);
    if (l) {
      var u = FS(l, t), s = fx(u, o, a, n, i), c = Hj(t, a, s, l);
      return {
        activeIndex: String(s),
        activeCoordinate: c
      };
    }
  }
}, Qj = (e, t, r, n, i, a, o, l) => {
  if (!(!e || !t || !n || !i || !a))
    return t === "horizontal" || t === "vertical" ? Xj(e, t, n, i, a, o, l) : Zj(e, t, r, n, i, a, o);
}, Jj = _((e) => e.zIndex.zIndexMap, (e, t) => t, (e, t, r) => r, (e, t, r) => {
  if (t != null) {
    var n = e[t];
    if (n != null)
      return r ? n.panoramaElement : n.element;
  }
}), eM = _((e) => e.zIndex.zIndexMap, (e) => {
  var t = Object.keys(e).map((n) => parseInt(n, 10)).concat(Object.values(yt)), r = Array.from(new Set(t));
  return r.sort((n, i) => n - i);
}, {
  memoizeOptions: {
    resultEqualityCheck: tk
  }
});
function $p(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ip(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $p(Object(r), !0).forEach(function(n) {
      tM(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $p(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function tM(e, t, r) {
  return (t = rM(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function rM(e) {
  var t = nM(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function nM(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var iM = {}, aM = {
  zIndexMap: Object.values(yt).reduce((e, t) => Ip(Ip({}, e), {}, {
    [t]: {
      element: void 0,
      panoramaElement: void 0,
      consumers: 0
    }
  }), iM)
}, oM = new Set(Object.values(yt));
function lM(e) {
  return oM.has(e);
}
var px = Ae({
  name: "zIndex",
  initialState: aM,
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
      prepare: Q()
    },
    unregisterZIndexPortal: {
      reducer: (e, t) => {
        var {
          zIndex: r
        } = t.payload;
        e.zIndexMap[r] && (e.zIndexMap[r].consumers -= 1, e.zIndexMap[r].consumers <= 0 && !lM(r) && delete e.zIndexMap[r]);
      },
      prepare: Q()
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
      prepare: Q()
    },
    unregisterZIndexPortalElement: {
      reducer: (e, t) => {
        var {
          zIndex: r
        } = t.payload;
        e.zIndexMap[r] && (t.payload.isPanorama ? e.zIndexMap[r].panoramaElement = void 0 : e.zIndexMap[r].element = void 0);
      },
      prepare: Q()
    }
  }
}), {
  registerZIndexPortal: uM,
  unregisterZIndexPortal: sM,
  registerZIndexPortalElement: cM,
  unregisterZIndexPortalElement: fM
} = px.actions, dM = px.reducer;
function br(e) {
  var {
    zIndex: t,
    children: r
  } = e, n = u_(), i = n && t !== void 0 && t !== 0, a = Ve(), o = me();
  p.useLayoutEffect(() => i ? (o(uM({
    zIndex: t
  })), () => {
    o(sM({
      zIndex: t
    }));
  }) : Zn, [o, t, i]);
  var l = G((u) => Jj(u, t, a));
  return i ? l ? /* @__PURE__ */ sl.createPortal(r, l) : null : r;
}
var vM = /* @__PURE__ */ p.createContext(null), Mu = { exports: {} }, jp;
function pM() {
  return jp || (jp = 1, (function(e) {
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
      var v = new i(c, f || u, d), h = r ? r + s : s;
      return u._events[h] ? u._events[h].fn ? u._events[h] = [u._events[h], v] : u._events[h].push(v) : (u._events[h] = v, u._eventsCount++), u;
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
      for (var d = 0, v = f.length, h = new Array(v); d < v; d++)
        h[d] = f[d].fn;
      return h;
    }, l.prototype.listenerCount = function(s) {
      var c = r ? r + s : s, f = this._events[c];
      return f ? f.fn ? 1 : f.length : 0;
    }, l.prototype.emit = function(s, c, f, d, v, h) {
      var y = r ? r + s : s;
      if (!this._events[y]) return !1;
      var m = this._events[y], g = arguments.length, x, b;
      if (m.fn) {
        switch (m.once && this.removeListener(s, m.fn, void 0, !0), g) {
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
            return m.fn.call(m.context, c, f, d, v, h), !0;
        }
        for (b = 1, x = new Array(g - 1); b < g; b++)
          x[b - 1] = arguments[b];
        m.fn.apply(m.context, x);
      } else {
        var w = m.length, P;
        for (b = 0; b < w; b++)
          switch (m[b].once && this.removeListener(s, m[b].fn, void 0, !0), g) {
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
              if (!x) for (P = 1, x = new Array(g - 1); P < g; P++)
                x[P - 1] = arguments[P];
              m[b].fn.apply(m[b].context, x);
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
      var h = this._events[v];
      if (h.fn)
        h.fn === c && (!d || h.once) && (!f || h.context === f) && o(this, v);
      else {
        for (var y = 0, m = [], g = h.length; y < g; y++)
          (h[y].fn !== c || d && !h[y].once || f && h[y].context !== f) && m.push(h[y]);
        m.length ? this._events[v] = m.length === 1 ? m[0] : m : o(this, v);
      }
      return this;
    }, l.prototype.removeAllListeners = function(s) {
      var c;
      return s ? (c = r ? r + s : s, this._events[c] && o(this, c)) : (this._events = new n(), this._eventsCount = 0), this;
    }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = r, l.EventEmitter = l, e.exports = l;
  })(Mu)), Mu.exports;
}
var hM = pM();
const hx = /* @__PURE__ */ $O(hM);
var Bo = new hx(), Mp = "recharts.syncEvent.tooltip", Dp = "recharts.syncEvent.brush", mM = (e, t) => {
  if (t && Array.isArray(e)) {
    var r = Number.parseInt(t, 10);
    if (!Yt(r))
      return e[r];
  }
}, yM = {
  chartName: "",
  tooltipPayloadSearcher: () => {
  },
  eventEmitter: void 0,
  defaultTooltipEventType: "axis"
}, mx = Ae({
  name: "options",
  initialState: yM,
  reducers: {
    createEventEmitter: (e) => {
      e.eventEmitter == null && (e.eventEmitter = Symbol("rechartsEventEmitter"));
    }
  }
}), gM = mx.reducer, {
  createEventEmitter: bM
} = mx.actions, xM = {
  chartData: void 0,
  computedData: void 0,
  dataStartIndex: 0,
  dataEndIndex: 0
}, yx = Ae({
  name: "chartData",
  initialState: xM,
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
  setChartData: Tp,
  setDataStartEndIndexes: wM,
  setComputedData: FU
} = yx.actions, OM = yx.reducer, PM = ["x", "y"];
function Np(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function An(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Np(Object(r), !0).forEach(function(n) {
      AM(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Np(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function AM(e, t, r) {
  return (t = SM(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function SM(e) {
  var t = _M(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function _M(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function EM(e, t) {
  if (e == null) return {};
  var r, n, i = kM(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function kM(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function CM() {
  var e = G(bb), t = G(xb), r = me(), n = G(qE), i = G(Mr), a = Qi(), o = Wg(), l = G((u) => u.rootProps.className);
  p.useEffect(() => {
    if (e == null)
      return Zn;
    var u = (s, c, f) => {
      if (t !== f && e === s) {
        if (n === "index") {
          var d;
          if (o && c !== null && c !== void 0 && (d = c.payload) !== null && d !== void 0 && d.coordinate && c.payload.sourceViewBox) {
            var v = c.payload.coordinate, {
              x: h,
              y
            } = v, m = EM(v, PM), {
              x: g,
              y: x,
              width: b,
              height: w
            } = c.payload.sourceViewBox, P = An(An({}, m), {}, {
              x: o.x + (b ? (h - g) / b : 0) * o.width,
              y: o.y + (w ? (y - x) / w : 0) * o.height
            });
            r(An(An({}, c), {}, {
              payload: An(An({}, c.payload), {}, {
                coordinate: P
              })
            }));
          } else
            r(c);
          return;
        }
        if (i != null) {
          var O;
          if (typeof n == "function") {
            var S = {
              activeTooltipIndex: c.payload.index == null ? void 0 : Number(c.payload.index),
              isTooltipActive: c.payload.active,
              activeIndex: c.payload.index == null ? void 0 : Number(c.payload.index),
              activeLabel: c.payload.label,
              activeDataKey: c.payload.dataKey,
              activeCoordinate: c.payload.coordinate
            }, A = n(i, S);
            O = i[A];
          } else n === "value" && (O = i.find((Y) => String(Y.value) === c.payload.label));
          var {
            coordinate: C
          } = c.payload;
          if (O == null || c.payload.active === !1 || C == null || o == null) {
            r(Ap({
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
            x: $,
            y: j
          } = C, k = Math.min($, o.x + o.width), F = Math.min(j, o.y + o.height), W = {
            x: a === "horizontal" ? O.coordinate : k,
            y: a === "horizontal" ? F : O.coordinate
          }, K = Ap({
            active: c.payload.active,
            coordinate: W,
            dataKey: c.payload.dataKey,
            index: String(O.index),
            label: c.payload.label,
            sourceViewBox: c.payload.sourceViewBox,
            graphicalItemId: c.payload.graphicalItemId
          });
          r(K);
        }
      }
    };
    return Bo.on(Mp, u), () => {
      Bo.off(Mp, u);
    };
  }, [l, r, t, e, n, i, a, o]);
}
function $M() {
  var e = G(bb), t = G(xb), r = me();
  p.useEffect(() => {
    if (e == null)
      return Zn;
    var n = (i, a, o) => {
      t !== o && e === i && r(wM(a));
    };
    return Bo.on(Dp, n), () => {
      Bo.off(Dp, n);
    };
  }, [r, t, e]);
}
function IM() {
  var e = me();
  p.useEffect(() => {
    e(bM());
  }, [e]), CM(), $M();
}
function jM(e, t, r) {
  return (t = MM(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function MM(e) {
  var t = DM(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function DM(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
class TM {
  constructor(t) {
    jM(this, "cache", /* @__PURE__ */ new Map()), this.maxSize = t;
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
function Lp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function NM(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Lp(Object(r), !0).forEach(function(n) {
      LM(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Lp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function LM(e, t, r) {
  return (t = RM(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function RM(e) {
  var t = zM(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function zM(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var BM = {
  cacheSize: 2e3,
  enableCache: !0
}, gx = NM({}, BM), Rp = new TM(gx.cacheSize), FM = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
}, zp = "recharts_measurement_span";
function WM(e, t) {
  var r = t.fontSize || "", n = t.fontFamily || "", i = t.fontWeight || "", a = t.fontStyle || "", o = t.letterSpacing || "", l = t.textTransform || "";
  return "".concat(e, "|").concat(r, "|").concat(n, "|").concat(i, "|").concat(a, "|").concat(o, "|").concat(l);
}
var Bp = (e, t) => {
  try {
    var r = document.getElementById(zp);
    r || (r = document.createElement("span"), r.setAttribute("id", zp), r.setAttribute("aria-hidden", "true"), document.body.appendChild(r)), Object.assign(r.style, FM, t), r.textContent = "".concat(e);
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
}, Ei = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t == null || ta.isSsr)
    return {
      width: 0,
      height: 0
    };
  if (!gx.enableCache)
    return Bp(t, r);
  var n = WM(t, r), i = Rp.get(n);
  if (i)
    return i;
  var a = Bp(t, r);
  return Rp.set(n, a), a;
}, bx;
function KM(e, t, r) {
  return (t = UM(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function UM(e) {
  var t = HM(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function HM(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Fp = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, Wp = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, GM = /^(px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q)$/, qM = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, YM = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
}, VM = ["cm", "mm", "pt", "pc", "in", "Q", "px"];
function XM(e) {
  return VM.includes(e);
}
var In = "NaN";
function ZM(e, t) {
  return e * YM[t];
}
class Re {
  static parse(t) {
    var r, [, n, i] = (r = qM.exec(t)) !== null && r !== void 0 ? r : [];
    return n == null ? Re.NaN : new Re(parseFloat(n), i ?? "");
  }
  constructor(t, r) {
    this.num = t, this.unit = r, this.num = t, this.unit = r, Yt(t) && (this.unit = ""), r !== "" && !GM.test(r) && (this.num = NaN, this.unit = ""), XM(r) && (this.num = ZM(t, r), this.unit = "px");
  }
  add(t) {
    return this.unit !== t.unit ? new Re(NaN, "") : new Re(this.num + t.num, this.unit);
  }
  subtract(t) {
    return this.unit !== t.unit ? new Re(NaN, "") : new Re(this.num - t.num, this.unit);
  }
  multiply(t) {
    return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new Re(NaN, "") : new Re(this.num * t.num, this.unit || t.unit);
  }
  divide(t) {
    return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new Re(NaN, "") : new Re(this.num / t.num, this.unit || t.unit);
  }
  toString() {
    return "".concat(this.num).concat(this.unit);
  }
  isNaN() {
    return Yt(this.num);
  }
}
bx = Re;
KM(Re, "NaN", new bx(NaN, ""));
function xx(e) {
  if (e == null || e.includes(In))
    return In;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var r, [, n, i, a] = (r = Fp.exec(t)) !== null && r !== void 0 ? r : [], o = Re.parse(n ?? ""), l = Re.parse(a ?? ""), u = i === "*" ? o.multiply(l) : o.divide(l);
    if (u.isNaN())
      return In;
    t = t.replace(Fp, u.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var s, [, c, f, d] = (s = Wp.exec(t)) !== null && s !== void 0 ? s : [], v = Re.parse(c ?? ""), h = Re.parse(d ?? ""), y = f === "+" ? v.add(h) : v.subtract(h);
    if (y.isNaN())
      return In;
    t = t.replace(Wp, y.toString());
  }
  return t;
}
var Kp = /\(([^()]*)\)/;
function QM(e) {
  for (var t = e, r; (r = Kp.exec(t)) != null; ) {
    var [, n] = r;
    t = t.replace(Kp, xx(n));
  }
  return t;
}
function JM(e) {
  var t = e.replace(/\s+/g, "");
  return t = QM(t), t = xx(t), t;
}
function eD(e) {
  try {
    return JM(e);
  } catch {
    return In;
  }
}
function Du(e) {
  var t = eD(e.slice(5, -1));
  return t === In ? "" : t;
}
var tD = ["x", "y", "lineHeight", "capHeight", "fill", "scaleToFit", "textAnchor", "verticalAnchor"], rD = ["dx", "dy", "angle", "className", "breakAll"];
function _s() {
  return _s = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, _s.apply(null, arguments);
}
function Up(e, t) {
  if (e == null) return {};
  var r, n, i = nD(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function nD(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var wx = /[ \f\n\r\t\v\u2028\u2029]+/, Ox = (e) => {
  var {
    children: t,
    breakAll: r,
    style: n
  } = e;
  try {
    var i = [];
    Ge(t) || (r ? i = t.toString().split("") : i = t.toString().split(wx));
    var a = i.map((l) => ({
      word: l,
      width: Ei(l, n).width
    })), o = r ? 0 : Ei(" ", n).width;
    return {
      wordsWithComputedWidth: a,
      spaceWidth: o
    };
  } catch {
    return null;
  }
};
function Px(e) {
  return e === "start" || e === "middle" || e === "end" || e === "inherit";
}
function iD(e) {
  return Ge(e) || typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
var Ax = (e, t, r, n) => e.reduce((i, a) => {
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
}, []), Sx = (e) => e.reduce((t, r) => t.width > r.width ? t : r), aD = "…", Hp = (e, t, r, n, i, a, o, l) => {
  var u = e.slice(0, t), s = Ox({
    breakAll: r,
    style: n,
    children: u + aD
  });
  if (!s)
    return [!1, []];
  var c = Ax(s.wordsWithComputedWidth, a, o, l), f = c.length > i || Sx(c).width > Number(a);
  return [f, c];
}, oD = (e, t, r, n, i) => {
  var {
    maxLines: a,
    children: o,
    style: l,
    breakAll: u
  } = e, s = U(a), c = String(o), f = Ax(t, n, r, i);
  if (!s || i)
    return f;
  var d = f.length > a || Sx(f).width > Number(n);
  if (!d)
    return f;
  for (var v = 0, h = c.length - 1, y = 0, m; v <= h && y <= c.length - 1; ) {
    var g = Math.floor((v + h) / 2), x = g - 1, [b, w] = Hp(c, x, u, l, a, n, r, i), [P] = Hp(c, g, u, l, a, n, r, i);
    if (!b && !P && (v = g + 1), b && P && (h = g - 1), !b && P) {
      m = w;
      break;
    }
    y++;
  }
  return m || f;
}, Gp = (e) => {
  var t = Ge(e) ? [] : e.toString().split(wx);
  return [{
    words: t,
    width: void 0
  }];
}, lD = (e) => {
  var {
    width: t,
    scaleToFit: r,
    children: n,
    style: i,
    breakAll: a,
    maxLines: o
  } = e;
  if ((t || r) && !ta.isSsr) {
    var l, u, s = Ox({
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
      return Gp(n);
    return oD({
      breakAll: a,
      children: n,
      maxLines: o,
      style: i
    }, l, u, t, !!r);
  }
  return Gp(n);
}, _x = "#808080", uD = {
  angle: 0,
  breakAll: !1,
  // Magic number from d3
  capHeight: "0.71em",
  fill: _x,
  lineHeight: "1em",
  scaleToFit: !1,
  textAnchor: "start",
  // Maintain compat with existing charts / default SVG behavior
  verticalAnchor: "end",
  x: 0,
  y: 0
}, wf = /* @__PURE__ */ p.forwardRef((e, t) => {
  var r = Ct(e, uD), {
    x: n,
    y: i,
    lineHeight: a,
    capHeight: o,
    fill: l,
    scaleToFit: u,
    textAnchor: s,
    verticalAnchor: c
  } = r, f = Up(r, tD), d = p.useMemo(() => lD({
    breakAll: f.breakAll,
    children: f.children,
    maxLines: f.maxLines,
    scaleToFit: u,
    style: f.style,
    width: f.width
  }), [f.breakAll, f.children, f.maxLines, u, f.style, f.width]), {
    dx: v,
    dy: h,
    angle: y,
    className: m,
    breakAll: g
  } = f, x = Up(f, rD);
  if (!Bt(n) || !Bt(i) || d.length === 0)
    return null;
  var b = Number(n) + (U(v) ? v : 0), w = Number(i) + (U(h) ? h : 0);
  if (!Z(b) || !Z(w))
    return null;
  var P;
  switch (c) {
    case "start":
      P = Du("calc(".concat(o, ")"));
      break;
    case "middle":
      P = Du("calc(".concat((d.length - 1) / 2, " * -").concat(a, " + (").concat(o, " / 2))"));
      break;
    default:
      P = Du("calc(".concat(d.length - 1, " * -").concat(a, ")"));
      break;
  }
  var O = [], S = d[0];
  if (u && S != null) {
    var A = S.width, {
      width: C
    } = f;
    O.push("scale(".concat(U(C) && U(A) ? C / A : 1, ")"));
  }
  return y && O.push("rotate(".concat(y, ", ").concat(b, ", ").concat(w, ")")), O.length && (x.transform = O.join(" ")), /* @__PURE__ */ p.createElement("text", _s({}, _t(x), {
    ref: t,
    x: b,
    y: w,
    className: ee("recharts-text", m),
    textAnchor: s,
    fill: l.includes("url") ? _x : l
  }), d.map(($, j) => {
    var k = $.words.join(g ? "" : " ");
    return (
      // duplicate words will cause duplicate keys which is why we add the array index here
      /* @__PURE__ */ p.createElement("tspan", {
        x: b,
        dy: j === 0 ? P : a,
        key: "".concat(k, "-").concat(j)
      }, k)
    );
  }));
});
wf.displayName = "Text";
function qp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Dt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? qp(Object(r), !0).forEach(function(n) {
      sD(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : qp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function sD(e, t, r) {
  return (t = cD(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function cD(e) {
  var t = fD(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function fD(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var dD = (e) => {
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
  } = gc(t), c = a, f = a + (u - s) / 2, d = (c + f) / 2, v = (u + s) / 2, h = c + u / 2, y = l >= 0 ? 1 : -1, m = y * n, g = y > 0 ? "end" : "start", x = y > 0 ? "start" : "end", b = u >= 0 ? 1 : -1, w = b * n, P = b > 0 ? "end" : "start", O = b > 0 ? "start" : "end", S = i;
  if (r === "top") {
    var A = {
      x: c + u / 2,
      y: o - m,
      horizontalAnchor: "middle",
      verticalAnchor: g
    };
    return S && (A.height = Math.max(o - S.y, 0), A.width = u), A;
  }
  if (r === "bottom") {
    var C = {
      x: f + s / 2,
      y: o + l + m,
      horizontalAnchor: "middle",
      verticalAnchor: x
    };
    return S && (C.height = Math.max(S.y + S.height - (o + l), 0), C.width = s), C;
  }
  if (r === "left") {
    var $ = {
      x: d - w,
      y: o + l / 2,
      horizontalAnchor: P,
      verticalAnchor: "middle"
    };
    return S && ($.width = Math.max($.x - S.x, 0), $.height = l), $;
  }
  if (r === "right") {
    var j = {
      x: d + v + w,
      y: o + l / 2,
      horizontalAnchor: O,
      verticalAnchor: "middle"
    };
    return S && (j.width = Math.max(S.x + S.width - j.x, 0), j.height = l), j;
  }
  var k = S ? {
    width: v,
    height: l
  } : {};
  return r === "insideLeft" ? Dt({
    x: d + w,
    y: o + l / 2,
    horizontalAnchor: O,
    verticalAnchor: "middle"
  }, k) : r === "insideRight" ? Dt({
    x: d + v - w,
    y: o + l / 2,
    horizontalAnchor: P,
    verticalAnchor: "middle"
  }, k) : r === "insideTop" ? Dt({
    x: c + u / 2,
    y: o + m,
    horizontalAnchor: "middle",
    verticalAnchor: x
  }, k) : r === "insideBottom" ? Dt({
    x: f + s / 2,
    y: o + l - m,
    horizontalAnchor: "middle",
    verticalAnchor: g
  }, k) : r === "insideTopLeft" ? Dt({
    x: c + w,
    y: o + m,
    horizontalAnchor: O,
    verticalAnchor: x
  }, k) : r === "insideTopRight" ? Dt({
    x: c + u - w,
    y: o + m,
    horizontalAnchor: P,
    verticalAnchor: x
  }, k) : r === "insideBottomLeft" ? Dt({
    x: f + w,
    y: o + l - m,
    horizontalAnchor: O,
    verticalAnchor: g
  }, k) : r === "insideBottomRight" ? Dt({
    x: f + s - w,
    y: o + l - m,
    horizontalAnchor: P,
    verticalAnchor: g
  }, k) : r && typeof r == "object" && (U(r.x) || Xu(r.x)) && (U(r.y) || Xu(r.y)) ? Dt({
    x: a + sn(r.x, v),
    y: o + sn(r.y, l),
    horizontalAnchor: "end",
    verticalAnchor: "end"
  }, k) : Dt({
    x: h,
    y: o + l / 2,
    horizontalAnchor: "middle",
    verticalAnchor: "middle"
  }, k);
}, vD = ["labelRef"], pD = ["content"];
function Yp(e, t) {
  if (e == null) return {};
  var r, n, i = hD(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function hD(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Vp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function _i(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Vp(Object(r), !0).forEach(function(n) {
      mD(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Vp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function mD(e, t, r) {
  return (t = yD(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function yD(e) {
  var t = gD(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function gD(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function er() {
  return er = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, er.apply(null, arguments);
}
var Ex = /* @__PURE__ */ p.createContext(null), kx = (e) => {
  var {
    x: t,
    y: r,
    upperWidth: n,
    lowerWidth: i,
    width: a,
    height: o,
    children: l
  } = e, u = p.useMemo(() => ({
    x: t,
    y: r,
    upperWidth: n,
    lowerWidth: i,
    width: a,
    height: o
  }), [t, r, n, i, a, o]);
  return /* @__PURE__ */ p.createElement(Ex.Provider, {
    value: u
  }, l);
}, Cx = () => {
  var e = p.useContext(Ex), t = Wg();
  return e || (t ? gc(t) : void 0);
}, bD = /* @__PURE__ */ p.createContext(null), xD = () => {
  var e = p.useContext(bD), t = G(Sb);
  return e || t;
}, wD = (e) => {
  var {
    value: t,
    formatter: r
  } = e, n = Ge(e.children) ? t : e.children;
  return typeof r == "function" ? r(n) : n;
}, Of = (e) => e != null && typeof e == "function", OD = (e, t) => {
  var r = zt(t - e), n = Math.min(Math.abs(t - e), 360);
  return r * n;
}, PD = (e, t, r, n, i) => {
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
  } = i, h = (s + c) / 2, y = OD(f, d), m = y >= 0 ? 1 : -1, g, x;
  switch (t) {
    case "insideStart":
      g = f + m * a, x = v;
      break;
    case "insideEnd":
      g = d - m * a, x = !v;
      break;
    case "end":
      g = d + m * a, x = v;
      break;
    default:
      throw new Error("Unsupported position ".concat(t));
  }
  x = y <= 0 ? x : !x;
  var b = Fn(l, u, h, g), w = Fn(l, u, h, g + (x ? 1 : -1) * 359), P = "M".concat(b.x, ",").concat(b.y, `
    A`).concat(h, ",").concat(h, ",0,1,").concat(x ? 0 : 1, `,
    `).concat(w.x, ",").concat(w.y), O = Ge(e.id) ? Ci("recharts-radial-line-") : e.id;
  return /* @__PURE__ */ p.createElement("text", er({}, n, {
    dominantBaseline: "central",
    className: ee("recharts-radial-bar-label", o)
  }), /* @__PURE__ */ p.createElement("defs", null, /* @__PURE__ */ p.createElement("path", {
    id: O,
    d: P
  })), /* @__PURE__ */ p.createElement("textPath", {
    xlinkHref: "#".concat(O)
  }, r));
}, AD = (e, t, r) => {
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
    } = Fn(n, i, o + t, s);
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
    y: h
  } = Fn(n, i, d, s);
  return {
    x: v,
    y: h,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
}, Qa = (e) => e != null && "cx" in e && U(e.cx), SD = {
  angle: 0,
  offset: 5,
  zIndex: yt.label,
  position: "middle",
  textBreakAll: !1
};
function _D(e) {
  if (!Qa(e))
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
function Pr(e) {
  var t = Ct(e, SD), {
    viewBox: r,
    parentViewBox: n,
    position: i,
    value: a,
    children: o,
    content: l,
    className: u = "",
    textBreakAll: s,
    labelRef: c
  } = t, f = xD(), d = Cx(), v = i === "center" ? d : f ?? d, h, y, m;
  r == null ? h = v : Qa(r) ? h = r : h = gc(r);
  var g = _D(h);
  if (!h || Ge(a) && Ge(o) && !/* @__PURE__ */ p.isValidElement(l) && typeof l != "function")
    return null;
  var x = _i(_i({}, t), {}, {
    viewBox: h
  });
  if (/* @__PURE__ */ p.isValidElement(l)) {
    var {
      labelRef: b
    } = x, w = Yp(x, vD);
    return /* @__PURE__ */ p.cloneElement(l, w);
  }
  if (typeof l == "function") {
    var {
      content: P
    } = x, O = Yp(x, pD);
    if (y = /* @__PURE__ */ p.createElement(l, O), /* @__PURE__ */ p.isValidElement(y))
      return y;
  } else
    y = wD(t);
  var S = _t(t);
  if (Qa(h)) {
    if (i === "insideStart" || i === "insideEnd" || i === "end")
      return PD(t, i, y, S, h);
    m = AD(h, t.offset, t.position);
  } else {
    if (!g)
      return null;
    var A = dD({
      viewBox: g,
      position: i,
      offset: t.offset,
      parentViewBox: Qa(n) ? void 0 : n
    });
    m = _i(_i({
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
  return /* @__PURE__ */ p.createElement(br, {
    zIndex: t.zIndex
  }, /* @__PURE__ */ p.createElement(wf, er({
    ref: c,
    className: ee("recharts-label", u)
  }, S, m, {
    /*
     * textAnchor is decided by default based on the `position`
     * but we allow overriding via props for precise control.
     */
    textAnchor: Px(S.textAnchor) ? S.textAnchor : m.textAnchor,
    breakAll: s
  }), y));
}
Pr.displayName = "Label";
var ED = (e, t, r) => {
  if (!e)
    return null;
  var n = {
    viewBox: t,
    labelRef: r
  };
  return e === !0 ? /* @__PURE__ */ p.createElement(Pr, er({
    key: "label-implicit"
  }, n)) : Bt(e) ? /* @__PURE__ */ p.createElement(Pr, er({
    key: "label-implicit",
    value: e
  }, n)) : /* @__PURE__ */ p.isValidElement(e) ? e.type === Pr ? /* @__PURE__ */ p.cloneElement(e, _i({
    key: "label-implicit"
  }, n)) : /* @__PURE__ */ p.createElement(Pr, er({
    key: "label-implicit",
    content: e
  }, n)) : Of(e) ? /* @__PURE__ */ p.createElement(Pr, er({
    key: "label-implicit",
    content: e
  }, n)) : e && typeof e == "object" ? /* @__PURE__ */ p.createElement(Pr, er({}, e, {
    key: "label-implicit"
  }, n)) : null;
};
function $x(e) {
  var {
    label: t,
    labelRef: r
  } = e, n = Cx();
  return ED(t, n, r) || null;
}
var kD = ["valueAccessor"], CD = ["dataKey", "clockWise", "id", "textBreakAll", "zIndex"];
function Fo() {
  return Fo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Fo.apply(null, arguments);
}
function Xp(e, t) {
  if (e == null) return {};
  var r, n, i = $D(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function $D(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var ID = (e) => {
  var t = Array.isArray(e.value) ? e.value[e.value.length - 1] : e.value;
  if (iD(t))
    return t;
}, Ix = /* @__PURE__ */ p.createContext(void 0), jD = Ix.Provider, jx = /* @__PURE__ */ p.createContext(void 0);
jx.Provider;
function MD() {
  return p.useContext(Ix);
}
function DD() {
  return p.useContext(jx);
}
function ki(e) {
  var {
    valueAccessor: t = ID
  } = e, r = Xp(e, kD), {
    dataKey: n,
    clockWise: i,
    id: a,
    textBreakAll: o,
    zIndex: l
  } = r, u = Xp(r, CD), s = MD(), c = DD(), f = s || c;
  return !f || !f.length ? null : /* @__PURE__ */ p.createElement(br, {
    zIndex: l ?? yt.label
  }, /* @__PURE__ */ p.createElement(Et, {
    className: "recharts-label-list"
  }, f.map((d, v) => {
    var h, y = Ge(n) ? t(d, v) : Be(d.payload, n), m = Ge(a) ? {} : {
      id: "".concat(a, "-").concat(v)
    };
    return /* @__PURE__ */ p.createElement(Pr, Fo({
      key: "label-".concat(v)
    }, _t(d), u, m, {
      /*
       * Prefer to use the explicit fill from LabelList props.
       * Only in an absence of that, fall back to the fill of the entry.
       * The entry fill can be quite difficult to see especially in Bar, Pie, RadialBar in inside positions.
       * On the other hand it's quite convenient in Scatter, Line, or when the position is outside the Bar, Pie filled shapes.
       */
      fill: (h = r.fill) !== null && h !== void 0 ? h : d.fill,
      parentViewBox: d.parentViewBox,
      value: y,
      textBreakAll: o,
      viewBox: d.viewBox,
      index: v,
      zIndex: 0
    }));
  })));
}
ki.displayName = "LabelList";
function TD(e) {
  var {
    label: t
  } = e;
  return t ? t === !0 ? /* @__PURE__ */ p.createElement(ki, {
    key: "labelList-implicit"
  }) : /* @__PURE__ */ p.isValidElement(t) || Of(t) ? /* @__PURE__ */ p.createElement(ki, {
    key: "labelList-implicit",
    content: t
  }) : typeof t == "object" ? /* @__PURE__ */ p.createElement(ki, Fo({
    key: "labelList-implicit"
  }, t, {
    type: String(t.type)
  })) : null : null;
}
function Es() {
  return Es = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Es.apply(null, arguments);
}
var Mx = (e) => {
  var {
    cx: t,
    cy: r,
    r: n,
    className: i
  } = e, a = ee("recharts-dot", i);
  return U(t) && U(r) && U(n) ? /* @__PURE__ */ p.createElement("circle", Es({}, St(e), sc(e), {
    className: a,
    cx: t,
    cy: r,
    r: n
  })) : null;
}, ND = {
  radiusAxis: {},
  angleAxis: {}
}, Dx = Ae({
  name: "polarAxis",
  initialState: ND,
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
  addRadiusAxis: WU,
  removeRadiusAxis: KU,
  addAngleAxis: UU,
  removeAngleAxis: HU
} = Dx.actions, LD = Dx.reducer;
function RD(e) {
  return e && typeof e == "object" && "className" in e && typeof e.className == "string" ? e.className : "";
}
var Tx = (e) => e && typeof e == "object" && "clipDot" in e ? !!e.clipDot : !0;
function zD(e) {
  var {
    tooltipEntrySettings: t
  } = e, r = me(), n = Ve(), i = p.useRef(null);
  return p.useLayoutEffect(() => {
    n || (i.current === null ? r(FI(t)) : i.current !== t && r(WI({
      prev: i.current,
      next: t
    })), i.current = t);
  }, [t, r, n]), p.useLayoutEffect(() => () => {
    i.current && (r(KI(i.current)), i.current = null);
  }, [r]), null;
}
function BD(e) {
  var {
    legendPayload: t
  } = e, r = me(), n = Ve(), i = p.useRef(null);
  return p.useLayoutEffect(() => {
    n || (i.current === null ? r(w_(t)) : i.current !== t && r(O_({
      prev: i.current,
      next: t
    })), i.current = t);
  }, [r, n, t]), p.useLayoutEffect(() => () => {
    i.current && (r(P_(i.current)), i.current = null);
  }, [r]), null;
}
var Tu, FD = () => {
  var [e] = p.useState(() => Ci("uid-"));
  return e;
}, WD = (Tu = IO.useId) !== null && Tu !== void 0 ? Tu : FD;
function KD(e, t) {
  var r = WD();
  return t || (e ? "".concat(e, "-").concat(r) : r);
}
var UD = /* @__PURE__ */ p.createContext(void 0), HD = (e) => {
  var {
    id: t,
    type: r,
    children: n
  } = e, i = KD("recharts-".concat(r), t);
  return /* @__PURE__ */ p.createElement(UD.Provider, {
    value: i
  }, n(i));
}, GD = {
  cartesianItems: [],
  polarItems: []
}, Nx = Ae({
  name: "graphicalItems",
  initialState: GD,
  reducers: {
    addCartesianGraphicalItem: {
      reducer(e, t) {
        e.cartesianItems.push(t.payload);
      },
      prepare: Q()
    },
    replaceCartesianGraphicalItem: {
      reducer(e, t) {
        var {
          prev: r,
          next: n
        } = t.payload, i = He(e).cartesianItems.indexOf(r);
        i > -1 && (e.cartesianItems[i] = n);
      },
      prepare: Q()
    },
    removeCartesianGraphicalItem: {
      reducer(e, t) {
        var r = He(e).cartesianItems.indexOf(t.payload);
        r > -1 && e.cartesianItems.splice(r, 1);
      },
      prepare: Q()
    },
    addPolarGraphicalItem: {
      reducer(e, t) {
        e.polarItems.push(t.payload);
      },
      prepare: Q()
    },
    removePolarGraphicalItem: {
      reducer(e, t) {
        var r = He(e).polarItems.indexOf(t.payload);
        r > -1 && e.polarItems.splice(r, 1);
      },
      prepare: Q()
    },
    replacePolarGraphicalItem: {
      reducer(e, t) {
        var {
          prev: r,
          next: n
        } = t.payload, i = He(e).polarItems.indexOf(r);
        i > -1 && (e.polarItems[i] = n);
      },
      prepare: Q()
    }
  }
}), {
  addCartesianGraphicalItem: qD,
  replaceCartesianGraphicalItem: YD,
  removeCartesianGraphicalItem: VD,
  addPolarGraphicalItem: GU,
  removePolarGraphicalItem: qU,
  replacePolarGraphicalItem: YU
} = Nx.actions, XD = Nx.reducer, ZD = (e) => {
  var t = me(), r = p.useRef(null);
  return p.useLayoutEffect(() => {
    r.current === null ? t(qD(e)) : r.current !== e && t(YD({
      prev: r.current,
      next: e
    })), r.current = e;
  }, [t, e]), p.useLayoutEffect(() => () => {
    r.current && (t(VD(r.current)), r.current = null);
  }, [t]), null;
}, QD = /* @__PURE__ */ p.memo(ZD), JD = ["points"];
function Zp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Nu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Zp(Object(r), !0).forEach(function(n) {
      eT(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Zp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function eT(e, t, r) {
  return (t = tT(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function tT(e) {
  var t = rT(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function rT(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Wo() {
  return Wo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Wo.apply(null, arguments);
}
function nT(e, t) {
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
function aT(e) {
  var {
    option: t,
    dotProps: r,
    className: n
  } = e;
  if (/* @__PURE__ */ p.isValidElement(t))
    return /* @__PURE__ */ p.cloneElement(t, r);
  if (typeof t == "function")
    return t(r);
  var i = ee(n, typeof t != "boolean" ? t.className : ""), a = r ?? {}, {
    points: o
  } = a, l = nT(a, JD);
  return /* @__PURE__ */ p.createElement(Mx, Wo({}, l, {
    className: i
  }));
}
function oT(e, t) {
  return e == null ? !1 : t ? !0 : e.length === 1;
}
function lT(e) {
  var {
    points: t,
    dot: r,
    className: n,
    dotClassName: i,
    dataKey: a,
    baseProps: o,
    needClip: l,
    clipPathId: u,
    zIndex: s = yt.scatter
  } = e;
  if (!oT(t, r))
    return null;
  var c = Tx(r), f = NO(r), d = t.map((h, y) => {
    var m, g, x = Nu(Nu(Nu({
      r: 3
    }, o), f), {}, {
      index: y,
      cx: (m = h.x) !== null && m !== void 0 ? m : void 0,
      cy: (g = h.y) !== null && g !== void 0 ? g : void 0,
      dataKey: a,
      value: h.value,
      payload: h.payload,
      points: t
    });
    return /* @__PURE__ */ p.createElement(aT, {
      key: "dot-".concat(y),
      option: r,
      dotProps: x,
      className: i
    });
  }), v = {};
  return l && u != null && (v.clipPath = "url(#clipPath-".concat(c ? "" : "dots-").concat(u, ")")), /* @__PURE__ */ p.createElement(br, {
    zIndex: s
  }, /* @__PURE__ */ p.createElement(Et, Wo({
    className: n
  }, v), d));
}
function Qp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Jp(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Qp(Object(r), !0).forEach(function(n) {
      uT(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Qp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function uT(e, t, r) {
  return (t = sT(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function sT(e) {
  var t = cT(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function cT(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Lx = 0, fT = {
  xAxis: {},
  yAxis: {},
  zAxis: {}
}, Rx = Ae({
  name: "cartesianAxis",
  initialState: fT,
  reducers: {
    addXAxis: {
      reducer(e, t) {
        e.xAxis[t.payload.id] = t.payload;
      },
      prepare: Q()
    },
    replaceXAxis: {
      reducer(e, t) {
        var {
          prev: r,
          next: n
        } = t.payload;
        e.xAxis[r.id] !== void 0 && (r.id !== n.id && delete e.xAxis[r.id], e.xAxis[n.id] = n);
      },
      prepare: Q()
    },
    removeXAxis: {
      reducer(e, t) {
        delete e.xAxis[t.payload.id];
      },
      prepare: Q()
    },
    addYAxis: {
      reducer(e, t) {
        e.yAxis[t.payload.id] = t.payload;
      },
      prepare: Q()
    },
    replaceYAxis: {
      reducer(e, t) {
        var {
          prev: r,
          next: n
        } = t.payload;
        e.yAxis[r.id] !== void 0 && (r.id !== n.id && delete e.yAxis[r.id], e.yAxis[n.id] = n);
      },
      prepare: Q()
    },
    removeYAxis: {
      reducer(e, t) {
        delete e.yAxis[t.payload.id];
      },
      prepare: Q()
    },
    addZAxis: {
      reducer(e, t) {
        e.zAxis[t.payload.id] = t.payload;
      },
      prepare: Q()
    },
    replaceZAxis: {
      reducer(e, t) {
        var {
          prev: r,
          next: n
        } = t.payload;
        e.zAxis[r.id] !== void 0 && (r.id !== n.id && delete e.zAxis[r.id], e.zAxis[n.id] = n);
      },
      prepare: Q()
    },
    removeZAxis: {
      reducer(e, t) {
        delete e.zAxis[t.payload.id];
      },
      prepare: Q()
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
        e.yAxis[r] = Jp(Jp({}, i), {}, {
          width: n,
          widthHistory: l
        });
      }
    }
  }
}), {
  addXAxis: dT,
  replaceXAxis: vT,
  removeXAxis: pT,
  addYAxis: hT,
  replaceYAxis: mT,
  removeYAxis: yT,
  addZAxis: VU,
  replaceZAxis: XU,
  removeZAxis: ZU,
  updateYAxisWidth: gT
} = Rx.actions, bT = Rx.reducer, xT = _([Fe], (e) => ({
  top: e.top,
  bottom: e.bottom,
  left: e.left,
  right: e.right
})), wT = _([xT, vr, pr], (e, t, r) => {
  if (!(!e || t == null || r == null))
    return {
      x: e.left,
      y: e.top,
      width: Math.max(0, t - e.left - e.right),
      height: Math.max(0, r - e.top - e.bottom)
    };
}), Pf = () => G(wT), OT = () => G(Bj);
function eh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Lu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? eh(Object(r), !0).forEach(function(n) {
      PT(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : eh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function PT(e, t, r) {
  return (t = AT(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function AT(e) {
  var t = ST(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function ST(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var _T = (e) => {
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
  }, u = Lu(Lu(Lu({}, l), tc(i)), sc(i)), s;
  return /* @__PURE__ */ p.isValidElement(i) ? s = /* @__PURE__ */ p.cloneElement(i, u) : typeof i == "function" ? s = i(u) : s = /* @__PURE__ */ p.createElement(Mx, u), /* @__PURE__ */ p.createElement(Et, {
    className: "recharts-active-dot",
    clipPath: o
  }, s);
};
function th(e) {
  var {
    points: t,
    mainColor: r,
    activeDot: n,
    itemDataKey: i,
    clipPath: a,
    zIndex: o = yt.activeDot
  } = e, l = G(Wi), u = OT();
  if (t == null || u == null)
    return null;
  var s = t.find((c) => u.includes(c.payload));
  return Ge(s) ? null : /* @__PURE__ */ p.createElement(br, {
    zIndex: o
  }, /* @__PURE__ */ p.createElement(_T, {
    point: s,
    childIndex: Number(l),
    mainColor: r,
    dataKey: i,
    activeDot: n,
    clipPath: a
  }));
}
var ET = (e) => {
  var {
    chartData: t
  } = e, r = me(), n = Ve();
  return p.useEffect(() => n ? () => {
  } : (r(Tp(t)), () => {
    r(Tp(void 0));
  }), [t, r, n]), null;
}, rh = {
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
}, zx = Ae({
  name: "brush",
  initialState: rh,
  reducers: {
    setBrushSettings(e, t) {
      return t.payload == null ? rh : t.payload;
    }
  }
}), {
  setBrushSettings: QU
} = zx.actions, kT = zx.reducer, CT = (e, t) => {
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
function $T(e) {
  return (e % 180 + 180) % 180;
}
var IT = function(t) {
  var {
    width: r,
    height: n
  } = t, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = $T(i), o = a * Math.PI / 180, l = Math.atan(n / r), u = o > l && o < Math.PI - l ? n / Math.sin(o) : r / Math.cos(o);
  return Math.abs(u);
}, jT = {
  dots: [],
  areas: [],
  lines: []
}, Bx = Ae({
  name: "referenceElements",
  initialState: jT,
  reducers: {
    addDot: (e, t) => {
      e.dots.push(t.payload);
    },
    removeDot: (e, t) => {
      var r = He(e).dots.findIndex((n) => n === t.payload);
      r !== -1 && e.dots.splice(r, 1);
    },
    addArea: (e, t) => {
      e.areas.push(t.payload);
    },
    removeArea: (e, t) => {
      var r = He(e).areas.findIndex((n) => n === t.payload);
      r !== -1 && e.areas.splice(r, 1);
    },
    addLine: (e, t) => {
      e.lines.push(t.payload);
    },
    removeLine: (e, t) => {
      var r = He(e).lines.findIndex((n) => n === t.payload);
      r !== -1 && e.lines.splice(r, 1);
    }
  }
}), {
  addDot: JU,
  removeDot: e5,
  addArea: MT,
  removeArea: DT,
  addLine: t5,
  removeLine: r5
} = Bx.actions, TT = Bx.reducer, Fx = /* @__PURE__ */ p.createContext(void 0), NT = (e) => {
  var {
    children: t
  } = e, [r] = p.useState("".concat(Ci("recharts"), "-clip")), n = Pf();
  if (n == null)
    return null;
  var {
    x: i,
    y: a,
    width: o,
    height: l
  } = n;
  return /* @__PURE__ */ p.createElement(Fx.Provider, {
    value: r
  }, /* @__PURE__ */ p.createElement("defs", null, /* @__PURE__ */ p.createElement("clipPath", {
    id: r
  }, /* @__PURE__ */ p.createElement("rect", {
    x: i,
    y: a,
    height: l,
    width: o
  }))), t);
}, LT = () => p.useContext(Fx);
class RT {
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
function nh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ih(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? nh(Object(r), !0).forEach(function(n) {
      zT(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : nh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function zT(e, t, r) {
  return (t = BT(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function BT(e) {
  var t = FT(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function FT(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ko() {
  return Ko = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ko.apply(null, arguments);
}
var WT = (e, t, r, n, i, a, o) => {
  var l, u, s, c, {
    x1: f,
    x2: d,
    y1: v,
    y2: h
  } = o;
  if (i == null || a == null)
    return null;
  var y = new RT({
    x: i,
    y: a
  }), m = {
    x: e ? (l = i.map(f, {
      position: "start"
    })) !== null && l !== void 0 ? l : null : i.rangeMin(),
    y: r ? (u = a.map(v, {
      position: "start"
    })) !== null && u !== void 0 ? u : null : a.rangeMin()
  }, g = {
    x: t ? (s = i.map(d, {
      position: "end"
    })) !== null && s !== void 0 ? s : null : i.rangeMax(),
    y: n ? (c = a.map(h, {
      position: "end"
    })) !== null && c !== void 0 ? c : null : a.rangeMax()
  };
  return o.ifOverflow === "discard" && (!y.isInRange(m) || !y.isInRange(g)) ? null : CT(m, g);
}, KT = (e, t) => {
  var r;
  return /* @__PURE__ */ p.isValidElement(e) ? r = /* @__PURE__ */ p.cloneElement(e, t) : typeof e == "function" ? r = e(t) : r = /* @__PURE__ */ p.createElement(kE, Ko({}, t, {
    className: "recharts-reference-area-rect"
  })), r;
};
function UT(e) {
  var t = me();
  return p.useEffect(() => (t(MT(e)), () => {
    t(DT(e));
  })), null;
}
function HT(e) {
  var {
    x1: t,
    x2: r,
    y1: n,
    y2: i,
    className: a,
    shape: o,
    xAxisId: l,
    yAxisId: u
  } = e, s = LT(), c = Ve(), f = G((w) => Hn(w, "xAxis", l, c)), d = G((w) => Hn(w, "yAxis", u, c));
  if (f == null || d == null)
    return null;
  var v = Bt(t), h = Bt(r), y = Bt(n), m = Bt(i);
  if (!v && !h && !y && !m && !o)
    return null;
  var g = WT(v, h, y, m, f, d, e);
  if (!g && !o)
    return null;
  var x = e.ifOverflow === "hidden", b = x ? "url(#".concat(s, ")") : void 0;
  return /* @__PURE__ */ p.createElement(br, {
    zIndex: e.zIndex
  }, /* @__PURE__ */ p.createElement(Et, {
    className: ee("recharts-reference-area", a)
  }, KT(o, ih(ih({
    clipPath: b
  }, _t(e)), g)), g != null && /* @__PURE__ */ p.createElement(kx, Ko({}, g, {
    lowerWidth: g.width,
    upperWidth: g.width
  }), /* @__PURE__ */ p.createElement($x, {
    label: e.label
  }), e.children)));
}
var GT = {
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  radius: 0,
  fill: "#ccc",
  label: !1,
  fillOpacity: 0.5,
  stroke: "none",
  strokeWidth: 1,
  zIndex: yt.area
};
function Wx(e) {
  var t = Ct(e, GT);
  return /* @__PURE__ */ p.createElement(p.Fragment, null, /* @__PURE__ */ p.createElement(UT, {
    yAxisId: t.yAxisId,
    xAxisId: t.xAxisId,
    ifOverflow: t.ifOverflow,
    x1: t.x1,
    x2: t.x2,
    y1: t.y1,
    y2: t.y2
  }), /* @__PURE__ */ p.createElement(HT, t));
}
Wx.displayName = "ReferenceArea";
function Kx(e, t) {
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
function qT(e, t, r) {
  var n = {
    width: e.width + t.width,
    height: e.height + t.height
  };
  return IT(n, r);
}
function YT(e, t, r) {
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
function Ki(e, t, r, n, i) {
  if (e * t < e * n || e * t > e * i)
    return !1;
  var a = r();
  return e * (t - e * a / 2 - n) >= 0 && e * (t + e * a / 2 - i) <= 0;
}
function VT(e, t) {
  return Kx(e, t + 1);
}
function XT(e, t, r, n, i) {
  for (var a = (n || []).slice(), {
    start: o,
    end: l
  } = t, u = 0, s = 1, c = o, f = function() {
    var h = n?.[u];
    if (h === void 0)
      return {
        v: Kx(n, s)
      };
    var y = u, m, g = () => (m === void 0 && (m = r(h, y)), m), x = h.coordinate, b = u === 0 || Ki(e, x, g, c, l);
    b || (u = 0, c = o, s += 1), b && (c = x + e * (g() / 2 + i), u += s);
  }, d; s <= a.length; )
    if (d = f(), d) return d.v;
  return [];
}
function ZT(e, t, r, n, i) {
  var a = (n || []).slice(), o = a.length;
  if (o === 0)
    return [];
  for (var {
    start: l,
    end: u
  } = t, s = 1; s <= o; s++) {
    for (var c = (o - 1) % s, f = l, d = !0, v = function() {
      var w = n[y];
      if (w == null)
        return 0;
      var P = y, O, S = () => (O === void 0 && (O = r(w, P)), O), A = w.coordinate, C = y === c || Ki(e, A, S, f, u);
      if (!C)
        return d = !1, 1;
      C && (f = A + e * (S() / 2 + i));
    }, h, y = c; y < o && (h = v(), !(h !== 0 && h === 1)); y += s)
      ;
    if (d) {
      for (var m = [], g = c; g < o; g += s) {
        var x = n[g];
        x != null && m.push(x);
      }
      return m;
    }
  }
  return [];
}
function ah(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ke(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ah(Object(r), !0).forEach(function(n) {
      QT(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ah(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function QT(e, t, r) {
  return (t = JT(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function JT(e) {
  var t = eN(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function eN(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function tN(e, t, r, n, i) {
  for (var a = (n || []).slice(), o = a.length, {
    start: l
  } = t, {
    end: u
  } = t, s = function(d) {
    var v = a[d];
    if (v == null)
      return 1;
    var h = v, y, m = () => (y === void 0 && (y = r(v, d)), y);
    if (d === o - 1) {
      var g = e * (h.coordinate + e * m() / 2 - u);
      a[d] = h = Ke(Ke({}, h), {}, {
        tickCoord: g > 0 ? h.coordinate - g * e : h.coordinate
      });
    } else
      a[d] = h = Ke(Ke({}, h), {}, {
        tickCoord: h.coordinate
      });
    if (h.tickCoord != null) {
      var x = Ki(e, h.tickCoord, m, l, u);
      x && (u = h.tickCoord - e * (m() / 2 + i), a[d] = Ke(Ke({}, h), {}, {
        isShow: !0
      }));
    }
  }, c = o - 1; c >= 0; c--)
    s(c);
  return a;
}
function rN(e, t, r, n, i, a) {
  var o = (n || []).slice(), l = o.length, {
    start: u,
    end: s
  } = t;
  if (a) {
    var c = n[l - 1];
    if (c != null) {
      var f = r(c, l - 1), d = e * (c.coordinate + e * f / 2 - s);
      if (o[l - 1] = c = Ke(Ke({}, c), {}, {
        tickCoord: d > 0 ? c.coordinate - d * e : c.coordinate
      }), c.tickCoord != null) {
        var v = Ki(e, c.tickCoord, () => f, u, s);
        v && (s = c.tickCoord - e * (f / 2 + i), o[l - 1] = Ke(Ke({}, c), {}, {
          isShow: !0
        }));
      }
    }
  }
  for (var h = a ? l - 1 : l, y = function(x) {
    var b = o[x];
    if (b == null)
      return 1;
    var w = b, P, O = () => (P === void 0 && (P = r(b, x)), P);
    if (x === 0) {
      var S = e * (w.coordinate - e * O() / 2 - u);
      o[x] = w = Ke(Ke({}, w), {}, {
        tickCoord: S < 0 ? w.coordinate - S * e : w.coordinate
      });
    } else
      o[x] = w = Ke(Ke({}, w), {}, {
        tickCoord: w.coordinate
      });
    if (w.tickCoord != null) {
      var A = Ki(e, w.tickCoord, O, u, s);
      A && (u = w.tickCoord + e * (O() / 2 + i), o[x] = Ke(Ke({}, w), {}, {
        isShow: !0
      }));
    }
  }, m = 0; m < h; m++)
    y(m);
  return o;
}
function Af(e, t, r) {
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
  if (U(u) || ta.isSsr) {
    var d;
    return (d = VT(i, U(u) ? u : 0)) !== null && d !== void 0 ? d : [];
  }
  var v = [], h = l === "top" || l === "bottom" ? "width" : "height", y = c && h === "width" ? Ei(c, {
    fontSize: t,
    letterSpacing: r
  }) : {
    width: 0,
    height: 0
  }, m = (P, O) => {
    var S = typeof s == "function" ? s(P.value, O) : P.value;
    return h === "width" ? qT(Ei(S, {
      fontSize: t,
      letterSpacing: r
    }), y, f) : Ei(S, {
      fontSize: t,
      letterSpacing: r
    })[h];
  }, g = i[0], x = i[1], b = i.length >= 2 && g != null && x != null ? zt(x.coordinate - g.coordinate) : 1, w = YT(a, b, h);
  return u === "equidistantPreserveStart" ? XT(b, w, m, i, o) : u === "equidistantPreserveEnd" ? ZT(b, w, m, i, o) : (u === "preserveStart" || u === "preserveStartEnd" ? v = rN(b, w, m, i, o, u === "preserveStartEnd") : v = tN(b, w, m, i, o), v.filter((P) => P.isShow));
}
var nN = (e) => {
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
}, iN = {
  xAxis: {},
  yAxis: {}
}, Ux = Ae({
  name: "renderedTicks",
  initialState: iN,
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
  setRenderedTicks: aN,
  removeRenderedTicks: oN
} = Ux.actions, lN = Ux.reducer, uN = ["axisLine", "width", "height", "className", "hide", "ticks", "axisType", "axisId"];
function sN(e, t) {
  if (e == null) return {};
  var r, n, i = cN(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function cN(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function pn() {
  return pn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, pn.apply(null, arguments);
}
function oh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ve(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? oh(Object(r), !0).forEach(function(n) {
      fN(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : oh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function fN(e, t, r) {
  return (t = dN(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function dN(e) {
  var t = vN(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function vN(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ir = {
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
  zIndex: yt.axis
};
function pN(e) {
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
  var s = ve(ve(ve({}, u), St(l)), {}, {
    fill: "none"
  });
  if (a === "top" || a === "bottom") {
    var c = +(a === "top" && !o || a === "bottom" && o);
    s = ve(ve({}, s), {}, {
      x1: t,
      y1: r + c * i,
      x2: t + n,
      y2: r + c * i
    });
  } else {
    var f = +(a === "left" && !o || a === "right" && o);
    s = ve(ve({}, s), {}, {
      x1: t + f * n,
      y1: r,
      x2: t + f * n,
      y2: r + i
    });
  }
  return /* @__PURE__ */ p.createElement("line", pn({}, s, {
    className: ee("recharts-cartesian-axis-line", dr(l, "className"))
  }));
}
function hN(e, t, r, n, i, a, o, l, u) {
  var s, c, f, d, v, h, y = l ? -1 : 1, m = e.tickSize || o, g = U(e.tickCoord) ? e.tickCoord : e.coordinate;
  switch (a) {
    case "top":
      s = c = e.coordinate, d = r + +!l * i, f = d - y * m, h = f - y * u, v = g;
      break;
    case "left":
      f = d = e.coordinate, c = t + +!l * n, s = c - y * m, v = s - y * u, h = g;
      break;
    case "right":
      f = d = e.coordinate, c = t + +l * n, s = c + y * m, v = s + y * u, h = g;
      break;
    default:
      s = c = e.coordinate, d = r + +l * i, f = d + y * m, h = f + y * u, v = g;
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
      y: h
    }
  };
}
function mN(e, t) {
  switch (e) {
    case "left":
      return t ? "start" : "end";
    case "right":
      return t ? "end" : "start";
    default:
      return "middle";
  }
}
function yN(e, t) {
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
function gN(e) {
  var {
    option: t,
    tickProps: r,
    value: n
  } = e, i, a = ee(r.className, "recharts-cartesian-axis-tick-value");
  if (/* @__PURE__ */ p.isValidElement(t))
    i = /* @__PURE__ */ p.cloneElement(t, ve(ve({}, r), {}, {
      className: a
    }));
  else if (typeof t == "function")
    i = t(ve(ve({}, r), {}, {
      className: a
    }));
  else {
    var o = "recharts-cartesian-axis-tick-value";
    typeof t != "boolean" && (o = ee(o, RD(t))), i = /* @__PURE__ */ p.createElement(wf, pn({}, r, {
      className: o
    }), n);
  }
  return i;
}
function bN(e) {
  var {
    ticks: t,
    axisType: r,
    axisId: n
  } = e, i = me();
  return p.useEffect(() => {
    if (n == null || r == null)
      return Zn;
    var a = t.map((o) => ({
      value: o.value,
      coordinate: o.coordinate,
      offset: o.offset,
      index: o.index
    }));
    return i(aN({
      ticks: a,
      axisId: n,
      axisType: r
    })), () => {
      i(oN({
        axisId: n,
        axisType: r
      }));
    };
  }, [i, t, n, r]), null;
}
var xN = /* @__PURE__ */ p.forwardRef((e, t) => {
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
    width: h,
    height: y,
    tickSize: m,
    tickMargin: g,
    fontSize: x,
    letterSpacing: b,
    getTicksConfig: w,
    events: P,
    axisType: O,
    axisId: S
  } = e, A = Af(ve(ve({}, w), {}, {
    ticks: r
  }), x, b), C = St(w), $ = tc(n), j = Px(C.textAnchor) ? C.textAnchor : mN(c, f), k = yN(c, f), F = {};
  typeof i == "object" && (F = i);
  var W = ve(ve({}, C), {}, {
    fill: "none"
  }, F), K = A.map((ne) => ve({
    entry: ne
  }, hN(ne, d, v, h, y, c, m, f, g))), Y = K.map((ne) => {
    var {
      entry: J,
      line: D
    } = ne;
    return /* @__PURE__ */ p.createElement(Et, {
      className: "recharts-cartesian-axis-tick",
      key: "tick-".concat(J.value, "-").concat(J.coordinate, "-").concat(J.tickCoord)
    }, i && /* @__PURE__ */ p.createElement("line", pn({}, W, D, {
      className: ee("recharts-cartesian-axis-tick-line", dr(i, "className"))
    })));
  }), H = K.map((ne, J) => {
    var D, Ee, {
      entry: ie,
      tick: Te
    } = ne, ge = ve(ve(ve(ve({
      verticalAnchor: k
    }, C), {}, {
      textAnchor: j,
      stroke: "none",
      fill: a
    }, Te), {}, {
      index: J,
      payload: ie,
      visibleTicksCount: A.length,
      tickFormatter: o,
      padding: u
    }, s), {}, {
      angle: (D = (Ee = s?.angle) !== null && Ee !== void 0 ? Ee : C.angle) !== null && D !== void 0 ? D : 0
    }), ae = ve(ve({}, ge), $);
    return /* @__PURE__ */ p.createElement(Et, pn({
      className: "recharts-cartesian-axis-tick-label",
      key: "tick-label-".concat(ie.value, "-").concat(ie.coordinate, "-").concat(ie.tickCoord)
    }, fP(P, ie, J)), n && /* @__PURE__ */ p.createElement(gN, {
      option: n,
      tickProps: ae,
      value: "".concat(typeof o == "function" ? o(ie.value, J) : ie.value).concat(l || "")
    }));
  });
  return /* @__PURE__ */ p.createElement("g", {
    className: "recharts-cartesian-axis-ticks recharts-".concat(O, "-ticks")
  }, /* @__PURE__ */ p.createElement(bN, {
    ticks: A,
    axisId: S,
    axisType: O
  }), H.length > 0 && /* @__PURE__ */ p.createElement(br, {
    zIndex: yt.label
  }, /* @__PURE__ */ p.createElement("g", {
    className: "recharts-cartesian-axis-tick-labels recharts-".concat(O, "-tick-labels"),
    ref: t
  }, H)), Y.length > 0 && /* @__PURE__ */ p.createElement("g", {
    className: "recharts-cartesian-axis-tick-lines recharts-".concat(O, "-tick-lines")
  }, Y));
}), wN = /* @__PURE__ */ p.forwardRef((e, t) => {
  var {
    axisLine: r,
    width: n,
    height: i,
    className: a,
    hide: o,
    ticks: l,
    axisType: u,
    axisId: s
  } = e, c = sN(e, uN), [f, d] = p.useState(""), [v, h] = p.useState(""), y = p.useRef(null);
  p.useImperativeHandle(t, () => ({
    getCalculatedWidth: () => {
      var g;
      return nN({
        ticks: y.current,
        label: (g = e.labelRef) === null || g === void 0 ? void 0 : g.current,
        labelGapWithTick: 5,
        tickSize: e.tickSize,
        tickMargin: e.tickMargin
      });
    }
  }));
  var m = p.useCallback((g) => {
    if (g) {
      var x = g.getElementsByClassName("recharts-cartesian-axis-tick-value");
      y.current = x;
      var b = x[0];
      if (b) {
        var w = window.getComputedStyle(b), P = w.fontSize, O = w.letterSpacing;
        (P !== f || O !== v) && (d(P), h(O));
      }
    }
  }, [f, v]);
  return o || n != null && n <= 0 || i != null && i <= 0 ? null : /* @__PURE__ */ p.createElement(br, {
    zIndex: e.zIndex
  }, /* @__PURE__ */ p.createElement(Et, {
    className: ee("recharts-cartesian-axis", a)
  }, /* @__PURE__ */ p.createElement(pN, {
    x: e.x,
    y: e.y,
    width: n,
    height: i,
    orientation: e.orientation,
    mirror: e.mirror,
    axisLine: r,
    otherSvgProps: St(e)
  }), /* @__PURE__ */ p.createElement(xN, {
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
  }), /* @__PURE__ */ p.createElement(kx, {
    x: e.x,
    y: e.y,
    width: e.width,
    height: e.height,
    lowerWidth: e.width,
    upperWidth: e.width
  }, /* @__PURE__ */ p.createElement($x, {
    label: e.label,
    labelRef: e.labelRef
  }), e.children)));
}), Sf = /* @__PURE__ */ p.forwardRef((e, t) => {
  var r = Ct(e, ir);
  return /* @__PURE__ */ p.createElement(wN, pn({}, r, {
    ref: t
  }));
});
Sf.displayName = "CartesianAxis";
var ON = ["x1", "y1", "x2", "y2", "key"], PN = ["offset"], AN = ["xAxisId", "yAxisId"], SN = ["xAxisId", "yAxisId"];
function lh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ue(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? lh(Object(r), !0).forEach(function(n) {
      _N(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : lh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function _N(e, t, r) {
  return (t = EN(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function EN(e) {
  var t = kN(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function kN(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function tn() {
  return tn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, tn.apply(null, arguments);
}
function Uo(e, t) {
  if (e == null) return {};
  var r, n, i = CN(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function CN(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var $N = (e) => {
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
  return /* @__PURE__ */ p.createElement("rect", {
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
function Hx(e) {
  var {
    option: t,
    lineItemProps: r
  } = e, n;
  if (/* @__PURE__ */ p.isValidElement(t))
    n = /* @__PURE__ */ p.cloneElement(t, r);
  else if (typeof t == "function")
    n = t(r);
  else {
    var i, {
      x1: a,
      y1: o,
      x2: l,
      y2: u,
      key: s
    } = r, c = Uo(r, ON), f = (i = St(c)) !== null && i !== void 0 ? i : {}, {
      offset: d
    } = f, v = Uo(f, PN);
    n = /* @__PURE__ */ p.createElement("line", tn({}, v, {
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
function IN(e) {
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
  } = e, l = Uo(e, AN), u = i.map((s, c) => {
    var f = Ue(Ue({}, l), {}, {
      x1: t,
      y1: s,
      x2: t + r,
      y2: s,
      key: "line-".concat(c),
      index: c
    });
    return /* @__PURE__ */ p.createElement(Hx, {
      key: "line-".concat(c),
      option: n,
      lineItemProps: f
    });
  });
  return /* @__PURE__ */ p.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, u);
}
function jN(e) {
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
  } = e, l = Uo(e, SN), u = i.map((s, c) => {
    var f = Ue(Ue({}, l), {}, {
      x1: s,
      y1: t,
      x2: s,
      y2: t + r,
      key: "line-".concat(c),
      index: c
    });
    return /* @__PURE__ */ p.createElement(Hx, {
      option: n,
      lineItemProps: f,
      key: "line-".concat(c)
    });
  });
  return /* @__PURE__ */ p.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, u);
}
function MN(e) {
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
    var v = s[d + 1], h = v == null, y = h ? i + o - f : v - f;
    if (y <= 0)
      return null;
    var m = d % t.length;
    return /* @__PURE__ */ p.createElement("rect", {
      key: "react-".concat(d),
      y: f,
      x: n,
      height: y,
      width: a,
      stroke: "none",
      fill: t[m],
      fillOpacity: r,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ p.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, c);
}
function DN(e) {
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
    var v = s[d + 1], h = v == null, y = h ? i + o - f : v - f;
    if (y <= 0)
      return null;
    var m = d % r.length;
    return /* @__PURE__ */ p.createElement("rect", {
      key: "react-".concat(d),
      x: f,
      y: a,
      width: y,
      height: l,
      stroke: "none",
      fill: r[m],
      fillOpacity: n,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ p.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, c);
}
var TN = (e, t) => {
  var {
    xAxis: r,
    width: n,
    height: i,
    offset: a
  } = e;
  return Ng(Af(Ue(Ue(Ue({}, ir), r), {}, {
    ticks: Lg(r),
    viewBox: {
      x: 0,
      y: 0,
      width: n,
      height: i
    }
  })), a.left, a.left + a.width, t);
}, NN = (e, t) => {
  var {
    yAxis: r,
    width: n,
    height: i,
    offset: a
  } = e;
  return Ng(Af(Ue(Ue(Ue({}, ir), r), {}, {
    ticks: Lg(r),
    viewBox: {
      x: 0,
      y: 0,
      width: n,
      height: i
    }
  })), a.top, a.top + a.height, t);
}, LN = {
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
  zIndex: yt.grid
};
function Gx(e) {
  var t = Kg(), r = Ug(), n = l_(), i = Ue(Ue({}, Ct(e, LN)), {}, {
    x: U(e.x) ? e.x : n.left,
    y: U(e.y) ? e.y : n.top,
    width: U(e.width) ? e.width : n.width,
    height: U(e.height) ? e.height : n.height
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
  } = i, h = Ve(), y = G((C) => Pp(C, "xAxis", a, h)), m = G((C) => Pp(C, "yAxis", o, h));
  if (!zn(s) || !zn(c) || !U(l) || !U(u))
    return null;
  var g = i.verticalCoordinatesGenerator || TN, x = i.horizontalCoordinatesGenerator || NN, {
    horizontalPoints: b,
    verticalPoints: w
  } = i;
  if ((!b || !b.length) && typeof x == "function") {
    var P = d && d.length, O = x({
      yAxis: m ? Ue(Ue({}, m), {}, {
        ticks: P ? d : m.ticks
      }) : void 0,
      width: t ?? s,
      height: r ?? c,
      offset: n
    }, P ? !0 : f);
    Kd(Array.isArray(O), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(typeof O, "]")), Array.isArray(O) && (b = O);
  }
  if ((!w || !w.length) && typeof g == "function") {
    var S = v && v.length, A = g({
      xAxis: y ? Ue(Ue({}, y), {}, {
        ticks: S ? v : y.ticks
      }) : void 0,
      width: t ?? s,
      height: r ?? c,
      offset: n
    }, S ? !0 : f);
    Kd(Array.isArray(A), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(typeof A, "]")), Array.isArray(A) && (w = A);
  }
  return /* @__PURE__ */ p.createElement(br, {
    zIndex: i.zIndex
  }, /* @__PURE__ */ p.createElement("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ p.createElement($N, {
    fill: i.fill,
    fillOpacity: i.fillOpacity,
    x: i.x,
    y: i.y,
    width: i.width,
    height: i.height,
    ry: i.ry
  }), /* @__PURE__ */ p.createElement(MN, tn({}, i, {
    horizontalPoints: b
  })), /* @__PURE__ */ p.createElement(DN, tn({}, i, {
    verticalPoints: w
  })), /* @__PURE__ */ p.createElement(IN, tn({}, i, {
    offset: n,
    horizontalPoints: b,
    xAxis: y,
    yAxis: m
  })), /* @__PURE__ */ p.createElement(jN, tn({}, i, {
    offset: n,
    verticalPoints: w,
    xAxis: y,
    yAxis: m
  }))));
}
Gx.displayName = "CartesianGrid";
var RN = {}, qx = Ae({
  name: "errorBars",
  initialState: RN,
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
  addErrorBar: n5,
  replaceErrorBar: i5,
  removeErrorBar: a5
} = qx.actions, zN = qx.reducer;
function Yx(e, t) {
  var r, n, i = G((s) => yr(s, e)), a = G((s) => gr(s, t)), o = (r = i?.allowDataOverflow) !== null && r !== void 0 ? r : xe.allowDataOverflow, l = (n = a?.allowDataOverflow) !== null && n !== void 0 ? n : we.allowDataOverflow, u = o || l;
  return {
    needClip: u,
    needClipX: o,
    needClipY: l
  };
}
function BN(e) {
  var {
    xAxisId: t,
    yAxisId: r,
    clipPathId: n
  } = e, i = Pf(), {
    needClipX: a,
    needClipY: o,
    needClip: l
  } = Yx(t, r);
  if (!l || !i)
    return null;
  var {
    x: u,
    y: s,
    width: c,
    height: f
  } = i;
  return /* @__PURE__ */ p.createElement("clipPath", {
    id: "clipPath-".concat(n)
  }, /* @__PURE__ */ p.createElement("rect", {
    x: a ? u : u - c / 2,
    y: o ? s : s - f / 2,
    width: a ? c : c * 2,
    height: o ? f : f * 2
  }));
}
function FN(e) {
  var t = tc(e), r = 3, n = 2;
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
function _f(e, t) {
  var r, n;
  return (r = (n = e.graphicalItems.cartesianItems.find((i) => i.id === t)) === null || n === void 0 ? void 0 : n.xAxisId) !== null && r !== void 0 ? r : Lx;
}
function Ef(e, t) {
  var r, n;
  return (r = (n = e.graphicalItems.cartesianItems.find((i) => i.id === t)) === null || n === void 0 ? void 0 : n.yAxisId) !== null && r !== void 0 ? r : Lx;
}
var Vx = (e, t, r) => U0(e, "xAxis", _f(e, t), r), Xx = (e, t, r) => K0(e, "xAxis", _f(e, t), r), Zx = (e, t, r) => U0(e, "yAxis", Ef(e, t), r), Qx = (e, t, r) => K0(e, "yAxis", Ef(e, t), r), WN = _([de, Vx, Zx, Xx, Qx], (e, t, r, n, i) => Xt(e, "xAxis") ? Bd(t, n, !1) : Bd(r, i, !1)), KN = (e, t) => t, Jx = _([d0, KN], (e, t) => e.filter((r) => r.type === "area").find((r) => r.id === t)), ew = (e) => {
  var t = de(e), r = Xt(t, "xAxis");
  return r ? "yAxis" : "xAxis";
}, UN = (e, t) => {
  var r = ew(e);
  return r === "yAxis" ? Ef(e, t) : _f(e, t);
}, HN = (e, t, r) => w0(e, ew(e), UN(e, t), r), GN = _([Jx, HN], (e, t) => {
  var r;
  if (!(e == null || t == null)) {
    var {
      stackId: n
    } = e, i = Cc(e);
    if (!(n == null || i == null)) {
      var a = (r = t[n]) === null || r === void 0 ? void 0 : r.stackedData, o = a?.find((l) => l.key === i);
      if (o != null)
        return o.map((l) => [l[0], l[1]]);
    }
  }
}), qN = _([de, Vx, Zx, Xx, Qx, GN, BE, WN, Jx, YE], (e, t, r, n, i, a, o, l, u, s) => {
  var {
    chartData: c,
    dataStartIndex: f,
    dataEndIndex: d
  } = o;
  if (!(u == null || e !== "horizontal" && e !== "vertical" || t == null || r == null || n == null || i == null || n.length === 0 || i.length === 0 || l == null)) {
    var {
      data: v
    } = u, h;
    if (v && v.length > 0 ? h = v : h = c?.slice(f, d + 1), h != null)
      return v2({
        layout: e,
        xAxis: t,
        yAxis: r,
        xAxisTicks: n,
        yAxisTicks: i,
        dataStartIndex: f,
        areaSettings: u,
        stackedData: a,
        displayedData: h,
        chartBaseValue: s,
        bandSize: l
      });
  }
}), YN = ["id"], VN = ["activeDot", "animationBegin", "animationDuration", "animationEasing", "connectNulls", "dot", "fill", "fillOpacity", "hide", "isAnimationActive", "legendType", "stroke", "xAxisId", "yAxisId"];
function un() {
  return un = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, un.apply(null, arguments);
}
function tw(e, t) {
  if (e == null) return {};
  var r, n, i = XN(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function XN(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function uh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function jn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? uh(Object(r), !0).forEach(function(n) {
      ZN(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : uh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ZN(e, t, r) {
  return (t = QN(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function QN(e) {
  var t = JN(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function JN(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ho(e, t) {
  return e && e !== "none" ? e : t;
}
var e2 = (e) => {
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
    color: Ho(n, i),
    value: Rg(r, t),
    payload: e
  }];
}, t2 = /* @__PURE__ */ p.memo((e) => {
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
    getPosition: Zn,
    settings: {
      stroke: n,
      strokeWidth: i,
      fill: a,
      dataKey: t,
      nameKey: void 0,
      name: Rg(o, t),
      hide: l,
      type: s,
      color: Ho(n, a),
      unit: u,
      graphicalItemId: c
    }
  };
  return /* @__PURE__ */ p.createElement(zD, {
    tooltipEntrySettings: f
  });
});
function r2(e) {
  var {
    clipPathId: t,
    points: r,
    props: n
  } = e, {
    needClip: i,
    dot: a,
    dataKey: o
  } = n, l = St(n);
  return /* @__PURE__ */ p.createElement(lT, {
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
function n2(e) {
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
    return jn(jn({}, u), {}, {
      value: a.value,
      payload: a.payload,
      parentViewBox: void 0,
      viewBox: u,
      fill: void 0
    });
  });
  return /* @__PURE__ */ p.createElement(jD, {
    value: t ? i : void 0
  }, r);
}
function sh(e) {
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
  } = a, d = tw(a, YN), v = St(d), h = _t(d);
  return /* @__PURE__ */ p.createElement(p.Fragment, null, t?.length > 1 && /* @__PURE__ */ p.createElement(Et, {
    clipPath: n ? "url(#clipPath-".concat(i, ")") : void 0
  }, /* @__PURE__ */ p.createElement(Ou, un({}, h, {
    id: f,
    points: t,
    connectNulls: s,
    type: l,
    baseLine: r,
    layout: o,
    stroke: "none",
    className: "recharts-area-area"
  })), u !== "none" && /* @__PURE__ */ p.createElement(Ou, un({}, v, {
    className: "recharts-area-curve",
    layout: o,
    type: l,
    connectNulls: s,
    fill: "none",
    points: t
  })), u !== "none" && c && Array.isArray(r) && /* @__PURE__ */ p.createElement(Ou, un({}, v, {
    className: "recharts-area-curve",
    layout: o,
    type: l,
    connectNulls: s,
    fill: "none",
    points: r
  }))), /* @__PURE__ */ p.createElement(r2, {
    points: t,
    props: d,
    clipPathId: i
  }));
}
function i2(e) {
  var t, r, {
    alpha: n,
    baseLine: i,
    points: a,
    strokeWidth: o
  } = e, l = (t = a[0]) === null || t === void 0 ? void 0 : t.y, u = (r = a[a.length - 1]) === null || r === void 0 ? void 0 : r.y;
  if (!Z(l) || !Z(u))
    return null;
  var s = n * Math.abs(l - u), c = Math.max(...a.map((f) => f.x || 0));
  return U(i) ? c = Math.max(i, c) : i && Array.isArray(i) && i.length && (c = Math.max(...i.map((f) => f.x || 0), c)), U(c) ? /* @__PURE__ */ p.createElement("rect", {
    x: 0,
    y: l < u ? l : l - s,
    width: c + (o ? parseInt("".concat(o), 10) : 1),
    height: Math.floor(s)
  }) : null;
}
function a2(e) {
  var t, r, {
    alpha: n,
    baseLine: i,
    points: a,
    strokeWidth: o
  } = e, l = (t = a[0]) === null || t === void 0 ? void 0 : t.x, u = (r = a[a.length - 1]) === null || r === void 0 ? void 0 : r.x;
  if (!Z(l) || !Z(u))
    return null;
  var s = n * Math.abs(l - u), c = Math.max(...a.map((f) => f.y || 0));
  return U(i) ? c = Math.max(i, c) : i && Array.isArray(i) && i.length && (c = Math.max(...i.map((f) => f.y || 0), c)), U(c) ? /* @__PURE__ */ p.createElement("rect", {
    x: l < u ? l : l - s,
    y: 0,
    width: s,
    height: Math.floor(c + (o ? parseInt("".concat(o), 10) : 1))
  }) : null;
}
function o2(e) {
  var {
    alpha: t,
    layout: r,
    points: n,
    baseLine: i,
    strokeWidth: a
  } = e;
  return r === "vertical" ? /* @__PURE__ */ p.createElement(i2, {
    alpha: t,
    points: n,
    baseLine: i,
    strokeWidth: a
  }) : /* @__PURE__ */ p.createElement(a2, {
    alpha: t,
    points: n,
    baseLine: i,
    strokeWidth: a
  });
}
function l2(e) {
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
  } = n, h = p.useMemo(() => ({
    points: o,
    baseLine: l
  }), [o, l]), y = ib(h, "recharts-area-"), m = bc(), [g, x] = p.useState(!1), b = !g, w = p.useCallback(() => {
    typeof v == "function" && v(), x(!1);
  }, [v]), P = p.useCallback(() => {
    typeof d == "function" && d(), x(!0);
  }, [d]);
  if (m == null)
    return null;
  var O = i.current, S = a.current;
  return /* @__PURE__ */ p.createElement(n2, {
    showLabels: b,
    points: o
  }, n.children, /* @__PURE__ */ p.createElement(nb, {
    animationId: y,
    begin: s,
    duration: c,
    isActive: u,
    easing: f,
    onAnimationEnd: w,
    onAnimationStart: P,
    key: y
  }, (A) => {
    if (O) {
      var C = O.length / o.length, $ = (
        /*
         * Here it is important that at the very end of the animation, on the last frame,
         * we render the original points without any interpolation.
         * This is needed because the code above is checking for reference equality to decide if the animation should run
         * and if we create a new array instance (even if the numbers were the same)
         * then we would break animations.
         */
        A === 1 ? o : o.map((k, F) => {
          var W = Math.floor(F * C);
          if (O[W]) {
            var K = O[W];
            return jn(jn({}, k), {}, {
              x: Rt(K.x, k.x, A),
              y: Rt(K.y, k.y, A)
            });
          }
          return k;
        })
      ), j;
      return U(l) ? j = Rt(S, l, A) : Ge(l) || Yt(l) ? j = Rt(S, 0, A) : j = l.map((k, F) => {
        var W = Math.floor(F * C);
        if (Array.isArray(S) && S[W]) {
          var K = S[W];
          return jn(jn({}, k), {}, {
            x: Rt(K.x, k.x, A),
            y: Rt(K.y, k.y, A)
          });
        }
        return k;
      }), A > 0 && (i.current = $, a.current = j), /* @__PURE__ */ p.createElement(sh, {
        points: $,
        baseLine: j,
        needClip: t,
        clipPathId: r,
        props: n
      });
    }
    return A > 0 && (i.current = o, a.current = l), /* @__PURE__ */ p.createElement(Et, null, u && /* @__PURE__ */ p.createElement("defs", null, /* @__PURE__ */ p.createElement("clipPath", {
      id: "animationClipPath-".concat(r)
    }, /* @__PURE__ */ p.createElement(o2, {
      alpha: A,
      points: o,
      baseLine: l,
      layout: m,
      strokeWidth: n.strokeWidth
    }))), /* @__PURE__ */ p.createElement(Et, {
      clipPath: "url(#animationClipPath-".concat(r, ")")
    }, /* @__PURE__ */ p.createElement(sh, {
      points: o,
      baseLine: l,
      needClip: t,
      clipPathId: r,
      props: n
    })));
  }), /* @__PURE__ */ p.createElement(TD, {
    label: n.label
  }));
}
function u2(e) {
  var {
    needClip: t,
    clipPathId: r,
    props: n
  } = e, i = p.useRef(null), a = p.useRef();
  return /* @__PURE__ */ p.createElement(l2, {
    needClip: t,
    clipPathId: r,
    props: n,
    previousPointsRef: i,
    previousBaselineRef: a
  });
}
class s2 extends p.PureComponent {
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
      zIndex: h
    } = this.props;
    if (t)
      return null;
    var y = ee("recharts-area", i), m = d, {
      r: g,
      strokeWidth: x
    } = FN(r), b = Tx(r), w = g * 2 + x, P = l ? "url(#clipPath-".concat(b ? "" : "dots-").concat(m, ")") : void 0;
    return /* @__PURE__ */ p.createElement(br, {
      zIndex: h
    }, /* @__PURE__ */ p.createElement(Et, {
      className: y
    }, l && /* @__PURE__ */ p.createElement("defs", null, /* @__PURE__ */ p.createElement(BN, {
      clipPathId: m,
      xAxisId: u,
      yAxisId: s
    }), !b && /* @__PURE__ */ p.createElement("clipPath", {
      id: "clipPath-dots-".concat(m)
    }, /* @__PURE__ */ p.createElement("rect", {
      x: o - w / 2,
      y: a - w / 2,
      width: c + w,
      height: f + w
    }))), /* @__PURE__ */ p.createElement(u2, {
      needClip: l,
      clipPathId: m,
      props: this.props
    })), /* @__PURE__ */ p.createElement(th, {
      points: n,
      mainColor: Ho(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot,
      clipPath: P
    }), this.props.isRange && Array.isArray(v) && /* @__PURE__ */ p.createElement(th, {
      points: v,
      mainColor: Ho(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot,
      clipPath: P
    }));
  }
}
var c2 = {
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
  zIndex: yt.area
};
function f2(e) {
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
    xAxisId: h,
    yAxisId: y
  } = e, m = tw(e, VN), g = Qi(), x = qj(), {
    needClip: b
  } = Yx(h, y), w = Ve(), {
    points: P,
    isRange: O,
    baseLine: S
  } = (t = G((F) => qN(F, e.id, w))) !== null && t !== void 0 ? t : {}, A = Pf();
  if (g !== "horizontal" && g !== "vertical" || A == null || x !== "AreaChart" && x !== "ComposedChart")
    return null;
  var {
    height: C,
    width: $,
    x: j,
    y: k
  } = A;
  return !P || !P.length ? null : /* @__PURE__ */ p.createElement(s2, un({}, m, {
    activeDot: r,
    animationBegin: n,
    animationDuration: i,
    animationEasing: a,
    baseLine: S,
    connectNulls: o,
    dot: l,
    fill: u,
    fillOpacity: s,
    height: C,
    hide: c,
    layout: g,
    isAnimationActive: f,
    isRange: O,
    legendType: d,
    needClip: b,
    points: P,
    stroke: v,
    width: $,
    left: j,
    top: k,
    xAxisId: h,
    yAxisId: y
  }));
}
var d2 = (e, t, r, n, i) => {
  var a = r ?? t;
  if (U(a))
    return a;
  var o = e === "horizontal" ? i : n, l = o.scale.domain();
  if (o.type === "number") {
    var u = Math.max(l[0], l[1]), s = Math.min(l[0], l[1]);
    return a === "dataMin" ? s : a === "dataMax" || u < 0 ? u : Math.max(Math.min(l[0], l[1]), 0);
  }
  return a === "dataMin" ? l[0] : a === "dataMax" ? l[1] : l[0];
};
function v2(e) {
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
  } = e, h = i && i.length, y = d2(a, o, r, l, u), m = a === "horizontal", g = !1, x = s.map((w, P) => {
    var O, S, A, C;
    if (h)
      C = i[c + P];
    else {
      var $ = Be(w, n);
      Array.isArray($) ? (C = $, g = !0) : C = [y, $];
    }
    var j = (O = (S = C) === null || S === void 0 ? void 0 : S[1]) !== null && O !== void 0 ? O : null, k = j == null || h && !t && Be(w, n) == null;
    if (m) {
      var F;
      return {
        x: Ld({
          axis: l,
          ticks: f,
          bandSize: v,
          entry: w,
          index: P
        }),
        y: k ? null : (F = u.scale.map(j)) !== null && F !== void 0 ? F : null,
        value: C,
        payload: w
      };
    }
    return {
      x: k ? null : (A = l.scale.map(j)) !== null && A !== void 0 ? A : null,
      y: Ld({
        axis: u,
        ticks: d,
        bandSize: v,
        entry: w,
        index: P
      }),
      value: C,
      payload: w
    };
  }), b;
  return h || g ? b = x.map((w) => {
    var P, O = Array.isArray(w.value) ? w.value[0] : null;
    if (m) {
      var S;
      return {
        x: w.x,
        y: O != null && w.y != null && (S = u.scale.map(O)) !== null && S !== void 0 ? S : null,
        payload: w.payload
      };
    }
    return {
      x: O != null && (P = l.scale.map(O)) !== null && P !== void 0 ? P : null,
      y: w.y,
      payload: w.payload
    };
  }) : b = m ? u.scale.map(y) : l.scale.map(y), {
    points: x,
    baseLine: b ?? 0,
    isRange: g
  };
}
function p2(e) {
  var t = Ct(e, c2), r = Ve();
  return /* @__PURE__ */ p.createElement(HD, {
    id: t.id,
    type: "area"
  }, (n) => /* @__PURE__ */ p.createElement(p.Fragment, null, /* @__PURE__ */ p.createElement(BD, {
    legendPayload: e2(t)
  }), /* @__PURE__ */ p.createElement(t2, {
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
  }), /* @__PURE__ */ p.createElement(QD, {
    type: "area",
    id: n,
    data: t.data,
    dataKey: t.dataKey,
    xAxisId: t.xAxisId,
    yAxisId: t.yAxisId,
    zAxisId: 0,
    stackId: NS(t.stackId),
    hide: t.hide,
    barSize: void 0,
    baseValue: t.baseValue,
    isPanorama: r,
    connectNulls: t.connectNulls
  }), /* @__PURE__ */ p.createElement(f2, un({}, t, {
    id: n
  }))));
}
var rw = /* @__PURE__ */ p.memo(p2, kl);
rw.displayName = "Area";
var h2 = ["domain", "range"], m2 = ["domain", "range"];
function ch(e, t) {
  if (e == null) return {};
  var r, n, i = y2(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function y2(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function fh(e, t) {
  return e === t ? !0 : Array.isArray(e) && e.length === 2 && Array.isArray(t) && t.length === 2 ? e[0] === t[0] && e[1] === t[1] : !1;
}
function nw(e, t) {
  if (e === t)
    return !0;
  var {
    domain: r,
    range: n
  } = e, i = ch(e, h2), {
    domain: a,
    range: o
  } = t, l = ch(t, m2);
  return !fh(r, a) || !fh(n, o) ? !1 : kl(i, l);
}
var g2 = ["type"], b2 = ["dangerouslySetInnerHTML", "ticks", "scale"], x2 = ["id", "scale"];
function ks() {
  return ks = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ks.apply(null, arguments);
}
function dh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function vh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? dh(Object(r), !0).forEach(function(n) {
      w2(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : dh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function w2(e, t, r) {
  return (t = O2(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function O2(e) {
  var t = P2(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function P2(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Cs(e, t) {
  if (e == null) return {};
  var r, n, i = A2(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function A2(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function S2(e) {
  var t = me(), r = p.useRef(null), n = bc(), {
    type: i
  } = e, a = Cs(e, g2), o = jl(n, "xAxis", i), l = p.useMemo(() => {
    if (o != null)
      return vh(vh({}, a), {}, {
        type: o
      });
  }, [a, o]);
  return p.useLayoutEffect(() => {
    l != null && (r.current === null ? t(dT(l)) : r.current !== l && t(vT({
      prev: r.current,
      next: l
    })), r.current = l);
  }, [l, t]), p.useLayoutEffect(() => () => {
    r.current && (t(pT(r.current)), r.current = null);
  }, [t]), null;
}
var _2 = (e) => {
  var {
    xAxisId: t,
    className: r
  } = e, n = G(Bg), i = Ve(), a = "xAxis", o = G((g) => W0(g, a, t, i)), l = G((g) => PI(g, t)), u = G((g) => CI(g, t)), s = G((g) => u0(g, t));
  if (l == null || u == null || s == null)
    return null;
  var {
    dangerouslySetInnerHTML: c,
    ticks: f,
    scale: d
  } = e, v = Cs(e, b2), {
    id: h,
    scale: y
  } = s, m = Cs(s, x2);
  return /* @__PURE__ */ p.createElement(Sf, ks({}, v, m, {
    x: u.x,
    y: u.y,
    width: l.width,
    height: l.height,
    className: ee("recharts-".concat(a, " ").concat(a), r),
    viewBox: n,
    ticks: o,
    axisType: a,
    axisId: t
  }));
}, E2 = {
  allowDataOverflow: xe.allowDataOverflow,
  allowDecimals: xe.allowDecimals,
  allowDuplicatedCategory: xe.allowDuplicatedCategory,
  angle: xe.angle,
  axisLine: ir.axisLine,
  height: xe.height,
  hide: !1,
  includeHidden: xe.includeHidden,
  interval: xe.interval,
  label: !1,
  minTickGap: xe.minTickGap,
  mirror: xe.mirror,
  orientation: xe.orientation,
  padding: xe.padding,
  reversed: xe.reversed,
  scale: xe.scale,
  tick: xe.tick,
  tickCount: xe.tickCount,
  tickLine: ir.tickLine,
  tickSize: ir.tickSize,
  type: xe.type,
  niceTicks: xe.niceTicks,
  xAxisId: 0
}, k2 = (e) => {
  var t = Ct(e, E2);
  return /* @__PURE__ */ p.createElement(p.Fragment, null, /* @__PURE__ */ p.createElement(S2, {
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
  }), /* @__PURE__ */ p.createElement(_2, t));
}, iw = /* @__PURE__ */ p.memo(k2, nw);
iw.displayName = "XAxis";
var C2 = ["type"], $2 = ["dangerouslySetInnerHTML", "ticks", "scale"], I2 = ["id", "scale"];
function $s() {
  return $s = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, $s.apply(null, arguments);
}
function ph(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function hh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ph(Object(r), !0).forEach(function(n) {
      j2(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ph(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function j2(e, t, r) {
  return (t = M2(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function M2(e) {
  var t = D2(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function D2(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Is(e, t) {
  if (e == null) return {};
  var r, n, i = T2(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function T2(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function N2(e) {
  var t = me(), r = p.useRef(null), n = bc(), {
    type: i
  } = e, a = Is(e, C2), o = jl(n, "yAxis", i), l = p.useMemo(() => {
    if (o != null)
      return hh(hh({}, a), {}, {
        type: o
      });
  }, [o, a]);
  return p.useLayoutEffect(() => {
    l != null && (r.current === null ? t(hT(l)) : r.current !== l && t(mT({
      prev: r.current,
      next: l
    })), r.current = l);
  }, [l, t]), p.useLayoutEffect(() => () => {
    r.current && (t(yT(r.current)), r.current = null);
  }, [t]), null;
}
function L2(e) {
  var {
    yAxisId: t,
    className: r,
    width: n,
    label: i
  } = e, a = p.useRef(null), o = p.useRef(null), l = G(Bg), u = Ve(), s = me(), c = "yAxis", f = G((O) => jI(O, t)), d = G((O) => II(O, t)), v = G((O) => W0(O, c, t, u)), h = G((O) => s0(O, t));
  if (p.useLayoutEffect(() => {
    if (!(n !== "auto" || !f || Of(i) || /* @__PURE__ */ p.isValidElement(i) || h == null)) {
      var O = a.current;
      if (O) {
        var S = O.getCalculatedWidth();
        Math.round(f.width) !== Math.round(S) && s(gT({
          id: t,
          width: S
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
    h
  ]), f == null || d == null || h == null)
    return null;
  var {
    dangerouslySetInnerHTML: y,
    ticks: m,
    scale: g
  } = e, x = Is(e, $2), {
    id: b,
    scale: w
  } = h, P = Is(h, I2);
  return /* @__PURE__ */ p.createElement(Sf, $s({}, x, P, {
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
    className: ee("recharts-".concat(c, " ").concat(c), r),
    viewBox: l,
    ticks: v,
    axisType: c,
    axisId: t
  }));
}
var R2 = {
  allowDataOverflow: we.allowDataOverflow,
  allowDecimals: we.allowDecimals,
  allowDuplicatedCategory: we.allowDuplicatedCategory,
  angle: we.angle,
  axisLine: ir.axisLine,
  hide: !1,
  includeHidden: we.includeHidden,
  interval: we.interval,
  label: !1,
  minTickGap: we.minTickGap,
  mirror: we.mirror,
  orientation: we.orientation,
  padding: we.padding,
  reversed: we.reversed,
  scale: we.scale,
  tick: we.tick,
  tickCount: we.tickCount,
  tickLine: ir.tickLine,
  tickSize: ir.tickSize,
  type: we.type,
  niceTicks: we.niceTicks,
  width: we.width,
  yAxisId: 0
}, z2 = (e) => {
  var t = Ct(e, R2);
  return /* @__PURE__ */ p.createElement(p.Fragment, null, /* @__PURE__ */ p.createElement(N2, {
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
  }), /* @__PURE__ */ p.createElement(L2, t));
}, aw = /* @__PURE__ */ p.memo(z2, nw);
aw.displayName = "YAxis";
var B2 = (e, t) => t, kf = _([B2, de, Sb, Ie, lx, Mr, Yj, Fe], Qj);
function F2(e) {
  return "getBBox" in e.currentTarget && typeof e.currentTarget.getBBox == "function";
}
function Cf(e) {
  var t = e.currentTarget.getBoundingClientRect(), r, n;
  if (F2(e)) {
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
var ow = lt("mouseClick"), lw = Xi();
lw.startListening({
  actionCreator: ow,
  effect: (e, t) => {
    var r = e.payload, n = kf(t.getState(), Cf(r));
    n?.activeIndex != null && t.dispatch(HI({
      activeIndex: n.activeIndex,
      activeDataKey: void 0,
      activeCoordinate: n.activeCoordinate
    }));
  }
});
var js = lt("mouseMove"), uw = Xi(), Sn = null, Kr = null, Ru = null;
uw.startListening({
  actionCreator: js,
  effect: (e, t) => {
    var r = e.payload, n = t.getState(), {
      throttleDelay: i,
      throttledEvents: a
    } = n.eventSettings, o = a === "all" || a?.includes("mousemove");
    Sn !== null && (cancelAnimationFrame(Sn), Sn = null), Kr !== null && (typeof i != "number" || !o) && (clearTimeout(Kr), Kr = null), Ru = Cf(r);
    var l = () => {
      var u = t.getState(), s = Y0(u, u.tooltip.settings.shared);
      if (!Ru) {
        Sn = null, Kr = null;
        return;
      }
      if (s === "axis") {
        var c = kf(u, Ru);
        c?.activeIndex != null ? t.dispatch(Q0({
          activeIndex: c.activeIndex,
          activeDataKey: void 0,
          activeCoordinate: c.activeCoordinate
        })) : t.dispatch(Z0());
      }
      Sn = null, Kr = null;
    };
    if (!o) {
      l();
      return;
    }
    i === "raf" ? Sn = requestAnimationFrame(l) : typeof i == "number" && Kr === null && (Kr = setTimeout(l, i));
  }
});
function W2(e, t) {
  return t instanceof HTMLElement ? "HTMLElement <".concat(t.tagName, ' class="').concat(t.className, '">') : t === window ? "global.window" : e === "children" && typeof t == "object" && t !== null ? "<<CHILDREN>>" : t;
}
var mh = {
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
}, sw = Ae({
  name: "rootProps",
  initialState: mh,
  reducers: {
    updateOptions: (e, t) => {
      var r;
      e.accessibilityLayer = t.payload.accessibilityLayer, e.barCategoryGap = t.payload.barCategoryGap, e.barGap = (r = t.payload.barGap) !== null && r !== void 0 ? r : mh.barGap, e.barSize = t.payload.barSize, e.maxBarSize = t.payload.maxBarSize, e.stackOffset = t.payload.stackOffset, e.syncId = t.payload.syncId, e.syncMethod = t.payload.syncMethod, e.className = t.payload.className, e.baseValue = t.payload.baseValue, e.reverseStackOrder = t.payload.reverseStackOrder;
    }
  }
}), K2 = sw.reducer, {
  updateOptions: U2
} = sw.actions, H2 = null, G2 = {
  updatePolarOptions: (e, t) => e === null ? t.payload : (e.startAngle = t.payload.startAngle, e.endAngle = t.payload.endAngle, e.cx = t.payload.cx, e.cy = t.payload.cy, e.innerRadius = t.payload.innerRadius, e.outerRadius = t.payload.outerRadius, e)
}, cw = Ae({
  name: "polarOptions",
  initialState: H2,
  reducers: G2
}), {
  updatePolarOptions: o5
} = cw.actions, q2 = cw.reducer, fw = lt("keyDown"), dw = lt("focus"), vw = lt("blur"), Hl = Xi(), _n = null, Ur = null, Na = null;
Hl.startListening({
  actionCreator: fw,
  effect: (e, t) => {
    Na = e.payload, _n !== null && (cancelAnimationFrame(_n), _n = null);
    var r = t.getState(), {
      throttleDelay: n,
      throttledEvents: i
    } = r.eventSettings, a = i === "all" || i.includes("keydown");
    Ur !== null && (typeof n != "number" || !a) && (clearTimeout(Ur), Ur = null);
    var o = () => {
      try {
        var l = t.getState(), u = l.rootProps.accessibilityLayer !== !1;
        if (!u)
          return;
        var {
          keyboardInteraction: s
        } = l.tooltip, c = Na;
        if (c !== "ArrowRight" && c !== "ArrowLeft" && c !== "Enter")
          return;
        var f = df(s, ai(l), sa(l), da(l)), d = f == null ? -1 : Number(f);
        if (!Number.isFinite(d) || d < 0)
          return;
        var v = Mr(l);
        if (c === "Enter") {
          var h = zo(l, "axis", "hover", String(s.index));
          t.dispatch(Ro({
            active: !s.active,
            activeIndex: s.index,
            activeCoordinate: h
          }));
          return;
        }
        var y = LI(l), m = y === "left-to-right" ? 1 : -1, g = c === "ArrowRight" ? 1 : -1, x = d + g * m;
        if (v == null || x >= v.length || x < 0)
          return;
        var b = zo(l, "axis", "hover", String(x));
        t.dispatch(Ro({
          active: !0,
          activeIndex: x.toString(),
          activeCoordinate: b
        }));
      } finally {
        _n = null, Ur = null;
      }
    };
    if (!a) {
      o();
      return;
    }
    n === "raf" ? _n = requestAnimationFrame(o) : typeof n == "number" && Ur === null && (o(), Na = null, Ur = setTimeout(() => {
      Na ? o() : (Ur = null, _n = null);
    }, n));
  }
});
Hl.startListening({
  actionCreator: dw,
  effect: (e, t) => {
    var r = t.getState(), n = r.rootProps.accessibilityLayer !== !1;
    if (n) {
      var {
        keyboardInteraction: i
      } = r.tooltip;
      if (!i.active && i.index == null) {
        var a = "0", o = zo(r, "axis", "hover", String(a));
        t.dispatch(Ro({
          active: !0,
          activeIndex: a,
          activeCoordinate: o
        }));
      }
    }
  }
});
Hl.startListening({
  actionCreator: vw,
  effect: (e, t) => {
    var r = t.getState(), n = r.rootProps.accessibilityLayer !== !1;
    if (n) {
      var {
        keyboardInteraction: i
      } = r.tooltip;
      i.active && t.dispatch(Ro({
        active: !1,
        activeIndex: i.index,
        activeCoordinate: i.coordinate
      }));
    }
  }
});
function pw(e) {
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
var dt = lt("externalEvent"), hw = Xi(), La = /* @__PURE__ */ new Map(), gi = /* @__PURE__ */ new Map(), zu = /* @__PURE__ */ new Map();
hw.startListening({
  actionCreator: dt,
  effect: (e, t) => {
    var {
      handler: r,
      reactEvent: n
    } = e.payload;
    if (r != null) {
      var i = n.type, a = pw(n);
      zu.set(i, {
        handler: r,
        reactEvent: a
      });
      var o = La.get(i);
      o !== void 0 && (cancelAnimationFrame(o), La.delete(i));
      var l = t.getState(), {
        throttleDelay: u,
        throttledEvents: s
      } = l.eventSettings, c = s, f = c === "all" || c?.includes(i), d = gi.get(i);
      d !== void 0 && (typeof u != "number" || !f) && (clearTimeout(d), gi.delete(i));
      var v = () => {
        var m = zu.get(i);
        try {
          if (!m)
            return;
          var {
            handler: g,
            reactEvent: x
          } = m, b = t.getState(), w = {
            activeCoordinate: Lj(b),
            activeDataKey: Tj(b),
            activeIndex: Wi(b),
            activeLabel: sx(b),
            activeTooltipIndex: Wi(b),
            isTooltipActive: Rj(b)
          };
          g && g(w, x);
        } finally {
          La.delete(i), gi.delete(i), zu.delete(i);
        }
      };
      if (!f) {
        v();
        return;
      }
      if (u === "raf") {
        var h = requestAnimationFrame(v);
        La.set(i, h);
      } else if (typeof u == "number") {
        if (!gi.has(i)) {
          v();
          var y = setTimeout(v, u);
          gi.set(i, y);
        }
      } else
        v();
    }
  }
});
var Y2 = _([fa], (e) => e.tooltipItemPayloads), V2 = _([Y2, (e, t) => t, (e, t, r) => r], (e, t, r) => {
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
}), mw = lt("touchMove"), yw = Xi(), Hr = null, xr = null, yh = null, bi = null;
yw.startListening({
  actionCreator: mw,
  effect: (e, t) => {
    var r = e.payload;
    if (!(r.touches == null || r.touches.length === 0)) {
      bi = pw(r);
      var n = t.getState(), {
        throttleDelay: i,
        throttledEvents: a
      } = n.eventSettings, o = a === "all" || a.includes("touchmove");
      Hr !== null && (cancelAnimationFrame(Hr), Hr = null), xr !== null && (typeof i != "number" || !o) && (clearTimeout(xr), xr = null), yh = Array.from(r.touches).map((u) => Cf({
        clientX: u.clientX,
        clientY: u.clientY,
        currentTarget: r.currentTarget
      }));
      var l = () => {
        if (bi != null) {
          var u = t.getState(), s = Y0(u, u.tooltip.settings.shared);
          if (s === "axis") {
            var c, f = (c = yh) === null || c === void 0 ? void 0 : c[0];
            if (f == null) {
              Hr = null, xr = null;
              return;
            }
            var d = kf(u, f);
            d?.activeIndex != null && t.dispatch(Q0({
              activeIndex: d.activeIndex,
              activeDataKey: void 0,
              activeCoordinate: d.activeCoordinate
            }));
          } else if (s === "item") {
            var v, h = bi.touches[0];
            if (document.elementFromPoint == null || h == null)
              return;
            var y = document.elementFromPoint(h.clientX, h.clientY);
            if (!y || !y.getAttribute)
              return;
            var m = y.getAttribute(KS), g = (v = y.getAttribute(US)) !== null && v !== void 0 ? v : void 0, x = ii(u).find((P) => P.id === g);
            if (m == null || x == null || g == null)
              return;
            var {
              dataKey: b
            } = x, w = V2(u, m, g);
            t.dispatch(UI({
              activeDataKey: b,
              activeIndex: m,
              activeCoordinate: w,
              activeGraphicalItemId: g
            }));
          }
          Hr = null, xr = null;
        }
      };
      if (!o) {
        l();
        return;
      }
      i === "raf" ? Hr = requestAnimationFrame(l) : typeof i == "number" && xr === null && (l(), bi = null, xr = setTimeout(() => {
        bi ? l() : (xr = null, Hr = null);
      }, i));
    }
  }
});
var gw = {
  throttleDelay: "raf",
  throttledEvents: ["mousemove", "touchmove", "pointermove", "scroll", "wheel"]
}, bw = Ae({
  name: "eventSettings",
  initialState: gw,
  reducers: {
    setEventSettings: (e, t) => {
      t.payload.throttleDelay != null && (e.throttleDelay = t.payload.throttleDelay), t.payload.throttledEvents != null && (e.throttledEvents = t.payload.throttledEvents);
    }
  }
}), {
  setEventSettings: X2
} = bw.actions, Z2 = bw.reducer, Q2 = lg({
  brush: kT,
  cartesianAxis: bT,
  chartData: OM,
  errorBars: zN,
  eventSettings: Z2,
  graphicalItems: XD,
  layout: ES,
  legend: A_,
  options: gM,
  polarAxis: LD,
  polarOptions: q2,
  referenceElements: TT,
  renderedTicks: lN,
  rootProps: K2,
  tooltip: GI,
  zIndex: dM
}), J2 = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Chart";
  return QA({
    reducer: Q2,
    // redux-toolkit v1 types are unhappy with the preloadedState type. Remove the `as any` when bumping to v2
    preloadedState: t,
    // @ts-expect-error redux-toolkit v1 types are unhappy with the middleware array. Remove this comment when bumping to v2
    middleware: (n) => {
      var i;
      return n({
        serializableCheck: !1,
        immutableCheck: !["commonjs", "es6", "production"].includes((i = "es6") !== null && i !== void 0 ? i : "")
      }).concat([lw.middleware, uw.middleware, Hl.middleware, hw.middleware, yw.middleware]);
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
      return typeof n == "function" && (i = n()), i.concat(Og({
        type: "raf"
      }));
    },
    devTools: {
      serialize: {
        replacer: W2
      },
      name: "recharts-".concat(r)
    }
  });
};
function eL(e) {
  var {
    preloadedState: t,
    children: r,
    reduxStoreName: n
  } = e, i = Ve(), a = p.useRef(null);
  if (i)
    return r;
  a.current == null && (a.current = J2(t, n));
  var o = fc;
  return /* @__PURE__ */ p.createElement(F_, {
    context: o,
    store: a.current
  }, r);
}
function tL(e) {
  var {
    layout: t,
    margin: r
  } = e, n = me(), i = Ve();
  return p.useEffect(() => {
    i || (n(AS(t)), n(PS(r)));
  }, [n, i, t, r]), null;
}
var rL = /* @__PURE__ */ p.memo(tL, kl);
function nL(e) {
  var t = me();
  return p.useEffect(() => {
    t(U2(e));
  }, [t, e]), null;
}
var iL = (e) => {
  var t = me();
  return p.useEffect(() => {
    t(X2(e));
  }, [t, e]), null;
}, aL = /* @__PURE__ */ p.memo(iL, kl);
function gh(e) {
  var {
    zIndex: t,
    isPanorama: r
  } = e, n = p.useRef(null), i = me();
  return p.useLayoutEffect(() => (n.current && i(cM({
    zIndex: t,
    element: n.current,
    isPanorama: r
  })), () => {
    i(fM({
      zIndex: t,
      isPanorama: r
    }));
  }), [i, t, r]), /* @__PURE__ */ p.createElement("g", {
    tabIndex: -1,
    ref: n,
    className: "recharts-zIndex-layer_".concat(t)
  });
}
function bh(e) {
  var {
    children: t,
    isPanorama: r
  } = e, n = G(eM);
  if (!n || n.length === 0)
    return t;
  var i = n.filter((o) => o < 0), a = n.filter((o) => o > 0);
  return /* @__PURE__ */ p.createElement(p.Fragment, null, i.map((o) => /* @__PURE__ */ p.createElement(gh, {
    key: o,
    zIndex: o,
    isPanorama: r
  })), t, a.map((o) => /* @__PURE__ */ p.createElement(gh, {
    key: o,
    zIndex: o,
    isPanorama: r
  })));
}
var oL = ["children"];
function lL(e, t) {
  if (e == null) return {};
  var r, n, i = uL(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function uL(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Go() {
  return Go = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Go.apply(null, arguments);
}
var sL = {
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
}, cL = /* @__PURE__ */ p.forwardRef((e, t) => {
  var r = Kg(), n = Ug(), i = G_();
  if (!zn(r) || !zn(n))
    return null;
  var {
    children: a,
    otherAttributes: o,
    title: l,
    desc: u
  } = e, s, c;
  return o != null && (typeof o.tabIndex == "number" ? s = o.tabIndex : s = i ? 0 : void 0, typeof o.role == "string" ? c = o.role : c = i ? "application" : void 0), /* @__PURE__ */ p.createElement(sy, Go({}, o, {
    title: l,
    desc: u,
    role: c,
    tabIndex: s,
    width: r,
    height: n,
    style: sL,
    ref: t
  }), a);
}), fL = (e) => {
  var {
    children: t
  } = e, r = G(Al);
  if (!r)
    return null;
  var {
    width: n,
    height: i,
    y: a,
    x: o
  } = r;
  return /* @__PURE__ */ p.createElement(sy, {
    width: n,
    height: i,
    x: o,
    y: a
  }, t);
}, xh = /* @__PURE__ */ p.forwardRef((e, t) => {
  var {
    children: r
  } = e, n = lL(e, oL), i = Ve();
  return i ? /* @__PURE__ */ p.createElement(fL, null, /* @__PURE__ */ p.createElement(bh, {
    isPanorama: !0
  }, r)) : /* @__PURE__ */ p.createElement(cL, Go({
    ref: t
  }, n), /* @__PURE__ */ p.createElement(bh, {
    isPanorama: !1
  }, r));
});
function dL() {
  var e = me(), [t, r] = p.useState(null), n = G(WS);
  return p.useEffect(() => {
    if (t != null) {
      var i = t.getBoundingClientRect(), a = i.width / t.offsetWidth;
      Z(a) && a !== n && e(_S(a));
    }
  }, [t, e, n]), r;
}
function wh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function vL(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wh(Object(r), !0).forEach(function(n) {
      pL(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : wh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function pL(e, t, r) {
  return (t = hL(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function hL(e) {
  var t = mL(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function mL(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function $r() {
  return $r = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, $r.apply(null, arguments);
}
var yL = () => (IM(), null);
function qo(e) {
  if (typeof e == "number")
    return e;
  if (typeof e == "string") {
    var t = parseFloat(e);
    if (!Number.isNaN(t))
      return t;
  }
  return 0;
}
var gL = /* @__PURE__ */ p.forwardRef((e, t) => {
  var r, n, i = p.useRef(null), [a, o] = p.useState({
    containerWidth: qo((r = e.style) === null || r === void 0 ? void 0 : r.width),
    containerHeight: qo((n = e.style) === null || n === void 0 ? void 0 : n.height)
  }), l = p.useCallback((s, c) => {
    o((f) => {
      var d = Math.round(s), v = Math.round(c);
      return f.containerWidth === d && f.containerHeight === v ? f : {
        containerWidth: d,
        containerHeight: v
      };
    });
  }, []), u = p.useCallback((s) => {
    if (typeof t == "function" && t(s), s != null && typeof ResizeObserver < "u") {
      var {
        width: c,
        height: f
      } = s.getBoundingClientRect();
      l(c, f);
      var d = (h) => {
        var y = h[0];
        if (y != null) {
          var {
            width: m,
            height: g
          } = y.contentRect;
          l(m, g);
        }
      }, v = new ResizeObserver(d);
      v.observe(s), i.current = v;
    }
  }, [t, l]);
  return p.useEffect(() => () => {
    var s = i.current;
    s?.disconnect();
  }, [l]), /* @__PURE__ */ p.createElement(p.Fragment, null, /* @__PURE__ */ p.createElement(Ji, {
    width: a.containerWidth,
    height: a.containerHeight
  }), /* @__PURE__ */ p.createElement("div", $r({
    ref: u
  }, e)));
}), bL = /* @__PURE__ */ p.forwardRef((e, t) => {
  var {
    width: r,
    height: n
  } = e, [i, a] = p.useState({
    containerWidth: qo(r),
    containerHeight: qo(n)
  }), o = p.useCallback((u, s) => {
    a((c) => {
      var f = Math.round(u), d = Math.round(s);
      return c.containerWidth === f && c.containerHeight === d ? c : {
        containerWidth: f,
        containerHeight: d
      };
    });
  }, []), l = p.useCallback((u) => {
    if (typeof t == "function" && t(u), u != null) {
      var {
        width: s,
        height: c
      } = u.getBoundingClientRect();
      o(s, c);
    }
  }, [t, o]);
  return /* @__PURE__ */ p.createElement(p.Fragment, null, /* @__PURE__ */ p.createElement(Ji, {
    width: i.containerWidth,
    height: i.containerHeight
  }), /* @__PURE__ */ p.createElement("div", $r({
    ref: l
  }, e)));
}), xL = /* @__PURE__ */ p.forwardRef((e, t) => {
  var {
    width: r,
    height: n
  } = e;
  return /* @__PURE__ */ p.createElement(p.Fragment, null, /* @__PURE__ */ p.createElement(Ji, {
    width: r,
    height: n
  }), /* @__PURE__ */ p.createElement("div", $r({
    ref: t
  }, e)));
}), wL = /* @__PURE__ */ p.forwardRef((e, t) => {
  var {
    width: r,
    height: n
  } = e;
  return typeof r == "string" || typeof n == "string" ? /* @__PURE__ */ p.createElement(bL, $r({}, e, {
    ref: t
  })) : typeof r == "number" && typeof n == "number" ? /* @__PURE__ */ p.createElement(xL, $r({}, e, {
    width: r,
    height: n,
    ref: t
  })) : /* @__PURE__ */ p.createElement(p.Fragment, null, /* @__PURE__ */ p.createElement(Ji, {
    width: r,
    height: n
  }), /* @__PURE__ */ p.createElement("div", $r({
    ref: t
  }, e)));
});
function OL(e) {
  return e ? gL : wL;
}
var PL = /* @__PURE__ */ p.forwardRef((e, t) => {
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
    onTouchMove: h,
    onTouchStart: y,
    style: m,
    width: g,
    responsive: x,
    dispatchTouchEvents: b = !0
  } = e, w = p.useRef(null), P = me(), [O, S] = p.useState(null), [A, C] = p.useState(null), $ = dL(), j = Fg(), k = j?.width > 0 ? j.width : g, F = j?.height > 0 ? j.height : i, W = p.useCallback((T) => {
    $(T), typeof t == "function" && t(T), S(T), C(T), T != null && (w.current = T);
  }, [$, t, S, C]), K = p.useCallback((T) => {
    P(ow(T)), P(dt({
      handler: a,
      reactEvent: T
    }));
  }, [P, a]), Y = p.useCallback((T) => {
    P(js(T)), P(dt({
      handler: s,
      reactEvent: T
    }));
  }, [P, s]), H = p.useCallback((T) => {
    P(Z0()), P(dt({
      handler: c,
      reactEvent: T
    }));
  }, [P, c]), ne = p.useCallback((T) => {
    P(js(T)), P(dt({
      handler: f,
      reactEvent: T
    }));
  }, [P, f]), J = p.useCallback(() => {
    P(dw());
  }, [P]), D = p.useCallback(() => {
    P(vw());
  }, [P]), Ee = p.useCallback((T) => {
    P(fw(T.key));
  }, [P]), ie = p.useCallback((T) => {
    P(dt({
      handler: o,
      reactEvent: T
    }));
  }, [P, o]), Te = p.useCallback((T) => {
    P(dt({
      handler: l,
      reactEvent: T
    }));
  }, [P, l]), ge = p.useCallback((T) => {
    P(dt({
      handler: u,
      reactEvent: T
    }));
  }, [P, u]), ae = p.useCallback((T) => {
    P(dt({
      handler: d,
      reactEvent: T
    }));
  }, [P, d]), pe = p.useCallback((T) => {
    P(dt({
      handler: y,
      reactEvent: T
    }));
  }, [P, y]), $t = p.useCallback((T) => {
    b && P(mw(T)), P(dt({
      handler: h,
      reactEvent: T
    }));
  }, [P, b, h]), Ne = p.useCallback((T) => {
    P(dt({
      handler: v,
      reactEvent: T
    }));
  }, [P, v]), M = OL(x);
  return /* @__PURE__ */ p.createElement(vM.Provider, {
    value: O
  }, /* @__PURE__ */ p.createElement(KO.Provider, {
    value: A
  }, /* @__PURE__ */ p.createElement(M, {
    width: k ?? m?.width,
    height: F ?? m?.height,
    className: ee("recharts-wrapper", n),
    style: vL({
      position: "relative",
      cursor: "default",
      width: k,
      height: F
    }, m),
    onClick: K,
    onContextMenu: ie,
    onDoubleClick: Te,
    onFocus: J,
    onBlur: D,
    onKeyDown: Ee,
    onMouseDown: ge,
    onMouseEnter: Y,
    onMouseLeave: H,
    onMouseMove: ne,
    onMouseUp: ae,
    onTouchEnd: Ne,
    onTouchMove: $t,
    onTouchStart: pe,
    ref: W
  }, /* @__PURE__ */ p.createElement(yL, null), r)));
}), AL = ["width", "height", "responsive", "children", "className", "style", "compact", "title", "desc"];
function SL(e, t) {
  if (e == null) return {};
  var r, n, i = _L(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function _L(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var EL = /* @__PURE__ */ p.forwardRef((e, t) => {
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
  } = e, f = SL(e, AL), d = St(f);
  return u ? /* @__PURE__ */ p.createElement(p.Fragment, null, /* @__PURE__ */ p.createElement(Ji, {
    width: r,
    height: n
  }), /* @__PURE__ */ p.createElement(xh, {
    otherAttributes: d,
    title: s,
    desc: c
  }, a)) : /* @__PURE__ */ p.createElement(PL, {
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
  }, /* @__PURE__ */ p.createElement(xh, {
    otherAttributes: d,
    title: s,
    desc: c,
    ref: t
  }, /* @__PURE__ */ p.createElement(NT, null, a)));
});
function Ms() {
  return Ms = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ms.apply(null, arguments);
}
function Oh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function kL(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Oh(Object(r), !0).forEach(function(n) {
      CL(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Oh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function CL(e, t, r) {
  return (t = $L(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function $L(e) {
  var t = IL(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function IL(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var jL = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5
}, ML = kL({
  accessibilityLayer: !0,
  barCategoryGap: "10%",
  barGap: 4,
  layout: "horizontal",
  margin: jL,
  responsive: !1,
  reverseStackOrder: !1,
  stackOffset: "none",
  syncMethod: "index"
}, gw), DL = /* @__PURE__ */ p.forwardRef(function(t, r) {
  var n, i = Ct(t.categoricalChartProps, ML), {
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
  return /* @__PURE__ */ p.createElement(eL, {
    preloadedState: {
      options: c
    },
    reduxStoreName: (n = s.id) !== null && n !== void 0 ? n : a
  }, /* @__PURE__ */ p.createElement(ET, {
    chartData: s.data
  }), /* @__PURE__ */ p.createElement(rL, {
    layout: i.layout,
    margin: i.margin
  }), /* @__PURE__ */ p.createElement(aL, {
    throttleDelay: i.throttleDelay,
    throttledEvents: i.throttledEvents
  }), /* @__PURE__ */ p.createElement(nL, {
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
  }), /* @__PURE__ */ p.createElement(EL, Ms({}, i, {
    ref: r
  })));
}), TL = ["axis"], NL = /* @__PURE__ */ p.forwardRef((e, t) => /* @__PURE__ */ p.createElement(DL, {
  chartName: "AreaChart",
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: TL,
  tooltipPayloadSearcher: mM,
  categoricalChartProps: e,
  ref: t
})), LL = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"];
function $f(e) {
  if (typeof e != "string")
    return !1;
  var t = LL;
  return t.includes(e);
}
var RL = [
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
], zL = new Set(RL);
function xw(e) {
  return typeof e != "string" ? !1 : zL.has(e);
}
function ww(e) {
  return typeof e == "string" && e.startsWith("data-");
}
function Ds(e) {
  if (typeof e != "object" || e === null)
    return {};
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (xw(r) || ww(r)) && (t[r] = e[r]);
  return t;
}
function BL(e) {
  if (e == null)
    return null;
  if (/* @__PURE__ */ p.isValidElement(e) && typeof e.props == "object" && e.props !== null) {
    var t = e.props;
    return Ds(t);
  }
  return typeof e == "object" && !Array.isArray(e) ? Ds(e) : null;
}
function Gn(e) {
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (xw(r) || ww(r) || $f(r)) && (t[r] = e[r]);
  return t;
}
var FL = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function Ts() {
  return Ts = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ts.apply(null, arguments);
}
function WL(e, t) {
  if (e == null) return {};
  var r, n, i = KL(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function KL(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var UL = /* @__PURE__ */ p.forwardRef((e, t) => {
  var {
    children: r,
    width: n,
    height: i,
    viewBox: a,
    className: o,
    style: l,
    title: u,
    desc: s
  } = e, c = WL(e, FL), f = a || {
    width: n,
    height: i,
    x: 0,
    y: 0
  }, d = ee("recharts-surface", o);
  return /* @__PURE__ */ p.createElement("svg", Ts({}, Gn(c), {
    className: d,
    width: n,
    height: i,
    style: l,
    viewBox: "".concat(f.x, " ").concat(f.y, " ").concat(f.width, " ").concat(f.height),
    ref: t
  }), /* @__PURE__ */ p.createElement("title", null, u), /* @__PURE__ */ p.createElement("desc", null, s), r);
}), HL = /* @__PURE__ */ p.createContext(null), GL = () => p.useContext(HL), qL = 4;
function kr(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : qL, r = 10 ** t, n = Math.round(e * r) / r;
  return Object.is(n, -0) ? 0 : n;
}
function ze(e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  return e.reduce((i, a, o) => {
    var l = r[o - 1];
    return typeof l == "string" ? i + l + a : l !== void 0 ? i + kr(l) + a : i + a;
  }, "");
}
var pa = (e) => e === 0 ? 0 : e > 0 ? 1 : -1, oi = (e) => typeof e == "number" && e != +e, Ui = (e) => typeof e == "string" && e.indexOf("%") === e.length - 1, X = (e) => (typeof e == "number" || e instanceof Number) && !oi(e), hn = (e) => X(e) || typeof e == "string", YL = 0, Ph = (e) => {
  var t = ++YL;
  return "".concat(e || "").concat(t);
}, qn = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (!X(t) && typeof t != "string")
    return n;
  var a;
  if (Ui(t)) {
    if (r == null)
      return n;
    var o = t.indexOf("%");
    a = r * parseFloat(t.slice(0, o)) / 100;
  } else
    a = +t;
  return oi(a) && (a = n), i && r != null && a > r && (a = r), a;
}, Ow = (e) => {
  if (!Array.isArray(e))
    return !1;
  for (var t = e.length, r = {}, n = 0; n < t; n++)
    if (!r[String(e[n])])
      r[String(e[n])] = !0;
    else
      return !0;
  return !1;
};
function Ra(e, t, r) {
  return X(e) && X(t) ? kr(e + r * (t - e)) : t;
}
function VL(e, t, r) {
  if (!(!e || !e.length))
    return e.find((n) => n && (typeof t == "function" ? t(n) : dr(n, t)) === r);
}
var Yo = (e) => e === null || typeof e > "u", ha = (e) => Yo(e) ? e : "".concat(e.charAt(0).toUpperCase()).concat(e.slice(1));
function Kt(e) {
  return e != null;
}
function If() {
}
var XL = ["type", "size", "sizeType"];
function Ns() {
  return Ns = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ns.apply(null, arguments);
}
function Ah(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Sh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ah(Object(r), !0).forEach(function(n) {
      ZL(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ah(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ZL(e, t, r) {
  return (t = QL(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function QL(e) {
  var t = JL(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function JL(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function eR(e, t) {
  if (e == null) return {};
  var r, n, i = tR(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function tR(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var Pw = {
  symbolCircle: ac,
  symbolCross: qO,
  symbolDiamond: VO,
  symbolSquare: XO,
  symbolStar: eP,
  symbolTriangle: tP,
  symbolWye: nP
}, rR = Math.PI / 180, nR = (e) => {
  var t = "symbol".concat(ha(e));
  return Pw[t] || ac;
}, iR = (e, t, r) => {
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
      var n = 18 * rR;
      return 1.25 * e * e * (Math.tan(n) - Math.tan(n * 2) * Math.tan(n) ** 2);
    }
    case "triangle":
      return Math.sqrt(3) * e * e / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * e * e / 8;
    default:
      return Math.PI * e * e / 4;
  }
}, aR = (e, t) => {
  Pw["symbol".concat(ha(e))] = t;
}, Aw = (e) => {
  var {
    type: t = "circle",
    size: r = 64,
    sizeType: n = "area"
  } = e, i = eR(e, XL), a = Sh(Sh({}, i), {}, {
    type: t,
    size: r,
    sizeType: n
  }), o = "circle";
  typeof t == "string" && (o = t);
  var l = () => {
    var d = nR(o), v = iP().type(d).size(iR(r, n, o)), h = v();
    if (h !== null)
      return h;
  }, {
    className: u,
    cx: s,
    cy: c
  } = a, f = Gn(a);
  return X(s) && X(c) && X(r) ? /* @__PURE__ */ p.createElement("path", Ns({}, f, {
    className: ee("recharts-symbols", u),
    transform: "translate(".concat(s, ", ").concat(c, ")"),
    d: l()
  })) : null;
};
Aw.registerSymbol = aR;
var Sw = (e) => "radius" in e && "startAngle" in e && "endAngle" in e, oR = (e, t) => {
  if (!e || typeof e == "function" || typeof e == "boolean")
    return null;
  var r = e;
  if (/* @__PURE__ */ p.isValidElement(e) && (r = e.props), typeof r != "object" && typeof r != "function")
    return null;
  var n = {};
  return Object.keys(r).forEach((i) => {
    $f(i) && typeof r[i] == "function" && (n[i] = ((a) => r[i](r, a)));
  }), n;
}, lR = (e, t, r) => (n) => (e(t, r, n), null), uR = (e, t, r) => {
  if (e === null || typeof e != "object" && typeof e != "function")
    return null;
  var n = null;
  return Object.keys(e).forEach((i) => {
    var a = e[i];
    $f(i) && typeof a == "function" && (n || (n = {}), n[i] = lR(a, t, r));
  }), n;
};
function _h(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function sR(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _h(Object(r), !0).forEach(function(n) {
      cR(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _h(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function cR(e, t, r) {
  return (t = fR(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function fR(e) {
  var t = dR(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function dR(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function li(e, t) {
  var r = sR({}, e), n = t, i = Object.keys(t), a = i.reduce((o, l) => (o[l] === void 0 && n[l] !== void 0 && (o[l] = n[l]), o), r);
  return a;
}
function Vo() {
  return Vo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Vo.apply(null, arguments);
}
function Eh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function _w(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Eh(Object(r), !0).forEach(function(n) {
      vR(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Eh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function vR(e, t, r) {
  return (t = pR(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function pR(e) {
  var t = hR(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function hR(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var vt = 32, mR = {
  align: "center",
  iconSize: 14,
  inactiveColor: "#ccc",
  layout: "horizontal",
  verticalAlign: "middle",
  labelStyle: {}
};
function yR(e) {
  if (typeof e == "object" && e !== null && "strokeDasharray" in e)
    return String(e.strokeDasharray);
}
function gR(e) {
  var {
    data: t,
    iconType: r,
    inactiveColor: n
  } = e, i = vt / 2, a = vt / 6, o = vt / 3, l = t.inactive ? n : t.color, u = r ?? t.type;
  if (u === "none")
    return null;
  if (u === "plainline")
    return /* @__PURE__ */ p.createElement("line", {
      strokeWidth: 4,
      fill: "none",
      stroke: l,
      strokeDasharray: yR(t.payload),
      x1: 0,
      y1: i,
      x2: vt,
      y2: i,
      className: "recharts-legend-icon"
    });
  if (u === "line")
    return /* @__PURE__ */ p.createElement("path", {
      strokeWidth: 4,
      fill: "none",
      stroke: l,
      d: "M0,".concat(i, "h").concat(o, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(2 * o, ",").concat(i, `
            H`).concat(vt, "M").concat(2 * o, ",").concat(i, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(o, ",").concat(i),
      className: "recharts-legend-icon"
    });
  if (u === "rect")
    return /* @__PURE__ */ p.createElement("path", {
      stroke: "none",
      fill: l,
      d: "M0,".concat(vt / 8, "h").concat(vt, "v").concat(vt * 3 / 4, "h").concat(-vt, "z"),
      className: "recharts-legend-icon"
    });
  if (/* @__PURE__ */ p.isValidElement(t.legendIcon)) {
    var s = _w({}, t);
    return delete s.legendIcon, /* @__PURE__ */ p.cloneElement(t.legendIcon, s);
  }
  return /* @__PURE__ */ p.createElement(Aw, {
    fill: l,
    cx: i,
    cy: i,
    size: vt,
    sizeType: "diameter",
    type: u
  });
}
function bR(e) {
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
    width: vt,
    height: vt
  }, s = {
    display: n === "horizontal" ? "inline-block" : "block",
    marginRight: 10
  }, c = {
    display: "inline-block",
    verticalAlign: "middle",
    marginRight: 4
  };
  return t.map((f, d) => {
    var v = f.formatter || i, h = ee({
      "recharts-legend-item": !0,
      ["legend-item-".concat(d)]: !0,
      inactive: f.inactive
    });
    if (f.type === "none")
      return null;
    var y = typeof l == "object" ? _w({}, l) : {};
    y.color = f.inactive ? a : y.color || f.color;
    var m = v ? v(f.value, f, d) : f.value;
    return /* @__PURE__ */ p.createElement("li", Vo({
      className: h,
      style: s,
      key: "legend-item-".concat(d)
    }, uR(e, f, d)), /* @__PURE__ */ p.createElement(UL, {
      width: r,
      height: r,
      viewBox: u,
      style: c,
      "aria-label": "".concat(m, " legend icon")
    }, /* @__PURE__ */ p.createElement(gR, {
      data: f,
      iconType: o,
      inactiveColor: a
    })), /* @__PURE__ */ p.createElement("span", {
      className: "recharts-legend-item-text",
      style: y
    }, m));
  });
}
var xR = (e) => {
  var t = li(e, mR), {
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
  return /* @__PURE__ */ p.createElement("ul", {
    className: "recharts-default-legend",
    style: a
  }, /* @__PURE__ */ p.createElement(bR, Vo({}, t, {
    payload: r
  })));
};
function Ew(e, t, r) {
  return t === !0 ? md(e, r) : typeof t == "function" ? md(e, t) : e;
}
var kw = /* @__PURE__ */ p.createContext(null), wR = (e) => e, Gl = () => {
  var e = p.useContext(kw);
  return e ? e.store.dispatch : wR;
}, Ja = () => {
}, OR = () => Ja, PR = (e, t) => e === t;
function ue(e) {
  var t = p.useContext(kw), r = p.useMemo(() => t ? (n) => {
    if (n != null)
      return e(n);
  } : Ja, [t, e]);
  return rg.useSyncExternalStoreWithSelector(t ? t.subscription.addNestedSub : OR, t ? t.store.getState : Ja, t ? t.store.getState : Ja, r, PR);
}
function AR(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function SR(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object")
    throw new TypeError(t);
}
function _R(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((r) => typeof r == "function")) {
    const r = e.map(
      (n) => typeof n == "function" ? `function ${n.name || "unnamed"}()` : typeof n
    ).join(", ");
    throw new TypeError(`${t}[${r}]`);
  }
}
var kh = (e) => Array.isArray(e) ? e : [e];
function ER(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return _R(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function kR(e, t) {
  const r = [], { length: n } = e;
  for (let i = 0; i < n; i++)
    r.push(e[i].apply(null, t));
  return r;
}
var CR = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, $R = typeof WeakRef < "u" ? WeakRef : CR, IR = 0, Ch = 1;
function za() {
  return {
    s: IR,
    v: void 0,
    o: null,
    p: null
  };
}
function Cw(e, t = {}) {
  let r = za();
  const { resultEqualityCheck: n } = t;
  let i, a = 0;
  function o() {
    let l = r;
    const { length: u } = arguments;
    for (let f = 0, d = u; f < d; f++) {
      const v = arguments[f];
      if (typeof v == "function" || typeof v == "object" && v !== null) {
        let h = l.o;
        h === null && (l.o = h = /* @__PURE__ */ new WeakMap());
        const y = h.get(v);
        y === void 0 ? (l = za(), h.set(v, l)) : l = y;
      } else {
        let h = l.p;
        h === null && (l.p = h = /* @__PURE__ */ new Map());
        const y = h.get(v);
        y === void 0 ? (l = za(), h.set(v, l)) : l = y;
      }
    }
    const s = l;
    let c;
    if (l.s === Ch)
      c = l.v;
    else if (c = e.apply(null, arguments), a++, n) {
      const f = i?.deref?.() ?? i;
      f != null && n(f, c) && (c = f, a !== 0 && a--), i = typeof c == "object" && c !== null || typeof c == "function" ? new $R(c) : c;
    }
    return s.s = Ch, s.v = c, c;
  }
  return o.clearCache = () => {
    r = za(), o.resetResultsCount();
  }, o.resultsCount = () => a, o.resetResultsCount = () => {
    a = 0;
  }, o;
}
function jR(e, ...t) {
  const r = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, n = (...i) => {
    let a = 0, o = 0, l, u = {}, s = i.pop();
    typeof s == "object" && (u = s, s = i.pop()), AR(
      s,
      `createSelector expects an output function after the inputs, but received: [${typeof s}]`
    );
    const c = {
      ...r,
      ...u
    }, {
      memoize: f,
      memoizeOptions: d = [],
      argsMemoize: v = Cw,
      argsMemoizeOptions: h = []
    } = c, y = kh(d), m = kh(h), g = ER(i), x = f(function() {
      return a++, s.apply(
        null,
        arguments
      );
    }, ...y), b = v(function() {
      o++;
      const P = kR(
        g,
        arguments
      );
      return l = x.apply(null, P), l;
    }, ...m);
    return Object.assign(b, {
      resultFunc: s,
      memoizedResultFunc: x,
      dependencies: g,
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
var E = /* @__PURE__ */ jR(Cw), MR = Object.assign(
  (e, t = E) => {
    SR(
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
  { withTypes: () => MR }
), $w = (e) => e.legend.settings, DR = (e) => e.legend.size, TR = (e) => e.legend.payload, NR = E([TR, $w], (e, t) => {
  var {
    itemSorter: r
  } = t, n = e.flat(1);
  return r ? gn(n, r) : n;
});
function LR() {
  return ue(NR);
}
var Ba = 1;
function Iw() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], [t, r] = p.useState({
    height: 0,
    left: 0,
    top: 0,
    width: 0
  }), n = p.useCallback(
    (i) => {
      if (i != null) {
        var a = i.getBoundingClientRect(), o = {
          height: a.height,
          left: a.left,
          top: a.top,
          width: a.width
        };
        (Math.abs(o.height - t.height) > Ba || Math.abs(o.left - t.left) > Ba || Math.abs(o.top - t.top) > Ba || Math.abs(o.width - t.width) > Ba) && r({
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
function jw(e, t, r) {
  return Array.isArray(e) && e && t + r !== 0 ? e.slice(t, r + 1) : e;
}
function ce(e) {
  return Number.isFinite(e);
}
function Xo(e) {
  return typeof e == "number" && e > 0 && Number.isFinite(e);
}
function $h(e, t) {
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
    t % 2 ? $h(Object(r), !0).forEach(function(n) {
      RR(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $h(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function RR(e, t, r) {
  return (t = zR(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function zR(e) {
  var t = BR(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function BR(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ot(e, t, r) {
  return Yo(e) || Yo(t) ? r : hn(t) ? dr(e, t, r) : typeof t == "function" ? t(e) : r;
}
var FR = (e, t, r) => {
  if (t && r) {
    var {
      width: n,
      height: i
    } = r, {
      align: a,
      verticalAlign: o,
      layout: l
    } = t;
    if ((l === "vertical" || l === "horizontal" && o === "middle") && a !== "center" && X(e[a]))
      return Mn(Mn({}, e), {}, {
        [a]: e[a] + (n || 0)
      });
    if ((l === "horizontal" || l === "vertical" && a === "center") && o !== "middle" && X(e[o]))
      return Mn(Mn({}, e), {}, {
        [o]: e[o] + (i || 0)
      });
  }
  return e;
}, Dr = (e, t) => e === "horizontal" && t === "xAxis" || e === "vertical" && t === "yAxis" || e === "centric" && t === "angleAxis" || e === "radial" && t === "radiusAxis", WR = (e) => {
  var t, r = e.length;
  if (!(r <= 0)) {
    var n = (t = e[0]) === null || t === void 0 ? void 0 : t.length;
    if (!(n == null || n <= 0))
      for (var i = 0; i < n; ++i)
        for (var a = 0, o = 0, l = 0; l < r; ++l) {
          var u = e[l], s = u?.[i];
          if (s != null) {
            var c = s[1], f = s[0], d = oi(c) ? f : c;
            d >= 0 ? (s[0] = a, a += d, s[1] = a) : (s[0] = o, o += d, s[1] = o);
          }
        }
  }
}, KR = (e) => {
  var t, r = e.length;
  if (!(r <= 0)) {
    var n = (t = e[0]) === null || t === void 0 ? void 0 : t.length;
    if (!(n == null || n <= 0))
      for (var i = 0; i < n; ++i)
        for (var a = 0, o = 0; o < r; ++o) {
          var l = e[o], u = l?.[i];
          if (u != null) {
            var s = oi(u[1]) ? u[0] : u[1];
            s >= 0 ? (u[0] = a, a += s, u[1] = a) : (u[0] = 0, u[1] = 0);
          }
        }
  }
}, UR = {
  sign: WR,
  // @ts-expect-error definitelytyped types are incorrect
  expand: Ry,
  // @ts-expect-error definitelytyped types are incorrect
  none: ar,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: zy,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: By,
  positive: KR
}, HR = (e, t, r) => {
  var n, i = (n = UR[r]) !== null && n !== void 0 ? n : ar, a = Ly().keys(t).value((l, u) => Number(ot(l, u, 0))).order(ao).offset(i), o = a(e);
  return o.forEach((l, u) => {
    l.forEach((s, c) => {
      var f = ot(e[c], t[u], 0);
      Array.isArray(f) && f.length === 2 && X(f[0]) && X(f[1]) && (s[0] = f[0], s[1] = f[1]);
    });
  }), o;
}, GR = (e) => {
  var t = e.flat(2).filter(X);
  return [Math.min(...t), Math.max(...t)];
}, qR = (e) => [e[0] === 1 / 0 ? 0 : e[0], e[1] === -1 / 0 ? 0 : e[1]], YR = (e, t, r) => {
  if (e != null)
    return qR(Object.keys(e).reduce((n, i) => {
      var a = e[i];
      if (!a)
        return n;
      var {
        stackedData: o
      } = a, l = o.reduce((u, s) => {
        var c = jw(s, t, r), f = GR(c);
        return !ce(f[0]) || !ce(f[1]) ? u : [Math.min(u[0], f[0]), Math.max(u[1], f[1])];
      }, [1 / 0, -1 / 0]);
      return [Math.min(l[0], n[0]), Math.max(l[1], n[1])];
    }, [1 / 0, -1 / 0]));
}, Ih = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, jh = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Mh = (e, t, r) => {
  if (e && e.scale && e.scale.bandwidth) {
    var n = e.scale.bandwidth();
    return n;
  }
  if (e && t && t.length >= 2) {
    for (var i = gn(t, (c) => c.coordinate), a = 1 / 0, o = 1, l = i.length; o < l; o++) {
      var u = i[o], s = i[o - 1];
      a = Math.min((u?.coordinate || 0) - (s?.coordinate || 0), a);
    }
    return a === 1 / 0 ? 0 : a;
  }
  return r ? void 0 : 0;
};
function Dh(e) {
  var {
    tooltipEntrySettings: t,
    dataKey: r,
    payload: n,
    value: i,
    name: a
  } = e;
  return Mn(Mn({}, t), {}, {
    dataKey: r,
    payload: n,
    value: i,
    name: a
  });
}
var Tr = (e) => e.layout.width, Nr = (e) => e.layout.height, Mw = (e) => e.layout.margin, ql = E((e) => e.cartesianAxis.xAxis, (e) => Object.values(e)), Yl = E((e) => e.cartesianAxis.yAxis, (e) => Object.values(e)), ma = 60;
function Th(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Fa(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Th(Object(r), !0).forEach(function(n) {
      VR(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Th(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function VR(e, t, r) {
  return (t = XR(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function XR(e) {
  var t = ZR(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function ZR(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var QR = (e) => e.brush.height;
function JR(e) {
  var t = Yl(e);
  return t.reduce((r, n) => {
    if (n.orientation === "left" && !n.mirror && !n.hide) {
      var i = typeof n.width == "number" ? n.width : ma;
      return r + i;
    }
    return r;
  }, 0);
}
function ez(e) {
  var t = Yl(e);
  return t.reduce((r, n) => {
    if (n.orientation === "right" && !n.mirror && !n.hide) {
      var i = typeof n.width == "number" ? n.width : ma;
      return r + i;
    }
    return r;
  }, 0);
}
function tz(e) {
  var t = ql(e);
  return t.reduce((r, n) => n.orientation === "top" && !n.mirror && !n.hide ? r + n.height : r, 0);
}
function rz(e) {
  var t = ql(e);
  return t.reduce((r, n) => n.orientation === "bottom" && !n.mirror && !n.hide ? r + n.height : r, 0);
}
var Ze = E([Tr, Nr, Mw, QR, JR, ez, tz, rz, $w, DR], (e, t, r, n, i, a, o, l, u, s) => {
  var c = {
    left: (r.left || 0) + i,
    right: (r.right || 0) + a
  }, f = {
    top: (r.top || 0) + o,
    bottom: (r.bottom || 0) + l
  }, d = Fa(Fa({}, f), c), v = d.bottom;
  d.bottom += n, d = FR(d, u, s);
  var h = e - d.left - d.right, y = t - d.top - d.bottom;
  return Fa(Fa({
    brushBottom: v
  }, d), {}, {
    // never return negative values for height and width
    width: Math.max(h, 0),
    height: Math.max(y, 0)
  });
}), nz = E(Ze, (e) => ({
  x: e.left,
  y: e.top,
  width: e.width,
  height: e.height
}));
E(Tr, Nr, (e, t) => ({
  x: 0,
  y: 0,
  width: e,
  height: t
}));
var iz = /* @__PURE__ */ p.createContext(null), Dw = () => p.useContext(iz) != null, Vl = (e) => e.brush, jf = E([Vl, Ze, Mw], (e, t, r) => ({
  height: e.height,
  x: X(e.x) ? e.x : t.left,
  y: X(e.y) ? e.y : t.top + t.height + t.brushBottom - (r?.bottom || 0),
  width: X(e.width) ? e.width : t.width
})), Nh = function(t, r) {
  for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++)
    i[a - 2] = arguments[a];
  if (typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
    if (r === void 0)
      console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      var o = 0;
      console.warn(r.replace(/%s/g, () => i[o++]));
    }
}, Ut = {
  width: "100%",
  height: "100%",
  debounce: 0,
  minWidth: 0,
  initialDimension: {
    width: -1,
    height: -1
  }
}, Tw = (e, t, r) => {
  var {
    width: n = Ut.width,
    height: i = Ut.height,
    aspect: a,
    maxHeight: o
  } = r, l = Ui(n) ? e : Number(n), u = Ui(i) ? t : Number(i);
  return a && a > 0 && (l ? u = l / a : u && (l = u * a), o && u != null && u > o && (u = o)), {
    calculatedWidth: l,
    calculatedHeight: u
  };
}, az = {
  width: 0,
  height: 0,
  overflow: "visible"
}, oz = {
  width: 0,
  overflowX: "visible"
}, lz = {
  height: 0,
  overflowY: "visible"
}, uz = {}, sz = (e) => {
  var {
    width: t,
    height: r
  } = e, n = Ui(t), i = Ui(r);
  return n && i ? az : n ? oz : i ? lz : uz;
};
function cz(e) {
  var {
    width: t,
    height: r,
    aspect: n
  } = e, i = t, a = r;
  return i === void 0 && a === void 0 ? (i = Ut.width, a = Ut.height) : i === void 0 ? i = n && n > 0 ? void 0 : Ut.width : a === void 0 && (a = n && n > 0 ? void 0 : Ut.height), {
    width: i,
    height: a
  };
}
function Ls() {
  return Ls = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ls.apply(null, arguments);
}
function Lh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Rh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Lh(Object(r), !0).forEach(function(n) {
      fz(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Lh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function fz(e, t, r) {
  return (t = dz(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function dz(e) {
  var t = vz(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function vz(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Nw = /* @__PURE__ */ p.createContext(Ut.initialDimension);
function pz(e) {
  return Xo(e.width) && Xo(e.height);
}
function Lw(e) {
  var {
    children: t,
    width: r,
    height: n
  } = e, i = p.useMemo(() => ({
    width: r,
    height: n
  }), [r, n]);
  return pz(i) ? /* @__PURE__ */ p.createElement(Nw.Provider, {
    value: i
  }, t) : null;
}
var hz = () => p.useContext(Nw), mz = /* @__PURE__ */ p.forwardRef((e, t) => {
  var {
    aspect: r,
    initialDimension: n = Ut.initialDimension,
    width: i,
    height: a,
    /*
     * default min-width to 0 if not specified - 'auto' causes issues with flexbox
     * https://github.com/recharts/recharts/issues/172
     */
    minWidth: o = Ut.minWidth,
    minHeight: l,
    maxHeight: u,
    children: s,
    debounce: c = Ut.debounce,
    id: f,
    className: d,
    onResize: v,
    style: h = {}
  } = e, y = p.useRef(null), m = p.useRef();
  m.current = v, p.useImperativeHandle(t, () => y.current);
  var [g, x] = p.useState({
    containerWidth: n.width,
    containerHeight: n.height
  }), b = p.useCallback((A, C) => {
    x(($) => {
      var j = Math.round(A), k = Math.round(C);
      return $.containerWidth === j && $.containerHeight === k ? $ : {
        containerWidth: j,
        containerHeight: k
      };
    });
  }, []);
  p.useEffect(() => {
    if (y.current == null || typeof ResizeObserver > "u")
      return If;
    var A = (k) => {
      var F, W = k[0];
      if (W != null) {
        var {
          width: K,
          height: Y
        } = W.contentRect;
        b(K, Y), (F = m.current) === null || F === void 0 || F.call(m, K, Y);
      }
    };
    c > 0 && (A = n_(A, c, {
      trailing: !0,
      leading: !1
    }));
    var C = new ResizeObserver(A), {
      width: $,
      height: j
    } = y.current.getBoundingClientRect();
    return b($, j), C.observe(y.current), () => {
      C.disconnect();
    };
  }, [b, c]);
  var {
    containerWidth: w,
    containerHeight: P
  } = g;
  Nh(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
  var {
    calculatedWidth: O,
    calculatedHeight: S
  } = Tw(w, P, {
    width: i,
    height: a,
    aspect: r,
    maxHeight: u
  });
  return Nh(O != null && O > 0 || S != null && S > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, O, S, i, a, o, l, r), /* @__PURE__ */ p.createElement("div", {
    id: f ? "".concat(f) : void 0,
    className: ee("recharts-responsive-container", d),
    style: Rh(Rh({}, h), {}, {
      width: i,
      height: a,
      minWidth: o,
      minHeight: l,
      maxHeight: u
    }),
    ref: y
  }, /* @__PURE__ */ p.createElement("div", {
    style: sz({
      width: i,
      height: a
    })
  }, /* @__PURE__ */ p.createElement(Lw, {
    width: O,
    height: S
  }, s)));
}), yz = /* @__PURE__ */ p.forwardRef((e, t) => {
  var r = hz();
  if (Xo(r.width) && Xo(r.height))
    return e.children;
  var {
    width: n,
    height: i
  } = cz({
    width: e.width,
    height: e.height,
    aspect: e.aspect
  }), {
    calculatedWidth: a,
    calculatedHeight: o
  } = Tw(void 0, void 0, {
    width: n,
    height: i,
    aspect: e.aspect,
    maxHeight: e.maxHeight
  });
  return X(a) && X(o) ? /* @__PURE__ */ p.createElement(Lw, {
    width: a,
    height: o
  }, e.children) : /* @__PURE__ */ p.createElement(mz, Ls({}, e, {
    width: n,
    height: i,
    ref: t
  }));
}), Rw = () => {
  var e, t = Dw(), r = ue(nz), n = ue(jf), i = (e = ue(Vl)) === null || e === void 0 ? void 0 : e.padding;
  return !t || !n || !i ? r : {
    width: n.width - i.left - i.right,
    height: n.height - i.top - i.bottom,
    x: i.left,
    y: i.top
  };
}, gz = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 0,
  height: 0,
  brushBottom: 0
}, bz = () => {
  var e;
  return (e = ue(Ze)) !== null && e !== void 0 ? e : gz;
}, xz = () => ue(Tr), wz = () => ue(Nr), Oz = () => ue((e) => e.layout.margin), ye = (e) => e.layout.layoutType, Mf = () => ue(ye), zw = (e) => {
  var t = e.layout.layoutType;
  if (t === "centric" || t === "radial")
    return t;
}, Pz = () => {
  var e = Mf();
  return e !== void 0;
}, Bw = Symbol.for("immer-nothing"), zh = Symbol.for("immer-draftable"), st = Symbol.for("immer-state");
function Pt(e, ...t) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var Hi = Object.getPrototypeOf;
function Yn(e) {
  return !!e && !!e[st];
}
function mn(e) {
  return e ? Fw(e) || Array.isArray(e) || !!e[zh] || !!e.constructor?.[zh] || ya(e) || Zl(e) : !1;
}
var Az = Object.prototype.constructor.toString(), Bh = /* @__PURE__ */ new WeakMap();
function Fw(e) {
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
  let n = Bh.get(r);
  return n === void 0 && (n = Function.toString.call(r), Bh.set(r, n)), n === Az;
}
function Zo(e, t, r = !0) {
  Xl(e) === 0 ? (r ? Reflect.ownKeys(e) : Object.keys(e)).forEach((i) => {
    t(i, e[i], e);
  }) : e.forEach((n, i) => t(i, n, e));
}
function Xl(e) {
  const t = e[st];
  return t ? t.type_ : Array.isArray(e) ? 1 : ya(e) ? 2 : Zl(e) ? 3 : 0;
}
function Rs(e, t) {
  return Xl(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Ww(e, t, r) {
  const n = Xl(e);
  n === 2 ? e.set(t, r) : n === 3 ? e.add(r) : e[t] = r;
}
function Sz(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function ya(e) {
  return e instanceof Map;
}
function Zl(e) {
  return e instanceof Set;
}
function Zr(e) {
  return e.copy_ || e.base_;
}
function zs(e, t) {
  if (ya(e))
    return new Map(e);
  if (Zl(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  const r = Fw(e);
  if (t === !0 || t === "class_only" && !r) {
    const n = Object.getOwnPropertyDescriptors(e);
    delete n[st];
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
    return Object.create(Hi(e), n);
  } else {
    const n = Hi(e);
    if (n !== null && r)
      return { ...e };
    const i = Object.create(n);
    return Object.assign(i, e);
  }
}
function Df(e, t = !1) {
  return Ql(e) || Yn(e) || !mn(e) || (Xl(e) > 1 && Object.defineProperties(e, {
    set: Wa,
    add: Wa,
    clear: Wa,
    delete: Wa
  }), Object.freeze(e), t && Object.values(e).forEach((r) => Df(r, !0))), e;
}
function _z() {
  Pt(2);
}
var Wa = {
  value: _z
};
function Ql(e) {
  return e === null || typeof e != "object" ? !0 : Object.isFrozen(e);
}
var Ez = {};
function yn(e) {
  const t = Ez[e];
  return t || Pt(0, e), t;
}
var Gi;
function Kw() {
  return Gi;
}
function kz(e, t) {
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
function Fh(e, t) {
  t && (yn("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function Bs(e) {
  Fs(e), e.drafts_.forEach(Cz), e.drafts_ = null;
}
function Fs(e) {
  e === Gi && (Gi = e.parent_);
}
function Wh(e) {
  return Gi = kz(Gi, e);
}
function Cz(e) {
  const t = e[st];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function Kh(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  return e !== void 0 && e !== r ? (r[st].modified_ && (Bs(t), Pt(4)), mn(e) && (e = Qo(t, e), t.parent_ || Jo(t, e)), t.patches_ && yn("Patches").generateReplacementPatches_(
    r[st].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = Qo(t, r, []), Bs(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== Bw ? e : void 0;
}
function Qo(e, t, r) {
  if (Ql(t))
    return t;
  const n = e.immer_.shouldUseStrictIteration(), i = t[st];
  if (!i)
    return Zo(
      t,
      (a, o) => Uh(e, i, t, a, o, r),
      n
    ), t;
  if (i.scope_ !== e)
    return t;
  if (!i.modified_)
    return Jo(e, i.base_, !0), i.base_;
  if (!i.finalized_) {
    i.finalized_ = !0, i.scope_.unfinalizedDrafts_--;
    const a = i.copy_;
    let o = a, l = !1;
    i.type_ === 3 && (o = new Set(a), a.clear(), l = !0), Zo(
      o,
      (u, s) => Uh(
        e,
        i,
        a,
        u,
        s,
        r,
        l
      ),
      n
    ), Jo(e, a, !1), r && e.patches_ && yn("Patches").generatePatches_(
      i,
      r,
      e.patches_,
      e.inversePatches_
    );
  }
  return i.copy_;
}
function Uh(e, t, r, n, i, a, o) {
  if (i == null || typeof i != "object" && !o)
    return;
  const l = Ql(i);
  if (!(l && !o)) {
    if (Yn(i)) {
      const u = a && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
      !Rs(t.assigned_, n) ? a.concat(n) : void 0, s = Qo(e, i, u);
      if (Ww(r, n, s), Yn(s))
        e.canAutoFreeze_ = !1;
      else
        return;
    } else o && r.add(i);
    if (mn(i) && !l) {
      if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1 || t && t.base_ && t.base_[n] === i && l)
        return;
      Qo(e, i), (!t || !t.scope_.parent_) && typeof n != "symbol" && (ya(r) ? r.has(n) : Object.prototype.propertyIsEnumerable.call(r, n)) && Jo(e, i);
    }
  }
}
function Jo(e, t, r = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && Df(t, r);
}
function $z(e, t) {
  const r = Array.isArray(e), n = {
    type_: r ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : Kw(),
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
  let i = n, a = Tf;
  r && (i = [n], a = qi);
  const { revoke: o, proxy: l } = Proxy.revocable(i, a);
  return n.draft_ = l, n.revoke_ = o, l;
}
var Tf = {
  get(e, t) {
    if (t === st)
      return e;
    const r = Zr(e);
    if (!Rs(r, t))
      return Iz(e, r, t);
    const n = r[t];
    return e.finalized_ || !mn(n) ? n : n === Bu(e.base_, t) ? (Fu(e), e.copy_[t] = Ks(n, e)) : n;
  },
  has(e, t) {
    return t in Zr(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(Zr(e));
  },
  set(e, t, r) {
    const n = Uw(Zr(e), t);
    if (n?.set)
      return n.set.call(e.draft_, r), !0;
    if (!e.modified_) {
      const i = Bu(Zr(e), t), a = i?.[st];
      if (a && a.base_ === r)
        return e.copy_[t] = r, e.assigned_[t] = !1, !0;
      if (Sz(r, i) && (r !== void 0 || Rs(e.base_, t)))
        return !0;
      Fu(e), Ws(e);
    }
    return e.copy_[t] === r && // special case: handle new props with value 'undefined'
    (r !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(r) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = r, e.assigned_[t] = !0), !0;
  },
  deleteProperty(e, t) {
    return Bu(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, Fu(e), Ws(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const r = Zr(e), n = Reflect.getOwnPropertyDescriptor(r, t);
    return n && {
      writable: !0,
      configurable: e.type_ !== 1 || t !== "length",
      enumerable: n.enumerable,
      value: r[t]
    };
  },
  defineProperty() {
    Pt(11);
  },
  getPrototypeOf(e) {
    return Hi(e.base_);
  },
  setPrototypeOf() {
    Pt(12);
  }
}, qi = {};
Zo(Tf, (e, t) => {
  qi[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
qi.deleteProperty = function(e, t) {
  return qi.set.call(this, e, t, void 0);
};
qi.set = function(e, t, r) {
  return Tf.set.call(this, e[0], t, r, e[0]);
};
function Bu(e, t) {
  const r = e[st];
  return (r ? Zr(r) : e)[t];
}
function Iz(e, t, r) {
  const n = Uw(t, r);
  return n ? "value" in n ? n.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    n.get?.call(e.draft_)
  ) : void 0;
}
function Uw(e, t) {
  if (!(t in e))
    return;
  let r = Hi(e);
  for (; r; ) {
    const n = Object.getOwnPropertyDescriptor(r, t);
    if (n)
      return n;
    r = Hi(r);
  }
}
function Ws(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && Ws(e.parent_));
}
function Fu(e) {
  e.copy_ || (e.copy_ = zs(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var jz = class {
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
      typeof r != "function" && Pt(6), n !== void 0 && typeof n != "function" && Pt(7);
      let i;
      if (mn(t)) {
        const a = Wh(this), o = Ks(t, void 0);
        let l = !0;
        try {
          i = r(o), l = !1;
        } finally {
          l ? Bs(a) : Fs(a);
        }
        return Fh(a, n), Kh(i, a);
      } else if (!t || typeof t != "object") {
        if (i = r(t), i === void 0 && (i = t), i === Bw && (i = void 0), this.autoFreeze_ && Df(i, !0), n) {
          const a = [], o = [];
          yn("Patches").generateReplacementPatches_(t, i, a, o), n(a, o);
        }
        return i;
      } else
        Pt(1, t);
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
    mn(e) || Pt(8), Yn(e) && (e = Mz(e));
    const t = Wh(this), r = Ks(e, void 0);
    return r[st].isManual_ = !0, Fs(t), r;
  }
  finishDraft(e, t) {
    const r = e && e[st];
    (!r || !r.isManual_) && Pt(9);
    const { scope_: n } = r;
    return Fh(n, t), Kh(void 0, n);
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
    const n = yn("Patches").applyPatches_;
    return Yn(e) ? n(e, t) : this.produce(
      e,
      (i) => n(i, t)
    );
  }
};
function Ks(e, t) {
  const r = ya(e) ? yn("MapSet").proxyMap_(e, t) : Zl(e) ? yn("MapSet").proxySet_(e, t) : $z(e, t);
  return (t ? t.scope_ : Kw()).drafts_.push(r), r;
}
function Mz(e) {
  return Yn(e) || Pt(10, e), Hw(e);
}
function Hw(e) {
  if (!mn(e) || Ql(e))
    return e;
  const t = e[st];
  let r, n = !0;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, r = zs(e, t.scope_.immer_.useStrictShallowCopy_), n = t.scope_.immer_.shouldUseStrictIteration();
  } else
    r = zs(e, !0);
  return Zo(
    r,
    (i, a) => {
      Ww(r, i, Hw(a));
    },
    n
  ), t && (t.finalized_ = !1), r;
}
var Dz = new jz();
Dz.produce;
var Tz = {
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
}, Nz = Ae({
  name: "legend",
  initialState: Tz,
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
      prepare: Q()
    },
    replaceLegendPayload: {
      reducer(e, t) {
        var {
          prev: r,
          next: n
        } = t.payload, i = He(e).payload.indexOf(r);
        i > -1 && (e.payload[i] = n);
      },
      prepare: Q()
    },
    removeLegendPayload: {
      reducer(e, t) {
        var r = He(e).payload.indexOf(t.payload);
        r > -1 && e.payload.splice(r, 1);
      },
      prepare: Q()
    }
  }
}), {
  setLegendSize: Hh,
  setLegendSettings: Lz,
  addLegendPayload: l5,
  replaceLegendPayload: u5,
  removeLegendPayload: s5
} = Nz.actions, Rz = /* @__PURE__ */ new Set([
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
function zz(e, t) {
  return e == null && t == null ? !0 : typeof e == "number" && typeof t == "number" ? e === t || e !== e && t !== t : e === t;
}
function Bz(e, t) {
  var r = /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)]);
  for (var n of r)
    if (Rz.has(n)) {
      if (e[n] == null && t[n] == null)
        continue;
      if (!Jg(e[n], t[n]))
        return !1;
    } else if (!zz(e[n], t[n]))
      return !1;
  return !0;
}
var Fz = ["contextPayload"];
function Us() {
  return Us = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Us.apply(null, arguments);
}
function Gh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Vn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Gh(Object(r), !0).forEach(function(n) {
      Wz(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Gh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Wz(e, t, r) {
  return (t = Kz(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Kz(e) {
  var t = Uz(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Uz(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Hz(e, t) {
  if (e == null) return {};
  var r, n, i = Gz(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function Gz(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function qz(e) {
  return e.value;
}
function Yz(e) {
  var {
    contextPayload: t
  } = e, r = Hz(e, Fz), n = Ew(t, e.payloadUniqBy, qz), i = Vn(Vn({}, r), {}, {
    payload: n
  });
  return /* @__PURE__ */ p.isValidElement(e.content) ? /* @__PURE__ */ p.cloneElement(e.content, i) : typeof e.content == "function" ? /* @__PURE__ */ p.createElement(e.content, i) : /* @__PURE__ */ p.createElement(xR, i);
}
function Vz(e, t, r, n, i, a) {
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
  }), Vn(Vn({}, s), c);
}
function Xz(e) {
  var t = Gl();
  return p.useEffect(() => {
    t(Lz(e));
  }, [t, e]), null;
}
function Zz(e) {
  var t = Gl();
  return p.useEffect(() => (t(Hh(e)), () => {
    t(Hh({
      width: 0,
      height: 0
    }));
  }), [t, e]), null;
}
function Qz(e, t, r, n) {
  return e === "vertical" && t != null ? {
    height: t
  } : e === "horizontal" ? {
    width: r || n
  } : null;
}
var Jz = {
  align: "center",
  iconSize: 14,
  inactiveColor: "#ccc",
  itemSorter: "value",
  layout: "horizontal",
  verticalAlign: "bottom"
};
function eB(e) {
  var t = li(e, Jz), r = LR(), n = GL(), i = Oz(), {
    width: a,
    height: o,
    wrapperStyle: l,
    portal: u
  } = t, [s, c] = Iw([r]), f = xz(), d = wz();
  if (f == null || d == null)
    return null;
  var v = f - (i?.left || 0) - (i?.right || 0), h = Qz(t.layout, o, a, v), y = u ? l : Vn(Vn({
    position: "absolute",
    width: h?.width || a || "auto",
    height: h?.height || o || "auto"
  }, Vz(l, t, i, f, d, s)), l), m = u ?? n;
  if (m == null || r == null)
    return null;
  var g = /* @__PURE__ */ p.createElement("div", {
    className: "recharts-legend-wrapper",
    style: y,
    ref: c
  }, /* @__PURE__ */ p.createElement(Xz, {
    layout: t.layout,
    align: t.align,
    verticalAlign: t.verticalAlign,
    itemSorter: t.itemSorter
  }), !u && /* @__PURE__ */ p.createElement(Zz, {
    width: s.width,
    height: s.height
  }), /* @__PURE__ */ p.createElement(Yz, Us({}, t, h, {
    margin: i,
    chartWidth: f,
    chartHeight: d,
    contextPayload: r
  })));
  return /* @__PURE__ */ sl.createPortal(g, m);
}
var Gw = /* @__PURE__ */ p.memo(eB, Bz);
Gw.displayName = "Legend";
function Hs() {
  return Hs = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Hs.apply(null, arguments);
}
function qh(e, t) {
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
    t % 2 ? qh(Object(r), !0).forEach(function(n) {
      tB(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : qh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function tB(e, t, r) {
  return (t = rB(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function rB(e) {
  var t = nB(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function nB(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function iB(e) {
  return Array.isArray(e) && hn(e[0]) && hn(e[1]) ? e.join(" ~ ") : e;
}
var En = {
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
function aB(e, t) {
  return t == null ? e : gn(e, t);
}
var oB = (e) => {
  var {
    separator: t = En.separator,
    contentStyle: r,
    itemStyle: n,
    labelStyle: i = En.labelStyle,
    payload: a,
    formatter: o,
    itemSorter: l,
    wrapperClassName: u,
    labelClassName: s,
    label: c,
    labelFormatter: f,
    accessibilityLayer: d = En.accessibilityLayer
  } = e, v = () => {
    if (a && a.length) {
      var P = {
        padding: 0,
        margin: 0
      }, O = aB(a, l), S = O.map((A, C) => {
        if (A.type === "none")
          return null;
        var $ = A.formatter || o || iB, {
          value: j,
          name: k
        } = A, F = j, W = k;
        if ($) {
          var K = $(j, k, A, C, a);
          if (Array.isArray(K))
            [F, W] = K;
          else if (K != null)
            F = K;
          else
            return null;
        }
        var Y = xi(xi({}, En.itemStyle), {}, {
          color: A.color || En.itemStyle.color
        }, n);
        return /* @__PURE__ */ p.createElement("li", {
          className: "recharts-tooltip-item",
          key: "tooltip-item-".concat(C),
          style: Y
        }, hn(W) ? /* @__PURE__ */ p.createElement("span", {
          className: "recharts-tooltip-item-name"
        }, W) : null, hn(W) ? /* @__PURE__ */ p.createElement("span", {
          className: "recharts-tooltip-item-separator"
        }, t) : null, /* @__PURE__ */ p.createElement("span", {
          className: "recharts-tooltip-item-value"
        }, F), /* @__PURE__ */ p.createElement("span", {
          className: "recharts-tooltip-item-unit"
        }, A.unit || ""));
      });
      return /* @__PURE__ */ p.createElement("ul", {
        className: "recharts-tooltip-item-list",
        style: P
      }, S);
    }
    return null;
  }, h = xi(xi({}, En.contentStyle), r), y = xi({
    margin: 0
  }, i), m = !Yo(c), g = m ? c : "", x = ee("recharts-default-tooltip", u), b = ee("recharts-tooltip-label", s);
  m && f && a !== void 0 && a !== null && (g = f(c, a));
  var w = d ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ p.createElement("div", Hs({
    className: x,
    style: h
  }, w), /* @__PURE__ */ p.createElement("p", {
    className: b,
    style: y
  }, /* @__PURE__ */ p.isValidElement(g) ? g : "".concat(g)), v());
}, wi = "recharts-tooltip-wrapper", lB = {
  visibility: "hidden"
};
function uB(e) {
  var {
    coordinate: t,
    translateX: r,
    translateY: n
  } = e;
  return ee(wi, {
    ["".concat(wi, "-right")]: X(r) && t && X(t.x) && r >= t.x,
    ["".concat(wi, "-left")]: X(r) && t && X(t.x) && r < t.x,
    ["".concat(wi, "-bottom")]: X(n) && t && X(t.y) && n >= t.y,
    ["".concat(wi, "-top")]: X(n) && t && X(t.y) && n < t.y
  });
}
function Yh(e) {
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
  if (a && X(a[n]))
    return a[n];
  var c = r[n] - l - (i > 0 ? i : 0), f = r[n] + i;
  if (t[n])
    return o[n] ? c : f;
  var d = u[n];
  if (d == null)
    return 0;
  if (o[n]) {
    var v = c, h = d;
    return v < h ? Math.max(f, d) : Math.max(c, d);
  }
  if (s == null)
    return 0;
  var y = f + l, m = d + s;
  return y > m ? Math.max(c, d) : Math.max(f, d);
}
function sB(e) {
  var {
    translateX: t,
    translateY: r,
    useTranslate3d: n
  } = e;
  return {
    transform: n ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)") : "translate(".concat(t, "px, ").concat(r, "px)")
  };
}
function cB(e) {
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
  return l.height > 0 && l.width > 0 && r ? (f = Yh({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "x",
    offset: i,
    position: a,
    reverseDirection: o,
    tooltipDimension: l.width,
    viewBox: s,
    viewBoxDimension: s.width
  }), d = Yh({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "y",
    offset: n,
    position: a,
    reverseDirection: o,
    tooltipDimension: l.height,
    viewBox: s,
    viewBoxDimension: s.height
  }), c = sB({
    translateX: f,
    translateY: d,
    useTranslate3d: u
  })) : c = lB, {
    cssProperties: c,
    cssClasses: uB({
      translateX: f,
      translateY: d,
      coordinate: r
    })
  };
}
var fB = () => !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout), qw = {
  isSsr: fB()
};
function Yw() {
  var [e, t] = p.useState(() => qw.isSsr || !window.matchMedia ? !1 : window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  return p.useEffect(() => {
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
function Vh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function kn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Vh(Object(r), !0).forEach(function(n) {
      dB(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Vh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function dB(e, t, r) {
  return (t = vB(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function vB(e) {
  var t = pB(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function pB(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function hB(e) {
  if (!(e.prefersReducedMotion && e.isAnimationActive === "auto") && e.isAnimationActive && e.active)
    return "transform ".concat(e.animationDuration, "ms ").concat(e.animationEasing);
}
function mB(e) {
  var t, r, n, i, a, o, l = Yw(), [u, s] = p.useState(() => ({
    dismissed: !1,
    dismissedAtCoordinate: {
      x: 0,
      y: 0
    }
  }));
  p.useEffect(() => {
    var h = (y) => {
      if (y.key === "Escape") {
        var m, g, x, b;
        s({
          dismissed: !0,
          dismissedAtCoordinate: {
            x: (m = (g = e.coordinate) === null || g === void 0 ? void 0 : g.x) !== null && m !== void 0 ? m : 0,
            y: (x = (b = e.coordinate) === null || b === void 0 ? void 0 : b.y) !== null && x !== void 0 ? x : 0
          }
        });
      }
    };
    return document.addEventListener("keydown", h), () => {
      document.removeEventListener("keydown", h);
    };
  }, [(t = e.coordinate) === null || t === void 0 ? void 0 : t.x, (r = e.coordinate) === null || r === void 0 ? void 0 : r.y]), u.dismissed && (((n = (i = e.coordinate) === null || i === void 0 ? void 0 : i.x) !== null && n !== void 0 ? n : 0) !== u.dismissedAtCoordinate.x || ((a = (o = e.coordinate) === null || o === void 0 ? void 0 : o.y) !== null && a !== void 0 ? a : 0) !== u.dismissedAtCoordinate.y) && s(kn(kn({}, u), {}, {
    dismissed: !1
  }));
  var {
    cssClasses: c,
    cssProperties: f
  } = cB({
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
  }), d = e.hasPortalFromProps ? {} : kn(kn({
    transition: hB({
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
  }), v = kn(kn({}, d), {}, {
    visibility: !u.dismissed && e.active && e.hasPayload ? "visible" : "hidden"
  }, e.wrapperStyle);
  return /* @__PURE__ */ p.createElement("div", {
    // @ts-expect-error typescript library does not recognize xmlns attribute, but it's required for an HTML chunk inside SVG.
    xmlns: "http://www.w3.org/1999/xhtml",
    tabIndex: -1,
    className: c,
    style: v,
    ref: e.innerRef
  }, e.children);
}
var yB = /* @__PURE__ */ p.memo(mB), gB = () => {
  var e;
  return (e = ue((t) => t.rootProps.accessibilityLayer)) !== null && e !== void 0 ? e : !0;
};
function Gs() {
  return Gs = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Gs.apply(null, arguments);
}
function Xh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Zh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Xh(Object(r), !0).forEach(function(n) {
      bB(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Xh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function bB(e, t, r) {
  return (t = xB(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function xB(e) {
  var t = wB(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function wB(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Qh = {
  curveBasisClosed: Py,
  curveBasisOpen: Sy,
  curveBasis: wy,
  curveBumpX: my,
  curveBumpY: yy,
  curveLinearClosed: Ey,
  curveLinear: Xn,
  curveMonotoneX: $y,
  curveMonotoneY: Iy,
  curveNatural: My,
  curveStep: Dy,
  curveStepAfter: Ny,
  curveStepBefore: Ty
}, el = (e) => ce(e.x) && ce(e.y), Jh = (e) => e.base != null && el(e.base) && el(e), Oi = (e) => e.x, Pi = (e) => e.y, OB = (e, t) => {
  if (typeof e == "function")
    return e;
  var r = "curve".concat(ha(e));
  if ((r === "curveMonotone" || r === "curveBump") && t) {
    var n = Qh["".concat(r).concat(t === "vertical" ? "Y" : "X")];
    if (n)
      return n;
  }
  return Qh[r] || Xn;
}, em = {
  connectNulls: !1,
  type: "linear"
}, PB = (e) => {
  var {
    type: t = em.type,
    points: r = [],
    baseLine: n,
    layout: i,
    connectNulls: a = em.connectNulls
  } = e, o = OB(t, i), l = a ? r.filter(el) : r;
  if (Array.isArray(n)) {
    var u, s = r.map((h, y) => Zh(Zh({}, h), {}, {
      base: n[y]
    }));
    i === "vertical" ? u = _r().y(Pi).x1(Oi).x0((h) => h.base.x) : u = _r().x(Oi).y1(Pi).y0((h) => h.base.y);
    var c = u.defined(Jh).curve(o), f = a ? s.filter(Jh) : s;
    return c(f);
  }
  var d;
  i === "vertical" && X(n) ? d = _r().y(Pi).x1(Oi).x0(n) : X(n) ? d = _r().x(Oi).y1(Pi).y0(n) : d = ic().x(Oi).y(Pi);
  var v = d.defined(el).curve(o);
  return v(l);
}, AB = (e) => {
  var {
    className: t,
    points: r,
    path: n,
    pathRef: i
  } = e, a = Mf();
  if ((!r || !r.length) && !n)
    return null;
  var o = {
    type: e.type,
    points: e.points,
    baseLine: e.baseLine,
    layout: e.layout || a,
    connectNulls: e.connectNulls
  }, l = r && r.length ? PB(o) : n;
  return /* @__PURE__ */ p.createElement("path", Gs({}, Ds(e), oR(e), {
    className: ee("recharts-curve", t),
    d: l === null ? void 0 : l,
    ref: i
  }));
}, SB = ["x", "y", "top", "left", "width", "height", "className"];
function qs() {
  return qs = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, qs.apply(null, arguments);
}
function tm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function _B(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? tm(Object(r), !0).forEach(function(n) {
      EB(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : tm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function EB(e, t, r) {
  return (t = kB(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function kB(e) {
  var t = CB(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function CB(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function $B(e, t) {
  if (e == null) return {};
  var r, n, i = IB(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function IB(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var jB = (e, t, r, n, i, a) => "M".concat(e, ",").concat(i, "v").concat(n, "M").concat(a, ",").concat(t, "h").concat(r), MB = (e) => {
  var {
    x: t = 0,
    y: r = 0,
    top: n = 0,
    left: i = 0,
    width: a = 0,
    height: o = 0,
    className: l
  } = e, u = $B(e, SB), s = _B({
    x: t,
    y: r,
    top: n,
    left: i,
    width: a,
    height: o
  }, u);
  return !X(t) || !X(r) || !X(a) || !X(o) || !X(n) || !X(i) ? null : /* @__PURE__ */ p.createElement("path", qs({}, Gn(s), {
    className: ee("recharts-cross", l),
    d: jB(t, r, a, o, n, i)
  }));
};
function DB(e, t, r, n) {
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
function rm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function nm(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? rm(Object(r), !0).forEach(function(n) {
      TB(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : rm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function TB(e, t, r) {
  return (t = NB(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function NB(e) {
  var t = LB(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function LB(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var RB = (e) => e.replace(/([A-Z])/g, (t) => "-".concat(t.toLowerCase())), zB = (e, t, r) => e.map((n) => "".concat(RB(n), " ").concat(t, "ms ").concat(r)).join(","), BB = (e, t) => [Object.keys(e), Object.keys(t)].reduce((r, n) => r.filter((i) => n.includes(i))), Yi = (e, t) => Object.keys(t).reduce((r, n) => nm(nm({}, r), {}, {
  [n]: e(n, t[n])
}), {});
function im(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Pe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? im(Object(r), !0).forEach(function(n) {
      FB(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : im(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function FB(e, t, r) {
  return (t = WB(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function WB(e) {
  var t = KB(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function KB(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var tl = (e, t, r) => e + (t - e) * r, Ys = (e) => {
  var {
    from: t,
    to: r
  } = e;
  return t !== r;
}, Vw = (e, t, r) => {
  var n = Yi((i, a) => {
    if (Ys(a)) {
      var [o, l] = e(a.from, a.to, a.velocity);
      return Pe(Pe({}, a), {}, {
        from: o,
        velocity: l
      });
    }
    return a;
  }, t);
  return r < 1 ? Yi((i, a) => Ys(a) && n[i] != null ? Pe(Pe({}, a), {}, {
    velocity: tl(a.velocity, n[i].velocity, r),
    from: tl(a.from, n[i].from, r)
  }) : a, t) : Vw(e, n, r - 1);
};
function UB(e, t, r, n, i, a) {
  var o, l = n.reduce((d, v) => Pe(Pe({}, d), {}, {
    [v]: {
      from: e[v],
      velocity: 0,
      to: t[v]
    }
  }), {}), u = () => Yi((d, v) => v.from, l), s = () => !Object.values(l).filter(Ys).length, c = null, f = (d) => {
    o || (o = d);
    var v = d - o, h = v / r.dt;
    l = Vw(r, l, h), i(Pe(Pe(Pe({}, e), t), u())), o = d, s() || (c = a.setTimeout(f));
  };
  return () => (c = a.setTimeout(f), () => {
    var d;
    (d = c) === null || d === void 0 || d();
  });
}
function HB(e, t, r, n, i, a, o) {
  var l = null, u = i.reduce((f, d) => {
    var v = e[d], h = t[d];
    return v == null || h == null ? f : Pe(Pe({}, f), {}, {
      [d]: [v, h]
    });
  }, {}), s, c = (f) => {
    s || (s = f);
    var d = (f - s) / n, v = Yi((y, m) => tl(...m, r(d)), u);
    if (a(Pe(Pe(Pe({}, e), t), v)), d < 1)
      l = o.setTimeout(c);
    else {
      var h = Yi((y, m) => tl(...m, r(1)), u);
      a(Pe(Pe(Pe({}, e), t), h));
    }
  };
  return () => (l = o.setTimeout(c), () => {
    var f;
    (f = l) === null || f === void 0 || f();
  });
}
const GB = (e, t, r, n, i, a) => {
  var o = BB(e, t);
  return r == null ? () => (i(Pe(Pe({}, e), t)), () => {
  }) : r.isStepper === !0 ? UB(e, t, r, o, i, a) : HB(e, t, r, n, o, i, a);
};
var rl = 1e-4, Xw = (e, t) => [0, 3 * e, 3 * t - 6 * e, 3 * e - 3 * t + 1], Zw = (e, t) => e.map((r, n) => r * t ** n).reduce((r, n) => r + n), am = (e, t) => (r) => {
  var n = Xw(e, t);
  return Zw(n, r);
}, qB = (e, t) => (r) => {
  var n = Xw(e, t), i = [...n.map((a, o) => a * o).slice(1), 0];
  return Zw(i, r);
}, YB = (e) => {
  var t, r = e.split("(");
  if (r.length !== 2 || r[0] !== "cubic-bezier")
    return null;
  var n = (t = r[1]) === null || t === void 0 || (t = t.split(")")[0]) === null || t === void 0 ? void 0 : t.split(",");
  if (n == null || n.length !== 4)
    return null;
  var i = n.map((a) => parseFloat(a));
  return [i[0], i[1], i[2], i[3]];
}, VB = function() {
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
        var i = YB(r[0]);
        if (i)
          return i;
      }
    }
  return r.length === 4 ? r : [0, 0, 1, 1];
}, XB = (e, t, r, n) => {
  var i = am(e, r), a = am(t, n), o = qB(e, r), l = (s) => s > 1 ? 1 : s < 0 ? 0 : s, u = (s) => {
    for (var c = s > 1 ? 1 : s, f = c, d = 0; d < 8; ++d) {
      var v = i(f) - c, h = o(f);
      if (Math.abs(v - c) < rl || h < rl)
        return a(f);
      f = l(f - v / h);
    }
    return a(f);
  };
  return u.isStepper = !1, u;
}, om = function() {
  return XB(...VB(...arguments));
}, ZB = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, {
    stiff: r = 100,
    damping: n = 8,
    dt: i = 17
  } = t, a = (o, l, u) => {
    var s = -(o - l) * r, c = u * n, f = u + (s - c) * i / 1e3, d = u * i / 1e3 + o;
    return Math.abs(d - l) < rl && Math.abs(f) < rl ? [l, 0] : [d, f];
  };
  return a.isStepper = !0, a.dt = i, a;
}, QB = (e) => {
  if (typeof e == "string")
    switch (e) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return om(e);
      case "spring":
        return ZB();
      default:
        if (e.split("(")[0] === "cubic-bezier")
          return om(e);
    }
  return typeof e == "function" ? e : null;
};
function JB(e) {
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
class eF {
  setTimeout(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = performance.now(), i = null, a = (o) => {
      o - n >= r ? t(o) : typeof requestAnimationFrame == "function" && (i = requestAnimationFrame(a));
    };
    return i = requestAnimationFrame(a), () => {
      i != null && cancelAnimationFrame(i);
    };
  }
}
function tF() {
  return JB(new eF());
}
var rF = /* @__PURE__ */ p.createContext(tF);
function nF(e, t) {
  var r = p.useContext(rF);
  return p.useMemo(() => t ?? r(e), [e, t, r]);
}
var iF = {
  begin: 0,
  duration: 1e3,
  easing: "ease",
  isActive: !0,
  canBegin: !0,
  onAnimationEnd: () => {
  },
  onAnimationStart: () => {
  }
}, lm = {
  t: 0
}, Wu = {
  t: 1
};
function aF(e) {
  var t = li(e, iF), {
    isActive: r,
    canBegin: n,
    duration: i,
    easing: a,
    begin: o,
    onAnimationEnd: l,
    onAnimationStart: u,
    children: s
  } = t, c = Yw(), f = r === "auto" ? !qw.isSsr && !c : r, d = nF(t.animationId, t.animationManager), [v, h] = p.useState(f ? lm : Wu), y = p.useRef(null);
  return p.useEffect(() => {
    f || h(Wu);
  }, [f]), p.useEffect(() => {
    if (!f || !n)
      return If;
    var m = GB(lm, Wu, QB(a), i, h, d.getTimeoutController()), g = () => {
      y.current = m();
    };
    return d.start([u, o, g, i, l]), () => {
      d.stop(), y.current && y.current(), l();
    };
  }, [f, n, i, a, o, u, l, d]), s(v.t);
}
function oF(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "animation-", r = p.useRef(Ph(t)), n = p.useRef(e);
  return n.current !== e && (r.current = Ph(t), n.current = e), r.current;
}
var lF = ["radius"], uF = ["radius"], um, sm, cm, fm, dm, vm, pm, hm, mm, ym;
function gm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function bm(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gm(Object(r), !0).forEach(function(n) {
      sF(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : gm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function sF(e, t, r) {
  return (t = cF(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function cF(e) {
  var t = fF(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function fF(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function nl() {
  return nl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, nl.apply(null, arguments);
}
function xm(e, t) {
  if (e == null) return {};
  var r, n, i = dF(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function dF(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Tt(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var wm = (e, t, r, n, i) => {
  var a = kr(r), o = kr(n), l = Math.min(Math.abs(a) / 2, Math.abs(o) / 2), u = o >= 0 ? 1 : -1, s = a >= 0 ? 1 : -1, c = o >= 0 && a >= 0 || o < 0 && a < 0 ? 1 : 0, f;
  if (l > 0 && Array.isArray(i)) {
    for (var d = [0, 0, 0, 0], v = 0, h = 4; v < h; v++) {
      var y, m = (y = i[v]) !== null && y !== void 0 ? y : 0;
      d[v] = m > l ? l : m;
    }
    f = ze(um || (um = Tt(["M", ",", ""])), e, t + u * d[0]), d[0] > 0 && (f += ze(sm || (sm = Tt(["A ", ",", ",0,0,", ",", ",", ""])), d[0], d[0], c, e + s * d[0], t)), f += ze(cm || (cm = Tt(["L ", ",", ""])), e + r - s * d[1], t), d[1] > 0 && (f += ze(fm || (fm = Tt(["A ", ",", ",0,0,", `,
        `, ",", ""])), d[1], d[1], c, e + r, t + u * d[1])), f += ze(dm || (dm = Tt(["L ", ",", ""])), e + r, t + n - u * d[2]), d[2] > 0 && (f += ze(vm || (vm = Tt(["A ", ",", ",0,0,", `,
        `, ",", ""])), d[2], d[2], c, e + r - s * d[2], t + n)), f += ze(pm || (pm = Tt(["L ", ",", ""])), e + s * d[3], t + n), d[3] > 0 && (f += ze(hm || (hm = Tt(["A ", ",", ",0,0,", `,
        `, ",", ""])), d[3], d[3], c, e, t + n - u * d[3])), f += "Z";
  } else if (l > 0 && i === +i && i > 0) {
    var g = Math.min(l, i);
    f = ze(mm || (mm = Tt(["M ", ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", " Z"])), e, t + u * g, g, g, c, e + s * g, t, e + r - s * g, t, g, g, c, e + r, t + u * g, e + r, t + n - u * g, g, g, c, e + r - s * g, t + n, e + s * g, t + n, g, g, c, e, t + n - u * g);
  } else
    f = ze(ym || (ym = Tt(["M ", ",", " h ", " v ", " h ", " Z"])), e, t, r, n, -r);
  return f;
}, Om = {
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
}, vF = (e) => {
  var t = li(e, Om), r = p.useRef(null), [n, i] = p.useState(-1);
  p.useEffect(() => {
    if (r.current && r.current.getTotalLength)
      try {
        var H = r.current.getTotalLength();
        H && i(H);
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
    isAnimationActive: h,
    isUpdateAnimationActive: y
  } = t, m = p.useRef(l), g = p.useRef(u), x = p.useRef(a), b = p.useRef(o), w = p.useMemo(() => ({
    x: a,
    y: o,
    width: l,
    height: u,
    radius: s
  }), [a, o, l, u, s]), P = oF(w, "rectangle-");
  if (a !== +a || o !== +o || l !== +l || u !== +u || l === 0 || u === 0)
    return null;
  var O = ee("recharts-rectangle", c);
  if (!y) {
    var S = Gn(t), {
      radius: A
    } = S, C = xm(S, lF);
    return /* @__PURE__ */ p.createElement("path", nl({}, C, {
      x: kr(a),
      y: kr(o),
      width: kr(l),
      height: kr(u),
      radius: typeof s == "number" ? s : void 0,
      className: O,
      d: wm(a, o, l, u, s)
    }));
  }
  var $ = m.current, j = g.current, k = x.current, F = b.current, W = "0px ".concat(n === -1 ? 1 : n, "px"), K = "".concat(n, "px ").concat(n, "px"), Y = zB(["strokeDasharray"], d, typeof f == "string" ? f : Om.animationEasing);
  return /* @__PURE__ */ p.createElement(aF, {
    animationId: P,
    key: P,
    canBegin: n > 0,
    duration: d,
    easing: f,
    isActive: y,
    begin: v
  }, (H) => {
    var ne = Ra($, l, H), J = Ra(j, u, H), D = Ra(k, a, H), Ee = Ra(F, o, H);
    r.current && (m.current = ne, g.current = J, x.current = D, b.current = Ee);
    var ie;
    h ? H > 0 ? ie = {
      transition: Y,
      strokeDasharray: K
    } : ie = {
      strokeDasharray: W
    } : ie = {
      strokeDasharray: K
    };
    var Te = Gn(t), {
      radius: ge
    } = Te, ae = xm(Te, uF);
    return /* @__PURE__ */ p.createElement("path", nl({}, ae, {
      radius: typeof s == "number" ? s : void 0,
      className: O,
      d: wm(D, Ee, ne, J, s),
      ref: r,
      style: bm(bm({}, ie), t.style)
    }));
  });
}, il = Math.PI / 180, At = (e, t, r, n) => ({
  x: e + Math.cos(-il * n) * r,
  y: t + Math.sin(-il * n) * r
}), pF = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(t - (n.left || 0) - (n.right || 0)), Math.abs(r - (n.top || 0) - (n.bottom || 0))) / 2;
};
function Qw(e) {
  var {
    cx: t,
    cy: r,
    radius: n,
    startAngle: i,
    endAngle: a
  } = e, o = At(t, r, n, i), l = At(t, r, n, a);
  return {
    points: [o, l],
    cx: t,
    cy: r,
    radius: n,
    startAngle: i,
    endAngle: a
  };
}
var Pm, Am, Sm, _m, Em, km, Cm;
function Vs() {
  return Vs = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Vs.apply(null, arguments);
}
function rn(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var hF = (e, t) => {
  var r = pa(t - e), n = Math.min(Math.abs(t - e), 359.999);
  return r * n;
}, Ka = (e) => {
  var {
    cx: t,
    cy: r,
    radius: n,
    angle: i,
    sign: a,
    isExternal: o,
    cornerRadius: l,
    cornerIsExternal: u
  } = e, s = l * (o ? 1 : -1) + n, c = Math.asin(l / s) / il, f = u ? i : i + a * c, d = At(t, r, s, f), v = At(t, r, n, f), h = u ? i - a * c : i, y = At(t, r, s * Math.cos(c * il), h);
  return {
    center: d,
    circleTangency: v,
    lineTangency: y,
    theta: c
  };
}, Jw = (e) => {
  var {
    cx: t,
    cy: r,
    innerRadius: n,
    outerRadius: i,
    startAngle: a,
    endAngle: o
  } = e, l = hF(a, o), u = a + l, s = At(t, r, i, a), c = At(t, r, i, u), f = ze(Pm || (Pm = rn(["M ", ",", `
    A `, ",", `,0,
    `, ",", `,
    `, ",", `
  `])), s.x, s.y, i, i, +(Math.abs(l) > 180), +(a > u), c.x, c.y);
  if (n > 0) {
    var d = At(t, r, n, a), v = At(t, r, n, u);
    f += ze(Am || (Am = rn(["L ", ",", `
            A `, ",", `,0,
            `, ",", `,
            `, ",", " Z"])), v.x, v.y, n, n, +(Math.abs(l) > 180), +(a <= u), d.x, d.y);
  } else
    f += ze(Sm || (Sm = rn(["L ", ",", " Z"])), t, r);
  return f;
}, mF = (e) => {
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
  } = e, c = pa(s - u), {
    circleTangency: f,
    lineTangency: d,
    theta: v
  } = Ka({
    cx: t,
    cy: r,
    radius: i,
    angle: u,
    sign: c,
    cornerRadius: a,
    cornerIsExternal: l
  }), {
    circleTangency: h,
    lineTangency: y,
    theta: m
  } = Ka({
    cx: t,
    cy: r,
    radius: i,
    angle: s,
    sign: -c,
    cornerRadius: a,
    cornerIsExternal: l
  }), g = l ? Math.abs(u - s) : Math.abs(u - s) - v - m;
  if (g < 0)
    return o ? ze(_m || (_m = rn(["M ", ",", `
        a`, ",", ",0,0,1,", `,0
        a`, ",", ",0,0,1,", `,0
      `])), d.x, d.y, a, a, a * 2, a, a, -a * 2) : Jw({
      cx: t,
      cy: r,
      innerRadius: n,
      outerRadius: i,
      startAngle: u,
      endAngle: s
    });
  var x = ze(Em || (Em = rn(["M ", ",", `
    A`, ",", ",0,0,", ",", ",", `
    A`, ",", ",0,", ",", ",", ",", `
    A`, ",", ",0,0,", ",", ",", `
  `])), d.x, d.y, a, a, +(c < 0), f.x, f.y, i, i, +(g > 180), +(c < 0), h.x, h.y, a, a, +(c < 0), y.x, y.y);
  if (n > 0) {
    var {
      circleTangency: b,
      lineTangency: w,
      theta: P
    } = Ka({
      cx: t,
      cy: r,
      radius: n,
      angle: u,
      sign: c,
      isExternal: !0,
      cornerRadius: a,
      cornerIsExternal: l
    }), {
      circleTangency: O,
      lineTangency: S,
      theta: A
    } = Ka({
      cx: t,
      cy: r,
      radius: n,
      angle: s,
      sign: -c,
      isExternal: !0,
      cornerRadius: a,
      cornerIsExternal: l
    }), C = l ? Math.abs(u - s) : Math.abs(u - s) - P - A;
    if (C < 0 && a === 0)
      return "".concat(x, "L").concat(t, ",").concat(r, "Z");
    x += ze(km || (km = rn(["L", ",", `
      A`, ",", ",0,0,", ",", ",", `
      A`, ",", ",0,", ",", ",", ",", `
      A`, ",", ",0,0,", ",", ",", "Z"])), S.x, S.y, a, a, +(c < 0), O.x, O.y, n, n, +(C > 180), +(c > 0), b.x, b.y, a, a, +(c < 0), w.x, w.y);
  } else
    x += ze(Cm || (Cm = rn(["L", ",", "Z"])), t, r);
  return x;
}, yF = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: !1,
  cornerIsExternal: !1
}, gF = (e) => {
  var t = li(e, yF), {
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
  var d = ee("recharts-sector", f), v = a - i, h = qn(o, v, 0, !0), y;
  return h > 0 && Math.abs(s - c) < 360 ? y = mF({
    cx: r,
    cy: n,
    innerRadius: i,
    outerRadius: a,
    cornerRadius: Math.min(h, v / 2),
    forceCornerRadius: l,
    cornerIsExternal: u,
    startAngle: s,
    endAngle: c
  }) : y = Jw({
    cx: r,
    cy: n,
    innerRadius: i,
    outerRadius: a,
    startAngle: s,
    endAngle: c
  }), /* @__PURE__ */ p.createElement("path", Vs({}, Gn(t), {
    className: d,
    d: y
  }));
};
function bF(e, t, r) {
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
  if (Sw(t)) {
    if (e === "centric") {
      var {
        cx: n,
        cy: i,
        innerRadius: a,
        outerRadius: o,
        angle: l
      } = t, u = At(n, i, a, l), s = At(n, i, o, l);
      return [{
        x: u.x,
        y: u.y
      }, {
        x: s.x,
        y: s.y
      }];
    }
    return Qw(t);
  }
}
var Lr = (e) => e.chartData, xF = E([Lr], (e) => {
  var t = e.chartData != null ? e.chartData.length - 1 : 0;
  return {
    chartData: e.chartData,
    computedData: e.computedData,
    dataEndIndex: t,
    dataStartIndex: 0
  };
}), e1 = (e, t, r, n) => n ? xF(e) : Lr(e);
function qt(e) {
  if (Array.isArray(e) && e.length === 2) {
    var [t, r] = e;
    if (ce(t) && ce(r))
      return !0;
  }
  return !1;
}
function $m(e, t, r) {
  return r ? e : [Math.min(e[0], t[0]), Math.max(e[1], t[1])];
}
function t1(e, t) {
  if (t && typeof e != "function" && Array.isArray(e) && e.length === 2) {
    var [r, n] = e, i, a;
    if (ce(r))
      i = r;
    else if (typeof r == "function")
      return;
    if (ce(n))
      a = n;
    else if (typeof n == "function")
      return;
    var o = [i, a];
    if (qt(o))
      return o;
  }
}
function wF(e, t, r) {
  if (!(!r && t == null)) {
    if (typeof e == "function" && t != null)
      try {
        var n = e(t, r);
        if (qt(n))
          return $m(n, t, r);
      } catch {
      }
    if (Array.isArray(e) && e.length === 2) {
      var [i, a] = e, o, l;
      if (i === "auto")
        t != null && (o = Math.min(...t));
      else if (X(i))
        o = i;
      else if (typeof i == "function")
        try {
          t != null && (o = i(t?.[0]));
        } catch {
        }
      else if (typeof i == "string" && Ih.test(i)) {
        var u = Ih.exec(i);
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
      else if (X(a))
        l = a;
      else if (typeof a == "function")
        try {
          t != null && (l = a(t?.[1]));
        } catch {
        }
      else if (typeof a == "string" && jh.test(a)) {
        var c = jh.exec(a);
        if (c == null || c[1] == null || t == null)
          l = void 0;
        else {
          var f = +c[1];
          l = t[1] + f;
        }
      } else
        l = t?.[1];
      var d = [o, l];
      if (qt(d))
        return t == null ? d : $m(d, t, r);
    }
  }
}
function r1(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new N(e).abs().log(10).toNumber()) + 1, t;
}
function n1(e, t, r) {
  for (var n = new N(e), i = 0, a = []; n.lt(t) && i < 1e5; )
    a.push(n.toNumber()), n = n.add(r), i++;
  return a;
}
var i1 = (e) => {
  var [t, r] = e, [n, i] = [t, r];
  return t > r && ([n, i] = [r, t]), [n, i];
}, Nf = (e, t, r) => {
  if (e.lte(0))
    return new N(0);
  var n = r1(e.toNumber()), i = new N(10).pow(n), a = e.div(i), o = n !== 1 ? 0.05 : 0.1, l = new N(Math.ceil(a.div(o).toNumber())).add(r).mul(o), u = l.mul(i);
  return t ? new N(u.toNumber()) : new N(Math.ceil(u.toNumber()));
}, a1 = (e, t, r) => {
  var n;
  if (e.lte(0))
    return new N(0);
  var i = [1, 2, 2.5, 5], a = e.toNumber(), o = Math.floor(new N(a).abs().log(10).toNumber()), l = new N(10).pow(o), u = e.div(l).toNumber(), s = i.findIndex((v) => v >= u - 1e-10);
  if (s === -1 && (l = l.mul(10), s = 0), s += r, s >= i.length) {
    var c = Math.floor(s / i.length);
    s %= i.length, l = l.mul(new N(10).pow(c));
  }
  var f = (n = i[s]) !== null && n !== void 0 ? n : 1, d = new N(f).mul(l);
  return t ? d : new N(Math.ceil(d.toNumber()));
}, OF = (e, t, r) => {
  var n = new N(1), i = new N(e);
  if (!i.isint() && r) {
    var a = Math.abs(e);
    a < 1 ? (n = new N(10).pow(r1(e) - 1), i = new N(Math.floor(i.div(n).toNumber())).mul(n)) : a > 1 && (i = new N(Math.floor(e)));
  } else e === 0 ? i = new N(Math.floor((t - 1) / 2)) : r || (i = new N(Math.floor(e)));
  for (var o = Math.floor((t - 1) / 2), l = [], u = 0; u < t; u++)
    l.push(i.add(new N(u - o).mul(n)).toNumber());
  return l;
}, o1 = function(t, r, n, i) {
  var a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0, o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : Nf;
  if (!Number.isFinite((r - t) / (n - 1)))
    return {
      step: new N(0),
      tickMin: new N(0),
      tickMax: new N(0)
    };
  var l = o(new N(r).sub(t).div(n - 1), i, a), u;
  t <= 0 && r >= 0 ? u = new N(0) : (u = new N(t).add(r).div(2), u = u.sub(new N(u).mod(l)));
  var s = Math.ceil(u.sub(t).div(l).toNumber()), c = Math.ceil(new N(r).sub(u).div(l).toNumber()), f = s + c + 1;
  return f > n ? o1(t, r, n, i, a + 1, o) : (f < n && (c = r > 0 ? c + (n - f) : c, s = r > 0 ? s : s + (n - f)), {
    step: l,
    tickMin: u.sub(new N(s).mul(l)),
    tickMax: u.add(new N(c).mul(l))
  });
}, Im = function(t) {
  var [r, n] = t, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", l = Math.max(i, 2), [u, s] = i1([r, n]);
  if (u === -1 / 0 || s === 1 / 0) {
    var c = s === 1 / 0 ? [u, ...Array(i - 1).fill(1 / 0)] : [...Array(i - 1).fill(-1 / 0), s];
    return r > n ? c.reverse() : c;
  }
  if (u === s)
    return OF(u, i, a);
  var f = o === "snap125" ? a1 : Nf, {
    step: d,
    tickMin: v,
    tickMax: h
  } = o1(u, s, l, a, 0, f), y = n1(v, h.add(new N(0.1).mul(d)), d);
  return r > n ? y.reverse() : y;
}, jm = function(t, r) {
  var [n, i] = t, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", [l, u] = i1([n, i]);
  if (l === -1 / 0 || u === 1 / 0)
    return [n, i];
  if (l === u)
    return [l];
  var s = o === "snap125" ? a1 : Nf, c = Math.max(r, 2), f = s(new N(u).sub(l).div(c - 1), a, 0), d = [...n1(new N(l), new N(u), f), u];
  return a === !1 && (d = d.map((v) => Math.round(v))), n > i ? d.reverse() : d;
}, PF = (e) => e.rootProps.barCategoryGap, Jl = (e) => e.rootProps.stackOffset, l1 = (e) => e.rootProps.reverseStackOrder, Lf = (e) => e.options.chartName, AF = (e) => e.rootProps.syncId, SF = (e) => e.rootProps.syncMethod, _F = (e) => e.options.eventEmitter, nn = {
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
}, Gr = {
  allowDecimals: !1,
  // if I set this to false then Tooltip synchronisation stops working in Radar, wtf
  allowDataOverflow: !1,
  angleAxisId: 0,
  reversed: !1,
  scale: "auto",
  tick: !0,
  type: "auto"
}, Nt = {
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
}, eu = (e, t) => {
  if (!(!e || !t))
    return e != null && e.reversed ? [t[1], t[0]] : t;
};
function u1(e, t, r) {
  if (r !== "auto")
    return r;
  if (e != null)
    return Dr(e, t) ? "category" : "number";
}
function Mm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function al(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Mm(Object(r), !0).forEach(function(n) {
      EF(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Mm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function EF(e, t, r) {
  return (t = kF(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function kF(e) {
  var t = CF(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function CF(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Dm = {
  allowDataOverflow: Gr.allowDataOverflow,
  allowDecimals: Gr.allowDecimals,
  allowDuplicatedCategory: !1,
  // defaultPolarAngleAxisProps.allowDuplicatedCategory has it set to true but the actual axis rendering ignores the prop because reasons,
  dataKey: void 0,
  domain: void 0,
  id: Gr.angleAxisId,
  includeHidden: !1,
  name: void 0,
  reversed: Gr.reversed,
  scale: Gr.scale,
  tick: Gr.tick,
  tickCount: void 0,
  ticks: void 0,
  type: Gr.type,
  unit: void 0,
  niceTicks: "auto"
}, Tm = {
  allowDataOverflow: Nt.allowDataOverflow,
  allowDecimals: Nt.allowDecimals,
  allowDuplicatedCategory: Nt.allowDuplicatedCategory,
  dataKey: void 0,
  domain: void 0,
  id: Nt.radiusAxisId,
  includeHidden: Nt.includeHidden,
  name: void 0,
  reversed: Nt.reversed,
  scale: Nt.scale,
  tick: Nt.tick,
  tickCount: Nt.tickCount,
  ticks: void 0,
  type: Nt.type,
  unit: void 0,
  niceTicks: "auto"
}, $F = (e, t) => {
  if (t != null)
    return e.polarAxis.angleAxis[t];
}, Rf = E([$F, zw], (e, t) => {
  var r;
  if (e != null)
    return e;
  var n = (r = u1(t, "angleAxis", Dm.type)) !== null && r !== void 0 ? r : "category";
  return al(al({}, Dm), {}, {
    type: n
  });
}), IF = (e, t) => e.polarAxis.radiusAxis[t], zf = E([IF, zw], (e, t) => {
  var r;
  if (e != null)
    return e;
  var n = (r = u1(t, "radiusAxis", Tm.type)) !== null && r !== void 0 ? r : "category";
  return al(al({}, Tm), {}, {
    type: n
  });
}), tu = (e) => e.polarOptions, Bf = E([Tr, Nr, Ze], pF), s1 = E([tu, Bf], (e, t) => {
  if (e != null)
    return qn(e.innerRadius, t, 0);
}), c1 = E([tu, Bf], (e, t) => {
  if (e != null)
    return qn(e.outerRadius, t, t * 0.8);
}), jF = (e) => {
  if (e == null)
    return [0, 0];
  var {
    startAngle: t,
    endAngle: r
  } = e;
  return [t, r];
}, f1 = E([tu], jF);
E([Rf, f1], eu);
var d1 = E([Bf, s1, c1], (e, t, r) => {
  if (!(e == null || t == null || r == null))
    return [t, r];
});
E([zf, d1], eu);
E([ye, tu, s1, c1, Tr, Nr], (e, t, r, n, i, a) => {
  if (!(e !== "centric" && e !== "radial" || t == null || r == null || n == null)) {
    var {
      cx: o,
      cy: l,
      startAngle: u,
      endAngle: s
    } = t;
    return {
      cx: qn(o, i, i / 2),
      cy: qn(l, a, a / 2),
      innerRadius: r,
      outerRadius: n,
      startAngle: u,
      endAngle: s,
      clockWise: !1
      // this property look useful, why not use it?
    };
  }
});
var De = (e, t) => t, ru = (e, t, r) => r;
function v1(e) {
  return e?.id;
}
function p1(e, t, r) {
  var {
    chartData: n = []
  } = t, {
    allowDuplicatedCategory: i,
    dataKey: a
  } = r, o = /* @__PURE__ */ new Map();
  return e.forEach((l) => {
    var u, s = (u = l.data) !== null && u !== void 0 ? u : n;
    if (!(s == null || s.length === 0)) {
      var c = v1(l);
      s.forEach((f, d) => {
        var v = a == null || i ? d : String(ot(f, a, null)), h = ot(f, l.dataKey, 0), y;
        o.has(v) ? y = o.get(v) : y = {}, Object.assign(y, {
          [c]: h
        }), o.set(v, y);
      });
    }
  }), Array.from(o.values());
}
function Ff(e) {
  return "stackId" in e && e.stackId != null && e.dataKey != null;
}
var nu = (e, t) => e === t ? !0 : e == null || t == null ? !1 : e[0] === t[0] && e[1] === t[1];
function iu(e, t) {
  return Array.isArray(e) && Array.isArray(t) && e.length === 0 && t.length === 0 ? !0 : e === t;
}
function MF(e, t) {
  if (e.length === t.length) {
    for (var r = 0; r < e.length; r++)
      if (e[r] !== t[r])
        return !1;
    return !0;
  }
  return !1;
}
var We = (e) => {
  var t = ye(e);
  return t === "horizontal" ? "xAxis" : t === "vertical" ? "yAxis" : t === "centric" ? "angleAxis" : "radiusAxis";
}, ui = (e) => e.tooltip.settings.axisId;
function Wf(e) {
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
var DF = (e, t) => {
  if (t != null)
    switch (e) {
      case "linear": {
        if (!qt(t)) {
          for (var r, n, i = 0; i < t.length; i++) {
            var a = t[i];
            ce(a) && ((r === void 0 || a < r) && (r = a), (n === void 0 || a > n) && (n = a));
          }
          return r !== void 0 && n !== void 0 ? [r, n] : void 0;
        }
        return t;
      }
      default:
        return t;
    }
};
function TF(e) {
  if (e in Wt)
    return Wt[e]();
  var t = "scale".concat(ha(e));
  if (t in Wt)
    return Wt[t]();
}
function Nm(e, t, r) {
  if (typeof e == "function")
    return e.copy().domain(t).range(r);
  if (e != null) {
    var n = TF(e);
    if (n != null)
      return n.domain(t).range(r), n;
  }
}
function Kf(e, t, r, n) {
  if (!(r == null || n == null))
    return typeof e.scale == "function" ? Nm(e.scale, r, n) : Nm(t, r, n);
}
function NF(e) {
  return "scale".concat(ha(e));
}
function LF(e) {
  return NF(e) in Wt;
}
var h1 = (e, t, r) => {
  if (e != null) {
    var {
      scale: n,
      type: i
    } = e;
    if (n === "auto")
      return i === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !t) ? "point" : i === "category" ? "band" : "linear";
    if (typeof n == "string")
      return LF(n) ? n : "point";
  }
};
function RF(e, t) {
  for (var r = 0, n = e.length, i = e[0] < e[e.length - 1]; r < n; ) {
    var a = Math.floor((r + n) / 2);
    (i ? e[a] < t : e[a] > t) ? r = a + 1 : n = a;
  }
  return r;
}
function m1(e, t) {
  if (e) {
    var r = t ?? e.domain(), n = r.map((a) => {
      var o;
      return (o = e(a)) !== null && o !== void 0 ? o : 0;
    }), i = e.range();
    if (!(r.length === 0 || i.length < 2))
      return (a) => {
        var o, l, u = RF(n, a);
        if (u <= 0)
          return r[0];
        if (u >= r.length)
          return r[r.length - 1];
        var s = (o = n[u - 1]) !== null && o !== void 0 ? o : 0, c = (l = n[u]) !== null && l !== void 0 ? l : 0;
        return Math.abs(a - s) <= Math.abs(a - c) ? r[u - 1] : r[u];
      };
  }
}
function zF(e) {
  if (e != null)
    return "invert" in e && typeof e.invert == "function" ? e.invert.bind(e) : m1(e, void 0);
}
function Lm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ol(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Lm(Object(r), !0).forEach(function(n) {
      BF(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Lm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function BF(e, t, r) {
  return (t = FF(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function FF(e) {
  var t = WF(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function WF(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Xs = [0, "auto"], KF = {
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
}, UF = (e, t) => e.cartesianAxis.xAxis[t], Rr = (e, t) => {
  var r = UF(e, t);
  return r ?? KF;
}, HF = {
  allowDataOverflow: !1,
  allowDecimals: !0,
  allowDuplicatedCategory: !0,
  angle: 0,
  dataKey: void 0,
  domain: Xs,
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
  width: ma
}, GF = (e, t) => e.cartesianAxis.yAxis[t], zr = (e, t) => {
  var r = GF(e, t);
  return r ?? HF;
}, qF = {
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
}, Uf = (e, t) => {
  var r = e.cartesianAxis.zAxis[t];
  return r ?? qF;
}, Qe = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return Rr(e, r);
    case "yAxis":
      return zr(e, r);
    case "zAxis":
      return Uf(e, r);
    case "angleAxis":
      return Rf(e, r);
    case "radiusAxis":
      return zf(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, YF = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return Rr(e, r);
    case "yAxis":
      return zr(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, ga = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return Rr(e, r);
    case "yAxis":
      return zr(e, r);
    case "angleAxis":
      return Rf(e, r);
    case "radiusAxis":
      return zf(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, y1 = (e) => e.graphicalItems.cartesianItems.some((t) => t.type === "bar") || e.graphicalItems.polarItems.some((t) => t.type === "radialBar");
function g1(e, t) {
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
var VF = (e) => e.graphicalItems.cartesianItems, XF = E([De, ru], g1), b1 = (e, t, r) => e.filter(r).filter((n) => t?.includeHidden === !0 ? !0 : !n.hide), ba = E([VF, Qe, XF], b1, {
  memoizeOptions: {
    resultEqualityCheck: iu
  }
}), x1 = E([ba], (e) => e.filter((t) => t.type === "area" || t.type === "bar").filter(Ff)), w1 = (e) => e.filter((t) => !("stackId" in t) || t.stackId === void 0), ZF = E([ba], w1), O1 = (e) => e.map((t) => t.data).filter(Boolean).flat(1), QF = E([ba], O1, {
  memoizeOptions: {
    resultEqualityCheck: iu
  }
}), P1 = (e, t) => {
  var {
    chartData: r = [],
    dataStartIndex: n,
    dataEndIndex: i
  } = t;
  return e.length > 0 ? e : r.slice(n, i + 1);
}, Hf = E([QF, e1], P1), A1 = (e, t, r) => t?.dataKey != null ? e.map((n) => ({
  value: ot(n, t.dataKey)
})) : r.length > 0 ? r.map((n) => n.dataKey).flatMap((n) => e.map((i) => ({
  value: ot(i, n)
}))) : e.map((n) => ({
  value: n
})), xa = E([Hf, Qe, ba], A1);
function Ln(e) {
  if (hn(e) || e instanceof Date) {
    var t = Number(e);
    if (ce(t))
      return t;
  }
}
function Rm(e) {
  if (Array.isArray(e)) {
    var t = [Ln(e[0]), Ln(e[1])];
    return qt(t) ? t : void 0;
  }
  var r = Ln(e);
  if (r != null)
    return [r, r];
}
function fr(e) {
  return e.map(Ln).filter(Kt);
}
function JF(e, t) {
  var r = Ln(e), n = Ln(t);
  return r == null && n == null ? 0 : r == null ? -1 : n == null ? 1 : r - n;
}
var eW = E([xa], (e) => e?.map((t) => t.value).sort(JF));
function S1(e, t) {
  switch (e) {
    case "xAxis":
      return t.direction === "x";
    case "yAxis":
      return t.direction === "y";
    default:
      return !1;
  }
}
function tW(e, t, r) {
  return !r || typeof t != "number" || oi(t) ? [] : r.length ? fr(r.flatMap((n) => {
    var i = ot(e, n.dataKey), a, o;
    if (Array.isArray(i) ? [a, o] = i : a = o = i, !(!ce(a) || !ce(o)))
      return [t - a, t + o];
  })) : [];
}
var _e = (e) => {
  var t = We(e), r = ui(e);
  return ga(e, t, r);
}, au = E([_e], (e) => e?.dataKey), rW = E([x1, e1, _e], p1), _1 = (e, t, r, n) => {
  var i = {}, a = t.reduce((o, l) => {
    if (l.stackId == null)
      return o;
    var u = o[l.stackId];
    return u == null && (u = []), u.push(l), o[l.stackId] = u, o;
  }, i);
  return Object.fromEntries(Object.entries(a).map((o) => {
    var [l, u] = o, s = n ? [...u].reverse() : u, c = s.map(v1);
    return [l, {
      // @ts-expect-error getStackedData requires that the input is array of objects, Recharts does not test for that
      stackedData: HR(e, c, r),
      graphicalItems: s
    }];
  }));
}, nW = E([rW, x1, Jl, l1], _1), E1 = (e, t, r, n) => {
  var {
    dataStartIndex: i,
    dataEndIndex: a
  } = t;
  if (n == null && r !== "zAxis") {
    var o = YR(e, i, a);
    if (!(o != null && o[0] === 0 && o[1] === 0))
      return o;
  }
}, iW = E([Qe], (e) => e.allowDataOverflow), Gf = (e) => {
  var t;
  if (e == null || !("domain" in e))
    return Xs;
  if (e.domain != null)
    return e.domain;
  if ("ticks" in e && e.ticks != null) {
    if (e.type === "number") {
      var r = fr(e.ticks);
      return [Math.min(...r), Math.max(...r)];
    }
    if (e.type === "category")
      return e.ticks.map(String);
  }
  return (t = e?.domain) !== null && t !== void 0 ? t : Xs;
}, k1 = E([Qe], Gf), C1 = E([k1, iW], t1), aW = E([nW, Lr, De, C1], E1, {
  memoizeOptions: {
    resultEqualityCheck: nu
  }
}), qf = (e) => e.errorBars, oW = (e, t, r) => e.flatMap((n) => t[n.id]).filter(Boolean).filter((n) => S1(r, n)), ll = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var i = r.filter(Boolean);
  if (i.length !== 0) {
    var a = i.flat(), o = Math.min(...a), l = Math.max(...a);
    return [o, l];
  }
}, $1 = (e, t, r, n, i) => {
  var a, o;
  if (r.length > 0 && e.forEach((l) => {
    r.forEach((u) => {
      var s, c, f = (s = n[u.id]) === null || s === void 0 ? void 0 : s.filter((g) => S1(i, g)), d = ot(l, (c = t.dataKey) !== null && c !== void 0 ? c : u.dataKey), v = tW(l, d, f);
      if (v.length >= 2) {
        var h = Math.min(...v), y = Math.max(...v);
        (a == null || h < a) && (a = h), (o == null || y > o) && (o = y);
      }
      var m = Rm(d);
      m != null && (a = a == null ? m[0] : Math.min(a, m[0]), o = o == null ? m[1] : Math.max(o, m[1]));
    });
  }), t?.dataKey != null && e.forEach((l) => {
    var u = Rm(ot(l, t.dataKey));
    u != null && (a = a == null ? u[0] : Math.min(a, u[0]), o = o == null ? u[1] : Math.max(o, u[1]));
  }), ce(a) && ce(o))
    return [a, o];
}, lW = E([Hf, Qe, ZF, qf, De], $1, {
  memoizeOptions: {
    resultEqualityCheck: nu
  }
});
function uW(e) {
  var {
    value: t
  } = e;
  if (hn(t) || t instanceof Date)
    return t;
}
var sW = (e, t, r) => {
  var n = e.map(uW).filter((i) => i != null);
  return r && (t.dataKey == null || t.allowDuplicatedCategory && Ow(n)) ? Cl(0, e.length) : t.allowDuplicatedCategory ? n : Array.from(new Set(n));
}, I1 = (e) => e.referenceElements.dots, si = (e, t, r) => e.filter((n) => n.ifOverflow === "extendDomain").filter((n) => t === "xAxis" ? n.xAxisId === r : n.yAxisId === r), cW = E([I1, De, ru], si), j1 = (e) => e.referenceElements.areas, fW = E([j1, De, ru], si), M1 = (e) => e.referenceElements.lines, dW = E([M1, De, ru], si), D1 = (e, t) => {
  if (e != null) {
    var r = fr(e.map((n) => t === "xAxis" ? n.x : n.y));
    if (r.length !== 0)
      return [Math.min(...r), Math.max(...r)];
  }
}, vW = E(cW, De, D1), T1 = (e, t) => {
  if (e != null) {
    var r = fr(e.flatMap((n) => [t === "xAxis" ? n.x1 : n.y1, t === "xAxis" ? n.x2 : n.y2]));
    if (r.length !== 0)
      return [Math.min(...r), Math.max(...r)];
  }
}, pW = E([fW, De], T1);
function hW(e) {
  var t;
  if (e.x != null)
    return fr([e.x]);
  var r = (t = e.segment) === null || t === void 0 ? void 0 : t.map((n) => n.x);
  return r == null || r.length === 0 ? [] : fr(r);
}
function mW(e) {
  var t;
  if (e.y != null)
    return fr([e.y]);
  var r = (t = e.segment) === null || t === void 0 ? void 0 : t.map((n) => n.y);
  return r == null || r.length === 0 ? [] : fr(r);
}
var N1 = (e, t) => {
  if (e != null) {
    var r = e.flatMap((n) => t === "xAxis" ? hW(n) : mW(n));
    if (r.length !== 0)
      return [Math.min(...r), Math.max(...r)];
  }
}, yW = E([dW, De], N1), gW = E(vW, yW, pW, (e, t, r) => ll(e, r, t)), L1 = (e, t, r, n, i, a, o, l) => {
  if (r != null)
    return r;
  var u = o === "vertical" && l === "xAxis" || o === "horizontal" && l === "yAxis", s = u ? ll(n, a, i) : ll(a, i);
  return wF(t, s, e.allowDataOverflow);
}, bW = E([Qe, k1, C1, aW, lW, gW, ye, De], L1, {
  memoizeOptions: {
    resultEqualityCheck: nu
  }
}), xW = [0, 1], R1 = (e, t, r, n, i, a, o) => {
  if (!((e == null || r == null || r.length === 0) && o === void 0)) {
    var {
      dataKey: l,
      type: u
    } = e, s = Dr(t, a);
    if (s && l == null) {
      var c;
      return Cl(0, (c = r?.length) !== null && c !== void 0 ? c : 0);
    }
    return u === "category" ? sW(n, e, s) : i === "expand" ? xW : o;
  }
}, Yf = E([Qe, ye, Hf, xa, Jl, De, bW], R1), ci = E([Qe, y1, Lf], h1), z1 = (e, t, r) => {
  var {
    niceTicks: n
  } = t;
  if (n !== "none") {
    var i = Gf(t), a = Array.isArray(i) && (i[0] === "auto" || i[1] === "auto");
    if ((n === "snap125" || n === "adaptive") && t != null && t.tickCount && qt(e)) {
      if (a)
        return Im(e, t.tickCount, t.allowDecimals, n);
      if (t.type === "number")
        return jm(e, t.tickCount, t.allowDecimals, n);
    }
    if (n === "auto" && r === "linear" && t != null && t.tickCount) {
      if (a && qt(e))
        return Im(e, t.tickCount, t.allowDecimals, "adaptive");
      if (t.type === "number" && qt(e))
        return jm(e, t.tickCount, t.allowDecimals, "adaptive");
    }
  }
}, Vf = E([Yf, ga, ci], z1), B1 = (e, t, r, n) => {
  if (
    /*
     * Angle axis for some reason uses nice ticks when rendering axis tick labels,
     * but doesn't use nice ticks for extending domain like all the other axes do.
     * Not really sure why? Is there a good reason,
     * or is it just because someone added support for nice ticks to the other axes and forgot this one?
     */
    n !== "angleAxis" && e?.type === "number" && qt(t) && Array.isArray(r) && r.length > 0
  ) {
    var i, a, o = t[0], l = (i = r[0]) !== null && i !== void 0 ? i : 0, u = t[1], s = (a = r[r.length - 1]) !== null && a !== void 0 ? a : 0;
    return [Math.min(o, l), Math.max(u, s)];
  }
  return t;
}, wW = E([Qe, Yf, Vf, De], B1), OW = E(xa, Qe, (e, t) => {
  if (!(!t || t.type !== "number")) {
    var r = 1 / 0, n = Array.from(fr(e.map((f) => f.value))).sort((f, d) => f - d), i = n[0], a = n[n.length - 1];
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
}), F1 = E(OW, ye, PF, Ze, (e, t, r, n, i) => i, (e, t, r, n, i) => {
  if (!ce(e))
    return 0;
  var a = t === "vertical" ? n.height : n.width;
  if (i === "gap")
    return e * a / 2;
  if (i === "no-gap") {
    var o = qn(r, e * a), l = e * a / 2;
    return l - o - (l - o) / a * o;
  }
  return 0;
}), PW = (e, t, r) => {
  var n = Rr(e, t);
  return n == null || typeof n.padding != "string" ? 0 : F1(e, "xAxis", t, r, n.padding);
}, AW = (e, t, r) => {
  var n = zr(e, t);
  return n == null || typeof n.padding != "string" ? 0 : F1(e, "yAxis", t, r, n.padding);
}, SW = E(Rr, PW, (e, t) => {
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
}), _W = E(zr, AW, (e, t) => {
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
}), EW = E([Ze, SW, jf, Vl, (e, t, r) => r], (e, t, r, n, i) => {
  var {
    padding: a
  } = n;
  return i ? [a.left, r.width - a.right] : [e.left + t.left, e.left + e.width - t.right];
}), kW = E([Ze, ye, _W, jf, Vl, (e, t, r) => r], (e, t, r, n, i, a) => {
  var {
    padding: o
  } = i;
  return a ? [n.height - o.bottom, o.top] : t === "horizontal" ? [e.top + e.height - r.bottom, e.top + r.top] : [e.top + r.top, e.top + e.height - r.bottom];
}), wa = (e, t, r, n) => {
  var i;
  switch (t) {
    case "xAxis":
      return EW(e, r, n);
    case "yAxis":
      return kW(e, r, n);
    case "zAxis":
      return (i = Uf(e, r)) === null || i === void 0 ? void 0 : i.range;
    case "angleAxis":
      return f1(e);
    case "radiusAxis":
      return d1(e, r);
    default:
      return;
  }
}, W1 = E([Qe, wa], eu), CW = E([ci, wW], DF), Xf = E([Qe, ci, CW, W1], Kf), K1 = (e, t, r, n) => {
  if (!(r == null || r.dataKey == null)) {
    var {
      type: i,
      scale: a
    } = r, o = Dr(e, n);
    if (o && (i === "number" || a !== "auto"))
      return t.map((l) => l.value);
  }
}, Zf = E([ye, xa, ga, De], K1), ou = E([Xf], Wf);
E([Xf], zF);
E([Xf, eW], m1);
E([ba, qf, De], oW);
function U1(e, t) {
  return e.id < t.id ? -1 : e.id > t.id ? 1 : 0;
}
var lu = (e, t) => t, uu = (e, t, r) => r, $W = E(ql, lu, uu, (e, t, r) => e.filter((n) => n.orientation === t).filter((n) => n.mirror === r).sort(U1)), IW = E(Yl, lu, uu, (e, t, r) => e.filter((n) => n.orientation === t).filter((n) => n.mirror === r).sort(U1)), H1 = (e, t) => ({
  width: e.width,
  height: t.height
}), jW = (e, t) => {
  var r = typeof t.width == "number" ? t.width : ma;
  return {
    width: r,
    height: e.height
  };
};
E(Ze, Rr, H1);
var MW = (e, t, r) => {
  switch (t) {
    case "top":
      return e.top;
    case "bottom":
      return r - e.bottom;
    default:
      return 0;
  }
}, DW = (e, t, r) => {
  switch (t) {
    case "left":
      return e.left;
    case "right":
      return r - e.right;
    default:
      return 0;
  }
}, TW = E(Nr, Ze, $W, lu, uu, (e, t, r, n, i) => {
  var a = {}, o;
  return r.forEach((l) => {
    var u = H1(t, l);
    o == null && (o = MW(t, n, e));
    var s = n === "top" && !i || n === "bottom" && i;
    a[l.id] = o - Number(s) * u.height, o += (s ? -1 : 1) * u.height;
  }), a;
}), NW = E(Tr, Ze, IW, lu, uu, (e, t, r, n, i) => {
  var a = {}, o;
  return r.forEach((l) => {
    var u = jW(t, l);
    o == null && (o = DW(t, n, e));
    var s = n === "left" && !i || n === "right" && i;
    a[l.id] = o - Number(s) * u.width, o += (s ? -1 : 1) * u.width;
  }), a;
}), LW = (e, t) => {
  var r = Rr(e, t);
  if (r != null)
    return TW(e, r.orientation, r.mirror);
};
E([Ze, Rr, LW, (e, t) => t], (e, t, r, n) => {
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
});
var RW = (e, t) => {
  var r = zr(e, t);
  if (r != null)
    return NW(e, r.orientation, r.mirror);
};
E([Ze, zr, RW, (e, t) => t], (e, t, r, n) => {
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
});
E(Ze, zr, (e, t) => {
  var r = typeof t.width == "number" ? t.width : ma;
  return {
    width: r,
    height: e.height
  };
});
var G1 = (e, t, r, n) => {
  if (r != null) {
    var {
      allowDuplicatedCategory: i,
      type: a,
      dataKey: o
    } = r, l = Dr(e, n), u = t.map((s) => s.value);
    if (o && l && a === "category" && i && Ow(u))
      return u;
  }
}, Qf = E([ye, xa, Qe, De], G1);
E([ye, YF, ci, ou, Qf, Zf, wa, Vf, De], (e, t, r, n, i, a, o, l, u) => {
  if (t != null) {
    var s = Dr(e, u);
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
});
var zW = (e, t, r, n, i, a, o, l, u) => {
  if (!(t == null || n == null)) {
    var s = Dr(e, u), {
      type: c,
      ticks: f,
      tickCount: d
    } = t, v = (
      // @ts-expect-error This is testing for `scaleBand` but for band axis the type is reported as `band` so this looks like a dead code with a workaround elsewhere?
      r === "scaleBand" && typeof n.bandwidth == "function" ? n.bandwidth() / 2 : 2
    ), h = c === "category" && n.bandwidth ? n.bandwidth() / v : 0;
    h = u === "angleAxis" && a != null && a.length >= 2 ? pa(a[0] - a[1]) * 2 * h : h;
    var y = f || i;
    return y ? y.map((m, g) => {
      var x = o ? o.indexOf(m) : m, b = n.map(x);
      return ce(b) ? {
        index: g,
        coordinate: b + h,
        value: m,
        offset: h
      } : null;
    }).filter(Kt) : s && l ? l.map((m, g) => {
      var x = n.map(m);
      return ce(x) ? {
        coordinate: x + h,
        value: m,
        index: g,
        offset: h
      } : null;
    }).filter(Kt) : n.ticks ? n.ticks(d).map((m, g) => {
      var x = n.map(m);
      return ce(x) ? {
        coordinate: x + h,
        value: m,
        index: g,
        offset: h
      } : null;
    }).filter(Kt) : n.domain().map((m, g) => {
      var x = n.map(m);
      return ce(x) ? {
        coordinate: x + h,
        // @ts-expect-error can't use Date as index
        value: o ? o[m] : m,
        index: g,
        offset: h
      } : null;
    }).filter(Kt);
  }
};
E([ye, ga, ci, ou, Vf, wa, Qf, Zf, De], zW);
var BW = (e, t, r, n, i, a, o) => {
  if (!(t == null || r == null || n == null || n[0] === n[1])) {
    var l = Dr(e, o), {
      tickCount: u
    } = t, s = 0;
    return s = o === "angleAxis" && n?.length >= 2 ? pa(n[0] - n[1]) * 2 * s : s, l && a ? a.map((c, f) => {
      var d = r.map(c);
      return ce(d) ? {
        coordinate: d + s,
        value: c,
        index: f,
        offset: s
      } : null;
    }).filter(Kt) : r.ticks ? r.ticks(u).map((c, f) => {
      var d = r.map(c);
      return ce(d) ? {
        coordinate: d + s,
        value: c,
        index: f,
        offset: s
      } : null;
    }).filter(Kt) : r.domain().map((c, f) => {
      var d = r.map(c);
      return ce(d) ? {
        coordinate: d + s,
        // @ts-expect-error can't use unknown as index
        value: i ? i[c] : c,
        index: f,
        offset: s
      } : null;
    }).filter(Kt);
  }
};
E([ye, ga, ou, wa, Qf, Zf, De], BW);
E(Qe, ou, (e, t) => {
  if (!(e == null || t == null))
    return ol(ol({}, e), {}, {
      scale: t
    });
});
var FW = E([Qe, ci, Yf, W1], Kf), WW = E([FW], Wf);
E((e, t, r) => Uf(e, r), WW, (e, t) => {
  if (!(e == null || t == null))
    return ol(ol({}, e), {}, {
      scale: t
    });
});
E([ye, ql, Yl], (e, t, r) => {
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
});
var KW = (e, t, r) => {
  var n;
  return (n = e.renderedTicks[t]) === null || n === void 0 ? void 0 : n[r];
};
E([KW], (e) => {
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
var q1 = (e) => e.options.defaultTooltipEventType, Y1 = (e) => e.options.validateTooltipEventTypes;
function V1(e, t, r) {
  if (e == null)
    return t;
  var n = e ? "axis" : "item";
  return r == null ? t : r.includes(n) ? n : t;
}
function UW(e, t) {
  var r = q1(e), n = Y1(e);
  return V1(t, r, n);
}
function HW(e) {
  return ue((t) => UW(t, e));
}
var X1 = (e, t) => {
  var r, n = Number(t);
  if (!(oi(n) || t == null))
    return n >= 0 ? e == null || (r = e[n]) === null || r === void 0 ? void 0 : r.value : void 0;
}, GW = (e) => e.tooltip.settings, Sr = {
  active: !1,
  index: null,
  dataKey: void 0,
  graphicalItemId: void 0,
  coordinate: void 0
}, qW = {
  itemInteraction: {
    click: Sr,
    hover: Sr
  },
  axisInteraction: {
    click: Sr,
    hover: Sr
  },
  keyboardInteraction: Sr,
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
}, YW = Ae({
  name: "tooltip",
  initialState: qW,
  reducers: {
    addTooltipEntrySettings: {
      reducer(e, t) {
        e.tooltipItemPayloads.push(t.payload);
      },
      prepare: Q()
    },
    replaceTooltipEntrySettings: {
      reducer(e, t) {
        var {
          prev: r,
          next: n
        } = t.payload, i = He(e).tooltipItemPayloads.indexOf(r);
        i > -1 && (e.tooltipItemPayloads[i] = n);
      },
      prepare: Q()
    },
    removeTooltipEntrySettings: {
      reducer(e, t) {
        var r = He(e).tooltipItemPayloads.indexOf(t.payload);
        r > -1 && e.tooltipItemPayloads.splice(r, 1);
      },
      prepare: Q()
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
  addTooltipEntrySettings: c5,
  replaceTooltipEntrySettings: f5,
  removeTooltipEntrySettings: d5,
  setTooltipSettingsState: VW,
  setActiveMouseOverItemIndex: v5,
  mouseLeaveItem: p5,
  mouseLeaveChart: h5,
  setActiveClickItemIndex: m5,
  setMouseOverAxisIndex: y5,
  setMouseClickAxisIndex: g5,
  setSyncInteraction: XW,
  setKeyboardInteraction: b5
} = YW.actions;
function zm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ua(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zm(Object(r), !0).forEach(function(n) {
      ZW(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : zm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ZW(e, t, r) {
  return (t = QW(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function QW(e) {
  var t = JW(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function JW(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function eK(e, t, r) {
  return t === "axis" ? r === "click" ? e.axisInteraction.click : e.axisInteraction.hover : r === "click" ? e.itemInteraction.click : e.itemInteraction.hover;
}
function tK(e) {
  return e.index != null;
}
var Z1 = (e, t, r, n) => {
  if (t == null)
    return Sr;
  var i = eK(e, t, r);
  if (i == null)
    return Sr;
  if (i.active)
    return i;
  if (e.keyboardInteraction.active)
    return e.keyboardInteraction;
  if (e.syncInteraction.active && e.syncInteraction.index != null)
    return e.syncInteraction;
  var a = e.settings.active === !0;
  if (tK(i)) {
    if (a)
      return Ua(Ua({}, i), {}, {
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
  return Ua(Ua({}, Sr), {}, {
    coordinate: i.coordinate
  });
};
function rK(e) {
  if (typeof e == "number")
    return Number.isFinite(e) ? e : void 0;
  if (e instanceof Date) {
    var t = e.valueOf();
    return Number.isFinite(t) ? t : void 0;
  }
  var r = Number(e);
  return Number.isFinite(r) ? r : void 0;
}
function nK(e, t) {
  var r = rK(e), n = t[0], i = t[1];
  if (r === void 0)
    return !1;
  var a = Math.min(n, i), o = Math.max(n, i);
  return r >= a && r <= o;
}
function iK(e, t, r) {
  if (r == null || t == null)
    return !0;
  var n = ot(e, t);
  return n == null || !qt(r) ? !0 : nK(n, r);
}
var Q1 = (e, t, r, n) => {
  var i = e?.index;
  if (i == null)
    return null;
  var a = Number(i);
  if (!ce(a))
    return i;
  var o = 0, l = 1 / 0;
  t.length > 0 && (l = t.length - 1);
  var u = Math.max(o, Math.min(a, l)), s = t[u];
  return s == null || iK(s, r, n) ? String(u) : null;
}, J1 = (e, t, r, n, i, a, o) => {
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
}, eO = (e, t, r, n) => {
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
}, tO = (e) => e.options.tooltipPayloadSearcher, Oa = (e) => e.tooltip;
function Bm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Fm(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Bm(Object(r), !0).forEach(function(n) {
      aK(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Bm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function aK(e, t, r) {
  return (t = oK(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function oK(e) {
  var t = lK(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function lK(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function uK(e) {
  if (typeof e == "string" || typeof e == "number")
    return e;
}
function sK(e) {
  if (typeof e == "string" || typeof e == "number" || typeof e == "boolean")
    return e;
}
function cK(e) {
  if (typeof e == "string" || typeof e == "number")
    return e;
  if (typeof e == "function")
    return (t) => e(t);
}
function Wm(e) {
  if (typeof e == "string")
    return e;
}
function fK(e) {
  if (!(e == null || typeof e != "object")) {
    var t = "name" in e ? uK(e.name) : void 0, r = "unit" in e ? sK(e.unit) : void 0, n = "dataKey" in e ? cK(e.dataKey) : void 0, i = "payload" in e ? e.payload : void 0, a = "color" in e ? Wm(e.color) : void 0, o = "fill" in e ? Wm(e.fill) : void 0;
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
function dK(e, t) {
  return e ?? t;
}
var rO = (e, t, r, n, i, a, o) => {
  if (!(t == null || a == null)) {
    var {
      chartData: l,
      computedData: u,
      dataStartIndex: s,
      dataEndIndex: c
    } = r, f = [];
    return e.reduce((d, v) => {
      var h, {
        dataDefinedOnItem: y,
        settings: m
      } = v, g = dK(y, l), x = Array.isArray(g) ? jw(g, s, c) : g, b = (h = m?.dataKey) !== null && h !== void 0 ? h : n, w = m?.nameKey, P;
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
      o === "axis" ? P = VL(x, n, i) : P = a(x, t, u, w), Array.isArray(P))
        P.forEach((S) => {
          var A, C, $ = fK(S), j = $?.name, k = $?.dataKey, F = $?.payload, W = Fm(Fm({}, m), {}, {
            name: j,
            unit: $?.unit,
            // Preserve item-level color/fill from graphical items.
            color: (A = $?.color) !== null && A !== void 0 ? A : m?.color,
            fill: (C = $?.fill) !== null && C !== void 0 ? C : m?.fill
          });
          d.push(Dh({
            tooltipEntrySettings: W,
            dataKey: k,
            payload: F,
            value: ot(F, k),
            name: j == null ? void 0 : String(j)
          }));
        });
      else {
        var O;
        d.push(Dh({
          tooltipEntrySettings: m,
          dataKey: b,
          payload: P,
          // getValueByDataKey does not validate the output type
          value: ot(P, b),
          // getValueByDataKey does not validate the output type
          name: (O = ot(P, w)) !== null && O !== void 0 ? O : m?.name
        }));
      }
      return d;
    }, f);
  }
}, Jf = E([_e, y1, Lf], h1), vK = E([(e) => e.graphicalItems.cartesianItems, (e) => e.graphicalItems.polarItems], (e, t) => [...e, ...t]), pK = E([We, ui], g1), Pa = E([vK, _e, pK], b1, {
  memoizeOptions: {
    resultEqualityCheck: iu
  }
}), hK = E([Pa], (e) => e.filter(Ff)), mK = E([Pa], O1, {
  memoizeOptions: {
    resultEqualityCheck: iu
  }
}), Aa = E([mK, Lr], P1), yK = E([hK, Lr, _e], p1), ed = E([Aa, _e, Pa], A1), nO = E([_e], Gf), gK = E([_e], (e) => e.allowDataOverflow), iO = E([nO, gK], t1), bK = E([Pa], (e) => e.filter(Ff)), xK = E([yK, bK, Jl, l1], _1), wK = E([xK, Lr, We, iO], E1), OK = E([Pa], w1), PK = E([Aa, _e, OK, qf, We], $1, {
  memoizeOptions: {
    resultEqualityCheck: nu
  }
}), AK = E([I1, We, ui], si), SK = E([AK, We], D1), _K = E([j1, We, ui], si), EK = E([_K, We], T1), kK = E([M1, We, ui], si), CK = E([kK, We], N1), $K = E([SK, CK, EK], ll), IK = E([_e, nO, iO, wK, PK, $K, ye, We], L1), su = E([_e, ye, Aa, ed, Jl, We, IK], R1), jK = E([su, _e, Jf], z1), MK = E([_e, su, jK, We], B1), aO = (e) => {
  var t = We(e), r = ui(e), n = !1;
  return wa(e, t, r, n);
}, DK = E([_e, aO], eu), TK = E([_e, Jf, MK, DK], Kf), oO = E([TK], Wf), NK = E([ye, ed, _e, We], G1), LK = E([ye, ed, _e, We], K1), RK = (e, t, r, n, i, a, o, l) => {
  if (t) {
    var {
      type: u
    } = t, s = Dr(e, l);
    if (n) {
      var c = r === "scaleBand" && n.bandwidth ? n.bandwidth() / 2 : 2, f = u === "category" && n.bandwidth ? n.bandwidth() / c : 0;
      return f = l === "angleAxis" && i != null && i?.length >= 2 ? pa(i[0] - i[1]) * 2 * f : f, s && o ? o.map((d, v) => {
        var h = n.map(d);
        return ce(h) ? {
          coordinate: h + f,
          value: d,
          index: v,
          offset: f
        } : null;
      }).filter(Kt) : n.domain().map((d, v) => {
        var h = n.map(d);
        return ce(h) ? {
          coordinate: h + f,
          // @ts-expect-error can't use Date as an index
          value: a ? a[d] : d,
          index: v,
          offset: f
        } : null;
      }).filter(Kt);
    }
  }
}, fi = E([ye, _e, Jf, oO, aO, NK, LK, We], RK), td = E([q1, Y1, GW], (e, t, r) => V1(r.shared, e, t)), lO = (e) => e.tooltip.settings.trigger, rd = (e) => e.tooltip.settings.defaultIndex, Sa = E([Oa, td, lO, rd], Z1), uO = E([Sa, Aa, au, su], Q1), zK = E([fi, uO], X1);
E([Sa], (e) => {
  if (e)
    return e.dataKey;
});
var BK = E([Sa], (e) => {
  if (e)
    return e.graphicalItemId;
}), sO = E([Oa, td, lO, rd], eO), FK = E([Tr, Nr, ye, Ze, fi, rd, sO], J1);
E([Sa, FK], (e, t) => e != null && e.coordinate ? e.coordinate : t);
E([Sa], (e) => {
  var t;
  return (t = e?.active) !== null && t !== void 0 ? t : !1;
});
var WK = E([sO, uO, Lr, au, zK, tO, td], rO);
E([WK], (e) => {
  if (e != null) {
    var t = e.map((r) => r.payload).filter((r) => r != null);
    return Array.from(new Set(t));
  }
});
function Km(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Um(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Km(Object(r), !0).forEach(function(n) {
      KK(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Km(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function KK(e, t, r) {
  return (t = UK(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function UK(e) {
  var t = HK(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function HK(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var GK = () => ue(_e), qK = () => {
  var e = GK(), t = ue(fi), r = ue(oO);
  return Mh(!e || !r ? void 0 : Um(Um({}, e), {}, {
    scale: r
  }), t);
}, YK = () => ue(Lf), nd = (e, t) => t, cO = (e, t, r) => r, id = (e, t, r, n) => n;
E(fi, (e) => gn(e, (t) => t.coordinate));
var ad = E([Oa, nd, cO, id], Z1), od = E([ad, Aa, au, su], Q1), VK = (e, t, r) => {
  if (t != null) {
    var n = Oa(e);
    return t === "axis" ? r === "hover" ? n.axisInteraction.hover.dataKey : n.axisInteraction.click.dataKey : r === "hover" ? n.itemInteraction.hover.dataKey : n.itemInteraction.click.dataKey;
  }
}, fO = E([Oa, nd, cO, id], eO), XK = E([Tr, Nr, ye, Ze, fi, id, fO], J1), ZK = E([ad, XK], (e, t) => {
  var r;
  return (r = e.coordinate) !== null && r !== void 0 ? r : t;
}), dO = E([fi, od], X1), QK = E([fO, od, Lr, au, dO, tO, nd], rO), JK = E([ad, od], (e, t) => ({
  isActive: e.active && t != null,
  activeIndex: t
})), e3 = E((e) => e.zIndex.zIndexMap, (e, t) => t, (e, t, r) => r, (e, t, r) => {
  if (t != null) {
    var n = e[t];
    if (n != null)
      return r ? n.panoramaElement : n.element;
  }
});
E((e) => e.zIndex.zIndexMap, (e) => {
  var t = Object.keys(e).map((n) => parseInt(n, 10)).concat(Object.values(nn)), r = Array.from(new Set(t));
  return r.sort((n, i) => n - i);
}, {
  memoizeOptions: {
    resultEqualityCheck: MF
  }
});
function Hm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Gm(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Hm(Object(r), !0).forEach(function(n) {
      t3(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Hm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function t3(e, t, r) {
  return (t = r3(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function r3(e) {
  var t = n3(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function n3(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var i3 = {}, a3 = {
  zIndexMap: Object.values(nn).reduce((e, t) => Gm(Gm({}, e), {}, {
    [t]: {
      element: void 0,
      panoramaElement: void 0,
      consumers: 0
    }
  }), i3)
}, o3 = new Set(Object.values(nn));
function l3(e) {
  return o3.has(e);
}
var u3 = Ae({
  name: "zIndex",
  initialState: a3,
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
      prepare: Q()
    },
    unregisterZIndexPortal: {
      reducer: (e, t) => {
        var {
          zIndex: r
        } = t.payload;
        e.zIndexMap[r] && (e.zIndexMap[r].consumers -= 1, e.zIndexMap[r].consumers <= 0 && !l3(r) && delete e.zIndexMap[r]);
      },
      prepare: Q()
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
      prepare: Q()
    },
    unregisterZIndexPortalElement: {
      reducer: (e, t) => {
        var {
          zIndex: r
        } = t.payload;
        e.zIndexMap[r] && (t.payload.isPanorama ? e.zIndexMap[r].panoramaElement = void 0 : e.zIndexMap[r].element = void 0);
      },
      prepare: Q()
    }
  }
}), {
  registerZIndexPortal: s3,
  unregisterZIndexPortal: c3,
  registerZIndexPortalElement: x5,
  unregisterZIndexPortalElement: w5
} = u3.actions;
function f3(e) {
  var {
    zIndex: t,
    children: r
  } = e, n = Pz(), i = n && t !== void 0 && t !== 0, a = Dw(), o = Gl();
  p.useLayoutEffect(() => i ? (o(s3({
    zIndex: t
  })), () => {
    o(c3({
      zIndex: t
    }));
  }) : If, [o, t, i]);
  var l = ue((u) => e3(u, t, a));
  return i ? l ? /* @__PURE__ */ sl.createPortal(r, l) : null : r;
}
function Zs() {
  return Zs = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Zs.apply(null, arguments);
}
function qm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ha(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? qm(Object(r), !0).forEach(function(n) {
      d3(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : qm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function d3(e, t, r) {
  return (t = v3(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function v3(e) {
  var t = p3(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function p3(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function h3(e) {
  var {
    cursor: t,
    cursorComp: r,
    cursorProps: n
  } = e;
  return /* @__PURE__ */ p.isValidElement(t) ? /* @__PURE__ */ p.cloneElement(t, n) : /* @__PURE__ */ p.createElement(r, n);
}
function m3(e) {
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
  var h, y, m;
  if (c === "ScatterChart")
    h = f, y = MB, m = nn.cursorLine;
  else if (c === "BarChart")
    h = DB(l, f, a, o), y = vF, m = nn.cursorRectangle;
  else if (l === "radial" && Sw(f)) {
    var {
      cx: g,
      cy: x,
      radius: b,
      startAngle: w,
      endAngle: P
    } = Qw(f);
    h = {
      cx: g,
      cy: x,
      startAngle: w,
      endAngle: P,
      innerRadius: b,
      outerRadius: b
    }, y = gF, m = nn.cursorLine;
  } else
    h = {
      points: bF(l, f, a)
    }, y = AB, m = nn.cursorLine;
  var O = typeof u == "object" && "className" in u ? u.className : void 0, S = Ha(Ha(Ha(Ha({
    stroke: "#ccc",
    pointerEvents: "none"
  }, a), h), BL(u)), {}, {
    payload: d,
    payloadIndex: v,
    className: ee("recharts-tooltip-cursor", O)
  });
  return /* @__PURE__ */ p.createElement(f3, {
    zIndex: (t = e.zIndex) !== null && t !== void 0 ? t : m
  }, /* @__PURE__ */ p.createElement(h3, {
    cursor: u,
    cursorComp: y,
    cursorProps: S
  }));
}
function y3(e) {
  var t = qK(), r = bz(), n = Mf(), i = YK();
  return t == null || r == null || n == null || i == null ? null : /* @__PURE__ */ p.createElement(m3, Zs({}, e, {
    offset: r,
    layout: n,
    tooltipAxisBandSize: t,
    chartName: i
  }));
}
var g3 = /* @__PURE__ */ p.createContext(null), b3 = () => p.useContext(g3), x3 = new hx(), w3 = "recharts.syncEvent.tooltip";
function O3(e) {
  return e.tooltip.syncInteraction;
}
function P3(e, t, r, n, i, a) {
  var o = ue((h) => VK(h, e, t)), l = ue(BK), u = ue(_F), s = ue(AF), c = ue(SF), f = ue(O3), d = f?.active, v = Rw();
  p.useEffect(() => {
    if (!d && s != null && u != null) {
      var h = XW({
        active: a,
        coordinate: r,
        dataKey: o,
        index: i,
        label: typeof n == "number" ? String(n) : n,
        sourceViewBox: v,
        graphicalItemId: l
      });
      x3.emit(w3, s, h, u);
    }
  }, [d, r, o, l, i, n, u, s, c, a, v]);
}
function Ym(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Vm(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ym(Object(r), !0).forEach(function(n) {
      A3(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ym(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function A3(e, t, r) {
  return (t = S3(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function S3(e) {
  var t = _3(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function _3(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function E3(e) {
  return e.dataKey;
}
function k3(e, t) {
  return /* @__PURE__ */ p.isValidElement(e) ? /* @__PURE__ */ p.cloneElement(e, t) : typeof e == "function" ? /* @__PURE__ */ p.createElement(e, t) : /* @__PURE__ */ p.createElement(oB, t);
}
var Xm = [], C3 = {
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
function $3(e) {
  var t, r, n = li(e, C3), {
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
    reverseDirection: h,
    useTranslate3d: y,
    wrapperStyle: m,
    cursor: g,
    shared: x,
    trigger: b,
    defaultIndex: w,
    portal: P,
    axisId: O
  } = n, S = Gl(), A = typeof w == "number" ? String(w) : w;
  p.useEffect(() => {
    S(VW({
      shared: x,
      trigger: b,
      axisId: O,
      active: i,
      defaultIndex: A
    }));
  }, [S, x, b, O, i, A]);
  var C = Rw(), $ = gB(), j = HW(x), {
    activeIndex: k,
    isActive: F
  } = (t = ue((Ne) => JK(Ne, j, b, A))) !== null && t !== void 0 ? t : {}, W = ue((Ne) => QK(Ne, j, b, A)), K = ue((Ne) => dO(Ne, j, b, A)), Y = ue((Ne) => ZK(Ne, j, b, A)), H = W, ne = b3(), J = (r = i ?? F) !== null && r !== void 0 ? r : !1, [D, Ee] = Iw([H, J]), ie = j === "axis" ? K : void 0;
  P3(j, b, Y, ie, k, J);
  var Te = P ?? ne;
  if (Te == null || C == null || j == null)
    return null;
  var ge = H ?? Xm;
  J || (ge = Xm), s && ge.length && (ge = Ew(ge.filter((Ne) => Ne.value != null && (Ne.hide !== !0 || n.includeHidden)), d, E3));
  var ae = ge.length > 0, pe = Vm(Vm({}, n), {}, {
    payload: ge,
    label: ie,
    active: J,
    activeIndex: k,
    coordinate: Y,
    accessibilityLayer: $
  }), $t = /* @__PURE__ */ p.createElement(yB, {
    allowEscapeViewBox: a,
    animationDuration: o,
    animationEasing: l,
    isAnimationActive: c,
    active: J,
    coordinate: Y,
    hasPayload: ae,
    offset: f,
    position: v,
    reverseDirection: h,
    useTranslate3d: y,
    viewBox: C,
    wrapperStyle: m,
    lastBoundingBox: D,
    innerRef: Ee,
    hasPortalFromProps: !!P
  }, k3(u, pe));
  return /* @__PURE__ */ p.createElement(p.Fragment, null, /* @__PURE__ */ sl.createPortal($t, Te), J && /* @__PURE__ */ p.createElement(y3, {
    cursor: g,
    tooltipEventType: j,
    coordinate: Y,
    payload: ge,
    index: k
  }));
}
const I3 = (e, t) => {
  const r = new Array(e.length + t.length);
  for (let n = 0; n < e.length; n++)
    r[n] = e[n];
  for (let n = 0; n < t.length; n++)
    r[e.length + n] = t[n];
  return r;
}, j3 = (e, t) => ({
  classGroupId: e,
  validator: t
}), vO = (e = /* @__PURE__ */ new Map(), t = null, r) => ({
  nextPart: e,
  validators: t,
  classGroupId: r
}), ul = "-", Zm = [], M3 = "arbitrary..", D3 = (e) => {
  const t = N3(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: n
  } = e;
  return {
    getClassGroupId: (o) => {
      if (o.startsWith("[") && o.endsWith("]"))
        return T3(o);
      const l = o.split(ul), u = l[0] === "" && l.length > 1 ? 1 : 0;
      return pO(l, u, t);
    },
    getConflictingClassGroupIds: (o, l) => {
      if (l) {
        const u = n[o], s = r[o];
        return u ? s ? I3(s, u) : u : s || Zm;
      }
      return r[o] || Zm;
    }
  };
}, pO = (e, t, r) => {
  if (e.length - t === 0)
    return r.classGroupId;
  const i = e[t], a = r.nextPart.get(i);
  if (a) {
    const s = pO(e, t + 1, a);
    if (s) return s;
  }
  const o = r.validators;
  if (o === null)
    return;
  const l = t === 0 ? e.join(ul) : e.slice(t).join(ul), u = o.length;
  for (let s = 0; s < u; s++) {
    const c = o[s];
    if (c.validator(l))
      return c.classGroupId;
  }
}, T3 = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), r = t.indexOf(":"), n = t.slice(0, r);
  return n ? M3 + n : void 0;
})(), N3 = (e) => {
  const {
    theme: t,
    classGroups: r
  } = e;
  return L3(r, t);
}, L3 = (e, t) => {
  const r = vO();
  for (const n in e) {
    const i = e[n];
    ld(i, r, n, t);
  }
  return r;
}, ld = (e, t, r, n) => {
  const i = e.length;
  for (let a = 0; a < i; a++) {
    const o = e[a];
    R3(o, t, r, n);
  }
}, R3 = (e, t, r, n) => {
  if (typeof e == "string") {
    z3(e, t, r);
    return;
  }
  if (typeof e == "function") {
    B3(e, t, r, n);
    return;
  }
  F3(e, t, r, n);
}, z3 = (e, t, r) => {
  const n = e === "" ? t : hO(t, e);
  n.classGroupId = r;
}, B3 = (e, t, r, n) => {
  if (W3(e)) {
    ld(e(n), t, r, n);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(j3(r, e));
}, F3 = (e, t, r, n) => {
  const i = Object.entries(e), a = i.length;
  for (let o = 0; o < a; o++) {
    const [l, u] = i[o];
    ld(u, hO(t, l), r, n);
  }
}, hO = (e, t) => {
  let r = e;
  const n = t.split(ul), i = n.length;
  for (let a = 0; a < i; a++) {
    const o = n[a];
    let l = r.nextPart.get(o);
    l || (l = vO(), r.nextPart.set(o, l)), r = l;
  }
  return r;
}, W3 = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, K3 = (e) => {
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
}, Qs = "!", Qm = ":", U3 = [], Jm = (e, t, r, n, i) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: r,
  maybePostfixModifierPosition: n,
  isExternal: i
}), H3 = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: r
  } = e;
  let n = (i) => {
    const a = [];
    let o = 0, l = 0, u = 0, s;
    const c = i.length;
    for (let y = 0; y < c; y++) {
      const m = i[y];
      if (o === 0 && l === 0) {
        if (m === Qm) {
          a.push(i.slice(u, y)), u = y + 1;
          continue;
        }
        if (m === "/") {
          s = y;
          continue;
        }
      }
      m === "[" ? o++ : m === "]" ? o-- : m === "(" ? l++ : m === ")" && l--;
    }
    const f = a.length === 0 ? i : i.slice(u);
    let d = f, v = !1;
    f.endsWith(Qs) ? (d = f.slice(0, -1), v = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      f.startsWith(Qs) && (d = f.slice(1), v = !0)
    );
    const h = s && s > u ? s - u : void 0;
    return Jm(a, v, d, h);
  };
  if (t) {
    const i = t + Qm, a = n;
    n = (o) => o.startsWith(i) ? a(o.slice(i.length)) : Jm(U3, !1, o, void 0, !0);
  }
  if (r) {
    const i = n;
    n = (a) => r({
      className: a,
      parseClassName: i
    });
  }
  return n;
}, G3 = (e) => {
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
}, q3 = (e) => ({
  cache: K3(e.cacheSize),
  parseClassName: H3(e),
  sortModifiers: G3(e),
  postfixLookupClassGroupIds: Y3(e),
  ...D3(e)
}), Y3 = (e) => {
  const t = /* @__PURE__ */ Object.create(null), r = e.postfixLookupClassGroups;
  if (r)
    for (let n = 0; n < r.length; n++)
      t[r[n]] = !0;
  return t;
}, V3 = /\s+/, X3 = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: n,
    getConflictingClassGroupIds: i,
    sortModifiers: a,
    postfixLookupClassGroupIds: o
  } = t, l = [], u = e.trim().split(V3);
  let s = "";
  for (let c = u.length - 1; c >= 0; c -= 1) {
    const f = u[c], {
      isExternal: d,
      modifiers: v,
      hasImportantModifier: h,
      baseClassName: y,
      maybePostfixModifierPosition: m
    } = r(f);
    if (d) {
      s = f + (s.length > 0 ? " " + s : s);
      continue;
    }
    let g = !!m, x;
    if (g) {
      const S = y.substring(0, m);
      x = n(S);
      const A = x && o[x] ? n(y) : void 0;
      A && A !== x && (x = A, g = !1);
    } else
      x = n(y);
    if (!x) {
      if (!g) {
        s = f + (s.length > 0 ? " " + s : s);
        continue;
      }
      if (x = n(y), !x) {
        s = f + (s.length > 0 ? " " + s : s);
        continue;
      }
      g = !1;
    }
    const b = v.length === 0 ? "" : v.length === 1 ? v[0] : a(v).join(":"), w = h ? b + Qs : b, P = w + x;
    if (l.indexOf(P) > -1)
      continue;
    l.push(P);
    const O = i(x, g);
    for (let S = 0; S < O.length; ++S) {
      const A = O[S];
      l.push(w + A);
    }
    s = f + (s.length > 0 ? " " + s : s);
  }
  return s;
}, Z3 = (...e) => {
  let t = 0, r, n, i = "";
  for (; t < e.length; )
    (r = e[t++]) && (n = mO(r)) && (i && (i += " "), i += n);
  return i;
}, mO = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (t = mO(e[n])) && (r && (r += " "), r += t);
  return r;
}, Q3 = (e, ...t) => {
  let r, n, i, a;
  const o = (u) => {
    const s = t.reduce((c, f) => f(c), e());
    return r = q3(s), n = r.cache.get, i = r.cache.set, a = l, l(u);
  }, l = (u) => {
    const s = n(u);
    if (s)
      return s;
    const c = X3(u, r);
    return i(u, c), c;
  };
  return a = o, (...u) => a(Z3(...u));
}, J3 = [], be = (e) => {
  const t = (r) => r[e] || J3;
  return t.isThemeGetter = !0, t;
}, yO = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, gO = /^\((?:(\w[\w-]*):)?(.+)\)$/i, eU = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, tU = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, rU = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, nU = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, iU = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, aU = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, wr = (e) => eU.test(e), q = (e) => !!e && !Number.isNaN(Number(e)), Lt = (e) => !!e && Number.isInteger(Number(e)), Ku = (e) => e.endsWith("%") && q(e.slice(0, -1)), Zt = (e) => tU.test(e), bO = () => !0, oU = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  rU.test(e) && !nU.test(e)
), ud = () => !1, lU = (e) => iU.test(e), uU = (e) => aU.test(e), sU = (e) => !L(e) && !R(e), cU = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), fU = (e) => Br(e, OO, ud), L = (e) => yO.test(e), qr = (e) => Br(e, PO, oU), ey = (e) => Br(e, bU, q), dU = (e) => Br(e, SO, bO), vU = (e) => Br(e, AO, ud), ty = (e) => Br(e, xO, ud), pU = (e) => Br(e, wO, uU), Ga = (e) => Br(e, _O, lU), R = (e) => gO.test(e), Ai = (e) => wn(e, PO), hU = (e) => wn(e, AO), ry = (e) => wn(e, xO), mU = (e) => wn(e, OO), yU = (e) => wn(e, wO), qa = (e) => wn(e, _O, !0), gU = (e) => wn(e, SO, !0), Br = (e, t, r) => {
  const n = yO.exec(e);
  return n ? n[1] ? t(n[1]) : r(n[2]) : !1;
}, wn = (e, t, r = !1) => {
  const n = gO.exec(e);
  return n ? n[1] ? t(n[1]) : r : !1;
}, xO = (e) => e === "position" || e === "percentage", wO = (e) => e === "image" || e === "url", OO = (e) => e === "length" || e === "size" || e === "bg-size", PO = (e) => e === "length", bU = (e) => e === "number", AO = (e) => e === "family-name", SO = (e) => e === "number" || e === "weight", _O = (e) => e === "shadow", xU = () => {
  const e = be("color"), t = be("font"), r = be("text"), n = be("font-weight"), i = be("tracking"), a = be("leading"), o = be("breakpoint"), l = be("container"), u = be("spacing"), s = be("radius"), c = be("shadow"), f = be("inset-shadow"), d = be("text-shadow"), v = be("drop-shadow"), h = be("blur"), y = be("perspective"), m = be("aspect"), g = be("ease"), x = be("animate"), b = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], w = () => [
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
  ], P = () => [...w(), R, L], O = () => ["auto", "hidden", "clip", "visible", "scroll"], S = () => ["auto", "contain", "none"], A = () => [R, L, u], C = () => [wr, "full", "auto", ...A()], $ = () => [Lt, "none", "subgrid", R, L], j = () => ["auto", {
    span: ["full", Lt, R, L]
  }, Lt, R, L], k = () => [Lt, "auto", R, L], F = () => ["auto", "min", "max", "fr", R, L], W = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], K = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], Y = () => ["auto", ...A()], H = () => [wr, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...A()], ne = () => [wr, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...A()], J = () => [wr, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...A()], D = () => [e, R, L], Ee = () => [...w(), ry, ty, {
    position: [R, L]
  }], ie = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], Te = () => ["auto", "cover", "contain", mU, fU, {
    size: [R, L]
  }], ge = () => [Ku, Ai, qr], ae = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    s,
    R,
    L
  ], pe = () => ["", q, Ai, qr], $t = () => ["solid", "dashed", "dotted", "double"], Ne = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], M = () => [q, Ku, ry, ty], T = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    h,
    R,
    L
  ], V = () => ["none", q, R, L], I = () => ["none", q, R, L], ke = () => [q, R, L], re = () => [wr, "full", ...A()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Zt],
      breakpoint: [Zt],
      color: [bO],
      container: [Zt],
      "drop-shadow": [Zt],
      ease: ["in", "out", "in-out"],
      font: [sU],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Zt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Zt],
      shadow: [Zt],
      spacing: ["px", q],
      text: [Zt],
      "text-shadow": [Zt],
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
        aspect: ["auto", "square", wr, L, R, m]
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
        "@container": ["", "normal", "size", R, L]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [cU],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [q, L, R, l]
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
        object: P()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: O()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": O()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": O()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: S()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": S()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": S()
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
        z: [Lt, "auto", R, L]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [wr, "full", "auto", l, ...A()]
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
        flex: [q, wr, "auto", "initial", "none", L]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", q, R, L]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", q, R, L]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Lt, "first", "last", "none", R, L]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": $()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: j()
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
        "grid-rows": $()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: j()
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
        "auto-cols": F()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": F()
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
        justify: [...W(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...K(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...K()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...W()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...K(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...K(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": W()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...K(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...K()]
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
        m: Y()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: Y()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: Y()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: Y()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: Y()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: Y()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: Y()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: Y()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: Y()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: Y()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: Y()
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
        size: H()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...ne()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...ne()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...ne()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...J()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...J()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...J()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [l, "screen", ...H()]
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
          ...H()
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
          ...H()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...H()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...H()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...H()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, Ai, qr]
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
        font: [n, gU, dU]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Ku, L]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [hU, vU, t]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [L]
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
        tracking: [i, R, L]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [q, "none", R, ey]
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
        "list-image": ["none", R, L]
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
        list: ["disc", "decimal", "none", R, L]
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
        placeholder: D()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: D()
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
        decoration: [...$t(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [q, "from-font", "auto", R, qr]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: D()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [q, "auto", R, L]
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
        tab: [Lt, R, L]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", R, L]
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
        content: ["none", R, L]
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
        bg: Ee()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ie()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: Te()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Lt, R, L],
          radial: ["", R, L],
          conic: [Lt, R, L]
        }, yU, pU]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: D()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: ge()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: ge()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: ge()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: D()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: D()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: D()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: ae()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": ae()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": ae()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": ae()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": ae()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": ae()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": ae()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": ae()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": ae()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": ae()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": ae()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": ae()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": ae()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": ae()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": ae()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: pe()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": pe()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": pe()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": pe()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": pe()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": pe()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": pe()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": pe()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": pe()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": pe()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": pe()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": pe()
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
        "divide-y": pe()
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
        border: [...$t(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...$t(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: D()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": D()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": D()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": D()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": D()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": D()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": D()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": D()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": D()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": D()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": D()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: D()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...$t(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [q, R, L]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", q, Ai, qr]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: D()
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
          qa,
          Ga
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: D()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", f, qa, Ga]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": D()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: pe()
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
        ring: D()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [q, qr]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": D()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": pe()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": D()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", d, qa, Ga]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": D()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [q, R, L]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Ne(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Ne()
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
        "mask-linear": [q]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": M()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": M()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": D()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": D()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": M()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": M()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": D()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": D()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": M()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": M()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": D()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": D()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": M()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": M()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": D()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": D()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": M()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": M()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": D()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": D()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": M()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": M()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": D()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": D()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": M()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": M()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": D()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": D()
      }],
      "mask-image-radial": [{
        "mask-radial": [R, L]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": M()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": M()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": D()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": D()
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
        "mask-conic": [q]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": M()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": M()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": D()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": D()
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
        mask: Ee()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: ie()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: Te()
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
        mask: ["none", R, L]
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
          R,
          L
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: T()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [q, R, L]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [q, R, L]
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
          qa,
          Ga
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": D()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", q, R, L]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [q, R, L]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", q, R, L]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [q, R, L]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", q, R, L]
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
          R,
          L
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": T()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [q, R, L]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [q, R, L]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", q, R, L]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [q, R, L]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", q, R, L]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [q, R, L]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [q, R, L]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", q, R, L]
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", R, L]
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
        duration: [q, "initial", R, L]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", g, R, L]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [q, R, L]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", x, R, L]
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
        perspective: [y, R, L]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": P()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: V()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": V()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": V()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": V()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: I()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": I()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": I()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": I()
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
        skew: ke()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": ke()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": ke()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [R, L, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: P()
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
        translate: re()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": re()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": re()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": re()
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
        zoom: [Lt, R, L]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: D()
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
        caret: D()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", R, L]
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
        "scrollbar-thumb": D()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": D()
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
        "will-change": ["auto", "scroll", "contents", "transform", R, L]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...D()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [q, Ai, qr, ey]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...D()]
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
}, wU = /* @__PURE__ */ Q3(xU);
function Jt(...e) {
  return wU(ee(e));
}
const OU = { light: "", dark: ".dark" }, PU = { width: 320, height: 200 }, EO = p.createContext(null);
function kO() {
  const e = p.useContext(EO);
  if (!e)
    throw new Error("useChart must be used within a <ChartContainer />");
  return e;
}
function AU({
  id: e,
  className: t,
  children: r,
  config: n,
  initialDimension: i = PU,
  ...a
}) {
  const o = p.useId(), l = `chart-${e ?? o.replace(/:/g, "")}`;
  return /* @__PURE__ */ B.jsx(EO.Provider, { value: { config: n }, children: /* @__PURE__ */ B.jsxs(
    "div",
    {
      "data-slot": "chart",
      "data-chart": l,
      className: Jt(
        "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
        t
      ),
      ...a,
      children: [
        /* @__PURE__ */ B.jsx(SU, { id: l, config: n }),
        /* @__PURE__ */ B.jsx(
          yz,
          {
            initialDimension: i,
            children: r
          }
        )
      ]
    }
  ) });
}
const SU = ({ id: e, config: t }) => {
  const r = Object.entries(t).filter(
    ([, n]) => n.theme ?? n.color
  );
  return r.length ? /* @__PURE__ */ B.jsx(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(OU).map(
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
}, _U = $3;
function EU({
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
  const { config: v } = kO(), h = p.useMemo(() => {
    if (i || !t?.length)
      return null;
    const [m] = t, g = `${d ?? m?.dataKey ?? m?.name ?? "value"}`, x = Js(v, m, g), b = !d && typeof o == "string" ? v[o]?.label ?? o : x?.label;
    return l ? /* @__PURE__ */ B.jsx("div", { className: Jt("font-medium", u), children: l(b, t) }) : b ? /* @__PURE__ */ B.jsx("div", { className: Jt("font-medium", u), children: b }) : null;
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
  const y = t.length === 1 && n !== "dot";
  return /* @__PURE__ */ B.jsxs(
    "div",
    {
      className: Jt(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs shadow-xl",
        r
      ),
      children: [
        y ? null : h,
        /* @__PURE__ */ B.jsx("div", { className: "grid gap-1.5", children: t.filter((m) => m.type !== "none").map((m, g) => {
          const x = `${f ?? m.name ?? m.dataKey ?? "value"}`, b = Js(v, m, x), w = c ?? m.payload?.fill ?? m.color;
          return /* @__PURE__ */ B.jsx(
            "div",
            {
              className: Jt(
                "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                n === "dot" && "items-center"
              ),
              children: s && m?.value !== void 0 && m.name ? s(m.value, m.name, m, g, m.payload) : /* @__PURE__ */ B.jsxs(B.Fragment, { children: [
                b?.icon ? /* @__PURE__ */ B.jsx(b.icon, {}) : !a && /* @__PURE__ */ B.jsx(
                  "div",
                  {
                    className: Jt(
                      "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                      {
                        "h-2.5 w-2.5": n === "dot",
                        "w-1": n === "line",
                        "w-0 border-[1.5px] border-dashed bg-transparent": n === "dashed",
                        "my-0.5": y && n === "dashed"
                      }
                    ),
                    style: {
                      "--color-bg": w,
                      "--color-border": w
                    }
                  }
                ),
                /* @__PURE__ */ B.jsxs(
                  "div",
                  {
                    className: Jt(
                      "flex flex-1 justify-between leading-none",
                      y ? "items-end" : "items-center"
                    ),
                    children: [
                      /* @__PURE__ */ B.jsxs("div", { className: "grid gap-1.5", children: [
                        y ? h : null,
                        /* @__PURE__ */ B.jsx("span", { className: "text-muted-foreground", children: b?.label ?? m.name })
                      ] }),
                      m.value != null && /* @__PURE__ */ B.jsx("span", { className: "font-mono font-medium text-foreground tabular-nums", children: typeof m.value == "number" ? m.value.toLocaleString() : String(m.value) })
                    ]
                  }
                )
              ] })
            },
            g
          );
        }) })
      ]
    }
  );
}
const kU = Gw;
function CU({
  className: e,
  hideIcon: t = !1,
  payload: r,
  verticalAlign: n = "bottom",
  nameKey: i
}) {
  const { config: a } = kO();
  return r?.length ? /* @__PURE__ */ B.jsx(
    "div",
    {
      className: Jt(
        "flex items-center justify-center gap-4",
        n === "top" ? "pb-3" : "pt-3",
        e
      ),
      children: r.filter((o) => o.type !== "none").map((o, l) => {
        const u = `${i ?? o.dataKey ?? "value"}`, s = Js(a, o, u);
        return /* @__PURE__ */ B.jsxs(
          "div",
          {
            className: Jt(
              "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
            ),
            children: [
              s?.icon && !t ? /* @__PURE__ */ B.jsx(s.icon, {}) : /* @__PURE__ */ B.jsx(
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
function Js(e, t, r) {
  if (typeof t != "object" || t === null)
    return;
  const n = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0;
  let i = r;
  return r in t && typeof t[r] == "string" ? i = t[r] : n && r in n && typeof n[r] == "string" && (i = n[r]), i in e ? e[i] : e[r];
}
const ny = [
  {
    key: "value",
    label: "Значение",
    color: "var(--aiwa-accent)"
  }
];
function iy(e) {
  return e != null && e !== "" && Number.isFinite(Number(e));
}
function $U({ gradientId: e, emptyText: t }) {
  return /* @__PURE__ */ B.jsxs("div", { className: "aiwa-area-chart-empty", children: [
    /* @__PURE__ */ B.jsx("div", { className: "aiwa-area-chart-empty-plot", "aria-hidden": "true", children: /* @__PURE__ */ B.jsxs(
      "svg",
      {
        className: "aiwa-area-chart-empty-svg",
        viewBox: "0 0 320 144",
        preserveAspectRatio: "none",
        children: [
          /* @__PURE__ */ B.jsx("defs", { children: /* @__PURE__ */ B.jsxs("linearGradient", { id: e, x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ B.jsx("stop", { offset: "5%", stopColor: "var(--aiwa-ink-muted)", stopOpacity: 0.26 }),
            /* @__PURE__ */ B.jsx("stop", { offset: "95%", stopColor: "var(--aiwa-ink-muted)", stopOpacity: 0.03 })
          ] }) }),
          /* @__PURE__ */ B.jsx(
            "path",
            {
              className: "aiwa-area-chart-empty-fill",
              d: "M24 30 C72 40 112 70 160 76 C208 82 252 105 296 110 L296 140 L24 140 Z",
              fill: `url(#${e})`
            }
          ),
          /* @__PURE__ */ B.jsx(
            "path",
            {
              className: "aiwa-area-chart-empty-line",
              d: "M24 30 C72 40 112 70 160 76 C208 82 252 105 296 110"
            }
          ),
          [{ x: 24, y: 30 }, { x: 160, y: 76 }, { x: 296, y: 110 }].map((r) => /* @__PURE__ */ B.jsx(
            "circle",
            {
              className: "aiwa-area-chart-empty-dot",
              cx: r.x,
              cy: r.y,
              r: "4"
            },
            `${r.x}-${r.y}`
          ))
        ]
      }
    ) }),
    /* @__PURE__ */ B.jsx(
      jO,
      {
        as: "p",
        className: "aiwa-area-chart-empty-text",
        variant: "subheadline1",
        weight: "regular",
        role: "status",
        children: t
      }
    )
  ] });
}
function O5({
  data: e = [],
  series: t = ny,
  xKey: r = "label",
  ariaLabel: n = "График динамики",
  emptyText: i = "Продолжай вести дневник, чтобы увидеть динамику цикла",
  loading: a = !1,
  showLegend: o,
  band: l = null
}) {
  const u = p.useId().replaceAll(":", ""), s = Array.isArray(e) ? e : [], c = Array.isArray(t) ? t : ny, f = o ?? c.length > 1, d = p.useRef(null);
  p.useEffect(() => {
    const S = d.current;
    S && (S.scrollLeft = S.scrollWidth);
  }, [s.length]);
  const v = c.filter((S) => S?.key && s.filter((A) => iy(A?.[S.key])).length >= 2), h = s.map((S) => {
    const A = { ...S };
    return v.forEach((C) => {
      const $ = S?.[C.key];
      A[C.key] = iy($) ? Number($) : null;
    }), A;
  }), y = Object.fromEntries(v.map((S) => [
    S.key,
    {
      label: S.label || S.key,
      color: S.color || "var(--aiwa-accent)"
    }
  ])), m = h.flatMap((S) => v.map((A) => S?.[A.key]).filter(Number.isFinite)), g = m.length ? Math.min(...m) : 0, x = m.length ? Math.max(...m) : 1, b = x - g, w = Math.max(1, b * 0.35, Math.abs(x) * 0.04), P = [
    Math.min(l ? l[0] - 1 : 1 / 0, g >= 0 ? Math.max(0, Math.floor(g - w)) : Math.floor(g - w)),
    Math.max(l ? l[1] + 1 : -1 / 0, Math.ceil(x + w))
  ];
  if (a)
    return /* @__PURE__ */ B.jsx("div", { className: "aiwa-area-chart-state is-loading", role: "status", "aria-label": "График загружается", children: /* @__PURE__ */ B.jsx("span", { className: "aiwa-area-chart-skeleton", "aria-hidden": "true" }) });
  if (!s.length || !v.length)
    return /* @__PURE__ */ B.jsx($U, { gradientId: `${u}-empty`, emptyText: i });
  const O = Math.max(h.length * 56, 320);
  return /* @__PURE__ */ B.jsx("div", { className: "aiwa-chart-scroll", "data-band": l ? l.join("-") : "none", ref: d, children: /* @__PURE__ */ B.jsx("div", { style: { minWidth: `${O}px` }, children: /* @__PURE__ */ B.jsx(
    AU,
    {
      config: y,
      className: "h-64 w-full",
      role: "img",
      "aria-label": n,
      children: /* @__PURE__ */ B.jsxs(
        NL,
        {
          accessibilityLayer: !0,
          data: h,
          margin: { top: 20, left: 4, right: 12 },
          children: [
            /* @__PURE__ */ B.jsx("defs", { children: v.map((S, A) => /* @__PURE__ */ B.jsxs(
              "linearGradient",
              {
                id: `${u}-${S.key}`,
                x1: "0",
                y1: "0",
                x2: "0",
                y2: "1",
                children: [
                  /* @__PURE__ */ B.jsx(
                    "stop",
                    {
                      offset: "5%",
                      stopColor: `var(--color-${S.key})`,
                      stopOpacity: A === 0 ? 0.35 : 0.28
                    }
                  ),
                  /* @__PURE__ */ B.jsx(
                    "stop",
                    {
                      offset: "95%",
                      stopColor: `var(--color-${S.key})`,
                      stopOpacity: A === 0 ? 0.06 : 0.04
                    }
                  )
                ]
              },
              S.key
            )) }),
            /* @__PURE__ */ B.jsx(Gx, { vertical: !1 }),
            l ? /* @__PURE__ */ B.jsx(
              Wx,
              {
                y1: l[0],
                y2: l[1],
                ifOverflow: "extendDomain",
                fill: "var(--aiwa-hint-color, var(--aiwa-ink-muted))",
                fillOpacity: 0.12,
                stroke: "none"
              }
            ) : null,
            /* @__PURE__ */ B.jsx(
              iw,
              {
                dataKey: r,
                tickLine: !1,
                axisLine: !1,
                tickMargin: 8,
                padding: { left: 22, right: 22 },
                interval: 0
              }
            ),
            /* @__PURE__ */ B.jsx(aw, { hide: !0, domain: P }),
            /* @__PURE__ */ B.jsx(
              _U,
              {
                cursor: !1,
                content: /* @__PURE__ */ B.jsx(EU, { indicator: "line" })
              }
            ),
            f ? /* @__PURE__ */ B.jsx(kU, { content: /* @__PURE__ */ B.jsx(CU, {}) }) : null,
            v.map((S, A) => /* @__PURE__ */ B.jsx(
              rw,
              {
                dataKey: S.key,
                type: "natural",
                fill: `url(#${u}-${S.key})`,
                fillOpacity: 1,
                stroke: `var(--color-${S.key})`,
                strokeOpacity: 0.55,
                stackId: S.stacked ? "values" : void 0,
                strokeDasharray: S.dashed ? "5 5" : void 0,
                dot: {
                  r: 4,
                  fill: `var(--color-${S.key})`,
                  stroke: "var(--aiwa-surface)",
                  strokeWidth: 3
                },
                activeDot: {
                  r: 5,
                  fill: `var(--color-${S.key})`,
                  stroke: "var(--aiwa-surface)",
                  strokeWidth: 3
                },
                isAnimationActive: !0,
                animationDuration: 240,
                animationBegin: A * 30,
                children: /* @__PURE__ */ B.jsx(
                  ki,
                  {
                    dataKey: S.key,
                    position: "top",
                    offset: 12 + A * 10,
                    fill: "var(--aiwa-ink)",
                    fontSize: 12,
                    fontWeight: 600
                  }
                )
              },
              S.key
            ))
          ]
        }
      )
    }
  ) }) });
}
export {
  O5 as AiwaWebUiChart
};
