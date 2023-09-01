!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).jessibuca = t()
}(this, (function () {
    "use strict";
    const e = 0, t = 1, i = "flv", n = "m7s", o = {
            videoBuffer: 1e3,
            isResize: !0,
            isFullResize: !1,
            isFlv: !1,
            debug: !1,
            loadingTimeout: 10,
            heartTimeout: 10,
            timeout: 10,
            supportDblclickFullscreen: !1,
            showBandwidth: !1,
            keepScreenOn: !1,
            isNotMute: !1,
            hasAudio: !0,
            hasVideo: !0,
            operateBtns: {fullscreen: !1, screenshot: !1, play: !1, audio: !1, record: !1},
            hasControl: !1,
            loadingText: "",
            background: "",
            decoder: "decoder.js",
            url: "",
            rotate: 0,
            forceNoOffscreen: !0,
            hiddenAutoPause: !1,
            protocol: t,
            demuxType: i,
            useWCS: !1,
            useMSE: !1,
            useOffscreen: !1
        }, r = "init", s = "initVideo", a = "render", A = "playAudio", c = "initAudio", d = "audioCode", l = "videoCode",
        u = 1, h = 2, f = 8, p = 9, g = "init", m = "decode", b = "audioDecode", y = "close", v = {
            fullscreen: "fullscreen$2",
            webFullscreen: "webFullscreen",
            decoderWorkerInit: "decoderWorkerInit",
            play: "play",
            playing: "playing",
            pause: "pause",
            mute: "mute",
            load: "load",
            loading: "loading",
            videoInfo: "videoInfo",
            timeUpdate: "timeUpdate",
            audioInfo: "audioInfo",
            log: "log",
            error: "error",
            kBps: "kBps",
            timeout: "timeout",
            delayTimeout: "delayTimeout",
            loadingTimeout: "loadingTimeout",
            stats: "stats",
            performance: "performance",
            record: "record",
            recording: "recording",
            recordingTimestamp: "recordingTimestamp",
            recordStart: "recordStart",
            recordEnd: "recordEnd",
            recordCreateError: "recordCreateError",
            buffer: "buffer",
            videoFrame: "videoFrame",
            start: "start",
            metadata: "metadata",
            resize: "resize",
            streamEnd: "streamEnd",
            streamSuccess: "streamSuccess",
            streamMessage: "streamMessage",
            streamError: "streamError",
            volumechange: "volumechange",
            destroy: "destroy",
            mseSourceOpen: "mseSourceOpen",
            mseSourceClose: "mseSourceClose",
            mseSourceBufferError: "mseSourceBufferError",
            mseSourceBufferBusy: "mseSourceBufferBusy",
            videoWaiting: "videoWaiting",
            videoTimeUpdate: "videoTimeUpdate",
            videoSyncAudio: "videoSyncAudio"
        }, w = {
            load: v.load,
            timeUpdate: v.timeUpdate,
            videoInfo: v.videoInfo,
            audioInfo: v.audioInfo,
            error: v.error,
            kBps: v.kBps,
            log: v.log,
            start: v.start,
            timeout: v.timeout,
            loadingTimeout: v.loadingTimeout,
            delayTimeout: v.delayTimeout,
            fullscreen: "fullscreen",
            play: v.play,
            pause: v.pause,
            mute: v.mute,
            stats: v.stats,
            performance: v.performance,
            recordingTimestamp: v.recordingTimestamp,
            recordStart: v.recordStart,
            recordEnd: v.recordEnd
        }, E = {
            playError: "playIsNotPauseOrUrlIsNull",
            fetchError: "fetchError",
            websocketError: "websocketError",
            webcodecsH265NotSupport: "webcodecsH265NotSupport",
            mediaSourceH265NotSupport: "mediaSourceH265NotSupport",
            wasmDecodeError: "wasmDecodeError"
        }, S = "notConnect", R = "open", C = "close", B = "error",
        k = {download: "download", base64: "base64", blob: "blob"}, I = {7: "H264(AVC)", 12: "H265(HEVC)"}, T = 7,
        x = 12, L = {10: "AAC", 7: "ALAW", 8: "MULAW"}, D = 32, O = 33, j = 34, U = 0, F = 1, P = 2, M = "mp4",
        V = "webm", Q = "webcodecs", N = "webgl", W = "offscreen", G = "key", H = "delta",
        J = 'video/mp4; codecs="avc1.64002A"', q = "ended", z = "open", X = "closed";

    class Y {
        constructor(e) {
            this.log = function (t) {
                if (e._opt.debug) {
                    for (var i = arguments.length, n = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++) n[o - 1] = arguments[o];
                    console.log(`Jessibuca: [${t}]`, ...n)
                }
            }, this.warn = function (t) {
                if (e._opt.debug) {
                    for (var i = arguments.length, n = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++) n[o - 1] = arguments[o];
                    console.warn(`Jessibuca: [${t}]`, ...n)
                }
            }, this.error = function (t) {
                if (e._opt.debug) {
                    for (var i = arguments.length, n = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++) n[o - 1] = arguments[o];
                    console.error(`Jessibuca: [${t}]`, ...n)
                }
            }
        }
    }

    class Z {
        constructor(e) {
            this.destroys = [], this.proxy = this.proxy.bind(this), this.master = e
        }

        proxy(e, t, i) {
            let n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            if (!e) return;
            if (Array.isArray(t)) return t.map((t => this.proxy(e, t, i, n)));
            e.addEventListener(t, i, n);
            const o = () => e.removeEventListener(t, i, n);
            return this.destroys.push(o), o
        }

        destroy() {
            this.master.debug.log("Events", "destroy"), this.destroys.forEach((e => e()))
        }
    }

    var K = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function _(e, t) {
        return e(t = {exports: {}}, t.exports), t.exports
    }

    var $ = _((function (e) {
        !function () {
            var t = "undefined" != typeof window && void 0 !== window.document ? window.document : {}, i = e.exports,
                n = function () {
                    for (var e, i = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], n = 0, o = i.length, r = {}; n < o; n++) if ((e = i[n]) && e[1] in t) {
                        for (n = 0; n < e.length; n++) r[i[0][n]] = e[n];
                        return r
                    }
                    return !1
                }(), o = {change: n.fullscreenchange, error: n.fullscreenerror}, r = {
                    request: function (e, i) {
                        return new Promise(function (o, r) {
                            var s = function () {
                                this.off("change", s), o()
                            }.bind(this);
                            this.on("change", s);
                            var a = (e = e || t.documentElement)[n.requestFullscreen](i);
                            a instanceof Promise && a.then(s).catch(r)
                        }.bind(this))
                    }, exit: function () {
                        return new Promise(function (e, i) {
                            if (this.isFullscreen) {
                                var o = function () {
                                    this.off("change", o), e()
                                }.bind(this);
                                this.on("change", o);
                                var r = t[n.exitFullscreen]();
                                r instanceof Promise && r.then(o).catch(i)
                            } else e()
                        }.bind(this))
                    }, toggle: function (e, t) {
                        return this.isFullscreen ? this.exit() : this.request(e, t)
                    }, onchange: function (e) {
                        this.on("change", e)
                    }, onerror: function (e) {
                        this.on("error", e)
                    }, on: function (e, i) {
                        var n = o[e];
                        n && t.addEventListener(n, i, !1)
                    }, off: function (e, i) {
                        var n = o[e];
                        n && t.removeEventListener(n, i, !1)
                    }, raw: n
                };
            n ? (Object.defineProperties(r, {
                isFullscreen: {
                    get: function () {
                        return Boolean(t[n.fullscreenElement])
                    }
                }, element: {
                    enumerable: !0, get: function () {
                        return t[n.fullscreenElement]
                    }
                }, isEnabled: {
                    enumerable: !0, get: function () {
                        return Boolean(t[n.fullscreenEnabled])
                    }
                }
            }), i ? e.exports = r : window.screenfull = r) : i ? e.exports = {isEnabled: !1} : window.screenfull = {isEnabled: !1}
        }()
    }));

    function ee() {
    }

    function te() {
        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        const t = e.split(","), i = atob(t[1]), n = t[0].replace("data:", "").replace(";base64", "");
        let o = i.length, r = new Uint8Array(o);
        for (; o--;) r[o] = i.charCodeAt(o);
        return new File([r], "file", {type: n})
    }

    function ie(e, t) {
        const i = document.createElement("a");
        i.download = t, i.href = URL.createObjectURL(e), i.click(), URL.revokeObjectURL(e)
    }

    function ne() {
        return (new Date).getTime()
    }

    function oe(e, t, i) {
        return Math.max(Math.min(e, Math.max(t, i)), Math.min(t, i))
    }

    function re(e, t, i) {
        if (e) return "object" == typeof t && Object.keys(t).forEach((i => {
            re(e, i, t[i])
        })), e.style[t] = i, e
    }

    function se(e, t) {
        let i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
        if (!e) return 0;
        const n = getComputedStyle(e, null).getPropertyValue(t);
        return i ? parseFloat(n) : n
    }

    function ae() {
        return performance && "function" == typeof performance.now ? performance.now() : Date.now()
    }

    function Ae(e) {
        let t = 0, i = ae();
        return n => {
            t += n;
            const o = ae(), r = o - i;
            r >= 1e3 && (e(t / r * 1e3), i = o, t = 0)
        }
    }

    function ce(e) {
        if (null == e || "" === e) return "0 KB/S";
        let t = parseFloat(e);
        return t = t.toFixed(2), t + "KB/S"
    }

    function de(e) {
        return null == e
    }

    function le(e) {
        return !de(e)
    }

    $.isEnabled, (() => {
        try {
            if ("object" == typeof WebAssembly && "function" == typeof WebAssembly.instantiate) {
                const e = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));
                if (e instanceof WebAssembly.Module) return new WebAssembly.Instance(e) instanceof WebAssembly.Instance
            }
        } catch (e) {
        }
    })();

    class ue {
        on(e, t, i) {
            const n = this.e || (this.e = {});
            return (n[e] || (n[e] = [])).push({fn: t, ctx: i}), this
        }

        once(e, t, i) {
            const n = this;

            function o() {
                n.off(e, o);
                for (var r = arguments.length, s = new Array(r), a = 0; a < r; a++) s[a] = arguments[a];
                t.apply(i, s)
            }

            return o._ = t, this.on(e, o, i)
        }

        emit(e) {
            const t = ((this.e || (this.e = {}))[e] || []).slice();
            for (var i = arguments.length, n = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++) n[o - 1] = arguments[o];
            for (let e = 0; e < t.length; e += 1) t[e].fn.apply(t[e].ctx, n);
            return this
        }

        off(e, t) {
            const i = this.e || (this.e = {});
            if (!e) return Object.keys(i).forEach((e => {
                delete i[e]
            })), void delete this.e;
            const n = i[e], o = [];
            if (n && t) for (let e = 0, i = n.length; e < i; e += 1) n[e].fn !== t && n[e].fn._ !== t && o.push(n[e]);
            return o.length ? i[e] = o : delete i[e], this
        }
    }

    class he extends ue {
        constructor() {
            super(), this.init = !1
        }

        updateVideoInfo(e) {
            e.encTypeCode && (this.videoInfo.encType = I[e.encTypeCode]), e.width && (this.videoInfo.width = e.width), e.height && (this.videoInfo.height = e.height), this.videoInfo.encType && this.videoInfo.height && this.videoInfo.width && !this.init && (this.player.emit(v.videoInfo, this.videoInfo), this.init = !0)
        }
    }

    class fe extends he {
        constructor(e) {
            super(), this.player = e;
            const t = document.createElement("canvas");
            t.style.position = "absolute", t.style.top = 0, t.style.left = 0, this.$videoElement = t, e.$container.appendChild(this.$videoElement), this.context2D = null, this.contextGl = null, this.contextGlRender = null, this.contextGlDestroy = null, this.bitmaprenderer = null, this.renderType = null, this.videoInfo = {
                width: "",
                height: "",
                encType: ""
            }, this._initCanvasRender(), this.player.debug.log("CanvasVideo", "init")
        }

        _initContextGl() {
            this.contextGl = function (e) {
                let t = null;
                const i = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
                let n = 0;
                for (; !t && n < i.length;) {
                    const o = i[n];
                    try {
                        let i = {preserveDrawingBuffer: !0};
                        t = e.getContext(o, i)
                    } catch (e) {
                        t = null
                    }
                    t && "function" == typeof t.getParameter || (t = null), ++n
                }
                return t
            }(this.$videoElement);
            const e = (e => {
                var t = ["attribute vec4 vertexPos;", "attribute vec4 texturePos;", "varying vec2 textureCoord;", "void main()", "{", "gl_Position = vertexPos;", "textureCoord = texturePos.xy;", "}"].join("\n"),
                    i = ["precision highp float;", "varying highp vec2 textureCoord;", "uniform sampler2D ySampler;", "uniform sampler2D uSampler;", "uniform sampler2D vSampler;", "const mat4 YUV2RGB = mat4", "(", "1.1643828125, 0, 1.59602734375, -.87078515625,", "1.1643828125, -.39176171875, -.81296875, .52959375,", "1.1643828125, 2.017234375, 0, -1.081390625,", "0, 0, 0, 1", ");", "void main(void) {", "highp float y = texture2D(ySampler,  textureCoord).r;", "highp float u = texture2D(uSampler,  textureCoord).r;", "highp float v = texture2D(vSampler,  textureCoord).r;", "gl_FragColor = vec4(y, u, v, 1) * YUV2RGB;", "}"].join("\n"),
                    n = e.createShader(e.VERTEX_SHADER);
                e.shaderSource(n, t), e.compileShader(n), e.getShaderParameter(n, e.COMPILE_STATUS) || console.log("Vertex shader failed to compile: " + e.getShaderInfoLog(n));
                var o = e.createShader(e.FRAGMENT_SHADER);
                e.shaderSource(o, i), e.compileShader(o), e.getShaderParameter(o, e.COMPILE_STATUS) || console.log("Fragment shader failed to compile: " + e.getShaderInfoLog(o));
                var r = e.createProgram();
                e.attachShader(r, n), e.attachShader(r, o), e.linkProgram(r), e.getProgramParameter(r, e.LINK_STATUS) || console.log("Program failed to compile: " + e.getProgramInfoLog(r)), e.useProgram(r);
                var s = e.createBuffer();
                e.bindBuffer(e.ARRAY_BUFFER, s), e.bufferData(e.ARRAY_BUFFER, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]), e.STATIC_DRAW);
                var a = e.getAttribLocation(r, "vertexPos");
                e.enableVertexAttribArray(a), e.vertexAttribPointer(a, 2, e.FLOAT, !1, 0, 0);
                var A = e.createBuffer();
                e.bindBuffer(e.ARRAY_BUFFER, A), e.bufferData(e.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), e.STATIC_DRAW);
                var c = e.getAttribLocation(r, "texturePos");

                function d(t, i) {
                    var n = e.createTexture();
                    return e.bindTexture(e.TEXTURE_2D, n), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.bindTexture(e.TEXTURE_2D, null), e.uniform1i(e.getUniformLocation(r, t), i), n
                }

                e.enableVertexAttribArray(c), e.vertexAttribPointer(c, 2, e.FLOAT, !1, 0, 0);
                var l = d("ySampler", 0), u = d("uSampler", 1), h = d("vSampler", 2);
                return {
                    render: function (t, i, n, o, r) {
                        e.viewport(0, 0, t, i), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, l), e.texImage2D(e.TEXTURE_2D, 0, e.LUMINANCE, t, i, 0, e.LUMINANCE, e.UNSIGNED_BYTE, n), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, u), e.texImage2D(e.TEXTURE_2D, 0, e.LUMINANCE, t / 2, i / 2, 0, e.LUMINANCE, e.UNSIGNED_BYTE, o), e.activeTexture(e.TEXTURE2), e.bindTexture(e.TEXTURE_2D, h), e.texImage2D(e.TEXTURE_2D, 0, e.LUMINANCE, t / 2, i / 2, 0, e.LUMINANCE, e.UNSIGNED_BYTE, r), e.drawArrays(e.TRIANGLE_STRIP, 0, 4)
                    }, destroy: function () {
                        try {
                            e.deleteProgram(r), e.deleteBuffer(s), e.deleteBuffer(A), e.deleteTexture(l), e.deleteTexture(u), e.deleteBuffer(h)
                        } catch (e) {
                        }
                    }
                }
            })(this.contextGl);
            this.contextGlRender = e.render, this.contextGlDestroy = e.destroy
        }

        _initContext2D() {
            this.context2D = this.$videoElement.getContext("2d")
        }

        _initCanvasRender() {
            this.player._opt.useWCS && !this._supportOffscreen() ? (this.renderType = Q, this._initContext2D()) : this._supportOffscreen() ? (this.renderType = W, this._bindOffscreen()) : (this.renderType = N, this._initContextGl())
        }

        _supportOffscreen() {
            return "function" == typeof this.$videoElement.transferControlToOffscreen && this.player._opt.useOffscreen
        }

        _bindOffscreen() {
            this.bitmaprenderer = this.$videoElement.getContext("bitmaprenderer")
        }

        initCanvasViewSize() {
            this.$videoElement.width = this.videoInfo.width, this.$videoElement.height = this.videoInfo.height, this.resize()
        }

        render(e) {
            switch (this.player.videoTimestamp = e.ts, this.renderType) {
                case W:
                    this.bitmaprenderer.transferFromImageBitmap(e.buffer);
                    break;
                case N:
                    this.contextGlRender(this.$videoElement.width, this.$videoElement.height, e.output[0], e.output[1], e.output[2]);
                    break;
                case Q:
                    this.context2D.drawImage(e.videoFrame, 0, 0, this.$videoElement.width, this.$videoElement.height)
            }
        }

        screenshot(e, t, i, n) {
            e = e || ne(), n = n || k.download;
            const o = {png: "image/png", jpeg: "image/jpeg", webp: "image/webp"};
            let r = .92;
            !o[t] && k[t] && (n = t, t = "png", i = void 0), "string" == typeof i && (n = i, i = void 0), void 0 !== i && (r = Number(i));
            const s = this.$videoElement.toDataURL(o[t] || o.png, r), a = te(s);
            return n === k.base64 ? s : n === k.blob ? a : void (n === k.download && ie(a, e))
        }

        clearView() {
            switch (this.renderType) {
                case W:
                    (function (e, t) {
                        const i = document.createElement("canvas");
                        return i.width = e, i.height = t, createImageBitmap(i, 0, 0, e, t)
                    })(this.$videoElement.width, this.$videoElement.height).then((e => {
                        this.bitmaprenderer.transferFromImageBitmap(e)
                    }));
                    break;
                case N:
                    this.contextGl.clear(this.contextGl.COLOR_BUFFER_BIT);
                    break;
                case Q:
                    this.context2D.clearRect(0, 0, this.$videoElement.width, this.$videoElement.height)
            }
        }

        resize() {
            this.player.debug.log("canvasVideo", "resize");
            const e = this.player._opt, t = this.player.width;
            let i = this.player.height;
            e.hasControl && (i -= 38);
            let n = this.$videoElement.width, o = this.$videoElement.height;
            const r = e.rotate;
            let s = (t - n) / 2, a = (i - o) / 2;
            270 !== r && 90 !== r || (n = this.$videoElement.height, o = this.$videoElement.width);
            const A = t / n, c = i / o;
            let d = A > c ? c : A;
            e.isResize || A !== c && (d = A + "," + c), e.isFullResize && (d = A > c ? A : c);
            let l = "scale(" + d + ")";
            r && (l += " rotate(" + r + "deg)"), this.$videoElement.style.transform = l, this.$videoElement.style.left = s + "px", this.$videoElement.style.top = a + "px"
        }

        destroy() {
            this.contextGl && (this.contextGl = null), this.context2D && (this.context2D = null), this.contextGlRender && (this.contextGlDestroy && this.contextGlDestroy(), this.contextGlDestroy = null, this.contextGlRender = null), this.bitmaprenderer && (this.bitmaprenderer = null), this.renderType = null, this.videoInfo = {
                width: "",
                height: "",
                encType: "",
                encTypeCode: ""
            }, this.player.$container.removeChild(this.$videoElement), this.init = !1, this.off(), this.player.debug.log("CanvasVideoLoader", "destroy")
        }
    }

    class pe extends he {
        constructor(e) {
            super(), this.player = e;
            const t = document.createElement("video");
            t.muted = !0, t.style.position = "absolute", t.style.top = 0, t.style.left = 0, e.$container.appendChild(t), this.$videoElement = t, this.videoInfo = {
                width: "",
                height: "",
                encType: ""
            }, this.resize();
            const {proxy: i} = this.player.events;
            i(this.$videoElement, "canplay", (() => {
                this.player.debug.log("Video", "canplay")
            })), i(this.$videoElement, "waiting", (() => {
                this.player.emit(v.videoWaiting)
            })), i(this.$videoElement, "timeupdate", (e => {
            })), this.player.debug.log("Video", "init")
        }

        play() {
            this.$videoElement.play()
        }

        clearView() {
        }

        screenshot(e, t, i, n) {
            e = e || ne(), n = n || k.download;
            let o = .92;
            !{
                png: "image/png",
                jpeg: "image/jpeg",
                webp: "image/webp"
            }[t] && k[t] && (n = t, t = "png", i = void 0), "string" == typeof i && (n = i, i = void 0), void 0 !== i && (o = Number(i));
            const r = this.$videoElement;
            let s = document.createElement("canvas");
            s.width = r.videoWidth, s.height = r.videoHeight;
            s.getContext("2d").drawImage(r, 0, 0, s.width, s.height);
            const a = s.toDataURL(k[t] || k.png, o), A = te(a);
            return n === k.base64 ? a : n === k.blob ? A : void (n === k.download && ie(A, e))
        }

        initCanvasViewSize() {
            this.resize()
        }

        resize() {
            this.$videoElement.width = this.player.width, this.$videoElement.height = this.player._opt.hasControl ? this.player.height - 38 : this.player.height;
            const e = this.player._opt;
            let t = "contain";
            const i = e.rotate;
            e.isResize || (t = "fill"), e.isFullResize && (t = "none"), this.$videoElement.style.objectFit = t, this.$videoElement.style.transform = "rotate(" + i + "deg)"
        }

        destroy() {
            this.player.$container.removeChild(this.$videoElement), this.init = !1, this.off(), this.player.debug.log("Video", "destroy")
        }
    }

    class ge {
        constructor(e) {
            return new (ge.getLoaderFactory(e._opt))(e)
        }

        static getLoaderFactory(e) {
            return e.useMSE ? pe : fe
        }
    }

    class me extends ue {
        constructor(e) {
            super(), this.bufferList = [], this.player = e, this.scriptNode = null, this.hasInitScriptNode = !1, this.audioContextChannel = null, this.audioContext = new (window.AudioContext || window.webkitAudioContext), this.gainNode = this.audioContext.createGain();
            const t = this.audioContext.createBufferSource();
            t.buffer = this.audioContext.createBuffer(1, 1, 22050), t.connect(this.audioContext.destination), t.noteOn ? t.noteOn(0) : t.start(0), this.audioBufferSourceNode = t, this.mediaStreamAudioDestinationNode = this.audioContext.createMediaStreamDestination(), this.audioEnabled(!0), this.gainNode.gain.value = 0, this.playing = !1, this.audioSyncVideoOption = {diff: null}, this.audioInfo = {
                encType: "",
                channels: "",
                sampleRate: ""
            }, this.init = !1, this.on(v.videoSyncAudio, (e => {
                this.player.debug.log("AudioContext", `videoSyncAudio , audioTimestamp: ${e.audioTimestamp},videoTimestamp: ${e.videoTimestamp},diff:${e.diff}`), this.audioSyncVideoOption = e
            })), this.player.debug.log("AudioContext", "init")
        }

        updateAudioInfo(e) {
            e.encTypeCode && (this.audioInfo.encType = L[e.encTypeCode]), e.channels && (this.audioInfo.channels = e.channels), e.sampleRate && (this.audioInfo.sampleRate = e.sampleRate), this.audioInfo.sampleRate && this.audioInfo.channels && this.audioInfo.encType && !this.init && (this.player.emit(v.audioInfo, this.audioInfo), this.init = !0)
        }

        get isPlaying() {
            return this.playing
        }

        get isMute() {
            return 0 === this.gainNode.gain.value || this.isStateSuspended()
        }

        get volume() {
            return this.gainNode.gain.value
        }

        get bufferSize() {
            return this.bufferList.length
        }

        initScriptNode() {
            if (this.playing = !0, this.hasInitScriptNode) return;
            const e = this.audioInfo.channels, t = this.audioContext.createScriptProcessor(1024, 0, e);
            t.onaudioprocess = t => {
                const i = t.outputBuffer;
                if (this.bufferList.length && this.playing) {
                    if (!this.player._opt.useWCS && !this.player._opt.useMSE) {
                        if (this.audioSyncVideoOption.diff > 200) return void this.player.debug.warn("AudioContext", `audioSyncVideoOption more than diff :${this.audioSyncVideoOption.diff}`);
                        if (this.audioSyncVideoOption.diff < -200) {
                            this.player.debug.warn("AudioContext", `audioSyncVideoOption less than diff :${this.audioSyncVideoOption.diff}`);
                            let e = this.bufferList.shift();
                            for (; e.ts - this.player.videoTimestamp < -200 && this.bufferList.length > 0;) e = this.bufferList.shift();
                            if (0 === this.bufferList.length) return
                        }
                    }
                    if (0 === this.bufferList.length) return;
                    const t = this.bufferList.shift();
                    t && t.ts && (this.player.audioTimestamp = t.ts);
                    for (let n = 0; n < e; n++) {
                        const e = t.buffer[n], o = i.getChannelData(n);
                        for (let t = 0; t < 1024; t++) o[t] = e[t] || 0
                    }
                }
            }, t.connect(this.gainNode), this.scriptNode = t, this.gainNode.connect(this.audioContext.destination), this.gainNode.connect(this.mediaStreamAudioDestinationNode), this.hasInitScriptNode = !0
        }

        mute(e) {
            e ? (this.isMute || this.player.emit(v.mute, e), this.setVolume(0), this.audioEnabled(!1), this.clear()) : (this.isMute && this.player.emit(v.mute, e), this.setVolume(.5), this.audioEnabled(!0))
        }

        setVolume(e) {
            e = parseFloat(e).toFixed(2), isNaN(e) || (this.audioEnabled(!0), e = oe(e, 0, 1), this.gainNode.gain.value = e, this.gainNode.gain.setValueAtTime(e, this.audioContext.currentTime), this.player.emit(v.volumechange, this.player.volume))
        }

        closeAudio() {
            this.hasInitScriptNode && (this.scriptNode && this.scriptNode.disconnect(this.gainNode), this.gainNode && this.gainNode.disconnect(this.audioContext.destination), this.gainNode && this.gainNode.disconnect(this.mediaStreamAudioDestinationNode)), this.clear()
        }

        audioEnabled(e) {
            e ? "suspended" === this.audioContext.state && this.audioContext.resume() : "running" === this.audioContext.state && this.audioContext.suspend()
        }

        isStateRunning() {
            return "running" === this.audioContext.state
        }

        isStateSuspended() {
            return "suspended" === this.audioContext.state
        }

        clear() {
            this.bufferList = []
        }

        play(e, t) {
            this.bufferList.push({
                buffer: e,
                ts: t
            }), this.bufferList.length > 20 && (this.player.debug.warn("AudioContext", `bufferList is large: ${this.bufferList.length}`), this.bufferList.length > 50 && this.bufferList.shift())
        }

        pause() {
            this.audioSyncVideoOption = {diff: null}, this.playing = !1, this.clear()
        }

        resume() {
            this.playing = !0
        }

        destroy() {
            this.closeAudio(), this.audioContext.close(), this.audioContext = null, this.gainNode = null, this.init = !1, this.scriptNode && (this.scriptNode.onaudioprocess = ee, this.scriptNode = null), this.audioBufferSourceNode = null, this.mediaStreamAudioDestinationNode = null, this.hasInitScriptNode = !1, this.audioSyncVideoOption = {diff: null}, this.off(), this.player.debug.log("AudioContext", "destroy")
        }
    }

    class be {
        constructor(e) {
            return new (be.getLoaderFactory())(e)
        }

        static getLoaderFactory() {
            return me
        }
    }

    class ye extends ue {
        constructor(e) {
            super(), this.player = e, this.playing = !1, this.abortController = new AbortController, this.streamRate = Ae((t => {
                e.emit(v.kBps, (t / 1024).toFixed(2))
            })), e.debug.log("FetchStream", "init")
        }

        fetchStream(e) {
            const {demux: t} = this.player;
            fetch(e, {signal: this.abortController.signal}).then((e => {
                const i = e.body.getReader();
                this.emit(v.streamSuccess);
                const n = () => {
                    i.read().then((e => {
                        let {done: i, value: o} = e;
                        i ? t.close() : (this.streamRate && this.streamRate(o.byteLength), t.dispatch(o), n())
                    })).catch((e => {
                        t.close(), this.emit(E.fetchError, e), this.player.emit(v.error, E.fetchError), this.abort()
                    }))
                };
                n()
            })).catch((e => {
                this.abort(), this.emit(E.fetchError, e), this.player.emit(v.error, E.fetchError)
            }))
        }

        abort() {
            this.abortController && (this.abortController.abort(), this.abortController = null)
        }

        destroy() {
            this.abort(), this.off(), this.streamRate = null, this.player.debug.log("FetchStream", "destroy")
        }
    }

    class ve extends ue {
        constructor(e) {
            super(), this.player = e, this.socket = null, this.socketStatus = S, this.wsUrl = null, this.streamRate = Ae((t => {
                e.emit(v.kBps, (t / 1024).toFixed(2))
            }))
        }

        _createWebSocket() {
            const e = this.player, {debug: t, events: {proxy: i}, demux: n} = e;
            this.socket = new WebSocket(this.wsUrl), this.socket.binaryType = "arraybuffer", i(this.socket, "open", (() => {
                this.emit(v.streamSuccess), t.log("websocketLoader", "socket open"), this.socketStatus = R
            })), i(this.socket, "message", (e => {
                this.streamRate && this.streamRate(e.data.byteLength), this._handleMessage(e.data)
            })), i(this.socket, "close", (() => {
                t.log("websocketLoader", "socket close"), this.emit(v.streamEnd), this.socketStatus = C
            })), i(this.socket, "error", (e => {
                t.log("websocketLoader", "socket error"), this.emit(E.websocketError, e), this.player.emit(v.error, E.websocketError), this.socketStatus = B, n.close(), t.log("websocketLoader", "socket error:", e)
            }))
        }

        _handleMessage(e) {
            const {demux: t} = this.player;
            t.dispatch(e)
        }

        fetchStream(e) {
            this.wsUrl = e, this._createWebSocket()
        }

        destroy() {
            this.socket && (this.socket.close(), this.socket = null), this.socketStatus = S, this.streamRate = null, this.off(), this.player.debug.log("websocketLoader", "destroy")
        }
    }

    class we {
        constructor(e) {
            return new (we.getLoaderFactory(e._opt.protocol))(e)
        }

        static getLoaderFactory(i) {
            return i === t ? ye : i === e ? ve : void 0
        }
    }

    var Ee = _((function (e) {
        function t(e, o) {
            if (!e) throw"First parameter is required.";
            o = new i(e, o = o || {type: "video"});
            var r = this;

            function s(t) {
                t && (o.initCallback = function () {
                    t(), t = o.initCallback = null
                });
                var i = new n(e, o);
                (h = new i(e, o)).record(), u("recording"), o.disableLogs || console.log("Initialized recorderType:", h.constructor.name, "for output-type:", o.type)
            }

            function a(e) {
                if (e = e || function () {
                }, h) {
                    if ("paused" === r.state) return r.resumeRecording(), void setTimeout((function () {
                        a(e)
                    }), 1);
                    "recording" === r.state || o.disableLogs || console.warn('Recording state should be: "recording", however current state is: ', r.state), o.disableLogs || console.log("Stopped recording " + o.type + " stream."), "gif" !== o.type ? h.stop(t) : (h.stop(), t()), u("stopped")
                } else p();

                function t(t) {
                    if (h) {
                        Object.keys(h).forEach((function (e) {
                            "function" != typeof h[e] && (r[e] = h[e])
                        }));
                        var i = h.blob;
                        if (!i) {
                            if (!t) throw"Recording failed.";
                            h.blob = i = t
                        }
                        if (i && !o.disableLogs && console.log(i.type, "->", m(i.size)), e) {
                            var n;
                            try {
                                n = d.createObjectURL(i)
                            } catch (e) {
                            }
                            "function" == typeof e.call ? e.call(r, n) : e(n)
                        }
                        o.autoWriteToDisk && c((function (e) {
                            var t = {};
                            t[o.type + "Blob"] = e, T.Store(t)
                        }))
                    } else "function" == typeof e.call ? e.call(r, "") : e("")
                }
            }

            function A(e) {
                postMessage((new FileReaderSync).readAsDataURL(e))
            }

            function c(e, t) {
                if (!e) throw"Pass a callback function over getDataURL.";
                var i = t ? t.blob : (h || {}).blob;
                if (!i) return o.disableLogs || console.warn("Blob encoder did not finish its job yet."), void setTimeout((function () {
                    c(e, t)
                }), 1e3);
                if ("undefined" == typeof Worker || navigator.mozGetUserMedia) {
                    var n = new FileReader;
                    n.readAsDataURL(i), n.onload = function (t) {
                        e(t.target.result)
                    }
                } else {
                    var r = function (e) {
                        try {
                            var t = d.createObjectURL(new Blob([e.toString(), "this.onmessage =  function (eee) {" + e.name + "(eee.data);}"], {type: "application/javascript"})),
                                i = new Worker(t);
                            return d.revokeObjectURL(t), i
                        } catch (e) {
                        }
                    }(A);
                    r.onmessage = function (t) {
                        e(t.data)
                    }, r.postMessage(i)
                }
            }

            function l(e) {
                e = e || 0, "paused" !== r.state ? "stopped" !== r.state && (e >= r.recordingDuration ? a(r.onRecordingStopped) : (e += 1e3, setTimeout((function () {
                    l(e)
                }), 1e3))) : setTimeout((function () {
                    l(e)
                }), 1e3)
            }

            function u(e) {
                r && (r.state = e, "function" == typeof r.onStateChanged.call ? r.onStateChanged.call(r, e) : r.onStateChanged(e))
            }

            var h,
                f = 'It seems that recorder is destroyed or "startRecording" is not invoked for ' + o.type + " recorder.";

            function p() {
                !0 !== o.disableLogs && console.warn(f)
            }

            var g = {
                startRecording: function (t) {
                    return o.disableLogs || console.log("RecordRTC version: ", r.version), t && (o = new i(e, t)), o.disableLogs || console.log("started recording " + o.type + " stream."), h ? (h.clearRecordedData(), h.record(), u("recording"), r.recordingDuration && l(), r) : (s((function () {
                        r.recordingDuration && l()
                    })), r)
                }, stopRecording: a, pauseRecording: function () {
                    h ? "recording" === r.state ? (u("paused"), h.pause(), o.disableLogs || console.log("Paused recording.")) : o.disableLogs || console.warn("Unable to pause the recording. Recording state: ", r.state) : p()
                }, resumeRecording: function () {
                    h ? "paused" === r.state ? (u("recording"), h.resume(), o.disableLogs || console.log("Resumed recording.")) : o.disableLogs || console.warn("Unable to resume the recording. Recording state: ", r.state) : p()
                }, initRecorder: s, setRecordingDuration: function (e, t) {
                    if (void 0 === e) throw"recordingDuration is required.";
                    if ("number" != typeof e) throw"recordingDuration must be a number.";
                    return r.recordingDuration = e, r.onRecordingStopped = t || function () {
                    }, {
                        onRecordingStopped: function (e) {
                            r.onRecordingStopped = e
                        }
                    }
                }, clearRecordedData: function () {
                    h ? (h.clearRecordedData(), o.disableLogs || console.log("Cleared old recorded data.")) : p()
                }, getBlob: function () {
                    if (h) return h.blob;
                    p()
                }, getDataURL: c, toURL: function () {
                    if (h) return d.createObjectURL(h.blob);
                    p()
                }, getInternalRecorder: function () {
                    return h
                }, save: function (e) {
                    h ? b(h.blob, e) : p()
                }, getFromDisk: function (e) {
                    h ? t.getFromDisk(o.type, e) : p()
                }, setAdvertisementArray: function (e) {
                    o.advertisement = [];
                    for (var t = e.length, i = 0; i < t; i++) o.advertisement.push({duration: i, image: e[i]})
                }, blob: null, bufferSize: 0, sampleRate: 0, buffer: null, reset: function () {
                    "recording" !== r.state || o.disableLogs || console.warn("Stop an active recorder."), h && "function" == typeof h.clearRecordedData && h.clearRecordedData(), h = null, u("inactive"), r.blob = null
                }, onStateChanged: function (e) {
                    o.disableLogs || console.log("Recorder state changed:", e)
                }, state: "inactive", getState: function () {
                    return r.state
                }, destroy: function () {
                    var e = o.disableLogs;
                    o = {disableLogs: !0}, r.reset(), u("destroyed"), g = r = null, E.AudioContextConstructor && (E.AudioContextConstructor.close(), E.AudioContextConstructor = null), o.disableLogs = e, o.disableLogs || console.log("RecordRTC is destroyed.")
                }, version: "5.6.2"
            };
            if (!this) return r = g, g;
            for (var y in g) this[y] = g[y];
            return r = this, g
        }

        function i(e, t) {
            return t.recorderType || t.type || (t.audio && t.video ? t.type = "video" : t.audio && !t.video && (t.type = "audio")), t.recorderType && !t.type && (t.recorderType === k || t.recorderType === B || t.recorderType === O ? t.type = "video" : t.recorderType === x ? t.type = "gif" : t.recorderType === C ? t.type = "audio" : t.recorderType === R && (v(e, "audio").length && v(e, "video").length || !v(e, "audio").length && v(e, "video").length ? t.type = "video" : v(e, "audio").length && !v(e, "video").length && (t.type = "audio"))), "undefined" != typeof MediaRecorder && "requestData" in MediaRecorder.prototype && (t.mimeType || (t.mimeType = "video/webm"), t.type || (t.type = t.mimeType.split("/")[0]), t.bitsPerSecond), t.type || (t.mimeType && (t.type = t.mimeType.split("/")[0]), t.type || (t.type = "audio")), t
        }

        function n(e, t) {
            var i;
            return (f || l || u) && (i = C), "undefined" != typeof MediaRecorder && "requestData" in MediaRecorder.prototype && !f && (i = R), "video" === t.type && (f || u) && (i = k, "undefined" != typeof ReadableStream && (i = O)), "gif" === t.type && (i = x), "canvas" === t.type && (i = B), S() && i !== B && i !== x && "undefined" != typeof MediaRecorder && "requestData" in MediaRecorder.prototype && (v(e, "video").length || v(e, "audio").length) && ("audio" === t.type ? "function" == typeof MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported("audio/webm") && (i = R) : "function" == typeof MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported("video/webm") && (i = R)), e instanceof Array && e.length && (i = D), t.recorderType && (i = t.recorderType), !t.disableLogs && i && i.name && console.log("Using recorderType:", i.name || i.constructor.name), !i && p && (i = R), i
        }

        function o(e) {
            this.addStream = function (t) {
                t && (e = t)
            }, this.mediaType = {audio: !0, video: !0}, this.startRecording = function () {
                var i, n = this.mediaType, o = this.mimeType || {audio: null, video: null, gif: null};
                if ("function" != typeof n.audio && S() && !v(e, "audio").length && (n.audio = !1), "function" != typeof n.video && S() && !v(e, "video").length && (n.video = !1), "function" != typeof n.gif && S() && !v(e, "video").length && (n.gif = !1), !n.audio && !n.video && !n.gif) throw"MediaStream must have either audio or video tracks.";
                if (n.audio && (i = null, "function" == typeof n.audio && (i = n.audio), this.audioRecorder = new t(e, {
                    type: "audio",
                    bufferSize: this.bufferSize,
                    sampleRate: this.sampleRate,
                    numberOfAudioChannels: this.numberOfAudioChannels || 2,
                    disableLogs: this.disableLogs,
                    recorderType: i,
                    mimeType: o.audio,
                    timeSlice: this.timeSlice,
                    onTimeStamp: this.onTimeStamp
                }), n.video || this.audioRecorder.startRecording()), n.video) {
                    i = null, "function" == typeof n.video && (i = n.video);
                    var r = e;
                    if (S() && n.audio && "function" == typeof n.audio) {
                        var s = v(e, "video")[0];
                        h ? ((r = new g).addTrack(s), i && i === k && (i = R)) : (r = new g).addTrack(s)
                    }
                    this.videoRecorder = new t(r, {
                        type: "video",
                        video: this.video,
                        canvas: this.canvas,
                        frameInterval: this.frameInterval || 10,
                        disableLogs: this.disableLogs,
                        recorderType: i,
                        mimeType: o.video,
                        timeSlice: this.timeSlice,
                        onTimeStamp: this.onTimeStamp,
                        workerPath: this.workerPath,
                        webAssemblyPath: this.webAssemblyPath,
                        frameRate: this.frameRate,
                        bitrate: this.bitrate
                    }), n.audio || this.videoRecorder.startRecording()
                }
                if (n.audio && n.video) {
                    var a = this, A = !0 === S();
                    (n.audio instanceof C && n.video || !0 !== n.audio && !0 !== n.video && n.audio !== n.video) && (A = !1), !0 === A ? (a.audioRecorder = null, a.videoRecorder.startRecording()) : a.videoRecorder.initRecorder((function () {
                        a.audioRecorder.initRecorder((function () {
                            a.videoRecorder.startRecording(), a.audioRecorder.startRecording()
                        }))
                    }))
                }
                n.gif && (i = null, "function" == typeof n.gif && (i = n.gif), this.gifRecorder = new t(e, {
                    type: "gif",
                    frameRate: this.frameRate || 200,
                    quality: this.quality || 10,
                    disableLogs: this.disableLogs,
                    recorderType: i,
                    mimeType: o.gif
                }), this.gifRecorder.startRecording())
            }, this.stopRecording = function (e) {
                e = e || function () {
                }, this.audioRecorder && this.audioRecorder.stopRecording((function (t) {
                    e(t, "audio")
                })), this.videoRecorder && this.videoRecorder.stopRecording((function (t) {
                    e(t, "video")
                })), this.gifRecorder && this.gifRecorder.stopRecording((function (t) {
                    e(t, "gif")
                }))
            }, this.pauseRecording = function () {
                this.audioRecorder && this.audioRecorder.pauseRecording(), this.videoRecorder && this.videoRecorder.pauseRecording(), this.gifRecorder && this.gifRecorder.pauseRecording()
            }, this.resumeRecording = function () {
                this.audioRecorder && this.audioRecorder.resumeRecording(), this.videoRecorder && this.videoRecorder.resumeRecording(), this.gifRecorder && this.gifRecorder.resumeRecording()
            }, this.getBlob = function (e) {
                var t = {};
                return this.audioRecorder && (t.audio = this.audioRecorder.getBlob()), this.videoRecorder && (t.video = this.videoRecorder.getBlob()), this.gifRecorder && (t.gif = this.gifRecorder.getBlob()), e && e(t), t
            }, this.destroy = function () {
                this.audioRecorder && (this.audioRecorder.destroy(), this.audioRecorder = null), this.videoRecorder && (this.videoRecorder.destroy(), this.videoRecorder = null), this.gifRecorder && (this.gifRecorder.destroy(), this.gifRecorder = null)
            }, this.getDataURL = function (e) {
                function t(e, t) {
                    if ("undefined" != typeof Worker) {
                        var i = function (e) {
                            var t,
                                i = d.createObjectURL(new Blob([e.toString(), "this.onmessage =  function (eee) {" + e.name + "(eee.data);}"], {type: "application/javascript"})),
                                n = new Worker(i);
                            if (void 0 !== d) t = d; else {
                                if ("undefined" == typeof webkitURL) throw"Neither URL nor webkitURL detected.";
                                t = webkitURL
                            }
                            return t.revokeObjectURL(i), n
                        }((function (e) {
                            postMessage((new FileReaderSync).readAsDataURL(e))
                        }));
                        i.onmessage = function (e) {
                            t(e.data)
                        }, i.postMessage(e)
                    } else {
                        var n = new FileReader;
                        n.readAsDataURL(e), n.onload = function (e) {
                            t(e.target.result)
                        }
                    }
                }

                this.getBlob((function (i) {
                    i.audio && i.video ? t(i.audio, (function (n) {
                        t(i.video, (function (t) {
                            e({audio: n, video: t})
                        }))
                    })) : i.audio ? t(i.audio, (function (t) {
                        e({audio: t})
                    })) : i.video && t(i.video, (function (t) {
                        e({video: t})
                    }))
                }))
            }, this.writeToDisk = function () {
                t.writeToDisk({audio: this.audioRecorder, video: this.videoRecorder, gif: this.gifRecorder})
            }, this.save = function (e) {
                (e = e || {
                    audio: !0,
                    video: !0,
                    gif: !0
                }).audio && this.audioRecorder && this.audioRecorder.save("string" == typeof e.audio ? e.audio : ""), e.video && this.videoRecorder && this.videoRecorder.save("string" == typeof e.video ? e.video : ""), e.gif && this.gifRecorder && this.gifRecorder.save("string" == typeof e.gif ? e.gif : "")
            }
        }

        t.version = "5.6.2", e.exports = t, t.getFromDisk = function (e, t) {
            if (!t) throw"callback is mandatory.";
            console.log("Getting recorded " + ("all" === e ? "blobs" : e + " blob ") + " from disk!"), T.Fetch((function (i, n) {
                "all" !== e && n === e + "Blob" && t && t(i), "all" === e && t && t(i, n.replace("Blob", ""))
            }))
        }, t.writeToDisk = function (e) {
            console.log("Writing recorded blob(s) to disk!"), (e = e || {}).audio && e.video && e.gif ? e.audio.getDataURL((function (t) {
                e.video.getDataURL((function (i) {
                    e.gif.getDataURL((function (e) {
                        T.Store({audioBlob: t, videoBlob: i, gifBlob: e})
                    }))
                }))
            })) : e.audio && e.video ? e.audio.getDataURL((function (t) {
                e.video.getDataURL((function (e) {
                    T.Store({audioBlob: t, videoBlob: e})
                }))
            })) : e.audio && e.gif ? e.audio.getDataURL((function (t) {
                e.gif.getDataURL((function (e) {
                    T.Store({audioBlob: t, gifBlob: e})
                }))
            })) : e.video && e.gif ? e.video.getDataURL((function (t) {
                e.gif.getDataURL((function (e) {
                    T.Store({videoBlob: t, gifBlob: e})
                }))
            })) : e.audio ? e.audio.getDataURL((function (e) {
                T.Store({audioBlob: e})
            })) : e.video ? e.video.getDataURL((function (e) {
                T.Store({videoBlob: e})
            })) : e.gif && e.gif.getDataURL((function (e) {
                T.Store({gifBlob: e})
            }))
        }, o.getFromDisk = t.getFromDisk, o.writeToDisk = t.writeToDisk, t.MRecordRTC = o;
        var r;
        (r = void 0 !== K ? K : null) && "undefined" == typeof window && void 0 !== K && (K.navigator = {
            userAgent: "Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45",
            getUserMedia: function () {
            }
        }, K.console || (K.console = {}), void 0 !== K.console.log && void 0 !== K.console.error || (K.console.error = K.console.log = K.console.log || function () {
            console.log(arguments)
        }), "undefined" == typeof document && (r.document = {
            documentElement: {
                appendChild: function () {
                    return ""
                }
            }
        }, document.createElement = document.captureStream = document.mozCaptureStream = function () {
            var e = {
                getContext: function () {
                    return e
                }, play: function () {
                }, pause: function () {
                }, drawImage: function () {
                }, toDataURL: function () {
                    return ""
                }, style: {}
            };
            return e
        }, r.HTMLVideoElement = function () {
        }), "undefined" == typeof location && (r.location = {
            protocol: "file:",
            href: "",
            hash: ""
        }), "undefined" == typeof screen && (r.screen = {
            width: 0,
            height: 0
        }), void 0 === d && (r.URL = {
            createObjectURL: function () {
                return ""
            }, revokeObjectURL: function () {
                return ""
            }
        }), r.window = K);
        var s = window.requestAnimationFrame;
        if (void 0 === s) if ("undefined" != typeof webkitRequestAnimationFrame) s = webkitRequestAnimationFrame; else if ("undefined" != typeof mozRequestAnimationFrame) s = mozRequestAnimationFrame; else if ("undefined" != typeof msRequestAnimationFrame) s = msRequestAnimationFrame; else if (void 0 === s) {
            var a = 0;
            s = function (e, t) {
                var i = (new Date).getTime(), n = Math.max(0, 16 - (i - a)), o = setTimeout((function () {
                    e(i + n)
                }), n);
                return a = i + n, o
            }
        }
        var A = window.cancelAnimationFrame;
        void 0 === A && ("undefined" != typeof webkitCancelAnimationFrame ? A = webkitCancelAnimationFrame : "undefined" != typeof mozCancelAnimationFrame ? A = mozCancelAnimationFrame : "undefined" != typeof msCancelAnimationFrame ? A = msCancelAnimationFrame : void 0 === A && (A = function (e) {
            clearTimeout(e)
        }));
        var c = window.AudioContext;
        void 0 === c && ("undefined" != typeof webkitAudioContext && (c = webkitAudioContext), "undefined" != typeof mozAudioContext && (c = mozAudioContext));
        var d = window.URL;
        void 0 === d && "undefined" != typeof webkitURL && (d = webkitURL), "undefined" != typeof navigator && void 0 === navigator.getUserMedia && (void 0 !== navigator.webkitGetUserMedia && (navigator.getUserMedia = navigator.webkitGetUserMedia), void 0 !== navigator.mozGetUserMedia && (navigator.getUserMedia = navigator.mozGetUserMedia));
        var l = !(-1 === navigator.userAgent.indexOf("Edge") || !navigator.msSaveBlob && !navigator.msSaveOrOpenBlob),
            u = !!window.opera || -1 !== navigator.userAgent.indexOf("OPR/"),
            h = navigator.userAgent.toLowerCase().indexOf("firefox") > -1 && "netscape" in window && / rv:/.test(navigator.userAgent),
            f = !u && !l && !!navigator.webkitGetUserMedia || y() || -1 !== navigator.userAgent.toLowerCase().indexOf("chrome/"),
            p = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        p && !f && -1 !== navigator.userAgent.indexOf("CriOS") && (p = !1, f = !0);
        var g = window.MediaStream;

        function m(e) {
            if (0 === e) return "0 Bytes";
            var t = parseInt(Math.floor(Math.log(e) / Math.log(1e3)), 10);
            return (e / Math.pow(1e3, t)).toPrecision(3) + " " + ["Bytes", "KB", "MB", "GB", "TB"][t]
        }

        function b(e, t) {
            if (!e) throw"Blob object is required.";
            if (!e.type) try {
                e.type = "video/webm"
            } catch (e) {
            }
            var i = (e.type || "video/webm").split("/")[1];
            if (-1 !== i.indexOf(";") && (i = i.split(";")[0]), t && -1 !== t.indexOf(".")) {
                var n = t.split(".");
                t = n[0], i = n[1]
            }
            var o = (t || Math.round(9999999999 * Math.random()) + 888888888) + "." + i;
            if (void 0 !== navigator.msSaveOrOpenBlob) return navigator.msSaveOrOpenBlob(e, o);
            if (void 0 !== navigator.msSaveBlob) return navigator.msSaveBlob(e, o);
            var r = document.createElement("a");
            r.href = d.createObjectURL(e), r.download = o, r.style = "display:none;opacity:0;color:transparent;", (document.body || document.documentElement).appendChild(r), "function" == typeof r.click ? r.click() : (r.target = "_blank", r.dispatchEvent(new MouseEvent("click", {
                view: window,
                bubbles: !0,
                cancelable: !0
            }))), d.revokeObjectURL(r.href)
        }

        function y() {
            return "undefined" != typeof window && "object" == typeof window.process && "renderer" === window.process.type || (!("undefined" == typeof process || "object" != typeof process.versions || !process.versions.electron) || "object" == typeof navigator && "string" == typeof navigator.userAgent && navigator.userAgent.indexOf("Electron") >= 0)
        }

        function v(e, t) {
            return e && e.getTracks ? e.getTracks().filter((function (e) {
                return e.kind === (t || "audio")
            })) : []
        }

        function w(e, t) {
            "srcObject" in t ? t.srcObject = e : "mozSrcObject" in t ? t.mozSrcObject = e : t.srcObject = e
        }

        void 0 === g && "undefined" != typeof webkitMediaStream && (g = webkitMediaStream), void 0 !== g && void 0 === g.prototype.stop && (g.prototype.stop = function () {
            this.getTracks().forEach((function (e) {
                e.stop()
            }))
        }), t.invokeSaveAsDialog = b, t.getTracks = v, t.getSeekableBlob = function (e, t) {
            if ("undefined" == typeof EBML) throw new Error("Please link: https://www.webrtc-experiment.com/EBML.js");
            var i = new EBML.Reader, n = new EBML.Decoder, o = EBML.tools, r = new FileReader;
            r.onload = function (e) {
                n.decode(this.result).forEach((function (e) {
                    i.read(e)
                })), i.stop();
                var r = o.makeMetadataSeekable(i.metadatas, i.duration, i.cues), s = this.result.slice(i.metadataSize),
                    a = new Blob([r, s], {type: "video/webm"});
                t(a)
            }, r.readAsArrayBuffer(e)
        }, t.bytesToSize = m, t.isElectron = y;
        var E = {};

        function S() {
            if (h || p || l) return !0;
            var e, t, i = navigator.userAgent, n = "" + parseFloat(navigator.appVersion),
                o = parseInt(navigator.appVersion, 10);
            return (f || u) && (e = i.indexOf("Chrome"), n = i.substring(e + 7)), -1 !== (t = n.indexOf(";")) && (n = n.substring(0, t)), -1 !== (t = n.indexOf(" ")) && (n = n.substring(0, t)), o = parseInt("" + n, 10), isNaN(o) && (n = "" + parseFloat(navigator.appVersion), o = parseInt(navigator.appVersion, 10)), o >= 49
        }

        function R(e, t) {
            var i = this;
            if (void 0 === e) throw'First argument "MediaStream" is required.';
            if ("undefined" == typeof MediaRecorder) throw"Your browser does not support the Media Recorder API. Please try other modules e.g. WhammyRecorder or StereoAudioRecorder.";
            if ("audio" === (t = t || {mimeType: "video/webm"}).type) {
                var n;
                if (v(e, "video").length && v(e, "audio").length) navigator.mozGetUserMedia ? (n = new g).addTrack(v(e, "audio")[0]) : n = new g(v(e, "audio")), e = n;
                t.mimeType && -1 !== t.mimeType.toString().toLowerCase().indexOf("audio") || (t.mimeType = f ? "audio/webm" : "audio/ogg"), t.mimeType && "audio/ogg" !== t.mimeType.toString().toLowerCase() && navigator.mozGetUserMedia && (t.mimeType = "audio/ogg")
            }
            var o, r = [];

            function s() {
                i.timestamps.push((new Date).getTime()), "function" == typeof t.onTimeStamp && t.onTimeStamp(i.timestamps[i.timestamps.length - 1], i.timestamps)
            }

            function a(e) {
                return o && o.mimeType ? o.mimeType : e.mimeType || "video/webm"
            }

            function A() {
                r = [], o = null, i.timestamps = []
            }

            this.getArrayOfBlobs = function () {
                return r
            }, this.record = function () {
                i.blob = null, i.clearRecordedData(), i.timestamps = [], c = [], r = [];
                var n = t;
                t.disableLogs || console.log("Passing following config over MediaRecorder API.", n), o && (o = null), f && !S() && (n = "video/vp8"), "function" == typeof MediaRecorder.isTypeSupported && n.mimeType && (MediaRecorder.isTypeSupported(n.mimeType) || (t.disableLogs || console.warn("MediaRecorder API seems unable to record mimeType:", n.mimeType), n.mimeType = "audio" === t.type ? "audio/webm" : "video/webm"));
                try {
                    o = new MediaRecorder(e, n), t.mimeType = n.mimeType
                } catch (t) {
                    o = new MediaRecorder(e)
                }
                n.mimeType && !MediaRecorder.isTypeSupported && "canRecordMimeType" in o && !1 === o.canRecordMimeType(n.mimeType) && (t.disableLogs || console.warn("MediaRecorder API seems unable to record mimeType:", n.mimeType)), o.ondataavailable = function (e) {
                    if (e.data && c.push("ondataavailable: " + m(e.data.size)), "number" != typeof t.timeSlice) !e.data || !e.data.size || e.data.size < 100 || i.blob ? i.recordingCallback && (i.recordingCallback(new Blob([], {type: a(n)})), i.recordingCallback = null) : (i.blob = t.getNativeBlob ? e.data : new Blob([e.data], {type: a(n)}), i.recordingCallback && (i.recordingCallback(i.blob), i.recordingCallback = null)); else if (e.data && e.data.size && (r.push(e.data), s(), "function" == typeof t.ondataavailable)) {
                        var o = t.getNativeBlob ? e.data : new Blob([e.data], {type: a(n)});
                        t.ondataavailable(o)
                    }
                }, o.onstart = function () {
                    c.push("started")
                }, o.onpause = function () {
                    c.push("paused")
                }, o.onresume = function () {
                    c.push("resumed")
                }, o.onstop = function () {
                    c.push("stopped")
                }, o.onerror = function (e) {
                    e && (e.name || (e.name = "UnknownError"), c.push("error: " + e), t.disableLogs || (-1 !== e.name.toString().toLowerCase().indexOf("invalidstate") ? console.error("The MediaRecorder is not in a state in which the proposed operation is allowed to be executed.", e) : -1 !== e.name.toString().toLowerCase().indexOf("notsupported") ? console.error("MIME type (", n.mimeType, ") is not supported.", e) : -1 !== e.name.toString().toLowerCase().indexOf("security") ? console.error("MediaRecorder security error", e) : "OutOfMemory" === e.name ? console.error("The UA has exhaused the available memory. User agents SHOULD provide as much additional information as possible in the message attribute.", e) : "IllegalStreamModification" === e.name ? console.error("A modification to the stream has occurred that makes it impossible to continue recording. An example would be the addition of a Track while recording is occurring. User agents SHOULD provide as much additional information as possible in the message attribute.", e) : "OtherRecordingError" === e.name ? console.error("Used for an fatal error other than those listed above. User agents SHOULD provide as much additional information as possible in the message attribute.", e) : "GenericError" === e.name ? console.error("The UA cannot provide the codec or recording option that has been requested.", e) : console.error("MediaRecorder Error", e)), function (e) {
                        if (!i.manuallyStopped && o && "inactive" === o.state) return delete t.timeslice, void o.start(6e5);
                        setTimeout(void 0, 1e3)
                    }(), "inactive" !== o.state && "stopped" !== o.state && o.stop())
                }, "number" == typeof t.timeSlice ? (s(), o.start(t.timeSlice)) : o.start(36e5), t.initCallback && t.initCallback()
            }, this.timestamps = [], this.stop = function (e) {
                e = e || function () {
                }, i.manuallyStopped = !0, o && (this.recordingCallback = e, "recording" === o.state && o.stop(), "number" == typeof t.timeSlice && setTimeout((function () {
                    i.blob = new Blob(r, {type: a(t)}), i.recordingCallback(i.blob)
                }), 100))
            }, this.pause = function () {
                o && "recording" === o.state && o.pause()
            }, this.resume = function () {
                o && "paused" === o.state && o.resume()
            }, this.clearRecordedData = function () {
                o && "recording" === o.state && i.stop(A), A()
            }, this.getInternalRecorder = function () {
                return o
            }, this.blob = null, this.getState = function () {
                return o && o.state || "inactive"
            };
            var c = [];
            this.getAllStates = function () {
                return c
            }, void 0 === t.checkForInactiveTracks && (t.checkForInactiveTracks = !1);
            i = this;
            !function n() {
                if (o && !1 !== t.checkForInactiveTracks) return !1 === function () {
                    if ("active" in e) {
                        if (!e.active) return !1
                    } else if ("ended" in e && e.ended) return !1;
                    return !0
                }() ? (t.disableLogs || console.log("MediaStream seems stopped."), void i.stop()) : void setTimeout(n, 1e3)
            }(), this.name = "MediaStreamRecorder", this.toString = function () {
                return this.name
            }
        }

        function C(e, i) {
            if (!v(e, "audio").length) throw"Your stream has no audio tracks.";
            var n, o = this, r = [], s = [], a = !1, A = 0, c = 2, l = (i = i || {}).desiredSampRate;

            function u() {
                if (!1 === i.checkForInactiveTracks) return !0;
                if ("active" in e) {
                    if (!e.active) return !1
                } else if ("ended" in e && e.ended) return !1;
                return !0
            }

            function h(e, t) {
                function i(e, t) {
                    var i, n = e.numberOfAudioChannels, o = e.leftBuffers.slice(0), r = e.rightBuffers.slice(0),
                        s = e.sampleRate, a = e.internalInterleavedLength, A = e.desiredSampRate;

                    function c(e, t, i) {
                        var n = Math.round(e.length * (t / i)), o = [], r = Number((e.length - 1) / (n - 1));
                        o[0] = e[0];
                        for (var s = 1; s < n - 1; s++) {
                            var a = s * r, A = Number(Math.floor(a)).toFixed(), c = Number(Math.ceil(a)).toFixed(),
                                l = a - A;
                            o[s] = d(e[A], e[c], l)
                        }
                        return o[n - 1] = e[e.length - 1], o
                    }

                    function d(e, t, i) {
                        return e + (t - e) * i
                    }

                    function l(e, t) {
                        for (var i = new Float64Array(t), n = 0, o = e.length, r = 0; r < o; r++) {
                            var s = e[r];
                            i.set(s, n), n += s.length
                        }
                        return i
                    }

                    function u(e, t, i) {
                        for (var n = i.length, o = 0; o < n; o++) e.setUint8(t + o, i.charCodeAt(o))
                    }

                    2 === n && (o = l(o, a), r = l(r, a), A && (o = c(o, A, s), r = c(r, A, s))), 1 === n && (o = l(o, a), A && (o = c(o, A, s))), A && (s = A), 2 === n && (i = function (e, t) {
                        for (var i = e.length + t.length, n = new Float64Array(i), o = 0, r = 0; r < i;) n[r++] = e[o], n[r++] = t[o], o++;
                        return n
                    }(o, r)), 1 === n && (i = o);
                    var h = i.length, f = new ArrayBuffer(44 + 2 * h), p = new DataView(f);
                    u(p, 0, "RIFF"), p.setUint32(4, 36 + 2 * h, !0), u(p, 8, "WAVE"), u(p, 12, "fmt "), p.setUint32(16, 16, !0), p.setUint16(20, 1, !0), p.setUint16(22, n, !0), p.setUint32(24, s, !0), p.setUint32(28, s * n * 2, !0), p.setUint16(32, 2 * n, !0), p.setUint16(34, 16, !0), u(p, 36, "data"), p.setUint32(40, 2 * h, !0);
                    for (var g = h, m = 44, b = 0; b < g; b++) p.setInt16(m, 32767 * i[b], !0), m += 2;
                    if (t) return t({buffer: f, view: p});
                    postMessage({buffer: f, view: p})
                }

                if (e.noWorker) i(e, (function (e) {
                    t(e.buffer, e.view)
                })); else {
                    var n, o, r,
                        s = (n = i, o = d.createObjectURL(new Blob([n.toString(), ";this.onmessage =  function (eee) {" + n.name + "(eee.data);}"], {type: "application/javascript"})), (r = new Worker(o)).workerURL = o, r);
                    s.onmessage = function (e) {
                        t(e.data.buffer, e.data.view), d.revokeObjectURL(s.workerURL), s.terminate()
                    }, s.postMessage(e)
                }
            }

            !0 === i.leftChannel && (c = 1), 1 === i.numberOfAudioChannels && (c = 1), (!c || c < 1) && (c = 2), i.disableLogs || console.log("StereoAudioRecorder is set to record number of channels: " + c), void 0 === i.checkForInactiveTracks && (i.checkForInactiveTracks = !0), this.record = function () {
                if (!1 === u()) throw"Please make sure MediaStream is active.";
                w(), S = y = !1, a = !0, void 0 !== i.timeSlice && C()
            }, this.stop = function (e) {
                e = e || function () {
                }, a = !1, h({
                    desiredSampRate: l,
                    sampleRate: b,
                    numberOfAudioChannels: c,
                    internalInterleavedLength: A,
                    leftBuffers: r,
                    rightBuffers: 1 === c ? [] : s,
                    noWorker: i.noWorker
                }, (function (t, i) {
                    o.blob = new Blob([i], {type: "audio/wav"}), o.buffer = new ArrayBuffer(i.buffer.byteLength), o.view = i, o.sampleRate = l || b, o.bufferSize = m, o.length = A, S = !1, e && e(o.blob)
                }))
            }, void 0 === t.Storage && (t.Storage = {
                AudioContextConstructor: null,
                AudioContext: window.AudioContext || window.webkitAudioContext
            }), t.Storage.AudioContextConstructor && "closed" !== t.Storage.AudioContextConstructor.state || (t.Storage.AudioContextConstructor = new t.Storage.AudioContext);
            var f = t.Storage.AudioContextConstructor, p = f.createMediaStreamSource(e),
                g = [0, 256, 512, 1024, 2048, 4096, 8192, 16384], m = void 0 === i.bufferSize ? 4096 : i.bufferSize;
            if (-1 === g.indexOf(m) && (i.disableLogs || console.log("Legal values for buffer-size are " + JSON.stringify(g, null, "\t"))), f.createJavaScriptNode) n = f.createJavaScriptNode(m, c, c); else {
                if (!f.createScriptProcessor) throw"WebAudio API has no support on this browser.";
                n = f.createScriptProcessor(m, c, c)
            }
            p.connect(n), i.bufferSize || (m = n.bufferSize);
            var b = void 0 !== i.sampleRate ? i.sampleRate : f.sampleRate || 44100;
            (b < 22050 || b > 96e3) && (i.disableLogs || console.log("sample-rate must be under range 22050 and 96000.")), i.disableLogs || i.desiredSampRate && console.log("Desired sample-rate: " + i.desiredSampRate);
            var y = !1;

            function w() {
                r = [], s = [], A = 0, S = !1, a = !1, y = !1, f = null, o.leftchannel = r, o.rightchannel = s, o.numberOfAudioChannels = c, o.desiredSampRate = l, o.sampleRate = b, o.recordingLength = A, R = {
                    left: [],
                    right: [],
                    recordingLength: 0
                }
            }

            function E() {
                n && (n.onaudioprocess = null, n.disconnect(), n = null), p && (p.disconnect(), p = null), w()
            }

            this.pause = function () {
                y = !0
            }, this.resume = function () {
                if (!1 === u()) throw"Please make sure MediaStream is active.";
                if (!a) return i.disableLogs || console.log("Seems recording has been restarted."), void this.record();
                y = !1
            }, this.clearRecordedData = function () {
                i.checkForInactiveTracks = !1, a && this.stop(E), E()
            }, this.name = "StereoAudioRecorder", this.toString = function () {
                return this.name
            };
            var S = !1;
            n.onaudioprocess = function (e) {
                if (!y) if (!1 === u() && (i.disableLogs || console.log("MediaStream seems stopped."), n.disconnect(), a = !1), a) {
                    S || (S = !0, i.onAudioProcessStarted && i.onAudioProcessStarted(), i.initCallback && i.initCallback());
                    var t = e.inputBuffer.getChannelData(0), d = new Float32Array(t);
                    if (r.push(d), 2 === c) {
                        var l = e.inputBuffer.getChannelData(1), h = new Float32Array(l);
                        s.push(h)
                    }
                    A += m, o.recordingLength = A, void 0 !== i.timeSlice && (R.recordingLength += m, R.left.push(d), 2 === c && R.right.push(h))
                } else p && (p.disconnect(), p = null)
            }, f.createMediaStreamDestination ? n.connect(f.createMediaStreamDestination()) : n.connect(f.destination), this.leftchannel = r, this.rightchannel = s, this.numberOfAudioChannels = c, this.desiredSampRate = l, this.sampleRate = b, o.recordingLength = A;
            var R = {left: [], right: [], recordingLength: 0};

            function C() {
                a && "function" == typeof i.ondataavailable && void 0 !== i.timeSlice && (R.left.length ? (h({
                    desiredSampRate: l,
                    sampleRate: b,
                    numberOfAudioChannels: c,
                    internalInterleavedLength: R.recordingLength,
                    leftBuffers: R.left,
                    rightBuffers: 1 === c ? [] : R.right
                }, (function (e, t) {
                    var n = new Blob([t], {type: "audio/wav"});
                    i.ondataavailable(n), setTimeout(C, i.timeSlice)
                })), R = {left: [], right: [], recordingLength: 0}) : setTimeout(C, i.timeSlice))
            }
        }

        function B(e, t) {
            if ("undefined" == typeof html2canvas) throw"Please link: https://www.webrtc-experiment.com/screenshot.js";
            (t = t || {}).frameInterval || (t.frameInterval = 10);
            var i = !1;
            ["captureStream", "mozCaptureStream", "webkitCaptureStream"].forEach((function (e) {
                e in document.createElement("canvas") && (i = !0)
            }));
            var n, o, r, s = !(!window.webkitRTCPeerConnection && !window.webkitGetUserMedia || !window.chrome), a = 50,
                A = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
            if (s && A && A[2] && (a = parseInt(A[2], 10)), s && a < 52 && (i = !1), t.useWhammyRecorder && (i = !1), i) if (t.disableLogs || console.log("Your browser supports both MediRecorder API and canvas.captureStream!"), e instanceof HTMLCanvasElement) n = e; else {
                if (!(e instanceof CanvasRenderingContext2D)) throw"Please pass either HTMLCanvasElement or CanvasRenderingContext2D.";
                n = e.canvas
            } else navigator.mozGetUserMedia && (t.disableLogs || console.error("Canvas recording is NOT supported in Firefox."));
            this.record = function () {
                if (r = !0, i && !t.useWhammyRecorder) {
                    var e;
                    "captureStream" in n ? e = n.captureStream(25) : "mozCaptureStream" in n ? e = n.mozCaptureStream(25) : "webkitCaptureStream" in n && (e = n.webkitCaptureStream(25));
                    try {
                        var s = new g;
                        s.addTrack(v(e, "video")[0]), e = s
                    } catch (e) {
                    }
                    if (!e) throw"captureStream API are NOT available.";
                    (o = new R(e, {mimeType: t.mimeType || "video/webm"})).record()
                } else h.frames = [], u = (new Date).getTime(), l();
                t.initCallback && t.initCallback()
            }, this.getWebPImages = function (i) {
                if ("canvas" === e.nodeName.toLowerCase()) {
                    var n = h.frames.length;
                    h.frames.forEach((function (e, i) {
                        var o = n - i;
                        t.disableLogs || console.log(o + "/" + n + " frames remaining"), t.onEncodingCallback && t.onEncodingCallback(o, n);
                        var r = e.image.toDataURL("image/webp", 1);
                        h.frames[i].image = r
                    })), t.disableLogs || console.log("Generating WebM"), i()
                } else i()
            }, this.stop = function (e) {
                r = !1;
                var n = this;
                i && o ? o.stop(e) : this.getWebPImages((function () {
                    h.compile((function (i) {
                        t.disableLogs || console.log("Recording finished!"), n.blob = i, n.blob.forEach && (n.blob = new Blob([], {type: "video/webm"})), e && e(n.blob), h.frames = []
                    }))
                }))
            };
            var c = !1;

            function d() {
                h.frames = [], r = !1, c = !1
            }

            function l() {
                if (c) return u = (new Date).getTime(), setTimeout(l, 500);
                if ("canvas" === e.nodeName.toLowerCase()) {
                    var i = (new Date).getTime() - u;
                    return u = (new Date).getTime(), h.frames.push({
                        image: (n = document.createElement("canvas"), o = n.getContext("2d"), n.width = e.width, n.height = e.height, o.drawImage(e, 0, 0), n),
                        duration: i
                    }), void (r && setTimeout(l, t.frameInterval))
                }
                var n, o;
                html2canvas(e, {
                    grabMouse: void 0 === t.showMousePointer || t.showMousePointer,
                    onrendered: function (e) {
                        var i = (new Date).getTime() - u;
                        if (!i) return setTimeout(l, t.frameInterval);
                        u = (new Date).getTime(), h.frames.push({
                            image: e.toDataURL("image/webp", 1),
                            duration: i
                        }), r && setTimeout(l, t.frameInterval)
                    }
                })
            }

            this.pause = function () {
                c = !0, o instanceof R && o.pause()
            }, this.resume = function () {
                c = !1, o instanceof R ? o.resume() : r || this.record()
            }, this.clearRecordedData = function () {
                r && this.stop(d), d()
            }, this.name = "CanvasRecorder", this.toString = function () {
                return this.name
            };
            var u = (new Date).getTime(), h = new I.Video(100)
        }

        function k(e, t) {
            function i(e) {
                e = void 0 !== e ? e : 10;
                var t = (new Date).getTime() - A;
                return t ? r ? (A = (new Date).getTime(), setTimeout(i, 100)) : (A = (new Date).getTime(), a.paused && a.play(), l.drawImage(a, 0, 0, d.width, d.height), c.frames.push({
                    duration: t,
                    image: d.toDataURL("image/webp")
                }), void (o || setTimeout(i, e, e))) : setTimeout(i, e, e)
            }

            function n(e, t, i, n, o) {
                var r = document.createElement("canvas");
                r.width = d.width, r.height = d.height;
                var s, a, A, c = r.getContext("2d"), l = [], u = -1 === t,
                    h = t && t > 0 && t <= e.length ? t : e.length, f = 0, p = 0, g = 0,
                    m = Math.sqrt(Math.pow(255, 2) + Math.pow(255, 2) + Math.pow(255, 2)),
                    b = i && i >= 0 && i <= 1 ? i : 0, y = n && n >= 0 && n <= 1 ? n : 0, v = !1;
                a = -1, A = (s = {
                    length: h, functionToLoop: function (t, i) {
                        var n, o, r, s = function () {
                            !v && r - n <= r * y || (u && (v = !0), l.push(e[i])), t()
                        };
                        if (v) s(); else {
                            var a = new Image;
                            a.onload = function () {
                                c.drawImage(a, 0, 0, d.width, d.height);
                                var e = c.getImageData(0, 0, d.width, d.height);
                                n = 0, o = e.data.length, r = e.data.length / 4;
                                for (var t = 0; t < o; t += 4) {
                                    var i = {r: e.data[t], g: e.data[t + 1], b: e.data[t + 2]};
                                    Math.sqrt(Math.pow(i.r - f, 2) + Math.pow(i.g - p, 2) + Math.pow(i.b - g, 2)) <= m * b && n++
                                }
                                s()
                            }, a.src = e[i].image
                        }
                    }, callback: function () {
                        (l = l.concat(e.slice(h))).length <= 0 && l.push(e[e.length - 1]), o(l)
                    }
                }).length, function e() {
                    ++a !== A ? setTimeout((function () {
                        s.functionToLoop(e, a)
                    }), 1) : s.callback()
                }()
            }

            (t = t || {}).frameInterval || (t.frameInterval = 10), t.disableLogs || console.log("Using frames-interval:", t.frameInterval), this.record = function () {
                t.width || (t.width = 320), t.height || (t.height = 240), t.video || (t.video = {
                    width: t.width,
                    height: t.height
                }), t.canvas || (t.canvas = {
                    width: t.width,
                    height: t.height
                }), d.width = t.canvas.width || 320, d.height = t.canvas.height || 240, l = d.getContext("2d"), t.video && t.video instanceof HTMLVideoElement ? (a = t.video.cloneNode(), t.initCallback && t.initCallback()) : (a = document.createElement("video"), w(e, a), a.onloadedmetadata = function () {
                    t.initCallback && t.initCallback()
                }, a.width = t.video.width, a.height = t.video.height), a.muted = !0, a.play(), A = (new Date).getTime(), c = new I.Video, t.disableLogs || (console.log("canvas resolutions", d.width, "*", d.height), console.log("video width/height", a.width || d.width, "*", a.height || d.height)), i(t.frameInterval)
            };
            var o = !1;
            this.stop = function (e) {
                e = e || function () {
                }, o = !0;
                var i = this;
                setTimeout((function () {
                    n(c.frames, -1, null, null, (function (n) {
                        c.frames = n, t.advertisement && t.advertisement.length && (c.frames = t.advertisement.concat(c.frames)), c.compile((function (t) {
                            i.blob = t, i.blob.forEach && (i.blob = new Blob([], {type: "video/webm"})), e && e(i.blob)
                        }))
                    }))
                }), 10)
            };
            var r = !1;

            function s() {
                c.frames = [], o = !0, r = !1
            }

            this.pause = function () {
                r = !0
            }, this.resume = function () {
                r = !1, o && this.record()
            }, this.clearRecordedData = function () {
                o || this.stop(s), s()
            }, this.name = "WhammyRecorder", this.toString = function () {
                return this.name
            };
            var a, A, c, d = document.createElement("canvas"), l = d.getContext("2d")
        }

        void 0 !== c ? E.AudioContext = c : "undefined" != typeof webkitAudioContext && (E.AudioContext = webkitAudioContext), t.Storage = E, t.MediaStreamRecorder = R, t.StereoAudioRecorder = C, t.CanvasRecorder = B, t.WhammyRecorder = k;
        var I = function () {
            function e(e) {
                this.frames = [], this.duration = e || 1, this.quality = .8
            }

            function t(e) {
                function t(e, t, i) {
                    return [{data: e, id: 231}].concat(i.map((function (e) {
                        var i = function (e) {
                            var t = 0;
                            e.keyframe && (t |= 128);
                            e.invisible && (t |= 8);
                            e.lacing && (t |= e.lacing << 1);
                            e.discardable && (t |= 1);
                            if (e.trackNum > 127) throw"TrackNumber > 127 not supported";
                            return [128 | e.trackNum, e.timecode >> 8, 255 & e.timecode, t].map((function (e) {
                                return String.fromCharCode(e)
                            })).join("") + e.frame
                        }({
                            discardable: 0,
                            frame: e.data.slice(4),
                            invisible: 0,
                            keyframe: 1,
                            lacing: 0,
                            trackNum: 1,
                            timecode: Math.round(t)
                        });
                        return t += e.duration, {data: i, id: 163}
                    })))
                }

                function i(e) {
                    for (var t = []; e > 0;) t.push(255 & e), e >>= 8;
                    return new Uint8Array(t.reverse())
                }

                function n(e) {
                    var t = [];
                    e = (e.length % 8 ? new Array(9 - e.length % 8).join("0") : "") + e;
                    for (var i = 0; i < e.length; i += 8) t.push(parseInt(e.substr(i, 8), 2));
                    return new Uint8Array(t)
                }

                function o(e) {
                    for (var t = [], r = 0; r < e.length; r++) {
                        var s = e[r].data;
                        "object" == typeof s && (s = o(s)), "number" == typeof s && (s = n(s.toString(2))), "string" == typeof s && (s = new Uint8Array(s.split("").map((function (e) {
                            return e.charCodeAt(0)
                        }))));
                        var a = s.size || s.byteLength || s.length,
                            A = Math.ceil(Math.ceil(Math.log(a) / Math.log(2)) / 8), c = a.toString(2),
                            d = new Array(7 * A + 7 + 1 - c.length).join("0") + c, l = new Array(A).join("0") + "1" + d;
                        t.push(i(e[r].id)), t.push(n(l)), t.push(s)
                    }
                    return new Blob(t, {type: "video/webm"})
                }

                function r(e, t) {
                    return parseInt(e.substr(t + 4, 4).split("").map((function (e) {
                        var t = e.charCodeAt(0).toString(2);
                        return new Array(8 - t.length + 1).join("0") + t
                    })).join(""), 2)
                }

                function s(e) {
                    for (var t = 0, i = {}; t < e.length;) {
                        var n = e.substr(t, 4), o = r(e, t), a = e.substr(t + 4 + 4, o);
                        t += 8 + o, i[n] = i[n] || [], "RIFF" === n || "LIST" === n ? i[n].push(s(a)) : i[n].push(a)
                    }
                    return i
                }

                var a = new function (e) {
                    var i = function (e) {
                        if (!e[0]) return void postMessage({error: "Something went wrong. Maybe WebP format is not supported in the current browser."});
                        for (var t = e[0].width, i = e[0].height, n = e[0].duration, o = 1; o < e.length; o++) n += e[o].duration;
                        return {duration: n, width: t, height: i}
                    }(e);
                    if (!i) return [];
                    for (var n, r = [{
                        id: 440786851,
                        data: [{data: 1, id: 17030}, {data: 1, id: 17143}, {data: 4, id: 17138}, {
                            data: 8,
                            id: 17139
                        }, {data: "webm", id: 17026}, {data: 2, id: 17031}, {data: 2, id: 17029}]
                    }, {
                        id: 408125543,
                        data: [{
                            id: 357149030,
                            data: [{data: 1e6, id: 2807729}, {data: "whammy", id: 19840}, {
                                data: "whammy",
                                id: 22337
                            }, {
                                data: (n = i.duration, [].slice.call(new Uint8Array(new Float64Array([n]).buffer), 0).map((function (e) {
                                    return String.fromCharCode(e)
                                })).reverse().join("")), id: 17545
                            }]
                        }, {
                            id: 374648427,
                            data: [{
                                id: 174,
                                data: [{data: 1, id: 215}, {data: 1, id: 29637}, {data: 0, id: 156}, {
                                    data: "und",
                                    id: 2274716
                                }, {data: "V_VP8", id: 134}, {data: "VP8", id: 2459272}, {data: 1, id: 131}, {
                                    id: 224,
                                    data: [{data: i.width, id: 176}, {data: i.height, id: 186}]
                                }]
                            }]
                        }]
                    }], s = 0, a = 0; s < e.length;) {
                        var A = [], c = 0;
                        do {
                            A.push(e[s]), c += e[s].duration, s++
                        } while (s < e.length && c < 3e4);
                        var d = {id: 524531317, data: t(a, 0, A)};
                        r[1].data.push(d), a += c
                    }
                    return o(r)
                }(e.map((function (e) {
                    var t = function (e) {
                        for (var t = e.RIFF[0].WEBP[0], i = t.indexOf("*"), n = 0, o = []; n < 4; n++) o[n] = t.charCodeAt(i + 3 + n);
                        return {width: 16383 & (o[1] << 8 | o[0]), height: 16383 & (o[3] << 8 | o[2]), data: t, riff: e}
                    }(s(atob(e.image.slice(23))));
                    return t.duration = e.duration, t
                })));
                postMessage(a)
            }

            return e.prototype.add = function (e, t) {
                if ("canvas" in e && (e = e.canvas), "toDataURL" in e && (e = e.toDataURL("image/webp", this.quality)), !/^data:image\/webp;base64,/gi.test(e)) throw"Input must be formatted properly as a base64 encoded DataURI of type image/webp";
                this.frames.push({image: e, duration: t || this.duration})
            }, e.prototype.compile = function (e) {
                var i, n, o,
                    r = (i = t, n = d.createObjectURL(new Blob([i.toString(), "this.onmessage =  function (eee) {" + i.name + "(eee.data);}"], {type: "application/javascript"})), o = new Worker(n), d.revokeObjectURL(n), o);
                r.onmessage = function (t) {
                    t.data.error ? console.error(t.data.error) : e(t.data)
                }, r.postMessage(this.frames)
            }, {Video: e}
        }();
        t.Whammy = I;
        var T = {
            init: function () {
                var e = this;
                if ("undefined" != typeof indexedDB && void 0 !== indexedDB.open) {
                    var t, i = this.dbName || location.href.replace(/\/|:|#|%|\.|\[|\]/g, ""), n = indexedDB.open(i, 1);
                    n.onerror = e.onError, n.onsuccess = function () {
                        ((t = n.result).onerror = e.onError, t.setVersion) ? 1 !== t.version ? t.setVersion(1).onsuccess = function () {
                            o(t), r()
                        } : r() : r()
                    }, n.onupgradeneeded = function (e) {
                        o(e.target.result)
                    }
                } else console.error("IndexedDB API are not available in this browser.");

                function o(t) {
                    t.createObjectStore(e.dataStoreName)
                }

                function r() {
                    var i = t.transaction([e.dataStoreName], "readwrite");

                    function n(t) {
                        i.objectStore(e.dataStoreName).get(t).onsuccess = function (i) {
                            e.callback && e.callback(i.target.result, t)
                        }
                    }

                    e.videoBlob && i.objectStore(e.dataStoreName).put(e.videoBlob, "videoBlob"), e.gifBlob && i.objectStore(e.dataStoreName).put(e.gifBlob, "gifBlob"), e.audioBlob && i.objectStore(e.dataStoreName).put(e.audioBlob, "audioBlob"), n("audioBlob"), n("videoBlob"), n("gifBlob")
                }
            }, Fetch: function (e) {
                return this.callback = e, this.init(), this
            }, Store: function (e) {
                return this.audioBlob = e.audioBlob, this.videoBlob = e.videoBlob, this.gifBlob = e.gifBlob, this.init(), this
            }, onError: function (e) {
                console.error(JSON.stringify(e, null, "\t"))
            }, dataStoreName: "recordRTC", dbName: null
        };

        function x(e, t) {
            if ("undefined" == typeof GIFEncoder) {
                var i = document.createElement("script");
                i.src = "https://www.webrtc-experiment.com/gif-recorder.js", (document.body || document.documentElement).appendChild(i)
            }
            t = t || {};
            var n = e instanceof CanvasRenderingContext2D || e instanceof HTMLCanvasElement;
            this.record = function () {
                "undefined" != typeof GIFEncoder && c ? (n || (t.width || (t.width = d.offsetWidth || 320), t.height || (t.height = d.offsetHeight || 240), t.video || (t.video = {
                    width: t.width,
                    height: t.height
                }), t.canvas || (t.canvas = {
                    width: t.width,
                    height: t.height
                }), r.width = t.canvas.width || 320, r.height = t.canvas.height || 240, d.width = t.video.width || 320, d.height = t.video.height || 240), (u = new GIFEncoder).setRepeat(0), u.setDelay(t.frameRate || 200), u.setQuality(t.quality || 10), u.start(), "function" == typeof t.onGifRecordingStarted && t.onGifRecordingStarted(), h = s((function e(i) {
                    if (!0 !== f.clearedRecordedData) {
                        if (o) return setTimeout((function () {
                            e(i)
                        }), 100);
                        h = s(e), void 0 === typeof l && (l = i), i - l < 90 || (!n && d.paused && d.play(), n || a.drawImage(d, 0, 0, r.width, r.height), t.onGifPreview && t.onGifPreview(r.toDataURL("image/png")), u.addFrame(a), l = i)
                    }
                })), t.initCallback && t.initCallback()) : setTimeout(f.record, 1e3)
            }, this.stop = function (e) {
                e = e || function () {
                }, h && A(h), this.blob = new Blob([new Uint8Array(u.stream().bin)], {type: "image/gif"}), e(this.blob), u.stream().bin = []
            };
            var o = !1;
            this.pause = function () {
                o = !0
            }, this.resume = function () {
                o = !1
            }, this.clearRecordedData = function () {
                f.clearedRecordedData = !0, u && (u.stream().bin = [])
            }, this.name = "GifRecorder", this.toString = function () {
                return this.name
            };
            var r = document.createElement("canvas"), a = r.getContext("2d");
            n && (e instanceof CanvasRenderingContext2D ? r = (a = e).canvas : e instanceof HTMLCanvasElement && (a = e.getContext("2d"), r = e));
            var c = !0;
            if (!n) {
                var d = document.createElement("video");
                d.muted = !0, d.autoplay = !0, d.playsInline = !0, c = !1, d.onloadedmetadata = function () {
                    c = !0
                }, w(e, d), d.play()
            }
            var l, u, h = null, f = this
        }

        function L(e, t) {
            t = t || "multi-streams-mixer";
            var i = [], n = !1, o = document.createElement("canvas"), r = o.getContext("2d");
            o.style.opacity = 0, o.style.position = "absolute", o.style.zIndex = -1, o.style.top = "-1000em", o.style.left = "-1000em", o.className = t, (document.body || document.documentElement).appendChild(o), this.disableLogs = !1, this.frameInterval = 10, this.width = 360, this.height = 240, this.useGainNode = !0;
            var s = this, a = window.AudioContext;
            void 0 === a && ("undefined" != typeof webkitAudioContext && (a = webkitAudioContext), "undefined" != typeof mozAudioContext && (a = mozAudioContext));
            var A = window.URL;
            void 0 === A && "undefined" != typeof webkitURL && (A = webkitURL), "undefined" != typeof navigator && void 0 === navigator.getUserMedia && (void 0 !== navigator.webkitGetUserMedia && (navigator.getUserMedia = navigator.webkitGetUserMedia), void 0 !== navigator.mozGetUserMedia && (navigator.getUserMedia = navigator.mozGetUserMedia));
            var c = window.MediaStream;
            void 0 === c && "undefined" != typeof webkitMediaStream && (c = webkitMediaStream), void 0 !== c && void 0 === c.prototype.stop && (c.prototype.stop = function () {
                this.getTracks().forEach((function (e) {
                    e.stop()
                }))
            });
            var d = {};

            function l() {
                if (!n) {
                    var e = i.length, t = !1, r = [];
                    if (i.forEach((function (e) {
                        e.stream || (e.stream = {}), e.stream.fullcanvas ? t = e : r.push(e)
                    })), t) o.width = t.stream.width, o.height = t.stream.height; else if (r.length) {
                        o.width = e > 1 ? 2 * r[0].width : r[0].width;
                        var a = 1;
                        3 !== e && 4 !== e || (a = 2), 5 !== e && 6 !== e || (a = 3), 7 !== e && 8 !== e || (a = 4), 9 !== e && 10 !== e || (a = 5), o.height = r[0].height * a
                    } else o.width = s.width || 360, o.height = s.height || 240;
                    t && t instanceof HTMLVideoElement && u(t), r.forEach((function (e, t) {
                        u(e, t)
                    })), setTimeout(l, s.frameInterval)
                }
            }

            function u(e, t) {
                if (!n) {
                    var i = 0, o = 0, s = e.width, a = e.height;
                    1 === t && (i = e.width), 2 === t && (o = e.height), 3 === t && (i = e.width, o = e.height), 4 === t && (o = 2 * e.height), 5 === t && (i = e.width, o = 2 * e.height), 6 === t && (o = 3 * e.height), 7 === t && (i = e.width, o = 3 * e.height), void 0 !== e.stream.left && (i = e.stream.left), void 0 !== e.stream.top && (o = e.stream.top), void 0 !== e.stream.width && (s = e.stream.width), void 0 !== e.stream.height && (a = e.stream.height), r.drawImage(e, i, o, s, a), "function" == typeof e.stream.onRender && e.stream.onRender(r, i, o, s, a, t)
                }
            }

            function h(e) {
                var i = document.createElement("video");
                return function (e, t) {
                    "srcObject" in t ? t.srcObject = e : "mozSrcObject" in t ? t.mozSrcObject = e : t.srcObject = e
                }(e, i), i.className = t, i.muted = !0, i.volume = 0, i.width = e.width || s.width || 360, i.height = e.height || s.height || 240, i.play(), i
            }

            function f(t) {
                i = [], (t = t || e).forEach((function (e) {
                    if (e.getTracks().filter((function (e) {
                        return "video" === e.kind
                    })).length) {
                        var t = h(e);
                        t.stream = e, i.push(t)
                    }
                }))
            }

            void 0 !== a ? d.AudioContext = a : "undefined" != typeof webkitAudioContext && (d.AudioContext = webkitAudioContext), this.startDrawingFrames = function () {
                l()
            }, this.appendStreams = function (t) {
                if (!t) throw"First parameter is required.";
                t instanceof Array || (t = [t]), t.forEach((function (t) {
                    var n = new c;
                    if (t.getTracks().filter((function (e) {
                        return "video" === e.kind
                    })).length) {
                        var o = h(t);
                        o.stream = t, i.push(o), n.addTrack(t.getTracks().filter((function (e) {
                            return "video" === e.kind
                        }))[0])
                    }
                    if (t.getTracks().filter((function (e) {
                        return "audio" === e.kind
                    })).length) {
                        var r = s.audioContext.createMediaStreamSource(t);
                        s.audioDestination = s.audioContext.createMediaStreamDestination(), r.connect(s.audioDestination), n.addTrack(s.audioDestination.stream.getTracks().filter((function (e) {
                            return "audio" === e.kind
                        }))[0])
                    }
                    e.push(n)
                }))
            }, this.releaseStreams = function () {
                i = [], n = !0, s.gainNode && (s.gainNode.disconnect(), s.gainNode = null), s.audioSources.length && (s.audioSources.forEach((function (e) {
                    e.disconnect()
                })), s.audioSources = []), s.audioDestination && (s.audioDestination.disconnect(), s.audioDestination = null), s.audioContext && s.audioContext.close(), s.audioContext = null, r.clearRect(0, 0, o.width, o.height), o.stream && (o.stream.stop(), o.stream = null)
            }, this.resetVideoStreams = function (e) {
                !e || e instanceof Array || (e = [e]), f(e)
            }, this.name = "MultiStreamsMixer", this.toString = function () {
                return this.name
            }, this.getMixedStream = function () {
                n = !1;
                var t = function () {
                    var e;
                    f(), "captureStream" in o ? e = o.captureStream() : "mozCaptureStream" in o ? e = o.mozCaptureStream() : s.disableLogs || console.error("Upgrade to latest Chrome or otherwise enable this flag: chrome://flags/#enable-experimental-web-platform-features");
                    var t = new c;
                    return e.getTracks().filter((function (e) {
                        return "video" === e.kind
                    })).forEach((function (e) {
                        t.addTrack(e)
                    })), o.stream = t, t
                }(), i = function () {
                    d.AudioContextConstructor || (d.AudioContextConstructor = new d.AudioContext);
                    s.audioContext = d.AudioContextConstructor, s.audioSources = [], !0 === s.useGainNode && (s.gainNode = s.audioContext.createGain(), s.gainNode.connect(s.audioContext.destination), s.gainNode.gain.value = 0);
                    var t = 0;
                    if (e.forEach((function (e) {
                        if (e.getTracks().filter((function (e) {
                            return "audio" === e.kind
                        })).length) {
                            t++;
                            var i = s.audioContext.createMediaStreamSource(e);
                            !0 === s.useGainNode && i.connect(s.gainNode), s.audioSources.push(i)
                        }
                    })), !t) return;
                    return s.audioDestination = s.audioContext.createMediaStreamDestination(), s.audioSources.forEach((function (e) {
                        e.connect(s.audioDestination)
                    })), s.audioDestination.stream
                }();
                return i && i.getTracks().filter((function (e) {
                    return "audio" === e.kind
                })).forEach((function (e) {
                    t.addTrack(e)
                })), e.forEach((function (e) {
                    e.fullcanvas
                })), t
            }
        }

        function D(e, t) {
            e = e || [];
            var i, n, o = this;
            (t = t || {
                elementClass: "multi-streams-mixer",
                mimeType: "video/webm",
                video: {width: 360, height: 240}
            }).frameInterval || (t.frameInterval = 10), t.video || (t.video = {}), t.video.width || (t.video.width = 360), t.video.height || (t.video.height = 240), this.record = function () {
                var o;
                i = new L(e, t.elementClass || "multi-streams-mixer"), (o = [], e.forEach((function (e) {
                    v(e, "video").forEach((function (e) {
                        o.push(e)
                    }))
                })), o).length && (i.frameInterval = t.frameInterval || 10, i.width = t.video.width || 360, i.height = t.video.height || 240, i.startDrawingFrames()), t.previewStream && "function" == typeof t.previewStream && t.previewStream(i.getMixedStream()), (n = new R(i.getMixedStream(), t)).record()
            }, this.stop = function (e) {
                n && n.stop((function (t) {
                    o.blob = t, e(t), o.clearRecordedData()
                }))
            }, this.pause = function () {
                n && n.pause()
            }, this.resume = function () {
                n && n.resume()
            }, this.clearRecordedData = function () {
                n && (n.clearRecordedData(), n = null), i && (i.releaseStreams(), i = null)
            }, this.addStreams = function (o) {
                if (!o) throw"First parameter is required.";
                o instanceof Array || (o = [o]), e.concat(o), n && i && (i.appendStreams(o), t.previewStream && "function" == typeof t.previewStream && t.previewStream(i.getMixedStream()))
            }, this.resetVideoStreams = function (e) {
                i && (!e || e instanceof Array || (e = [e]), i.resetVideoStreams(e))
            }, this.getMixer = function () {
                return i
            }, this.name = "MultiStreamRecorder", this.toString = function () {
                return this.name
            }
        }

        function O(e, t) {
            var i, n, o;

            function r() {
                return new ReadableStream({
                    start: function (n) {
                        var o = document.createElement("canvas"), r = document.createElement("video"), s = !0;
                        r.srcObject = e, r.muted = !0, r.height = t.height, r.width = t.width, r.volume = 0, r.onplaying = function () {
                            o.width = t.width, o.height = t.height;
                            var e = o.getContext("2d"), a = 1e3 / t.frameRate, A = setInterval((function () {
                                if (i && (clearInterval(A), n.close()), s && (s = !1, t.onVideoProcessStarted && t.onVideoProcessStarted()), e.drawImage(r, 0, 0), "closed" !== n._controlledReadableStream.state) try {
                                    n.enqueue(e.getImageData(0, 0, t.width, t.height))
                                } catch (e) {
                                }
                            }), a)
                        }, r.play()
                    }
                })
            }

            function s(e, A) {
                if (!t.workerPath && !A) return i = !1, void fetch("https://unpkg.com/webm-wasm@latest/dist/webm-worker.js").then((function (t) {
                    t.arrayBuffer().then((function (t) {
                        s(e, t)
                    }))
                }));
                if (!t.workerPath && A instanceof ArrayBuffer) {
                    var c = new Blob([A], {type: "text/javascript"});
                    t.workerPath = d.createObjectURL(c)
                }
                t.workerPath || console.error("workerPath parameter is missing."), (n = new Worker(t.workerPath)).postMessage(t.webAssemblyPath || "https://unpkg.com/webm-wasm@latest/dist/webm-wasm.wasm"), n.addEventListener("message", (function (e) {
                    "READY" === e.data ? (n.postMessage({
                        width: t.width,
                        height: t.height,
                        bitrate: t.bitrate || 1200,
                        timebaseDen: t.frameRate || 30,
                        realtime: t.realtime
                    }), r().pipeTo(new WritableStream({
                        write: function (e) {
                            i ? console.error("Got image, but recorder is finished!") : n.postMessage(e.data.buffer, [e.data.buffer])
                        }
                    }))) : e.data && (o || a.push(e.data))
                }))
            }

            "undefined" != typeof ReadableStream && "undefined" != typeof WritableStream || console.error("Following polyfill is strongly recommended: https://unpkg.com/@mattiasbuelens/web-streams-polyfill/dist/polyfill.min.js"), (t = t || {}).width = t.width || 640, t.height = t.height || 480, t.frameRate = t.frameRate || 30, t.bitrate = t.bitrate || 1200, t.realtime = t.realtime || !0, this.record = function () {
                a = [], o = !1, this.blob = null, s(e), "function" == typeof t.initCallback && t.initCallback()
            }, this.pause = function () {
                o = !0
            }, this.resume = function () {
                o = !1
            };
            var a = [];
            this.stop = function (e) {
                i = !0;
                var t = this;
                !function (e) {
                    n ? (n.addEventListener("message", (function (t) {
                        null === t.data && (n.terminate(), n = null, e && e())
                    })), n.postMessage(null)) : e && e()
                }((function () {
                    t.blob = new Blob(a, {type: "video/webm"}), e(t.blob)
                }))
            }, this.name = "WebAssemblyRecorder", this.toString = function () {
                return this.name
            }, this.clearRecordedData = function () {
                a = [], o = !1, this.blob = null
            }, this.blob = null
        }

        t.DiskStorage = T, t.GifRecorder = x, t.MultiStreamRecorder = D, t.RecordRTCPromisesHandler = function (e, i) {
            if (!this) throw'Use "new RecordRTCPromisesHandler()"';
            if (void 0 === e) throw'First argument "MediaStream" is required.';
            var n = this;
            n.recordRTC = new t(e, i), this.startRecording = function () {
                return new Promise((function (e, t) {
                    try {
                        n.recordRTC.startRecording(), e()
                    } catch (e) {
                        t(e)
                    }
                }))
            }, this.stopRecording = function () {
                return new Promise((function (e, t) {
                    try {
                        n.recordRTC.stopRecording((function (i) {
                            n.blob = n.recordRTC.getBlob(), n.blob && n.blob.size ? e(i) : t("Empty blob.", n.blob)
                        }))
                    } catch (e) {
                        t(e)
                    }
                }))
            }, this.pauseRecording = function () {
                return new Promise((function (e, t) {
                    try {
                        n.recordRTC.pauseRecording(), e()
                    } catch (e) {
                        t(e)
                    }
                }))
            }, this.resumeRecording = function () {
                return new Promise((function (e, t) {
                    try {
                        n.recordRTC.resumeRecording(), e()
                    } catch (e) {
                        t(e)
                    }
                }))
            }, this.getDataURL = function (e) {
                return new Promise((function (e, t) {
                    try {
                        n.recordRTC.getDataURL((function (t) {
                            e(t)
                        }))
                    } catch (e) {
                        t(e)
                    }
                }))
            }, this.getBlob = function () {
                return new Promise((function (e, t) {
                    try {
                        e(n.recordRTC.getBlob())
                    } catch (e) {
                        t(e)
                    }
                }))
            }, this.getInternalRecorder = function () {
                return new Promise((function (e, t) {
                    try {
                        e(n.recordRTC.getInternalRecorder())
                    } catch (e) {
                        t(e)
                    }
                }))
            }, this.reset = function () {
                return new Promise((function (e, t) {
                    try {
                        e(n.recordRTC.reset())
                    } catch (e) {
                        t(e)
                    }
                }))
            }, this.destroy = function () {
                return new Promise((function (e, t) {
                    try {
                        e(n.recordRTC.destroy())
                    } catch (e) {
                        t(e)
                    }
                }))
            }, this.getState = function () {
                return new Promise((function (e, t) {
                    try {
                        e(n.recordRTC.getState())
                    } catch (e) {
                        t(e)
                    }
                }))
            }, this.blob = null, this.version = "5.6.2"
        }, t.WebAssemblyRecorder = O
    }));

    class Se extends ue {
        constructor(e) {
            super(), this.player = e, this.fileName = "", this.fileType = V, this.isRecording = !1, this.recordingTimestamp = 0, this.recordingInterval = null, e.debug.log("Recorder", "init")
        }

        setFileName(e, t) {
            this.fileName = e, M !== t && V !== t || (this.fileType = t)
        }

        get recording() {
            return this.isRecording
        }

        get recordTime() {
            return this.recordingTimestamp
        }

        startRecord() {
            const e = this.player.debug, t = {
                type: "video", mimeType: "video/webm;codecs=h264", onTimeStamp: t => {
                    e.log("Recorder", "record timestamp :" + t)
                }, disableLogs: !this.player._opt.debug
            };
            try {
                const e = this.player.video.$videoElement.captureStream(25),
                    i = this.player.audio.mediaStreamAudioDestinationNode.stream;
                e.addTrack(i.getAudioTracks()[0]), this.recorder = Ee(e, t)
            } catch (t) {
                e.error("Recorder", t), this.emit(v.recordCreateError)
            }
            this.recorder && (this.isRecording = !0, this.emit(v.recording, !0), this.recorder.startRecording(), e.log("Recorder", "start recording"), this.player.emit(v.recordStart), this.recordingInterval = window.setInterval((() => {
                this.recordingTimestamp += 1, this.player.emit(v.recordingTimestamp, this.recordingTimestamp)
            }), 1e3))
        }

        stopRecordAndSave() {
            this.recorder && this.isRecording && this.recorder.stopRecording((() => {
                this.player.debug.log("Recorder", "stop recording"), this.player.emit(v.recordEnd), function (e, t, i) {
                    const n = window.URL.createObjectURL(e), o = document.createElement("a");
                    o.href = n, o.download = (t || ne()) + "." + (i || FILE_SUFFIX.webm), o.click(), window.URL.revokeObjectURL(n)
                }(this.recorder.getBlob(), this.fileName, this.fileType), this._reset(), this.emit(v.recording, !1)
            }))
        }

        _reset() {
            this.isRecording = !1, this.recordingTimestamp = 0, this.recorder && (this.recorder.destroy(), this.recorder = null), this.fileName = null, this.recordingInterval && clearInterval(this.recordingInterval), this.recordingInterval = null
        }

        destroy() {
            this._reset(), this.player.debug.log("Recorder", "destroy"), this.player = null
        }
    }

    class Re {
        constructor(e) {
            return new (Re.getLoaderFactory())(e)
        }

        static getLoaderFactory() {
            return Se
        }
    }

    class Ce {
        constructor(e) {
            this.player = e, this.decoderWorker = new Worker(e._opt.decoder), this._initDecoderWorker(), e.debug.log("decoderWorker", "init")
        }

        _initDecoderWorker() {
            const {debug: e, events: {proxy: t}} = this.player;
            this.decoderWorker.onmessage = t => {
                const i = t.data;
                switch (i.cmd) {
                    case r:
                        e.log("decoderWorker", "onmessage:", r), this.player.loaded || this.player.emit(v.load), this.player.emit(v.decoderWorkerInit), this._initWork();
                        break;
                    case l:
                        e.log("decoderWorker", "onmessage:", l, i.code), this.player.video.updateVideoInfo({encTypeCode: i.code});
                        break;
                    case d:
                        e.log("decoderWorker", "onmessage:", d, i.code), this.player.audio.updateAudioInfo({encTypeCode: i.code});
                        break;
                    case s:
                        e.log("decoderWorker", "onmessage:", s, `width:${i.w},height:${i.h}`), this.player.video.updateVideoInfo({
                            width: i.w,
                            height: i.h
                        }), this.player.video.initCanvasViewSize();
                        break;
                    case c:
                        e.log("decoderWorker", "onmessage:", c, `channels:${i.channels},sampleRate:${i.sampleRate}`), this.player.audio.updateAudioInfo(i), this.player.audio.initScriptNode(i);
                        break;
                    case a:
                        this.player.handleRender(), this.player.video.render(i), this.player.emit(v.timeUpdate, i.ts), this.player.updateStats({
                            fps: !0,
                            ts: i.ts,
                            buf: i.delay
                        });
                        break;
                    case A:
                        this.player.playing && this.player.audio.play(i.buffer, i.ts);
                        break;
                    default:
                        this.player[i.cmd] && this.player[i.cmd](i)
                }
            }
        }

        _initWork() {
            this.decoderWorker.postMessage({
                cmd: g,
                opt: JSON.stringify(this.player._opt),
                sampleRate: this.player.audio.audioContext.sampleRate
            })
        }

        decodeVideo(e, t, i) {
            const n = {type: h, ts: Math.max(t, 0), isIFrame: i};
            this.decoderWorker.postMessage({cmd: m, buffer: e, options: n}, [e.buffer])
        }

        decodeAudio(e, t) {
            this.player._opt.useWCS && !this.player._opt.useOffscreen || this.player._opt.useMSE ? this._decodeAudioNoDelay(e, t) : this._decodeAudio(e, t)
        }

        _decodeAudio(e, t) {
            const i = {type: u, ts: Math.max(t, 0)};
            this.decoderWorker.postMessage({cmd: m, buffer: e, options: i}, [e.buffer])
        }

        _decodeAudioNoDelay(e, t) {
            this.decoderWorker.postMessage({cmd: b, buffer: e, ts: Math.max(t, 0)}, [e.buffer])
        }

        destroy() {
            this.player.debug.log("decoderWorker", "destroy"), this.decoderWorker.postMessage({cmd: y}), this.decoderWorker.terminate(), this.decoderWorker = null, this.player = null
        }
    }

    class Be extends ue {
        constructor(e) {
            super(), this.player = e, this.stopId = null, this.firstTimestamp = null, this.startTimestamp = null, this.delay = -1, this.bufferList = [], this.dropping = !1, this.initInterval()
        }

        getDelay(e) {
            return e ? (this.firstTimestamp ? e && (this.delay = Date.now() - this.startTimestamp - (e - this.firstTimestamp)) : (this.firstTimestamp = e, this.startTimestamp = Date.now(), this.delay = -1), this.delay) : -1
        }

        initInterval() {
            const e = this.player._opt.videoBuffer;
            this.player.debug.log("common dumex", "init Interval");
            let t = () => {
                let t;
                if (this.bufferList.length) if (this.dropping) {
                    for (t = this.bufferList.shift(); !t.isIFrame && this.bufferList.length;) t = this.bufferList.shift();
                    t.isIFrame && (this.dropping = !1, this._doDecoderDecode(t))
                } else if (t = this.bufferList[0], -1 === this.getDelay(t.ts)) this.bufferList.shift(), this._doDecoderDecode(t); else if (this.delay > e + 1e3) this.dropping = !0; else for (; this.bufferList.length && (t = this.bufferList[0], this.getDelay(t.ts) > e);) this.bufferList.shift(), this._doDecoderDecode(t)
            };
            t(), this.stopId = setInterval(t, 10)
        }

        _doDecode(e, t, i, n) {
            const o = this.player, {decoderWorker: r} = o;
            let s = {ts: i, type: t, isIFrame: !1};
            o._opt.useWCS && !o._opt.useOffscreen || o._opt.useMSE ? (t === h && (s.isIFrame = n), this.pushBuffer(e, s)) : t === h ? r.decodeVideo(e, i, n) : t === u && r.decodeAudio(e, i)
        }

        _doDecoderDecode(e) {
            const t = this.player, {decoderWorker: i, webcodecsDecoder: n, mseDecoder: o} = t;
            e.type === u ? i.decodeAudio(e.payload, e.ts) : e.type === h && (t._opt.useWCS && !t._opt.useOffscreen ? n.decodeVideo(e.payload, e.ts, e.isIFrame) : t._opt.useMSE && o.decodeVideo(e.payload, e.ts, e.isIFrame))
        }

        pushBuffer(e, t) {
            t.type === u ? this.bufferList.push({
                ts: t.ts,
                payload: e,
                type: u
            }) : t.type === h && this.bufferList.push({ts: t.ts, payload: e, type: h, isIFrame: t.isIFrame})
        }

        close() {
        }

        destroy() {
            this.stopId && (clearInterval(this.stopId), this.stopId = null), this.firstTimestamp = null, this.startTimestamp = null, this.delay = -1, this.bufferList = [], this.dropping = !1, this.off()
        }
    }

    class ke extends Be {
        constructor(e) {
            super(e), this.input = this._inputFlv(), this.flvDemux = this.dispatchFlvData(this.input), e.debug.log("FlvDemux", "init")
        }

        dispatch(e) {
            this.flvDemux(e)
        }

        * _inputFlv() {
            yield 9;
            const e = new ArrayBuffer(4), t = new Uint8Array(e), i = new Uint32Array(e), n = this.player;
            for (; ;) {
                t[3] = 0;
                const e = yield 15, o = e[4];
                t[0] = e[7], t[1] = e[6], t[2] = e[5];
                const r = i[0];
                t[0] = e[10], t[1] = e[9], t[2] = e[8];
                let s = i[0];
                16777215 === s && (t[3] = e[11], s = i[0]);
                const a = yield r;
                switch (o) {
                    case f:
                        n._opt.hasAudio && (n.updateStats({abps: a.byteLength}), a.byteLength > 0 && this._doDecode(a, u, s));
                        break;
                    case p:
                        if (n._opt.hasVideo) {
                            n.updateStats({vbps: a.byteLength});
                            const e = a[0] >> 4 == 1;
                            a.byteLength > 0 && this._doDecode(a, h, s, e)
                        }
                }
            }
        }

        dispatchFlvData(e) {
            let t = e.next(), i = null;
            return n => {
                let o = new Uint8Array(n);
                if (i) {
                    let e = new Uint8Array(i.length + o.length);
                    e.set(i), e.set(o, i.length), o = e, i = null
                }
                for (; o.length >= t.value;) {
                    let i = o.slice(t.value);
                    t = e.next(o.slice(0, t.value)), o = i
                }
                o.length > 0 && (i = o)
            }
        }

        close() {
            this.input && this.input.return(null)
        }

        destroy() {
            super.destroy(), this.input = null, this.flvDemux = null, this.player.debug.log("FlvDemux", "destroy")
        }
    }

    class Ie extends Be {
        constructor(e) {
            super(e), e.debug.log("M7sDemux", "init")
        }

        dispatch(e) {
            const t = this.player, i = new DataView(e), n = i.getUint8(0), o = i.getUint32(1, !1);
            switch (n) {
                case u:
                    if (t._opt.hasAudio) {
                        const i = new Uint8Array(e, 5);
                        t.updateStats({abps: i.byteLength}), i.byteLength > 0 && this._doDecode(i, n, o)
                    }
                    break;
                case h:
                    if (t._opt.hasVideo && i.byteLength > 5) {
                        const r = new Uint8Array(e, 5), s = i.getUint8(5) >> 4 == 1;
                        t.updateStats({vbps: r.byteLength}), r.byteLength > 0 && this._doDecode(r, n, o, s)
                    }
            }
        }

        destroy() {
            super.destroy(), this.player.debug.log("M7sDemux", "destroy")
        }
    }

    class Te {
        constructor(e) {
            return new (Te.getLoaderFactory(e._opt.demuxType))(e)
        }

        static getLoaderFactory(e) {
            return e === n ? Ie : e === i ? ke : void 0
        }
    }

    class xe extends ue {
        constructor(e) {
            super(), this.player = e, this.hasInit = !1, this.isInitInfo = !1, this.decoder = null, this.initDecoder(), e.debug.log("Webcodecs", "init")
        }

        initDecoder() {
            const e = this;
            this.decoder = new VideoDecoder({
                output(t) {
                    e.handleDecode(t)
                }, error(t) {
                    e.handleError(t)
                }
            })
        }

        handleDecode(e) {
            this.isInitInfo || (this.player.video.updateVideoInfo({
                width: e.codedWidth,
                height: e.codedHeight
            }), this.player.video.initCanvasViewSize(), this.isInitInfo = !0), this.player.handleRender(), this.player.video.render({videoFrame: e}), this.player.updateStats({
                fps: !0,
                ts: 0,
                buf: this.player.demux.delay
            }), setTimeout((function () {
                e.close ? e.close() : e.destroy()
            }), 100)
        }

        handleError(e) {
            this.player.debug.log("Webcodecs", "VideoDecoder handleError", e)
        }

        decodeVideo(e, t, i) {
            if (this.hasInit) {
                const n = new EncodedVideoChunk({data: e.slice(5), timestamp: t, type: i ? G : H});
                this.decoder.decode(n)
            } else if (i && 0 === e[1]) {
                const t = 15 & e[0];
                if (this.player.video.updateVideoInfo({encTypeCode: t}), t === x) return void this.emit(E.webcodecsH265NotSupport);
                const i = function (e) {
                    let t = e.subarray(1, 4), i = "avc1.";
                    for (let e = 0; e < 3; e++) {
                        let n = t[e].toString(16);
                        n.length < 2 && (n = "0" + n), i += n
                    }
                    return {codec: i, description: e}
                }(e.slice(5));
                this.decoder.configure(i), this.hasInit = !0
            }
        }

        destroy() {
            this.decoder.close(), this.decoder = null, this.hasInit = !1, this.isInitInfo = !1, this.off(), this.player.debug.log("Webcodecs", "destroy"), this.player = null
        }
    }

    const Le = {
        play: "播放",
        pause: "暂停",
        audio: "",
        mute: "",
        screenshot: "截图",
        loading: "加载",
        fullscreen: "全屏",
        fullscreenExit: "退出全屏",
        record: "录制",
        recordStop: "停止录制"
    };
    var De = Object.keys(Le).reduce(((e, t) => (e[t] = `\n    <i class="jessibuca-icon jessibuca-icon-${t}"></i>\n    ${Le[t] ? `<span class="icon-title-tips"><span class="icon-title">${Le[t]}</span></span>` : ""}\n`, e)), {}),
        Oe = (e, t) => {
            const {events: {proxy: i}} = e, n = document.createElement("object");
            n.setAttribute("aria-hidden", "true"), n.setAttribute("tabindex", -1), n.type = "text/html", n.data = "about:blank", re(n, {
                display: "block",
                position: "absolute",
                top: "0",
                left: "0",
                height: "100%",
                width: "100%",
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: "-1"
            });
            let o = e.width, r = e.height;
            i(n, "load", (() => {
                i(n.contentDocument.defaultView, "resize", (() => {
                    e.width === o && e.height === r || (o = e.width, r = e.height, e.emit(v.resize))
                }))
            })), e.$container.appendChild(n), e.on(v.destroy, (() => {
                e.$container.removeChild(n)
            })), e.on(v.volumechange, (() => {
                !function (e) {
                    if (0 === e) re(t.$volumeOn, "display", "none"), re(t.$volumeOff, "display", "flex"), re(t.$volumeHandle, "top", "48px"); else if (t.$volumeHandle && t.$volumePanel) {
                        const i = se(t.$volumePanel, "height") || 60, n = se(t.$volumeHandle, "height"),
                            o = i - (i - n) * e - n;
                        re(t.$volumeHandle, "top", `${o}px`), re(t.$volumeOn, "display", "flex"), re(t.$volumeOff, "display", "none")
                    }
                    t.$volumePanelText && (t.$volumePanelText.innerHTML = parseInt(100 * e))
                }(e.volume)
            })), e.on(v.loading, (e => {
                re(t.$loading, "display", e ? "flex" : "none"), re(t.$poster, "display", "none"), e && re(t.$playBig, "display", "none")
            }));
            try {
                const i = () => {
                    re(t.$fullscreenExit, "display", e.fullscreen ? "flex" : "none"), re(t.$fullscreen, "display", e.fullscreen ? "none" : "flex")
                };
                $.on("change", i), e.events.destroys.push((() => {
                    $.off("change", i)
                }))
            } catch (e) {
            }
            e.on(v.recording, (() => {
                re(t.$record, "display", e.recording ? "none" : "flex"), re(t.$recordStop, "display", e.recording ? "flex" : "none")
            })), e.on(v.recordingTimestamp, (e => {
            })), e.on(v.playing, (e => {
                re(t.$play, "display", e ? "none" : "flex"), re(t.$playBig, "display", e ? "none" : "block"), re(t.$pause, "display", e ? "flex" : "none"), re(t.$screenshot, "display", e ? "flex" : "none"), re(t.$record, "display", e ? "flex" : "none"), re(t.$fullscreen, "display", e ? "flex" : "none"), e || t.$speed && (t.$speed.innerHTML = ce(""))
            })), e.on(v.kBps, (e => {
                const i = ce(e);
                t.$speed && (t.$speed.innerHTML = i)
            }))
        };

    function je(e, t) {
        void 0 === t && (t = {});
        var i = t.insertAt;
        if (e && "undefined" != typeof document) {
            var n = document.head || document.getElementsByTagName("head")[0], o = document.createElement("style");
            o.type = "text/css", "top" === i && n.firstChild ? n.insertBefore(o, n.firstChild) : n.appendChild(o), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(document.createTextNode(e))
        }
    }

    je('@keyframes rotation{0%{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(1turn)}}.jessibuca-container .jessibuca-icon{cursor:pointer;width:16px;height:16px}.jessibuca-container .jessibuca-poster{position:absolute;z-index:10;left:0;top:0;right:0;bottom:0;height:100%;width:100%;background-position:50%;background-repeat:no-repeat;background-size:contain;pointer-events:none}.jessibuca-container .jessibuca-play-big{position:absolute;display:none;height:100%;width:100%;background:rgba(0,0,0,.4);background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACgklEQVRoQ+3ZPYsTQRjA8eeZZCFlWttAwCIkZOaZJt8hlvkeHrlccuAFT6wEG0FQOeQQLCIWih6chQgKgkkKIyqKCVYip54IWmiQkTmyYhFvd3Zn3yDb7szu/7cv7GaDkPEFM94PK0DSZ9DzDAyHw7uI2HRDlVJX5/N5r9FoHCYdr/fvCRiNRmpJ6AEidoUQ15NG+AH8BgD2n9AHANAmohdJQfwAfgGA4xF4bjabnW21Whob62ILoKNfAsAGEd2PU2ATcNSNiDf0/cE5/xAHxDpgEf0NADaJ6HLUiKgAbvcjpdSGlPJZVJCoAUfdSqkLxWLxTLlc/mkbEgtgET1TSnWklLdtIuIEuN23crlcp16vv7cBSQKgu38AwBYRXQyLSArg3hsjRDxNRE+CQhIF/BN9qVAobFYqle+mkLQAdLd+8K0T0U0TRJoAbvc9fVkJId75gaQRoLv1C2STiPTb7rFLWgE6+g0RncwyYEJEtawCvjDGmpzzp5kD6NfxfD7frtVqB17xen2a7oG3ALBm+oMoFQBEPD+dTvtBfpImDXjIGFvjnD/3c7ksG5MU4HDxWeZa0HB3XhKAXcdxOn5vUi9gnIDXSqm2lHLPK8pkfVyAbSLqm4T5HRs1YB8RO0KIid8g03FRAT4rpbpSyh3TINPxUQB2GGM9zvkn05gg420CJovLZT9ISNA5tgB9ItoOGhFmnh/AcZ/X9xhj65zzV2Eiwsz1A1j2B8dHAOgS0W6YnduY6wkYj8d3lFKn/j66Ea84jtOrVqtfbQSE3YYnYDAY5Eql0hYAnNDv6kKIx2F3anO+J8DmzqLY1goQxVE12ebqDJgcrSjGrs5AFEfVZJt/AF0m+jHzUTtnAAAAAElFTkSuQmCC");background-repeat:no-repeat;background-position:50%;cursor:pointer;background-size:48px 48px}.jessibuca-container .jessibuca-play-big:hover{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACEElEQVRoQ+2ZXStEQRjH/3/yIXwDdz7J+i7kvdisXCk3SiFJW27kglBcSFFKbqwQSa4krykuKB09Naf2Yndn5jgzc06d53Znd36/mWfeniVyHsw5PwqB0DOonYEoijYBlOpAFwCMkHwLDS/9mwhEDUCfAAyTXA4tYSLwC6CtCegegH6S56FETAR+AHRoACcBTJAUWa+RloBAXwAYIrnt0yBNgZi7qtbHgw8RFwLC/QFglOScawlXAjH3gUqrE1cirgVi7mkAYyS/0xbxJSDcdwAGSa6nKeFTIOZeUyL3aYiEEBDuLwDjJGf+KxFKIOY+BdBL8iipSGiBmHtWbbuftiJZERBuOfgGSK7aSGRJIObeUml1ayKSRQHhlgtkiaTcdltGVgUE+ppkV54FaiS78yrwqlLoOI8Cch2XV548W7WRpTVwA6DP9kGUFYEpAOUkT9LQAvtq1M+0udKkQSgBqSlJWWYxKXj8vRACK+o6bbRIdYI+Ba7U7rKjg7L53JdAhWTZBsy0rWuBXZUuNVMg23auBF7UIl2yBbJt70JAoKV6/WwLk6R9mgKSJlJ1kLTxFmkJyCla8UZd15GJQKvyumyJ8gy8DAEvfZoINPqD41EtUjmUgoaJwAaAnjrKebVI34OSq85NBNqlCAWgE0CV5GEWwI3vQlmCbcSinYFCwPEIFDPgeIC1P1/MgHaIHDf4Aydx2TF7wnKeAAAAAElFTkSuQmCC")}.jessibuca-container .jessibuca-loading{display:none;flex-direction:column;justify-content:center;align-items:center;position:absolute;z-index:20;left:0;top:0;right:0;bottom:0;width:100%;height:100%;pointer-events:none}.jessibuca-container .jessibuca-loading-text{line-height:20px;font-size:13px;color:#fff;margin-top:10px}.jessibuca-container .jessibuca-controls{background-color:#161616;display:flex;flex-direction:column;justify-content:flex-end;position:absolute;z-index:40;left:0;right:0;bottom:0;height:38px;padding-left:13px;padding-right:13px;font-size:14px;color:#fff;opacity:0;visibility:hidden;transition:all .2s ease-in-out;-webkit-user-select:none;user-select:none}.jessibuca-container .jessibuca-controls .jessibuca-controls-item{position:relative;display:flex;justify-content:center;padding:0 8px}.jessibuca-container .jessibuca-controls .jessibuca-controls-item:hover .icon-title-tips{visibility:visible;opacity:1}.jessibuca-container .jessibuca-controls .jessibuca-fullscreen,.jessibuca-container .jessibuca-controls .jessibuca-fullscreen-exit,.jessibuca-container .jessibuca-controls .jessibuca-icon-audio,.jessibuca-container .jessibuca-controls .jessibuca-microphone-close,.jessibuca-container .jessibuca-controls .jessibuca-pause,.jessibuca-container .jessibuca-controls .jessibuca-play,.jessibuca-container .jessibuca-controls .jessibuca-record,.jessibuca-container .jessibuca-controls .jessibuca-record-stop,.jessibuca-container .jessibuca-controls .jessibuca-screenshot{display:none}.jessibuca-container .jessibuca-controls .jessibuca-icon-audio,.jessibuca-container .jessibuca-controls .jessibuca-icon-mute{z-index:1}.jessibuca-container .jessibuca-controls .jessibuca-controls-bottom{display:flex;justify-content:space-between;height:100%}.jessibuca-container .jessibuca-controls .jessibuca-controls-bottom .jessibuca-controls-left,.jessibuca-container .jessibuca-controls .jessibuca-controls-bottom .jessibuca-controls-right{display:flex;align-items:center}.jessibuca-container.jessibuca-controls-show .jessibuca-controls{opacity:1;visibility:visible}.jessibuca-container.jessibuca-hide-cursor *{cursor:none!important}.jessibuca-container.jessibuca-fullscreen-web{position:fixed;z-index:9999;left:0;top:0;right:0;bottom:0;width:100%!important;height:100%!important;background:#000}.jessibuca-container .jessibuca-icon-loading{width:50px;height:50px;background:url("data:image/png;base64,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") no-repeat 50%;background-size:100% 100%;animation:rotation 1s linear infinite}.jessibuca-container .jessibuca-icon-screenshot{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAE5UlEQVRoQ+1YW2sdVRT+1s7JxbsoVkEUrIIX0ouz15zYNA+N1RdtQfCltlUfvLbqL/BCwZ8grbHtizQqPojgBSr0JkiMmT2nxgapqBURtPVCq7HxJCeZJVPmxDlzZubMmXOSEsnAvOy917fXt9e39tp7E5b4R0vcfywTuNgRbBgBx3HuJqLVzPzmYjprjHkcwAlmLqXNm4XAISLaSESPaq2HF4OE67rbRGRYRA7btn1fbgLGmKsA/Azg0gBkGzO/vZAkHMd5hIiqc5wHcCMz/5k0Z2oExsfHV1QqldPAf8lORNu11m8tBAljzFYAYWxRSl1vWdZvuQj4RsYYF4AVBlgIOVVlE55HRIxt23ZuCfmGjuOsJ6LPoiAistW27XfaEYmIbOYhPc9bXywWR1oiEJDYQkR1zrYjEjGyqfqbKd8a7kJVtLgQ+30i8pht2wfyRKIdmJkJBPkQTbILfudJ7CTZNBvVpggEcgpvc/ML38zESbLJsxBNE/A9biX0rdjGyTQXgbxyapdsarb0PMlXtWnGoXbKpm0Essqp3bJpK4E0OXmed3+hUBDP8w5FI91M0rdcyLLILElOCbaZilSWeXMncRx4klTCY1spfG3dhZJWx3GcDUR0EEB3ZMw0ET2gtT6SZWWzjmlrBIJCl0hAKfWgZVmHszqXZVxbCSxpCS2JJA6umIhe8ZKKVLPbaBJ+S9toqVRa53nedgAbAKwIwH4FcAzAa0R0l4i8F7PPz189k6RFRA+LyNcAXojDV0oNW5b1eW4Cxpg9AHZkSaaa6hhzb065uDSCH2LmRB8Sk9gY4293g43Qo/1pV80m8yQMfZSZ781cB1zXHRKRZ2IMpgD8A+DamL4ZItqitX4/jbQx5iEA7wLoihn3V/ACckWMJN/QWj9b1x5tGBsbW6uUOh5pPy0iL3Z2dn6ilJqanp5ep5TaJSLhF4NppdRNaU8gPmapVLrO87yfIoXuWyJ6uVKp+HmFjo6OQSJ6FcBtYT+UUmstyxqvkWuUgDFmP4AnQu2/e563qlgs+u9DNZ8xZhRAX7VRRPbath0XuXk7Y8xeAE+FgL6fnJzsHRwcLIfBR0ZGLunq6poAsDLUvp+Zw7b1r9PGmJMAbg8Z7WDmoThZuK67WkS+DD18fcPMdzSQUBR/EzN/nIC/SUQ+DPXV4dclsTHmHAD/SfHCNzc3t7Kvr++HJKeMMacA3BL0nyuXyzcPDAxMxo0fHR29slAo/Ajg6qD/fE9Pzw29vb1/x42fmJi4vFwu+5G/LOg/y8zXNJLQ2dAES5JANMQ7mfn1jBI6ycx3NiMhItqstf4oAX+ziHwQ6qvDj5NQNIn/ALCKmX+JSeIvABRD7fuY+ekGBPYBeDI05tTMzExvf3+/vz2Hk91/ET8RSeI6/DoCpVJpjed5fmKGvzMAXpqdnT3oed5Ud3d3v4jsAqBr9Ei0Rmv9VRqBBPzvROQVETnq2xJRdRu9tRF+bCVOKWT+Kvl/TSIFk6SW/LAjKfjV5K8rZABi8dOOEv7FI7Z8x6zwEWbemLbyMfJr5qiSiJ96oclymBOR3bZtP9+M89WxxpjdAHY2sN3DzM8ljWl4I3Nd9x7/OE1ENcdpETnmH3e11n41zv0l4J8RkU+J6AAz+xtF4teQQG7PFslwmcAiLfSyhC72Qv9/I/Avns2OT7QJskoAAAAASUVORK5CYII=") no-repeat 50%;background-size:100% 100%}.jessibuca-container .jessibuca-icon-screenshot:hover{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAED0lEQVRoQ+2ZycsdRRTFf2ejqHFAMQqiYBTUoElUHLNx3GgCgpuYRF2o0UT9CxwQ/BMkMSbZSKLiQgQHUDCJgjiAxiEiESdEcJbEedgcKaj3UV+/6q7u/jovPPkK3qbr1ql76p5bt6qemPKmKfefeQKHOoLFCNg+H1gi6fFJOmv7VmCvpD1N87Yh8ApwNXCzpB2TIGF7DRDm2inpmt4EbB8LfAMcGUHWSHryYJKwfRMwmuMP4BRJv9TN2RgB2wuB72BWsq+V9MTBIGF7NZBiGzhJ0o+9CIRBtt8FLqgADC6nRDbpVO9Iuqi3hCKB5cDrGZDVkp4aIhIV2aSQyyW9MScCkcQqIOfsnCORkc3I31b5VtyFRmg1IQ7dt0ja3icSQ2C2JhAjUU2ykd+dE7tBNp2i2olAJJFuc+nCt564QTadF6IzgUhiVGiqyinKaQjZpJP2ItBXTkPJZhACXeU0pGwGI9BWTkPLZlACBTldG4o5EA6E1dY66edcyNrs8Q36zg1vVaTazNs7iXPgDVJJzYs7VRvHRzaDEohyugJ4CTi84sg/wHWSdnVxsGQ7aQLXS9pZcqpL/6AEplpCU5HE8YpJ9YrXUKQ6baN1+HPaRm1fBqwFQnKGK2ZoPwCvAo8Ai4FnMpPMHMwapHUj8DFwbw3+Dklv9iZgexOwvktSRduxU2VDlErwmyXV+lCbxLbDdndlCT3TX3vV7JgnKfRuSVflfMkSsL0ZuDMz4E/gL+CETN+/wCpJzzaRtn0D8DRwWMbu1/gCcnSm7zFJd1W/jxGwvQx4r2IYnlbuA14GAomQFw8B6YtBKFSnNj2BxEJ3IvB1pdB9CjwQ8yqYhcg/DJxZ8WOZpA/SbzkC24DbEqOfgPMkBRKzmu23gEuSj1sk5SI3Y2J7C3BHMuZz4FxJf6fgto8APgIWJd+3SUrHjr9O294HnJUMWi8pSGqs2V4CvJ88fH0i6eyChKr4KyS9WIO/Ang+6RvDz0XgABCeFEdtkaQv65yy/QVweuwPY0+T9FuNQ8cAXwHHxf7wdHiypN9r7BfEl8GjYv9+SceXJLQ/mSDYTh2Baog3SHq0pYT2STqno4RWSnqhBn8l8FzSN4bfJol/jkn8bXUS228DFyfft0paVyCwFbg9sQkSDEkctueZZju8iO+tJPEYfo7A0piYKd73wP3xnB+20cvjNnphxdmlkj4sEMjhfwY8COyOY0fb6Bkl/K6FLKxS+M1KpDhJY8mvrG5doRwlf66QZfGbjhLh4pEt35kV3iUp/IvTunU8qtTil/7gaHOY2yjpntaez9b5RmBDYewmSXfX2RRvZLYvbThOh+NuqMa9Ww1+yLnXgO2SwkZR24oEens2oYHzBCa00PMSOtQL/f+NwH+Hg8hAnbrYgQAAAABJRU5ErkJggg==") no-repeat 50%;background-size:100% 100%}.jessibuca-container .jessibuca-icon-play{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACgklEQVRoQ+3ZPYsTQRjA8eeZZCFlWttAwCIkZOaZJt8hlvkeHrlccuAFT6wEG0FQOeQQLCIWih6chQgKgkkKIyqKCVYip54IWmiQkTmyYhFvd3Zn3yDb7szu/7cv7GaDkPEFM94PK0DSZ9DzDAyHw7uI2HRDlVJX5/N5r9FoHCYdr/fvCRiNRmpJ6AEidoUQ15NG+AH8BgD2n9AHANAmohdJQfwAfgGA4xF4bjabnW21Whob62ILoKNfAsAGEd2PU2ATcNSNiDf0/cE5/xAHxDpgEf0NADaJ6HLUiKgAbvcjpdSGlPJZVJCoAUfdSqkLxWLxTLlc/mkbEgtgET1TSnWklLdtIuIEuN23crlcp16vv7cBSQKgu38AwBYRXQyLSArg3hsjRDxNRE+CQhIF/BN9qVAobFYqle+mkLQAdLd+8K0T0U0TRJoAbvc9fVkJId75gaQRoLv1C2STiPTb7rFLWgE6+g0RncwyYEJEtawCvjDGmpzzp5kD6NfxfD7frtVqB17xen2a7oG3ALBm+oMoFQBEPD+dTvtBfpImDXjIGFvjnD/3c7ksG5MU4HDxWeZa0HB3XhKAXcdxOn5vUi9gnIDXSqm2lHLPK8pkfVyAbSLqm4T5HRs1YB8RO0KIid8g03FRAT4rpbpSyh3TINPxUQB2GGM9zvkn05gg420CJovLZT9ISNA5tgB9ItoOGhFmnh/AcZ/X9xhj65zzV2Eiwsz1A1j2B8dHAOgS0W6YnduY6wkYj8d3lFKn/j66Ea84jtOrVqtfbQSE3YYnYDAY5Eql0hYAnNDv6kKIx2F3anO+J8DmzqLY1goQxVE12ebqDJgcrSjGrs5AFEfVZJt/AF0m+jHzUTtnAAAAAElFTkSuQmCC") no-repeat 50%;background-size:100% 100%}.jessibuca-container .jessibuca-icon-play:hover{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACEElEQVRoQ+2ZXStEQRjH/3/yIXwDdz7J+i7kvdisXCk3SiFJW27kglBcSFFKbqwQSa4krykuKB09Naf2Yndn5jgzc06d53Znd36/mWfeniVyHsw5PwqB0DOonYEoijYBlOpAFwCMkHwLDS/9mwhEDUCfAAyTXA4tYSLwC6CtCegegH6S56FETAR+AHRoACcBTJAUWa+RloBAXwAYIrnt0yBNgZi7qtbHgw8RFwLC/QFglOScawlXAjH3gUqrE1cirgVi7mkAYyS/0xbxJSDcdwAGSa6nKeFTIOZeUyL3aYiEEBDuLwDjJGf+KxFKIOY+BdBL8iipSGiBmHtWbbuftiJZERBuOfgGSK7aSGRJIObeUml1ayKSRQHhlgtkiaTcdltGVgUE+ppkV54FaiS78yrwqlLoOI8Cch2XV548W7WRpTVwA6DP9kGUFYEpAOUkT9LQAvtq1M+0udKkQSgBqSlJWWYxKXj8vRACK+o6bbRIdYI+Ba7U7rKjg7L53JdAhWTZBsy0rWuBXZUuNVMg23auBF7UIl2yBbJt70JAoKV6/WwLk6R9mgKSJlJ1kLTxFmkJyCla8UZd15GJQKvyumyJ8gy8DAEvfZoINPqD41EtUjmUgoaJwAaAnjrKebVI34OSq85NBNqlCAWgE0CV5GEWwI3vQlmCbcSinYFCwPEIFDPgeIC1P1/MgHaIHDf4Aydx2TF7wnKeAAAAAElFTkSuQmCC") no-repeat 50%;background-size:100% 100%}.jessibuca-container .jessibuca-icon-pause{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABA0lEQVRoQ+1YwQqCUBAcfWXXsLr2AXWTPXno8yVB8AP6Aa3oHI+kCDqYaawJljSe133uzO44bx0M/HEG/v1gAd9mkAyQgY4I/F8LJUlyrQFtD2AtIkcNoFEU+Z7n7QD4DfFHEVlocrVmgAUAIAOl3mILPcDgEFcUhyrUKMGUUcroc3NQRimj9XJBGaWMvvPydKN0o6/9QTdKN6rZANxj6EbpRulGuZnjYqs8BbyR8Ub2Izeys+u6yyAIDpo/ehzHM2NMDsA0xFsRmWhyfTIDWSXxCEBmrd2EYXjSHJqm6bQoii2AOYBL5Z0xgFxEVppcrQvQJO0zhgX0iXbdWWSADHRE4AZQ731AhEUeNwAAAABJRU5ErkJggg==") no-repeat 50%;background-size:100% 100%}.jessibuca-container .jessibuca-icon-pause:hover{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAA7klEQVRoQ+2YSwrCQBBEX6HiVvxsPYDewfN7By/gD9ciQkvERQwJdBSiYs0mEDo96aruombEjy/9+P/jAj7NoBkwA28i8H8tFBFRA9oeWEo6ZgCNiDGwAYpn3TpKmmVytWbABQBmoNRbbqEHGB7iiuJYhRol2DJqGX1uDsuoZdRmLuNZSzGWUcuoZdRHSp/IylNgK2ErYSthK3FHwLcSvpXIjoLt9Jfa6TMwl3TIMBkRE2AH9BriL5KGmVyvWIltJXEfKN6tJJ0ym0bECFgDU+Ba+WZQFCdpkcnVuoBM0i5jXECXaNftZQbMwJsI3AAPN3dAQflHegAAAABJRU5ErkJggg==") no-repeat 50%;background-size:100% 100%}.jessibuca-container .jessibuca-icon-record{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAC+UlEQVRoQ+1ZS2sTURT+zlDJYE3XSq219QHVuEjnJDT+Bff9Abqw2voAEfGxqygUqWhVFHGl/yMLu9BwByxk5SNI66ML6U7axjhHbmhgWiftncxoOiV3FcI53z3f/e65594zhIQPSnj86BBot4IdBToKRFyBnbeFlFIScVEiuYvIWC6Xe2YK8pcC7SYA4CMzH4mDQBXAqilQBDsLQLfPf9FxnF4i8kwwmypARI+Wl5dvmIBEsUmlUkNE9NaHsVCpVAZGR0d/m+A2JSAid3K53E0TkCg2pVKpz7KseR/GfKVSGYxMAMA0M1+JEpyJb6lUOm5ZVnkrAsVisaunp+esiByr1Wp3R0ZGvmifzZK4XQQWHMc52MgBpdQuAOcAXABwuB400ZTjONdaIjA7O5u2bVsnWU1EujzP+5nP5xdMVjvIJkCBD8x8VCm1G8AYgAkAAxt8Z5j5YmgCSqlTAJ4D2OcD/AXgATNfbYVEAIFPIvKKiE4D6GuCea8xX6gtpJT6DmBvECgRFRzHeROWRAABE4iWCbwHEFhkPM/L5vP5dyaz+23+KwHXdR3P854S0YG1ILSCuthNMfNM2OC1/RYENLY+ygcBnPfht6ZAA6BYLNr6dyqVokKhsGpaNQ2TWJstreXaE2aed133sojcj41AKyvdzCdAgSXLsk4MDw9/a/i4rntbRPxFNZoC/5jAV2be759DKTUJ4FZSFFi0bbs/k8noy2R9dAjEuWU2YgXkQOK3kD6BMsysi2Z9JC2Jdcw/ALzwPO+xvmcl7Rj177JVEbkO4BARjSflFDJJuW1dBxJPoCIiL4noDIB1BS0pW6j+oJmbm+uuVqvjRKQfLr0bZHnIzJf0f6HeAybahrUJqAPruhLlcnnPysqKfpXp11n/Gv62zoHAroS+AafT6QkiGrIsazKbzX7eVIHEt1US39gCkOzWYthkjNE+tuZujDGZQ8XRXn8N4KT5lLFZ6uaYPt+nwyDuvC80YdhvB9uOAu1WoaNAR4GIK/AHvdr+QAexB7EAAAAASUVORK5CYII=") no-repeat 50%;background-size:100% 100%}.jessibuca-container .jessibuca-icon-record:hover{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACfUlEQVRoQ+2ZSYsUQRCFvycK4nJXXEbHBdwO4kn/gv9CD467ICIutxEFkREdFUU86T/xojcPntyQcT2INw+uISFVkD1Wd2dWlU7nUHlqisiX+fJFZGREi8yHMt8/HYG5VrBToFOg4QnMPxcyM2t4KE2nT0i6EwvylwIjQOCFpE1tEPgGfI0FamC3AFgazP8IrJL0KwZzkAI3gLMxIA1ttgCPA4w3wHpJP2NwBxG4KOlcDEgTGzNbA8wEGP57vA0CU5JONtlczFwz2wY8HUbAzBYCB4CtwCVJb33OIAXmioC70LoyBsxsEXAQOApsLIhelnS6FgEzW+5BBvwA/FS+SPJFa40KBZ5L2mxmS4AJ4IjHxCzwaUnHkgmY2V7gLrAyAPwOXJN0qg6DCgIvgQfAPsDjo2pcKddLciEz+wCs6AO6W9KjVBIVBGIgahN4BvRLMjslPYlZPbT53wR2AbeBtcUmXEFPdh5U06mbd/shBBzbr/Jx4FCAX0+BEsDMFocEYrNmFcE+BD4XsXZL0oyZnQCutkagzkn3m1NBwDe/Q9L74MAuFEqUn5op8I8JvJO0elacTALnc1HAH3Njkvwx+WeYWUegTa/pwaqIgexdyIN4uyRPmqULZRXEvulPwD3gpr+zcrtGQxfzRHYG2AAczuUWiom3kc4D2RN4BdwH9gM9CS0XFyoLGu9UuN974eIFVDiuSzruH5LqgRhtU20q8kBPV8LMlhVVmVdnYwX+SMdAZVeieAF7eeltmElJr4cpkH1bJfvGVvatxdR4bMu+teZuWxtKxWncXn8I7EldtQV7vz79fp9KwZp//9CksB8F206BuVahU6BToOEJ/Ab7+KdABdTt8AAAAABJRU5ErkJggg==") no-repeat 50%;background-size:100% 100%}.jessibuca-container .jessibuca-icon-recordStop{background:url("data:image/png;base64,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") no-repeat 50%;background-size:100% 100%}.jessibuca-container .jessibuca-icon-recordStop:hover{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAHn0lEQVRoQ81ZbYxcVRl+nnvu7ErSEmtqDdKwO3e2LWJLSEuFNiofFv9AUIpfiSFqCzt31lITGgEjHxKIKVirqXbnzpZSf5BAoHwIhpiAgDVSwBaU1rZLd+7skiIJKCWVpOzOPfc1d3dn986dO3Nn9kvuz3ve87zPc857znnPe4gZ+BZvlzPMed4XDG2sBGWFAGcRXET6ZwTwIsZpgbxL4B0ID/nKf8370Hz1xE08PV33nDKACDOO/roQ15K4TASfbQWLxL9E8AKJvcWs+WQrfcO2UxKQcfSNAn8TwKVTdVzdT/oJbi/aZl+reC0JsArelRDeC8jnW3XUnL0cofC2Ys58ojl7oDkBj4hKv697CXQnA8sxCEsE3hbKh4E9hfMEOBuUNMBzkzAE6Ct9SvXgW9RJtokC0r+VDqb8pyByfgOwZ0g84mv1cqmH/Y2cpntlmUG9BgauEcHVdW3JN6RsXF3axKFGeA0FdBVGVvpi/AnAJ2NAhkHpBU3H7eabSSMV1271yVL63g0C3gigPcbmA/r+umJP28F6+HUFZPLDy4XqVQCjW2HkexJQN7s2j0+FeLRPZqd0idL3Algfg/cRRa8u5toPx/mKFZDJyyKhPgZgQU0nssfNqvxMEK8RktdZoThxM2G0qaUDG/hetC1WgOXo1wG5IGJcNkS+OpBLvTgb5CuYXfnypT75x2hICfh6yVYrEwWknfJ9BH8cJU/fX9MoFmdS1Pja2w+gLYwrkF+U7NTN4X9VM9CxUz6nlD5So5JyeTGbemEmSSZhZQrly0T4fNROa3Xe0A95tPK/SoDleH8DcGF1J97q2ipYYHP+WY6+BZCtEccHXNtcXSPA6iuvg89nGxnPuQIAlqMPAhKJfVnn2qlge588iS3H2wfgS1XxJXpFve0rbNexS9JKwzQIvxmRvsDQCt7QDSwl2ad7h8+nof4Rsdvn2uYlEwKCAwW+jp6gT7u2Wf+kBBCcqjT8RwFZkUQktp18AzS+mXQQWo73NICrqjHU0uAcGl0DlqPvAOSusIFP/+LBbNsrjYhZjvccgK9MiXylk+A5N2de0QijszBykSHGy1XRQd5RzKq7RwVkHG+/ABdPGBADbtZckkTMcjw3mIgku0btArgl28wkYViONxBQndSN/SXbXMvRZM3UQS4zuedS7nOzqVuSQfXh6afW/Kdrq+VJvmLOpxFQLaHleEH+8VgE4ErXNp9JArUcfQiQROeNcXjYtVXiGhq7i+AP1ZsM1tNy9E8A+XmowfdFZQZzHPw4CejMS6dBHYRs6OzirbTyXi+IXIjsiXPeUekX76L3cRJw6Z1ivnWWDgb17BCvXloF7yEIvjP5k4dcWzW6vEyYzmUIje+W0ZB9KFgDjwO4JqTqFdc2J3ekBtMw9wK8YCu9KETpiWAG9kJwbejnQdc2I/lQvIr/g4ADAFaF2OwNZmAPgO9P/pQ3XTu1LCn+60xpM90iNs3tQmP+yv2RUs4eWk55K8Dwnn/Kb1cdgz/gB0ls5nIGzumVBaahgwv+/AleIluZcbxuAQpV+6vvX9jM5WUuBWR6R1aJYQQhFOKPbnY55TU++FL1aDPn2irublplNpcCrILOQaQ3TMCArGXnHvmEGtHFcG2TxFPFrPm15BAqHwPY1HqpjyX9rp1KLHbFZKRv++2qazwb9R4E8N2Qk7IxohYObOapRiLSjlckYCUJbdTeTDLXtUPO9Nv0fwCYIawHXdu8riIgJh/iFtdW2xsKKOgtFNk2HQEQ3uTm1K9a9UPB+qCGOipgVUFSJ0W/W1WBE7zn5sxFSeTSee86EpdT4ImBxFpmgEcfSgglwPMl2wxmv+FnOV5QD1oYMjq5gOozB7MsTyRGVkHfCZGfVe1G4O1FW92T5GA22+MuWwK5p2Snbh8djIrz83bKvI+Ufh9AKrxT+aKsZjLT2RAxdtfWxeoMFJ7frj5dOaeqyioZR98mkLurycgR107N0ntAUuiUj0bL8YxERU1p0Sp4gxB0VEETj7lZ8xuzMcr1MGNytCBehtys2Vkd5hGE8bJeXDl7t2ub18+FiEze2yVEjS+D/qqBbNtrDQUEjWNvYLIjSlaA36sR9e2BzRyeDSHBocph/TCBmkOU4OairX4T9Vv3fcByyr8G+KMaosSAaNlQ6kn9ZSZFWIXyFyH8XbjyUMEXkR2lXKqWS2R11/CxHO9+ABtjiQryMNRWN8u3piOka5cs9rX+KQA7Fod4wM2a8RySBIyGU768TcgtdUieJrEbvjxczKX+2oqQ8REPrrLfAzAvri8h24p2Klrqj+wvTXhNO95GjqXcqp45KUcF3CfAAaEcN+H/25e2/wb2BkfmezAWUrgEgtWEfDnhtVJD0O3mzAeS6CW+UlYArMLwCoj6JYCGZcCIw8pij3vAq8dtH6g3udn2Q0nkg/amBVTA0gXveopsaea9txkCkzZynOC2Vl/rWxYwMSN5b8PoAifWtkY0Yi14CcT9rm0Gd/OWvykLqHjq7Bu5QIm6QkQuAbG85hSPUiKGIDhM8s+a+tnB7ra/t8w61GHaAsLOl+2W+WVdPpfaWCzBE63BM0fbfTlF4KQo/0RKpY71b+To4p6J73/tXyc1fevA3AAAAABJRU5ErkJggg==") no-repeat 50%;background-size:100% 100%}.jessibuca-container .jessibuca-icon-fullscreen{background:url("data:image/png;base64,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") no-repeat 50%;background-size:100% 100%}.jessibuca-container .jessibuca-icon-fullscreen:hover{background:url("data:image/png;base64,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") no-repeat 50%;background-size:100% 100%}.jessibuca-container .jessibuca-icon-fullscreenExit{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADd0lEQVRoQ+2Zz2sdVRTHv+fJBDW6anDVXen6wZszYxYBiYgtFGst3VSDunKjpS0GpUlqfjVpsVVs6aaL0or4YxMVFCJZ2ZLdPUP+gq5bQnTxtNAkfTnlhnnlkmQy9yV9780rudt77tzv5/y4v4bQ4Y06XD/2ANodwec/AiJygJnvtdvTWfPnRkBEJAiCN8rl8kMfiPn5+Ve7u7v3rays0Orq6lJfX99/PuN2auMDoAD+BvA2M6/mTWSMOUtE48D6AjHGzN/kjdlNvy+AnWOOmQ/lTSYiEwDOWzsimgrDcCRvzG76GwGw8/zJzO9sN6GInAMwbW1UdSSKoqndCMwb6wNwGsB39Q+p6h/M/C4R2dTa1AoHYBWKyCkA1+pqiWi2Wq0e7e/vf7yRoJAAKcQggMtuJKIoOtoxACnE0/xOi/SXMAxPuhCFjUBdpIjYVWXSEf0TM3/g9BeriDMKdSPEz8z8vrU1xgwT0YXCrEJZy1iSJKOqOub0/8jMA0mSfKKqNwoPkHp7ioiGHIhRIvpHVa93BEBa2JcAfOlALAHo6RgAKzRJkk9V1S6xL7kpV4idOM31taxaIKJHqmpPnMMA9hcOQES2PDJkAT1XAAC+ZebPfWB3auNzmLObVsNRUNUXVHUujuM7OxXnMy4XwOcj29mIyOuq+lapVGrYCelKpkEQ3CyXy4tbzdN0AGPMxr2iYZ+sra3FcRybtgCIiK2BKw2rdgaUSqWoUqlIkQAepFDdAF7cBq5ERI9rtdr1OI7tmE2t6SmUEYFHAEaexYW/1QC2EF+ru5GIvg7D0D2GNJxprQY4o6qv1I/b6SpzOYqiLxpWng5oOQAzXxWRWwA+dkRfYOb1p5hGW6sBJpn5KytSRG4D+KguWFXHoyhy7xdeLC0F2ChSRL4H8OFuINoKYIUbY34gogHH3eeZef1K6tPaDpCm068A3nMEDzHzxY4BUNWSiPxORO6z5aDPPlGICNQ9bYyZIaLjjudzIQoFkKbTbwCO+UI0HcB9J/LdeY0xs0R02IGYYObRrWqiFQCfEZEtSHsfmGZm+4qxbbM/hQD8BeBNa0hEM2EYnmgLgP3lFARBT1dXly4vL//b29tbzQNIU+llAHeJaLFSqRzJes5vegR8xGbZLCwsHKzVav8z8/0sm0ID+MDvAfh4qZk2exFopnd9vv0ELrXBQO7fD10AAAAASUVORK5CYII=") no-repeat 50%;background-size:100% 100%}.jessibuca-container .jessibuca-icon-fullscreenExit:hover{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAC/ElEQVRoQ+2Zy49NQRCHvx+ReK6IlZ34E7CUiCAR4xEbTLCyQRATYswwb2IQZDYWgojHZpCQECts+ResiQwLj0RClNSkb9Lu3HtPz7mZc8+V6eXt6tP1VVV3VdcVbT7U5vozC9BqD/7/HjCzlZLet9rS9fbP9ICZvQPWSfqRAmFmS4ClMHm+JiR9S1mXVyYFwIBXwEZJv7I2MrPjQH8A6JN0OWtNM/OpAL7HS0mbsjYzswGgN8gNS+rJWtPM/HQAfJ9nkrY22tDMTgMjQaZH0nAzCmatTQE4ClyNPvQU2CbJQ2vKKB2Aa2hmR4DrkbbPgQ5Jv6sJSgkQILqA0dgTkjraBiBAxPHtPz2UtDuGKK0HKkqamd8qg5HS9yXtjebLdYjrHNRqiAeS9gQvnQGGSnML1bvGzOwc0BfN35PUaWYHgRulBwjW9ju+O4JwqM/AWFsABIgLwKkIYgJY1jYAAeJQuGIXVIVcKTKxh8WfBin9J+AVpx/eFWUEqFkyNACKp0rhgWYArkg6kQibSyylmPOklQdibijBX+fSLHFRJkDid+qKmdlaYENOI0zeEcBNSZ9qbVIEQHWuyGOTNZLetgrAz8ClPFpHa1ZL8rf5lFGEB2oBfAxQi4D5DeDmAP7mGJPka0oD4LnDr9imH/xFe8AP4vLIjBclxWXItCOtaIBjwOKo3HaFRyWdnLbmYUHhAJKumdkt4ECk9JCkSitmWixFAwxKOjt5uZvdBvZH2vZLit8XSSBFA/yjpJndAfY1A9FSgOCJu0BnBNErqfIkzfRCywECxCNgR6Rtt6TzmdqHBmyKXG4ZM4sTWc04NzNPWE+AuG3ZlZInSuGBinXMbBzYGVkrE6JUACGcHgPbUyGKAIj7REmZ18y897o5ghiQ5E/bltRChwE/kF7Xj0jyLkbDYWbzgBfA+iA4LmlXqwD8LydvszjAF0lfswBCKC0E3gBeP22p186f8RBKUbaejJmtAr5L+lBPptQAKfCzAClWmkmZWQ/MpHVTvv0X9iFAQGQyevIAAAAASUVORK5CYII=") no-repeat 50%;background-size:100% 100%}.jessibuca-container .jessibuca-icon-audio{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACrUlEQVRoQ+2ZPYgTURCAZzbBXJnCeL2Cnb87b9MEtPBUrrMQFAtrtT5/ClGs9LBWWz0RtbBUFCF4oJDsbO68wsLA2YqQSmLlvpEHu7IuMdlLcus+yUKKhJfZ+ebnvZl5CJY/aLn+MAP41x7M1QPMfFtr/crzvHfTAs8FoNPp1LTWzwHgqIg0lFLvrQHwfX8BER8DwC6jNCIecF13wwoA3/dvIuKNpLJa60Oe560XGoCZd4rICiKeTCtaeABmPg4AJmRqg6xcaABmvg4At4aFRyEBhoVM4UMoCplHADCfJTEL5YEsIVNID5iQAYCHALCYxeq5b6PMfF5EBAAEESthGK7W6/XPRpFWq7W3VCqtZg2ZcT3g+/6i4zjzIlLSWn/yPO/DIGMNLCWY2Sj/+xGRK0qpZfNDEASnROTFVi0fr8+aA8z8Ld6KEfGt67oLYwMAwEUium8EREn7OgeAjwCwPyo/nrque3YSgAtE9GDaAM1mc65arc4Zuf1+P2w0Gt9jJZl5DQAORt+fENG5wgEw8zUAMB/zbBBRwyqAIAjuiMjlSOlNItpjFUCqWl0josMzgChR/9hGAWBbknjmAdPhDdqa0gfZzAMJKyVP4v8hhJYRcSni+0JEu63ahZj5anyQici6UuqIVQDdbrfS6/UqRulyufyTiH5sF8AlIro37VpoWEHIzGZ2tM+sEZFnSqkzk9RCS0R01wjIsZz+mug53hDRia0AnI4bGgDYISItz/M2jYC8Gpp2u30MEWuO4zha665Sqp0ZYFStX/iWchRAItFGzoHSsrJ2ZFl1mHg6bfVYJeGJv85CC++BpIJZ5kSFC6G0ha0e7mYJqcJ7IOkRay84UhD2XjHFIFZf8iW9YcYoYRi+tO6aNeupOs66iU/icV46zf/MAKZpzXFk/QL+JG1PUPhRiQAAAABJRU5ErkJggg==") no-repeat 50%;background-size:100% 100%}.jessibuca-container .jessibuca-icon-audio:hover{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACSElEQVRoQ+2Zu4sUQRCHf5+C+gf4yBXMfMYHGvjCzEBQDIzV+HwEohipGKupD0QNDE8UEwUFTe68wEDhTMVUMFJ+0tArzbjs9u3Ojt0wBR0M9MzUV1XdXVWNKhcq1189wP/2YKcesH1d0nPgdVvgnQDY3iTpqaT9kuaAt9UA2D4o6aGkzVHpXcByFQC2r0q60lB2D7BUNIDtjZIeSDoyRNGyAWwfiiET4n6YlAtg+7Kka2PCozyAMSHT5CkLIIbMfUlbMhdmOQCZIVOeB2LI3JN0NNPq6bTZe8D2aUmOY72kN8DnoIXt7eF5FSEzkQdsB+OEsFwr6RPwbpixhqYStoPyqVwAbkaAY5KeTWD5wStZHrD9XdJgK34FhBP9H8kFOAvciQBhn3/RAcBHSTvjfx4DJ6cBOAPcbRvA9gZJYQT5DfwYKGl7UdLu+PwIOFUiwCVJYQRZBuZqA7gh6XxUegXYVhtAmq0uAnt7gLhQm9vorBZx74Hcc6D3QLKH/z2JGyVnlYs4pCfzEe4rsLW2XehicpAtAftqAwiZbhhBfgE/ZwVwDrjddi40KiG0HXpHO+KcJ8CJaXKheeBWBOgqnf6W1BwvgcOrATieFDTrJL0HViJAVwXNgVgPrJH0BfiQDTDKtREiNK7KLSnHASQLLacP1PxcVkWWq8PU3emq2yqJJ0b1Qsv2QKpdZp+orBBqmrfq5m5mSJXtgUZI1XnB0YCo94opCal6L/ka3ghtlIXqrllzT9VJ5k19Ek/y0zbf6QHatOYk3/oDujC8QMWgjf4AAAAASUVORK5CYII=") no-repeat 50%;background-size:100% 100%}.jessibuca-container .jessibuca-icon-mute{background:url("data:image/png;base64,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") no-repeat 50%;background-size:100% 100%}.jessibuca-container .jessibuca-icon-mute:hover{background:url("data:image/png;base64,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") no-repeat 50%;background-size:100% 100%}.jessibuca-container .jessibuca-icon-text{font-size:14px;width:30px}.jessibuca-container .jessibuca-speed{font-size:14px;color:#fff}.jessibuca-container .jessibuca-quality-menu-list{position:absolute;left:50%;bottom:100%;visibility:hidden;opacity:0;transform:translateX(-50%);transition:visibility .3s,opacity .3s;background-color:rgba(0,0,0,.5);border-radius:4px}.jessibuca-container .jessibuca-quality-menu-list.jessibuca-quality-menu-shown{visibility:visible;opacity:1}.jessibuca-container .icon-title-tips{pointer-events:none;position:absolute;left:50%;bottom:100%;visibility:hidden;opacity:0;transform:translateX(-50%);transition:visibility .3s ease 0s,opacity .3s ease 0s;background-color:rgba(0,0,0,.5);border-radius:4px}.jessibuca-container .icon-title{display:inline-block;padding:5px 10px;font-size:12px;white-space:nowrap;color:#fff}.jessibuca-container .jessibuca-quality-menu{padding:8px 0}.jessibuca-container .jessibuca-quality-menu-item{display:block;height:25px;margin:0;padding:0 10px;cursor:pointer;font-size:14px;text-align:center;width:50px;color:hsla(0,0%,100%,.5);transition:color .3s,background-color .3s}.jessibuca-container .jessibuca-quality-menu-item:hover{background-color:hsla(0,0%,100%,.2)}.jessibuca-container .jessibuca-quality-menu-item:focus{outline:none}.jessibuca-container .jessibuca-quality-menu-item.jessibuca-quality-menu-item-active{color:#2298fc}.jessibuca-container .jessibuca-volume-panel-wrap{position:absolute;left:50%;bottom:100%;visibility:hidden;opacity:0;transform:translateX(-50%) translateY(22%);transition:visibility .3s,opacity .3s;background-color:rgba(0,0,0,.5);border-radius:4px;height:120px;width:50px;overflow:hidden}.jessibuca-container .jessibuca-volume-panel-wrap.jessibuca-volume-panel-wrap-show{visibility:visible;opacity:1}.jessibuca-container .jessibuca-volume-panel{cursor:pointer;position:absolute;top:21px;height:60px;width:50px;overflow:hidden}.jessibuca-container .jessibuca-volume-panel-text{position:absolute;left:0;top:0;width:50px;height:20px;line-height:20px;text-align:center;color:#fff;font-size:12px}.jessibuca-container .jessibuca-volume-panel-handle{position:absolute;top:48px;left:50%;width:12px;height:12px;border-radius:12px;margin-left:-6px;background:#fff}.jessibuca-container .jessibuca-volume-panel-handle:before{bottom:-54px;background:#fff}.jessibuca-container .jessibuca-volume-panel-handle:after{bottom:6px;background:hsla(0,0%,100%,.2)}.jessibuca-container .jessibuca-volume-panel-handle:after,.jessibuca-container .jessibuca-volume-panel-handle:before{content:"";position:absolute;display:block;left:50%;width:3px;margin-left:-1px;height:60px}');

    class Ue {
        constructor(e) {
            var t;
            this.player = e, ((e, t) => {
                e.$container.classList.add("jessibuca-controls-show");
                const i = e._opt, n = i.operateBtns;
                e.$container.insertAdjacentHTML("beforeend", `\n            ${i.background ? `<div class="jessibuca-poster" style="background-image: url(${i.background})"></div>` : ""}\n            <div class="jessibuca-loading">\n                ${De.loading}\n                ${i.loadingText ? `<div class="jessibuca-loading-text">${i.loadingText}</div>` : ""}\n            </div>\n            ${i.hasControl && n.play ? '<div class="jessibuca-play-big"></div>' : ""}\n            ${i.hasControl ? `\n                <div class="jessibuca-controls">\n                    <div class="jessibuca-controls-bottom">\n                        <div class="jessibuca-controls-left">\n                            ${i.showBandwidth ? '<div class="jessibuca-controls-item jessibuca-speed"></div>' : ""}\n                        </div>\n                        <div class="jessibuca-controls-right">\n                             ${n.audio ? `\n                                 <div class="jessibuca-controls-item jessibuca-volume">\n                                     ${De.audio}\n                                     ${De.mute}\n                                     <div class="jessibuca-volume-panel-wrap">\n                                          <div class="jessibuca-volume-panel">\n                                                 <div class="jessibuca-volume-panel-handle"></div>\n                                          </div>\n                                          <div class="jessibuca-volume-panel-text"></div>\n                                     </div>\n                                 </div>\n                             ` : ""}\n                             ${n.play ? `<div class="jessibuca-controls-item jessibuca-play">${De.play}</div><div class="jessibuca-controls-item jessibuca-pause">${De.pause}</div>` : ""}\n                             ${n.screenshot ? `<div class="jessibuca-controls-item jessibuca-screenshot">${De.screenshot}</div>` : ""}\n                             ${n.record ? ` <div class="jessibuca-controls-item jessibuca-record">${De.record}</div><div class="jessibuca-controls-item jessibuca-record-stop">${De.recordStop}</div>` : ""}\n                             ${n.fullscreen ? `<div class="jessibuca-controls-item jessibuca-fullscreen">${De.fullscreen}</div><div class="jessibuca-controls-item jessibuca-fullscreen-exit">${De.fullscreenExit}</div>` : ""}\n                        </div>\n                    </div>\n                </div>\n            ` : ""}\n\n        `), Object.defineProperty(t, "$poster", {value: e.$container.querySelector(".jessibuca-poster")}), Object.defineProperty(t, "$loading", {value: e.$container.querySelector(".jessibuca-loading")}), Object.defineProperty(t, "$play", {value: e.$container.querySelector(".jessibuca-play")}), Object.defineProperty(t, "$playBig", {value: e.$container.querySelector(".jessibuca-play-big")}), Object.defineProperty(t, "$pause", {value: e.$container.querySelector(".jessibuca-pause")}), Object.defineProperty(t, "$controls", {value: e.$container.querySelector(".jessibuca-controls")}), Object.defineProperty(t, "$fullscreen", {value: e.$container.querySelector(".jessibuca-fullscreen")}), Object.defineProperty(t, "$fullscreen", {value: e.$container.querySelector(".jessibuca-fullscreen")}), Object.defineProperty(t, "$volume", {value: e.$container.querySelector(".jessibuca-volume")}), Object.defineProperty(t, "$volumePanelWrap", {value: e.$container.querySelector(".jessibuca-volume-panel-wrap")}), Object.defineProperty(t, "$volumePanelText", {value: e.$container.querySelector(".jessibuca-volume-panel-text")}), Object.defineProperty(t, "$volumePanel", {value: e.$container.querySelector(".jessibuca-volume-panel")}), Object.defineProperty(t, "$volumeHandle", {value: e.$container.querySelector(".jessibuca-volume-panel-handle")}), Object.defineProperty(t, "$volumeOn", {value: e.$container.querySelector(".jessibuca-icon-audio")}), Object.defineProperty(t, "$volumeOff", {value: e.$container.querySelector(".jessibuca-icon-mute")}), Object.defineProperty(t, "$fullscreen", {value: e.$container.querySelector(".jessibuca-fullscreen")}), Object.defineProperty(t, "$fullscreenExit", {value: e.$container.querySelector(".jessibuca-fullscreen-exit")}), Object.defineProperty(t, "$record", {value: e.$container.querySelector(".jessibuca-record")}), Object.defineProperty(t, "$recordStop", {value: e.$container.querySelector(".jessibuca-record-stop")}), Object.defineProperty(t, "$screenshot", {value: e.$container.querySelector(".jessibuca-screenshot")}), Object.defineProperty(t, "$speed", {value: e.$container.querySelector(".jessibuca-speed")})
            })(e, this), Oe(e, this), t = this, Object.defineProperty(t, "controlsRect", {get: () => t.$controls.getBoundingClientRect()}), ((e, t) => {
                const {events: {proxy: i}} = e;

                function n(e) {
                    const {
                        bottom: i,
                        height: n
                    } = t.$volumePanel.getBoundingClientRect(), {height: o} = t.$volumeHandle.getBoundingClientRect();
                    return oe(i - e.y - o / 2, 0, n - o / 2) / (n - o)
                }

                i(window, ["click", "contextmenu"], (i => {
                    i.composedPath().indexOf(e.$container) > -1 ? t.isFocus = !0 : t.isFocus = !1
                })), i(window, "orientationchange", (() => {
                    setTimeout((() => {
                        e.resize()
                    }), 300)
                })), i(t.$controls, "click", (e => {
                    e.stopPropagation()
                })), i(t.$pause, "click", (t => {
                    e.pause()
                })), i(t.$play, "click", (t => {
                    e.play()
                })), i(t.$playBig, "click", (t => {
                    e.play()
                })), i(t.$volume, "mouseover", (() => {
                    t.$volumePanelWrap.classList.add("jessibuca-volume-panel-wrap-show")
                })), i(t.$volume, "mouseout", (() => {
                    t.$volumePanelWrap.classList.remove("jessibuca-volume-panel-wrap-show")
                })), i(t.$volumeOn, "click", (i => {
                    i.stopPropagation(), re(t.$volumeOn, "display", "none"), re(t.$volumeOff, "display", "block"), e.lastVolume = e.volume, e.volume = 0
                })), i(t.$volumeOff, "click", (i => {
                    i.stopPropagation(), re(t.$volumeOn, "display", "block"), re(t.$volumeOff, "display", "none"), e.volume = e.lastVolume || .5
                })), i(t.$screenshot, "click", (t => {
                    t.stopPropagation(), e.video.screenshot()
                })), i(t.$volumePanel, "click", (t => {
                    t.stopPropagation(), e.volume = n(t)
                })), i(t.$volumeHandle, "mousedown", (() => {
                    t.isVolumeDroging = !0
                })), i(t.$volumeHandle, "mousemove", (i => {
                    t.isVolumeDroging && (e.volume = n(i))
                })), i(document, "mouseup", (() => {
                    t.isVolumeDroging && (t.isVolumeDroging = !1)
                })), i(t.$record, "click", (t => {
                    t.stopPropagation(), e.recording = !0
                })), i(t.$recordStop, "click", (t => {
                    t.stopPropagation(), e.recording = !1
                })), i(t.$fullscreen, "click", (t => {
                    t.stopPropagation(), e.fullscreen = !0
                })), i(t.$fullscreenExit, "click", (t => {
                    t.stopPropagation(), e.fullscreen = !1
                }))
            })(e, this), this.player.debug.log("Control", "init")
        }

        autoSize() {
            const e = this.player;
            e.$container.style.padding = "0 0";
            const t = e.width, i = e.height, n = t / i, o = e.audio.$videoElement.width / e.audio.$videoElement.height;
            if (n > o) {
                const n = (t - i * o) / 2;
                e.$container.style.padding = `0 ${n}px`
            } else {
                const n = (i - t / o) / 2;
                e.$container.style.padding = `${n}px 0`
            }
        }

        destroy() {
            this.player.debug.log("control", "destroy"), this.$poster && this.player.$container.removeChild(this.$poster), this.player.$container.removeChild(this.$loading), this.$controls && this.player.$container.removeChild(this.$controls), this.player = null
        }
    }

    je(".jessibuca-container{position:relative;width:100%;height:100%;overflow:hidden}.jessibuca-container.jessibuca-fullscreen-web{position:fixed;z-index:9999;left:0;top:0;right:0;bottom:0;width:100%!important;height:100%!important;background:#000}");

    class Fe {
        static init() {
            Fe.types = {
                avc1: [],
                avcC: [],
                hvc1: [],
                hvcC: [],
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
                smhd: []
            };
            for (let e in Fe.types) Fe.types.hasOwnProperty(e) && (Fe.types[e] = [e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3)]);
            let e = Fe.constants = {};
            e.FTYP = new Uint8Array([105, 115, 111, 109, 0, 0, 0, 1, 105, 115, 111, 109, 97, 118, 99, 49]), e.STSD_PREFIX = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]), e.STTS = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), e.STSC = e.STCO = e.STTS, e.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), e.HDLR_VIDEO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0]), e.HDLR_AUDIO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]), e.DREF = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]), e.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), e.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0])
        }

        static box(e) {
            let t = 8, i = null, n = Array.prototype.slice.call(arguments, 1), o = n.length;
            for (let e = 0; e < o; e++) t += n[e].byteLength;
            i = new Uint8Array(t), i[0] = t >>> 24 & 255, i[1] = t >>> 16 & 255, i[2] = t >>> 8 & 255, i[3] = 255 & t, i.set(e, 4);
            let r = 8;
            for (let e = 0; e < o; e++) i.set(n[e], r), r += n[e].byteLength;
            return i
        }

        static generateInitSegment(e) {
            let t = Fe.box(Fe.types.ftyp, Fe.constants.FTYP), i = Fe.moov(e),
                n = new Uint8Array(t.byteLength + i.byteLength);
            return n.set(t, 0), n.set(i, t.byteLength), n
        }

        static moov(e) {
            let t = Fe.mvhd(e.timescale, e.duration), i = Fe.trak(e), n = Fe.mvex(e);
            return Fe.box(Fe.types.moov, t, i, n)
        }

        static mvhd(e, t) {
            return Fe.box(Fe.types.mvhd, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, e >>> 24 & 255, e >>> 16 & 255, e >>> 8 & 255, 255 & e, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]))
        }

        static trak(e) {
            return Fe.box(Fe.types.trak, Fe.tkhd(e), Fe.mdia(e))
        }

        static tkhd(e) {
            let t = e.id, i = e.duration, n = e.presentWidth, o = e.presentHeight;
            return Fe.box(Fe.types.tkhd, new Uint8Array([0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, 0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, n >>> 8 & 255, 255 & n, 0, 0, o >>> 8 & 255, 255 & o, 0, 0]))
        }

        static mdia(e) {
            return Fe.box(Fe.types.mdia, Fe.mdhd(e), Fe.hdlr(e), Fe.minf(e))
        }

        static mdhd(e) {
            let t = e.timescale, i = e.duration;
            return Fe.box(Fe.types.mdhd, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 85, 196, 0, 0]))
        }

        static hdlr(e) {
            let t = null;
            return t = "audio" === e.type ? Fe.constants.HDLR_AUDIO : Fe.constants.HDLR_VIDEO, Fe.box(Fe.types.hdlr, t)
        }

        static minf(e) {
            let t = null;
            return t = "audio" === e.type ? Fe.box(Fe.types.smhd, Fe.constants.SMHD) : Fe.box(Fe.types.vmhd, Fe.constants.VMHD), Fe.box(Fe.types.minf, t, Fe.dinf(), Fe.stbl(e))
        }

        static dinf() {
            return Fe.box(Fe.types.dinf, Fe.box(Fe.types.dref, Fe.constants.DREF))
        }

        static stbl(e) {
            return Fe.box(Fe.types.stbl, Fe.stsd(e), Fe.box(Fe.types.stts, Fe.constants.STTS), Fe.box(Fe.types.stsc, Fe.constants.STSC), Fe.box(Fe.types.stsz, Fe.constants.STSZ), Fe.box(Fe.types.stco, Fe.constants.STCO))
        }

        static stsdOld(e) {
            return "audio" === e.type ? Fe.box(Fe.types.stsd, Fe.constants.STSD_PREFIX, Fe.mp4a(e)) : "avc" === e.videoType ? Fe.box(Fe.types.stsd, Fe.constants.STSD_PREFIX, Fe.avc1(e)) : Fe.box(Fe.types.stsd, Fe.constants.STSD_PREFIX, Fe.hvc1(e))
        }

        static stsd(e) {
            return "audio" === e.type ? Fe.box(Fe.types.stsd, Fe.constants.STSD_PREFIX, Fe.mp4a(e)) : "avc" === e.videoType ? Fe.box(Fe.types.stsd, Fe.constants.STSD_PREFIX, Fe.avc1(e)) : Fe.box(Fe.types.stsd, Fe.constants.STSD_PREFIX, Fe.hvc1(e))
        }

        static mp4a(e) {
            let t = e.channelCount, i = e.audioSampleRate,
                n = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, t, 0, 16, 0, 0, 0, 0, i >>> 8 & 255, 255 & i, 0, 0]);
            return Fe.box(Fe.types.mp4a, n, Fe.esds(e))
        }

        static esds(e) {
            let t = e.config || [], i = t.length,
                n = new Uint8Array([0, 0, 0, 0, 3, 23 + i, 0, 1, 0, 4, 15 + i, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([i]).concat(t).concat([6, 1, 2]));
            return Fe.box(Fe.types.esds, n)
        }

        static avc1(e) {
            let t = e.avcc;
            const i = e.codecWidth, n = e.codecHeight;
            let o = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, i >>> 8 & 255, 255 & i, n >>> 8 & 255, 255 & n, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 255, 255]);
            return Fe.box(Fe.types.avc1, o, Fe.box(Fe.types.avcC, t))
        }

        static hvc1(e) {
            let t = e.avcc;
            const i = e.codecWidth, n = e.codecHeight;
            let o = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, i >>> 8 & 255, 255 & i, n >>> 8 & 255, 255 & n, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 255, 255]);
            return Fe.box(Fe.types.hvc1, o, Fe.box(Fe.types.hvcC, t))
        }

        static mvex(e) {
            return Fe.box(Fe.types.mvex, Fe.trex(e))
        }

        static trex(e) {
            let t = e.id,
                i = new Uint8Array([0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]);
            return Fe.box(Fe.types.trex, i)
        }

        static moof(e, t) {
            return Fe.box(Fe.types.moof, Fe.mfhd(e.sequenceNumber), Fe.traf(e, t))
        }

        static mfhd(e) {
            let t = new Uint8Array([0, 0, 0, 0, e >>> 24 & 255, e >>> 16 & 255, e >>> 8 & 255, 255 & e]);
            return Fe.box(Fe.types.mfhd, t)
        }

        static traf(e, t) {
            let i = e.id,
                n = Fe.box(Fe.types.tfhd, new Uint8Array([0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i])),
                o = Fe.box(Fe.types.tfdt, new Uint8Array([0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t])),
                r = Fe.sdtp(e), s = Fe.trun(e, r.byteLength + 16 + 16 + 8 + 16 + 8 + 8);
            return Fe.box(Fe.types.traf, n, o, s, r)
        }

        static sdtpOld(e) {
            let t = new Uint8Array(5), i = e.flags;
            return t[4] = i.isLeading << 6 | i.dependsOn << 4 | i.isDependedOn << 2 | i.hasRedundancy, Fe.box(Fe.types.sdtp, t)
        }

        static sdtp(e) {
            let t = new Uint8Array(5), i = e.flags;
            return t[4] = i.isLeading << 6 | i.dependsOn << 4 | i.isDependedOn << 2 | i.hasRedundancy, Fe.box(Fe.types.sdtp, t)
        }

        static trun(e, t) {
            let i = new Uint8Array(28);
            t += 36, i.set([0, 0, 15, 1, 0, 0, 0, 1, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t], 0);
            let n = e.duration, o = e.size, r = e.flags, s = e.cts;
            return i.set([n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, o >>> 24 & 255, o >>> 16 & 255, o >>> 8 & 255, 255 & o, r.isLeading << 2 | r.dependsOn, r.isDependedOn << 6 | r.hasRedundancy << 4 | r.isNonSync, 0, 0, s >>> 24 & 255, s >>> 16 & 255, s >>> 8 & 255, 255 & s], 12), Fe.box(Fe.types.trun, i)
        }

        static mdat(e) {
            return Fe.box(Fe.types.mdat, e)
        }
    }

    Fe.init();

    class Pe {
        constructor(e) {
            this.TAG = "ExpGolomb", this._buffer = e, this._buffer_index = 0, this._total_bytes = e.byteLength, this._total_bits = 8 * e.byteLength, this._current_word = 0, this._current_word_bits_left = 0
        }

        destroy() {
            this._buffer = null
        }

        _fillCurrentWord() {
            let e = this._total_bytes - this._buffer_index, t = Math.min(4, e), i = new Uint8Array(4);
            i.set(this._buffer.subarray(this._buffer_index, this._buffer_index + t)), this._current_word = new DataView(i.buffer).getUint32(0, !1), this._buffer_index += t, this._current_word_bits_left = 8 * t
        }

        readBits(e) {
            if (e <= this._current_word_bits_left) {
                let t = this._current_word >>> 32 - e;
                return this._current_word <<= e, this._current_word_bits_left -= e, t
            }
            let t = this._current_word_bits_left ? this._current_word : 0;
            t >>>= 32 - this._current_word_bits_left;
            let i = e - this._current_word_bits_left;
            this._fillCurrentWord();
            let n = Math.min(i, this._current_word_bits_left), o = this._current_word >>> 32 - n;
            return this._current_word <<= n, this._current_word_bits_left -= n, t = t << n | o, t
        }

        readBool() {
            return 1 === this.readBits(1)
        }

        readByte() {
            return this.readBits(8)
        }

        _skipLeadingZero() {
            let e;
            for (e = 0; e < this._current_word_bits_left; e++) if (0 != (this._current_word & 2147483648 >>> e)) return this._current_word <<= e, this._current_word_bits_left -= e, e;
            return this._fillCurrentWord(), e + this._skipLeadingZero()
        }

        readUEG() {
            let e = this._skipLeadingZero();
            return this.readBits(e + 1) - 1
        }

        readSEG() {
            let e = this.readUEG();
            return 1 & e ? e + 1 >>> 1 : -1 * (e >>> 1)
        }
    }

    class Me {
        static _ebsp2rbsp(e) {
            let t = e, i = t.byteLength, n = new Uint8Array(i), o = 0;
            for (let e = 0; e < i; e++) e >= 2 && 3 === t[e] && 0 === t[e - 1] && 0 === t[e - 2] || (n[o] = t[e], o++);
            return new Uint8Array(n.buffer, 0, o)
        }

        static parseSPS(e) {
            let t = Me._ebsp2rbsp(e), i = new Pe(t);
            i.readByte();
            let n = i.readByte();
            i.readByte();
            let o = i.readByte();
            i.readUEG();
            let r = Me.getProfileString(n), s = Me.getLevelString(o), a = 1, A = 420, c = [0, 420, 422, 444], d = 8;
            if ((100 === n || 110 === n || 122 === n || 244 === n || 44 === n || 83 === n || 86 === n || 118 === n || 128 === n || 138 === n || 144 === n) && (a = i.readUEG(), 3 === a && i.readBits(1), a <= 3 && (A = c[a]), d = i.readUEG() + 8, i.readUEG(), i.readBits(1), i.readBool())) {
                let e = 3 !== a ? 8 : 12;
                for (let t = 0; t < e; t++) i.readBool() && (t < 6 ? Me._skipScalingList(i, 16) : Me._skipScalingList(i, 64))
            }
            i.readUEG();
            let l = i.readUEG();
            if (0 === l) i.readUEG(); else if (1 === l) {
                i.readBits(1), i.readSEG(), i.readSEG();
                let e = i.readUEG();
                for (let t = 0; t < e; t++) i.readSEG()
            }
            let u = i.readUEG();
            i.readBits(1);
            let h = i.readUEG(), f = i.readUEG(), p = i.readBits(1);
            0 === p && i.readBits(1), i.readBits(1);
            let g = 0, m = 0, b = 0, y = 0;
            i.readBool() && (g = i.readUEG(), m = i.readUEG(), b = i.readUEG(), y = i.readUEG());
            let v = 1, w = 1, E = 0, S = !0, R = 0, C = 0;
            if (i.readBool()) {
                if (i.readBool()) {
                    let e = i.readByte(), t = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2],
                        n = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];
                    e > 0 && e < 16 ? (v = t[e - 1], w = n[e - 1]) : 255 === e && (v = i.readByte() << 8 | i.readByte(), w = i.readByte() << 8 | i.readByte())
                }
                if (i.readBool() && i.readBool(), i.readBool() && (i.readBits(4), i.readBool() && i.readBits(24)), i.readBool() && (i.readUEG(), i.readUEG()), i.readBool()) {
                    let e = i.readBits(32), t = i.readBits(32);
                    S = i.readBool(), R = t, C = 2 * e, E = R / C
                }
            }
            let B = 1;
            1 === v && 1 === w || (B = v / w);
            let k = 0, I = 0;
            if (0 === a) k = 1, I = 2 - p; else {
                k = 3 === a ? 1 : 2, I = (1 === a ? 2 : 1) * (2 - p)
            }
            let T = 16 * (h + 1), x = 16 * (f + 1) * (2 - p);
            T -= (g + m) * k, x -= (b + y) * I;
            let L = Math.ceil(T * B);
            return i.destroy(), i = null, {
                profile_string: r,
                level_string: s,
                bit_depth: d,
                ref_frames: u,
                chroma_format: A,
                chroma_format_string: Me.getChromaFormatString(A),
                frame_rate: {fixed: S, fps: E, fps_den: C, fps_num: R},
                sar_ratio: {width: v, height: w},
                codec_size: {width: T, height: x},
                present_size: {width: L, height: x}
            }
        }

        static _skipScalingList(e, t) {
            let i = 8, n = 8, o = 0;
            for (let r = 0; r < t; r++) 0 !== n && (o = e.readSEG(), n = (i + o + 256) % 256), i = 0 === n ? i : n
        }

        static getProfileString(e) {
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
        }

        static getLevelString(e) {
            return (e / 10).toFixed(1)
        }

        static getChromaFormatString(e) {
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
        }
    }

    class Ve extends ue {
        constructor(e) {
            super(), this.player = e, this.isAvc = !0, this.mediaSource = new window.MediaSource, this.sourceBuffer = null, this.hasInit = !1, this.isInitInfo = !1, this.cacheTrack = {}, this.timeInit = !1, this.sequenceNumber = 0, this.mediaSourceOpen = !1, this.bufferList = [], this.dropping = !1, this.player.video.$videoElement.src = window.URL.createObjectURL(this.mediaSource);
            const {debug: t, events: {proxy: i}} = e;
            i(this.mediaSource, "sourceopen", (() => {
                this.mediaSourceOpen = !0, this.player.emit(v.mseSourceOpen)
            })), i(this.mediaSource, "sourceclose", (() => {
                this.player.emit(v.mseSourceClose)
            })), e.debug.log("MediaSource", "init")
        }

        get state() {
            return this.mediaSource.readyState
        }

        get isStateOpen() {
            return this.state === z
        }

        get isStateClosed() {
            return this.state === X
        }

        get isStateEnded() {
            return this.state === q
        }

        get duration() {
            return this.mediaSource.duration
        }

        set duration(e) {
            this.mediaSource.duration = e
        }

        decodeVideo(e, t, i) {
            const n = this.player;
            if (this.hasInit) this._decodeVideo(e, t, i); else if (i && 0 === e[1]) {
                const o = 15 & e[0];
                if (n.video.updateVideoInfo({encTypeCode: o}), o === x) return void this.emit(E.mediaSourceH265NotSupport);
                this._decodeConfigurationRecord(e, t, i, o), this.hasInit = !0
            }
        }

        _doDecode() {
            const e = this.bufferList.shift();
            e && this._decodeVideo(e.payload, e.ts, e.isIframe)
        }

        _decodeConfigurationRecord(e, t, i, n) {
            let o = e.slice(5), r = {};
            n === T ? r = function (e) {
                const t = {}, i = new DataView(e.buffer);
                let n = i.getUint8(0), o = i.getUint8(1);
                if (i.getUint8(2), i.getUint8(3), 1 !== n || 0 === o) return;
                const r = 1 + (3 & i.getUint8(4));
                if (3 !== r && 4 !== r) return;
                let s = 31 & i.getUint8(5);
                if (0 === s) return;
                let a = 6;
                for (let n = 0; n < s; n++) {
                    let o = i.getUint16(a, !1);
                    if (a += 2, 0 === o) continue;
                    let r = new Uint8Array(e.buffer, a, o);
                    a += o;
                    let s = Me.parseSPS(r);
                    if (0 !== n) continue;
                    t.codecWidth = s.codec_size.width, t.codecHeight = s.codec_size.height, t.presentWidth = s.present_size.width, t.presentHeight = s.present_size.height, t.profile = s.profile_string, t.level = s.level_string, t.bitDepth = s.bit_depth, t.chromaFormat = s.chroma_format, t.sarRatio = s.sar_ratio, t.frameRate = s.frame_rate, !1 !== s.frame_rate.fixed && 0 !== s.frame_rate.fps_num && 0 !== s.frame_rate.fps_den || (t.frameRate = {});
                    let A = t.frameRate.fps_den, c = t.frameRate.fps_num;
                    t.refSampleDuration = t.timescale * (A / c);
                    let d = r.subarray(1, 4), l = "avc1.";
                    for (let e = 0; e < 3; e++) {
                        let t = d[e].toString(16);
                        t.length < 2 && (t = "0" + t), l += t
                    }
                    t.codec = l
                }
                let A = i.getUint8(a);
                if (0 !== A) {
                    a++;
                    for (let t = 0; t < A; t++) {
                        let t = i.getUint16(a, !1);
                        a += 2, 0 !== t && (new Uint8Array(e.buffer, a, t), a += t)
                    }
                    return t.videoType = "avc", t
                }
            }(o) : n === x && (r = function (e) {
                const t = {videoType: "hevc"};
                let i = 23;
                if (e[i] !== D) return t;
                i += 2, i += 1;
                const n = e[i + 1] | e[i] << 8;
                i += 2;
                const o = e.slice(i, i + n);
                if (console.log(Uint8Array.from(o)), i += n, e[i] !== O) return t;
                i += 2, i += 1;
                const r = e[i + 1] | e[i] << 8;
                i += 2;
                const s = e.slice(i, i + r);
                if (console.log(Uint8Array.from(s)), i += r, e[i] !== j) return t;
                i += 2, i += 1;
                const a = e[i + 1] | e[i] << 8;
                i += 2;
                const A = e.slice(i, i + a);
                console.log(Uint8Array.from(A));
                let c = Uint8Array.from(s), d = class {
                    static parseSPS(e) {
                    }
                }.parseSPS(c);
                return t.codecWidth = d.codec_size.width, t.codecHeight = d.codec_size.height, t.presentWidth = d.present_size.width, t.presentHeight = d.present_size.height, t.profile = d.profile_string, t.level = d.level_string, t.bitDepth = d.bit_depth, t.chromaFormat = d.chroma_format, t.sarRatio = d.sar_ratio, t
            }(o));
            const s = {
                id: 1,
                type: "video",
                timescale: 1e3,
                duration: 0,
                avcc: o,
                codecWidth: r.codecWidth,
                codecHeight: r.codecHeight,
                videoType: r.videoType
            }, a = Fe.generateInitSegment(s);
            this.isAvc = !0, this.appendBuffer(a.buffer), this.sequenceNumber = 0, this.cacheTrack = null, this.timeInit = !1
        }

        _decodeVideo(e, t, i) {
            const n = this.player;
            let o = e.slice(5), r = o.byteLength, s = t;
            const a = n.video.$videoElement;
            if (a.buffered.length > 1 && (this.removeBuffer(a.buffered.start(0), a.buffered.end(0)), this.timeInit = !1), a.drop && s - this.cacheTrack.dts > 1e3) a.drop = !1, this.cacheTrack = {}; else if (this.cacheTrack && s > this.cacheTrack.dts) {
                let e = 8 + this.cacheTrack.size, i = new Uint8Array(e);
                i[0] = e >>> 24 & 255, i[1] = e >>> 16 & 255, i[2] = e >>> 8 & 255, i[3] = 255 & e, i.set(Fe.types.mdat, 4), i.set(this.cacheTrack.data, 8), this.cacheTrack.duration = s - this.cacheTrack.dts;
                let o = Fe.moof(this.cacheTrack, this.cacheTrack.dts), r = new Uint8Array(o.byteLength + i.byteLength);
                r.set(o, 0), r.set(i, o.byteLength), this.appendBuffer(r.buffer), n.handleRender(), n.updateStats({
                    fps: !0,
                    ts: t,
                    buf: n.demux.delay
                })
            } else n.debug.log("MediaSource", "timeInit set false , cacheTrack = {}"), this.timeInit = !1, this.cacheTrack = {};
            this.cacheTrack.id = 1, this.cacheTrack.sequenceNumber = ++this.sequenceNumber, this.cacheTrack.size = r, this.cacheTrack.dts = s, this.cacheTrack.cts = 0, this.cacheTrack.isKeyframe = i, this.cacheTrack.data = o, this.cacheTrack.flags = {
                isLeading: 0,
                dependsOn: i ? 2 : 1,
                isDependedOn: i ? 1 : 0,
                hasRedundancy: 0,
                isNonSync: i ? 0 : 1
            }, this.timeInit || 1 !== a.buffered.length || (n.debug.log("MediaSource", "timeInit set true"), this.timeInit = !0, a.currentTime = a.buffered.end(0)), !this.isInitInfo && a.videoWidth > 0 && a.videoHeight > 0 && (n.debug.log("MediaSource", `updateVideoInfo: ${a.videoWidth},${a.videoHeight}`), n.video.updateVideoInfo({
                width: a.videoWidth,
                height: a.videoHeight
            }), n.video.initCanvasViewSize(), this.isInitInfo = !0)
        }

        appendBuffer(e) {
            const {debug: t, events: {proxy: i}} = this.player;
            null === this.sourceBuffer && (this.sourceBuffer = this.mediaSource.addSourceBuffer(J), i(this.sourceBuffer, "error", (e => {
                this.player.emit(v.mseSourceBufferError, e)
            }))), !1 === this.sourceBuffer.updating && this.isStateOpen ? this.sourceBuffer.appendBuffer(e) : this.isStateClosed ? this.player.emit(v.mseSourceBufferError, "mediaSource is not attached to video or mediaSource is closed") : this.isStateEnded ? this.player.emit(v.mseSourceBufferError, "mediaSource is closed") : !0 === this.sourceBuffer.updating && (this.player.emit(v.mseSourceBufferBusy), this.dropSourceBuffer(!0))
        }

        stop() {
            this.isStateOpen && this.sourceBuffer && this.sourceBuffer.abort(), this.endOfStream()
        }

        dropSourceBuffer(e) {
            const t = this.player.video.$videoElement;
            this.dropping = e, t.buffered.length > 0 && t.buffered.end(0) - t.currentTime > 1 && (t.currentTime = t.buffered.end(0))
        }

        removeBuffer(e, t) {
            if (this.isStateOpen && !1 === this.sourceBuffer.updating) try {
                this.sourceBuffer.remove(e, t)
            } catch (e) {
                console.error(e)
            }
        }

        endOfStream() {
            this.isStateOpen && this.mediaSource.endOfStream()
        }

        destroy() {
            this.stop(), this.bufferList = [], this.mediaSource = null, this.mediaSourceOpen = !1, this.sourceBuffer = null, this.hasInit = !1, this.isInitInfo = !1, this.sequenceNumber = 0, this.cacheTrack = null, this.timeInit = !1, this.off(), this.player.debug.log("MediaSource", "destroy")
        }
    }

    const Qe = () => "undefined" != typeof navigator && parseFloat(("" + (/CPU.*OS ([0-9_]{3,4})[0-9_]{0,1}|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) < 10 && !window.MSStream,
        Ne = () => "wakeLock" in navigator;

    class We {
        constructor(e) {
            if (this.player = e, this.enabled = !1, Ne()) {
                this._wakeLock = null;
                const e = () => {
                    null !== this._wakeLock && "visible" === document.visibilityState && this.enable()
                };
                document.addEventListener("visibilitychange", e), document.addEventListener("fullscreenchange", e)
            } else Qe() ? this.noSleepTimer = null : (this.noSleepVideo = document.createElement("video"), this.noSleepVideo.setAttribute("title", "No Sleep"), this.noSleepVideo.setAttribute("playsinline", ""), this._addSourceToVideo(this.noSleepVideo, "webm", "data:video/webm;base64,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"), this._addSourceToVideo(this.noSleepVideo, "mp4", "data:video/mp4;base64,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"), this.noSleepVideo.addEventListener("loadedmetadata", (() => {
                this.noSleepVideo.duration <= 1 ? this.noSleepVideo.setAttribute("loop", "") : this.noSleepVideo.addEventListener("timeupdate", (() => {
                    this.noSleepVideo.currentTime > .5 && (this.noSleepVideo.currentTime = Math.random())
                }))
            })))
        }

        _addSourceToVideo(e, t, i) {
            var n = document.createElement("source");
            n.src = i, n.type = `video/${t}`, e.appendChild(n)
        }

        get isEnabled() {
            return this.enabled
        }

        enable() {
            const e = this.player.debug;
            if (Ne()) return navigator.wakeLock.request("screen").then((t => {
                this._wakeLock = t, this.enabled = !0, e.log("wakeLock", "Wake Lock active."), this._wakeLock.addEventListener("release", (() => {
                    e.log("wakeLock", "Wake Lock released.")
                }))
            })).catch((t => {
                throw this.enabled = !1, e.error("wakeLock", `${t.name}, ${t.message}`), t
            }));
            if (Qe()) return this.disable(), this.noSleepTimer = window.setInterval((() => {
                document.hidden || (window.location.href = window.location.href.split("#")[0], window.setTimeout(window.stop, 0))
            }), 15e3), this.enabled = !0, Promise.resolve();
            return this.noSleepVideo.play().then((e => (this.enabled = !0, e))).catch((e => {
                throw this.enabled = !1, e
            }))
        }

        disable() {
            const e = this.player.debug;
            Ne() ? (this._wakeLock && this._wakeLock.release(), this._wakeLock = null) : Qe() ? this.noSleepTimer && (e.warn("wakeLock", "NoSleep now disabled for older iOS devices."), window.clearInterval(this.noSleepTimer), this.noSleepTimer = null) : this.noSleepVideo.pause(), this.enabled = !1
        }
    }

    class Ge extends ue {
        constructor(e, t) {
            var i;
            super(), this.$container = e, this._opt = Object.assign({}, o, t), this.debug = new Y(this), this._opt.useWCS && (this._opt.useWCS = "VideoEncoder" in window), this._opt.useMSE && (this._opt.useMSE = window.MediaSource && window.MediaSource.isTypeSupported(J)), this._opt.useMSE ? (this._opt.useWCS && this.debug.log("Player", "useWCS set true->false"), this._opt.forceNoOffscreen || this.debug.log("Player", "forceNoOffscreen set false->true"), this._opt.useWCS = !1, this._opt.forceNoOffscreen = !0) : this._opt.useWCS, this._opt.forceNoOffscreen || ("undefined" == typeof OffscreenCanvas ? (this._opt.forceNoOffscreen = !0, this._opt.useOffscreen = !1) : this._opt.useOffscreen = !0), this._opt.hasControl = this._hasControl(), this._loading = !1, this._playing = !1, this._hasLoaded = !1, this._checkHeartTimeout = null, this._checkLoadingTimeout = null, this._startBpsTime = null, this._isPlayingBeforePageHidden = !1, this._stats = {
                buf: 0,
                fps: 0,
                abps: 0,
                vbps: 0,
                ts: 0
            }, this._videoTimestamp = 0, this._audioTimestamp = 0, i = this, Object.defineProperty(i, "rect", {get: () => i.$container.getBoundingClientRect()}), ["bottom", "height", "left", "right", "top", "width"].forEach((e => {
                Object.defineProperty(i, e, {get: () => i.rect[e]})
            })), this.events = new Z(this), this.video = new ge(this), this.audio = new be(this), this.recorder = new Re(this), this.decoderWorker = new Ce(this), this.stream = null, this.demux = null, this._opt.useWCS && (this.webcodecsDecoder = new xe(this)), this._opt.useMSE && (this.mseDecoder = new Ve(this)), this.control = new Ue(this), this.keepScreenOn = new We(this), (e => {
                try {
                    const t = () => {
                        e.emit(w.fullscreen, e.fullscreen), e.fullscreen ? e._opt.useMSE && e.resize() : e.resize()
                    };
                    $.on("change", t), e.events.destroys.push((() => {
                        $.off("change", t)
                    }))
                } catch (e) {
                }
                if (e.on(v.decoderWorkerInit, (() => {
                    e.debug.log("player", "has loaded"), e._hasLoaded = !0
                })), e.on(v.play, (() => {
                    e.loading = !1
                })), e.on(v.fullscreen, (t => {
                    if (t) try {
                        $.request(e.$container).then((() => {
                        })).catch((t => {
                            e.webFullscreen = !0
                        }))
                    } catch (t) {
                        e.webFullscreen = !0
                    } else try {
                        $.exit().then((() => {
                        })).catch((() => {
                            e.webFullscreen = !1
                        }))
                    } catch (t) {
                        e.webFullscreen = !1
                    }
                })), e.on(v.webFullscreen, (t => {
                    if (t) {
                        e.$container.classList.add("webmediaplayer-fullscreen-web");
                        const {clientHeight: t, clientWidth: i} = document.body, {
                            clientHeight: n,
                            clientWidth: o
                        } = e.video.$videoElement;
                        if (i / t < o / n) {
                            const r = Math.min(t / o, i / n);
                            e.video.$videoElement.style.transform = `rotate(90deg) scale(${r},${r})`
                        }
                    } else e.$container.classList.remove("webmediaplayer-fullscreen-web"), e.video.$videoElement.style.transform = null
                })), e.on(v.resize, (() => {
                    e.video.resize()
                })), e._opt.debug) {
                    const t = [v.timeUpdate];
                    Object.keys(v).forEach((i => {
                        e.on(v[i], (n => {
                            t.includes(i) || e.debug.log("player events", v[i], n)
                        }))
                    })), Object.keys(E).forEach((t => {
                        e.on(E[t], (i => {
                            e.debug.log("player event error", E[t], i)
                        }))
                    }))
                }
            })(this), (e => {
                const {_opt: t, debug: i, events: {proxy: n}} = e;
                t.supportDblclickFullscreen && n(e.$container, "dblclick", (() => {
                    e.fullscreen = !e.fullscreen
                })), n(document, "visibilitychange", (() => {
                    t.hiddenAutoPause && (i.log("visibilitychange", document.visibilityState, e._isPlayingBeforePageHidden), "visible" === document.visibilityState ? e._isPlayingBeforePageHidden && e.play() : (e._isPlayingBeforePageHidden = e.playing, e.playing && e.pause()))
                })), n(window, "fullscreenchange", (() => {
                    null !== e.keepScreenOn && "visible" === document.visibilityState && e.enableWakeLock()
                }))
            })(this), this._opt.useWCS && this.debug.log("Player", "use WCS"), this._opt.useMSE && this.debug.log("Player", "use MSE"), this._opt.useOffscreen && this.debug.log("Player", "use offscreen"), this.debug.log("Player options", this._opt)
        }

        set fullscreen(e) {
            this.emit(v.fullscreen, e)
        }

        get fullscreen() {
            return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen || this.webFullscreen
        }

        set webFullscreen(e) {
            this.emit(v.webFullscreen, e)
        }

        get webFullscreen() {
            return this.$container.classList.contains("jessibuca-fullscreen-web")
        }

        get loaded() {
            return this._hasLoaded
        }

        set playing(e) {
            e && (this.loading = !1), this.playing !== e && (this._playing = e, this.emit(v.playing, e), this.emit(v.volumechange, this.volume), e ? this.emit(v.play) : this.emit(v.pause))
        }

        get playing() {
            return this._playing
        }

        get volume() {
            return this.audio.volume
        }

        set volume(e) {
            this.audio.setVolume(e)
        }

        set loading(e) {
            this.loading !== e && (this._loading = e, this.emit(v.loading, this._loading))
        }

        get loading() {
            return this._loading
        }

        set recording(e) {
            this.playing && (e ? this.recorder.startRecord() : this.recorder.stopRecordAndSave())
        }

        get recording() {
            return this.recorder.recording
        }

        set audioTimestamp(e) {
            null !== e && (this._audioTimestamp = e)
        }

        get audioTimestamp() {
            return this._audioTimestamp
        }

        set videoTimestamp(e) {
            null !== e && (this._videoTimestamp = e, this._opt.useWCS || this._opt.useMSE || this.audioTimestamp && this.videoTimestamp && this.audio.emit(v.videoSyncAudio, {
                audioTimestamp: this.audioTimestamp,
                videoTimestamp: this.videoTimestamp,
                diff: this.audioTimestamp - this.videoTimestamp
            }))
        }

        get videoTimestamp() {
            return this._videoTimestamp
        }

        updateOption(e) {
            this._opt = Object.assign({}, this._opt, e)
        }

        init() {
            return new Promise(((e, t) => {
                this.stream || (this.stream = new we(this)), this.demux || (this.demux = new Te(this)), this._opt.useWCS && (this.webcodecsDecoder || (this.webcodecsDecoder = new xe(this))), this._opt.useMSE && (this.mseDecoder || (this.mseDecoder = new Ve(this))), this.decoderWorker ? e() : (this.decoderWorker = new Ce(this), this.once(v.decoderWorkerInit, (() => {
                    e()
                })))
            }))
        }

        play(e) {
            return new Promise(((t, i) => {
                if (!e && !this._opt.url) return i();
                this.loading = !0, this.playing = !1, e || (e = this._opt.url), this._opt.url = e, this.clearCheckHeartTimeout(), this.init().then((() => {
                    this._opt.isNotMute && this.mute(!1), this.webcodecsDecoder && this.webcodecsDecoder.once(E.webcodecsH265NotSupport, (() => {
                        this.emit(E.webcodecsH265NotSupport), this.emit(v.error, E.webcodecsH265NotSupport)
                    })), this.mseDecoder && this.mseDecoder.once(E.mediaSourceH265NotSupport, (() => {
                        this.emit(E.mediaSourceH265NotSupport), this.emit(v.error, E.mediaSourceH265NotSupport)
                    })), this.enableWakeLock(), this.stream.fetchStream(e), this.checkLoadingTimeout(), this.stream.once(E.fetchError, (e => {
                        i(e)
                    })), this.stream.once(E.websocketError, (e => {
                        i(e)
                    })), this.stream.once(v.streamSuccess, (() => {
                        t(), this._opt.useMSE && this.video.play()
                    }))
                })).catch((e => {
                    i(e)
                }))
            }))
        }

        close() {
            return new Promise(((e, t) => {
                this._close().then((() => {
                    this.video.clearView(), e()
                }))
            }))
        }

        _close() {
            return new Promise(((e, t) => {
                this.stream && (this.stream.destroy(), this.stream = null), this.demux && (this.demux.destroy(), this.demux = null), this.decoderWorker && (this.decoderWorker.destroy(), this.decoderWorker = null), this.webcodecsDecoder && (this.webcodecsDecoder.destroy(), this.webcodecsDecoder = null), this.mseDecoder && (this.mseDecoder.destroy(), this.mseDecoder = null), this.clearCheckHeartTimeout(), this.clearCheckLoadingTimeout(), this.playing = !1, this.loading = !1, this.recording = !1, this.audio.pause(), this.releaseWakeLock(), this.resetStats(), this._audioTimestamp = 0, this._videoTimestamp = 0, setTimeout((() => {
                    e()
                }), 0)
            }))
        }

        pause(e) {
            return e ? this.close() : this._close()
        }

        mute(e) {
            this.audio.mute(e)
        }

        resize() {
            this.video.resize()
        }

        startRecord(e, t) {
            this.recording || (this.recorder.setFileName(e, t), this.recording = !0)
        }

        stopRecordAndSave() {
            this.recording && (this.recording = !1)
        }

        _hasControl() {
            let e = !1, t = !1;
            return Object.keys(this._opt.operateBtns).forEach((e => {
                this._opt.operateBtns[e] && (t = !0)
            })), (this._opt.showBandwidth || this._opt.text || t) && (e = !0), e
        }

        checkHeart() {
            this.clearCheckHeartTimeout(), this.checkHeartTimeout()
        }

        checkHeartTimeout() {
            this._checkHeartTimeout = setTimeout((() => {
                this.pause(!1).then((() => {
                    this.emit(v.timeout, v.delayTimeout), this.emit(v.delayTimeout)
                }))
            }), 1e3 * this._opt.heartTimeout)
        }

        clearCheckHeartTimeout() {
            this._checkHeartTimeout && (clearTimeout(this._checkHeartTimeout), this._checkHeartTimeout = null)
        }

        checkLoadingTimeout() {
            this._checkLoadingTimeout = setTimeout((() => {
                this.pause(!1).then((() => {
                    this.emit(v.timeout, v.loadingTimeout), this.emit(v.loadingTimeout)
                }))
            }), 1e3 * this._opt.loadingTimeout)
        }

        clearCheckLoadingTimeout() {
            this._checkLoadingTimeout && (clearTimeout(this._checkLoadingTimeout), this._checkLoadingTimeout = null)
        }

        handleRender() {
            this.loading && (this.emit(v.start), this.loading = !1, this.clearCheckLoadingTimeout()), this.playing || (this.playing = !0), this.checkHeart()
        }

        updateStats(e) {
            e = e || {}, this._startBpsTime || (this._startBpsTime = ne()), le(e.ts) && (this._stats.ts = e.ts), le(e.buf) && (this._stats.buf = e.buf), e.fps && (this._stats.fps += 1), e.abps && (this._stats.abps += e.abps), e.vbps && (this._stats.vbps += e.vbps);
            const t = ne();
            t - this._startBpsTime < 1e3 || (this.emit(v.stats, this._stats), this.emit(v.performance, function (e) {
                let t = 0;
                return e >= 24 ? t = 2 : e >= 15 && (t = 1), t
            }(this._stats.fps)), this._stats.fps = 0, this._stats.abps = 0, this._stats.vbps = 0, this._startBpsTime = t)
        }

        resetStats() {
            this._startBpsTime = null, this._stats = {buf: 0, fps: 0, abps: 0, vbps: 0, ts: 0}
        }

        enableWakeLock() {
            this._opt.keepScreenOn && this.keepScreenOn.enable()
        }

        releaseWakeLock() {
            this._opt.keepScreenOn && this.keepScreenOn.disable()
        }

        destroy() {
            this._loading = !1, this._playing = !1, this._hasLoaded = !1, this.decoderWorker && (this.decoderWorker.destroy(), this.decoderWorker = null), this.video && (this.video.destroy(), this.video = null), this.audio && (this.audio.destroy(), this.audio = null), this.stream && (this.stream.destroy(), this.stream = null), this.recorder && (this.recorder.destroy(), this.recorder = null), this.control && (this.control.destroy(), this.control = null), this.webcodecsDecoder && (this.webcodecsDecoder.destroy(), this.webcodecsDecoder = null), this.mseDecoder && (this.mseDecoder.destroy(), this.mseDecoder = null), this.demux && (this.demux.destroy(), this.demux = null), this.events && (this.events.destroy(), this.events = null), this.clearCheckHeartTimeout(), this.clearCheckLoadingTimeout(), this.releaseWakeLock(), this.keepScreenOn = null, this.resetStats(), this._audioTimestamp = 0, this._videoTimestamp = 0, this.emit("destroy"), this.off(), this.debug.log("play", "destroy end")
        }
    }

    var He = _((function (e, t) {
        e.exports = function () {
            var e, t;

            function i(t) {
                this.name = "__st" + (1e9 * Math.random() >>> 0) + e + "__", null == t || t.forEach(this.add, this), e += 1
            }

            Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
                configurable: !0,
                writable: !0,
                value: function (e) {
                    if (null === this) throw new TypeError('"this" is null or not defined');
                    var t = Object(this), i = t.length >>> 0;
                    if ("function" != typeof e) throw new TypeError("predicate must be a function");
                    for (var n = arguments[1], o = 0; o < i;) {
                        var r = t[o];
                        if (e.call(n, r, o, t)) return r;
                        o += 1
                    }
                }
            }), String.prototype.startsWith || Object.defineProperty(String.prototype, "startsWith", {
                value: function (e, t) {
                    return this.substring(t = !t || t < 0 ? 0 : +t, t + e.length) === e
                }
            }), window.WeakSet || (e = Date.now() % 1e9, i.prototype.add = function (e) {
                var t = this.name;
                return e[t] || Object.defineProperty(e, t, {value: !0, writable: !0}), this
            }, i.prototype.delete = function (e) {
                return !!e[this.name] && !(e[this.name] = void 0)
            }, i.prototype.has = function (e) {
                return !!e[this.name]
            }, t = i, Object.defineProperty(window, "WeakSet", {
                value: function (e) {
                    return new t(e)
                }
            })), Object.assign || Object.defineProperty(Object, "assign", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function (e) {
                    if (null == e) throw new TypeError("Cannot convert first argument to object");
                    for (var t = Object(e), i = 1; i < arguments.length; i++) if (null != (n = arguments[i])) for (var n = Object(n), o = Object.keys(Object(n)), r = 0, s = o.length; r < s; r++) {
                        var a = o[r], A = Object.getOwnPropertyDescriptor(n, a);
                        null != A && A.enumerable && (t[a] = n[a])
                    }
                    return t
                }
            });
            var n = function (e, t) {
                return (n = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
                })(e, t)
            }, o = function () {
                return (o = Object.assign || function (e) {
                    for (var t, i = 1, n = arguments.length; i < n; i++) for (var o in t = arguments[i]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e
                }).apply(this, arguments)
            };

            function r() {
                for (var e = 0, t = 0, i = arguments.length; t < i; t++) e += arguments[t].length;
                var n = Array(e), o = 0;
                for (t = 0; t < i; t++) for (var r = arguments[t], s = 0, a = r.length; s < a; s++, o++) n[o] = r[s];
                return n
            }

            function s(e) {
                return (e = Array.isArray(e) ? e : [e]).map((function (e, t) {
                    return Object.getOwnPropertyNames(e).map((function (i) {
                        return c(i) + "[" + t + "]=" + (void 0 === e[i] ? "" : c(e[i]))
                    })).join("&")
                })).join("&") + (e.length ? "&count=" + e.length : "")
            }

            var a, A = (d.prototype.indexOf = function (e, t) {
                for (var i = 0; i < e.length; i++) if (e[i].callback === t) return i;
                return -1
            }, d.prototype.on = function (e, t, i) {
                if (void 0 === i && (i = 0), this) {
                    var n = this.eventsList[e];
                    return n || (this.eventsList[e] = [], n = this.eventsList[e]), -1 !== this.indexOf(n, t) || n.push({
                        name: e,
                        type: i || 0,
                        callback: t
                    }), this
                }
            }, d.prototype.one = function (e, t) {
                this.on(e, t, 1)
            }, d.prototype.remove = function (e, t) {
                if (this) {
                    var i = this.eventsList[e];
                    if (!i) return null;
                    if (t) return i.length && (t = this.indexOf(i, t), i.splice(t, 1)), this;
                    try {
                        delete this.eventsList[e]
                    } catch (e) {
                    }
                    return null
                }
            }, d.prototype.clear = function () {
                this.eventsList = {}
            }, d), c = function (e) {
                try {
                    return encodeURIComponent(decodeURIComponent(e))
                } catch (t) {
                    return e
                }
            };

            function d() {
                var e = this;
                this.emit = function (t, i) {
                    if (e) {
                        var n;
                        if (null != (o = e.eventsList[t]) && o.length) for (var o = o.slice(), r = 0; r < o.length; r++) {
                            n = o[r];
                            try {
                                var s = n.callback.apply(e, [i]);
                                if (1 === n.type && e.remove(t, n.callback), !1 === s) break
                            } catch (t) {
                                throw t
                            }
                        }
                        return e
                    }
                }, this.eventsList = {}
            }

            function l(e, t) {
                return "number" == typeof e || "string" == typeof e ? e : t ? a.string : a.number
            }

            function u(e, t) {
                return "string" == typeof e ? e.split("?")[t ? 1 : 0] || "" : e
            }

            function h(e) {
                return "string" == typeof e && e.startsWith("//") ? "undefined" != typeof location && "https:" === location.protocol : /^https/.test(e)
            }

            function f(e) {
                return b.some((function (t) {
                    return -1 !== e.indexOf(t)
                }))
            }

            (se = a = a || {})[se.number = -1] = "number", se.string = "";
            var p, g, m,
                b = ["application/octet-stream", "application/xhtml+xml", "application/xml", "application/pdf", "application/pkcs12", "application/javascript", "application/ecmascript", "application/vnd.mspowerpoint", "application/ogg", "text/html", "text/css", "text/javascript", "image", "audio", "video"],
                y = ["ret", "retcode", "code", "errcode"], v = function (e, t, i) {
                    var n;
                    try {
                        if ("function" == typeof (null == t ? void 0 : t.retCodeHandler)) {
                            var o = t.retCodeHandler(e, null == i ? void 0 : i.url, null == i ? void 0 : i.ctx) || {};
                            return {code: void 0 === (r = o.code) ? "unknown" : r, isErr: o.isErr}
                        }
                        "string" == typeof e && (e = JSON.parse(e)), "function" == typeof (null === (n = null == t ? void 0 : t.ret) || void 0 === n ? void 0 : n.join) && (y = [].concat(t.ret.map((function (e) {
                            return e.toLowerCase()
                        }))));
                        var r, s = Object.getOwnPropertyNames(e).filter((function (e) {
                            return -1 !== y.indexOf(e.toLowerCase())
                        }));
                        return s.length ? {code: "" + (r = Number(e[s[0]])), isErr: 0 !== r} : {code: "unknown", isErr: !1}
                    } catch (e) {
                        return {code: "unknown", isErr: !1}
                    }
                }, w = function (e) {
                    if ("string" == typeof e) return e;
                    try {
                        return (JSON.stringify(e, (t = [], i = [], function (e, n) {
                            if (n instanceof Error) return "Error.message: " + n.message + " \n  Error.stack: " + n.stack;
                            if ("object" == typeof n && null !== n) {
                                var o = t.indexOf(n);
                                if (-1 !== o) return "[Circular " + i[o] + "]";
                                t.push(n), i.push(e || "root")
                            }
                            return n
                        }), 4) || "undefined").replace(/"/gim, "")
                    } catch (e) {
                        return "error happen when aegis stringify: \n " + e.message + " \n " + e.stack
                    }
                    var t, i
                }, E = function (e, t) {
                    void 0 === t && (t = 3);
                    var i, n, o, r = "";
                    return Array.isArray(e) ? (r += "[", i = e.length, e.forEach((function (e, n) {
                        r += "object" == typeof e && 1 < t ? E(e, t - 1) : R(e), r += n === i - 1 ? "" : ","
                    })), r += "]") : e instanceof Object ? (r = "{", n = Object.keys(e), o = n.length, n.forEach((function (i, s) {
                        "object" == typeof e[i] && 1 < t ? r += '"' + i + '":' + E(e[i], t - 1) : r += S(i, e[i]), r += s === o - 1 || s < o - 1 && void 0 === e[n[s + 1]] ? "" : ","
                    })), r += "}") : r += e, r
                }, S = function (e, t) {
                    var i = typeof t, n = "";
                    return "string" == i || "object" == i ? n += '"' + e + '":"' + t + '"' : "function" == typeof t ? n += '"' + e + '":"function ' + t.name + '"' : "symbol" == typeof t ? n += '"' + e + '":"symbol"' : "number" != typeof t && "boolean" != i || (n += '"' + e + '": ' + t), n
                }, R = function (e) {
                    var t = typeof e;
                    return "" + ("undefined" == t || "symbol" == t || "function" == t ? "null" : "string" == t || "object" == t ? '"' + e + '"' : e)
                }, C = (I.prototype.sourceURL = function () {
                    return this.data.responseURL
                }, I.prototype.status = function () {
                    return Number(this.data.status)
                }, I.prototype.headers = function () {
                    var e = this.data.getAllResponseHeaders().split("\n"), t = {};
                    return e.forEach((function (e) {
                        var i;
                        e && (e = (i = e.split(": "))[0], i = i[1].trim(), t[e] = i)
                    })), t
                }, I), B = (k.prototype.sourceURL = function () {
                    return this.data.url
                }, k.prototype.status = function () {
                    return Number(this.data.status)
                }, k.prototype.headers = function () {
                    var e = {};
                    return this.data.headers.forEach((function (t, i) {
                        e[i] = t
                    })), e
                }, k);

            function k(e, t) {
                this.type = "fetch", this.data = e || {}, this.data.response = t
            }

            function I(e) {
                this.type = "xhr", this.data = e
            }

            function T(e) {
                return e.filter((function (t, i) {
                    return "static" !== t.type || !e.find((function (e, n) {
                        return i !== n && t.url === e.url && 200 === t.status
                    }))
                }))
            }

            function x(e) {
                e.level === p.INFO_ALL && (e.level = p.INFO)
            }

            function L(e) {
                return function (t, i) {
                    e.lifeCycle.emit("modifyRequest", t);
                    var n = e.config.modifyRequest;
                    if ("function" == typeof n) try {
                        var o = n(t);
                        "object" == typeof o && "url" in o && (t = o)
                    } catch (t) {
                        console.error(t)
                    }
                    i(t)
                }
            }

            function D(e) {
                return function (t, i) {
                    e.lifeCycle.emit("afterRequest", t);
                    var n = e.config.afterRequest;
                    "function" == typeof n && !1 === n(t) || i(t)
                }
            }

            function O() {
            }

            function j(e, t) {
                Object.getOwnPropertyNames(e).forEach((function (i) {
                    "function" == typeof e[i] && "constructor" !== i && (t ? t[i] = "sendPipeline" === i ? function () {
                        return function () {
                        }
                    } : function () {
                    } : e[i] = function () {
                    })
                }))
            }

            function U(e) {
                if (e.payload) {
                    var t = {};
                    return Object.keys(e).forEach((function (i) {
                        "payload" !== i && (t[i] = e[i])
                    })), t
                }
                return e
            }

            function F() {
                return void 0 !== window.performance && "function" == typeof performance.clearResourceTimings && "function" == typeof performance.getEntriesByType && "function" == typeof performance.now
            }

            function P(e) {
                if (ne.find((function (t) {
                    return t.name === e.name
                }))) throw new Error("name '" + e.name + "' is already in hackXHR option list");
                var t, i;
                ne.push(e), !ie && window.XMLHttpRequest && (ie = !0, t = window.XMLHttpRequest.prototype.send, i = window.XMLHttpRequest.prototype.open, window.XMLHttpRequest.prototype.open = function () {
                    if (this.aegisMethod = arguments[0], this.aegisUrl = arguments[1], this.aegisXhrStartTime = Date.now(), !this.sendByAegis) for (var e = 0; e < ne.length; e++) {
                        var t = ne[e];
                        try {
                            "function" == typeof t.open && t.open(this)
                        } catch (e) {
                        }
                    }
                    return i.apply(this, arguments)
                }, window.XMLHttpRequest.prototype.send = function () {
                    if (!this.sendByAegis) for (var e = 0; e < ne.length; e++) {
                        var i = ne[e];
                        try {
                            "function" == typeof i.send && i.send(this, arguments[0])
                        } catch (e) {
                        }
                    }
                    return t.apply(this, arguments)
                })
            }

            function M(e) {
                var t = ne.findIndex((function (t) {
                    return t.name === e.name
                }));
                -1 !== t && ne.splice(t, 1)
            }

            (Ne = p = p || {}).INFO_ALL = "-1", Ne.API_RESPONSE = "1", Ne.INFO = "2", Ne.ERROR = "4", Ne.PROMISE_ERROR = "8", Ne.AJAX_ERROR = "16", Ne.SCRIPT_ERROR = "32", Ne.IMAGE_ERROR = "64", Ne.CSS_ERROR = "128", Ne.CONSOLE_ERROR = "256", Ne.MEDIA_ERROR = "512", Ne.RET_ERROR = "1024", Ne.REPORT = "2048", Ne.PV = "4096", Ne.EVENT = "8192", Ne.PAGE_NOT_FOUND_ERROR = "16384", (Je = {})[Je.android = 1] = "android", Je[Je.ios = 2] = "ios", Je[Je.windows = 3] = "windows", Je[Je.macos = 4] = "macos", Je[Je.linux = 5] = "linux", Je[Je.devtools = 6] = "devtools", Je[Je.other = 100] = "other", (ye = {})[ye.unknown = 100] = "unknown", ye[ye.wifi = 1] = "wifi", ye[ye.net2g = 2] = "net2g", ye[ye.net3g = 3] = "net3g", ye[ye.net4g = 4] = "net4g", ye[ye.net5g = 5] = "net5g", ye[ye.net6g = 6] = "net6g", (Ee = g = g || {}).LOG = "log", Ee.SPEED = "speed", Ee.PERFORMANCE = "performance", Ee.OFFLINE = "offline", Ee.WHITE_LIST = "whiteList", Ee.VITALS = "vitals", Ee.PV = "pv", Ee.CUSTOM_PV = "customPV", Ee.EVENT = "event", Ee.CUSTOM = "custom", Ee.SDK_ERROR = "sdkError", Ee.SET_DATA = "setData", (Re = m = m || {}).production = "production", Re.gray = "gray", Re.pre = "pre", Re.daily = "daily", Re.local = "local", Re.test = "test", Re.others = "others";
            var V, Q, N = function (e, t) {
                    return function (i, n) {
                        var o = t.logCreated;
                        return "function" != typeof o ? (e("beforeWrite", i), n(i)) : (i = i.filter((function (e) {
                            return !1 !== o(e)
                        })), e("beforeWrite", i), n(i))
                    }
                }, W = function (e, t) {
                    var i, n = [], o = e.config;
                    return e.lifeCycle.on("destroy", (function () {
                        n.length = 0
                    })), function (e, r) {
                        if (n.push(e), t && n.length >= t) return n = T(n), r(n.splice(0, n.length)), void (i && clearTimeout(i));
                        i && clearTimeout(i), i = setTimeout((function () {
                            i = null, 0 < (n = T(n)).length && r(n.splice(0, n.length))
                        }), o.delay)
                    }
                }, G = function (e, t) {
                    return Array.isArray(e) ? t(e.map((function (e) {
                        return o(o({}, e), {msg: "string" == typeof e.msg ? e.msg : [].concat(e.msg).map(w).join(" ")})
                    }))) : t(o(o({}, e), {msg: "string" == typeof e.msg ? e.msg : w(e.msg)}))
                }, H = function (e) {
                    var t, i = !1, n = !1, o = !1, r = [];
                    return e.lifeCycle.on("onConfigChange", (function () {
                        t && clearTimeout(t), t = setTimeout((function () {
                            var t, s;
                            !o && e.config && (o = !0, t = e.config.whiteListUrl, (s = void 0 === t ? "" : t) && e.sendPipeline([function (t, o) {
                                o({
                                    url: s, type: g.WHITE_LIST, success: function (t) {
                                        n = !0;
                                        try {
                                            var o = t.data || JSON.parse(t), s = o.retcode, a = o.result,
                                                A = void 0 === a ? {} : a;
                                            if (0 === s) {
                                                if (i = A.is_in_white_list, e.isWhiteList = i, A.shutdown) return void e.destroy();
                                                0 <= A.rate && A.rate <= 1 && (e.config.random = A.rate, e.isGetSample = !1)
                                            }
                                            e.isWhiteList && r.length ? X(e)(r.splice(0), (function () {
                                            })) : !e.isWhiteList && r.length && (r.length = 0);
                                            var c = e.config.onWhitelist;
                                            "function" == typeof c && c(i)
                                        } catch (t) {
                                        }
                                    }, fail: function (t) {
                                        "403 forbidden" === t && e.destroy(), n = !0
                                    }
                                })
                            }], g.WHITE_LIST)(null), o = !1)
                        }), e.config.uin ? 50 : 500)
                    })), e.lifeCycle.on("destroy", (function () {
                        r.length = 0
                    })), function (t, o) {
                        var s;
                        i || null !== (s = null === (s = e.config) || void 0 === s ? void 0 : s.api) && void 0 !== s && s.reportRequest ? o(t.concat(r.splice(0)).map((function (e) {
                            return x(e), e
                        }))) : (t = t.filter((function (e) {
                            return e.level !== p.INFO && e.level !== p.API_RESPONSE ? (x(e), !0) : (n || (r.push(e), 200 <= r.length && (r.length = 200)), !1)
                        }))).length && o(t)
                    }
                }, J = function (e) {
                    return setTimeout((function () {
                        var t = e.config.pvUrl, i = void 0 === t ? "" : t;
                        i && e.sendPipeline([function (t, n) {
                            n({
                                url: i, type: g.PV, fail: function (t) {
                                    "403 forbidden" === t && e.destroy()
                                }
                            })
                        }], g.PV)(null)
                    }), 100), function (e, t) {
                        t(e)
                    }
                }, q = function (e) {
                    var t = {};
                    return function (i, n) {
                        var o, r;
                        e.speedSample ? (r = "object" == typeof e.repeat ? e.repeat : {repeat: e.repeat}, o = +r.speed || +r.repeat || 5, Array.isArray(i) ? (r = i.filter((function (e) {
                            var i = !t[e.url] || t[e.url] < o;
                            return t[e.url] = 1 + ~~t[e.url], i
                        }))).length && n(r) : (!t[i.url] || t[i.url] < o) && (t[i.url] = 1 + ~~t[i.url], n(i))) : n(i)
                    }
                }, z = function (e) {
                    var t = {};
                    return function (i, n) {
                        var o = "number" == typeof e.repeat ? e.repeat : 5;
                        if (0 === o) return n(i);
                        n(i.filter((function (e) {
                            return e.level !== p.ERROR && e.level !== p.PROMISE_ERROR && e.level !== p.AJAX_ERROR && e.level !== p.SCRIPT_ERROR && e.level !== p.IMAGE_ERROR && e.level !== p.CSS_ERROR && e.level !== p.MEDIA_ERROR || (t[e.msg] = t[e.msg] || 0, t[e.msg] += 1, !(t[e.msg] > o))
                        })))
                    }
                }, X = function (e) {
                    return function (t) {
                        return e.sendPipeline([function (t, i) {
                            return i({
                                url: e.config.url || "",
                                data: s(t),
                                method: "post",
                                contentType: "application/x-www-form-urlencoded",
                                type: g.LOG,
                                log: t,
                                requestConfig: {timeout: 5e3},
                                success: function () {
                                    var n = e.config.onReport;
                                    "function" == typeof n && t.forEach((function (e) {
                                        n(e)
                                    })), "function" == typeof i && i([])
                                },
                                fail: function (t) {
                                    "403 forbidden" === t && e.destroy()
                                }
                            })
                        }], g.LOG)(t)
                    }
                }, Y = function (e) {
                    if (!e || !e.reduce || !e.length) throw new TypeError("createPipeline need at least one function param");
                    return 1 === e.length ? function (t, i) {
                        e[0](t, i || O)
                    } : e.reduce((function (e, t) {
                        return function (i, n) {
                            return void 0 === n && (n = O), e(i, (function (e) {
                                return null == t ? void 0 : t(e, n)
                            }))
                        }
                    }))
                }, Z = (Object.defineProperty(Ae.prototype, "__version__", {
                    get: function () {
                        return console.warn("__version__ has discard, please use version"), "1.24.48"
                    }, enumerable: !1, configurable: !0
                }), Object.defineProperty(Ae.prototype, "LogType", {
                    get: function () {
                        return console.warn("LogType has discard, please use logType"), p
                    }, enumerable: !1, configurable: !0
                }), Ae.prototype.init = function (e) {
                    this.setConfig(e);
                    for (var t = 0; t < Ae.installedPlugins.length; t++) try {
                        Ae.installedPlugins[t].patch(this)
                    } catch (e) {
                        this.sendSDKError(e)
                    }
                    this.lifeCycle.emit("onInited")
                }, Ae.prototype.setConfig = function (e) {
                    Object.assign(this.config, e);
                    var t = (A = this.config).id, i = A.uin, n = A.version, o = A.ext1, r = A.ext2, s = A.ext3,
                        a = (e = A.aid, void 0 === (A = A.env) ? "production" : A),
                        A = this.bean.id !== t || this.bean.uin !== i || this.bean.aid !== e;
                    return this.bean.id = t || "", this.bean.uin = i || "", this.bean.version = n || "1.24.48", this.bean.aid = e || "", this.bean.env = function () {
                        switch (a) {
                            case m.production:
                            case m.gray:
                            case m.pre:
                            case m.daily:
                            case m.local:
                            case m.others:
                                return 1;
                            default:
                                return
                        }
                    }() ? a : m.others, o && (this.bean.ext1 = encodeURIComponent(o)), r && (this.bean.ext2 = encodeURIComponent(r)), s && (this.bean.ext3 = encodeURIComponent(s)), A && this.lifeCycle.emit("onConfigChange", this.config), this.config
                }, Ae.use = function (e) {
                    -1 === Ae.installedPlugins.indexOf(e) && e.aegisPlugin && Ae.installedPlugins.push(e)
                }, Ae.unuse = function (e) {
                    -1 !== (e = Ae.installedPlugins.indexOf(e)) && Ae.installedPlugins.splice(e, 1)
                }, Ae.prototype.info = function () {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    var i = {level: p.INFO, msg: e};
                    1 === e.length && e[0].msg && Object.assign(i, o({}, e[0]), {level: p.INFO}), this.normalLogPipeline(i)
                }, Ae.prototype.infoAll = function () {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    var i = {level: p.INFO_ALL, msg: e};
                    1 === e.length && e[0].msg && Object.assign(i, o({}, e[0]), {level: p.INFO_ALL}), this.normalLogPipeline(i)
                }, Ae.prototype.report = function () {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    var i = {level: p.REPORT, msg: e};
                    1 === e.length && e[0].msg && Object.assign(i, o({}, e[0])), this.normalLogPipeline(i)
                }, Ae.prototype.error = function () {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    var i = {level: p.ERROR, msg: e};
                    1 === e.length && e[0].msg && Object.assign(i, o({}, e[0]), {level: p.ERROR}), this.normalLogPipeline(i)
                }, Ae.prototype.speedLogPipeline = function (e) {
                    throw new Error('You need to override "speedLogPipeline" method')
                }, Ae.prototype.reportPv = function (e) {
                    var t, i = this;
                    e && (console.warn("reportPv is deprecated, please use reportEvent"), t = "" + Object.getOwnPropertyNames(this.bean).filter((function (e) {
                        return "id" !== e
                    })).map((function (e) {
                        return e + "=" + i.bean[e]
                    })).join("&"), this.sendPipeline([function (n, o) {
                        o({
                            url: i.config.url + "/" + e + "?" + t, addBean: !1, type: g.CUSTOM_PV, fail: function (e) {
                                "403 forbidden" === e && i.destroy()
                            }
                        })
                    }], g.CUSTOM_PV)(null))
                }, Ae.prototype.reportEvent = function (e) {
                    e && ((e = "string" == typeof e ? {
                        name: e,
                        ext1: this.config.ext1 || "",
                        ext2: this.config.ext2 || "",
                        ext3: this.config.ext3 || ""
                    } : e).name ? this.eventPipeline(e) : console.warn("reportEvent params error"))
                }, Ae.prototype.reportTime = function (e, t) {
                    if ("object" == typeof e) return this.reportT(e);
                    "string" == typeof e ? "number" == typeof t ? t < 0 || 6e4 < t ? console.warn("reportTime: duration must between 0 and 60000") : this.submitCustomTime(e, t) : console.warn("reportTime: second param must be number") : console.warn("reportTime: first param must be a string")
                }, Ae.prototype.reportT = function (e) {
                    var t = e.name, i = e.duration, n = void 0 === (o = e.ext1) ? "" : o,
                        o = void 0 === (r = e.ext2) ? "" : r, r = void 0 === (r = e.ext3) ? "" : r;
                    if (e = e.from, "string" == typeof t && "number" == typeof i && "string" == typeof n && "string" == typeof o && "string" == typeof r) {
                        if (!(i < 0 || 6e4 < i)) return this.submitCustomTime(t, i, n, o, r, void 0 === e ? "" : e);
                        console.warn("reportTime: duration must between 0 and 60000")
                    } else console.warn("reportTime: params error")
                }, Ae.prototype.time = function (e) {
                    "string" == typeof e ? this.timeMap[e] ? console.warn("Timer " + e + " already exists") : this.timeMap[e] = Date.now() : console.warn("time: first param must be a string")
                }, Ae.prototype.timeEnd = function (e) {
                    "string" == typeof e ? this.timeMap[e] ? (this.submitCustomTime(e, Date.now() - this.timeMap[e]), delete this.timeMap[e]) : console.warn("Timer " + e + " does not exist") : console.warn("timeEnd: first param must be a string")
                }, Ae.prototype.submitCustomTime = function (e, t, i, n, o, r) {
                    this.customTimePipeline({
                        name: e,
                        duration: t,
                        ext1: i || this.config.ext1,
                        ext2: n || this.config.ext2,
                        ext3: o || this.config.ext3,
                        from: r || void 0
                    })
                }, Ae.prototype.extendBean = function (e, t) {
                    this.bean[e] = t
                }, Ae.prototype.sendPipeline = function (e, t) {
                    var i, n, s, a = this;
                    return Y(r([function (e, t) {
                        if ("number" != typeof i.config.random && (console.warn("random must in [0, 1], default is 1."), i.config.random = 1), !i.isHidden || !i.isGetSample) if (i.isGetSample) i.isHidden || t(e); else {
                            if (i.isGetSample = !0, Math.random() < i.config.random) return i.isHidden = !1, t(e);
                            i.isHidden = !0
                        }
                    }, (s = t, function (e, t) {
                        var i = Array.isArray(e), r = i ? e : [e];
                        n.lifeCycle.emit("beforeRequest", e);
                        var a = n.config.beforeRequest;
                        (r = "function" == typeof a ? r.map((function (e) {
                            try {
                                var t = a({logs: e, logType: s});
                                return (null == t ? void 0 : t.logType) === s && null != t && t.logs ? t.logs : !1 !== t && e
                            } catch (t) {
                                return e
                            }
                        })).filter((function (e) {
                            return !1 !== e
                        })) : r).length && (r = function (e, t) {
                            if (!Array.isArray(e) || e.length <= 1) return e;
                            var i = [], n = [];
                            return !(n = "string" == typeof t ? [t] : t) || n.length <= 0 || (n.forEach((function (t) {
                                e.forEach((function (e) {
                                    null != e && e[t] && i.push(t)
                                }))
                            })), 0 < i.length && (e = e.map((function (e) {
                                var t = {};
                                return i.forEach((function (e) {
                                    t[e] = ""
                                })), o(o({}, t), e)
                            })))), e
                        }(r, ["ext1", "ext2", "ext3"]), t(i ? r : r[0]))
                    })], e, [L(n = i = this), function (e, t) {
                        a.request(e, (function () {
                            for (var i, n = [], o = 0; o < arguments.length; o++) n[o] = arguments[o];
                            t({
                                isErr: !1,
                                result: n,
                                logType: null == e ? void 0 : e.type,
                                logs: null == e ? void 0 : e.log
                            }), null === (i = null == e ? void 0 : e.success) || void 0 === i || i.call.apply(i, r([e], n))
                        }), (function () {
                            for (var i, n = [], o = 0; o < arguments.length; o++) n[o] = arguments[o];
                            t({
                                isErr: !0,
                                result: n,
                                logType: null == e ? void 0 : e.type,
                                logs: null == e ? void 0 : e.log
                            }), null === (i = null == e ? void 0 : e.fail) || void 0 === i || i.call.apply(i, r([e], n))
                        }))
                    }, D(this)]))
                }, Ae.prototype.send = function (e, t, i) {
                    var n = this;
                    return Y([L(this), function (e, o) {
                        n.request(e, (function () {
                            for (var i = [], n = 0; n < arguments.length; n++) i[n] = arguments[n];
                            o({isErr: !1, result: i, logType: e.type, logs: e.log}), null == t || t.apply(void 0, i)
                        }), (function () {
                            for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                            o({isErr: !0, result: t, logType: e.type, logs: e.log}), null == i || i.apply(void 0, t)
                        }))
                    }, D(this)])(e)
                }, Ae.prototype.request = function (e, t, i) {
                    throw new Error('You need to override "request" method')
                }, Ae.prototype.sendSDKError = function (e) {
                    var t = this;
                    this.sendPipeline([function (e, i) {
                        i({
                            url: t.config.url + "?id=1085&msg[0]=" + encodeURIComponent(w(e)) + "&level[0]=2&from=" + t.config.id + "&count=1&version=" + t.config.id + "(1.24.48)",
                            addBean: !1,
                            method: "get",
                            type: g.SDK_ERROR,
                            log: e
                        })
                    }], g.SDK_ERROR)(e)
                }, Ae.prototype.destroy = function (e) {
                    void 0 === e && (e = !1);
                    var t, i, n = Ae.instances.indexOf(this);
                    -1 !== n && Ae.instances.splice(n, 1);
                    for (var o = Ae.installedPlugins.length - 1; 0 <= o; o--) try {
                        Ae.installedPlugins[o].unpatch(this)
                    } catch (e) {
                        this.sendSDKError(e)
                    }
                    if (this.lifeCycle.emit("destroy"), this.lifeCycle.clear(), e) t = this, i = Object.getOwnPropertyDescriptors(t), Object.keys(i).forEach((function (e) {
                        i[e].writable && (t[e] = null)
                    })), Object.setPrototypeOf(this, null); else {
                        for (var r = this; r.constructor !== Object && j(r, this), r = Object.getPrototypeOf(r);) ;
                        0 === Ae.instances.length && (j(e = Object.getPrototypeOf(this).constructor), j(Ae))
                    }
                }, Ae.version = "1.24.48", Ae.instances = [], Ae.logType = p, Ae.environment = m, Ae.installedPlugins = [], Ae),
                K = (ae.prototype.patch = function (e) {
                    this.canUse(e) && this.exist(e) && (this.instances.push(e), this.triggerInit(e), this.triggerOnNewAegis(e))
                }, ae.prototype.unpatch = function (e) {
                    -1 !== (e = this.instances.indexOf(e)) && this.instances.splice(e, 1)
                }, ae.prototype.countInstance = function () {
                    return this.instances.length
                }, ae.prototype.uninstall = function () {
                    var e;
                    null === (e = null === (e = this.option) || void 0 === e ? void 0 : e.destroy) || void 0 === e || e.apply(this)
                }, ae.prototype.walk = function (e) {
                    var t = this;
                    this.instances.forEach((function (i) {
                        var n = t.canUse(i);
                        n && e(i, n)
                    }))
                }, ae.prototype.canUse = function (e) {
                    return !(!(e = this.getConfig(e)) || "object" != typeof e) || !!e
                }, ae.prototype.getConfig = function (e) {
                    return null === (e = e.config) || void 0 === e ? void 0 : e[this.name]
                }, ae.prototype.exist = function (e) {
                    return -1 === this.instances.indexOf(e)
                }, ae.prototype.triggerInit = function (e) {
                    var t;
                    this.inited || (this.inited = !0, null === (t = null === (t = this.option) || void 0 === t ? void 0 : t.init) || void 0 === t || t.call(this.option, this.getConfig(e)))
                }, ae.prototype.triggerOnNewAegis = function (e) {
                    var t;
                    null === (t = null === (t = this.option) || void 0 === t ? void 0 : t.onNewAegis) || void 0 === t || t.call(this.option, e, this.getConfig(e))
                }, ae), _ = new K({
                    name: "aid", aid: "", init: function (e) {
                        try {
                            var t = !0 !== e && e || window.localStorage.getItem("AEGIS_ID");
                            t || (t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function (e) {
                                var t = 16 * Math.random() | 0;
                                return ("x" === e ? t : 3 & t | 8).toString(16)
                            })), window.localStorage.setItem("AEGIS_ID", t)), this.aid = t
                        } catch (e) {
                        }
                    }, onNewAegis: function (e) {
                        e.bean.aid = this.aid, e.config.aid = this.aid
                    }
                }), $ = function (e, t) {
                    var i, n = {fetch: [], static: []}, r = new FormData;
                    return Array.isArray(e) ? e.forEach((function (e) {
                        var t = U(e);
                        n[e.type].push(t)
                    })) : (i = U(e), n[e.type].push(i)), r.append("payload", JSON.stringify(o({duration: n}, t))), r
                }, ee = new K({name: "reportAssetSpeed"}), te = ee = new K({
                    name: "reportAssetSpeed",
                    collectCur: 0,
                    ASSETS_INITIATOR_TYPE: ["img", "css", "script", "link", "audio", "video"],
                    onNewAegis: function (e) {
                        var t = this;
                        F() && (this.collectSuccessLog(e), this.collectFailLog(e), performance.onresourcetimingbufferfull = function () {
                            t.collectCur = 0, performance.clearResourceTimings()
                        })
                    },
                    publish: function (e) {
                        this.$walk((function (t) {
                            t.speedLogPipeline(e)
                        }))
                    },
                    collectSuccessLog: function (e) {
                        function t(e) {
                            for (var t = 0, i = e.length; t < i; t++) {
                                var n = e[t];
                                -1 !== o.ASSETS_INITIATOR_TYPE.indexOf(n.initiatorType) && -1 === n.name.indexOf("cdn-go.cn/aegis/aegis-sdk") && o.publish(o.generateLog(n, r))
                            }
                        }

                        var i, n, o = this, r = e.config;
                        "function" == typeof window.PerformanceObserver ? (t(performance.getEntriesByType("resource")), (i = new window.PerformanceObserver((function (e) {
                            t(e.getEntries())
                        }))).observe({entryTypes: ["resource"]}), e.lifeCycle.on("destroy", (function () {
                            0 === ee.countInstance() && i.disconnect()
                        }))) : (n = setInterval((function () {
                            var e = performance.getEntriesByType("resource"), i = e.slice(o.collectCur);
                            o.collectCur = e.length, t(i)
                        }), 3e3), e.lifeCycle.on("destroy", (function () {
                            0 === ee.countInstance() && clearInterval(n)
                        })))
                    },
                    collectFailLog: function (e) {
                        function t(e) {
                            var t, o;
                            e && (e = e.target || e.srcElement, t = (null == e ? void 0 : e.src) || (null == e ? void 0 : e.href), e = null == e ? void 0 : e.tagName, t && "string" == typeof t && ("IMG" === e && -1 < window.location.href.indexOf(t) || (e = "function" == typeof (null === (e = n.api) || void 0 === e ? void 0 : e.resourceTypeHandler) ? null === (o = n.api) || void 0 === o ? void 0 : o.resourceTypeHandler(t) : "", o = performance.getEntriesByType("resource").find((function (e) {
                                return e.name === t
                            })), e = {
                                url: u(t),
                                status: 400,
                                duration: Number(((null == o ? void 0 : o.duration) || 0).toFixed(2)),
                                method: "get",
                                type: e || "static",
                                isHttps: h(t),
                                urlQuery: u(t, !0),
                                domainLookup: 0,
                                connectTime: 0
                            }, i.publish(e))))
                        }

                        var i = this, n = e.config;
                        window.document.addEventListener("error", t, !0), e.lifeCycle.on("destroy", (function () {
                            0 === ee.countInstance() && window.document.removeEventListener("error", t, !0)
                        }))
                    },
                    generateLog: function (e, t) {
                        var i,
                            n = "function" == typeof (null === (i = t.api) || void 0 === i ? void 0 : i.resourceTypeHandler) ? null === (n = t.api) || void 0 === n ? void 0 : n.resourceTypeHandler(e.name) : "";
                        return {
                            url: u(e.name),
                            method: "get",
                            duration: Number(e.duration.toFixed(2)),
                            status: 200,
                            type: n || "static",
                            isHttps: h(e.name),
                            urlQuery: u(e.name, !0),
                            domainLookup: l(e.domainLookupEnd - e.domainLookupStart),
                            connectTime: l(e.connectEnd - e.connectStart)
                        }
                    },
                    destroy: function () {
                        this.option.publish = function () {
                        }
                    }
                }), ie = !1, ne = [], oe = !1, re = [], se = (new K({name: "reportApiSpeed"}), new K({
                    name: "reportApiSpeed", override: !1, onNewAegis: function (e) {
                        this.override || (this.override = !0, this.overrideFetch(e.config), this.overrideXhr(e.config))
                    }, overrideFetch: function (e) {
                        var t = this, i = {
                            name: this.name, then: function (i, n, o, r) {
                                var s, A, c, d;
                                e.hostUrl && -1 < o.indexOf(e.hostUrl) || (A = {
                                    url: i.url,
                                    isHttps: h(i.url),
                                    method: (null == r ? void 0 : r.method) || "get",
                                    duration: n,
                                    type: "fetch",
                                    status: i.status || 0
                                }, "fetch" !== (d = "function" == typeof (null === (s = e.api) || void 0 === s ? void 0 : s.resourceTypeHandler) ? null === (c = e.api) || void 0 === c ? void 0 : c.resourceTypeHandler(i.url) : d) && "static" !== d && (c = i.headers ? i.headers.get("content-type") : "", d = i.ok && "string" == typeof c && f(c) ? "static" : "fetch"), "fetch" === d ? i.clone().text().then((function (s) {
                                    var a = null === (d = e.api) || void 0 === d ? void 0 : d.apiDetail,
                                        c = i.status <= 0 || 400 <= i.status, d = (l = v(s, e.api, {url: o, ctx: i})).code,
                                        l = l.isErr;
                                    a = (c ? "FETCH_ERROR: " + s + " \n\n" : "") + "req url: " + o + " \n                                \nreq method: " + ((null == r ? void 0 : r.method) || "get") + " \n                                \nreq param: " + (a ? E(null == r ? void 0 : r.body) : "") + " \n                                \nres duration: " + n + " \n                                \nres status: " + (i.status || 0) + " \n                                \nres retcode: " + d + "\n                                \nres data: " + (a ? s : ""), A.payload = new B(i, s), A.ret = d, A.isErr = +l, t.publishNormalLog({
                                        msg: a,
                                        level: c ? p.AJAX_ERROR : l ? p.RET_ERROR : p.API_RESPONSE,
                                        code: d
                                    })
                                })) : Object.assign(A, {
                                    type: "static",
                                    urlQuery: u(i.url, !0),
                                    domainLookup: a.number,
                                    connectTime: a.number
                                }), t.publishSpeed(A))
                            }, catch: function (i, n, o, r) {
                                if (!(e.hostUrl && -1 < o.indexOf(e.hostUrl))) {
                                    var s = {
                                        url: o,
                                        isHttps: h(o),
                                        method: (null == r ? void 0 : r.method) || "get",
                                        duration: n,
                                        type: "fetch",
                                        status: 0
                                    };
                                    throw t.publishSpeed(s), s = null === (s = e.api) || void 0 === s ? void 0 : s.apiDetail, r = "AJAX_ERROR: " + i + "\n                          \nres status: 0\n                          \nres duration: " + n + "\n                          \nreq url: " + o + "\n                          \nreq method: " + ((null == r ? void 0 : r.method) || "get") + "\n                          \nreq param: " + (s ? E(null == r ? void 0 : r.body) : ""), t.publishNormalLog({
                                        msg: r,
                                        level: p.AJAX_ERROR,
                                        code: -400
                                    }), i
                                }
                            }
                        };
                        this.hackFetchOptions = i, function (e) {
                            if (re.find((function (t) {
                                return t.name === e.name
                            }))) throw new Error("name '" + e.name + "' is already in hackFetch option list");
                            var t;
                            re.push(e), !oe && window.fetch && (oe = !0, t = window.fetch, window.fetch = function (e, i) {
                                void 0 === i && (i = {});
                                for (var n = "string" == typeof e ? e : e.url, o = 0; o < re.length; o++) {
                                    var r = re[o];
                                    try {
                                        "function" == typeof r.beforeFetch && r.beforeFetch(n, i)
                                    } catch (e) {
                                    }
                                }
                                var s = Date.now();
                                return t(e, i).then((function (e) {
                                    for (var t = 0; t < re.length; t++) {
                                        var o = re[t];
                                        try {
                                            "function" == typeof o.then && o.then(e, Date.now() - s, n, i)
                                        } catch (e) {
                                        }
                                    }
                                    return e
                                })).catch((function (e) {
                                    for (var t = 0; t < re.length; t++) {
                                        var o = re[t];
                                        try {
                                            "function" == typeof o.catch && o.catch(e, Date.now() - s, n, i)
                                        } catch (e) {
                                        }
                                    }
                                    throw e
                                }))
                            })
                        }(this.hackFetchOptions)
                    }, getRequestType: function (e, t, i) {
                        var n,
                            o = "function" == typeof (null === (n = e.api) || void 0 === n ? void 0 : n.resourceTypeHandler) ? null === (o = e.api) || void 0 === o ? void 0 : o.resourceTypeHandler(i) : "";
                        return "fetch" !== o && "static" !== o && (i = t.getResponseHeader("content-type"), o = 400 <= t.status || "string" != typeof i || !f(i) ? "fetch" : "static"), o
                    }, overrideXhr: function (e) {
                        var t = this, i = {
                            name: this.name, send: function (i, n) {
                                var o = Date.now();
                                i.addEventListener("loadend", (function () {
                                    var r, s = i.aegisUrl;
                                    if (s) {
                                        var A = Date.now() - o, c = {
                                            url: s,
                                            isHttps: h(s),
                                            status: i.status || 0,
                                            method: i.aegisMethod || "get",
                                            type: "fetch",
                                            duration: A,
                                            payload: new C(i)
                                        };
                                        if ("fetch" === t.getRequestType(e, i, s)) try {
                                            var d = null === (r = e.api) || void 0 === r ? void 0 : r.apiDetail,
                                                l = v(i.response, e.api, {url: s, ctx: i}), f = l.code, g = l.isErr,
                                                m = "req url: " + s + " \n                                \nreq method: " + c.method + " \n                                \nreq param: " + (d ? E(n) : "") + " \n                                \nres duration: " + A + " \n                                \nres status: " + c.status + " \n                                \nres retcode: " + f + "\n                                \nres data: " + (d ? E(i.response) : "");
                                            c.ret = f, c.isErr = +g, t.publishNormalLog({
                                                msg: m,
                                                level: g ? p.RET_ERROR : p.API_RESPONSE,
                                                code: f
                                            })
                                        } catch (r) {
                                            c.ret = "unknown"
                                        } else Object.assign(c, {
                                            type: "static",
                                            urlQuery: u(s, !0),
                                            domainLookup: a.number,
                                            connectTime: a.number
                                        });
                                        t.publishSpeed(c)
                                    }
                                }))
                            }
                        };
                        this.hackXHROptions = i, P(this.hackXHROptions)
                    }, publishSpeed: function (e) {
                        var t = this;
                        e.url = u(e.url), this.$walk((function (i) {
                            var n = t.$getConfig(i);
                            "fetch" === e.type && n && "function" == typeof n.urlHandler ? i.speedLogPipeline(o(o({}, e), {url: encodeURIComponent(n.urlHandler(e.url, e.payload))})) : i.speedLogPipeline(e)
                        }))
                    }, publishNormalLog: function (e) {
                        this.$walk((function (t) {
                            t.normalLogPipeline(e)
                        }))
                    }, destroy: function () {
                        var e, t;
                        this.option.publishSpeed = function () {
                        }, this.option.publishNormalLog = function () {
                        }, this.option.hackXHROptions && M(this.option.hackXHROptions), this.option.hackFetchOptions && (e = this.option.hackFetchOptions, -1 !== (t = re.findIndex((function (t) {
                            return t.name === e.name
                        }))) && re.splice(t, 1))
                    }
                }));

            function ae(e) {
                this.aegisPlugin = !0, this.name = "", this.instances = [], this.inited = !1, e.$walk = this.walk.bind(this), e.$getConfig = this.getConfig.bind(this), this.option = e, this.name = e.name
            }

            function Ae(e) {
                var t, i, n = this;
                this.isGetSample = !1, this.isHidden = !1, this.config = {
                    version: 0,
                    delay: 1e3,
                    onError: !0,
                    repeat: 5,
                    random: 1,
                    aid: !0,
                    device: !0,
                    pagePerformance: !0,
                    webVitals: !0,
                    speedSample: !0,
                    hostUrl: "https://aegis.qq.com",
                    env: "production",
                    url: "",
                    offlineUrl: "",
                    whiteListUrl: "",
                    pvUrl: "",
                    speedUrl: "",
                    customTimeUrl: "",
                    performanceUrl: "",
                    webVitalsUrl: "",
                    eventUrl: ""
                }, this.isWhiteList = !1, this.lifeCycle = new A, this.bean = {}, this.normalLogPipeline = Y([W(this, 5), G, function (e, i) {
                    var n = t.config;
                    i(e = e.map((function (e) {
                        var t, i = n.maxLength || 204800;
                        try {
                            if (!e.msg || e.msg.length <= i) return e;
                            e.msg = null === (t = e.msg) || void 0 === t ? void 0 : t.substring(0, i)
                        } catch (t) {
                            e.msg = w(e.msg).substring(0, n.maxLength)
                        }
                        return e
                    })))
                }, z((t = this).config), N(this.lifeCycle.emit, this.config), J(this), H(this), function (e, t) {
                    var i = JSON.parse(JSON.stringify(e));
                    n.lifeCycle.emit("beforeReport", i);
                    var o = n.config.beforeReport;
                    (e = "function" == typeof o ? e.filter((function (e) {
                        return !1 !== o(e)
                    })) : e).length && t(e)
                }, X(this)]), this.eventPipeline = Y([W(this, 5), function (e) {
                    n.sendPipeline([function (e, t) {
                        var i = e.map((function (e) {
                            return {
                                name: e.name,
                                ext1: e.ext1 || n.config.ext1 || "",
                                ext2: e.ext2 || n.config.ext2 || "",
                                ext3: e.ext3 || n.config.ext3 || ""
                            }
                        }));
                        t({
                            url: n.config.eventUrl + "?payload=" + encodeURIComponent(JSON.stringify(i)),
                            type: g.EVENT,
                            log: e,
                            fail: function (e) {
                                "403 forbidden" === e && n.destroy()
                            }
                        })
                    }], g.EVENT)(e)
                }]), this.timeMap = {}, this.customTimePipeline = Y([W(this, 5), function (e) {
                    return n.sendPipeline([function (e, t) {
                        t({
                            url: n.config.customTimeUrl + "?payload=" + encodeURIComponent(JSON.stringify({custom: e})),
                            type: g.CUSTOM,
                            log: e,
                            fail: function (e) {
                                "403 forbidden" === e && n.destroy()
                            }
                        })
                    }], g.CUSTOM)(e)
                }]), this.config = (i = this.config, void 0 === (e = e.hostUrl) && (e = "https://aegis.qq.com"), i.url = i.url || e + "/collect", i.offlineUrl = i.offlineUrl || e + "/offline", i.whiteListUrl = i.whiteListUrl || e + "/collect/whitelist", i.pvUrl = i.pvUrl || e + "/collect/pv", i.eventUrl = i.eventUrl || e + "/collect/events", i.speedUrl = i.speedUrl || e + "/speed", i.customTimeUrl = i.customTimeUrl || e + "/speed/custom", i.performanceUrl = i.performanceUrl || e + "/speed/performance", i.webVitalsUrl = i.webVitalsUrl || e + "/speed/webvitals", i.setDataReportUrl = i.SetDataReportUrl || e + "/speed/miniProgramData", i), Ae.instances.push(this)
            }

            (Ne = V = V || {})[Ne.unknown = 100] = "unknown", Ne[Ne.wifi = 1] = "wifi", Ne[Ne.net2g = 2] = "net2g", Ne[Ne.net3g = 3] = "net3g", Ne[Ne.net4g = 4] = "net4g", Ne[Ne.net5g = 5] = "net5g", Ne[Ne.net6g = 6] = "net6g", (Je = Q = Q || {})[Je.android = 1] = "android", Je[Je.ios = 2] = "ios", Je[Je.windows = 3] = "windows", Je[Je.macos = 4] = "macos", Je[Je.linux = 5] = "linux", Je[Je.other = 100] = "other";
            var ce, de, le, ue, he, fe, pe, ge, me, be, ye = new K({
                name: "device", onNewAegis: function (e) {
                    e.extendBean("platform", this.getPlatform()), e.extendBean("netType", V.unknown), this.getDpi(e), this.refreshNetworkTypeToBean(e)
                }, getDpi: function (e) {
                    e.extendBean("vp", window.innerWidth + " * " + window.innerHeight), window.screen && e.extendBean("sr", window.screen.width + " * " + window.screen.height)
                }, getPlatform: function () {
                    var e = {
                        android: /\bAndroid\s*([^;]+)/,
                        ios: /\b(iPad|iPhone|iPod)\b.*? OS ([\d_]+)/,
                        windows: /\b(Windows NT)/,
                        macos: /\b(Mac OS)/,
                        linux: /\b(Linux)/i
                    }, t = Object.keys(e).find((function (t) {
                        return e[t].test(navigator.userAgent)
                    }));
                    return t ? Q[t] : Q.other
                }, refreshNetworkTypeToBean: function (e) {
                    var t = this, i = e.config;
                    i && ("function" == typeof i.getNetworkType ? i.getNetworkType : ve)((function (i) {
                        V[i] || (i = V.unknown), e.extendBean("netType", i), t.NetworkRefreshTimer = setTimeout((function () {
                            t.refreshNetworkTypeToBean(e), clearTimeout(t.NetworkRefreshTimer)
                        }), 1e4)
                    }))
                }
            }), ve = function (e) {
                var t = "", i = navigator.userAgent.match(/NetType\/(\w+)/);
                i ? t = i[1] : navigator.connection && (t = navigator.connection.effectiveType || navigator.connection.type), e((t = t = t || "unknown", 0 <= (t = String(t).toLowerCase()).indexOf("4g") ? V.net4g : 0 <= t.indexOf("wifi") ? V.wifi : 0 <= t.indexOf("5g") ? V.net5g : 0 <= t.indexOf("6g") ? V.net6g : 0 <= t.indexOf("3g") ? V.net3g : 0 <= t.indexOf("2g") ? V.net2g : V.unknown))
            }, we = new K({name: "onError"}), Ee = we = new K({
                name: "onError", onNewAegis: function (e) {
                    this.startListen(e)
                }, startListen: function (e) {
                    var t = this, i = window.onerror;

                    function n(e) {
                        e = e && w(e.reason), t.publishErrorLog({msg: "PROMISE_ERROR: " + e, level: p.PROMISE_ERROR})
                    }

                    function o(e) {
                        if (e = (null == e ? void 0 : e.target) || (null == e ? void 0 : e.srcElement)) {
                            var i = e.src || e.href;
                            if (e = e.tagName, "string" == typeof i && e) {
                                var n = {msg: e + " load fail: " + i, level: p.INFO};
                                switch (e.toLowerCase()) {
                                    case"script":
                                        n.level = p.SCRIPT_ERROR;
                                        break;
                                    case"link":
                                        n.level = p.CSS_ERROR;
                                        break;
                                    case"img":
                                        if (-1 < window.location.href.indexOf(i)) return;
                                        n.level = p.IMAGE_ERROR;
                                        break;
                                    case"audio":
                                    case"video":
                                        n.level = p.MEDIA_ERROR;
                                        break;
                                    default:
                                        return
                                }
                                t.publishErrorLog(n)
                            }
                        }
                    }

                    window.onerror = function () {
                        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                        t.publishErrorLog({
                            msg: (w(e[0]) || "") + " @ (" + (w(e[1]) || "") + ":" + (e[2] || 0) + ":" + (e[3] || 0) + ")\n          \n" + w(e[4] || ""),
                            level: p.ERROR
                        }), null == i || i.call.apply(i, r([window], e))
                    }, window.addEventListener("unhandledrejection", n), window.document.addEventListener("error", o, !0), e.lifeCycle.on("destroy", (function () {
                        0 === we.countInstance() && (window.document.removeEventListener("unhandledrejection", n), window.document.removeEventListener("error", o, !0))
                    }));
                    var s = this, a = {
                        name: this.name, send: function (t, i) {
                            t.addEventListener("loadend", (function () {
                                var n, o, r = "";
                                this.failType ? r = this.failType : this.status ? 400 <= this.status && (r = "error") : r = "failed", e.config.hostUrl && this.aegisUrl && -1 < this.aegisUrl.indexOf(e.config.hostUrl) || (o = null === (n = e.config.api) || void 0 === n ? void 0 : n.apiDetail, r && (n = t.aegisUrl, n = v(t.response, e.config.api, {
                                    url: n,
                                    ctx: t
                                }).code, s.publishErrorLog({
                                    msg: "AJAX_ERROR: request " + r + "\n                      \nres status: " + (this.status || 0) + "\n                      \nres retcode: " + n + "\n                      \nres duration: " + (Date.now() - t.aegisXhrStartTime) + "\n                      \nreq url: " + this.aegisUrl + "\n                      \nreq method: " + this.aegisMethod + "\n                      \nreq param: " + (o ? E(i) : "") + "\n                      \nres data: " + (o ? null === (o = (o = t).responseType && "text" !== o.responseType ? "" : o.responseText) || void 0 === o ? void 0 : o.slice(0, 1e3) : ""),
                                    level: p.AJAX_ERROR
                                })))
                            })), t.addEventListener("timeout", (function () {
                                t.failType = "timeout"
                            })), t.addEventListener("error", (function () {
                                t.failType = "error"
                            })), t.addEventListener("abort", (function () {
                                t.failType = "abort"
                            }))
                        }
                    };
                    this.hackXHROptions = a, P(this.hackXHROptions)
                }, publishErrorLog: function (e) {
                    this.$walk((function (t) {
                        t.normalLogPipeline(e)
                    }))
                }, destroy: function () {
                    this.option.publishErrorLog = function () {
                    }, this.option.hackXHROptions && M(this.option.hackXHROptions)
                }
            }), Se = (new K({name: "pagePerformance"}), 1), Re = new K({
                name: "pagePerformance", onNewAegis: function (e) {
                    var t = this;
                    if (F()) if (ce) this.publish(ce, e); else try {
                        this.getFirstScreenTiming(e, (function (i) {
                            var n, o = performance.timing;
                            o && (n = o.loadEventStart - o.domInteractive, ce = {
                                dnsLookup: o.domainLookupEnd - o.domainLookupStart,
                                tcp: o.connectEnd - o.connectStart,
                                ssl: 0 === o.secureConnectionStart ? 0 : o.requestStart - o.secureConnectionStart,
                                ttfb: o.responseStart - o.requestStart,
                                contentDownload: o.responseEnd - o.responseStart,
                                domParse: o.domInteractive - o.domLoading,
                                resourceDownload: n = n < 0 ? 1070 : n,
                                firstScreenTiming: Math.floor(i)
                            }, t.publish(ce, e))
                        }))
                    } catch (e) {
                    }
                }, publish: function (e, t) {
                    var i = this;
                    t.sendPipeline([function (e, n) {
                        var o, r = [];
                        for (o in e) r.push(o + "=" + e[o]);
                        var s = i.$getConfig(t);
                        if (s) {
                            var a = -1 === t.config.performanceUrl.indexOf("?") ? "?" : "&";
                            return "function" == typeof s.urlHandler ? n({
                                url: t.config.performanceUrl + a + r.join("&") + "&from=" + (encodeURIComponent(s.urlHandler()) || window.location.href),
                                beanFilter: ["from"],
                                type: g.PERFORMANCE,
                                log: e
                            }) : n({url: t.config.performanceUrl + a + r.join("&"), type: g.PERFORMANCE, log: e})
                        }
                    }], g.PERFORMANCE)(e)
                }, getFirstScreenTiming: function (e, t) {
                    e.lifeCycle.on("destroy", (function () {
                        A && clearTimeout(A)
                    }));
                    var i = ["script", "style", "link", "br"], n = [], o = this, r = {},
                        s = new MutationObserver((function (e) {
                            var t = {roots: [], rootsDomNum: [], time: performance.now()};
                            e.forEach((function (e) {
                                e && e.addedNodes && e.addedNodes.forEach && e.addedNodes.forEach((function (e) {
                                    1 === e.nodeType && (e.hasAttribute("AEGIS-FIRST-SCREEN-TIMING") || e.querySelector("[AEGIS-FIRST-SCREEN-TIMING]")) ? (Object.prototype.hasOwnProperty.apply(r, [t.time]) || (r[t.time] = []), r[t.time].push(e)) : 1 !== e.nodeType || -1 !== i.indexOf(e.nodeName.toLocaleLowerCase()) || o.isEleInArray(e, t.roots) || e.hasAttribute("AEGIS-IGNORE-FIRST-SCREEN-TIMING") || (t.roots.push(e), t.rootsDomNum.push(o.walkAndCount(e) || 0))
                                }))
                            })), t.roots.length && n.push(t)
                        }));
                    s.observe(document, {childList: !0, subtree: !0});
                    var a = function () {
                        var i, c = 0, d = 0, l = Object.keys(r).filter((function (e) {
                            return r[+e].find((function (e) {
                                return o.isInFirstScreen(e)
                            }))
                        }));
                        l.length ? (d = Math.max.apply(null, l), ("object" != typeof (null === (l = e.config) || void 0 === l ? void 0 : l.pagePerformance) || null !== (i = e.config.pagePerformance) && void 0 !== i && i.firstScreenInfo) && (e.firstScreenInfo = {
                            element: null === (i = r[d]) || void 0 === i ? void 0 : i[0],
                            timing: d,
                            markDoms: r
                        })) : n.forEach((function (t) {
                            for (var i, n = 0; n < t.roots.length; n++) t.rootsDomNum[n] > c && o.isInFirstScreen(t.roots[n]) && (c = t.rootsDomNum[n], d = t.time, ("object" != typeof (null === (i = e.config) || void 0 === i ? void 0 : i.pagePerformance) || null !== (i = e.config.pagePerformance) && void 0 !== i && i.firstScreenInfo) && (e.firstScreenInfo = {
                                element: t.roots[n],
                                timing: d
                            }))
                        })), !d && Se ? A = setTimeout((function () {
                            return a()
                        }), 3e3) : (s.disconnect(), null == t || t(d)), --Se
                    }, A = setTimeout((function () {
                        return a()
                    }), 3e3)
                }, isEleInArray: function (e, t) {
                    return !(!e || e === document.documentElement) && (-1 !== t.indexOf(e) || this.isEleInArray(e.parentElement, t))
                }, isInFirstScreen: function (e) {
                    if (!e || "function" != typeof e.getBoundingClientRect) return !1;
                    var t = e.getBoundingClientRect(), i = window.innerHeight;
                    return e = window.innerWidth, 0 <= t.left && t.left < e && 0 <= t.top && t.top < i && 0 < t.width && 0 < t.height
                }, walkAndCount: function (e) {
                    var t = 0;
                    if (e && 1 === e.nodeType) {
                        t += 1;
                        var i = e.children;
                        if (null != i && i.length) for (var n = 0; n < i.length; n++) t += this.walkAndCount(i[n])
                    }
                    return t
                }
            });

            function Ce() {
                he = [], le = -1, de = null, me(addEventListener)
            }

            function Be(e, t) {
                de || (de = t, le = e, ue = new Date, me(removeEventListener), ge())
            }

            function ke(e) {
                var t, i, n, o;

                function r() {
                    Be(i, n), o()
                }

                function s() {
                    o()
                }

                e.cancelable && (t = (1e12 < e.timeStamp ? new Date : performance.now()) - e.timeStamp, "pointerdown" == e.type ? (i = t, n = e, o = function () {
                    removeEventListener("pointerup", r, fe), removeEventListener("pointercancel", s, fe)
                }, addEventListener("pointerup", r, fe), addEventListener("pointercancel", s, fe)) : Be(t, e))
            }

            function Ie(e, t) {
                return {
                    name: e,
                    value: void 0 === t ? -1 : t,
                    delta: 0,
                    entries: [],
                    id: "v1-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12)
                }
            }

            function Te(e, t) {
                try {
                    if (PerformanceObserver.supportedEntryTypes.includes(e)) {
                        if ("first-input" === e && !("PerformanceEventTiming" in self)) return;
                        var i = new PerformanceObserver((function (e) {
                            return e.getEntries().map(t)
                        }));
                        return i.observe({type: e, buffered: !0}), i
                    }
                } catch (e) {
                }
            }

            function xe(e, t) {
                function i(n) {
                    "pagehide" !== n.type && "hidden" !== document.visibilityState || (e(n), t && (removeEventListener("visibilitychange", i, !0), removeEventListener("pagehide", i, !0)))
                }

                addEventListener("visibilitychange", i, !0), addEventListener("pagehide", i, !0)
            }

            function Le(e) {
                addEventListener("pageshow", (function (t) {
                    t.persisted && e(t)
                }), !0)
            }

            function De(e, t, i) {
                var n;
                return function () {
                    0 <= t.value && (i || Me.has(t) || "hidden" === document.visibilityState) && (t.delta = t.value - (n || 0), !t.delta && void 0 !== n || (n = t.value, e(t)))
                }
            }

            function Oe() {
                xe((function (e) {
                    e = e.timeStamp, Ve = e
                }), !0)
            }

            function je() {
                return Ve < 0 && ((Ve = self.webVitals.firstHiddenTime) === 1 / 0 && Oe(), Le((function () {
                    setTimeout((function () {
                        Ve = "hidden" === document.visibilityState ? 0 : 1 / 0, Oe()
                    }), 0)
                }))), {
                    get timeStamp() {
                        return Ve
                    }
                }
            }

            function Ue(e) {
                var t = e.name;
                e = e.value, Qe[t] = e
            }

            fe = {passive: !0, capture: !0}, pe = new Date, ge = function () {
                var e;
                0 <= le && le < ue - pe && (e = {
                    entryType: "first-input",
                    name: de.type,
                    target: de.target,
                    cancelable: de.cancelable,
                    startTime: de.timeStamp,
                    processingStart: de.timeStamp + le
                }, he.forEach((function (t) {
                    t(e)
                })), he = [])
            }, me = function (e) {
                ["mousedown", "keydown", "touchstart", "pointerdown"].forEach((function (t) {
                    return e(t, ke, fe)
                }))
            }, be = "hidden" === document.visibilityState ? 0 : 1 / 0, addEventListener("visibilitychange", (function e(t) {
                "hidden" === document.visibilityState && (be = t.timeStamp, removeEventListener("visibilitychange", e, !0))
            }), !0), Ce(), self.webVitals = {
                firstInputPolyfill: function (e) {
                    he.push(e), ge()
                }, resetFirstInputPolyfill: Ce, get firstHiddenTime() {
                    return be
                }
            };
            var Fe, Pe, Me = new ("function" == typeof WeakSet ? WeakSet : Set), Ve = -1,
                Qe = (new K({name: "webVitals"}), {FCP: -1, LCP: -1, FID: -1, CLS: -1}), Ne = new K({
                    name: "webVitals", onNewAegis: function (e) {
                        var t, i, n, o, r, s, a, A, c, d, l, u, h, f, p, g, m, b, y, v, w, E, S;
                        if (F() && "function" == typeof window.PerformanceObserver) try {
                            b = Ue, v = je(), w = Ie("FCP"), E = performance.getEntriesByName("first-contentful-paint")[0], S = E ? null : Te("paint", k), (E || S) && (y = De(b, w, void 0), E && k(E), Le((function (e) {
                                w = Ie("FCP"), y = De(b, w, void 0), requestAnimationFrame((function () {
                                    requestAnimationFrame((function () {
                                        w.value = performance.now() - e.timeStamp, Me.add(w), y()
                                    }))
                                }))
                            }))), u = Ue, p = je(), g = Ie("LCP"), (m = Te("largest-contentful-paint", B)) && (h = De(u, g, void 0), f = function () {
                                Me.has(g) || (m.takeRecords().map(B), m.disconnect(), Me.add(g), h())
                            }, ["keydown", "click"].forEach((function (e) {
                                addEventListener(e, f, {once: !0, capture: !0})
                            })), xe(f, !0), Le((function (e) {
                                g = Ie("LCP"), h = De(u, g, void 0), requestAnimationFrame((function () {
                                    requestAnimationFrame((function () {
                                        g.value = performance.now() - e.timeStamp, Me.add(g), h()
                                    }))
                                }))
                            }))), a = Ue, A = je(), c = Ie("FID"), d = Te("first-input", C), l = De(a, c, void 0), d && xe((function () {
                                d.takeRecords().map(C), d.disconnect()
                            }), !0), d || window.webVitals.firstInputPolyfill(C), Le((function () {
                                c = Ie("FID"), l = De(a, c, void 0), window.webVitals.resetFirstInputPolyfill(), window.webVitals.firstInputPolyfill(C)
                            })), n = Ue, r = Ie("CLS", 0), (s = Te("layout-shift", R)) && (o = De(n, r, void 0), xe((function () {
                                s.takeRecords().map(R), o()
                            })), Le((function () {
                                r = Ie("CLS", 0), o = De(n, r, void 0)
                            }))), t = this.publish.bind(this, e), i = function (e) {
                                "pagehide" !== e.type && "hidden" !== document.visibilityState || (t(e), removeEventListener("visibilitychange", i, !0), removeEventListener("pagehide", i, !0))
                            }, addEventListener("visibilitychange", i, !0), addEventListener("pagehide", i, !0)
                        } catch (e) {
                        }

                        function R(e) {
                            e.hadRecentInput || (r.value += e.value, r.entries.push(e), o())
                        }

                        function C(e) {
                            e.startTime < A.timeStamp && (c.value = e.processingStart - e.startTime, c.entries.push(e), Me.add(c), l())
                        }

                        function B(e) {
                            var t = e.startTime;
                            t < p.timeStamp && (g.value = t, g.entries.push(e)), h()
                        }

                        function k(e) {
                            "first-contentful-paint" === e.name && (S && S.disconnect(), e.startTime < v.timeStamp && (w.value = e.startTime, w.entries.push(e), Me.add(w), y()))
                        }
                    }, publish: function (e) {
                        e.sendPipeline([function (t, i) {
                            var n, o = [];
                            for (n in t) o.push(n + "=" + t[n]);
                            var r = -1 === e.config.performanceUrl.indexOf("?") ? "?" : "&";
                            i({url: e.config.webVitalsUrl + r + o.join("&"), type: g.VITALS, log: t, sendBeacon: !0})
                        }], g.VITALS)(Qe)
                    }, destroy: function () {
                        this.option.publish = function () {
                        }
                    }
                }), We = 0,
                Ge = (n(Pe = qe, Je = Fe = Z), Pe.prototype = null === Je ? Object.create(Je) : (ze.prototype = Je.prototype, new ze), qe.prototype.getBean = function (e) {
                    var t = this;
                    return void 0 === e && (e = []), "" + Object.getOwnPropertyNames(this.bean).filter((function (t) {
                        return -1 === e.indexOf(t)
                    })).map((function (e) {
                        return e + "=" + t.bean[e]
                    })).join("&")
                }, qe.prototype.resetRequesting = function () {
                    this.requesting = !1;
                    var e = this.requestQueue.shift();
                    e && this.request(e.options, e.success, e.fail)
                }, qe.prototype.request = function (e, t, i) {
                    var n = this;
                    if (e && "string" == typeof e.url && "" !== e.url && this.bean.id) if (this.requesting) this.requestQueue.push({
                        options: e,
                        success: t,
                        fail: i
                    }); else {
                        // this.requesting = !0;
                        // var o = e.url;
                        // !1 !== e.addBean && (o = o + (-1 === o.indexOf("?") ? "?" : "&") + this.getBean(e.beanFilter)), e.url = o;
                        // var r = e.method || "get";
                        // if (!(e = (o = this.config.onBeforeRequest) ? o(e, this) : e)) return this.resetRequesting(), console.log("Sending request blocked");
                        // if (!e.url) return this.resetRequesting(), console.warn("Please handle the parameters reasonably, options.url is necessary");
                        // if (navigator.sendBeacon && e.sendBeacon) return this.resetRequesting(), navigator.sendBeacon(e.url, e.data);
                        // var s = new XMLHttpRequest;
                        // s.sendByAegis = !0, Object.assign(s, {timeout: 5e3}, e.requestConfig), s.addEventListener("readystatechange", (function () {
                        //     4 === s.readyState && (n.resetRequesting(), 400 <= s.status || 0 === s.status ? null == i || i(s.response) : null == t || t(s.response))
                        // })), "get" === r.toLocaleLowerCase() ? (s.open("get", function (e, t) {
                        //     if ("string" != typeof e) return "";
                        //     if ("object" == typeof t && t) {
                        //         var i = Object.getOwnPropertyNames(t).map((function (e) {
                        //             var i = t[e];
                        //             return e + "=" + ("string" == typeof i ? encodeURIComponent(i) : encodeURIComponent(JSON.stringify(i)))
                        //         })).join("&").replace(/eval/gi, "evaI");
                        //         return e + (-1 === e.indexOf("?") ? "?" : "&") + i
                        //     }
                        //     return e
                        // }
                        // (e.url, e.data)), s.send()) : (s.open("post", e.url), e.contentType && s.setRequestHeader("Content-Type", e.contentType), "string" == typeof e.data && (e.data = e.data.replace(/eval/gi, "evaI")), s.send(e.data))
                    }
                }, qe.useAsyncPlugin = function (e, t) {
                    var i,
                        n = void 0 === (i = (t = void 0 === t ? {} : t).exportsConstructor) ? "aegis-plugin-" + We : i,
                        o = void 0 === (i = t.onAegisInit) ? function () {
                        } : i, r = void 0 === (t = t.onAegisInitAndPluginLoaded) ? function () {
                        } : t;
                    if (We += 1, "string" != typeof e) throw new TypeError("useAsyncPlugin first param must be string");
                    if ("function" != typeof o || "function" != typeof r) throw new TypeError("onAegisInit and onAegisInitAndPluginLoaded must be function");
                    this.use(new K({
                        name: "asyncPlugin", onNewAegis: function (t) {
                            try {
                                o(t), qe.asyncPlugin[e] ? r(t, window[qe.asyncPlugin[e]]) : (i = e, s = n, a = function (i) {
                                    i || (qe.asyncPlugin[e] = n, i = window[n], r(t, i))
                                }, A = document.createElement("script"), c = document.head, "function" == typeof s && (a = s, s = ""), A.src = i, A.setAttribute("name", s), A.name = s, A.setAttribute("crossorigin", "anonymous"), A.crossorigin = "anonymous", A.defer = !0, A.hasLoaded = !1, A.onreadystatechange = function () {
                                    A.hasLoaded || A.readyState && "loaded" !== A.readyState && "complete" !== A.readyState || (A.hasLoaded = !0, "function" == typeof a && a(!1), setTimeout((function () {
                                        c.contains(A) && c.removeChild(A)
                                    })))
                                }, A.onload = A.onreadystatechange, A.onerror = function () {
                                    "function" == typeof a && a(!0), setTimeout((function () {
                                        c.contains(A) && c.removeChild(A)
                                    }))
                                }, "complete" === document.readyState ? c.appendChild(A) : window.addEventListener("load", (function () {
                                    c.appendChild(A)
                                })))
                            } catch (i) {
                                console.log("error on below is caused by " + e + " "), console.error(i)
                            }
                            var i, s, a, A, c
                        }
                    }))
                }, qe.prototype.uploadLogs = function (e, t) {
                    this.lifeCycle.emit("uploadLogs", e = void 0 === e ? {} : e, t = void 0 === t ? {} : t)
                }, qe.sessionID = "session-" + Date.now(), qe.asyncPlugin = {}, qe.urls = {
                    aegisCollect: "https://aegis.qq.com/collect",
                    flog: "https://cdn-go.cn/vasdev/web_webpersistance_v2/v1.8.2/flog.core.min.js",
                    shadowLog: ""
                }, qe), He = new K({name: "offlineLog"}), Je = (Z = He = new K({
                    name: "offlineLog", onNewAegis: function (e) {
                        var t = Ge.urls.flog, i = e.config, n = [], r = null, a = null, A = function (e) {
                            a = e
                        }, c = function (e) {
                            n = n.concat(e)
                        }, d = function (e, t) {
                            r = {conds: e = void 0 === e ? {} : e, params: t = void 0 === t ? {} : t}
                        };
                        Ge.useAsyncPlugin(t, {
                            exportsConstructor: "Flog", onAegisInit: function (e) {
                                e.lifeCycle.on("beforeWrite", c), e.lifeCycle.on("uploadLogs", d), e.lifeCycle.on("onConfigChange", A)
                            }, onAegisInitAndPluginLoaded: function (e, t) {
                                var l, u, h, f, m, b = void 0 === (S = i.dbConfig) ? {} : S,
                                    y = void 0 === (R = i.url) ? Ge.urls.aegisCollect : R, v = i.offlineLogExp,
                                    E = void 0 === v ? 3 : v, S = i.id, R = i.uin;
                                null === (v = e.lifeCycle) || void 0 === v || v.remove("beforeWrite", c), null === (v = e.lifeCycle) || void 0 === v || v.remove("uploadLogs", d), null === (v = e.lifeCycle) || void 0 === v || v.remove("onConfigChange", A), b = Object.assign({
                                    lookupUrl: y + "/offlineAuto?id=" + S,
                                    preservedDay: E,
                                    id: S,
                                    uin: R,
                                    aid: (null === (R = e.bean) || void 0 === R ? void 0 : R.aid) || "",
                                    beforeRequest: e.config.beforeRequest,
                                    afterRequest: e.config.afterRequest
                                }, b, {sessionId: Ge.sessionID});
                                try {
                                    var C = new t(b);
                                    n.forEach((function (e) {
                                        C.add(o(o({}, e), {level: e.level === p.INFO_ALL ? p.INFO : e.level}))
                                    })), null === (l = e.lifeCycle) || void 0 === l || l.on("beforeWrite", (function (e) {
                                        (e = void 0 === e ? [] : e).forEach((function (e) {
                                            C.add(o(o({}, e), {level: e.level === p.INFO_ALL ? p.INFO : e.level}))
                                        }))
                                    })), null === (u = e.lifeCycle) || void 0 === u || u.on("uploadLogs", (function (t, n) {
                                        var o;
                                        void 0 === t && (t = {}), void 0 === n && (n = {}), C.uploadLogs(Object.assign({
                                            id: i.id,
                                            uin: i.uin,
                                            aid: null === (o = e.bean) || void 0 === o ? void 0 : o.aid
                                        }, t), n)
                                    })), null === (h = e.lifeCycle) || void 0 === h || h.on("onConfigChange", (function (e) {
                                        C.setConfig(e)
                                    })), null === (f = e.lifeCycle) || void 0 === f || f.on("destroy", (function () {
                                        0 === He.countInstance() && (n.length = 0, "function" == typeof ((r = null) == C ? void 0 : C.destroy) && C.destroy())
                                    })), C.on("PERREVENT", (function (t) {
                                        e.sendPipeline([function (e, t) {
                                            var n = s({msg: w(e), level: p.INFO});
                                            t({
                                                type: g.OFFLINE,
                                                data: n,
                                                contentType: "application/x-www-form-urlencoded",
                                                method: "post",
                                                addBean: !1,
                                                url: i.url + "?id=893&sessionId=" + Ge.sessionID + "&uin=" + i.uin + "&from=" + i.id + "&count=1&version=1.24.48",
                                                log: e
                                            })
                                        }], g.OFFLINE)(t)
                                    })), a && (C.setConfig(a), a = null), r && (null === (m = e.lifeCycle) || void 0 === m || m.emit("uploadLogs", r.conds, r.params), r = null), e.flog = C
                                } catch (e) {
                                    console.log(e)
                                }
                            }
                        })
                    }
                }), new K({name: "spa"}), new K({
                    name: "spa", init: function () {
                        history.pushState = this.wr("pushState") || history.pushState, history.replaceState = this.wr("replaceState") || history.replaceState;
                        var e = (null === (e = location.href) || void 0 === e ? void 0 : e.split("?"))[0];
                        this.$fireUrl = e, this.sendPv = this.sendPv.bind(this), this.onPageChange()
                    }, onPageChange: function () {
                        window.addEventListener("replaceState", this.sendPv), window.addEventListener("pushState", this.sendPv), window.addEventListener("popstate", this.sendPv)
                    }, wr: function (e) {
                        var t = history[e];
                        return "function" == typeof t && !history.__hasWrittenByTamSpa && (Object.defineProperty(history, "__hasWrittenByTamSpa", {
                            value: !0,
                            enumerable: !1
                        }), function () {
                            var i = t.apply(this, arguments), n = null;
                            return "function" == typeof Event ? n = new Event(e) : (n = document.createEvent("HTMLEvents")).initEvent(e, !1, !0), window.dispatchEvent(n), i
                        })
                    }, sendPv: function () {
                        var e = this;
                        setTimeout((function () {
                            var t = location.href,
                                i = (null === (i = location.href) || void 0 === i ? void 0 : i.split("?"))[0];
                            i && i !== e.$fireUrl && (e.$walk((function (e) {
                                e.send({
                                    url: e.config.pvUrl + "?from=" + encodeURIComponent(t),
                                    beanFilter: ["from"],
                                    type: g.WHITE_LIST
                                })
                            })), e.$fireUrl = i)
                        }), 0)
                    }, destroy: function () {
                        window.removeEventListener("replaceState", this.option.sendPv), window.removeEventListener("pushState", this.option.sendPv), window.removeEventListener("popstate", this.option.sendPv)
                    }
                }));

            function qe(e) {
                var t, i, n, o = Fe.call(this, e) || this;
                o.requestQueue = [], o.requesting = !1, o.speedLogPipeline = Y([q(o.config), W(o), (n = o, function (e, t) {
                    ve((function (i) {
                        n.extendBean("netType", i), t(e)
                    }))
                }), function (e, t) {
                    o.lifeCycle.emit("beforeReportSpeed", e);
                    var i = o.config.beforeReportSpeed;
                    if ((e = "function" == typeof i ? e.filter((function (e) {
                        var t, n, r = !1 !== i(e);
                        return "fetch" === e.type && void 0 === e.ret && e.payload && (t = (n = v(e.payload.data.response, o.config.api, {
                            url: e.payload.data.url,
                            ctx: e.payload.data
                        }) || {}).code, n = n.isErr, e.ret = t, e.isErr = +n), r
                    })) : e).length) return t(e)
                }, function (e) {
                    return o.sendPipeline([function (e, t) {
                        t({type: g.SPEED, url: "" + o.config.speedUrl, method: "post", data: $(e, o.bean), log: e})
                    }], g.SPEED)(e)
                }]), e.asyncPlugin = !0;
                try {
                    "undefined" != typeof document && (e.uin = e.uin || (null !== (t = document.cookie.match(/\buin=\D+(\d*)/)) && void 0 !== t ? t : [])[1] || (null !== (i = document.cookie.match(/\bilive_uin=\D*(\d+)/)) && void 0 !== i ? i : [])[1] || ""), o.init(e), o.extendBean("sessionId", qe.sessionID), o.extendBean("from", encodeURIComponent(e.pageUrl || location.href)), "undefined" != typeof document && o.extendBean("referer", encodeURIComponent(document.referrer || "")), e.ext1 && o.extendBean("ext1", e.ext1), e.ext2 && o.extendBean("ext2", e.ext2), e.ext3 && o.extendBean("ext3", e.ext3)
                } catch (e) {
                    console.warn(e), console.log("%cThe above error occurred in the process of initializing Aegis, which will affect your normal use of Aegis.\nIt is recommended that you contact us for feedback and thank you for your support.", "color: red"), o.sendSDKError(e)
                }
                return o
            }

            function ze() {
                this.constructor = Pe
            }

            return new K({name: "ie"}), Ge.use(Ee), Ge.use(se), Ge.use(te), Ge.use(Re), Ge.use(Ne), Ge.use(_), Ge.use(ye), Ge.use(Z), Ge.use(Je), Ge
        }()
    }));

    class Je extends ue {
        static ERROR = E;
        static TIMEOUT = {loadingTimeout: v.loadingTimeout, delayTimeout: v.delayTimeout};

        constructor(e) {
            super();
            let t = e, i = e.container;
            if ("string" == typeof e.container && (i = document.querySelector(e.container)), !i) throw new Error("Jessibuca need container option");
            i.classList.add("jessibuca-container"), delete t.container, le(t.videoBuffer) && (t.videoBuffer = 1e3 * Number(t.videoBuffer)), le(t.timeout) && (de(t.loadingTimeout) && (t.loadingTimeout = t.timeout), de(t.heartTimeout) && (t.heartTimeout = t.timeout)), this._opt = t, this.$container = i, this.href = null, this.events = new Z(this), this.player = new Ge(i, t), this._bindEvents(), this._initAegis()
        }

        _initAegis() {
            new He({id: "3ogWGfLmpllRGka9pY", reportApiSpeed: !1, reportAssetSpeed: !1, spa: !1})
        }

        _bindEvents() {
            Object.keys(w).forEach((e => {
                this.player.on(w[e], (t => {
                    this.emit(e, t)
                }))
            }))
        }

        setDebug(e) {
            this.player.updateOption({isDebug: !!e})
        }

        mute() {
            this.player.mute(!0)
        }

        cancelMute() {
            this.player.mute(!1)
        }

        setVolume(e) {
            this.player.volume = e
        }

        audioResume() {
            this.player.audio.audioEnabled(!0)
        }

        setTimeout(e) {
            e = Number(e), this.player.updateOption({timeout: e, loadingTimeout: e, heartTimeout: e})
        }

        setScaleMode(e) {
            let t = {isFullResize: !1, isResize: !1};
            switch (e = Number(e)) {
                case U:
                    t.isFullResize = !1, t.isResize = !1;
                    break;
                case F:
                    t.isFullResize = !1, t.isResize = !0;
                    break;
                case P:
                    t.isFullResize = !0, t.isResize = !0
            }
            this.player.updateOption(t), this.resize()
        }

        pause() {
            return this.player.pause()
        }

        close() {
            return this._opt.url = "", this.player.close()
        }

        clearView() {
            this.player.video.clearView()
        }

        play(e) {
            return new Promise(((t, i) => {
                if (!e && !this._opt.url) return this.emit(v.error, E.playError), void i();
                if (e) {
                    if (!this._opt.url) return this._play(e);
                    e === this._opt.url ? this.player.playing ? t() : (this.clearView(), this.player.play(this._opt.url).then((() => {
                        t()
                    })).catch((() => {
                        this.player.pause().then((() => {
                            i()
                        }))
                    }))) : this.player.pause().then((() => (this.clearView(), this._play(e)))).catch((() => {
                        i()
                    }))
                } else this.player.play(this._opt.url).then((() => {
                    t()
                })).catch((() => {
                    this.player.pause().then((() => {
                        i()
                    }))
                }))
            }))
        }

        _play(o) {
            return new Promise(((r, s) => {
                this._opt.url = o;
                const a = 0 === o.indexOf("http"), A = a ? t : e,
                    c = a || -1 !== o.indexOf(".flv") || this._opt.isFlv ? i : n;
                this.player.updateOption({
                    protocol: A,
                    demuxType: c
                }), this.player.once(E.mediaSourceH265NotSupport, (() => {
                    this.close()
                })), this.player.once(E.webcodecsH265NotSupport, (() => {
                    this.close()
                })), this.hasLoaded() ? this.player.play(o).then((() => {
                    r()
                })).catch((() => {
                    this.player.pause().then((() => {
                        s()
                    }))
                })) : this.player.once(v.decoderWorkerInit, (() => {
                    this.player.play(o).then((() => {
                        r()
                    })).catch((() => {
                        this.player.pause().then((() => {
                            s()
                        }))
                    }))
                }))
            }))
        }

        resize() {
            this.player.resize()
        }

        setBufferTime(e) {
            e = Number(e), this.player.updateOption({videoBuffer: 1e3 * e})
        }

        setRotate(e) {
            e = parseInt(e, 10);
            this._opt.rotate !== e && -1 !== [0, 90, 270].indexOf(e) && (this.player.updateOption({rotate: e}), this.resize())
        }

        hasLoaded() {
            return this.player.loaded
        }

        setKeepScreenOn() {
            this.player.updateOption({keepScreenOn: !0})
        }

        setFullscreen(e) {
            const t = !!e;
            this.player.fullscreen !== t && (this.player.fullscreen = t)
        }

        screenshot(e, t, i, n) {
            return this.player.video.screenshot(e, t, i, n)
        }

        startRecord(e, t) {
            return new Promise(((i, n) => {
                this.player.playing ? (this.player.startRecord(e, t), i()) : n()
            }))
        }

        stopRecordAndSave() {
            this.player.recording && this.player.stopRecordAndSave()
        }

        isPlaying() {
            return this.player.playing
        }

        isMute() {
            return this.player.audio.isMute
        }

        isRecording() {
            return this.player.recorder.recording
        }

        destroy() {
            this.player.destroy(), this.player = null, this.off()
        }
    }

    return window.Jessibuca = Je, Je
}));
