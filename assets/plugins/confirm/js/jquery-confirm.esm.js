/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.17.1.
 * Original file: /npm/jquery-confirm@3.3.4/dist/jquery-confirm.min.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import t from "../../jquery/jquery.esm.js";

var n, i, o = {exports: {}};
/*!
 * jquery-confirm v3.3.4 (http://craftpip.github.io/jquery-confirm/)
 * Author: Boniface Pereira
 * Website: www.craftpip.com
 * Contact: hey@craftpip.com
 *
 * Copyright 2013-2019 jquery-confirm
 * Licensed under MIT (https://github.com/craftpip/jquery-confirm/blob/master/LICENSE)
 */
i = function (t) {
    var n = window;
    t.fn.confirm = function (i, o) {
        return void 0 === i && (i = {}), "string" == typeof i && (i = {
            content: i,
            title: o || !1
        }), t(this).each((function () {
            var o = t(this);
            o.attr("jc-attached") ? console.warn("jConfirm has already been attached to this element ", o[0]) : (o.on("click", (function (e) {
                e.preventDefault();
                var s = t.extend({}, i);
                if (o.attr("data-title") && (s.title = o.attr("data-title")), o.attr("data-content") && (s.content = o.attr("data-content")), void 0 === s.buttons && (s.buttons = {}), s.$target = o, o.attr("href") && 0 === Object.keys(s.buttons).length) {
                    var a = t.extend(!0, {}, n.jconfirm.pluginDefaults.defaultButtons, (n.jconfirm.defaults || {}).defaultButtons || {}),
                        c = Object.keys(a)[0];
                    s.buttons = a, s.buttons[c].action = function () {
                        location.href = o.attr("href")
                    }
                }
                s.closeIcon = !1, t.confirm(s)
            })), o.attr("jc-attached", !0))
        })), t(this)
    }, t.confirm = function (i, o) {
        void 0 === i && (i = {}), "string" == typeof i && (i = {content: i, title: o || !1});
        var e = !(!1 === i.buttons);
        if ("object" != typeof i.buttons && (i.buttons = {}), 0 === Object.keys(i.buttons).length && e) {
            var s = t.extend(!0, {}, n.jconfirm.pluginDefaults.defaultButtons, (n.jconfirm.defaults || {}).defaultButtons || {});
            i.buttons = s
        }
        return n.jconfirm(i)
    }, t.alert = function (i, o) {
        void 0 === i && (i = {}), "string" == typeof i && (i = {content: i, title: o || !1});
        var e = !(!1 === i.buttons);
        if ("object" != typeof i.buttons && (i.buttons = {}), 0 === Object.keys(i.buttons).length && e) {
            var s = t.extend(!0, {}, n.jconfirm.pluginDefaults.defaultButtons, (n.jconfirm.defaults || {}).defaultButtons || {}),
                a = Object.keys(s)[0];
            i.buttons[a] = s[a]
        }
        return n.jconfirm(i)
    }, t.dialog = function (t, i) {
        return void 0 === t && (t = {}), "string" == typeof t && (t = {
            content: t,
            title: i || !1,
            closeIcon: function () {
            }
        }), t.buttons = {}, void 0 === t.closeIcon && (t.closeIcon = function () {
        }), t.confirmKeys = [13], n.jconfirm(t)
    }, n.jconfirm = function (i) {
        void 0 === i && (i = {});
        var o = t.extend(!0, {}, n.jconfirm.pluginDefaults);
        n.jconfirm.defaults && (o = t.extend(!0, o, n.jconfirm.defaults)), o = t.extend(!0, {}, o, i);
        var e = new n.Jconfirm(o);
        return n.jconfirm.instances.push(e), e
    }, n.Jconfirm = function (n) {
        t.extend(this, n), this._init()
    }, n.Jconfirm.prototype = {
        _init: function () {
            var i = this;
            n.jconfirm.instances.length || (n.jconfirm.lastFocused = t("body").find(":focus")), this._id = Math.round(99999 * Math.random()), this.contentParsed = t(document.createElement("div")), this.lazyOpen || setTimeout((function () {
                i.open()
            }), 0)
        },
        _buildHTML: function () {
            var n = this;
            this._parseAnimation(this.animation, "o"), this._parseAnimation(this.closeAnimation, "c"), this._parseBgDismissAnimation(this.backgroundDismissAnimation), this._parseColumnClass(this.columnClass), this._parseTheme(this.theme), this._parseType(this.type);
            var i = t(this.template);
            i.find(".jconfirm-box").addClass(this.animationParsed).addClass(this.backgroundDismissAnimationParsed).addClass(this.typeParsed), this.typeAnimated && i.find(".jconfirm-box").addClass("jconfirm-type-animated"), this.useBootstrap ? (i.find(".jc-bs3-row").addClass(this.bootstrapClasses.row), i.find(".jc-bs3-row").addClass("justify-content-md-center justify-content-sm-center justify-content-xs-center justify-content-lg-center"), i.find(".jconfirm-box-container").addClass(this.columnClassParsed), this.containerFluid ? i.find(".jc-bs3-container").addClass(this.bootstrapClasses.containerFluid) : i.find(".jc-bs3-container").addClass(this.bootstrapClasses.container)) : i.find(".jconfirm-box").css("width", this.boxWidth), this.titleClass && i.find(".jconfirm-title-c").addClass(this.titleClass), i.addClass(this.themeParsed);
            var o = "jconfirm-box" + this._id;
            i.find(".jconfirm-box").attr("aria-labelledby", o).attr("tabindex", -1), i.find(".jconfirm-content").attr("id", o), null !== this.bgOpacity && i.find(".jconfirm-bg").css("opacity", this.bgOpacity), this.rtl && i.addClass("jconfirm-rtl"), this.$el = i.appendTo(this.container), this.$jconfirmBoxContainer = this.$el.find(".jconfirm-box-container"), this.$jconfirmBox = this.$body = this.$el.find(".jconfirm-box"), this.$jconfirmBg = this.$el.find(".jconfirm-bg"), this.$title = this.$el.find(".jconfirm-title"), this.$titleContainer = this.$el.find(".jconfirm-title-c"), this.$content = this.$el.find("div.jconfirm-content"), this.$contentPane = this.$el.find(".jconfirm-content-pane"), this.$icon = this.$el.find(".jconfirm-icon-c"), this.$closeIcon = this.$el.find(".jconfirm-closeIcon"), this.$holder = this.$el.find(".jconfirm-holder"), this.$btnc = this.$el.find(".jconfirm-buttons"), this.$scrollPane = this.$el.find(".jconfirm-scrollpane"), n.setStartingPoint(), this._contentReady = t.Deferred(), this._modalReady = t.Deferred(), this.$holder.css({
                "padding-top": this.offsetTop,
                "padding-bottom": this.offsetBottom
            }), this.setTitle(), this.setIcon(), this._setButtons(), this._parseContent(), this.initDraggable(), this.isAjax && this.showLoading(!1), t.when(this._contentReady, this._modalReady).then((function () {
                n.isAjaxLoading ? setTimeout((function () {
                    n.isAjaxLoading = !1, n.setContent(), n.setTitle(), n.setIcon(), setTimeout((function () {
                        n.hideLoading(!1), n._updateContentMaxHeight()
                    }), 100), "function" == typeof n.onContentReady && n.onContentReady()
                }), 50) : (n._updateContentMaxHeight(), n.setTitle(), n.setIcon(), "function" == typeof n.onContentReady && n.onContentReady()), n.autoClose && n._startCountDown()
            })).then((function () {
                n._watchContent()
            })), "none" === this.animation && (this.animationSpeed = 1, this.animationBounce = 1), this.$body.css(this._getCSS(this.animationSpeed, this.animationBounce)), this.$contentPane.css(this._getCSS(this.animationSpeed, 1)), this.$jconfirmBg.css(this._getCSS(this.animationSpeed, 1)), this.$jconfirmBoxContainer.css(this._getCSS(this.animationSpeed, 1))
        },
        _typePrefix: "jconfirm-type-",
        typeParsed: "",
        _parseType: function (t) {
            this.typeParsed = this._typePrefix + t
        },
        setType: function (t) {
            var n = this.typeParsed;
            this._parseType(t), this.$jconfirmBox.removeClass(n).addClass(this.typeParsed)
        },
        themeParsed: "",
        _themePrefix: "jconfirm-",
        setTheme: function (t) {
            var n = this.theme;
            this.theme = t || this.theme, this._parseTheme(this.theme), n && this.$el.removeClass(n), this.$el.addClass(this.themeParsed), this.theme = t
        },
        _parseTheme: function (n) {
            var i = this;
            n = n.split(","), t.each(n, (function (o, e) {
                -1 === e.indexOf(i._themePrefix) && (n[o] = i._themePrefix + t.trim(e))
            })), this.themeParsed = n.join(" ").toLowerCase()
        },
        backgroundDismissAnimationParsed: "",
        _bgDismissPrefix: "jconfirm-hilight-",
        _parseBgDismissAnimation: function (n) {
            var i = n.split(","), o = this;
            t.each(i, (function (n, e) {
                -1 === e.indexOf(o._bgDismissPrefix) && (i[n] = o._bgDismissPrefix + t.trim(e))
            })), this.backgroundDismissAnimationParsed = i.join(" ").toLowerCase()
        },
        animationParsed: "",
        closeAnimationParsed: "",
        _animationPrefix: "jconfirm-animation-",
        setAnimation: function (t) {
            this.animation = t || this.animation, this._parseAnimation(this.animation, "o")
        },
        _parseAnimation: function (n, i) {
            i = i || "o";
            var o = n.split(","), e = this;
            t.each(o, (function (n, i) {
                -1 === i.indexOf(e._animationPrefix) && (o[n] = e._animationPrefix + t.trim(i))
            }));
            var s = o.join(" ").toLowerCase();
            return "o" === i ? this.animationParsed = s : this.closeAnimationParsed = s, s
        },
        setCloseAnimation: function (t) {
            this.closeAnimation = t || this.closeAnimation, this._parseAnimation(this.closeAnimation, "c")
        },
        setAnimationSpeed: function (t) {
            this.animationSpeed = t || this.animationSpeed
        },
        columnClassParsed: "",
        setColumnClass: function (t) {
            this.useBootstrap ? (this.columnClass = t || this.columnClass, this._parseColumnClass(this.columnClass), this.$jconfirmBoxContainer.addClass(this.columnClassParsed)) : console.warn("cannot set columnClass, useBootstrap is set to false")
        },
        _updateContentMaxHeight: function () {
            var n = t(window).height() - (this.$jconfirmBox.outerHeight() - this.$contentPane.outerHeight()) - (this.offsetTop + this.offsetBottom);
            this.$contentPane.css({"max-height": n + "px"})
        },
        setBoxWidth: function (t) {
            this.useBootstrap ? console.warn("cannot set boxWidth, useBootstrap is set to true") : (this.boxWidth = t, this.$jconfirmBox.css("width", t))
        },
        _parseColumnClass: function (t) {
            var n;
            switch (t = t.toLowerCase()) {
                case"xl":
                case"xlarge":
                    n = "col-md-12";
                    break;
                case"l":
                case"large":
                    n = "col-md-8 col-md-offset-2";
                    break;
                case"m":
                case"medium":
                    n = "col-md-6 col-md-offset-3";
                    break;
                case"s":
                case"small":
                    n = "col-md-4 col-md-offset-4";
                    break;
                case"xs":
                case"xsmall":
                    n = "col-md-2 col-md-offset-5";
                    break;
                default:
                    n = t
            }
            this.columnClassParsed = n
        },
        initDraggable: function () {
            var n = this, i = this.$titleContainer;
            this.resetDrag(), this.draggable && (i.on("mousedown", (function (t) {
                i.addClass("jconfirm-hand"), n.mouseX = t.clientX, n.mouseY = t.clientY, n.isDrag = !0
            })), t(window).on("mousemove." + this._id, (function (t) {
                n.isDrag && (n.movingX = t.clientX - n.mouseX + n.initialX, n.movingY = t.clientY - n.mouseY + n.initialY, n.setDrag())
            })), t(window).on("mouseup." + this._id, (function () {
                i.removeClass("jconfirm-hand"), n.isDrag && (n.isDrag = !1, n.initialX = n.movingX, n.initialY = n.movingY)
            })))
        },
        resetDrag: function () {
            this.isDrag = !1, this.initialX = 0, this.initialY = 0, this.movingX = 0, this.movingY = 0, this.mouseX = 0, this.mouseY = 0, this.$jconfirmBoxContainer.css("transform", "translate(0px, 0px)")
        },
        setDrag: function () {
            if (this.draggable) {
                this.alignMiddle = !1;
                var n = this.$jconfirmBox.outerWidth(), i = this.$jconfirmBox.outerHeight(), o = t(window).width(),
                    e = t(window).height(), s = this;
                if (s.movingX % 1 == 0 || s.movingY % 1 == 0) {
                    if (s.dragWindowBorder) {
                        var a = o / 2 - n / 2, c = e / 2 - i / 2;
                        c -= s.dragWindowGap, (a -= s.dragWindowGap) + s.movingX < 0 ? s.movingX = -a : a - s.movingX < 0 && (s.movingX = a), c + s.movingY < 0 ? s.movingY = -c : c - s.movingY < 0 && (s.movingY = c)
                    }
                    s.$jconfirmBoxContainer.css("transform", "translate(" + s.movingX + "px, " + s.movingY + "px)")
                }
            }
        },
        _scrollTop: function () {
            if ("undefined" != typeof pageYOffset) return pageYOffset;
            var t = document.body, n = document.documentElement;
            return (n = n.clientHeight ? n : t).scrollTop
        },
        _watchContent: function () {
            var n = this;
            this._timer && clearInterval(this._timer), this._timer = setInterval((function () {
                if (n.smoothContent) {
                    n.$content.outerHeight();
                    var i = t(window).height();
                    n.offsetTop + n.offsetBottom + n.$jconfirmBox.height() - n.$contentPane.height() + n.$content.height() < i ? n.$contentPane.addClass("no-scroll") : n.$contentPane.removeClass("no-scroll")
                }
            }), this.watchInterval)
        },
        _overflowClass: "jconfirm-overflow",
        _hilightAnimating: !1,
        highlight: function () {
            this.hiLightModal()
        },
        hiLightModal: function () {
            var t = this;
            if (!this._hilightAnimating) {
                t.$body.addClass("hilight");
                var n = parseFloat(t.$body.css("animation-duration")) || 2;
                this._hilightAnimating = !0, setTimeout((function () {
                    t._hilightAnimating = !1, t.$body.removeClass("hilight")
                }), 1e3 * n)
            }
        },
        _bindEvents: function () {
            var n = this;
            this.boxClicked = !1, this.$scrollPane.click((function (t) {
                if (!n.boxClicked) {
                    var i, o = !1, e = !1;
                    if ("string" == typeof (i = "function" == typeof n.backgroundDismiss ? n.backgroundDismiss() : n.backgroundDismiss) && void 0 !== n.buttons[i] ? (o = i, e = !1) : e = void 0 === i || 1 == !!i, o) {
                        var s = n.buttons[o].action.apply(n);
                        e = void 0 === s || !!s
                    }
                    e ? n.close() : n.hiLightModal()
                }
                n.boxClicked = !1
            })), this.$jconfirmBox.click((function (t) {
                n.boxClicked = !0
            }));
            var i = !1;
            t(window).on("jcKeyDown." + n._id, (function (t) {
                i || (i = !0)
            })), t(window).on("keyup." + n._id, (function (t) {
                i && (n.reactOnKey(t), i = !1)
            })), t(window).on("resize." + this._id, (function () {
                n._updateContentMaxHeight(), setTimeout((function () {
                    n.resetDrag()
                }), 100)
            }))
        },
        _cubic_bezier: "0.36, 0.55, 0.19",
        _getCSS: function (t, n) {
            return {
                "-webkit-transition-duration": t / 1e3 + "s",
                "transition-duration": t / 1e3 + "s",
                "-webkit-transition-timing-function": "cubic-bezier(" + this._cubic_bezier + ", " + n + ")",
                "transition-timing-function": "cubic-bezier(" + this._cubic_bezier + ", " + n + ")"
            }
        },
        _setButtons: function () {
            var n = this, i = 0;
            if ("object" != typeof this.buttons && (this.buttons = {}), t.each(this.buttons, (function (o, e) {
                i += 1, "function" == typeof e && (n.buttons[o] = e = {action: e}), n.buttons[o].text = e.text || o, n.buttons[o].btnClass = e.btnClass || "btn-default", n.buttons[o].action = e.action || function () {
                }, n.buttons[o].keys = e.keys || [], n.buttons[o].isHidden = e.isHidden || !1, n.buttons[o].isDisabled = e.isDisabled || !1, t.each(n.buttons[o].keys, (function (t, i) {
                    n.buttons[o].keys[t] = i.toLowerCase()
                }));
                var s = t('<button type="button" class="btn"></button>').html(n.buttons[o].text).addClass(n.buttons[o].btnClass).prop("disabled", n.buttons[o].isDisabled).css("display", n.buttons[o].isHidden ? "none" : "").click((function (t) {
                    t.preventDefault();
                    var i = n.buttons[o].action.apply(n, [n.buttons[o]]);
                    n.onAction.apply(n, [o, n.buttons[o]]), n._stopCountDown(), (void 0 === i || i) && n.close()
                }));
                n.buttons[o].el = s, n.buttons[o].setText = function (t) {
                    s.html(t)
                }, n.buttons[o].addClass = function (t) {
                    s.addClass(t)
                }, n.buttons[o].removeClass = function (t) {
                    s.removeClass(t)
                }, n.buttons[o].disable = function () {
                    n.buttons[o].isDisabled = !0, s.prop("disabled", !0)
                }, n.buttons[o].enable = function () {
                    n.buttons[o].isDisabled = !1, s.prop("disabled", !1)
                }, n.buttons[o].show = function () {
                    n.buttons[o].isHidden = !1, s.css("display", "")
                }, n.buttons[o].hide = function () {
                    n.buttons[o].isHidden = !0, s.css("display", "none")
                }, n["$_" + o] = n["$$" + o] = s, n.$btnc.append(s)
            })), 0 === i && this.$btnc.hide(), null === this.closeIcon && 0 === i && (this.closeIcon = !0), this.closeIcon) {
                if (this.closeIconClass) {
                    var o = '<i class="' + this.closeIconClass + '"></i>';
                    this.$closeIcon.html(o)
                }
                this.$closeIcon.click((function (t) {
                    t.preventDefault();
                    var i, o = !1, e = !1;
                    if ("string" == typeof (i = "function" == typeof n.closeIcon ? n.closeIcon() : n.closeIcon) && void 0 !== n.buttons[i] ? (o = i, e = !1) : e = void 0 === i || 1 == !!i, o) {
                        var s = n.buttons[o].action.apply(n);
                        e = void 0 === s || !!s
                    }
                    e && n.close()
                })), this.$closeIcon.show()
            } else this.$closeIcon.hide()
        },
        setTitle: function (t, n) {
            if (n = n || !1, void 0 !== t) if ("string" == typeof t) this.title = t; else if ("function" == typeof t) {
                "function" == typeof t.promise && console.error("Promise was returned from title function, this is not supported.");
                var i = t();
                this.title = "string" == typeof i && i
            } else this.title = !1;
            this.isAjaxLoading && !n || (this.$title.html(this.title || ""), this.updateTitleContainer())
        },
        setIcon: function (t, n) {
            if (n = n || !1, void 0 !== t) if ("string" == typeof t) this.icon = t; else if ("function" == typeof t) {
                var i = t();
                this.icon = "string" == typeof i && i
            } else this.icon = !1;
            this.isAjaxLoading && !n || (this.$icon.html(this.icon ? '<i class="' + this.icon + '"></i>' : ""), this.updateTitleContainer())
        },
        updateTitleContainer: function () {
            this.title || this.icon ? this.$titleContainer.show() : this.$titleContainer.hide()
        },
        setContentPrepend: function (t, n) {
            t && this.contentParsed.prepend(t)
        },
        setContentAppend: function (t) {
            t && this.contentParsed.append(t)
        },
        setContent: function (t, n) {
            n = !!n;
            var i = this;
            t && this.contentParsed.html("").append(t), this.isAjaxLoading && !n || (this.$content.html(""), this.$content.append(this.contentParsed), setTimeout((function () {
                i.$body.find("input[autofocus]:visible:first").focus()
            }), 100))
        },
        loadingSpinner: !1,
        showLoading: function (t) {
            this.loadingSpinner = !0, this.$jconfirmBox.addClass("loading"), t && this.$btnc.find("button").prop("disabled", !0)
        },
        hideLoading: function (t) {
            this.loadingSpinner = !1, this.$jconfirmBox.removeClass("loading"), t && this.$btnc.find("button").prop("disabled", !1)
        },
        ajaxResponse: !1,
        contentParsed: "",
        isAjax: !1,
        isAjaxLoading: !1,
        _parseContent: function () {
            var n = this, i = "&nbsp;";
            if ("function" == typeof this.content) {
                var o = this.content.apply(this);
                "string" == typeof o ? this.content = o : "object" == typeof o && "function" == typeof o.always ? (this.isAjax = !0, this.isAjaxLoading = !0, o.always((function (t, i, o) {
                    n.ajaxResponse = {
                        data: t,
                        status: i,
                        xhr: o
                    }, n._contentReady.resolve(t, i, o), "function" == typeof n.contentLoaded && n.contentLoaded(t, i, o)
                })), this.content = i) : this.content = i
            }
            if ("string" == typeof this.content && "url:" === this.content.substr(0, 4).toLowerCase()) {
                this.isAjax = !0, this.isAjaxLoading = !0;
                var e = this.content.substring(4, this.content.length);
                t.get(e).done((function (t) {
                    n.contentParsed.html(t)
                })).always((function (t, i, o) {
                    n.ajaxResponse = {
                        data: t,
                        status: i,
                        xhr: o
                    }, n._contentReady.resolve(t, i, o), "function" == typeof n.contentLoaded && n.contentLoaded(t, i, o)
                }))
            }
            this.content || (this.content = i), this.isAjax || (this.contentParsed.html(this.content), this.setContent(), n._contentReady.resolve())
        },
        _stopCountDown: function () {
            clearInterval(this.autoCloseInterval), this.$cd && this.$cd.remove()
        },
        _startCountDown: function () {
            var n = this, i = this.autoClose.split("|");
            if (2 !== i.length) return console.error("Invalid option for autoClose. example 'close|10000'"), !1;
            var o = i[0], e = parseInt(i[1]);
            if (void 0 === this.buttons[o]) return console.error("Invalid button key '" + o + "' for autoClose"), !1;
            var s = Math.ceil(e / 1e3);
            this.$cd = t('<span class="countdown"> (' + s + ")</span>").appendTo(this["$_" + o]), this.autoCloseInterval = setInterval((function () {
                n.$cd.html(" (" + (s -= 1) + ") "), s <= 0 && (n["$$" + o].trigger("click"), n._stopCountDown())
            }), 1e3)
        },
        _getKey: function (t) {
            switch (t) {
                case 192:
                    return "tilde";
                case 13:
                    return "enter";
                case 16:
                    return "shift";
                case 9:
                    return "tab";
                case 20:
                    return "capslock";
                case 17:
                    return "ctrl";
                case 91:
                    return "win";
                case 18:
                    return "alt";
                case 27:
                    return "esc";
                case 32:
                    return "space"
            }
            var n = String.fromCharCode(t);
            return !!/^[A-z0-9]+$/.test(n) && n.toLowerCase()
        },
        reactOnKey: function (n) {
            var i = this, o = t(".jconfirm");
            if (o.eq(o.length - 1)[0] !== this.$el[0]) return !1;
            var e = n.which;
            if (this.$content.find(":input").is(":focus") && /13|32/.test(e)) return !1;
            var s, a = this._getKey(e);
            "esc" === a && this.escapeKey && (!0 === this.escapeKey ? this.$scrollPane.trigger("click") : "string" != typeof this.escapeKey && "function" != typeof this.escapeKey || (s = "function" == typeof this.escapeKey ? this.escapeKey() : this.escapeKey) && (void 0 === this.buttons[s] ? console.warn("Invalid escapeKey, no buttons found with key " + s) : this["$_" + s].trigger("click"))), t.each(this.buttons, (function (t, n) {
                -1 !== n.keys.indexOf(a) && i["$_" + t].trigger("click")
            }))
        },
        setDialogCenter: function () {
            console.info("setDialogCenter is deprecated, dialogs are centered with CSS3 tables")
        },
        _unwatchContent: function () {
            clearInterval(this._timer)
        },
        close: function (i) {
            var o = this;
            return "function" == typeof this.onClose && this.onClose(i), this._unwatchContent(), t(window).unbind("resize." + this._id), t(window).unbind("keyup." + this._id), t(window).unbind("jcKeyDown." + this._id), this.draggable && (t(window).unbind("mousemove." + this._id), t(window).unbind("mouseup." + this._id), this.$titleContainer.unbind("mousedown")), o.$el.removeClass(o.loadedClass), t("body").removeClass("jconfirm-no-scroll-" + o._id), o.$jconfirmBoxContainer.removeClass("jconfirm-no-transition"), setTimeout((function () {
                o.$body.addClass(o.closeAnimationParsed), o.$jconfirmBg.addClass("jconfirm-bg-h");
                var i = "none" === o.closeAnimation ? 1 : o.animationSpeed;
                setTimeout((function () {
                    o.$el.remove(), n.jconfirm.instances;
                    for (var i = n.jconfirm.instances.length - 1; i >= 0; i--) n.jconfirm.instances[i]._id === o._id && n.jconfirm.instances.splice(i, 1);
                    if (!n.jconfirm.instances.length && o.scrollToPreviousElement && n.jconfirm.lastFocused && n.jconfirm.lastFocused.length && t.contains(document, n.jconfirm.lastFocused[0])) {
                        var e = n.jconfirm.lastFocused;
                        if (o.scrollToPreviousElementAnimate) {
                            var s = t(window).scrollTop(), a = n.jconfirm.lastFocused.offset().top,
                                c = t(window).height();
                            if (a > s && a < s + c) e.focus(); else {
                                var r = a - Math.round(c / 3);
                                t("html, body").animate({scrollTop: r}, o.animationSpeed, "swing", (function () {
                                    e.focus()
                                }))
                            }
                        } else e.focus();
                        n.jconfirm.lastFocused = !1
                    }
                    "function" == typeof o.onDestroy && o.onDestroy()
                }), .4 * i)
            }), 50), !0
        },
        open: function () {
            return !this.isOpen() && (this._buildHTML(), this._bindEvents(), this._open(), !0)
        },
        setStartingPoint: function () {
            var i = !1;
            if (!0 !== this.animateFromElement && this.animateFromElement) i = this.animateFromElement, n.jconfirm.lastClicked = !1; else {
                if (!n.jconfirm.lastClicked || !0 !== this.animateFromElement) return !1;
                i = n.jconfirm.lastClicked, n.jconfirm.lastClicked = !1
            }
            if (!i) return !1;
            var o = i.offset(), e = i.outerHeight() / 2, s = i.outerWidth() / 2;
            e -= this.$jconfirmBox.outerHeight() / 2, s -= this.$jconfirmBox.outerWidth() / 2;
            var a = o.top + e;
            a -= this._scrollTop();
            var c = o.left + s, r = t(window).height() / 2, l = t(window).width() / 2;
            if (a -= r - this.$jconfirmBox.outerHeight() / 2, c -= l - this.$jconfirmBox.outerWidth() / 2, Math.abs(a) > r || Math.abs(c) > l) return !1;
            this.$jconfirmBoxContainer.css("transform", "translate(" + c + "px, " + a + "px)")
        },
        _open: function () {
            var t = this;
            "function" == typeof t.onOpenBefore && t.onOpenBefore(), this.$body.removeClass(this.animationParsed), this.$jconfirmBg.removeClass("jconfirm-bg-h"), this.$body.focus(), t.$jconfirmBoxContainer.css("transform", "translate(0px, 0px)"), setTimeout((function () {
                t.$body.css(t._getCSS(t.animationSpeed, 1)), t.$body.css({"transition-property": t.$body.css("transition-property") + ", margin"}), t.$jconfirmBoxContainer.addClass("jconfirm-no-transition"), t._modalReady.resolve(), "function" == typeof t.onOpen && t.onOpen(), t.$el.addClass(t.loadedClass)
            }), this.animationSpeed)
        },
        loadedClass: "jconfirm-open",
        isClosed: function () {
            return !this.$el || 0 === this.$el.parent().length
        },
        isOpen: function () {
            return !this.isClosed()
        },
        toggle: function () {
            this.isOpen() ? this.close() : this.open()
        }
    }, n.jconfirm.instances = [], n.jconfirm.lastFocused = !1, n.jconfirm.pluginDefaults = {
        template: '<div class="jconfirm"><div class="jconfirm-bg jconfirm-bg-h"></div><div class="jconfirm-scrollpane"><div class="jconfirm-row"><div class="jconfirm-cell"><div class="jconfirm-holder"><div class="jc-bs3-container"><div class="jc-bs3-row"><div class="jconfirm-box-container jconfirm-animated"><div class="jconfirm-box" role="dialog" aria-labelledby="labelled" tabindex="-1"><div class="jconfirm-closeIcon">&times;</div><div class="jconfirm-title-c"><span class="jconfirm-icon-c"></span><span class="jconfirm-title"></span></div><div class="jconfirm-content-pane"><div class="jconfirm-content"></div></div><div class="jconfirm-buttons"></div><div class="jconfirm-clear"></div></div></div></div></div></div></div></div></div></div>',
        title: "Hello",
        titleClass: "",
        type: "default",
        typeAnimated: !0,
        draggable: !0,
        dragWindowGap: 15,
        dragWindowBorder: !0,
        animateFromElement: !0,
        alignMiddle: !0,
        smoothContent: !0,
        content: "Are you sure to continue?",
        buttons: {},
        defaultButtons: {
            ok: {
                action: function () {
                }
            }, close: {
                action: function () {
                }
            }
        },
        contentLoaded: function () {
        },
        icon: "",
        lazyOpen: !1,
        bgOpacity: null,
        theme: "light",
        animation: "scale",
        closeAnimation: "scale",
        animationSpeed: 400,
        animationBounce: 1,
        escapeKey: !0,
        rtl: !1,
        container: "body",
        containerFluid: !1,
        backgroundDismiss: !1,
        backgroundDismissAnimation: "shake",
        autoClose: !1,
        closeIcon: null,
        closeIconClass: !1,
        watchInterval: 100,
        columnClass: "col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1",
        boxWidth: "50%",
        scrollToPreviousElement: !0,
        scrollToPreviousElementAnimate: !0,
        useBootstrap: !0,
        offsetTop: 40,
        offsetBottom: 40,
        bootstrapClasses: {container: "container", containerFluid: "container-fluid", row: "row"},
        onContentReady: function () {
        },
        onOpenBefore: function () {
        },
        onOpen: function () {
        },
        onClose: function () {
        },
        onDestroy: function () {
        },
        onAction: function () {
        }
    };
    var i = !1;
    t(window).on("keydown", (function (n) {
        if (!i) {
            var o = !1;
            t(n.target).closest(".jconfirm-box").length && (o = !0), o && t(window).trigger("jcKeyDown"), i = !0
        }
    })), t(window).on("keyup", (function () {
        i = !1
    })), n.jconfirm.lastClicked = !1, t(document).on("mousedown", "button, a, [jc-source]", (function () {
        n.jconfirm.lastClicked = t(this)
    }))
}, (n = o).exports ? n.exports = function (n, o) {
    return void 0 === o && (o = "undefined" != typeof window ? t : t(n)), i(o), o
} : i(jQuery);
var e = o.exports;
export {e as default};
//# sourceMappingURL=/sm/e08b7778894a1fd06c499183c7ba56a9435f032d9f53bb5ee4764ae492bc721c.map
