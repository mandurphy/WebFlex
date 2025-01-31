/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.17.1.
 * Original file: /npm/nouislider@15.7.1/dist/nouislider.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var t, e;

function r(t) {
    return "object" == typeof t && "function" == typeof t.to
}

function n(t) {
    t.parentElement.removeChild(t)
}

function i(t) {
    return null != t
}

function o(t) {
    t.preventDefault()
}

function a(t) {
    return "number" == typeof t && !isNaN(t) && isFinite(t)
}

function s(t, e, r) {
    r > 0 && (p(t, e), setTimeout((function () {
        f(t, e)
    }), r))
}

function l(t) {
    return Math.max(Math.min(t, 100), 0)
}

function u(t) {
    return Array.isArray(t) ? t : [t]
}

function c(t) {
    var e = (t = String(t)).split(".");
    return e.length > 1 ? e[1].length : 0
}

function p(t, e) {
    t.classList && !/\s/.test(e) ? t.classList.add(e) : t.className += " " + e
}

function f(t, e) {
    t.classList && !/\s/.test(e) ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ")
}

function h(t) {
    var e = void 0 !== window.pageXOffset, r = "CSS1Compat" === (t.compatMode || "");
    return {
        x: e ? window.pageXOffset : r ? t.documentElement.scrollLeft : t.body.scrollLeft,
        y: e ? window.pageYOffset : r ? t.documentElement.scrollTop : t.body.scrollTop
    }
}

function d(t, e) {
    return 100 / (e - t)
}

function m(t, e, r) {
    return 100 * e / (t[r + 1] - t[r])
}

function g(t, e) {
    for (var r = 1; t >= e[r];) r += 1;
    return r
}

function v(t, e, r) {
    if (r >= t.slice(-1)[0]) return 100;
    var n = g(r, t), i = t[n - 1], o = t[n], a = e[n - 1], s = e[n];
    return a + function (t, e) {
        return m(t, t[0] < 0 ? e + Math.abs(t[0]) : e - t[0], 0)
    }([i, o], r) / d(a, s)
}

function b(t, e, r, n) {
    if (100 === n) return n;
    var i = g(n, t), o = t[i - 1], a = t[i];
    return r ? n - o > (a - o) / 2 ? a : o : e[i - 1] ? t[i - 1] + function (t, e) {
        return Math.round(t / e) * e
    }(n - t[i - 1], e[i - 1]) : n
}

