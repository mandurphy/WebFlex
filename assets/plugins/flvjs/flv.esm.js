/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/flv.js@1.6.2/dist/flv.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var e = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {};

function t() {
    throw new Error("setTimeout has not been defined")
}

function i() {
    throw new Error("clearTimeout has not been defined")
}

var r = t, n = i;

function s(e) {
    if (r === setTimeout) return setTimeout(e, 0);
    if ((r === t || !r) && setTimeout) return r = setTimeout, setTimeout(e, 0);
    try {
        return r(e, 0)
    } catch (t) {
        try {
            return r.call(null, e, 0)
        } catch (t) {
            return r.call(this, e, 0)
        }
    }
}

"function" == typeof e.setTimeout && (r = setTimeout), "function" == typeof e.clearTimeout && (n = clearTimeout);
var o, a = [], u = !1, l = -1;

function d() {
    u && o && (u = !1, o.length ? a = o.concat(a) : l = -1, a.length && h())
}

function h() {
    if (!u) {
        var e = s(d);
        u = !0;
        for (var t = a.length; t;) {
            for (o = a, a = []; ++l < t;) o && o[l].run();
            l = -1, t = a.length
        }
        o = null, u = !1, function (e) {
            if (n === clearTimeout) return clearTimeout(e);
            if ((n === i || !n) && clearTimeout) return n = clearTimeout, clearTimeout(e);
            try {
                return n(e)
            } catch (t) {
                try {
                    return n.call(null, e)
                } catch (t) {
                    return n.call(this, e)
                }
            }
        }(e)
    }
}

function c(e, t) {
    this.fun = e, this.array = t
}

c.prototype.run = function () {
    this.fun.apply(null, this.array)
};

function f() {
}

