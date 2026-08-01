import { jsx as de, jsxs as ar, Fragment as Lp } from "react/jsx-runtime";
import * as A from "react";
import Fl, { isValidElement as Mi, forwardRef as Mo, useContext as Yt, createContext as wr, useMemo as Ni, useState as tn, useCallback as Bl, useRef as Ke, useImperativeHandle as zp, useEffect as Ae, useLayoutEffect as Fp, cloneElement as Bp, createElement as Up } from "react";
import { a as je, c as et } from "./utils-TrrhThB-.js";
import { createPortal as No } from "react-dom";
import { w as Vp } from "./with-selector-CpkHbNSv.js";
var Wp = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"];
function Co(e) {
  if (typeof e != "string")
    return !1;
  var t = Wp;
  return t.includes(e);
}
var Kp = [
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
], qp = new Set(Kp);
function Ul(e) {
  return typeof e != "string" ? !1 : qp.has(e);
}
function Vl(e) {
  return typeof e == "string" && e.startsWith("data-");
}
function ka(e) {
  if (typeof e != "object" || e === null)
    return {};
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (Ul(r) || Vl(r)) && (t[r] = e[r]);
  return t;
}
function Hp(e) {
  if (e == null)
    return null;
  if (/* @__PURE__ */ Mi(e) && typeof e.props == "object" && e.props !== null) {
    var t = e.props;
    return ka(t);
  }
  return typeof e == "object" && !Array.isArray(e) ? ka(e) : null;
}
function gt(e) {
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (Ul(r) || Vl(r) || Co(r)) && (t[r] = e[r]);
  return t;
}
function nS(e) {
  return e == null ? null : /* @__PURE__ */ Mi(e) ? gt(e.props) : typeof e == "object" && !Array.isArray(e) ? gt(e) : null;
}
var Yp = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function ja() {
  return ja = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ja.apply(null, arguments);
}
function Gp(e, t) {
  if (e == null) return {};
  var r, n, i = Xp(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function Xp(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var Zp = /* @__PURE__ */ Mo((e, t) => {
  var {
    children: r,
    width: n,
    height: i,
    viewBox: a,
    className: o,
    style: u,
    title: s,
    desc: c
  } = e, l = Gp(e, Yp), f = a || {
    width: n,
    height: i,
    x: 0,
    y: 0
  }, d = je("recharts-surface", o);
  return /* @__PURE__ */ A.createElement("svg", ja({}, gt(l), {
    className: d,
    width: n,
    height: i,
    style: u,
    viewBox: "".concat(f.x, " ").concat(f.y, " ").concat(f.width, " ").concat(f.height),
    ref: t
  }), /* @__PURE__ */ A.createElement("title", null, s), /* @__PURE__ */ A.createElement("desc", null, c), r);
}), Qp = /* @__PURE__ */ wr(null), Jp = () => Yt(Qp);
function q(e) {
  return function() {
    return e;
  };
}
const Wl = Math.cos, Kn = Math.sin, Be = Math.sqrt, qn = Math.PI, Ci = 2 * qn, $a = Math.PI, Ra = 2 * $a, Nt = 1e-6, ev = Ra - Nt;
function Kl(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t)
    this._ += arguments[t] + e[t];
}
function tv(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return Kl;
  const r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let i = 1, a = n.length; i < a; ++i)
      this._ += Math.round(arguments[i] * r) / r + n[i];
  };
}
class rv {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? Kl : tv(t);
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
    let o = this._x1, u = this._y1, s = n - t, c = i - r, l = o - t, f = u - r, d = l * l + f * f;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = r}`;
    else if (d > Nt) if (!(Math.abs(f * s - c * l) > Nt) || !a)
      this._append`L${this._x1 = t},${this._y1 = r}`;
    else {
      let h = n - o, p = i - u, m = s * s + c * c, v = h * h + p * p, g = Math.sqrt(m), w = Math.sqrt(d), y = a * Math.tan(($a - Math.acos((m + d - v) / (2 * g * w))) / 2), x = y / w, O = y / g;
      Math.abs(x - 1) > Nt && this._append`L${t + x * l},${r + x * f}`, this._append`A${a},${a},0,0,${+(f * h > l * p)},${this._x1 = t + O * s},${this._y1 = r + O * c}`;
    }
  }
  arc(t, r, n, i, a, o) {
    if (t = +t, r = +r, n = +n, o = !!o, n < 0) throw new Error(`negative radius: ${n}`);
    let u = n * Math.cos(i), s = n * Math.sin(i), c = t + u, l = r + s, f = 1 ^ o, d = o ? i - a : a - i;
    this._x1 === null ? this._append`M${c},${l}` : (Math.abs(this._x1 - c) > Nt || Math.abs(this._y1 - l) > Nt) && this._append`L${c},${l}`, n && (d < 0 && (d = d % Ra + Ra), d > ev ? this._append`A${n},${n},0,1,${f},${t - u},${r - s}A${n},${n},0,1,${f},${this._x1 = c},${this._y1 = l}` : d > Nt && this._append`A${n},${n},0,${+(d >= $a)},${f},${this._x1 = t + n * Math.cos(a)},${this._y1 = r + n * Math.sin(a)}`);
  }
  rect(t, r, n, i) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}h${n = +n}v${+i}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function Do(e) {
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
  }, () => new rv(t);
}
function Io(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function ql(e) {
  this._context = e;
}
ql.prototype = {
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
function Di(e) {
  return new ql(e);
}
function Hl(e) {
  return e[0];
}
function Yl(e) {
  return e[1];
}
function Gl(e, t) {
  var r = q(!0), n = null, i = Di, a = null, o = Do(u);
  e = typeof e == "function" ? e : e === void 0 ? Hl : q(e), t = typeof t == "function" ? t : t === void 0 ? Yl : q(t);
  function u(s) {
    var c, l = (s = Io(s)).length, f, d = !1, h;
    for (n == null && (a = i(h = o())), c = 0; c <= l; ++c)
      !(c < l && r(f = s[c], c, s)) === d && ((d = !d) ? a.lineStart() : a.lineEnd()), d && a.point(+e(f, c, s), +t(f, c, s));
    if (h) return a = null, h + "" || null;
  }
  return u.x = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : q(+s), u) : e;
  }, u.y = function(s) {
    return arguments.length ? (t = typeof s == "function" ? s : q(+s), u) : t;
  }, u.defined = function(s) {
    return arguments.length ? (r = typeof s == "function" ? s : q(!!s), u) : r;
  }, u.curve = function(s) {
    return arguments.length ? (i = s, n != null && (a = i(n)), u) : i;
  }, u.context = function(s) {
    return arguments.length ? (s == null ? n = a = null : a = i(n = s), u) : n;
  }, u;
}
function Pn(e, t, r) {
  var n = null, i = q(!0), a = null, o = Di, u = null, s = Do(c);
  e = typeof e == "function" ? e : e === void 0 ? Hl : q(+e), t = typeof t == "function" ? t : q(t === void 0 ? 0 : +t), r = typeof r == "function" ? r : r === void 0 ? Yl : q(+r);
  function c(f) {
    var d, h, p, m = (f = Io(f)).length, v, g = !1, w, y = new Array(m), x = new Array(m);
    for (a == null && (u = o(w = s())), d = 0; d <= m; ++d) {
      if (!(d < m && i(v = f[d], d, f)) === g)
        if (g = !g)
          h = d, u.areaStart(), u.lineStart();
        else {
          for (u.lineEnd(), u.lineStart(), p = d - 1; p >= h; --p)
            u.point(y[p], x[p]);
          u.lineEnd(), u.areaEnd();
        }
      g && (y[d] = +e(v, d, f), x[d] = +t(v, d, f), u.point(n ? +n(v, d, f) : y[d], r ? +r(v, d, f) : x[d]));
    }
    if (w) return u = null, w + "" || null;
  }
  function l() {
    return Gl().defined(i).curve(o).context(a);
  }
  return c.x = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : q(+f), n = null, c) : e;
  }, c.x0 = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : q(+f), c) : e;
  }, c.x1 = function(f) {
    return arguments.length ? (n = f == null ? null : typeof f == "function" ? f : q(+f), c) : n;
  }, c.y = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : q(+f), r = null, c) : t;
  }, c.y0 = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : q(+f), c) : t;
  }, c.y1 = function(f) {
    return arguments.length ? (r = f == null ? null : typeof f == "function" ? f : q(+f), c) : r;
  }, c.lineX0 = c.lineY0 = function() {
    return l().x(e).y(t);
  }, c.lineY1 = function() {
    return l().x(e).y(r);
  }, c.lineX1 = function() {
    return l().x(n).y(t);
  }, c.defined = function(f) {
    return arguments.length ? (i = typeof f == "function" ? f : q(!!f), c) : i;
  }, c.curve = function(f) {
    return arguments.length ? (o = f, a != null && (u = o(a)), c) : o;
  }, c.context = function(f) {
    return arguments.length ? (f == null ? a = u = null : u = o(a = f), c) : a;
  }, c;
}
class Xl {
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
function nv(e) {
  return new Xl(e, !0);
}
function iv(e) {
  return new Xl(e, !1);
}
const To = {
  draw(e, t) {
    const r = Be(t / qn);
    e.moveTo(r, 0), e.arc(0, 0, r, 0, Ci);
  }
}, av = {
  draw(e, t) {
    const r = Be(t / 5) / 2;
    e.moveTo(-3 * r, -r), e.lineTo(-r, -r), e.lineTo(-r, -3 * r), e.lineTo(r, -3 * r), e.lineTo(r, -r), e.lineTo(3 * r, -r), e.lineTo(3 * r, r), e.lineTo(r, r), e.lineTo(r, 3 * r), e.lineTo(-r, 3 * r), e.lineTo(-r, r), e.lineTo(-3 * r, r), e.closePath();
  }
}, Zl = Be(1 / 3), ov = Zl * 2, uv = {
  draw(e, t) {
    const r = Be(t / ov), n = r * Zl;
    e.moveTo(0, -r), e.lineTo(n, 0), e.lineTo(0, r), e.lineTo(-n, 0), e.closePath();
  }
}, sv = {
  draw(e, t) {
    const r = Be(t), n = -r / 2;
    e.rect(n, n, r, r);
  }
}, cv = 0.8908130915292852, Ql = Kn(qn / 10) / Kn(7 * qn / 10), lv = Kn(Ci / 10) * Ql, fv = -Wl(Ci / 10) * Ql, dv = {
  draw(e, t) {
    const r = Be(t * cv), n = lv * r, i = fv * r;
    e.moveTo(0, -r), e.lineTo(n, i);
    for (let a = 1; a < 5; ++a) {
      const o = Ci * a / 5, u = Wl(o), s = Kn(o);
      e.lineTo(s * r, -u * r), e.lineTo(u * n - s * i, s * n + u * i);
    }
    e.closePath();
  }
}, ha = Be(3), hv = {
  draw(e, t) {
    const r = -Be(t / (ha * 3));
    e.moveTo(0, r * 2), e.lineTo(-ha * r, -r), e.lineTo(ha * r, -r), e.closePath();
  }
}, De = -0.5, Ie = Be(3) / 2, La = 1 / Be(12), pv = (La / 2 + 1) * 3, vv = {
  draw(e, t) {
    const r = Be(t / pv), n = r / 2, i = r * La, a = n, o = r * La + r, u = -a, s = o;
    e.moveTo(n, i), e.lineTo(a, o), e.lineTo(u, s), e.lineTo(De * n - Ie * i, Ie * n + De * i), e.lineTo(De * a - Ie * o, Ie * a + De * o), e.lineTo(De * u - Ie * s, Ie * u + De * s), e.lineTo(De * n + Ie * i, De * i - Ie * n), e.lineTo(De * a + Ie * o, De * o - Ie * a), e.lineTo(De * u + Ie * s, De * s - Ie * u), e.closePath();
  }
};
function mv(e, t) {
  let r = null, n = Do(i);
  e = typeof e == "function" ? e : q(e || To), t = typeof t == "function" ? t : q(t === void 0 ? 64 : +t);
  function i() {
    let a;
    if (r || (r = a = n()), e.apply(this, arguments).draw(r, +t.apply(this, arguments)), a) return r = null, a + "" || null;
  }
  return i.type = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : q(a), i) : e;
  }, i.size = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : q(+a), i) : t;
  }, i.context = function(a) {
    return arguments.length ? (r = a ?? null, i) : r;
  }, i;
}
function Hn() {
}
function Yn(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6
  );
}
function Jl(e) {
  this._context = e;
}
Jl.prototype = {
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
        Yn(this, this._x1, this._y1);
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
        Yn(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function gv(e) {
  return new Jl(e);
}
function ef(e) {
  this._context = e;
}
ef.prototype = {
  areaStart: Hn,
  areaEnd: Hn,
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
        Yn(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function yv(e) {
  return new ef(e);
}
function tf(e) {
  this._context = e;
}
tf.prototype = {
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
        Yn(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function bv(e) {
  return new tf(e);
}
function rf(e) {
  this._context = e;
}
rf.prototype = {
  areaStart: Hn,
  areaEnd: Hn,
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
function wv(e) {
  return new rf(e);
}
function Hu(e) {
  return e < 0 ? -1 : 1;
}
function Yu(e, t, r) {
  var n = e._x1 - e._x0, i = t - e._x1, a = (e._y1 - e._y0) / (n || i < 0 && -0), o = (r - e._y1) / (i || n < 0 && -0), u = (a * i + o * n) / (n + i);
  return (Hu(a) + Hu(o)) * Math.min(Math.abs(a), Math.abs(o), 0.5 * Math.abs(u)) || 0;
}
function Gu(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t;
}
function pa(e, t, r) {
  var n = e._x0, i = e._y0, a = e._x1, o = e._y1, u = (a - n) / 3;
  e._context.bezierCurveTo(n + u, i + u * t, a - u, o - u * r, a, o);
}
function Gn(e) {
  this._context = e;
}
Gn.prototype = {
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
        pa(this, this._t0, Gu(this, this._t0));
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
          this._point = 3, pa(this, Gu(this, r = Yu(this, e, t)), r);
          break;
        default:
          pa(this, this._t0, r = Yu(this, e, t));
          break;
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r;
    }
  }
};
function nf(e) {
  this._context = new af(e);
}
(nf.prototype = Object.create(Gn.prototype)).point = function(e, t) {
  Gn.prototype.point.call(this, t, e);
};
function af(e) {
  this._context = e;
}
af.prototype = {
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
function _v(e) {
  return new Gn(e);
}
function xv(e) {
  return new nf(e);
}
function of(e) {
  this._context = e;
}
of.prototype = {
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
        for (var n = Xu(e), i = Xu(t), a = 0, o = 1; o < r; ++a, ++o)
          this._context.bezierCurveTo(n[0][a], i[0][a], n[1][a], i[1][a], e[o], t[o]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
function Xu(e) {
  var t, r = e.length - 1, n, i = new Array(r), a = new Array(r), o = new Array(r);
  for (i[0] = 0, a[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t) i[t] = 1, a[t] = 4, o[t] = 4 * e[t] + 2 * e[t + 1];
  for (i[r - 1] = 2, a[r - 1] = 7, o[r - 1] = 8 * e[r - 1] + e[r], t = 1; t < r; ++t) n = i[t] / a[t - 1], a[t] -= n, o[t] -= n * o[t - 1];
  for (i[r - 1] = o[r - 1] / a[r - 1], t = r - 2; t >= 0; --t) i[t] = (o[t] - i[t + 1]) / a[t];
  for (a[r - 1] = (e[r] + i[r - 1]) / 2, t = 0; t < r - 1; ++t) a[t] = 2 * e[t + 1] - i[t + 1];
  return [i, a];
}
function Ov(e) {
  return new of(e);
}
function Ii(e, t) {
  this._context = e, this._t = t;
}
Ii.prototype = {
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
function Pv(e) {
  return new Ii(e, 0.5);
}
function Ev(e) {
  return new Ii(e, 0);
}
function Sv(e) {
  return new Ii(e, 1);
}
function Ut(e, t) {
  if ((o = e.length) > 1)
    for (var r = 1, n, i, a = e[t[0]], o, u = a.length; r < o; ++r)
      for (i = a, a = e[t[r]], n = 0; n < u; ++n)
        a[n][1] += a[n][0] = isNaN(i[n][1]) ? i[n][0] : i[n][1];
}
function za(e) {
  for (var t = e.length, r = new Array(t); --t >= 0; ) r[t] = t;
  return r;
}
function Av(e, t) {
  return e[t];
}
function Mv(e) {
  const t = [];
  return t.key = e, t;
}
function Nv() {
  var e = q([]), t = za, r = Ut, n = Av;
  function i(a) {
    var o = Array.from(e.apply(this, arguments), Mv), u, s = o.length, c = -1, l;
    for (const f of a)
      for (u = 0, ++c; u < s; ++u)
        (o[u][c] = [0, +n(f, o[u].key, c, a)]).data = f;
    for (u = 0, l = Io(t(o)); u < s; ++u)
      o[l[u]].index = u;
    return r(o, l), o;
  }
  return i.keys = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : q(Array.from(a)), i) : e;
  }, i.value = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : q(+a), i) : n;
  }, i.order = function(a) {
    return arguments.length ? (t = a == null ? za : typeof a == "function" ? a : q(Array.from(a)), i) : t;
  }, i.offset = function(a) {
    return arguments.length ? (r = a ?? Ut, i) : r;
  }, i;
}
function Cv(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, i = 0, a = e[0].length, o; i < a; ++i) {
      for (o = r = 0; r < n; ++r) o += e[r][i][1] || 0;
      if (o) for (r = 0; r < n; ++r) e[r][i][1] /= o;
    }
    Ut(e, t);
  }
}
function Dv(e, t) {
  if ((i = e.length) > 0) {
    for (var r = 0, n = e[t[0]], i, a = n.length; r < a; ++r) {
      for (var o = 0, u = 0; o < i; ++o) u += e[o][r][1] || 0;
      n[r][1] += n[r][0] = -u / 2;
    }
    Ut(e, t);
  }
}
function Iv(e, t) {
  if (!(!((o = e.length) > 0) || !((a = (i = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, i, a, o; n < a; ++n) {
      for (var u = 0, s = 0, c = 0; u < o; ++u) {
        for (var l = e[t[u]], f = l[n][1] || 0, d = l[n - 1][1] || 0, h = (f - d) / 2, p = 0; p < u; ++p) {
          var m = e[t[p]], v = m[n][1] || 0, g = m[n - 1][1] || 0;
          h += v - g;
        }
        s += f, c += h * f;
      }
      i[n - 1][1] += i[n - 1][0] = r, s && (r -= c / s);
    }
    i[n - 1][1] += i[n - 1][0] = r, Ut(e, t);
  }
}
function Fa(e) {
  return e === "__proto__";
}
function uf(e) {
  switch (typeof e) {
    case "number":
    case "symbol":
      return !1;
    case "string":
      return e.includes(".") || e.includes("[") || e.includes("]");
  }
}
function ko(e) {
  return typeof e == "string" || typeof e == "symbol" ? e : Object.is(e?.valueOf?.(), -0) ? "-0" : String(e);
}
function sf(e) {
  if (e == null) return "";
  if (typeof e == "string") return e;
  if (Array.isArray(e)) return e.map(sf).join(",");
  const t = String(e);
  return t === "0" && Object.is(Number(e), -0) ? "-0" : t;
}
function jo(e) {
  if (Array.isArray(e)) return e.map(ko);
  if (typeof e == "symbol") return [e];
  e = sf(e);
  const t = [], r = e.length;
  if (r === 0) return t;
  let n = 0, i = "", a = "", o = !1;
  for (e.charCodeAt(0) === 46 && t.push(""); n < r; ) {
    const u = e[n];
    if (a) u === "\\" && n + 1 < r ? (n++, i += e[n]) : u === a ? a = "" : i += u;
    else if (o) u === '"' || u === "'" ? a = u : u === "]" ? (o = !1, t.push(i), i = "") : i += u;
    else if (u === "[")
      o = !0, i && (t.push(i), i = "");
    else if (u === ".") {
      i && (t.push(i), i = "");
      const s = e[n + 1];
      (s === void 0 || s === ".") && t.push("");
    } else i += u;
    n++;
  }
  return i && t.push(i), t;
}
function rn(e, t, r) {
  if (e == null) return r;
  switch (typeof t) {
    case "string": {
      if (Fa(t)) return r;
      const n = e[t];
      return n === void 0 ? uf(t) && !Object.hasOwn(e, t) ? rn(e, jo(t), r) : r : n;
    }
    case "number":
    case "symbol": {
      typeof t == "number" && (t = ko(t));
      const n = e[t];
      return n === void 0 ? r : n;
    }
    default: {
      if (Array.isArray(t)) return Tv(e, t, r);
      if (Object.is(t?.valueOf(), -0) ? t = "-0" : t = String(t), Fa(t)) return r;
      const n = e[t];
      return n === void 0 ? r : n;
    }
  }
}
function Tv(e, t, r) {
  if (t.length === 0) return r;
  let n = e;
  for (let i = 0; i < t.length; i++) {
    if (n == null || Fa(t[i])) return r;
    n = n[t[i]];
  }
  return n === void 0 ? r : n;
}
var kv = 4;
function vt(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : kv, r = 10 ** t, n = Math.round(e * r) / r;
  return Object.is(n, -0) ? 0 : n;
}
function ue(e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  return e.reduce((i, a, o) => {
    var u = r[o - 1];
    return typeof u == "string" ? i + u + a : u !== void 0 ? i + vt(u) + a : i + a;
  }, "");
}
var qe = (e) => e === 0 ? 0 : e > 0 ? 1 : -1, Gt = (e) => typeof e == "number" && e != +e, Fr = (e) => typeof e == "string" && e.indexOf("%") === e.length - 1, k = (e) => (typeof e == "number" || e instanceof Number) && !Gt(e), Vt = (e) => k(e) || typeof e == "string", jv = 0, Zu = (e) => {
  var t = ++jv;
  return "".concat(e || "").concat(t);
}, lr = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (!k(t) && typeof t != "string")
    return n;
  var a;
  if (Fr(t)) {
    if (r == null)
      return n;
    var o = t.indexOf("%");
    a = r * parseFloat(t.slice(0, o)) / 100;
  } else
    a = +t;
  return Gt(a) && (a = n), i && r != null && a > r && (a = r), a;
}, cf = (e) => {
  if (!Array.isArray(e))
    return !1;
  for (var t = e.length, r = {}, n = 0; n < t; n++)
    if (!r[String(e[n])])
      r[String(e[n])] = !0;
    else
      return !0;
  return !1;
};
function En(e, t, r) {
  return k(e) && k(t) ? vt(e + r * (t - e)) : t;
}
function lf(e, t, r) {
  if (!(!e || !e.length))
    return e.find((n) => n && (typeof t == "function" ? t(n) : rn(n, t)) === r);
}
var fr = (e) => e === null || typeof e > "u", nn = (e) => fr(e) ? e : "".concat(e.charAt(0).toUpperCase()).concat(e.slice(1));
function ye(e) {
  return e != null;
}
function an() {
}
var $v = ["type", "size", "sizeType"];
function Ba() {
  return Ba = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ba.apply(null, arguments);
}
function Qu(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ju(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Qu(Object(r), !0).forEach(function(n) {
      Rv(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Qu(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Rv(e, t, r) {
  return (t = Lv(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Lv(e) {
  var t = zv(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function zv(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Fv(e, t) {
  if (e == null) return {};
  var r, n, i = Bv(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function Bv(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var ff = {
  symbolCircle: To,
  symbolCross: av,
  symbolDiamond: uv,
  symbolSquare: sv,
  symbolStar: dv,
  symbolTriangle: hv,
  symbolWye: vv
}, Uv = Math.PI / 180, Vv = (e) => {
  var t = "symbol".concat(nn(e));
  return ff[t] || To;
}, Wv = (e, t, r) => {
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
      var n = 18 * Uv;
      return 1.25 * e * e * (Math.tan(n) - Math.tan(n * 2) * Math.tan(n) ** 2);
    }
    case "triangle":
      return Math.sqrt(3) * e * e / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * e * e / 8;
    default:
      return Math.PI * e * e / 4;
  }
}, Kv = (e, t) => {
  ff["symbol".concat(nn(e))] = t;
}, df = (e) => {
  var {
    type: t = "circle",
    size: r = 64,
    sizeType: n = "area"
  } = e, i = Fv(e, $v), a = Ju(Ju({}, i), {}, {
    type: t,
    size: r,
    sizeType: n
  }), o = "circle";
  typeof t == "string" && (o = t);
  var u = () => {
    var d = Vv(o), h = mv().type(d).size(Wv(r, n, o)), p = h();
    if (p !== null)
      return p;
  }, {
    className: s,
    cx: c,
    cy: l
  } = a, f = gt(a);
  return k(c) && k(l) && k(r) ? /* @__PURE__ */ A.createElement("path", Ba({}, f, {
    className: je("recharts-symbols", s),
    transform: "translate(".concat(c, ", ").concat(l, ")"),
    d: u()
  })) : null;
};
df.registerSymbol = Kv;
var hf = (e) => "radius" in e && "startAngle" in e && "endAngle" in e, qv = (e, t) => {
  if (!e || typeof e == "function" || typeof e == "boolean")
    return null;
  var r = e;
  if (/* @__PURE__ */ Mi(e) && (r = e.props), typeof r != "object" && typeof r != "function")
    return null;
  var n = {};
  return Object.keys(r).forEach((i) => {
    Co(i) && typeof r[i] == "function" && (n[i] = ((a) => r[i](r, a)));
  }), n;
}, Hv = (e, t, r) => (n) => (e(t, r, n), null), Yv = (e, t, r) => {
  if (e === null || typeof e != "object" && typeof e != "function")
    return null;
  var n = null;
  return Object.keys(e).forEach((i) => {
    var a = e[i];
    Co(i) && typeof a == "function" && (n || (n = {}), n[i] = Hv(a, t, r));
  }), n;
};
function es(e, t) {
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
    t % 2 ? es(Object(r), !0).forEach(function(n) {
      Xv(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : es(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Xv(e, t, r) {
  return (t = Zv(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Zv(e) {
  var t = Qv(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Qv(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function _r(e, t) {
  var r = Gv({}, e), n = t, i = Object.keys(t), a = i.reduce((o, u) => (o[u] === void 0 && n[u] !== void 0 && (o[u] = n[u]), o), r);
  return a;
}
function Xn() {
  return Xn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Xn.apply(null, arguments);
}
function ts(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function pf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ts(Object(r), !0).forEach(function(n) {
      Jv(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ts(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Jv(e, t, r) {
  return (t = em(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function em(e) {
  var t = tm(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function tm(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Te = 32, rm = {
  align: "center",
  iconSize: 14,
  inactiveColor: "#ccc",
  layout: "horizontal",
  verticalAlign: "middle",
  labelStyle: {}
};
function nm(e) {
  if (typeof e == "object" && e !== null && "strokeDasharray" in e)
    return String(e.strokeDasharray);
}
function im(e) {
  var {
    data: t,
    iconType: r,
    inactiveColor: n
  } = e, i = Te / 2, a = Te / 6, o = Te / 3, u = t.inactive ? n : t.color, s = r ?? t.type;
  if (s === "none")
    return null;
  if (s === "plainline")
    return /* @__PURE__ */ A.createElement("line", {
      strokeWidth: 4,
      fill: "none",
      stroke: u,
      strokeDasharray: nm(t.payload),
      x1: 0,
      y1: i,
      x2: Te,
      y2: i,
      className: "recharts-legend-icon"
    });
  if (s === "line")
    return /* @__PURE__ */ A.createElement("path", {
      strokeWidth: 4,
      fill: "none",
      stroke: u,
      d: "M0,".concat(i, "h").concat(o, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(2 * o, ",").concat(i, `
            H`).concat(Te, "M").concat(2 * o, ",").concat(i, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(o, ",").concat(i),
      className: "recharts-legend-icon"
    });
  if (s === "rect")
    return /* @__PURE__ */ A.createElement("path", {
      stroke: "none",
      fill: u,
      d: "M0,".concat(Te / 8, "h").concat(Te, "v").concat(Te * 3 / 4, "h").concat(-Te, "z"),
      className: "recharts-legend-icon"
    });
  if (/* @__PURE__ */ A.isValidElement(t.legendIcon)) {
    var c = pf({}, t);
    return delete c.legendIcon, /* @__PURE__ */ A.cloneElement(t.legendIcon, c);
  }
  return /* @__PURE__ */ A.createElement(df, {
    fill: u,
    cx: i,
    cy: i,
    size: Te,
    sizeType: "diameter",
    type: s
  });
}
function am(e) {
  var {
    payload: t,
    iconSize: r,
    layout: n,
    formatter: i,
    inactiveColor: a,
    iconType: o,
    labelStyle: u
  } = e, s = {
    x: 0,
    y: 0,
    width: Te,
    height: Te
  }, c = {
    display: n === "horizontal" ? "inline-block" : "block",
    marginRight: 10
  }, l = {
    display: "inline-block",
    verticalAlign: "middle",
    marginRight: 4
  };
  return t.map((f, d) => {
    var h = f.formatter || i, p = je({
      "recharts-legend-item": !0,
      ["legend-item-".concat(d)]: !0,
      inactive: f.inactive
    });
    if (f.type === "none")
      return null;
    var m = typeof u == "object" ? pf({}, u) : {};
    m.color = f.inactive ? a : m.color || f.color;
    var v = h ? h(f.value, f, d) : f.value;
    return /* @__PURE__ */ A.createElement("li", Xn({
      className: p,
      style: c,
      key: "legend-item-".concat(d)
    }, Yv(e, f, d)), /* @__PURE__ */ A.createElement(Zp, {
      width: r,
      height: r,
      viewBox: s,
      style: l,
      "aria-label": "".concat(v, " legend icon")
    }, /* @__PURE__ */ A.createElement(im, {
      data: f,
      iconType: o,
      inactiveColor: a
    })), /* @__PURE__ */ A.createElement("span", {
      className: "recharts-legend-item-text",
      style: m
    }, v));
  });
}
var om = (e) => {
  var t = _r(e, rm), {
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
  return /* @__PURE__ */ A.createElement("ul", {
    className: "recharts-default-legend",
    style: a
  }, /* @__PURE__ */ A.createElement(am, Xn({}, t, {
    payload: r
  })));
};
function um(e, t) {
  const r = /* @__PURE__ */ new Map();
  for (let n = 0; n < e.length; n++) {
    const i = e[n], a = t(i, n, e);
    r.has(a) || r.set(a, i);
  }
  return Array.from(r.values());
}
function sm(e, t) {
  return function(...r) {
    return e.apply(this, r.slice(0, t));
  };
}
function vf(e) {
  return e;
}
function cm(e) {
  return function(t) {
    return rn(t, e);
  };
}
function Ua(e) {
  return e == null || typeof e != "object" && typeof e != "function";
}
function lm(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function fm(e) {
  return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
function $o(e) {
  return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
const dm = "[object RegExp]", mf = "[object String]", gf = "[object Number]", yf = "[object Boolean]", bf = "[object Arguments]", hm = "[object Symbol]", pm = "[object Date]", vm = "[object Map]", mm = "[object Set]", gm = "[object Array]", ym = "[object ArrayBuffer]", bm = "[object Object]", wm = "[object DataView]", _m = "[object Uint8Array]", xm = "[object Uint8ClampedArray]", Om = "[object Uint16Array]", Pm = "[object Uint32Array]", Em = "[object Int8Array]", Sm = "[object Int16Array]", Am = "[object Int32Array]", Mm = "[object Float32Array]", Nm = "[object Float64Array]", rs = typeof globalThis == "object" && globalThis || typeof window == "object" && window || typeof self == "object" && self || typeof global == "object" && global || /* @__PURE__ */ (function() {
  return this;
})();
function Cm(e) {
  return typeof rs.Buffer < "u" && rs.Buffer.isBuffer(e);
}
function Dm(e, t) {
  return Tt(e, void 0, e, /* @__PURE__ */ new Map(), t);
}
function Tt(e, t, r, n = /* @__PURE__ */ new Map(), i = void 0) {
  const a = i?.(e, t, r, n);
  if (a !== void 0) return a;
  if (Ua(e)) return e;
  if (n.has(e)) return n.get(e);
  if (Array.isArray(e)) {
    const o = new Array(e.length);
    n.set(e, o);
    for (let u = 0; u < e.length; u++) o[u] = Tt(e[u], u, r, n, i);
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
    for (const [u, s] of e) o.set(u, Tt(s, u, r, n, i));
    return o;
  }
  if (e instanceof Set) {
    const o = /* @__PURE__ */ new Set();
    n.set(e, o);
    for (const u of e) o.add(Tt(u, void 0, r, n, i));
    return o;
  }
  if (Cm(e)) return e.subarray();
  if (lm(e)) {
    const o = new (Object.getPrototypeOf(e)).constructor(e.length);
    n.set(e, o);
    for (let u = 0; u < e.length; u++) o[u] = Tt(e[u], u, r, n, i);
    return o;
  }
  if (e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer) return e.slice(0);
  if (e instanceof DataView) {
    const o = new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength);
    return n.set(e, o), ze(o, e, r, n, i), o;
  }
  if (typeof File < "u" && e instanceof File) {
    const o = new File([e], e.name, { type: e.type });
    return n.set(e, o), ze(o, e, r, n, i), o;
  }
  if (typeof Blob < "u" && e instanceof Blob) {
    const o = new Blob([e], { type: e.type });
    return n.set(e, o), ze(o, e, r, n, i), o;
  }
  if (e instanceof Error) {
    const o = structuredClone(e);
    return n.set(e, o), o.message = e.message, o.name = e.name, o.stack = e.stack, o.cause = e.cause, o.constructor = e.constructor, ze(o, e, r, n, i), o;
  }
  if (e instanceof Boolean) {
    const o = new Boolean(e.valueOf());
    return n.set(e, o), ze(o, e, r, n, i), o;
  }
  if (e instanceof Number) {
    const o = new Number(e.valueOf());
    return n.set(e, o), ze(o, e, r, n, i), o;
  }
  if (e instanceof String) {
    const o = new String(e.valueOf());
    return n.set(e, o), ze(o, e, r, n, i), o;
  }
  if (typeof e == "object" && Im(e)) {
    const o = Object.create(Object.getPrototypeOf(e));
    return n.set(e, o), ze(o, e, r, n, i), o;
  }
  return e;
}
function ze(e, t, r = e, n, i) {
  const a = [...Object.keys(t), ...fm(t)];
  for (let o = 0; o < a.length; o++) {
    const u = a[o], s = Object.getOwnPropertyDescriptor(e, u);
    (s == null || s.writable) && (e[u] = Tt(t[u], u, r, n, i));
  }
}
function Im(e) {
  switch ($o(e)) {
    case bf:
    case gm:
    case ym:
    case wm:
    case yf:
    case pm:
    case Mm:
    case Nm:
    case Em:
    case Sm:
    case Am:
    case vm:
    case gf:
    case bm:
    case dm:
    case mm:
    case mf:
    case hm:
    case _m:
    case xm:
    case Om:
    case Pm:
      return !0;
    default:
      return !1;
  }
}
function Tm(e) {
  return Tt(e, void 0, e, /* @__PURE__ */ new Map(), void 0);
}
function Bn(e, t) {
  return e === t || Number.isNaN(e) && Number.isNaN(t);
}
function wf(e) {
  return e !== null && (typeof e == "object" || typeof e == "function");
}
function _f(e, t, r) {
  return typeof r != "function" ? _f(e, t, () => {
  }) : Va(e, t, function n(i, a, o, u, s, c) {
    const l = r(i, a, o, u, s, c);
    return l !== void 0 ? !!l : Va(i, a, n, c, !1);
  }, /* @__PURE__ */ new Map(), !0);
}
function Va(e, t, r, n, i = !1) {
  if (t === e) return !0;
  switch (typeof t) {
    case "object":
      return km(e, t, r, n);
    case "function":
      return Object.keys(t).length > 0 ? Va(e, { ...t }, r, n, i) : Bn(e, t);
    default:
      return wf(e) && i ? typeof t == "string" ? t === "" : !0 : Bn(e, t);
  }
}
function km(e, t, r, n) {
  if (t == null) return !0;
  if (Array.isArray(t)) return xf(e, t, r, n);
  if (t instanceof Map) return jm(e, t, r, n);
  if (t instanceof Set) return $m(e, t, r, n);
  const i = Object.keys(t);
  if (e == null || Ua(e)) return i.length === 0;
  if (i.length === 0) return !0;
  if (n?.has(t)) return n.get(t) === e;
  n?.set(t, e);
  try {
    for (let a = 0; a < i.length; a++) {
      const o = i[a];
      if (!Ua(e) && !(o in e) || t[o] === void 0 && e[o] !== void 0 || t[o] === null && e[o] !== null || !r(e[o], t[o], o, e, t, n)) return !1;
    }
    return !0;
  } finally {
    n?.delete(t);
  }
}
function jm(e, t, r, n) {
  if (t.size === 0) return !0;
  if (!(e instanceof Map)) return !1;
  for (const [i, a] of t.entries()) if (r(e.get(i), a, i, e, t, n) === !1) return !1;
  return !0;
}
function xf(e, t, r, n) {
  if (t.length === 0) return !0;
  if (!Array.isArray(e)) return !1;
  const i = /* @__PURE__ */ new Set();
  for (let a = 0; a < t.length; a++) {
    const o = t[a];
    let u = !1;
    for (let s = 0; s < e.length; s++) {
      if (i.has(s)) continue;
      const c = e[s];
      let l = !1;
      if (r(c, o, a, e, t, n) && (l = !0), l) {
        i.add(s), u = !0;
        break;
      }
    }
    if (!u) return !1;
  }
  return !0;
}
function $m(e, t, r, n) {
  return t.size === 0 ? !0 : e instanceof Set ? xf([...e], [...t], r, n) : !1;
}
function Of(e, t) {
  return _f(e, t, () => {
  });
}
function Rm(e) {
  return e = Tm(e), (t) => Of(t, e);
}
function Lm(e, t) {
  return Dm(e, (r, n, i, a) => {
    if (typeof e == "object") {
      if ($o(e) === "[object Object]" && typeof e.constructor != "function") {
        const o = {};
        return a.set(e, o), ze(o, e, i, a), o;
      }
      switch (Object.prototype.toString.call(e)) {
        case gf:
        case mf:
        case yf: {
          const o = new e.constructor(e?.valueOf());
          return ze(o, e), o;
        }
        case bf: {
          const o = {};
          return ze(o, e), o.length = e.length, o[Symbol.iterator] = e[Symbol.iterator], o;
        }
        default:
          return;
      }
    }
  });
}
function zm(e) {
  return Lm(e);
}
const Fm = /^(?:0|[1-9]\d*)$/;
function Pf(e, t = Number.MAX_SAFE_INTEGER) {
  switch (typeof e) {
    case "number":
      return Number.isInteger(e) && e >= 0 && e < t;
    case "symbol":
      return !1;
    case "string":
      return Fm.test(e);
  }
}
function Bm(e) {
  return e !== null && typeof e == "object" && $o(e) === "[object Arguments]";
}
function Um(e, t) {
  let r;
  if (Array.isArray(t) ? r = t : typeof t == "string" && uf(t) && e?.[t] == null ? r = jo(t) : r = [t], r.length === 0) return !1;
  let n = e;
  for (let i = 0; i < r.length; i++) {
    const a = r[i];
    if ((n == null || !Object.hasOwn(n, a)) && !((Array.isArray(n) || Bm(n)) && Pf(a) && a < n.length))
      return !1;
    n = n[a];
  }
  return !0;
}
function Vm(e, t) {
  switch (typeof e) {
    case "object":
      Object.is(e?.valueOf(), -0) && (e = "-0");
      break;
    case "number":
      e = ko(e);
      break;
  }
  return t = zm(t), function(r) {
    const n = rn(r, e);
    return n === void 0 ? Um(r, e) : t === void 0 ? n === void 0 : Of(n, t);
  };
}
function Wm(e) {
  if (e == null) return vf;
  switch (typeof e) {
    case "function":
      return e;
    case "object":
      return Array.isArray(e) && e.length === 2 ? Vm(e[0], e[1]) : Rm(e);
    case "string":
    case "symbol":
    case "number":
      return cm(e);
  }
}
function Km(e) {
  return Number.isSafeInteger(e) && e >= 0;
}
function Ef(e) {
  return e != null && typeof e != "function" && Km(e.length);
}
function qm(e) {
  return typeof e == "object" && e !== null;
}
function Hm(e) {
  return qm(e) && Ef(e);
}
function ns(e, t = vf) {
  return Hm(e) ? um(Array.from(e), sm(Wm(t), 1)) : [];
}
function Sf(e, t, r) {
  return t === !0 ? ns(e, r) : typeof t == "function" ? ns(e, t) : e;
}
function Ym(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Af = /* @__PURE__ */ wr(null), Gm = (e) => e, yt = () => {
  var e = Yt(Af);
  return e ? e.store.dispatch : Gm;
}, Un = () => {
}, Xm = () => Un, Zm = (e, t) => e === t;
function R(e) {
  var t = Yt(Af), r = Ni(() => t ? (n) => {
    if (n != null)
      return e(n);
  } : Un, [t, e]);
  return Vp.useSyncExternalStoreWithSelector(t ? t.subscription.addNestedSub : Xm, t ? t.store.getState : Un, t ? t.store.getState : Un, r, Zm);
}
var Qm = (e, t, r) => {
  if (t.length === 1 && t[0] === r) {
    let n = !1;
    try {
      const i = {};
      e(i) === i && (n = !0);
    } catch {
    }
    if (n) {
      let i;
      try {
        throw new Error();
      } catch (a) {
        ({ stack: i } = a);
      }
      console.warn(
        `The result function returned its own inputs without modification. e.g
\`createSelector([state => state.todos], todos => todos)\`
This could lead to inefficient memoization and unnecessary re-renders.
Ensure transformation logic is in the result function, and extraction logic is in the input selectors.`,
        { stack: i }
      );
    }
  }
}, Jm = (e, t, r) => {
  const { memoize: n, memoizeOptions: i } = t, { inputSelectorResults: a, inputSelectorResultsCopy: o } = e, u = n(() => ({}), ...i);
  if (!(u.apply(null, a) === u.apply(null, o))) {
    let c;
    try {
      throw new Error();
    } catch (l) {
      ({ stack: c } = l);
    }
    console.warn(
      `An input selector returned a different result when passed same arguments.
This means your output selector will likely run more frequently than intended.
Avoid returning a new reference inside your input selector, e.g.
\`createSelector([state => state.todos.map(todo => todo.id)], todoIds => todoIds.length)\``,
      {
        arguments: r,
        firstInputs: a,
        secondInputs: o,
        stack: c
      }
    );
  }
}, eg = {
  inputStabilityCheck: "once",
  identityFunctionCheck: "once"
};
function tg(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function rg(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object")
    throw new TypeError(t);
}
function ng(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((r) => typeof r == "function")) {
    const r = e.map(
      (n) => typeof n == "function" ? `function ${n.name || "unnamed"}()` : typeof n
    ).join(", ");
    throw new TypeError(`${t}[${r}]`);
  }
}
var is = (e) => Array.isArray(e) ? e : [e];
function ig(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return ng(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function as(e, t) {
  const r = [], { length: n } = e;
  for (let i = 0; i < n; i++)
    r.push(e[i].apply(null, t));
  return r;
}
var ag = (e, t) => {
  const { identityFunctionCheck: r, inputStabilityCheck: n } = {
    ...eg,
    ...t
  };
  return {
    identityFunctionCheck: {
      shouldRun: r === "always" || r === "once" && e,
      run: Qm
    },
    inputStabilityCheck: {
      shouldRun: n === "always" || n === "once" && e,
      run: Jm
    }
  };
}, og = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, ug = typeof WeakRef < "u" ? WeakRef : og, sg = 0, os = 1;
function Sn() {
  return {
    s: sg,
    v: void 0,
    o: null,
    p: null
  };
}
function Mf(e, t = {}) {
  let r = Sn();
  const { resultEqualityCheck: n } = t;
  let i, a = 0;
  function o() {
    let u = r;
    const { length: s } = arguments;
    for (let f = 0, d = s; f < d; f++) {
      const h = arguments[f];
      if (typeof h == "function" || typeof h == "object" && h !== null) {
        let p = u.o;
        p === null && (u.o = p = /* @__PURE__ */ new WeakMap());
        const m = p.get(h);
        m === void 0 ? (u = Sn(), p.set(h, u)) : u = m;
      } else {
        let p = u.p;
        p === null && (u.p = p = /* @__PURE__ */ new Map());
        const m = p.get(h);
        m === void 0 ? (u = Sn(), p.set(h, u)) : u = m;
      }
    }
    const c = u;
    let l;
    if (u.s === os)
      l = u.v;
    else if (l = e.apply(null, arguments), a++, n) {
      const f = i?.deref?.() ?? i;
      f != null && n(f, l) && (l = f, a !== 0 && a--), i = typeof l == "object" && l !== null || typeof l == "function" ? new ug(l) : l;
    }
    return c.s = os, c.v = l, l;
  }
  return o.clearCache = () => {
    r = Sn(), o.resetResultsCount();
  }, o.resultsCount = () => a, o.resetResultsCount = () => {
    a = 0;
  }, o;
}
function cg(e, ...t) {
  const r = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, n = (...i) => {
    let a = 0, o = 0, u, s = {}, c = i.pop();
    typeof c == "object" && (s = c, c = i.pop()), tg(
      c,
      `createSelector expects an output function after the inputs, but received: [${typeof c}]`
    );
    const l = {
      ...r,
      ...s
    }, {
      memoize: f,
      memoizeOptions: d = [],
      argsMemoize: h = Mf,
      argsMemoizeOptions: p = [],
      devModeChecks: m = {}
    } = l, v = is(d), g = is(p), w = ig(i), y = f(function() {
      return a++, c.apply(
        null,
        arguments
      );
    }, ...v);
    let x = !0;
    const O = h(function() {
      o++;
      const S = as(
        w,
        arguments
      );
      if (u = y.apply(null, S), process.env.NODE_ENV !== "production") {
        const { identityFunctionCheck: N, inputStabilityCheck: I } = ag(x, m);
        if (N.shouldRun && N.run(
          c,
          S,
          u
        ), I.shouldRun) {
          const D = as(
            w,
            arguments
          );
          I.run(
            { inputSelectorResults: S, inputSelectorResultsCopy: D },
            { memoize: f, memoizeOptions: v },
            arguments
          );
        }
        x && (x = !1);
      }
      return u;
    }, ...g);
    return Object.assign(O, {
      resultFunc: c,
      memoizedResultFunc: y,
      dependencies: w,
      dependencyRecomputations: () => o,
      resetDependencyRecomputations: () => {
        o = 0;
      },
      lastResult: () => u,
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
var b = /* @__PURE__ */ cg(Mf), lg = Object.assign(
  (e, t = b) => {
    rg(
      e,
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`
    );
    const r = Object.keys(e), n = r.map(
      (a) => e[a]
    );
    return t(
      n,
      (...a) => a.reduce((o, u, s) => (o[r[s]] = u, o), {})
    );
  },
  { withTypes: () => lg }
);
function fg(e, t = 1) {
  const r = [], n = Math.floor(t), i = (a, o) => {
    for (let u = 0; u < a.length; u++) {
      const s = a[u];
      Array.isArray(s) && o < n ? i(s, o + 1) : r.push(s);
    }
  };
  return i(e, 0), r;
}
function Wa(e, t, r) {
  return wf(r) && (typeof t == "number" && Ef(r) && Pf(t) && t < r.length || typeof t == "string" && t in r) ? Bn(r[t], e) : !1;
}
function us(e) {
  return typeof e == "symbol" ? 1 : e === null ? 2 : e === void 0 ? 3 : e !== e ? 4 : 0;
}
const dg = (e, t, r) => {
  if (e !== t) {
    const n = us(e), i = us(t);
    if (n === i && n === 0) {
      if (e < t) return r === "desc" ? 1 : -1;
      if (e > t) return r === "desc" ? -1 : 1;
    }
    return r === "desc" ? i - n : n - i;
  }
  return 0;
};
function Nf(e) {
  return typeof e == "symbol" || e instanceof Symbol;
}
const hg = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, pg = /^\w*$/;
function vg(e, t) {
  return Array.isArray(e) ? !1 : typeof e == "number" || typeof e == "boolean" || e == null || Nf(e) ? !0 : typeof e == "string" && (pg.test(e) || !hg.test(e)) || t != null;
}
function mg(e, t, r, n) {
  if (e == null) return [];
  r = r, Array.isArray(e) || (e = Object.values(e)), Array.isArray(t) || (t = t == null ? [null] : [t]), t.length === 0 && (t = [null]), Array.isArray(r) || (r = r == null ? [] : [r]), r = r.map((u) => String(u));
  const i = (u, s) => {
    let c = u;
    for (let l = 0; l < s.length && c != null; ++l) c = c[s[l]];
    return c;
  }, a = (u, s) => s == null || u == null ? s : typeof u == "object" && "key" in u ? Object.hasOwn(s, u.key) ? s[u.key] : i(s, u.path) : typeof u == "function" ? u(s) : Array.isArray(u) ? i(s, u) : typeof s == "object" ? s[u] : s, o = t.map((u) => (Array.isArray(u) && u.length === 1 && (u = u[0]), u == null || typeof u == "function" || Array.isArray(u) || vg(u) ? u : {
    key: u,
    path: jo(u)
  }));
  return e.map((u) => ({
    original: u,
    criteria: o.map((s) => a(s, u))
  })).slice().sort((u, s) => {
    for (let c = 0; c < o.length; c++) {
      const l = dg(u.criteria[c], s.criteria[c], r[c]);
      if (l !== 0) return l;
    }
    return 0;
  }).map((u) => u.original);
}
function Ti(e, ...t) {
  const r = t.length;
  return r > 1 && Wa(e, t[0], t[1]) ? t = [] : r > 2 && Wa(t[0], t[1], t[2]) && (t = [t[0]]), mg(e, fg(t), ["asc"]);
}
var Cf = (e) => e.legend.settings, gg = (e) => e.legend.size, yg = (e) => e.legend.payload, bg = b([yg, Cf], (e, t) => {
  var {
    itemSorter: r
  } = t, n = e.flat(1);
  return r ? Ti(n, r) : n;
});
function wg() {
  return R(bg);
}
var An = 1;
function Df() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], [t, r] = tn({
    height: 0,
    left: 0,
    top: 0,
    width: 0
  }), n = Bl(
    (i) => {
      if (i != null) {
        var a = i.getBoundingClientRect(), o = {
          height: a.height,
          left: a.left,
          top: a.top,
          width: a.width
        };
        (Math.abs(o.height - t.height) > An || Math.abs(o.left - t.left) > An || Math.abs(o.top - t.top) > An || Math.abs(o.width - t.width) > An) && r({
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
function oe(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var _g = typeof Symbol == "function" && Symbol.observable || "@@observable", ss = _g, va = () => Math.random().toString(36).substring(7).split("").join("."), xg = {
  INIT: `@@redux/INIT${/* @__PURE__ */ va()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ va()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${va()}`
}, Lt = xg;
function on(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function Og(e) {
  if (e === void 0)
    return "undefined";
  if (e === null)
    return "null";
  const t = typeof e;
  switch (t) {
    case "boolean":
    case "string":
    case "number":
    case "symbol":
    case "function":
      return t;
  }
  if (Array.isArray(e))
    return "array";
  if (Sg(e))
    return "date";
  if (Eg(e))
    return "error";
  const r = Pg(e);
  switch (r) {
    case "Symbol":
    case "Promise":
    case "WeakMap":
    case "WeakSet":
    case "Map":
    case "Set":
      return r;
  }
  return Object.prototype.toString.call(e).slice(8, -1).toLowerCase().replace(/\s/g, "");
}
function Pg(e) {
  return typeof e.constructor == "function" ? e.constructor.name : null;
}
function Eg(e) {
  return e instanceof Error || typeof e.message == "string" && e.constructor && typeof e.constructor.stackTraceLimit == "number";
}
function Sg(e) {
  return e instanceof Date ? !0 : typeof e.toDateString == "function" && typeof e.getDate == "function" && typeof e.setDate == "function";
}
function dt(e) {
  let t = typeof e;
  return process.env.NODE_ENV !== "production" && (t = Og(e)), t;
}
function If(e, t, r) {
  if (typeof e != "function")
    throw new Error(process.env.NODE_ENV === "production" ? oe(2) : `Expected the root reducer to be a function. Instead, received: '${dt(e)}'`);
  if (typeof t == "function" && typeof r == "function" || typeof r == "function" && typeof arguments[3] == "function")
    throw new Error(process.env.NODE_ENV === "production" ? oe(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  if (typeof t == "function" && typeof r > "u" && (r = t, t = void 0), typeof r < "u") {
    if (typeof r != "function")
      throw new Error(process.env.NODE_ENV === "production" ? oe(1) : `Expected the enhancer to be a function. Instead, received: '${dt(r)}'`);
    return r(If)(e, t);
  }
  let n = e, i = t, a = /* @__PURE__ */ new Map(), o = a, u = 0, s = !1;
  function c() {
    o === a && (o = /* @__PURE__ */ new Map(), a.forEach((v, g) => {
      o.set(g, v);
    }));
  }
  function l() {
    if (s)
      throw new Error(process.env.NODE_ENV === "production" ? oe(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    return i;
  }
  function f(v) {
    if (typeof v != "function")
      throw new Error(process.env.NODE_ENV === "production" ? oe(4) : `Expected the listener to be a function. Instead, received: '${dt(v)}'`);
    if (s)
      throw new Error(process.env.NODE_ENV === "production" ? oe(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    let g = !0;
    c();
    const w = u++;
    return o.set(w, v), function() {
      if (g) {
        if (s)
          throw new Error(process.env.NODE_ENV === "production" ? oe(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
        g = !1, c(), o.delete(w), a = null;
      }
    };
  }
  function d(v) {
    if (!on(v))
      throw new Error(process.env.NODE_ENV === "production" ? oe(7) : `Actions must be plain objects. Instead, the actual type was: '${dt(v)}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`);
    if (typeof v.type > "u")
      throw new Error(process.env.NODE_ENV === "production" ? oe(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    if (typeof v.type != "string")
      throw new Error(process.env.NODE_ENV === "production" ? oe(17) : `Action "type" property must be a string. Instead, the actual type was: '${dt(v.type)}'. Value was: '${v.type}' (stringified)`);
    if (s)
      throw new Error(process.env.NODE_ENV === "production" ? oe(9) : "Reducers may not dispatch actions.");
    try {
      s = !0, i = n(i, v);
    } finally {
      s = !1;
    }
    return (a = o).forEach((w) => {
      w();
    }), v;
  }
  function h(v) {
    if (typeof v != "function")
      throw new Error(process.env.NODE_ENV === "production" ? oe(10) : `Expected the nextReducer to be a function. Instead, received: '${dt(v)}`);
    n = v, d({
      type: Lt.REPLACE
    });
  }
  function p() {
    const v = f;
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
          throw new Error(process.env.NODE_ENV === "production" ? oe(11) : `Expected the observer to be an object. Instead, received: '${dt(g)}'`);
        function w() {
          const x = g;
          x.next && x.next(l());
        }
        return w(), {
          unsubscribe: v(w)
        };
      },
      [ss]() {
        return this;
      }
    };
  }
  return d({
    type: Lt.INIT
  }), {
    dispatch: d,
    subscribe: f,
    getState: l,
    replaceReducer: h,
    [ss]: p
  };
}
function cs(e) {
  typeof console < "u" && typeof console.error == "function" && console.error(e);
  try {
    throw new Error(e);
  } catch {
  }
}
function Ag(e, t, r, n) {
  const i = Object.keys(t), a = r && r.type === Lt.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
  if (i.length === 0)
    return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
  if (!on(e))
    return `The ${a} has unexpected type of "${dt(e)}". Expected argument to be an object with the following keys: "${i.join('", "')}"`;
  const o = Object.keys(e).filter((u) => !t.hasOwnProperty(u) && !n[u]);
  if (o.forEach((u) => {
    n[u] = !0;
  }), !(r && r.type === Lt.REPLACE) && o.length > 0)
    return `Unexpected ${o.length > 1 ? "keys" : "key"} "${o.join('", "')}" found in ${a}. Expected to find one of the known reducer keys instead: "${i.join('", "')}". Unexpected keys will be ignored.`;
}
function Mg(e) {
  Object.keys(e).forEach((t) => {
    const r = e[t];
    if (typeof r(void 0, {
      type: Lt.INIT
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? oe(12) : `The slice reducer for key "${t}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
    if (typeof r(void 0, {
      type: Lt.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? oe(13) : `The slice reducer for key "${t}" returned undefined when probed with a random type. Don't try to handle '${Lt.INIT}' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`);
  });
}
function Ng(e) {
  const t = Object.keys(e), r = {};
  for (let o = 0; o < t.length; o++) {
    const u = t[o];
    process.env.NODE_ENV !== "production" && typeof e[u] > "u" && cs(`No reducer provided for key "${u}"`), typeof e[u] == "function" && (r[u] = e[u]);
  }
  const n = Object.keys(r);
  let i;
  process.env.NODE_ENV !== "production" && (i = {});
  let a;
  try {
    Mg(r);
  } catch (o) {
    a = o;
  }
  return function(u = {}, s) {
    if (a)
      throw a;
    if (process.env.NODE_ENV !== "production") {
      const f = Ag(u, r, s, i);
      f && cs(f);
    }
    let c = !1;
    const l = {};
    for (let f = 0; f < n.length; f++) {
      const d = n[f], h = r[d], p = u[d], m = h(p, s);
      if (typeof m > "u") {
        const v = s && s.type;
        throw new Error(process.env.NODE_ENV === "production" ? oe(14) : `When called with an action of type ${v ? `"${String(v)}"` : "(unknown type)"}, the slice reducer for key "${d}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`);
      }
      l[d] = m, c = c || m !== p;
    }
    return c = c || n.length !== Object.keys(u).length, c ? l : u;
  };
}
function Zn(...e) {
  return e.length === 0 ? (t) => t : e.length === 1 ? e[0] : e.reduce((t, r) => (...n) => t(r(...n)));
}
function Cg(...e) {
  return (t) => (r, n) => {
    const i = t(r, n);
    let a = () => {
      throw new Error(process.env.NODE_ENV === "production" ? oe(15) : "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
    };
    const o = {
      getState: i.getState,
      dispatch: (s, ...c) => a(s, ...c)
    }, u = e.map((s) => s(o));
    return a = Zn(...u)(i.dispatch), {
      ...i,
      dispatch: a
    };
  };
}
function Ro(e) {
  return on(e) && "type" in e && typeof e.type == "string";
}
var Tf = Symbol.for("immer-nothing"), ls = Symbol.for("immer-draftable"), fe = Symbol.for("immer-state"), Dg = process.env.NODE_ENV !== "production" ? [
  // All error codes, starting by 0:
  function(e) {
    return `The plugin for '${e}' has not been loaded into Immer. To enable the plugin, import and call \`enable${e}()\` when initializing your application.`;
  },
  function(e) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${e}'`;
  },
  "This object has been frozen and should not be mutated",
  function(e) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + e;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(e) {
    return `'current' expects a draft, got: ${e}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(e) {
    return `'original' expects a draft, got: ${e}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : [];
function Oe(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const r = Dg[e], n = It(r) ? r.apply(null, t) : r;
    throw new Error(`[Immer] ${n}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var Ee = Object, dr = Ee.getPrototypeOf, Qn = "constructor", ki = "prototype", Ka = "configurable", Jn = "enumerable", Vn = "writable", Br = "value", at = (e) => !!e && !!e[fe];
function $e(e) {
  return e ? kf(e) || $i(e) || !!e[ls] || !!e[Qn]?.[ls] || Ri(e) || Li(e) : !1;
}
var Ig = Ee[ki][Qn].toString(), fs = /* @__PURE__ */ new WeakMap();
function kf(e) {
  if (!e || !Lo(e))
    return !1;
  const t = dr(e);
  if (t === null || t === Ee[ki])
    return !0;
  const r = Ee.hasOwnProperty.call(t, Qn) && t[Qn];
  if (r === Object)
    return !0;
  if (!It(r))
    return !1;
  let n = fs.get(r);
  return n === void 0 && (n = Function.toString.call(r), fs.set(r, n)), n === Ig;
}
function ji(e, t, r = !0) {
  un(e) === 0 ? (r ? Reflect.ownKeys(e) : Ee.keys(e)).forEach((i) => {
    t(i, e[i], e);
  }) : e.forEach((n, i) => t(i, n, e));
}
function un(e) {
  const t = e[fe];
  return t ? t.type_ : $i(e) ? 1 : Ri(e) ? 2 : Li(e) ? 3 : 0;
}
var ma = (e, t, r = un(e)) => r === 2 ? e.has(t) : Ee[ki].hasOwnProperty.call(e, t), qa = (e, t, r = un(e)) => (
  // @ts-ignore
  r === 2 ? e.get(t) : e[t]
), ei = (e, t, r, n = un(e)) => {
  n === 2 ? e.set(t, r) : n === 3 ? e.add(r) : e[t] = r;
};
function Tg(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
var $i = Array.isArray, Ri = (e) => e instanceof Map, Li = (e) => e instanceof Set, Lo = (e) => typeof e == "object", It = (e) => typeof e == "function", ga = (e) => typeof e == "boolean";
function kg(e) {
  const t = +e;
  return Number.isInteger(t) && String(t) === e;
}
var tt = (e) => e.copy_ || e.base_, zo = (e) => e.modified_ ? e.copy_ : e.base_;
function Ha(e, t) {
  if (Ri(e))
    return new Map(e);
  if (Li(e))
    return new Set(e);
  if ($i(e))
    return Array[ki].slice.call(e);
  const r = kf(e);
  if (t === !0 || t === "class_only" && !r) {
    const n = Ee.getOwnPropertyDescriptors(e);
    delete n[fe];
    let i = Reflect.ownKeys(n);
    for (let a = 0; a < i.length; a++) {
      const o = i[a], u = n[o];
      u[Vn] === !1 && (u[Vn] = !0, u[Ka] = !0), (u.get || u.set) && (n[o] = {
        [Ka]: !0,
        [Vn]: !0,
        // could live with !!desc.set as well here...
        [Jn]: u[Jn],
        [Br]: e[o]
      });
    }
    return Ee.create(dr(e), n);
  } else {
    const n = dr(e);
    if (n !== null && r)
      return { ...e };
    const i = Ee.create(n);
    return Ee.assign(i, e);
  }
}
function Fo(e, t = !1) {
  return zi(e) || at(e) || !$e(e) || (un(e) > 1 && Ee.defineProperties(e, {
    set: Mn,
    add: Mn,
    clear: Mn,
    delete: Mn
  }), Ee.freeze(e), t && ji(
    e,
    (r, n) => {
      Fo(n, !0);
    },
    !1
  )), e;
}
function jg() {
  Oe(2);
}
var Mn = {
  [Br]: jg
};
function zi(e) {
  return e === null || !Lo(e) ? !0 : Ee.isFrozen(e);
}
var ti = "MapSet", Ya = "Patches", ds = "ArrayMethods", jf = {};
function Wt(e) {
  const t = jf[e];
  return t || Oe(0, e), t;
}
var hs = (e) => !!jf[e], Ur, $f = () => Ur, $g = (e, t) => ({
  drafts_: [],
  parent_: e,
  immer_: t,
  // Whenever the modified draft contains a draft from another scope, we
  // need to prevent auto-freezing so the unowned draft can be finalized.
  canAutoFreeze_: !0,
  unfinalizedDrafts_: 0,
  handledSet_: /* @__PURE__ */ new Set(),
  processedForPatches_: /* @__PURE__ */ new Set(),
  mapSetPlugin_: hs(ti) ? Wt(ti) : void 0,
  arrayMethodsPlugin_: hs(ds) ? Wt(ds) : void 0
});
function ps(e, t) {
  t && (e.patchPlugin_ = Wt(Ya), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function Ga(e) {
  Xa(e), e.drafts_.forEach(Rg), e.drafts_ = null;
}
function Xa(e) {
  e === Ur && (Ur = e.parent_);
}
var vs = (e) => Ur = $g(Ur, e);
function Rg(e) {
  const t = e[fe];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function ms(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  if (e !== void 0 && e !== r) {
    r[fe].modified_ && (Ga(t), Oe(4)), $e(e) && (e = gs(t, e));
    const { patchPlugin_: i } = t;
    i && i.generateReplacementPatches_(
      r[fe].base_,
      e,
      t
    );
  } else
    e = gs(t, r);
  return Lg(t, e, !0), Ga(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== Tf ? e : void 0;
}
function gs(e, t) {
  if (zi(t))
    return t;
  const r = t[fe];
  if (!r)
    return ri(t, e.handledSet_, e);
  if (!Fi(r, e))
    return t;
  if (!r.modified_)
    return r.base_;
  if (!r.finalized_) {
    const { callbacks_: n } = r;
    if (n)
      for (; n.length > 0; )
        n.pop()(e);
    zf(r, e);
  }
  return r.copy_;
}
function Lg(e, t, r = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && Fo(t, r);
}
function Rf(e) {
  e.finalized_ = !0, e.scope_.unfinalizedDrafts_--;
}
var Fi = (e, t) => e.scope_ === t, zg = [];
function Lf(e, t, r, n) {
  const i = tt(e), a = e.type_;
  if (n !== void 0 && qa(i, n, a) === t) {
    ei(i, n, r, a);
    return;
  }
  if (!e.draftLocations_) {
    const u = e.draftLocations_ = /* @__PURE__ */ new Map();
    ji(i, (s, c) => {
      if (at(c)) {
        const l = u.get(c) || [];
        l.push(s), u.set(c, l);
      }
    });
  }
  const o = e.draftLocations_.get(t) ?? zg;
  for (const u of o)
    ei(i, u, r, a);
}
function Fg(e, t, r) {
  e.callbacks_.push(function(i) {
    const a = t;
    if (!a || !Fi(a, i))
      return;
    i.mapSetPlugin_?.fixSetContents(a);
    const o = zo(a);
    Lf(e, a.draft_ ?? a, o, r), zf(a, i);
  });
}
function zf(e, t) {
  if (e.modified_ && !e.finalized_ && (e.type_ === 3 || e.type_ === 1 && e.allIndicesReassigned_ || (e.assigned_?.size ?? 0) > 0)) {
    const { patchPlugin_: n } = t;
    if (n) {
      const i = n.getPath(e);
      i && n.generatePatches_(e, i, t);
    }
    Rf(e);
  }
}
function Bg(e, t, r) {
  const { scope_: n } = e;
  if (at(r)) {
    const i = r[fe];
    Fi(i, n) && i.callbacks_.push(function() {
      Wn(e);
      const o = zo(i);
      Lf(e, r, o, t);
    });
  } else $e(r) && e.callbacks_.push(function() {
    const a = tt(e);
    e.type_ === 3 ? a.has(r) && ri(r, n.handledSet_, n) : qa(a, t, e.type_) === r && n.drafts_.length > 1 && (e.assigned_.get(t) ?? !1) === !0 && e.copy_ && ri(
      qa(e.copy_, t, e.type_),
      n.handledSet_,
      n
    );
  });
}
function ri(e, t, r) {
  return !r.immer_.autoFreeze_ && r.unfinalizedDrafts_ < 1 || at(e) || t.has(e) || !$e(e) || zi(e) || (t.add(e), ji(e, (n, i) => {
    if (at(i)) {
      const a = i[fe];
      if (Fi(a, r)) {
        const o = zo(a);
        ei(e, n, o, e.type_), Rf(a);
      }
    } else $e(i) && ri(i, t, r);
  })), e;
}
function Ug(e, t) {
  const r = $i(e), n = {
    type_: r ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : $f(),
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
  let i = n, a = ni;
  r && (i = [n], a = Vr);
  const { revoke: o, proxy: u } = Proxy.revocable(i, a);
  return n.draft_ = u, n.revoke_ = o, [u, n];
}
var ni = {
  get(e, t) {
    if (t === fe)
      return e;
    let r = e.scope_.arrayMethodsPlugin_;
    const n = e.type_ === 1 && typeof t == "string";
    if (n && r?.isArrayOperationMethod(t))
      return r.createMethodInterceptor(e, t);
    const i = tt(e);
    if (!ma(i, t, e.type_))
      return Wg(e, i, t);
    const a = i[t];
    if (e.finalized_ || !$e(a) || n && e.operationMethod && r?.isMutatingArrayMethod(
      e.operationMethod
    ) && kg(t))
      return a;
    if (a === ya(e.base_, t) || Vg(e, t, a)) {
      Wn(e);
      const o = e.type_ === 1 ? +t : t, u = Qa(e.scope_, a, e, o);
      return e.copy_[o] = u;
    }
    return a;
  },
  has(e, t) {
    return t in tt(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(tt(e));
  },
  set(e, t, r) {
    const n = Ff(tt(e), t);
    if (n?.set)
      return n.set.call(e.draft_, r), !0;
    if (!e.modified_) {
      const i = ya(tt(e), t), a = i?.[fe];
      if (a && a.base_ === r)
        return e.copy_[t] = r, e.assigned_.set(t, !1), !0;
      if (Tg(r, i) && (r !== void 0 || ma(e.base_, t, e.type_)))
        return !0;
      Wn(e), Za(e);
    }
    return e.copy_[t] === r && // special case: handle new props with value 'undefined'
    (r !== void 0 || ma(e.copy_, t, e.type_)) || // special case: NaN
    Number.isNaN(r) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = r, e.assigned_.set(t, !0), Bg(e, t, r)), !0;
  },
  deleteProperty(e, t) {
    return Wn(e), ya(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_.set(t, !1), Za(e)) : e.assigned_.delete(t), e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const r = tt(e), n = Reflect.getOwnPropertyDescriptor(r, t);
    return n && {
      [Vn]: !0,
      [Ka]: e.type_ !== 1 || t !== "length",
      [Jn]: n[Jn],
      [Br]: r[t]
    };
  },
  defineProperty() {
    Oe(11);
  },
  getPrototypeOf(e) {
    return dr(e.base_);
  },
  setPrototypeOf() {
    Oe(12);
  }
}, Vr = {};
for (let e in ni) {
  let t = ni[e];
  Vr[e] = function() {
    const r = arguments;
    return r[0] = r[0][0], t.apply(this, r);
  };
}
Vr.deleteProperty = function(e, t) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && Oe(13), Vr.set.call(this, e, t, void 0);
};
Vr.set = function(e, t, r) {
  return process.env.NODE_ENV !== "production" && t !== "length" && isNaN(parseInt(t)) && Oe(14), ni.set.call(this, e[0], t, r, e[0]);
};
function ya(e, t) {
  const r = e[fe];
  return (r ? tt(r) : e)[t];
}
function Vg(e, t, r) {
  return e.type_ !== 1 || !e.allIndicesReassigned_ || e.assigned_?.get(t) || !$e(r) || r[fe] ? !1 : e.baseRefs_.has(r);
}
function Wg(e, t, r) {
  const n = Ff(t, r);
  return n ? Br in n ? n[Br] : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    n.get?.call(e.draft_)
  ) : void 0;
}
function Ff(e, t) {
  if (!(t in e))
    return;
  let r = dr(e);
  for (; r; ) {
    const n = Object.getOwnPropertyDescriptor(r, t);
    if (n)
      return n;
    r = dr(r);
  }
}
function Za(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && Za(e.parent_));
}
function Wn(e) {
  e.copy_ || (e.assigned_ = /* @__PURE__ */ new Map(), e.copy_ = Ha(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var Kg = class {
  constructor(t) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.useStrictIteration_ = !1, this.produce = (r, n, i) => {
      if (It(r) && !It(n)) {
        const o = n;
        n = r;
        const u = this;
        return function(c = o, ...l) {
          return u.produce(c, (f) => n.call(this, f, ...l));
        };
      }
      It(n) || Oe(6), i !== void 0 && !It(i) && Oe(7);
      let a;
      if ($e(r)) {
        const o = vs(this), u = Qa(o, r, void 0);
        let s = !0;
        try {
          a = n(u), s = !1;
        } finally {
          s ? Ga(o) : Xa(o);
        }
        return ps(o, i), ms(a, o);
      } else if (!r || !Lo(r)) {
        if (a = n(r), a === void 0 && (a = r), a === Tf && (a = void 0), this.autoFreeze_ && Fo(a, !0), i) {
          const o = [], u = [];
          Wt(Ya).generateReplacementPatches_(r, a, {
            patches_: o,
            inversePatches_: u
          }), i(o, u);
        }
        return a;
      } else
        Oe(1, r);
    }, this.produceWithPatches = (r, n) => {
      if (It(r))
        return (u, ...s) => this.produceWithPatches(u, (c) => r(c, ...s));
      let i, a;
      return [this.produce(r, n, (u, s) => {
        i = u, a = s;
      }), i, a];
    }, ga(t?.autoFreeze) && this.setAutoFreeze(t.autoFreeze), ga(t?.useStrictShallowCopy) && this.setUseStrictShallowCopy(t.useStrictShallowCopy), ga(t?.useStrictIteration) && this.setUseStrictIteration(t.useStrictIteration);
  }
  createDraft(t) {
    $e(t) || Oe(8), at(t) && (t = Wr(t));
    const r = vs(this), n = Qa(r, t, void 0);
    return n[fe].isManual_ = !0, Xa(r), n;
  }
  finishDraft(t, r) {
    const n = t && t[fe];
    (!n || !n.isManual_) && Oe(9);
    const { scope_: i } = n;
    return ps(i, r), ms(void 0, i);
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
    const i = Wt(Ya).applyPatches_;
    return at(t) ? i(t, r) : this.produce(
      t,
      (a) => i(a, r)
    );
  }
};
function Qa(e, t, r, n) {
  const [i, a] = Ri(t) ? Wt(ti).proxyMap_(t, r) : Li(t) ? Wt(ti).proxySet_(t, r) : Ug(t, r);
  return (r?.scope_ ?? $f()).drafts_.push(i), a.callbacks_ = r?.callbacks_ ?? [], a.key_ = n, r && n !== void 0 ? Fg(r, a, n) : a.callbacks_.push(function(s) {
    s.mapSetPlugin_?.fixSetContents(a);
    const { patchPlugin_: c } = s;
    a.modified_ && c && c.generatePatches_(a, [], s);
  }), i;
}
function Wr(e) {
  return at(e) || Oe(10, e), Bf(e);
}
function Bf(e) {
  if (!$e(e) || zi(e))
    return e;
  const t = e[fe];
  let r, n = !0;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, r = Ha(e, t.scope_.immer_.useStrictShallowCopy_), n = t.scope_.immer_.shouldUseStrictIteration();
  } else
    r = Ha(e, !0);
  return ji(
    r,
    (i, a) => {
      ei(r, i, Bf(a));
    },
    n
  ), t && (t.finalized_ = !1), r;
}
var qg = new Kg(), Uf = qg.produce;
function Vf(e) {
  return ({ dispatch: r, getState: n }) => (i) => (a) => typeof a == "function" ? a(r, n, e) : i(a);
}
var Hg = Vf(), Yg = Vf, Gg = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0)
    return typeof arguments[0] == "object" ? Zn : Zn.apply(null, arguments);
}, Xg = (e) => e && typeof e.match == "function";
function hr(e, t) {
  function r(...n) {
    if (t) {
      let i = t(...n);
      if (!i)
        throw new Error(process.env.NODE_ENV === "production" ? F(0) : "prepareAction did not return an object");
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
  return r.toString = () => `${e}`, r.type = e, r.match = (n) => Ro(n) && n.type === e, r;
}
function Zg(e) {
  return typeof e == "function" && "type" in e && // hasMatchFunction only wants Matchers but I don't see the point in rewriting it
  Xg(e);
}
function Qg(e) {
  const t = e ? `${e}`.split("/") : [], r = t[t.length - 1] || "actionCreator";
  return `Detected an action creator with type "${e || "unknown"}" being dispatched.
Make sure you're calling the action creator before dispatching, i.e. \`dispatch(${r}())\` instead of \`dispatch(${r})\`. This is necessary even if the action has no payload.`;
}
function Jg(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (r) => (n) => r(n);
  const {
    isActionCreator: t = Zg
  } = e;
  return () => (r) => (n) => (t(n) && console.warn(Qg(n.type)), r(n));
}
function Wf(e, t) {
  let r = 0;
  return {
    measureTime(n) {
      const i = Date.now();
      try {
        return n();
      } finally {
        const a = Date.now();
        r += a - i;
      }
    },
    warnIfExceeded() {
      r > e && console.warn(`${t} took ${r}ms, which is more than the warning threshold of ${e}ms. 
If your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.
It is disabled in production builds, so you don't need to worry about that.`);
    }
  };
}
var Kf = class Lr extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, Lr.prototype);
  }
  static get [Symbol.species]() {
    return Lr;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0]) ? new Lr(...t[0].concat(this)) : new Lr(...t.concat(this));
  }
};
function ys(e) {
  return $e(e) ? Uf(e, () => {
  }) : e;
}
function Nn(e, t, r) {
  return e.has(t) ? e.get(t) : e.set(t, r(t)).get(t);
}
function ey(e) {
  return typeof e != "object" || e == null || Object.isFrozen(e);
}
function ty(e, t, r) {
  const n = qf(e, t, r);
  return {
    detectMutations() {
      return Hf(e, t, n, r);
    }
  };
}
function qf(e, t = [], r, n = "", i = /* @__PURE__ */ new Set()) {
  const a = {
    value: r
  };
  if (!e(r) && !i.has(r)) {
    i.add(r), a.children = {};
    const o = t.length > 0;
    for (const u in r) {
      const s = n ? n + "." + u : u;
      o && t.some((l) => l instanceof RegExp ? l.test(s) : s === l) || (a.children[u] = qf(e, t, r[u], s));
    }
  }
  return a;
}
function Hf(e, t = [], r, n, i = !1, a = "") {
  const o = r ? r.value : void 0, u = o === n;
  if (i && !u && !Number.isNaN(n))
    return {
      wasMutated: !0,
      path: a
    };
  if (e(o) || e(n))
    return {
      wasMutated: !1
    };
  const s = {};
  for (let l in r.children)
    s[l] = !0;
  for (let l in n)
    s[l] = !0;
  const c = t.length > 0;
  for (let l in s) {
    const f = a ? a + "." + l : l;
    if (c && t.some((p) => p instanceof RegExp ? p.test(f) : f === p))
      continue;
    const d = Hf(e, t, r.children[l], n[l], u, f);
    if (d.wasMutated)
      return d;
  }
  return {
    wasMutated: !1
  };
}
function ry(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (t) => (r) => t(r);
  {
    let t = function(u, s, c, l) {
      return JSON.stringify(u, r(s, l), c);
    }, r = function(u, s) {
      let c = [], l = [];
      return s || (s = function(f, d) {
        return c[0] === d ? "[Circular ~]" : "[Circular ~." + l.slice(0, c.indexOf(d)).join(".") + "]";
      }), function(f, d) {
        if (c.length > 0) {
          var h = c.indexOf(this);
          ~h ? c.splice(h + 1) : c.push(this), ~h ? l.splice(h, 1 / 0, f) : l.push(f), ~c.indexOf(d) && (d = s.call(this, f, d));
        } else c.push(d);
        return u == null ? d : u.call(this, f, d);
      };
    }, {
      isImmutable: n = ey,
      ignoredPaths: i,
      warnAfter: a = 32
    } = e;
    const o = ty.bind(null, n, i);
    return ({
      getState: u
    }) => {
      let s = u(), c = o(s), l;
      return (f) => (d) => {
        const h = Wf(a, "ImmutableStateInvariantMiddleware");
        h.measureTime(() => {
          if (s = u(), l = c.detectMutations(), c = o(s), l.wasMutated)
            throw new Error(process.env.NODE_ENV === "production" ? F(19) : `A state mutation was detected between dispatches, in the path '${l.path || ""}'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
        });
        const p = f(d);
        return h.measureTime(() => {
          if (s = u(), l = c.detectMutations(), c = o(s), l.wasMutated)
            throw new Error(process.env.NODE_ENV === "production" ? F(20) : `A state mutation was detected inside a dispatch, in the path: ${l.path || ""}. Take a look at the reducer(s) handling the action ${t(d)}. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
        }), h.warnIfExceeded(), p;
      };
    };
  }
}
function Yf(e) {
  const t = typeof e;
  return e == null || t === "string" || t === "boolean" || t === "number" || Array.isArray(e) || on(e);
}
function Ja(e, t = "", r = Yf, n, i = [], a) {
  let o;
  if (!r(e))
    return {
      keyPath: t || "<root>",
      value: e
    };
  if (typeof e != "object" || e === null || a?.has(e)) return !1;
  const u = n != null ? n(e) : Object.entries(e), s = i.length > 0;
  for (const [c, l] of u) {
    const f = t ? t + "." + c : c;
    if (!(s && i.some((h) => h instanceof RegExp ? h.test(f) : f === h))) {
      if (!r(l))
        return {
          keyPath: f,
          value: l
        };
      if (typeof l == "object" && (o = Ja(l, f, r, n, i, a), o))
        return o;
    }
  }
  return a && Gf(e) && a.add(e), !1;
}
function Gf(e) {
  if (!Object.isFrozen(e)) return !1;
  for (const t of Object.values(e))
    if (!(typeof t != "object" || t === null) && !Gf(t))
      return !1;
  return !0;
}
function ny(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (t) => (r) => t(r);
  {
    const {
      isSerializable: t = Yf,
      getEntries: r,
      ignoredActions: n = [],
      ignoredActionPaths: i = ["meta.arg", "meta.baseQueryMeta"],
      ignoredPaths: a = [],
      warnAfter: o = 32,
      ignoreState: u = !1,
      ignoreActions: s = !1,
      disableCache: c = !1
    } = e, l = !c && WeakSet ? /* @__PURE__ */ new WeakSet() : void 0;
    return (f) => (d) => (h) => {
      if (!Ro(h))
        return d(h);
      const p = d(h), m = Wf(o, "SerializableStateInvariantMiddleware");
      return !s && !(n.length && n.indexOf(h.type) !== -1) && m.measureTime(() => {
        const v = Ja(h, "", t, r, i, l);
        if (v) {
          const {
            keyPath: g,
            value: w
          } = v;
          console.error(`A non-serializable value was detected in an action, in the path: \`${g}\`. Value:`, w, `
Take a look at the logic that dispatched this action: `, h, `
(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)`, `
(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)`);
        }
      }), u || (m.measureTime(() => {
        const v = f.getState(), g = Ja(v, "", t, r, a, l);
        if (g) {
          const {
            keyPath: w,
            value: y
          } = g;
          console.error(`A non-serializable value was detected in the state, in the path: \`${w}\`. Value:`, y, `
Take a look at the reducer(s) handling this action type: ${h.type}.
(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)`);
        }
      }), m.warnIfExceeded()), p;
    };
  }
}
function Cn(e) {
  return typeof e == "boolean";
}
var iy = () => function(t) {
  const {
    thunk: r = !0,
    immutableCheck: n = !0,
    serializableCheck: i = !0,
    actionCreatorCheck: a = !0
  } = t ?? {};
  let o = new Kf();
  if (r && (Cn(r) ? o.push(Hg) : o.push(Yg(r.extraArgument))), process.env.NODE_ENV !== "production") {
    if (n) {
      let u = {};
      Cn(n) || (u = n), o.unshift(ry(u));
    }
    if (i) {
      let u = {};
      Cn(i) || (u = i), o.push(ny(u));
    }
    if (a) {
      let u = {};
      Cn(a) || (u = a), o.unshift(Jg(u));
    }
  }
  return o;
}, Xf = "RTK_autoBatch", He = () => (e) => ({
  payload: e,
  meta: {
    [Xf]: !0
  }
}), bs = (e) => (t) => {
  setTimeout(t, e);
}, ay = (e, t) => (r) => {
  let n = !1;
  const i = () => {
    n || (n = !0, cancelAnimationFrame(a), clearTimeout(o), r());
  }, a = e(i), o = setTimeout(i, t);
}, oy = (e = {
  type: "raf"
}) => (t) => (...r) => {
  const n = t(...r);
  let i = !0, a = !1, o = !1;
  const u = /* @__PURE__ */ new Set(), s = e.type === "tick" ? queueMicrotask : e.type === "raf" ? (
    // requestAnimationFrame won't exist in SSR environments. Fall back to a vague approximation just to keep from erroring.
    typeof window < "u" && window.requestAnimationFrame ? ay(window.requestAnimationFrame, 100) : bs(10)
  ) : e.type === "callback" ? e.queueNotification : bs(e.timeout), c = () => {
    o = !1, a && (a = !1, u.forEach((l) => l()));
  };
  return Object.assign({}, n, {
    // Override the base `store.subscribe` method to keep original listeners
    // from running if we're delaying notifications
    subscribe(l) {
      const f = () => i && l(), d = n.subscribe(f);
      return u.add(l), () => {
        d(), u.delete(l);
      };
    },
    // Override the base `store.dispatch` method so that we can check actions
    // for the `shouldAutoBatch` flag and determine if batching is active
    dispatch(l) {
      try {
        return i = !l?.meta?.[Xf], a = !i, a && (o || (o = !0, s(c))), n.dispatch(l);
      } finally {
        i = !0;
      }
    }
  });
}, uy = (e) => function(r) {
  const {
    autoBatch: n = !0
  } = r ?? {};
  let i = new Kf(e);
  return n && i.push(oy(typeof n == "object" ? n : void 0)), i;
};
function aS(e) {
  const t = iy(), {
    reducer: r = void 0,
    middleware: n,
    devTools: i = !0,
    duplicateMiddlewareCheck: a = !0,
    preloadedState: o = void 0,
    enhancers: u = void 0
  } = e || {};
  let s;
  if (typeof r == "function")
    s = r;
  else if (on(r))
    s = Ng(r);
  else
    throw new Error(process.env.NODE_ENV === "production" ? F(1) : "`reducer` is a required argument, and must be a function or an object of functions that can be passed to combineReducers");
  if (process.env.NODE_ENV !== "production" && n && typeof n != "function")
    throw new Error(process.env.NODE_ENV === "production" ? F(2) : "`middleware` field must be a callback");
  let c;
  if (typeof n == "function") {
    if (c = n(t), process.env.NODE_ENV !== "production" && !Array.isArray(c))
      throw new Error(process.env.NODE_ENV === "production" ? F(3) : "when using a middleware builder function, an array of middleware must be returned");
  } else
    c = t();
  if (process.env.NODE_ENV !== "production" && c.some((m) => typeof m != "function"))
    throw new Error(process.env.NODE_ENV === "production" ? F(4) : "each middleware provided to configureStore must be a function");
  if (process.env.NODE_ENV !== "production" && a) {
    let m = /* @__PURE__ */ new Set();
    c.forEach((v) => {
      if (m.has(v))
        throw new Error(process.env.NODE_ENV === "production" ? F(42) : "Duplicate middleware references found when creating the store. Ensure that each middleware is only included once.");
      m.add(v);
    });
  }
  let l = Zn;
  i && (l = Gg({
    // Enable capture of stack traces for dispatched Redux actions
    trace: process.env.NODE_ENV !== "production",
    ...typeof i == "object" && i
  }));
  const f = Cg(...c), d = uy(f);
  if (process.env.NODE_ENV !== "production" && u && typeof u != "function")
    throw new Error(process.env.NODE_ENV === "production" ? F(5) : "`enhancers` field must be a callback");
  let h = typeof u == "function" ? u(d) : d();
  if (process.env.NODE_ENV !== "production" && !Array.isArray(h))
    throw new Error(process.env.NODE_ENV === "production" ? F(6) : "`enhancers` callback must return an array");
  if (process.env.NODE_ENV !== "production" && h.some((m) => typeof m != "function"))
    throw new Error(process.env.NODE_ENV === "production" ? F(7) : "each enhancer provided to configureStore must be a function");
  process.env.NODE_ENV !== "production" && c.length && !h.includes(f) && console.error("middlewares were provided, but middleware enhancer was not included in final enhancers - make sure to call `getDefaultEnhancers`");
  const p = l(...h);
  return If(s, o, p);
}
function Zf(e) {
  const t = {}, r = [];
  let n;
  const i = {
    addCase(a, o) {
      if (process.env.NODE_ENV !== "production") {
        if (r.length > 0)
          throw new Error(process.env.NODE_ENV === "production" ? F(26) : "`builder.addCase` should only be called before calling `builder.addMatcher`");
        if (n)
          throw new Error(process.env.NODE_ENV === "production" ? F(27) : "`builder.addCase` should only be called before calling `builder.addDefaultCase`");
      }
      const u = typeof a == "string" ? a : a.type;
      if (!u)
        throw new Error(process.env.NODE_ENV === "production" ? F(28) : "`builder.addCase` cannot be called with an empty action type");
      if (u in t)
        throw new Error(process.env.NODE_ENV === "production" ? F(29) : `\`builder.addCase\` cannot be called with two reducers for the same action type '${u}'`);
      return t[u] = o, i;
    },
    addAsyncThunk(a, o) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(process.env.NODE_ENV === "production" ? F(43) : "`builder.addAsyncThunk` should only be called before calling `builder.addDefaultCase`");
      return o.pending && (t[a.pending.type] = o.pending), o.rejected && (t[a.rejected.type] = o.rejected), o.fulfilled && (t[a.fulfilled.type] = o.fulfilled), o.settled && r.push({
        matcher: a.settled,
        reducer: o.settled
      }), i;
    },
    addMatcher(a, o) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(process.env.NODE_ENV === "production" ? F(30) : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
      return r.push({
        matcher: a,
        reducer: o
      }), i;
    },
    addDefaultCase(a) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(process.env.NODE_ENV === "production" ? F(31) : "`builder.addDefaultCase` can only be called once");
      return n = a, i;
    }
  };
  return e(i), [t, r, n];
}
function sy(e) {
  return typeof e == "function";
}
function cy(e, t) {
  if (process.env.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(process.env.NODE_ENV === "production" ? F(8) : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");
  let [r, n, i] = Zf(t), a;
  if (sy(e))
    a = () => ys(e());
  else {
    const u = ys(e);
    a = () => u;
  }
  function o(u = a(), s) {
    let c = [r[s.type], ...n.filter(({
      matcher: l
    }) => l(s)).map(({
      reducer: l
    }) => l)];
    return c.filter((l) => !!l).length === 0 && (c = [i]), c.reduce((l, f) => {
      if (f)
        if (at(l)) {
          const h = f(l, s);
          return h === void 0 ? l : h;
        } else {
          if ($e(l))
            return Uf(l, (d) => f(d, s));
          {
            const d = f(l, s);
            if (d === void 0) {
              if (l === null)
                return l;
              throw Error("A case reducer on a non-draftable value must not return undefined");
            }
            return d;
          }
        }
      return l;
    }, u);
  }
  return o.getInitialState = a, o;
}
var ly = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", fy = (e = 21) => {
  let t = "", r = e;
  for (; r--; )
    t += ly[Math.random() * 64 | 0];
  return t;
}, dy = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function hy(e, t) {
  return `${e}/${t}`;
}
function py({
  creators: e
} = {}) {
  const t = e?.asyncThunk?.[dy];
  return function(n) {
    const {
      name: i,
      reducerPath: a = i
    } = n;
    if (!i)
      throw new Error(process.env.NODE_ENV === "production" ? F(11) : "`name` is a required option for createSlice");
    typeof process < "u" && process.env.NODE_ENV === "development" && n.initialState === void 0 && console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
    const o = (typeof n.reducers == "function" ? n.reducers(my()) : n.reducers) || {}, u = Object.keys(o), s = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, c = {
      addCase(y, x) {
        const O = typeof y == "string" ? y : y.type;
        if (!O)
          throw new Error(process.env.NODE_ENV === "production" ? F(12) : "`context.addCase` cannot be called with an empty action type");
        if (O in s.sliceCaseReducersByType)
          throw new Error(process.env.NODE_ENV === "production" ? F(13) : "`context.addCase` cannot be called with two reducers for the same action type: " + O);
        return s.sliceCaseReducersByType[O] = x, c;
      },
      addMatcher(y, x) {
        return s.sliceMatchers.push({
          matcher: y,
          reducer: x
        }), c;
      },
      exposeAction(y, x) {
        return s.actionCreators[y] = x, c;
      },
      exposeCaseReducer(y, x) {
        return s.sliceCaseReducersByName[y] = x, c;
      }
    };
    u.forEach((y) => {
      const x = o[y], O = {
        reducerName: y,
        type: hy(i, y),
        createNotation: typeof n.reducers == "function"
      };
      yy(x) ? wy(O, x, c, t) : gy(O, x, c);
    });
    function l() {
      if (process.env.NODE_ENV !== "production" && typeof n.extraReducers == "object")
        throw new Error(process.env.NODE_ENV === "production" ? F(14) : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");
      const [y = {}, x = [], O = void 0] = typeof n.extraReducers == "function" ? Zf(n.extraReducers) : [n.extraReducers], _ = {
        ...y,
        ...s.sliceCaseReducersByType
      };
      return cy(n.initialState, (S) => {
        for (let N in _)
          S.addCase(N, _[N]);
        for (let N of s.sliceMatchers)
          S.addMatcher(N.matcher, N.reducer);
        for (let N of x)
          S.addMatcher(N.matcher, N.reducer);
        O && S.addDefaultCase(O);
      });
    }
    const f = (y) => y, d = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new WeakMap();
    let p;
    function m(y, x) {
      return p || (p = l()), p(y, x);
    }
    function v() {
      return p || (p = l()), p.getInitialState();
    }
    function g(y, x = !1) {
      function O(S) {
        let N = S[y];
        if (typeof N > "u") {
          if (x)
            N = Nn(h, O, v);
          else if (process.env.NODE_ENV !== "production")
            throw new Error(process.env.NODE_ENV === "production" ? F(15) : "selectSlice returned undefined for an uninjected slice reducer");
        }
        return N;
      }
      function _(S = f) {
        const N = Nn(d, x, () => /* @__PURE__ */ new WeakMap());
        return Nn(N, S, () => {
          const I = {};
          for (const [D, T] of Object.entries(n.selectors ?? {}))
            I[D] = vy(T, S, () => Nn(h, S, v), x);
          return I;
        });
      }
      return {
        reducerPath: y,
        getSelectors: _,
        get selectors() {
          return _(O);
        },
        selectSlice: O
      };
    }
    const w = {
      name: i,
      reducer: m,
      actions: s.actionCreators,
      caseReducers: s.sliceCaseReducersByName,
      getInitialState: v,
      ...g(a),
      injectInto(y, {
        reducerPath: x,
        ...O
      } = {}) {
        const _ = x ?? a;
        return y.inject({
          reducerPath: _,
          reducer: m
        }, O), {
          ...w,
          ...g(_, !0)
        };
      }
    };
    return w;
  };
}
function vy(e, t, r, n) {
  function i(a, ...o) {
    let u = t(a);
    if (typeof u > "u") {
      if (n)
        u = r();
      else if (process.env.NODE_ENV !== "production")
        throw new Error(process.env.NODE_ENV === "production" ? F(16) : "selectState returned undefined for an uninjected slice reducer");
    }
    return e(u, ...o);
  }
  return i.unwrapped = e, i;
}
var xr = /* @__PURE__ */ py();
function my() {
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
function gy({
  type: e,
  reducerName: t,
  createNotation: r
}, n, i) {
  let a, o;
  if ("reducer" in n) {
    if (r && !by(n))
      throw new Error(process.env.NODE_ENV === "production" ? F(17) : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");
    a = n.reducer, o = n.prepare;
  } else
    a = n;
  i.addCase(e, a).exposeCaseReducer(t, a).exposeAction(t, o ? hr(e, o) : hr(e));
}
function yy(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function by(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function wy({
  type: e,
  reducerName: t
}, r, n, i) {
  if (!i)
    throw new Error(process.env.NODE_ENV === "production" ? F(18) : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");
  const {
    payloadCreator: a,
    fulfilled: o,
    pending: u,
    rejected: s,
    settled: c,
    options: l
  } = r, f = i(e, a, l);
  n.exposeAction(t, f), o && n.addCase(f.fulfilled, o), u && n.addCase(f.pending, u), s && n.addCase(f.rejected, s), c && n.addMatcher(f.settled, c), n.exposeCaseReducer(t, {
    fulfilled: o || Dn,
    pending: u || Dn,
    rejected: s || Dn,
    settled: c || Dn
  });
}
function Dn() {
}
var _y = "task", Qf = "listener", Jf = "completed", Bo = "cancelled", xy = `task-${Bo}`, Oy = `task-${Jf}`, eo = `${Qf}-${Bo}`, Py = `${Qf}-${Jf}`, Bi = class {
  constructor(e) {
    this.code = e, this.message = `${_y} ${Bo} (reason: ${e})`;
  }
  code;
  name = "TaskAbortError";
  message;
}, Uo = (e, t) => {
  if (typeof e != "function")
    throw new TypeError(process.env.NODE_ENV === "production" ? F(32) : `${t} is not a function`);
}, ii = () => {
}, ed = (e, t = ii) => (e.catch(t), e), td = (e, t) => (e.addEventListener("abort", t, {
  once: !0
}), () => e.removeEventListener("abort", t)), zt = (e) => {
  if (e.aborted)
    throw new Bi(e.reason);
};
function rd(e, t) {
  let r = ii;
  return new Promise((n, i) => {
    const a = () => i(new Bi(e.reason));
    if (e.aborted) {
      a();
      return;
    }
    r = td(e, a), t.finally(() => r()).then(n, i);
  }).finally(() => {
    r = ii;
  });
}
var Ey = async (e, t) => {
  try {
    return await Promise.resolve(), {
      status: "ok",
      value: await e()
    };
  } catch (r) {
    return {
      status: r instanceof Bi ? "cancelled" : "rejected",
      error: r
    };
  } finally {
    t?.();
  }
}, ai = (e) => (t) => ed(rd(e, t).then((r) => (zt(e), r))), nd = (e) => {
  const t = ai(e);
  return (r) => t(new Promise((n) => setTimeout(n, r)));
}, {
  assign: ur
} = Object, ws = {}, sn = "listenerMiddleware", Sy = (e, t) => {
  const r = (n) => td(e, () => n.abort(e.reason));
  return (n, i) => {
    Uo(n, "taskExecutor");
    const a = new AbortController();
    r(a);
    const o = Ey(async () => {
      zt(e), zt(a.signal);
      const u = await n({
        pause: ai(a.signal),
        delay: nd(a.signal),
        signal: a.signal
      });
      return zt(a.signal), u;
    }, () => a.abort(Oy));
    return i?.autoJoin && t.push(o.catch(ii)), {
      result: ai(e)(o),
      cancel() {
        a.abort(xy);
      }
    };
  };
}, Ay = (e, t) => {
  const r = async (n, i) => {
    zt(t);
    let a = () => {
    };
    const u = [new Promise((s, c) => {
      let l = e({
        predicate: n,
        effect: (f, d) => {
          d.unsubscribe(), s([f, d.getState(), d.getOriginalState()]);
        }
      });
      a = () => {
        l(), c();
      };
    })];
    i != null && u.push(new Promise((s) => setTimeout(s, i, null)));
    try {
      const s = await rd(t, Promise.race(u));
      return zt(t), s;
    } finally {
      a();
    }
  };
  return ((n, i) => ed(r(n, i)));
}, id = (e) => {
  let {
    type: t,
    actionCreator: r,
    matcher: n,
    predicate: i,
    effect: a
  } = e;
  if (t)
    i = hr(t).match;
  else if (r)
    t = r.type, i = r.match;
  else if (n)
    i = n;
  else if (!i) throw new Error(process.env.NODE_ENV === "production" ? F(21) : "Creating or removing a listener requires one of the known fields for matching an action");
  return Uo(a, "options.listener"), {
    predicate: i,
    type: t,
    effect: a
  };
}, ad = /* @__PURE__ */ ur((e) => {
  const {
    type: t,
    predicate: r,
    effect: n
  } = id(e);
  return {
    id: fy(),
    effect: n,
    type: t,
    predicate: r,
    pending: /* @__PURE__ */ new Set(),
    unsubscribe: () => {
      throw new Error(process.env.NODE_ENV === "production" ? F(22) : "Unsubscribe not initialized");
    }
  };
}, {
  withTypes: () => ad
}), _s = (e, t) => {
  const {
    type: r,
    effect: n,
    predicate: i
  } = id(t);
  return Array.from(e.values()).find((a) => (typeof r == "string" ? a.type === r : a.predicate === i) && a.effect === n);
}, to = (e) => {
  e.pending.forEach((t) => {
    t.abort(eo);
  });
}, My = (e, t) => () => {
  for (const r of t.keys())
    to(r);
  e.clear();
}, xs = (e, t, r) => {
  try {
    e(t, r);
  } catch (n) {
    setTimeout(() => {
      throw n;
    }, 0);
  }
}, od = /* @__PURE__ */ ur(/* @__PURE__ */ hr(`${sn}/add`), {
  withTypes: () => od
}), Ny = /* @__PURE__ */ hr(`${sn}/removeAll`), ud = /* @__PURE__ */ ur(/* @__PURE__ */ hr(`${sn}/remove`), {
  withTypes: () => ud
}), Cy = (...e) => {
  console.error(`${sn}/error`, ...e);
}, oS = (e = {}) => {
  const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), n = (h) => {
    const p = r.get(h) ?? 0;
    r.set(h, p + 1);
  }, i = (h) => {
    const p = r.get(h) ?? 1;
    p === 1 ? r.delete(h) : r.set(h, p - 1);
  }, {
    extra: a,
    onError: o = Cy
  } = e;
  Uo(o, "onError");
  const u = (h) => (h.unsubscribe = () => t.delete(h.id), t.set(h.id, h), (p) => {
    h.unsubscribe(), p?.cancelActive && to(h);
  }), s = ((h) => {
    const p = _s(t, h) ?? ad(h);
    return u(p);
  });
  ur(s, {
    withTypes: () => s
  });
  const c = (h) => {
    const p = _s(t, h);
    return p && (p.unsubscribe(), h.cancelActive && to(p)), !!p;
  };
  ur(c, {
    withTypes: () => c
  });
  const l = async (h, p, m, v) => {
    const g = new AbortController(), w = Ay(s, g.signal), y = [];
    try {
      h.pending.add(g), n(h), await Promise.resolve(h.effect(
        p,
        // Use assign() rather than ... to avoid extra helper functions added to bundle
        ur({}, m, {
          getOriginalState: v,
          condition: (x, O) => w(x, O).then(Boolean),
          take: w,
          delay: nd(g.signal),
          pause: ai(g.signal),
          extra: a,
          signal: g.signal,
          fork: Sy(g.signal, y),
          unsubscribe: h.unsubscribe,
          subscribe: () => {
            t.set(h.id, h);
          },
          cancelActiveListeners: () => {
            h.pending.forEach((x, O, _) => {
              x !== g && (x.abort(eo), _.delete(x));
            });
          },
          cancel: () => {
            g.abort(eo), h.pending.delete(g);
          },
          throwIfCancelled: () => {
            zt(g.signal);
          }
        })
      ));
    } catch (x) {
      x instanceof Bi || xs(o, x, {
        raisedBy: "effect"
      });
    } finally {
      await Promise.all(y), g.abort(Py), i(h), h.pending.delete(g);
    }
  }, f = My(t, r);
  return {
    middleware: (h) => (p) => (m) => {
      if (!Ro(m))
        return p(m);
      if (od.match(m))
        return s(m.payload);
      if (Ny.match(m)) {
        f();
        return;
      }
      if (ud.match(m))
        return c(m.payload);
      let v = h.getState();
      const g = () => {
        if (v === ws)
          throw new Error(process.env.NODE_ENV === "production" ? F(23) : `${sn}: getOriginalState can only be called synchronously`);
        return v;
      };
      let w;
      try {
        if (w = p(m), t.size > 0) {
          const y = h.getState(), x = Array.from(t.values());
          for (const O of x) {
            let _ = !1;
            try {
              _ = O.predicate(m, y, v);
            } catch (S) {
              _ = !1, xs(o, S, {
                raisedBy: "predicate"
              });
            }
            _ && l(O, m, h, g);
          }
        }
      } finally {
        v = ws;
      }
      return w;
    },
    startListening: s,
    stopListening: c,
    clearListeners: f
  };
};
function F(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var Dy = {
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
}, sd = xr({
  name: "chartLayout",
  initialState: Dy,
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
  setMargin: uS,
  setLayout: sS,
  setChartSize: Iy,
  setScale: cS
} = sd.actions, lS = sd.reducer;
function cd(e, t, r) {
  return Array.isArray(e) && e && t + r !== 0 ? e.slice(t, r + 1) : e;
}
function U(e) {
  return Number.isFinite(e);
}
function pr(e) {
  return typeof e == "number" && e > 0 && Number.isFinite(e);
}
function Os(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function or(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Os(Object(r), !0).forEach(function(n) {
      Ty(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Os(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Ty(e, t, r) {
  return (t = ky(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function ky(e) {
  var t = jy(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function jy(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function we(e, t, r) {
  return fr(e) || fr(t) ? r : Vt(t) ? rn(e, t, r) : typeof t == "function" ? t(e) : r;
}
var $y = (e, t, r) => {
  if (t && r) {
    var {
      width: n,
      height: i
    } = r, {
      align: a,
      verticalAlign: o,
      layout: u
    } = t;
    if ((u === "vertical" || u === "horizontal" && o === "middle") && a !== "center" && k(e[a]))
      return or(or({}, e), {}, {
        [a]: e[a] + (n || 0)
      });
    if ((u === "horizontal" || u === "vertical" && a === "center") && o !== "middle" && k(e[o]))
      return or(or({}, e), {}, {
        [o]: e[o] + (i || 0)
      });
  }
  return e;
}, bt = (e, t) => e === "horizontal" && t === "xAxis" || e === "vertical" && t === "yAxis" || e === "centric" && t === "angleAxis" || e === "radial" && t === "radiusAxis", fS = (e, t, r, n) => {
  if (n)
    return e.map((u) => u.coordinate);
  var i, a, o = e.map((u) => (u.coordinate === t && (i = !0), u.coordinate === r && (a = !0), u.coordinate));
  return i || o.push(t), a || o.push(r), o;
}, dS = (e, t, r) => {
  if (!e)
    return null;
  var {
    duplicateDomain: n,
    type: i,
    range: a,
    scale: o,
    realScaleType: u,
    isCategorical: s,
    categoricalDomain: c,
    tickCount: l,
    ticks: f,
    niceTicks: d,
    axisType: h
  } = e;
  if (!o)
    return null;
  var p = u === "scaleBand" && o.bandwidth ? o.bandwidth() / 2 : 2, m = i === "category" && o.bandwidth ? o.bandwidth() / p : 0;
  if (m = h === "angleAxis" && a && a.length >= 2 ? qe(a[0] - a[1]) * 2 * m : m, f || d) {
    var v = (f || d || []).map((g, w) => {
      var y = n ? n.indexOf(g) : g, x = o.map(y);
      return U(x) ? {
        // If the scaleContent is not a number, the coordinate will be NaN.
        // That could be the case for example with a PointScale and a string as domain.
        coordinate: x + m,
        value: g,
        offset: m,
        index: w
      } : null;
    }).filter(ye);
    return v;
  }
  return s && c ? c.map((g, w) => {
    var y = o.map(g);
    return U(y) ? {
      coordinate: y + m,
      value: g,
      index: w,
      offset: m
    } : null;
  }).filter(ye) : o.ticks && l != null ? o.ticks(l).map((g, w) => {
    var y = o.map(g);
    return U(y) ? {
      coordinate: y + m,
      value: g,
      index: w,
      offset: m
    } : null;
  }).filter(ye) : o.domain().map((g, w) => {
    var y = o.map(g);
    return U(y) ? {
      coordinate: y + m,
      // @ts-expect-error can't use Date as an index
      value: n ? n[g] : g,
      index: w,
      offset: m
    } : null;
  }).filter(ye);
}, Ry = (e) => {
  var t, r = e.length;
  if (!(r <= 0)) {
    var n = (t = e[0]) === null || t === void 0 ? void 0 : t.length;
    if (!(n == null || n <= 0))
      for (var i = 0; i < n; ++i)
        for (var a = 0, o = 0, u = 0; u < r; ++u) {
          var s = e[u], c = s?.[i];
          if (c != null) {
            var l = c[1], f = c[0], d = Gt(l) ? f : l;
            d >= 0 ? (c[0] = a, a += d, c[1] = a) : (c[0] = o, o += d, c[1] = o);
          }
        }
  }
}, Ly = (e) => {
  var t, r = e.length;
  if (!(r <= 0)) {
    var n = (t = e[0]) === null || t === void 0 ? void 0 : t.length;
    if (!(n == null || n <= 0))
      for (var i = 0; i < n; ++i)
        for (var a = 0, o = 0; o < r; ++o) {
          var u = e[o], s = u?.[i];
          if (s != null) {
            var c = Gt(s[1]) ? s[0] : s[1];
            c >= 0 ? (s[0] = a, a += c, s[1] = a) : (s[0] = 0, s[1] = 0);
          }
        }
  }
}, zy = {
  sign: Ry,
  // @ts-expect-error definitelytyped types are incorrect
  expand: Cv,
  // @ts-expect-error definitelytyped types are incorrect
  none: Ut,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: Dv,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: Iv,
  positive: Ly
}, Fy = (e, t, r) => {
  var n, i = (n = zy[r]) !== null && n !== void 0 ? n : Ut, a = Nv().keys(t).value((u, s) => Number(we(u, s, 0))).order(za).offset(i), o = a(e);
  return o.forEach((u, s) => {
    u.forEach((c, l) => {
      var f = we(e[l], t[s], 0);
      Array.isArray(f) && f.length === 2 && k(f[0]) && k(f[1]) && (c[0] = f[0], c[1] = f[1]);
    });
  }), o;
};
function hS(e) {
  return e == null ? void 0 : String(e);
}
function pS(e) {
  var {
    axis: t,
    ticks: r,
    bandSize: n,
    entry: i,
    index: a,
    dataKey: o
  } = e;
  if (t.type === "category") {
    if (!t.allowDuplicatedCategory && t.dataKey && !fr(i[t.dataKey])) {
      var u = lf(r, "value", i[t.dataKey]);
      if (u)
        return u.coordinate + n / 2;
    }
    return r != null && r[a] ? r[a].coordinate + n / 2 : null;
  }
  var s = we(i, fr(o) ? t.dataKey : o), c = t.scale.map(s);
  return k(c) ? c : null;
}
var By = (e) => {
  var t = e.flat(2).filter(k);
  return [Math.min(...t), Math.max(...t)];
}, Uy = (e) => [e[0] === 1 / 0 ? 0 : e[0], e[1] === -1 / 0 ? 0 : e[1]], Vy = (e, t, r) => {
  if (e != null)
    return Uy(Object.keys(e).reduce((n, i) => {
      var a = e[i];
      if (!a)
        return n;
      var {
        stackedData: o
      } = a, u = o.reduce((s, c) => {
        var l = cd(c, t, r), f = By(l);
        return !U(f[0]) || !U(f[1]) ? s : [Math.min(s[0], f[0]), Math.max(s[1], f[1])];
      }, [1 / 0, -1 / 0]);
      return [Math.min(u[0], n[0]), Math.max(u[1], n[1])];
    }, [1 / 0, -1 / 0]));
}, Ps = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Es = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Ss = (e, t, r) => {
  if (e && e.scale && e.scale.bandwidth) {
    var n = e.scale.bandwidth();
    if (!r || n > 0)
      return n;
  }
  if (e && t && t.length >= 2) {
    for (var i = Ti(t, (l) => l.coordinate), a = 1 / 0, o = 1, u = i.length; o < u; o++) {
      var s = i[o], c = i[o - 1];
      a = Math.min((s?.coordinate || 0) - (c?.coordinate || 0), a);
    }
    return a === 1 / 0 ? 0 : a;
  }
  return r ? void 0 : 0;
};
function As(e) {
  var {
    tooltipEntrySettings: t,
    dataKey: r,
    payload: n,
    value: i,
    name: a
  } = e;
  return or(or({}, t), {}, {
    dataKey: r,
    payload: n,
    value: i,
    name: a
  });
}
function vS(e, t) {
  if (e)
    return String(e);
  if (typeof t == "string")
    return t;
}
var Wy = (e, t) => {
  if (t === "horizontal")
    return e.relativeX;
  if (t === "vertical")
    return e.relativeY;
}, Ky = (e, t) => t === "centric" ? e.angle : e.radius, wt = (e) => e.layout.width, _t = (e) => e.layout.height, mS = (e) => e.layout.scale, ld = (e) => e.layout.margin, Ui = b((e) => e.cartesianAxis.xAxis, (e) => Object.values(e)), Vi = b((e) => e.cartesianAxis.yAxis, (e) => Object.values(e)), gS = "data-recharts-item-index", yS = "data-recharts-item-id", cn = 60;
function Ms(e, t) {
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
    t % 2 ? Ms(Object(r), !0).forEach(function(n) {
      qy(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ms(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function qy(e, t, r) {
  return (t = Hy(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Hy(e) {
  var t = Yy(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Yy(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Gy = (e) => e.brush.height;
function Xy(e) {
  var t = Vi(e);
  return t.reduce((r, n) => {
    if (n.orientation === "left" && !n.mirror && !n.hide) {
      var i = typeof n.width == "number" ? n.width : cn;
      return r + i;
    }
    return r;
  }, 0);
}
function Zy(e) {
  var t = Vi(e);
  return t.reduce((r, n) => {
    if (n.orientation === "right" && !n.mirror && !n.hide) {
      var i = typeof n.width == "number" ? n.width : cn;
      return r + i;
    }
    return r;
  }, 0);
}
function Qy(e) {
  var t = Ui(e);
  return t.reduce((r, n) => n.orientation === "top" && !n.mirror && !n.hide ? r + n.height : r, 0);
}
function Jy(e) {
  var t = Ui(e);
  return t.reduce((r, n) => n.orientation === "bottom" && !n.mirror && !n.hide ? r + n.height : r, 0);
}
var pe = b([wt, _t, ld, Gy, Xy, Zy, Qy, Jy, Cf, gg], (e, t, r, n, i, a, o, u, s, c) => {
  var l = {
    left: (r.left || 0) + i,
    right: (r.right || 0) + a
  }, f = {
    top: (r.top || 0) + o,
    bottom: (r.bottom || 0) + u
  }, d = In(In({}, f), l), h = d.bottom;
  d.bottom += n, d = $y(d, s, c);
  var p = e - d.left - d.right, m = t - d.top - d.bottom;
  return In(In({
    brushBottom: h
  }, d), {}, {
    // never return negative values for height and width
    width: Math.max(p, 0),
    height: Math.max(m, 0)
  });
}), e0 = b(pe, (e) => ({
  x: e.left,
  y: e.top,
  width: e.width,
  height: e.height
})), bS = b(wt, _t, (e, t) => ({
  x: 0,
  y: 0,
  width: e,
  height: t
})), t0 = /* @__PURE__ */ wr(null), Vo = () => Yt(t0) != null, Wi = (e) => e.brush, Wo = b([Wi, pe, ld], (e, t, r) => ({
  height: e.height,
  x: k(e.x) ? e.x : t.left,
  y: k(e.y) ? e.y : t.top + t.height + t.brushBottom - (r?.bottom || 0),
  width: k(e.width) ? e.width : t.width
}));
function r0(e, t, { signal: r, edges: n } = {}) {
  let i, a = null;
  const o = n != null && n.includes("leading"), u = n == null || n.includes("trailing"), s = () => {
    a !== null && (e.apply(i, a), i = void 0, a = null);
  }, c = () => {
    u && s(), h();
  };
  let l = null;
  const f = () => {
    l != null && clearTimeout(l), l = setTimeout(() => {
      l = null, c();
    }, t);
  }, d = () => {
    l !== null && (clearTimeout(l), l = null);
  }, h = () => {
    d(), i = void 0, a = null;
  }, p = () => {
    s();
  }, m = function(...v) {
    if (r?.aborted) return;
    i = this, a = v;
    const g = l == null;
    f(), o && g && s();
  };
  return m.schedule = f, m.cancel = h, m.flush = p, r?.addEventListener("abort", h, { once: !0 }), m;
}
function n0(e, t = 0, r = {}) {
  typeof r != "object" && (r = {});
  const { leading: n = !1, trailing: i = !0, maxWait: a } = r, o = Array(2);
  n && (o[0] = "leading"), i && (o[1] = "trailing");
  let u, s = null;
  const c = r0(function(...d) {
    u = e.apply(this, d), s = null;
  }, t, { edges: o }), l = function(...d) {
    return a != null && (s === null && (s = Date.now()), Date.now() - s >= a) ? (u = e.apply(this, d), s = Date.now(), c.cancel(), c.schedule(), u) : (c.apply(this, d), u);
  }, f = () => (c.flush(), u);
  return l.cancel = c.cancel, l.flush = f, l;
}
function i0(e, t = 0, r = {}) {
  const { leading: n = !0, trailing: i = !0 } = r;
  return n0(e, t, {
    leading: n,
    maxWait: t,
    trailing: i
  });
}
var Ns = function(t, r) {
  for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++)
    i[a - 2] = arguments[a];
  if (typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
    if (r === void 0)
      console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      var o = 0;
      console.warn(r.replace(/%s/g, () => i[o++]));
    }
}, Ye = {
  width: "100%",
  height: "100%",
  debounce: 0,
  minWidth: 0,
  initialDimension: {
    width: -1,
    height: -1
  }
}, fd = (e, t, r) => {
  var {
    width: n = Ye.width,
    height: i = Ye.height,
    aspect: a,
    maxHeight: o
  } = r, u = Fr(n) ? e : Number(n), s = Fr(i) ? t : Number(i);
  return a && a > 0 && (u ? s = u / a : s && (u = s * a), o && s != null && s > o && (s = o)), {
    calculatedWidth: u,
    calculatedHeight: s
  };
}, a0 = {
  width: 0,
  height: 0,
  overflow: "visible"
}, o0 = {
  width: 0,
  overflowX: "visible"
}, u0 = {
  height: 0,
  overflowY: "visible"
}, s0 = {}, c0 = (e) => {
  var {
    width: t,
    height: r
  } = e, n = Fr(t), i = Fr(r);
  return n && i ? a0 : n ? o0 : i ? u0 : s0;
};
function l0(e) {
  var {
    width: t,
    height: r,
    aspect: n
  } = e, i = t, a = r;
  return i === void 0 && a === void 0 ? (i = Ye.width, a = Ye.height) : i === void 0 ? i = n && n > 0 ? void 0 : Ye.width : a === void 0 && (a = n && n > 0 ? void 0 : Ye.height), {
    width: i,
    height: a
  };
}
function ro() {
  return ro = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ro.apply(null, arguments);
}
function Cs(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ds(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Cs(Object(r), !0).forEach(function(n) {
      f0(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Cs(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function f0(e, t, r) {
  return (t = d0(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function d0(e) {
  var t = h0(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function h0(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var dd = /* @__PURE__ */ wr(Ye.initialDimension);
function p0(e) {
  return pr(e.width) && pr(e.height);
}
function hd(e) {
  var {
    children: t,
    width: r,
    height: n
  } = e, i = Ni(() => ({
    width: r,
    height: n
  }), [r, n]);
  return p0(i) ? /* @__PURE__ */ A.createElement(dd.Provider, {
    value: i
  }, t) : null;
}
var pd = () => Yt(dd), v0 = /* @__PURE__ */ Mo((e, t) => {
  var {
    aspect: r,
    initialDimension: n = Ye.initialDimension,
    width: i,
    height: a,
    /*
     * default min-width to 0 if not specified - 'auto' causes issues with flexbox
     * https://github.com/recharts/recharts/issues/172
     */
    minWidth: o = Ye.minWidth,
    minHeight: u,
    maxHeight: s,
    children: c,
    debounce: l = Ye.debounce,
    id: f,
    className: d,
    onResize: h,
    style: p = {}
  } = e, m = Ke(null), v = Ke();
  v.current = h, zp(t, () => m.current);
  var [g, w] = tn({
    containerWidth: n.width,
    containerHeight: n.height
  }), y = Bl((N, I) => {
    w((D) => {
      var T = Math.round(N), E = Math.round(I);
      return D.containerWidth === T && D.containerHeight === E ? D : {
        containerWidth: T,
        containerHeight: E
      };
    });
  }, []);
  Ae(() => {
    if (m.current == null || typeof ResizeObserver > "u")
      return an;
    var N = (E) => {
      var W, B = E[0];
      if (B != null) {
        var {
          width: G,
          height: re
        } = B.contentRect;
        y(G, re), (W = v.current) === null || W === void 0 || W.call(v, G, re);
      }
    };
    l > 0 && (N = i0(N, l, {
      trailing: !0,
      leading: !1
    }));
    var I = new ResizeObserver(N), {
      width: D,
      height: T
    } = m.current.getBoundingClientRect();
    return y(D, T), I.observe(m.current), () => {
      I.disconnect();
    };
  }, [y, l]);
  var {
    containerWidth: x,
    containerHeight: O
  } = g;
  Ns(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
  var {
    calculatedWidth: _,
    calculatedHeight: S
  } = fd(x, O, {
    width: i,
    height: a,
    aspect: r,
    maxHeight: s
  });
  return Ns(_ != null && _ > 0 || S != null && S > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, _, S, i, a, o, u, r), /* @__PURE__ */ A.createElement("div", {
    id: f ? "".concat(f) : void 0,
    className: je("recharts-responsive-container", d),
    style: Ds(Ds({}, p), {}, {
      width: i,
      height: a,
      minWidth: o,
      minHeight: u,
      maxHeight: s
    }),
    ref: m
  }, /* @__PURE__ */ A.createElement("div", {
    style: c0({
      width: i,
      height: a
    })
  }, /* @__PURE__ */ A.createElement(hd, {
    width: _,
    height: S
  }, c)));
}), m0 = /* @__PURE__ */ Mo((e, t) => {
  var r = pd();
  if (pr(r.width) && pr(r.height))
    return e.children;
  var {
    width: n,
    height: i
  } = l0({
    width: e.width,
    height: e.height,
    aspect: e.aspect
  }), {
    calculatedWidth: a,
    calculatedHeight: o
  } = fd(void 0, void 0, {
    width: n,
    height: i,
    aspect: e.aspect,
    maxHeight: e.maxHeight
  });
  return k(a) && k(o) ? /* @__PURE__ */ A.createElement(hd, {
    width: a,
    height: o
  }, e.children) : /* @__PURE__ */ A.createElement(v0, ro({}, e, {
    width: n,
    height: i,
    ref: t
  }));
});
function wS(e) {
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
var Ko = () => {
  var e, t = Vo(), r = R(e0), n = R(Wo), i = (e = R(Wi)) === null || e === void 0 ? void 0 : e.padding;
  return !t || !n || !i ? r : {
    width: n.width - i.left - i.right,
    height: n.height - i.top - i.bottom,
    x: i.left,
    y: i.top
  };
}, g0 = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 0,
  height: 0,
  brushBottom: 0
}, y0 = () => {
  var e;
  return (e = R(pe)) !== null && e !== void 0 ? e : g0;
}, b0 = () => R(wt), w0 = () => R(_t), _0 = () => R((e) => e.layout.margin), Q = (e) => e.layout.layoutType, ln = () => R(Q), _S = () => {
  var e = ln();
  if (e === "horizontal" || e === "vertical")
    return e;
}, vd = (e) => {
  var t = e.layout.layoutType;
  if (t === "centric" || t === "radial")
    return t;
}, x0 = () => {
  var e = ln();
  return e !== void 0;
}, xS = (e) => {
  var t = yt(), r = Vo(), {
    width: n,
    height: i
  } = e, a = pd(), o = n, u = i;
  return a && (o = a.width > 0 ? a.width : n, u = a.height > 0 ? a.height : i), Ae(() => {
    !r && pr(o) && pr(u) && t(Iy({
      width: o,
      height: u
    }));
  }, [t, r, o, u]), null;
}, md = Symbol.for("immer-nothing"), Is = Symbol.for("immer-draftable"), Me = Symbol.for("immer-state"), O0 = process.env.NODE_ENV !== "production" ? [
  // All error codes, starting by 0:
  function(e) {
    return `The plugin for '${e}' has not been loaded into Immer. To enable the plugin, import and call \`enable${e}()\` when initializing your application.`;
  },
  function(e) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${e}'`;
  },
  "This object has been frozen and should not be mutated",
  function(e) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + e;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(e) {
    return `'current' expects a draft, got: ${e}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(e) {
    return `'original' expects a draft, got: ${e}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : [];
function ge(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const r = O0[e], n = typeof r == "function" ? r.apply(null, t) : r;
    throw new Error(`[Immer] ${n}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var Kr = Object.getPrototypeOf;
function vr(e) {
  return !!e && !!e[Me];
}
function Kt(e) {
  return e ? gd(e) || Array.isArray(e) || !!e[Is] || !!e.constructor?.[Is] || fn(e) || qi(e) : !1;
}
var P0 = Object.prototype.constructor.toString(), Ts = /* @__PURE__ */ new WeakMap();
function gd(e) {
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
  let n = Ts.get(r);
  return n === void 0 && (n = Function.toString.call(r), Ts.set(r, n)), n === P0;
}
function oi(e, t, r = !0) {
  Ki(e) === 0 ? (r ? Reflect.ownKeys(e) : Object.keys(e)).forEach((i) => {
    t(i, e[i], e);
  }) : e.forEach((n, i) => t(i, n, e));
}
function Ki(e) {
  const t = e[Me];
  return t ? t.type_ : Array.isArray(e) ? 1 : fn(e) ? 2 : qi(e) ? 3 : 0;
}
function no(e, t) {
  return Ki(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function yd(e, t, r) {
  const n = Ki(e);
  n === 2 ? e.set(t, r) : n === 3 ? e.add(r) : e[t] = r;
}
function E0(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function fn(e) {
  return e instanceof Map;
}
function qi(e) {
  return e instanceof Set;
}
function Ct(e) {
  return e.copy_ || e.base_;
}
function io(e, t) {
  if (fn(e))
    return new Map(e);
  if (qi(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  const r = gd(e);
  if (t === !0 || t === "class_only" && !r) {
    const n = Object.getOwnPropertyDescriptors(e);
    delete n[Me];
    let i = Reflect.ownKeys(n);
    for (let a = 0; a < i.length; a++) {
      const o = i[a], u = n[o];
      u.writable === !1 && (u.writable = !0, u.configurable = !0), (u.get || u.set) && (n[o] = {
        configurable: !0,
        writable: !0,
        // could live with !!desc.set as well here...
        enumerable: u.enumerable,
        value: e[o]
      });
    }
    return Object.create(Kr(e), n);
  } else {
    const n = Kr(e);
    if (n !== null && r)
      return { ...e };
    const i = Object.create(n);
    return Object.assign(i, e);
  }
}
function qo(e, t = !1) {
  return Hi(e) || vr(e) || !Kt(e) || (Ki(e) > 1 && Object.defineProperties(e, {
    set: Tn,
    add: Tn,
    clear: Tn,
    delete: Tn
  }), Object.freeze(e), t && Object.values(e).forEach((r) => qo(r, !0))), e;
}
function S0() {
  ge(2);
}
var Tn = {
  value: S0
};
function Hi(e) {
  return e === null || typeof e != "object" ? !0 : Object.isFrozen(e);
}
var A0 = {};
function qt(e) {
  const t = A0[e];
  return t || ge(0, e), t;
}
var qr;
function bd() {
  return qr;
}
function M0(e, t) {
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
function ks(e, t) {
  t && (qt("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function ao(e) {
  oo(e), e.drafts_.forEach(N0), e.drafts_ = null;
}
function oo(e) {
  e === qr && (qr = e.parent_);
}
function js(e) {
  return qr = M0(qr, e);
}
function N0(e) {
  const t = e[Me];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function $s(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  return e !== void 0 && e !== r ? (r[Me].modified_ && (ao(t), ge(4)), Kt(e) && (e = ui(t, e), t.parent_ || si(t, e)), t.patches_ && qt("Patches").generateReplacementPatches_(
    r[Me].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = ui(t, r, []), ao(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== md ? e : void 0;
}
function ui(e, t, r) {
  if (Hi(t))
    return t;
  const n = e.immer_.shouldUseStrictIteration(), i = t[Me];
  if (!i)
    return oi(
      t,
      (a, o) => Rs(e, i, t, a, o, r),
      n
    ), t;
  if (i.scope_ !== e)
    return t;
  if (!i.modified_)
    return si(e, i.base_, !0), i.base_;
  if (!i.finalized_) {
    i.finalized_ = !0, i.scope_.unfinalizedDrafts_--;
    const a = i.copy_;
    let o = a, u = !1;
    i.type_ === 3 && (o = new Set(a), a.clear(), u = !0), oi(
      o,
      (s, c) => Rs(
        e,
        i,
        a,
        s,
        c,
        r,
        u
      ),
      n
    ), si(e, a, !1), r && e.patches_ && qt("Patches").generatePatches_(
      i,
      r,
      e.patches_,
      e.inversePatches_
    );
  }
  return i.copy_;
}
function Rs(e, t, r, n, i, a, o) {
  if (i == null || typeof i != "object" && !o)
    return;
  const u = Hi(i);
  if (!(u && !o)) {
    if (process.env.NODE_ENV !== "production" && i === r && ge(5), vr(i)) {
      const s = a && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
      !no(t.assigned_, n) ? a.concat(n) : void 0, c = ui(e, i, s);
      if (yd(r, n, c), vr(c))
        e.canAutoFreeze_ = !1;
      else
        return;
    } else o && r.add(i);
    if (Kt(i) && !u) {
      if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1 || t && t.base_ && t.base_[n] === i && u)
        return;
      ui(e, i), (!t || !t.scope_.parent_) && typeof n != "symbol" && (fn(r) ? r.has(n) : Object.prototype.propertyIsEnumerable.call(r, n)) && si(e, i);
    }
  }
}
function si(e, t, r = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && qo(t, r);
}
function C0(e, t) {
  const r = Array.isArray(e), n = {
    type_: r ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : bd(),
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
  let i = n, a = Ho;
  r && (i = [n], a = Hr);
  const { revoke: o, proxy: u } = Proxy.revocable(i, a);
  return n.draft_ = u, n.revoke_ = o, u;
}
var Ho = {
  get(e, t) {
    if (t === Me)
      return e;
    const r = Ct(e);
    if (!no(r, t))
      return D0(e, r, t);
    const n = r[t];
    return e.finalized_ || !Kt(n) ? n : n === ba(e.base_, t) ? (wa(e), e.copy_[t] = so(n, e)) : n;
  },
  has(e, t) {
    return t in Ct(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(Ct(e));
  },
  set(e, t, r) {
    const n = wd(Ct(e), t);
    if (n?.set)
      return n.set.call(e.draft_, r), !0;
    if (!e.modified_) {
      const i = ba(Ct(e), t), a = i?.[Me];
      if (a && a.base_ === r)
        return e.copy_[t] = r, e.assigned_[t] = !1, !0;
      if (E0(r, i) && (r !== void 0 || no(e.base_, t)))
        return !0;
      wa(e), uo(e);
    }
    return e.copy_[t] === r && // special case: handle new props with value 'undefined'
    (r !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(r) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = r, e.assigned_[t] = !0), !0;
  },
  deleteProperty(e, t) {
    return ba(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, wa(e), uo(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const r = Ct(e), n = Reflect.getOwnPropertyDescriptor(r, t);
    return n && {
      writable: !0,
      configurable: e.type_ !== 1 || t !== "length",
      enumerable: n.enumerable,
      value: r[t]
    };
  },
  defineProperty() {
    ge(11);
  },
  getPrototypeOf(e) {
    return Kr(e.base_);
  },
  setPrototypeOf() {
    ge(12);
  }
}, Hr = {};
oi(Ho, (e, t) => {
  Hr[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
Hr.deleteProperty = function(e, t) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && ge(13), Hr.set.call(this, e, t, void 0);
};
Hr.set = function(e, t, r) {
  return process.env.NODE_ENV !== "production" && t !== "length" && isNaN(parseInt(t)) && ge(14), Ho.set.call(this, e[0], t, r, e[0]);
};
function ba(e, t) {
  const r = e[Me];
  return (r ? Ct(r) : e)[t];
}
function D0(e, t, r) {
  const n = wd(t, r);
  return n ? "value" in n ? n.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    n.get?.call(e.draft_)
  ) : void 0;
}
function wd(e, t) {
  if (!(t in e))
    return;
  let r = Kr(e);
  for (; r; ) {
    const n = Object.getOwnPropertyDescriptor(r, t);
    if (n)
      return n;
    r = Kr(r);
  }
}
function uo(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && uo(e.parent_));
}
function wa(e) {
  e.copy_ || (e.copy_ = io(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var I0 = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.useStrictIteration_ = !0, this.produce = (t, r, n) => {
      if (typeof t == "function" && typeof r != "function") {
        const a = r;
        r = t;
        const o = this;
        return function(s = a, ...c) {
          return o.produce(s, (l) => r.call(this, l, ...c));
        };
      }
      typeof r != "function" && ge(6), n !== void 0 && typeof n != "function" && ge(7);
      let i;
      if (Kt(t)) {
        const a = js(this), o = so(t, void 0);
        let u = !0;
        try {
          i = r(o), u = !1;
        } finally {
          u ? ao(a) : oo(a);
        }
        return ks(a, n), $s(i, a);
      } else if (!t || typeof t != "object") {
        if (i = r(t), i === void 0 && (i = t), i === md && (i = void 0), this.autoFreeze_ && qo(i, !0), n) {
          const a = [], o = [];
          qt("Patches").generateReplacementPatches_(t, i, a, o), n(a, o);
        }
        return i;
      } else
        ge(1, t);
    }, this.produceWithPatches = (t, r) => {
      if (typeof t == "function")
        return (o, ...u) => this.produceWithPatches(o, (s) => t(s, ...u));
      let n, i;
      return [this.produce(t, r, (o, u) => {
        n = o, i = u;
      }), n, i];
    }, typeof e?.autoFreeze == "boolean" && this.setAutoFreeze(e.autoFreeze), typeof e?.useStrictShallowCopy == "boolean" && this.setUseStrictShallowCopy(e.useStrictShallowCopy), typeof e?.useStrictIteration == "boolean" && this.setUseStrictIteration(e.useStrictIteration);
  }
  createDraft(e) {
    Kt(e) || ge(8), vr(e) && (e = T0(e));
    const t = js(this), r = so(e, void 0);
    return r[Me].isManual_ = !0, oo(t), r;
  }
  finishDraft(e, t) {
    const r = e && e[Me];
    (!r || !r.isManual_) && ge(9);
    const { scope_: n } = r;
    return ks(n, t), $s(void 0, n);
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
    const n = qt("Patches").applyPatches_;
    return vr(e) ? n(e, t) : this.produce(
      e,
      (i) => n(i, t)
    );
  }
};
function so(e, t) {
  const r = fn(e) ? qt("MapSet").proxyMap_(e, t) : qi(e) ? qt("MapSet").proxySet_(e, t) : C0(e, t);
  return (t ? t.scope_ : bd()).drafts_.push(r), r;
}
function T0(e) {
  return vr(e) || ge(10, e), _d(e);
}
function _d(e) {
  if (!Kt(e) || Hi(e))
    return e;
  const t = e[Me];
  let r, n = !0;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, r = io(e, t.scope_.immer_.useStrictShallowCopy_), n = t.scope_.immer_.shouldUseStrictIteration();
  } else
    r = io(e, !0);
  return oi(
    r,
    (i, a) => {
      yd(r, i, _d(a));
    },
    n
  ), t && (t.finalized_ = !1), r;
}
var k0 = new I0();
k0.produce;
function OS(e) {
  return e;
}
var j0 = {
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
}, xd = xr({
  name: "legend",
  initialState: j0,
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
      prepare: He()
    },
    replaceLegendPayload: {
      reducer(e, t) {
        var {
          prev: r,
          next: n
        } = t.payload, i = Wr(e).payload.indexOf(r);
        i > -1 && (e.payload[i] = n);
      },
      prepare: He()
    },
    removeLegendPayload: {
      reducer(e, t) {
        var r = Wr(e).payload.indexOf(t.payload);
        r > -1 && e.payload.splice(r, 1);
      },
      prepare: He()
    }
  }
}), {
  setLegendSize: Ls,
  setLegendSettings: $0,
  addLegendPayload: PS,
  replaceLegendPayload: ES,
  removeLegendPayload: SS
} = xd.actions, AS = xd.reducer, kn = { exports: {} }, _a = {};
var zs;
function R0() {
  if (zs) return _a;
  zs = 1;
  var e = Fl;
  function t(s, c) {
    return s === c && (s !== 0 || 1 / s === 1 / c) || s !== s && c !== c;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useSyncExternalStore, i = e.useRef, a = e.useEffect, o = e.useMemo, u = e.useDebugValue;
  return _a.useSyncExternalStoreWithSelector = function(s, c, l, f, d) {
    var h = i(null);
    if (h.current === null) {
      var p = { hasValue: !1, value: null };
      h.current = p;
    } else p = h.current;
    h = o(
      function() {
        function v(O) {
          if (!g) {
            if (g = !0, w = O, O = f(O), d !== void 0 && p.hasValue) {
              var _ = p.value;
              if (d(_, O))
                return y = _;
            }
            return y = O;
          }
          if (_ = y, r(w, O)) return _;
          var S = f(O);
          return d !== void 0 && d(_, S) ? (w = O, _) : (w = O, y = S);
        }
        var g = !1, w, y, x = l === void 0 ? null : l;
        return [
          function() {
            return v(c());
          },
          x === null ? void 0 : function() {
            return v(x());
          }
        ];
      },
      [c, l, f, d]
    );
    var m = n(s, h[0], h[1]);
    return a(
      function() {
        p.hasValue = !0, p.value = m;
      },
      [m]
    ), u(m), m;
  }, _a;
}
var xa = {};
var Fs;
function L0() {
  return Fs || (Fs = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(s, c) {
      return s === c && (s !== 0 || 1 / s === 1 / c) || s !== s && c !== c;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var t = Fl, r = typeof Object.is == "function" ? Object.is : e, n = t.useSyncExternalStore, i = t.useRef, a = t.useEffect, o = t.useMemo, u = t.useDebugValue;
    xa.useSyncExternalStoreWithSelector = function(s, c, l, f, d) {
      var h = i(null);
      if (h.current === null) {
        var p = { hasValue: !1, value: null };
        h.current = p;
      } else p = h.current;
      h = o(
        function() {
          function v(O) {
            if (!g) {
              if (g = !0, w = O, O = f(O), d !== void 0 && p.hasValue) {
                var _ = p.value;
                if (d(_, O))
                  return y = _;
              }
              return y = O;
            }
            if (_ = y, r(w, O))
              return _;
            var S = f(O);
            return d !== void 0 && d(_, S) ? (w = O, _) : (w = O, y = S);
          }
          var g = !1, w, y, x = l === void 0 ? null : l;
          return [
            function() {
              return v(c());
            },
            x === null ? void 0 : function() {
              return v(x());
            }
          ];
        },
        [c, l, f, d]
      );
      var m = n(s, h[0], h[1]);
      return a(
        function() {
          p.hasValue = !0, p.value = m;
        },
        [m]
      ), u(m), m;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), xa;
}
var Bs;
function z0() {
  return Bs || (Bs = 1, process.env.NODE_ENV === "production" ? kn.exports = R0() : kn.exports = L0()), kn.exports;
}
z0();
function F0(e) {
  e();
}
function B0() {
  let e = null, t = null;
  return {
    clear() {
      e = null, t = null;
    },
    notify() {
      F0(() => {
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
var Us = {
  notify() {
  },
  get: () => []
};
function U0(e, t) {
  let r, n = Us, i = 0, a = !1;
  function o(m) {
    l();
    const v = n.subscribe(m);
    let g = !1;
    return () => {
      g || (g = !0, v(), f());
    };
  }
  function u() {
    n.notify();
  }
  function s() {
    p.onStateChange && p.onStateChange();
  }
  function c() {
    return a;
  }
  function l() {
    i++, r || (r = e.subscribe(s), n = B0());
  }
  function f() {
    i--, r && i === 0 && (r(), r = void 0, n.clear(), n = Us);
  }
  function d() {
    a || (a = !0, l());
  }
  function h() {
    a && (a = !1, f());
  }
  const p = {
    addNestedSub: o,
    notifyNestedSubs: u,
    handleChangeWrapper: s,
    isSubscribed: c,
    trySubscribe: d,
    tryUnsubscribe: h,
    getListeners: () => n
  };
  return p;
}
var V0 = () => typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", W0 = /* @__PURE__ */ V0(), K0 = () => typeof navigator < "u" && navigator.product === "ReactNative", q0 = /* @__PURE__ */ K0(), H0 = () => W0 || q0 ? A.useLayoutEffect : A.useEffect, Y0 = /* @__PURE__ */ H0();
function Vs(e, t) {
  return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function G0(e, t) {
  if (Vs(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  const r = Object.keys(e), n = Object.keys(t);
  if (r.length !== n.length) return !1;
  for (let i = 0; i < r.length; i++)
    if (!Object.prototype.hasOwnProperty.call(t, r[i]) || !Vs(e[r[i]], t[r[i]]))
      return !1;
  return !0;
}
var X0 = /* @__PURE__ */ Symbol.for("react-redux-context"), Z0 = typeof globalThis < "u" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function Q0() {
  if (!A.createContext) return {};
  const e = Z0[X0] ??= /* @__PURE__ */ new Map();
  let t = e.get(A.createContext);
  return t || (t = A.createContext(
    null
  ), process.env.NODE_ENV !== "production" && (t.displayName = "ReactRedux"), e.set(A.createContext, t)), t;
}
var J0 = /* @__PURE__ */ Q0();
function eb(e) {
  const { children: t, context: r, serverState: n, store: i } = e, a = A.useMemo(() => {
    const s = U0(i), c = {
      store: i,
      subscription: s,
      getServerState: n ? () => n : void 0
    };
    if (process.env.NODE_ENV === "production")
      return c;
    {
      const { identityFunctionCheck: l = "once", stabilityCheck: f = "once" } = e;
      return /* @__PURE__ */ Object.assign(c, {
        stabilityCheck: f,
        identityFunctionCheck: l
      });
    }
  }, [i, n]), o = A.useMemo(() => i.getState(), [i]);
  Y0(() => {
    const { subscription: s } = a;
    return s.onStateChange = s.notifyNestedSubs, s.trySubscribe(), o !== i.getState() && s.notifyNestedSubs(), () => {
      s.tryUnsubscribe(), s.onStateChange = void 0;
    };
  }, [a, o]);
  const u = r || J0;
  return /* @__PURE__ */ A.createElement(u.Provider, { value: a }, t);
}
var MS = eb, tb = /* @__PURE__ */ new Set([
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
function rb(e, t) {
  return e == null && t == null ? !0 : typeof e == "number" && typeof t == "number" ? e === t || e !== e && t !== t : e === t;
}
function nb(e, t) {
  var r = /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)]);
  for (var n of r)
    if (tb.has(n)) {
      if (e[n] == null && t[n] == null)
        continue;
      if (!G0(e[n], t[n]))
        return !1;
    } else if (!rb(e[n], t[n]))
      return !1;
  return !0;
}
var ib = ["contextPayload"];
function co() {
  return co = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, co.apply(null, arguments);
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
function mr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ws(Object(r), !0).forEach(function(n) {
      ab(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ws(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ab(e, t, r) {
  return (t = ob(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function ob(e) {
  var t = ub(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function ub(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function sb(e, t) {
  if (e == null) return {};
  var r, n, i = cb(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function cb(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function lb(e) {
  return e.value;
}
function fb(e) {
  var {
    contextPayload: t
  } = e, r = sb(e, ib), n = Sf(t, e.payloadUniqBy, lb), i = mr(mr({}, r), {}, {
    payload: n
  });
  return /* @__PURE__ */ A.isValidElement(e.content) ? /* @__PURE__ */ A.cloneElement(e.content, i) : typeof e.content == "function" ? /* @__PURE__ */ A.createElement(e.content, i) : /* @__PURE__ */ A.createElement(om, i);
}
function db(e, t, r, n, i, a) {
  var {
    layout: o,
    align: u,
    verticalAlign: s
  } = t, c, l;
  return (!e || (e.left === void 0 || e.left === null) && (e.right === void 0 || e.right === null)) && (u === "center" && o === "vertical" ? c = {
    left: ((n || 0) - a.width) / 2
  } : c = u === "right" ? {
    right: r && r.right || 0
  } : {
    left: r && r.left || 0
  }), (!e || (e.top === void 0 || e.top === null) && (e.bottom === void 0 || e.bottom === null)) && (s === "middle" ? l = {
    top: ((i || 0) - a.height) / 2
  } : l = s === "bottom" ? {
    bottom: r && r.bottom || 0
  } : {
    top: r && r.top || 0
  }), mr(mr({}, c), l);
}
function hb(e) {
  var t = yt();
  return Ae(() => {
    t($0(e));
  }, [t, e]), null;
}
function pb(e) {
  var t = yt();
  return Ae(() => (t(Ls(e)), () => {
    t(Ls({
      width: 0,
      height: 0
    }));
  }), [t, e]), null;
}
function vb(e, t, r, n) {
  return e === "vertical" && t != null ? {
    height: t
  } : e === "horizontal" ? {
    width: r || n
  } : null;
}
var mb = {
  align: "center",
  iconSize: 14,
  inactiveColor: "#ccc",
  itemSorter: "value",
  layout: "horizontal",
  verticalAlign: "bottom"
};
function gb(e) {
  var t = _r(e, mb), r = wg(), n = Jp(), i = _0(), {
    width: a,
    height: o,
    wrapperStyle: u,
    portal: s
  } = t, [c, l] = Df([r]), f = b0(), d = w0();
  if (f == null || d == null)
    return null;
  var h = f - (i?.left || 0) - (i?.right || 0), p = vb(t.layout, o, a, h), m = s ? u : mr(mr({
    position: "absolute",
    width: p?.width || a || "auto",
    height: p?.height || o || "auto"
  }, db(u, t, i, f, d, c)), u), v = s ?? n;
  if (v == null || r == null)
    return null;
  var g = /* @__PURE__ */ A.createElement("div", {
    className: "recharts-legend-wrapper",
    style: m,
    ref: l
  }, /* @__PURE__ */ A.createElement(hb, {
    layout: t.layout,
    align: t.align,
    verticalAlign: t.verticalAlign,
    itemSorter: t.itemSorter
  }), !s && /* @__PURE__ */ A.createElement(pb, {
    width: c.width,
    height: c.height
  }), /* @__PURE__ */ A.createElement(fb, co({}, t, p, {
    margin: i,
    chartWidth: f,
    chartHeight: d,
    contextPayload: r
  })));
  return /* @__PURE__ */ No(g, v);
}
var Od = /* @__PURE__ */ A.memo(gb, nb);
Od.displayName = "Legend";
function lo() {
  return lo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, lo.apply(null, arguments);
}
function Ks(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Cr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ks(Object(r), !0).forEach(function(n) {
      yb(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ks(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function yb(e, t, r) {
  return (t = bb(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function bb(e) {
  var t = wb(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function wb(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function _b(e) {
  return Array.isArray(e) && Vt(e[0]) && Vt(e[1]) ? e.join(" ~ ") : e;
}
var er = {
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
function xb(e, t) {
  return t == null ? e : Ti(e, t);
}
var Ob = (e) => {
  var {
    separator: t = er.separator,
    contentStyle: r,
    itemStyle: n,
    labelStyle: i = er.labelStyle,
    payload: a,
    formatter: o,
    itemSorter: u,
    wrapperClassName: s,
    labelClassName: c,
    label: l,
    labelFormatter: f,
    accessibilityLayer: d = er.accessibilityLayer
  } = e, h = () => {
    if (a && a.length) {
      var O = {
        padding: 0,
        margin: 0
      }, _ = xb(a, u), S = _.map((N, I) => {
        if (N.type === "none")
          return null;
        var D = N.formatter || o || _b, {
          value: T,
          name: E
        } = N, W = T, B = E;
        if (D) {
          var G = D(T, E, N, I, a);
          if (Array.isArray(G))
            [W, B] = G;
          else if (G != null)
            W = G;
          else
            return null;
        }
        var re = Cr(Cr({}, er.itemStyle), {}, {
          color: N.color || er.itemStyle.color
        }, n);
        return /* @__PURE__ */ A.createElement("li", {
          className: "recharts-tooltip-item",
          key: "tooltip-item-".concat(I),
          style: re
        }, Vt(B) ? /* @__PURE__ */ A.createElement("span", {
          className: "recharts-tooltip-item-name"
        }, B) : null, Vt(B) ? /* @__PURE__ */ A.createElement("span", {
          className: "recharts-tooltip-item-separator"
        }, t) : null, /* @__PURE__ */ A.createElement("span", {
          className: "recharts-tooltip-item-value"
        }, W), /* @__PURE__ */ A.createElement("span", {
          className: "recharts-tooltip-item-unit"
        }, N.unit || ""));
      });
      return /* @__PURE__ */ A.createElement("ul", {
        className: "recharts-tooltip-item-list",
        style: O
      }, S);
    }
    return null;
  }, p = Cr(Cr({}, er.contentStyle), r), m = Cr({
    margin: 0
  }, i), v = !fr(l), g = v ? l : "", w = je("recharts-default-tooltip", s), y = je("recharts-tooltip-label", c);
  v && f && a !== void 0 && a !== null && (g = f(l, a));
  var x = d ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ A.createElement("div", lo({
    className: w,
    style: p
  }, x), /* @__PURE__ */ A.createElement("p", {
    className: y,
    style: m
  }, /* @__PURE__ */ A.isValidElement(g) ? g : "".concat(g)), h());
}, Dr = "recharts-tooltip-wrapper", Pb = {
  visibility: "hidden"
};
function Eb(e) {
  var {
    coordinate: t,
    translateX: r,
    translateY: n
  } = e;
  return je(Dr, {
    ["".concat(Dr, "-right")]: k(r) && t && k(t.x) && r >= t.x,
    ["".concat(Dr, "-left")]: k(r) && t && k(t.x) && r < t.x,
    ["".concat(Dr, "-bottom")]: k(n) && t && k(t.y) && n >= t.y,
    ["".concat(Dr, "-top")]: k(n) && t && k(t.y) && n < t.y
  });
}
function qs(e) {
  var {
    allowEscapeViewBox: t,
    coordinate: r,
    key: n,
    offset: i,
    position: a,
    reverseDirection: o,
    tooltipDimension: u,
    viewBox: s,
    viewBoxDimension: c
  } = e;
  if (a && k(a[n]))
    return a[n];
  var l = r[n] - u - (i > 0 ? i : 0), f = r[n] + i;
  if (t[n])
    return o[n] ? l : f;
  var d = s[n];
  if (d == null)
    return 0;
  if (o[n]) {
    var h = l, p = d;
    return h < p ? Math.max(f, d) : Math.max(l, d);
  }
  if (c == null)
    return 0;
  var m = f + u, v = d + c;
  return m > v ? Math.max(l, d) : Math.max(f, d);
}
function Sb(e) {
  var {
    translateX: t,
    translateY: r,
    useTranslate3d: n
  } = e;
  return {
    transform: n ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)") : "translate(".concat(t, "px, ").concat(r, "px)")
  };
}
function Ab(e) {
  var {
    allowEscapeViewBox: t,
    coordinate: r,
    offsetTop: n,
    offsetLeft: i,
    position: a,
    reverseDirection: o,
    tooltipBox: u,
    useTranslate3d: s,
    viewBox: c
  } = e, l, f, d;
  return u.height > 0 && u.width > 0 && r ? (f = qs({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "x",
    offset: i,
    position: a,
    reverseDirection: o,
    tooltipDimension: u.width,
    viewBox: c,
    viewBoxDimension: c.width
  }), d = qs({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "y",
    offset: n,
    position: a,
    reverseDirection: o,
    tooltipDimension: u.height,
    viewBox: c,
    viewBoxDimension: c.height
  }), l = Sb({
    translateX: f,
    translateY: d,
    useTranslate3d: s
  })) : l = Pb, {
    cssProperties: l,
    cssClasses: Eb({
      translateX: f,
      translateY: d,
      coordinate: r
    })
  };
}
var Mb = () => !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout), Pd = {
  isSsr: Mb()
};
function Ed() {
  var [e, t] = tn(() => Pd.isSsr || !window.matchMedia ? !1 : window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  return Ae(() => {
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
function Hs(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function tr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Hs(Object(r), !0).forEach(function(n) {
      Nb(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Hs(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Nb(e, t, r) {
  return (t = Cb(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Cb(e) {
  var t = Db(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Db(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ib(e) {
  if (!(e.prefersReducedMotion && e.isAnimationActive === "auto") && e.isAnimationActive && e.active)
    return "transform ".concat(e.animationDuration, "ms ").concat(e.animationEasing);
}
function Tb(e) {
  var t, r, n, i, a, o, u = Ed(), [s, c] = A.useState(() => ({
    dismissed: !1,
    dismissedAtCoordinate: {
      x: 0,
      y: 0
    }
  }));
  A.useEffect(() => {
    var p = (m) => {
      if (m.key === "Escape") {
        var v, g, w, y;
        c({
          dismissed: !0,
          dismissedAtCoordinate: {
            x: (v = (g = e.coordinate) === null || g === void 0 ? void 0 : g.x) !== null && v !== void 0 ? v : 0,
            y: (w = (y = e.coordinate) === null || y === void 0 ? void 0 : y.y) !== null && w !== void 0 ? w : 0
          }
        });
      }
    };
    return document.addEventListener("keydown", p), () => {
      document.removeEventListener("keydown", p);
    };
  }, [(t = e.coordinate) === null || t === void 0 ? void 0 : t.x, (r = e.coordinate) === null || r === void 0 ? void 0 : r.y]), s.dismissed && (((n = (i = e.coordinate) === null || i === void 0 ? void 0 : i.x) !== null && n !== void 0 ? n : 0) !== s.dismissedAtCoordinate.x || ((a = (o = e.coordinate) === null || o === void 0 ? void 0 : o.y) !== null && a !== void 0 ? a : 0) !== s.dismissedAtCoordinate.y) && c(tr(tr({}, s), {}, {
    dismissed: !1
  }));
  var {
    cssClasses: l,
    cssProperties: f
  } = Ab({
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
  }), d = e.hasPortalFromProps ? {} : tr(tr({
    transition: Ib({
      prefersReducedMotion: u,
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
  }), h = tr(tr({}, d), {}, {
    visibility: !s.dismissed && e.active && e.hasPayload ? "visible" : "hidden"
  }, e.wrapperStyle);
  return /* @__PURE__ */ A.createElement("div", {
    // @ts-expect-error typescript library does not recognize xmlns attribute, but it's required for an HTML chunk inside SVG.
    xmlns: "http://www.w3.org/1999/xhtml",
    tabIndex: -1,
    className: l,
    style: h,
    ref: e.innerRef
  }, e.children);
}
var kb = /* @__PURE__ */ A.memo(Tb), jb = () => {
  var e;
  return (e = R((t) => t.rootProps.accessibilityLayer)) !== null && e !== void 0 ? e : !0;
};
function fo() {
  return fo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, fo.apply(null, arguments);
}
function Ys(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Gs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ys(Object(r), !0).forEach(function(n) {
      $b(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ys(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function $b(e, t, r) {
  return (t = Rb(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Rb(e) {
  var t = Lb(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Lb(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Xs = {
  curveBasisClosed: yv,
  curveBasisOpen: bv,
  curveBasis: gv,
  curveBumpX: nv,
  curveBumpY: iv,
  curveLinearClosed: wv,
  curveLinear: Di,
  curveMonotoneX: _v,
  curveMonotoneY: xv,
  curveNatural: Ov,
  curveStep: Pv,
  curveStepAfter: Sv,
  curveStepBefore: Ev
}, ci = (e) => U(e.x) && U(e.y), Zs = (e) => e.base != null && ci(e.base) && ci(e), Ir = (e) => e.x, Tr = (e) => e.y, zb = (e, t) => {
  if (typeof e == "function")
    return e;
  var r = "curve".concat(nn(e));
  if ((r === "curveMonotone" || r === "curveBump") && t) {
    var n = Xs["".concat(r).concat(t === "vertical" ? "Y" : "X")];
    if (n)
      return n;
  }
  return Xs[r] || Di;
}, Qs = {
  connectNulls: !1,
  type: "linear"
}, Fb = (e) => {
  var {
    type: t = Qs.type,
    points: r = [],
    baseLine: n,
    layout: i,
    connectNulls: a = Qs.connectNulls
  } = e, o = zb(t, i), u = a ? r.filter(ci) : r;
  if (Array.isArray(n)) {
    var s, c = r.map((p, m) => Gs(Gs({}, p), {}, {
      base: n[m]
    }));
    i === "vertical" ? s = Pn().y(Tr).x1(Ir).x0((p) => p.base.x) : s = Pn().x(Ir).y1(Tr).y0((p) => p.base.y);
    var l = s.defined(Zs).curve(o), f = a ? c.filter(Zs) : c;
    return l(f);
  }
  var d;
  i === "vertical" && k(n) ? d = Pn().y(Tr).x1(Ir).x0(n) : k(n) ? d = Pn().x(Ir).y1(Tr).y0(n) : d = Gl().x(Ir).y(Tr);
  var h = d.defined(ci).curve(o);
  return h(u);
}, Bb = (e) => {
  var {
    className: t,
    points: r,
    path: n,
    pathRef: i
  } = e, a = ln();
  if ((!r || !r.length) && !n)
    return null;
  var o = {
    type: e.type,
    points: e.points,
    baseLine: e.baseLine,
    layout: e.layout || a,
    connectNulls: e.connectNulls
  }, u = r && r.length ? Fb(o) : n;
  return /* @__PURE__ */ A.createElement("path", fo({}, ka(e), qv(e), {
    className: je("recharts-curve", t),
    d: u === null ? void 0 : u,
    ref: i
  }));
}, Ub = ["x", "y", "top", "left", "width", "height", "className"];
function ho() {
  return ho = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ho.apply(null, arguments);
}
function Js(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Vb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Js(Object(r), !0).forEach(function(n) {
      Wb(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Js(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Wb(e, t, r) {
  return (t = Kb(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Kb(e) {
  var t = qb(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function qb(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Hb(e, t) {
  if (e == null) return {};
  var r, n, i = Yb(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function Yb(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var Gb = (e, t, r, n, i, a) => "M".concat(e, ",").concat(i, "v").concat(n, "M").concat(a, ",").concat(t, "h").concat(r), Xb = (e) => {
  var {
    x: t = 0,
    y: r = 0,
    top: n = 0,
    left: i = 0,
    width: a = 0,
    height: o = 0,
    className: u
  } = e, s = Hb(e, Ub), c = Vb({
    x: t,
    y: r,
    top: n,
    left: i,
    width: a,
    height: o
  }, s);
  return !k(t) || !k(r) || !k(a) || !k(o) || !k(n) || !k(i) ? null : /* @__PURE__ */ A.createElement("path", ho({}, gt(c), {
    className: je("recharts-cross", u),
    d: Gb(t, r, a, o, n, i)
  }));
};
function Zb(e, t, r, n) {
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
function ec(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function tc(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ec(Object(r), !0).forEach(function(n) {
      Qb(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ec(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Qb(e, t, r) {
  return (t = Jb(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Jb(e) {
  var t = ew(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function ew(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var tw = (e) => e.replace(/([A-Z])/g, (t) => "-".concat(t.toLowerCase())), rw = (e, t, r) => e.map((n) => "".concat(tw(n), " ").concat(t, "ms ").concat(r)).join(","), nw = (e, t) => [Object.keys(e), Object.keys(t)].reduce((r, n) => r.filter((i) => n.includes(i))), Yr = (e, t) => Object.keys(t).reduce((r, n) => tc(tc({}, r), {}, {
  [n]: e(n, t[n])
}), {});
function rc(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function J(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? rc(Object(r), !0).forEach(function(n) {
      iw(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : rc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function iw(e, t, r) {
  return (t = aw(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function aw(e) {
  var t = ow(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function ow(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var li = (e, t, r) => e + (t - e) * r, po = (e) => {
  var {
    from: t,
    to: r
  } = e;
  return t !== r;
}, Sd = (e, t, r) => {
  var n = Yr((i, a) => {
    if (po(a)) {
      var [o, u] = e(a.from, a.to, a.velocity);
      return J(J({}, a), {}, {
        from: o,
        velocity: u
      });
    }
    return a;
  }, t);
  return r < 1 ? Yr((i, a) => po(a) && n[i] != null ? J(J({}, a), {}, {
    velocity: li(a.velocity, n[i].velocity, r),
    from: li(a.from, n[i].from, r)
  }) : a, t) : Sd(e, n, r - 1);
};
function uw(e, t, r, n, i, a) {
  var o, u = n.reduce((d, h) => J(J({}, d), {}, {
    [h]: {
      from: e[h],
      velocity: 0,
      to: t[h]
    }
  }), {}), s = () => Yr((d, h) => h.from, u), c = () => !Object.values(u).filter(po).length, l = null, f = (d) => {
    o || (o = d);
    var h = d - o, p = h / r.dt;
    u = Sd(r, u, p), i(J(J(J({}, e), t), s())), o = d, c() || (l = a.setTimeout(f));
  };
  return () => (l = a.setTimeout(f), () => {
    var d;
    (d = l) === null || d === void 0 || d();
  });
}
function sw(e, t, r, n, i, a, o) {
  var u = null, s = i.reduce((f, d) => {
    var h = e[d], p = t[d];
    return h == null || p == null ? f : J(J({}, f), {}, {
      [d]: [h, p]
    });
  }, {}), c, l = (f) => {
    c || (c = f);
    var d = (f - c) / n, h = Yr((m, v) => li(...v, r(d)), s);
    if (a(J(J(J({}, e), t), h)), d < 1)
      u = o.setTimeout(l);
    else {
      var p = Yr((m, v) => li(...v, r(1)), s);
      a(J(J(J({}, e), t), p));
    }
  };
  return () => (u = o.setTimeout(l), () => {
    var f;
    (f = u) === null || f === void 0 || f();
  });
}
const cw = (e, t, r, n, i, a) => {
  var o = nw(e, t);
  return r == null ? () => (i(J(J({}, e), t)), () => {
  }) : r.isStepper === !0 ? uw(e, t, r, o, i, a) : sw(e, t, r, n, o, i, a);
};
var fi = 1e-4, Ad = (e, t) => [0, 3 * e, 3 * t - 6 * e, 3 * e - 3 * t + 1], Md = (e, t) => e.map((r, n) => r * t ** n).reduce((r, n) => r + n), nc = (e, t) => (r) => {
  var n = Ad(e, t);
  return Md(n, r);
}, lw = (e, t) => (r) => {
  var n = Ad(e, t), i = [...n.map((a, o) => a * o).slice(1), 0];
  return Md(i, r);
}, fw = (e) => {
  var t, r = e.split("(");
  if (r.length !== 2 || r[0] !== "cubic-bezier")
    return null;
  var n = (t = r[1]) === null || t === void 0 || (t = t.split(")")[0]) === null || t === void 0 ? void 0 : t.split(",");
  if (n == null || n.length !== 4)
    return null;
  var i = n.map((a) => parseFloat(a));
  return [i[0], i[1], i[2], i[3]];
}, dw = function() {
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
        var i = fw(r[0]);
        if (i)
          return i;
      }
    }
  return r.length === 4 ? r : [0, 0, 1, 1];
}, hw = (e, t, r, n) => {
  var i = nc(e, r), a = nc(t, n), o = lw(e, r), u = (c) => c > 1 ? 1 : c < 0 ? 0 : c, s = (c) => {
    for (var l = c > 1 ? 1 : c, f = l, d = 0; d < 8; ++d) {
      var h = i(f) - l, p = o(f);
      if (Math.abs(h - l) < fi || p < fi)
        return a(f);
      f = u(f - h / p);
    }
    return a(f);
  };
  return s.isStepper = !1, s;
}, ic = function() {
  return hw(...dw(...arguments));
}, pw = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, {
    stiff: r = 100,
    damping: n = 8,
    dt: i = 17
  } = t, a = (o, u, s) => {
    var c = -(o - u) * r, l = s * n, f = s + (c - l) * i / 1e3, d = s * i / 1e3 + o;
    return Math.abs(d - u) < fi && Math.abs(f) < fi ? [u, 0] : [d, f];
  };
  return a.isStepper = !0, a.dt = i, a;
}, vw = (e) => {
  if (typeof e == "string")
    switch (e) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return ic(e);
      case "spring":
        return pw();
      default:
        if (e.split("(")[0] === "cubic-bezier")
          return ic(e);
    }
  return typeof e == "function" ? e : null;
};
function mw(e) {
  var t, r = () => null, n = !1, i = null, a = (o) => {
    if (!n) {
      if (Array.isArray(o)) {
        if (!o.length)
          return;
        var u = o, [s, ...c] = u;
        if (typeof s == "number") {
          i = e.setTimeout(a.bind(null, c), s);
          return;
        }
        a(s), i = e.setTimeout(a.bind(null, c));
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
class gw {
  setTimeout(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = performance.now(), i = null, a = (o) => {
      o - n >= r ? t(o) : typeof requestAnimationFrame == "function" && (i = requestAnimationFrame(a));
    };
    return i = requestAnimationFrame(a), () => {
      i != null && cancelAnimationFrame(i);
    };
  }
}
function yw() {
  return mw(new gw());
}
var bw = /* @__PURE__ */ wr(yw);
function ww(e, t) {
  var r = Yt(bw);
  return Ni(() => t ?? r(e), [e, t, r]);
}
var _w = {
  begin: 0,
  duration: 1e3,
  easing: "ease",
  isActive: !0,
  canBegin: !0,
  onAnimationEnd: () => {
  },
  onAnimationStart: () => {
  }
}, ac = {
  t: 0
}, Oa = {
  t: 1
};
function xw(e) {
  var t = _r(e, _w), {
    isActive: r,
    canBegin: n,
    duration: i,
    easing: a,
    begin: o,
    onAnimationEnd: u,
    onAnimationStart: s,
    children: c
  } = t, l = Ed(), f = r === "auto" ? !Pd.isSsr && !l : r, d = ww(t.animationId, t.animationManager), [h, p] = tn(f ? ac : Oa), m = Ke(null);
  return Ae(() => {
    f || p(Oa);
  }, [f]), Ae(() => {
    if (!f || !n)
      return an;
    var v = cw(ac, Oa, vw(a), i, p, d.getTimeoutController()), g = () => {
      m.current = v();
    };
    return d.start([s, o, g, i, u]), () => {
      d.stop(), m.current && m.current(), u();
    };
  }, [f, n, i, a, o, s, u, d]), c(h.t);
}
function Ow(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "animation-", r = Ke(Zu(t)), n = Ke(e);
  return n.current !== e && (r.current = Zu(t), n.current = e), r.current;
}
var Pw = ["radius"], Ew = ["radius"], oc, uc, sc, cc, lc, fc, dc, hc, pc, vc;
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
      Sw(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : mc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Sw(e, t, r) {
  return (t = Aw(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Aw(e) {
  var t = Mw(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Mw(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function di() {
  return di = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, di.apply(null, arguments);
}
function yc(e, t) {
  if (e == null) return {};
  var r, n, i = Nw(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function Nw(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Ve(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var bc = (e, t, r, n, i) => {
  var a = vt(r), o = vt(n), u = Math.min(Math.abs(a) / 2, Math.abs(o) / 2), s = o >= 0 ? 1 : -1, c = a >= 0 ? 1 : -1, l = o >= 0 && a >= 0 || o < 0 && a < 0 ? 1 : 0, f;
  if (u > 0 && Array.isArray(i)) {
    for (var d = [0, 0, 0, 0], h = 0, p = 4; h < p; h++) {
      var m, v = (m = i[h]) !== null && m !== void 0 ? m : 0;
      d[h] = v > u ? u : v;
    }
    f = ue(oc || (oc = Ve(["M", ",", ""])), e, t + s * d[0]), d[0] > 0 && (f += ue(uc || (uc = Ve(["A ", ",", ",0,0,", ",", ",", ""])), d[0], d[0], l, e + c * d[0], t)), f += ue(sc || (sc = Ve(["L ", ",", ""])), e + r - c * d[1], t), d[1] > 0 && (f += ue(cc || (cc = Ve(["A ", ",", ",0,0,", `,
        `, ",", ""])), d[1], d[1], l, e + r, t + s * d[1])), f += ue(lc || (lc = Ve(["L ", ",", ""])), e + r, t + n - s * d[2]), d[2] > 0 && (f += ue(fc || (fc = Ve(["A ", ",", ",0,0,", `,
        `, ",", ""])), d[2], d[2], l, e + r - c * d[2], t + n)), f += ue(dc || (dc = Ve(["L ", ",", ""])), e + c * d[3], t + n), d[3] > 0 && (f += ue(hc || (hc = Ve(["A ", ",", ",0,0,", `,
        `, ",", ""])), d[3], d[3], l, e, t + n - s * d[3])), f += "Z";
  } else if (u > 0 && i === +i && i > 0) {
    var g = Math.min(u, i);
    f = ue(pc || (pc = Ve(["M ", ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", " Z"])), e, t + s * g, g, g, l, e + c * g, t, e + r - c * g, t, g, g, l, e + r, t + s * g, e + r, t + n - s * g, g, g, l, e + r - c * g, t + n, e + c * g, t + n, g, g, l, e, t + n - s * g);
  } else
    f = ue(vc || (vc = Ve(["M ", ",", " h ", " v ", " h ", " Z"])), e, t, r, n, -r);
  return f;
}, wc = {
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
}, Cw = (e) => {
  var t = _r(e, wc), r = Ke(null), [n, i] = tn(-1);
  Ae(() => {
    if (r.current && r.current.getTotalLength)
      try {
        var X = r.current.getTotalLength();
        X && i(X);
      } catch {
      }
  }, []);
  var {
    x: a,
    y: o,
    width: u,
    height: s,
    radius: c,
    className: l
  } = t, {
    animationEasing: f,
    animationDuration: d,
    animationBegin: h,
    isAnimationActive: p,
    isUpdateAnimationActive: m
  } = t, v = Ke(u), g = Ke(s), w = Ke(a), y = Ke(o), x = Ni(() => ({
    x: a,
    y: o,
    width: u,
    height: s,
    radius: c
  }), [a, o, u, s, c]), O = Ow(x, "rectangle-");
  if (a !== +a || o !== +o || u !== +u || s !== +s || u === 0 || s === 0)
    return null;
  var _ = je("recharts-rectangle", l);
  if (!m) {
    var S = gt(t), {
      radius: N
    } = S, I = yc(S, Pw);
    return /* @__PURE__ */ A.createElement("path", di({}, I, {
      x: vt(a),
      y: vt(o),
      width: vt(u),
      height: vt(s),
      radius: typeof c == "number" ? c : void 0,
      className: _,
      d: bc(a, o, u, s, c)
    }));
  }
  var D = v.current, T = g.current, E = w.current, W = y.current, B = "0px ".concat(n === -1 ? 1 : n, "px"), G = "".concat(n, "px ").concat(n, "px"), re = rw(["strokeDasharray"], d, typeof f == "string" ? f : wc.animationEasing);
  return /* @__PURE__ */ A.createElement(xw, {
    animationId: O,
    key: O,
    canBegin: n > 0,
    duration: d,
    easing: f,
    isActive: m,
    begin: h
  }, (X) => {
    var Ne = En(D, u, X), ce = En(T, s, X), le = En(E, a, X), Jt = En(W, o, X);
    r.current && (v.current = Ne, g.current = ce, w.current = le, y.current = Jt);
    var Je;
    p ? X > 0 ? Je = {
      transition: re,
      strokeDasharray: G
    } : Je = {
      strokeDasharray: B
    } : Je = {
      strokeDasharray: G
    };
    var St = gt(t), {
      radius: Ue
    } = St, Nr = yc(St, Ew);
    return /* @__PURE__ */ A.createElement("path", di({}, Nr, {
      radius: typeof c == "number" ? c : void 0,
      className: _,
      d: bc(le, Jt, Ne, ce, c),
      ref: r,
      style: gc(gc({}, Je), t.style)
    }));
  });
};
function _c(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function xc(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _c(Object(r), !0).forEach(function(n) {
      Dw(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _c(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Dw(e, t, r) {
  return (t = Iw(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Iw(e) {
  var t = Tw(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Tw(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var hi = Math.PI / 180, kw = (e) => e * 180 / Math.PI, Se = (e, t, r, n) => ({
  x: e + Math.cos(-hi * n) * r,
  y: t + Math.sin(-hi * n) * r
}), jw = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(t - (n.left || 0) - (n.right || 0)), Math.abs(r - (n.top || 0) - (n.bottom || 0))) / 2;
}, $w = (e, t) => {
  var {
    x: r,
    y: n
  } = e, {
    x: i,
    y: a
  } = t;
  return Math.sqrt((r - i) ** 2 + (n - a) ** 2);
}, Rw = (e, t) => {
  var {
    x: r,
    y: n
  } = e, {
    cx: i,
    cy: a
  } = t, o = $w({
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
  var u = (r - i) / o, s = Math.acos(u);
  return n > a && (s = 2 * Math.PI - s), {
    radius: o,
    angle: kw(s),
    angleInRadian: s
  };
}, Lw = (e) => {
  var {
    startAngle: t,
    endAngle: r
  } = e, n = Math.floor(t / 360), i = Math.floor(r / 360), a = Math.min(n, i);
  return {
    startAngle: t - a * 360,
    endAngle: r - a * 360
  };
}, zw = (e, t) => {
  var {
    startAngle: r,
    endAngle: n
  } = t, i = Math.floor(r / 360), a = Math.floor(n / 360), o = Math.min(i, a);
  return e + o * 360;
}, Fw = (e, t) => {
  var {
    relativeX: r,
    relativeY: n
  } = e, {
    radius: i,
    angle: a
  } = Rw({
    x: r,
    y: n
  }, t), {
    innerRadius: o,
    outerRadius: u
  } = t;
  if (i < o || i > u || i === 0)
    return null;
  var {
    startAngle: s,
    endAngle: c
  } = Lw(t), l = a, f;
  if (s <= c) {
    for (; l > c; )
      l -= 360;
    for (; l < s; )
      l += 360;
    f = l >= s && l <= c;
  } else {
    for (; l > s; )
      l -= 360;
    for (; l < c; )
      l += 360;
    f = l >= c && l <= s;
  }
  return f ? xc(xc({}, t), {}, {
    radius: i,
    angle: zw(l, t)
  }) : null;
};
function Nd(e) {
  var {
    cx: t,
    cy: r,
    radius: n,
    startAngle: i,
    endAngle: a
  } = e, o = Se(t, r, n, i), u = Se(t, r, n, a);
  return {
    points: [o, u],
    cx: t,
    cy: r,
    radius: n,
    startAngle: i,
    endAngle: a
  };
}
var Oc, Pc, Ec, Sc, Ac, Mc, Nc;
function vo() {
  return vo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, vo.apply(null, arguments);
}
function kt(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var Bw = (e, t) => {
  var r = qe(t - e), n = Math.min(Math.abs(t - e), 359.999);
  return r * n;
}, jn = (e) => {
  var {
    cx: t,
    cy: r,
    radius: n,
    angle: i,
    sign: a,
    isExternal: o,
    cornerRadius: u,
    cornerIsExternal: s
  } = e, c = u * (o ? 1 : -1) + n, l = Math.asin(u / c) / hi, f = s ? i : i + a * l, d = Se(t, r, c, f), h = Se(t, r, n, f), p = s ? i - a * l : i, m = Se(t, r, c * Math.cos(l * hi), p);
  return {
    center: d,
    circleTangency: h,
    lineTangency: m,
    theta: l
  };
}, Cd = (e) => {
  var {
    cx: t,
    cy: r,
    innerRadius: n,
    outerRadius: i,
    startAngle: a,
    endAngle: o
  } = e, u = Bw(a, o), s = a + u, c = Se(t, r, i, a), l = Se(t, r, i, s), f = ue(Oc || (Oc = kt(["M ", ",", `
    A `, ",", `,0,
    `, ",", `,
    `, ",", `
  `])), c.x, c.y, i, i, +(Math.abs(u) > 180), +(a > s), l.x, l.y);
  if (n > 0) {
    var d = Se(t, r, n, a), h = Se(t, r, n, s);
    f += ue(Pc || (Pc = kt(["L ", ",", `
            A `, ",", `,0,
            `, ",", `,
            `, ",", " Z"])), h.x, h.y, n, n, +(Math.abs(u) > 180), +(a <= s), d.x, d.y);
  } else
    f += ue(Ec || (Ec = kt(["L ", ",", " Z"])), t, r);
  return f;
}, Uw = (e) => {
  var {
    cx: t,
    cy: r,
    innerRadius: n,
    outerRadius: i,
    cornerRadius: a,
    forceCornerRadius: o,
    cornerIsExternal: u,
    startAngle: s,
    endAngle: c
  } = e, l = qe(c - s), {
    circleTangency: f,
    lineTangency: d,
    theta: h
  } = jn({
    cx: t,
    cy: r,
    radius: i,
    angle: s,
    sign: l,
    cornerRadius: a,
    cornerIsExternal: u
  }), {
    circleTangency: p,
    lineTangency: m,
    theta: v
  } = jn({
    cx: t,
    cy: r,
    radius: i,
    angle: c,
    sign: -l,
    cornerRadius: a,
    cornerIsExternal: u
  }), g = u ? Math.abs(s - c) : Math.abs(s - c) - h - v;
  if (g < 0)
    return o ? ue(Sc || (Sc = kt(["M ", ",", `
        a`, ",", ",0,0,1,", `,0
        a`, ",", ",0,0,1,", `,0
      `])), d.x, d.y, a, a, a * 2, a, a, -a * 2) : Cd({
      cx: t,
      cy: r,
      innerRadius: n,
      outerRadius: i,
      startAngle: s,
      endAngle: c
    });
  var w = ue(Ac || (Ac = kt(["M ", ",", `
    A`, ",", ",0,0,", ",", ",", `
    A`, ",", ",0,", ",", ",", ",", `
    A`, ",", ",0,0,", ",", ",", `
  `])), d.x, d.y, a, a, +(l < 0), f.x, f.y, i, i, +(g > 180), +(l < 0), p.x, p.y, a, a, +(l < 0), m.x, m.y);
  if (n > 0) {
    var {
      circleTangency: y,
      lineTangency: x,
      theta: O
    } = jn({
      cx: t,
      cy: r,
      radius: n,
      angle: s,
      sign: l,
      isExternal: !0,
      cornerRadius: a,
      cornerIsExternal: u
    }), {
      circleTangency: _,
      lineTangency: S,
      theta: N
    } = jn({
      cx: t,
      cy: r,
      radius: n,
      angle: c,
      sign: -l,
      isExternal: !0,
      cornerRadius: a,
      cornerIsExternal: u
    }), I = u ? Math.abs(s - c) : Math.abs(s - c) - O - N;
    if (I < 0 && a === 0)
      return "".concat(w, "L").concat(t, ",").concat(r, "Z");
    w += ue(Mc || (Mc = kt(["L", ",", `
      A`, ",", ",0,0,", ",", ",", `
      A`, ",", ",0,", ",", ",", ",", `
      A`, ",", ",0,0,", ",", ",", "Z"])), S.x, S.y, a, a, +(l < 0), _.x, _.y, n, n, +(I > 180), +(l > 0), y.x, y.y, a, a, +(l < 0), x.x, x.y);
  } else
    w += ue(Nc || (Nc = kt(["L", ",", "Z"])), t, r);
  return w;
}, Vw = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: !1,
  cornerIsExternal: !1
}, Ww = (e) => {
  var t = _r(e, Vw), {
    cx: r,
    cy: n,
    innerRadius: i,
    outerRadius: a,
    cornerRadius: o,
    forceCornerRadius: u,
    cornerIsExternal: s,
    startAngle: c,
    endAngle: l,
    className: f
  } = t;
  if (a < i || c === l)
    return null;
  var d = je("recharts-sector", f), h = a - i, p = lr(o, h, 0, !0), m;
  return p > 0 && Math.abs(c - l) < 360 ? m = Uw({
    cx: r,
    cy: n,
    innerRadius: i,
    outerRadius: a,
    cornerRadius: Math.min(p, h / 2),
    forceCornerRadius: u,
    cornerIsExternal: s,
    startAngle: c,
    endAngle: l
  }) : m = Cd({
    cx: r,
    cy: n,
    innerRadius: i,
    outerRadius: a,
    startAngle: c,
    endAngle: l
  }), /* @__PURE__ */ A.createElement("path", vo({}, gt(t), {
    className: d,
    d: m
  }));
};
function Kw(e, t, r) {
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
  if (hf(t)) {
    if (e === "centric") {
      var {
        cx: n,
        cy: i,
        innerRadius: a,
        outerRadius: o,
        angle: u
      } = t, s = Se(n, i, a, u), c = Se(n, i, o, u);
      return [{
        x: s.x,
        y: s.y
      }, {
        x: c.x,
        y: c.y
      }];
    }
    return Nd(t);
  }
}
function qw(e) {
  return Nf(e) ? NaN : Number(e);
}
function Pa(e) {
  return e ? (e = qw(e), e === 1 / 0 || e === -1 / 0 ? (e < 0 ? -1 : 1) * Number.MAX_VALUE : e === e ? e : 0) : e === 0 ? e : 0;
}
function Dd(e, t, r) {
  r && typeof r != "number" && Wa(e, t, r) && (t = r = void 0), e = Pa(e), t === void 0 ? (t = e, e = 0) : t = Pa(t), r = r === void 0 ? e < t ? 1 : -1 : Pa(r);
  const n = Math.max(Math.ceil((t - e) / (r || 1)), 0), i = new Array(n);
  for (let a = 0; a < n; a++)
    i[a] = e, e += r;
  return i;
}
var lt = (e) => e.chartData, Id = b([lt], (e) => {
  var t = e.chartData != null ? e.chartData.length - 1 : 0;
  return {
    chartData: e.chartData,
    computedData: e.computedData,
    dataEndIndex: t,
    dataStartIndex: 0
  };
}), Td = (e, t, r, n) => n ? Id(e) : lt(e), NS = (e, t, r) => r ? Id(e) : lt(e);
function Xe(e) {
  if (Array.isArray(e) && e.length === 2) {
    var [t, r] = e;
    if (U(t) && U(r))
      return !0;
  }
  return !1;
}
function Cc(e, t, r) {
  return r ? e : [Math.min(e[0], t[0]), Math.max(e[1], t[1])];
}
function kd(e, t) {
  if (t && typeof e != "function" && Array.isArray(e) && e.length === 2) {
    var [r, n] = e, i, a;
    if (U(r))
      i = r;
    else if (typeof r == "function")
      return;
    if (U(n))
      a = n;
    else if (typeof n == "function")
      return;
    var o = [i, a];
    if (Xe(o))
      return o;
  }
}
function Hw(e, t, r) {
  if (!(!r && t == null)) {
    if (typeof e == "function" && t != null)
      try {
        var n = e(t, r);
        if (Xe(n))
          return Cc(n, t, r);
      } catch {
      }
    if (Array.isArray(e) && e.length === 2) {
      var [i, a] = e, o, u;
      if (i === "auto")
        t != null && (o = Math.min(...t));
      else if (k(i))
        o = i;
      else if (typeof i == "function")
        try {
          t != null && (o = i(t?.[0]));
        } catch {
        }
      else if (typeof i == "string" && Ps.test(i)) {
        var s = Ps.exec(i);
        if (s == null || s[1] == null || t == null)
          o = void 0;
        else {
          var c = +s[1];
          o = t[0] - c;
        }
      } else
        o = t?.[0];
      if (a === "auto")
        t != null && (u = Math.max(...t));
      else if (k(a))
        u = a;
      else if (typeof a == "function")
        try {
          t != null && (u = a(t?.[1]));
        } catch {
        }
      else if (typeof a == "string" && Es.test(a)) {
        var l = Es.exec(a);
        if (l == null || l[1] == null || t == null)
          u = void 0;
        else {
          var f = +l[1];
          u = t[1] + f;
        }
      } else
        u = t?.[1];
      var d = [o, u];
      if (Xe(d))
        return t == null ? d : Cc(d, t, r);
    }
  }
}
var Or = 1e9, Yw = {
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
}, Go, Y = !0, Re = "[DecimalError] ", Ft = Re + "Invalid argument: ", Yo = Re + "Exponent out of range: ", Pr = Math.floor, Dt = Math.pow, Gw = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Pe, ne = 1e7, H = 7, jd = 9007199254740991, pi = Pr(jd / H), M = {};
M.absoluteValue = M.abs = function() {
  var e = new this.constructor(this);
  return e.s && (e.s = 1), e;
};
M.comparedTo = M.cmp = function(e) {
  var t, r, n, i, a = this;
  if (e = new a.constructor(e), a.s !== e.s) return a.s || -e.s;
  if (a.e !== e.e) return a.e > e.e ^ a.s < 0 ? 1 : -1;
  for (n = a.d.length, i = e.d.length, t = 0, r = n < i ? n : i; t < r; ++t)
    if (a.d[t] !== e.d[t]) return a.d[t] > e.d[t] ^ a.s < 0 ? 1 : -1;
  return n === i ? 0 : n > i ^ a.s < 0 ? 1 : -1;
};
M.decimalPlaces = M.dp = function() {
  var e = this, t = e.d.length - 1, r = (t - e.e) * H;
  if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) r--;
  return r < 0 ? 0 : r;
};
M.dividedBy = M.div = function(e) {
  return it(this, new this.constructor(e));
};
M.dividedToIntegerBy = M.idiv = function(e) {
  var t = this, r = t.constructor;
  return V(it(t, new r(e), 0, 1), r.precision);
};
M.equals = M.eq = function(e) {
  return !this.cmp(e);
};
M.exponent = function() {
  return Z(this);
};
M.greaterThan = M.gt = function(e) {
  return this.cmp(e) > 0;
};
M.greaterThanOrEqualTo = M.gte = function(e) {
  return this.cmp(e) >= 0;
};
M.isInteger = M.isint = function() {
  return this.e > this.d.length - 2;
};
M.isNegative = M.isneg = function() {
  return this.s < 0;
};
M.isPositive = M.ispos = function() {
  return this.s > 0;
};
M.isZero = function() {
  return this.s === 0;
};
M.lessThan = M.lt = function(e) {
  return this.cmp(e) < 0;
};
M.lessThanOrEqualTo = M.lte = function(e) {
  return this.cmp(e) < 1;
};
M.logarithm = M.log = function(e) {
  var t, r = this, n = r.constructor, i = n.precision, a = i + 5;
  if (e === void 0)
    e = new n(10);
  else if (e = new n(e), e.s < 1 || e.eq(Pe)) throw Error(Re + "NaN");
  if (r.s < 1) throw Error(Re + (r.s ? "NaN" : "-Infinity"));
  return r.eq(Pe) ? new n(0) : (Y = !1, t = it(Gr(r, a), Gr(e, a), a), Y = !0, V(t, i));
};
M.minus = M.sub = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? Ld(t, e) : $d(t, (e.s = -e.s, e));
};
M.modulo = M.mod = function(e) {
  var t, r = this, n = r.constructor, i = n.precision;
  if (e = new n(e), !e.s) throw Error(Re + "NaN");
  return r.s ? (Y = !1, t = it(r, e, 0, 1).times(e), Y = !0, r.minus(t)) : V(new n(r), i);
};
M.naturalExponential = M.exp = function() {
  return Rd(this);
};
M.naturalLogarithm = M.ln = function() {
  return Gr(this);
};
M.negated = M.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s || 0, e;
};
M.plus = M.add = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? $d(t, e) : Ld(t, (e.s = -e.s, e));
};
M.precision = M.sd = function(e) {
  var t, r, n, i = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(Ft + e);
  if (t = Z(i) + 1, n = i.d.length - 1, r = n * H + 1, n = i.d[n], n) {
    for (; n % 10 == 0; n /= 10) r--;
    for (n = i.d[0]; n >= 10; n /= 10) r++;
  }
  return e && t > r ? t : r;
};
M.squareRoot = M.sqrt = function() {
  var e, t, r, n, i, a, o, u = this, s = u.constructor;
  if (u.s < 1) {
    if (!u.s) return new s(0);
    throw Error(Re + "NaN");
  }
  for (e = Z(u), Y = !1, i = Math.sqrt(+u), i == 0 || i == 1 / 0 ? (t = Ge(u.d), (t.length + e) % 2 == 0 && (t += "0"), i = Math.sqrt(t), e = Pr((e + 1) / 2) - (e < 0 || e % 2), i == 1 / 0 ? t = "5e" + e : (t = i.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new s(t)) : n = new s(i.toString()), r = s.precision, i = o = r + 3; ; )
    if (a = n, n = a.plus(it(u, a, o + 2)).times(0.5), Ge(a.d).slice(0, o) === (t = Ge(n.d)).slice(0, o)) {
      if (t = t.slice(o - 3, o + 1), i == o && t == "4999") {
        if (V(a, r + 1, 0), a.times(a).eq(u)) {
          n = a;
          break;
        }
      } else if (t != "9999")
        break;
      o += 4;
    }
  return Y = !0, V(n, r);
};
M.times = M.mul = function(e) {
  var t, r, n, i, a, o, u, s, c, l = this, f = l.constructor, d = l.d, h = (e = new f(e)).d;
  if (!l.s || !e.s) return new f(0);
  for (e.s *= l.s, r = l.e + e.e, s = d.length, c = h.length, s < c && (a = d, d = h, h = a, o = s, s = c, c = o), a = [], o = s + c, n = o; n--; ) a.push(0);
  for (n = c; --n >= 0; ) {
    for (t = 0, i = s + n; i > n; )
      u = a[i] + h[n] * d[i - n - 1] + t, a[i--] = u % ne | 0, t = u / ne | 0;
    a[i] = (a[i] + t) % ne | 0;
  }
  for (; !a[--o]; ) a.pop();
  return t ? ++r : a.shift(), e.d = a, e.e = r, Y ? V(e, f.precision) : e;
};
M.toDecimalPlaces = M.todp = function(e, t) {
  var r = this, n = r.constructor;
  return r = new n(r), e === void 0 ? r : (Qe(e, 0, Or), t === void 0 ? t = n.rounding : Qe(t, 0, 8), V(r, e + Z(r) + 1, t));
};
M.toExponential = function(e, t) {
  var r, n = this, i = n.constructor;
  return e === void 0 ? r = Ht(n, !0) : (Qe(e, 0, Or), t === void 0 ? t = i.rounding : Qe(t, 0, 8), n = V(new i(n), e + 1, t), r = Ht(n, !0, e + 1)), r;
};
M.toFixed = function(e, t) {
  var r, n, i = this, a = i.constructor;
  return e === void 0 ? Ht(i) : (Qe(e, 0, Or), t === void 0 ? t = a.rounding : Qe(t, 0, 8), n = V(new a(i), e + Z(i) + 1, t), r = Ht(n.abs(), !1, e + Z(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r);
};
M.toInteger = M.toint = function() {
  var e = this, t = e.constructor;
  return V(new t(e), Z(e) + 1, t.rounding);
};
M.toNumber = function() {
  return +this;
};
M.toPower = M.pow = function(e) {
  var t, r, n, i, a, o, u = this, s = u.constructor, c = 12, l = +(e = new s(e));
  if (!e.s) return new s(Pe);
  if (u = new s(u), !u.s) {
    if (e.s < 1) throw Error(Re + "Infinity");
    return u;
  }
  if (u.eq(Pe)) return u;
  if (n = s.precision, e.eq(Pe)) return V(u, n);
  if (t = e.e, r = e.d.length - 1, o = t >= r, a = u.s, o) {
    if ((r = l < 0 ? -l : l) <= jd) {
      for (i = new s(Pe), t = Math.ceil(n / H + 4), Y = !1; r % 2 && (i = i.times(u), Ic(i.d, t)), r = Pr(r / 2), r !== 0; )
        u = u.times(u), Ic(u.d, t);
      return Y = !0, e.s < 0 ? new s(Pe).div(i) : V(i, n);
    }
  } else if (a < 0) throw Error(Re + "NaN");
  return a = a < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1, u.s = 1, Y = !1, i = e.times(Gr(u, n + c)), Y = !0, i = Rd(i), i.s = a, i;
};
M.toPrecision = function(e, t) {
  var r, n, i = this, a = i.constructor;
  return e === void 0 ? (r = Z(i), n = Ht(i, r <= a.toExpNeg || r >= a.toExpPos)) : (Qe(e, 1, Or), t === void 0 ? t = a.rounding : Qe(t, 0, 8), i = V(new a(i), e, t), r = Z(i), n = Ht(i, e <= r || r <= a.toExpNeg, e)), n;
};
M.toSignificantDigits = M.tosd = function(e, t) {
  var r = this, n = r.constructor;
  return e === void 0 ? (e = n.precision, t = n.rounding) : (Qe(e, 1, Or), t === void 0 ? t = n.rounding : Qe(t, 0, 8)), V(new n(r), e, t);
};
M.toString = M.valueOf = M.val = M.toJSON = M[Symbol.for("nodejs.util.inspect.custom")] = function() {
  var e = this, t = Z(e), r = e.constructor;
  return Ht(e, t <= r.toExpNeg || t >= r.toExpPos);
};
function $d(e, t) {
  var r, n, i, a, o, u, s, c, l = e.constructor, f = l.precision;
  if (!e.s || !t.s)
    return t.s || (t = new l(e)), Y ? V(t, f) : t;
  if (s = e.d, c = t.d, o = e.e, i = t.e, s = s.slice(), a = o - i, a) {
    for (a < 0 ? (n = s, a = -a, u = c.length) : (n = c, i = o, u = s.length), o = Math.ceil(f / H), u = o > u ? o + 1 : u + 1, a > u && (a = u, n.length = 1), n.reverse(); a--; ) n.push(0);
    n.reverse();
  }
  for (u = s.length, a = c.length, u - a < 0 && (a = u, n = c, c = s, s = n), r = 0; a; )
    r = (s[--a] = s[a] + c[a] + r) / ne | 0, s[a] %= ne;
  for (r && (s.unshift(r), ++i), u = s.length; s[--u] == 0; ) s.pop();
  return t.d = s, t.e = i, Y ? V(t, f) : t;
}
function Qe(e, t, r) {
  if (e !== ~~e || e < t || e > r)
    throw Error(Ft + e);
}
function Ge(e) {
  var t, r, n, i = e.length - 1, a = "", o = e[0];
  if (i > 0) {
    for (a += o, t = 1; t < i; t++)
      n = e[t] + "", r = H - n.length, r && (a += ht(r)), a += n;
    o = e[t], n = o + "", r = H - n.length, r && (a += ht(r));
  } else if (o === 0)
    return "0";
  for (; o % 10 === 0; ) o /= 10;
  return a + o;
}
var it = /* @__PURE__ */ (function() {
  function e(n, i) {
    var a, o = 0, u = n.length;
    for (n = n.slice(); u--; )
      a = n[u] * i + o, n[u] = a % ne | 0, o = a / ne | 0;
    return o && n.unshift(o), n;
  }
  function t(n, i, a, o) {
    var u, s;
    if (a != o)
      s = a > o ? 1 : -1;
    else
      for (u = s = 0; u < a; u++)
        if (n[u] != i[u]) {
          s = n[u] > i[u] ? 1 : -1;
          break;
        }
    return s;
  }
  function r(n, i, a) {
    for (var o = 0; a--; )
      n[a] -= o, o = n[a] < i[a] ? 1 : 0, n[a] = o * ne + n[a] - i[a];
    for (; !n[0] && n.length > 1; ) n.shift();
  }
  return function(n, i, a, o) {
    var u, s, c, l, f, d, h, p, m, v, g, w, y, x, O, _, S, N, I = n.constructor, D = n.s == i.s ? 1 : -1, T = n.d, E = i.d;
    if (!n.s) return new I(n);
    if (!i.s) throw Error(Re + "Division by zero");
    for (s = n.e - i.e, S = E.length, O = T.length, h = new I(D), p = h.d = [], c = 0; E[c] == (T[c] || 0); ) ++c;
    if (E[c] > (T[c] || 0) && --s, a == null ? w = a = I.precision : o ? w = a + (Z(n) - Z(i)) + 1 : w = a, w < 0) return new I(0);
    if (w = w / H + 2 | 0, c = 0, S == 1)
      for (l = 0, E = E[0], w++; (c < O || l) && w--; c++)
        y = l * ne + (T[c] || 0), p[c] = y / E | 0, l = y % E | 0;
    else {
      for (l = ne / (E[0] + 1) | 0, l > 1 && (E = e(E, l), T = e(T, l), S = E.length, O = T.length), x = S, m = T.slice(0, S), v = m.length; v < S; ) m[v++] = 0;
      N = E.slice(), N.unshift(0), _ = E[0], E[1] >= ne / 2 && ++_;
      do
        l = 0, u = t(E, m, S, v), u < 0 ? (g = m[0], S != v && (g = g * ne + (m[1] || 0)), l = g / _ | 0, l > 1 ? (l >= ne && (l = ne - 1), f = e(E, l), d = f.length, v = m.length, u = t(f, m, d, v), u == 1 && (l--, r(f, S < d ? N : E, d))) : (l == 0 && (u = l = 1), f = E.slice()), d = f.length, d < v && f.unshift(0), r(m, f, v), u == -1 && (v = m.length, u = t(E, m, S, v), u < 1 && (l++, r(m, S < v ? N : E, v))), v = m.length) : u === 0 && (l++, m = [0]), p[c++] = l, u && m[0] ? m[v++] = T[x] || 0 : (m = [T[x]], v = 1);
      while ((x++ < O || m[0] !== void 0) && w--);
    }
    return p[0] || p.shift(), h.e = s, V(h, o ? a + Z(h) + 1 : a);
  };
})();
function Rd(e, t) {
  var r, n, i, a, o, u, s = 0, c = 0, l = e.constructor, f = l.precision;
  if (Z(e) > 16) throw Error(Yo + Z(e));
  if (!e.s) return new l(Pe);
  for (Y = !1, u = f, o = new l(0.03125); e.abs().gte(0.1); )
    e = e.times(o), c += 5;
  for (n = Math.log(Dt(2, c)) / Math.LN10 * 2 + 5 | 0, u += n, r = i = a = new l(Pe), l.precision = u; ; ) {
    if (i = V(i.times(e), u), r = r.times(++s), o = a.plus(it(i, r, u)), Ge(o.d).slice(0, u) === Ge(a.d).slice(0, u)) {
      for (; c--; ) a = V(a.times(a), u);
      return l.precision = f, t == null ? (Y = !0, V(a, f)) : a;
    }
    a = o;
  }
}
function Z(e) {
  for (var t = e.e * H, r = e.d[0]; r >= 10; r /= 10) t++;
  return t;
}
function Ea(e, t, r) {
  if (t > e.LN10.sd())
    throw Y = !0, r && (e.precision = r), Error(Re + "LN10 precision limit exceeded");
  return V(new e(e.LN10), t);
}
function ht(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function Gr(e, t) {
  var r, n, i, a, o, u, s, c, l, f = 1, d = 10, h = e, p = h.d, m = h.constructor, v = m.precision;
  if (h.s < 1) throw Error(Re + (h.s ? "NaN" : "-Infinity"));
  if (h.eq(Pe)) return new m(0);
  if (t == null ? (Y = !1, c = v) : c = t, h.eq(10))
    return t == null && (Y = !0), Ea(m, c);
  if (c += d, m.precision = c, r = Ge(p), n = r.charAt(0), a = Z(h), Math.abs(a) < 15e14) {
    for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; )
      h = h.times(e), r = Ge(h.d), n = r.charAt(0), f++;
    a = Z(h), n > 1 ? (h = new m("0." + r), a++) : h = new m(n + "." + r.slice(1));
  } else
    return s = Ea(m, c + 2, v).times(a + ""), h = Gr(new m(n + "." + r.slice(1)), c - d).plus(s), m.precision = v, t == null ? (Y = !0, V(h, v)) : h;
  for (u = o = h = it(h.minus(Pe), h.plus(Pe), c), l = V(h.times(h), c), i = 3; ; ) {
    if (o = V(o.times(l), c), s = u.plus(it(o, new m(i), c)), Ge(s.d).slice(0, c) === Ge(u.d).slice(0, c))
      return u = u.times(2), a !== 0 && (u = u.plus(Ea(m, c + 2, v).times(a + ""))), u = it(u, new m(f), c), m.precision = v, t == null ? (Y = !0, V(u, v)) : u;
    u = s, i += 2;
  }
}
function Dc(e, t) {
  var r, n, i;
  for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; ) ++n;
  for (i = t.length; t.charCodeAt(i - 1) === 48; ) --i;
  if (t = t.slice(n, i), t) {
    if (i -= n, r = r - n - 1, e.e = Pr(r / H), e.d = [], n = (r + 1) % H, r < 0 && (n += H), n < i) {
      for (n && e.d.push(+t.slice(0, n)), i -= H; n < i; ) e.d.push(+t.slice(n, n += H));
      t = t.slice(n), n = H - t.length;
    } else
      n -= i;
    for (; n--; ) t += "0";
    if (e.d.push(+t), Y && (e.e > pi || e.e < -pi)) throw Error(Yo + r);
  } else
    e.s = 0, e.e = 0, e.d = [0];
  return e;
}
function V(e, t, r) {
  var n, i, a, o, u, s, c, l, f = e.d;
  for (o = 1, a = f[0]; a >= 10; a /= 10) o++;
  if (n = t - o, n < 0)
    n += H, i = t, c = f[l = 0];
  else {
    if (l = Math.ceil((n + 1) / H), a = f.length, l >= a) return e;
    for (c = a = f[l], o = 1; a >= 10; a /= 10) o++;
    n %= H, i = n - H + o;
  }
  if (r !== void 0 && (a = Dt(10, o - i - 1), u = c / a % 10 | 0, s = t < 0 || f[l + 1] !== void 0 || c % a, s = r < 4 ? (u || s) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : u > 5 || u == 5 && (r == 4 || s || r == 6 && // Check whether the digit to the left of the rounding digit is odd.
  (n > 0 ? i > 0 ? c / Dt(10, o - i) : 0 : f[l - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7))), t < 1 || !f[0])
    return s ? (a = Z(e), f.length = 1, t = t - a - 1, f[0] = Dt(10, (H - t % H) % H), e.e = Pr(-t / H) || 0) : (f.length = 1, f[0] = e.e = e.s = 0), e;
  if (n == 0 ? (f.length = l, a = 1, l--) : (f.length = l + 1, a = Dt(10, H - n), f[l] = i > 0 ? (c / Dt(10, o - i) % Dt(10, i) | 0) * a : 0), s)
    for (; ; )
      if (l == 0) {
        (f[0] += a) == ne && (f[0] = 1, ++e.e);
        break;
      } else {
        if (f[l] += a, f[l] != ne) break;
        f[l--] = 0, a = 1;
      }
  for (n = f.length; f[--n] === 0; ) f.pop();
  if (Y && (e.e > pi || e.e < -pi))
    throw Error(Yo + Z(e));
  return e;
}
function Ld(e, t) {
  var r, n, i, a, o, u, s, c, l, f, d = e.constructor, h = d.precision;
  if (!e.s || !t.s)
    return t.s ? t.s = -t.s : t = new d(e), Y ? V(t, h) : t;
  if (s = e.d, f = t.d, n = t.e, c = e.e, s = s.slice(), o = c - n, o) {
    for (l = o < 0, l ? (r = s, o = -o, u = f.length) : (r = f, n = c, u = s.length), i = Math.max(Math.ceil(h / H), u) + 2, o > i && (o = i, r.length = 1), r.reverse(), i = o; i--; ) r.push(0);
    r.reverse();
  } else {
    for (i = s.length, u = f.length, l = i < u, l && (u = i), i = 0; i < u; i++)
      if (s[i] != f[i]) {
        l = s[i] < f[i];
        break;
      }
    o = 0;
  }
  for (l && (r = s, s = f, f = r, t.s = -t.s), u = s.length, i = f.length - u; i > 0; --i) s[u++] = 0;
  for (i = f.length; i > o; ) {
    if (s[--i] < f[i]) {
      for (a = i; a && s[--a] === 0; ) s[a] = ne - 1;
      --s[a], s[i] += ne;
    }
    s[i] -= f[i];
  }
  for (; s[--u] === 0; ) s.pop();
  for (; s[0] === 0; s.shift()) --n;
  return s[0] ? (t.d = s, t.e = n, Y ? V(t, h) : t) : new d(0);
}
function Ht(e, t, r) {
  var n, i = Z(e), a = Ge(e.d), o = a.length;
  return t ? (r && (n = r - o) > 0 ? a = a.charAt(0) + "." + a.slice(1) + ht(n) : o > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (i < 0 ? "e" : "e+") + i) : i < 0 ? (a = "0." + ht(-i - 1) + a, r && (n = r - o) > 0 && (a += ht(n))) : i >= o ? (a += ht(i + 1 - o), r && (n = r - i - 1) > 0 && (a = a + "." + ht(n))) : ((n = i + 1) < o && (a = a.slice(0, n) + "." + a.slice(n)), r && (n = r - o) > 0 && (i + 1 === o && (a += "."), a += ht(n))), e.s < 0 ? "-" + a : a;
}
function Ic(e, t) {
  if (e.length > t)
    return e.length = t, !0;
}
function zd(e) {
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
        throw Error(Ft + a);
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
      return Dc(o, a.toString());
    } else if (typeof a != "string")
      throw Error(Ft + a);
    if (a.charCodeAt(0) === 45 ? (a = a.slice(1), o.s = -1) : o.s = 1, Gw.test(a)) Dc(o, a);
    else throw Error(Ft + a);
  }
  if (i.prototype = M, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = zd, i.config = i.set = Xw, e === void 0 && (e = {}), e)
    for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
  return i.config(e), i;
}
function Xw(e) {
  if (!e || typeof e != "object")
    throw Error(Re + "Object expected");
  var t, r, n, i = [
    "precision",
    1,
    Or,
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
      if (Pr(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n;
      else throw Error(Ft + r + ": " + n);
  if ((n = e[r = "LN10"]) !== void 0)
    if (n == Math.LN10) this[r] = new this(n);
    else throw Error(Ft + r + ": " + n);
  return this;
}
var Go = zd(Yw);
Pe = new Go(1);
const $ = Go;
function Fd(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new $(e).abs().log(10).toNumber()) + 1, t;
}
function Bd(e, t, r) {
  for (var n = new $(e), i = 0, a = []; n.lt(t) && i < 1e5; )
    a.push(n.toNumber()), n = n.add(r), i++;
  return a;
}
var Ud = (e) => {
  var [t, r] = e, [n, i] = [t, r];
  return t > r && ([n, i] = [r, t]), [n, i];
}, Xo = (e, t, r) => {
  if (e.lte(0))
    return new $(0);
  var n = Fd(e.toNumber()), i = new $(10).pow(n), a = e.div(i), o = n !== 1 ? 0.05 : 0.1, u = new $(Math.ceil(a.div(o).toNumber())).add(r).mul(o), s = u.mul(i);
  return t ? new $(s.toNumber()) : new $(Math.ceil(s.toNumber()));
}, Vd = (e, t, r) => {
  var n;
  if (e.lte(0))
    return new $(0);
  var i = [1, 2, 2.5, 5], a = e.toNumber(), o = Math.floor(new $(a).abs().log(10).toNumber()), u = new $(10).pow(o), s = e.div(u).toNumber(), c = i.findIndex((h) => h >= s - 1e-10);
  if (c === -1 && (u = u.mul(10), c = 0), c += r, c >= i.length) {
    var l = Math.floor(c / i.length);
    c %= i.length, u = u.mul(new $(10).pow(l));
  }
  var f = (n = i[c]) !== null && n !== void 0 ? n : 1, d = new $(f).mul(u);
  return t ? d : new $(Math.ceil(d.toNumber()));
}, Zw = (e, t, r) => {
  var n = new $(1), i = new $(e);
  if (!i.isint() && r) {
    var a = Math.abs(e);
    a < 1 ? (n = new $(10).pow(Fd(e) - 1), i = new $(Math.floor(i.div(n).toNumber())).mul(n)) : a > 1 && (i = new $(Math.floor(e)));
  } else e === 0 ? i = new $(Math.floor((t - 1) / 2)) : r || (i = new $(Math.floor(e)));
  for (var o = Math.floor((t - 1) / 2), u = [], s = 0; s < t; s++)
    u.push(i.add(new $(s - o).mul(n)).toNumber());
  return u;
}, Wd = function(t, r, n, i) {
  var a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0, o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : Xo;
  if (!Number.isFinite((r - t) / (n - 1)))
    return {
      step: new $(0),
      tickMin: new $(0),
      tickMax: new $(0)
    };
  var u = o(new $(r).sub(t).div(n - 1), i, a), s;
  t <= 0 && r >= 0 ? s = new $(0) : (s = new $(t).add(r).div(2), s = s.sub(new $(s).mod(u)));
  var c = Math.ceil(s.sub(t).div(u).toNumber()), l = Math.ceil(new $(r).sub(s).div(u).toNumber()), f = c + l + 1;
  return f > n ? Wd(t, r, n, i, a + 1, o) : (f < n && (l = r > 0 ? l + (n - f) : l, c = r > 0 ? c : c + (n - f)), {
    step: u,
    tickMin: s.sub(new $(c).mul(u)),
    tickMax: s.add(new $(l).mul(u))
  });
}, Tc = function(t) {
  var [r, n] = t, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", u = Math.max(i, 2), [s, c] = Ud([r, n]);
  if (s === -1 / 0 || c === 1 / 0) {
    var l = c === 1 / 0 ? [s, ...Array(i - 1).fill(1 / 0)] : [...Array(i - 1).fill(-1 / 0), c];
    return r > n ? l.reverse() : l;
  }
  if (s === c)
    return Zw(s, i, a);
  var f = o === "snap125" ? Vd : Xo, {
    step: d,
    tickMin: h,
    tickMax: p
  } = Wd(s, c, u, a, 0, f), m = Bd(h, p.add(new $(0.1).mul(d)), d);
  return r > n ? m.reverse() : m;
}, kc = function(t, r) {
  var [n, i] = t, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", [u, s] = Ud([n, i]);
  if (u === -1 / 0 || s === 1 / 0)
    return [n, i];
  if (u === s)
    return [u];
  var c = o === "snap125" ? Vd : Xo, l = Math.max(r, 2), f = c(new $(s).sub(u).div(l - 1), a, 0), d = [...Bd(new $(u), new $(s), f), s];
  return a === !1 && (d = d.map((h) => Math.round(h))), n > i ? d.reverse() : d;
}, Qw = (e) => e.rootProps.barCategoryGap, Yi = (e) => e.rootProps.stackOffset, Kd = (e) => e.rootProps.reverseStackOrder, Zo = (e) => e.options.chartName, Qo = (e) => e.rootProps.syncId, qd = (e) => e.rootProps.syncMethod, Jo = (e) => e.options.eventEmitter, CS = (e) => e.rootProps.baseValue, jt = {
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
}, Mt = {
  allowDecimals: !1,
  // if I set this to false then Tooltip synchronisation stops working in Radar, wtf
  allowDataOverflow: !1,
  angleAxisId: 0,
  reversed: !1,
  scale: "auto",
  tick: !0,
  type: "auto"
}, We = {
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
}, Gi = (e, t) => {
  if (!(!e || !t))
    return e != null && e.reversed ? [t[1], t[0]] : t;
};
function Hd(e, t, r) {
  if (r !== "auto")
    return r;
  if (e != null)
    return bt(e, t) ? "category" : "number";
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
function vi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? jc(Object(r), !0).forEach(function(n) {
      Jw(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : jc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Jw(e, t, r) {
  return (t = e1(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function e1(e) {
  var t = t1(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function t1(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var $c = {
  allowDataOverflow: Mt.allowDataOverflow,
  allowDecimals: Mt.allowDecimals,
  allowDuplicatedCategory: !1,
  // defaultPolarAngleAxisProps.allowDuplicatedCategory has it set to true but the actual axis rendering ignores the prop because reasons,
  dataKey: void 0,
  domain: void 0,
  id: Mt.angleAxisId,
  includeHidden: !1,
  name: void 0,
  reversed: Mt.reversed,
  scale: Mt.scale,
  tick: Mt.tick,
  tickCount: void 0,
  ticks: void 0,
  type: Mt.type,
  unit: void 0,
  niceTicks: "auto"
}, Rc = {
  allowDataOverflow: We.allowDataOverflow,
  allowDecimals: We.allowDecimals,
  allowDuplicatedCategory: We.allowDuplicatedCategory,
  dataKey: void 0,
  domain: void 0,
  id: We.radiusAxisId,
  includeHidden: We.includeHidden,
  name: void 0,
  reversed: We.reversed,
  scale: We.scale,
  tick: We.tick,
  tickCount: We.tickCount,
  ticks: void 0,
  type: We.type,
  unit: void 0,
  niceTicks: "auto"
}, r1 = (e, t) => {
  if (t != null)
    return e.polarAxis.angleAxis[t];
}, eu = b([r1, vd], (e, t) => {
  var r;
  if (e != null)
    return e;
  var n = (r = Hd(t, "angleAxis", $c.type)) !== null && r !== void 0 ? r : "category";
  return vi(vi({}, $c), {}, {
    type: n
  });
}), n1 = (e, t) => e.polarAxis.radiusAxis[t], tu = b([n1, vd], (e, t) => {
  var r;
  if (e != null)
    return e;
  var n = (r = Hd(t, "radiusAxis", Rc.type)) !== null && r !== void 0 ? r : "category";
  return vi(vi({}, Rc), {}, {
    type: n
  });
}), Xi = (e) => e.polarOptions, ru = b([wt, _t, pe], jw), Yd = b([Xi, ru], (e, t) => {
  if (e != null)
    return lr(e.innerRadius, t, 0);
}), Gd = b([Xi, ru], (e, t) => {
  if (e != null)
    return lr(e.outerRadius, t, t * 0.8);
}), i1 = (e) => {
  if (e == null)
    return [0, 0];
  var {
    startAngle: t,
    endAngle: r
  } = e;
  return [t, r];
}, Xd = b([Xi], i1);
b([eu, Xd], Gi);
var Zd = b([ru, Yd, Gd], (e, t, r) => {
  if (!(e == null || t == null || r == null))
    return [t, r];
});
b([tu, Zd], Gi);
var DS = b([Q, Xi, Yd, Gd, wt, _t], (e, t, r, n, i, a) => {
  if (!(e !== "centric" && e !== "radial" || t == null || r == null || n == null)) {
    var {
      cx: o,
      cy: u,
      startAngle: s,
      endAngle: c
    } = t;
    return {
      cx: lr(o, i, i / 2),
      cy: lr(u, a, a / 2),
      innerRadius: r,
      outerRadius: n,
      startAngle: s,
      endAngle: c,
      clockWise: !1
      // this property look useful, why not use it?
    };
  }
}), ie = (e, t) => t, Zi = (e, t, r) => r;
function Qd(e) {
  return e?.id;
}
function Jd(e, t, r) {
  var {
    chartData: n = []
  } = t, {
    allowDuplicatedCategory: i,
    dataKey: a
  } = r, o = /* @__PURE__ */ new Map();
  return e.forEach((u) => {
    var s, c = (s = u.data) !== null && s !== void 0 ? s : n;
    if (!(c == null || c.length === 0)) {
      var l = Qd(u);
      c.forEach((f, d) => {
        var h = a == null || i ? d : String(we(f, a, null)), p = we(f, u.dataKey, 0), m;
        o.has(h) ? m = o.get(h) : m = {}, Object.assign(m, {
          [l]: p
        }), o.set(h, m);
      });
    }
  }), Array.from(o.values());
}
function nu(e) {
  return "stackId" in e && e.stackId != null && e.dataKey != null;
}
var Qi = (e, t) => e === t ? !0 : e == null || t == null ? !1 : e[0] === t[0] && e[1] === t[1];
function Ji(e, t) {
  return Array.isArray(e) && Array.isArray(t) && e.length === 0 && t.length === 0 ? !0 : e === t;
}
function a1(e, t) {
  if (e.length === t.length) {
    for (var r = 0; r < e.length; r++)
      if (e[r] !== t[r])
        return !1;
    return !0;
  }
  return !1;
}
var se = (e) => {
  var t = Q(e);
  return t === "horizontal" ? "xAxis" : t === "vertical" ? "yAxis" : t === "centric" ? "angleAxis" : "radiusAxis";
}, Er = (e) => e.tooltip.settings.axisId;
function iu(e) {
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
        var o = i[0], u = i[1];
        return o <= u ? a >= o && a <= u : a >= u && a <= o;
      },
      bandwidth: r ? () => r.call(e) : void 0,
      ticks: t ? (a) => t.call(e, a) : void 0,
      map: (a, o) => {
        var u = e(a);
        if (u != null) {
          if (e.bandwidth && o !== null && o !== void 0 && o.position) {
            var s = e.bandwidth();
            switch (o.position) {
              case "middle":
                u += s / 2;
                break;
              case "end":
                u += s;
                break;
            }
          }
          return u;
        }
      }
    };
  }
}
var o1 = (e, t) => {
  if (t != null)
    switch (e) {
      case "linear": {
        if (!Xe(t)) {
          for (var r, n, i = 0; i < t.length; i++) {
            var a = t[i];
            U(a) && ((r === void 0 || a < r) && (r = a), (n === void 0 || a > n) && (n = a));
          }
          return r !== void 0 && n !== void 0 ? [r, n] : void 0;
        }
        return t;
      }
      default:
        return t;
    }
};
function mt(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function u1(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function au(e) {
  let t, r, n;
  e.length !== 2 ? (t = mt, r = (u, s) => mt(e(u), s), n = (u, s) => e(u) - s) : (t = e === mt || e === u1 ? e : s1, r = e, n = e);
  function i(u, s, c = 0, l = u.length) {
    if (c < l) {
      if (t(s, s) !== 0) return l;
      do {
        const f = c + l >>> 1;
        r(u[f], s) < 0 ? c = f + 1 : l = f;
      } while (c < l);
    }
    return c;
  }
  function a(u, s, c = 0, l = u.length) {
    if (c < l) {
      if (t(s, s) !== 0) return l;
      do {
        const f = c + l >>> 1;
        r(u[f], s) <= 0 ? c = f + 1 : l = f;
      } while (c < l);
    }
    return c;
  }
  function o(u, s, c = 0, l = u.length) {
    const f = i(u, s, c, l - 1);
    return f > c && n(u[f - 1], s) > -n(u[f], s) ? f - 1 : f;
  }
  return { left: i, center: o, right: a };
}
function s1() {
  return 0;
}
function eh(e) {
  return e === null ? NaN : +e;
}
function* c1(e, t) {
  for (let r of e)
    r != null && (r = +r) >= r && (yield r);
}
const l1 = au(mt), dn = l1.right;
au(eh).center;
class Lc extends Map {
  constructor(t, r = h1) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: r } }), t != null) for (const [n, i] of t) this.set(n, i);
  }
  get(t) {
    return super.get(zc(this, t));
  }
  has(t) {
    return super.has(zc(this, t));
  }
  set(t, r) {
    return super.set(f1(this, t), r);
  }
  delete(t) {
    return super.delete(d1(this, t));
  }
}
function zc({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : r;
}
function f1({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r);
}
function d1({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) && (r = e.get(n), e.delete(n)), r;
}
function h1(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function p1(e = mt) {
  if (e === mt) return th;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    const n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0);
  };
}
function th(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0);
}
const v1 = Math.sqrt(50), m1 = Math.sqrt(10), g1 = Math.sqrt(2);
function mi(e, t, r) {
  const n = (t - e) / Math.max(0, r), i = Math.floor(Math.log10(n)), a = n / Math.pow(10, i), o = a >= v1 ? 10 : a >= m1 ? 5 : a >= g1 ? 2 : 1;
  let u, s, c;
  return i < 0 ? (c = Math.pow(10, -i) / o, u = Math.round(e * c), s = Math.round(t * c), u / c < e && ++u, s / c > t && --s, c = -c) : (c = Math.pow(10, i) * o, u = Math.round(e / c), s = Math.round(t / c), u * c < e && ++u, s * c > t && --s), s < u && 0.5 <= r && r < 2 ? mi(e, t, r * 2) : [u, s, c];
}
function mo(e, t, r) {
  if (t = +t, e = +e, r = +r, !(r > 0)) return [];
  if (e === t) return [e];
  const n = t < e, [i, a, o] = n ? mi(t, e, r) : mi(e, t, r);
  if (!(a >= i)) return [];
  const u = a - i + 1, s = new Array(u);
  if (n)
    if (o < 0) for (let c = 0; c < u; ++c) s[c] = (a - c) / -o;
    else for (let c = 0; c < u; ++c) s[c] = (a - c) * o;
  else if (o < 0) for (let c = 0; c < u; ++c) s[c] = (i + c) / -o;
  else for (let c = 0; c < u; ++c) s[c] = (i + c) * o;
  return s;
}
function go(e, t, r) {
  return t = +t, e = +e, r = +r, mi(e, t, r)[2];
}
function yo(e, t, r) {
  t = +t, e = +e, r = +r;
  const n = t < e, i = n ? go(t, e, r) : go(e, t, r);
  return (n ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function Fc(e, t) {
  let r;
  for (const n of e)
    n != null && (r < n || r === void 0 && n >= n) && (r = n);
  return r;
}
function Bc(e, t) {
  let r;
  for (const n of e)
    n != null && (r > n || r === void 0 && n >= n) && (r = n);
  return r;
}
function rh(e, t, r = 0, n = 1 / 0, i) {
  if (t = Math.floor(t), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(e.length - 1, n)), !(r <= t && t <= n)) return e;
  for (i = i === void 0 ? th : p1(i); n > r; ) {
    if (n - r > 600) {
      const s = n - r + 1, c = t - r + 1, l = Math.log(s), f = 0.5 * Math.exp(2 * l / 3), d = 0.5 * Math.sqrt(l * f * (s - f) / s) * (c - s / 2 < 0 ? -1 : 1), h = Math.max(r, Math.floor(t - c * f / s + d)), p = Math.min(n, Math.floor(t + (s - c) * f / s + d));
      rh(e, t, h, p, i);
    }
    const a = e[t];
    let o = r, u = n;
    for (kr(e, r, t), i(e[n], a) > 0 && kr(e, r, n); o < u; ) {
      for (kr(e, o, u), ++o, --u; i(e[o], a) < 0; ) ++o;
      for (; i(e[u], a) > 0; ) --u;
    }
    i(e[r], a) === 0 ? kr(e, r, u) : (++u, kr(e, u, n)), u <= t && (r = u + 1), t <= u && (n = u - 1);
  }
  return e;
}
function kr(e, t, r) {
  const n = e[t];
  e[t] = e[r], e[r] = n;
}
function y1(e, t, r) {
  if (e = Float64Array.from(c1(e)), !(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return Bc(e);
    if (t >= 1) return Fc(e);
    var n, i = (n - 1) * t, a = Math.floor(i), o = Fc(rh(e, a).subarray(0, a + 1)), u = Bc(e.subarray(a + 1));
    return o + (u - o) * (i - a);
  }
}
function b1(e, t, r = eh) {
  if (!(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return +r(e[0], 0, e);
    if (t >= 1) return +r(e[n - 1], n - 1, e);
    var n, i = (n - 1) * t, a = Math.floor(i), o = +r(e[a], a, e), u = +r(e[a + 1], a + 1, e);
    return o + (u - o) * (i - a);
  }
}
function w1(e, t, r) {
  e = +e, t = +t, r = (i = arguments.length) < 2 ? (t = e, e = 0, 1) : i < 3 ? 1 : +r;
  for (var n = -1, i = Math.max(0, Math.ceil((t - e) / r)) | 0, a = new Array(i); ++n < i; )
    a[n] = e + n * r;
  return a;
}
function Le(e, t) {
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
function ft(e, t) {
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
const bo = Symbol("implicit");
function ou() {
  var e = new Lc(), t = [], r = [], n = bo;
  function i(a) {
    let o = e.get(a);
    if (o === void 0) {
      if (n !== bo) return n;
      e.set(a, o = t.push(a) - 1);
    }
    return r[o % r.length];
  }
  return i.domain = function(a) {
    if (!arguments.length) return t.slice();
    t = [], e = new Lc();
    for (const o of a)
      e.has(o) || e.set(o, t.push(o) - 1);
    return i;
  }, i.range = function(a) {
    return arguments.length ? (r = Array.from(a), i) : r.slice();
  }, i.unknown = function(a) {
    return arguments.length ? (n = a, i) : n;
  }, i.copy = function() {
    return ou(t, r).unknown(n);
  }, Le.apply(i, arguments), i;
}
function uu() {
  var e = ou().unknown(void 0), t = e.domain, r = e.range, n = 0, i = 1, a, o, u = !1, s = 0, c = 0, l = 0.5;
  delete e.unknown;
  function f() {
    var d = t().length, h = i < n, p = h ? i : n, m = h ? n : i;
    a = (m - p) / Math.max(1, d - s + c * 2), u && (a = Math.floor(a)), p += (m - p - a * (d - s)) * l, o = a * (1 - s), u && (p = Math.round(p), o = Math.round(o));
    var v = w1(d).map(function(g) {
      return p + a * g;
    });
    return r(h ? v.reverse() : v);
  }
  return e.domain = function(d) {
    return arguments.length ? (t(d), f()) : t();
  }, e.range = function(d) {
    return arguments.length ? ([n, i] = d, n = +n, i = +i, f()) : [n, i];
  }, e.rangeRound = function(d) {
    return [n, i] = d, n = +n, i = +i, u = !0, f();
  }, e.bandwidth = function() {
    return o;
  }, e.step = function() {
    return a;
  }, e.round = function(d) {
    return arguments.length ? (u = !!d, f()) : u;
  }, e.padding = function(d) {
    return arguments.length ? (s = Math.min(1, c = +d), f()) : s;
  }, e.paddingInner = function(d) {
    return arguments.length ? (s = Math.min(1, d), f()) : s;
  }, e.paddingOuter = function(d) {
    return arguments.length ? (c = +d, f()) : c;
  }, e.align = function(d) {
    return arguments.length ? (l = Math.max(0, Math.min(1, d)), f()) : l;
  }, e.copy = function() {
    return uu(t(), [n, i]).round(u).paddingInner(s).paddingOuter(c).align(l);
  }, Le.apply(f(), arguments);
}
function nh(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return nh(t());
  }, e;
}
function _1() {
  return nh(uu.apply(null, arguments).paddingInner(1));
}
function su(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e;
}
function ih(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r;
}
function hn() {
}
var Xr = 0.7, gi = 1 / Xr, sr = "\\s*([+-]?\\d+)\\s*", Zr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ze = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", x1 = /^#([0-9a-f]{3,8})$/, O1 = new RegExp(`^rgb\\(${sr},${sr},${sr}\\)$`), P1 = new RegExp(`^rgb\\(${Ze},${Ze},${Ze}\\)$`), E1 = new RegExp(`^rgba\\(${sr},${sr},${sr},${Zr}\\)$`), S1 = new RegExp(`^rgba\\(${Ze},${Ze},${Ze},${Zr}\\)$`), A1 = new RegExp(`^hsl\\(${Zr},${Ze},${Ze}\\)$`), M1 = new RegExp(`^hsla\\(${Zr},${Ze},${Ze},${Zr}\\)$`), Uc = {
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
su(hn, Qr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Vc,
  // Deprecated! Use color.formatHex.
  formatHex: Vc,
  formatHex8: N1,
  formatHsl: C1,
  formatRgb: Wc,
  toString: Wc
});
function Vc() {
  return this.rgb().formatHex();
}
function N1() {
  return this.rgb().formatHex8();
}
function C1() {
  return ah(this).formatHsl();
}
function Wc() {
  return this.rgb().formatRgb();
}
function Qr(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = x1.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? Kc(t) : r === 3 ? new be(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? $n(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? $n(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = O1.exec(e)) ? new be(t[1], t[2], t[3], 1) : (t = P1.exec(e)) ? new be(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = E1.exec(e)) ? $n(t[1], t[2], t[3], t[4]) : (t = S1.exec(e)) ? $n(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = A1.exec(e)) ? Yc(t[1], t[2] / 100, t[3] / 100, 1) : (t = M1.exec(e)) ? Yc(t[1], t[2] / 100, t[3] / 100, t[4]) : Uc.hasOwnProperty(e) ? Kc(Uc[e]) : e === "transparent" ? new be(NaN, NaN, NaN, 0) : null;
}
function Kc(e) {
  return new be(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function $n(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new be(e, t, r, n);
}
function D1(e) {
  return e instanceof hn || (e = Qr(e)), e ? (e = e.rgb(), new be(e.r, e.g, e.b, e.opacity)) : new be();
}
function wo(e, t, r, n) {
  return arguments.length === 1 ? D1(e) : new be(e, t, r, n ?? 1);
}
function be(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n;
}
su(be, wo, ih(hn, {
  brighter(e) {
    return e = e == null ? gi : Math.pow(gi, e), new be(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Xr : Math.pow(Xr, e), new be(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new be(Bt(this.r), Bt(this.g), Bt(this.b), yi(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: qc,
  // Deprecated! Use color.formatHex.
  formatHex: qc,
  formatHex8: I1,
  formatRgb: Hc,
  toString: Hc
}));
function qc() {
  return `#${$t(this.r)}${$t(this.g)}${$t(this.b)}`;
}
function I1() {
  return `#${$t(this.r)}${$t(this.g)}${$t(this.b)}${$t((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Hc() {
  const e = yi(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Bt(this.r)}, ${Bt(this.g)}, ${Bt(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function yi(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Bt(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function $t(e) {
  return e = Bt(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Yc(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Fe(e, t, r, n);
}
function ah(e) {
  if (e instanceof Fe) return new Fe(e.h, e.s, e.l, e.opacity);
  if (e instanceof hn || (e = Qr(e)), !e) return new Fe();
  if (e instanceof Fe) return e;
  e = e.rgb();
  var t = e.r / 255, r = e.g / 255, n = e.b / 255, i = Math.min(t, r, n), a = Math.max(t, r, n), o = NaN, u = a - i, s = (a + i) / 2;
  return u ? (t === a ? o = (r - n) / u + (r < n) * 6 : r === a ? o = (n - t) / u + 2 : o = (t - r) / u + 4, u /= s < 0.5 ? a + i : 2 - a - i, o *= 60) : u = s > 0 && s < 1 ? 0 : o, new Fe(o, u, s, e.opacity);
}
function T1(e, t, r, n) {
  return arguments.length === 1 ? ah(e) : new Fe(e, t, r, n ?? 1);
}
function Fe(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
}
su(Fe, T1, ih(hn, {
  brighter(e) {
    return e = e == null ? gi : Math.pow(gi, e), new Fe(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Xr : Math.pow(Xr, e), new Fe(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, n = r + (r < 0.5 ? r : 1 - r) * t, i = 2 * r - n;
    return new be(
      Sa(e >= 240 ? e - 240 : e + 120, i, n),
      Sa(e, i, n),
      Sa(e < 120 ? e + 240 : e - 120, i, n),
      this.opacity
    );
  },
  clamp() {
    return new Fe(Gc(this.h), Rn(this.s), Rn(this.l), yi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = yi(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Gc(this.h)}, ${Rn(this.s) * 100}%, ${Rn(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Gc(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Rn(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Sa(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
}
const cu = (e) => () => e;
function k1(e, t) {
  return function(r) {
    return e + r * t;
  };
}
function j1(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r, function(n) {
    return Math.pow(e + n * t, r);
  };
}
function $1(e) {
  return (e = +e) == 1 ? oh : function(t, r) {
    return r - t ? j1(t, r, e) : cu(isNaN(t) ? r : t);
  };
}
function oh(e, t) {
  var r = t - e;
  return r ? k1(e, r) : cu(isNaN(e) ? t : e);
}
const Xc = (function e(t) {
  var r = $1(t);
  function n(i, a) {
    var o = r((i = wo(i)).r, (a = wo(a)).r), u = r(i.g, a.g), s = r(i.b, a.b), c = oh(i.opacity, a.opacity);
    return function(l) {
      return i.r = o(l), i.g = u(l), i.b = s(l), i.opacity = c(l), i + "";
    };
  }
  return n.gamma = e, n;
})(1);
function R1(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0, n = t.slice(), i;
  return function(a) {
    for (i = 0; i < r; ++i) n[i] = e[i] * (1 - a) + t[i] * a;
    return n;
  };
}
function L1(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function z1(e, t) {
  var r = t ? t.length : 0, n = e ? Math.min(r, e.length) : 0, i = new Array(n), a = new Array(r), o;
  for (o = 0; o < n; ++o) i[o] = Sr(e[o], t[o]);
  for (; o < r; ++o) a[o] = t[o];
  return function(u) {
    for (o = 0; o < n; ++o) a[o] = i[o](u);
    return a;
  };
}
function F1(e, t) {
  var r = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(n) {
    return r.setTime(e * (1 - n) + t * n), r;
  };
}
function bi(e, t) {
  return e = +e, t = +t, function(r) {
    return e * (1 - r) + t * r;
  };
}
function B1(e, t) {
  var r = {}, n = {}, i;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t)
    i in e ? r[i] = Sr(e[i], t[i]) : n[i] = t[i];
  return function(a) {
    for (i in r) n[i] = r[i](a);
    return n;
  };
}
var _o = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Aa = new RegExp(_o.source, "g");
function U1(e) {
  return function() {
    return e;
  };
}
function V1(e) {
  return function(t) {
    return e(t) + "";
  };
}
function W1(e, t) {
  var r = _o.lastIndex = Aa.lastIndex = 0, n, i, a, o = -1, u = [], s = [];
  for (e = e + "", t = t + ""; (n = _o.exec(e)) && (i = Aa.exec(t)); )
    (a = i.index) > r && (a = t.slice(r, a), u[o] ? u[o] += a : u[++o] = a), (n = n[0]) === (i = i[0]) ? u[o] ? u[o] += i : u[++o] = i : (u[++o] = null, s.push({ i: o, x: bi(n, i) })), r = Aa.lastIndex;
  return r < t.length && (a = t.slice(r), u[o] ? u[o] += a : u[++o] = a), u.length < 2 ? s[0] ? V1(s[0].x) : U1(t) : (t = s.length, function(c) {
    for (var l = 0, f; l < t; ++l) u[(f = s[l]).i] = f.x(c);
    return u.join("");
  });
}
function Sr(e, t) {
  var r = typeof t, n;
  return t == null || r === "boolean" ? cu(t) : (r === "number" ? bi : r === "string" ? (n = Qr(t)) ? (t = n, Xc) : W1 : t instanceof Qr ? Xc : t instanceof Date ? F1 : L1(t) ? R1 : Array.isArray(t) ? z1 : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? B1 : bi)(e, t);
}
function lu(e, t) {
  return e = +e, t = +t, function(r) {
    return Math.round(e * (1 - r) + t * r);
  };
}
function K1(e, t) {
  t === void 0 && (t = e, e = Sr);
  for (var r = 0, n = t.length - 1, i = t[0], a = new Array(n < 0 ? 0 : n); r < n; ) a[r] = e(i, i = t[++r]);
  return function(o) {
    var u = Math.max(0, Math.min(n - 1, Math.floor(o *= n)));
    return a[u](o - u);
  };
}
function q1(e) {
  return function() {
    return e;
  };
}
function wi(e) {
  return +e;
}
var Zc = [0, 1];
function he(e) {
  return e;
}
function xo(e, t) {
  return (t -= e = +e) ? function(r) {
    return (r - e) / t;
  } : q1(isNaN(t) ? NaN : 0.5);
}
function H1(e, t) {
  var r;
  return e > t && (r = e, e = t, t = r), function(n) {
    return Math.max(e, Math.min(t, n));
  };
}
function Y1(e, t, r) {
  var n = e[0], i = e[1], a = t[0], o = t[1];
  return i < n ? (n = xo(i, n), a = r(o, a)) : (n = xo(n, i), a = r(a, o)), function(u) {
    return a(n(u));
  };
}
function G1(e, t, r) {
  var n = Math.min(e.length, t.length) - 1, i = new Array(n), a = new Array(n), o = -1;
  for (e[n] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < n; )
    i[o] = xo(e[o], e[o + 1]), a[o] = r(t[o], t[o + 1]);
  return function(u) {
    var s = dn(e, u, 1, n) - 1;
    return a[s](i[s](u));
  };
}
function pn(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function ea() {
  var e = Zc, t = Zc, r = Sr, n, i, a, o = he, u, s, c;
  function l() {
    var d = Math.min(e.length, t.length);
    return o !== he && (o = H1(e[0], e[d - 1])), u = d > 2 ? G1 : Y1, s = c = null, f;
  }
  function f(d) {
    return d == null || isNaN(d = +d) ? a : (s || (s = u(e.map(n), t, r)))(n(o(d)));
  }
  return f.invert = function(d) {
    return o(i((c || (c = u(t, e.map(n), bi)))(d)));
  }, f.domain = function(d) {
    return arguments.length ? (e = Array.from(d, wi), l()) : e.slice();
  }, f.range = function(d) {
    return arguments.length ? (t = Array.from(d), l()) : t.slice();
  }, f.rangeRound = function(d) {
    return t = Array.from(d), r = lu, l();
  }, f.clamp = function(d) {
    return arguments.length ? (o = d ? !0 : he, l()) : o !== he;
  }, f.interpolate = function(d) {
    return arguments.length ? (r = d, l()) : r;
  }, f.unknown = function(d) {
    return arguments.length ? (a = d, f) : a;
  }, function(d, h) {
    return n = d, i = h, l();
  };
}
function fu() {
  return ea()(he, he);
}
function X1(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function _i(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), n = e.slice(0, r);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +e.slice(r + 1)
  ];
}
function gr(e) {
  return e = _i(Math.abs(e)), e ? e[1] : NaN;
}
function Z1(e, t) {
  return function(r, n) {
    for (var i = r.length, a = [], o = 0, u = e[0], s = 0; i > 0 && u > 0 && (s + u + 1 > n && (u = Math.max(1, n - s)), a.push(r.substring(i -= u, i + u)), !((s += u + 1) > n)); )
      u = e[o = (o + 1) % e.length];
    return a.reverse().join(t);
  };
}
function Q1(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(r) {
      return e[+r];
    });
  };
}
var J1 = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Jr(e) {
  if (!(t = J1.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new du({
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
Jr.prototype = du.prototype;
function du(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
du.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function e_(e) {
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
var xi;
function t_(e, t) {
  var r = _i(e, t);
  if (!r) return xi = void 0, e.toPrecision(t);
  var n = r[0], i = r[1], a = i - (xi = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = n.length;
  return a === o ? n : a > o ? n + new Array(a - o + 1).join("0") : a > 0 ? n.slice(0, a) + "." + n.slice(a) : "0." + new Array(1 - a).join("0") + _i(e, Math.max(0, t + a - 1))[0];
}
function Qc(e, t) {
  var r = _i(e, t);
  if (!r) return e + "";
  var n = r[0], i = r[1];
  return i < 0 ? "0." + new Array(-i).join("0") + n : n.length > i + 1 ? n.slice(0, i + 1) + "." + n.slice(i + 1) : n + new Array(i - n.length + 2).join("0");
}
const Jc = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: X1,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => Qc(e * 100, t),
  r: Qc,
  s: t_,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16)
};
function el(e) {
  return e;
}
var tl = Array.prototype.map, rl = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function r_(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? el : Z1(tl.call(e.grouping, Number), e.thousands + ""), r = e.currency === void 0 ? "" : e.currency[0] + "", n = e.currency === void 0 ? "" : e.currency[1] + "", i = e.decimal === void 0 ? "." : e.decimal + "", a = e.numerals === void 0 ? el : Q1(tl.call(e.numerals, String)), o = e.percent === void 0 ? "%" : e.percent + "", u = e.minus === void 0 ? "−" : e.minus + "", s = e.nan === void 0 ? "NaN" : e.nan + "";
  function c(f, d) {
    f = Jr(f);
    var h = f.fill, p = f.align, m = f.sign, v = f.symbol, g = f.zero, w = f.width, y = f.comma, x = f.precision, O = f.trim, _ = f.type;
    _ === "n" ? (y = !0, _ = "g") : Jc[_] || (x === void 0 && (x = 12), O = !0, _ = "g"), (g || h === "0" && p === "=") && (g = !0, h = "0", p = "=");
    var S = (d && d.prefix !== void 0 ? d.prefix : "") + (v === "$" ? r : v === "#" && /[boxX]/.test(_) ? "0" + _.toLowerCase() : ""), N = (v === "$" ? n : /[%p]/.test(_) ? o : "") + (d && d.suffix !== void 0 ? d.suffix : ""), I = Jc[_], D = /[defgprs%]/.test(_);
    x = x === void 0 ? 6 : /[gprs]/.test(_) ? Math.max(1, Math.min(21, x)) : Math.max(0, Math.min(20, x));
    function T(E) {
      var W = S, B = N, G, re, X;
      if (_ === "c")
        B = I(E) + B, E = "";
      else {
        E = +E;
        var Ne = E < 0 || 1 / E < 0;
        if (E = isNaN(E) ? s : I(Math.abs(E), x), O && (E = e_(E)), Ne && +E == 0 && m !== "+" && (Ne = !1), W = (Ne ? m === "(" ? m : u : m === "-" || m === "(" ? "" : m) + W, B = (_ === "s" && !isNaN(E) && xi !== void 0 ? rl[8 + xi / 3] : "") + B + (Ne && m === "(" ? ")" : ""), D) {
          for (G = -1, re = E.length; ++G < re; )
            if (X = E.charCodeAt(G), 48 > X || X > 57) {
              B = (X === 46 ? i + E.slice(G + 1) : E.slice(G)) + B, E = E.slice(0, G);
              break;
            }
        }
      }
      y && !g && (E = t(E, 1 / 0));
      var ce = W.length + E.length + B.length, le = ce < w ? new Array(w - ce + 1).join(h) : "";
      switch (y && g && (E = t(le + E, le.length ? w - B.length : 1 / 0), le = ""), p) {
        case "<":
          E = W + E + B + le;
          break;
        case "=":
          E = W + le + E + B;
          break;
        case "^":
          E = le.slice(0, ce = le.length >> 1) + W + E + B + le.slice(ce);
          break;
        default:
          E = le + W + E + B;
          break;
      }
      return a(E);
    }
    return T.toString = function() {
      return f + "";
    }, T;
  }
  function l(f, d) {
    var h = Math.max(-8, Math.min(8, Math.floor(gr(d) / 3))) * 3, p = Math.pow(10, -h), m = c((f = Jr(f), f.type = "f", f), { suffix: rl[8 + h / 3] });
    return function(v) {
      return m(p * v);
    };
  }
  return {
    format: c,
    formatPrefix: l
  };
}
var Ln, hu, uh;
n_({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function n_(e) {
  return Ln = r_(e), hu = Ln.format, uh = Ln.formatPrefix, Ln;
}
function i_(e) {
  return Math.max(0, -gr(Math.abs(e)));
}
function a_(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(gr(t) / 3))) * 3 - gr(Math.abs(e)));
}
function o_(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, gr(t) - gr(e)) + 1;
}
function sh(e, t, r, n) {
  var i = yo(e, t, r), a;
  switch (n = Jr(n ?? ",f"), n.type) {
    case "s": {
      var o = Math.max(Math.abs(e), Math.abs(t));
      return n.precision == null && !isNaN(a = a_(i, o)) && (n.precision = a), uh(n, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(a = o_(i, Math.max(Math.abs(e), Math.abs(t)))) && (n.precision = a - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(a = i_(i)) && (n.precision = a - (n.type === "%") * 2);
      break;
    }
  }
  return hu(n);
}
function xt(e) {
  var t = e.domain;
  return e.ticks = function(r) {
    var n = t();
    return mo(n[0], n[n.length - 1], r ?? 10);
  }, e.tickFormat = function(r, n) {
    var i = t();
    return sh(i[0], i[i.length - 1], r ?? 10, n);
  }, e.nice = function(r) {
    r == null && (r = 10);
    var n = t(), i = 0, a = n.length - 1, o = n[i], u = n[a], s, c, l = 10;
    for (u < o && (c = o, o = u, u = c, c = i, i = a, a = c); l-- > 0; ) {
      if (c = go(o, u, r), c === s)
        return n[i] = o, n[a] = u, t(n);
      if (c > 0)
        o = Math.floor(o / c) * c, u = Math.ceil(u / c) * c;
      else if (c < 0)
        o = Math.ceil(o * c) / c, u = Math.floor(u * c) / c;
      else
        break;
      s = c;
    }
    return e;
  }, e;
}
function ch() {
  var e = fu();
  return e.copy = function() {
    return pn(e, ch());
  }, Le.apply(e, arguments), xt(e);
}
function lh(e) {
  var t;
  function r(n) {
    return n == null || isNaN(n = +n) ? t : n;
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (e = Array.from(n, wi), r) : e.slice();
  }, r.unknown = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.copy = function() {
    return lh(e).unknown(t);
  }, e = arguments.length ? Array.from(e, wi) : [0, 1], xt(r);
}
function fh(e, t) {
  e = e.slice();
  var r = 0, n = e.length - 1, i = e[r], a = e[n], o;
  return a < i && (o = r, r = n, n = o, o = i, i = a, a = o), e[r] = t.floor(i), e[n] = t.ceil(a), e;
}
function nl(e) {
  return Math.log(e);
}
function il(e) {
  return Math.exp(e);
}
function u_(e) {
  return -Math.log(-e);
}
function s_(e) {
  return -Math.exp(-e);
}
function c_(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function l_(e) {
  return e === 10 ? c_ : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function f_(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function al(e) {
  return (t, r) => -e(-t, r);
}
function pu(e) {
  const t = e(nl, il), r = t.domain;
  let n = 10, i, a;
  function o() {
    return i = f_(n), a = l_(n), r()[0] < 0 ? (i = al(i), a = al(a), e(u_, s_)) : e(nl, il), t;
  }
  return t.base = function(u) {
    return arguments.length ? (n = +u, o()) : n;
  }, t.domain = function(u) {
    return arguments.length ? (r(u), o()) : r();
  }, t.ticks = (u) => {
    const s = r();
    let c = s[0], l = s[s.length - 1];
    const f = l < c;
    f && ([c, l] = [l, c]);
    let d = i(c), h = i(l), p, m;
    const v = u == null ? 10 : +u;
    let g = [];
    if (!(n % 1) && h - d < v) {
      if (d = Math.floor(d), h = Math.ceil(h), c > 0) {
        for (; d <= h; ++d)
          for (p = 1; p < n; ++p)
            if (m = d < 0 ? p / a(-d) : p * a(d), !(m < c)) {
              if (m > l) break;
              g.push(m);
            }
      } else for (; d <= h; ++d)
        for (p = n - 1; p >= 1; --p)
          if (m = d > 0 ? p / a(-d) : p * a(d), !(m < c)) {
            if (m > l) break;
            g.push(m);
          }
      g.length * 2 < v && (g = mo(c, l, v));
    } else
      g = mo(d, h, Math.min(h - d, v)).map(a);
    return f ? g.reverse() : g;
  }, t.tickFormat = (u, s) => {
    if (u == null && (u = 10), s == null && (s = n === 10 ? "s" : ","), typeof s != "function" && (!(n % 1) && (s = Jr(s)).precision == null && (s.trim = !0), s = hu(s)), u === 1 / 0) return s;
    const c = Math.max(1, n * u / t.ticks().length);
    return (l) => {
      let f = l / a(Math.round(i(l)));
      return f * n < n - 0.5 && (f *= n), f <= c ? s(l) : "";
    };
  }, t.nice = () => r(fh(r(), {
    floor: (u) => a(Math.floor(i(u))),
    ceil: (u) => a(Math.ceil(i(u)))
  })), t;
}
function dh() {
  const e = pu(ea()).domain([1, 10]);
  return e.copy = () => pn(e, dh()).base(e.base()), Le.apply(e, arguments), e;
}
function ol(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function ul(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function vu(e) {
  var t = 1, r = e(ol(t), ul(t));
  return r.constant = function(n) {
    return arguments.length ? e(ol(t = +n), ul(t)) : t;
  }, xt(r);
}
function hh() {
  var e = vu(ea());
  return e.copy = function() {
    return pn(e, hh()).constant(e.constant());
  }, Le.apply(e, arguments);
}
function sl(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function d_(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function h_(e) {
  return e < 0 ? -e * e : e * e;
}
function mu(e) {
  var t = e(he, he), r = 1;
  function n() {
    return r === 1 ? e(he, he) : r === 0.5 ? e(d_, h_) : e(sl(r), sl(1 / r));
  }
  return t.exponent = function(i) {
    return arguments.length ? (r = +i, n()) : r;
  }, xt(t);
}
function gu() {
  var e = mu(ea());
  return e.copy = function() {
    return pn(e, gu()).exponent(e.exponent());
  }, Le.apply(e, arguments), e;
}
function p_() {
  return gu.apply(null, arguments).exponent(0.5);
}
function cl(e) {
  return Math.sign(e) * e * e;
}
function v_(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function ph() {
  var e = fu(), t = [0, 1], r = !1, n;
  function i(a) {
    var o = v_(e(a));
    return isNaN(o) ? n : r ? Math.round(o) : o;
  }
  return i.invert = function(a) {
    return e.invert(cl(a));
  }, i.domain = function(a) {
    return arguments.length ? (e.domain(a), i) : e.domain();
  }, i.range = function(a) {
    return arguments.length ? (e.range((t = Array.from(a, wi)).map(cl)), i) : t.slice();
  }, i.rangeRound = function(a) {
    return i.range(a).round(!0);
  }, i.round = function(a) {
    return arguments.length ? (r = !!a, i) : r;
  }, i.clamp = function(a) {
    return arguments.length ? (e.clamp(a), i) : e.clamp();
  }, i.unknown = function(a) {
    return arguments.length ? (n = a, i) : n;
  }, i.copy = function() {
    return ph(e.domain(), t).round(r).clamp(e.clamp()).unknown(n);
  }, Le.apply(i, arguments), xt(i);
}
function vh() {
  var e = [], t = [], r = [], n;
  function i() {
    var o = 0, u = Math.max(1, t.length);
    for (r = new Array(u - 1); ++o < u; ) r[o - 1] = b1(e, o / u);
    return a;
  }
  function a(o) {
    return o == null || isNaN(o = +o) ? n : t[dn(r, o)];
  }
  return a.invertExtent = function(o) {
    var u = t.indexOf(o);
    return u < 0 ? [NaN, NaN] : [
      u > 0 ? r[u - 1] : e[0],
      u < r.length ? r[u] : e[e.length - 1]
    ];
  }, a.domain = function(o) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let u of o) u != null && !isNaN(u = +u) && e.push(u);
    return e.sort(mt), i();
  }, a.range = function(o) {
    return arguments.length ? (t = Array.from(o), i()) : t.slice();
  }, a.unknown = function(o) {
    return arguments.length ? (n = o, a) : n;
  }, a.quantiles = function() {
    return r.slice();
  }, a.copy = function() {
    return vh().domain(e).range(t).unknown(n);
  }, Le.apply(a, arguments);
}
function mh() {
  var e = 0, t = 1, r = 1, n = [0.5], i = [0, 1], a;
  function o(s) {
    return s != null && s <= s ? i[dn(n, s, 0, r)] : a;
  }
  function u() {
    var s = -1;
    for (n = new Array(r); ++s < r; ) n[s] = ((s + 1) * t - (s - r) * e) / (r + 1);
    return o;
  }
  return o.domain = function(s) {
    return arguments.length ? ([e, t] = s, e = +e, t = +t, u()) : [e, t];
  }, o.range = function(s) {
    return arguments.length ? (r = (i = Array.from(s)).length - 1, u()) : i.slice();
  }, o.invertExtent = function(s) {
    var c = i.indexOf(s);
    return c < 0 ? [NaN, NaN] : c < 1 ? [e, n[0]] : c >= r ? [n[r - 1], t] : [n[c - 1], n[c]];
  }, o.unknown = function(s) {
    return arguments.length && (a = s), o;
  }, o.thresholds = function() {
    return n.slice();
  }, o.copy = function() {
    return mh().domain([e, t]).range(i).unknown(a);
  }, Le.apply(xt(o), arguments);
}
function gh() {
  var e = [0.5], t = [0, 1], r, n = 1;
  function i(a) {
    return a != null && a <= a ? t[dn(e, a, 0, n)] : r;
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
    return gh().domain(e).range(t).unknown(r);
  }, Le.apply(i, arguments);
}
const Ma = /* @__PURE__ */ new Date(), Na = /* @__PURE__ */ new Date();
function ee(e, t, r, n) {
  function i(a) {
    return e(a = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+a)), a;
  }
  return i.floor = (a) => (e(a = /* @__PURE__ */ new Date(+a)), a), i.ceil = (a) => (e(a = new Date(a - 1)), t(a, 1), e(a), a), i.round = (a) => {
    const o = i(a), u = i.ceil(a);
    return a - o < u - a ? o : u;
  }, i.offset = (a, o) => (t(a = /* @__PURE__ */ new Date(+a), o == null ? 1 : Math.floor(o)), a), i.range = (a, o, u) => {
    const s = [];
    if (a = i.ceil(a), u = u == null ? 1 : Math.floor(u), !(a < o) || !(u > 0)) return s;
    let c;
    do
      s.push(c = /* @__PURE__ */ new Date(+a)), t(a, u), e(a);
    while (c < a && a < o);
    return s;
  }, i.filter = (a) => ee((o) => {
    if (o >= o) for (; e(o), !a(o); ) o.setTime(o - 1);
  }, (o, u) => {
    if (o >= o)
      if (u < 0) for (; ++u <= 0; )
        for (; t(o, -1), !a(o); )
          ;
      else for (; --u >= 0; )
        for (; t(o, 1), !a(o); )
          ;
  }), r && (i.count = (a, o) => (Ma.setTime(+a), Na.setTime(+o), e(Ma), e(Na), Math.floor(r(Ma, Na))), i.every = (a) => (a = Math.floor(a), !isFinite(a) || !(a > 0) ? null : a > 1 ? i.filter(n ? (o) => n(o) % a === 0 : (o) => i.count(0, o) % a === 0) : i)), i;
}
const Oi = ee(() => {
}, (e, t) => {
  e.setTime(+e + t);
}, (e, t) => t - e);
Oi.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? ee((t) => {
  t.setTime(Math.floor(t / e) * e);
}, (t, r) => {
  t.setTime(+t + r * e);
}, (t, r) => (r - t) / e) : Oi);
Oi.range;
const rt = 1e3, ke = rt * 60, nt = ke * 60, ot = nt * 24, yu = ot * 7, ll = ot * 30, Ca = ot * 365, Rt = ee((e) => {
  e.setTime(e - e.getMilliseconds());
}, (e, t) => {
  e.setTime(+e + t * rt);
}, (e, t) => (t - e) / rt, (e) => e.getUTCSeconds());
Rt.range;
const bu = ee((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * rt);
}, (e, t) => {
  e.setTime(+e + t * ke);
}, (e, t) => (t - e) / ke, (e) => e.getMinutes());
bu.range;
const wu = ee((e) => {
  e.setUTCSeconds(0, 0);
}, (e, t) => {
  e.setTime(+e + t * ke);
}, (e, t) => (t - e) / ke, (e) => e.getUTCMinutes());
wu.range;
const _u = ee((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * rt - e.getMinutes() * ke);
}, (e, t) => {
  e.setTime(+e + t * nt);
}, (e, t) => (t - e) / nt, (e) => e.getHours());
_u.range;
const xu = ee((e) => {
  e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
  e.setTime(+e + t * nt);
}, (e, t) => (t - e) / nt, (e) => e.getUTCHours());
xu.range;
const vn = ee(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * ke) / ot,
  (e) => e.getDate() - 1
);
vn.range;
const ta = ee((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / ot, (e) => e.getUTCDate() - 1);
ta.range;
const yh = ee((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / ot, (e) => Math.floor(e / ot));
yh.range;
function Xt(e) {
  return ee((t) => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setDate(t.getDate() + r * 7);
  }, (t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * ke) / yu);
}
const ra = Xt(0), Pi = Xt(1), m_ = Xt(2), g_ = Xt(3), yr = Xt(4), y_ = Xt(5), b_ = Xt(6);
ra.range;
Pi.range;
m_.range;
g_.range;
yr.range;
y_.range;
b_.range;
function Zt(e) {
  return ee((t) => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setUTCDate(t.getUTCDate() + r * 7);
  }, (t, r) => (r - t) / yu);
}
const na = Zt(0), Ei = Zt(1), w_ = Zt(2), __ = Zt(3), br = Zt(4), x_ = Zt(5), O_ = Zt(6);
na.range;
Ei.range;
w_.range;
__.range;
br.range;
x_.range;
O_.range;
const Ou = ee((e) => {
  e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
Ou.range;
const Pu = ee((e) => {
  e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
Pu.range;
const ut = ee((e) => {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
ut.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : ee((t) => {
  t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, r) => {
  t.setFullYear(t.getFullYear() + r * e);
});
ut.range;
const st = ee((e) => {
  e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
st.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : ee((t) => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, r) => {
  t.setUTCFullYear(t.getUTCFullYear() + r * e);
});
st.range;
function bh(e, t, r, n, i, a) {
  const o = [
    [Rt, 1, rt],
    [Rt, 5, 5 * rt],
    [Rt, 15, 15 * rt],
    [Rt, 30, 30 * rt],
    [a, 1, ke],
    [a, 5, 5 * ke],
    [a, 15, 15 * ke],
    [a, 30, 30 * ke],
    [i, 1, nt],
    [i, 3, 3 * nt],
    [i, 6, 6 * nt],
    [i, 12, 12 * nt],
    [n, 1, ot],
    [n, 2, 2 * ot],
    [r, 1, yu],
    [t, 1, ll],
    [t, 3, 3 * ll],
    [e, 1, Ca]
  ];
  function u(c, l, f) {
    const d = l < c;
    d && ([c, l] = [l, c]);
    const h = f && typeof f.range == "function" ? f : s(c, l, f), p = h ? h.range(c, +l + 1) : [];
    return d ? p.reverse() : p;
  }
  function s(c, l, f) {
    const d = Math.abs(l - c) / f, h = au(([, , v]) => v).right(o, d);
    if (h === o.length) return e.every(yo(c / Ca, l / Ca, f));
    if (h === 0) return Oi.every(Math.max(yo(c, l, f), 1));
    const [p, m] = o[d / o[h - 1][2] < o[h][2] / d ? h - 1 : h];
    return p.every(m);
  }
  return [u, s];
}
const [P_, E_] = bh(st, Pu, na, yh, xu, wu), [S_, A_] = bh(ut, Ou, ra, vn, _u, bu);
function Da(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function Ia(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function jr(e, t, r) {
  return { y: e, m: t, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function M_(e) {
  var t = e.dateTime, r = e.date, n = e.time, i = e.periods, a = e.days, o = e.shortDays, u = e.months, s = e.shortMonths, c = $r(i), l = Rr(i), f = $r(a), d = Rr(a), h = $r(o), p = Rr(o), m = $r(u), v = Rr(u), g = $r(s), w = Rr(s), y = {
    a: X,
    A: Ne,
    b: ce,
    B: le,
    c: null,
    d: ml,
    e: ml,
    f: Z_,
    g: ux,
    G: cx,
    H: Y_,
    I: G_,
    j: X_,
    L: wh,
    m: Q_,
    M: J_,
    p: Jt,
    q: Je,
    Q: bl,
    s: wl,
    S: ex,
    u: tx,
    U: rx,
    V: nx,
    w: ix,
    W: ax,
    x: null,
    X: null,
    y: ox,
    Y: sx,
    Z: lx,
    "%": yl
  }, x = {
    a: St,
    A: Ue,
    b: Nr,
    B: fa,
    c: null,
    d: gl,
    e: gl,
    f: px,
    g: Px,
    G: Sx,
    H: fx,
    I: dx,
    j: hx,
    L: xh,
    m: vx,
    M: mx,
    p: da,
    q: Ce,
    Q: bl,
    s: wl,
    S: gx,
    u: yx,
    U: bx,
    V: wx,
    w: _x,
    W: xx,
    x: null,
    X: null,
    y: Ox,
    Y: Ex,
    Z: Ax,
    "%": yl
  }, O = {
    a: D,
    A: T,
    b: E,
    B: W,
    c: B,
    d: pl,
    e: pl,
    f: W_,
    g: hl,
    G: dl,
    H: vl,
    I: vl,
    j: F_,
    L: V_,
    m: z_,
    M: B_,
    p: I,
    q: L_,
    Q: q_,
    s: H_,
    S: U_,
    u: T_,
    U: k_,
    V: j_,
    w: I_,
    W: $_,
    x: G,
    X: re,
    y: hl,
    Y: dl,
    Z: R_,
    "%": K_
  };
  y.x = _(r, y), y.X = _(n, y), y.c = _(t, y), x.x = _(r, x), x.X = _(n, x), x.c = _(t, x);
  function _(C, j) {
    return function(L) {
      var P = [], me = -1, K = 0, _e = C.length, xe, At, qu;
      for (L instanceof Date || (L = /* @__PURE__ */ new Date(+L)); ++me < _e; )
        C.charCodeAt(me) === 37 && (P.push(C.slice(K, me)), (At = fl[xe = C.charAt(++me)]) != null ? xe = C.charAt(++me) : At = xe === "e" ? " " : "0", (qu = j[xe]) && (xe = qu(L, At)), P.push(xe), K = me + 1);
      return P.push(C.slice(K, me)), P.join("");
    };
  }
  function S(C, j) {
    return function(L) {
      var P = jr(1900, void 0, 1), me = N(P, C, L += "", 0), K, _e;
      if (me != L.length) return null;
      if ("Q" in P) return new Date(P.Q);
      if ("s" in P) return new Date(P.s * 1e3 + ("L" in P ? P.L : 0));
      if (j && !("Z" in P) && (P.Z = 0), "p" in P && (P.H = P.H % 12 + P.p * 12), P.m === void 0 && (P.m = "q" in P ? P.q : 0), "V" in P) {
        if (P.V < 1 || P.V > 53) return null;
        "w" in P || (P.w = 1), "Z" in P ? (K = Ia(jr(P.y, 0, 1)), _e = K.getUTCDay(), K = _e > 4 || _e === 0 ? Ei.ceil(K) : Ei(K), K = ta.offset(K, (P.V - 1) * 7), P.y = K.getUTCFullYear(), P.m = K.getUTCMonth(), P.d = K.getUTCDate() + (P.w + 6) % 7) : (K = Da(jr(P.y, 0, 1)), _e = K.getDay(), K = _e > 4 || _e === 0 ? Pi.ceil(K) : Pi(K), K = vn.offset(K, (P.V - 1) * 7), P.y = K.getFullYear(), P.m = K.getMonth(), P.d = K.getDate() + (P.w + 6) % 7);
      } else ("W" in P || "U" in P) && ("w" in P || (P.w = "u" in P ? P.u % 7 : "W" in P ? 1 : 0), _e = "Z" in P ? Ia(jr(P.y, 0, 1)).getUTCDay() : Da(jr(P.y, 0, 1)).getDay(), P.m = 0, P.d = "W" in P ? (P.w + 6) % 7 + P.W * 7 - (_e + 5) % 7 : P.w + P.U * 7 - (_e + 6) % 7);
      return "Z" in P ? (P.H += P.Z / 100 | 0, P.M += P.Z % 100, Ia(P)) : Da(P);
    };
  }
  function N(C, j, L, P) {
    for (var me = 0, K = j.length, _e = L.length, xe, At; me < K; ) {
      if (P >= _e) return -1;
      if (xe = j.charCodeAt(me++), xe === 37) {
        if (xe = j.charAt(me++), At = O[xe in fl ? j.charAt(me++) : xe], !At || (P = At(C, L, P)) < 0) return -1;
      } else if (xe != L.charCodeAt(P++))
        return -1;
    }
    return P;
  }
  function I(C, j, L) {
    var P = c.exec(j.slice(L));
    return P ? (C.p = l.get(P[0].toLowerCase()), L + P[0].length) : -1;
  }
  function D(C, j, L) {
    var P = h.exec(j.slice(L));
    return P ? (C.w = p.get(P[0].toLowerCase()), L + P[0].length) : -1;
  }
  function T(C, j, L) {
    var P = f.exec(j.slice(L));
    return P ? (C.w = d.get(P[0].toLowerCase()), L + P[0].length) : -1;
  }
  function E(C, j, L) {
    var P = g.exec(j.slice(L));
    return P ? (C.m = w.get(P[0].toLowerCase()), L + P[0].length) : -1;
  }
  function W(C, j, L) {
    var P = m.exec(j.slice(L));
    return P ? (C.m = v.get(P[0].toLowerCase()), L + P[0].length) : -1;
  }
  function B(C, j, L) {
    return N(C, t, j, L);
  }
  function G(C, j, L) {
    return N(C, r, j, L);
  }
  function re(C, j, L) {
    return N(C, n, j, L);
  }
  function X(C) {
    return o[C.getDay()];
  }
  function Ne(C) {
    return a[C.getDay()];
  }
  function ce(C) {
    return s[C.getMonth()];
  }
  function le(C) {
    return u[C.getMonth()];
  }
  function Jt(C) {
    return i[+(C.getHours() >= 12)];
  }
  function Je(C) {
    return 1 + ~~(C.getMonth() / 3);
  }
  function St(C) {
    return o[C.getUTCDay()];
  }
  function Ue(C) {
    return a[C.getUTCDay()];
  }
  function Nr(C) {
    return s[C.getUTCMonth()];
  }
  function fa(C) {
    return u[C.getUTCMonth()];
  }
  function da(C) {
    return i[+(C.getUTCHours() >= 12)];
  }
  function Ce(C) {
    return 1 + ~~(C.getUTCMonth() / 3);
  }
  return {
    format: function(C) {
      var j = _(C += "", y);
      return j.toString = function() {
        return C;
      }, j;
    },
    parse: function(C) {
      var j = S(C += "", !1);
      return j.toString = function() {
        return C;
      }, j;
    },
    utcFormat: function(C) {
      var j = _(C += "", x);
      return j.toString = function() {
        return C;
      }, j;
    },
    utcParse: function(C) {
      var j = S(C += "", !0);
      return j.toString = function() {
        return C;
      }, j;
    }
  };
}
var fl = { "-": "", _: " ", 0: "0" }, ae = /^\s*\d+/, N_ = /^%/, C_ = /[\\^$*+?|[\]().{}]/g;
function z(e, t, r) {
  var n = e < 0 ? "-" : "", i = (n ? -e : e) + "", a = i.length;
  return n + (a < r ? new Array(r - a + 1).join(t) + i : i);
}
function D_(e) {
  return e.replace(C_, "\\$&");
}
function $r(e) {
  return new RegExp("^(?:" + e.map(D_).join("|") + ")", "i");
}
function Rr(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]));
}
function I_(e, t, r) {
  var n = ae.exec(t.slice(r, r + 1));
  return n ? (e.w = +n[0], r + n[0].length) : -1;
}
function T_(e, t, r) {
  var n = ae.exec(t.slice(r, r + 1));
  return n ? (e.u = +n[0], r + n[0].length) : -1;
}
function k_(e, t, r) {
  var n = ae.exec(t.slice(r, r + 2));
  return n ? (e.U = +n[0], r + n[0].length) : -1;
}
function j_(e, t, r) {
  var n = ae.exec(t.slice(r, r + 2));
  return n ? (e.V = +n[0], r + n[0].length) : -1;
}
function $_(e, t, r) {
  var n = ae.exec(t.slice(r, r + 2));
  return n ? (e.W = +n[0], r + n[0].length) : -1;
}
function dl(e, t, r) {
  var n = ae.exec(t.slice(r, r + 4));
  return n ? (e.y = +n[0], r + n[0].length) : -1;
}
function hl(e, t, r) {
  var n = ae.exec(t.slice(r, r + 2));
  return n ? (e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1;
}
function R_(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n ? (e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1;
}
function L_(e, t, r) {
  var n = ae.exec(t.slice(r, r + 1));
  return n ? (e.q = n[0] * 3 - 3, r + n[0].length) : -1;
}
function z_(e, t, r) {
  var n = ae.exec(t.slice(r, r + 2));
  return n ? (e.m = n[0] - 1, r + n[0].length) : -1;
}
function pl(e, t, r) {
  var n = ae.exec(t.slice(r, r + 2));
  return n ? (e.d = +n[0], r + n[0].length) : -1;
}
function F_(e, t, r) {
  var n = ae.exec(t.slice(r, r + 3));
  return n ? (e.m = 0, e.d = +n[0], r + n[0].length) : -1;
}
function vl(e, t, r) {
  var n = ae.exec(t.slice(r, r + 2));
  return n ? (e.H = +n[0], r + n[0].length) : -1;
}
function B_(e, t, r) {
  var n = ae.exec(t.slice(r, r + 2));
  return n ? (e.M = +n[0], r + n[0].length) : -1;
}
function U_(e, t, r) {
  var n = ae.exec(t.slice(r, r + 2));
  return n ? (e.S = +n[0], r + n[0].length) : -1;
}
function V_(e, t, r) {
  var n = ae.exec(t.slice(r, r + 3));
  return n ? (e.L = +n[0], r + n[0].length) : -1;
}
function W_(e, t, r) {
  var n = ae.exec(t.slice(r, r + 6));
  return n ? (e.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1;
}
function K_(e, t, r) {
  var n = N_.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function q_(e, t, r) {
  var n = ae.exec(t.slice(r));
  return n ? (e.Q = +n[0], r + n[0].length) : -1;
}
function H_(e, t, r) {
  var n = ae.exec(t.slice(r));
  return n ? (e.s = +n[0], r + n[0].length) : -1;
}
function ml(e, t) {
  return z(e.getDate(), t, 2);
}
function Y_(e, t) {
  return z(e.getHours(), t, 2);
}
function G_(e, t) {
  return z(e.getHours() % 12 || 12, t, 2);
}
function X_(e, t) {
  return z(1 + vn.count(ut(e), e), t, 3);
}
function wh(e, t) {
  return z(e.getMilliseconds(), t, 3);
}
function Z_(e, t) {
  return wh(e, t) + "000";
}
function Q_(e, t) {
  return z(e.getMonth() + 1, t, 2);
}
function J_(e, t) {
  return z(e.getMinutes(), t, 2);
}
function ex(e, t) {
  return z(e.getSeconds(), t, 2);
}
function tx(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function rx(e, t) {
  return z(ra.count(ut(e) - 1, e), t, 2);
}
function _h(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? yr(e) : yr.ceil(e);
}
function nx(e, t) {
  return e = _h(e), z(yr.count(ut(e), e) + (ut(e).getDay() === 4), t, 2);
}
function ix(e) {
  return e.getDay();
}
function ax(e, t) {
  return z(Pi.count(ut(e) - 1, e), t, 2);
}
function ox(e, t) {
  return z(e.getFullYear() % 100, t, 2);
}
function ux(e, t) {
  return e = _h(e), z(e.getFullYear() % 100, t, 2);
}
function sx(e, t) {
  return z(e.getFullYear() % 1e4, t, 4);
}
function cx(e, t) {
  var r = e.getDay();
  return e = r >= 4 || r === 0 ? yr(e) : yr.ceil(e), z(e.getFullYear() % 1e4, t, 4);
}
function lx(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + z(t / 60 | 0, "0", 2) + z(t % 60, "0", 2);
}
function gl(e, t) {
  return z(e.getUTCDate(), t, 2);
}
function fx(e, t) {
  return z(e.getUTCHours(), t, 2);
}
function dx(e, t) {
  return z(e.getUTCHours() % 12 || 12, t, 2);
}
function hx(e, t) {
  return z(1 + ta.count(st(e), e), t, 3);
}
function xh(e, t) {
  return z(e.getUTCMilliseconds(), t, 3);
}
function px(e, t) {
  return xh(e, t) + "000";
}
function vx(e, t) {
  return z(e.getUTCMonth() + 1, t, 2);
}
function mx(e, t) {
  return z(e.getUTCMinutes(), t, 2);
}
function gx(e, t) {
  return z(e.getUTCSeconds(), t, 2);
}
function yx(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function bx(e, t) {
  return z(na.count(st(e) - 1, e), t, 2);
}
function Oh(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? br(e) : br.ceil(e);
}
function wx(e, t) {
  return e = Oh(e), z(br.count(st(e), e) + (st(e).getUTCDay() === 4), t, 2);
}
function _x(e) {
  return e.getUTCDay();
}
function xx(e, t) {
  return z(Ei.count(st(e) - 1, e), t, 2);
}
function Ox(e, t) {
  return z(e.getUTCFullYear() % 100, t, 2);
}
function Px(e, t) {
  return e = Oh(e), z(e.getUTCFullYear() % 100, t, 2);
}
function Ex(e, t) {
  return z(e.getUTCFullYear() % 1e4, t, 4);
}
function Sx(e, t) {
  var r = e.getUTCDay();
  return e = r >= 4 || r === 0 ? br(e) : br.ceil(e), z(e.getUTCFullYear() % 1e4, t, 4);
}
function Ax() {
  return "+0000";
}
function yl() {
  return "%";
}
function bl(e) {
  return +e;
}
function wl(e) {
  return Math.floor(+e / 1e3);
}
var rr, Ph, Eh;
Mx({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function Mx(e) {
  return rr = M_(e), Ph = rr.format, rr.parse, Eh = rr.utcFormat, rr.utcParse, rr;
}
function Nx(e) {
  return new Date(e);
}
function Cx(e) {
  return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function Eu(e, t, r, n, i, a, o, u, s, c) {
  var l = fu(), f = l.invert, d = l.domain, h = c(".%L"), p = c(":%S"), m = c("%I:%M"), v = c("%I %p"), g = c("%a %d"), w = c("%b %d"), y = c("%B"), x = c("%Y");
  function O(_) {
    return (s(_) < _ ? h : u(_) < _ ? p : o(_) < _ ? m : a(_) < _ ? v : n(_) < _ ? i(_) < _ ? g : w : r(_) < _ ? y : x)(_);
  }
  return l.invert = function(_) {
    return new Date(f(_));
  }, l.domain = function(_) {
    return arguments.length ? d(Array.from(_, Cx)) : d().map(Nx);
  }, l.ticks = function(_) {
    var S = d();
    return e(S[0], S[S.length - 1], _ ?? 10);
  }, l.tickFormat = function(_, S) {
    return S == null ? O : c(S);
  }, l.nice = function(_) {
    var S = d();
    return (!_ || typeof _.range != "function") && (_ = t(S[0], S[S.length - 1], _ ?? 10)), _ ? d(fh(S, _)) : l;
  }, l.copy = function() {
    return pn(l, Eu(e, t, r, n, i, a, o, u, s, c));
  }, l;
}
function Dx() {
  return Le.apply(Eu(S_, A_, ut, Ou, ra, vn, _u, bu, Rt, Ph).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function Ix() {
  return Le.apply(Eu(P_, E_, st, Pu, na, ta, xu, wu, Rt, Eh).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function ia() {
  var e = 0, t = 1, r, n, i, a, o = he, u = !1, s;
  function c(f) {
    return f == null || isNaN(f = +f) ? s : o(i === 0 ? 0.5 : (f = (a(f) - r) * i, u ? Math.max(0, Math.min(1, f)) : f));
  }
  c.domain = function(f) {
    return arguments.length ? ([e, t] = f, r = a(e = +e), n = a(t = +t), i = r === n ? 0 : 1 / (n - r), c) : [e, t];
  }, c.clamp = function(f) {
    return arguments.length ? (u = !!f, c) : u;
  }, c.interpolator = function(f) {
    return arguments.length ? (o = f, c) : o;
  };
  function l(f) {
    return function(d) {
      var h, p;
      return arguments.length ? ([h, p] = d, o = f(h, p), c) : [o(0), o(1)];
    };
  }
  return c.range = l(Sr), c.rangeRound = l(lu), c.unknown = function(f) {
    return arguments.length ? (s = f, c) : s;
  }, function(f) {
    return a = f, r = f(e), n = f(t), i = r === n ? 0 : 1 / (n - r), c;
  };
}
function Ot(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function Sh() {
  var e = xt(ia()(he));
  return e.copy = function() {
    return Ot(e, Sh());
  }, ft.apply(e, arguments);
}
function Ah() {
  var e = pu(ia()).domain([1, 10]);
  return e.copy = function() {
    return Ot(e, Ah()).base(e.base());
  }, ft.apply(e, arguments);
}
function Mh() {
  var e = vu(ia());
  return e.copy = function() {
    return Ot(e, Mh()).constant(e.constant());
  }, ft.apply(e, arguments);
}
function Su() {
  var e = mu(ia());
  return e.copy = function() {
    return Ot(e, Su()).exponent(e.exponent());
  }, ft.apply(e, arguments);
}
function Tx() {
  return Su.apply(null, arguments).exponent(0.5);
}
function Nh() {
  var e = [], t = he;
  function r(n) {
    if (n != null && !isNaN(n = +n)) return t((dn(e, n, 1) - 1) / (e.length - 1));
  }
  return r.domain = function(n) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let i of n) i != null && !isNaN(i = +i) && e.push(i);
    return e.sort(mt), r;
  }, r.interpolator = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.range = function() {
    return e.map((n, i) => t(i / (e.length - 1)));
  }, r.quantiles = function(n) {
    return Array.from({ length: n + 1 }, (i, a) => y1(e, a / n));
  }, r.copy = function() {
    return Nh(t).domain(e);
  }, ft.apply(r, arguments);
}
function aa() {
  var e = 0, t = 0.5, r = 1, n = 1, i, a, o, u, s, c = he, l, f = !1, d;
  function h(m) {
    return isNaN(m = +m) ? d : (m = 0.5 + ((m = +l(m)) - a) * (n * m < n * a ? u : s), c(f ? Math.max(0, Math.min(1, m)) : m));
  }
  h.domain = function(m) {
    return arguments.length ? ([e, t, r] = m, i = l(e = +e), a = l(t = +t), o = l(r = +r), u = i === a ? 0 : 0.5 / (a - i), s = a === o ? 0 : 0.5 / (o - a), n = a < i ? -1 : 1, h) : [e, t, r];
  }, h.clamp = function(m) {
    return arguments.length ? (f = !!m, h) : f;
  }, h.interpolator = function(m) {
    return arguments.length ? (c = m, h) : c;
  };
  function p(m) {
    return function(v) {
      var g, w, y;
      return arguments.length ? ([g, w, y] = v, c = K1(m, [g, w, y]), h) : [c(0), c(0.5), c(1)];
    };
  }
  return h.range = p(Sr), h.rangeRound = p(lu), h.unknown = function(m) {
    return arguments.length ? (d = m, h) : d;
  }, function(m) {
    return l = m, i = m(e), a = m(t), o = m(r), u = i === a ? 0 : 0.5 / (a - i), s = a === o ? 0 : 0.5 / (o - a), n = a < i ? -1 : 1, h;
  };
}
function Ch() {
  var e = xt(aa()(he));
  return e.copy = function() {
    return Ot(e, Ch());
  }, ft.apply(e, arguments);
}
function Dh() {
  var e = pu(aa()).domain([0.1, 1, 10]);
  return e.copy = function() {
    return Ot(e, Dh()).base(e.base());
  }, ft.apply(e, arguments);
}
function Ih() {
  var e = vu(aa());
  return e.copy = function() {
    return Ot(e, Ih()).constant(e.constant());
  }, ft.apply(e, arguments);
}
function Au() {
  var e = mu(aa());
  return e.copy = function() {
    return Ot(e, Au()).exponent(e.exponent());
  }, ft.apply(e, arguments);
}
function kx() {
  return Au.apply(null, arguments).exponent(0.5);
}
const zr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  scaleBand: uu,
  scaleDiverging: Ch,
  scaleDivergingLog: Dh,
  scaleDivergingPow: Au,
  scaleDivergingSqrt: kx,
  scaleDivergingSymlog: Ih,
  scaleIdentity: lh,
  scaleImplicit: bo,
  scaleLinear: ch,
  scaleLog: dh,
  scaleOrdinal: ou,
  scalePoint: _1,
  scalePow: gu,
  scaleQuantile: vh,
  scaleQuantize: mh,
  scaleRadial: ph,
  scaleSequential: Sh,
  scaleSequentialLog: Ah,
  scaleSequentialPow: Su,
  scaleSequentialQuantile: Nh,
  scaleSequentialSqrt: Tx,
  scaleSequentialSymlog: Mh,
  scaleSqrt: p_,
  scaleSymlog: hh,
  scaleThreshold: gh,
  scaleTime: Dx,
  scaleUtc: Ix,
  tickFormat: sh
}, Symbol.toStringTag, { value: "Module" }));
function jx(e) {
  if (e in zr)
    return zr[e]();
  var t = "scale".concat(nn(e));
  if (t in zr)
    return zr[t]();
}
function _l(e, t, r) {
  if (typeof e == "function")
    return e.copy().domain(t).range(r);
  if (e != null) {
    var n = jx(e);
    if (n != null)
      return n.domain(t).range(r), n;
  }
}
function Mu(e, t, r, n) {
  if (!(r == null || n == null))
    return typeof e.scale == "function" ? _l(e.scale, r, n) : _l(t, r, n);
}
function $x(e) {
  return "scale".concat(nn(e));
}
function Rx(e) {
  return $x(e) in zr;
}
var Th = (e, t, r) => {
  if (e != null) {
    var {
      scale: n,
      type: i
    } = e;
    if (n === "auto")
      return i === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !t) ? "point" : i === "category" ? "band" : "linear";
    if (typeof n == "string")
      return Rx(n) ? n : "point";
  }
};
function Lx(e, t) {
  for (var r = 0, n = e.length, i = e[0] < e[e.length - 1]; r < n; ) {
    var a = Math.floor((r + n) / 2);
    (i ? e[a] < t : e[a] > t) ? r = a + 1 : n = a;
  }
  return r;
}
function kh(e, t) {
  if (e) {
    var r = t ?? e.domain(), n = r.map((a) => {
      var o;
      return (o = e(a)) !== null && o !== void 0 ? o : 0;
    }), i = e.range();
    if (!(r.length === 0 || i.length < 2))
      return (a) => {
        var o, u, s = Lx(n, a);
        if (s <= 0)
          return r[0];
        if (s >= r.length)
          return r[r.length - 1];
        var c = (o = n[s - 1]) !== null && o !== void 0 ? o : 0, l = (u = n[s]) !== null && u !== void 0 ? u : 0;
        return Math.abs(a - c) <= Math.abs(a - l) ? r[s - 1] : r[s];
      };
  }
}
function zx(e) {
  if (e != null)
    return "invert" in e && typeof e.invert == "function" ? e.invert.bind(e) : kh(e, void 0);
}
function xl(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Si(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? xl(Object(r), !0).forEach(function(n) {
      Fx(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : xl(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Fx(e, t, r) {
  return (t = Bx(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Bx(e) {
  var t = Ux(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Ux(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Oo = [0, "auto"], Vx = {
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
}, Wx = (e, t) => e.cartesianAxis.xAxis[t], Pt = (e, t) => {
  var r = Wx(e, t);
  return r ?? Vx;
}, Kx = {
  allowDataOverflow: !1,
  allowDecimals: !0,
  allowDuplicatedCategory: !0,
  angle: 0,
  dataKey: void 0,
  domain: Oo,
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
  width: cn
}, qx = (e, t) => e.cartesianAxis.yAxis[t], Et = (e, t) => {
  var r = qx(e, t);
  return r ?? Kx;
}, Hx = {
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
}, Nu = (e, t) => {
  var r = e.cartesianAxis.zAxis[t];
  return r ?? Hx;
}, ve = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return Pt(e, r);
    case "yAxis":
      return Et(e, r);
    case "zAxis":
      return Nu(e, r);
    case "angleAxis":
      return eu(e, r);
    case "radiusAxis":
      return tu(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, Yx = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return Pt(e, r);
    case "yAxis":
      return Et(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, mn = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return Pt(e, r);
    case "yAxis":
      return Et(e, r);
    case "angleAxis":
      return eu(e, r);
    case "radiusAxis":
      return tu(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, jh = (e) => e.graphicalItems.cartesianItems.some((t) => t.type === "bar") || e.graphicalItems.polarItems.some((t) => t.type === "radialBar");
function $h(e, t) {
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
var Gx = (e) => e.graphicalItems.cartesianItems, Xx = b([ie, Zi], $h), Rh = (e, t, r) => e.filter(r).filter((n) => t?.includeHidden === !0 ? !0 : !n.hide), gn = b([Gx, ve, Xx], Rh, {
  memoizeOptions: {
    resultEqualityCheck: Ji
  }
}), Lh = b([gn], (e) => e.filter((t) => t.type === "area" || t.type === "bar").filter(nu)), zh = (e) => e.filter((t) => !("stackId" in t) || t.stackId === void 0), Zx = b([gn], zh), Fh = (e) => e.map((t) => t.data).filter(Boolean).flat(1), Qx = b([gn], Fh, {
  memoizeOptions: {
    resultEqualityCheck: Ji
  }
}), Bh = (e, t) => {
  var {
    chartData: r = [],
    dataStartIndex: n,
    dataEndIndex: i
  } = t;
  return e.length > 0 ? e : r.slice(n, i + 1);
}, Cu = b([Qx, Td], Bh), Uh = (e, t, r) => t?.dataKey != null ? e.map((n) => ({
  value: we(n, t.dataKey)
})) : r.length > 0 ? r.map((n) => n.dataKey).flatMap((n) => e.map((i) => ({
  value: we(i, n)
}))) : e.map((n) => ({
  value: n
})), yn = b([Cu, ve, gn], Uh);
function cr(e) {
  if (Vt(e) || e instanceof Date) {
    var t = Number(e);
    if (U(t))
      return t;
  }
}
function Ol(e) {
  if (Array.isArray(e)) {
    var t = [cr(e[0]), cr(e[1])];
    return Xe(t) ? t : void 0;
  }
  var r = cr(e);
  if (r != null)
    return [r, r];
}
function ct(e) {
  return e.map(cr).filter(ye);
}
function Jx(e, t) {
  var r = cr(e), n = cr(t);
  return r == null && n == null ? 0 : r == null ? -1 : n == null ? 1 : r - n;
}
var eO = b([yn], (e) => e?.map((t) => t.value).sort(Jx));
function Vh(e, t) {
  switch (e) {
    case "xAxis":
      return t.direction === "x";
    case "yAxis":
      return t.direction === "y";
    default:
      return !1;
  }
}
function tO(e, t, r) {
  return !r || typeof t != "number" || Gt(t) ? [] : r.length ? ct(r.flatMap((n) => {
    var i = we(e, n.dataKey), a, o;
    if (Array.isArray(i) ? [a, o] = i : a = o = i, !(!U(a) || !U(o)))
      return [t - a, t + o];
  })) : [];
}
var te = (e) => {
  var t = se(e), r = Er(e);
  return mn(e, t, r);
}, oa = b([te], (e) => e?.dataKey), rO = b([Lh, Td, te], Jd), Wh = (e, t, r, n) => {
  var i = {}, a = t.reduce((o, u) => {
    if (u.stackId == null)
      return o;
    var s = o[u.stackId];
    return s == null && (s = []), s.push(u), o[u.stackId] = s, o;
  }, i);
  return Object.fromEntries(Object.entries(a).map((o) => {
    var [u, s] = o, c = n ? [...s].reverse() : s, l = c.map(Qd);
    return [u, {
      // @ts-expect-error getStackedData requires that the input is array of objects, Recharts does not test for that
      stackedData: Fy(e, l, r),
      graphicalItems: c
    }];
  }));
}, nO = b([rO, Lh, Yi, Kd], Wh), Kh = (e, t, r, n) => {
  var {
    dataStartIndex: i,
    dataEndIndex: a
  } = t;
  if (n == null && r !== "zAxis") {
    var o = Vy(e, i, a);
    if (!(o != null && o[0] === 0 && o[1] === 0))
      return o;
  }
}, iO = b([ve], (e) => e.allowDataOverflow), Du = (e) => {
  var t;
  if (e == null || !("domain" in e))
    return Oo;
  if (e.domain != null)
    return e.domain;
  if ("ticks" in e && e.ticks != null) {
    if (e.type === "number") {
      var r = ct(e.ticks);
      return [Math.min(...r), Math.max(...r)];
    }
    if (e.type === "category")
      return e.ticks.map(String);
  }
  return (t = e?.domain) !== null && t !== void 0 ? t : Oo;
}, qh = b([ve], Du), Hh = b([qh, iO], kd), aO = b([nO, lt, ie, Hh], Kh, {
  memoizeOptions: {
    resultEqualityCheck: Qi
  }
}), Iu = (e) => e.errorBars, oO = (e, t, r) => e.flatMap((n) => t[n.id]).filter(Boolean).filter((n) => Vh(r, n)), Ai = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var i = r.filter(Boolean);
  if (i.length !== 0) {
    var a = i.flat(), o = Math.min(...a), u = Math.max(...a);
    return [o, u];
  }
}, Yh = (e, t, r, n, i) => {
  var a, o;
  if (r.length > 0 && e.forEach((u) => {
    r.forEach((s) => {
      var c, l, f = (c = n[s.id]) === null || c === void 0 ? void 0 : c.filter((g) => Vh(i, g)), d = we(u, (l = t.dataKey) !== null && l !== void 0 ? l : s.dataKey), h = tO(u, d, f);
      if (h.length >= 2) {
        var p = Math.min(...h), m = Math.max(...h);
        (a == null || p < a) && (a = p), (o == null || m > o) && (o = m);
      }
      var v = Ol(d);
      v != null && (a = a == null ? v[0] : Math.min(a, v[0]), o = o == null ? v[1] : Math.max(o, v[1]));
    });
  }), t?.dataKey != null && e.forEach((u) => {
    var s = Ol(we(u, t.dataKey));
    s != null && (a = a == null ? s[0] : Math.min(a, s[0]), o = o == null ? s[1] : Math.max(o, s[1]));
  }), U(a) && U(o))
    return [a, o];
}, uO = b([Cu, ve, Zx, Iu, ie], Yh, {
  memoizeOptions: {
    resultEqualityCheck: Qi
  }
});
function sO(e) {
  var {
    value: t
  } = e;
  if (Vt(t) || t instanceof Date)
    return t;
}
var cO = (e, t, r) => {
  var n = e.map(sO).filter((i) => i != null);
  return r && (t.dataKey == null || t.allowDuplicatedCategory && cf(n)) ? Dd(0, e.length) : t.allowDuplicatedCategory ? n : Array.from(new Set(n));
}, Gh = (e) => e.referenceElements.dots, Ar = (e, t, r) => e.filter((n) => n.ifOverflow === "extendDomain").filter((n) => t === "xAxis" ? n.xAxisId === r : n.yAxisId === r), lO = b([Gh, ie, Zi], Ar), Xh = (e) => e.referenceElements.areas, fO = b([Xh, ie, Zi], Ar), Zh = (e) => e.referenceElements.lines, dO = b([Zh, ie, Zi], Ar), Qh = (e, t) => {
  if (e != null) {
    var r = ct(e.map((n) => t === "xAxis" ? n.x : n.y));
    if (r.length !== 0)
      return [Math.min(...r), Math.max(...r)];
  }
}, hO = b(lO, ie, Qh), Jh = (e, t) => {
  if (e != null) {
    var r = ct(e.flatMap((n) => [t === "xAxis" ? n.x1 : n.y1, t === "xAxis" ? n.x2 : n.y2]));
    if (r.length !== 0)
      return [Math.min(...r), Math.max(...r)];
  }
}, pO = b([fO, ie], Jh);
function vO(e) {
  var t;
  if (e.x != null)
    return ct([e.x]);
  var r = (t = e.segment) === null || t === void 0 ? void 0 : t.map((n) => n.x);
  return r == null || r.length === 0 ? [] : ct(r);
}
function mO(e) {
  var t;
  if (e.y != null)
    return ct([e.y]);
  var r = (t = e.segment) === null || t === void 0 ? void 0 : t.map((n) => n.y);
  return r == null || r.length === 0 ? [] : ct(r);
}
var ep = (e, t) => {
  if (e != null) {
    var r = e.flatMap((n) => t === "xAxis" ? vO(n) : mO(n));
    if (r.length !== 0)
      return [Math.min(...r), Math.max(...r)];
  }
}, gO = b([dO, ie], ep), yO = b(hO, gO, pO, (e, t, r) => Ai(e, r, t)), tp = (e, t, r, n, i, a, o, u) => {
  if (r != null)
    return r;
  var s = o === "vertical" && u === "xAxis" || o === "horizontal" && u === "yAxis", c = s ? Ai(n, a, i) : Ai(a, i);
  return Hw(t, c, e.allowDataOverflow);
}, bO = b([ve, qh, Hh, aO, uO, yO, Q, ie], tp, {
  memoizeOptions: {
    resultEqualityCheck: Qi
  }
}), wO = [0, 1], rp = (e, t, r, n, i, a, o) => {
  if (!((e == null || r == null || r.length === 0) && o === void 0)) {
    var {
      dataKey: u,
      type: s
    } = e, c = bt(t, a);
    if (c && u == null) {
      var l;
      return Dd(0, (l = r?.length) !== null && l !== void 0 ? l : 0);
    }
    return s === "category" ? cO(n, e, c) : i === "expand" ? wO : o;
  }
}, Tu = b([ve, Q, Cu, yn, Yi, ie, bO], rp), Mr = b([ve, jh, Zo], Th), np = (e, t, r) => {
  var {
    niceTicks: n
  } = t;
  if (n !== "none") {
    var i = Du(t), a = Array.isArray(i) && (i[0] === "auto" || i[1] === "auto");
    if ((n === "snap125" || n === "adaptive") && t != null && t.tickCount && Xe(e)) {
      if (a)
        return Tc(e, t.tickCount, t.allowDecimals, n);
      if (t.type === "number")
        return kc(e, t.tickCount, t.allowDecimals, n);
    }
    if (n === "auto" && r === "linear" && t != null && t.tickCount) {
      if (a && Xe(e))
        return Tc(e, t.tickCount, t.allowDecimals, "adaptive");
      if (t.type === "number" && Xe(e))
        return kc(e, t.tickCount, t.allowDecimals, "adaptive");
    }
  }
}, ku = b([Tu, mn, Mr], np), ip = (e, t, r, n) => {
  if (
    /*
     * Angle axis for some reason uses nice ticks when rendering axis tick labels,
     * but doesn't use nice ticks for extending domain like all the other axes do.
     * Not really sure why? Is there a good reason,
     * or is it just because someone added support for nice ticks to the other axes and forgot this one?
     */
    n !== "angleAxis" && e?.type === "number" && Xe(t) && Array.isArray(r) && r.length > 0
  ) {
    var i, a, o = t[0], u = (i = r[0]) !== null && i !== void 0 ? i : 0, s = t[1], c = (a = r[r.length - 1]) !== null && a !== void 0 ? a : 0;
    return [Math.min(o, u), Math.max(s, c)];
  }
  return t;
}, _O = b([ve, Tu, ku, ie], ip), xO = b(yn, ve, (e, t) => {
  if (!(!t || t.type !== "number")) {
    var r = 1 / 0, n = Array.from(ct(e.map((f) => f.value))).sort((f, d) => f - d), i = n[0], a = n[n.length - 1];
    if (i == null || a == null)
      return 1 / 0;
    var o = a - i;
    if (o === 0)
      return 1 / 0;
    for (var u = 0; u < n.length - 1; u++) {
      var s = n[u], c = n[u + 1];
      if (!(s == null || c == null)) {
        var l = c - s;
        r = Math.min(r, l);
      }
    }
    return r / o;
  }
}), ap = b(xO, Q, Qw, pe, (e, t, r, n, i) => i, (e, t, r, n, i) => {
  if (!U(e))
    return 0;
  var a = t === "vertical" ? n.height : n.width;
  if (i === "gap")
    return e * a / 2;
  if (i === "no-gap") {
    var o = lr(r, e * a), u = e * a / 2;
    return u - o - (u - o) / a * o;
  }
  return 0;
}), OO = (e, t, r) => {
  var n = Pt(e, t);
  return n == null || typeof n.padding != "string" ? 0 : ap(e, "xAxis", t, r, n.padding);
}, PO = (e, t, r) => {
  var n = Et(e, t);
  return n == null || typeof n.padding != "string" ? 0 : ap(e, "yAxis", t, r, n.padding);
}, EO = b(Pt, OO, (e, t) => {
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
}), SO = b(Et, PO, (e, t) => {
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
}), AO = b([pe, EO, Wo, Wi, (e, t, r) => r], (e, t, r, n, i) => {
  var {
    padding: a
  } = n;
  return i ? [a.left, r.width - a.right] : [e.left + t.left, e.left + e.width - t.right];
}), MO = b([pe, Q, SO, Wo, Wi, (e, t, r) => r], (e, t, r, n, i, a) => {
  var {
    padding: o
  } = i;
  return a ? [n.height - o.bottom, o.top] : t === "horizontal" ? [e.top + e.height - r.bottom, e.top + r.top] : [e.top + r.top, e.top + e.height - r.bottom];
}), bn = (e, t, r, n) => {
  var i;
  switch (t) {
    case "xAxis":
      return AO(e, r, n);
    case "yAxis":
      return MO(e, r, n);
    case "zAxis":
      return (i = Nu(e, r)) === null || i === void 0 ? void 0 : i.range;
    case "angleAxis":
      return Xd(e);
    case "radiusAxis":
      return Zd(e, r);
    default:
      return;
  }
}, op = b([ve, bn], Gi), NO = b([Mr, _O], o1), ju = b([ve, Mr, NO, op], Mu), up = (e, t, r, n) => {
  if (!(r == null || r.dataKey == null)) {
    var {
      type: i,
      scale: a
    } = r, o = bt(e, n);
    if (o && (i === "number" || a !== "auto"))
      return t.map((u) => u.value);
  }
}, $u = b([Q, yn, mn, ie], up), ua = b([ju], iu);
b([ju], zx);
b([ju, eO], kh);
b([gn, Iu, ie], oO);
function sp(e, t) {
  return e.id < t.id ? -1 : e.id > t.id ? 1 : 0;
}
var sa = (e, t) => t, ca = (e, t, r) => r, CO = b(Ui, sa, ca, (e, t, r) => e.filter((n) => n.orientation === t).filter((n) => n.mirror === r).sort(sp)), DO = b(Vi, sa, ca, (e, t, r) => e.filter((n) => n.orientation === t).filter((n) => n.mirror === r).sort(sp)), cp = (e, t) => ({
  width: e.width,
  height: t.height
}), IO = (e, t) => {
  var r = typeof t.width == "number" ? t.width : cn;
  return {
    width: r,
    height: e.height
  };
}, IS = b(pe, Pt, cp), TO = (e, t, r) => {
  switch (t) {
    case "top":
      return e.top;
    case "bottom":
      return r - e.bottom;
    default:
      return 0;
  }
}, kO = (e, t, r) => {
  switch (t) {
    case "left":
      return e.left;
    case "right":
      return r - e.right;
    default:
      return 0;
  }
}, jO = b(_t, pe, CO, sa, ca, (e, t, r, n, i) => {
  var a = {}, o;
  return r.forEach((u) => {
    var s = cp(t, u);
    o == null && (o = TO(t, n, e));
    var c = n === "top" && !i || n === "bottom" && i;
    a[u.id] = o - Number(c) * s.height, o += (c ? -1 : 1) * s.height;
  }), a;
}), $O = b(wt, pe, DO, sa, ca, (e, t, r, n, i) => {
  var a = {}, o;
  return r.forEach((u) => {
    var s = IO(t, u);
    o == null && (o = kO(t, n, e));
    var c = n === "left" && !i || n === "right" && i;
    a[u.id] = o - Number(c) * s.width, o += (c ? -1 : 1) * s.width;
  }), a;
}), RO = (e, t) => {
  var r = Pt(e, t);
  if (r != null)
    return jO(e, r.orientation, r.mirror);
}, TS = b([pe, Pt, RO, (e, t) => t], (e, t, r, n) => {
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
}), LO = (e, t) => {
  var r = Et(e, t);
  if (r != null)
    return $O(e, r.orientation, r.mirror);
}, kS = b([pe, Et, LO, (e, t) => t], (e, t, r, n) => {
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
}), jS = b(pe, Et, (e, t) => {
  var r = typeof t.width == "number" ? t.width : cn;
  return {
    width: r,
    height: e.height
  };
}), lp = (e, t, r, n) => {
  if (r != null) {
    var {
      allowDuplicatedCategory: i,
      type: a,
      dataKey: o
    } = r, u = bt(e, n), s = t.map((c) => c.value);
    if (o && u && a === "category" && i && cf(s))
      return s;
  }
}, Ru = b([Q, yn, ve, ie], lp), $S = b([Q, Yx, Mr, ua, Ru, $u, bn, ku, ie], (e, t, r, n, i, a, o, u, s) => {
  if (t != null) {
    var c = bt(e, s);
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
      axisType: s,
      categoricalDomain: a,
      duplicateDomain: i,
      isCategorical: c,
      niceTicks: u,
      range: o,
      realScaleType: r,
      scale: n
    };
  }
}), zO = (e, t, r, n, i, a, o, u, s) => {
  if (!(t == null || n == null)) {
    var c = bt(e, s), {
      type: l,
      ticks: f,
      tickCount: d
    } = t, h = (
      // @ts-expect-error This is testing for `scaleBand` but for band axis the type is reported as `band` so this looks like a dead code with a workaround elsewhere?
      r === "scaleBand" && typeof n.bandwidth == "function" ? n.bandwidth() / 2 : 2
    ), p = l === "category" && n.bandwidth ? n.bandwidth() / h : 0;
    p = s === "angleAxis" && a != null && a.length >= 2 ? qe(a[0] - a[1]) * 2 * p : p;
    var m = f || i;
    return m ? m.map((v, g) => {
      var w = o ? o.indexOf(v) : v, y = n.map(w);
      return U(y) ? {
        index: g,
        coordinate: y + p,
        value: v,
        offset: p
      } : null;
    }).filter(ye) : c && u ? u.map((v, g) => {
      var w = n.map(v);
      return U(w) ? {
        coordinate: w + p,
        value: v,
        index: g,
        offset: p
      } : null;
    }).filter(ye) : n.ticks ? n.ticks(d).map((v, g) => {
      var w = n.map(v);
      return U(w) ? {
        coordinate: w + p,
        value: v,
        index: g,
        offset: p
      } : null;
    }).filter(ye) : n.domain().map((v, g) => {
      var w = n.map(v);
      return U(w) ? {
        coordinate: w + p,
        // @ts-expect-error can't use Date as index
        value: o ? o[v] : v,
        index: g,
        offset: p
      } : null;
    }).filter(ye);
  }
}, RS = b([Q, mn, Mr, ua, ku, bn, Ru, $u, ie], zO), FO = (e, t, r, n, i, a, o) => {
  if (!(t == null || r == null || n == null || n[0] === n[1])) {
    var u = bt(e, o), {
      tickCount: s
    } = t, c = 0;
    return c = o === "angleAxis" && n?.length >= 2 ? qe(n[0] - n[1]) * 2 * c : c, u && a ? a.map((l, f) => {
      var d = r.map(l);
      return U(d) ? {
        coordinate: d + c,
        value: l,
        index: f,
        offset: c
      } : null;
    }).filter(ye) : r.ticks ? r.ticks(s).map((l, f) => {
      var d = r.map(l);
      return U(d) ? {
        coordinate: d + c,
        value: l,
        index: f,
        offset: c
      } : null;
    }).filter(ye) : r.domain().map((l, f) => {
      var d = r.map(l);
      return U(d) ? {
        coordinate: d + c,
        // @ts-expect-error can't use unknown as index
        value: i ? i[l] : l,
        index: f,
        offset: c
      } : null;
    }).filter(ye);
  }
}, LS = b([Q, mn, ua, bn, Ru, $u, ie], FO), zS = b(ve, ua, (e, t) => {
  if (!(e == null || t == null))
    return Si(Si({}, e), {}, {
      scale: t
    });
}), BO = b([ve, Mr, Tu, op], Mu), UO = b([BO], iu);
b((e, t, r) => Nu(e, r), UO, (e, t) => {
  if (!(e == null || t == null))
    return Si(Si({}, e), {}, {
      scale: t
    });
});
var FS = b([Q, Ui, Vi], (e, t, r) => {
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
}), VO = (e, t, r) => {
  var n;
  return (n = e.renderedTicks[t]) === null || n === void 0 ? void 0 : n[r];
};
b([VO], (e) => {
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
var fp = (e) => e.options.defaultTooltipEventType, dp = (e) => e.options.validateTooltipEventTypes;
function hp(e, t, r) {
  if (e == null)
    return t;
  var n = e ? "axis" : "item";
  return r == null ? t : r.includes(n) ? n : t;
}
function WO(e, t) {
  var r = fp(e), n = dp(e);
  return hp(t, r, n);
}
function KO(e) {
  return R((t) => WO(t, e));
}
var pp = (e, t) => {
  var r, n = Number(t);
  if (!(Gt(n) || t == null))
    return n >= 0 ? e == null || (r = e[n]) === null || r === void 0 ? void 0 : r.value : void 0;
}, qO = (e) => e.tooltip.settings, pt = {
  active: !1,
  index: null,
  dataKey: void 0,
  graphicalItemId: void 0,
  coordinate: void 0
}, HO = {
  itemInteraction: {
    click: pt,
    hover: pt
  },
  axisInteraction: {
    click: pt,
    hover: pt
  },
  keyboardInteraction: pt,
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
}, vp = xr({
  name: "tooltip",
  initialState: HO,
  reducers: {
    addTooltipEntrySettings: {
      reducer(e, t) {
        e.tooltipItemPayloads.push(t.payload);
      },
      prepare: He()
    },
    replaceTooltipEntrySettings: {
      reducer(e, t) {
        var {
          prev: r,
          next: n
        } = t.payload, i = Wr(e).tooltipItemPayloads.indexOf(r);
        i > -1 && (e.tooltipItemPayloads[i] = n);
      },
      prepare: He()
    },
    removeTooltipEntrySettings: {
      reducer(e, t) {
        var r = Wr(e).tooltipItemPayloads.indexOf(t.payload);
        r > -1 && e.tooltipItemPayloads.splice(r, 1);
      },
      prepare: He()
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
  addTooltipEntrySettings: BS,
  replaceTooltipEntrySettings: US,
  removeTooltipEntrySettings: VS,
  setTooltipSettingsState: YO,
  setActiveMouseOverItemIndex: WS,
  mouseLeaveItem: KS,
  mouseLeaveChart: qS,
  setActiveClickItemIndex: HS,
  setMouseOverAxisIndex: YS,
  setMouseClickAxisIndex: GS,
  setSyncInteraction: Po,
  setKeyboardInteraction: XS
} = vp.actions, ZS = vp.reducer;
function Pl(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function zn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Pl(Object(r), !0).forEach(function(n) {
      GO(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Pl(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function GO(e, t, r) {
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
function QO(e, t, r) {
  return t === "axis" ? r === "click" ? e.axisInteraction.click : e.axisInteraction.hover : r === "click" ? e.itemInteraction.click : e.itemInteraction.hover;
}
function JO(e) {
  return e.index != null;
}
var mp = (e, t, r, n) => {
  if (t == null)
    return pt;
  var i = QO(e, t, r);
  if (i == null)
    return pt;
  if (i.active)
    return i;
  if (e.keyboardInteraction.active)
    return e.keyboardInteraction;
  if (e.syncInteraction.active && e.syncInteraction.index != null)
    return e.syncInteraction;
  var a = e.settings.active === !0;
  if (JO(i)) {
    if (a)
      return zn(zn({}, i), {}, {
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
  return zn(zn({}, pt), {}, {
    coordinate: i.coordinate
  });
};
function eP(e) {
  if (typeof e == "number")
    return Number.isFinite(e) ? e : void 0;
  if (e instanceof Date) {
    var t = e.valueOf();
    return Number.isFinite(t) ? t : void 0;
  }
  var r = Number(e);
  return Number.isFinite(r) ? r : void 0;
}
function tP(e, t) {
  var r = eP(e), n = t[0], i = t[1];
  if (r === void 0)
    return !1;
  var a = Math.min(n, i), o = Math.max(n, i);
  return r >= a && r <= o;
}
function rP(e, t, r) {
  if (r == null || t == null)
    return !0;
  var n = we(e, t);
  return n == null || !Xe(r) ? !0 : tP(n, r);
}
var gp = (e, t, r, n) => {
  var i = e?.index;
  if (i == null)
    return null;
  var a = Number(i);
  if (!U(a))
    return i;
  var o = 0, u = 1 / 0;
  t.length > 0 && (u = t.length - 1);
  var s = Math.max(o, Math.min(a, u)), c = t[s];
  return c == null || rP(c, r, n) ? String(s) : null;
}, yp = (e, t, r, n, i, a, o) => {
  if (a != null) {
    var u = o[0], s = u?.getPosition(a);
    if (s != null)
      return s;
    var c = i?.[Number(a)];
    if (c)
      switch (r) {
        case "horizontal":
          return {
            x: c.coordinate,
            y: (n.top + t) / 2
          };
        default:
          return {
            x: (n.left + e) / 2,
            y: c.coordinate
          };
      }
  }
}, bp = (e, t, r, n) => {
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
    var u;
    return ((u = o.settings) === null || u === void 0 ? void 0 : u.graphicalItemId) === i;
  });
}, wp = (e) => e.options.tooltipPayloadSearcher, wn = (e) => e.tooltip;
function El(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Sl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? El(Object(r), !0).forEach(function(n) {
      nP(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : El(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function nP(e, t, r) {
  return (t = iP(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function iP(e) {
  var t = aP(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function aP(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function oP(e) {
  if (typeof e == "string" || typeof e == "number")
    return e;
}
function uP(e) {
  if (typeof e == "string" || typeof e == "number" || typeof e == "boolean")
    return e;
}
function sP(e) {
  if (typeof e == "string" || typeof e == "number")
    return e;
  if (typeof e == "function")
    return (t) => e(t);
}
function Al(e) {
  if (typeof e == "string")
    return e;
}
function cP(e) {
  if (!(e == null || typeof e != "object")) {
    var t = "name" in e ? oP(e.name) : void 0, r = "unit" in e ? uP(e.unit) : void 0, n = "dataKey" in e ? sP(e.dataKey) : void 0, i = "payload" in e ? e.payload : void 0, a = "color" in e ? Al(e.color) : void 0, o = "fill" in e ? Al(e.fill) : void 0;
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
function lP(e, t) {
  return e ?? t;
}
var _p = (e, t, r, n, i, a, o) => {
  if (!(t == null || a == null)) {
    var {
      chartData: u,
      computedData: s,
      dataStartIndex: c,
      dataEndIndex: l
    } = r, f = [];
    return e.reduce((d, h) => {
      var p, {
        dataDefinedOnItem: m,
        settings: v
      } = h, g = lP(m, u), w = Array.isArray(g) ? cd(g, c, l) : g, y = (p = v?.dataKey) !== null && p !== void 0 ? p : n, x = v?.nameKey, O;
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
      o === "axis" ? O = lf(w, n, i) : O = a(w, t, s, x), Array.isArray(O))
        O.forEach((S) => {
          var N, I, D = cP(S), T = D?.name, E = D?.dataKey, W = D?.payload, B = Sl(Sl({}, v), {}, {
            name: T,
            unit: D?.unit,
            // Preserve item-level color/fill from graphical items.
            color: (N = D?.color) !== null && N !== void 0 ? N : v?.color,
            fill: (I = D?.fill) !== null && I !== void 0 ? I : v?.fill
          });
          d.push(As({
            tooltipEntrySettings: B,
            dataKey: E,
            payload: W,
            value: we(W, E),
            name: T == null ? void 0 : String(T)
          }));
        });
      else {
        var _;
        d.push(As({
          tooltipEntrySettings: v,
          dataKey: y,
          payload: O,
          // getValueByDataKey does not validate the output type
          value: we(O, y),
          // getValueByDataKey does not validate the output type
          name: (_ = we(O, x)) !== null && _ !== void 0 ? _ : v?.name
        }));
      }
      return d;
    }, f);
  }
}, Lu = b([te, jh, Zo], Th), fP = b([(e) => e.graphicalItems.cartesianItems, (e) => e.graphicalItems.polarItems], (e, t) => [...e, ...t]), dP = b([se, Er], $h), _n = b([fP, te, dP], Rh, {
  memoizeOptions: {
    resultEqualityCheck: Ji
  }
}), hP = b([_n], (e) => e.filter(nu)), pP = b([_n], Fh, {
  memoizeOptions: {
    resultEqualityCheck: Ji
  }
}), xn = b([pP, lt], Bh), vP = b([hP, lt, te], Jd), zu = b([xn, te, _n], Uh), xp = b([te], Du), mP = b([te], (e) => e.allowDataOverflow), Op = b([xp, mP], kd), gP = b([_n], (e) => e.filter(nu)), yP = b([vP, gP, Yi, Kd], Wh), bP = b([yP, lt, se, Op], Kh), wP = b([_n], zh), _P = b([xn, te, wP, Iu, se], Yh, {
  memoizeOptions: {
    resultEqualityCheck: Qi
  }
}), xP = b([Gh, se, Er], Ar), OP = b([xP, se], Qh), PP = b([Xh, se, Er], Ar), EP = b([PP, se], Jh), SP = b([Zh, se, Er], Ar), AP = b([SP, se], ep), MP = b([OP, AP, EP], Ai), NP = b([te, xp, Op, bP, _P, MP, Q, se], tp), la = b([te, Q, xn, zu, Yi, se, NP], rp), CP = b([la, te, Lu], np), DP = b([te, la, CP, se], ip), Pp = (e) => {
  var t = se(e), r = Er(e), n = !1;
  return bn(e, t, r, n);
}, IP = b([te, Pp], Gi), TP = b([te, Lu, DP, IP], Mu), Ep = b([TP], iu), kP = b([Q, zu, te, se], lp), jP = b([Q, zu, te, se], up), $P = (e, t, r, n, i, a, o, u) => {
  if (t) {
    var {
      type: s
    } = t, c = bt(e, u);
    if (n) {
      var l = r === "scaleBand" && n.bandwidth ? n.bandwidth() / 2 : 2, f = s === "category" && n.bandwidth ? n.bandwidth() / l : 0;
      return f = u === "angleAxis" && i != null && i?.length >= 2 ? qe(i[0] - i[1]) * 2 * f : f, c && o ? o.map((d, h) => {
        var p = n.map(d);
        return U(p) ? {
          coordinate: p + f,
          value: d,
          index: h,
          offset: f
        } : null;
      }).filter(ye) : n.domain().map((d, h) => {
        var p = n.map(d);
        return U(p) ? {
          coordinate: p + f,
          // @ts-expect-error can't use Date as an index
          value: a ? a[d] : d,
          index: h,
          offset: f
        } : null;
      }).filter(ye);
    }
  }
}, Qt = b([Q, te, Lu, Ep, Pp, kP, jP, se], $P), Fu = b([fp, dp, qO], (e, t, r) => hp(r.shared, e, t)), Sp = (e) => e.tooltip.settings.trigger, Bu = (e) => e.tooltip.settings.defaultIndex, On = b([wn, Fu, Sp, Bu], mp), Ap = b([On, xn, oa, la], gp), RP = b([Qt, Ap], pp), QS = b([On], (e) => {
  if (e)
    return e.dataKey;
}), LP = b([On], (e) => {
  if (e)
    return e.graphicalItemId;
}), Mp = b([wn, Fu, Sp, Bu], bp), zP = b([wt, _t, Q, pe, Qt, Bu, Mp], yp), JS = b([On, zP], (e, t) => e != null && e.coordinate ? e.coordinate : t), eA = b([On], (e) => {
  var t;
  return (t = e?.active) !== null && t !== void 0 ? t : !1;
}), FP = b([Mp, Ap, lt, oa, RP, wp, Fu], _p), tA = b([FP], (e) => {
  if (e != null) {
    var t = e.map((r) => r.payload).filter((r) => r != null);
    return Array.from(new Set(t));
  }
});
function Ml(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Nl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ml(Object(r), !0).forEach(function(n) {
      BP(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ml(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function BP(e, t, r) {
  return (t = UP(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function UP(e) {
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
var WP = () => R(te), KP = () => {
  var e = WP(), t = R(Qt), r = R(Ep);
  return Ss(!e || !r ? void 0 : Nl(Nl({}, e), {}, {
    scale: r
  }), t);
};
function Cl(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function nr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Cl(Object(r), !0).forEach(function(n) {
      qP(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Cl(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function qP(e, t, r) {
  return (t = HP(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function HP(e) {
  var t = YP(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function YP(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var GP = (e, t, r, n) => {
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
}, XP = (e, t, r, n) => {
  var i = t.find((c) => c && c.index === r);
  if (i) {
    if (e === "centric") {
      var a = i.coordinate, {
        radius: o
      } = n;
      return nr(nr(nr({}, n), Se(n.cx, n.cy, o, a)), {}, {
        angle: a,
        radius: o
      });
    }
    var u = i.coordinate, {
      angle: s
    } = n;
    return nr(nr(nr({}, n), Se(n.cx, n.cy, u, s)), {}, {
      angle: s,
      radius: u
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
function ZP(e, t) {
  var {
    relativeX: r,
    relativeY: n
  } = e;
  return r >= t.left && r <= t.left + t.width && n >= t.top && n <= t.top + t.height;
}
var Np = (e, t, r, n, i) => {
  var a, o = (a = t?.length) !== null && a !== void 0 ? a : 0;
  if (o <= 1 || e == null)
    return 0;
  if (n === "angleAxis" && i != null && Math.abs(Math.abs(i[1] - i[0]) - 360) <= 1e-6)
    for (var u = 0; u < o; u++) {
      var s, c, l, f, d, h = u > 0 ? (s = r[u - 1]) === null || s === void 0 ? void 0 : s.coordinate : (c = r[o - 1]) === null || c === void 0 ? void 0 : c.coordinate, p = (l = r[u]) === null || l === void 0 ? void 0 : l.coordinate, m = u >= o - 1 ? (f = r[0]) === null || f === void 0 ? void 0 : f.coordinate : (d = r[u + 1]) === null || d === void 0 ? void 0 : d.coordinate, v = void 0;
      if (!(h == null || p == null || m == null))
        if (qe(p - h) !== qe(m - p)) {
          var g = [];
          if (qe(m - p) === qe(i[1] - i[0])) {
            v = m;
            var w = p + i[1] - i[0];
            g[0] = Math.min(w, (w + h) / 2), g[1] = Math.max(w, (w + h) / 2);
          } else {
            v = h;
            var y = m + i[1] - i[0];
            g[0] = Math.min(p, (y + p) / 2), g[1] = Math.max(p, (y + p) / 2);
          }
          var x = [Math.min(p, (v + p) / 2), Math.max(p, (v + p) / 2)];
          if (e > x[0] && e <= x[1] || e >= g[0] && e <= g[1]) {
            var O;
            return (O = r[u]) === null || O === void 0 ? void 0 : O.index;
          }
        } else {
          var _ = Math.min(h, m), S = Math.max(h, m);
          if (e > (_ + p) / 2 && e <= (S + p) / 2) {
            var N;
            return (N = r[u]) === null || N === void 0 ? void 0 : N.index;
          }
        }
    }
  else if (t)
    for (var I = 0; I < o; I++) {
      var D = t[I];
      if (D != null) {
        var T = t[I + 1], E = t[I - 1];
        if (I === 0 && T != null && e <= (D.coordinate + T.coordinate) / 2 || I === o - 1 && E != null && e > (D.coordinate + E.coordinate) / 2 || I > 0 && I < o - 1 && E != null && T != null && e > (D.coordinate + E.coordinate) / 2 && e <= (D.coordinate + T.coordinate) / 2)
          return D.index;
      }
    }
  return -1;
}, QP = () => R(Zo), Uu = (e, t) => t, Cp = (e, t, r) => r, Vu = (e, t, r, n) => n, rA = b(Qt, (e) => Ti(e, (t) => t.coordinate)), Wu = b([wn, Uu, Cp, Vu], mp), Ku = b([Wu, xn, oa, la], gp), JP = (e, t, r) => {
  if (t != null) {
    var n = wn(e);
    return t === "axis" ? r === "hover" ? n.axisInteraction.hover.dataKey : n.axisInteraction.click.dataKey : r === "hover" ? n.itemInteraction.hover.dataKey : n.itemInteraction.click.dataKey;
  }
}, Dp = b([wn, Uu, Cp, Vu], bp), eE = b([wt, _t, Q, pe, Qt, Vu, Dp], yp), tE = b([Wu, eE], (e, t) => {
  var r;
  return (r = e.coordinate) !== null && r !== void 0 ? r : t;
}), Ip = b([Qt, Ku], pp), rE = b([Dp, Ku, lt, oa, Ip, wp, Uu], _p), nE = b([Wu, Ku], (e, t) => ({
  isActive: e.active && t != null,
  activeIndex: t
})), iE = (e, t, r, n, i, a, o) => {
  if (!(!e || !r || !n || !i) && ZP(e, o)) {
    var u = Wy(e, t), s = Np(u, a, i, r, n), c = GP(t, i, s, e);
    return {
      activeIndex: String(s),
      activeCoordinate: c
    };
  }
}, aE = (e, t, r, n, i, a, o) => {
  if (!(!e || !n || !i || !a || !r)) {
    var u = Fw(e, r);
    if (u) {
      var s = Ky(u, t), c = Np(s, o, a, n, i), l = XP(t, a, c, u);
      return {
        activeIndex: String(c),
        activeCoordinate: l
      };
    }
  }
}, nA = (e, t, r, n, i, a, o, u) => {
  if (!(!e || !t || !n || !i || !a))
    return t === "horizontal" || t === "vertical" ? iE(e, t, n, i, a, o, u) : aE(e, t, r, n, i, a, o);
}, oE = b((e) => e.zIndex.zIndexMap, (e, t) => t, (e, t, r) => r, (e, t, r) => {
  if (t != null) {
    var n = e[t];
    if (n != null)
      return r ? n.panoramaElement : n.element;
  }
}), iA = b((e) => e.zIndex.zIndexMap, (e) => {
  var t = Object.keys(e).map((n) => parseInt(n, 10)).concat(Object.values(jt)), r = Array.from(new Set(t));
  return r.sort((n, i) => n - i);
}, {
  memoizeOptions: {
    resultEqualityCheck: a1
  }
});
function Dl(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Il(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Dl(Object(r), !0).forEach(function(n) {
      uE(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Dl(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function uE(e, t, r) {
  return (t = sE(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function sE(e) {
  var t = cE(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function cE(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var lE = {}, fE = {
  zIndexMap: Object.values(jt).reduce((e, t) => Il(Il({}, e), {}, {
    [t]: {
      element: void 0,
      panoramaElement: void 0,
      consumers: 0
    }
  }), lE)
}, dE = new Set(Object.values(jt));
function hE(e) {
  return dE.has(e);
}
var Tp = xr({
  name: "zIndex",
  initialState: fE,
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
      prepare: He()
    },
    unregisterZIndexPortal: {
      reducer: (e, t) => {
        var {
          zIndex: r
        } = t.payload;
        e.zIndexMap[r] && (e.zIndexMap[r].consumers -= 1, e.zIndexMap[r].consumers <= 0 && !hE(r) && delete e.zIndexMap[r]);
      },
      prepare: He()
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
      prepare: He()
    },
    unregisterZIndexPortalElement: {
      reducer: (e, t) => {
        var {
          zIndex: r
        } = t.payload;
        e.zIndexMap[r] && (t.payload.isPanorama ? e.zIndexMap[r].panoramaElement = void 0 : e.zIndexMap[r].element = void 0);
      },
      prepare: He()
    }
  }
}), {
  registerZIndexPortal: pE,
  unregisterZIndexPortal: vE,
  registerZIndexPortalElement: aA,
  unregisterZIndexPortalElement: oA
} = Tp.actions, uA = Tp.reducer;
function mE(e) {
  var {
    zIndex: t,
    children: r
  } = e, n = x0(), i = n && t !== void 0 && t !== 0, a = Vo(), o = yt();
  Fp(() => i ? (o(pE({
    zIndex: t
  })), () => {
    o(vE({
      zIndex: t
    }));
  }) : an, [o, t, i]);
  var u = R((s) => oE(s, t, a));
  return i ? u ? /* @__PURE__ */ No(r, u) : null : r;
}
function Eo() {
  return Eo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Eo.apply(null, arguments);
}
function Tl(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Fn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Tl(Object(r), !0).forEach(function(n) {
      gE(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Tl(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function gE(e, t, r) {
  return (t = yE(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function yE(e) {
  var t = bE(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function bE(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function wE(e) {
  var {
    cursor: t,
    cursorComp: r,
    cursorProps: n
  } = e;
  return /* @__PURE__ */ Mi(t) ? /* @__PURE__ */ Bp(t, n) : /* @__PURE__ */ Up(r, n);
}
function _E(e) {
  var t, {
    coordinate: r,
    payload: n,
    index: i,
    offset: a,
    tooltipAxisBandSize: o,
    layout: u,
    cursor: s,
    tooltipEventType: c,
    chartName: l
  } = e, f = r, d = n, h = i;
  if (!s || !f || l !== "ScatterChart" && c !== "axis")
    return null;
  var p, m, v;
  if (l === "ScatterChart")
    p = f, m = Xb, v = jt.cursorLine;
  else if (l === "BarChart")
    p = Zb(u, f, a, o), m = Cw, v = jt.cursorRectangle;
  else if (u === "radial" && hf(f)) {
    var {
      cx: g,
      cy: w,
      radius: y,
      startAngle: x,
      endAngle: O
    } = Nd(f);
    p = {
      cx: g,
      cy: w,
      startAngle: x,
      endAngle: O,
      innerRadius: y,
      outerRadius: y
    }, m = Ww, v = jt.cursorLine;
  } else
    p = {
      points: Kw(u, f, a)
    }, m = Bb, v = jt.cursorLine;
  var _ = typeof s == "object" && "className" in s ? s.className : void 0, S = Fn(Fn(Fn(Fn({
    stroke: "#ccc",
    pointerEvents: "none"
  }, a), p), Hp(s)), {}, {
    payload: d,
    payloadIndex: h,
    className: je("recharts-tooltip-cursor", _)
  });
  return /* @__PURE__ */ A.createElement(mE, {
    zIndex: (t = e.zIndex) !== null && t !== void 0 ? t : v
  }, /* @__PURE__ */ A.createElement(wE, {
    cursor: s,
    cursorComp: m,
    cursorProps: S
  }));
}
function xE(e) {
  var t = KP(), r = y0(), n = ln(), i = QP();
  return t == null || r == null || n == null || i == null ? null : /* @__PURE__ */ A.createElement(_E, Eo({}, e, {
    offset: r,
    layout: n,
    tooltipAxisBandSize: t,
    chartName: i
  }));
}
var OE = /* @__PURE__ */ wr(null), PE = () => Yt(OE), Ta = { exports: {} }, kl;
function EE() {
  return kl || (kl = 1, (function(e) {
    var t = Object.prototype.hasOwnProperty, r = "~";
    function n() {
    }
    Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (r = !1));
    function i(s, c, l) {
      this.fn = s, this.context = c, this.once = l || !1;
    }
    function a(s, c, l, f, d) {
      if (typeof l != "function")
        throw new TypeError("The listener must be a function");
      var h = new i(l, f || s, d), p = r ? r + c : c;
      return s._events[p] ? s._events[p].fn ? s._events[p] = [s._events[p], h] : s._events[p].push(h) : (s._events[p] = h, s._eventsCount++), s;
    }
    function o(s, c) {
      --s._eventsCount === 0 ? s._events = new n() : delete s._events[c];
    }
    function u() {
      this._events = new n(), this._eventsCount = 0;
    }
    u.prototype.eventNames = function() {
      var c = [], l, f;
      if (this._eventsCount === 0) return c;
      for (f in l = this._events)
        t.call(l, f) && c.push(r ? f.slice(1) : f);
      return Object.getOwnPropertySymbols ? c.concat(Object.getOwnPropertySymbols(l)) : c;
    }, u.prototype.listeners = function(c) {
      var l = r ? r + c : c, f = this._events[l];
      if (!f) return [];
      if (f.fn) return [f.fn];
      for (var d = 0, h = f.length, p = new Array(h); d < h; d++)
        p[d] = f[d].fn;
      return p;
    }, u.prototype.listenerCount = function(c) {
      var l = r ? r + c : c, f = this._events[l];
      return f ? f.fn ? 1 : f.length : 0;
    }, u.prototype.emit = function(c, l, f, d, h, p) {
      var m = r ? r + c : c;
      if (!this._events[m]) return !1;
      var v = this._events[m], g = arguments.length, w, y;
      if (v.fn) {
        switch (v.once && this.removeListener(c, v.fn, void 0, !0), g) {
          case 1:
            return v.fn.call(v.context), !0;
          case 2:
            return v.fn.call(v.context, l), !0;
          case 3:
            return v.fn.call(v.context, l, f), !0;
          case 4:
            return v.fn.call(v.context, l, f, d), !0;
          case 5:
            return v.fn.call(v.context, l, f, d, h), !0;
          case 6:
            return v.fn.call(v.context, l, f, d, h, p), !0;
        }
        for (y = 1, w = new Array(g - 1); y < g; y++)
          w[y - 1] = arguments[y];
        v.fn.apply(v.context, w);
      } else {
        var x = v.length, O;
        for (y = 0; y < x; y++)
          switch (v[y].once && this.removeListener(c, v[y].fn, void 0, !0), g) {
            case 1:
              v[y].fn.call(v[y].context);
              break;
            case 2:
              v[y].fn.call(v[y].context, l);
              break;
            case 3:
              v[y].fn.call(v[y].context, l, f);
              break;
            case 4:
              v[y].fn.call(v[y].context, l, f, d);
              break;
            default:
              if (!w) for (O = 1, w = new Array(g - 1); O < g; O++)
                w[O - 1] = arguments[O];
              v[y].fn.apply(v[y].context, w);
          }
      }
      return !0;
    }, u.prototype.on = function(c, l, f) {
      return a(this, c, l, f, !1);
    }, u.prototype.once = function(c, l, f) {
      return a(this, c, l, f, !0);
    }, u.prototype.removeListener = function(c, l, f, d) {
      var h = r ? r + c : c;
      if (!this._events[h]) return this;
      if (!l)
        return o(this, h), this;
      var p = this._events[h];
      if (p.fn)
        p.fn === l && (!d || p.once) && (!f || p.context === f) && o(this, h);
      else {
        for (var m = 0, v = [], g = p.length; m < g; m++)
          (p[m].fn !== l || d && !p[m].once || f && p[m].context !== f) && v.push(p[m]);
        v.length ? this._events[h] = v.length === 1 ? v[0] : v : o(this, h);
      }
      return this;
    }, u.prototype.removeAllListeners = function(c) {
      var l;
      return c ? (l = r ? r + c : c, this._events[l] && o(this, l)) : (this._events = new n(), this._eventsCount = 0), this;
    }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prefixed = r, u.EventEmitter = u, e.exports = u;
  })(Ta)), Ta.exports;
}
var SE = EE();
const AE = /* @__PURE__ */ Ym(SE);
var en = new AE(), So = "recharts.syncEvent.tooltip", jl = "recharts.syncEvent.brush", sA = (e, t) => {
  if (t && Array.isArray(e)) {
    var r = Number.parseInt(t, 10);
    if (!Gt(r))
      return e[r];
  }
}, ME = {
  chartName: "",
  tooltipPayloadSearcher: () => {
  },
  eventEmitter: void 0,
  defaultTooltipEventType: "axis"
}, kp = xr({
  name: "options",
  initialState: ME,
  reducers: {
    createEventEmitter: (e) => {
      e.eventEmitter == null && (e.eventEmitter = Symbol("rechartsEventEmitter"));
    }
  }
}), cA = kp.reducer, {
  createEventEmitter: NE
} = kp.actions;
function CE(e) {
  return e.tooltip.syncInteraction;
}
var DE = {
  chartData: void 0,
  computedData: void 0,
  dataStartIndex: 0,
  dataEndIndex: 0
}, jp = xr({
  name: "chartData",
  initialState: DE,
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
  setChartData: lA,
  setDataStartEndIndexes: IE,
  setComputedData: fA
} = jp.actions, dA = jp.reducer, TE = ["x", "y"];
function $l(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ir(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $l(Object(r), !0).forEach(function(n) {
      kE(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $l(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function kE(e, t, r) {
  return (t = jE(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function jE(e) {
  var t = $E(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function $E(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function RE(e, t) {
  if (e == null) return {};
  var r, n, i = LE(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function LE(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function zE() {
  var e = R(Qo), t = R(Jo), r = yt(), n = R(qd), i = R(Qt), a = ln(), o = Ko(), u = R((s) => s.rootProps.className);
  Ae(() => {
    if (e == null)
      return an;
    var s = (c, l, f) => {
      if (t !== f && e === c) {
        if (n === "index") {
          var d;
          if (o && l !== null && l !== void 0 && (d = l.payload) !== null && d !== void 0 && d.coordinate && l.payload.sourceViewBox) {
            var h = l.payload.coordinate, {
              x: p,
              y: m
            } = h, v = RE(h, TE), {
              x: g,
              y: w,
              width: y,
              height: x
            } = l.payload.sourceViewBox, O = ir(ir({}, v), {}, {
              x: o.x + (y ? (p - g) / y : 0) * o.width,
              y: o.y + (x ? (m - w) / x : 0) * o.height
            });
            r(ir(ir({}, l), {}, {
              payload: ir(ir({}, l.payload), {}, {
                coordinate: O
              })
            }));
          } else
            r(l);
          return;
        }
        if (i != null) {
          var _;
          if (typeof n == "function") {
            var S = {
              activeTooltipIndex: l.payload.index == null ? void 0 : Number(l.payload.index),
              isTooltipActive: l.payload.active,
              activeIndex: l.payload.index == null ? void 0 : Number(l.payload.index),
              activeLabel: l.payload.label,
              activeDataKey: l.payload.dataKey,
              activeCoordinate: l.payload.coordinate
            }, N = n(i, S);
            _ = i[N];
          } else n === "value" && (_ = i.find((re) => String(re.value) === l.payload.label));
          var {
            coordinate: I
          } = l.payload;
          if (_ == null || l.payload.active === !1 || I == null || o == null) {
            r(Po({
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
            x: D,
            y: T
          } = I, E = Math.min(D, o.x + o.width), W = Math.min(T, o.y + o.height), B = {
            x: a === "horizontal" ? _.coordinate : E,
            y: a === "horizontal" ? W : _.coordinate
          }, G = Po({
            active: l.payload.active,
            coordinate: B,
            dataKey: l.payload.dataKey,
            index: String(_.index),
            label: l.payload.label,
            sourceViewBox: l.payload.sourceViewBox,
            graphicalItemId: l.payload.graphicalItemId
          });
          r(G);
        }
      }
    };
    return en.on(So, s), () => {
      en.off(So, s);
    };
  }, [u, r, t, e, n, i, a, o]);
}
function FE() {
  var e = R(Qo), t = R(Jo), r = yt();
  Ae(() => {
    if (e == null)
      return an;
    var n = (i, a, o) => {
      t !== o && e === i && r(IE(a));
    };
    return en.on(jl, n), () => {
      en.off(jl, n);
    };
  }, [r, t, e]);
}
function hA() {
  var e = yt();
  Ae(() => {
    e(NE());
  }, [e]), zE(), FE();
}
function BE(e, t, r, n, i, a) {
  var o = R((p) => JP(p, e, t)), u = R(LP), s = R(Jo), c = R(Qo), l = R(qd), f = R(CE), d = f?.active, h = Ko();
  Ae(() => {
    if (!d && c != null && s != null) {
      var p = Po({
        active: a,
        coordinate: r,
        dataKey: o,
        index: i,
        label: typeof n == "number" ? String(n) : n,
        sourceViewBox: h,
        graphicalItemId: u
      });
      en.emit(So, c, p, s);
    }
  }, [d, r, o, u, i, n, s, c, l, a, h]);
}
function Rl(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ll(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Rl(Object(r), !0).forEach(function(n) {
      UE(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Rl(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function UE(e, t, r) {
  return (t = VE(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function VE(e) {
  var t = WE(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function WE(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function KE(e) {
  return e.dataKey;
}
function qE(e, t) {
  return /* @__PURE__ */ A.isValidElement(e) ? /* @__PURE__ */ A.cloneElement(e, t) : typeof e == "function" ? /* @__PURE__ */ A.createElement(e, t) : /* @__PURE__ */ A.createElement(Ob, t);
}
var zl = [], HE = {
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
function YE(e) {
  var t, r, n = _r(e, HE), {
    active: i,
    allowEscapeViewBox: a,
    animationDuration: o,
    animationEasing: u,
    content: s,
    filterNull: c,
    isAnimationActive: l,
    offset: f,
    payloadUniqBy: d,
    position: h,
    reverseDirection: p,
    useTranslate3d: m,
    wrapperStyle: v,
    cursor: g,
    shared: w,
    trigger: y,
    defaultIndex: x,
    portal: O,
    axisId: _
  } = n, S = yt(), N = typeof x == "number" ? String(x) : x;
  Ae(() => {
    S(YO({
      shared: w,
      trigger: y,
      axisId: _,
      active: i,
      defaultIndex: N
    }));
  }, [S, w, y, _, i, N]);
  var I = Ko(), D = jb(), T = KO(w), {
    activeIndex: E,
    isActive: W
  } = (t = R((Ce) => nE(Ce, T, y, N))) !== null && t !== void 0 ? t : {}, B = R((Ce) => rE(Ce, T, y, N)), G = R((Ce) => Ip(Ce, T, y, N)), re = R((Ce) => tE(Ce, T, y, N)), X = B, Ne = PE(), ce = (r = i ?? W) !== null && r !== void 0 ? r : !1, [le, Jt] = Df([X, ce]), Je = T === "axis" ? G : void 0;
  BE(T, y, re, Je, E, ce);
  var St = O ?? Ne;
  if (St == null || I == null || T == null)
    return null;
  var Ue = X ?? zl;
  ce || (Ue = zl), c && Ue.length && (Ue = Sf(Ue.filter((Ce) => Ce.value != null && (Ce.hide !== !0 || n.includeHidden)), d, KE));
  var Nr = Ue.length > 0, fa = Ll(Ll({}, n), {}, {
    payload: Ue,
    label: Je,
    active: ce,
    activeIndex: E,
    coordinate: re,
    accessibilityLayer: D
  }), da = /* @__PURE__ */ A.createElement(kb, {
    allowEscapeViewBox: a,
    animationDuration: o,
    animationEasing: u,
    isAnimationActive: l,
    active: ce,
    coordinate: re,
    hasPayload: Nr,
    offset: f,
    position: h,
    reverseDirection: p,
    useTranslate3d: m,
    viewBox: I,
    wrapperStyle: v,
    lastBoundingBox: le,
    innerRef: Jt,
    hasPortalFromProps: !!O
  }, qE(s, fa));
  return /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ No(da, St), ce && /* @__PURE__ */ A.createElement(xE, {
    cursor: g,
    tooltipEventType: T,
    coordinate: re,
    payload: Ue,
    index: E
  }));
}
const GE = { light: "", dark: ".dark" }, XE = { width: 320, height: 200 }, $p = A.createContext(null);
function Rp() {
  const e = A.useContext($p);
  if (!e)
    throw new Error("useChart must be used within a <ChartContainer />");
  return e;
}
function pA({
  id: e,
  className: t,
  children: r,
  config: n,
  initialDimension: i = XE,
  ...a
}) {
  const o = A.useId(), u = `chart-${e ?? o.replace(/:/g, "")}`;
  return /* @__PURE__ */ de($p.Provider, { value: { config: n }, children: /* @__PURE__ */ ar(
    "div",
    {
      "data-slot": "chart",
      "data-chart": u,
      className: et(
        "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
        t
      ),
      ...a,
      children: [
        /* @__PURE__ */ de(ZE, { id: u, config: n }),
        /* @__PURE__ */ de(
          m0,
          {
            initialDimension: i,
            children: r
          }
        )
      ]
    }
  ) });
}
const ZE = ({ id: e, config: t }) => {
  const r = Object.entries(t).filter(
    ([, n]) => n.theme ?? n.color
  );
  return r.length ? /* @__PURE__ */ de(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(GE).map(
          ([n, i]) => `
${i} [data-chart=${e}] {
${r.map(([a, o]) => {
            const u = o.theme?.[n] ?? o.color;
            return u ? `  --color-${a}: ${u};` : null;
          }).join(`
`)}
}
`
        ).join(`
`)
      }
    }
  ) : null;
}, vA = YE;
function mA({
  active: e,
  payload: t,
  className: r,
  indicator: n = "dot",
  hideLabel: i = !1,
  hideIndicator: a = !1,
  label: o,
  labelFormatter: u,
  labelClassName: s,
  formatter: c,
  color: l,
  nameKey: f,
  labelKey: d
}) {
  const { config: h } = Rp(), p = A.useMemo(() => {
    if (i || !t?.length)
      return null;
    const [v] = t, g = `${d ?? v?.dataKey ?? v?.name ?? "value"}`, w = Ao(h, v, g), y = !d && typeof o == "string" ? h[o]?.label ?? o : w?.label;
    return u ? /* @__PURE__ */ de("div", { className: et("font-medium", s), children: u(y, t) }) : y ? /* @__PURE__ */ de("div", { className: et("font-medium", s), children: y }) : null;
  }, [
    o,
    u,
    t,
    i,
    s,
    h,
    d
  ]);
  if (!e || !t?.length)
    return null;
  const m = t.length === 1 && n !== "dot";
  return /* @__PURE__ */ ar(
    "div",
    {
      className: et(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs shadow-xl",
        r
      ),
      children: [
        m ? null : p,
        /* @__PURE__ */ de("div", { className: "grid gap-1.5", children: t.filter((v) => v.type !== "none").map((v, g) => {
          const w = `${f ?? v.name ?? v.dataKey ?? "value"}`, y = Ao(h, v, w), x = l ?? v.payload?.fill ?? v.color;
          return /* @__PURE__ */ de(
            "div",
            {
              className: et(
                "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                n === "dot" && "items-center"
              ),
              children: c && v?.value !== void 0 && v.name ? c(v.value, v.name, v, g, v.payload) : /* @__PURE__ */ ar(Lp, { children: [
                y?.icon ? /* @__PURE__ */ de(y.icon, {}) : !a && /* @__PURE__ */ de(
                  "div",
                  {
                    className: et(
                      "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                      {
                        "h-2.5 w-2.5": n === "dot",
                        "w-1": n === "line",
                        "w-0 border-[1.5px] border-dashed bg-transparent": n === "dashed",
                        "my-0.5": m && n === "dashed"
                      }
                    ),
                    style: {
                      "--color-bg": x,
                      "--color-border": x
                    }
                  }
                ),
                /* @__PURE__ */ ar(
                  "div",
                  {
                    className: et(
                      "flex flex-1 justify-between leading-none",
                      m ? "items-end" : "items-center"
                    ),
                    children: [
                      /* @__PURE__ */ ar("div", { className: "grid gap-1.5", children: [
                        m ? p : null,
                        /* @__PURE__ */ de("span", { className: "text-muted-foreground", children: y?.label ?? v.name })
                      ] }),
                      v.value != null && /* @__PURE__ */ de("span", { className: "font-mono font-medium text-foreground tabular-nums", children: typeof v.value == "number" ? v.value.toLocaleString() : String(v.value) })
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
const gA = Od;
function yA({
  className: e,
  hideIcon: t = !1,
  payload: r,
  verticalAlign: n = "bottom",
  nameKey: i
}) {
  const { config: a } = Rp();
  return r?.length ? /* @__PURE__ */ de(
    "div",
    {
      className: et(
        "flex items-center justify-center gap-4",
        n === "top" ? "pb-3" : "pt-3",
        e
      ),
      children: r.filter((o) => o.type !== "none").map((o, u) => {
        const s = `${i ?? o.dataKey ?? "value"}`, c = Ao(a, o, s);
        return /* @__PURE__ */ ar(
          "div",
          {
            className: et(
              "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
            ),
            children: [
              c?.icon && !t ? /* @__PURE__ */ de(c.icon, {}) : /* @__PURE__ */ de(
                "div",
                {
                  className: "h-2 w-2 shrink-0 rounded-[2px]",
                  style: {
                    backgroundColor: o.color
                  }
                }
              ),
              c?.label
            ]
          },
          u
        );
      })
    }
  ) : null;
}
function Ao(e, t, r) {
  if (typeof t != "object" || t === null)
    return;
  const n = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0;
  let i = r;
  return r in t && typeof t[r] == "string" ? i = t[r] : n && r in n && typeof n[r] == "string" && (i = n[r]), i in e ? e[i] : e[r];
}
export {
  dS as $,
  PS as A,
  ES as B,
  SS as C,
  jt as D,
  He as E,
  Wr as F,
  Pd as G,
  nS as H,
  b as I,
  pe as J,
  wt as K,
  _t as L,
  tA as M,
  Ap as N,
  Hp as O,
  lA as P,
  rn as Q,
  Yv as R,
  an as S,
  b0 as T,
  w0 as U,
  y0 as V,
  $S as W,
  pr as X,
  Ns as Y,
  mE as Z,
  fS as _,
  Vt as a,
  uA as a$,
  Pt as a0,
  Et as a1,
  Vx as a2,
  Kx as a3,
  Q as a4,
  NS as a5,
  CS as a6,
  zS as a7,
  LS as a8,
  Qd as a9,
  Qt as aA,
  rA as aB,
  nA as aC,
  hr as aD,
  oS as aE,
  GS as aF,
  WO as aG,
  YS as aH,
  qS as aI,
  eE as aJ,
  XS as aK,
  gp as aL,
  xn as aM,
  oa as aN,
  la as aO,
  FS as aP,
  eA as aQ,
  RP as aR,
  QS as aS,
  JS as aT,
  wn as aU,
  gS as aV,
  yS as aW,
  _n as aX,
  WS as aY,
  aS as aZ,
  Ng as a_,
  bt as aa,
  Ss as ab,
  Gx as ac,
  nO as ad,
  nb as ae,
  hS as af,
  vS as ag,
  ln as ah,
  QP as ai,
  pS as aj,
  Ow as ak,
  _S as al,
  xw as am,
  En as an,
  Bb as ao,
  bS as ap,
  RS as aq,
  IS as ar,
  TS as as,
  Wx as at,
  Hd as au,
  jS as av,
  kS as aw,
  qx as ax,
  se as ay,
  IP as az,
  U as b,
  ZS as b0,
  cA as b1,
  AS as b2,
  lS as b3,
  dA as b4,
  oy as b5,
  MS as b6,
  Af as b7,
  sS as b8,
  uS as b9,
  iA as ba,
  aA as bb,
  oA as bc,
  Wo as bd,
  Zp as be,
  jb as bf,
  mS as bg,
  cS as bh,
  pd as bi,
  OE as bj,
  Qp as bk,
  hA as bl,
  xS as bm,
  sA as bn,
  pA as bo,
  vA as bp,
  mA as bq,
  gA as br,
  yA as bs,
  ZE as bt,
  k as c,
  fr as d,
  wS as e,
  Fr as f,
  lr as g,
  R as h,
  Gt as i,
  DS as j,
  Zu as k,
  we as l,
  qe as m,
  qv as n,
  ka as o,
  Se as p,
  xr as q,
  _r as r,
  gt as s,
  OS as t,
  Ko as u,
  yt as v,
  Vo as w,
  BS as x,
  US as y,
  VS as z
};