!function (t) {
    t.Range = "range", t.Steps = "steps", t.Positions = "positions", t.Count = "count", t.Values = "values"
}(t || (t = {})), function (t) {
    t[t.None = -1] = "None", t[t.NoValue = 0] = "NoValue", t[t.LargeValue = 1] = "LargeValue", t[t.SmallValue = 2] = "SmallValue"
}(e || (e = {}));
var S = function () {
    function t(t, e, r) {
        var n;
        this.xPct = [], this.xVal = [], this.xSteps = [], this.xNumSteps = [], this.xHighestCompleteStep = [], this.xSteps = [r || !1], this.xNumSteps = [!1], this.snap = e;
        var i = [];
        for (Object.keys(t).forEach((function (e) {
            i.push([u(t[e]), e])
        })), i.sort((function (t, e) {
            return t[0][0] - e[0][0]
        })), n = 0; n < i.length; n++) this.handleEntryPoint(i[n][1], i[n][0]);
        for (this.xNumSteps = this.xSteps.slice(0), n = 0; n < this.xNumSteps.length; n++) this.handleStepPoint(n, this.xNumSteps[n])
    }

    return t.prototype.getDistance = function (t) {
        for (var e = [], r = 0; r < this.xNumSteps.length - 1; r++) e[r] = m(this.xVal, t, r);
        return e
    }, t.prototype.getAbsoluteDistance = function (t, e, r) {
        var n, i = 0;
        if (t < this.xPct[this.xPct.length - 1]) for (; t > this.xPct[i + 1];) i++; else t === this.xPct[this.xPct.length - 1] && (i = this.xPct.length - 2);
        r || t !== this.xPct[i + 1] || i++, null === e && (e = []);
        var o = 1, a = e[i], s = 0, l = 0, u = 0, c = 0;
        for (n = r ? (t - this.xPct[i]) / (this.xPct[i + 1] - this.xPct[i]) : (this.xPct[i + 1] - t) / (this.xPct[i + 1] - this.xPct[i]); a > 0;) s = this.xPct[i + 1 + c] - this.xPct[i + c], e[i + c] * o + 100 - 100 * n > 100 ? (l = s * n, o = (a - 100 * n) / e[i + c], n = 1) : (l = e[i + c] * s / 100 * o, o = 0), r ? (u -= l, this.xPct.length + c >= 1 && c--) : (u += l, this.xPct.length - c >= 1 && c++), a = e[i + c] * o;
        return t + u
    }, t.prototype.toStepping = function (t) {
        return t = v(this.xVal, this.xPct, t)
    }, t.prototype.fromStepping = function (t) {
        return function (t, e, r) {
            if (r >= 100) return t.slice(-1)[0];
            var n = g(r, e), i = t[n - 1], o = t[n], a = e[n - 1];
            return function (t, e) {
                return e * (t[1] - t[0]) / 100 + t[0]
            }([i, o], (r - a) * d(a, e[n]))
        }(this.xVal, this.xPct, t)
    }, t.prototype.getStep = function (t) {
        return t = b(this.xPct, this.xSteps, this.snap, t)
    }, t.prototype.getDefaultStep = function (t, e, r) {
        var n = g(t, this.xPct);
        return (100 === t || e && t === this.xPct[n - 1]) && (n = Math.max(n - 1, 1)), (this.xVal[n] - this.xVal[n - 1]) / r
    }, t.prototype.getNearbySteps = function (t) {
        var e = g(t, this.xPct);
        return {
            stepBefore: {
                startValue: this.xVal[e - 2],
                step: this.xNumSteps[e - 2],
                highestStep: this.xHighestCompleteStep[e - 2]
            },
            thisStep: {
                startValue: this.xVal[e - 1],
                step: this.xNumSteps[e - 1],
                highestStep: this.xHighestCompleteStep[e - 1]
            },
            stepAfter: {startValue: this.xVal[e], step: this.xNumSteps[e], highestStep: this.xHighestCompleteStep[e]}
        }
    }, t.prototype.countStepDecimals = function () {
        var t = this.xNumSteps.map(c);
        return Math.max.apply(null, t)
    }, t.prototype.hasNoSize = function () {
        return this.xVal[0] === this.xVal[this.xVal.length - 1]
    }, t.prototype.convert = function (t) {
        return this.getStep(this.toStepping(t))
    }, t.prototype.handleEntryPoint = function (t, e) {
        var r;
        if (!a(r = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t)) || !a(e[0])) throw new Error("noUiSlider: 'range' value isn't numeric.");
        this.xPct.push(r), this.xVal.push(e[0]);
        var n = Number(e[1]);
        r ? this.xSteps.push(!isNaN(n) && n) : isNaN(n) || (this.xSteps[0] = n), this.xHighestCompleteStep.push(0)
    }, t.prototype.handleStepPoint = function (t, e) {
        if (e) if (this.xVal[t] !== this.xVal[t + 1]) {
            this.xSteps[t] = m([this.xVal[t], this.xVal[t + 1]], e, 0) / d(this.xPct[t], this.xPct[t + 1]);
            var r = (this.xVal[t + 1] - this.xVal[t]) / this.xNumSteps[t], n = Math.ceil(Number(r.toFixed(3)) - 1),
                i = this.xVal[t] + this.xNumSteps[t] * n;
            this.xHighestCompleteStep[t] = i
        } else this.xSteps[t] = this.xHighestCompleteStep[t] = this.xVal[t]
    }, t
}(), x = {
    to: function (t) {
        return void 0 === t ? "" : t.toFixed(2)
    }, from: Number
}, y = {
    target: "target",
    base: "base",
    origin: "origin",
    handle: "handle",
    handleLower: "handle-lower",
    handleUpper: "handle-upper",
    touchArea: "touch-area",
    horizontal: "horizontal",
    vertical: "vertical",
    background: "background",
    connect: "connect",
    connects: "connects",
    ltr: "ltr",
    rtl: "rtl",
    textDirectionLtr: "txt-dir-ltr",
    textDirectionRtl: "txt-dir-rtl",
    draggable: "draggable",
    drag: "state-drag",
    tap: "state-tap",
    active: "active",
    tooltip: "tooltip",
    pips: "pips",
    pipsHorizontal: "pips-horizontal",
    pipsVertical: "pips-vertical",
    marker: "marker",
    markerHorizontal: "marker-horizontal",
    markerVertical: "marker-vertical",
    markerNormal: "marker-normal",
    markerLarge: "marker-large",
    markerSub: "marker-sub",
    value: "value",
    valueHorizontal: "value-horizontal",
    valueVertical: "value-vertical",
    valueNormal: "value-normal",
    valueLarge: "value-large",
    valueSub: "value-sub"
}, w = {tooltips: ".__tooltips", aria: ".__aria"};

function E(t, e) {
    if (!a(e)) throw new Error("noUiSlider: 'step' is not numeric.");
    t.singleStep = e
}

function C(t, e) {
    if (!a(e)) throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
    t.keyboardPageMultiplier = e
}

function N(t, e) {
    if (!a(e)) throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
    t.keyboardMultiplier = e
}

function P(t, e) {
    if (!a(e)) throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
    t.keyboardDefaultStep = e
}

function V(t, e) {
    if ("object" != typeof e || Array.isArray(e)) throw new Error("noUiSlider: 'range' is not an object.");
    if (void 0 === e.min || void 0 === e.max) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
    t.spectrum = new S(e, t.snap || !1, t.singleStep)
}

function A(t, e) {
    if (e = u(e), !Array.isArray(e) || !e.length) throw new Error("noUiSlider: 'start' option is incorrect.");
    t.handles = e.length, t.start = e
}

function k(t, e) {
    if ("boolean" != typeof e) throw new Error("noUiSlider: 'snap' option must be a boolean.");
    t.snap = e
}

function U(t, e) {
    if ("boolean" != typeof e) throw new Error("noUiSlider: 'animate' option must be a boolean.");
    t.animate = e
}

