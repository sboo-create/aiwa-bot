import { jsx as ce } from "react/jsx-runtime";
import * as ct from "react";
import h, { createContext as Cn, useContext as xn, useCallback as Q, useRef as Ne, useLayoutEffect as Tn, useState as Xe, useEffect as Yn, useMemo as Ce } from "react";
import { e as _n, f as Pn, c as En } from "../../icons-DUsO7wRs.js";
import { c as T } from "../../utils-TrrhThB-.js";
import { buttonVariants as ut, Button as Fn } from "./button.js";
function Bn(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const In = {}, we = {};
function oe(e, t) {
  try {
    const r = (In[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in we ? we[r] : lt(r, r.split(":"));
  } catch {
    if (e in we) return we[e];
    const n = e?.match(Hn);
    return n ? lt(e, n.slice(1)) : NaN;
  }
}
const Hn = /([+-]\d\d):?(\d\d)?/;
function lt(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return we[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class te extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(oe(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Ot(this, t)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new te(...n, t) : new te(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new te(+this, t);
  }
  getTimezoneOffset() {
    const t = -oe(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), xe(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new te(+new Date(t), this.timeZone);
  }
  //#endregion
}
const dt = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!dt.test(e)) return;
  const t = e.replace(dt, "$1UTC");
  te.prototype[t] && (e.startsWith("get") ? te.prototype[e] = function() {
    return this.internal[t]();
  } : (te.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), An(this), +this;
  }, te.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), xe(this), +this;
  }));
});
function xe(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - // Round after converting minutes to seconds to avoid fractional offset
  // precision errors from historical offsets.
  Math.round(-oe(e.timeZone, e) * 60));
}
function An(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Ot(e);
}
function Ot(e, t) {
  const n = Array.isArray(t) ? qn(t) : +e.internal, r = oe(e.timeZone, e), o = r > 0 ? Math.floor(r) : Math.ceil(r), a = /* @__PURE__ */ new Date(+e);
  a.setUTCHours(a.getUTCHours() - 1);
  const i = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+a)).getTimezoneOffset(), c = i - s;
  let u = i;
  if (c && i !== o) {
    const B = Date.prototype.getHours.apply(e), F = Array.isArray(t) ? t[3] || 0 : e.internal.getUTCHours();
    if (B !== F) {
      const q = /* @__PURE__ */ new Date(+e), V = i - o;
      V && q.setUTCMinutes(q.getUTCMinutes() + V);
      const j = oe(e.timeZone, q);
      (j > 0 ? Math.floor(j) : Math.ceil(j)) === o && (u = s);
    }
  }
  const d = u - o;
  d && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + d);
  const l = /* @__PURE__ */ new Date(+e);
  l.setUTCSeconds(0);
  const y = i > 0 ? l.getSeconds() : (l.getSeconds() - 60) % 60, g = Math.round(-(oe(e.timeZone, e) * 60)) % 60;
  (g || y) && Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + g + y);
  const v = oe(e.timeZone, e), N = v > 0 ? Math.floor(v) : Math.ceil(v), P = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - N, D = N !== o, p = P - d, M = N - o, b = n - N * 60 * 1e3, m = M > 0 && ft(e) - n === M * 60 * 1e3 && ft(e, b) !== n;
  if (D && p && !m) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + p);
    const B = oe(e.timeZone, e), F = B > 0 ? Math.floor(B) : Math.ceil(B), q = N - F;
    q && p < 0 && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + q);
  }
  xe(e);
  const Y = (t ? n : n + g * 1e3) - +e.internal;
  Y && Math.abs(Y) < 1800 * 1e3 && (Date.prototype.setTime.call(e, +e + Y), xe(e));
}
function qn(e) {
  return Date.UTC(e[0], e.length > 1 ? e[1] : 0, e.length > 2 ? e[2] : 1, ...e.slice(3));
}
function ft(e, t) {
  const n = new Date(t ?? +e);
  return n.setUTCSeconds(n.getUTCSeconds() - Math.round(-oe(e.timeZone, n) * 60)), +n;
}
class z extends te {
  //#region static
  static tz(t, ...n) {
    return n.length ? new z(...n, t) : new z(Date.now(), t);
  }
  //#endregion
  //#region representation
  toISOString() {
    const [t, n, r] = this.tzComponents(), o = `${t}${n}:${r}`;
    return this.internal.toISOString().slice(0, -1) + o;
  }
  toString() {
    return `${this.toDateString()} ${this.toTimeString()}`;
  }
  toDateString() {
    const [t, n, r, o] = this.internal.toUTCString().split(" ");
    return `${t?.slice(0, -1)} ${r} ${n} ${o}`;
  }
  toTimeString() {
    const t = this.internal.toUTCString().split(" ")[4], [n, r, o] = this.tzComponents();
    return `${t} GMT${n}${r}${o} (${Bn(this.timeZone, this)})`;
  }
  toLocaleString(t, n) {
    return Date.prototype.toLocaleString.call(this, t, {
      ...n,
      timeZone: n?.timeZone || this.timeZone
    });
  }
  toLocaleDateString(t, n) {
    return Date.prototype.toLocaleDateString.call(this, t, {
      ...n,
      timeZone: n?.timeZone || this.timeZone
    });
  }
  toLocaleTimeString(t, n) {
    return Date.prototype.toLocaleTimeString.call(this, t, {
      ...n,
      timeZone: n?.timeZone || this.timeZone
    });
  }
  //#endregion
  //#region private
  tzComponents() {
    const t = this.getTimezoneOffset(), n = t > 0 ? "-" : "+", r = String(Math.floor(Math.abs(t) / 60)).padStart(2, "0"), o = String(Math.abs(t) % 60).padStart(2, "0");
    return [n, r, o];
  }
  //#endregion
  withTimeZone(t) {
    return new z(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new z(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Wt = 6048e5, zn = 864e5, ht = Symbol.for("constructDateFrom");
function A(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && ht in e ? e[ht](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function E(e, t) {
  return A(t || e, e);
}
function St(e, t, n) {
  const r = E(e, n?.in);
  return isNaN(t) ? A(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Nt(e, t, n) {
  const r = E(e, n?.in);
  if (isNaN(t)) return A(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), a = A(e, r.getTime());
  a.setMonth(r.getMonth() + t + 1, 0);
  const i = a.getDate();
  return o >= i ? a : (r.setFullYear(
    a.getFullYear(),
    a.getMonth(),
    o
  ), r);
}
let jn = {};
function ve() {
  return jn;
}
function me(e, t) {
  const n = ve(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = E(e, t?.in), a = o.getDay(), i = (a < r ? 7 : 0) + a - r;
  return o.setDate(o.getDate() - i), o.setHours(0, 0, 0, 0), o;
}
function De(e, t) {
  return me(e, { ...t, weekStartsOn: 1 });
}
function Ct(e, t) {
  const n = E(e, t?.in), r = n.getFullYear(), o = A(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const a = De(o), i = A(n, 0);
  i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
  const s = De(i);
  return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= s.getTime() ? r : r - 1;
}
function mt(e) {
  const t = E(e), n = new Date(
    Date.UTC(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds()
    )
  );
  return n.setUTCFullYear(t.getFullYear()), +e - +n;
}
function ye(e, ...t) {
  const n = A.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function ke(e, t) {
  const n = E(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Ve(e, t, n) {
  const [r, o] = ye(
    n?.in,
    e,
    t
  ), a = ke(r), i = ke(o), s = +a - mt(a), c = +i - mt(i);
  return Math.round((s - c) / zn);
}
function Gn(e, t) {
  const n = Ct(e, t), r = A(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), De(r);
}
function Rn(e, t, n) {
  return St(e, t * 7, n);
}
function $n(e, t, n) {
  return Nt(e, t * 12, n);
}
function Qn(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = A.bind(null, o));
    const a = E(o, r);
    (!n || n < a || isNaN(+a)) && (n = a);
  }), A(r, n || NaN);
}
function Xn(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = A.bind(null, o));
    const a = E(o, r);
    (!n || n > a || isNaN(+a)) && (n = a);
  }), A(r, n || NaN);
}
function Vn(e, t, n) {
  const [r, o] = ye(
    n?.in,
    e,
    t
  );
  return +ke(r) == +ke(o);
}
function xt(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Zn(e) {
  return !(!xt(e) && typeof e != "number" || isNaN(+E(e)));
}
function Tt(e, t, n) {
  const [r, o] = ye(
    n?.in,
    e,
    t
  ), a = r.getFullYear() - o.getFullYear(), i = r.getMonth() - o.getMonth();
  return a * 12 + i;
}
function Un(e, t) {
  const n = E(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Yt(e, t) {
  const [n, r] = ye(e, t.start, t.end);
  return { start: n, end: r };
}
function Kn(e, t) {
  const { start: n, end: r } = Yt(t?.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setDate(1);
  let s = 1;
  const c = [];
  for (; +i <= a; )
    c.push(A(n, i)), i.setMonth(i.getMonth() + s);
  return o ? c.reverse() : c;
}
function Jn(e, t) {
  const n = E(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function Ln(e, t) {
  const n = E(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function _t(e, t) {
  const n = E(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function er(e, t) {
  const { start: n, end: r } = Yt(t?.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setMonth(0, 1);
  let s = 1;
  const c = [];
  for (; +i <= a; )
    c.push(A(n, i)), i.setFullYear(i.getFullYear() + s);
  return o ? c.reverse() : c;
}
function Pt(e, t) {
  const n = ve(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = E(e, t?.in), a = o.getDay(), i = (a < r ? -7 : 0) + 6 - (a - r);
  return o.setDate(o.getDate() + i), o.setHours(23, 59, 59, 999), o;
}
function tr(e, t) {
  return Pt(e, { ...t, weekStartsOn: 1 });
}
const nr = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, rr = (e, t, n) => {
  let r;
  const o = nr[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function je(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const or = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, sr = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, ar = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, ir = {
  date: je({
    formats: or,
    defaultWidth: "full"
  }),
  time: je({
    formats: sr,
    defaultWidth: "full"
  }),
  dateTime: je({
    formats: ar,
    defaultWidth: "full"
  })
}, cr = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, ur = (e, t, n, r) => cr[e];
function be(e) {
  return (t, n) => {
    const r = n?.context ? String(n.context) : "standalone";
    let o;
    if (r === "formatting" && e.formattingValues) {
      const i = e.defaultFormattingWidth || e.defaultWidth, s = n?.width ? String(n.width) : i;
      o = e.formattingValues[s] || e.formattingValues[i];
    } else {
      const i = e.defaultWidth, s = n?.width ? String(n.width) : e.defaultWidth;
      o = e.values[s] || e.values[i];
    }
    const a = e.argumentCallback ? e.argumentCallback(t) : t;
    return o[a];
  };
}
const lr = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, dr = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, fr = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, hr = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, mr = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, yr = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, gr = (e, t) => {
  const n = Number(e), r = n % 100;
  if (r > 20 || r < 10)
    switch (r % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
    }
  return n + "th";
}, br = {
  ordinalNumber: gr,
  era: be({
    values: lr,
    defaultWidth: "wide"
  }),
  quarter: be({
    values: dr,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: be({
    values: fr,
    defaultWidth: "wide"
  }),
  day: be({
    values: hr,
    defaultWidth: "wide"
  }),
  dayPeriod: be({
    values: mr,
    defaultWidth: "wide",
    formattingValues: yr,
    defaultFormattingWidth: "wide"
  })
};
function pe(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(o);
    if (!a)
      return null;
    const i = a[0], s = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(s) ? wr(s, (l) => l.test(i)) : (
      // [TODO] -- I challenge you to fix the type
      pr(s, (l) => l.test(i))
    );
    let u;
    u = e.valueCallback ? e.valueCallback(c) : c, u = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(u)
    ) : u;
    const d = t.slice(i.length);
    return { value: u, rest: d };
  };
}
function pr(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function wr(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Mr(e) {
  return (t, n = {}) => {
    const r = t.match(e.matchPattern);
    if (!r) return null;
    const o = r[0], a = t.match(e.parsePattern);
    if (!a) return null;
    let i = e.valueCallback ? e.valueCallback(a[0]) : a[0];
    i = n.valueCallback ? n.valueCallback(i) : i;
    const s = t.slice(o.length);
    return { value: i, rest: s };
  };
}
const Dr = /^(\d+)(th|st|nd|rd)?/i, kr = /\d+/i, vr = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Or = {
  any: [/^b/i, /^(a|c)/i]
}, Wr = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Sr = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Nr = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Cr = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, xr = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Tr = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Yr = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, _r = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, Pr = {
  ordinalNumber: Mr({
    matchPattern: Dr,
    parsePattern: kr,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: pe({
    matchPatterns: vr,
    defaultMatchWidth: "wide",
    parsePatterns: Or,
    defaultParseWidth: "any"
  }),
  quarter: pe({
    matchPatterns: Wr,
    defaultMatchWidth: "wide",
    parsePatterns: Sr,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: pe({
    matchPatterns: Nr,
    defaultMatchWidth: "wide",
    parsePatterns: Cr,
    defaultParseWidth: "any"
  }),
  day: pe({
    matchPatterns: xr,
    defaultMatchWidth: "wide",
    parsePatterns: Tr,
    defaultParseWidth: "any"
  }),
  dayPeriod: pe({
    matchPatterns: Yr,
    defaultMatchWidth: "any",
    parsePatterns: _r,
    defaultParseWidth: "any"
  })
}, he = {
  code: "en-US",
  formatDistance: rr,
  formatLong: ir,
  formatRelative: ur,
  localize: br,
  match: Pr,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Er(e, t) {
  const n = E(e, t?.in);
  return Ve(n, _t(n)) + 1;
}
function Ze(e, t) {
  const n = E(e, t?.in), r = +De(n) - +Gn(n);
  return Math.round(r / Wt) + 1;
}
function Et(e, t) {
  const n = E(e, t?.in), r = n.getFullYear(), o = ve(), a = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, i = A(t?.in || e, 0);
  i.setFullYear(r + 1, 0, a), i.setHours(0, 0, 0, 0);
  const s = me(i, t), c = A(t?.in || e, 0);
  c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
  const u = me(c, t);
  return +n >= +s ? r + 1 : +n >= +u ? r : r - 1;
}
function Fr(e, t) {
  const n = ve(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = Et(e, t), a = A(t?.in || e, 0);
  return a.setFullYear(o, 0, r), a.setHours(0, 0, 0, 0), me(a, t);
}
function Ue(e, t) {
  const n = E(e, t?.in), r = +me(n, t) - +Fr(n, t);
  return Math.round(r / Wt) + 1;
}
function _(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const ie = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return _(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : _(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return _(e.getDate(), t.length);
  },
  // AM or PM
  a(e, t) {
    const n = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.toUpperCase();
      case "aaa":
        return n;
      case "aaaaa":
        return n[0];
      case "aaaa":
      default:
        return n === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(e, t) {
    return _(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return _(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return _(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return _(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return _(o, t.length);
  }
}, de = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, yt = {
  // Era
  G: function(e, t, n) {
    const r = e.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return n.era(r, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return n.era(r, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return n.era(r, { width: "wide" });
    }
  },
  // Year
  y: function(e, t, n) {
    if (t === "yo") {
      const r = e.getFullYear(), o = r > 0 ? r : 1 - r;
      return n.ordinalNumber(o, { unit: "year" });
    }
    return ie.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = Et(e, r), a = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const i = a % 100;
      return _(i, 2);
    }
    return t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : _(a, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Ct(e);
    return _(n, t.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(e, t) {
    const n = e.getFullYear();
    return _(n, t.length);
  },
  // Quarter
  Q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "Q":
        return String(r);
      // 01, 02, 03, 04
      case "QQ":
        return _(r, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return n.quarter(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return n.quarter(r, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "q":
        return String(r);
      // 01, 02, 03, 04
      case "qq":
        return _(r, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return n.quarter(r, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return n.quarter(r, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(e, t, n) {
    const r = e.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return ie.M(e, t);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return n.month(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return n.month(r, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return n.month(r, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(e, t, n) {
    const r = e.getMonth();
    switch (t) {
      // 1, 2, ..., 12
      case "L":
        return String(r + 1);
      // 01, 02, ..., 12
      case "LL":
        return _(r + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return n.month(r, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return n.month(r, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return n.month(r, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(e, t, n, r) {
    const o = Ue(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : _(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Ze(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : _(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : ie.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Er(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : _(r, t.length);
  },
  // Day of week
  E: function(e, t, n) {
    const r = e.getDay();
    switch (t) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(e, t, n, r) {
    const o = e.getDay(), a = (o - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(a);
      // Padded numerical value
      case "ee":
        return _(a, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return n.ordinalNumber(a, { unit: "day" });
      case "eee":
        return n.day(o, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return n.day(o, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return n.day(o, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return n.day(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(e, t, n, r) {
    const o = e.getDay(), a = (o - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (same as in `e`)
      case "c":
        return String(a);
      // Padded numerical value
      case "cc":
        return _(a, t.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return n.ordinalNumber(a, { unit: "day" });
      case "ccc":
        return n.day(o, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return n.day(o, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return n.day(o, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return n.day(o, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(e, t, n) {
    const r = e.getDay(), o = r === 0 ? 7 : r;
    switch (t) {
      // 2
      case "i":
        return String(o);
      // 02
      case "ii":
        return _(o, t.length);
      // 2nd
      case "io":
        return n.ordinalNumber(o, { unit: "day" });
      // Tue
      case "iii":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(e, t, n) {
    const o = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(e, t, n) {
    const r = e.getHours();
    let o;
    switch (r === 12 ? o = de.noon : r === 0 ? o = de.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(e, t, n) {
    const r = e.getHours();
    let o;
    switch (r >= 17 ? o = de.evening : r >= 12 ? o = de.afternoon : r >= 4 ? o = de.morning : o = de.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(e, t, n) {
    if (t === "ho") {
      let r = e.getHours() % 12;
      return r === 0 && (r = 12), n.ordinalNumber(r, { unit: "hour" });
    }
    return ie.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : ie.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : _(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : _(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : ie.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : ie.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return ie.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return bt(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return ue(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return ue(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return bt(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return ue(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return ue(r, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + gt(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + ue(r, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + gt(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + ue(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return _(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return _(+e, t.length);
  }
};
function gt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), a = r % 60;
  return a === 0 ? n + String(o) : n + String(o) + t + _(a, 2);
}
function bt(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + _(Math.abs(e) / 60, 2) : ue(e, t);
}
function ue(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = _(Math.trunc(r / 60), 2), a = _(r % 60, 2);
  return n + o + t + a;
}
const pt = (e, t) => {
  switch (e) {
    case "P":
      return t.date({ width: "short" });
    case "PP":
      return t.date({ width: "medium" });
    case "PPP":
      return t.date({ width: "long" });
    case "PPPP":
    default:
      return t.date({ width: "full" });
  }
}, Ft = (e, t) => {
  switch (e) {
    case "p":
      return t.time({ width: "short" });
    case "pp":
      return t.time({ width: "medium" });
    case "ppp":
      return t.time({ width: "long" });
    case "pppp":
    default:
      return t.time({ width: "full" });
  }
}, Br = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return pt(e, t);
  let a;
  switch (r) {
    case "P":
      a = t.dateTime({ width: "short" });
      break;
    case "PP":
      a = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      a = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      a = t.dateTime({ width: "full" });
      break;
  }
  return a.replace("{{date}}", pt(r, t)).replace("{{time}}", Ft(o, t));
}, Ir = {
  p: Ft,
  P: Br
}, Hr = /^D+$/, Ar = /^Y+$/, qr = ["D", "DD", "YY", "YYYY"];
function zr(e) {
  return Hr.test(e);
}
function jr(e) {
  return Ar.test(e);
}
function Gr(e, t, n) {
  const r = Rr(e, t, n);
  if (console.warn(r), qr.includes(e)) throw new RangeError(r);
}
function Rr(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const $r = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Qr = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Xr = /^'([^]*?)'?$/, Vr = /''/g, Zr = /[a-zA-Z]/;
function Me(e, t, n) {
  const r = ve(), o = n?.locale ?? r.locale ?? he, a = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, s = E(e, n?.in);
  if (!Zn(s))
    throw new RangeError("Invalid time value");
  let c = t.match(Qr).map((d) => {
    const l = d[0];
    if (l === "p" || l === "P") {
      const y = Ir[l];
      return y(d, o.formatLong);
    }
    return d;
  }).join("").match($r).map((d) => {
    if (d === "''")
      return { isToken: !1, value: "'" };
    const l = d[0];
    if (l === "'")
      return { isToken: !1, value: Ur(d) };
    if (yt[l])
      return { isToken: !0, value: d };
    if (l.match(Zr))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + l + "`"
      );
    return { isToken: !1, value: d };
  });
  o.localize.preprocessor && (c = o.localize.preprocessor(s, c));
  const u = {
    firstWeekContainsDate: a,
    weekStartsOn: i,
    locale: o
  };
  return c.map((d) => {
    if (!d.isToken) return d.value;
    const l = d.value;
    (!n?.useAdditionalWeekYearTokens && jr(l) || !n?.useAdditionalDayOfYearTokens && zr(l)) && Gr(l, t, String(e));
    const y = yt[l[0]];
    return y(s, l, o.localize, u);
  }).join("");
}
function Ur(e) {
  const t = e.match(Xr);
  return t ? t[1].replace(Vr, "'") : e;
}
function Kr(e, t) {
  const n = E(e, t?.in), r = n.getFullYear(), o = n.getMonth(), a = A(n, 0);
  return a.setFullYear(r, o + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
function Jr(e, t) {
  return E(e, t?.in).getMonth();
}
function Lr(e, t) {
  return E(e, t?.in).getFullYear();
}
function eo(e, t) {
  return +E(e) > +E(t);
}
function to(e, t) {
  return +E(e) < +E(t);
}
function no(e, t, n) {
  const [r, o] = ye(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function ro(e, t, n) {
  const [r, o] = ye(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function oo(e, t, n) {
  const r = E(e, n?.in), o = r.getFullYear(), a = r.getDate(), i = A(e, 0);
  i.setFullYear(o, t, 15), i.setHours(0, 0, 0, 0);
  const s = Kr(i);
  return r.setMonth(t, Math.min(a, s)), r;
}
function so(e, t, n) {
  const r = E(e, n?.in);
  return isNaN(+r) ? A(e, NaN) : (r.setFullYear(t), r);
}
const wt = 5, ao = 4;
function io(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), a = t.addDays(o, wt * 7 - 1);
  return t.getMonth(e) === t.getMonth(a) ? wt : ao;
}
function Bt(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function co(e, t) {
  const n = Bt(e, t), r = io(e, t);
  return t.addDays(n, r * 7 - 1);
}
const It = {
  ...he,
  labels: {
    labelDayButton: (e, t, n, r) => {
      let o;
      r && typeof r.format == "function" ? o = r.format.bind(r) : o = (i, s) => Me(i, s, { locale: he, ...n });
      let a = o(e, "PPPP");
      return t.today && (a = `Today, ${a}`), t.selected && (a = `${a}, selected`), a;
    },
    labelMonthDropdown: "Choose the Month",
    labelNext: "Go to the Next Month",
    labelPrevious: "Go to the Previous Month",
    labelWeekNumber: (e) => `Week ${e}`,
    labelYearDropdown: "Choose the Year",
    labelGrid: (e, t, n) => {
      let r;
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (o, a) => Me(o, a, { locale: he, ...t }), r(e, "LLLL yyyy");
    },
    labelGridcell: (e, t, n, r) => {
      let o;
      r && typeof r.format == "function" ? o = r.format.bind(r) : o = (i, s) => Me(i, s, { locale: he, ...n });
      let a = o(e, "PPPP");
      return t?.today && (a = `Today, ${a}`), a;
    },
    labelNav: "Navigation bar",
    labelWeekNumberHeader: "Week Number",
    labelWeekday: (e, t, n) => {
      let r;
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (o, a) => Me(o, a, { locale: he, ...t }), r(e, "cccc");
    }
  }
};
class $ {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.today = () => {
      if (this.overrides?.today)
        return this.overrides.today();
      if (this.options.timeZone)
        return z.tz(this.options.timeZone);
      const r = this.options.Date ?? Date;
      return new r();
    }, this.newDate = (r, o, a) => this.overrides?.newDate ? this.overrides.newDate(r, o, a) : this.options.timeZone ? new z(r, o, a, this.options.timeZone) : new Date(r, o, a), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : St(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : Nt(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : Rn(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : $n(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : Ve(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : Tt(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : Kn(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : er(r), a = new Set(o.map((s) => this.getYear(s)));
      if (a.size === o.length)
        return o;
      const i = [];
      return a.forEach((s) => {
        i.push(new Date(s, 0, 1));
      }), i;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : co(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : tr(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : Un(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : Pt(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : Ln(r), this.format = (r, o, a) => {
      const i = this.overrides?.format ? this.overrides.format(r, o, this.options) : Me(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(i) : i;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : Ze(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : Jr(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : Lr(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : Ue(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : eo(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : to(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : xt(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : Vn(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : no(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : ro(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : Qn(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : Xn(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : oo(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : so(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Bt(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : ke(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : De(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : Jn(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : me(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : _t(r), this.options = { locale: It, ...t }, this.overrides = n;
  }
  /**
   * Generates a mapping of Arabic digits (0-9) to the target numbering system
   * digits.
   *
   * @since 9.5.0
   * @returns A record mapping Arabic digits to the target numerals.
   */
  getDigitMap() {
    const { numerals: t = "latn" } = this.options, n = new Intl.NumberFormat("en-US", {
      numberingSystem: t
    }), r = {};
    for (let o = 0; o < 10; o++)
      r[o.toString()] = n.format(o);
    return r;
  }
  /**
   * Replaces Arabic digits in a string with the target numbering system digits.
   *
   * @since 9.5.0
   * @param input The string containing Arabic digits.
   * @returns The string with digits replaced.
   */
  replaceDigits(t) {
    const n = this.getDigitMap();
    return t.replace(/\d/g, (r) => n[r] || r);
  }
  /**
   * Formats a number using the configured numbering system.
   *
   * @since 9.5.0
   * @param value The number to format.
   * @returns The formatted number as a string.
   */
  formatNumber(t) {
    return this.replaceDigits(t.toString());
  }
  /**
   * Returns the preferred ordering for month and year labels for the current
   * locale.
   */
  getMonthYearOrder() {
    const t = this.options.locale?.code;
    return t && $.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, a = n?.code;
    if (a && $.yearFirstLocales.has(a))
      try {
        return new Intl.DateTimeFormat(a, {
          month: "long",
          year: "numeric",
          timeZone: r,
          numberingSystem: o
        }).format(t);
      } catch {
      }
    const i = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
    return this.format(t, i);
  }
}
$.yearFirstLocales = /* @__PURE__ */ new Set([
  "eu",
  "hu",
  "ja",
  "ja-Hira",
  "ja-JP",
  "ko",
  "ko-KR",
  "lt",
  "lt-LT",
  "lv",
  "lv-LV",
  "mn",
  "mn-MN",
  "zh",
  "zh-CN",
  "zh-HK",
  "zh-TW"
]);
const ne = new $();
class Ht {
  constructor(t, n, r = ne) {
    this.date = t, this.displayMonth = n, this.outside = !!(n && !r.isSameMonth(t, n)), this.dateLib = r, this.isoDate = r.format(t, "yyyy-MM-dd"), this.displayMonthId = r.format(n, "yyyy-MM"), this.dateMonthId = r.format(t, "yyyy-MM");
  }
  /**
   * Checks if this day is equal to another `CalendarDay`, considering both the
   * date and the displayed month.
   *
   * @param day The `CalendarDay` to compare with.
   * @returns `true` if the days are equal, otherwise `false`.
   */
  isEqualTo(t) {
    return this.dateLib.isSameDay(t.date, this.date) && this.dateLib.isSameMonth(t.displayMonth, this.displayMonth);
  }
}
class uo {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class lo {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function fo(e) {
  return h.createElement("span", { ...e });
}
function ho(e) {
  const { size: t = 24, orientation: n = "left", className: r, style: o } = e;
  return h.createElement(
    "svg",
    { className: r, style: o, width: t, height: t, viewBox: "0 0 24 24" },
    n === "up" && h.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
    n === "down" && h.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
    n === "left" && h.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
    n === "right" && h.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
  );
}
function mo(e) {
  const { day: t, modifiers: n, ...r } = e;
  return h.createElement("td", { ...r });
}
function yo(e) {
  const { day: t, modifiers: n, ...r } = e, o = h.useRef(null);
  return h.useEffect(() => {
    n.focused && o.current?.focus();
  }, [n.focused]), h.createElement("button", { ref: o, ...r });
}
var f;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(f || (f = {}));
var I;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(I || (I = {}));
var J;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(J || (J = {}));
var R;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(R || (R = {}));
const At = Cn(void 0);
function Te() {
  const e = xn(At);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function go(e) {
  const { options: t, className: n, ...r } = e, { classNames: o, components: a, styles: i } = Te(), s = [o[f.Dropdown], n].join(" "), c = t?.find(({ value: u }) => u === r.value);
  return h.createElement(
    "span",
    { "data-disabled": r.disabled, className: o[f.DropdownRoot], style: i?.[f.DropdownRoot] },
    h.createElement(a.Select, { className: s, ...r }, t?.map(({ value: u, label: d, disabled: l }) => h.createElement(a.Option, { key: u, value: u, disabled: l }, d))),
    h.createElement(
      "span",
      { className: o[f.CaptionLabel], style: i?.[f.CaptionLabel], "aria-hidden": !0 },
      c?.label,
      h.createElement(a.Chevron, { orientation: "down", size: 18, className: o[f.Chevron], style: i?.[f.Chevron] })
    )
  );
}
function bo(e) {
  return h.createElement("div", { ...e });
}
function po(e) {
  return h.createElement("div", { ...e });
}
function wo(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return h.createElement("div", { ...r }, e.children);
}
function Mo(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return h.createElement("div", { ...r });
}
function Do(e) {
  return h.createElement("table", { ...e });
}
function ko(e) {
  return h.createElement("div", { ...e });
}
function vo(e) {
  const { components: t } = Te();
  return h.createElement(t.Dropdown, { ...e });
}
function Oo(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...a } = e, { components: i, classNames: s, styles: c, labels: { labelPrevious: u, labelNext: d } } = Te(), l = Q((g) => {
    o && n?.(g);
  }, [o, n]), y = Q((g) => {
    r && t?.(g);
  }, [r, t]);
  return h.createElement(
    "nav",
    { ...a },
    h.createElement(
      i.PreviousMonthButton,
      { type: "button", className: s[f.PreviousMonthButton], style: c?.[f.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": u(r), onClick: y },
      h.createElement(i.Chevron, { disabled: r ? void 0 : !0, className: s[f.Chevron], style: c?.[f.Chevron], orientation: "left" })
    ),
    h.createElement(
      i.NextMonthButton,
      { type: "button", className: s[f.NextMonthButton], style: c?.[f.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": d(o), onClick: l },
      h.createElement(i.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: s[f.Chevron], style: c?.[f.Chevron] })
    )
  );
}
function Wo(e) {
  return h.createElement("button", { ...e });
}
function So(e) {
  return h.createElement("option", { ...e });
}
function No(e) {
  return h.createElement("button", { ...e });
}
function Co(e) {
  const { rootRef: t, ...n } = e;
  return h.createElement("div", { ...n, ref: t });
}
function xo(e) {
  return h.createElement("select", { ...e });
}
function To(e) {
  const { week: t, ...n } = e;
  return h.createElement("tr", { ...n });
}
function Yo(e) {
  return h.createElement("th", { ...e });
}
function _o(e) {
  return h.createElement(
    "thead",
    { "aria-hidden": !0 },
    h.createElement("tr", { ...e })
  );
}
function Po(e) {
  const { week: t, ...n } = e;
  return h.createElement("th", { ...n });
}
function Eo(e) {
  return h.createElement("th", { ...e });
}
function Fo(e) {
  return h.createElement("tbody", { ...e });
}
function Bo(e) {
  const { components: t } = Te();
  return h.createElement(t.Dropdown, { ...e });
}
const Io = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CaptionLabel: fo,
  Chevron: ho,
  Day: mo,
  DayButton: yo,
  Dropdown: go,
  DropdownNav: bo,
  Footer: po,
  Month: wo,
  MonthCaption: Mo,
  MonthGrid: Do,
  Months: ko,
  MonthsDropdown: vo,
  Nav: Oo,
  NextMonthButton: Wo,
  Option: So,
  PreviousMonthButton: No,
  Root: Co,
  Select: xo,
  Week: To,
  WeekNumber: Po,
  WeekNumberHeader: Eo,
  Weekday: Yo,
  Weekdays: _o,
  Weeks: Fo,
  YearsDropdown: Bo
}, Symbol.toStringTag, { value: "Module" }));
function se(e, t, n = !1, r = ne) {
  let { from: o, to: a } = e;
  const { differenceInCalendarDays: i, isSameDay: s } = r;
  return o && a ? (i(a, o) < 0 && ([o, a] = [a, o]), i(t, o) >= (n ? 1 : 0) && i(a, t) >= (n ? 1 : 0)) : !n && a ? s(a, t) : !n && o ? s(o, t) : !1;
}
function Ke(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Ye(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Je(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Le(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function qt(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function zt(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function ae(e, t, n = ne) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: a, isAfter: i } = n;
  return r.some((s) => {
    if (typeof s == "boolean")
      return s;
    if (n.isDate(s))
      return o(e, s);
    if (zt(s, n))
      return s.some((c) => o(e, c));
    if (Ye(s))
      return se(s, e, !1, n);
    if (qt(s))
      return Array.isArray(s.dayOfWeek) ? s.dayOfWeek.includes(e.getDay()) : s.dayOfWeek === e.getDay();
    if (Ke(s)) {
      const c = a(s.before, e), u = a(s.after, e), d = c > 0, l = u < 0;
      return i(s.before, s.after) ? l && d : d || l;
    }
    return Je(s) ? a(e, s.after) > 0 : Le(s) ? a(s.before, e) > 0 : typeof s == "function" ? s(e) : !1;
  });
}
function Ho(e, t, n, r, o) {
  const { disabled: a, hidden: i, modifiers: s, showOutsideDays: c, broadcastCalendar: u, today: d = o.today() } = t, { isSameDay: l, isSameMonth: y, startOfMonth: g, isBefore: v, endOfMonth: N, isAfter: O } = o, P = n && g(n), D = r && N(r), p = {
    [I.focused]: [],
    [I.outside]: [],
    [I.disabled]: [],
    [I.hidden]: [],
    [I.today]: []
  }, M = {};
  for (const b of e) {
    const { date: m, displayMonth: W } = b, Y = !!(W && !y(m, W)), B = !!(P && v(m, P)), F = !!(D && O(m, D)), q = !!(a && ae(m, a, o)), V = !!(i && ae(m, i, o)) || B || F || // Broadcast calendar will show outside days as default
    !u && !c && Y || u && c === !1 && Y, j = l(m, d);
    Y && p.outside.push(b), q && p.disabled.push(b), V && p.hidden.push(b), j && p.today.push(b), s && Object.keys(s).forEach((G) => {
      const le = s?.[G];
      le && ae(m, le, o) && (M[G] ? M[G].push(b) : M[G] = [b]);
    });
  }
  return (b) => {
    const m = {
      [I.focused]: !1,
      [I.disabled]: !1,
      [I.hidden]: !1,
      [I.outside]: !1,
      [I.today]: !1
    }, W = {};
    for (const Y in p) {
      const B = p[Y];
      m[Y] = B.some((F) => F === b);
    }
    for (const Y in M)
      W[Y] = M[Y].some((B) => B === b);
    return {
      ...m,
      // custom modifiers should override all the previous ones
      ...W
    };
  };
}
function Ao(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [a]) => (n[a] ? o.push(n[a]) : t[I[a]] ? o.push(t[I[a]]) : t[J[a]] && o.push(t[J[a]]), o), [t[f.Day]]);
}
function qo(e) {
  return {
    ...Io,
    ...e
  };
}
function zo(e) {
  const t = {
    "data-mode": e.mode ?? void 0,
    "data-required": "required" in e ? e.required : void 0,
    "data-multiple-months": e.numberOfMonths && e.numberOfMonths > 1 || void 0,
    "data-week-numbers": e.showWeekNumber || void 0,
    "data-broadcast-calendar": e.broadcastCalendar || void 0,
    "data-nav-layout": e.navLayout || void 0
  };
  return Object.entries(e).forEach(([n, r]) => {
    n.startsWith("data-") && (t[n] = r);
  }), t;
}
function et() {
  const e = {};
  for (const t in f)
    e[f[t]] = `rdp-${f[t]}`;
  for (const t in I)
    e[I[t]] = `rdp-${I[t]}`;
  for (const t in J)
    e[J[t]] = `rdp-${J[t]}`;
  for (const t in R)
    e[R[t]] = `rdp-${R[t]}`;
  return e;
}
function jo(e, t, n) {
  return (n ?? new $(t)).formatMonthYear(e);
}
function Go(e, t, n) {
  return (n ?? new $(t)).format(e, "d");
}
function Ro(e, t = ne) {
  return t.format(e, "LLLL");
}
function $o(e, t, n) {
  return (n ?? new $(t)).format(e, "cccccc");
}
function Qo(e, t = ne) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function Xo() {
  return "";
}
function Vo(e, t = ne) {
  return t.format(e, "yyyy");
}
const Zo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: jo,
  formatDay: Go,
  formatMonthDropdown: Ro,
  formatWeekNumber: Qo,
  formatWeekNumberHeader: Xo,
  formatWeekdayName: $o,
  formatYearDropdown: Vo
}, Symbol.toStringTag, { value: "Module" }));
function Uo(e) {
  return {
    ...Zo,
    ...e
  };
}
function jt(e, t, n, r) {
  let o = (r ?? new $(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
function Gt(e, t, n) {
  return (n ?? new $(t)).formatMonthYear(e);
}
function Rt(e, t, n, r) {
  let o = (r ?? new $(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function $t(e) {
  return "Choose the Month";
}
function Qt() {
  return "";
}
const Ko = "Go to the Next Month";
function Xt(e, t) {
  return Ko;
}
function Vt(e) {
  return "Go to the Previous Month";
}
function Zt(e, t, n) {
  return (n ?? new $(t)).format(e, "cccc");
}
function Ut(e, t) {
  return `Week ${e}`;
}
function Kt(e) {
  return "Week Number";
}
function Jt(e) {
  return "Choose the Year";
}
const Jo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelDayButton: jt,
  labelGrid: Gt,
  labelGridcell: Rt,
  labelMonthDropdown: $t,
  labelNav: Qt,
  labelNext: Xt,
  labelPrevious: Vt,
  labelWeekNumber: Ut,
  labelWeekNumberHeader: Kt,
  labelWeekday: Zt,
  labelYearDropdown: Jt
}, Symbol.toStringTag, { value: "Module" })), K = (e, t, n) => t || (n ? typeof n == "function" ? n : (...r) => n : e);
function Lo(e, t) {
  const n = t.locale?.labels ?? {};
  return {
    ...Jo,
    ...e ?? {},
    labelDayButton: K(jt, e?.labelDayButton, n.labelDayButton),
    labelMonthDropdown: K($t, e?.labelMonthDropdown, n.labelMonthDropdown),
    labelNext: K(Xt, e?.labelNext, n.labelNext),
    labelPrevious: K(Vt, e?.labelPrevious, n.labelPrevious),
    labelWeekNumber: K(Ut, e?.labelWeekNumber, n.labelWeekNumber),
    labelYearDropdown: K(Jt, e?.labelYearDropdown, n.labelYearDropdown),
    labelGrid: K(Gt, e?.labelGrid, n.labelGrid),
    labelGridcell: K(Rt, e?.labelGridcell, n.labelGridcell),
    labelNav: K(Qt, e?.labelNav, n.labelNav),
    labelWeekNumberHeader: K(Kt, e?.labelWeekNumberHeader, n.labelWeekNumberHeader),
    labelWeekday: K(Zt, e?.labelWeekday, n.labelWeekday)
  };
}
function es(e, t, n, r, o) {
  const { startOfMonth: a, startOfYear: i, endOfYear: s, eachMonthOfInterval: c, getMonth: u } = o;
  return c({
    start: i(e),
    end: s(e)
  }).map((y) => {
    const g = r.formatMonthDropdown(y, o), v = u(y), N = t && y < a(t) || n && y > a(n) || !1;
    return { value: v, label: g, disabled: N };
  });
}
function ts(e, t = {}, n = {}) {
  let r = { ...t?.[f.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function ns(e, t, n, r) {
  const o = r ?? e.today(), a = n ? e.startOfBroadcastWeek(o, e) : t ? e.startOfISOWeek(o) : e.startOfWeek(o), i = [];
  for (let s = 0; s < 7; s++) {
    const c = e.addDays(a, s);
    i.push(c);
  }
  return i;
}
function rs(e, t, n, r, o = !1) {
  if (!e || !t)
    return;
  const { startOfYear: a, endOfYear: i, eachYearOfInterval: s, getYear: c } = r, u = a(e), d = i(t), l = s({ start: u, end: d });
  return o && l.reverse(), l.map((y) => {
    const g = n.formatYearDropdown(y, r);
    return {
      value: c(y),
      label: g,
      disabled: !1
    };
  });
}
function os(e, t = {}) {
  const { weekStartsOn: n, locale: r } = t, o = n ?? r?.options?.weekStartsOn ?? 0, a = (s) => {
    const c = typeof s == "number" || typeof s == "string" ? new Date(s) : s;
    return new z(c.getFullYear(), c.getMonth(), c.getDate(), 12, 0, 0, e);
  }, i = (s) => {
    const c = a(s);
    return new Date(c.getFullYear(), c.getMonth(), c.getDate(), 0, 0, 0, 0);
  };
  return {
    today: () => a(z.tz(e)),
    newDate: (s, c, u) => new z(s, c, u, 12, 0, 0, e),
    startOfDay: (s) => a(s),
    startOfWeek: (s, c) => {
      const u = a(s), d = c?.weekStartsOn ?? o, l = (u.getDay() - d + 7) % 7;
      return u.setDate(u.getDate() - l), u;
    },
    startOfISOWeek: (s) => {
      const c = a(s), u = (c.getDay() - 1 + 7) % 7;
      return c.setDate(c.getDate() - u), c;
    },
    startOfMonth: (s) => {
      const c = a(s);
      return c.setDate(1), c;
    },
    startOfYear: (s) => {
      const c = a(s);
      return c.setMonth(0, 1), c;
    },
    endOfWeek: (s, c) => {
      const u = a(s), y = (((c?.weekStartsOn ?? o) + 6) % 7 - u.getDay() + 7) % 7;
      return u.setDate(u.getDate() + y), u;
    },
    endOfISOWeek: (s) => {
      const c = a(s), u = (7 - c.getDay()) % 7;
      return c.setDate(c.getDate() + u), c;
    },
    endOfMonth: (s) => {
      const c = a(s);
      return c.setMonth(c.getMonth() + 1, 0), c;
    },
    endOfYear: (s) => {
      const c = a(s);
      return c.setMonth(11, 31), c;
    },
    eachMonthOfInterval: (s) => {
      const c = a(s.start), u = a(s.end), d = [], l = new z(c.getFullYear(), c.getMonth(), 1, 12, 0, 0, e), y = u.getFullYear() * 12 + u.getMonth();
      for (; l.getFullYear() * 12 + l.getMonth() <= y; )
        d.push(new z(l, e)), l.setMonth(l.getMonth() + 1, 1);
      return d;
    },
    // Normalize to noon once before arithmetic (avoid DST/midnight edge cases),
    // mutate the same TZDate, and return it.
    addDays: (s, c) => {
      const u = a(s);
      return u.setDate(u.getDate() + c), u;
    },
    addWeeks: (s, c) => {
      const u = a(s);
      return u.setDate(u.getDate() + c * 7), u;
    },
    addMonths: (s, c) => {
      const u = a(s);
      return u.setMonth(u.getMonth() + c), u;
    },
    addYears: (s, c) => {
      const u = a(s);
      return u.setFullYear(u.getFullYear() + c), u;
    },
    eachYearOfInterval: (s) => {
      const c = a(s.start), u = a(s.end), d = [], l = new z(c.getFullYear(), 0, 1, 12, 0, 0, e);
      for (; l.getFullYear() <= u.getFullYear(); )
        d.push(new z(l, e)), l.setFullYear(l.getFullYear() + 1, 0, 1);
      return d;
    },
    getWeek: (s, c) => {
      const u = i(s);
      return Ue(u, {
        weekStartsOn: c?.weekStartsOn ?? o,
        firstWeekContainsDate: c?.firstWeekContainsDate ?? r?.options?.firstWeekContainsDate ?? 1
      });
    },
    getISOWeek: (s) => {
      const c = i(s);
      return Ze(c);
    },
    differenceInCalendarDays: (s, c) => {
      const u = i(s), d = i(c);
      return Ve(u, d);
    },
    differenceInCalendarMonths: (s, c) => {
      const u = i(s), d = i(c);
      return Tt(u, d);
    }
  };
}
const Oe = (e) => e instanceof HTMLElement ? e : null, Ge = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], ss = (e) => Oe(e.querySelector("[data-animated-month]")), Re = (e) => Oe(e.querySelector("[data-animated-caption]")), $e = (e) => Oe(e.querySelector("[data-animated-weeks]")), as = (e) => Oe(e.querySelector("[data-animated-nav]")), is = (e) => Oe(e.querySelector("[data-animated-weekdays]"));
function cs(e, t, { classNames: n, months: r, focused: o, dateLib: a }) {
  const i = Ne(null), s = Ne(r), c = Ne(!1);
  Tn(() => {
    const u = s.current;
    if (s.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || u.length === 0 || r.length !== u.length)
      return;
    const d = a.isSameMonth(r[0].date, u[0].date), l = a.isAfter(r[0].date, u[0].date), y = l ? n[R.caption_after_enter] : n[R.caption_before_enter], g = l ? n[R.weeks_after_enter] : n[R.weeks_before_enter], v = i.current, N = e.current.cloneNode(!0);
    if (N instanceof HTMLElement ? (Ge(N).forEach((p) => {
      if (!(p instanceof HTMLElement))
        return;
      const M = ss(p);
      M && p.contains(M) && p.removeChild(M);
      const b = Re(p);
      b && b.classList.remove(y);
      const m = $e(p);
      m && m.classList.remove(g);
    }), i.current = N) : i.current = null, c.current || d || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const O = v instanceof HTMLElement ? Ge(v) : [], P = Ge(e.current);
    if (P?.every((D) => D instanceof HTMLElement) && O?.every((D) => D instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const D = as(e.current);
      D && (D.style.zIndex = "1"), P.forEach((p, M) => {
        const b = O[M];
        if (!b)
          return;
        p.style.position = "relative", p.style.overflow = "hidden";
        const m = Re(p);
        m && m.classList.add(y);
        const W = $e(p);
        W && W.classList.add(g);
        const Y = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), D && (D.style.zIndex = ""), m && m.classList.remove(y), W && W.classList.remove(g), p.style.position = "", p.style.overflow = "", p.contains(b) && p.removeChild(b);
        };
        b.style.pointerEvents = "none", b.style.position = "absolute", b.style.overflow = "hidden", b.setAttribute("aria-hidden", "true");
        const B = is(b);
        B && (B.style.opacity = "0");
        const F = Re(b);
        F && (F.classList.add(l ? n[R.caption_before_exit] : n[R.caption_after_exit]), F.addEventListener("animationend", Y));
        const q = $e(b);
        q && q.classList.add(l ? n[R.weeks_before_exit] : n[R.weeks_after_exit]), p.insertBefore(b, p.firstChild);
      });
    }
  });
}
function us(e, t, n, r) {
  const o = e[0], a = e[e.length - 1], { ISOWeek: i, fixedWeeks: s, broadcastCalendar: c } = n ?? {}, { addDays: u, differenceInCalendarDays: d, differenceInCalendarMonths: l, endOfBroadcastWeek: y, endOfISOWeek: g, endOfMonth: v, endOfWeek: N, isAfter: O, startOfBroadcastWeek: P, startOfISOWeek: D, startOfWeek: p } = r, M = c ? P(o, r) : i ? D(o) : p(o), b = c ? y(a) : i ? g(v(a)) : N(v(a)), m = t && (c ? y(t) : i ? g(t) : N(t)), W = m && O(b, m) ? m : b, Y = d(W, M), B = l(a, o) + 1, F = [];
  for (let j = 0; j <= Y; j++) {
    const G = u(M, j);
    F.push(G);
  }
  const V = (c ? 35 : 42) * B;
  if (s && F.length < V) {
    const j = V - F.length;
    for (let G = 0; G < j; G++) {
      const le = u(F[F.length - 1], 1);
      F.push(le);
    }
  }
  return F;
}
function ls(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((a, i) => a.concat(i.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function ds(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, a = [];
  for (let i = 0; i < o; i++) {
    const s = r.addMonths(e, i);
    if (t && s > t)
      break;
    a.push(s);
  }
  return a;
}
function Mt(e, t, n, r) {
  const { month: o, defaultMonth: a, today: i = r.today(), numberOfMonths: s = 1 } = e;
  let c = o || a || i;
  const { differenceInCalendarMonths: u, addMonths: d, startOfMonth: l } = r;
  if (n && u(n, c) < s - 1) {
    const y = -1 * (s - 1);
    c = d(n, y);
  }
  return t && u(c, t) < 0 && (c = t), l(c);
}
function fs(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: a, endOfISOWeek: i, endOfMonth: s, endOfWeek: c, getISOWeek: u, getWeek: d, startOfBroadcastWeek: l, startOfISOWeek: y, startOfWeek: g } = r, v = e.reduce((N, O) => {
    const P = n.broadcastCalendar ? l(O, r) : n.ISOWeek ? y(O) : g(O), D = n.broadcastCalendar ? a(O) : n.ISOWeek ? i(s(O)) : c(s(O)), p = t.filter((W) => W >= P && W <= D), M = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && p.length < M) {
      const W = t.filter((Y) => {
        const B = M - p.length;
        return Y > D && Y <= o(D, B);
      });
      p.push(...W);
    }
    const b = p.reduce((W, Y) => {
      const B = n.ISOWeek ? u(Y) : d(Y), F = W.find((V) => V.weekNumber === B), q = new Ht(Y, O, r);
      return F ? F.days.push(q) : W.push(new lo(B, [q])), W;
    }, []), m = new uo(O, b);
    return N.push(m), N;
  }, []);
  return n.reverseMonths ? v.reverse() : v;
}
function hs(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: a, startOfMonth: i, endOfMonth: s, addYears: c, endOfYear: u, today: d } = t, l = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = i(n) : !n && l && (n = o(c(e.today ?? d(), -100))), r ? r = s(r) : !r && l && (r = u(e.today ?? d())), [
    n && a(n),
    r && a(r)
  ];
}
function ms(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a = 1 } = n, { startOfMonth: i, addMonths: s, differenceInCalendarMonths: c } = r, u = o ? a : 1, d = i(e);
  if (!t)
    return s(d, u);
  if (!(c(t, e) < a))
    return s(d, u);
}
function ys(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a } = n, { startOfMonth: i, addMonths: s, differenceInCalendarMonths: c } = r, u = o ? a ?? 1 : 1, d = i(e);
  if (!t)
    return s(d, -u);
  if (!(c(d, t) <= 0))
    return s(d, -u);
}
function gs(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function _e(e, t) {
  const [n, r] = Xe(e);
  return [t === void 0 ? n : t, r];
}
function bs(e, t) {
  const [n, r] = hs(e, t), { startOfMonth: o, endOfMonth: a } = t, i = Mt(e, n, r, t), [s, c] = _e(
    i,
    // initialMonth is always computed from props.month if provided
    e.month ? i : void 0
  );
  Yn(() => {
    const M = Mt(e, n, r, t);
    c(M);
  }, [e.timeZone]);
  const { months: u, weeks: d, days: l, previousMonth: y, nextMonth: g } = Ce(() => {
    const M = ds(s, r, { numberOfMonths: e.numberOfMonths }, t), b = us(M, e.endMonth ? a(e.endMonth) : void 0, {
      ISOWeek: e.ISOWeek,
      fixedWeeks: e.fixedWeeks,
      broadcastCalendar: e.broadcastCalendar
    }, t), m = fs(M, b, {
      broadcastCalendar: e.broadcastCalendar,
      fixedWeeks: e.fixedWeeks,
      ISOWeek: e.ISOWeek,
      reverseMonths: e.reverseMonths
    }, t), W = gs(m), Y = ls(m), B = ys(s, n, e, t), F = ms(s, r, e, t);
    return {
      months: m,
      weeks: W,
      days: Y,
      previousMonth: B,
      nextMonth: F
    };
  }, [
    t,
    s.getTime(),
    r?.getTime(),
    n?.getTime(),
    e.disableNavigation,
    e.broadcastCalendar,
    e.endMonth?.getTime(),
    e.fixedWeeks,
    e.ISOWeek,
    e.numberOfMonths,
    e.pagedNavigation,
    e.reverseMonths
  ]), { disableNavigation: v, onMonthChange: N } = e, O = (M) => d.some((b) => b.days.some((m) => m.isEqualTo(M))), P = (M) => {
    if (v)
      return;
    let b = o(M);
    n && b < o(n) && (b = o(n)), r && b > o(r) && (b = o(r)), c(b), N?.(b);
  };
  return {
    months: u,
    weeks: d,
    days: l,
    navStart: n,
    navEnd: r,
    previousMonth: y,
    nextMonth: g,
    goToMonth: P,
    goToDay: (M) => {
      O(M) || P(M.date);
    }
  };
}
var ee;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(ee || (ee = {}));
function Dt(e) {
  return !e[I.disabled] && !e[I.hidden] && !e[I.outside];
}
function ps(e, t, n, r) {
  let o, a = -1;
  for (const i of e) {
    const s = t(i);
    Dt(s) && (s[I.focused] && a < ee.FocusedModifier ? (o = i, a = ee.FocusedModifier) : r?.isEqualTo(i) && a < ee.LastFocused ? (o = i, a = ee.LastFocused) : n(i.date) && a < ee.Selected ? (o = i, a = ee.Selected) : s[I.today] && a < ee.Today && (o = i, a = ee.Today));
  }
  return o || (o = e.find((i) => Dt(t(i)))), o;
}
function ws(e, t, n, r, o, a, i) {
  const { ISOWeek: s, broadcastCalendar: c } = a, { addDays: u, addMonths: d, addWeeks: l, addYears: y, endOfBroadcastWeek: g, endOfISOWeek: v, endOfWeek: N, max: O, min: P, startOfBroadcastWeek: D, startOfISOWeek: p, startOfWeek: M } = i;
  let m = {
    day: u,
    week: l,
    month: d,
    year: y,
    startOfWeek: (W) => c ? D(W, i) : s ? p(W) : M(W),
    endOfWeek: (W) => c ? g(W) : s ? v(W) : N(W)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? m = O([r, m]) : t === "after" && o && (m = P([o, m])), m;
}
function Lt(e, t, n, r, o, a, i, s = 0) {
  if (s > 365)
    return;
  const c = ws(e, t, n.date, r, o, a, i), u = !!(a.disabled && ae(c, a.disabled, i)), d = !!(a.hidden && ae(c, a.hidden, i)), l = c, y = new Ht(c, l, i);
  return !u && !d ? y : Lt(e, t, y, r, o, a, i, s + 1);
}
function Ms(e, t, n, r, o) {
  const { autoFocus: a } = e, [i, s] = Xe(), c = ps(t.days, n, r || (() => !1), i), [u, d] = Xe(a ? c : void 0);
  return {
    isFocusTarget: (N) => !!c?.isEqualTo(N),
    setFocused: d,
    focused: u,
    blur: () => {
      s(u), d(void 0);
    },
    moveFocus: (N, O) => {
      if (!u)
        return;
      const P = Lt(N, O, u, t.navStart, t.navEnd, e, o);
      P && (e.disableNavigation && !t.days.some((p) => p.isEqualTo(P)) || (t.goToDay(P), d(P)));
    }
  };
}
function Ds(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, i] = _e(n, o ? n : void 0), s = o ? n : a, { isSameDay: c } = t, u = (g) => s?.some((v) => c(v, g)) ?? !1, { min: d, max: l } = e;
  return {
    selected: s,
    select: (g, v, N) => {
      let O = [...s ?? []];
      if (u(g)) {
        if (s?.length === d || r && s?.length === 1)
          return;
        O = s?.filter((P) => !c(P, g));
      } else
        s?.length === l ? O = [g] : O = [...O, g];
      return o || i(O), o?.(O, g, v, N), O;
    },
    isSelected: u
  };
}
function ks(e, t, n = 0, r = 0, o = !1, a = ne) {
  const { from: i, to: s } = t || {}, { isSameDay: c, isAfter: u, isBefore: d } = a;
  let l;
  if (!i && !s)
    l = { from: e, to: n > 0 ? void 0 : e };
  else if (i && !s)
    c(i, e) ? n === 0 ? l = { from: i, to: e } : o ? l = { from: i, to: void 0 } : l = void 0 : d(e, i) ? l = { from: e, to: i } : l = { from: i, to: e };
  else if (i && s)
    if (c(i, e) && c(s, e))
      o ? l = { from: i, to: s } : l = void 0;
    else if (c(i, e))
      l = { from: i, to: n > 0 ? void 0 : e };
    else if (c(s, e))
      l = { from: e, to: n > 0 ? void 0 : e };
    else if (d(e, i))
      l = { from: e, to: s };
    else if (u(e, i))
      l = { from: i, to: e };
    else if (u(e, s))
      l = { from: i, to: e };
    else
      throw new Error("Invalid range");
  if (l?.from && l?.to) {
    const y = a.differenceInCalendarDays(l.to, l.from);
    r > 0 && y > r ? l = { from: e, to: void 0 } : n > 1 && y < n && (l = { from: e, to: void 0 });
  }
  return l;
}
function vs(e, t, n = ne) {
  const r = Array.isArray(t) ? t : [t];
  let o = e.from;
  const a = n.differenceInCalendarDays(e.to, e.from), i = Math.min(a, 6);
  for (let s = 0; s <= i; s++) {
    if (r.includes(o.getDay()))
      return !0;
    o = n.addDays(o, 1);
  }
  return !1;
}
function kt(e, t, n = ne) {
  return se(e, t.from, !1, n) || se(e, t.to, !1, n) || se(t, e.from, !1, n) || se(t, e.to, !1, n);
}
function Os(e, t, n = ne) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((s) => typeof s != "function").some((s) => typeof s == "boolean" ? s : n.isDate(s) ? se(e, s, !1, n) : zt(s, n) ? s.some((c) => se(e, c, !1, n)) : Ye(s) ? s.from && s.to ? kt(e, { from: s.from, to: s.to }, n) : !1 : qt(s) ? vs(e, s.dayOfWeek, n) : Ke(s) ? n.isAfter(s.before, s.after) ? kt(e, {
    from: n.addDays(s.after, 1),
    to: n.addDays(s.before, -1)
  }, n) : ae(e.from, s, n) || ae(e.to, s, n) : Je(s) || Le(s) ? ae(e.from, s, n) || ae(e.to, s, n) : !1))
    return !0;
  const i = r.filter((s) => typeof s == "function");
  if (i.length) {
    let s = e.from;
    const c = n.differenceInCalendarDays(e.to, e.from);
    for (let u = 0; u <= c; u++) {
      if (i.some((d) => d(s)))
        return !0;
      s = n.addDays(s, 1);
    }
  }
  return !1;
}
function Ws(e, t) {
  const { disabled: n, excludeDisabled: r, resetOnSelect: o, selected: a, required: i, onSelect: s } = e, [c, u] = _e(a, s ? a : void 0), d = s ? a : c;
  return {
    selected: d,
    select: (g, v, N) => {
      const { min: O, max: P } = e;
      let D;
      if (g) {
        const p = d?.from, M = d?.to, b = !!p && !!M, m = !!p && !!M && t.isSameDay(p, M) && t.isSameDay(g, p);
        o && (b || !d?.from) ? !i && m ? D = void 0 : D = { from: g, to: void 0 } : D = ks(g, d, O, P, i, t);
      }
      return r && n && D?.from && D.to && Os({ from: D.from, to: D.to }, n, t) && (D.from = g, D.to = void 0), s || u(D), s?.(D, g, v, N), D;
    },
    isSelected: (g) => d && se(d, g, !1, t)
  };
}
function Ss(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, i] = _e(n, o ? n : void 0), s = o ? n : a, { isSameDay: c } = t;
  return {
    selected: s,
    select: (l, y, g) => {
      let v = l;
      return !r && s && s && c(l, s) && (v = void 0), o || i(v), o?.(v, l, y, g), v;
    },
    isSelected: (l) => s ? c(s, l) : !1
  };
}
function Ns(e, t) {
  const n = Ss(e, t), r = Ds(e, t), o = Ws(e, t);
  switch (e.mode) {
    case "single":
      return n;
    case "multiple":
      return r;
    case "range":
      return o;
    default:
      return;
  }
}
function X(e, t) {
  return e instanceof z && e.timeZone === t ? e : new z(e, t);
}
function fe(e, t, n) {
  return X(e, t);
}
function vt(e, t, n) {
  return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? fe(e, t) : Array.isArray(e) ? e.map((r) => r instanceof Date ? fe(r, t) : r) : Ye(e) ? {
    ...e,
    from: e.from ? X(e.from, t) : e.from,
    to: e.to ? X(e.to, t) : e.to
  } : Ke(e) ? {
    before: fe(e.before, t),
    after: fe(e.after, t)
  } : Je(e) ? {
    after: fe(e.after, t)
  } : Le(e) ? {
    before: fe(e.before, t)
  } : e;
}
function Qe(e, t, n) {
  return e && (Array.isArray(e) ? e.map((r) => vt(r, t)) : vt(e, t));
}
function Cs(e) {
  let t = e;
  const n = t.timeZone;
  if (n && (t = {
    ...e,
    timeZone: n
  }, t.today && (t.today = X(t.today, n)), t.month && (t.month = X(t.month, n)), t.defaultMonth && (t.defaultMonth = X(t.defaultMonth, n)), t.startMonth && (t.startMonth = X(t.startMonth, n)), t.endMonth && (t.endMonth = X(t.endMonth, n)), t.mode === "single" && t.selected ? t.selected = X(t.selected, n) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((w) => X(w, n)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? X(t.selected.from, n) : t.selected.from,
    to: t.selected.to ? X(t.selected.to, n) : t.selected.to
  }), t.disabled !== void 0 && (t.disabled = Qe(t.disabled, n)), t.hidden !== void 0 && (t.hidden = Qe(t.hidden, n)), t.modifiers)) {
    const w = {};
    Object.keys(t.modifiers).forEach((S) => {
      w[S] = Qe(t.modifiers?.[S], n);
    }), t.modifiers = w;
  }
  const { components: r, formatters: o, labels: a, dateLib: i, locale: s, classNames: c } = Ce(() => {
    const w = { ...It, ...t.locale }, S = t.broadcastCalendar ? 1 : t.weekStartsOn, k = t.noonSafe && t.timeZone ? os(t.timeZone, {
      weekStartsOn: S,
      locale: w
    }) : void 0, H = t.dateLib && k ? { ...k, ...t.dateLib } : t.dateLib ?? k, x = new $({
      locale: w,
      weekStartsOn: S,
      firstWeekContainsDate: t.firstWeekContainsDate,
      useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
      useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
      timeZone: t.timeZone,
      numerals: t.numerals
    }, H);
    return {
      dateLib: x,
      components: qo(t.components),
      formatters: Uo(t.formatters),
      labels: Lo(t.labels, x.options),
      locale: w,
      classNames: { ...et(), ...t.classNames }
    };
  }, [
    t.locale,
    t.broadcastCalendar,
    t.weekStartsOn,
    t.firstWeekContainsDate,
    t.useAdditionalWeekYearTokens,
    t.useAdditionalDayOfYearTokens,
    t.timeZone,
    t.numerals,
    t.dateLib,
    t.noonSafe,
    t.components,
    t.formatters,
    t.labels,
    t.classNames
  ]);
  t.today || (t = { ...t, today: i.today() });
  const { captionLayout: u, mode: d, navLayout: l, numberOfMonths: y = 1, onDayBlur: g, onDayClick: v, onDayFocus: N, onDayKeyDown: O, onDayMouseEnter: P, onDayMouseLeave: D, onNextClick: p, onPrevClick: M, showWeekNumber: b, styles: m } = t, { formatCaption: W, formatDay: Y, formatMonthDropdown: B, formatWeekNumber: F, formatWeekNumberHeader: q, formatWeekdayName: V, formatYearDropdown: j } = o, G = bs(t, i), { days: le, months: ge, navStart: Pe, navEnd: Ee, previousMonth: Z, nextMonth: U, goToMonth: re } = G, Fe = Ho(le, t, Pe, Ee, i), { isSelected: Be, select: Ie, selected: We } = Ns(t, i) ?? {}, { blur: tt, focused: nt, isFocusTarget: en, moveFocus: rt, setFocused: Se } = Ms(t, G, Fe, Be ?? (() => !1), i), { labelDayButton: tn, labelGridcell: nn, labelGrid: rn, labelMonthDropdown: on, labelNav: ot, labelPrevious: sn, labelNext: an, labelWeekday: cn, labelWeekNumber: un, labelWeekNumberHeader: ln, labelYearDropdown: dn } = a, fn = Ce(() => ns(i, t.ISOWeek, t.broadcastCalendar, t.today), [i, t.ISOWeek, t.broadcastCalendar, t.today]), st = d !== void 0 || v !== void 0, He = Q(() => {
    Z && (re(Z), M?.(Z));
  }, [Z, re, M]), Ae = Q(() => {
    U && (re(U), p?.(U));
  }, [re, U, p]), hn = Q((w, S) => (k) => {
    k.preventDefault(), k.stopPropagation(), Se(w), !S.disabled && (Ie?.(w.date, S, k), v?.(w.date, S, k));
  }, [Ie, v, Se]), mn = Q((w, S) => (k) => {
    Se(w), N?.(w.date, S, k);
  }, [N, Se]), yn = Q((w, S) => (k) => {
    tt(), g?.(w.date, S, k);
  }, [tt, g]), gn = Q((w, S) => (k) => {
    const H = {
      ArrowLeft: [
        k.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        k.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [k.shiftKey ? "year" : "week", "after"],
      ArrowUp: [k.shiftKey ? "year" : "week", "before"],
      PageUp: [k.shiftKey ? "year" : "month", "before"],
      PageDown: [k.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (H[k.key]) {
      k.preventDefault(), k.stopPropagation();
      const [x, L] = H[k.key];
      rt(x, L);
    }
    O?.(w.date, S, k);
  }, [rt, O, t.dir]), bn = Q((w, S) => (k) => {
    P?.(w.date, S, k);
  }, [P]), pn = Q((w, S) => (k) => {
    D?.(w.date, S, k);
  }, [D]), wn = Q((w, S) => (k) => {
    const H = Number(k.target.value), x = i.setMonth(i.startOfMonth(w), H);
    re(i.addMonths(x, -S));
  }, [i, re]), Mn = Q((w, S) => (k) => {
    const H = Number(k.target.value), x = i.setYear(i.startOfMonth(w), H);
    re(i.addMonths(x, -S));
  }, [i, re]), { className: Dn, style: kn } = Ce(() => ({
    className: [c[f.Root], t.className].filter(Boolean).join(" "),
    style: { ...m?.[f.Root], ...t.style }
  }), [c, t.className, t.style, m]), vn = zo(t), at = (w) => {
    const S = m?.[f.Dropdown], k = m?.[w];
    if (!(!S && !k))
      return {
        ...S,
        ...k
      };
  }, it = Ne(null);
  cs(it, !!t.animate, {
    classNames: c,
    months: ge,
    focused: nt,
    dateLib: i
  });
  const On = {
    dayPickerProps: t,
    selected: We,
    select: Ie,
    isSelected: Be,
    months: ge,
    nextMonth: U,
    previousMonth: Z,
    goToMonth: re,
    getModifiers: Fe,
    components: r,
    classNames: c,
    styles: m,
    labels: a,
    formatters: o
  };
  return h.createElement(
    At.Provider,
    { value: On },
    h.createElement(
      r.Root,
      { rootRef: t.animate ? it : void 0, className: Dn, style: kn, dir: t.dir, id: t.id, lang: t.lang ?? s.code, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...vn },
      h.createElement(
        r.Months,
        { className: c[f.Months], style: m?.[f.Months] },
        !t.hideNavigation && !l && h.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: c[f.Nav], style: m?.[f.Nav], "aria-label": ot(), onPreviousClick: He, onNextClick: Ae, previousMonth: Z, nextMonth: U }),
        ge.map((w, S) => {
          const k = t.reverseMonths ? ge.length - 1 - S : S;
          return h.createElement(
            r.Month,
            {
              "data-animated-month": t.animate ? "true" : void 0,
              className: c[f.Month],
              style: m?.[f.Month],
              // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
              key: S,
              displayIndex: S,
              calendarMonth: w
            },
            l === "around" && !t.hideNavigation && S === 0 && h.createElement(
              r.PreviousMonthButton,
              { type: "button", className: c[f.PreviousMonthButton], style: m?.[f.PreviousMonthButton], tabIndex: Z ? void 0 : -1, "aria-disabled": Z ? void 0 : !0, "aria-label": sn(Z), onClick: He, "data-animated-button": t.animate ? "true" : void 0 },
              h.createElement(r.Chevron, { disabled: Z ? void 0 : !0, className: c[f.Chevron], style: m?.[f.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
            ),
            h.createElement(r.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: c[f.MonthCaption], style: m?.[f.MonthCaption], calendarMonth: w, displayIndex: S }, u?.startsWith("dropdown") ? h.createElement(
              r.DropdownNav,
              { className: c[f.Dropdowns], style: m?.[f.Dropdowns] },
              (() => {
                const H = u === "dropdown" || u === "dropdown-months" ? h.createElement(r.MonthsDropdown, { key: "month", className: c[f.MonthsDropdown], "aria-label": on(), disabled: !!t.disableNavigation, onChange: wn(w.date, k), options: es(w.date, Pe, Ee, o, i), style: at(f.MonthsDropdown), value: i.getMonth(w.date) }) : h.createElement("span", { key: "month" }, B(w.date, i)), x = u === "dropdown" || u === "dropdown-years" ? h.createElement(r.YearsDropdown, { key: "year", className: c[f.YearsDropdown], "aria-label": dn(i.options), disabled: !!t.disableNavigation, onChange: Mn(w.date, k), options: rs(Pe, Ee, o, i, !!t.reverseYears), style: at(f.YearsDropdown), value: i.getYear(w.date) }) : h.createElement("span", { key: "year" }, j(w.date, i));
                return i.getMonthYearOrder() === "year-first" ? [x, H] : [H, x];
              })(),
              h.createElement("span", { role: "status", "aria-live": "polite", style: {
                border: 0,
                clip: "rect(0 0 0 0)",
                height: "1px",
                margin: "-1px",
                overflow: "hidden",
                padding: 0,
                position: "absolute",
                width: "1px",
                whiteSpace: "nowrap",
                wordWrap: "normal"
              } }, W(w.date, i.options, i))
            ) : h.createElement(r.CaptionLabel, { className: c[f.CaptionLabel], style: m?.[f.CaptionLabel], role: "status", "aria-live": "polite" }, W(w.date, i.options, i))),
            l === "around" && !t.hideNavigation && S === y - 1 && h.createElement(
              r.NextMonthButton,
              { type: "button", className: c[f.NextMonthButton], style: m?.[f.NextMonthButton], tabIndex: U ? void 0 : -1, "aria-disabled": U ? void 0 : !0, "aria-label": an(U), onClick: Ae, "data-animated-button": t.animate ? "true" : void 0 },
              h.createElement(r.Chevron, { disabled: U ? void 0 : !0, className: c[f.Chevron], style: m?.[f.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
            ),
            S === y - 1 && l === "after" && !t.hideNavigation && h.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: c[f.Nav], style: m?.[f.Nav], "aria-label": ot(), onPreviousClick: He, onNextClick: Ae, previousMonth: Z, nextMonth: U }),
            h.createElement(
              r.MonthGrid,
              { role: "grid", "aria-multiselectable": d === "multiple" || d === "range", "aria-label": rn(w.date, i.options, i) || void 0, className: c[f.MonthGrid], style: m?.[f.MonthGrid] },
              !t.hideWeekdays && h.createElement(
                r.Weekdays,
                { "data-animated-weekdays": t.animate ? "true" : void 0, className: c[f.Weekdays], style: m?.[f.Weekdays] },
                b && h.createElement(r.WeekNumberHeader, { "aria-label": ln(i.options), className: c[f.WeekNumberHeader], style: m?.[f.WeekNumberHeader], scope: "col" }, q()),
                fn.map((H) => h.createElement(r.Weekday, { "aria-label": cn(H, i.options, i), className: c[f.Weekday], key: String(H), style: m?.[f.Weekday], scope: "col" }, V(H, i.options, i)))
              ),
              h.createElement(r.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: c[f.Weeks], style: m?.[f.Weeks] }, w.weeks.map((H) => h.createElement(
                r.Week,
                { className: c[f.Week], key: H.weekNumber, style: m?.[f.Week], week: H },
                b && h.createElement(r.WeekNumber, { week: H, style: m?.[f.WeekNumber], "aria-label": un(H.weekNumber, {
                  locale: s
                }), className: c[f.WeekNumber], scope: "row", role: "rowheader" }, F(H.weekNumber, i)),
                H.days.map((x) => {
                  const { date: L } = x, C = Fe(x);
                  if (C[I.focused] = !C.hidden && !!nt?.isEqualTo(x), C[J.selected] = Be?.(L) || C.selected, Ye(We)) {
                    const { from: qe, to: ze } = We;
                    C[J.range_start] = !!(qe && ze && i.isSameDay(L, qe)), C[J.range_end] = !!(qe && ze && i.isSameDay(L, ze)), C[J.range_middle] = se(We, L, !0, i);
                  }
                  const Wn = ts(C, m, t.modifiersStyles), Sn = Ao(C, c, t.modifiersClassNames), Nn = !st && !C.hidden ? nn(L, C, i.options, i) : void 0;
                  return h.createElement(r.Day, { key: `${x.isoDate}_${x.displayMonthId}`, day: x, modifiers: C, className: Sn.join(" "), style: Wn, role: "gridcell", "aria-selected": C.selected || void 0, "aria-label": Nn, "data-day": x.isoDate, "data-month": x.outside ? x.dateMonthId : void 0, "data-selected": C.selected || void 0, "data-disabled": C.disabled || void 0, "data-hidden": C.hidden || void 0, "data-outside": x.outside || void 0, "data-focused": C.focused || void 0, "data-today": C.today || void 0 }, !C.hidden && st ? h.createElement(r.DayButton, { className: c[f.DayButton], style: m?.[f.DayButton], type: "button", day: x, modifiers: C, disabled: !C.focused && C.disabled || void 0, "aria-disabled": C.focused && C.disabled || void 0, tabIndex: en(x) ? 0 : -1, "aria-label": tn(L, C, i.options, i), onClick: hn(x, C), onBlur: yn(x, C), onFocus: mn(x, C), onKeyDown: gn(x, C), onMouseEnter: bn(x, C), onMouseLeave: pn(x, C) }, Y(L, i.options, i)) : !C.hidden && Y(x.date, i.options, i));
                })
              )))
            )
          );
        })
      ),
      t.footer && h.createElement(r.Footer, { className: c[f.Footer], style: m?.[f.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function Fs({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: a,
  components: i,
  ...s
}) {
  const c = et();
  return /* @__PURE__ */ ce(
    Cs,
    {
      showOutsideDays: n,
      className: T(
        "group/calendar rounded-section bg-background p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        e
      ),
      captionLayout: r,
      formatters: {
        formatMonthDropdown: (u) => u.toLocaleString("default", { month: "short" }),
        ...a
      },
      classNames: {
        root: T("w-fit", c.root),
        months: T(
          "relative flex flex-col gap-4 md:flex-row",
          c.months
        ),
        month: T("flex w-full flex-col gap-4", c.month),
        nav: T(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          c.nav
        ),
        button_previous: T(
          ut({ variant: o }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          c.button_previous
        ),
        button_next: T(
          ut({ variant: o }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          c.button_next
        ),
        month_caption: T(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          c.month_caption
        ),
        dropdowns: T(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          c.dropdowns
        ),
        dropdown_root: T(
          "relative rounded-md border border-input shadow-xs has-focus:border-ring has-focus:ring-[3px] has-focus:ring-ring",
          c.dropdown_root
        ),
        dropdown: T(
          "absolute inset-0 bg-popover opacity-0",
          c.dropdown
        ),
        caption_label: T(
          "font-medium select-none",
          r === "label" ? "text-sm" : "flex h-8 items-center gap-1 rounded-md pr-1 pl-2 text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
          c.caption_label
        ),
        month_grid: T("w-full border-collapse", c.month_grid),
        weekdays: T("flex", c.weekdays),
        weekday: T(
          "flex-1 rounded-md text-[0.8rem] font-normal text-muted-foreground select-none",
          c.weekday
        ),
        week: T("mt-2 flex w-full", c.week),
        week_number_header: T(
          "w-(--cell-size) select-none",
          c.week_number_header
        ),
        week_number: T(
          "text-[0.8rem] text-muted-foreground select-none",
          c.week_number
        ),
        day: T(
          "group/day relative aspect-square h-full w-full p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-md",
          s.showWeekNumber ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md" : "[&:first-child[data-selected=true]_button]:rounded-l-md",
          c.day
        ),
        range_start: T(
          "rounded-l-md bg-accent",
          c.range_start
        ),
        range_middle: T("rounded-none", c.range_middle),
        range_end: T("rounded-r-md bg-accent", c.range_end),
        today: T(
          "rounded-full bg-accent text-accent-foreground",
          c.today
        ),
        outside: T(
          "text-muted-foreground aria-selected:text-muted-foreground",
          c.outside
        ),
        disabled: T(
          "text-muted-foreground opacity-50",
          c.disabled
        ),
        hidden: T("invisible", c.hidden),
        ...t
      },
      components: {
        Root: ({ className: u, rootRef: d, ...l }) => /* @__PURE__ */ ce(
          "div",
          {
            "data-slot": "calendar",
            ref: d,
            className: T(u),
            ...l
          }
        ),
        Chevron: ({ className: u, orientation: d, ...l }) => d === "left" ? /* @__PURE__ */ ce(_n, { className: T("size-4", u), ...l }) : d === "right" ? /* @__PURE__ */ ce(
          Pn,
          {
            className: T("size-4", u),
            ...l
          }
        ) : /* @__PURE__ */ ce(En, { className: T("size-4", u), ...l }),
        DayButton: xs,
        WeekNumber: ({ children: u, ...d }) => /* @__PURE__ */ ce("td", { ...d, children: /* @__PURE__ */ ce("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: u }) }),
        ...i
      },
      ...s
    }
  );
}
function xs({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = et(), a = ct.useRef(null);
  return ct.useEffect(() => {
    n.focused && a.current?.focus();
  }, [n.focused]), /* @__PURE__ */ ce(
    Fn,
    {
      ref: a,
      variant: "ghost",
      size: "icon",
      "data-day": t.date.toLocaleDateString(),
      "data-selected-single": n.selected && !n.range_start && !n.range_end && !n.range_middle,
      "data-range-start": n.range_start,
      "data-range-end": n.range_end,
      "data-range-middle": n.range_middle,
      className: T(
        "flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-accent-foreground [&>span]:text-xs [&>span]:opacity-70",
        o.day,
        e
      ),
      ...r
    }
  );
}
export {
  Fs as Calendar,
  xs as CalendarDayButton
};
