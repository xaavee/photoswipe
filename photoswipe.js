/*!
 * PhotoSwipe 5.4.4 - https://photoswipe.com
 * (c) 2024 Dmytro Semenov
 */
!(function (t, i) {
    "object" == typeof exports && "undefined" != typeof module ? (module.exports = i()) : "function" == typeof define && define.amd ? define(i) : ((t = "undefined" != typeof globalThis ? globalThis : t || self).PhotoSwipe = i());
})(this, function () {
    "use strict";
    function t(t, i, s) {
        const h = document.createElement(i);
        return t && (h.className = t), s && s.appendChild(h), h;
    }
    function i(t, i) {
        return (t.x = i.x), (t.y = i.y), void 0 !== i.id && (t.id = i.id), t;
    }
    function s(t) {
        (t.x = Math.round(t.x)), (t.y = Math.round(t.y));
    }
    function h(t, i) {
        const s = Math.abs(t.x - i.x),
            h = Math.abs(t.y - i.y);
        return Math.sqrt(s * s + h * h);
    }
    function e(t, i) {
        return t.x === i.x && t.y === i.y;
    }
    function n(t, i, s) {
        return Math.min(Math.max(t, i), s);
    }
    function o(t, i, s) {
        let h = `translate3d(${t}px,${i || 0}px,0)`;
        return void 0 !== s && (h += ` scale3d(${s},${s},1)`), h;
    }
    function r(t, i, s, h) {
        t.style.transform = o(i, s, h);
    }
    function a(t, i, s, h) {
        t.style.transition = i ? `${i} ${s}ms ${h || "cubic-bezier(.4,0,.22,1)"}` : "none";
    }
    function l(t, i, s) {
        (t.style.width = "number" == typeof i ? `${i}px` : i), (t.style.height = "number" == typeof s ? `${s}px` : s);
    }
    const c = "idle",
        d = "loading",
        u = "loaded",
        p = "error";
    function m() {
        return !(!navigator.vendor || !navigator.vendor.match(/apple/i));
    }
    let v = !1;
    try {
        window.addEventListener(
            "test",
            null,
            Object.defineProperty({}, "passive", {
                get: () => {
                    v = !0;
                },
            })
        );
    } catch (t) {}
    class f {
        constructor() {
            this.t = [];
        }
        add(t, i, s, h) {
            this.i(t, i, s, h);
        }
        remove(t, i, s, h) {
            this.i(t, i, s, h, !0);
        }
        removeAll() {
            this.t.forEach((t) => {
                this.i(t.target, t.type, t.listener, t.passive, !0, !0);
            }),
                (this.t = []);
        }
        i(t, i, s, h, e, n) {
            if (!t) return;
            const o = e ? "removeEventListener" : "addEventListener";
            i.split(" ").forEach((i) => {
                if (i) {
                    n || (e ? (this.t = this.t.filter((h) => h.type !== i || h.listener !== s || h.target !== t)) : this.t.push({ target: t, type: i, listener: s, passive: h }));
                    const r = !!v && { passive: h || !1 };
                    t[o](i, s, r);
                }
            });
        }
    }
    function w(t, i) {
        if (t.getViewportSizeFn) {
            const s = t.getViewportSizeFn(t, i);
            if (s) return s;
        }
        return { x: document.documentElement.clientWidth, y: window.innerHeight };
    }
    function g(t, i, s, h, e) {
        let n = 0;
        if (i.paddingFn) n = i.paddingFn(s, h, e)[t];
        else if (i.padding) n = i.padding[t];
        else {
            const s = "padding" + t[0].toUpperCase() + t.slice(1);
            i[s] && (n = i[s]);
        }
        return Number(n) || 0;
    }
    function y(t, i, s, h) {
        return { x: i.x - g("left", t, i, s, h) - g("right", t, i, s, h), y: i.y - g("top", t, i, s, h) - g("bottom", t, i, s, h) };
    }
    class _ {
        constructor(t) {
            (this.slide = t), (this.currZoomLevel = 1), (this.center = { x: 0, y: 0 }), (this.max = { x: 0, y: 0 }), (this.min = { x: 0, y: 0 });
        }
        update(t) {
            (this.currZoomLevel = t), this.slide.width ? (this.o("x"), this.o("y"), this.slide.pswp.dispatch("calcBounds", { slide: this.slide })) : this.reset();
        }
        o(t) {
            const { pswp: i } = this.slide,
                s = this.slide["x" === t ? "width" : "height"] * this.currZoomLevel,
                h = g("x" === t ? "left" : "top", i.options, i.viewportSize, this.slide.data, this.slide.index),
                e = this.slide.panAreaSize[t];
            (this.center[t] = Math.round((e - s) / 2) + h), (this.max[t] = s > e ? Math.round(e - s) + h : this.center[t]), (this.min[t] = s > e ? h : this.center[t]);
        }
        reset() {
            (this.center.x = 0), (this.center.y = 0), (this.max.x = 0), (this.max.y = 0), (this.min.x = 0), (this.min.y = 0);
        }
        correctPan(t, i) {
            return n(i, this.max[t], this.min[t]);
        }
    }
    class x {
        constructor(t, i, s, h) {
            (this.pswp = h),
                (this.options = t),
                (this.itemData = i),
                (this.index = s),
                (this.panAreaSize = null),
                (this.elementSize = null),
                (this.fit = 1),
                (this.fill = 1),
                (this.vFill = 1),
                (this.initial = 1),
                (this.secondary = 1),
                (this.max = 1),
                (this.min = 1);
        }
        update(t, i, s) {
            const h = { x: t, y: i };
            (this.elementSize = h), (this.panAreaSize = s);
            const e = s.x / h.x,
                n = s.y / h.y;
            (this.fit = Math.min(1, e < n ? e : n)),
                (this.fill = Math.min(1, e > n ? e : n)),
                (this.vFill = Math.min(1, n)),
                (this.initial = this.l()),
                (this.secondary = this.u()),
                (this.max = Math.max(this.initial, this.secondary, this.p())),
                (this.min = Math.min(this.fit, this.initial, this.secondary)),
                this.pswp && this.pswp.dispatch("zoomLevelsUpdate", { zoomLevels: this, slideData: this.itemData });
        }
        m(t) {
            const i = t + "ZoomLevel",
                s = this.options[i];
            if (s) return "function" == typeof s ? s(this) : "fill" === s ? this.fill : "fit" === s ? this.fit : Number(s);
        }
        u() {
            let t = this.m("secondary");
            return t || ((t = Math.min(1, 3 * this.fit)), this.elementSize && t * this.elementSize.x > 4e3 && (t = 4e3 / this.elementSize.x), t);
        }
        l() {
            return this.m("initial") || this.fit;
        }
        p() {
            return this.m("max") || Math.max(1, 4 * this.fit);
        }
    }
    class b {
        constructor(i, s, h) {
            (this.data = i),
                (this.index = s),
                (this.pswp = h),
                (this.isActive = s === h.currIndex),
                (this.currentResolution = 0),
                (this.panAreaSize = { x: 0, y: 0 }),
                (this.pan = { x: 0, y: 0 }),
                (this.isFirstSlide = this.isActive && !h.opener.isOpen),
                (this.zoomLevels = new x(h.options, i, s, h)),
                this.pswp.dispatch("gettingData", { slide: this, data: this.data, index: s }),
                (this.content = this.pswp.contentLoader.getContentBySlide(this)),
                (this.container = t("pswp__zoom-wrap", "div")),
                (this.holderElement = null),
                (this.currZoomLevel = 1),
                (this.width = this.content.width),
                (this.height = this.content.height),
                (this.heavyAppended = !1),
                (this.bounds = new _(this)),
                (this.prevDisplayedWidth = -1),
                (this.prevDisplayedHeight = -1),
                this.pswp.dispatch("slideInit", { slide: this });
        }
        setIsActive(t) {
            t && !this.isActive ? this.activate() : !t && this.isActive && this.deactivate();
        }
        append(t) {
            (this.holderElement = t),
                (this.container.style.transformOrigin = "0 0"),
                this.data &&
                    (this.calculateSize(),
                    this.load(),
                    this.updateContentSize(),
                    this.appendHeavy(),
                    this.holderElement.appendChild(this.container),
                    this.zoomAndPanToInitial(),
                    this.pswp.dispatch("firstZoomPan", { slide: this }),
                    this.applyCurrentZoomPan(),
                    this.pswp.dispatch("afterSetContent", { slide: this }),
                    this.isActive && this.activate());
        }
        load() {
            this.content.load(!1), this.pswp.dispatch("slideLoad", { slide: this });
        }
        appendHeavy() {
            const { pswp: t } = this;
            !this.heavyAppended &&
                t.opener.isOpen &&
                !t.mainScroll.isShifted() &&
                (this.isActive, 1) &&
                (this.pswp.dispatch("appendHeavy", { slide: this }).defaultPrevented || ((this.heavyAppended = !0), this.content.append(), this.pswp.dispatch("appendHeavyContent", { slide: this })));
        }
        activate() {
            (this.isActive = !0), this.appendHeavy(), this.content.activate(), this.pswp.dispatch("slideActivate", { slide: this });
        }
        deactivate() {
            (this.isActive = !1),
                this.content.deactivate(),
                this.currZoomLevel !== this.zoomLevels.initial && this.calculateSize(),
                (this.currentResolution = 0),
                this.zoomAndPanToInitial(),
                this.applyCurrentZoomPan(),
                this.updateContentSize(),
                this.pswp.dispatch("slideDeactivate", { slide: this });
        }
        destroy() {
            (this.content.hasSlide = !1), this.content.remove(), this.container.remove(), this.pswp.dispatch("slideDestroy", { slide: this });
        }
        resize() {
            this.currZoomLevel !== this.zoomLevels.initial && this.isActive
                ? (this.calculateSize(), this.bounds.update(this.currZoomLevel), this.panTo(this.pan.x, this.pan.y))
                : (this.calculateSize(), (this.currentResolution = 0), this.zoomAndPanToInitial(), this.applyCurrentZoomPan(), this.updateContentSize());
        }
        updateContentSize(t) {
            const i = this.currentResolution || this.zoomLevels.initial;
            if (!i) return;
            const s = Math.round(this.width * i) || this.pswp.viewportSize.x,
                h = Math.round(this.height * i) || this.pswp.viewportSize.y;
            (this.sizeChanged(s, h) || t) && this.content.setDisplayedSize(s, h);
        }
        sizeChanged(t, i) {
            return (t !== this.prevDisplayedWidth || i !== this.prevDisplayedHeight) && ((this.prevDisplayedWidth = t), (this.prevDisplayedHeight = i), !0);
        }
        getPlaceholderElement() {
            var t;
            return null === (t = this.content.placeholder) || void 0 === t ? void 0 : t.element;
        }
        zoomTo(t, i, h, e) {
            const { pswp: o } = this;
            if (!this.isZoomable() || o.mainScroll.isShifted()) return;
            o.dispatch("beforeZoomTo", { destZoomLevel: t, centerPoint: i, transitionDuration: h }), o.animations.stopAllPan();
            const r = this.currZoomLevel;
            e || (t = n(t, this.zoomLevels.min, this.zoomLevels.max)), this.setZoomLevel(t), (this.pan.x = this.calculateZoomToPanOffset("x", i, r)), (this.pan.y = this.calculateZoomToPanOffset("y", i, r)), s(this.pan);
            const a = () => {
                this.v(t), this.applyCurrentZoomPan();
            };
            h ? o.animations.startTransition({ isPan: !0, name: "zoomTo", target: this.container, transform: this.getCurrentTransform(), onComplete: a, duration: h, easing: o.options.easing }) : a();
        }
        toggleZoom(t) {
            this.zoomTo(this.currZoomLevel === this.zoomLevels.initial ? this.zoomLevels.secondary : this.zoomLevels.initial, t, this.pswp.options.zoomAnimationDuration);
        }
        setZoomLevel(t) {
            (this.currZoomLevel = t), this.bounds.update(this.currZoomLevel);
        }
        calculateZoomToPanOffset(t, i, s) {
            if (0 === this.bounds.max[t] - this.bounds.min[t]) return this.bounds.center[t];
            i || (i = this.pswp.getViewportCenterPoint()), s || (s = this.zoomLevels.initial);
            const h = this.currZoomLevel / s;
            return this.bounds.correctPan(t, (this.pan[t] - i[t]) * h + i[t]);
        }
        panTo(t, i) {
            (this.pan.x = this.bounds.correctPan("x", t)), (this.pan.y = this.bounds.correctPan("y", i)), this.applyCurrentZoomPan();
        }
        isPannable() {
            return Boolean(this.width) && this.currZoomLevel > this.zoomLevels.fit;
        }
        isZoomable() {
            return Boolean(this.width) && this.content.isZoomable();
        }
        applyCurrentZoomPan() {
            this.g(this.pan.x, this.pan.y, this.currZoomLevel), this === this.pswp.currSlide && this.pswp.dispatch("zoomPanUpdate", { slide: this });
        }
        zoomAndPanToInitial() {
            (this.currZoomLevel = this.zoomLevels.initial), this.bounds.update(this.currZoomLevel), i(this.pan, this.bounds.center), this.pswp.dispatch("initialZoomPan", { slide: this });
        }
        g(t, i, s) {
            (s /= this.currentResolution || this.zoomLevels.initial), r(this.container, t, i, s);
        }
        calculateSize() {
            const { pswp: t } = this;
            i(this.panAreaSize, y(t.options, t.viewportSize, this.data, this.index)), this.zoomLevels.update(this.width, this.height, this.panAreaSize), t.dispatch("calcSlideSize", { slide: this });
        }
        getCurrentTransform() {
            const t = this.currZoomLevel / (this.currentResolution || this.zoomLevels.initial);
            return o(this.pan.x, this.pan.y, t);
        }
        v(t) {
            t !== this.currentResolution && ((this.currentResolution = t), this.updateContentSize(), this.pswp.dispatch("resolutionChanged"));
        }
    }
    class S {
        constructor(t) {
            (this.gestures = t), (this.pswp = t.pswp), (this.startPan = { x: 0, y: 0 });
        }
        start() {
            this.pswp.currSlide && i(this.startPan, this.pswp.currSlide.pan), this.pswp.animations.stopAll();
        }
        change() {
            const { p1: t, prevP1: i, dragAxis: h } = this.gestures,
                { currSlide: e } = this.pswp;
            if ("y" === h && this.pswp.options.closeOnVerticalDrag && e && e.currZoomLevel <= e.zoomLevels.fit && !this.gestures.isMultitouch) {
                const s = e.pan.y + (t.y - i.y);
                if (!this.pswp.dispatch("verticalDrag", { panY: s }).defaultPrevented) {
                    this._("y", s, 0.6);
                    const t = 1 - Math.abs(this.S(e.pan.y));
                    this.pswp.applyBgOpacity(t), e.applyCurrentZoomPan();
                }
            } else {
                this.M("x") || (this.M("y"), e && (s(e.pan), e.applyCurrentZoomPan()));
            }
        }
        end() {
            const { velocity: t } = this.gestures,
                { mainScroll: i, currSlide: s } = this.pswp;
            let h = 0;
            if ((this.pswp.animations.stopAll(), i.isShifted())) {
                const s = (i.x - i.getCurrSlideX()) / this.pswp.viewportSize.x;
                (t.x < -0.5 && s < 0) || (t.x < 0.1 && s < -0.5) ? ((h = 1), (t.x = Math.min(t.x, 0))) : ((t.x > 0.5 && s > 0) || (t.x > -0.1 && s > 0.5)) && ((h = -1), (t.x = Math.max(t.x, 0))), i.moveIndexBy(h, !0, t.x);
            }
            (s && s.currZoomLevel > s.zoomLevels.max) || this.gestures.isMultitouch ? this.gestures.zoomLevels.correctZoomPan(!0) : (this.P("x"), this.P("y"));
        }
        P(t) {
            const { velocity: i } = this.gestures,
                { currSlide: s } = this.pswp;
            if (!s) return;
            const { pan: h, bounds: e } = s,
                o = h[t],
                r = this.pswp.bgOpacity < 1 && "y" === t,
                a =
                    o +
                    (function (t, i) {
                        return (t * i) / (1 - i);
                    })(i[t], 0.995);
            if (r) {
                const t = this.S(o),
                    i = this.S(a);
                if ((t < 0 && i < -0.4) || (t > 0 && i > 0.4)) return void this.pswp.close();
            }
            const l = e.correctPan(t, a);
            if (o === l) return;
            const c = l === a ? 1 : 0.82,
                d = this.pswp.bgOpacity,
                u = l - o;
            this.pswp.animations.startSpring({
                name: "panGesture" + t,
                isPan: !0,
                start: o,
                end: l,
                velocity: i[t],
                dampingRatio: c,
                onUpdate: (i) => {
                    if (r && this.pswp.bgOpacity < 1) {
                        const t = 1 - (l - i) / u;
                        this.pswp.applyBgOpacity(n(d + (1 - d) * t, 0, 1));
                    }
                    (h[t] = Math.floor(i)), s.applyCurrentZoomPan();
                },
            });
        }
        M(t) {
            const { p1: i, dragAxis: s, prevP1: h, isMultitouch: e } = this.gestures,
                { currSlide: n, mainScroll: o } = this.pswp,
                r = i[t] - h[t],
                a = o.x + r;
            if (!r || !n) return !1;
            if ("x" === t && !n.isPannable() && !e) return o.moveTo(a, !0), !0;
            const { bounds: l } = n,
                c = n.pan[t] + r;
            if (this.pswp.options.allowPanToNext && "x" === s && "x" === t && !e) {
                const i = o.getCurrSlideX(),
                    s = o.x - i,
                    h = r > 0,
                    e = !h;
                if (c > l.min[t] && h) {
                    if (l.min[t] <= this.startPan[t]) return o.moveTo(a, !0), !0;
                    this._(t, c);
                } else if (c < l.max[t] && e) {
                    if (this.startPan[t] <= l.max[t]) return o.moveTo(a, !0), !0;
                    this._(t, c);
                } else if (0 !== s) {
                    if (s > 0) return o.moveTo(Math.max(a, i), !0), !0;
                    if (s < 0) return o.moveTo(Math.min(a, i), !0), !0;
                } else this._(t, c);
            } else ("y" === t && (o.isShifted() || l.min.y === l.max.y)) || this._(t, c);
            return !1;
        }
        S(t) {
            var i, s;
            return (t - (null !== (i = null === (s = this.pswp.currSlide) || void 0 === s ? void 0 : s.bounds.center.y) && void 0 !== i ? i : 0)) / (this.pswp.viewportSize.y / 3);
        }
        _(t, i, s) {
            const { currSlide: h } = this.pswp;
            if (!h) return;
            const { pan: e, bounds: n } = h;
            if (n.correctPan(t, i) !== i || s) {
                const h = Math.round(i - e[t]);
                e[t] += h * (s || 0.35);
            } else e[t] = i;
        }
    }
    function z(t, i, s) {
        return (t.x = (i.x + s.x) / 2), (t.y = (i.y + s.y) / 2), t;
    }
    class M {
        constructor(t) {
            (this.gestures = t), (this.C = { x: 0, y: 0 }), (this.T = { x: 0, y: 0 }), (this.A = { x: 0, y: 0 }), (this.D = !1), (this.I = 1);
        }
        start() {
            const { currSlide: t } = this.gestures.pswp;
            t && ((this.I = t.currZoomLevel), i(this.C, t.pan)), this.gestures.pswp.animations.stopAllPan(), (this.D = !1);
        }
        change() {
            const { p1: t, startP1: i, p2: s, startP2: e, pswp: n } = this.gestures,
                { currSlide: o } = n;
            if (!o) return;
            const r = o.zoomLevels.min,
                a = o.zoomLevels.max;
            if (!o.isZoomable() || n.mainScroll.isShifted()) return;
            z(this.T, i, e), z(this.A, t, s);
            let l = (1 / h(i, e)) * h(t, s) * this.I;
            if ((l > o.zoomLevels.initial + o.zoomLevels.initial / 15 && (this.D = !0), l < r))
                if (n.options.pinchToClose && !this.D && this.I <= o.zoomLevels.initial) {
                    const t = 1 - (r - l) / (r / 1.2);
                    n.dispatch("pinchClose", { bgOpacity: t }).defaultPrevented || n.applyBgOpacity(t);
                } else l = r - 0.15 * (r - l);
            else l > a && (l = a + 0.05 * (l - a));
            (o.pan.x = this.L("x", l)), (o.pan.y = this.L("y", l)), o.setZoomLevel(l), o.applyCurrentZoomPan();
        }
        end() {
            const { pswp: t } = this.gestures,
                { currSlide: i } = t;
            (!i || i.currZoomLevel < i.zoomLevels.initial) && !this.D && t.options.pinchToClose ? t.close() : this.correctZoomPan();
        }
        L(t, i) {
            const s = i / this.I;
            return this.A[t] - (this.T[t] - this.C[t]) * s;
        }
        correctZoomPan(t) {
            const { pswp: s } = this.gestures,
                { currSlide: h } = s;
            if (null == h || !h.isZoomable()) return;
            0 === this.A.x && (t = !0);
            const o = h.currZoomLevel;
            let r,
                a = !0;
            o < h.zoomLevels.initial ? (r = h.zoomLevels.initial) : o > h.zoomLevels.max ? (r = h.zoomLevels.max) : ((a = !1), (r = o));
            const l = s.bgOpacity,
                c = s.bgOpacity < 1,
                d = i({ x: 0, y: 0 }, h.pan);
            let u = i({ x: 0, y: 0 }, d);
            t && ((this.A.x = 0), (this.A.y = 0), (this.T.x = 0), (this.T.y = 0), (this.I = o), i(this.C, d)),
                a && (u = { x: this.L("x", r), y: this.L("y", r) }),
                h.setZoomLevel(r),
                (u = { x: h.bounds.correctPan("x", u.x), y: h.bounds.correctPan("y", u.y) }),
                h.setZoomLevel(o);
            const p = !e(u, d);
            if (!p && !a && !c) return h.v(r), void h.applyCurrentZoomPan();
            s.animations.stopAllPan(),
                s.animations.startSpring({
                    isPan: !0,
                    start: 0,
                    end: 1e3,
                    velocity: 0,
                    dampingRatio: 1,
                    naturalFrequency: 40,
                    onUpdate: (t) => {
                        if (((t /= 1e3), p || a)) {
                            if ((p && ((h.pan.x = d.x + (u.x - d.x) * t), (h.pan.y = d.y + (u.y - d.y) * t)), a)) {
                                const i = o + (r - o) * t;
                                h.setZoomLevel(i);
                            }
                            h.applyCurrentZoomPan();
                        }
                        c && s.bgOpacity < 1 && s.applyBgOpacity(n(l + (1 - l) * t, 0, 1));
                    },
                    onComplete: () => {
                        h.v(r), h.applyCurrentZoomPan();
                    },
                });
        }
    }
    function P(t) {
        return !!t.target.closest(".pswp__container");
    }
    class C {
        constructor(t) {
            this.gestures = t;
        }
        click(t, i) {
            const s = i.target.classList,
                h = s.contains("pswp__img"),
                e = s.contains("pswp__item") || s.contains("pswp__zoom-wrap");
            h ? this.k("imageClick", t, i) : e && this.k("bgClick", t, i);
        }
        tap(t, i) {
            P(i) && this.k("tap", t, i);
        }
        doubleTap(t, i) {
            P(i) && this.k("doubleTap", t, i);
        }
        k(t, i, s) {
            var h;
            const { pswp: e } = this.gestures,
                { currSlide: n } = e,
                o = t + "Action",
                r = e.options[o];
            if (!e.dispatch(o, { point: i, originalEvent: s }).defaultPrevented)
                if ("function" != typeof r)
                    switch (r) {
                        case "close":
                        case "next":
                            e[r]();
                            break;
                        case "zoom":
                            null == n || n.toggleZoom(i);
                            break;
                        case "zoom-or-close":
                            null != n && n.isZoomable() && n.zoomLevels.secondary !== n.zoomLevels.initial ? n.toggleZoom(i) : e.options.clickToCloseNonZoomable && e.close();
                            break;
                        case "toggle-controls":
                            null === (h = this.gestures.pswp.element) || void 0 === h || h.classList.toggle("pswp--ui-visible");
                    }
                else r.call(e, i, s);
        }
    }
    class T {
        constructor(t) {
            (this.pswp = t),
                (this.dragAxis = null),
                (this.p1 = { x: 0, y: 0 }),
                (this.p2 = { x: 0, y: 0 }),
                (this.prevP1 = { x: 0, y: 0 }),
                (this.prevP2 = { x: 0, y: 0 }),
                (this.startP1 = { x: 0, y: 0 }),
                (this.startP2 = { x: 0, y: 0 }),
                (this.velocity = { x: 0, y: 0 }),
                (this.Z = { x: 0, y: 0 }),
                (this.B = { x: 0, y: 0 }),
                (this.F = 0),
                (this.O = []),
                (this.R = "ontouchstart" in window),
                (this.N = !!window.PointerEvent),
                (this.supportsTouch = this.R || (this.N && navigator.maxTouchPoints > 1)),
                (this.F = 0),
                (this.U = 0),
                (this.V = !1),
                (this.isMultitouch = !1),
                (this.isDragging = !1),
                (this.isZooming = !1),
                (this.raf = null),
                (this.G = null),
                this.supportsTouch || (t.options.allowPanToNext = !1),
                (this.drag = new S(this)),
                (this.zoomLevels = new M(this)),
                (this.tapHandler = new C(this)),
                t.on("bindEvents", () => {
                    t.events.add(t.scrollWrap, "click", this.$.bind(this)),
                        this.N
                            ? this.q("pointer", "down", "up", "cancel")
                            : this.R
                            ? (this.q("touch", "start", "end", "cancel"), t.scrollWrap && ((t.scrollWrap.ontouchmove = () => {}), (t.scrollWrap.ontouchend = () => {})))
                            : this.q("mouse", "down", "up");
                });
        }
        q(t, i, s, h) {
            const { pswp: e } = this,
                { events: n } = e,
                o = h ? t + h : "";
            n.add(e.scrollWrap, t + i, this.onPointerDown.bind(this)), n.add(window, t + "move", this.onPointerMove.bind(this)), n.add(window, t + s, this.onPointerUp.bind(this)), o && n.add(e.scrollWrap, o, this.onPointerUp.bind(this));
        }
        onPointerDown(t) {
            const s = "mousedown" === t.type || "mouse" === t.pointerType;
            if (s && t.button > 0) return;
            const { pswp: h } = this;
            h.opener.isOpen
                ? h.dispatch("pointerDown", { originalEvent: t }).defaultPrevented ||
                  (s && (h.mouseDetected(), this.H(t, "down")),
                  h.animations.stopAll(),
                  this.K(t, "down"),
                  1 === this.F && ((this.dragAxis = null), i(this.startP1, this.p1)),
                  this.F > 1 ? (this.W(), (this.isMultitouch = !0)) : (this.isMultitouch = !1))
                : t.preventDefault();
        }
        onPointerMove(t) {
            this.H(t, "move"),
                this.F &&
                    (this.K(t, "move"),
                    this.pswp.dispatch("pointerMove", { originalEvent: t }).defaultPrevented ||
                        (1 !== this.F || this.isDragging
                            ? this.F > 1 && !this.isZooming && (this.j(), (this.isZooming = !0), this.X(), this.zoomLevels.start(), this.Y(), this.J())
                            : (this.dragAxis || this.tt(),
                              this.dragAxis &&
                                  !this.isDragging &&
                                  (this.isZooming && ((this.isZooming = !1), this.zoomLevels.end()),
                                  (this.isDragging = !0),
                                  this.W(),
                                  this.X(),
                                  (this.U = Date.now()),
                                  (this.V = !1),
                                  i(this.B, this.p1),
                                  (this.velocity.x = 0),
                                  (this.velocity.y = 0),
                                  this.drag.start(),
                                  this.Y(),
                                  this.J()))));
        }
        j() {
            this.isDragging && ((this.isDragging = !1), this.V || this.it(!0), this.drag.end(), (this.dragAxis = null));
        }
        onPointerUp(t) {
            this.F &&
                (this.K(t, "up"),
                this.pswp.dispatch("pointerUp", { originalEvent: t }).defaultPrevented ||
                    (0 === this.F && (this.Y(), this.isDragging ? this.j() : this.isZooming || this.isMultitouch || this.st(t)),
                    this.F < 2 && this.isZooming && ((this.isZooming = !1), this.zoomLevels.end(), 1 === this.F && ((this.dragAxis = null), this.X()))));
        }
        J() {
            (this.isDragging || this.isZooming) &&
                (this.it(),
                this.isDragging ? e(this.p1, this.prevP1) || this.drag.change() : (e(this.p1, this.prevP1) && e(this.p2, this.prevP2)) || this.zoomLevels.change(),
                this.ht(),
                (this.raf = requestAnimationFrame(this.J.bind(this))));
        }
        it(t) {
            const s = Date.now(),
                h = s - this.U;
            (h < 50 && !t) || ((this.velocity.x = this.et("x", h)), (this.velocity.y = this.et("y", h)), (this.U = s), i(this.B, this.p1), (this.V = !0));
        }
        st(t) {
            const { mainScroll: s } = this.pswp;
            if (s.isShifted()) return void s.moveIndexBy(0, !0);
            if (t.type.indexOf("cancel") > 0) return;
            if ("mouseup" === t.type || "mouse" === t.pointerType) return void this.tapHandler.click(this.startP1, t);
            const e = this.pswp.options.doubleTapAction ? 300 : 0;
            this.G
                ? (this.W(), h(this.Z, this.startP1) < 25 && this.tapHandler.doubleTap(this.startP1, t))
                : (i(this.Z, this.startP1),
                  (this.G = setTimeout(() => {
                      this.tapHandler.tap(this.startP1, t), this.W();
                  }, e)));
        }
        W() {
            this.G && (clearTimeout(this.G), (this.G = null));
        }
        et(t, i) {
            const s = this.p1[t] - this.B[t];
            return Math.abs(s) > 1 && i > 5 ? s / i : 0;
        }
        Y() {
            this.raf && (cancelAnimationFrame(this.raf), (this.raf = null));
        }
        H(t, i) {
            this.pswp.applyFilters("preventPointerEvent", !0, t, i) && t.preventDefault();
        }
        K(t, s) {
            if (this.N) {
                const h = t,
                    e = this.O.findIndex((t) => t.id === h.pointerId);
                "up" === s && e > -1 ? this.O.splice(e, 1) : "down" === s && -1 === e ? this.O.push(this.nt(h, { x: 0, y: 0 })) : e > -1 && this.nt(h, this.O[e]),
                    (this.F = this.O.length),
                    this.F > 0 && i(this.p1, this.O[0]),
                    this.F > 1 && i(this.p2, this.O[1]);
            } else {
                const i = t;
                (this.F = 0),
                    i.type.indexOf("touch") > -1
                        ? i.touches && i.touches.length > 0 && (this.nt(i.touches[0], this.p1), this.F++, i.touches.length > 1 && (this.nt(i.touches[1], this.p2), this.F++))
                        : (this.nt(t, this.p1), "up" === s ? (this.F = 0) : this.F++);
            }
        }
        ht() {
            i(this.prevP1, this.p1), i(this.prevP2, this.p2);
        }
        X() {
            i(this.startP1, this.p1), i(this.startP2, this.p2), this.ht();
        }
        tt() {
            if (this.pswp.mainScroll.isShifted()) this.dragAxis = "x";
            else {
                const t = Math.abs(this.p1.x - this.startP1.x) - Math.abs(this.p1.y - this.startP1.y);
                if (0 !== t) {
                    const i = t > 0 ? "x" : "y";
                    Math.abs(this.p1[i] - this.startP1[i]) >= 10 && (this.dragAxis = i);
                }
            }
        }
        nt(t, i) {
            return (i.x = t.pageX - this.pswp.offset.x), (i.y = t.pageY - this.pswp.offset.y), "pointerId" in t ? (i.id = t.pointerId) : void 0 !== t.identifier && (i.id = t.identifier), i;
        }
        $(t) {
            this.pswp.mainScroll.isShifted() && (t.preventDefault(), t.stopPropagation());
        }
    }
    class A {
        constructor(t) {
            (this.pswp = t), (this.x = 0), (this.slideWidth = 0), (this.ot = 0), (this.rt = 0), (this.lt = -1), (this.itemHolders = []);
        }
        resize(t) {
            const { pswp: i } = this,
                s = Math.round(i.viewportSize.x + i.viewportSize.x * i.options.spacing),
                h = s !== this.slideWidth;
            h && ((this.slideWidth = s), this.moveTo(this.getCurrSlideX())),
                this.itemHolders.forEach((i, s) => {
                    h && r(i.el, (s + this.lt) * this.slideWidth), t && i.slide && i.slide.resize();
                });
        }
        resetPosition() {
            (this.ot = 0), (this.rt = 0), (this.slideWidth = 0), (this.lt = -1);
        }
        appendHolders() {
            this.itemHolders = [];
            for (let i = 0; i < 3; i++) {
                const s = t("pswp__item", "div", this.pswp.container);
                s.setAttribute("role", "group"), s.setAttribute("aria-roledescription", "slide"), s.setAttribute("aria-hidden", "true"), (s.style.display = 1 === i ? "block" : "none"), this.itemHolders.push({ el: s });
            }
        }
        canBeSwiped() {
            return this.pswp.getNumItems() > 1;
        }
        moveIndexBy(t, i, s) {
            const { pswp: h } = this;
            let e = h.potentialIndex + t;
            const n = h.getNumItems();
            if (h.canLoop()) {
                e = h.getLoopedIndex(e);
                const i = (t + n) % n;
                t = i <= n / 2 ? i : i - n;
            } else e < 0 ? (e = 0) : e >= n && (e = n - 1), (t = e - h.potentialIndex);
            (h.potentialIndex = e), (this.ot -= t), h.animations.stopMainScroll();
            const o = this.getCurrSlideX();
            if (i) {
                h.animations.startSpring({
                    isMainScroll: !0,
                    start: this.x,
                    end: o,
                    velocity: s || 0,
                    naturalFrequency: 30,
                    dampingRatio: 1,
                    onUpdate: (t) => {
                        this.moveTo(t);
                    },
                    onComplete: () => {
                        this.updateCurrItem(), h.appendHeavy();
                    },
                });
                let t = h.potentialIndex - h.currIndex;
                if (h.canLoop()) {
                    const i = (t + n) % n;
                    t = i <= n / 2 ? i : i - n;
                }
                Math.abs(t) > 1 && this.updateCurrItem();
            } else this.moveTo(o), this.updateCurrItem();
            return Boolean(t);
        }
        getCurrSlideX() {
            return this.slideWidth * this.ot;
        }
        isShifted() {
            return this.x !== this.getCurrSlideX();
        }
        updateCurrItem() {
            var t;
            const { pswp: i } = this,
                s = this.rt - this.ot;
            if (!s) return;
            (this.rt = this.ot), (i.currIndex = i.potentialIndex);
            let h,
                e = Math.abs(s);
            e >= 3 &&
                ((this.lt += s + (s > 0 ? -3 : 3)),
                (e = 3),
                this.itemHolders.forEach((t) => {
                    var i;
                    null === (i = t.slide) || void 0 === i || i.destroy(), (t.slide = void 0);
                }));
            for (let t = 0; t < e; t++)
                s > 0
                    ? ((h = this.itemHolders.shift()), h && ((this.itemHolders[2] = h), this.lt++, r(h.el, (this.lt + 2) * this.slideWidth), i.setContent(h, i.currIndex - e + t + 2)))
                    : ((h = this.itemHolders.pop()), h && (this.itemHolders.unshift(h), this.lt--, r(h.el, this.lt * this.slideWidth), i.setContent(h, i.currIndex + e - t - 2)));
            Math.abs(this.lt) > 50 && !this.isShifted() && (this.resetPosition(), this.resize()),
                i.animations.stopAllPan(),
                this.itemHolders.forEach((t, i) => {
                    t.slide && t.slide.setIsActive(1 === i);
                }),
                (i.currSlide = null === (t = this.itemHolders[1]) || void 0 === t ? void 0 : t.slide),
                i.contentLoader.updateLazy(s),
                i.currSlide && i.currSlide.applyCurrentZoomPan(),
                i.dispatch("change");
        }
        moveTo(t, i) {
            if (!this.pswp.canLoop() && i) {
                let i = (this.slideWidth * this.ot - t) / this.slideWidth;
                i += this.pswp.currIndex;
                const s = Math.round(t - this.x);
                ((i < 0 && s > 0) || (i >= this.pswp.getNumItems() - 1 && s < 0)) && (t = this.x + 0.35 * s);
            }
            (this.x = t), this.pswp.container && r(this.pswp.container, t), this.pswp.dispatch("moveMainScroll", { x: t, dragging: null != i && i });
        }
    }
    const D = { Escape: 27, z: 90, ArrowLeft: 37, ArrowUp: 38, ArrowRight: 39, ArrowDown: 40, Tab: 9 },
        I = (t, i) => (i ? t : D[t]);
    class E {
        constructor(t) {
            (this.pswp = t),
                (this.ct = !1),
                t.on("bindEvents", () => {
                    t.options.trapFocus && (t.options.initialPointerPos || this.dt(), t.events.add(document, "focusin", this.ut.bind(this))), t.events.add(document, "keydown", this.vt.bind(this));
                });
            const i = document.activeElement;
            t.on("destroy", () => {
                t.options.returnFocus && i && this.ct && i.focus();
            });
        }
        dt() {
            !this.ct && this.pswp.element && (this.pswp.element.focus(), (this.ct = !0));
        }
        vt(t) {
            const { pswp: i } = this;
            if (i.dispatch("keydown", { originalEvent: t }).defaultPrevented) return;
            if (
                (function (t) {
                    return ("button" in t && 1 === t.button) || t.ctrlKey || t.metaKey || t.altKey || t.shiftKey;
                })(t)
            )
                return;
            let s,
                h,
                e = !1;
            const n = "key" in t;
            switch (n ? t.key : t.keyCode) {
                case I("Escape", n):
                    i.options.escKey && (s = "close");
                    break;
                case I("z", n):
                    s = "toggleZoom";
                    break;
                case I("ArrowLeft", n):
                    h = "x";
                    break;
                case I("ArrowUp", n):
                    h = "y";
                    break;
                case I("ArrowRight", n):
                    (h = "x"), (e = !0);
                    break;
                case I("ArrowDown", n):
                    (e = !0), (h = "y");
                    break;
                case I("Tab", n):
                    this.dt();
            }
            if (h) {
                t.preventDefault();
                const { currSlide: n } = i;
                i.options.arrowKeys && "x" === h && i.getNumItems() > 1 ? (s = e ? "next" : "prev") : n && n.currZoomLevel > n.zoomLevels.fit && ((n.pan[h] += e ? -80 : 80), n.panTo(n.pan.x, n.pan.y));
            }
            s && (t.preventDefault(), i[s]());
        }
        ut(t) {
            const { template: i } = this.pswp;
            i && document !== t.target && i !== t.target && !i.contains(t.target) && i.focus();
        }
    }
    const L = "cubic-bezier(.4,0,.22,1)";
    class k {
        constructor(t) {
            var i;
            this.props = t;
            const { target: s, onComplete: h, transform: e, onFinish: n = () => {}, duration: o = 333, easing: r = L } = t;
            this.onFinish = n;
            const l = e ? "transform" : "opacity",
                c = null !== (i = t[l]) && void 0 !== i ? i : "";
            (this.ft = s),
                (this.wt = h),
                (this.gt = !1),
                (this.yt = this.yt.bind(this)),
                (this._t = setTimeout(() => {
                    a(s, l, o, r),
                        (this._t = setTimeout(() => {
                            s.addEventListener("transitionend", this.yt, !1),
                                s.addEventListener("transitioncancel", this.yt, !1),
                                (this._t = setTimeout(() => {
                                    this.xt();
                                }, o + 500)),
                                (s.style[l] = c);
                        }, 30));
                }, 0));
        }
        yt(t) {
            t.target === this.ft && this.xt();
        }
        xt() {
            this.gt || ((this.gt = !0), this.onFinish(), this.wt && this.wt());
        }
        destroy() {
            this._t && clearTimeout(this._t), a(this.ft), this.ft.removeEventListener("transitionend", this.yt, !1), this.ft.removeEventListener("transitioncancel", this.yt, !1), this.gt || this.xt();
        }
    }
    class Z {
        constructor(t, i, s) {
            (this.velocity = 1e3 * t), (this.bt = i || 0.75), (this.St = s || 12), (this.zt = this.St), this.bt < 1 && (this.zt *= Math.sqrt(1 - this.bt * this.bt));
        }
        easeFrame(t, i) {
            let s,
                h = 0;
            i /= 1e3;
            const e = Math.E ** (-this.bt * this.St * i);
            if (1 === this.bt) (s = this.velocity + this.St * t), (h = (t + s * i) * e), (this.velocity = h * -this.St + s * e);
            else if (this.bt < 1) {
                s = (1 / this.zt) * (this.bt * this.St * t + this.velocity);
                const n = Math.cos(this.zt * i),
                    o = Math.sin(this.zt * i);
                (h = e * (t * n + s * o)), (this.velocity = h * -this.St * this.bt + e * (-this.zt * t * o + this.zt * s * n));
            }
            return h;
        }
    }
    class B {
        constructor(t) {
            (this.props = t), (this.Mt = 0);
            const { start: i, end: s, velocity: h, onUpdate: e, onComplete: n, onFinish: o = () => {}, dampingRatio: r, naturalFrequency: a } = t;
            this.onFinish = o;
            const l = new Z(h, r, a);
            let c = Date.now(),
                d = i - s;
            const u = () => {
                this.Mt && ((d = l.easeFrame(d, Date.now() - c)), Math.abs(d) < 1 && Math.abs(l.velocity) < 50 ? (e(s), n && n(), this.onFinish()) : ((c = Date.now()), e(d + s), (this.Mt = requestAnimationFrame(u))));
            };
            this.Mt = requestAnimationFrame(u);
        }
        destroy() {
            this.Mt >= 0 && cancelAnimationFrame(this.Mt), (this.Mt = 0);
        }
    }
    class F {
        constructor() {
            this.activeAnimations = [];
        }
        startSpring(t) {
            this.Pt(t, !0);
        }
        startTransition(t) {
            this.Pt(t);
        }
        Pt(t, i) {
            const s = i ? new B(t) : new k(t);
            return this.activeAnimations.push(s), (s.onFinish = () => this.stop(s)), s;
        }
        stop(t) {
            t.destroy();
            const i = this.activeAnimations.indexOf(t);
            i > -1 && this.activeAnimations.splice(i, 1);
        }
        stopAll() {
            this.activeAnimations.forEach((t) => {
                t.destroy();
            }),
                (this.activeAnimations = []);
        }
        stopAllPan() {
            this.activeAnimations = this.activeAnimations.filter((t) => !t.props.isPan || (t.destroy(), !1));
        }
        stopMainScroll() {
            this.activeAnimations = this.activeAnimations.filter((t) => !t.props.isMainScroll || (t.destroy(), !1));
        }
        isPanRunning() {
            return this.activeAnimations.some((t) => t.props.isPan);
        }
    }
    class O {
        constructor(t) {
            (this.pswp = t), t.events.add(t.element, "wheel", this.Ct.bind(this));
        }
        Ct(t) {
            t.preventDefault();
            const { currSlide: i } = this.pswp;
            let { deltaX: s, deltaY: h } = t;
            if (i && !this.pswp.dispatch("wheel", { originalEvent: t }).defaultPrevented)
                if (t.ctrlKey || this.pswp.options.wheelToZoom) {
                    if (i.isZoomable()) {
                        let s = -h;
                        1 === t.deltaMode ? (s *= 0.05) : (s *= t.deltaMode ? 1 : 0.002), (s = 2 ** s);
                        const e = i.currZoomLevel * s;
                        i.zoomTo(e, { x: t.clientX, y: t.clientY });
                    }
                } else i.isPannable() && (1 === t.deltaMode && ((s *= 18), (h *= 18)), i.panTo(i.pan.x - s, i.pan.y - h));
        }
    }
    class R {
        constructor(i, s) {
            var h;
            const e = s.name || s.className;
            let n = s.html;
            if (!1 === i.options[e]) return;
            "string" == typeof i.options[e + "SVG"] && (n = i.options[e + "SVG"]), i.dispatch("uiElementCreate", { data: s });
            let o = "";
            s.isButton ? ((o += "pswp__button "), (o += s.className || `pswp__button--${s.name}`)) : (o += s.className || `pswp__${s.name}`);
            let r = s.isButton ? s.tagName || "button" : s.tagName || "div";
            r = r.toLowerCase();
            const a = t(o, r);
            if (s.isButton) {
                "button" === r && (a.type = "button");
                let { title: t } = s;
                const { ariaLabel: h } = s;
                "string" == typeof i.options[e + "Title"] && (t = i.options[e + "Title"]), t && (a.title = t);
                const n = h || t;
                n && a.setAttribute("aria-label", n);
            }
            (a.innerHTML = (function (t) {
                if ("string" == typeof t) return t;
                if (!t || !t.isCustomSVG) return "";
                const i = t;
                let s = '<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 %d %d" width="%d" height="%d">';
                return (s = s.split("%d").join(i.size || 32)), i.outlineID && (s += '<use class="pswp__icn-shadow" xlink:href="#' + i.outlineID + '"/>'), (s += i.inner), (s += "</svg>"), s;
            })(n)),
                s.onInit && s.onInit(a, i),
                s.onClick &&
                    (a.onclick = (t) => {
                        "string" == typeof s.onClick ? i[s.onClick]() : "function" == typeof s.onClick && s.onClick(t, a, i);
                    });
            const l = s.appendTo || "bar";
            let c = i.element;
            "bar" === l ? (i.topBar || (i.topBar = t("pswp__top-bar pswp__hide-on-close", "div", i.scrollWrap)), (c = i.topBar)) : (a.classList.add("pswp__hide-on-close"), "wrapper" === l && (c = i.scrollWrap)),
                null === (h = c) || void 0 === h || h.appendChild(i.applyFilters("uiElement", a, s));
        }
    }
    function N(t, i, s) {
        t.classList.add("pswp__button--arrow"),
            t.setAttribute("aria-controls", "pswp__items"),
            i.on("change", () => {
                i.options.loop || (t.disabled = s ? !(i.currIndex < i.getNumItems() - 1) : !(i.currIndex > 0));
            });
    }
    const U = {
            name: "arrowPrev",
            className: "pswp__button--arrow--prev",
            title: "Previous",
            order: 10,
            isButton: !0,
            appendTo: "wrapper",
            html: { isCustomSVG: !0, size: 60, inner: '<path d="M29 43l-3 3-16-16 16-16 3 3-13 13 13 13z" id="pswp__icn-arrow"/>', outlineID: "pswp__icn-arrow" },
            onClick: "prev",
            onInit: N,
        },
        V = {
            name: "arrowNext",
            className: "pswp__button--arrow--next",
            title: "Next",
            order: 11,
            isButton: !0,
            appendTo: "wrapper",
            html: { isCustomSVG: !0, size: 60, inner: '<use xlink:href="#pswp__icn-arrow"/>', outlineID: "pswp__icn-arrow" },
            onClick: "next",
            onInit: (t, i) => {
                N(t, i, !0);
            },
        },
        G = {
            name: "close",
            title: "Close",
            order: 20,
            isButton: !0,
            html: { isCustomSVG: !0, inner: '<path d="M24 10l-2-2-6 6-6-6-2 2 6 6-6 6 2 2 6-6 6 6 2-2-6-6z" id="pswp__icn-close"/>', outlineID: "pswp__icn-close" },
            onClick: "close",
        },
        $ = {
            name: "zoom",
            title: "Zoom",
            order: 10,
            isButton: !0,
            html: {
                isCustomSVG: !0,
                inner:
                    '<path d="M17.426 19.926a6 6 0 1 1 1.5-1.5L23 22.5 21.5 24l-4.074-4.074z" id="pswp__icn-zoom"/><path fill="currentColor" class="pswp__zoom-icn-bar-h" d="M11 16v-2h6v2z"/><path fill="currentColor" class="pswp__zoom-icn-bar-v" d="M13 12h2v6h-2z"/>',
                outlineID: "pswp__icn-zoom",
            },
            onClick: "toggleZoom",
        },
        q = {
            name: "preloader",
            appendTo: "bar",
            order: 7,
            html: { isCustomSVG: !0, inner: '<path fill-rule="evenodd" clip-rule="evenodd" d="M21.2 16a5.2 5.2 0 1 1-5.2-5.2V8a8 8 0 1 0 8 8h-2.8Z" id="pswp__icn-loading"/>', outlineID: "pswp__icn-loading" },
            onInit: (t, i) => {
                let s,
                    h = null;
                const e = (i) => {
                        var h, e;
                        s !== i && ((s = i), (h = "active"), (e = i), t.classList.toggle("pswp__preloader--" + h, e));
                    },
                    n = () => {
                        var t;
                        if (null === (t = i.currSlide) || void 0 === t || !t.content.isLoading()) return e(!1), void (h && (clearTimeout(h), (h = null)));
                        h ||
                            (h = setTimeout(() => {
                                var t;
                                e(Boolean(null === (t = i.currSlide) || void 0 === t ? void 0 : t.content.isLoading())), (h = null);
                            }, i.options.preloaderDelay));
                    };
                i.on("change", n),
                    i.on("loadComplete", (t) => {
                        i.currSlide === t.slide && n();
                    }),
                    i.ui && (i.ui.updatePreloaderVisibility = n);
            },
        },
        H = {
            name: "counter",
            order: 5,
            onInit: (t, i) => {
                i.on("change", () => {
                    t.innerText = i.currIndex + 1 + i.options.indexIndicatorSep + i.getNumItems();
                });
            },
        };
    function K(t, i) {
        t.classList.toggle("pswp--zoomed-in", i);
    }
    class W {
        constructor(t) {
            (this.pswp = t), (this.isRegistered = !1), (this.uiElementsData = []), (this.items = []), (this.updatePreloaderVisibility = () => {}), (this.Tt = void 0);
        }
        init() {
            const { pswp: t } = this;
            (this.isRegistered = !1),
                (this.uiElementsData = [G, U, V, $, q, H]),
                t.dispatch("uiRegister"),
                this.uiElementsData.sort((t, i) => (t.order || 0) - (i.order || 0)),
                (this.items = []),
                (this.isRegistered = !0),
                this.uiElementsData.forEach((t) => {
                    this.registerElement(t);
                }),
                t.on("change", () => {
                    var i;
                    null === (i = t.element) || void 0 === i || i.classList.toggle("pswp--one-slide", 1 === t.getNumItems());
                }),
                t.on("zoomPanUpdate", () => this.At());
        }
        registerElement(t) {
            this.isRegistered ? this.items.push(new R(this.pswp, t)) : this.uiElementsData.push(t);
        }
        At() {
            const { template: t, currSlide: i, options: s } = this.pswp;
            if (this.pswp.opener.isClosing || !t || !i) return;
            let { currZoomLevel: h } = i;
            if ((this.pswp.opener.isOpen || (h = i.zoomLevels.initial), h === this.Tt)) return;
            this.Tt = h;
            const e = i.zoomLevels.initial - i.zoomLevels.secondary;
            if (Math.abs(e) < 0.01 || !i.isZoomable()) return K(t, !1), void t.classList.remove("pswp--zoom-allowed");
            t.classList.add("pswp--zoom-allowed");
            K(t, (h === i.zoomLevels.initial ? i.zoomLevels.secondary : i.zoomLevels.initial) <= h), ("zoom" !== s.imageClickAction && "zoom-or-close" !== s.imageClickAction) || t.classList.add("pswp--click-to-zoom");
        }
    }
    class j {
        constructor(t, i) {
            (this.type = t), (this.defaultPrevented = !1), i && Object.assign(this, i);
        }
        preventDefault() {
            this.defaultPrevented = !0;
        }
    }
    class X {
        constructor(i, s) {
            if (((this.element = t("pswp__img pswp__img--placeholder", i ? "img" : "div", s)), i)) {
                const t = this.element;
                (t.decoding = "async"), (t.alt = ""), (t.src = i), t.setAttribute("role", "presentation");
            }
            this.element.setAttribute("aria-hidden", "true");
        }
        setDisplayedSize(t, i) {
            this.element && ("IMG" === this.element.tagName ? (l(this.element, 250, "auto"), (this.element.style.transformOrigin = "0 0"), (this.element.style.transform = o(0, 0, t / 250))) : l(this.element, t, i));
        }
        destroy() {
            var t;
            null !== (t = this.element) && void 0 !== t && t.parentNode && this.element.remove(), (this.element = null);
        }
    }
    class Y {
        constructor(t, i, s) {
            (this.instance = i),
                (this.data = t),
                (this.index = s),
                (this.element = void 0),
                (this.placeholder = void 0),
                (this.slide = void 0),
                (this.displayedImageWidth = 0),
                (this.displayedImageHeight = 0),
                (this.width = Number(this.data.w) || Number(this.data.width) || 0),
                (this.height = Number(this.data.h) || Number(this.data.height) || 0),
                (this.isAttached = !1),
                (this.hasSlide = !1),
                (this.isDecoding = !1),
                (this.state = c),
                this.data.type ? (this.type = this.data.type) : this.data.src ? (this.type = "image") : (this.type = "html"),
                this.instance.dispatch("contentInit", { content: this });
        }
        removePlaceholder() {
            this.placeholder &&
                !this.keepPlaceholder() &&
                setTimeout(() => {
                    this.placeholder && (this.placeholder.destroy(), (this.placeholder = void 0));
                }, 1e3);
        }
        load(i, s) {
            if (this.slide && this.usePlaceholder())
                if (this.placeholder) {
                    const t = this.placeholder.element;
                    t && !t.parentElement && this.slide.container.prepend(t);
                } else {
                    const t = this.instance.applyFilters("placeholderSrc", !(!this.data.msrc || !this.slide.isFirstSlide) && this.data.msrc, this);
                    this.placeholder = new X(t, this.slide.container);
                }
            (this.element && !s) ||
                this.instance.dispatch("contentLoad", { content: this, isLazy: i }).defaultPrevented ||
                (this.isImageContent() ? ((this.element = t("pswp__img", "img")), this.displayedImageWidth && this.loadImage(i)) : ((this.element = t("pswp__content", "div")), (this.element.innerHTML = this.data.html || "")),
                s && this.slide && this.slide.updateContentSize(!0));
        }
        loadImage(t) {
            var i, s;
            if (!this.isImageContent() || !this.element || this.instance.dispatch("contentLoadImage", { content: this, isLazy: t }).defaultPrevented) return;
            const h = this.element;
            this.updateSrcsetSizes(),
                this.data.srcset && (h.srcset = this.data.srcset),
                (h.src = null !== (i = this.data.src) && void 0 !== i ? i : ""),
                (h.alt = null !== (s = this.data.alt) && void 0 !== s ? s : ""),
                (this.state = d),
                h.complete
                    ? this.onLoaded()
                    : ((h.onload = () => {
                          this.onLoaded();
                      }),
                      (h.onerror = () => {
                          this.onError();
                      }));
        }
        setSlide(t) {
            (this.slide = t), (this.hasSlide = !0), (this.instance = t.pswp);
        }
        onLoaded() {
            (this.state = u),
                this.slide &&
                    this.element &&
                    (this.instance.dispatch("loadComplete", { slide: this.slide, content: this }),
                    this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode && (this.append(), this.slide.updateContentSize(!0)),
                    (this.state !== u && this.state !== p) || this.removePlaceholder());
        }
        onError() {
            (this.state = p), this.slide && (this.displayError(), this.instance.dispatch("loadComplete", { slide: this.slide, isError: !0, content: this }), this.instance.dispatch("loadError", { slide: this.slide, content: this }));
        }
        isLoading() {
            return this.instance.applyFilters("isContentLoading", this.state === d, this);
        }
        isError() {
            return this.state === p;
        }
        isImageContent() {
            return "image" === this.type;
        }
        setDisplayedSize(t, i) {
            if (
                this.element &&
                (this.placeholder && this.placeholder.setDisplayedSize(t, i),
                !this.instance.dispatch("contentResize", { content: this, width: t, height: i }).defaultPrevented && (l(this.element, t, i), this.isImageContent() && !this.isError()))
            ) {
                const s = !this.displayedImageWidth && t;
                (this.displayedImageWidth = t),
                    (this.displayedImageHeight = i),
                    s ? this.loadImage(!1) : this.updateSrcsetSizes(),
                    this.slide && this.instance.dispatch("imageSizeChange", { slide: this.slide, width: t, height: i, content: this });
            }
        }
        isZoomable() {
            return this.instance.applyFilters("isContentZoomable", this.isImageContent() && this.state !== p, this);
        }
        updateSrcsetSizes() {
            if (!this.isImageContent() || !this.element || !this.data.srcset) return;
            const t = this.element,
                i = this.instance.applyFilters("srcsetSizesWidth", this.displayedImageWidth, this);
            (!t.dataset.largestUsedSize || i > parseInt(t.dataset.largestUsedSize, 10)) && ((t.sizes = i + "px"), (t.dataset.largestUsedSize = String(i)));
        }
        usePlaceholder() {
            return this.instance.applyFilters("useContentPlaceholder", this.isImageContent(), this);
        }
        lazyLoad() {
            this.instance.dispatch("contentLazyLoad", { content: this }).defaultPrevented || this.load(!0);
        }
        keepPlaceholder() {
            return this.instance.applyFilters("isKeepingPlaceholder", this.isLoading(), this);
        }
        destroy() {
            (this.hasSlide = !1),
                (this.slide = void 0),
                this.instance.dispatch("contentDestroy", { content: this }).defaultPrevented ||
                    (this.remove(),
                    this.placeholder && (this.placeholder.destroy(), (this.placeholder = void 0)),
                    this.isImageContent() && this.element && ((this.element.onload = null), (this.element.onerror = null), (this.element = void 0)));
        }
        displayError() {
            if (this.slide) {
                var i, s;
                let h = t("pswp__error-msg", "div");
                (h.innerText = null !== (i = null === (s = this.instance.options) || void 0 === s ? void 0 : s.errorMsg) && void 0 !== i ? i : ""),
                    (h = this.instance.applyFilters("contentErrorElement", h, this)),
                    (this.element = t("pswp__content pswp__error-msg-container", "div")),
                    this.element.appendChild(h),
                    (this.slide.container.innerText = ""),
                    this.slide.container.appendChild(this.element),
                    this.slide.updateContentSize(!0),
                    this.removePlaceholder();
            }
        }
        append() {
            if (this.isAttached || !this.element) return;
            if (((this.isAttached = !0), this.state === p)) return void this.displayError();
            if (this.instance.dispatch("contentAppend", { content: this }).defaultPrevented) return;
            const t = "decode" in this.element;
            this.isImageContent()
                ? t && this.slide && (!this.slide.isActive || m())
                    ? ((this.isDecoding = !0),
                      this.element
                          .decode()
                          .catch(() => {})
                          .finally(() => {
                              (this.isDecoding = !1), this.appendImage();
                          }))
                    : this.appendImage()
                : this.slide && !this.element.parentNode && this.slide.container.appendChild(this.element);
        }
        activate() {
            !this.instance.dispatch("contentActivate", { content: this }).defaultPrevented &&
                this.slide &&
                (this.isImageContent() && this.isDecoding && !m() ? this.appendImage() : this.isError() && this.load(!1, !0), this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "false"));
        }
        deactivate() {
            this.instance.dispatch("contentDeactivate", { content: this }), this.slide && this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "true");
        }
        remove() {
            (this.isAttached = !1),
                this.instance.dispatch("contentRemove", { content: this }).defaultPrevented ||
                    (this.element && this.element.parentNode && this.element.remove(), this.placeholder && this.placeholder.element && this.placeholder.element.remove());
        }
        appendImage() {
            this.isAttached &&
                (this.instance.dispatch("contentAppendImage", { content: this }).defaultPrevented ||
                    (this.slide && this.element && !this.element.parentNode && this.slide.container.appendChild(this.element), (this.state !== u && this.state !== p) || this.removePlaceholder()));
        }
    }
    function J(t, i, s) {
        const h = i.createContentFromData(t, s);
        let e;
        const { options: n } = i;
        if (n) {
            let o;
            (e = new x(n, t, -1)), (o = i.pswp ? i.pswp.viewportSize : w(n, i));
            const r = y(n, o, t, s);
            e.update(h.width, h.height, r);
        }
        return h.lazyLoad(), e && h.setDisplayedSize(Math.ceil(h.width * e.initial), Math.ceil(h.height * e.initial)), h;
    }
    class Q {
        constructor(t) {
            (this.pswp = t), (this.limit = Math.max(t.options.preload[0] + t.options.preload[1] + 1, 5)), (this.Dt = []);
        }
        updateLazy(t) {
            const { pswp: i } = this;
            if (i.dispatch("lazyLoad").defaultPrevented) return;
            const { preload: s } = i.options,
                h = void 0 === t || t >= 0;
            let e;
            for (e = 0; e <= s[1]; e++) this.loadSlideByIndex(i.currIndex + (h ? e : -e));
            for (e = 1; e <= s[0]; e++) this.loadSlideByIndex(i.currIndex + (h ? -e : e));
        }
        loadSlideByIndex(t) {
            const i = this.pswp.getLoopedIndex(t);
            let s = this.getContentByIndex(i);
            s ||
                ((s = (function (t, i) {
                    const s = i.getItemData(t);
                    if (!i.dispatch("lazyLoadSlide", { index: t, itemData: s }).defaultPrevented) return J(s, i, t);
                })(i, this.pswp)),
                s && this.addToCache(s));
        }
        getContentBySlide(t) {
            let i = this.getContentByIndex(t.index);
            return i || ((i = this.pswp.createContentFromData(t.data, t.index)), this.addToCache(i)), i.setSlide(t), i;
        }
        addToCache(t) {
            if ((this.removeByIndex(t.index), this.Dt.push(t), this.Dt.length > this.limit)) {
                const t = this.Dt.findIndex((t) => !t.isAttached && !t.hasSlide);
                if (-1 !== t) {
                    this.Dt.splice(t, 1)[0].destroy();
                }
            }
        }
        removeByIndex(t) {
            const i = this.Dt.findIndex((i) => i.index === t);
            -1 !== i && this.Dt.splice(i, 1);
        }
        getContentByIndex(t) {
            return this.Dt.find((i) => i.index === t);
        }
        destroy() {
            this.Dt.forEach((t) => t.destroy()), (this.Dt = []);
        }
    }
    const tt = 0.003;
    class it {
        constructor(t) {
            (this.pswp = t),
                (this.isClosed = !0),
                (this.isOpen = !1),
                (this.isClosing = !1),
                (this.isOpening = !1),
                (this.It = void 0),
                (this.Et = !1),
                (this.Lt = !1),
                (this.kt = !1),
                (this.Zt = !1),
                (this.Bt = void 0),
                (this.Ft = void 0),
                (this.Ot = void 0),
                (this.Rt = void 0),
                (this.Nt = void 0),
                (this.Ut = this.Ut.bind(this)),
                t.on("firstZoomPan", this.Ut);
        }
        open() {
            this.Ut(), this.Pt();
        }
        close() {
            if (this.isClosed || this.isClosing || this.isOpening) return;
            const t = this.pswp.currSlide;
            (this.isOpen = !1),
                (this.isOpening = !1),
                (this.isClosing = !0),
                (this.It = this.pswp.options.hideAnimationDuration),
                t && t.currZoomLevel * t.width >= this.pswp.options.maxWidthToAnimate && (this.It = 0),
                this.Vt(),
                setTimeout(
                    () => {
                        this.Pt();
                    },
                    this.Lt ? 30 : 0
                );
        }
        Ut() {
            if ((this.pswp.off("firstZoomPan", this.Ut), !this.isOpening)) {
                const t = this.pswp.currSlide;
                (this.isOpening = !0), (this.isClosing = !1), (this.It = this.pswp.options.showAnimationDuration), t && t.zoomLevels.initial * t.width >= this.pswp.options.maxWidthToAnimate && (this.It = 0), this.Vt();
            }
        }
        Vt() {
            const { pswp: t } = this,
                i = this.pswp.currSlide,
                { options: s } = t;
            var h, e;
            ("fade" === s.showHideAnimationType
                ? ((s.showHideOpacity = !0), (this.Nt = void 0))
                : "none" === s.showHideAnimationType
                ? ((s.showHideOpacity = !1), (this.It = 0), (this.Nt = void 0))
                : this.isOpening && t.Gt
                ? (this.Nt = t.Gt)
                : (this.Nt = this.pswp.getThumbBounds()),
            (this.Bt = null == i ? void 0 : i.getPlaceholderElement()),
            t.animations.stopAll(),
            (this.Et = Boolean(this.It && this.It > 50)),
            (this.$t = Boolean(this.Nt) && (null == i ? void 0 : i.content.usePlaceholder()) && (!this.isClosing || !t.mainScroll.isShifted())),
            this.$t)
                ? (this.kt = null !== (h = s.showHideOpacity) && void 0 !== h && h)
                : ((this.kt = !0), this.isOpening && i && (i.zoomAndPanToInitial(), i.applyCurrentZoomPan()));
            if (((this.Zt = !this.kt && this.pswp.options.bgOpacity > tt), (this.Ft = this.kt ? t.element : t.bg), !this.Et))
                return (this.It = 0), (this.$t = !1), (this.Zt = !1), (this.kt = !0), void (this.isOpening && (t.element && (t.element.style.opacity = String(tt)), t.applyBgOpacity(1)));
            this.$t && this.Nt && this.Nt.innerRect
                ? ((this.Lt = !0),
                  (this.Ot = this.pswp.container),
                  (this.Rt = null === (e = this.pswp.currSlide) || void 0 === e ? void 0 : e.holderElement),
                  t.container && ((t.container.style.overflow = "hidden"), (t.container.style.width = t.viewportSize.x + "px")))
                : (this.Lt = !1);
            this.isOpening
                ? (this.kt ? (t.element && (t.element.style.opacity = String(tt)), t.applyBgOpacity(1)) : (this.Zt && t.bg && (t.bg.style.opacity = String(tt)), t.element && (t.element.style.opacity = "1")),
                  this.$t && (this.qt(), this.Bt && ((this.Bt.style.willChange = "transform"), (this.Bt.style.opacity = String(tt)))))
                : this.isClosing &&
                  (t.mainScroll.itemHolders[0] && (t.mainScroll.itemHolders[0].el.style.display = "none"),
                  t.mainScroll.itemHolders[2] && (t.mainScroll.itemHolders[2].el.style.display = "none"),
                  this.Lt && 0 !== t.mainScroll.x && (t.mainScroll.resetPosition(), t.mainScroll.resize()));
        }
        Pt() {
            this.isOpening && this.Et && this.Bt && "IMG" === this.Bt.tagName
                ? new Promise((t) => {
                      let i = !1,
                          s = !0;
                      var h;
                      ((h = this.Bt),
                      "decode" in h
                          ? h.decode().catch(() => {})
                          : h.complete
                          ? Promise.resolve(h)
                          : new Promise((t, i) => {
                                (h.onload = () => t(h)), (h.onerror = i);
                            })).finally(() => {
                          (i = !0), s || t(!0);
                      }),
                          setTimeout(() => {
                              (s = !1), i && t(!0);
                          }, 50),
                          setTimeout(t, 250);
                  }).finally(() => this.Ht())
                : this.Ht();
        }
        Ht() {
            var t, i;
            null === (t = this.pswp.element) || void 0 === t || t.style.setProperty("--pswp-transition-duration", this.It + "ms"),
                this.pswp.dispatch(this.isOpening ? "openingAnimationStart" : "closingAnimationStart"),
                this.pswp.dispatch("initialZoom" + (this.isOpening ? "In" : "Out")),
                null === (i = this.pswp.element) || void 0 === i || i.classList.toggle("pswp--ui-visible", this.isOpening),
                this.isOpening ? (this.Bt && (this.Bt.style.opacity = "1"), this.Kt()) : this.isClosing && this.Wt(),
                this.Et || this.jt();
        }
        jt() {
            const { pswp: t } = this;
            if (
                ((this.isOpen = this.isOpening),
                (this.isClosed = this.isClosing),
                (this.isOpening = !1),
                (this.isClosing = !1),
                t.dispatch(this.isOpen ? "openingAnimationEnd" : "closingAnimationEnd"),
                t.dispatch("initialZoom" + (this.isOpen ? "InEnd" : "OutEnd")),
                this.isClosed)
            )
                t.destroy();
            else if (this.isOpen) {
                var i;
                this.$t && t.container && ((t.container.style.overflow = "visible"), (t.container.style.width = "100%")), null === (i = t.currSlide) || void 0 === i || i.applyCurrentZoomPan();
            }
        }
        Kt() {
            const { pswp: t } = this;
            this.$t &&
                (this.Lt && this.Ot && this.Rt && (this.Xt(this.Ot, "transform", "translate3d(0,0,0)"), this.Xt(this.Rt, "transform", "none")),
                t.currSlide && (t.currSlide.zoomAndPanToInitial(), this.Xt(t.currSlide.container, "transform", t.currSlide.getCurrentTransform()))),
                this.Zt && t.bg && this.Xt(t.bg, "opacity", String(t.options.bgOpacity)),
                this.kt && t.element && this.Xt(t.element, "opacity", "1");
        }
        Wt() {
            const { pswp: t } = this;
            this.$t && this.qt(!0), this.Zt && t.bgOpacity > 0.01 && t.bg && this.Xt(t.bg, "opacity", "0"), this.kt && t.element && this.Xt(t.element, "opacity", "0");
        }
        qt(t) {
            if (!this.Nt) return;
            const { pswp: s } = this,
                { innerRect: h } = this.Nt,
                { currSlide: e, viewportSize: n } = s;
            if (this.Lt && h && this.Ot && this.Rt) {
                const i = -n.x + (this.Nt.x - h.x) + h.w,
                    s = -n.y + (this.Nt.y - h.y) + h.h,
                    e = n.x - h.w,
                    a = n.y - h.h;
                t ? (this.Xt(this.Ot, "transform", o(i, s)), this.Xt(this.Rt, "transform", o(e, a))) : (r(this.Ot, i, s), r(this.Rt, e, a));
            }
            e && (i(e.pan, h || this.Nt), (e.currZoomLevel = this.Nt.w / e.width), t ? this.Xt(e.container, "transform", e.getCurrentTransform()) : e.applyCurrentZoomPan());
        }
        Xt(t, i, s) {
            if (!this.It) return void (t.style[i] = s);
            const { animations: h } = this.pswp,
                e = {
                    duration: this.It,
                    easing: this.pswp.options.easing,
                    onComplete: () => {
                        h.activeAnimations.length || this.jt();
                    },
                    target: t,
                };
            (e[i] = s), h.startTransition(e);
        }
    }
    const st = {
        allowPanToNext: !0,
        spacing: 0.1,
        loop: !0,
        pinchToClose: !0,
        closeOnVerticalDrag: !0,
        hideAnimationDuration: 333,
        showAnimationDuration: 333,
        zoomAnimationDuration: 333,
        escKey: !0,
        arrowKeys: !0,
        trapFocus: !0,
        returnFocus: !0,
        maxWidthToAnimate: 4e3,
        clickToCloseNonZoomable: !0,
        imageClickAction: "zoom-or-close",
        bgClickAction: "close",
        tapAction: "toggle-controls",
        doubleTapAction: "zoom",
        indexIndicatorSep: " / ",
        preloaderDelay: 2e3,
        bgOpacity: 0.8,
        index: 0,
        errorMsg: "The image cannot be loaded",
        preload: [1, 2],
        easing: "cubic-bezier(.4,0,.22,1)",
    };
    return class extends class extends class {
        constructor() {
            (this.Yt = {}), (this.Jt = {}), (this.pswp = void 0), (this.options = void 0);
        }
        addFilter(t, i, s = 100) {
            var h, e, n;
            this.Jt[t] || (this.Jt[t] = []),
                null === (h = this.Jt[t]) || void 0 === h || h.push({ fn: i, priority: s }),
                null === (e = this.Jt[t]) || void 0 === e || e.sort((t, i) => t.priority - i.priority),
                null === (n = this.pswp) || void 0 === n || n.addFilter(t, i, s);
        }
        removeFilter(t, i) {
            this.Jt[t] && (this.Jt[t] = this.Jt[t].filter((t) => t.fn !== i)), this.pswp && this.pswp.removeFilter(t, i);
        }
        applyFilters(t, ...i) {
            var s;
            return (
                null === (s = this.Jt[t]) ||
                    void 0 === s ||
                    s.forEach((t) => {
                        i[0] = t.fn.apply(this, i);
                    }),
                i[0]
            );
        }
        on(t, i) {
            var s, h;
            this.Yt[t] || (this.Yt[t] = []), null === (s = this.Yt[t]) || void 0 === s || s.push(i), null === (h = this.pswp) || void 0 === h || h.on(t, i);
        }
        off(t, i) {
            var s;
            this.Yt[t] && (this.Yt[t] = this.Yt[t].filter((t) => i !== t)), null === (s = this.pswp) || void 0 === s || s.off(t, i);
        }
        dispatch(t, i) {
            var s;
            if (this.pswp) return this.pswp.dispatch(t, i);
            const h = new j(t, i);
            return (
                null === (s = this.Yt[t]) ||
                    void 0 === s ||
                    s.forEach((t) => {
                        t.call(this, h);
                    }),
                h
            );
        }
    } {
        getNumItems() {
            var t;
            let i = 0;
            const s = null === (t = this.options) || void 0 === t ? void 0 : t.dataSource;
            s && "length" in s ? (i = s.length) : s && "gallery" in s && (s.items || (s.items = this.Qt(s.gallery)), s.items && (i = s.items.length));
            const h = this.dispatch("numItems", { dataSource: s, numItems: i });
            return this.applyFilters("numItems", h.numItems, s);
        }
        createContentFromData(t, i) {
            return new Y(t, this, i);
        }
        getItemData(t) {
            var i;
            const s = null === (i = this.options) || void 0 === i ? void 0 : i.dataSource;
            let h = {};
            Array.isArray(s) ? (h = s[t]) : s && "gallery" in s && (s.items || (s.items = this.Qt(s.gallery)), (h = s.items[t]));
            let e = h;
            e instanceof Element && (e = this.ti(e));
            const n = this.dispatch("itemData", { itemData: e || {}, index: t });
            return this.applyFilters("itemData", n.itemData, t);
        }
        Qt(t) {
            var i, s;
            return (null !== (i = this.options) && void 0 !== i && i.children) || (null !== (s = this.options) && void 0 !== s && s.childSelector)
                ? (function (t, i, s = document) {
                      let h = [];
                      if (t instanceof Element) h = [t];
                      else if (t instanceof NodeList || Array.isArray(t)) h = Array.from(t);
                      else {
                          const e = "string" == typeof t ? t : i;
                          e && (h = Array.from(s.querySelectorAll(e)));
                      }
                      return h;
                  })(this.options.children, this.options.childSelector, t) || []
                : [t];
        }
        ti(t) {
            const i = { element: t },
                s = "A" === t.tagName ? t : t.querySelector("a");
            if (s) {
                (i.src = s.dataset.pswpSrc || s.href),
                    s.dataset.pswpSrcset && (i.srcset = s.dataset.pswpSrcset),
                    (i.width = s.dataset.pswpWidth ? parseInt(s.dataset.pswpWidth, 10) : 0),
                    (i.height = s.dataset.pswpHeight ? parseInt(s.dataset.pswpHeight, 10) : 0),
                    (i.w = i.width),
                    (i.h = i.height),
                    s.dataset.pswpType && (i.type = s.dataset.pswpType);
                const e = t.querySelector("img");
                var h;
                if (e) (i.msrc = e.currentSrc || e.src), (i.alt = null !== (h = e.getAttribute("alt")) && void 0 !== h ? h : "");
                (s.dataset.pswpCropped || s.dataset.cropped) && (i.thumbCropped = !0);
            }
            return this.applyFilters("domItemData", i, t, s);
        }
        lazyLoadData(t, i) {
            return J(t, this, i);
        }
    } {
        constructor(t) {
            super(),
                (this.options = this.ii(t || {})),
                (this.offset = { x: 0, y: 0 }),
                (this.si = { x: 0, y: 0 }),
                (this.viewportSize = { x: 0, y: 0 }),
                (this.bgOpacity = 1),
                (this.currIndex = 0),
                (this.potentialIndex = 0),
                (this.isOpen = !1),
                (this.isDestroying = !1),
                (this.hasMouse = !1),
                (this.hi = {}),
                (this.Gt = void 0),
                (this.topBar = void 0),
                (this.element = void 0),
                (this.template = void 0),
                (this.container = void 0),
                (this.scrollWrap = void 0),
                (this.currSlide = void 0),
                (this.events = new f()),
                (this.animations = new F()),
                (this.mainScroll = new A(this)),
                (this.gestures = new T(this)),
                (this.opener = new it(this)),
                (this.keyboard = new E(this)),
                (this.contentLoader = new Q(this));
        }
        init() {
            if (this.isOpen || this.isDestroying) return !1;
            (this.isOpen = !0), this.dispatch("init"), this.dispatch("beforeOpen"), this.ei();
            let t = "pswp--open";
            return (
                this.gestures.supportsTouch && (t += " pswp--touch"),
                this.options.mainClass && (t += " " + this.options.mainClass),
                this.element && (this.element.className += " " + t),
                (this.currIndex = this.options.index || 0),
                (this.potentialIndex = this.currIndex),
                this.dispatch("firstUpdate"),
                (this.scrollWheel = new O(this)),
                (Number.isNaN(this.currIndex) || this.currIndex < 0 || this.currIndex >= this.getNumItems()) && (this.currIndex = 0),
                this.gestures.supportsTouch || this.mouseDetected(),
                this.updateSize(),
                (this.offset.y = window.pageYOffset),
                (this.hi = this.getItemData(this.currIndex)),
                this.dispatch("gettingData", { index: this.currIndex, data: this.hi, slide: void 0 }),
                (this.Gt = this.getThumbBounds()),
                this.dispatch("initialLayout"),
                this.on("openingAnimationEnd", () => {
                    const { itemHolders: t } = this.mainScroll;
                    t[0] && ((t[0].el.style.display = "block"), this.setContent(t[0], this.currIndex - 1)),
                        t[2] && ((t[2].el.style.display = "block"), this.setContent(t[2], this.currIndex + 1)),
                        this.appendHeavy(),
                        this.contentLoader.updateLazy(),
                        this.events.add(window, "resize", this.ni.bind(this)),
                        this.events.add(window, "scroll", this.oi.bind(this)),
                        this.dispatch("bindEvents");
                }),
                this.mainScroll.itemHolders[1] && this.setContent(this.mainScroll.itemHolders[1], this.currIndex),
                this.dispatch("change"),
                this.opener.open(),
                this.dispatch("afterInit"),
                !0
            );
        }
        getLoopedIndex(t) {
            const i = this.getNumItems();
            return this.options.loop && (t > i - 1 && (t -= i), t < 0 && (t += i)), n(t, 0, i - 1);
        }
        appendHeavy() {
            this.mainScroll.itemHolders.forEach((t) => {
                var i;
                null === (i = t.slide) || void 0 === i || i.appendHeavy();
            });
        }
        goTo(t) {
            this.mainScroll.moveIndexBy(this.getLoopedIndex(t) - this.potentialIndex);
        }
        next() {
            this.goTo(this.potentialIndex + 1);
        }
        prev() {
            this.goTo(this.potentialIndex - 1);
        }
        zoomTo(...t) {
            var i;
            null === (i = this.currSlide) || void 0 === i || i.zoomTo(...t);
        }
        toggleZoom() {
            var t;
            null === (t = this.currSlide) || void 0 === t || t.toggleZoom();
        }
        close() {
            this.opener.isOpen && !this.isDestroying && ((this.isDestroying = !0), this.dispatch("close"), this.events.removeAll(), this.opener.close());
        }
        destroy() {
            var t;
            if (!this.isDestroying) return (this.options.showHideAnimationType = "none"), void this.close();
            this.dispatch("destroy"),
                (this.Yt = {}),
                this.scrollWrap && ((this.scrollWrap.ontouchmove = null), (this.scrollWrap.ontouchend = null)),
                null === (t = this.element) || void 0 === t || t.remove(),
                this.mainScroll.itemHolders.forEach((t) => {
                    var i;
                    null === (i = t.slide) || void 0 === i || i.destroy();
                }),
                this.contentLoader.destroy(),
                this.events.removeAll();
        }
        refreshSlideContent(t) {
            this.contentLoader.removeByIndex(t),
                this.mainScroll.itemHolders.forEach((i, s) => {
                    var h, e;
                    let n = (null !== (h = null === (e = this.currSlide) || void 0 === e ? void 0 : e.index) && void 0 !== h ? h : 0) - 1 + s;
                    var o;
                    (this.canLoop() && (n = this.getLoopedIndex(n)), n === t) && (this.setContent(i, t, !0), 1 === s && ((this.currSlide = i.slide), null === (o = i.slide) || void 0 === o || o.setIsActive(!0)));
                }),
                this.dispatch("change");
        }
        setContent(t, i, s) {
            if ((this.canLoop() && (i = this.getLoopedIndex(i)), t.slide)) {
                if (t.slide.index === i && !s) return;
                t.slide.destroy(), (t.slide = void 0);
            }
            if (!this.canLoop() && (i < 0 || i >= this.getNumItems())) return;
            const h = this.getItemData(i);
            (t.slide = new b(h, i, this)), i === this.currIndex && (this.currSlide = t.slide), t.slide.append(t.el);
        }
        getViewportCenterPoint() {
            return { x: this.viewportSize.x / 2, y: this.viewportSize.y / 2 };
        }
        updateSize(t) {
            if (this.isDestroying) return;
            const s = w(this.options, this);
            (!t && e(s, this.si)) ||
                (i(this.si, s),
                this.dispatch("beforeResize"),
                i(this.viewportSize, this.si),
                this.oi(),
                this.dispatch("viewportSize"),
                this.mainScroll.resize(this.opener.isOpen),
                !this.hasMouse && window.matchMedia("(any-hover: hover)").matches && this.mouseDetected(),
                this.dispatch("resize"));
        }
        applyBgOpacity(t) {
            (this.bgOpacity = Math.max(t, 0)), this.bg && (this.bg.style.opacity = String(this.bgOpacity * this.options.bgOpacity));
        }
        mouseDetected() {
            var t;
            this.hasMouse || ((this.hasMouse = !0), null === (t = this.element) || void 0 === t || t.classList.add("pswp--has_mouse"));
        }
        ni() {
            this.updateSize(),
                /iPhone|iPad|iPod/i.test(window.navigator.userAgent) &&
                    setTimeout(() => {
                        this.updateSize();
                    }, 500);
        }
        oi() {
            this.setScrollOffset(0, window.pageYOffset);
        }
        setScrollOffset(t, i) {
            (this.offset.x = t), (this.offset.y = i), this.dispatch("updateScrollOffset");
        }
        ei() {
            (this.element = t("pswp", "div")),
                this.element.setAttribute("tabindex", "-1"),
                this.element.setAttribute("role", "dialog"),
                (this.template = this.element),
                (this.bg = t("pswp__bg", "div", this.element)),
                (this.scrollWrap = t("pswp__scroll-wrap", "section", this.element)),
                (this.container = t("pswp__container", "div", this.scrollWrap)),
                this.scrollWrap.setAttribute("aria-roledescription", "carousel"),
                this.container.setAttribute("aria-live", "off"),
                this.container.setAttribute("id", "pswp__items"),
                this.mainScroll.appendHolders(),
                (this.ui = new W(this)),
                this.ui.init(),
                (this.options.appendToEl || document.body).appendChild(this.element);
        }
        getThumbBounds() {
            return (function (t, i, s) {
                const h = s.dispatch("thumbBounds", { index: t, itemData: i, instance: s });
                if (h.thumbBounds) return h.thumbBounds;
                const { element: e } = i;
                let n, o;
                if (e && !1 !== s.options.thumbSelector) {
                    const t = s.options.thumbSelector || "img";
                    o = e.matches(t) ? e : e.querySelector(t);
                }
                return (
                    (o = s.applyFilters("thumbEl", o, i, t)),
                    o &&
                        (n = i.thumbCropped
                            ? (function (t, i, s) {
                                  const h = t.getBoundingClientRect(),
                                      e = h.width / i,
                                      n = h.height / s,
                                      o = e > n ? e : n,
                                      r = (h.width - i * o) / 2,
                                      a = (h.height - s * o) / 2,
                                      l = { x: h.left + r, y: h.top + a, w: i * o };
                                  return (l.innerRect = { w: h.width, h: h.height, x: r, y: a }), l;
                              })(o, i.width || i.w || 0, i.height || i.h || 0)
                            : (function (t) {
                                  const i = t.getBoundingClientRect();
                                  return { x: i.left, y: i.top, w: i.width };
                              })(o)),
                    s.applyFilters("thumbBounds", n, i, t)
                );
            })(this.currIndex, this.currSlide ? this.currSlide.data : this.hi, this);
        }
        canLoop() {
            return this.options.loop && this.getNumItems() > 2;
        }
        ii(t) {
            return window.matchMedia("(prefers-reduced-motion), (update: slow)").matches && ((t.showHideAnimationType = "none"), (t.zoomAnimationDuration = 0)), { ...st, ...t };
        }
    };
});