function M(t, e) {
    if ("number" != typeof e) throw new Error("noUiSlider: 'animationDuration' option must be a number.");
    t.animationDuration = e
}

function D(t, e) {
    var r, n = [!1];
    if ("lower" === e ? e = [!0, !1] : "upper" === e && (e = [!1, !0]), !0 === e || !1 === e) {
        for (r = 1; r < t.handles; r++) n.push(e);
        n.push(!1)
    } else {
        if (!Array.isArray(e) || !e.length || e.length !== t.handles + 1) throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
        n = e
    }
    t.connect = n
}

function O(t, e) {
    switch (e) {
        case"horizontal":
            t.ort = 0;
            break;
        case"vertical":
            t.ort = 1;
            break;
        default:
            throw new Error("noUiSlider: 'orientation' option is invalid.")
    }
}

function L(t, e) {
    if (!a(e)) throw new Error("noUiSlider: 'margin' option must be numeric.");
    0 !== e && (t.margin = t.spectrum.getDistance(e))
}

function z(t, e) {
    if (!a(e)) throw new Error("noUiSlider: 'limit' option must be numeric.");
    if (t.limit = t.spectrum.getDistance(e), !t.limit || t.handles < 2) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.")
}

function j(t, e) {
    var r;
    if (!a(e) && !Array.isArray(e)) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
    if (Array.isArray(e) && 2 !== e.length && !a(e[0]) && !a(e[1])) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
    if (0 !== e) {
        for (Array.isArray(e) || (e = [e, e]), t.padding = [t.spectrum.getDistance(e[0]), t.spectrum.getDistance(e[1])], r = 0; r < t.spectrum.xNumSteps.length - 1; r++) if (t.padding[0][r] < 0 || t.padding[1][r] < 0) throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
        var n = e[0] + e[1], i = t.spectrum.xVal[0];
        if (n / (t.spectrum.xVal[t.spectrum.xVal.length - 1] - i) > 1) throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.")
    }
}

function H(t, e) {
    switch (e) {
        case"ltr":
            t.dir = 0;
            break;
        case"rtl":
            t.dir = 1;
            break;
        default:
            throw new Error("noUiSlider: 'direction' option was not recognized.")
    }
}

function F(t, e) {
    if ("string" != typeof e) throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
    var r = e.indexOf("tap") >= 0, n = e.indexOf("drag") >= 0, i = e.indexOf("fixed") >= 0, o = e.indexOf("snap") >= 0,
        a = e.indexOf("hover") >= 0, s = e.indexOf("unconstrained") >= 0, l = e.indexOf("drag-all") >= 0,
        u = e.indexOf("smooth-steps") >= 0;
    if (i) {
        if (2 !== t.handles) throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
        L(t, t.start[1] - t.start[0])
    }
    if (s && (t.margin || t.limit)) throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
    t.events = {tap: r || o, drag: n, dragAll: l, smoothSteps: u, fixed: i, snap: o, hover: a, unconstrained: s}
}

function R(t, e) {
    if (!1 !== e) if (!0 === e || r(e)) {
        t.tooltips = [];
        for (var n = 0; n < t.handles; n++) t.tooltips.push(e)
    } else {
        if ((e = u(e)).length !== t.handles) throw new Error("noUiSlider: must pass a formatter for all handles.");
        e.forEach((function (t) {
            if ("boolean" != typeof t && !r(t)) throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.")
        })), t.tooltips = e
    }
}

function T(t, e) {
    if (e.length !== t.handles) throw new Error("noUiSlider: must pass a attributes for all handles.");
    t.handleAttributes = e
}

function _(t, e) {
    if (!r(e)) throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
    t.ariaFormat = e
}

function B(t, e) {
    if (!function (t) {
        return r(t) && "function" == typeof t.from
    }(e)) throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
    t.format = e
}

function q(t, e) {
    if ("boolean" != typeof e) throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");
    t.keyboardSupport = e
}

function X(t, e) {
    t.documentElement = e
}

function Y(t, e) {
    if ("string" != typeof e && !1 !== e) throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
    t.cssPrefix = e
}

function I(t, e) {
    if ("object" != typeof e) throw new Error("noUiSlider: 'cssClasses' must be an object.");
    "string" == typeof t.cssPrefix ? (t.cssClasses = {}, Object.keys(e).forEach((function (r) {
        t.cssClasses[r] = t.cssPrefix + e[r]
    }))) : t.cssClasses = e
}