var _ = f, p = f, m = f, g = f, v = f, y = f, E = f;
var b = e.performance || {}, S = b.now || b.mozNow || b.msNow || b.oNow || b.webkitNow || function () {
    return (new Date).getTime()
};
var L = new Date;
var A, R = {
    nextTick: function (e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
        a.push(new c(e, t)), 1 !== a.length || u || s(h)
    },
    title: "browser",
    browser: !0,
    env: {},
    argv: [],
    version: "",
    versions: {},
    on: _,
    addListener: p,
    once: m,
    off: g,
    removeListener: v,
    removeAllListeners: y,
    emit: E,
    binding: function (e) {
        throw new Error("process.binding is not supported")
    },
    cwd: function () {
        return "/"
    },
    chdir: function (e) {
        throw new Error("process.chdir is not supported")
    },
    umask: function () {
        return 0
    },
    hrtime: function (e) {
        var t = .001 * S.call(b), i = Math.floor(t), r = Math.floor(t % 1 * 1e9);
        return e && (i -= e[0], (r -= e[1]) < 0 && (i--, r += 1e9)), [i, r]
    },
    platform: "browser",
    release: {},
    config: {},
    uptime: function () {
        return (new Date - L) / 1e3
    }
}, w = {exports: {}};
self, A = function () {
    return function () {
        var e = {
            "./node_modules/es6-promise/dist/es6-promise.js":
            /*!******************************************************!*\
      !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
      \******************************************************/function (e, t, i) {
                /*!
         * @overview es6-promise - a tiny implementation of Promises/A+.
         * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
         * @license   Licensed under MIT license
         *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
         * @version   v4.2.8+1e68dce6
         */
                e.exports = function () {
                    function e(e) {
                        var t = typeof e;
                        return null !== e && ("object" === t || "function" === t)
                    }

                    function t(e) {
                        return "function" == typeof e
                    }

                    var r = Array.isArray ? Array.isArray : function (e) {
                        return "[object Array]" === Object.prototype.toString.call(e)
                    }, n = 0, s = void 0, o = void 0, a = function (e, t) {
                        E[n] = e, E[n + 1] = t, 2 === (n += 2) && (o ? o(b) : L())
                    };

                    function u(e) {
                        o = e
                    }

                    function l(e) {
                        a = e
                    }

                    var d = "undefined" != typeof window ? window : void 0, h = d || {},
                        c = h.MutationObserver || h.WebKitMutationObserver,
                        f = "undefined" == typeof self && void 0 !== R && "[object process]" === {}.toString.call(R),
                        _ = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;

                    function p() {
                        return function () {
                            return R.nextTick(b)
                        }
                    }

                    function m() {
                        return void 0 !== s ? function () {
                            s(b)
                        } : y()
                    }

                    function g() {
                        var e = 0, t = new c(b), i = document.createTextNode("");
                        return t.observe(i, {characterData: !0}), function () {
                            i.data = e = ++e % 2
                        }
                    }

                    function v() {
                        var e = new MessageChannel;
                        return e.port1.onmessage = b, function () {
                            return e.port2.postMessage(0)
                        }
                    }

                    function y() {
                        var e = setTimeout;
                        return function () {
                            return e(b, 1)
                        }
                    }

                    var E = new Array(1e3);

                    function b() {
                        for (var e = 0; e < n; e += 2) (0, E[e])(E[e + 1]), E[e] = void 0, E[e + 1] = void 0;
                        n = 0
                    }

                    function S() {
                        try {
                            var e = Function("return this")().require("vertx");
                            return s = e.runOnLoop || e.runOnContext, m()
                        } catch (e) {
                            return y()
                        }
                    }

                    var L = void 0;

                    function A(e, t) {
                        var i = this, r = new this.constructor(O);
                        void 0 === r[T] && X(r);
                        var n = i._state;
                        if (n) {
                            var s = arguments[n - 1];
                            a((function () {
                                return K(n, r, s, i._result)
                            }))
                        } else V(i, r, e, t);
                        return r
                    }

                    function w(e) {
                        var t = this;
                        if (e && "object" == typeof e && e.constructor === t) return e;
                        var i = new t(O);
                        return U(i, e), i
                    }

                    L = f ? p() : c ? g() : _ ? v() : void 0 === d ? S() : y();
                    var T = Math.random().toString(36).substring(2);

                    function O() {
                    }

                    var C = void 0, k = 1, I = 2;

                    function D() {
                        return new TypeError("You cannot resolve a promise with itself")
                    }

                    function x() {
                        return new TypeError("A promises callback cannot return that same promise.")
                    }

                    function M(e, t, i, r) {
                        try {
                            e.call(t, i, r)
                        } catch (e) {
                            return e
                        }
                    }

                    function B(e, t, i) {
                        a((function (e) {
                            var r = !1, n = M(i, t, (function (i) {
                                r || (r = !0, t !== i ? U(e, i) : F(e, i))
                            }), (function (t) {
                                r || (r = !0, G(e, t))
                            }), "Settle: " + (e._label || " unknown promise"));
                            !r && n && (r = !0, G(e, n))
                        }), e)
                    }

                    function P(e, t) {
                        t._state === k ? F(e, t._result) : t._state === I ? G(e, t._result) : V(t, void 0, (function (t) {
                            return U(e, t)
                        }), (function (t) {
                            return G(e, t)
                        }))
                    }

                    function j(e, i, r) {
                        i.constructor === e.constructor && r === A && i.constructor.resolve === w ? P(e, i) : void 0 === r ? F(e, i) : t(r) ? B(e, i, r) : F(e, i)
                    }

                    function U(t, i) {
                        if (t === i) G(t, D()); else if (e(i)) {
                            var r = void 0;
                            try {
                                r = i.then
                            } catch (e) {
                                return void G(t, e)
                            }
                            j(t, i, r)
                        } else F(t, i)
                    }

                    function N(e) {
                        e._onerror && e._onerror(e._result), z(e)
                    }

                    function F(e, t) {
                        e._state === C && (e._result = t, e._state = k, 0 !== e._subscribers.length && a(z, e))
                    }

                    function G(e, t) {
                        e._state === C && (e._state = I, e._result = t, a(N, e))
                    }

                    function V(e, t, i, r) {
                        var n = e._subscribers, s = n.length;
                        e._onerror = null, n[s] = t, n[s + k] = i, n[s + I] = r, 0 === s && e._state && a(z, e)
                    }

                    function z(e) {
                        var t = e._subscribers, i = e._state;
                        if (0 !== t.length) {
                            for (var r = void 0, n = void 0, s = e._result, o = 0; o < t.length; o += 3) r = t[o], n = t[o + i], r ? K(i, r, n, s) : n(s);
                            e._subscribers.length = 0
                        }
                    }

                    function K(e, i, r, n) {
                        var s = t(r), o = void 0, a = void 0, u = !0;
                        if (s) {
                            try {
                                o = r(n)
                            } catch (e) {
                                u = !1, a = e
                            }
                            if (i === o) return void G(i, x())
                        } else o = n;
                        i._state !== C || (s && u ? U(i, o) : !1 === u ? G(i, a) : e === k ? F(i, o) : e === I && G(i, o))
                    }

                    function H(e, t) {
                        try {
                            t((function (t) {
                                U(e, t)
                            }), (function (t) {
                                G(e, t)
                            }))
                        } catch (t) {
                            G(e, t)
                        }
                    }

                    var W = 0;

                    function q() {
                        return W++
                    }

                    function X(e) {
                        e[T] = W++, e._state = void 0, e._result = void 0, e._subscribers = []
                    }

                    function Y() {
                        return new Error("Array Methods must be provided an Array")
                    }

                    var Z = function () {
                        function e(e, t) {
                            this._instanceConstructor = e, this.promise = new e(O), this.promise[T] || X(this.promise), r(t) ? (this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? F(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(t), 0 === this._remaining && F(this.promise, this._result))) : G(this.promise, Y())
                        }

                        return e.prototype._enumerate = function (e) {
                            for (var t = 0; this._state === C && t < e.length; t++) this._eachEntry(e[t], t)
                        }, e.prototype._eachEntry = function (e, t) {
                            var i = this._instanceConstructor, r = i.resolve;
                            if (r === w) {
                                var n = void 0, s = void 0, o = !1;
                                try {
                                    n = e.then
                                } catch (e) {
                                    o = !0, s = e
                                }
                                if (n === A && e._state !== C) this._settledAt(e._state, t, e._result); else if ("function" != typeof n) this._remaining--, this._result[t] = e; else if (i === ie) {
                                    var a = new i(O);
                                    o ? G(a, s) : j(a, e, n), this._willSettleAt(a, t)
                                } else this._willSettleAt(new i((function (t) {
                                    return t(e)
                                })), t)
                            } else this._willSettleAt(r(e), t)
                        }, e.prototype._settledAt = function (e, t, i) {
                            var r = this.promise;
                            r._state === C && (this._remaining--, e === I ? G(r, i) : this._result[t] = i), 0 === this._remaining && F(r, this._result)
                        }, e.prototype._willSettleAt = function (e, t) {
                            var i = this;
                            V(e, void 0, (function (e) {
                                return i._settledAt(k, t, e)
                            }), (function (e) {
                                return i._settledAt(I, t, e)
                            }))
                        }, e
                    }();

                    function J(e) {
                        return new Z(this, e).promise
                    }

                    function Q(e) {
                        var t = this;
                        return r(e) ? new t((function (i, r) {
                            for (var n = e.length, s = 0; s < n; s++) t.resolve(e[s]).then(i, r)
                        })) : new t((function (e, t) {
                            return t(new TypeError("You must pass an array to race."))
                        }))
                    }

                    function $(e) {
                        var t = new this(O);
                        return G(t, e), t
                    }

                    function ee() {
                        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                    }

                    function te() {
                        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                    }

                    var ie = function () {
                        function e(t) {
                            this[T] = q(), this._result = this._state = void 0, this._subscribers = [], O !== t && ("function" != typeof t && ee(), this instanceof e ? H(this, t) : te())
                        }

                        return e.prototype.catch = function (e) {
                            return this.then(null, e)
                        }, e.prototype.finally = function (e) {
                            var i = this, r = i.constructor;
                            return t(e) ? i.then((function (t) {
                                return r.resolve(e()).then((function () {
                                    return t
                                }))
                            }), (function (t) {
                                return r.resolve(e()).then((function () {
                                    throw t
                                }))
                            })) : i.then(e, e)
                        }, e
                    }();

                    function re() {
                        var e = void 0;
                        if (void 0 !== i.g) e = i.g; else if ("undefined" != typeof self) e = self; else try {
                            e = Function("return this")()
                        } catch (e) {
                            throw new Error("polyfill failed because global object is unavailable in this environment")
                        }
                        var t = e.Promise;
                        if (t) {
                            var r = null;
                            try {
                                r = Object.prototype.toString.call(t.resolve())
                            } catch (e) {
                            }
                            if ("[object Promise]" === r && !t.cast) return
                        }
                        e.Promise = ie
                    }

                    return ie.prototype.then = A, ie.all = J, ie.race = Q, ie.resolve = w, ie.reject = $, ie._setScheduler = u, ie._setAsap = l, ie._asap = a, ie.polyfill = re, ie.Promise = ie, ie
                }()
            }, "./node_modules/events/events.js":
            /*!***************************************!*\
      !*** ./node_modules/events/events.js ***!
      \***************************************/function (e) {
                var t, i = "object" == typeof Reflect ? Reflect : null,
                    r = i && "function" == typeof i.apply ? i.apply : function (e, t, i) {
                        return Function.prototype.apply.call(e, t, i)
                    };
                t = i && "function" == typeof i.ownKeys ? i.ownKeys : Object.getOwnPropertySymbols ? function (e) {
                    return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))
                } : function (e) {
                    return Object.getOwnPropertyNames(e)
                };
                var n = Number.isNaN || function (e) {
                    return e != e
                };

                function s() {
                    s.init.call(this)
                }

                e.exports = s, e.exports.once = function (e, t) {
                    return new Promise((function (i, r) {
                        function n(i) {
                            e.removeListener(t, s), r(i)
                        }

                        function s() {
                            "function" == typeof e.removeListener && e.removeListener("error", n), i([].slice.call(arguments))
                        }

                        p(e, t, s, {once: !0}), "error" !== t && function (e, t, i) {
                            "function" == typeof e.on && p(e, "error", t, i)
                        }(e, n, {once: !0})
                    }))
                }, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._eventsCount = 0, s.prototype._maxListeners = void 0;
                var o = 10;

                function a(e) {
                    if ("function" != typeof e) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
                }

                function u(e) {
                    return void 0 === e._maxListeners ? s.defaultMaxListeners : e._maxListeners
                }

                function l(e, t, i, r) {
                    var n, s, o, l;
                    if (a(i), void 0 === (s = e._events) ? (s = e._events = Object.create(null), e._eventsCount = 0) : (void 0 !== s.newListener && (e.emit("newListener", t, i.listener ? i.listener : i), s = e._events), o = s[t]), void 0 === o) o = s[t] = i, ++e._eventsCount; else if ("function" == typeof o ? o = s[t] = r ? [i, o] : [o, i] : r ? o.unshift(i) : o.push(i), (n = u(e)) > 0 && o.length > n && !o.warned) {
                        o.warned = !0;
                        var d = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                        d.name = "MaxListenersExceededWarning", d.emitter = e, d.type = t, d.count = o.length, l = d, console && console.warn && console.warn(l)
                    }
                    return e
                }

                function d() {
                    if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
                }

                function h(e, t, i) {
                    var r = {fired: !1, wrapFn: void 0, target: e, type: t, listener: i}, n = d.bind(r);
                    return n.listener = i, r.wrapFn = n, n
                }

                function c(e, t, i) {
                    var r = e._events;
                    if (void 0 === r) return [];
                    var n = r[t];
                    return void 0 === n ? [] : "function" == typeof n ? i ? [n.listener || n] : [n] : i ? function (e) {
                        for (var t = new Array(e.length), i = 0; i < t.length; ++i) t[i] = e[i].listener || e[i];
                        return t
                    }(n) : _(n, n.length)
                }

                function f(e) {
                    var t = this._events;
                    if (void 0 !== t) {
                        var i = t[e];
                        if ("function" == typeof i) return 1;
                        if (void 0 !== i) return i.length
                    }
                    return 0
                }

                function _(e, t) {
                    for (var i = new Array(t), r = 0; r < t; ++r) i[r] = e[r];
                    return i
                }

                function p(e, t, i, r) {
                    if ("function" == typeof e.on) r.once ? e.once(t, i) : e.on(t, i); else {
                        if ("function" != typeof e.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
                        e.addEventListener(t, (function n(s) {
                            r.once && e.removeEventListener(t, n), i(s)
                        }))
                    }
                }

                Object.defineProperty(s, "defaultMaxListeners", {
                    enumerable: !0, get: function () {
                        return o
                    }, set: function (e) {
                        if ("number" != typeof e || e < 0 || n(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
                        o = e
                    }
                }), s.init = function () {
                    void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
                }, s.prototype.setMaxListeners = function (e) {
                    if ("number" != typeof e || e < 0 || n(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
                    return this._maxListeners = e, this
                }, s.prototype.getMaxListeners = function () {
                    return u(this)
                }, s.prototype.emit = function (e) {
                    for (var t = [], i = 1; i < arguments.length; i++) t.push(arguments[i]);
                    var n = "error" === e, s = this._events;
                    if (void 0 !== s) n = n && void 0 === s.error; else if (!n) return !1;
                    if (n) {
                        var o;
                        if (t.length > 0 && (o = t[0]), o instanceof Error) throw o;
                        var a = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
                        throw a.context = o, a
                    }
                    var u = s[e];
                    if (void 0 === u) return !1;
                    if ("function" == typeof u) r(u, this, t); else {
                        var l = u.length, d = _(u, l);
                        for (i = 0; i < l; ++i) r(d[i], this, t)
                    }
                    return !0
                }, s.prototype.addListener = function (e, t) {
                    return l(this, e, t, !1)
                }, s.prototype.on = s.prototype.addListener, s.prototype.prependListener = function (e, t) {
                    return l(this, e, t, !0)
                }, s.prototype.once = function (e, t) {
                    return a(t), this.on(e, h(this, e, t)), this
                }, s.prototype.prependOnceListener = function (e, t) {
                    return a(t), this.prependListener(e, h(this, e, t)), this
                }, s.prototype.removeListener = function (e, t) {
                    var i, r, n, s, o;
                    if (a(t), void 0 === (r = this._events)) return this;
                    if (void 0 === (i = r[e])) return this;
                    if (i === t || i.listener === t) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete r[e], r.removeListener && this.emit("removeListener", e, i.listener || t)); else if ("function" != typeof i) {
                        for (n = -1, s = i.length - 1; s >= 0; s--) if (i[s] === t || i[s].listener === t) {
                            o = i[s].listener, n = s;
                            break
                        }
                        if (n < 0) return this;
                        0 === n ? i.shift() : function (e, t) {
                            for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                            e.pop()
                        }(i, n), 1 === i.length && (r[e] = i[0]), void 0 !== r.removeListener && this.emit("removeListener", e, o || t)
                    }
                    return this
                }, s.prototype.off = s.prototype.removeListener, s.prototype.removeAllListeners = function (e) {
                    var t, i, r;
                    if (void 0 === (i = this._events)) return this;
                    if (void 0 === i.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== i[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete i[e]), this;
                    if (0 === arguments.length) {
                        var n, s = Object.keys(i);
                        for (r = 0; r < s.length; ++r) "removeListener" !== (n = s[r]) && this.removeAllListeners(n);
                        return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
                    }
                    if ("function" == typeof (t = i[e])) this.removeListener(e, t); else if (void 0 !== t) for (r = t.length - 1; r >= 0; r--) this.removeListener(e, t[r]);
                    return this
                }, s.prototype.listeners = function (e) {
                    return c(this, e, !0)
                }, s.prototype.rawListeners = function (e) {
                    return c(this, e, !1)
                }, s.listenerCount = function (e, t) {
                    return "function" == typeof e.listenerCount ? e.listenerCount(t) : f.call(e, t)
                }, s.prototype.listenerCount = f, s.prototype.eventNames = function () {
                    return this._eventsCount > 0 ? t(this._events) : []
                }
            }, "./node_modules/webworkify-webpack/index.js":
            /*!**************************************************!*\
      !*** ./node_modules/webworkify-webpack/index.js ***!
      \**************************************************/function (e, t, i) {
                function r(e) {
                    var t = {};

                    function i(r) {
                        if (t[r]) return t[r].exports;
                        var n = t[r] = {i: r, l: !1, exports: {}};
                        return e[r].call(n.exports, n, n.exports, i), n.l = !0, n.exports
                    }

                    i.m = e, i.c = t, i.i = function (e) {
                        return e
                    }, i.d = function (e, t, r) {
                        i.o(e, t) || Object.defineProperty(e, t, {configurable: !1, enumerable: !0, get: r})
                    }, i.r = function (e) {
                        Object.defineProperty(e, "__esModule", {value: !0})
                    }, i.n = function (e) {
                        var t = e && e.__esModule ? function () {
                            return e.default
                        } : function () {
                            return e
                        };
                        return i.d(t, "a", t), t
                    }, i.o = function (e, t) {
                        return Object.prototype.hasOwnProperty.call(e, t)
                    }, i.p = "/", i.oe = function (e) {
                        throw console.error(e), e
                    };
                    var r = i(i.s = ENTRY_MODULE);
                    return r.default || r
                }

                var n = "[\\.|\\-|\\+|\\w|/|@]+", s = "\\(\\s*(/\\*.*?\\*/)?\\s*.*?(" + n + ").*?\\)";

                function o(e) {
                    return (e + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
                }

                function a(e, t, r) {
                    var a = {};
                    a[r] = [];
                    var u = t.toString(), l = u.match(/^function\s?\w*\(\w+,\s*\w+,\s*(\w+)\)/);
                    if (!l) return a;
                    for (var d, h = l[1], c = new RegExp("(\\\\n|\\W)" + o(h) + s, "g"); d = c.exec(u);) "dll-reference" !== d[3] && a[r].push(d[3]);
                    for (c = new RegExp("\\(" + o(h) + '\\("(dll-reference\\s(' + n + '))"\\)\\)' + s, "g"); d = c.exec(u);) e[d[2]] || (a[r].push(d[1]), e[d[2]] = i(d[1]).m), a[d[2]] = a[d[2]] || [], a[d[2]].push(d[4]);
                    for (var f, _ = Object.keys(a), p = 0; p < _.length; p++) for (var m = 0; m < a[_[p]].length; m++) f = a[_[p]][m], isNaN(1 * f) || (a[_[p]][m] = 1 * a[_[p]][m]);
                    return a
                }

                function u(e) {
                    return Object.keys(e).reduce((function (t, i) {
                        return t || e[i].length > 0
                    }), !1)
                }

                e.exports = function (e, t) {
                    t = t || {};
                    var n = {main: i.m}, s = t.all ? {main: Object.keys(n.main)} : function (e, t) {
                        for (var i = {main: [t]}, r = {main: []}, n = {main: {}}; u(i);) for (var s = Object.keys(i), o = 0; o < s.length; o++) {
                            var l = s[o], d = i[l].pop();
                            if (n[l] = n[l] || {}, !n[l][d] && e[l][d]) {
                                n[l][d] = !0, r[l] = r[l] || [], r[l].push(d);
                                for (var h = a(e, e[l][d], l), c = Object.keys(h), f = 0; f < c.length; f++) i[c[f]] = i[c[f]] || [], i[c[f]] = i[c[f]].concat(h[c[f]])
                            }
                        }
                        return r
                    }(n, e), o = "";
                    Object.keys(s).filter((function (e) {
                        return "main" !== e
                    })).forEach((function (e) {
                        for (var t = 0; s[e][t];) t++;
                        s[e].push(t), n[e][t] = "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })", o = o + "var " + e + " = (" + r.toString().replace("ENTRY_MODULE", JSON.stringify(t)) + ")({" + s[e].map((function (t) {
                            return JSON.stringify(t) + ": " + n[e][t].toString()
                        })).join(",") + "});\n"
                    })), o = o + "new ((" + r.toString().replace("ENTRY_MODULE", JSON.stringify(e)) + ")({" + s.main.map((function (e) {
                        return JSON.stringify(e) + ": " + n.main[e].toString()
                    })).join(",") + "}))(self);";
                    var l = new window.Blob([o], {type: "text/javascript"});
                    if (t.bare) return l;
                    var d = (window.URL || window.webkitURL || window.mozURL || window.msURL).createObjectURL(l),
                        h = new window.Worker(d);
                    return h.objectURL = d, h
                }
            }, "./src/config.js":
            /*!***********************!*\
      !*** ./src/config.js ***!
      \***********************/function (e, t, i) {
                i.r(t), i.d(t, {
                    defaultConfig: function () {
                        return r
                    }, createDefaultConfig: function () {
                        return n
                    }
                });
                var r = {
                    enableWorker: !1,
                    enableStashBuffer: !0,
                    stashInitialSize: void 0,
                    isLive: !1,
                    lazyLoad: !0,
                    lazyLoadMaxDuration: 180,
                    lazyLoadRecoverDuration: 30,
                    deferLoadAfterSourceOpen: !0,
                    autoCleanupMaxBackwardDuration: 180,
                    autoCleanupMinBackwardDuration: 120,
                    statisticsInfoReportInterval: 600,
                    fixAudioTimestampGap: !0,
                    accurateSeek: !1,
                    seekType: "range",
                    seekParamStart: "bstart",
                    seekParamEnd: "bend",
                    rangeLoadZeroStart: !1,
                    customSeekHandler: void 0,
                    reuseRedirectedURL: !1,
                    headers: void 0,
                    customLoader: void 0
                };

                function n() {
                    return Object.assign({}, r)
                }
            }, "./src/core/features.js":
            /*!******************************!*\
      !*** ./src/core/features.js ***!
      \******************************/function (e, t, i) {
                i.r(t);
                var r = i(/*! ../io/io-controller.js */"./src/io/io-controller.js"),
                    n = i(/*! ../config.js */"./src/config.js"), s = function () {
                        function e() {
                        }

                        return e.supportMSEH264Playback = function () {
                            return window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
                        }, e.supportNetworkStreamIO = function () {
                            var e = new r.default({}, (0, n.createDefaultConfig)()), t = e.loaderType;
                            return e.destroy(), "fetch-stream-loader" == t || "xhr-moz-chunked-loader" == t
                        }, e.getNetworkLoaderTypeName = function () {
                            var e = new r.default({}, (0, n.createDefaultConfig)()), t = e.loaderType;
                            return e.destroy(), t
                        }, e.supportNativeMediaPlayback = function (t) {
                            null == e.videoElement && (e.videoElement = window.document.createElement("video"));
                            var i = e.videoElement.canPlayType(t);
                            return "probably" === i || "maybe" == i
                        }, e.getFeatureList = function () {
                            var t = {
                                mseFlvPlayback: !1,
                                mseLiveFlvPlayback: !1,
                                networkStreamIO: !1,
                                networkLoaderName: "",
                                nativeMP4H264Playback: !1,
                                nativeWebmVP8Playback: !1,
                                nativeWebmVP9Playback: !1
                            };
                            return t.mseFlvPlayback = e.supportMSEH264Playback(), t.networkStreamIO = e.supportNetworkStreamIO(), t.networkLoaderName = e.getNetworkLoaderTypeName(), t.mseLiveFlvPlayback = t.mseFlvPlayback && t.networkStreamIO, t.nativeMP4H264Playback = e.supportNativeMediaPlayback('video/mp4; codecs="avc1.42001E, mp4a.40.2"'), t.nativeWebmVP8Playback = e.supportNativeMediaPlayback('video/webm; codecs="vp8.0, vorbis"'), t.nativeWebmVP9Playback = e.supportNativeMediaPlayback('video/webm; codecs="vp9"'), t
                        }, e
                    }();
                t.default = s
            }, "./src/core/media-info.js":
            /*!********************************!*\
      !*** ./src/core/media-info.js ***!
      \********************************/function (e, t, i) {
                i.r(t);
                var r = function () {
                    function e() {
                        this.mimeType = null, this.duration = null, this.hasAudio = null, this.hasVideo = null, this.audioCodec = null, this.videoCodec = null, this.audioDataRate = null, this.videoDataRate = null, this.audioSampleRate = null, this.audioChannelCount = null, this.width = null, this.height = null, this.fps = null, this.profile = null, this.level = null, this.refFrames = null, this.chromaFormat = null, this.sarNum = null, this.sarDen = null, this.metadata = null, this.segments = null, this.segmentCount = null, this.hasKeyframesIndex = null, this.keyframesIndex = null
                    }

                    return e.prototype.isComplete = function () {
                        var e = !1 === this.hasAudio || !0 === this.hasAudio && null != this.audioCodec && null != this.audioSampleRate && null != this.audioChannelCount,
                            t = !1 === this.hasVideo || !0 === this.hasVideo && null != this.videoCodec && null != this.width && null != this.height && null != this.fps && null != this.profile && null != this.level && null != this.refFrames && null != this.chromaFormat && null != this.sarNum && null != this.sarDen;
                        return null != this.mimeType && null != this.duration && null != this.metadata && null != this.hasKeyframesIndex && e && t
                    }, e.prototype.isSeekable = function () {
                        return !0 === this.hasKeyframesIndex
                    }, e.prototype.getNearestKeyframe = function (e) {
                        if (null == this.keyframesIndex) return null;
                        var t = this.keyframesIndex, i = this._search(t.times, e);
                        return {index: i, milliseconds: t.times[i], fileposition: t.filepositions[i]}
                    }, e.prototype._search = function (e, t) {
                        var i = 0, r = e.length - 1, n = 0, s = 0, o = r;
                        for (t < e[0] && (i = 0, s = o + 1); s <= o;) {
                            if ((n = s + Math.floor((o - s) / 2)) === r || t >= e[n] && t < e[n + 1]) {
                                i = n;
                                break
                            }
                            e[n] < t ? s = n + 1 : o = n - 1
                        }
                        return i
                    }, e
                }();
                t.default = r
            }, "./src/core/media-segment-info.js":
            /*!****************************************!*\
      !*** ./src/core/media-segment-info.js ***!
      \****************************************/function (e, t, i) {
                i.r(t), i.d(t, {
                    SampleInfo: function () {
                        return r
                    }, MediaSegmentInfo: function () {
                        return n
                    }, IDRSampleList: function () {
                        return s
                    }, MediaSegmentInfoList: function () {
                        return o
                    }
                });
                var r = function (e, t, i, r, n) {
                    this.dts = e, this.pts = t, this.duration = i, this.originalDts = r, this.isSyncPoint = n, this.fileposition = null
                }, n = function () {
                    function e() {
                        this.beginDts = 0, this.endDts = 0, this.beginPts = 0, this.endPts = 0, this.originalBeginDts = 0, this.originalEndDts = 0, this.syncPoints = [], this.firstSample = null, this.lastSample = null
                    }

                    return e.prototype.appendSyncPoint = function (e) {
                        e.isSyncPoint = !0, this.syncPoints.push(e)
                    }, e
                }(), s = function () {
                    function e() {
                        this._list = []
                    }

                    return e.prototype.clear = function () {
                        this._list = []
                    }, e.prototype.appendArray = function (e) {
                        var t = this._list;
                        0 !== e.length && (t.length > 0 && e[0].originalDts < t[t.length - 1].originalDts && this.clear(), Array.prototype.push.apply(t, e))
                    }, e.prototype.getLastSyncPointBeforeDts = function (e) {
                        if (0 == this._list.length) return null;
                        var t = this._list, i = 0, r = t.length - 1, n = 0, s = 0, o = r;
                        for (e < t[0].dts && (i = 0, s = o + 1); s <= o;) {
                            if ((n = s + Math.floor((o - s) / 2)) === r || e >= t[n].dts && e < t[n + 1].dts) {
                                i = n;
                                break
                            }
                            t[n].dts < e ? s = n + 1 : o = n - 1
                        }
                        return this._list[i]
                    }, e
                }(), o = function () {
                    function e(e) {
                        this._type = e, this._list = [], this._lastAppendLocation = -1
                    }

                    return Object.defineProperty(e.prototype, "type", {
                        get: function () {
                            return this._type
                        }, enumerable: !1, configurable: !0
                    }), Object.defineProperty(e.prototype, "length", {
                        get: function () {
                            return this._list.length
                        }, enumerable: !1, configurable: !0
                    }), e.prototype.isEmpty = function () {
                        return 0 === this._list.length
                    }, e.prototype.clear = function () {
                        this._list = [], this._lastAppendLocation = -1
                    }, e.prototype._searchNearestSegmentBefore = function (e) {
                        var t = this._list;
                        if (0 === t.length) return -2;
                        var i = t.length - 1, r = 0, n = 0, s = i, o = 0;
                        if (e < t[0].originalBeginDts) return o = -1;
                        for (; n <= s;) {
                            if ((r = n + Math.floor((s - n) / 2)) === i || e > t[r].lastSample.originalDts && e < t[r + 1].originalBeginDts) {
                                o = r;
                                break
                            }
                            t[r].originalBeginDts < e ? n = r + 1 : s = r - 1
                        }
                        return o
                    }, e.prototype._searchNearestSegmentAfter = function (e) {
                        return this._searchNearestSegmentBefore(e) + 1
                    }, e.prototype.append = function (e) {
                        var t = this._list, i = e, r = this._lastAppendLocation, n = 0;
                        -1 !== r && r < t.length && i.originalBeginDts >= t[r].lastSample.originalDts && (r === t.length - 1 || r < t.length - 1 && i.originalBeginDts < t[r + 1].originalBeginDts) ? n = r + 1 : t.length > 0 && (n = this._searchNearestSegmentBefore(i.originalBeginDts) + 1), this._lastAppendLocation = n, this._list.splice(n, 0, i)
                    }, e.prototype.getLastSegmentBefore = function (e) {
                        var t = this._searchNearestSegmentBefore(e);
                        return t >= 0 ? this._list[t] : null
                    }, e.prototype.getLastSampleBefore = function (e) {
                        var t = this.getLastSegmentBefore(e);
                        return null != t ? t.lastSample : null
                    }, e.prototype.getLastSyncPointBefore = function (e) {
                        for (var t = this._searchNearestSegmentBefore(e), i = this._list[t].syncPoints; 0 === i.length && t > 0;) t--, i = this._list[t].syncPoints;
                        return i.length > 0 ? i[i.length - 1] : null
                    }, e
                }()
            }, "./src/core/mse-controller.js":
            /*!************************************!*\
      !*** ./src/core/mse-controller.js ***!
      \************************************/function (e, t, i) {
                i.r(t);
                var r = i(/*! events */"./node_modules/events/events.js"), n = i.n(r),
                    s = i(/*! ../utils/logger.js */"./src/utils/logger.js"),
                    o = i(/*! ../utils/browser.js */"./src/utils/browser.js"),
                    a = i(/*! ./mse-events.js */"./src/core/mse-events.js"),
                    u = i(/*! ./media-segment-info.js */"./src/core/media-segment-info.js"),
                    l = i(/*! ../utils/exception.js */"./src/utils/exception.js"), d = function () {
                        function e(e) {
                            this.TAG = "MSEController", this._config = e, this._emitter = new (n()), this._config.isLive && null == this._config.autoCleanupSourceBuffer && (this._config.autoCleanupSourceBuffer = !0), this.e = {
                                onSourceOpen: this._onSourceOpen.bind(this),
                                onSourceEnded: this._onSourceEnded.bind(this),
                                onSourceClose: this._onSourceClose.bind(this),
                                onSourceBufferError: this._onSourceBufferError.bind(this),
                                onSourceBufferUpdateEnd: this._onSourceBufferUpdateEnd.bind(this)
                            }, this._mediaSource = null, this._mediaSourceObjectURL = null, this._mediaElement = null, this._isBufferFull = !1, this._hasPendingEos = !1, this._requireSetMediaDuration = !1, this._pendingMediaDuration = 0, this._pendingSourceBufferInit = [], this._mimeTypes = {
                                video: null,
                                audio: null
                            }, this._sourceBuffers = {video: null, audio: null}, this._lastInitSegments = {
                                video: null,
                                audio: null
                            }, this._pendingSegments = {video: [], audio: []}, this._pendingRemoveRanges = {
                                video: [],
                                audio: []
                            }, this._idrList = new u.IDRSampleList
                        }

                        return e.prototype.destroy = function () {
                            (this._mediaElement || this._mediaSource) && this.detachMediaElement(), this.e = null, this._emitter.removeAllListeners(), this._emitter = null
                        }, e.prototype.on = function (e, t) {
                            this._emitter.addListener(e, t)
                        }, e.prototype.off = function (e, t) {
                            this._emitter.removeListener(e, t)
                        }, e.prototype.attachMediaElement = function (e) {
                            if (this._mediaSource) throw new l.IllegalStateException("MediaSource has been attached to an HTMLMediaElement!");
                            var t = this._mediaSource = new window.MediaSource;
                            t.addEventListener("sourceopen", this.e.onSourceOpen), t.addEventListener("sourceended", this.e.onSourceEnded), t.addEventListener("sourceclose", this.e.onSourceClose), this._mediaElement = e, this._mediaSourceObjectURL = window.URL.createObjectURL(this._mediaSource), e.src = this._mediaSourceObjectURL
                        }, e.prototype.detachMediaElement = function () {
                            if (this._mediaSource) {
                                var e = this._mediaSource;
                                for (var t in this._sourceBuffers) {
                                    var i = this._pendingSegments[t];
                                    i.splice(0, i.length), this._pendingSegments[t] = null, this._pendingRemoveRanges[t] = null, this._lastInitSegments[t] = null;
                                    var r = this._sourceBuffers[t];
                                    if (r) {
                                        if ("closed" !== e.readyState) {
                                            try {
                                                e.removeSourceBuffer(r)
                                            } catch (e) {
                                                s.default.e(this.TAG, e.message)
                                            }
                                            r.removeEventListener("error", this.e.onSourceBufferError), r.removeEventListener("updateend", this.e.onSourceBufferUpdateEnd)
                                        }
                                        this._mimeTypes[t] = null, this._sourceBuffers[t] = null
                                    }
                                }
                                if ("open" === e.readyState) try {
                                    e.endOfStream()
                                } catch (e) {
                                    s.default.e(this.TAG, e.message)
                                }
                                e.removeEventListener("sourceopen", this.e.onSourceOpen), e.removeEventListener("sourceended", this.e.onSourceEnded), e.removeEventListener("sourceclose", this.e.onSourceClose), this._pendingSourceBufferInit = [], this._isBufferFull = !1, this._idrList.clear(), this._mediaSource = null
                            }
                            this._mediaElement && (this._mediaElement.src = "", this._mediaElement.removeAttribute("src"), this._mediaElement = null), this._mediaSourceObjectURL && (window.URL.revokeObjectURL(this._mediaSourceObjectURL), this._mediaSourceObjectURL = null)
                        }, e.prototype.appendInitSegment = function (e, t) {
                            if (!this._mediaSource || "open" !== this._mediaSource.readyState) return this._pendingSourceBufferInit.push(e), void this._pendingSegments[e.type].push(e);
                            var i = e, r = "" + i.container;
                            i.codec && i.codec.length > 0 && (r += ";codecs=" + i.codec);
                            var n = !1;
                            if (s.default.v(this.TAG, "Received Initialization Segment, mimeType: " + r), this._lastInitSegments[i.type] = i, r !== this._mimeTypes[i.type]) {
                                if (this._mimeTypes[i.type]) s.default.v(this.TAG, "Notice: " + i.type + " mimeType changed, origin: " + this._mimeTypes[i.type] + ", target: " + r); else {
                                    n = !0;
                                    try {
                                        var u = this._sourceBuffers[i.type] = this._mediaSource.addSourceBuffer(r);
                                        u.addEventListener("error", this.e.onSourceBufferError), u.addEventListener("updateend", this.e.onSourceBufferUpdateEnd)
                                    } catch (e) {
                                        return s.default.e(this.TAG, e.message), void this._emitter.emit(a.default.ERROR, {
                                            code: e.code,
                                            msg: e.message
                                        })
                                    }
                                }
                                this._mimeTypes[i.type] = r
                            }
                            t || this._pendingSegments[i.type].push(i), n || this._sourceBuffers[i.type] && !this._sourceBuffers[i.type].updating && this._doAppendSegments(), o.default.safari && "audio/mpeg" === i.container && i.mediaDuration > 0 && (this._requireSetMediaDuration = !0, this._pendingMediaDuration = i.mediaDuration / 1e3, this._updateMediaSourceDuration())
                        }, e.prototype.appendMediaSegment = function (e) {
                            var t = e;
                            this._pendingSegments[t.type].push(t), this._config.autoCleanupSourceBuffer && this._needCleanupSourceBuffer() && this._doCleanupSourceBuffer();
                            var i = this._sourceBuffers[t.type];
                            !i || i.updating || this._hasPendingRemoveRanges() || this._doAppendSegments()
                        }, e.prototype.seek = function (e) {
                            for (var t in this._sourceBuffers) if (this._sourceBuffers[t]) {
                                var i = this._sourceBuffers[t];
                                if ("open" === this._mediaSource.readyState) try {
                                    i.abort()
                                } catch (e) {
                                    s.default.e(this.TAG, e.message)
                                }
                                this._idrList.clear();
                                var r = this._pendingSegments[t];
                                if (r.splice(0, r.length), "closed" !== this._mediaSource.readyState) {
                                    for (var n = 0; n < i.buffered.length; n++) {
                                        var a = i.buffered.start(n), u = i.buffered.end(n);
                                        this._pendingRemoveRanges[t].push({start: a, end: u})
                                    }
                                    if (i.updating || this._doRemoveRanges(), o.default.safari) {
                                        var l = this._lastInitSegments[t];
                                        l && (this._pendingSegments[t].push(l), i.updating || this._doAppendSegments())
                                    }
                                }
                            }
                        }, e.prototype.endOfStream = function () {
                            var e = this._mediaSource, t = this._sourceBuffers;
                            e && "open" === e.readyState ? t.video && t.video.updating || t.audio && t.audio.updating ? this._hasPendingEos = !0 : (this._hasPendingEos = !1, e.endOfStream()) : e && "closed" === e.readyState && this._hasPendingSegments() && (this._hasPendingEos = !0)
                        }, e.prototype.getNearestKeyframe = function (e) {
                            return this._idrList.getLastSyncPointBeforeDts(e)
                        }, e.prototype._needCleanupSourceBuffer = function () {
                            if (!this._config.autoCleanupSourceBuffer) return !1;
                            var e = this._mediaElement.currentTime;
                            for (var t in this._sourceBuffers) {
                                var i = this._sourceBuffers[t];
                                if (i) {
                                    var r = i.buffered;
                                    if (r.length >= 1 && e - r.start(0) >= this._config.autoCleanupMaxBackwardDuration) return !0
                                }
                            }
                            return !1
                        }, e.prototype._doCleanupSourceBuffer = function () {
                            var e = this._mediaElement.currentTime;
                            for (var t in this._sourceBuffers) {
                                var i = this._sourceBuffers[t];
                                if (i) {
                                    for (var r = i.buffered, n = !1, s = 0; s < r.length; s++) {
                                        var o = r.start(s), a = r.end(s);
                                        if (o <= e && e < a + 3) {
                                            if (e - o >= this._config.autoCleanupMaxBackwardDuration) {
                                                n = !0;
                                                var u = e - this._config.autoCleanupMinBackwardDuration;
                                                this._pendingRemoveRanges[t].push({start: o, end: u})
                                            }
                                        } else a < e && (n = !0, this._pendingRemoveRanges[t].push({start: o, end: a}))
                                    }
                                    n && !i.updating && this._doRemoveRanges()
                                }
                            }
                        }, e.prototype._updateMediaSourceDuration = function () {
                            var e = this._sourceBuffers;
                            if (0 !== this._mediaElement.readyState && "open" === this._mediaSource.readyState && !(e.video && e.video.updating || e.audio && e.audio.updating)) {
                                var t = this._mediaSource.duration, i = this._pendingMediaDuration;
                                i > 0 && (isNaN(t) || i > t) && (s.default.v(this.TAG, "Update MediaSource duration from " + t + " to " + i), this._mediaSource.duration = i), this._requireSetMediaDuration = !1, this._pendingMediaDuration = 0
                            }
                        }, e.prototype._doRemoveRanges = function () {
                            for (var e in this._pendingRemoveRanges) if (this._sourceBuffers[e] && !this._sourceBuffers[e].updating) for (var t = this._sourceBuffers[e], i = this._pendingRemoveRanges[e]; i.length && !t.updating;) {
                                var r = i.shift();
                                t.remove(r.start, r.end)
                            }
                        }, e.prototype._doAppendSegments = function () {
                            var e = this._pendingSegments;
                            for (var t in e) if (this._sourceBuffers[t] && !this._sourceBuffers[t].updating && e[t].length > 0) {
                                var i = e[t].shift();
                                if (i.timestampOffset) {
                                    var r = this._sourceBuffers[t].timestampOffset, n = i.timestampOffset / 1e3;
                                    Math.abs(r - n) > .1 && (s.default.v(this.TAG, "Update MPEG audio timestampOffset from " + r + " to " + n), this._sourceBuffers[t].timestampOffset = n), delete i.timestampOffset
                                }
                                if (!i.data || 0 === i.data.byteLength) continue;
                                try {
                                    this._sourceBuffers[t].appendBuffer(i.data), this._isBufferFull = !1, "video" === t && i.hasOwnProperty("info") && this._idrList.appendArray(i.info.syncPoints)
                                } catch (e) {
                                    this._pendingSegments[t].unshift(i), 22 === e.code ? (this._isBufferFull || this._emitter.emit(a.default.BUFFER_FULL), this._isBufferFull = !0) : (s.default.e(this.TAG, e.message), this._emitter.emit(a.default.ERROR, {
                                        code: e.code,
                                        msg: e.message
                                    }))
                                }
                            }
                        }, e.prototype._onSourceOpen = function () {
                            if (s.default.v(this.TAG, "MediaSource onSourceOpen"), this._mediaSource.removeEventListener("sourceopen", this.e.onSourceOpen), this._pendingSourceBufferInit.length > 0) for (var e = this._pendingSourceBufferInit; e.length;) {
                                var t = e.shift();
                                this.appendInitSegment(t, !0)
                            }
                            this._hasPendingSegments() && this._doAppendSegments(), this._emitter.emit(a.default.SOURCE_OPEN)
                        }, e.prototype._onSourceEnded = function () {
                            s.default.v(this.TAG, "MediaSource onSourceEnded")
                        }, e.prototype._onSourceClose = function () {
                            s.default.v(this.TAG, "MediaSource onSourceClose"), this._mediaSource && null != this.e && (this._mediaSource.removeEventListener("sourceopen", this.e.onSourceOpen), this._mediaSource.removeEventListener("sourceended", this.e.onSourceEnded), this._mediaSource.removeEventListener("sourceclose", this.e.onSourceClose))
                        }, e.prototype._hasPendingSegments = function () {
                            var e = this._pendingSegments;
                            return e.video.length > 0 || e.audio.length > 0
                        }, e.prototype._hasPendingRemoveRanges = function () {
                            var e = this._pendingRemoveRanges;
                            return e.video.length > 0 || e.audio.length > 0
                        }, e.prototype._onSourceBufferUpdateEnd = function () {
                            this._requireSetMediaDuration ? this._updateMediaSourceDuration() : this._hasPendingRemoveRanges() ? this._doRemoveRanges() : this._hasPendingSegments() ? this._doAppendSegments() : this._hasPendingEos && this.endOfStream(), this._emitter.emit(a.default.UPDATE_END)
                        }, e.prototype._onSourceBufferError = function (e) {
                            s.default.e(this.TAG, "SourceBuffer Error: " + e)
                        }, e
                    }();
                t.default = d
            }, "./src/core/mse-events.js":
            /*!********************************!*\
      !*** ./src/core/mse-events.js ***!
      \********************************/function (e, t, i) {
                i.r(t), t.default = {
                    ERROR: "error",
                    SOURCE_OPEN: "source_open",
                    UPDATE_END: "update_end",
                    BUFFER_FULL: "buffer_full"
                }
            }, "./src/core/transmuxer.js":
            /*!********************************!*\
      !*** ./src/core/transmuxer.js ***!
      \********************************/function (e, t, i) {
                i.r(t);
                var r = i(/*! events */"./node_modules/events/events.js"), n = i.n(r),
                    s = i(/*! webworkify-webpack */"./node_modules/webworkify-webpack/index.js"), o = i.n(s),
                    a = i(/*! ../utils/logger.js */"./src/utils/logger.js"),
                    u = i(/*! ../utils/logging-control.js */"./src/utils/logging-control.js"),
                    l = i(/*! ./transmuxing-controller.js */"./src/core/transmuxing-controller.js"),
                    d = i(/*! ./transmuxing-events.js */"./src/core/transmuxing-events.js"),
                    h = i(/*! ./media-info.js */"./src/core/media-info.js"), c = function () {
                        function e(e, t) {
                            if (this.TAG = "Transmuxer", this._emitter = new (n()), t.enableWorker && "undefined" != typeof Worker) try {
                                this._worker = o()(/*! ./transmuxing-worker */"./src/core/transmuxing-worker.js"), this._workerDestroying = !1, this._worker.addEventListener("message", this._onWorkerMessage.bind(this)), this._worker.postMessage({
                                    cmd: "init",
                                    param: [e, t]
                                }), this.e = {onLoggingConfigChanged: this._onLoggingConfigChanged.bind(this)}, u.default.registerListener(this.e.onLoggingConfigChanged), this._worker.postMessage({
                                    cmd: "logging_config",
                                    param: u.default.getConfig()
                                })
                            } catch (i) {
                                a.default.e(this.TAG, "Error while initialize transmuxing worker, fallback to inline transmuxing"), this._worker = null, this._controller = new l.default(e, t)
                            } else this._controller = new l.default(e, t);
                            if (this._controller) {
                                var i = this._controller;
                                i.on(d.default.IO_ERROR, this._onIOError.bind(this)), i.on(d.default.DEMUX_ERROR, this._onDemuxError.bind(this)), i.on(d.default.INIT_SEGMENT, this._onInitSegment.bind(this)), i.on(d.default.MEDIA_SEGMENT, this._onMediaSegment.bind(this)), i.on(d.default.LOADING_COMPLETE, this._onLoadingComplete.bind(this)), i.on(d.default.RECOVERED_EARLY_EOF, this._onRecoveredEarlyEof.bind(this)), i.on(d.default.MEDIA_INFO, this._onMediaInfo.bind(this)), i.on(d.default.METADATA_ARRIVED, this._onMetaDataArrived.bind(this)), i.on(d.default.SCRIPTDATA_ARRIVED, this._onScriptDataArrived.bind(this)), i.on(d.default.STATISTICS_INFO, this._onStatisticsInfo.bind(this)), i.on(d.default.RECOMMEND_SEEKPOINT, this._onRecommendSeekpoint.bind(this))
                            }
                        }

                        return e.prototype.destroy = function () {
                            this._worker ? this._workerDestroying || (this._workerDestroying = !0, this._worker.postMessage({cmd: "destroy"}), u.default.removeListener(this.e.onLoggingConfigChanged), this.e = null) : (this._controller.destroy(), this._controller = null), this._emitter.removeAllListeners(), this._emitter = null
                        }, e.prototype.on = function (e, t) {
                            this._emitter.addListener(e, t)
                        }, e.prototype.off = function (e, t) {
                            this._emitter.removeListener(e, t)
                        }, e.prototype.hasWorker = function () {
                            return null != this._worker
                        }, e.prototype.open = function () {
                            this._worker ? this._worker.postMessage({cmd: "start"}) : this._controller.start()
                        }, e.prototype.close = function () {
                            this._worker ? this._worker.postMessage({cmd: "stop"}) : this._controller.stop()
                        }, e.prototype.seek = function (e) {
                            this._worker ? this._worker.postMessage({cmd: "seek", param: e}) : this._controller.seek(e)
                        }, e.prototype.pause = function () {
                            this._worker ? this._worker.postMessage({cmd: "pause"}) : this._controller.pause()
                        }, e.prototype.resume = function () {
                            this._worker ? this._worker.postMessage({cmd: "resume"}) : this._controller.resume()
                        }, e.prototype._onInitSegment = function (e, t) {
                            var i = this;
                            Promise.resolve().then((function () {
                                i._emitter.emit(d.default.INIT_SEGMENT, e, t)
                            }))
                        }, e.prototype._onMediaSegment = function (e, t) {
                            var i = this;
                            Promise.resolve().then((function () {
                                i._emitter.emit(d.default.MEDIA_SEGMENT, e, t)
                            }))
                        }, e.prototype._onLoadingComplete = function () {
                            var e = this;
                            Promise.resolve().then((function () {
                                e._emitter.emit(d.default.LOADING_COMPLETE)
                            }))
                        }, e.prototype._onRecoveredEarlyEof = function () {
                            var e = this;
                            Promise.resolve().then((function () {
                                e._emitter.emit(d.default.RECOVERED_EARLY_EOF)
                            }))
                        }, e.prototype._onMediaInfo = function (e) {
                            var t = this;
                            Promise.resolve().then((function () {
                                t._emitter.emit(d.default.MEDIA_INFO, e)
                            }))
                        }, e.prototype._onMetaDataArrived = function (e) {
                            var t = this;
                            Promise.resolve().then((function () {
                                t._emitter.emit(d.default.METADATA_ARRIVED, e)
                            }))
                        }, e.prototype._onScriptDataArrived = function (e) {
                            var t = this;
                            Promise.resolve().then((function () {
                                t._emitter.emit(d.default.SCRIPTDATA_ARRIVED, e)
                            }))
                        }, e.prototype._onStatisticsInfo = function (e) {
                            var t = this;
                            Promise.resolve().then((function () {
                                t._emitter.emit(d.default.STATISTICS_INFO, e)
                            }))
                        }, e.prototype._onIOError = function (e, t) {
                            var i = this;
                            Promise.resolve().then((function () {
                                i._emitter.emit(d.default.IO_ERROR, e, t)
                            }))
                        }, e.prototype._onDemuxError = function (e, t) {
                            var i = this;
                            Promise.resolve().then((function () {
                                i._emitter.emit(d.default.DEMUX_ERROR, e, t)
                            }))
                        }, e.prototype._onRecommendSeekpoint = function (e) {
                            var t = this;
                            Promise.resolve().then((function () {
                                t._emitter.emit(d.default.RECOMMEND_SEEKPOINT, e)
                            }))
                        }, e.prototype._onLoggingConfigChanged = function (e) {
                            this._worker && this._worker.postMessage({cmd: "logging_config", param: e})
                        }, e.prototype._onWorkerMessage = function (e) {
                            var t = e.data, i = t.data;
                            if ("destroyed" === t.msg || this._workerDestroying) return this._workerDestroying = !1, this._worker.terminate(), void (this._worker = null);
                            switch (t.msg) {
                                case d.default.INIT_SEGMENT:
                                case d.default.MEDIA_SEGMENT:
                                    this._emitter.emit(t.msg, i.type, i.data);
                                    break;
                                case d.default.LOADING_COMPLETE:
                                case d.default.RECOVERED_EARLY_EOF:
                                    this._emitter.emit(t.msg);
                                    break;
                                case d.default.MEDIA_INFO:
                                    Object.setPrototypeOf(i, h.default.prototype), this._emitter.emit(t.msg, i);
                                    break;
                                case d.default.METADATA_ARRIVED:
                                case d.default.SCRIPTDATA_ARRIVED:
                                case d.default.STATISTICS_INFO:
                                    this._emitter.emit(t.msg, i);
                                    break;
                                case d.default.IO_ERROR:
                                case d.default.DEMUX_ERROR:
                                    this._emitter.emit(t.msg, i.type, i.info);
                                    break;
                                case d.default.RECOMMEND_SEEKPOINT:
                                    this._emitter.emit(t.msg, i);
                                    break;
                                case"logcat_callback":
                                    a.default.emitter.emit("log", i.type, i.logcat)
                            }
                        }, e
                    }();
                t.default = c
            }, "./src/core/transmuxing-controller.js":
            /*!********************************************!*\
      !*** ./src/core/transmuxing-controller.js ***!
      \********************************************/function (e, t, i) {
                i.r(t);
                var r = i(/*! events */"./node_modules/events/events.js"), n = i.n(r),
                    s = i(/*! ../utils/logger.js */"./src/utils/logger.js"),
                    o = i(/*! ../utils/browser.js */"./src/utils/browser.js"),
                    a = i(/*! ./media-info.js */"./src/core/media-info.js"),
                    u = i(/*! ../demux/flv-demuxer.js */"./src/demux/flv-demuxer.js"),
                    l = i(/*! ../remux/mp4-remuxer.js */"./src/remux/mp4-remuxer.js"),
                    d = i(/*! ../demux/demux-errors.js */"./src/demux/demux-errors.js"),
                    h = i(/*! ../io/io-controller.js */"./src/io/io-controller.js"),
                    c = i(/*! ./transmuxing-events.js */"./src/core/transmuxing-events.js"), f = function () {
                        function e(e, t) {
                            this.TAG = "TransmuxingController", this._emitter = new (n()), this._config = t, e.segments || (e.segments = [{
                                duration: e.duration,
                                filesize: e.filesize,
                                url: e.url
                            }]), "boolean" != typeof e.cors && (e.cors = !0), "boolean" != typeof e.withCredentials && (e.withCredentials = !1), this._mediaDataSource = e, this._currentSegmentIndex = 0;
                            var i = 0;
                            this._mediaDataSource.segments.forEach((function (r) {
                                r.timestampBase = i, i += r.duration, r.cors = e.cors, r.withCredentials = e.withCredentials, t.referrerPolicy && (r.referrerPolicy = t.referrerPolicy)
                            })), isNaN(i) || this._mediaDataSource.duration === i || (this._mediaDataSource.duration = i), this._mediaInfo = null, this._demuxer = null, this._remuxer = null, this._ioctl = null, this._pendingSeekTime = null, this._pendingResolveSeekPoint = null, this._statisticsReporter = null
                        }

                        return e.prototype.destroy = function () {
                            this._mediaInfo = null, this._mediaDataSource = null, this._statisticsReporter && this._disableStatisticsReporter(), this._ioctl && (this._ioctl.destroy(), this._ioctl = null), this._demuxer && (this._demuxer.destroy(), this._demuxer = null), this._remuxer && (this._remuxer.destroy(), this._remuxer = null), this._emitter.removeAllListeners(), this._emitter = null
                        }, e.prototype.on = function (e, t) {
                            this._emitter.addListener(e, t)
                        }, e.prototype.off = function (e, t) {
                            this._emitter.removeListener(e, t)
                        }, e.prototype.start = function () {
                            this._loadSegment(0), this._enableStatisticsReporter()
                        }, e.prototype._loadSegment = function (e, t) {
                            this._currentSegmentIndex = e;
                            var i = this._mediaDataSource.segments[e], r = this._ioctl = new h.default(i, this._config, e);
                            r.onError = this._onIOException.bind(this), r.onSeeked = this._onIOSeeked.bind(this), r.onComplete = this._onIOComplete.bind(this), r.onRedirect = this._onIORedirect.bind(this), r.onRecoveredEarlyEof = this._onIORecoveredEarlyEof.bind(this), t ? this._demuxer.bindDataSource(this._ioctl) : r.onDataArrival = this._onInitChunkArrival.bind(this), r.open(t)
                        }, e.prototype.stop = function () {
                            this._internalAbort(), this._disableStatisticsReporter()
                        }, e.prototype._internalAbort = function () {
                            this._ioctl && (this._ioctl.destroy(), this._ioctl = null)
                        }, e.prototype.pause = function () {
                            this._ioctl && this._ioctl.isWorking() && (this._ioctl.pause(), this._disableStatisticsReporter())
                        }, e.prototype.resume = function () {
                            this._ioctl && this._ioctl.isPaused() && (this._ioctl.resume(), this._enableStatisticsReporter())
                        }, e.prototype.seek = function (e) {
                            if (null != this._mediaInfo && this._mediaInfo.isSeekable()) {
                                var t = this._searchSegmentIndexContains(e);
                                if (t === this._currentSegmentIndex) {
                                    var i = this._mediaInfo.segments[t];
                                    if (null == i) this._pendingSeekTime = e; else {
                                        var r = i.getNearestKeyframe(e);
                                        this._remuxer.seek(r.milliseconds), this._ioctl.seek(r.fileposition), this._pendingResolveSeekPoint = r.milliseconds
                                    }
                                } else {
                                    var n = this._mediaInfo.segments[t];
                                    null == n ? (this._pendingSeekTime = e, this._internalAbort(), this._remuxer.seek(), this._remuxer.insertDiscontinuity(), this._loadSegment(t)) : (r = n.getNearestKeyframe(e), this._internalAbort(), this._remuxer.seek(e), this._remuxer.insertDiscontinuity(), this._demuxer.resetMediaInfo(), this._demuxer.timestampBase = this._mediaDataSource.segments[t].timestampBase, this._loadSegment(t, r.fileposition), this._pendingResolveSeekPoint = r.milliseconds, this._reportSegmentMediaInfo(t))
                                }
                                this._enableStatisticsReporter()
                            }
                        }, e.prototype._searchSegmentIndexContains = function (e) {
                            for (var t = this._mediaDataSource.segments, i = t.length - 1, r = 0; r < t.length; r++) if (e < t[r].timestampBase) {
                                i = r - 1;
                                break
                            }
                            return i
                        }, e.prototype._onInitChunkArrival = function (e, t) {
                            var i = this, r = null, n = 0;
                            if (t > 0) this._demuxer.bindDataSource(this._ioctl), this._demuxer.timestampBase = this._mediaDataSource.segments[this._currentSegmentIndex].timestampBase, n = this._demuxer.parseChunks(e, t); else if ((r = u.default.probe(e)).match) {
                                this._demuxer = new u.default(r, this._config), this._remuxer || (this._remuxer = new l.default(this._config));
                                var o = this._mediaDataSource;
                                null == o.duration || isNaN(o.duration) || (this._demuxer.overridedDuration = o.duration), "boolean" == typeof o.hasAudio && (this._demuxer.overridedHasAudio = o.hasAudio), "boolean" == typeof o.hasVideo && (this._demuxer.overridedHasVideo = o.hasVideo), this._demuxer.timestampBase = o.segments[this._currentSegmentIndex].timestampBase, this._demuxer.onError = this._onDemuxException.bind(this), this._demuxer.onMediaInfo = this._onMediaInfo.bind(this), this._demuxer.onMetaDataArrived = this._onMetaDataArrived.bind(this), this._demuxer.onScriptDataArrived = this._onScriptDataArrived.bind(this), this._remuxer.bindDataSource(this._demuxer.bindDataSource(this._ioctl)), this._remuxer.onInitSegment = this._onRemuxerInitSegmentArrival.bind(this), this._remuxer.onMediaSegment = this._onRemuxerMediaSegmentArrival.bind(this), n = this._demuxer.parseChunks(e, t)
                            } else r = null, s.default.e(this.TAG, "Non-FLV, Unsupported media type!"), Promise.resolve().then((function () {
                                i._internalAbort()
                            })), this._emitter.emit(c.default.DEMUX_ERROR, d.default.FORMAT_UNSUPPORTED, "Non-FLV, Unsupported media type"), n = 0;
                            return n
                        }, e.prototype._onMediaInfo = function (e) {
                            var t = this;
                            null == this._mediaInfo && (this._mediaInfo = Object.assign({}, e), this._mediaInfo.keyframesIndex = null, this._mediaInfo.segments = [], this._mediaInfo.segmentCount = this._mediaDataSource.segments.length, Object.setPrototypeOf(this._mediaInfo, a.default.prototype));
                            var i = Object.assign({}, e);
                            Object.setPrototypeOf(i, a.default.prototype), this._mediaInfo.segments[this._currentSegmentIndex] = i, this._reportSegmentMediaInfo(this._currentSegmentIndex), null != this._pendingSeekTime && Promise.resolve().then((function () {
                                var e = t._pendingSeekTime;
                                t._pendingSeekTime = null, t.seek(e)
                            }))
                        }, e.prototype._onMetaDataArrived = function (e) {
                            this._emitter.emit(c.default.METADATA_ARRIVED, e)
                        }, e.prototype._onScriptDataArrived = function (e) {
                            this._emitter.emit(c.default.SCRIPTDATA_ARRIVED, e)
                        }, e.prototype._onIOSeeked = function () {
                            this._remuxer.insertDiscontinuity()
                        }, e.prototype._onIOComplete = function (e) {
                            var t = e + 1;
                            t < this._mediaDataSource.segments.length ? (this._internalAbort(), this._remuxer.flushStashedSamples(), this._loadSegment(t)) : (this._remuxer.flushStashedSamples(), this._emitter.emit(c.default.LOADING_COMPLETE), this._disableStatisticsReporter())
                        }, e.prototype._onIORedirect = function (e) {
                            var t = this._ioctl.extraData;
                            this._mediaDataSource.segments[t].redirectedURL = e
                        }, e.prototype._onIORecoveredEarlyEof = function () {
                            this._emitter.emit(c.default.RECOVERED_EARLY_EOF)
                        }, e.prototype._onIOException = function (e, t) {
                            s.default.e(this.TAG, "IOException: type = " + e + ", code = " + t.code + ", msg = " + t.msg), this._emitter.emit(c.default.IO_ERROR, e, t), this._disableStatisticsReporter()
                        }, e.prototype._onDemuxException = function (e, t) {
                            s.default.e(this.TAG, "DemuxException: type = " + e + ", info = " + t), this._emitter.emit(c.default.DEMUX_ERROR, e, t)
                        }, e.prototype._onRemuxerInitSegmentArrival = function (e, t) {
                            this._emitter.emit(c.default.INIT_SEGMENT, e, t)
                        }, e.prototype._onRemuxerMediaSegmentArrival = function (e, t) {
                            if (null == this._pendingSeekTime && (this._emitter.emit(c.default.MEDIA_SEGMENT, e, t), null != this._pendingResolveSeekPoint && "video" === e)) {
                                var i = t.info.syncPoints, r = this._pendingResolveSeekPoint;
                                this._pendingResolveSeekPoint = null, o.default.safari && i.length > 0 && i[0].originalDts === r && (r = i[0].pts), this._emitter.emit(c.default.RECOMMEND_SEEKPOINT, r)
                            }
                        }, e.prototype._enableStatisticsReporter = function () {
                            null == this._statisticsReporter && (this._statisticsReporter = self.setInterval(this._reportStatisticsInfo.bind(this), this._config.statisticsInfoReportInterval))
                        }, e.prototype._disableStatisticsReporter = function () {
                            this._statisticsReporter && (self.clearInterval(this._statisticsReporter), this._statisticsReporter = null)
                        }, e.prototype._reportSegmentMediaInfo = function (e) {
                            var t = this._mediaInfo.segments[e], i = Object.assign({}, t);
                            i.duration = this._mediaInfo.duration, i.segmentCount = this._mediaInfo.segmentCount, delete i.segments, delete i.keyframesIndex, this._emitter.emit(c.default.MEDIA_INFO, i)
                        }, e.prototype._reportStatisticsInfo = function () {
                            var e = {};
                            e.url = this._ioctl.currentURL, e.hasRedirect = this._ioctl.hasRedirect, e.hasRedirect && (e.redirectedURL = this._ioctl.currentRedirectedURL), e.speed = this._ioctl.currentSpeed, e.loaderType = this._ioctl.loaderType, e.currentSegmentIndex = this._currentSegmentIndex, e.totalSegmentCount = this._mediaDataSource.segments.length, this._emitter.emit(c.default.STATISTICS_INFO, e)
                        }, e
                    }();
                t.default = f
            }, "./src/core/transmuxing-events.js":
            /*!****************************************!*\
      !*** ./src/core/transmuxing-events.js ***!
      \****************************************/function (e, t, i) {
                i.r(t), t.default = {
                    IO_ERROR: "io_error",
                    DEMUX_ERROR: "demux_error",
                    INIT_SEGMENT: "init_segment",
                    MEDIA_SEGMENT: "media_segment",
                    LOADING_COMPLETE: "loading_complete",
                    RECOVERED_EARLY_EOF: "recovered_early_eof",
                    MEDIA_INFO: "media_info",
                    METADATA_ARRIVED: "metadata_arrived",
                    SCRIPTDATA_ARRIVED: "scriptdata_arrived",
                    STATISTICS_INFO: "statistics_info",
                    RECOMMEND_SEEKPOINT: "recommend_seekpoint"
                }
            }, "./src/core/transmuxing-worker.js":
            /*!****************************************!*\
      !*** ./src/core/transmuxing-worker.js ***!
      \****************************************/function (e, t, i) {
                i.r(t);
                var r = i(/*! ../utils/logging-control.js */"./src/utils/logging-control.js"),
                    n = i(/*! ../utils/polyfill.js */"./src/utils/polyfill.js"),
                    s = i(/*! ./transmuxing-controller.js */"./src/core/transmuxing-controller.js"),
                    o = i(/*! ./transmuxing-events.js */"./src/core/transmuxing-events.js");
                t.default = function (e) {
                    var t = null, i = function (t, i) {
                        e.postMessage({msg: "logcat_callback", data: {type: t, logcat: i}})
                    }.bind(this);

                    function a(t, i) {
                        var r = {msg: o.default.INIT_SEGMENT, data: {type: t, data: i}};
                        e.postMessage(r, [i.data])
                    }

                    function u(t, i) {
                        var r = {msg: o.default.MEDIA_SEGMENT, data: {type: t, data: i}};
                        e.postMessage(r, [i.data])
                    }

                    function l() {
                        var t = {msg: o.default.LOADING_COMPLETE};
                        e.postMessage(t)
                    }

                    function d() {
                        var t = {msg: o.default.RECOVERED_EARLY_EOF};
                        e.postMessage(t)
                    }

                    function h(t) {
                        var i = {msg: o.default.MEDIA_INFO, data: t};
                        e.postMessage(i)
                    }

                    function c(t) {
                        var i = {msg: o.default.METADATA_ARRIVED, data: t};
                        e.postMessage(i)
                    }

                    function f(t) {
                        var i = {msg: o.default.SCRIPTDATA_ARRIVED, data: t};
                        e.postMessage(i)
                    }

                    function _(t) {
                        var i = {msg: o.default.STATISTICS_INFO, data: t};
                        e.postMessage(i)
                    }

                    function p(t, i) {
                        e.postMessage({msg: o.default.IO_ERROR, data: {type: t, info: i}})
                    }

                    function m(t, i) {
                        e.postMessage({msg: o.default.DEMUX_ERROR, data: {type: t, info: i}})
                    }

                    function g(t) {
                        e.postMessage({msg: o.default.RECOMMEND_SEEKPOINT, data: t})
                    }

                    n.default.install(), e.addEventListener("message", (function (n) {
                        switch (n.data.cmd) {
                            case"init":
                                (t = new s.default(n.data.param[0], n.data.param[1])).on(o.default.IO_ERROR, p.bind(this)), t.on(o.default.DEMUX_ERROR, m.bind(this)), t.on(o.default.INIT_SEGMENT, a.bind(this)), t.on(o.default.MEDIA_SEGMENT, u.bind(this)), t.on(o.default.LOADING_COMPLETE, l.bind(this)), t.on(o.default.RECOVERED_EARLY_EOF, d.bind(this)), t.on(o.default.MEDIA_INFO, h.bind(this)), t.on(o.default.METADATA_ARRIVED, c.bind(this)), t.on(o.default.SCRIPTDATA_ARRIVED, f.bind(this)), t.on(o.default.STATISTICS_INFO, _.bind(this)), t.on(o.default.RECOMMEND_SEEKPOINT, g.bind(this));
                                break;
                            case"destroy":
                                t && (t.destroy(), t = null), e.postMessage({msg: "destroyed"});
                                break;
                            case"start":
                                t.start();
                                break;
                            case"stop":
                                t.stop();
                                break;
                            case"seek":
                                t.seek(n.data.param);
                                break;
                            case"pause":
                                t.pause();
                                break;
                            case"resume":
                                t.resume();
                                break;
                            case"logging_config":
                                var v = n.data.param;
                                r.default.applyConfig(v), !0 === v.enableCallback ? r.default.addLogListener(i) : r.default.removeLogListener(i)
                        }
                    }))
                }
            }, "./src/demux/amf-parser.js":
            /*!*********************************!*\
      !*** ./src/demux/amf-parser.js ***!
      \*********************************/function (e, t, i) {
                i.r(t);
                var r, n = i(/*! ../utils/logger.js */"./src/utils/logger.js"),
                    s = i(/*! ../utils/utf8-conv.js */"./src/utils/utf8-conv.js"),
                    o = i(/*! ../utils/exception.js */"./src/utils/exception.js"),
                    a = (r = new ArrayBuffer(2), new DataView(r).setInt16(0, 256, !0), 256 === new Int16Array(r)[0]),
                    u = function () {
                        function e() {
                        }

                        return e.parseScriptData = function (t, i, r) {
                            var s = {};
                            try {
                                var o = e.parseValue(t, i, r), a = e.parseValue(t, i + o.size, r - o.size);
                                s[o.data] = a.data
                            } catch (e) {
                                n.default.e("AMF", e.toString())
                            }
                            return s
                        }, e.parseObject = function (t, i, r) {
                            if (r < 3) throw new o.IllegalStateException("Data not enough when parse ScriptDataObject");
                            var n = e.parseString(t, i, r), s = e.parseValue(t, i + n.size, r - n.size),
                                a = s.objectEnd;
                            return {data: {name: n.data, value: s.data}, size: n.size + s.size, objectEnd: a}
                        }, e.parseVariable = function (t, i, r) {
                            return e.parseObject(t, i, r)
                        }, e.parseString = function (e, t, i) {
                            if (i < 2) throw new o.IllegalStateException("Data not enough when parse String");
                            var r = new DataView(e, t, i).getUint16(0, !a);
                            return {data: r > 0 ? (0, s.default)(new Uint8Array(e, t + 2, r)) : "", size: 2 + r}
                        }, e.parseLongString = function (e, t, i) {
                            if (i < 4) throw new o.IllegalStateException("Data not enough when parse LongString");
                            var r = new DataView(e, t, i).getUint32(0, !a);
                            return {data: r > 0 ? (0, s.default)(new Uint8Array(e, t + 4, r)) : "", size: 4 + r}
                        }, e.parseDate = function (e, t, i) {
                            if (i < 10) throw new o.IllegalStateException("Data size invalid when parse Date");
                            var r = new DataView(e, t, i), n = r.getFloat64(0, !a), s = r.getInt16(8, !a);
                            return {data: new Date(n += 60 * s * 1e3), size: 10}
                        }, e.parseValue = function (t, i, r) {
                            if (r < 1) throw new o.IllegalStateException("Data not enough when parse Value");
                            var s, u = new DataView(t, i, r), l = 1, d = u.getUint8(0), h = !1;
                            try {
                                switch (d) {
                                    case 0:
                                        s = u.getFloat64(1, !a), l += 8;
                                        break;
                                    case 1:
                                        s = !!u.getUint8(1), l += 1;
                                        break;
                                    case 2:
                                        var c = e.parseString(t, i + 1, r - 1);
                                        s = c.data, l += c.size;
                                        break;
                                    case 3:
                                        s = {};
                                        var f = 0;
                                        for (9 == (16777215 & u.getUint32(r - 4, !a)) && (f = 3); l < r - 4;) {
                                            var _ = e.parseObject(t, i + l, r - l - f);
                                            if (_.objectEnd) break;
                                            s[_.data.name] = _.data.value, l += _.size
                                        }
                                        l <= r - 3 && 9 == (16777215 & u.getUint32(l - 1, !a)) && (l += 3);
                                        break;
                                    case 8:
                                        for (s = {}, l += 4, f = 0, 9 == (16777215 & u.getUint32(r - 4, !a)) && (f = 3); l < r - 8;) {
                                            var p = e.parseVariable(t, i + l, r - l - f);
                                            if (p.objectEnd) break;
                                            s[p.data.name] = p.data.value, l += p.size
                                        }
                                        l <= r - 3 && 9 == (16777215 & u.getUint32(l - 1, !a)) && (l += 3);
                                        break;
                                    case 9:
                                        s = void 0, l = 1, h = !0;
                                        break;
                                    case 10:
                                        s = [];
                                        var m = u.getUint32(1, !a);
                                        l += 4;
                                        for (var g = 0; g < m; g++) {
                                            var v = e.parseValue(t, i + l, r - l);
                                            s.push(v.data), l += v.size
                                        }
                                        break;
                                    case 11:
                                        var y = e.parseDate(t, i + 1, r - 1);
                                        s = y.data, l += y.size;
                                        break;
                                    case 12:
                                        var E = e.parseString(t, i + 1, r - 1);
                                        s = E.data, l += E.size;
                                        break;
                                    default:
                                        l = r, n.default.w("AMF", "Unsupported AMF value type " + d)
                                }
                            } catch (e) {
                                n.default.e("AMF", e.toString())
                            }
                            return {data: s, size: l, objectEnd: h}
                        }, e
                    }();
                t.default = u
            }, "./src/demux/demux-errors.js":
            /*!***********************************!*\
      !*** ./src/demux/demux-errors.js ***!
      \***********************************/function (e, t, i) {
                i.r(t), t.default = {
                    OK: "OK",
                    FORMAT_ERROR: "FormatError",
                    FORMAT_UNSUPPORTED: "FormatUnsupported",
                    CODEC_UNSUPPORTED: "CodecUnsupported"
                }
            }, "./src/demux/exp-golomb.js":
            /*!*********************************!*\
      !*** ./src/demux/exp-golomb.js ***!
      \*********************************/function (e, t, i) {
                i.r(t);
                var r = i(/*! ../utils/exception.js */"./src/utils/exception.js"), n = function () {
                    function e(e) {
                        this.TAG = "ExpGolomb", this._buffer = e, this._buffer_index = 0, this._total_bytes = e.byteLength, this._total_bits = 8 * e.byteLength, this._current_word = 0, this._current_word_bits_left = 0
                    }

                    return e.prototype.destroy = function () {
                        this._buffer = null
                    }, e.prototype._fillCurrentWord = function () {
                        var e = this._total_bytes - this._buffer_index;
                        if (e <= 0) throw new r.IllegalStateException("ExpGolomb: _fillCurrentWord() but no bytes available");
                        var t = Math.min(4, e), i = new Uint8Array(4);
                        i.set(this._buffer.subarray(this._buffer_index, this._buffer_index + t)), this._current_word = new DataView(i.buffer).getUint32(0, !1), this._buffer_index += t, this._current_word_bits_left = 8 * t
                    }, e.prototype.readBits = function (e) {
                        if (e > 32) throw new r.InvalidArgumentException("ExpGolomb: readBits() bits exceeded max 32bits!");
                        if (e <= this._current_word_bits_left) {
                            var t = this._current_word >>> 32 - e;
                            return this._current_word <<= e, this._current_word_bits_left -= e, t
                        }
                        var i = this._current_word_bits_left ? this._current_word : 0;
                        i >>>= 32 - this._current_word_bits_left;
                        var n = e - this._current_word_bits_left;
                        this._fillCurrentWord();
                        var s = Math.min(n, this._current_word_bits_left), o = this._current_word >>> 32 - s;
                        return this._current_word <<= s, this._current_word_bits_left -= s, i = i << s | o
                    }, e.prototype.readBool = function () {
                        return 1 === this.readBits(1)
                    }, e.prototype.readByte = function () {
                        return this.readBits(8)
                    }, e.prototype._skipLeadingZero = function () {
                        var e;
                        for (e = 0; e < this._current_word_bits_left; e++) if (0 != (this._current_word & 2147483648 >>> e)) return this._current_word <<= e, this._current_word_bits_left -= e, e;
                        return this._fillCurrentWord(), e + this._skipLeadingZero()
                    }, e.prototype.readUEG = function () {
                        var e = this._skipLeadingZero();
                        return this.readBits(e + 1) - 1
                    }, e.prototype.readSEG = function () {
                        var e = this.readUEG();
                        return 1 & e ? e + 1 >>> 1 : -1 * (e >>> 1)
                    }, e
                }();
                t.default = n
            }, "./src/demux/flv-demuxer.js":
            /*!**********************************!*\
      !*** ./src/demux/flv-demuxer.js ***!
      \**********************************/function (e, t, i) {
                i.r(t);
                var r = i(/*! ../utils/logger.js */"./src/utils/logger.js"),
                    n = i(/*! ./amf-parser.js */"./src/demux/amf-parser.js"),
                    s = i(/*! ./sps-parser.js */"./src/demux/sps-parser.js"),
                    o = i(/*! ./demux-errors.js */"./src/demux/demux-errors.js"),
                    a = i(/*! ../core/media-info.js */"./src/core/media-info.js"),
                    u = i(/*! ../utils/exception.js */"./src/utils/exception.js"), l = function () {
                        function e(e, t) {
                            var i;
                            this.TAG = "FLVDemuxer", this._config = t, this._onError = null, this._onMediaInfo = null, this._onMetaDataArrived = null, this._onScriptDataArrived = null, this._onTrackMetadata = null, this._onDataAvailable = null, this._dataOffset = e.dataOffset, this._firstParse = !0, this._dispatch = !1, this._hasAudio = e.hasAudioTrack, this._hasVideo = e.hasVideoTrack, this._hasAudioFlagOverrided = !1, this._hasVideoFlagOverrided = !1, this._audioInitialMetadataDispatched = !1, this._videoInitialMetadataDispatched = !1, this._mediaInfo = new a.default, this._mediaInfo.hasAudio = this._hasAudio, this._mediaInfo.hasVideo = this._hasVideo, this._metadata = null, this._audioMetadata = null, this._videoMetadata = null, this._naluLengthSize = 4, this._timestampBase = 0, this._timescale = 1e3, this._duration = 0, this._durationOverrided = !1, this._referenceFrameRate = {
                                fixed: !0,
                                fps: 23.976,
                                fps_num: 23976,
                                fps_den: 1e3
                            }, this._flvSoundRateTable = [5500, 11025, 22050, 44100, 48e3], this._mpegSamplingRates = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350], this._mpegAudioV10SampleRateTable = [44100, 48e3, 32e3, 0], this._mpegAudioV20SampleRateTable = [22050, 24e3, 16e3, 0], this._mpegAudioV25SampleRateTable = [11025, 12e3, 8e3, 0], this._mpegAudioL1BitRateTable = [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, -1], this._mpegAudioL2BitRateTable = [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, -1], this._mpegAudioL3BitRateTable = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1], this._videoTrack = {
                                type: "video",
                                id: 1,
                                sequenceNumber: 0,
                                samples: [],
                                length: 0
                            }, this._audioTrack = {
                                type: "audio",
                                id: 2,
                                sequenceNumber: 0,
                                samples: [],
                                length: 0
                            }, this._littleEndian = (i = new ArrayBuffer(2), new DataView(i).setInt16(0, 256, !0), 256 === new Int16Array(i)[0])
                        }

                        return e.prototype.destroy = function () {
                            this._mediaInfo = null, this._metadata = null, this._audioMetadata = null, this._videoMetadata = null, this._videoTrack = null, this._audioTrack = null, this._onError = null, this._onMediaInfo = null, this._onMetaDataArrived = null, this._onScriptDataArrived = null, this._onTrackMetadata = null, this._onDataAvailable = null
                        }, e.probe = function (e) {
                            var t = new Uint8Array(e), i = {match: !1};
                            if (70 !== t[0] || 76 !== t[1] || 86 !== t[2] || 1 !== t[3]) return i;
                            var r, n, s = (4 & t[4]) >>> 2 != 0, o = 0 != (1 & t[4]),
                                a = (r = t)[n = 5] << 24 | r[n + 1] << 16 | r[n + 2] << 8 | r[n + 3];
                            return a < 9 ? i : {match: !0, consumed: a, dataOffset: a, hasAudioTrack: s, hasVideoTrack: o}
                        }, e.prototype.bindDataSource = function (e) {
                            return e.onDataArrival = this.parseChunks.bind(this), this
                        }, Object.defineProperty(e.prototype, "onTrackMetadata", {
                            get: function () {
                                return this._onTrackMetadata
                            }, set: function (e) {
                                this._onTrackMetadata = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "onMediaInfo", {
                            get: function () {
                                return this._onMediaInfo
                            }, set: function (e) {
                                this._onMediaInfo = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "onMetaDataArrived", {
                            get: function () {
                                return this._onMetaDataArrived
                            }, set: function (e) {
                                this._onMetaDataArrived = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "onScriptDataArrived", {
                            get: function () {
                                return this._onScriptDataArrived
                            }, set: function (e) {
                                this._onScriptDataArrived = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "onError", {
                            get: function () {
                                return this._onError
                            }, set: function (e) {
                                this._onError = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "onDataAvailable", {
                            get: function () {
                                return this._onDataAvailable
                            }, set: function (e) {
                                this._onDataAvailable = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "timestampBase", {
                            get: function () {
                                return this._timestampBase
                            }, set: function (e) {
                                this._timestampBase = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "overridedDuration", {
                            get: function () {
                                return this._duration
                            }, set: function (e) {
                                this._durationOverrided = !0, this._duration = e, this._mediaInfo.duration = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "overridedHasAudio", {
                            set: function (e) {
                                this._hasAudioFlagOverrided = !0, this._hasAudio = e, this._mediaInfo.hasAudio = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "overridedHasVideo", {
                            set: function (e) {
                                this._hasVideoFlagOverrided = !0, this._hasVideo = e, this._mediaInfo.hasVideo = e
                            }, enumerable: !1, configurable: !0
                        }), e.prototype.resetMediaInfo = function () {
                            this._mediaInfo = new a.default
                        }, e.prototype._isInitialMetadataDispatched = function () {
                            return this._hasAudio && this._hasVideo ? this._audioInitialMetadataDispatched && this._videoInitialMetadataDispatched : this._hasAudio && !this._hasVideo ? this._audioInitialMetadataDispatched : !(this._hasAudio || !this._hasVideo) && this._videoInitialMetadataDispatched
                        }, e.prototype.parseChunks = function (t, i) {
                            if (!(this._onError && this._onMediaInfo && this._onTrackMetadata && this._onDataAvailable)) throw new u.IllegalStateException("Flv: onError & onMediaInfo & onTrackMetadata & onDataAvailable callback must be specified");
                            var n = 0, s = this._littleEndian;
                            if (0 === i) {
                                if (!(t.byteLength > 13)) return 0;
                                n = e.probe(t).dataOffset
                            }
                            for (this._firstParse && (this._firstParse = !1, i + n !== this._dataOffset && r.default.w(this.TAG, "First time parsing but chunk byteStart invalid!"), 0 !== (o = new DataView(t, n)).getUint32(0, !s) && r.default.w(this.TAG, "PrevTagSize0 !== 0 !!!"), n += 4); n < t.byteLength;) {
                                this._dispatch = !0;
                                var o = new DataView(t, n);
                                if (n + 11 + 4 > t.byteLength) break;
                                var a = o.getUint8(0), l = 16777215 & o.getUint32(0, !s);
                                if (n + 11 + l + 4 > t.byteLength) break;
                                if (8 === a || 9 === a || 18 === a) {
                                    var d = o.getUint8(4), h = o.getUint8(5),
                                        c = o.getUint8(6) | h << 8 | d << 16 | o.getUint8(7) << 24;
                                    0 != (16777215 & o.getUint32(7, !s)) && r.default.w(this.TAG, "Meet tag which has StreamID != 0!");
                                    var f = n + 11;
                                    switch (a) {
                                        case 8:
                                            this._parseAudioData(t, f, l, c);
                                            break;
                                        case 9:
                                            this._parseVideoData(t, f, l, c, i + n);
                                            break;
                                        case 18:
                                            this._parseScriptData(t, f, l)
                                    }
                                    var _ = o.getUint32(11 + l, !s);
                                    _ !== 11 + l && r.default.w(this.TAG, "Invalid PrevTagSize " + _), n += 11 + l + 4
                                } else r.default.w(this.TAG, "Unsupported tag type " + a + ", skipped"), n += 11 + l + 4
                            }
                            return this._isInitialMetadataDispatched() && this._dispatch && (this._audioTrack.length || this._videoTrack.length) && this._onDataAvailable(this._audioTrack, this._videoTrack), n
                        }, e.prototype._parseScriptData = function (e, t, i) {
                            var s = n.default.parseScriptData(e, t, i);
                            if (s.hasOwnProperty("onMetaData")) {
                                if (null == s.onMetaData || "object" != typeof s.onMetaData) return void r.default.w(this.TAG, "Invalid onMetaData structure!");
                                this._metadata && r.default.w(this.TAG, "Found another onMetaData tag!"), this._metadata = s;
                                var o = this._metadata.onMetaData;
                                if (this._onMetaDataArrived && this._onMetaDataArrived(Object.assign({}, o)), "boolean" == typeof o.hasAudio && !1 === this._hasAudioFlagOverrided && (this._hasAudio = o.hasAudio, this._mediaInfo.hasAudio = this._hasAudio), "boolean" == typeof o.hasVideo && !1 === this._hasVideoFlagOverrided && (this._hasVideo = o.hasVideo, this._mediaInfo.hasVideo = this._hasVideo), "number" == typeof o.audiodatarate && (this._mediaInfo.audioDataRate = o.audiodatarate), "number" == typeof o.videodatarate && (this._mediaInfo.videoDataRate = o.videodatarate), "number" == typeof o.width && (this._mediaInfo.width = o.width), "number" == typeof o.height && (this._mediaInfo.height = o.height), "number" == typeof o.duration) {
                                    if (!this._durationOverrided) {
                                        var a = Math.floor(o.duration * this._timescale);
                                        this._duration = a, this._mediaInfo.duration = a
                                    }
                                } else this._mediaInfo.duration = 0;
                                if ("number" == typeof o.framerate) {
                                    var u = Math.floor(1e3 * o.framerate);
                                    if (u > 0) {
                                        var l = u / 1e3;
                                        this._referenceFrameRate.fixed = !0, this._referenceFrameRate.fps = l, this._referenceFrameRate.fps_num = u, this._referenceFrameRate.fps_den = 1e3, this._mediaInfo.fps = l
                                    }
                                }
                                if ("object" == typeof o.keyframes) {
                                    this._mediaInfo.hasKeyframesIndex = !0;
                                    var d = o.keyframes;
                                    this._mediaInfo.keyframesIndex = this._parseKeyframesIndex(d), o.keyframes = null
                                } else this._mediaInfo.hasKeyframesIndex = !1;
                                this._dispatch = !1, this._mediaInfo.metadata = o, r.default.v(this.TAG, "Parsed onMetaData"), this._mediaInfo.isComplete() && this._onMediaInfo(this._mediaInfo)
                            }
                            Object.keys(s).length > 0 && this._onScriptDataArrived && this._onScriptDataArrived(Object.assign({}, s))
                        }, e.prototype._parseKeyframesIndex = function (e) {
                            for (var t = [], i = [], r = 1; r < e.times.length; r++) {
                                var n = this._timestampBase + Math.floor(1e3 * e.times[r]);
                                t.push(n), i.push(e.filepositions[r])
                            }
                            return {times: t, filepositions: i}
                        }, e.prototype._parseAudioData = function (e, t, i, n) {
                            if (i <= 1) r.default.w(this.TAG, "Flv: Invalid audio packet, missing SoundData payload!"); else if (!0 !== this._hasAudioFlagOverrided || !1 !== this._hasAudio) {
                                this._littleEndian;
                                var s = new DataView(e, t, i).getUint8(0), a = s >>> 4;
                                if (2 === a || 10 === a) {
                                    var u = 0, l = (12 & s) >>> 2;
                                    if (l >= 0 && l <= 4) {
                                        u = this._flvSoundRateTable[l];
                                        var d = 1 & s, h = this._audioMetadata, c = this._audioTrack;
                                        if (h || (!1 === this._hasAudio && !1 === this._hasAudioFlagOverrided && (this._hasAudio = !0, this._mediaInfo.hasAudio = !0), (h = this._audioMetadata = {}).type = "audio", h.id = c.id, h.timescale = this._timescale, h.duration = this._duration, h.audioSampleRate = u, h.channelCount = 0 === d ? 1 : 2), 10 === a) {
                                            var f = this._parseAACAudioData(e, t + 1, i - 1);
                                            if (null == f) return;
                                            if (0 === f.packetType) {
                                                h.config && r.default.w(this.TAG, "Found another AudioSpecificConfig!");
                                                var _ = f.data;
                                                h.audioSampleRate = _.samplingRate, h.channelCount = _.channelCount, h.codec = _.codec, h.originalCodec = _.originalCodec, h.config = _.config, h.refSampleDuration = 1024 / h.audioSampleRate * h.timescale, r.default.v(this.TAG, "Parsed AudioSpecificConfig"), this._isInitialMetadataDispatched() ? this._dispatch && (this._audioTrack.length || this._videoTrack.length) && this._onDataAvailable(this._audioTrack, this._videoTrack) : this._audioInitialMetadataDispatched = !0, this._dispatch = !1, this._onTrackMetadata("audio", h), (g = this._mediaInfo).audioCodec = h.originalCodec, g.audioSampleRate = h.audioSampleRate, g.audioChannelCount = h.channelCount, g.hasVideo ? null != g.videoCodec && (g.mimeType = 'video/x-flv; codecs="' + g.videoCodec + "," + g.audioCodec + '"') : g.mimeType = 'video/x-flv; codecs="' + g.audioCodec + '"', g.isComplete() && this._onMediaInfo(g)
                                            } else if (1 === f.packetType) {
                                                var p = this._timestampBase + n,
                                                    m = {unit: f.data, length: f.data.byteLength, dts: p, pts: p};
                                                c.samples.push(m), c.length += f.data.length
                                            } else r.default.e(this.TAG, "Flv: Unsupported AAC data type " + f.packetType)
                                        } else if (2 === a) {
                                            if (!h.codec) {
                                                var g;
                                                if (null == (_ = this._parseMP3AudioData(e, t + 1, i - 1, !0))) return;
                                                h.audioSampleRate = _.samplingRate, h.channelCount = _.channelCount, h.codec = _.codec, h.originalCodec = _.originalCodec, h.refSampleDuration = 1152 / h.audioSampleRate * h.timescale, r.default.v(this.TAG, "Parsed MPEG Audio Frame Header"), this._audioInitialMetadataDispatched = !0, this._onTrackMetadata("audio", h), (g = this._mediaInfo).audioCodec = h.codec, g.audioSampleRate = h.audioSampleRate, g.audioChannelCount = h.channelCount, g.audioDataRate = _.bitRate, g.hasVideo ? null != g.videoCodec && (g.mimeType = 'video/x-flv; codecs="' + g.videoCodec + "," + g.audioCodec + '"') : g.mimeType = 'video/x-flv; codecs="' + g.audioCodec + '"', g.isComplete() && this._onMediaInfo(g)
                                            }
                                            var v = this._parseMP3AudioData(e, t + 1, i - 1, !1);
                                            if (null == v) return;
                                            p = this._timestampBase + n;
                                            var y = {unit: v, length: v.byteLength, dts: p, pts: p};
                                            c.samples.push(y), c.length += v.length
                                        }
                                    } else this._onError(o.default.FORMAT_ERROR, "Flv: Invalid audio sample rate idx: " + l)
                                } else this._onError(o.default.CODEC_UNSUPPORTED, "Flv: Unsupported audio codec idx: " + a)
                            }
                        }, e.prototype._parseAACAudioData = function (e, t, i) {
                            if (!(i <= 1)) {
                                var n = {}, s = new Uint8Array(e, t, i);
                                return n.packetType = s[0], 0 === s[0] ? n.data = this._parseAACAudioSpecificConfig(e, t + 1, i - 1) : n.data = s.subarray(1), n
                            }
                            r.default.w(this.TAG, "Flv: Invalid AAC packet, missing AACPacketType or/and Data!")
                        }, e.prototype._parseAACAudioSpecificConfig = function (e, t, i) {
                            var r, n, s = new Uint8Array(e, t, i), a = null, u = 0, l = null;
                            if (u = r = s[0] >>> 3, (n = (7 & s[0]) << 1 | s[1] >>> 7) < 0 || n >= this._mpegSamplingRates.length) this._onError(o.default.FORMAT_ERROR, "Flv: AAC invalid sampling frequency index!"); else {
                                var d = this._mpegSamplingRates[n], h = (120 & s[1]) >>> 3;
                                if (!(h < 0 || h >= 8)) {
                                    5 === u && (l = (7 & s[1]) << 1 | s[2] >>> 7, s[2]);
                                    var c = self.navigator.userAgent.toLowerCase();
                                    return -1 !== c.indexOf("firefox") ? n >= 6 ? (u = 5, a = new Array(4), l = n - 3) : (u = 2, a = new Array(2), l = n) : -1 !== c.indexOf("android") ? (u = 2, a = new Array(2), l = n) : (u = 5, l = n, a = new Array(4), n >= 6 ? l = n - 3 : 1 === h && (u = 2, a = new Array(2), l = n)), a[0] = u << 3, a[0] |= (15 & n) >>> 1, a[1] = (15 & n) << 7, a[1] |= (15 & h) << 3, 5 === u && (a[1] |= (15 & l) >>> 1, a[2] = (1 & l) << 7, a[2] |= 8, a[3] = 0), {
                                        config: a,
                                        samplingRate: d,
                                        channelCount: h,
                                        codec: "mp4a.40." + u,
                                        originalCodec: "mp4a.40." + r
                                    }
                                }
                                this._onError(o.default.FORMAT_ERROR, "Flv: AAC invalid channel configuration")
                            }
                        }, e.prototype._parseMP3AudioData = function (e, t, i, n) {
                            if (!(i < 4)) {
                                this._littleEndian;
                                var s = new Uint8Array(e, t, i), o = null;
                                if (n) {
                                    if (255 !== s[0]) return;
                                    var a = s[1] >>> 3 & 3, u = (6 & s[1]) >> 1, l = (240 & s[2]) >>> 4,
                                        d = (12 & s[2]) >>> 2, h = 3 != (s[3] >>> 6 & 3) ? 2 : 1, c = 0, f = 0;
                                    switch (a) {
                                        case 0:
                                            c = this._mpegAudioV25SampleRateTable[d];
                                            break;
                                        case 2:
                                            c = this._mpegAudioV20SampleRateTable[d];
                                            break;
                                        case 3:
                                            c = this._mpegAudioV10SampleRateTable[d]
                                    }
                                    switch (u) {
                                        case 1:
                                            l < this._mpegAudioL3BitRateTable.length && (f = this._mpegAudioL3BitRateTable[l]);
                                            break;
                                        case 2:
                                            l < this._mpegAudioL2BitRateTable.length && (f = this._mpegAudioL2BitRateTable[l]);
                                            break;
                                        case 3:
                                            l < this._mpegAudioL1BitRateTable.length && (f = this._mpegAudioL1BitRateTable[l])
                                    }
                                    o = {bitRate: f, samplingRate: c, channelCount: h, codec: "mp3", originalCodec: "mp3"}
                                } else o = s;
                                return o
                            }
                            r.default.w(this.TAG, "Flv: Invalid MP3 packet, header missing!")
                        }, e.prototype._parseVideoData = function (e, t, i, n, s) {
                            if (i <= 1) r.default.w(this.TAG, "Flv: Invalid video packet, missing VideoData payload!"); else if (!0 !== this._hasVideoFlagOverrided || !1 !== this._hasVideo) {
                                var a = new Uint8Array(e, t, i)[0], u = (240 & a) >>> 4, l = 15 & a;
                                7 === l ? this._parseAVCVideoPacket(e, t + 1, i - 1, n, s, u) : this._onError(o.default.CODEC_UNSUPPORTED, "Flv: Unsupported codec in video frame: " + l)
                            }
                        }, e.prototype._parseAVCVideoPacket = function (e, t, i, n, s, a) {
                            if (i < 4) r.default.w(this.TAG, "Flv: Invalid AVC packet, missing AVCPacketType or/and CompositionTime"); else {
                                var u = this._littleEndian, l = new DataView(e, t, i), d = l.getUint8(0),
                                    h = (16777215 & l.getUint32(0, !u)) << 8 >> 8;
                                if (0 === d) this._parseAVCDecoderConfigurationRecord(e, t + 4, i - 4); else if (1 === d) this._parseAVCVideoData(e, t + 4, i - 4, n, s, a, h); else if (2 !== d) return void this._onError(o.default.FORMAT_ERROR, "Flv: Invalid video packet type " + d)
                            }
                        }, e.prototype._parseAVCDecoderConfigurationRecord = function (e, t, i) {
                            if (i < 7) r.default.w(this.TAG, "Flv: Invalid AVCDecoderConfigurationRecord, lack of data!"); else {
                                var n = this._videoMetadata, a = this._videoTrack, u = this._littleEndian,
                                    l = new DataView(e, t, i);
                                n ? void 0 !== n.avcc && r.default.w(this.TAG, "Found another AVCDecoderConfigurationRecord!") : (!1 === this._hasVideo && !1 === this._hasVideoFlagOverrided && (this._hasVideo = !0, this._mediaInfo.hasVideo = !0), (n = this._videoMetadata = {}).type = "video", n.id = a.id, n.timescale = this._timescale, n.duration = this._duration);
                                var d = l.getUint8(0), h = l.getUint8(1);
                                if (l.getUint8(2), l.getUint8(3), 1 === d && 0 !== h) if (this._naluLengthSize = 1 + (3 & l.getUint8(4)), 3 === this._naluLengthSize || 4 === this._naluLengthSize) {
                                    var c = 31 & l.getUint8(5);
                                    if (0 !== c) {
                                        c > 1 && r.default.w(this.TAG, "Flv: Strange AVCDecoderConfigurationRecord: SPS Count = " + c);
                                        for (var f = 6, _ = 0; _ < c; _++) {
                                            var p = l.getUint16(f, !u);
                                            if (f += 2, 0 !== p) {
                                                var m = new Uint8Array(e, t + f, p);
                                                f += p;
                                                var g = s.default.parseSPS(m);
                                                if (0 === _) {
                                                    n.codecWidth = g.codec_size.width, n.codecHeight = g.codec_size.height, n.presentWidth = g.present_size.width, n.presentHeight = g.present_size.height, n.profile = g.profile_string, n.level = g.level_string, n.bitDepth = g.bit_depth, n.chromaFormat = g.chroma_format, n.sarRatio = g.sar_ratio, n.frameRate = g.frame_rate, !1 !== g.frame_rate.fixed && 0 !== g.frame_rate.fps_num && 0 !== g.frame_rate.fps_den || (n.frameRate = this._referenceFrameRate);
                                                    var v = n.frameRate.fps_den, y = n.frameRate.fps_num;
                                                    n.refSampleDuration = n.timescale * (v / y);
                                                    for (var E = m.subarray(1, 4), b = "avc1.", S = 0; S < 3; S++) {
                                                        var L = E[S].toString(16);
                                                        L.length < 2 && (L = "0" + L), b += L
                                                    }
                                                    n.codec = b;
                                                    var A = this._mediaInfo;
                                                    A.width = n.codecWidth, A.height = n.codecHeight, A.fps = n.frameRate.fps, A.profile = n.profile, A.level = n.level, A.refFrames = g.ref_frames, A.chromaFormat = g.chroma_format_string, A.sarNum = n.sarRatio.width, A.sarDen = n.sarRatio.height, A.videoCodec = b, A.hasAudio ? null != A.audioCodec && (A.mimeType = 'video/x-flv; codecs="' + A.videoCodec + "," + A.audioCodec + '"') : A.mimeType = 'video/x-flv; codecs="' + A.videoCodec + '"', A.isComplete() && this._onMediaInfo(A)
                                                }
                                            }
                                        }
                                        var R = l.getUint8(f);
                                        if (0 !== R) {
                                            for (R > 1 && r.default.w(this.TAG, "Flv: Strange AVCDecoderConfigurationRecord: PPS Count = " + R), f++, _ = 0; _ < R; _++) p = l.getUint16(f, !u), f += 2, 0 !== p && (f += p);
                                            n.avcc = new Uint8Array(i), n.avcc.set(new Uint8Array(e, t, i), 0), r.default.v(this.TAG, "Parsed AVCDecoderConfigurationRecord"), this._isInitialMetadataDispatched() ? this._dispatch && (this._audioTrack.length || this._videoTrack.length) && this._onDataAvailable(this._audioTrack, this._videoTrack) : this._videoInitialMetadataDispatched = !0, this._dispatch = !1, this._onTrackMetadata("video", n)
                                        } else this._onError(o.default.FORMAT_ERROR, "Flv: Invalid AVCDecoderConfigurationRecord: No PPS")
                                    } else this._onError(o.default.FORMAT_ERROR, "Flv: Invalid AVCDecoderConfigurationRecord: No SPS")
                                } else this._onError(o.default.FORMAT_ERROR, "Flv: Strange NaluLengthSizeMinusOne: " + (this._naluLengthSize - 1)); else this._onError(o.default.FORMAT_ERROR, "Flv: Invalid AVCDecoderConfigurationRecord")
                            }
                        }, e.prototype._parseAVCVideoData = function (e, t, i, n, s, o, a) {
                            for (var u = this._littleEndian, l = new DataView(e, t, i), d = [], h = 0, c = 0, f = this._naluLengthSize, _ = this._timestampBase + n, p = 1 === o; c < i;) {
                                if (c + 4 >= i) {
                                    r.default.w(this.TAG, "Malformed Nalu near timestamp " + _ + ", offset = " + c + ", dataSize = " + i);
                                    break
                                }
                                var m = l.getUint32(c, !u);
                                if (3 === f && (m >>>= 8), m > i - f) return void r.default.w(this.TAG, "Malformed Nalus near timestamp " + _ + ", NaluSize > DataSize!");
                                var g = 31 & l.getUint8(c + f);
                                5 === g && (p = !0);
                                var v = new Uint8Array(e, t + c, f + m), y = {type: g, data: v};
                                d.push(y), h += v.byteLength, c += f + m
                            }
                            if (d.length) {
                                var E = this._videoTrack,
                                    b = {units: d, length: h, isKeyframe: p, dts: _, cts: a, pts: _ + a};
                                p && (b.fileposition = s), E.samples.push(b), E.length += h
                            }
                        }, e
                    }();
                t.default = l
            }, "./src/demux/sps-parser.js":
            /*!*********************************!*\
      !*** ./src/demux/sps-parser.js ***!
      \*********************************/function (e, t, i) {
                i.r(t);
                var r = i(/*! ./exp-golomb.js */"./src/demux/exp-golomb.js"), n = function () {
                    function e() {
                    }

                    return e._ebsp2rbsp = function (e) {
                        for (var t = e, i = t.byteLength, r = new Uint8Array(i), n = 0, s = 0; s < i; s++) s >= 2 && 3 === t[s] && 0 === t[s - 1] && 0 === t[s - 2] || (r[n] = t[s], n++);
                        return new Uint8Array(r.buffer, 0, n)
                    }, e.parseSPS = function (t) {
                        var i = e._ebsp2rbsp(t), n = new r.default(i);
                        n.readByte();
                        var s = n.readByte();
                        n.readByte();
                        var o = n.readByte();
                        n.readUEG();
                        var a = e.getProfileString(s), u = e.getLevelString(o), l = 1, d = 420, h = 8;
                        if ((100 === s || 110 === s || 122 === s || 244 === s || 44 === s || 83 === s || 86 === s || 118 === s || 128 === s || 138 === s || 144 === s) && (3 === (l = n.readUEG()) && n.readBits(1), l <= 3 && (d = [0, 420, 422, 444][l]), h = n.readUEG() + 8, n.readUEG(), n.readBits(1), n.readBool())) for (var c = 3 !== l ? 8 : 12, f = 0; f < c; f++) n.readBool() && (f < 6 ? e._skipScalingList(n, 16) : e._skipScalingList(n, 64));
                        n.readUEG();
                        var _ = n.readUEG();
                        if (0 === _) n.readUEG(); else if (1 === _) {
                            n.readBits(1), n.readSEG(), n.readSEG();
                            var p = n.readUEG();
                            for (f = 0; f < p; f++) n.readSEG()
                        }
                        var m = n.readUEG();
                        n.readBits(1);
                        var g = n.readUEG(), v = n.readUEG(), y = n.readBits(1);
                        0 === y && n.readBits(1), n.readBits(1);
                        var E = 0, b = 0, S = 0, L = 0;
                        n.readBool() && (E = n.readUEG(), b = n.readUEG(), S = n.readUEG(), L = n.readUEG());
                        var A = 1, R = 1, w = 0, T = !0, O = 0, C = 0;
                        if (n.readBool()) {
                            if (n.readBool()) {
                                var k = n.readByte();
                                k > 0 && k < 16 ? (A = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2][k - 1], R = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1][k - 1]) : 255 === k && (A = n.readByte() << 8 | n.readByte(), R = n.readByte() << 8 | n.readByte())
                            }
                            if (n.readBool() && n.readBool(), n.readBool() && (n.readBits(4), n.readBool() && n.readBits(24)), n.readBool() && (n.readUEG(), n.readUEG()), n.readBool()) {
                                var I = n.readBits(32), D = n.readBits(32);
                                T = n.readBool(), w = (O = D) / (C = 2 * I)
                            }
                        }
                        var x = 1;
                        1 === A && 1 === R || (x = A / R);
                        var M = 0, B = 0;
                        0 === l ? (M = 1, B = 2 - y) : (M = 3 === l ? 1 : 2, B = (1 === l ? 2 : 1) * (2 - y));
                        var P = 16 * (g + 1), j = 16 * (v + 1) * (2 - y);
                        P -= (E + b) * M, j -= (S + L) * B;
                        var U = Math.ceil(P * x);
                        return n.destroy(), n = null, {
                            profile_string: a,
                            level_string: u,
                            bit_depth: h,
                            ref_frames: m,
                            chroma_format: d,
                            chroma_format_string: e.getChromaFormatString(d),
                            frame_rate: {fixed: T, fps: w, fps_den: C, fps_num: O},
                            sar_ratio: {width: A, height: R},
                            codec_size: {width: P, height: j},
                            present_size: {width: U, height: j}
                        }
                    }, e._skipScalingList = function (e, t) {
                        for (var i = 8, r = 8, n = 0; n < t; n++) 0 !== r && (r = (i + e.readSEG() + 256) % 256), i = 0 === r ? i : r
                    }, e.getProfileString = function (e) {
                        switch (e) {
                            case 66:
                                return "Baseline";
                            case 77:
                                return "Main";
                            case 88:
                                return "Extended";
                            case 100:
                                return "High";
                            case 110:
                                return "High10";
                            case 122:
                                return "High422";
                            case 244:
                                return "High444";
                            default:
                                return "Unknown"
                        }
                    }, e.getLevelString = function (e) {
                        return (e / 10).toFixed(1)
                    }, e.getChromaFormatString = function (e) {
                        switch (e) {
                            case 420:
                                return "4:2:0";
                            case 422:
                                return "4:2:2";
                            case 444:
                                return "4:4:4";
                            default:
                                return "Unknown"
                        }
                    }, e
                }();
                t.default = n
            }, "./src/flv.js":
            /*!********************!*\
      !*** ./src/flv.js ***!
      \********************/function (e, t, i) {
                i.r(t);
                var r = i(/*! ./utils/polyfill.js */"./src/utils/polyfill.js"),
                    n = i(/*! ./core/features.js */"./src/core/features.js"),
                    s = i(/*! ./io/loader.js */"./src/io/loader.js"),
                    o = i(/*! ./player/flv-player.js */"./src/player/flv-player.js"),
                    a = i(/*! ./player/native-player.js */"./src/player/native-player.js"),
                    u = i(/*! ./player/player-events.js */"./src/player/player-events.js"),
                    l = i(/*! ./player/player-errors.js */"./src/player/player-errors.js"),
                    d = i(/*! ./utils/logging-control.js */"./src/utils/logging-control.js"),
                    h = i(/*! ./utils/exception.js */"./src/utils/exception.js");
                r.default.install();
                var c = {
                    createPlayer: function (e, t) {
                        var i = e;
                        if (null == i || "object" != typeof i) throw new h.InvalidArgumentException("MediaDataSource must be an javascript object!");
                        if (!i.hasOwnProperty("type")) throw new h.InvalidArgumentException("MediaDataSource must has type field to indicate video file type!");
                        return "flv" === i.type ? new o.default(i, t) : new a.default(i, t)
                    }, isSupported: function () {
                        return n.default.supportMSEH264Playback()
                    }, getFeatureList: function () {
                        return n.default.getFeatureList()
                    }
                };
                c.BaseLoader = s.BaseLoader, c.LoaderStatus = s.LoaderStatus, c.LoaderErrors = s.LoaderErrors, c.Events = u.default, c.ErrorTypes = l.ErrorTypes, c.ErrorDetails = l.ErrorDetails, c.FlvPlayer = o.default, c.NativePlayer = a.default, c.LoggingControl = d.default, Object.defineProperty(c, "version", {
                    enumerable: !0,
                    get: function () {
                        return "1.6.2"
                    }
                }), t.default = c
            }, "./src/index.js":
            /*!**********************!*\
      !*** ./src/index.js ***!
      \**********************/function (e, t, i) {
                e.exports = i(/*! ./flv.js */"./src/flv.js").default
            }, "./src/io/fetch-stream-loader.js":
            /*!***************************************!*\
      !*** ./src/io/fetch-stream-loader.js ***!
      \***************************************/function (e, t, i) {
                i.r(t);
                var r, n = i(/*! ../utils/browser.js */"./src/utils/browser.js"),
                    s = i(/*! ./loader.js */"./src/io/loader.js"),
                    o = i(/*! ../utils/exception.js */"./src/utils/exception.js"), a = (r = function (e, t) {
                        return r = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                            e.__proto__ = t
                        } || function (e, t) {
                            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
                        }, r(e, t)
                    }, function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                        function i() {
                            this.constructor = e
                        }

                        r(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i)
                    }), u = function (e) {
                        function t(t, i) {
                            var r = e.call(this, "fetch-stream-loader") || this;
                            return r.TAG = "FetchStreamLoader", r._seekHandler = t, r._config = i, r._needStash = !0, r._requestAbort = !1, r._contentLength = null, r._receivedLength = 0, r
                        }

                        return a(t, e), t.isSupported = function () {
                            try {
                                var e = n.default.msedge && n.default.version.minor >= 15048, t = !n.default.msedge || e;
                                return self.fetch && self.ReadableStream && t
                            } catch (e) {
                                return !1
                            }
                        }, t.prototype.destroy = function () {
                            this.isWorking() && this.abort(), e.prototype.destroy.call(this)
                        }, t.prototype.open = function (e, t) {
                            var i = this;
                            this._dataSource = e, this._range = t;
                            var r = e.url;
                            this._config.reuseRedirectedURL && null != e.redirectedURL && (r = e.redirectedURL);
                            var n = this._seekHandler.getConfig(r, t), a = new self.Headers;
                            if ("object" == typeof n.headers) {
                                var u = n.headers;
                                for (var l in u) u.hasOwnProperty(l) && a.append(l, u[l])
                            }
                            var d = {
                                method: "GET",
                                headers: a,
                                mode: "cors",
                                cache: "default",
                                referrerPolicy: "no-referrer-when-downgrade"
                            };
                            if ("object" == typeof this._config.headers) for (var l in this._config.headers) a.append(l, this._config.headers[l]);
                            !1 === e.cors && (d.mode = "same-origin"), e.withCredentials && (d.credentials = "include"), e.referrerPolicy && (d.referrerPolicy = e.referrerPolicy), self.AbortController && (this._abortController = new self.AbortController, d.signal = this._abortController.signal), this._status = s.LoaderStatus.kConnecting, self.fetch(n.url, d).then((function (e) {
                                if (i._requestAbort) return i._status = s.LoaderStatus.kIdle, void e.body.cancel();
                                if (e.ok && e.status >= 200 && e.status <= 299) {
                                    if (e.url !== n.url && i._onURLRedirect) {
                                        var t = i._seekHandler.removeURLParameters(e.url);
                                        i._onURLRedirect(t)
                                    }
                                    var r = e.headers.get("Content-Length");
                                    return null != r && (i._contentLength = parseInt(r), 0 !== i._contentLength && i._onContentLengthKnown && i._onContentLengthKnown(i._contentLength)), i._pump.call(i, e.body.getReader())
                                }
                                if (i._status = s.LoaderStatus.kError, !i._onError) throw new o.RuntimeException("FetchStreamLoader: Http code invalid, " + e.status + " " + e.statusText);
                                i._onError(s.LoaderErrors.HTTP_STATUS_CODE_INVALID, {code: e.status, msg: e.statusText})
                            })).catch((function (e) {
                                if (!i._abortController || !i._abortController.signal.aborted) {
                                    if (i._status = s.LoaderStatus.kError, !i._onError) throw e;
                                    i._onError(s.LoaderErrors.EXCEPTION, {code: -1, msg: e.message})
                                }
                            }))
                        }, t.prototype.abort = function () {
                            if (this._requestAbort = !0, (this._status !== s.LoaderStatus.kBuffering || !n.default.chrome) && this._abortController) try {
                                this._abortController.abort()
                            } catch (e) {
                            }
                        }, t.prototype._pump = function (e) {
                            var t = this;
                            return e.read().then((function (i) {
                                if (i.done) if (null !== t._contentLength && t._receivedLength < t._contentLength) {
                                    t._status = s.LoaderStatus.kError;
                                    var r = s.LoaderErrors.EARLY_EOF, n = {code: -1, msg: "Fetch stream meet Early-EOF"};
                                    if (!t._onError) throw new o.RuntimeException(n.msg);
                                    t._onError(r, n)
                                } else t._status = s.LoaderStatus.kComplete, t._onComplete && t._onComplete(t._range.from, t._range.from + t._receivedLength - 1); else {
                                    if (t._abortController && t._abortController.signal.aborted) return void (t._status = s.LoaderStatus.kComplete);
                                    if (!0 === t._requestAbort) return t._status = s.LoaderStatus.kComplete, e.cancel();
                                    t._status = s.LoaderStatus.kBuffering;
                                    var a = i.value.buffer, u = t._range.from + t._receivedLength;
                                    t._receivedLength += a.byteLength, t._onDataArrival && t._onDataArrival(a, u, t._receivedLength), t._pump(e)
                                }
                            })).catch((function (e) {
                                if (t._abortController && t._abortController.signal.aborted) t._status = s.LoaderStatus.kComplete; else if (11 !== e.code || !n.default.msedge) {
                                    t._status = s.LoaderStatus.kError;
                                    var i = 0, r = null;
                                    if (19 !== e.code && "network error" !== e.message || !(null === t._contentLength || null !== t._contentLength && t._receivedLength < t._contentLength) ? (i = s.LoaderErrors.EXCEPTION, r = {
                                        code: e.code,
                                        msg: e.message
                                    }) : (i = s.LoaderErrors.EARLY_EOF, r = {
                                        code: e.code,
                                        msg: "Fetch stream meet Early-EOF"
                                    }), !t._onError) throw new o.RuntimeException(r.msg);
                                    t._onError(i, r)
                                }
                            }))
                        }, t
                    }(s.BaseLoader);
                t.default = u
            }, "./src/io/io-controller.js":
            /*!*********************************!*\
      !*** ./src/io/io-controller.js ***!
      \*********************************/function (e, t, i) {
                i.r(t);
                var r = i(/*! ../utils/logger.js */"./src/utils/logger.js"),
                    n = i(/*! ./speed-sampler.js */"./src/io/speed-sampler.js"),
                    s = i(/*! ./loader.js */"./src/io/loader.js"),
                    o = i(/*! ./fetch-stream-loader.js */"./src/io/fetch-stream-loader.js"),
                    a = i(/*! ./xhr-moz-chunked-loader.js */"./src/io/xhr-moz-chunked-loader.js"),
                    u = i(/*! ./xhr-range-loader.js */"./src/io/xhr-range-loader.js"),
                    l = i(/*! ./websocket-loader.js */"./src/io/websocket-loader.js"),
                    d = i(/*! ./range-seek-handler.js */"./src/io/range-seek-handler.js"),
                    h = i(/*! ./param-seek-handler.js */"./src/io/param-seek-handler.js"),
                    c = i(/*! ../utils/exception.js */"./src/utils/exception.js"), f = function () {
                        function e(e, t, i) {
                            this.TAG = "IOController", this._config = t, this._extraData = i, this._stashInitialSize = 393216, null != t.stashInitialSize && t.stashInitialSize > 0 && (this._stashInitialSize = t.stashInitialSize), this._stashUsed = 0, this._stashSize = this._stashInitialSize, this._bufferSize = 3145728, this._stashBuffer = new ArrayBuffer(this._bufferSize), this._stashByteStart = 0, this._enableStash = !0, !1 === t.enableStashBuffer && (this._enableStash = !1), this._loader = null, this._loaderClass = null, this._seekHandler = null, this._dataSource = e, this._isWebSocketURL = /wss?:\/\/(.+?)/.test(e.url), this._refTotalLength = e.filesize ? e.filesize : null, this._totalLength = this._refTotalLength, this._fullRequestFlag = !1, this._currentRange = null, this._redirectedURL = null, this._speedNormalized = 0, this._speedSampler = new n.default, this._speedNormalizeList = [64, 128, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096], this._isEarlyEofReconnecting = !1, this._paused = !1, this._resumeFrom = 0, this._onDataArrival = null, this._onSeeked = null, this._onError = null, this._onComplete = null, this._onRedirect = null, this._onRecoveredEarlyEof = null, this._selectSeekHandler(), this._selectLoader(), this._createLoader()
                        }

                        return e.prototype.destroy = function () {
                            this._loader.isWorking() && this._loader.abort(), this._loader.destroy(), this._loader = null, this._loaderClass = null, this._dataSource = null, this._stashBuffer = null, this._stashUsed = this._stashSize = this._bufferSize = this._stashByteStart = 0, this._currentRange = null, this._speedSampler = null, this._isEarlyEofReconnecting = !1, this._onDataArrival = null, this._onSeeked = null, this._onError = null, this._onComplete = null, this._onRedirect = null, this._onRecoveredEarlyEof = null, this._extraData = null
                        }, e.prototype.isWorking = function () {
                            return this._loader && this._loader.isWorking() && !this._paused
                        }, e.prototype.isPaused = function () {
                            return this._paused
                        }, Object.defineProperty(e.prototype, "status", {
                            get: function () {
                                return this._loader.status
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "extraData", {
                            get: function () {
                                return this._extraData
                            }, set: function (e) {
                                this._extraData = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "onDataArrival", {
                            get: function () {
                                return this._onDataArrival
                            }, set: function (e) {
                                this._onDataArrival = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "onSeeked", {
                            get: function () {
                                return this._onSeeked
                            }, set: function (e) {
                                this._onSeeked = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "onError", {
                            get: function () {
                                return this._onError
                            }, set: function (e) {
                                this._onError = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "onComplete", {
                            get: function () {
                                return this._onComplete
                            }, set: function (e) {
                                this._onComplete = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "onRedirect", {
                            get: function () {
                                return this._onRedirect
                            }, set: function (e) {
                                this._onRedirect = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "onRecoveredEarlyEof", {
                            get: function () {
                                return this._onRecoveredEarlyEof
                            }, set: function (e) {
                                this._onRecoveredEarlyEof = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "currentURL", {
                            get: function () {
                                return this._dataSource.url
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "hasRedirect", {
                            get: function () {
                                return null != this._redirectedURL || null != this._dataSource.redirectedURL
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "currentRedirectedURL", {
                            get: function () {
                                return this._redirectedURL || this._dataSource.redirectedURL
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "currentSpeed", {
                            get: function () {
                                return this._loaderClass === u.default ? this._loader.currentSpeed : this._speedSampler.lastSecondKBps
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "loaderType", {
                            get: function () {
                                return this._loader.type
                            }, enumerable: !1, configurable: !0
                        }), e.prototype._selectSeekHandler = function () {
                            var e = this._config;
                            if ("range" === e.seekType) this._seekHandler = new d.default(this._config.rangeLoadZeroStart); else if ("param" === e.seekType) {
                                var t = e.seekParamStart || "bstart", i = e.seekParamEnd || "bend";
                                this._seekHandler = new h.default(t, i)
                            } else {
                                if ("custom" !== e.seekType) throw new c.InvalidArgumentException("Invalid seekType in config: " + e.seekType);
                                if ("function" != typeof e.customSeekHandler) throw new c.InvalidArgumentException("Custom seekType specified in config but invalid customSeekHandler!");
                                this._seekHandler = new e.customSeekHandler
                            }
                        }, e.prototype._selectLoader = function () {
                            if (null != this._config.customLoader) this._loaderClass = this._config.customLoader; else if (this._isWebSocketURL) this._loaderClass = l.default; else if (o.default.isSupported()) this._loaderClass = o.default; else if (a.default.isSupported()) this._loaderClass = a.default; else {
                                if (!u.default.isSupported()) throw new c.RuntimeException("Your browser doesn't support xhr with arraybuffer responseType!");
                                this._loaderClass = u.default
                            }
                        }, e.prototype._createLoader = function () {
                            this._loader = new this._loaderClass(this._seekHandler, this._config), !1 === this._loader.needStashBuffer && (this._enableStash = !1), this._loader.onContentLengthKnown = this._onContentLengthKnown.bind(this), this._loader.onURLRedirect = this._onURLRedirect.bind(this), this._loader.onDataArrival = this._onLoaderChunkArrival.bind(this), this._loader.onComplete = this._onLoaderComplete.bind(this), this._loader.onError = this._onLoaderError.bind(this)
                        }, e.prototype.open = function (e) {
                            this._currentRange = {
                                from: 0,
                                to: -1
                            }, e && (this._currentRange.from = e), this._speedSampler.reset(), e || (this._fullRequestFlag = !0), this._loader.open(this._dataSource, Object.assign({}, this._currentRange))
                        }, e.prototype.abort = function () {
                            this._loader.abort(), this._paused && (this._paused = !1, this._resumeFrom = 0)
                        }, e.prototype.pause = function () {
                            this.isWorking() && (this._loader.abort(), 0 !== this._stashUsed ? (this._resumeFrom = this._stashByteStart, this._currentRange.to = this._stashByteStart - 1) : this._resumeFrom = this._currentRange.to + 1, this._stashUsed = 0, this._stashByteStart = 0, this._paused = !0)
                        }, e.prototype.resume = function () {
                            if (this._paused) {
                                this._paused = !1;
                                var e = this._resumeFrom;
                                this._resumeFrom = 0, this._internalSeek(e, !0)
                            }
                        }, e.prototype.seek = function (e) {
                            this._paused = !1, this._stashUsed = 0, this._stashByteStart = 0, this._internalSeek(e, !0)
                        }, e.prototype._internalSeek = function (e, t) {
                            this._loader.isWorking() && this._loader.abort(), this._flushStashBuffer(t), this._loader.destroy(), this._loader = null;
                            var i = {from: e, to: -1};
                            this._currentRange = {
                                from: i.from,
                                to: -1
                            }, this._speedSampler.reset(), this._stashSize = this._stashInitialSize, this._createLoader(), this._loader.open(this._dataSource, i), this._onSeeked && this._onSeeked()
                        }, e.prototype.updateUrl = function (e) {
                            if (!e || "string" != typeof e || 0 === e.length) throw new c.InvalidArgumentException("Url must be a non-empty string!");
                            this._dataSource.url = e
                        }, e.prototype._expandBuffer = function (e) {
                            for (var t = this._stashSize; t + 1048576 < e;) t *= 2;
                            if ((t += 1048576) !== this._bufferSize) {
                                var i = new ArrayBuffer(t);
                                if (this._stashUsed > 0) {
                                    var r = new Uint8Array(this._stashBuffer, 0, this._stashUsed);
                                    new Uint8Array(i, 0, t).set(r, 0)
                                }
                                this._stashBuffer = i, this._bufferSize = t
                            }
                        }, e.prototype._normalizeSpeed = function (e) {
                            var t = this._speedNormalizeList, i = t.length - 1, r = 0, n = 0, s = i;
                            if (e < t[0]) return t[0];
                            for (; n <= s;) {
                                if ((r = n + Math.floor((s - n) / 2)) === i || e >= t[r] && e < t[r + 1]) return t[r];
                                t[r] < e ? n = r + 1 : s = r - 1
                            }
                        }, e.prototype._adjustStashSize = function (e) {
                            var t = 0;
                            (t = this._config.isLive || e < 512 ? e : e >= 512 && e <= 1024 ? Math.floor(1.5 * e) : 2 * e) > 8192 && (t = 8192);
                            var i = 1024 * t + 1048576;
                            this._bufferSize < i && this._expandBuffer(i), this._stashSize = 1024 * t
                        }, e.prototype._dispatchChunks = function (e, t) {
                            return this._currentRange.to = t + e.byteLength - 1, this._onDataArrival(e, t)
                        }, e.prototype._onURLRedirect = function (e) {
                            this._redirectedURL = e, this._onRedirect && this._onRedirect(e)
                        }, e.prototype._onContentLengthKnown = function (e) {
                            e && this._fullRequestFlag && (this._totalLength = e, this._fullRequestFlag = !1)
                        }, e.prototype._onLoaderChunkArrival = function (e, t, i) {
                            if (!this._onDataArrival) throw new c.IllegalStateException("IOController: No existing consumer (onDataArrival) callback!");
                            if (!this._paused) {
                                this._isEarlyEofReconnecting && (this._isEarlyEofReconnecting = !1, this._onRecoveredEarlyEof && this._onRecoveredEarlyEof()), this._speedSampler.addBytes(e.byteLength);
                                var r = this._speedSampler.lastSecondKBps;
                                if (0 !== r) {
                                    var n = this._normalizeSpeed(r);
                                    this._speedNormalized !== n && (this._speedNormalized = n, this._adjustStashSize(n))
                                }
                                if (this._enableStash) if (0 === this._stashUsed && 0 === this._stashByteStart && (this._stashByteStart = t), this._stashUsed + e.byteLength <= this._stashSize) (a = new Uint8Array(this._stashBuffer, 0, this._stashSize)).set(new Uint8Array(e), this._stashUsed), this._stashUsed += e.byteLength; else if (a = new Uint8Array(this._stashBuffer, 0, this._bufferSize), this._stashUsed > 0) {
                                    var s = this._stashBuffer.slice(0, this._stashUsed);
                                    (u = this._dispatchChunks(s, this._stashByteStart)) < s.byteLength ? u > 0 && (l = new Uint8Array(s, u), a.set(l, 0), this._stashUsed = l.byteLength, this._stashByteStart += u) : (this._stashUsed = 0, this._stashByteStart += u), this._stashUsed + e.byteLength > this._bufferSize && (this._expandBuffer(this._stashUsed + e.byteLength), a = new Uint8Array(this._stashBuffer, 0, this._bufferSize)), a.set(new Uint8Array(e), this._stashUsed), this._stashUsed += e.byteLength
                                } else (u = this._dispatchChunks(e, t)) < e.byteLength && ((o = e.byteLength - u) > this._bufferSize && (this._expandBuffer(o), a = new Uint8Array(this._stashBuffer, 0, this._bufferSize)), a.set(new Uint8Array(e, u), 0), this._stashUsed += o, this._stashByteStart = t + u); else if (0 === this._stashUsed) {
                                    var o;
                                    (u = this._dispatchChunks(e, t)) < e.byteLength && ((o = e.byteLength - u) > this._bufferSize && this._expandBuffer(o), (a = new Uint8Array(this._stashBuffer, 0, this._bufferSize)).set(new Uint8Array(e, u), 0), this._stashUsed += o, this._stashByteStart = t + u)
                                } else {
                                    var a, u;
                                    if (this._stashUsed + e.byteLength > this._bufferSize && this._expandBuffer(this._stashUsed + e.byteLength), (a = new Uint8Array(this._stashBuffer, 0, this._bufferSize)).set(new Uint8Array(e), this._stashUsed), this._stashUsed += e.byteLength, (u = this._dispatchChunks(this._stashBuffer.slice(0, this._stashUsed), this._stashByteStart)) < this._stashUsed && u > 0) {
                                        var l = new Uint8Array(this._stashBuffer, u);
                                        a.set(l, 0)
                                    }
                                    this._stashUsed -= u, this._stashByteStart += u
                                }
                            }
                        }, e.prototype._flushStashBuffer = function (e) {
                            if (this._stashUsed > 0) {
                                var t = this._stashBuffer.slice(0, this._stashUsed),
                                    i = this._dispatchChunks(t, this._stashByteStart), n = t.byteLength - i;
                                if (i < t.byteLength) {
                                    if (!e) {
                                        if (i > 0) {
                                            var s = new Uint8Array(this._stashBuffer, 0, this._bufferSize),
                                                o = new Uint8Array(t, i);
                                            s.set(o, 0), this._stashUsed = o.byteLength, this._stashByteStart += i
                                        }
                                        return 0
                                    }
                                    r.default.w(this.TAG, n + " bytes unconsumed data remain when flush buffer, dropped")
                                }
                                return this._stashUsed = 0, this._stashByteStart = 0, n
                            }
                            return 0
                        }, e.prototype._onLoaderComplete = function (e, t) {
                            this._flushStashBuffer(!0), this._onComplete && this._onComplete(this._extraData)
                        }, e.prototype._onLoaderError = function (e, t) {
                            switch (r.default.e(this.TAG, "Loader error, code = " + t.code + ", msg = " + t.msg), this._flushStashBuffer(!1), this._isEarlyEofReconnecting && (this._isEarlyEofReconnecting = !1, e = s.LoaderErrors.UNRECOVERABLE_EARLY_EOF), e) {
                                case s.LoaderErrors.EARLY_EOF:
                                    if (!this._config.isLive && this._totalLength) {
                                        var i = this._currentRange.to + 1;
                                        return void (i < this._totalLength && (r.default.w(this.TAG, "Connection lost, trying reconnect..."), this._isEarlyEofReconnecting = !0, this._internalSeek(i, !1)))
                                    }
                                    e = s.LoaderErrors.UNRECOVERABLE_EARLY_EOF;
                                case s.LoaderErrors.UNRECOVERABLE_EARLY_EOF:
                                case s.LoaderErrors.CONNECTING_TIMEOUT:
                                case s.LoaderErrors.HTTP_STATUS_CODE_INVALID:
                                case s.LoaderErrors.EXCEPTION:
                            }
                            if (!this._onError) throw new c.RuntimeException("IOException: " + t.msg);
                            this._onError(e, t)
                        }, e
                    }();
                t.default = f
            }, "./src/io/loader.js":
            /*!**************************!*\
      !*** ./src/io/loader.js ***!
      \**************************/function (e, t, i) {
                i.r(t), i.d(t, {
                    LoaderStatus: function () {
                        return n
                    }, LoaderErrors: function () {
                        return s
                    }, BaseLoader: function () {
                        return o
                    }
                });
                var r = i(/*! ../utils/exception.js */"./src/utils/exception.js"),
                    n = {kIdle: 0, kConnecting: 1, kBuffering: 2, kError: 3, kComplete: 4}, s = {
                        OK: "OK",
                        EXCEPTION: "Exception",
                        HTTP_STATUS_CODE_INVALID: "HttpStatusCodeInvalid",
                        CONNECTING_TIMEOUT: "ConnectingTimeout",
                        EARLY_EOF: "EarlyEof",
                        UNRECOVERABLE_EARLY_EOF: "UnrecoverableEarlyEof"
                    }, o = function () {
                        function e(e) {
                            this._type = e || "undefined", this._status = n.kIdle, this._needStash = !1, this._onContentLengthKnown = null, this._onURLRedirect = null, this._onDataArrival = null, this._onError = null, this._onComplete = null
                        }

                        return e.prototype.destroy = function () {
                            this._status = n.kIdle, this._onContentLengthKnown = null, this._onURLRedirect = null, this._onDataArrival = null, this._onError = null, this._onComplete = null
                        }, e.prototype.isWorking = function () {
                            return this._status === n.kConnecting || this._status === n.kBuffering
                        }, Object.defineProperty(e.prototype, "type", {
                            get: function () {
                                return this._type
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "status", {
                            get: function () {
                                return this._status
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "needStashBuffer", {
                            get: function () {
                                return this._needStash
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "onContentLengthKnown", {
                            get: function () {
                                return this._onContentLengthKnown
                            }, set: function (e) {
                                this._onContentLengthKnown = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "onURLRedirect", {
                            get: function () {
                                return this._onURLRedirect
                            }, set: function (e) {
                                this._onURLRedirect = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "onDataArrival", {
                            get: function () {
                                return this._onDataArrival
                            }, set: function (e) {
                                this._onDataArrival = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "onError", {
                            get: function () {
                                return this._onError
                            }, set: function (e) {
                                this._onError = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "onComplete", {
                            get: function () {
                                return this._onComplete
                            }, set: function (e) {
                                this._onComplete = e
                            }, enumerable: !1, configurable: !0
                        }), e.prototype.open = function (e, t) {
                            throw new r.NotImplementedException("Unimplemented abstract function!")
                        }, e.prototype.abort = function () {
                            throw new r.NotImplementedException("Unimplemented abstract function!")
                        }, e
                    }()
            }, "./src/io/param-seek-handler.js":
            /*!**************************************!*\
      !*** ./src/io/param-seek-handler.js ***!
      \**************************************/function (e, t, i) {
                i.r(t);
                var r = function () {
                    function e(e, t) {
                        this._startName = e, this._endName = t
                    }

                    return e.prototype.getConfig = function (e, t) {
                        var i = e;
                        if (0 !== t.from || -1 !== t.to) {
                            var r = !0;
                            -1 === i.indexOf("?") && (i += "?", r = !1), r && (i += "&"), i += this._startName + "=" + t.from.toString(), -1 !== t.to && (i += "&" + this._endName + "=" + t.to.toString())
                        }
                        return {url: i, headers: {}}
                    }, e.prototype.removeURLParameters = function (e) {
                        var t = e.split("?")[0], i = void 0, r = e.indexOf("?");
                        -1 !== r && (i = e.substring(r + 1));
                        var n = "";
                        if (null != i && i.length > 0) for (var s = i.split("&"), o = 0; o < s.length; o++) {
                            var a = s[o].split("="), u = o > 0;
                            a[0] !== this._startName && a[0] !== this._endName && (u && (n += "&"), n += s[o])
                        }
                        return 0 === n.length ? t : t + "?" + n
                    }, e
                }();
                t.default = r
            }, "./src/io/range-seek-handler.js":
            /*!**************************************!*\
      !*** ./src/io/range-seek-handler.js ***!
      \**************************************/function (e, t, i) {
                i.r(t);
                var r = function () {
                    function e(e) {
                        this._zeroStart = e || !1
                    }

                    return e.prototype.getConfig = function (e, t) {
                        var i = {};
                        if (0 !== t.from || -1 !== t.to) {
                            var r = void 0;
                            r = -1 !== t.to ? "bytes=" + t.from.toString() + "-" + t.to.toString() : "bytes=" + t.from.toString() + "-", i.Range = r
                        } else this._zeroStart && (i.Range = "bytes=0-");
                        return {url: e, headers: i}
                    }, e.prototype.removeURLParameters = function (e) {
                        return e
                    }, e
                }();
                t.default = r
            }, "./src/io/speed-sampler.js":
            /*!*********************************!*\
      !*** ./src/io/speed-sampler.js ***!
      \*********************************/function (e, t, i) {
                i.r(t);
                var r = function () {
                    function e() {
                        this._firstCheckpoint = 0, this._lastCheckpoint = 0, this._intervalBytes = 0, this._totalBytes = 0, this._lastSecondBytes = 0, self.performance && self.performance.now ? this._now = self.performance.now.bind(self.performance) : this._now = Date.now
                    }

                    return e.prototype.reset = function () {
                        this._firstCheckpoint = this._lastCheckpoint = 0, this._totalBytes = this._intervalBytes = 0, this._lastSecondBytes = 0
                    }, e.prototype.addBytes = function (e) {
                        0 === this._firstCheckpoint ? (this._firstCheckpoint = this._now(), this._lastCheckpoint = this._firstCheckpoint, this._intervalBytes += e, this._totalBytes += e) : this._now() - this._lastCheckpoint < 1e3 ? (this._intervalBytes += e, this._totalBytes += e) : (this._lastSecondBytes = this._intervalBytes, this._intervalBytes = e, this._totalBytes += e, this._lastCheckpoint = this._now())
                    }, Object.defineProperty(e.prototype, "currentKBps", {
                        get: function () {
                            this.addBytes(0);
                            var e = (this._now() - this._lastCheckpoint) / 1e3;
                            return 0 == e && (e = 1), this._intervalBytes / e / 1024
                        }, enumerable: !1, configurable: !0
                    }), Object.defineProperty(e.prototype, "lastSecondKBps", {
                        get: function () {
                            return this.addBytes(0), 0 !== this._lastSecondBytes ? this._lastSecondBytes / 1024 : this._now() - this._lastCheckpoint >= 500 ? this.currentKBps : 0
                        }, enumerable: !1, configurable: !0
                    }), Object.defineProperty(e.prototype, "averageKBps", {
                        get: function () {
                            var e = (this._now() - this._firstCheckpoint) / 1e3;
                            return this._totalBytes / e / 1024
                        }, enumerable: !1, configurable: !0
                    }), e
                }();
                t.default = r
            }, "./src/io/websocket-loader.js":
            /*!************************************!*\
      !*** ./src/io/websocket-loader.js ***!
      \************************************/function (e, t, i) {
                i.r(t);
                var r, n = i(/*! ./loader.js */"./src/io/loader.js"),
                    s = i(/*! ../utils/exception.js */"./src/utils/exception.js"), o = (r = function (e, t) {
                        return r = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                            e.__proto__ = t
                        } || function (e, t) {
                            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
                        }, r(e, t)
                    }, function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                        function i() {
                            this.constructor = e
                        }

                        r(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i)
                    }), a = function (e) {
                        function t() {
                            var t = e.call(this, "websocket-loader") || this;
                            return t.TAG = "WebSocketLoader", t._needStash = !0, t._ws = null, t._requestAbort = !1, t._receivedLength = 0, t
                        }

                        return o(t, e), t.isSupported = function () {
                            try {
                                return void 0 !== self.WebSocket
                            } catch (e) {
                                return !1
                            }
                        }, t.prototype.destroy = function () {
                            this._ws && this.abort(), e.prototype.destroy.call(this)
                        }, t.prototype.open = function (e) {
                            try {
                                var t = this._ws = new self.WebSocket(e.url);
                                t.binaryType = "arraybuffer", t.onopen = this._onWebSocketOpen.bind(this), t.onclose = this._onWebSocketClose.bind(this), t.onmessage = this._onWebSocketMessage.bind(this), t.onerror = this._onWebSocketError.bind(this), this._status = n.LoaderStatus.kConnecting
                            } catch (e) {
                                this._status = n.LoaderStatus.kError;
                                var i = {code: e.code, msg: e.message};
                                if (!this._onError) throw new s.RuntimeException(i.msg);
                                this._onError(n.LoaderErrors.EXCEPTION, i)
                            }
                        }, t.prototype.abort = function () {
                            var e = this._ws;
                            !e || 0 !== e.readyState && 1 !== e.readyState || (this._requestAbort = !0, e.close()), this._ws = null, this._status = n.LoaderStatus.kComplete
                        }, t.prototype._onWebSocketOpen = function (e) {
                            this._status = n.LoaderStatus.kBuffering
                        }, t.prototype._onWebSocketClose = function (e) {
                            !0 !== this._requestAbort ? (this._status = n.LoaderStatus.kComplete, this._onComplete && this._onComplete(0, this._receivedLength - 1)) : this._requestAbort = !1
                        }, t.prototype._onWebSocketMessage = function (e) {
                            var t = this;
                            if (e.data instanceof ArrayBuffer) this._dispatchArrayBuffer(e.data); else if (e.data instanceof Blob) {
                                var i = new FileReader;
                                i.onload = function () {
                                    t._dispatchArrayBuffer(i.result)
                                }, i.readAsArrayBuffer(e.data)
                            } else {
                                this._status = n.LoaderStatus.kError;
                                var r = {code: -1, msg: "Unsupported WebSocket message type: " + e.data.constructor.name};
                                if (!this._onError) throw new s.RuntimeException(r.msg);
                                this._onError(n.LoaderErrors.EXCEPTION, r)
                            }
                        }, t.prototype._dispatchArrayBuffer = function (e) {
                            var t = e, i = this._receivedLength;
                            this._receivedLength += t.byteLength, this._onDataArrival && this._onDataArrival(t, i, this._receivedLength)
                        }, t.prototype._onWebSocketError = function (e) {
                            this._status = n.LoaderStatus.kError;
                            var t = {code: e.code, msg: e.message};
                            if (!this._onError) throw new s.RuntimeException(t.msg);
                            this._onError(n.LoaderErrors.EXCEPTION, t)
                        }, t
                    }(n.BaseLoader);
                t.default = a
            }, "./src/io/xhr-moz-chunked-loader.js":
            /*!******************************************!*\
      !*** ./src/io/xhr-moz-chunked-loader.js ***!
      \******************************************/function (e, t, i) {
                i.r(t);
                var r, n = i(/*! ../utils/logger.js */"./src/utils/logger.js"),
                    s = i(/*! ./loader.js */"./src/io/loader.js"),
                    o = i(/*! ../utils/exception.js */"./src/utils/exception.js"), a = (r = function (e, t) {
                        return r = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                            e.__proto__ = t
                        } || function (e, t) {
                            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
                        }, r(e, t)
                    }, function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                        function i() {
                            this.constructor = e
                        }

                        r(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i)
                    }), u = function (e) {
                        function t(t, i) {
                            var r = e.call(this, "xhr-moz-chunked-loader") || this;
                            return r.TAG = "MozChunkedLoader", r._seekHandler = t, r._config = i, r._needStash = !0, r._xhr = null, r._requestAbort = !1, r._contentLength = null, r._receivedLength = 0, r
                        }

                        return a(t, e), t.isSupported = function () {
                            try {
                                var e = new XMLHttpRequest;
                                return e.open("GET", "https://example.com", !0), e.responseType = "moz-chunked-arraybuffer", "moz-chunked-arraybuffer" === e.responseType
                            } catch (e) {
                                return n.default.w("MozChunkedLoader", e.message), !1
                            }
                        }, t.prototype.destroy = function () {
                            this.isWorking() && this.abort(), this._xhr && (this._xhr.onreadystatechange = null, this._xhr.onprogress = null, this._xhr.onloadend = null, this._xhr.onerror = null, this._xhr = null), e.prototype.destroy.call(this)
                        }, t.prototype.open = function (e, t) {
                            this._dataSource = e, this._range = t;
                            var i = e.url;
                            this._config.reuseRedirectedURL && null != e.redirectedURL && (i = e.redirectedURL);
                            var r = this._seekHandler.getConfig(i, t);
                            this._requestURL = r.url;
                            var n = this._xhr = new XMLHttpRequest;
                            if (n.open("GET", r.url, !0), n.responseType = "moz-chunked-arraybuffer", n.onreadystatechange = this._onReadyStateChange.bind(this), n.onprogress = this._onProgress.bind(this), n.onloadend = this._onLoadEnd.bind(this), n.onerror = this._onXhrError.bind(this), e.withCredentials && (n.withCredentials = !0), "object" == typeof r.headers) {
                                var o = r.headers;
                                for (var a in o) o.hasOwnProperty(a) && n.setRequestHeader(a, o[a])
                            }
                            if ("object" == typeof this._config.headers) for (var a in o = this._config.headers) o.hasOwnProperty(a) && n.setRequestHeader(a, o[a]);
                            this._status = s.LoaderStatus.kConnecting, n.send()
                        }, t.prototype.abort = function () {
                            this._requestAbort = !0, this._xhr && this._xhr.abort(), this._status = s.LoaderStatus.kComplete
                        }, t.prototype._onReadyStateChange = function (e) {
                            var t = e.target;
                            if (2 === t.readyState) {
                                if (null != t.responseURL && t.responseURL !== this._requestURL && this._onURLRedirect) {
                                    var i = this._seekHandler.removeURLParameters(t.responseURL);
                                    this._onURLRedirect(i)
                                }
                                if (0 !== t.status && (t.status < 200 || t.status > 299)) {
                                    if (this._status = s.LoaderStatus.kError, !this._onError) throw new o.RuntimeException("MozChunkedLoader: Http code invalid, " + t.status + " " + t.statusText);
                                    this._onError(s.LoaderErrors.HTTP_STATUS_CODE_INVALID, {
                                        code: t.status,
                                        msg: t.statusText
                                    })
                                } else this._status = s.LoaderStatus.kBuffering
                            }
                        }, t.prototype._onProgress = function (e) {
                            if (this._status !== s.LoaderStatus.kError) {
                                null === this._contentLength && null !== e.total && 0 !== e.total && (this._contentLength = e.total, this._onContentLengthKnown && this._onContentLengthKnown(this._contentLength));
                                var t = e.target.response, i = this._range.from + this._receivedLength;
                                this._receivedLength += t.byteLength, this._onDataArrival && this._onDataArrival(t, i, this._receivedLength)
                            }
                        }, t.prototype._onLoadEnd = function (e) {
                            !0 !== this._requestAbort ? this._status !== s.LoaderStatus.kError && (this._status = s.LoaderStatus.kComplete, this._onComplete && this._onComplete(this._range.from, this._range.from + this._receivedLength - 1)) : this._requestAbort = !1
                        }, t.prototype._onXhrError = function (e) {
                            this._status = s.LoaderStatus.kError;
                            var t = 0, i = null;
                            if (this._contentLength && e.loaded < this._contentLength ? (t = s.LoaderErrors.EARLY_EOF, i = {
                                code: -1,
                                msg: "Moz-Chunked stream meet Early-Eof"
                            }) : (t = s.LoaderErrors.EXCEPTION, i = {
                                code: -1,
                                msg: e.constructor.name + " " + e.type
                            }), !this._onError) throw new o.RuntimeException(i.msg);
                            this._onError(t, i)
                        }, t
                    }(s.BaseLoader);
                t.default = u
            }, "./src/io/xhr-range-loader.js":
            /*!************************************!*\
      !*** ./src/io/xhr-range-loader.js ***!
      \************************************/function (e, t, i) {
                i.r(t);
                var r, n = i(/*! ../utils/logger.js */"./src/utils/logger.js"),
                    s = i(/*! ./speed-sampler.js */"./src/io/speed-sampler.js"),
                    o = i(/*! ./loader.js */"./src/io/loader.js"),
                    a = i(/*! ../utils/exception.js */"./src/utils/exception.js"), u = (r = function (e, t) {
                        return r = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                            e.__proto__ = t
                        } || function (e, t) {
                            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
                        }, r(e, t)
                    }, function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                        function i() {
                            this.constructor = e
                        }

                        r(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i)
                    }), l = function (e) {
                        function t(t, i) {
                            var r = e.call(this, "xhr-range-loader") || this;
                            return r.TAG = "RangeLoader", r._seekHandler = t, r._config = i, r._needStash = !1, r._chunkSizeKBList = [128, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 5120, 6144, 7168, 8192], r._currentChunkSizeKB = 384, r._currentSpeedNormalized = 0, r._zeroSpeedChunkCount = 0, r._xhr = null, r._speedSampler = new s.default, r._requestAbort = !1, r._waitForTotalLength = !1, r._totalLengthReceived = !1, r._currentRequestURL = null, r._currentRedirectedURL = null, r._currentRequestRange = null, r._totalLength = null, r._contentLength = null, r._receivedLength = 0, r._lastTimeLoaded = 0, r
                        }

                        return u(t, e), t.isSupported = function () {
                            try {
                                var e = new XMLHttpRequest;
                                return e.open("GET", "https://example.com", !0), e.responseType = "arraybuffer", "arraybuffer" === e.responseType
                            } catch (e) {
                                return n.default.w("RangeLoader", e.message), !1
                            }
                        }, t.prototype.destroy = function () {
                            this.isWorking() && this.abort(), this._xhr && (this._xhr.onreadystatechange = null, this._xhr.onprogress = null, this._xhr.onload = null, this._xhr.onerror = null, this._xhr = null), e.prototype.destroy.call(this)
                        }, Object.defineProperty(t.prototype, "currentSpeed", {
                            get: function () {
                                return this._speedSampler.lastSecondKBps
                            }, enumerable: !1, configurable: !0
                        }), t.prototype.open = function (e, t) {
                            this._dataSource = e, this._range = t, this._status = o.LoaderStatus.kConnecting;
                            var i = !1;
                            null != this._dataSource.filesize && 0 !== this._dataSource.filesize && (i = !0, this._totalLength = this._dataSource.filesize), this._totalLengthReceived || i ? this._openSubRange() : (this._waitForTotalLength = !0, this._internalOpen(this._dataSource, {
                                from: 0,
                                to: -1
                            }))
                        }, t.prototype._openSubRange = function () {
                            var e = 1024 * this._currentChunkSizeKB, t = this._range.from + this._receivedLength, i = t + e;
                            null != this._contentLength && i - this._range.from >= this._contentLength && (i = this._range.from + this._contentLength - 1), this._currentRequestRange = {
                                from: t,
                                to: i
                            }, this._internalOpen(this._dataSource, this._currentRequestRange)
                        }, t.prototype._internalOpen = function (e, t) {
                            this._lastTimeLoaded = 0;
                            var i = e.url;
                            this._config.reuseRedirectedURL && (null != this._currentRedirectedURL ? i = this._currentRedirectedURL : null != e.redirectedURL && (i = e.redirectedURL));
                            var r = this._seekHandler.getConfig(i, t);
                            this._currentRequestURL = r.url;
                            var n = this._xhr = new XMLHttpRequest;
                            if (n.open("GET", r.url, !0), n.responseType = "arraybuffer", n.onreadystatechange = this._onReadyStateChange.bind(this), n.onprogress = this._onProgress.bind(this), n.onload = this._onLoad.bind(this), n.onerror = this._onXhrError.bind(this), e.withCredentials && (n.withCredentials = !0), "object" == typeof r.headers) {
                                var s = r.headers;
                                for (var o in s) s.hasOwnProperty(o) && n.setRequestHeader(o, s[o])
                            }
                            if ("object" == typeof this._config.headers) for (var o in s = this._config.headers) s.hasOwnProperty(o) && n.setRequestHeader(o, s[o]);
                            n.send()
                        }, t.prototype.abort = function () {
                            this._requestAbort = !0, this._internalAbort(), this._status = o.LoaderStatus.kComplete
                        }, t.prototype._internalAbort = function () {
                            this._xhr && (this._xhr.onreadystatechange = null, this._xhr.onprogress = null, this._xhr.onload = null, this._xhr.onerror = null, this._xhr.abort(), this._xhr = null)
                        }, t.prototype._onReadyStateChange = function (e) {
                            var t = e.target;
                            if (2 === t.readyState) {
                                if (null != t.responseURL) {
                                    var i = this._seekHandler.removeURLParameters(t.responseURL);
                                    t.responseURL !== this._currentRequestURL && i !== this._currentRedirectedURL && (this._currentRedirectedURL = i, this._onURLRedirect && this._onURLRedirect(i))
                                }
                                if (t.status >= 200 && t.status <= 299) {
                                    if (this._waitForTotalLength) return;
                                    this._status = o.LoaderStatus.kBuffering
                                } else {
                                    if (this._status = o.LoaderStatus.kError, !this._onError) throw new a.RuntimeException("RangeLoader: Http code invalid, " + t.status + " " + t.statusText);
                                    this._onError(o.LoaderErrors.HTTP_STATUS_CODE_INVALID, {
                                        code: t.status,
                                        msg: t.statusText
                                    })
                                }
                            }
                        }, t.prototype._onProgress = function (e) {
                            if (this._status !== o.LoaderStatus.kError) {
                                if (null === this._contentLength) {
                                    var t = !1;
                                    if (this._waitForTotalLength) {
                                        this._waitForTotalLength = !1, this._totalLengthReceived = !0, t = !0;
                                        var i = e.total;
                                        this._internalAbort(), null != i & 0 !== i && (this._totalLength = i)
                                    }
                                    if (-1 === this._range.to ? this._contentLength = this._totalLength - this._range.from : this._contentLength = this._range.to - this._range.from + 1, t) return void this._openSubRange();
                                    this._onContentLengthKnown && this._onContentLengthKnown(this._contentLength)
                                }
                                var r = e.loaded - this._lastTimeLoaded;
                                this._lastTimeLoaded = e.loaded, this._speedSampler.addBytes(r)
                            }
                        }, t.prototype._normalizeSpeed = function (e) {
                            var t = this._chunkSizeKBList, i = t.length - 1, r = 0, n = 0, s = i;
                            if (e < t[0]) return t[0];
                            for (; n <= s;) {
                                if ((r = n + Math.floor((s - n) / 2)) === i || e >= t[r] && e < t[r + 1]) return t[r];
                                t[r] < e ? n = r + 1 : s = r - 1
                            }
                        }, t.prototype._onLoad = function (e) {
                            if (this._status !== o.LoaderStatus.kError) if (this._waitForTotalLength) this._waitForTotalLength = !1; else {
                                this._lastTimeLoaded = 0;
                                var t = this._speedSampler.lastSecondKBps;
                                if (0 === t && (this._zeroSpeedChunkCount++, this._zeroSpeedChunkCount >= 3 && (t = this._speedSampler.currentKBps)), 0 !== t) {
                                    var i = this._normalizeSpeed(t);
                                    this._currentSpeedNormalized !== i && (this._currentSpeedNormalized = i, this._currentChunkSizeKB = i)
                                }
                                var r = e.target.response, n = this._range.from + this._receivedLength;
                                this._receivedLength += r.byteLength;
                                var s = !1;
                                null != this._contentLength && this._receivedLength < this._contentLength ? this._openSubRange() : s = !0, this._onDataArrival && this._onDataArrival(r, n, this._receivedLength), s && (this._status = o.LoaderStatus.kComplete, this._onComplete && this._onComplete(this._range.from, this._range.from + this._receivedLength - 1))
                            }
                        }, t.prototype._onXhrError = function (e) {
                            this._status = o.LoaderStatus.kError;
                            var t = 0, i = null;
                            if (this._contentLength && this._receivedLength > 0 && this._receivedLength < this._contentLength ? (t = o.LoaderErrors.EARLY_EOF, i = {
                                code: -1,
                                msg: "RangeLoader meet Early-Eof"
                            }) : (t = o.LoaderErrors.EXCEPTION, i = {
                                code: -1,
                                msg: e.constructor.name + " " + e.type
                            }), !this._onError) throw new a.RuntimeException(i.msg);
                            this._onError(t, i)
                        }, t
                    }(o.BaseLoader);
                t.default = l
            }, "./src/player/flv-player.js":
            /*!**********************************!*\
      !*** ./src/player/flv-player.js ***!
      \**********************************/function (e, t, i) {
                i.r(t);
                var r = i(/*! events */"./node_modules/events/events.js"), n = i.n(r),
                    s = i(/*! ../utils/logger.js */"./src/utils/logger.js"),
                    o = i(/*! ../utils/browser.js */"./src/utils/browser.js"),
                    a = i(/*! ./player-events.js */"./src/player/player-events.js"),
                    u = i(/*! ../core/transmuxer.js */"./src/core/transmuxer.js"),
                    l = i(/*! ../core/transmuxing-events.js */"./src/core/transmuxing-events.js"),
                    d = i(/*! ../core/mse-controller.js */"./src/core/mse-controller.js"),
                    h = i(/*! ../core/mse-events.js */"./src/core/mse-events.js"),
                    c = i(/*! ./player-errors.js */"./src/player/player-errors.js"),
                    f = i(/*! ../config.js */"./src/config.js"),
                    _ = i(/*! ../utils/exception.js */"./src/utils/exception.js"), p = function () {
                        function e(e, t) {
                            if (this.TAG = "FlvPlayer", this._type = "FlvPlayer", this._emitter = new (n()), this._config = (0, f.createDefaultConfig)(), "object" == typeof t && Object.assign(this._config, t), "flv" !== e.type.toLowerCase()) throw new _.InvalidArgumentException("FlvPlayer requires an flv MediaDataSource input!");
                            !0 === e.isLive && (this._config.isLive = !0), this.e = {
                                onvLoadedMetadata: this._onvLoadedMetadata.bind(this),
                                onvSeeking: this._onvSeeking.bind(this),
                                onvCanPlay: this._onvCanPlay.bind(this),
                                onvStalled: this._onvStalled.bind(this),
                                onvProgress: this._onvProgress.bind(this)
                            }, self.performance && self.performance.now ? this._now = self.performance.now.bind(self.performance) : this._now = Date.now, this._pendingSeekTime = null, this._requestSetTime = !1, this._seekpointRecord = null, this._progressChecker = null, this._mediaDataSource = e, this._mediaElement = null, this._msectl = null, this._transmuxer = null, this._mseSourceOpened = !1, this._hasPendingLoad = !1, this._receivedCanPlay = !1, this._mediaInfo = null, this._statisticsInfo = null;
                            var i = o.default.chrome && (o.default.version.major < 50 || 50 === o.default.version.major && o.default.version.build < 2661);
                            this._alwaysSeekKeyframe = !!(i || o.default.msedge || o.default.msie), this._alwaysSeekKeyframe && (this._config.accurateSeek = !1)
                        }

                        return e.prototype.destroy = function () {
                            null != this._progressChecker && (window.clearInterval(this._progressChecker), this._progressChecker = null), this._transmuxer && this.unload(), this._mediaElement && this.detachMediaElement(), this.e = null, this._mediaDataSource = null, this._emitter.removeAllListeners(), this._emitter = null
                        }, e.prototype.on = function (e, t) {
                            var i = this;
                            e === a.default.MEDIA_INFO ? null != this._mediaInfo && Promise.resolve().then((function () {
                                i._emitter.emit(a.default.MEDIA_INFO, i.mediaInfo)
                            })) : e === a.default.STATISTICS_INFO && null != this._statisticsInfo && Promise.resolve().then((function () {
                                i._emitter.emit(a.default.STATISTICS_INFO, i.statisticsInfo)
                            })), this._emitter.addListener(e, t)
                        }, e.prototype.off = function (e, t) {
                            this._emitter.removeListener(e, t)
                        }, e.prototype.attachMediaElement = function (e) {
                            var t = this;
                            if (this._mediaElement = e, e.addEventListener("loadedmetadata", this.e.onvLoadedMetadata), e.addEventListener("seeking", this.e.onvSeeking), e.addEventListener("canplay", this.e.onvCanPlay), e.addEventListener("stalled", this.e.onvStalled), e.addEventListener("progress", this.e.onvProgress), this._msectl = new d.default(this._config), this._msectl.on(h.default.UPDATE_END, this._onmseUpdateEnd.bind(this)), this._msectl.on(h.default.BUFFER_FULL, this._onmseBufferFull.bind(this)), this._msectl.on(h.default.SOURCE_OPEN, (function () {
                                t._mseSourceOpened = !0, t._hasPendingLoad && (t._hasPendingLoad = !1, t.load())
                            })), this._msectl.on(h.default.ERROR, (function (e) {
                                t._emitter.emit(a.default.ERROR, c.ErrorTypes.MEDIA_ERROR, c.ErrorDetails.MEDIA_MSE_ERROR, e)
                            })), this._msectl.attachMediaElement(e), null != this._pendingSeekTime) try {
                                e.currentTime = this._pendingSeekTime, this._pendingSeekTime = null
                            } catch (e) {
                            }
                        }, e.prototype.detachMediaElement = function () {
                            this._mediaElement && (this._msectl.detachMediaElement(), this._mediaElement.removeEventListener("loadedmetadata", this.e.onvLoadedMetadata), this._mediaElement.removeEventListener("seeking", this.e.onvSeeking), this._mediaElement.removeEventListener("canplay", this.e.onvCanPlay), this._mediaElement.removeEventListener("stalled", this.e.onvStalled), this._mediaElement.removeEventListener("progress", this.e.onvProgress), this._mediaElement = null), this._msectl && (this._msectl.destroy(), this._msectl = null)
                        }, e.prototype.load = function () {
                            var e = this;
                            if (!this._mediaElement) throw new _.IllegalStateException("HTMLMediaElement must be attached before load()!");
                            if (this._transmuxer) throw new _.IllegalStateException("FlvPlayer.load() has been called, please call unload() first!");
                            this._hasPendingLoad || (this._config.deferLoadAfterSourceOpen && !1 === this._mseSourceOpened ? this._hasPendingLoad = !0 : (this._mediaElement.readyState > 0 && (this._requestSetTime = !0, this._mediaElement.currentTime = 0), this._transmuxer = new u.default(this._mediaDataSource, this._config), this._transmuxer.on(l.default.INIT_SEGMENT, (function (t, i) {
                                e._msectl.appendInitSegment(i)
                            })), this._transmuxer.on(l.default.MEDIA_SEGMENT, (function (t, i) {
                                if (e._msectl.appendMediaSegment(i), e._config.lazyLoad && !e._config.isLive) {
                                    var r = e._mediaElement.currentTime;
                                    i.info.endDts >= 1e3 * (r + e._config.lazyLoadMaxDuration) && null == e._progressChecker && (s.default.v(e.TAG, "Maximum buffering duration exceeded, suspend transmuxing task"), e._suspendTransmuxer())
                                }
                            })), this._transmuxer.on(l.default.LOADING_COMPLETE, (function () {
                                e._msectl.endOfStream(), e._emitter.emit(a.default.LOADING_COMPLETE)
                            })), this._transmuxer.on(l.default.RECOVERED_EARLY_EOF, (function () {
                                e._emitter.emit(a.default.RECOVERED_EARLY_EOF)
                            })), this._transmuxer.on(l.default.IO_ERROR, (function (t, i) {
                                e._emitter.emit(a.default.ERROR, c.ErrorTypes.NETWORK_ERROR, t, i)
                            })), this._transmuxer.on(l.default.DEMUX_ERROR, (function (t, i) {
                                e._emitter.emit(a.default.ERROR, c.ErrorTypes.MEDIA_ERROR, t, {code: -1, msg: i})
                            })), this._transmuxer.on(l.default.MEDIA_INFO, (function (t) {
                                e._mediaInfo = t, e._emitter.emit(a.default.MEDIA_INFO, Object.assign({}, t))
                            })), this._transmuxer.on(l.default.METADATA_ARRIVED, (function (t) {
                                e._emitter.emit(a.default.METADATA_ARRIVED, t)
                            })), this._transmuxer.on(l.default.SCRIPTDATA_ARRIVED, (function (t) {
                                e._emitter.emit(a.default.SCRIPTDATA_ARRIVED, t)
                            })), this._transmuxer.on(l.default.STATISTICS_INFO, (function (t) {
                                e._statisticsInfo = e._fillStatisticsInfo(t), e._emitter.emit(a.default.STATISTICS_INFO, Object.assign({}, e._statisticsInfo))
                            })), this._transmuxer.on(l.default.RECOMMEND_SEEKPOINT, (function (t) {
                                e._mediaElement && !e._config.accurateSeek && (e._requestSetTime = !0, e._mediaElement.currentTime = t / 1e3)
                            })), this._transmuxer.open()))
                        }, e.prototype.unload = function () {
                            this._mediaElement && this._mediaElement.pause(), this._msectl && this._msectl.seek(0), this._transmuxer && (this._transmuxer.close(), this._transmuxer.destroy(), this._transmuxer = null)
                        }, e.prototype.play = function () {
                            return this._mediaElement.play()
                        }, e.prototype.pause = function () {
                            this._mediaElement.pause()
                        }, Object.defineProperty(e.prototype, "type", {
                            get: function () {
                                return this._type
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "buffered", {
                            get: function () {
                                return this._mediaElement.buffered
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "duration", {
                            get: function () {
                                return this._mediaElement.duration
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "volume", {
                            get: function () {
                                return this._mediaElement.volume
                            }, set: function (e) {
                                this._mediaElement.volume = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "muted", {
                            get: function () {
                                return this._mediaElement.muted
                            }, set: function (e) {
                                this._mediaElement.muted = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "currentTime", {
                            get: function () {
                                return this._mediaElement ? this._mediaElement.currentTime : 0
                            }, set: function (e) {
                                this._mediaElement ? this._internalSeek(e) : this._pendingSeekTime = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "mediaInfo", {
                            get: function () {
                                return Object.assign({}, this._mediaInfo)
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "statisticsInfo", {
                            get: function () {
                                return null == this._statisticsInfo && (this._statisticsInfo = {}), this._statisticsInfo = this._fillStatisticsInfo(this._statisticsInfo), Object.assign({}, this._statisticsInfo)
                            }, enumerable: !1, configurable: !0
                        }), e.prototype._fillStatisticsInfo = function (e) {
                            if (e.playerType = this._type, !(this._mediaElement instanceof HTMLVideoElement)) return e;
                            var t = !0, i = 0, r = 0;
                            if (this._mediaElement.getVideoPlaybackQuality) {
                                var n = this._mediaElement.getVideoPlaybackQuality();
                                i = n.totalVideoFrames, r = n.droppedVideoFrames
                            } else null != this._mediaElement.webkitDecodedFrameCount ? (i = this._mediaElement.webkitDecodedFrameCount, r = this._mediaElement.webkitDroppedFrameCount) : t = !1;
                            return t && (e.decodedFrames = i, e.droppedFrames = r), e
                        }, e.prototype._onmseUpdateEnd = function () {
                            if (this._config.lazyLoad && !this._config.isLive) {
                                for (var e = this._mediaElement.buffered, t = this._mediaElement.currentTime, i = 0, r = 0; r < e.length; r++) {
                                    var n = e.start(r), o = e.end(r);
                                    if (n <= t && t < o) {
                                        i = o;
                                        break
                                    }
                                }
                                i >= t + this._config.lazyLoadMaxDuration && null == this._progressChecker && (s.default.v(this.TAG, "Maximum buffering duration exceeded, suspend transmuxing task"), this._suspendTransmuxer())
                            }
                        }, e.prototype._onmseBufferFull = function () {
                            s.default.v(this.TAG, "MSE SourceBuffer is full, suspend transmuxing task"), null == this._progressChecker && this._suspendTransmuxer()
                        }, e.prototype._suspendTransmuxer = function () {
                            this._transmuxer && (this._transmuxer.pause(), null == this._progressChecker && (this._progressChecker = window.setInterval(this._checkProgressAndResume.bind(this), 1e3)))
                        }, e.prototype._checkProgressAndResume = function () {
                            for (var e = this._mediaElement.currentTime, t = this._mediaElement.buffered, i = !1, r = 0; r < t.length; r++) {
                                var n = t.start(r), o = t.end(r);
                                if (e >= n && e < o) {
                                    e >= o - this._config.lazyLoadRecoverDuration && (i = !0);
                                    break
                                }
                            }
                            i && (window.clearInterval(this._progressChecker), this._progressChecker = null, i && (s.default.v(this.TAG, "Continue loading from paused position"), this._transmuxer.resume()))
                        }, e.prototype._isTimepointBuffered = function (e) {
                            for (var t = this._mediaElement.buffered, i = 0; i < t.length; i++) {
                                var r = t.start(i), n = t.end(i);
                                if (e >= r && e < n) return !0
                            }
                            return !1
                        }, e.prototype._internalSeek = function (e) {
                            var t = this._isTimepointBuffered(e), i = !1, r = 0;
                            if (e < 1 && this._mediaElement.buffered.length > 0) {
                                var n = this._mediaElement.buffered.start(0);
                                (n < 1 && e < n || o.default.safari) && (i = !0, r = o.default.safari ? .1 : n)
                            }
                            if (i) this._requestSetTime = !0, this._mediaElement.currentTime = r; else if (t) {
                                if (this._alwaysSeekKeyframe) {
                                    var s = this._msectl.getNearestKeyframe(Math.floor(1e3 * e));
                                    this._requestSetTime = !0, this._mediaElement.currentTime = null != s ? s.dts / 1e3 : e
                                } else this._requestSetTime = !0, this._mediaElement.currentTime = e;
                                null != this._progressChecker && this._checkProgressAndResume()
                            } else null != this._progressChecker && (window.clearInterval(this._progressChecker), this._progressChecker = null), this._msectl.seek(e), this._transmuxer.seek(Math.floor(1e3 * e)), this._config.accurateSeek && (this._requestSetTime = !0, this._mediaElement.currentTime = e)
                        }, e.prototype._checkAndApplyUnbufferedSeekpoint = function () {
                            if (this._seekpointRecord) if (this._seekpointRecord.recordTime <= this._now() - 100) {
                                var e = this._mediaElement.currentTime;
                                this._seekpointRecord = null, this._isTimepointBuffered(e) || (null != this._progressChecker && (window.clearTimeout(this._progressChecker), this._progressChecker = null), this._msectl.seek(e), this._transmuxer.seek(Math.floor(1e3 * e)), this._config.accurateSeek && (this._requestSetTime = !0, this._mediaElement.currentTime = e))
                            } else window.setTimeout(this._checkAndApplyUnbufferedSeekpoint.bind(this), 50)
                        }, e.prototype._checkAndResumeStuckPlayback = function (e) {
                            var t = this._mediaElement;
                            if (e || !this._receivedCanPlay || t.readyState < 2) {
                                var i = t.buffered;
                                i.length > 0 && t.currentTime < i.start(0) && (s.default.w(this.TAG, "Playback seems stuck at " + t.currentTime + ", seek to " + i.start(0)), this._requestSetTime = !0, this._mediaElement.currentTime = i.start(0), this._mediaElement.removeEventListener("progress", this.e.onvProgress))
                            } else this._mediaElement.removeEventListener("progress", this.e.onvProgress)
                        }, e.prototype._onvLoadedMetadata = function (e) {
                            null != this._pendingSeekTime && (this._mediaElement.currentTime = this._pendingSeekTime, this._pendingSeekTime = null)
                        }, e.prototype._onvSeeking = function (e) {
                            var t = this._mediaElement.currentTime, i = this._mediaElement.buffered;
                            if (this._requestSetTime) this._requestSetTime = !1; else {
                                if (t < 1 && i.length > 0) {
                                    var r = i.start(0);
                                    if (r < 1 && t < r || o.default.safari) return this._requestSetTime = !0, void (this._mediaElement.currentTime = o.default.safari ? .1 : r)
                                }
                                if (this._isTimepointBuffered(t)) {
                                    if (this._alwaysSeekKeyframe) {
                                        var n = this._msectl.getNearestKeyframe(Math.floor(1e3 * t));
                                        null != n && (this._requestSetTime = !0, this._mediaElement.currentTime = n.dts / 1e3)
                                    }
                                    null != this._progressChecker && this._checkProgressAndResume()
                                } else this._seekpointRecord = {
                                    seekPoint: t,
                                    recordTime: this._now()
                                }, window.setTimeout(this._checkAndApplyUnbufferedSeekpoint.bind(this), 50)
                            }
                        }, e.prototype._onvCanPlay = function (e) {
                            this._receivedCanPlay = !0, this._mediaElement.removeEventListener("canplay", this.e.onvCanPlay)
                        }, e.prototype._onvStalled = function (e) {
                            this._checkAndResumeStuckPlayback(!0)
                        }, e.prototype._onvProgress = function (e) {
                            this._checkAndResumeStuckPlayback()
                        }, e
                    }();
                t.default = p
            }, "./src/player/native-player.js":
            /*!*************************************!*\
      !*** ./src/player/native-player.js ***!
      \*************************************/function (e, t, i) {
                i.r(t);
                var r = i(/*! events */"./node_modules/events/events.js"), n = i.n(r),
                    s = i(/*! ./player-events.js */"./src/player/player-events.js"),
                    o = i(/*! ../config.js */"./src/config.js"),
                    a = i(/*! ../utils/exception.js */"./src/utils/exception.js"), u = function () {
                        function e(e, t) {
                            if (this.TAG = "NativePlayer", this._type = "NativePlayer", this._emitter = new (n()), this._config = (0, o.createDefaultConfig)(), "object" == typeof t && Object.assign(this._config, t), "flv" === e.type.toLowerCase()) throw new a.InvalidArgumentException("NativePlayer does't support flv MediaDataSource input!");
                            if (e.hasOwnProperty("segments")) throw new a.InvalidArgumentException("NativePlayer(" + e.type + ") doesn't support multipart playback!");
                            this.e = {onvLoadedMetadata: this._onvLoadedMetadata.bind(this)}, this._pendingSeekTime = null, this._statisticsReporter = null, this._mediaDataSource = e, this._mediaElement = null
                        }

                        return e.prototype.destroy = function () {
                            this._mediaElement && (this.unload(), this.detachMediaElement()), this.e = null, this._mediaDataSource = null, this._emitter.removeAllListeners(), this._emitter = null
                        }, e.prototype.on = function (e, t) {
                            var i = this;
                            e === s.default.MEDIA_INFO ? null != this._mediaElement && 0 !== this._mediaElement.readyState && Promise.resolve().then((function () {
                                i._emitter.emit(s.default.MEDIA_INFO, i.mediaInfo)
                            })) : e === s.default.STATISTICS_INFO && null != this._mediaElement && 0 !== this._mediaElement.readyState && Promise.resolve().then((function () {
                                i._emitter.emit(s.default.STATISTICS_INFO, i.statisticsInfo)
                            })), this._emitter.addListener(e, t)
                        }, e.prototype.off = function (e, t) {
                            this._emitter.removeListener(e, t)
                        }, e.prototype.attachMediaElement = function (e) {
                            if (this._mediaElement = e, e.addEventListener("loadedmetadata", this.e.onvLoadedMetadata), null != this._pendingSeekTime) try {
                                e.currentTime = this._pendingSeekTime, this._pendingSeekTime = null
                            } catch (e) {
                            }
                        }, e.prototype.detachMediaElement = function () {
                            this._mediaElement && (this._mediaElement.src = "", this._mediaElement.removeAttribute("src"), this._mediaElement.removeEventListener("loadedmetadata", this.e.onvLoadedMetadata), this._mediaElement = null), null != this._statisticsReporter && (window.clearInterval(this._statisticsReporter), this._statisticsReporter = null)
                        }, e.prototype.load = function () {
                            if (!this._mediaElement) throw new a.IllegalStateException("HTMLMediaElement must be attached before load()!");
                            this._mediaElement.src = this._mediaDataSource.url, this._mediaElement.readyState > 0 && (this._mediaElement.currentTime = 0), this._mediaElement.preload = "auto", this._mediaElement.load(), this._statisticsReporter = window.setInterval(this._reportStatisticsInfo.bind(this), this._config.statisticsInfoReportInterval)
                        }, e.prototype.unload = function () {
                            this._mediaElement && (this._mediaElement.src = "", this._mediaElement.removeAttribute("src")), null != this._statisticsReporter && (window.clearInterval(this._statisticsReporter), this._statisticsReporter = null)
                        }, e.prototype.play = function () {
                            return this._mediaElement.play()
                        }, e.prototype.pause = function () {
                            this._mediaElement.pause()
                        }, Object.defineProperty(e.prototype, "type", {
                            get: function () {
                                return this._type
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "buffered", {
                            get: function () {
                                return this._mediaElement.buffered
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "duration", {
                            get: function () {
                                return this._mediaElement.duration
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "volume", {
                            get: function () {
                                return this._mediaElement.volume
                            }, set: function (e) {
                                this._mediaElement.volume = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "muted", {
                            get: function () {
                                return this._mediaElement.muted
                            }, set: function (e) {
                                this._mediaElement.muted = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "currentTime", {
                            get: function () {
                                return this._mediaElement ? this._mediaElement.currentTime : 0
                            }, set: function (e) {
                                this._mediaElement ? this._mediaElement.currentTime = e : this._pendingSeekTime = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "mediaInfo", {
                            get: function () {
                                var e = {mimeType: (this._mediaElement instanceof HTMLAudioElement ? "audio/" : "video/") + this._mediaDataSource.type};
                                return this._mediaElement && (e.duration = Math.floor(1e3 * this._mediaElement.duration), this._mediaElement instanceof HTMLVideoElement && (e.width = this._mediaElement.videoWidth, e.height = this._mediaElement.videoHeight)), e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "statisticsInfo", {
                            get: function () {
                                var e = {playerType: this._type, url: this._mediaDataSource.url};
                                if (!(this._mediaElement instanceof HTMLVideoElement)) return e;
                                var t = !0, i = 0, r = 0;
                                if (this._mediaElement.getVideoPlaybackQuality) {
                                    var n = this._mediaElement.getVideoPlaybackQuality();
                                    i = n.totalVideoFrames, r = n.droppedVideoFrames
                                } else null != this._mediaElement.webkitDecodedFrameCount ? (i = this._mediaElement.webkitDecodedFrameCount, r = this._mediaElement.webkitDroppedFrameCount) : t = !1;
                                return t && (e.decodedFrames = i, e.droppedFrames = r), e
                            }, enumerable: !1, configurable: !0
                        }), e.prototype._onvLoadedMetadata = function (e) {
                            null != this._pendingSeekTime && (this._mediaElement.currentTime = this._pendingSeekTime, this._pendingSeekTime = null), this._emitter.emit(s.default.MEDIA_INFO, this.mediaInfo)
                        }, e.prototype._reportStatisticsInfo = function () {
                            this._emitter.emit(s.default.STATISTICS_INFO, this.statisticsInfo)
                        }, e
                    }();
                t.default = u
            }, "./src/player/player-errors.js":
            /*!*************************************!*\
      !*** ./src/player/player-errors.js ***!
      \*************************************/function (e, t, i) {
                i.r(t), i.d(t, {
                    ErrorTypes: function () {
                        return s
                    }, ErrorDetails: function () {
                        return o
                    }
                });
                var r = i(/*! ../io/loader.js */"./src/io/loader.js"),
                    n = i(/*! ../demux/demux-errors.js */"./src/demux/demux-errors.js"),
                    s = {NETWORK_ERROR: "NetworkError", MEDIA_ERROR: "MediaError", OTHER_ERROR: "OtherError"}, o = {
                        NETWORK_EXCEPTION: r.LoaderErrors.EXCEPTION,
                        NETWORK_STATUS_CODE_INVALID: r.LoaderErrors.HTTP_STATUS_CODE_INVALID,
                        NETWORK_TIMEOUT: r.LoaderErrors.CONNECTING_TIMEOUT,
                        NETWORK_UNRECOVERABLE_EARLY_EOF: r.LoaderErrors.UNRECOVERABLE_EARLY_EOF,
                        MEDIA_MSE_ERROR: "MediaMSEError",
                        MEDIA_FORMAT_ERROR: n.default.FORMAT_ERROR,
                        MEDIA_FORMAT_UNSUPPORTED: n.default.FORMAT_UNSUPPORTED,
                        MEDIA_CODEC_UNSUPPORTED: n.default.CODEC_UNSUPPORTED
                    }
            }, "./src/player/player-events.js":
            /*!*************************************!*\
      !*** ./src/player/player-events.js ***!
      \*************************************/function (e, t, i) {
                i.r(t), t.default = {
                    ERROR: "error",
                    LOADING_COMPLETE: "loading_complete",
                    RECOVERED_EARLY_EOF: "recovered_early_eof",
                    MEDIA_INFO: "media_info",
                    METADATA_ARRIVED: "metadata_arrived",
                    SCRIPTDATA_ARRIVED: "scriptdata_arrived",
                    STATISTICS_INFO: "statistics_info"
                }
            }, "./src/remux/aac-silent.js":
            /*!*********************************!*\
      !*** ./src/remux/aac-silent.js ***!
      \*********************************/function (e, t, i) {
                i.r(t);
                var r = function () {
                    function e() {
                    }

                    return e.getSilentFrame = function (e, t) {
                        if ("mp4a.40.2" === e) {
                            if (1 === t) return new Uint8Array([0, 200, 0, 128, 35, 128]);
                            if (2 === t) return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]);
                            if (3 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]);
                            if (4 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]);
                            if (5 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]);
                            if (6 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224])
                        } else {
                            if (1 === t) return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                            if (2 === t) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                            if (3 === t) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94])
                        }
                        return null
                    }, e
                }();
                t.default = r
            }, "./src/remux/mp4-generator.js":
            /*!************************************!*\
      !*** ./src/remux/mp4-generator.js ***!
      \************************************/function (e, t, i) {
                i.r(t);
                var r = function () {
                    function e() {
                    }

                    return e.init = function () {
                        for (var t in e.types = {
                            avc1: [],
                            avcC: [],
                            btrt: [],
                            dinf: [],
                            dref: [],
                            esds: [],
                            ftyp: [],
                            hdlr: [],
                            mdat: [],
                            mdhd: [],
                            mdia: [],
                            mfhd: [],
                            minf: [],
                            moof: [],
                            moov: [],
                            mp4a: [],
                            mvex: [],
                            mvhd: [],
                            sdtp: [],
                            stbl: [],
                            stco: [],
                            stsc: [],
                            stsd: [],
                            stsz: [],
                            stts: [],
                            tfdt: [],
                            tfhd: [],
                            traf: [],
                            trak: [],
                            trun: [],
                            trex: [],
                            tkhd: [],
                            vmhd: [],
                            smhd: [],
                            ".mp3": []
                        }, e.types) e.types.hasOwnProperty(t) && (e.types[t] = [t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2), t.charCodeAt(3)]);
                        var i = e.constants = {};
                        i.FTYP = new Uint8Array([105, 115, 111, 109, 0, 0, 0, 1, 105, 115, 111, 109, 97, 118, 99, 49]), i.STSD_PREFIX = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]), i.STTS = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), i.STSC = i.STCO = i.STTS, i.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), i.HDLR_VIDEO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0]), i.HDLR_AUDIO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]), i.DREF = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]), i.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), i.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0])
                    }, e.box = function (e) {
                        for (var t = 8, i = null, r = Array.prototype.slice.call(arguments, 1), n = r.length, s = 0; s < n; s++) t += r[s].byteLength;
                        (i = new Uint8Array(t))[0] = t >>> 24 & 255, i[1] = t >>> 16 & 255, i[2] = t >>> 8 & 255, i[3] = 255 & t, i.set(e, 4);
                        var o = 8;
                        for (s = 0; s < n; s++) i.set(r[s], o), o += r[s].byteLength;
                        return i
                    }, e.generateInitSegment = function (t) {
                        var i = e.box(e.types.ftyp, e.constants.FTYP), r = e.moov(t),
                            n = new Uint8Array(i.byteLength + r.byteLength);
                        return n.set(i, 0), n.set(r, i.byteLength), n
                    }, e.moov = function (t) {
                        var i = e.mvhd(t.timescale, t.duration), r = e.trak(t), n = e.mvex(t);
                        return e.box(e.types.moov, i, r, n)
                    }, e.mvhd = function (t, i) {
                        return e.box(e.types.mvhd, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]))
                    }, e.trak = function (t) {
                        return e.box(e.types.trak, e.tkhd(t), e.mdia(t))
                    }, e.tkhd = function (t) {
                        var i = t.id, r = t.duration, n = t.presentWidth, s = t.presentHeight;
                        return e.box(e.types.tkhd, new Uint8Array([0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 0, 0, 0, 0, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, n >>> 8 & 255, 255 & n, 0, 0, s >>> 8 & 255, 255 & s, 0, 0]))
                    }, e.mdia = function (t) {
                        return e.box(e.types.mdia, e.mdhd(t), e.hdlr(t), e.minf(t))
                    }, e.mdhd = function (t) {
                        var i = t.timescale, r = t.duration;
                        return e.box(e.types.mdhd, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r, 85, 196, 0, 0]))
                    }, e.hdlr = function (t) {
                        var i = null;
                        return i = "audio" === t.type ? e.constants.HDLR_AUDIO : e.constants.HDLR_VIDEO, e.box(e.types.hdlr, i)
                    }, e.minf = function (t) {
                        var i = null;
                        return i = "audio" === t.type ? e.box(e.types.smhd, e.constants.SMHD) : e.box(e.types.vmhd, e.constants.VMHD), e.box(e.types.minf, i, e.dinf(), e.stbl(t))
                    }, e.dinf = function () {
                        return e.box(e.types.dinf, e.box(e.types.dref, e.constants.DREF))
                    }, e.stbl = function (t) {
                        return e.box(e.types.stbl, e.stsd(t), e.box(e.types.stts, e.constants.STTS), e.box(e.types.stsc, e.constants.STSC), e.box(e.types.stsz, e.constants.STSZ), e.box(e.types.stco, e.constants.STCO))
                    }, e.stsd = function (t) {
                        return "audio" === t.type ? "mp3" === t.codec ? e.box(e.types.stsd, e.constants.STSD_PREFIX, e.mp3(t)) : e.box(e.types.stsd, e.constants.STSD_PREFIX, e.mp4a(t)) : e.box(e.types.stsd, e.constants.STSD_PREFIX, e.avc1(t))
                    }, e.mp3 = function (t) {
                        var i = t.channelCount, r = t.audioSampleRate,
                            n = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, i, 0, 16, 0, 0, 0, 0, r >>> 8 & 255, 255 & r, 0, 0]);
                        return e.box(e.types[".mp3"], n)
                    }, e.mp4a = function (t) {
                        var i = t.channelCount, r = t.audioSampleRate,
                            n = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, i, 0, 16, 0, 0, 0, 0, r >>> 8 & 255, 255 & r, 0, 0]);
                        return e.box(e.types.mp4a, n, e.esds(t))
                    }, e.esds = function (t) {
                        var i = t.config || [], r = i.length,
                            n = new Uint8Array([0, 0, 0, 0, 3, 23 + r, 0, 1, 0, 4, 15 + r, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([r]).concat(i).concat([6, 1, 2]));
                        return e.box(e.types.esds, n)
                    }, e.avc1 = function (t) {
                        var i = t.avcc, r = t.codecWidth, n = t.codecHeight,
                            s = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, r >>> 8 & 255, 255 & r, n >>> 8 & 255, 255 & n, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 10, 120, 113, 113, 47, 102, 108, 118, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 255, 255]);
                        return e.box(e.types.avc1, s, e.box(e.types.avcC, i))
                    }, e.mvex = function (t) {
                        return e.box(e.types.mvex, e.trex(t))
                    }, e.trex = function (t) {
                        var i = t.id,
                            r = new Uint8Array([0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]);
                        return e.box(e.types.trex, r)
                    }, e.moof = function (t, i) {
                        return e.box(e.types.moof, e.mfhd(t.sequenceNumber), e.traf(t, i))
                    }, e.mfhd = function (t) {
                        var i = new Uint8Array([0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t]);
                        return e.box(e.types.mfhd, i)
                    }, e.traf = function (t, i) {
                        var r = t.id,
                            n = e.box(e.types.tfhd, new Uint8Array([0, 0, 0, 0, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r])),
                            s = e.box(e.types.tfdt, new Uint8Array([0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i])),
                            o = e.sdtp(t), a = e.trun(t, o.byteLength + 16 + 16 + 8 + 16 + 8 + 8);
                        return e.box(e.types.traf, n, s, a, o)
                    }, e.sdtp = function (t) {
                        for (var i = t.samples || [], r = i.length, n = new Uint8Array(4 + r), s = 0; s < r; s++) {
                            var o = i[s].flags;
                            n[s + 4] = o.isLeading << 6 | o.dependsOn << 4 | o.isDependedOn << 2 | o.hasRedundancy
                        }
                        return e.box(e.types.sdtp, n)
                    }, e.trun = function (t, i) {
                        var r = t.samples || [], n = r.length, s = 12 + 16 * n, o = new Uint8Array(s);
                        i += 8 + s, o.set([0, 0, 15, 1, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i], 0);
                        for (var a = 0; a < n; a++) {
                            var u = r[a].duration, l = r[a].size, d = r[a].flags, h = r[a].cts;
                            o.set([u >>> 24 & 255, u >>> 16 & 255, u >>> 8 & 255, 255 & u, l >>> 24 & 255, l >>> 16 & 255, l >>> 8 & 255, 255 & l, d.isLeading << 2 | d.dependsOn, d.isDependedOn << 6 | d.hasRedundancy << 4 | d.isNonSync, 0, 0, h >>> 24 & 255, h >>> 16 & 255, h >>> 8 & 255, 255 & h], 12 + 16 * a)
                        }
                        return e.box(e.types.trun, o)
                    }, e.mdat = function (t) {
                        return e.box(e.types.mdat, t)
                    }, e
                }();
                r.init(), t.default = r
            }, "./src/remux/mp4-remuxer.js":
            /*!**********************************!*\
      !*** ./src/remux/mp4-remuxer.js ***!
      \**********************************/function (e, t, i) {
                i.r(t);
                var r = i(/*! ../utils/logger.js */"./src/utils/logger.js"),
                    n = i(/*! ./mp4-generator.js */"./src/remux/mp4-generator.js"),
                    s = i(/*! ./aac-silent.js */"./src/remux/aac-silent.js"),
                    o = i(/*! ../utils/browser.js */"./src/utils/browser.js"),
                    a = i(/*! ../core/media-segment-info.js */"./src/core/media-segment-info.js"),
                    u = i(/*! ../utils/exception.js */"./src/utils/exception.js"), l = function () {
                        function e(e) {
                            this.TAG = "MP4Remuxer", this._config = e, this._isLive = !0 === e.isLive, this._dtsBase = -1, this._dtsBaseInited = !1, this._audioDtsBase = 1 / 0, this._videoDtsBase = 1 / 0, this._audioNextDts = void 0, this._videoNextDts = void 0, this._audioStashedLastSample = null, this._videoStashedLastSample = null, this._audioMeta = null, this._videoMeta = null, this._audioSegmentInfoList = new a.MediaSegmentInfoList("audio"), this._videoSegmentInfoList = new a.MediaSegmentInfoList("video"), this._onInitSegment = null, this._onMediaSegment = null, this._forceFirstIDR = !(!o.default.chrome || !(o.default.version.major < 50 || 50 === o.default.version.major && o.default.version.build < 2661)), this._fillSilentAfterSeek = o.default.msedge || o.default.msie, this._mp3UseMpegAudio = !o.default.firefox, this._fillAudioTimestampGap = this._config.fixAudioTimestampGap
                        }

                        return e.prototype.destroy = function () {
                            this._dtsBase = -1, this._dtsBaseInited = !1, this._audioMeta = null, this._videoMeta = null, this._audioSegmentInfoList.clear(), this._audioSegmentInfoList = null, this._videoSegmentInfoList.clear(), this._videoSegmentInfoList = null, this._onInitSegment = null, this._onMediaSegment = null
                        }, e.prototype.bindDataSource = function (e) {
                            return e.onDataAvailable = this.remux.bind(this), e.onTrackMetadata = this._onTrackMetadataReceived.bind(this), this
                        }, Object.defineProperty(e.prototype, "onInitSegment", {
                            get: function () {
                                return this._onInitSegment
                            }, set: function (e) {
                                this._onInitSegment = e
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e.prototype, "onMediaSegment", {
                            get: function () {
                                return this._onMediaSegment
                            }, set: function (e) {
                                this._onMediaSegment = e
                            }, enumerable: !1, configurable: !0
                        }), e.prototype.insertDiscontinuity = function () {
                            this._audioNextDts = this._videoNextDts = void 0
                        }, e.prototype.seek = function (e) {
                            this._audioStashedLastSample = null, this._videoStashedLastSample = null, this._videoSegmentInfoList.clear(), this._audioSegmentInfoList.clear()
                        }, e.prototype.remux = function (e, t) {
                            if (!this._onMediaSegment) throw new u.IllegalStateException("MP4Remuxer: onMediaSegment callback must be specificed!");
                            this._dtsBaseInited || this._calculateDtsBase(e, t), this._remuxVideo(t), this._remuxAudio(e)
                        }, e.prototype._onTrackMetadataReceived = function (e, t) {
                            var i = null, r = "mp4", s = t.codec;
                            if ("audio" === e) this._audioMeta = t, "mp3" === t.codec && this._mp3UseMpegAudio ? (r = "mpeg", s = "", i = new Uint8Array) : i = n.default.generateInitSegment(t); else {
                                if ("video" !== e) return;
                                this._videoMeta = t, i = n.default.generateInitSegment(t)
                            }
                            if (!this._onInitSegment) throw new u.IllegalStateException("MP4Remuxer: onInitSegment callback must be specified!");
                            this._onInitSegment(e, {
                                type: e,
                                data: i.buffer,
                                codec: s,
                                container: e + "/" + r,
                                mediaDuration: t.duration
                            })
                        }, e.prototype._calculateDtsBase = function (e, t) {
                            this._dtsBaseInited || (e.samples && e.samples.length && (this._audioDtsBase = e.samples[0].dts), t.samples && t.samples.length && (this._videoDtsBase = t.samples[0].dts), this._dtsBase = Math.min(this._audioDtsBase, this._videoDtsBase), this._dtsBaseInited = !0)
                        }, e.prototype.flushStashedSamples = function () {
                            var e = this._videoStashedLastSample, t = this._audioStashedLastSample,
                                i = {type: "video", id: 1, sequenceNumber: 0, samples: [], length: 0};
                            null != e && (i.samples.push(e), i.length = e.length);
                            var r = {type: "audio", id: 2, sequenceNumber: 0, samples: [], length: 0};
                            null != t && (r.samples.push(t), r.length = t.length), this._videoStashedLastSample = null, this._audioStashedLastSample = null, this._remuxVideo(i, !0), this._remuxAudio(r, !0)
                        }, e.prototype._remuxAudio = function (e, t) {
                            if (null != this._audioMeta) {
                                var i, u = e, l = u.samples, d = void 0, h = -1, c = this._audioMeta.refSampleDuration,
                                    f = "mp3" === this._audioMeta.codec && this._mp3UseMpegAudio,
                                    _ = this._dtsBaseInited && void 0 === this._audioNextDts, p = !1;
                                if (l && 0 !== l.length && (1 !== l.length || t)) {
                                    var m = 0, g = null, v = 0;
                                    f ? (m = 0, v = u.length) : (m = 8, v = 8 + u.length);
                                    var y = null;
                                    if (l.length > 1 && (v -= (y = l.pop()).length), null != this._audioStashedLastSample) {
                                        var E = this._audioStashedLastSample;
                                        this._audioStashedLastSample = null, l.unshift(E), v += E.length
                                    }
                                    null != y && (this._audioStashedLastSample = y);
                                    var b = l[0].dts - this._dtsBase;
                                    if (this._audioNextDts) d = b - this._audioNextDts; else if (this._audioSegmentInfoList.isEmpty()) d = 0, this._fillSilentAfterSeek && !this._videoSegmentInfoList.isEmpty() && "mp3" !== this._audioMeta.originalCodec && (p = !0); else {
                                        var S = this._audioSegmentInfoList.getLastSampleBefore(b);
                                        if (null != S) {
                                            var L = b - (S.originalDts + S.duration);
                                            L <= 3 && (L = 0), d = b - (S.dts + S.duration + L)
                                        } else d = 0
                                    }
                                    if (p) {
                                        var A = b - d, R = this._videoSegmentInfoList.getLastSegmentBefore(b);
                                        if (null != R && R.beginDts < A) {
                                            if (P = s.default.getSilentFrame(this._audioMeta.originalCodec, this._audioMeta.channelCount)) {
                                                var w = R.beginDts, T = A - R.beginDts;
                                                r.default.v(this.TAG, "InsertPrefixSilentAudio: dts: " + w + ", duration: " + T), l.unshift({
                                                    unit: P,
                                                    dts: w,
                                                    pts: w
                                                }), v += P.byteLength
                                            }
                                        } else p = !1
                                    }
                                    for (var O = [], C = 0; C < l.length; C++) {
                                        var k = (E = l[C]).unit, I = E.dts - this._dtsBase, D = (w = I, !1), x = null,
                                            M = 0;
                                        if (!(I < -.001)) {
                                            if ("mp3" !== this._audioMeta.codec) {
                                                var B = I;
                                                if (this._audioNextDts && (B = this._audioNextDts), (d = I - B) <= -3 * c) {
                                                    r.default.w(this.TAG, "Dropping 1 audio frame (originalDts: " + I + " ms ,curRefDts: " + B + " ms)  due to dtsCorrection: " + d + " ms overlap.");
                                                    continue
                                                }
                                                if (d >= 3 * c && this._fillAudioTimestampGap && !o.default.safari) {
                                                    D = !0;
                                                    var P, j = Math.floor(d / c);
                                                    r.default.w(this.TAG, "Large audio timestamp gap detected, may cause AV sync to drift. Silent frames will be generated to avoid unsync.\noriginalDts: " + I + " ms, curRefDts: " + B + " ms, dtsCorrection: " + Math.round(d) + " ms, generate: " + j + " frames"), w = Math.floor(B), M = Math.floor(B + c) - w, null == (P = s.default.getSilentFrame(this._audioMeta.originalCodec, this._audioMeta.channelCount)) && (r.default.w(this.TAG, "Unable to generate silent frame for " + this._audioMeta.originalCodec + " with " + this._audioMeta.channelCount + " channels, repeat last frame"), P = k), x = [];
                                                    for (var U = 0; U < j; U++) {
                                                        B += c;
                                                        var N = Math.floor(B), F = Math.floor(B + c) - N, G = {
                                                            dts: N,
                                                            pts: N,
                                                            cts: 0,
                                                            unit: P,
                                                            size: P.byteLength,
                                                            duration: F,
                                                            originalDts: I,
                                                            flags: {
                                                                isLeading: 0,
                                                                dependsOn: 1,
                                                                isDependedOn: 0,
                                                                hasRedundancy: 0
                                                            }
                                                        };
                                                        x.push(G), v += G.size
                                                    }
                                                    this._audioNextDts = B + c
                                                } else w = Math.floor(B), M = Math.floor(B + c) - w, this._audioNextDts = B + c
                                            } else w = I - d, M = C !== l.length - 1 ? l[C + 1].dts - this._dtsBase - d - w : null != y ? y.dts - this._dtsBase - d - w : O.length >= 1 ? O[O.length - 1].duration : Math.floor(c), this._audioNextDts = w + M;
                                            -1 === h && (h = w), O.push({
                                                dts: w,
                                                pts: w,
                                                cts: 0,
                                                unit: E.unit,
                                                size: E.unit.byteLength,
                                                duration: M,
                                                originalDts: I,
                                                flags: {isLeading: 0, dependsOn: 1, isDependedOn: 0, hasRedundancy: 0}
                                            }), D && O.push.apply(O, x)
                                        }
                                    }
                                    if (0 === O.length) return u.samples = [], void (u.length = 0);
                                    for (f ? g = new Uint8Array(v) : ((g = new Uint8Array(v))[0] = v >>> 24 & 255, g[1] = v >>> 16 & 255, g[2] = v >>> 8 & 255, g[3] = 255 & v, g.set(n.default.types.mdat, 4)), C = 0; C < O.length; C++) k = O[C].unit, g.set(k, m), m += k.byteLength;
                                    var V = O[O.length - 1];
                                    i = V.dts + V.duration;
                                    var z = new a.MediaSegmentInfo;
                                    z.beginDts = h, z.endDts = i, z.beginPts = h, z.endPts = i, z.originalBeginDts = O[0].originalDts, z.originalEndDts = V.originalDts + V.duration, z.firstSample = new a.SampleInfo(O[0].dts, O[0].pts, O[0].duration, O[0].originalDts, !1), z.lastSample = new a.SampleInfo(V.dts, V.pts, V.duration, V.originalDts, !1), this._isLive || this._audioSegmentInfoList.append(z), u.samples = O, u.sequenceNumber++;
                                    var K = null;
                                    K = f ? new Uint8Array : n.default.moof(u, h), u.samples = [], u.length = 0;
                                    var H = {
                                        type: "audio",
                                        data: this._mergeBoxes(K, g).buffer,
                                        sampleCount: O.length,
                                        info: z
                                    };
                                    f && _ && (H.timestampOffset = h), this._onMediaSegment("audio", H)
                                }
                            }
                        }, e.prototype._remuxVideo = function (e, t) {
                            if (null != this._videoMeta) {
                                var i, r, s = e, o = s.samples, u = void 0, l = -1, d = -1;
                                if (o && 0 !== o.length && (1 !== o.length || t)) {
                                    var h = 8, c = null, f = 8 + e.length, _ = null;
                                    if (o.length > 1 && (f -= (_ = o.pop()).length), null != this._videoStashedLastSample) {
                                        var p = this._videoStashedLastSample;
                                        this._videoStashedLastSample = null, o.unshift(p), f += p.length
                                    }
                                    null != _ && (this._videoStashedLastSample = _);
                                    var m = o[0].dts - this._dtsBase;
                                    if (this._videoNextDts) u = m - this._videoNextDts; else if (this._videoSegmentInfoList.isEmpty()) u = 0; else {
                                        var g = this._videoSegmentInfoList.getLastSampleBefore(m);
                                        if (null != g) {
                                            var v = m - (g.originalDts + g.duration);
                                            v <= 3 && (v = 0), u = m - (g.dts + g.duration + v)
                                        } else u = 0
                                    }
                                    for (var y = new a.MediaSegmentInfo, E = [], b = 0; b < o.length; b++) {
                                        var S = (p = o[b]).dts - this._dtsBase, L = p.isKeyframe, A = S - u, R = p.cts,
                                            w = A + R;
                                        -1 === l && (l = A, d = w);
                                        var T = 0;
                                        if (T = b !== o.length - 1 ? o[b + 1].dts - this._dtsBase - u - A : null != _ ? _.dts - this._dtsBase - u - A : E.length >= 1 ? E[E.length - 1].duration : Math.floor(this._videoMeta.refSampleDuration), L) {
                                            var O = new a.SampleInfo(A, w, T, p.dts, !0);
                                            O.fileposition = p.fileposition, y.appendSyncPoint(O)
                                        }
                                        E.push({
                                            dts: A,
                                            pts: w,
                                            cts: R,
                                            units: p.units,
                                            size: p.length,
                                            isKeyframe: L,
                                            duration: T,
                                            originalDts: S,
                                            flags: {
                                                isLeading: 0,
                                                dependsOn: L ? 2 : 1,
                                                isDependedOn: L ? 1 : 0,
                                                hasRedundancy: 0,
                                                isNonSync: L ? 0 : 1
                                            }
                                        })
                                    }
                                    for ((c = new Uint8Array(f))[0] = f >>> 24 & 255, c[1] = f >>> 16 & 255, c[2] = f >>> 8 & 255, c[3] = 255 & f, c.set(n.default.types.mdat, 4), b = 0; b < E.length; b++) for (var C = E[b].units; C.length;) {
                                        var k = C.shift().data;
                                        c.set(k, h), h += k.byteLength
                                    }
                                    var I = E[E.length - 1];
                                    if (i = I.dts + I.duration, r = I.pts + I.duration, this._videoNextDts = i, y.beginDts = l, y.endDts = i, y.beginPts = d, y.endPts = r, y.originalBeginDts = E[0].originalDts, y.originalEndDts = I.originalDts + I.duration, y.firstSample = new a.SampleInfo(E[0].dts, E[0].pts, E[0].duration, E[0].originalDts, E[0].isKeyframe), y.lastSample = new a.SampleInfo(I.dts, I.pts, I.duration, I.originalDts, I.isKeyframe), this._isLive || this._videoSegmentInfoList.append(y), s.samples = E, s.sequenceNumber++, this._forceFirstIDR) {
                                        var D = E[0].flags;
                                        D.dependsOn = 2, D.isNonSync = 0
                                    }
                                    var x = n.default.moof(s, l);
                                    s.samples = [], s.length = 0, this._onMediaSegment("video", {
                                        type: "video",
                                        data: this._mergeBoxes(x, c).buffer,
                                        sampleCount: E.length,
                                        info: y
                                    })
                                }
                            }
                        }, e.prototype._mergeBoxes = function (e, t) {
                            var i = new Uint8Array(e.byteLength + t.byteLength);
                            return i.set(e, 0), i.set(t, e.byteLength), i
                        }, e
                    }();
                t.default = l
            }, "./src/utils/browser.js":
            /*!******************************!*\
      !*** ./src/utils/browser.js ***!
      \******************************/function (e, t, i) {
                i.r(t);
                var r = {};
                !function () {
                    var e = self.navigator.userAgent.toLowerCase(),
                        t = /(edge)\/([\w.]+)/.exec(e) || /(opr)[\/]([\w.]+)/.exec(e) || /(chrome)[ \/]([\w.]+)/.exec(e) || /(iemobile)[\/]([\w.]+)/.exec(e) || /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(firefox)[ \/]([\w.]+)/.exec(e) || [],
                        i = /(ipad)/.exec(e) || /(ipod)/.exec(e) || /(windows phone)/.exec(e) || /(iphone)/.exec(e) || /(kindle)/.exec(e) || /(android)/.exec(e) || /(windows)/.exec(e) || /(mac)/.exec(e) || /(linux)/.exec(e) || /(cros)/.exec(e) || [],
                        n = {
                            browser: t[5] || t[3] || t[1] || "",
                            version: t[2] || t[4] || "0",
                            majorVersion: t[4] || t[2] || "0",
                            platform: i[0] || ""
                        }, s = {};
                    if (n.browser) {
                        s[n.browser] = !0;
                        var o = n.majorVersion.split(".");
                        s.version = {
                            major: parseInt(n.majorVersion, 10),
                            string: n.version
                        }, o.length > 1 && (s.version.minor = parseInt(o[1], 10)), o.length > 2 && (s.version.build = parseInt(o[2], 10))
                    }
                    if (n.platform && (s[n.platform] = !0), (s.chrome || s.opr || s.safari) && (s.webkit = !0), s.rv || s.iemobile) {
                        s.rv && delete s.rv;
                        var a = "msie";
                        n.browser = a, s[a] = !0
                    }
                    if (s.edge) {
                        delete s.edge;
                        var u = "msedge";
                        n.browser = u, s[u] = !0
                    }
                    if (s.opr) {
                        var l = "opera";
                        n.browser = l, s[l] = !0
                    }
                    if (s.safari && s.android) {
                        var d = "android";
                        n.browser = d, s[d] = !0
                    }
                    for (var h in s.name = n.browser, s.platform = n.platform, r) r.hasOwnProperty(h) && delete r[h];
                    Object.assign(r, s)
                }(), t.default = r
            }, "./src/utils/exception.js":
            /*!********************************!*\
      !*** ./src/utils/exception.js ***!
      \********************************/function (e, t, i) {
                i.r(t), i.d(t, {
                    RuntimeException: function () {
                        return s
                    }, IllegalStateException: function () {
                        return o
                    }, InvalidArgumentException: function () {
                        return a
                    }, NotImplementedException: function () {
                        return u
                    }
                });
                var r, n = (r = function (e, t) {
                    return r = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
                    }, r(e, t)
                }, function (e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function i() {
                        this.constructor = e
                    }

                    r(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i)
                }), s = function () {
                    function e(e) {
                        this._message = e
                    }

                    return Object.defineProperty(e.prototype, "name", {
                        get: function () {
                            return "RuntimeException"
                        }, enumerable: !1, configurable: !0
                    }), Object.defineProperty(e.prototype, "message", {
                        get: function () {
                            return this._message
                        }, enumerable: !1, configurable: !0
                    }), e.prototype.toString = function () {
                        return this.name + ": " + this.message
                    }, e
                }(), o = function (e) {
                    function t(t) {
                        return e.call(this, t) || this
                    }

                    return n(t, e), Object.defineProperty(t.prototype, "name", {
                        get: function () {
                            return "IllegalStateException"
                        }, enumerable: !1, configurable: !0
                    }), t
                }(s), a = function (e) {
                    function t(t) {
                        return e.call(this, t) || this
                    }

                    return n(t, e), Object.defineProperty(t.prototype, "name", {
                        get: function () {
                            return "InvalidArgumentException"
                        }, enumerable: !1, configurable: !0
                    }), t
                }(s), u = function (e) {
                    function t(t) {
                        return e.call(this, t) || this
                    }

                    return n(t, e), Object.defineProperty(t.prototype, "name", {
                        get: function () {
                            return "NotImplementedException"
                        }, enumerable: !1, configurable: !0
                    }), t
                }(s)
            }, "./src/utils/logger.js":
            /*!*****************************!*\
      !*** ./src/utils/logger.js ***!
      \*****************************/function (e, t, i) {
                i.r(t);
                var r = i(/*! events */"./node_modules/events/events.js"), n = i.n(r), s = function () {
                    function e() {
                    }

                    return e.e = function (t, i) {
                        t && !e.FORCE_GLOBAL_TAG || (t = e.GLOBAL_TAG);
                        var r = "[" + t + "] > " + i;
                        e.ENABLE_CALLBACK && e.emitter.emit("log", "error", r), e.ENABLE_ERROR && (console.error ? console.error(r) : console.warn ? console.warn(r) : console.log(r))
                    }, e.i = function (t, i) {
                        t && !e.FORCE_GLOBAL_TAG || (t = e.GLOBAL_TAG);
                        var r = "[" + t + "] > " + i;
                        e.ENABLE_CALLBACK && e.emitter.emit("log", "info", r), e.ENABLE_INFO && (console.info ? console.info(r) : console.log(r))
                    }, e.w = function (t, i) {
                        t && !e.FORCE_GLOBAL_TAG || (t = e.GLOBAL_TAG);
                        var r = "[" + t + "] > " + i;
                        e.ENABLE_CALLBACK && e.emitter.emit("log", "warn", r), e.ENABLE_WARN && (console.warn ? console.warn(r) : console.log(r))
                    }, e.d = function (t, i) {
                        t && !e.FORCE_GLOBAL_TAG || (t = e.GLOBAL_TAG);
                        var r = "[" + t + "] > " + i;
                        e.ENABLE_CALLBACK && e.emitter.emit("log", "debug", r), e.ENABLE_DEBUG && (console.debug ? console.debug(r) : console.log(r))
                    }, e.v = function (t, i) {
                        t && !e.FORCE_GLOBAL_TAG || (t = e.GLOBAL_TAG);
                        var r = "[" + t + "] > " + i;
                        e.ENABLE_CALLBACK && e.emitter.emit("log", "verbose", r), e.ENABLE_VERBOSE && console.log(r)
                    }, e
                }();
                s.GLOBAL_TAG = "flv.js", s.FORCE_GLOBAL_TAG = !1, s.ENABLE_ERROR = !0, s.ENABLE_INFO = !0, s.ENABLE_WARN = !0, s.ENABLE_DEBUG = !0, s.ENABLE_VERBOSE = !0, s.ENABLE_CALLBACK = !1, s.emitter = new (n()), t.default = s
            }, "./src/utils/logging-control.js":
            /*!**************************************!*\
      !*** ./src/utils/logging-control.js ***!
      \**************************************/function (e, t, i) {
                i.r(t);
                var r = i(/*! events */"./node_modules/events/events.js"), n = i.n(r),
                    s = i(/*! ./logger.js */"./src/utils/logger.js"), o = function () {
                        function e() {
                        }

                        return Object.defineProperty(e, "forceGlobalTag", {
                            get: function () {
                                return s.default.FORCE_GLOBAL_TAG
                            }, set: function (t) {
                                s.default.FORCE_GLOBAL_TAG = t, e._notifyChange()
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e, "globalTag", {
                            get: function () {
                                return s.default.GLOBAL_TAG
                            }, set: function (t) {
                                s.default.GLOBAL_TAG = t, e._notifyChange()
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e, "enableAll", {
                            get: function () {
                                return s.default.ENABLE_VERBOSE && s.default.ENABLE_DEBUG && s.default.ENABLE_INFO && s.default.ENABLE_WARN && s.default.ENABLE_ERROR
                            }, set: function (t) {
                                s.default.ENABLE_VERBOSE = t, s.default.ENABLE_DEBUG = t, s.default.ENABLE_INFO = t, s.default.ENABLE_WARN = t, s.default.ENABLE_ERROR = t, e._notifyChange()
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e, "enableDebug", {
                            get: function () {
                                return s.default.ENABLE_DEBUG
                            }, set: function (t) {
                                s.default.ENABLE_DEBUG = t, e._notifyChange()
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e, "enableVerbose", {
                            get: function () {
                                return s.default.ENABLE_VERBOSE
                            }, set: function (t) {
                                s.default.ENABLE_VERBOSE = t, e._notifyChange()
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e, "enableInfo", {
                            get: function () {
                                return s.default.ENABLE_INFO
                            }, set: function (t) {
                                s.default.ENABLE_INFO = t, e._notifyChange()
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e, "enableWarn", {
                            get: function () {
                                return s.default.ENABLE_WARN
                            }, set: function (t) {
                                s.default.ENABLE_WARN = t, e._notifyChange()
                            }, enumerable: !1, configurable: !0
                        }), Object.defineProperty(e, "enableError", {
                            get: function () {
                                return s.default.ENABLE_ERROR
                            }, set: function (t) {
                                s.default.ENABLE_ERROR = t, e._notifyChange()
                            }, enumerable: !1, configurable: !0
                        }), e.getConfig = function () {
                            return {
                                globalTag: s.default.GLOBAL_TAG,
                                forceGlobalTag: s.default.FORCE_GLOBAL_TAG,
                                enableVerbose: s.default.ENABLE_VERBOSE,
                                enableDebug: s.default.ENABLE_DEBUG,
                                enableInfo: s.default.ENABLE_INFO,
                                enableWarn: s.default.ENABLE_WARN,
                                enableError: s.default.ENABLE_ERROR,
                                enableCallback: s.default.ENABLE_CALLBACK
                            }
                        }, e.applyConfig = function (e) {
                            s.default.GLOBAL_TAG = e.globalTag, s.default.FORCE_GLOBAL_TAG = e.forceGlobalTag, s.default.ENABLE_VERBOSE = e.enableVerbose, s.default.ENABLE_DEBUG = e.enableDebug, s.default.ENABLE_INFO = e.enableInfo, s.default.ENABLE_WARN = e.enableWarn, s.default.ENABLE_ERROR = e.enableError, s.default.ENABLE_CALLBACK = e.enableCallback
                        }, e._notifyChange = function () {
                            var t = e.emitter;
                            if (t.listenerCount("change") > 0) {
                                var i = e.getConfig();
                                t.emit("change", i)
                            }
                        }, e.registerListener = function (t) {
                            e.emitter.addListener("change", t)
                        }, e.removeListener = function (t) {
                            e.emitter.removeListener("change", t)
                        }, e.addLogListener = function (t) {
                            s.default.emitter.addListener("log", t), s.default.emitter.listenerCount("log") > 0 && (s.default.ENABLE_CALLBACK = !0, e._notifyChange())
                        }, e.removeLogListener = function (t) {
                            s.default.emitter.removeListener("log", t), 0 === s.default.emitter.listenerCount("log") && (s.default.ENABLE_CALLBACK = !1, e._notifyChange())
                        }, e
                    }();
                o.emitter = new (n()), t.default = o
            }, "./src/utils/polyfill.js":
            /*!*******************************!*\
      !*** ./src/utils/polyfill.js ***!
      \*******************************/function (e, t, i) {
                i.r(t);
                var r = function () {
                    function e() {
                    }

                    return e.install = function () {
                        Object.setPrototypeOf = Object.setPrototypeOf || function (e, t) {
                            return e.__proto__ = t, e
                        }, Object.assign = Object.assign || function (e) {
                            if (null == e) throw new TypeError("Cannot convert undefined or null to object");
                            for (var t = Object(e), i = 1; i < arguments.length; i++) {
                                var r = arguments[i];
                                if (null != r) for (var n in r) r.hasOwnProperty(n) && (t[n] = r[n])
                            }
                            return t
                        }, "function" != typeof self.Promise && i(/*! es6-promise */"./node_modules/es6-promise/dist/es6-promise.js").polyfill()
                    }, e
                }();
                r.install(), t.default = r
            }, "./src/utils/utf8-conv.js":
            /*!********************************!*\
      !*** ./src/utils/utf8-conv.js ***!
      \********************************/function (e, t, i) {
                function r(e, t, i) {
                    var r = e;
                    if (t + i < r.length) {
                        for (; i--;) if (128 != (192 & r[++t])) return !1;
                        return !0
                    }
                    return !1
                }

                i.r(t), t.default = function (e) {
                    for (var t = [], i = e, n = 0, s = e.length; n < s;) if (i[n] < 128) t.push(String.fromCharCode(i[n])), ++n; else {
                        if (i[n] < 192) ; else if (i[n] < 224) {
                            if (r(i, n, 1) && (o = (31 & i[n]) << 6 | 63 & i[n + 1]) >= 128) {
                                t.push(String.fromCharCode(65535 & o)), n += 2;
                                continue
                            }
                        } else if (i[n] < 240) {
                            if (r(i, n, 2) && (o = (15 & i[n]) << 12 | (63 & i[n + 1]) << 6 | 63 & i[n + 2]) >= 2048 && 55296 != (63488 & o)) {
                                t.push(String.fromCharCode(65535 & o)), n += 3;
                                continue
                            }
                        } else if (i[n] < 248) {
                            var o;
                            if (r(i, n, 3) && (o = (7 & i[n]) << 18 | (63 & i[n + 1]) << 12 | (63 & i[n + 2]) << 6 | 63 & i[n + 3]) > 65536 && o < 1114112) {
                                o -= 65536, t.push(String.fromCharCode(o >>> 10 | 55296)), t.push(String.fromCharCode(1023 & o | 56320)), n += 4;
                                continue
                            }
                        }
                        t.push(String.fromCharCode(65533)), ++n
                    }
                    return t.join("")
                }
            }
        }, t = {};

        function i(r) {
            var n = t[r];
            if (void 0 !== n) return n.exports;
            var s = t[r] = {exports: {}};
            return e[r].call(s.exports, s, s.exports, i), s.exports
        }

        return i.m = e, i.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return i.d(t, {a: t}), t
        }, i.d = function (e, t) {
            for (var r in t) i.o(t, r) && !i.o(e, r) && Object.defineProperty(e, r, {enumerable: !0, get: t[r]})
        }, i.g = function () {
            if ("object" == typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")()
            } catch (e) {
                if ("object" == typeof window) return window
            }
        }(), i.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, i.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        }, i("./src/index.js")
    }()
};
var T = w.exports = A();
export {T as default};
//# sourceMappingURL=/sm/66026be4e1f5dfa9a152ef637af3114624d68b64d036f2a9cfdabdd98065dea9.map
