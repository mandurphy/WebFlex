/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.17.1.
 * Original file: /npm/vue3-treeview@0.4.1/dist/vue3-treeview.es.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import vue from "../../../js/vue.build.js";
const {
    defineAsyncComponent : e,
    inject : t,
    ref : n,
    computed : l,
    watch : a,
    nextTick : o,
    onMounted : u,
    onUnmounted : r,
    toRefs : d,
    resolveComponent : i,
    openBlock : s,
    createBlock : c,
    Fragment : v,
    renderList : p,
    withCtx : f,
    renderSlot : h,
    createVNode : g,
    mergeProps : b,
    withKeys : y,
    withModifiers : k,
    createCommentVNode : m,
    withDirectives : x,
    vModelText : w,
    toDisplayString : C,
    Transition : I,
    provide : O
} = vue;

var j = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {},
    D = Object.defineProperty, N = Object.getOwnPropertySymbols, S = Object.prototype.hasOwnProperty,
    T = Object.prototype.propertyIsEnumerable,
    $ = (e, t, n) => t in e ? D(e, t, {enumerable: !0, configurable: !0, writable: !0, value: n}) : e[t] = n,
    L = (e, t) => {
        for (var n in t || (t = {})) S.call(t, n) && $(e, n, t[n]);
        if (N) for (var n of N(t)) T.call(t, n) && $(e, n, t[n]);
        return e
    },
    _ = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : void 0 !== j ? j : "undefined" != typeof self ? self : {};
var R = function (e) {
        return null == e
    }, B = 1 / 0, q = 17976931348623157e292, F = NaN, M = "[object Symbol]", E = /^\s+|\s+$/g, P = /^[-+]0x[0-9a-f]+$/i,
    z = /^0b[01]+$/i, A = /^0o[0-7]+$/i, V = parseInt, W = Object.prototype.toString;

function U(e) {
    var t = typeof e;
    return !!e && ("object" == t || "function" == t)
}