function W(t) {
    var e = {margin: null, limit: null, padding: null, animate: !0, animationDuration: 300, ariaFormat: x, format: x},
        r = {
            step: {r: !1, t: E},
            keyboardPageMultiplier: {r: !1, t: C},
            keyboardMultiplier: {r: !1, t: N},
            keyboardDefaultStep: {r: !1, t: P},
            start: {r: !0, t: A},
            connect: {r: !0, t: D},
            direction: {r: !0, t: H},
            snap: {r: !1, t: k},
            animate: {r: !1, t: U},
            animationDuration: {r: !1, t: M},
            range: {r: !0, t: V},
            orientation: {r: !1, t: O},
            margin: {r: !1, t: L},
            limit: {r: !1, t: z},
            padding: {r: !1, t: j},
            behaviour: {r: !0, t: F},
            ariaFormat: {r: !1, t: _},
            format: {r: !1, t: B},
            tooltips: {r: !1, t: R},
            keyboardSupport: {r: !0, t: q},
            documentElement: {r: !1, t: X},
            cssPrefix: {r: !0, t: Y},
            cssClasses: {r: !0, t: I},
            handleAttributes: {r: !1, t: T}
        }, n = {
            connect: !1,
            direction: "ltr",
            behaviour: "tap",
            orientation: "horizontal",
            keyboardSupport: !0,
            cssPrefix: "noUi-",
            cssClasses: y,
            keyboardPageMultiplier: 5,
            keyboardMultiplier: 1,
            keyboardDefaultStep: 10
        };
    t.format && !t.ariaFormat && (t.ariaFormat = t.format), Object.keys(r).forEach((function (o) {
        if (i(t[o]) || void 0 !== n[o]) r[o].t(e, i(t[o]) ? t[o] : n[o]); else if (r[o].r) throw new Error("noUiSlider: '" + o + "' is required.")
    })), e.pips = t.pips;
    var o = document.createElement("div"), a = void 0 !== o.style.msTransform, s = void 0 !== o.style.transform;
    e.transformRule = s ? "transform" : a ? "msTransform" : "webkitTransform";
    return e.style = [["left", "top"], ["right", "bottom"]][e.dir][e.ort], e
}

function $(r, a, c) {
    var d, m, g, v, b, S, x, y = window.navigator.pointerEnabled ? {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup"
        } : window.navigator.msPointerEnabled ? {
            start: "MSPointerDown",
            move: "MSPointerMove",
            end: "MSPointerUp"
        } : {start: "mousedown touchstart", move: "mousemove touchmove", end: "mouseup touchend"},
        E = window.CSS && CSS.supports && CSS.supports("touch-action", "none") && function () {
            var t = !1;
            try {
                var e = Object.defineProperty({}, "passive", {
                    get: function () {
                        t = !0
                    }
                });
                window.addEventListener("test", null, e)
            } catch (t) {
            }
            return t
        }(), C = r, N = a.spectrum, P = [], V = [], A = [], k = 0, U = {}, M = r.ownerDocument,
        D = a.documentElement || M.documentElement, O = M.body, L = "rtl" === M.dir || 1 === a.ort ? 0 : 100;

    function z(t, e) {
        var r = M.createElement("div");
        return e && p(r, e), t.appendChild(r), r
    }

    function j(t, e) {
        var r = z(t, a.cssClasses.origin), n = z(r, a.cssClasses.handle);
        if (z(n, a.cssClasses.touchArea), n.setAttribute("data-handle", String(e)), a.keyboardSupport && (n.setAttribute("tabindex", "0"), n.addEventListener("keydown", (function (t) {
            return function (t, e) {
                if (R() || T(e)) return !1;
                var r = ["Left", "Right"], n = ["Down", "Up"], i = ["PageDown", "PageUp"], o = ["Home", "End"];
                a.dir && !a.ort ? r.reverse() : a.ort && !a.dir && (n.reverse(), i.reverse());
                var s, l = t.key.replace("Arrow", ""), u = l === i[0], c = l === i[1],
                    p = l === n[0] || l === r[0] || u, f = l === n[1] || l === r[1] || c, h = l === o[0],
                    d = l === o[1];
                if (!(p || f || h || d)) return !0;
                if (t.preventDefault(), f || p) {
                    var m = p ? 0 : 1, g = vt(e)[m];
                    if (null === g) return !1;
                    !1 === g && (g = N.getDefaultStep(V[e], p, a.keyboardDefaultStep)), g *= c || u ? a.keyboardPageMultiplier : a.keyboardMultiplier, g = Math.max(g, 1e-7), g *= p ? -1 : 1, s = P[e] + g
                } else s = d ? a.spectrum.xVal[a.spectrum.xVal.length - 1] : a.spectrum.xVal[0];
                return ft(e, N.toStepping(s), !0, !0), at("slide", e), at("update", e), at("change", e), at("set", e), !1
            }(t, e)
        }))), void 0 !== a.handleAttributes) {
            var i = a.handleAttributes[e];
            Object.keys(i).forEach((function (t) {
                n.setAttribute(t, i[t])
            }))
        }
        return n.setAttribute("role", "slider"), n.setAttribute("aria-orientation", a.ort ? "vertical" : "horizontal"), 0 === e ? p(n, a.cssClasses.handleLower) : e === a.handles - 1 && p(n, a.cssClasses.handleUpper), r.handle = n, r
    }

    function H(t, e) {
        return !!e && z(t, a.cssClasses.connect)
    }

    function F(t, e) {
        return !(!a.tooltips || !a.tooltips[e]) && z(t.firstChild, a.cssClasses.tooltip)
    }

    function R() {
        return C.hasAttribute("disabled")
    }

    function T(t) {
        return m[t].hasAttribute("disabled")
    }

    function _() {
        b && (ot("update" + w.tooltips), b.forEach((function (t) {
            t && n(t)
        })), b = null)
    }

    function B() {
        _(), b = m.map(F), it("update" + w.tooltips, (function (t, e, r) {
            if (b && a.tooltips && !1 !== b[e]) {
                var n = t[e];
                !0 !== a.tooltips[e] && (n = a.tooltips[e].to(r[e])), b[e].innerHTML = n
            }
        }))
    }

    function q(t, e) {
        return t.map((function (t) {
            return N.fromStepping(e ? N.getStep(t) : t)
        }))
    }

    function X(r) {
        var n, i = function (e) {
            if (e.mode === t.Range || e.mode === t.Steps) return N.xVal;
            if (e.mode === t.Count) {
                if (e.values < 2) throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");
                for (var r = e.values - 1, n = 100 / r, i = []; r--;) i[r] = r * n;
                return i.push(100), q(i, e.stepped)
            }
            return e.mode === t.Positions ? q(e.values, e.stepped) : e.mode === t.Values ? e.stepped ? e.values.map((function (t) {
                return N.fromStepping(N.getStep(N.toStepping(t)))
            })) : e.values : []
        }(r), o = {}, a = N.xVal[0], s = N.xVal[N.xVal.length - 1], l = !1, u = !1, c = 0;
        return n = i.slice().sort((function (t, e) {
            return t - e
        })), (i = n.filter((function (t) {
            return !this[t] && (this[t] = !0)
        }), {}))[0] !== a && (i.unshift(a), l = !0), i[i.length - 1] !== s && (i.push(s), u = !0), i.forEach((function (n, a) {
            var s, p, f, h, d, m, g, v, b, S, x = n, y = i[a + 1], w = r.mode === t.Steps;
            for (w && (s = N.xNumSteps[a]), s || (s = y - x), void 0 === y && (y = x), s = Math.max(s, 1e-7), p = x; p <= y; p = Number((p + s).toFixed(7))) {
                for (v = (d = (h = N.toStepping(p)) - c) / (r.density || 1), S = d / (b = Math.round(v)), f = 1; f <= b; f += 1) o[(m = c + f * S).toFixed(5)] = [N.fromStepping(m), 0];
                g = i.indexOf(p) > -1 ? e.LargeValue : w ? e.SmallValue : e.NoValue, !a && l && p !== y && (g = 0), p === y && u || (o[h.toFixed(5)] = [p, g]), c = h
            }
        })), o
    }

    function Y(t, r, n) {
        var i, o, s = M.createElement("div"),
            l = ((i = {})[e.None] = "", i[e.NoValue] = a.cssClasses.valueNormal, i[e.LargeValue] = a.cssClasses.valueLarge, i[e.SmallValue] = a.cssClasses.valueSub, i),
            u = ((o = {})[e.None] = "", o[e.NoValue] = a.cssClasses.markerNormal, o[e.LargeValue] = a.cssClasses.markerLarge, o[e.SmallValue] = a.cssClasses.markerSub, o),
            c = [a.cssClasses.valueHorizontal, a.cssClasses.valueVertical],
            f = [a.cssClasses.markerHorizontal, a.cssClasses.markerVertical];

        function h(t, e) {
            var r = e === a.cssClasses.value, n = r ? l : u;
            return e + " " + (r ? c : f)[a.ort] + " " + n[t]
        }

        return p(s, a.cssClasses.pips), p(s, 0 === a.ort ? a.cssClasses.pipsHorizontal : a.cssClasses.pipsVertical), Object.keys(t).forEach((function (i) {
            !function (t, i, o) {
                if ((o = r ? r(i, o) : o) !== e.None) {
                    var l = z(s, !1);
                    l.className = h(o, a.cssClasses.marker), l.style[a.style] = t + "%", o > e.NoValue && ((l = z(s, !1)).className = h(o, a.cssClasses.value), l.setAttribute("data-value", String(i)), l.style[a.style] = t + "%", l.innerHTML = String(n.to(i)))
                }
            }(i, t[i][0], t[i][1])
        })), s
    }

    function I() {
        v && (n(v), v = null)
    }

    function $(t) {
        I();
        var e = X(t), r = t.filter, n = t.format || {
            to: function (t) {
                return String(Math.round(t))
            }
        };
        return v = C.appendChild(Y(e, r, n))
    }

    function G() {
        var t = d.getBoundingClientRect(), e = "offset" + ["Width", "Height"][a.ort];
        return 0 === a.ort ? t.width || d[e] : t.height || d[e]
    }

    function J(t, e, r, n) {
        var i = function (i) {
            var o, s, l = function (t, e, r) {
                var n = 0 === t.type.indexOf("touch"), i = 0 === t.type.indexOf("mouse"),
                    o = 0 === t.type.indexOf("pointer"), a = 0, s = 0;
                0 === t.type.indexOf("MSPointer") && (o = !0);
                if ("mousedown" === t.type && !t.buttons && !t.touches) return !1;
                if (n) {
                    var l = function (e) {
                        var n = e.target;
                        return n === r || r.contains(n) || t.composed && t.composedPath().shift() === r
                    };
                    if ("touchstart" === t.type) {
                        var u = Array.prototype.filter.call(t.touches, l);
                        if (u.length > 1) return !1;
                        a = u[0].pageX, s = u[0].pageY
                    } else {
                        var c = Array.prototype.find.call(t.changedTouches, l);
                        if (!c) return !1;
                        a = c.pageX, s = c.pageY
                    }
                }
                e = e || h(M), (i || o) && (a = t.clientX + e.x, s = t.clientY + e.y);
                return t.pageOffset = e, t.points = [a, s], t.cursor = i || o, t
            }(i, n.pageOffset, n.target || e);
            return !!l && (!(R() && !n.doNotReject) && (o = C, s = a.cssClasses.tap, !((o.classList ? o.classList.contains(s) : new RegExp("\\b" + s + "\\b").test(o.className)) && !n.doNotReject) && (!(t === y.start && void 0 !== l.buttons && l.buttons > 1) && ((!n.hover || !l.buttons) && (E || l.preventDefault(), l.calcPoint = l.points[a.ort], void r(l, n))))))
        }, o = [];
        return t.split(" ").forEach((function (t) {
            e.addEventListener(t, i, !!E && {passive: !0}), o.push([t, i])
        })), o
    }

    function K(t) {
        var e, r, n, i, o, s,
            u = 100 * (t - (e = d, r = a.ort, n = e.getBoundingClientRect(), i = e.ownerDocument, o = i.documentElement, s = h(i), /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (s.x = 0), r ? n.top + s.y - o.clientTop : n.left + s.x - o.clientLeft)) / G();
        return u = l(u), a.dir ? 100 - u : u
    }

    function Q(t, e) {
        "mouseout" === t.type && "HTML" === t.target.nodeName && null === t.relatedTarget && tt(t, e)
    }

    function Z(t, e) {
        if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === t.buttons && 0 !== e.buttonsProperty) return tt(t, e);
        var r = (a.dir ? -1 : 1) * (t.calcPoint - e.startCalcPoint);
        ut(r > 0, 100 * r / e.baseSize, e.locations, e.handleNumbers, e.connect)
    }

    function tt(t, e) {
        e.handle && (f(e.handle, a.cssClasses.active), k -= 1), e.listeners.forEach((function (t) {
            D.removeEventListener(t[0], t[1])
        })), 0 === k && (f(C, a.cssClasses.drag), pt(), t.cursor && (O.style.cursor = "", O.removeEventListener("selectstart", o))), a.events.smoothSteps && (e.handleNumbers.forEach((function (t) {
            ft(t, V[t], !0, !0, !1, !1)
        })), e.handleNumbers.forEach((function (t) {
            at("update", t)
        }))), e.handleNumbers.forEach((function (t) {
            at("change", t), at("set", t), at("end", t)
        }))
    }

    function et(t, e) {
        if (!e.handleNumbers.some(T)) {
            var r;
            if (1 === e.handleNumbers.length) r = m[e.handleNumbers[0]].children[0], k += 1, p(r, a.cssClasses.active);
            t.stopPropagation();
            var n = [], i = J(y.move, D, Z, {
                target: t.target,
                handle: r,
                connect: e.connect,
                listeners: n,
                startCalcPoint: t.calcPoint,
                baseSize: G(),
                pageOffset: t.pageOffset,
                handleNumbers: e.handleNumbers,
                buttonsProperty: t.buttons,
                locations: V.slice()
            }), s = J(y.end, D, tt, {
                target: t.target,
                handle: r,
                listeners: n,
                doNotReject: !0,
                handleNumbers: e.handleNumbers
            }), l = J("mouseout", D, Q, {
                target: t.target,
                handle: r,
                listeners: n,
                doNotReject: !0,
                handleNumbers: e.handleNumbers
            });
            n.push.apply(n, i.concat(s, l)), t.cursor && (O.style.cursor = getComputedStyle(t.target).cursor, m.length > 1 && p(C, a.cssClasses.drag), O.addEventListener("selectstart", o, !1)), e.handleNumbers.forEach((function (t) {
                at("start", t)
            }))
        }
    }

    function rt(t) {
        t.stopPropagation();
        var e = K(t.calcPoint), r = function (t) {
            var e = 100, r = !1;
            return m.forEach((function (n, i) {
                if (!T(i)) {
                    var o = V[i], a = Math.abs(o - t);
                    (a < e || a <= e && t > o || 100 === a && 100 === e) && (r = i, e = a)
                }
            })), r
        }(e);
        !1 !== r && (a.events.snap || s(C, a.cssClasses.tap, a.animationDuration), ft(r, e, !0, !0), pt(), at("slide", r, !0), at("update", r, !0), a.events.snap ? et(t, {handleNumbers: [r]}) : (at("change", r, !0), at("set", r, !0)))
    }

    function nt(t) {
        var e = K(t.calcPoint), r = N.getStep(e), n = N.fromStepping(r);
        Object.keys(U).forEach((function (t) {
            "hover" === t.split(".")[0] && U[t].forEach((function (t) {
                t.call(bt, n)
            }))
        }))
    }

    function it(t, e) {
        U[t] = U[t] || [], U[t].push(e), "update" === t.split(".")[0] && m.forEach((function (t, e) {
            at("update", e)
        }))
    }

    function ot(t) {
        var e = t && t.split(".")[0], r = e ? t.substring(e.length) : t;
        Object.keys(U).forEach((function (t) {
            var n = t.split(".")[0], i = t.substring(n.length);
            e && e !== n || r && r !== i || function (t) {
                return t === w.aria || t === w.tooltips
            }(i) && r !== i || delete U[t]
        }))
    }

    function at(t, e, r) {
        Object.keys(U).forEach((function (n) {
            var i = n.split(".")[0];
            t === i && U[n].forEach((function (t) {
                t.call(bt, P.map(a.format.to), e, P.slice(), r || !1, V.slice(), bt)
            }))
        }))
    }

    function st(t, e, r, n, i, o, s) {
        var u;
        return m.length > 1 && !a.events.unconstrained && (n && e > 0 && (u = N.getAbsoluteDistance(t[e - 1], a.margin, !1), r = Math.max(r, u)), i && e < m.length - 1 && (u = N.getAbsoluteDistance(t[e + 1], a.margin, !0), r = Math.min(r, u))), m.length > 1 && a.limit && (n && e > 0 && (u = N.getAbsoluteDistance(t[e - 1], a.limit, !1), r = Math.min(r, u)), i && e < m.length - 1 && (u = N.getAbsoluteDistance(t[e + 1], a.limit, !0), r = Math.max(r, u))), a.padding && (0 === e && (u = N.getAbsoluteDistance(0, a.padding[0], !1), r = Math.max(r, u)), e === m.length - 1 && (u = N.getAbsoluteDistance(100, a.padding[1], !0), r = Math.min(r, u))), s || (r = N.getStep(r)), !((r = l(r)) === t[e] && !o) && r
    }

    function lt(t, e) {
        var r = a.ort;
        return (r ? e : t) + ", " + (r ? t : e)
    }

    function ut(t, e, r, n, i) {
        var o = r.slice(), s = n[0], l = a.events.smoothSteps, u = [!t, t], c = [t, !t];
        n = n.slice(), t && n.reverse(), n.length > 1 ? n.forEach((function (t, r) {
            var n = st(o, t, o[t] + e, u[r], c[r], !1, l);
            !1 === n ? e = 0 : (e = n - o[t], o[t] = n)
        })) : u = c = [!0];
        var p = !1;
        n.forEach((function (t, n) {
            p = ft(t, r[t] + e, u[n], c[n], !1, l) || p
        })), p && (n.forEach((function (t) {
            at("update", t), at("slide", t)
        })), null != i && at("drag", s))
    }

    function ct(t, e) {
        return a.dir ? 100 - t - e : t
    }

    function pt() {
        A.forEach((function (t) {
            var e = V[t] > 50 ? -1 : 1, r = 3 + (m.length + e * t);
            m[t].style.zIndex = String(r)
        }))
    }

    function ft(t, e, r, n, i, o) {
        return i || (e = st(V, t, e, r, n, !1, o)), !1 !== e && (function (t, e) {
            V[t] = e, P[t] = N.fromStepping(e);
            var r = "translate(" + lt(ct(e, 0) - L + "%", "0") + ")";
            m[t].style[a.transformRule] = r, ht(t), ht(t + 1)
        }(t, e), !0)
    }

    function ht(t) {
        if (g[t]) {
            var e = 0, r = 100;
            0 !== t && (e = V[t - 1]), t !== g.length - 1 && (r = V[t]);
            var n = r - e, i = "translate(" + lt(ct(e, n) + "%", "0") + ")", o = "scale(" + lt(n / 100, "1") + ")";
            g[t].style[a.transformRule] = i + " " + o
        }
    }

    function dt(t, e) {
        return null === t || !1 === t || void 0 === t ? V[e] : ("number" == typeof t && (t = String(t)), !1 !== (t = a.format.from(t)) && (t = N.toStepping(t)), !1 === t || isNaN(t) ? V[e] : t)
    }

    function mt(t, e, r) {
        var n = u(t), i = void 0 === V[0];
        e = void 0 === e || e, a.animate && !i && s(C, a.cssClasses.tap, a.animationDuration), A.forEach((function (t) {
            ft(t, dt(n[t], t), !0, !1, r)
        }));
        var o = 1 === A.length ? 0 : 1;
        if (i && N.hasNoSize() && (r = !0, V[0] = 0, A.length > 1)) {
            var l = 100 / (A.length - 1);
            A.forEach((function (t) {
                V[t] = t * l
            }))
        }
        for (; o < A.length; ++o) A.forEach((function (t) {
            ft(t, V[t], !0, !0, r)
        }));
        pt(), A.forEach((function (t) {
            at("update", t), null !== n[t] && e && at("set", t)
        }))
    }

    function gt(t) {
        if (void 0 === t && (t = !1), t) return 1 === P.length ? P[0] : P.slice(0);
        var e = P.map(a.format.to);
        return 1 === e.length ? e[0] : e
    }

    function vt(t) {
        var e = V[t], r = N.getNearbySteps(e), n = P[t], i = r.thisStep.step, o = null;
        if (a.snap) return [n - r.stepBefore.startValue || null, r.stepAfter.startValue - n || null];
        !1 !== i && n + i > r.stepAfter.startValue && (i = r.stepAfter.startValue - n), o = n > r.thisStep.startValue ? r.thisStep.step : !1 !== r.stepBefore.step && n - r.stepBefore.highestStep, 100 === e ? i = null : 0 === e && (o = null);
        var s = N.countStepDecimals();
        return null !== i && !1 !== i && (i = Number(i.toFixed(s))), null !== o && !1 !== o && (o = Number(o.toFixed(s))), [o, i]
    }

    p(S = C, a.cssClasses.target), 0 === a.dir ? p(S, a.cssClasses.ltr) : p(S, a.cssClasses.rtl), 0 === a.ort ? p(S, a.cssClasses.horizontal) : p(S, a.cssClasses.vertical), p(S, "rtl" === getComputedStyle(S).direction ? a.cssClasses.textDirectionRtl : a.cssClasses.textDirectionLtr), d = z(S, a.cssClasses.base), function (t, e) {
        var r = z(e, a.cssClasses.connects);
        m = [], (g = []).push(H(r, t[0]));
        for (var n = 0; n < a.handles; n++) m.push(j(e, n)), A[n] = n, g.push(H(r, t[n + 1]))
    }(a.connect, d), (x = a.events).fixed || m.forEach((function (t, e) {
        J(y.start, t.children[0], et, {handleNumbers: [e]})
    })), x.tap && J(y.start, d, rt, {}), x.hover && J(y.move, d, nt, {hover: !0}), x.drag && g.forEach((function (t, e) {
        if (!1 !== t && 0 !== e && e !== g.length - 1) {
            var r = m[e - 1], n = m[e], i = [t], o = [r, n], s = [e - 1, e];
            p(t, a.cssClasses.draggable), x.fixed && (i.push(r.children[0]), i.push(n.children[0])), x.dragAll && (o = m, s = A), i.forEach((function (e) {
                J(y.start, e, et, {handles: o, handleNumbers: s, connect: t})
            }))
        }
    })), mt(a.start), a.pips && $(a.pips), a.tooltips && B(), ot("update" + w.aria), it("update" + w.aria, (function (t, e, r, n, i) {
        A.forEach((function (t) {
            var e = m[t], n = st(V, t, 0, !0, !0, !0), o = st(V, t, 100, !0, !0, !0), s = i[t],
                l = String(a.ariaFormat.to(r[t]));
            n = N.fromStepping(n).toFixed(1), o = N.fromStepping(o).toFixed(1), s = N.fromStepping(s).toFixed(1), e.children[0].setAttribute("aria-valuemin", n), e.children[0].setAttribute("aria-valuemax", o), e.children[0].setAttribute("aria-valuenow", s), e.children[0].setAttribute("aria-valuetext", l)
        }))
    }));
    var bt = {
        destroy: function () {
            for (ot(w.aria), ot(w.tooltips), Object.keys(a.cssClasses).forEach((function (t) {
                f(C, a.cssClasses[t])
            })); C.firstChild;) C.removeChild(C.firstChild);
            delete C.noUiSlider
        }, steps: function () {
            return A.map(vt)
        }, on: it, off: ot, get: gt, set: mt, setHandle: function (t, e, r, n) {
            if (!((t = Number(t)) >= 0 && t < A.length)) throw new Error("noUiSlider: invalid handle number, got: " + t);
            ft(t, dt(e, t), !0, !0, n), at("update", t), r && at("set", t)
        }, reset: function (t) {
            mt(a.start, t)
        }, disable: function (t) {
            null != t ? (m[t].setAttribute("disabled", ""), m[t].handle.removeAttribute("tabindex")) : (C.setAttribute("disabled", ""), m.forEach((function (t) {
                t.handle.removeAttribute("tabindex")
            })))
        }, enable: function (t) {
            null != t ? (m[t].removeAttribute("disabled"), m[t].handle.setAttribute("tabindex", "0")) : (C.removeAttribute("disabled"), m.forEach((function (t) {
                t.removeAttribute("disabled"), t.handle.setAttribute("tabindex", "0")
            })))
        }, __moveHandles: function (t, e, r) {
            ut(t, e, V, r)
        }, options: c, updateOptions: function (t, e) {
            var r = gt(),
                n = ["margin", "limit", "padding", "range", "animate", "snap", "step", "format", "pips", "tooltips"];
            n.forEach((function (e) {
                void 0 !== t[e] && (c[e] = t[e])
            }));
            var o = W(c);
            n.forEach((function (e) {
                void 0 !== t[e] && (a[e] = o[e])
            })), N = o.spectrum, a.margin = o.margin, a.limit = o.limit, a.padding = o.padding, a.pips ? $(a.pips) : I(), a.tooltips ? B() : _(), V = [], mt(i(t.start) ? t.start : r, e)
        }, target: C, removePips: I, removeTooltips: _, getPositions: function () {
            return V.slice()
        }, getTooltips: function () {
            return b
        }, getOrigins: function () {
            return m
        }, pips: $
    };
    return bt
}

function G(t, e) {
    if (!t || !t.nodeName) throw new Error("noUiSlider: create requires a single element, got: " + t);
    if (t.noUiSlider) throw new Error("noUiSlider: Slider was already initialized.");
    var r = $(t, W(e), e);
    return t.noUiSlider = r, r
}

var J = {__spectrum: S, cssClasses: y, create: G};
export {t as PipsMode, e as PipsType, G as create, y as cssClasses, J as default};
//# sourceMappingURL=/sm/ff75af0644e83003712fc9249b83e070b5041c13e07991bdda90b60ffb0f66ed.map