function J(e) {
    return e ? (e = function (e) {
        if ("number" == typeof e) return e;
        if (function (e) {
            return "symbol" == typeof e || function (e) {
                return !!e && "object" == typeof e
            }(e) && W.call(e) == M
        }(e)) return F;
        if (U(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = U(t) ? t + "" : t
        }
        if ("string" != typeof e) return 0 === e ? e : +e;
        e = e.replace(E, "");
        var n = z.test(e);
        return n || A.test(e) ? V(e.slice(2), n ? 2 : 8) : P.test(e) ? F : +e
    }(e)) === B || e === -B ? (e < 0 ? -1 : 1) * q : e == e ? e : 0 : 0 === e ? e : 0
}

var K = function (e) {
    var t = J(e), n = t % 1;
    return t == t ? n ? t - n : t : 0
};
const Y = 8, G = "black";

function H(e) {
    return {
        type: "shape",
        width: Y,
        height: Y,
        viewBox: "0 0 123.958 123.959",
        stroke: G,
        fill: G,
        draw: e,
        name: null,
        src: null,
        alt: null,
        style: null,
        class: null
    }
}

const Q = {
    roots: [],
    padding: 16,
    editable: !1,
    editing: null,
    checkboxes: !1,
    dragAndDrop: !1,
    keyboardNavigation: !1,
    openedIcon: H("M117.979,28.017h-112c-5.3,0-8,6.4-4.2,10.2l56,56c2.3,2.3,6.1,2.3,8.401,0l56-56C125.979,34.417,123.279,28.017,117.979,28.017z"),
    closedIcon: H("M38.217,1.779c-3.8-3.8-10.2-1.1-10.2,4.2v112c0,5.3,6.4,8,10.2,4.2l56-56c2.3-2.301,2.3-6.101,0-8.401L38.217,1.779z")
};
var X = (e, t) => {
    for (const [n, l] of t) e[n] = l;
    return e
};
var Z = X({
        components: {
            TreeNode: e((() => Promise.resolve().then((function () {
                return _e
            }))))
        },
        props: {depth: {required: !0, type: Number, default: null}, parentId: {type: String, default: null}},
        setup: e => L({}, function (e) {
            const a = t("state"), o = a.config, u = a.nodes, r = n(e.depth), d = n(e.parentId), i = l((() => {
                const e = [];
                if (R(d.value) && o.value.roots && 0 === r.value) {
                    for (const t of o.value.roots) s(t, e);
                    return e
                }
                if (!R(d.value)) {
                    const t = u.value[d.value];
                    if (t && t.children && t.children.length > 0) for (const n of t.children) s(n, e);
                    return e
                }
                return []
            })), s = (e, t) => {
                u.value[e] && (u.value[e].id = e, u.value[e].parent = d.value, t.push(u.value[e]))
            }, c = l((() => (new Date).valueOf())), v = l((() => {
                if (0 === r.value) return 0;
                if (R(o.value.padding)) return Q.padding;
                const e = K(o.value.padding);
                return e >= 0 ? e : 0
            })), p = l((() => ({"padding-left": `${v.value}px`, "list-style": "none"})));
            return {id: c, level: i, padding: v, style: p}
        }(e))
    }, [["render", function (e, t, n, l, a, o) {
        const u = i("TreeNode");
        return s(), c("ul", {
            class: "tree-level",
            id: e.id,
            style: e.style
        }, [(s(!0), c(v, null, p(e.level, ((t, l) => (s(), c(u, {
            key: t.id,
            node: t,
            depth: n.depth,
            index: l,
            "parent-id": n.parentId
        }, {
            "loading-slot": f((t => [h(e.$slots, "loading-slot", {node: t.node})])),
            "before-input": f((t => [h(e.$slots, "before-input", {node: t.node})])),
            "after-input": f((t => [h(e.$slots, "after-input", {node: t.node})])),
            _: 2
        }, 1032, ["node", "depth", "index", "parent-id"])))), 128))], 12, ["id"])
    }]]), ee = Object.freeze({__proto__: null, [Symbol.toStringTag]: "Module", default: Z}), te = 1 / 0,
    ne = "[object Symbol]", le = "object" == typeof _ && _ && _.Object === Object && _,
    ae = "object" == typeof self && self && self.Object === Object && self, oe = le || ae || Function("return this")(),
    ue = Object.prototype, re = 0, de = ue.toString, ie = oe.Symbol, se = ie ? ie.prototype : void 0,
    ce = se ? se.toString : void 0;

function ve(e) {
    if ("string" == typeof e) return e;
    if (function (e) {
        return "symbol" == typeof e || function (e) {
            return !!e && "object" == typeof e
        }(e) && de.call(e) == ne
    }(e)) return ce ? ce.call(e) : "";
    var t = e + "";
    return "0" == t && 1 / e == -te ? "-0" : t
}

var pe = function (e) {
    var t, n = ++re;
    return (null == (t = e) ? "" : ve(t)) + n
};
const fe = new Map;

function he(e, t) {
    const a = n(null), o = function (e) {
        const {nodes: t, config: a} = d(e), o = {
            id: pe(),
            nodes: l((() => t.value)),
            config: l((() => a.value)),
            focusable: n(null),
            focusFunc: new Map,
            dragged: n({node: null, element: null, wrapper: null, parentId: null})
        };
        return fe.set(o.id, o), o.id
    }(e), u = fe.get(o);
    O("emitter", t), O("state", u);
    const i = l((() => ({display: "flex", "align-items": "center"})));
    return r((() => {
        fe.delete(o)
    })), {element: a, style: i}
}

var ge = X({
    components: {TreeLevel: Z}, props: {
        nodes: {
            required: !0, type: Object, default: () => {
            }
        }, config: {
            required: !0, type: Object, default: () => {
            }
        }
    }, setup: (e, {emit: t}) => L({}, he(e, t)), methods: {
        setElementRef(e) {
            this.element = e
        }
    }
}, [["render", function (e, t, n, l, a, o) {
    const u = i("TreeLevel");
    return s(), c("div", {class: "tree", ref: o.setElementRef, style: e.style}, [g(u, b({
        depth: 0,
        "parent-id": null
    }, e.$attrs), {
        "loading-slot": f((t => [h(e.$slots, "loading-slot", {node: t.node})])),
        "before-input": f((t => [h(e.$slots, "before-input", {node: t.node})])),
        "after-input": f((t => [h(e.$slots, "after-input", {node: t.node})])),
        _: 1
    }, 16)], 4)
}]]);
var be = function (e, t) {
    return e === t || e != e && t != t
};
const ye = {
    opened: "nodeOpened",
    closed: "nodeClosed",
    focus: "nodeFocus",
    toggle: "nodeToggle",
    blur: "nodeBlur",
    edit: "nodeEdit"
}, ke = {checked: "nodeChecked", unchecked: "nodeUnchecked"}, me = {
    start: "nodeDragstart",
    end: "nodeDragend",
    enter: "nodeDragenter",
    leave: "nodeDragleave",
    over: "nodeOver",
    drop: "nodeDrop"
};
var xe, we, Ce, Ie, Oe = X({
    components: {
        Icon: X({props: {icon: {required: !0, type: Object}}}, [["render", function (e, t, n, l, a, o) {
            return "shape" === n.icon.type ? (s(), c("svg", {
                key: 0,
                xmlns: "http://www.w3.org/2000/svg",
                width: n.icon.width,
                height: n.icon.height,
                class: n.icon.class,
                style: n.icon.style,
                viewBox: n.icon.viewBox
            }, [g("path", {
                d: n.icon.draw,
                fill: n.icon.fill,
                stroke: n.icon.stroke,
                "stroke-width": n.icon.strokeWidth
            }, null, 8, ["d", "fill", "stroke", "stroke-width"])], 14, ["width", "height", "viewBox"])) : "class" === n.icon.type ? (s(), c("i", {
                key: 1,
                class: n.icon.class,
                style: n.icon.style
            }, null, 6)) : "img" === n.icon.type ? (s(), c("img", {
                key: 2,
                src: n.icon.src,
                alt: n.icon.alt,
                width: n.icon.width,
                height: n.icon.height,
                class: n.icon.class,
                style: n.icon.style
            }, null, 14, ["src", "alt", "width", "height"])) : m("", !0)
        }]])
    }, props: {isLeaf: {type: Boolean}, opened: {type: Boolean}}, setup: e => function (e) {
        const {isLeaf: n} = d(e), a = t("state").config, o = l((() => a.value.openedIcon || Q.openedIcon)),
            u = l((() => a.value.closedIcon || Q.closedIcon)), r = l((() => !R(u.value) && !R(o.value))),
            i = l((() => !n.value && r.value)), s = l((() => ({width: `${Y}px`, height: `${Y}px`})));
        return {hasIcons: r, openedIcon: o, closedIcon: u, useIcons: i, fakeNodeStyle: s}
    }(e), computed: {fakeIcon: () => H(null)}
}, [["render", function (e, t, n, l, a, o) {
    const u = i("Icon");
    return e.useIcons ? (s(), c(v, {key: 0}, [n.opened ? (s(), c(u, {
        key: 0,
        icon: e.openedIcon
    }, null, 8, ["icon"])) : (s(), c(u, {key: 1, icon: e.closedIcon}, null, 8, ["icon"]))], 64)) : (s(), c(u, {
        key: 1,
        icon: o.fakeIcon
    }, null, 8, ["icon"]))
}]]);

function je(e, t) {
    const d = e.state, i = e.node, s = e.config, c = e.wrapper, v = e.editing, p = n(null), f = n(t.depth),
        h = n(t.index);
    i.value.children || (i.value.children = n([]).value);
    const g = l((() => b.value && i.value.id)), b = l((() => !R(i))), y = l((() => b.value && !R(i.value.state))),
        k = l((() => s.value.roots || [])), m = l((() => R(i.value.children) ? [] : i.value.children)),
        x = l((() => m.value.length)), w = l((() => x.value > 0)), C = l((() => y.value && i.value.state.opened || !1)),
        I = l((() => y.value && i.value.state.isLoading || !1)), O = l((() => I.value && !w.value && C.value)),
        j = l((() => !I.value && w.value && C.value)), D = l((() => ({display: "flex"}))),
        N = l((() => e.disabled.value ? s.value.disabledClass ? s.value.disabledClass : "disabled" : null)),
        S = l((() => {
            for (const e of k.value) {
                const t = d.nodes.value[e];
                if (t.children && t.children.length > 0) return !1
            }
            return !0
        })), T = l((() => {
            if (s.value.leaves instanceof Array) {
                const e = s.value.leaves.indexOf(g.value);
                return Number.isFinite(e) && e >= 0
            }
            return !w.value
        })), $ = l((() => d.focusable.value === i.value.id)),
        L = l((() => 0 === f.value && 0 === h.value && R(d.focusable.value) || $.value ? 0 : -1)),
        _ = l((() => e.focused.value ? s.value.focusClass ? s.value.focusClass : "focused" : null));
    a(C, (t => {
        t ? e.root.emit(ye.opened, i.value) : e.root.emit(ye.closed, i.value)
    }));
    const B = () => {
        d.focusable.value = i.value.id, o((() => {
            c.value.focus(), e.focused.value = !0, e.root.emit(ye.focus, i.value)
        }))
    }, q = e => {
        const t = e(i.value.id);
        if (!R(t) && s.value.keyboardNavigation) {
            const e = d.focusFunc.get(t);
            e && e()
        }
    }, F = e => {
        const t = d.nodes.value[e], n = d.nodes.value[t.parent];
        if (!n) {
            const t = k.value.indexOf(e);
            return M(k.value[t - 1]) || null
        }
        return (e => {
            const t = d.nodes.value[e];
            if (t.children && t.children.length > 0) {
                const e = t.children.indexOf(i.value.id), n = t.children[e - 1];
                if (!R(n)) return M(n)
            }
            return t.id
        })(n.id)
    }, M = e => {
        const t = d.nodes.value[e];
        if (!t) return null;
        if (t.children && t.children.length > 0 && t.state.opened) {
            const e = t.children[t.children.length - 1];
            if (!R(e)) return M(e)
        }
        return t.id
    }, E = e => {
        const t = k.value.indexOf(e);
        return k.value[t + 1] || null
    }, P = (e, t) => {
        const n = e.children.indexOf(t);
        return e.children[n + 1] ? e.children[n + 1] : e.parent ? P(d.nodes.value[e.parent], e.id) : E(e.id)
    }, z = e => {
        const t = d.nodes.value[e];
        if (t.children && t.children.length > 0 && t.state.opened) return t.children[0];
        const n = d.nodes.value[t.parent];
        return n ? P(n, e) : E(e)
    };
    return u((() => {
        d.focusFunc.set(i.value.id, B)
    })), r((() => {
        d.focusFunc.delete(i.value.id)
    })), {
        id: g,
        level: p,
        style: D,
        opened: C,
        hasNode: b,
        hideIcons: S,
        hasChildren: w,
        tabIndex: L,
        focusClass: _,
        disabledClass: N,
        isLeaf: T,
        isLoading: I,
        displayLoading: O,
        displayLevel: j,
        right: () => {
            !v.value && s.value.keyboardNavigation && (i.value.state.opened = !0)
        },
        left: () => {
            !v.value && s.value.keyboardNavigation && (i.value.state.opened = !1)
        },
        up: () => q(F),
        down: () => q(z),
        toggle: () => {
            i.value.state.opened = !i.value.state.opened, e.root.emit(ye.toggle, i.value)
        },
        focus: B,
        prevVisible: F,
        nextVisible: z
    }
}

function De(e) {
    R(e.state) && (e.state = {}, e.state.checked = !1)
}

function Ne(e, t) {
    const n = t => {
            e.value.state.checked = t
        }, a = t => {
            e.value.state.indeterminate = t
        }, o = l((() => e.value.children)), u = l((() => !R(o.value) && o.value.length > 0 || !1)), r = l((() => {
            if (!u.value) return [];
            const e = [];
            for (const n of o.value) {
                const l = t.value[n];
                R(l) || (De(l), e.push(l.state))
            }
            return e
        })), d = l((() => e.value.state.checked)), i = l((() => e.value.state.indeterminate)),
        s = l((() => r.value.every((e => e.checked)))), c = l((() => r.value.every((e => !e.checked)))),
        v = l((() => !s.value && !c.value)), p = l((() => r.value.some((e => e.indeterminate)))), f = e => {
            if (!R(e.state) && !R(e.children)) for (const n of e.children) {
                const l = t.value[n];
                R(l) || (De(l), l.state.indeterminate = !1, l.state.checked = e.state.checked, f(l))
            }
        }, h = () => {
            if (u.value) {
                if (c.value && !p.value) return a(!1), void n(!1);
                if (s.value) return a(!1), void n(!0);
                a(!0), n(!1)
            }
        };
    return {
        checked: d,
        indeterminate: i,
        noneChecked: c,
        someChecked: v,
        allChecked: s,
        someIndeterminate: p,
        click: () => {
            a(!1), n(!e.value.state.checked)
        },
        rebuild: () => {
            De(e.value), !e.value.state.checked && u.value || a(!1), f(e.value), h()
        },
        updateState: h,
        recurseDown: f
    }
}

function Se(e) {
    const t = e.node, n = e.config, o = e.state.nodes,
        u = l((() => n.value.checkMode === xe.auto ? xe.auto : xe.manual)),
        r = l((() => u.value === xe.auto ? Ne(t, o) : function (e) {
            return {
                checked: l((() => e.value.state.checked)),
                indeterminate: l((() => e.value.state.indeterminate || !1)),
                noneChecked: l((() => !1)),
                someChecked: l((() => !1)),
                allChecked: l((() => !1)),
                someIndeterminate: l((() => !1)),
                click: () => {
                    e.value.state.checked = !e.value.state.checked
                },
                rebuild: () => {
                },
                updateState: () => {
                },
                recurseDown: () => {
                }
            }
        }(t)));
    a(u, ((e, t) => {
        be(e, t) || r.value.rebuild()
    }));
    const d = l((() => r.value.checked.value)), i = l((() => r.value.indeterminate.value)),
        s = l((() => n.value.checkboxes || Q.checkboxes)),
        c = l((() => [r.value.checked.value ? n.value.checkedClass ? n.value.checkedClass : "checked" : null, r.value.indeterminate.value ? n.value.indeterminateClass ? n.value.indeterminateClass : "indeterminate" : null])),
        v = l((() => r.value.allChecked.value)), p = l((() => r.value.noneChecked.value)),
        f = l((() => r.value.someChecked.value)), h = l((() => r.value.someIndeterminate.value));
    a([v, p, f], (([e, t, n]) => {
        (e || t || n) && r.value.updateState()
    }), {deep: !0}), a(h, ((e, t) => {
        be(e, t) || r.value.updateState()
    }), {deep: !0});
    const g = () => {
        e.disabled.value || (r.value.click(), r.value.recurseDown(t.value), e.root.emit(d.value ? ke.checked : ke.unchecked, t.value))
    };
    return {
        checked: d, hasCheckbox: s, indeterminate: i, checkedClass: c, space: () => {
            !e.editing.value && n.value.checkboxes && n.value.keyboardNavigation && g()
        }, clickCheckbox: g
    }
}

(we = xe || (xe = {}))[we.auto = 0] = "auto", we[we.manual = 1] = "manual", (Ie = Ce || (Ce = {}))[Ie.over = 0] = "over", Ie[Ie.in = 1] = "in", Ie[Ie.under = 2] = "under";
const Te = {
    components: {
        TreeLevel: e((() => Promise.resolve().then((function () {
            return ee
        })))), TreeIcons: Oe
    },
    emits: [...Object.values(ye), ...Object.values(ke), ...Object.values(me)],
    props: {
        depth: {required: !0, type: Number},
        index: {required: !0, type: Number},
        node: {required: !0, type: Object},
        parentId: {default: null, type: String}
    },
    setup(e) {
        const u = function (e) {
            const {node: a} = d(e), o = t("state"), u = o.config, r = n(null), i = n(!1), s = {emit: t("emitter")};
            De(a.value);
            const c = l((() => !R(a))), v = l((() => !R(u.value))), p = l((() => c.value && !R(a.value.state))),
                f = l((() => u.value.disabled || a.value.state.disabled)),
                h = l((() => u.value.editable && (!!R(a.value.state.editable) || a.value.state.editable) || Q.editable)),
                g = l((() => h.value && u.value.editing === a.value.id));
            return {
                state: o,
                node: a,
                config: u,
                hasNode: c,
                hasState: p,
                hasConfig: v,
                disabled: f,
                wrapper: r,
                editable: h,
                editing: g,
                focused: i,
                blur: e => {
                    if ("blur" === e.type) {
                        const t = e.currentTarget, n = e.relatedTarget;
                        t.contains(n) || (u.value.editing = null, i.value = !1, s.emit(ye.blur, e, a.value))
                    }
                },
                root: s
            }
        }(e);
        return L(L(L(L(L({}, u), function (e) {
            const t = e.node, u = e.config, r = e.wrapper, d = e.editable, i = e.editing, s = n(null),
                c = l({get: () => t.value.text, set: e => t.value.text = e}),
                v = l((() => e.editable.value ? u.value.editableClass ? u.value.editableClass : "editable" : null));
            a(i, ((e, t) => {
                !be(e, t) && e && o((() => {
                    s.value.focus()
                }))
            }));
            const p = () => {
                d.value && !e.disabled.value && (u.value.editing = t.value.id, e.root.emit(ye.edit, t.value))
            };
            return {
                text: c, input: s, editing: i, editable: d, editableClass: v, focusInput: p, esc: t => {
                    d.value && u.value.keyboardNavigation && (e.blur(t), r.value.focus())
                }, enter: () => {
                    d.value && !e.disabled.value && u.value.keyboardNavigation && p()
                }
            }
        }(u)), Se(u)), je(u, e)), function (e, t) {
            const a = e.node, o = e.state, u = n(t.parentId), r = e.config, d = o.nodes, i = n(o.dragged),
                s = e.wrapper, c = n(null), v = n(null),
                p = l((() => !e.disabled.value && r.value.dragAndDrop && !1 !== a.value.state.draggable)),
                f = l((() => r.value.dragAndDrop && !1 !== a.value.state.dropable)),
                h = l((() => !R(i.value) && !R(i.value.node))),
                g = l((() => h.value && i.value.node.id === a.value.id)), b = l((() => m.value === y.value)),
                y = l((() => h.value && i.value.parentId ? O(i.value.parentId) : null)), k = l((() => j(y.value))),
                m = l((() => R(u.value) ? null : O(u.value))), x = l((() => j(m.value))),
                w = l((() => !(!h.value || !i.value.wrapper) && i.value.element.contains(c.value))), C = l((() => ({
                    dragged: i.value,
                    target: {node: a.value.id, element: c.value, wrapper: s.value, parentId: u.value}
                }))),
                I = l((() => [p.value ? "draggable" : null, f.value ? "droppable" : null, 0 === v.value ? "node-over" : null, 1 === v.value ? "node-in" : null, 2 === v.value ? "node-under" : null])),
                O = e => R(e) ? null : d.value[e], j = e => R(e) ? r.value.roots : e.children, D = e => {
                    if (!e || !e.dataTransfer) return null;
                    const t = e.dataTransfer.getData("application/json");
                    return t ? JSON.parse(t) : e.dataTransfer.getData("text/plain")
                }, N = e => {
                    var t, n;
                    return (null == (n = null == (t = null == e ? void 0 : e.dataTransfer) ? void 0 : t.items) ? void 0 : n.length) > 0
                }, S = e => ({evt: e, external: N(e), dataTransfer: D(e)}), T = e => {
                    if (h.value) {
                        const t = i.value.node.id, n = k.value.indexOf(t);
                        k.value.splice(n, 1);
                        const l = a.value.id, o = x.value.indexOf(l);
                        x.value.splice(o + e, 0, t)
                    }
                }, $ = () => {
                    if (h.value && f.value) {
                        const e = i.value.node.id;
                        if (k.value) {
                            const t = k.value.indexOf(e);
                            k.value.splice(t, 1)
                        }
                        a.value.children.unshift(e)
                    }
                };
            return {
                pos: v, element: c, dragClass: I, draggable: p, droppable: f, dragstart: t => {
                    p.value && (i.value = {
                        node: a.value,
                        element: c.value,
                        wrapper: s.value,
                        parentId: u.value
                    }, e.root.emit(me.start, L(L({}, C.value), S(t))))
                }, dragend: t => {
                    e.root.emit(me.end, L(L({}, C.value), S(t))), i.value = null
                }, dragenter: t => {
                    e.root.emit(me.enter, L(L({}, C.value), S(t)))
                }, dragleave: t => {
                    e.root.emit(me.leave, L(L({}, C.value), S(t))), v.value = null
                }, dragover: t => {
                    if (!g.value && !w.value) {
                        const n = N(t);
                        if (!h.value && !n) return;
                        if (e.root.emit(me.over, L(L({}, C.value), S(t))), !n && s.value) {
                            const e = .3, n = t.pageY, l = s.value.getBoundingClientRect(), o = l.top + l.height / 2,
                                u = [o - l.height * e, o + l.height * e], r = k.value.indexOf(a.value.id),
                                d = k.value.indexOf(i.value.node.id);
                            n < u[0] && (!b.value || b.value && r !== d + 1) ? v.value = 0 : n > u[1] && (!b.value || b.value && r !== d - 1) ? v.value = 2 : v.value = 1
                        }
                    }
                }, drop: t => {
                    if (!g.value && !w.value) switch (v.value) {
                        case 0:
                            T(0);
                            break;
                        case 2:
                            T(1);
                            break;
                        case 1:
                            $()
                    }
                    e.root.emit(me.drop, L(L({}, C.value), S(t))), v.value = null
                }
            }
        }(u, e))
    },
    computed: {
        nodeClass() {
            return [this.focusClass, this.disabledClass, this.checkedClass, this.editableClass, this.dragClass]
        }
    },
    methods: {
        setWrapperRef(e) {
            this.wrapper = e
        }, setLevelRef(e) {
            this.level = e
        }, setElementRef(e) {
            this.element = e
        }, setInputRef(e) {
            this.input = e
        }
    }
}, $e = {class: "input-wrapper"};
var Le = X(Te, [["render", function (e, t, n, l, a, o) {
    const u = i("TreeIcons"), r = i("TreeLevel");
    return e.hasNode ? (s(), c("li", {
        key: 0,
        class: "tree-node",
        ref: o.setElementRef,
        "aria-expanded": e.opened,
        onKeydown: [t[14] || (t[14] = y(k(((...t) => e.enter && e.enter(...t)), ["stop"]), ["enter"])), t[15] || (t[15] = y(k(((...t) => e.esc && e.esc(...t)), ["stop"]), ["esc"])), t[16] || (t[16] = y(k(((...t) => e.space && e.space(...t)), ["stop"]), ["space"])), t[17] || (t[17] = y(k(((...t) => e.left && e.left(...t)), ["stop"]), ["left"])), t[18] || (t[18] = y(k(((...t) => e.right && e.right(...t)), ["stop"]), ["right"])), t[19] || (t[19] = y(k(((...t) => e.up && e.up(...t)), ["stop"]), ["up"])), t[20] || (t[20] = y(k(((...t) => e.down && e.down(...t)), ["stop"]), ["down"]))]
    }, [g("div", {
        class: ["node-wrapper", o.nodeClass],
        style: e.style,
        ref: o.setWrapperRef,
        draggable: e.draggable,
        tabindex: e.tabIndex,
        onBlur: t[6] || (t[6] = (...t) => e.blur && e.blur(...t)),
        onClick: t[7] || (t[7] = k(((...t) => e.focus && e.focus(...t)), ["stop"])),
        onDragstart: t[8] || (t[8] = k(((...t) => e.dragstart && e.dragstart(...t)), ["stop"])),
        onDragend: t[9] || (t[9] = k(((...t) => e.dragend && e.dragend(...t)), ["stop"])),
        onDragenter: t[10] || (t[10] = k(((...t) => e.dragenter && e.dragenter(...t)), ["prevent", "stop"])),
        onDragleave: t[11] || (t[11] = k(((...t) => e.dragleave && e.dragleave(...t)), ["prevent", "stop"])),
        onDragover: t[12] || (t[12] = k(((...t) => e.dragover && e.dragover(...t)), ["prevent", "stop"])),
        onDrop: t[13] || (t[13] = k(((...t) => e.drop && e.drop(...t)), ["prevent", "stop"]))
    }, [e.hideIcons ? m("", !0) : (s(), c("div", {
        key: 0,
        class: "icon-wrapper",
        onClick: t[1] || (t[1] = k(((...t) => e.toggle && e.toggle(...t)), ["stop"]))
    }, [g(u, {
        "is-leaf": e.isLeaf,
        opened: e.opened
    }, null, 8, ["is-leaf", "opened"])])), e.hasCheckbox ? (s(), c("div", {
        key: 1,
        class: ["checkbox-wrapper", e.checkedClass],
        onClick: t[2] || (t[2] = k(((...t) => e.clickCheckbox && e.clickCheckbox(...t)), ["stop"]))
    }, [g("input", {
        type: "checkbox",
        tabindex: "-1",
        class: "node-checkbox",
        checked: e.checked,
        disabled: e.disabled,
        indeterminate: e.indeterminate
    }, null, 8, ["checked", "disabled", "indeterminate"])], 2)) : m("", !0), h(e.$slots, "before-input", {node: n.node}), g("div", $e, [e.editing ? x((s(), c("input", {
        key: 0,
        type: "text",
        tabindex: "0",
        class: "node-input",
        "onUpdate:modelValue": t[3] || (t[3] = t => e.text = t),
        ref: o.setInputRef,
        disabled: e.disabled,
        onBlur: t[4] || (t[4] = (...t) => e.blur && e.blur(...t))
    }, null, 40, ["disabled"])), [[w, e.text]]) : (s(), c("span", {
        key: 1,
        class: "node-text",
        onDblclick: t[5] || (t[5] = (...t) => e.focusInput && e.focusInput(...t))
    }, C(e.text), 33))]), h(e.$slots, "after-input", {node: n.node})], 46, ["draggable", "tabindex"]), e.displayLoading ? h(e.$slots, "loading-slot", {
        key: 0,
        node: n.node
    }) : m("", !0), g(I, {name: "level"}, {
        default: f((() => [e.displayLevel ? (s(), c(r, {
            key: 0,
            "parent-id": e.id,
            depth: n.depth + 1,
            ref: o.setLevelRef
        }, {
            "loading-slot": f((t => [h(e.$slots, "loading-slot", {node: t.node})])),
            "before-input": f((t => [h(e.$slots, "before-input", {node: t.node})])),
            "after-input": f((t => [h(e.$slots, "after-input", {node: t.node})])),
            _: 1
        }, 8, ["parent-id", "depth"])) : m("", !0)])), _: 1
    })], 40, ["aria-expanded"])) : m("", !0)
}]]), _e = Object.freeze({__proto__: null, [Symbol.toStringTag]: "Module", default: Le});
export {ge as default};
//# sourceMappingURL=/sm/bf22c2af249fb834e5beab96ba28596f3af28f54bf91c597d2f1a60e88217c96.map
