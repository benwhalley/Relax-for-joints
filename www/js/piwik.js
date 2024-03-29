/*!
 * Piwik - free/libre analytics platform
 *
 * JavaScript tracking client
 *
 * @link http://piwik.org
 * @source https://github.com/piwik/piwik/blob/master/js/piwik.js
 * @license http://piwik.org/free-software/bsd/ BSD-3 Clause (also in js/LICENSE.txt)
 * @license magnet:?xt=urn:btih:c80d50af7d3db9be66a4d0a86db0286e4fd33292&dn=bsd-3-clause.txt BSD-3-Clause
 */
if (typeof JSON2 !== "object") {
    JSON2 = window.JSON || {}
}(function() {
    function d(f) {
        return f < 10 ? "0" + f : f
    }
    function l(n, m) {
        var f = Object.prototype.toString.apply(n);
        if (f === "[object Date]") {
            return isFinite(n.valueOf()) ? n.getUTCFullYear() + "-" + d(n.getUTCMonth() + 1) + "-" + d(n.getUTCDate()) + "T" + d(n.getUTCHours()) + ":" + d(n.getUTCMinutes()) + ":" + d(n.getUTCSeconds()) + "Z" : null
        }
        if (f === "[object String]" || f === "[object Number]" || f === "[object Boolean]") {
            return n.valueOf()
        }
        if (f !== "[object Array]" && typeof n.toJSON === "function") {
            return n.toJSON(m)
        }
        return n
    }
    var c = new RegExp("[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]", "g"), e = '\\\\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]', i = new RegExp("[" + e, "g"), j, b, k = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, h;
    function a(f) {
        i.lastIndex = 0;
        return i.test(f) ? '"' + f.replace(i, function(m) {
            var n = k[m];
            return typeof n === "string" ? n : "\\u" + ("0000" + m.charCodeAt(0).toString(16)).slice( - 4)
        }) + '"' : '"' + f + '"'
    }
    function g(s, p) {
        var n, m, t, f, q = j, o, r = p[s];
        if (r && typeof r === "object") {
            r = l(r, s)
        }
        if (typeof h === "function") {
            r = h.call(p, s, r)
        }
        switch (typeof r) {
        case"string":
            return a(r);
        case"number":
            return isFinite(r) ? String(r) : "null";
        case"boolean":
        case"null":
            return String(r);
        case"object":
            if (!r) {
                return "null"
            }
            j += b;
            o = [];
            if (Object.prototype.toString.apply(r) === "[object Array]") {
                f = r.length;
                for (n = 0; n < f; n += 1) {
                    o[n] = g(n, r) || "null"
                }
                t = o.length === 0 ? "[]" : j ? "[\n" + j + o.join(",\n" + j) + "\n" + q + "]" : "[" + o.join(",") + "]";
                j = q;
                return t
            }
            if (h && typeof h === "object") {
                f = h.length;
                for (n = 0; n < f; n += 1) {
                    if (typeof h[n] === "string") {
                        m = h[n];
                        t = g(m, r);
                        if (t) {
                            o.push(a(m) + (j ? ": " : ":") + t)
                        }
                    }
                }
            } else {
                for (m in r) {
                    if (Object.prototype.hasOwnProperty.call(r, m)) {
                        t = g(m, r);
                        if (t) {
                            o.push(a(m) + (j ? ": " : ":") + t)
                        }
                    }
                }
            }
            t = o.length === 0 ? "{}" : j ? "{\n" + j + o.join(",\n" + j) + "\n" + q + "}" : "{" + o.join(",") + "}";
            j = q;
            return t
        }
    }
    if (typeof JSON2.stringify !== "function") {
        JSON2.stringify = function(o, m, n) {
            var f;
            j = "";
            b = "";
            if (typeof n === "number") {
                for (f = 0; f < n; f += 1) {
                    b += " "
                }
            } else {
                if (typeof n === "string") {
                    b = n
                }
            }
            h = m;
            if (m && typeof m !== "function" && (typeof m !== "object" || typeof m.length !== "number")) {
                throw new Error("JSON2.stringify")
            }
            return g("", {
                "": o
            })
        }
    }
    if (typeof JSON2.parse !== "function") {
        JSON2.parse = function(o, f) {
            var n;
            function m(s, r) {
                var q, p, t = s[r];
                if (t && typeof t === "object") {
                    for (q in t) {
                        if (Object.prototype.hasOwnProperty.call(t, q)) {
                            p = m(t, q);
                            if (p !== undefined) {
                                t[q] = p
                            } else {
                                delete t[q]
                            }
                        }
                    }
                }
                return f.call(s, r, t)
            }
            o = String(o);
            c.lastIndex = 0;
            if (c.test(o)) {
                o = o.replace(c, function(p) {
                    return "\\u" + ("0000" + p.charCodeAt(0).toString(16)).slice( - 4)
                })
            }
            if ((new RegExp("^[\\],:{}\\s]*$")).test(o.replace(new RegExp('\\\\(?:["\\\\/bfnrt]|u[0-9a-fA-F]{4})', "g"), "@").replace(new RegExp('"[^"\\\\\n\r]*"|true|false|null|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?', "g"), "]").replace(new RegExp("(?:^|:|,)(?:\\s*\\[)+", "g"), ""))) {
                n = eval("(" + o + ")");
                return typeof f === "function" ? m({
                    "": n
                }, "") : n
            }
            throw new SyntaxError("JSON2.parse")
        }
    }
}());
if (typeof _paq !== "object") {
    _paq = []
}
if (typeof Piwik !== "object") {
    Piwik = (function() {
        var j, a = {}, u = document, e = navigator, K = screen, G = window, f = G.performance || G.mozPerformance || G.msPerformance || G.webkitPerformance, p = false, E = [], l = G.encodeURIComponent, F = G.decodeURIComponent, h = unescape, L, t, d;
        function w(X) {
            var W = typeof X;
            return W !== "undefined"
        }
        function q(W) {
            return typeof W === "function"
        }
        function J(W) {
            return typeof W === "object"
        }
        function n(W) {
            return typeof W === "string" || W instanceof String
        }
        function R() {
            var W, Y, X;
            for (W = 0; W < arguments.length; W += 1) {
                X = arguments[W];
                Y = X.shift();
                if (n(Y)) {
                    L[Y].apply(L, X)
                } else {
                    Y.apply(L, X)
                }
            }
        }
        function U(Z, Y, X, W) {
            if (Z.addEventListener) {
                Z.addEventListener(Y, X, W);
                return true
            }
            if (Z.attachEvent) {
                return Z.attachEvent("on" + Y, X)
            }
            Z["on" + Y] = X
        }
        function O(X, aa) {
            var W = "", Z, Y;
            for (Z in a) {
                if (Object.prototype.hasOwnProperty.call(a, Z)) {
                    Y = a[Z][X];
                    if (q(Y)) {
                        W += Y(aa)
                    }
                }
            }
            return W
        }
        function S() {
            var W;
            O("unload");
            if (j) {
                do {
                    W = new Date()
                }
                while (W.getTimeAlias() < j)
                }
        }
        function P() {
            var W;
            if (!p) {
                p = true;
                O("load");
                for (W = 0; W < E.length; W++) {
                    E[W]()
                }
            }
            return true
        }
        function o() {
            var X;
            if (u.addEventListener) {
                U(u, "DOMContentLoaded", function W() {
                    u.removeEventListener("DOMContentLoaded", W, false);
                    P()
                })
            } else {
                if (u.attachEvent) {
                    u.attachEvent("onreadystatechange", function W() {
                        if (u.readyState === "complete") {
                            u.detachEvent("onreadystatechange", W);
                            P()
                        }
                    });
                    if (u.documentElement.doScroll && G === G.top) {
                        (function W() {
                            if (!p) {
                                try {
                                    u.documentElement.doScroll("left")
                                } catch (Y) {
                                    setTimeout(W, 0);
                                    return 
                                }
                                P()
                            }
                        }())
                    }
                }
            }
            if ((new RegExp("WebKit")).test(e.userAgent)) {
                X = setInterval(function() {
                    if (p || /loaded|complete/.test(u.readyState)) {
                        clearInterval(X);
                        P()
                    }
                }, 10)
            }
            U(G, "load", P, false)
        }
        function i(Y, X) {
            var W = u.createElement("script");
            W.type = "text/javascript";
            W.src = Y;
            if (W.readyState) {
                W.onreadystatechange = function() {
                    var Z = this.readyState;
                    if (Z === "loaded" || Z === "complete") {
                        W.onreadystatechange = null;
                        X()
                    }
                }
            } else {
                W.onload = X
            }
            u.getElementsByTagName("head")[0].appendChild(W)
        }
        function x() {
            var W = "";
            try {
                W = G.top.document.referrer
            } catch (Y) {
                if (G.parent) {
                    try {
                        W = G.parent.document.referrer
                    } catch (X) {
                        W = ""
                    }
                }
            }
            if (W === "") {
                W = u.referrer
            }
            return W
        }
        function k(W) {
            var Y = new RegExp("^([a-z]+):"), X = Y.exec(W);
            return X ? X[1] : null
        }
        function c(W) {
            var Y = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)"), X = Y.exec(W);
            return X ? X[1] : W
        }
        function I(Y, X) {
            var W = "[\\?&#]" + X + "=([^&#]*)";
            var aa = new RegExp(W);
            var Z = aa.exec(Y);
            return Z ? F(Z[1]) : ""
        }
        function s(W) {
            return unescape(l(W))
        }
        function T(am) {
            var Z = function(ar, W) {
                return (ar<<W) | (ar>>>(32 - W))
            }, an = function(au) {
                var ar = "", at, W;
                for (at = 7; at >= 0; at--) {
                    W = (au>>>(at * 4)) & 15;
                    ar += W.toString(16)
                }
                return ar
            }, ac, ap, ao, Y = [], ag = 1732584193, ae = 4023233417, ad = 2562383102, ab = 271733878, aa = 3285377520, al, ak, aj, ai, ah, aq, X, af = [];
            am = s(am);
            X = am.length;
            for (ap = 0; ap < X - 3; ap += 4) {
                ao = am.charCodeAt(ap)<<24 | am.charCodeAt(ap + 1)<<16 | am.charCodeAt(ap + 2)<<8 | am.charCodeAt(ap + 3);
                af.push(ao)
            }
            switch (X & 3) {
            case 0:
                ap = 2147483648;
                break;
            case 1:
                ap = am.charCodeAt(X - 1)<<24 | 8388608;
                break;
            case 2:
                ap = am.charCodeAt(X - 2)<<24 | am.charCodeAt(X - 1)<<16 | 32768;
                break;
            case 3:
                ap = am.charCodeAt(X - 3)<<24 | am.charCodeAt(X - 2)<<16 | am.charCodeAt(X - 1)<<8 | 128;
                break
            }
            af.push(ap);
            while ((af.length & 15) !== 14) {
                af.push(0)
            }
            af.push(X>>>29);
            af.push((X<<3) & 4294967295);
            for (ac = 0; ac < af.length; ac += 16) {
                for (ap = 0; ap < 16; ap++) {
                    Y[ap] = af[ac + ap]
                }
                for (ap = 16; ap <= 79; ap++) {
                    Y[ap] = Z(Y[ap - 3]^Y[ap - 8]^Y[ap - 14]^Y[ap - 16], 1)
                }
                al = ag;
                ak = ae;
                aj = ad;
                ai = ab;
                ah = aa;
                for (ap = 0; ap <= 19; ap++) {
                    aq = (Z(al, 5) + ((ak & aj) | (~ak & ai)) + ah + Y[ap] + 1518500249) & 4294967295;
                    ah = ai;
                    ai = aj;
                    aj = Z(ak, 30);
                    ak = al;
                    al = aq
                }
                for (ap = 20; ap <= 39; ap++) {
                    aq = (Z(al, 5) + (ak^aj^ai) + ah + Y[ap] + 1859775393) & 4294967295;
                    ah = ai;
                    ai = aj;
                    aj = Z(ak, 30);
                    ak = al;
                    al = aq
                }
                for (ap = 40; ap <= 59; ap++) {
                    aq = (Z(al, 5) + ((ak & aj) | (ak & ai) | (aj & ai)) + ah + Y[ap] + 2400959708) & 4294967295;
                    ah = ai;
                    ai = aj;
                    aj = Z(ak, 30);
                    ak = al;
                    al = aq
                }
                for (ap = 60; ap <= 79; ap++) {
                    aq = (Z(al, 5) + (ak^aj^ai) + ah + Y[ap] + 3395469782) & 4294967295;
                    ah = ai;
                    ai = aj;
                    aj = Z(ak, 30);
                    ak = al;
                    al = aq
                }
                ag = (ag + al) & 4294967295;
                ae = (ae + ak) & 4294967295;
                ad = (ad + aj) & 4294967295;
                ab = (ab + ai) & 4294967295;
                aa = (aa + ah) & 4294967295
            }
            aq = an(ag) + an(ae) + an(ad) + an(ab) + an(aa);
            return aq.toLowerCase()
        }
        function N(Y, W, X) {
            if (Y === "translate.googleusercontent.com") {
                if (X === "") {
                    X = W
                }
                W = I(W, "u");
                Y = c(W)
            } else {
                if (Y === "cc.bingj.com" || Y === "webcache.googleusercontent.com" || Y.slice(0, 5) === "74.6.") {
                    W = u.links[0].href;
                    Y = c(W)
                }
            }
            return [Y, W, X]
        }
        function y(X) {
            var W = X.length;
            if (X.charAt(--W) === ".") {
                X = X.slice(0, W)
            }
            if (X.slice(0, 2) === "*.") {
                X = X.slice(1)
            }
            return X
        }
        function V(X) {
            X = X && X.text ? X.text : X;
            if (!n(X)) {
                var W = u.getElementsByTagName("title");
                if (W && w(W[0])) {
                    X = W[0].text
                }
            }
            return X
        }
        function C(W) {
            if (!W) {
                return []
            }
            if (!w(W.children) && w(W.childNodes)) {
                return W.children
            }
            if (w(W.children)) {
                return W.children
            }
            return []
        }
        function H(X, W) {
            if (!X ||!W) {
                return false
            }
            if (X.contains) {
                return X.contains(W)
            }
            if (X === W) {
                return true
            }
            if (X.compareDocumentPosition) {
                return !!(X.compareDocumentPosition(W) & 16)
            }
            return false
        }
        function z(Y, Z) {
            if (Y && Y.indexOf) {
                return Y.indexOf(Z)
            }
            if (!w(Y) || Y === null) {
                return - 1
            }
            if (!Y.length) {
                return - 1
            }
            var W = Y.length;
            if (W === 0) {
                return - 1
            }
            var X = 0;
            while (X < W) {
                if (Y[X] === Z) {
                    return X
                }
                X++
            }
            return - 1
        }
        function g(Y) {
            if (!Y) {
                return false
            }
            function W(aa, ab) {
                if (G.getComputedStyle) {
                    return u.defaultView.getComputedStyle(aa, null)[ab]
                }
                if (aa.currentStyle) {
                    return aa.currentStyle[ab]
                }
            }
            function Z(aa) {
                aa = aa.parentNode;
                while (aa) {
                    if (aa === u) {
                        return true
                    }
                    aa = aa.parentNode
                }
                return false
            }
            function X(ac, ai, aa, af, ad, ag, ae) {
                var ab = ac.parentNode, ah = 1;
                if (!Z(ac)) {
                    return false
                }
                if (9 === ab.nodeType) {
                    return true
                }
                if ("0" === W(ac, "opacity") || "none" === W(ac, "display") || "hidden" === W(ac, "visibility")) {
                    return false
                }
                if (!w(ai) ||!w(aa) ||!w(af) ||!w(ad) ||!w(ag) ||!w(ae)) {
                    ai = ac.offsetTop;
                    ad = ac.offsetLeft;
                    af = ai + ac.offsetHeight;
                    aa = ad + ac.offsetWidth;
                    ag = ac.offsetWidth;
                    ae = ac.offsetHeight
                }
                if (Y === ac && (0 === ae || 0 === ag) && "hidden" === W(ac, "overflow")) {
                    return false
                }
                if (ab) {
                    if (("hidden" === W(ab, "overflow") || "scroll" === W(ab, "overflow"))) {
                        if (ad + ah > ab.offsetWidth + ab.scrollLeft || ad + ag - ah < ab.scrollLeft || ai + ah > ab.offsetHeight + ab.scrollTop || ai + ae - ah < ab.scrollTop) {
                            return false
                        }
                    }
                    if (ac.offsetParent === ab) {
                        ad += ab.offsetLeft;
                        ai += ab.offsetTop
                    }
                    return X(ab, ai, aa, af, ad, ag, ae)
                }
                return true
            }
            return X(Y)
        }
        var Q = {
            htmlCollectionToArray: function(Y) {
                var W = [], X;
                if (!Y ||!Y.length) {
                    return W
                }
                for (X = 0; X < Y.length; X++) {
                    W.push(Y[X])
                }
                return W
            },
            find: function(W) {
                if (!document.querySelectorAll ||!W) {
                    return []
                }
                var X = document.querySelectorAll(W);
                return this.htmlCollectionToArray(X)
            },
            findMultiple: function(Y) {
                if (!Y ||!Y.length) {
                    return []
                }
                var X, Z;
                var W = [];
                for (X = 0; X < Y.length; X++) {
                    Z = this.find(Y[X]);
                    W = W.concat(Z)
                }
                W = this.makeNodesUnique(W);
                return W
            },
            findNodesByTagName: function(X, W) {
                if (!X ||!W ||!X.getElementsByTagName) {
                    return []
                }
                var Y = X.getElementsByTagName(W);
                return this.htmlCollectionToArray(Y)
            },
            makeNodesUnique: function(W) {
                var ab = [].concat(W);
                W.sort(function(ad, ac) {
                    if (ad === ac) {
                        return 0
                    }
                    var af = z(ab, ad);
                    var ae = z(ab, ac);
                    if (af === ae) {
                        return 0
                    }
                    return af > ae?-1 : 1
                });
                if (W.length <= 1) {
                    return W
                }
                var X = 0;
                var Z = 0;
                var aa = [];
                var Y;
                Y = W[X++];
                while (Y) {
                    if (Y === W[X]) {
                        Z = aa.push(X)
                    }
                    Y = W[X++] || null
                }
                while (Z--) {
                    W.splice(aa[Z], 1)
                }
                return W
            },
            getAttributeValueFromNode: function(aa, Y) {
                if (!this.hasNodeAttribute(aa, Y)) {
                    return 
                }
                if (aa && aa.getAttribute) {
                    return aa.getAttribute(Y)
                }
                if (!aa ||!aa.attributes) {
                    return 
                }
                var Z = (typeof aa.attributes[Y]);
                if ("undefined" === Z) {
                    return 
                }
                if (aa.attributes[Y].value) {
                    return aa.attributes[Y].value
                }
                if (aa.attributes[Y].nodeValue) {
                    return aa.attributes[Y].nodeValue
                }
                var X;
                var W = aa.attributes;
                if (!W) {
                    return 
                }
                for (X = 0; X < W.length; X++) {
                    if (W[X].nodeName === Y) {
                        return W[X].nodeValue
                    }
                }
                return null
            },
            hasNodeAttributeWithValue: function(X, W) {
                var Y = this.getAttributeValueFromNode(X, W);
                return !!Y
            },
            hasNodeAttribute: function(Y, W) {
                if (Y && Y.hasAttribute) {
                    return Y.hasAttribute(W)
                }
                if (Y && Y.attributes) {
                    var X = (typeof Y.attributes[W]);
                    return "undefined" !== X
                }
                return false
            },
            hasNodeCssClass: function(Y, W) {
                if (Y && W && Y.className) {
                    var X = typeof Y.className === "string" ? Y.className.split(" "): [];
                    if ( - 1 !== z(X, W)) {
                        return true
                    }
                }
                return false
            },
            findNodesHavingAttribute: function(aa, Y, W) {
                if (!W) {
                    W = []
                }
                if (!aa ||!Y) {
                    return W
                }
                var Z = C(aa);
                if (!Z ||!Z.length) {
                    return W
                }
                var X, ab;
                for (X = 0; X < Z.length; X++) {
                    ab = Z[X];
                    if (this.hasNodeAttribute(ab, Y)) {
                        W.push(ab)
                    }
                    W = this.findNodesHavingAttribute(ab, Y, W)
                }
                return W
            },
            findFirstNodeHavingAttribute: function(Y, X) {
                if (!Y ||!X) {
                    return
                }
                if (this.hasNodeAttribute(Y, X)) {
                    return Y
                }
                var W = this.findNodesHavingAttribute(Y, X);
                if (W && W.length) {
                    return W[0]
                }
            },
            findFirstNodeHavingAttributeWithValue: function(Z, Y) {
                if (!Z ||!Y) {
                    return 
                }
                if (this.hasNodeAttributeWithValue(Z, Y)) {
                    return Z
                }
                var W = this.findNodesHavingAttribute(Z, Y);
                if (!W ||!W.length) {
                    return 
                }
                var X;
                for (X = 0; X < W.length; X++) {
                    if (this.getAttributeValueFromNode(W[X], Y)) {
                        return W[X]
                    }
                }
            },
            findNodesHavingCssClass: function(aa, Z, W) {
                if (!W) {
                    W = []
                }
                if (!aa ||!Z) {
                    return W
                }
                if (aa.getElementsByClassName) {
                    var ab = aa.getElementsByClassName(Z);
                    return this.htmlCollectionToArray(ab)
                }
                var Y = C(aa);
                if (!Y ||!Y.length) {
                    return []
                }
                var X, ac;
                for (X = 0; X < Y.length; X++) {
                    ac = Y[X];
                    if (this.hasNodeCssClass(ac, Z)) {
                        W.push(ac)
                    }
                    W = this.findNodesHavingCssClass(ac, Z, W)
                }
                return W
            },
            findFirstNodeHavingClass: function(Y, X) {
                if (!Y ||!X) {
                    return 
                }
                if (this.hasNodeCssClass(Y, X)) {
                    return Y
                }
                var W = this.findNodesHavingCssClass(Y, X);
                if (W && W.length) {
                    return W[0]
                }
            },
            isLinkElement: function(X) {
                if (!X) {
                    return false
                }
                var W = String(X.nodeName).toLowerCase();
                var Z = ["a", "area"];
                var Y = z(Z, W);
                return Y!==-1
            },
            setAnyAttribute: function(X, W, Y) {
                if (!X ||!W) {
                    return 
                }
                if (X.setAttribute) {
                    X.setAttribute(W, Y)
                } else {
                    X[W] = Y
                }
            }
        };
        var m = {
            CONTENT_ATTR: "data-track-content",
            CONTENT_CLASS: "piwikTrackContent",
            CONTENT_NAME_ATTR: "data-content-name",
            CONTENT_PIECE_ATTR: "data-content-piece",
            CONTENT_PIECE_CLASS: "piwikContentPiece",
            CONTENT_TARGET_ATTR: "data-content-target",
            CONTENT_TARGET_CLASS: "piwikContentTarget",
            CONTENT_IGNOREINTERACTION_ATTR: "data-content-ignoreinteraction",
            CONTENT_IGNOREINTERACTION_CLASS: "piwikContentIgnoreInteraction",
            location: undefined,
            findContentNodes: function() {
                var X = "." + this.CONTENT_CLASS;
                var W = "[" + this.CONTENT_ATTR + "]";
                var Y = Q.findMultiple([X, W]);
                return Y
            },
            findContentNodesWithinNode: function(Z) {
                if (!Z) {
                    return []
                }
                var X = Q.findNodesHavingCssClass(Z, this.CONTENT_CLASS);
                var W = Q.findNodesHavingAttribute(Z, this.CONTENT_ATTR);
                if (W && W.length) {
                    var Y;
                    for (Y = 0; Y < W.length; Y++) {
                        X.push(W[Y])
                    }
                }
                if (Q.hasNodeAttribute(Z, this.CONTENT_ATTR)) {
                    X.push(Z)
                } else {
                    if (Q.hasNodeCssClass(Z, this.CONTENT_CLASS)) {
                        X.push(Z)
                    }
                }
                X = Q.makeNodesUnique(X);
                return X
            },
            findParentContentNode: function(X) {
                if (!X) {
                    return 
                }
                var Y = X;
                var W = 0;
                while (Y && Y !== u && Y.parentNode) {
                    if (Q.hasNodeAttribute(Y, this.CONTENT_ATTR)) {
                        return Y
                    }
                    if (Q.hasNodeCssClass(Y, this.CONTENT_CLASS)) {
                        return Y
                    }
                    Y = Y.parentNode;
                    if (W > 1000) {
                        break
                    }
                    W++
                }
            },
            findPieceNode: function(X) {
                var W;
                W = Q.findFirstNodeHavingAttribute(X, this.CONTENT_PIECE_ATTR);
                if (!W) {
                    W = Q.findFirstNodeHavingClass(X, this.CONTENT_PIECE_CLASS)
                }
                if (W) {
                    return W
                }
                return X
            },
            findTargetNodeNoDefault: function(W) {
                if (!W) {
                    return 
                }
                var X = Q.findFirstNodeHavingAttributeWithValue(W, this.CONTENT_TARGET_ATTR);
                if (X) {
                    return X
                }
                X = Q.findFirstNodeHavingAttribute(W, this.CONTENT_TARGET_ATTR);
                if (X) {
                    return X
                }
                X = Q.findFirstNodeHavingClass(W, this.CONTENT_TARGET_CLASS);
                if (X) {
                    return X
                }
            },
            findTargetNode: function(W) {
                var X = this.findTargetNodeNoDefault(W);
                if (X) {
                    return X
                }
                return W
            },
            findContentName: function(X) {
                if (!X) {
                    return 
                }
                var aa = Q.findFirstNodeHavingAttributeWithValue(X, this.CONTENT_NAME_ATTR);
                if (aa) {
                    return Q.getAttributeValueFromNode(aa, this.CONTENT_NAME_ATTR)
                }
                var W = this.findContentPiece(X);
                if (W) {
                    return this.removeDomainIfIsInLink(W)
                }
                if (Q.hasNodeAttributeWithValue(X, "title")) {
                    return Q.getAttributeValueFromNode(X, "title")
                }
                var Y = this.findPieceNode(X);
                if (Q.hasNodeAttributeWithValue(Y, "title")) {
                    return Q.getAttributeValueFromNode(Y, "title")
                }
                var Z = this.findTargetNode(X);
                if (Q.hasNodeAttributeWithValue(Z, "title")) {
                    return Q.getAttributeValueFromNode(Z, "title")
                }
            },
            findContentPiece: function(X) {
                if (!X) {
                    return 
                }
                var Z = Q.findFirstNodeHavingAttributeWithValue(X, this.CONTENT_PIECE_ATTR);
                if (Z) {
                    return Q.getAttributeValueFromNode(Z, this.CONTENT_PIECE_ATTR)
                }
                var W = this.findPieceNode(X);
                var Y = this.findMediaUrlInNode(W);
                if (Y) {
                    return this.toAbsoluteUrl(Y)
                }
            },
            findContentTarget: function(Y) {
                if (!Y) {
                    return 
                }
                var Z = this.findTargetNode(Y);
                if (Q.hasNodeAttributeWithValue(Z, this.CONTENT_TARGET_ATTR)) {
                    return Q.getAttributeValueFromNode(Z, this.CONTENT_TARGET_ATTR)
                }
                var X;
                if (Q.hasNodeAttributeWithValue(Z, "href")) {
                    X = Q.getAttributeValueFromNode(Z, "href");
                    return this.toAbsoluteUrl(X)
                }
                var W = this.findPieceNode(Y);
                if (Q.hasNodeAttributeWithValue(W, "href")) {
                    X = Q.getAttributeValueFromNode(W, "href");
                    return this.toAbsoluteUrl(X)
                }
            },
            isSameDomain: function(W) {
                if (!W ||!W.indexOf) {
                    return false
                }
                if (0 === W.indexOf(this.getLocation().origin)) {
                    return true
                }
                var X = W.indexOf(this.getLocation().host);
                if (8 >= X && 0 <= X) {
                    return true
                }
                return false
            },
            removeDomainIfIsInLink: function(Y) {
                var X = "^https?://[^/]+";
                var W = "^.*//[^/]+";
                if (Y && Y.search&&-1 !== Y.search(new RegExp(X)) && this.isSameDomain(Y)) {
                    Y = Y.replace(new RegExp(W), "");
                    if (!Y) {
                        Y = "/"
                    }
                }
                return Y
            },
            findMediaUrlInNode: function(aa) {
                if (!aa) {
                    return 
                }
                var Y = ["img", "embed", "video", "audio"];
                var W = aa.nodeName.toLowerCase();
                if ( - 1 !== z(Y, W) && Q.findFirstNodeHavingAttributeWithValue(aa, "src")) {
                    var Z = Q.findFirstNodeHavingAttributeWithValue(aa, "src");
                    return Q.getAttributeValueFromNode(Z, "src")
                }
                if (W === "object" && Q.hasNodeAttributeWithValue(aa, "data")) {
                    return Q.getAttributeValueFromNode(aa, "data")
                }
                if (W === "object") {
                    var ab = Q.findNodesByTagName(aa, "param");
                    if (ab && ab.length) {
                        var X;
                        for (X = 0; X < ab.length; X++) {
                            if ("movie" === Q.getAttributeValueFromNode(ab[X], "name") && Q.hasNodeAttributeWithValue(ab[X], "value")) {
                                return Q.getAttributeValueFromNode(ab[X], "value")
                            }
                        }
                    }
                    var ac = Q.findNodesByTagName(aa, "embed");
                    if (ac && ac.length) {
                        return this.findMediaUrlInNode(ac[0])
                    }
                }
            },
            trim: function(W) {
                if (W && String(W) === W) {
                    return W.replace(/^\s+|\s+$/g, "")
                }
                return W
            },
            isOrWasNodeInViewport: function(ab) {
                if (!ab ||!ab.getBoundingClientRect || ab.nodeType !== 1) {
                    return true
                }
                var aa = ab.getBoundingClientRect();
                var Z = u.documentElement || {};
                var Y = aa.top < 0;
                if (Y && ab.offsetTop) {
                    Y = (ab.offsetTop + aa.height) > 0
                }
                var X = Z.clientWidth;
                if (G.innerWidth && X > G.innerWidth) {
                    X = G.innerWidth
                }
                var W = Z.clientHeight;
                if (G.innerHeight && W > G.innerHeight) {
                    W = G.innerHeight
                }
                return ((aa.bottom > 0 || Y) && aa.right > 0 && aa.left < X && ((aa.top < W) || Y))
            },
            isNodeVisible: function(X) {
                var W = g(X);
                var Y = this.isOrWasNodeInViewport(X);
                return W && Y
            },
            buildInteractionRequestParams: function(W, X, Y, Z) {
                var aa = "";
                if (W) {
                    aa += "c_i=" + l(W)
                }
                if (X) {
                    if (aa) {
                        aa += "&"
                    }
                    aa += "c_n=" + l(X)
                }
                if (Y) {
                    if (aa) {
                        aa += "&"
                    }
                    aa += "c_p=" + l(Y)
                }
                if (Z) {
                    if (aa) {
                        aa += "&"
                    }
                    aa += "c_t=" + l(Z)
                }
                return aa
            },
            buildImpressionRequestParams: function(W, X, Y) {
                var Z = "c_n=" + l(W) + "&c_p=" + l(X);
                if (Y) {
                    Z += "&c_t=" + l(Y)
                }
                return Z
            },
            buildContentBlock: function(Y) {
                if (!Y) {
                    return 
                }
                var W = this.findContentName(Y);
                var X = this.findContentPiece(Y);
                var Z = this.findContentTarget(Y);
                W = this.trim(W);
                X = this.trim(X);
                Z = this.trim(Z);
                return {
                    name: W || "Unknown",
                    piece: X || "Unknown",
                    target: Z || ""
                }
            },
            collectContent: function(Z) {
                if (!Z ||!Z.length) {
                    return []
                }
                var Y = [];
                var W, X;
                for (W = 0; W < Z.length; W++) {
                    X = this.buildContentBlock(Z[W]);
                    if (w(X)) {
                        Y.push(X)
                    }
                }
                return Y
            },
            setLocation: function(W) {
                this.location = W
            },
            getLocation: function() {
                var W = this.location || G.location;
                if (!W.origin) {
                    W.origin = W.protocol + "//" + W.hostname + (W.port ? ":" + W.port : "")
                }
                return W
            },
            toAbsoluteUrl: function(X) {
                if ((!X || String(X) !== X) && X !== "") {
                    return X
                }
                if ("" === X) {
                    return this.getLocation().href
                }
                if (X.search(/^\/\//)!==-1) {
                    return this.getLocation().protocol + X
                }
                if (X.search(/:\/\//)!==-1) {
                    return X
                }
                if (0 === X.indexOf("#")) {
                    return this.getLocation().origin + this.getLocation().pathname + X
                }
                if (0 === X.indexOf("?")) {
                    return this.getLocation().origin + this.getLocation().pathname + X
                }
                if (0 === X.search("^[a-zA-Z]{2,11}:")) {
                    return X
                }
                if (X.search(/^\//)!==-1) {
                    return this.getLocation().origin + X
                }
                var W = "(.*/)";
                var Y = this.getLocation().origin + this.getLocation().pathname.match(new RegExp(W))[0];
                return Y + X
            },
            isUrlToCurrentDomain: function(X) {
                var Y = this.toAbsoluteUrl(X);
                if (!Y) {
                    return false
                }
                var W = this.getLocation().origin;
                if (W === Y) {
                    return true
                }
                if (0 === String(Y).indexOf(W)) {
                    if (":" === String(Y).substr(W.length, 1)) {
                        return false
                    }
                    return true
                }
                return false
            },
            setHrefAttribute: function(X, W) {
                if (!X ||!W) {
                    return 
                }
                Q.setAnyAttribute(X, "href", W)
            },
            shouldIgnoreInteraction: function(Y) {
                var X = Q.hasNodeAttribute(Y, this.CONTENT_IGNOREINTERACTION_ATTR);
                var W = Q.hasNodeCssClass(Y, this.CONTENT_IGNOREINTERACTION_CLASS);
                return X || W
            }
        };
        function B(W, X) {
            if (X) {
                return X
            }
            if (W.slice( - 9) === "piwik.php") {
                W = W.slice(0, W.length - 9)
            }
            return W
        }
        function A(aa) {
            var W = "Piwik_Overlay";
            var ad = new RegExp("index\\.php\\?module=Overlay&action=startOverlaySession&idSite=([0-9]+)&period=([^&]+)&date=([^&]+)$");
            var Y = ad.exec(u.referrer);
            if (Y) {
                var Z = Y[1];
                if (Z !== String(aa)) {
                    return false
                }
                var ac = Y[2], X = Y[3];
                G.name = W + "###" + ac + "###" + X
            }
            var ab = G.name.split("###");
            return ab.length === 3 && ab[0] === W
        }
        function M(X, ac, Z) {
            var ab = G.name.split("###"), aa = ab[1], W = ab[2], Y = B(X, ac);
            i(Y + "plugins/Overlay/client/client.js?v=1", function() {
                Piwik_Overlay_Client.initialize(Y, Z, aa, W)
            })
        }
        function D(aI, bx) {
            var ad = N(u.domain, G.location.href, x()), bX = y(ad[0]), ci = F(ad[1]), bF = F(ad[2]), cm = false, bB = "GET", bD = bB, bi = "application/x-www-form-urlencoded; charset=UTF-8", aO = bi, aa = aI || "", ay = "", bz = "", b4 = bx || "", aN = "", a6 = "", bc, aW = u.title, aY = ["7z", "aac", "apk", "arc", "arj", "asf", "asx", "avi", "azw3", "bin", "csv", "deb", "dmg", "doc", "docx", "epub", "exe", "flv", "gif", "gz", "gzip", "hqx", "ibooks", "jar", "jpg", "jpeg", "js", "mobi", "mp2", "mp3", "mp4", "mpg", "mpeg", "mov", "movie", "msi", "msp", "odb", "odf", "odg", "ods", "odt", "ogg", "ogv", "pdf", "phps", "png", "ppt", "pptx", "qt", "qtm", "ra", "ram", "rar", "rpm", "sea", "sit", "tar", "tbz", "tbz2", "bz", "bz2", "tgz", "torrent", "txt", "wav", "wma", "wmv", "wpd", "xls", "xlsx", "xml", "z", "zip"], bA = [bX], ai = [], bo = [], aG = [], by = 500, aj, b2, bq, ak, an, a2 = ["pk_campaign", "piwik_campaign", "utm_campaign", "utm_source", "utm_medium"], aT = ["pk_kwd", "piwik_kwd", "utm_term"], cg = "_pk_", aq, ch, ao = false, b8, a4, a9, ax = 33955200000, aD = 1800000, bg = 15768000000, a5 = true, aL = 0, bb = false, ag = false, au, bp = {}, ab = {}, b9 = 200, bQ = {}, b5 = {}, ah = [], aA = false, bf = false, bJ = false, b6 = false, bM = false, bn = null, ba, bt, at, a1 = T, bI;
            function bS(cv, cs, cr, cu, cq, ct) {
                if (ao) {
                    return 
                }
                var cp;
                if (cr) {
                    cp = new Date();
                    cp.setTime(cp.getTime() + cr)
                }
                u.cookie = cv + "=" + l(cs) + (cr ? ";expires=" + cp.toGMTString() : "") + ";path=" + (cu || "/") + (cq ? ";domain=" + cq : "") + (ct ? ";secure" : "")
            }
            function av(cr) {
                if (ao) {
                    return 0
                }
                var cp = new RegExp("(^|;)[ ]*" + cr + "=([^;]*)"), cq = cp.exec(u.cookie);
                return cq ? F(cq[2]) : 0
            }
            function cc(cp) {
                var cq;
                if (ak) {
                    cq = new RegExp("#.*");
                    return cp.replace(cq, "")
                }
                return cp
            }
            function bW(cr, cp) {
                var cs = k(cp), cq;
                if (cs) {
                    return cp
                }
                if (cp.slice(0, 1) === "/") {
                    return k(cr) + "://" + c(cr) + cp
                }
                cr = cc(cr);
                cq = cr.indexOf("?");
                if (cq >= 0) {
                    cr = cr.slice(0, cq)
                }
                cq = cr.lastIndexOf("/");
                if (cq !== cr.length - 1) {
                    cr = cr.slice(0, cq + 1)
                }
                return cr + cp
            }
            function bC(cs) {
                var cq, cp, cr;
                for (cq = 0; cq < bA.length; cq++) {
                    cp = y(bA[cq].toLowerCase());
                    if (cs === cp) {
                        return true
                    }
                    if (cp.slice(0, 1) === ".") {
                        if (cs === cp.slice(1)) {
                            return true
                        }
                        cr = cs.length - cp.length;
                        if ((cr > 0) && (cs.slice(cr) === cp)) {
                            return true
                        }
                    }
                }
                return false
            }
            function co(cp, cr) {
                var cq = new Image(1, 1);
                cq.onload = function() {
                    t = 0;
                    if (typeof cr === "function") {
                        cr()
                    }
                };
                cq.src = aa + (aa.indexOf("?") < 0 ? "?" : "&") + cp
            }
            function bT(cq, ct, cp) {
                if (!w(cp) || null === cp) {
                    cp = true
                }
                try {
                    var cs = G.XMLHttpRequest ? new G.XMLHttpRequest(): G.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP"): null;
                    cs.open("POST", aa, true);
                    cs.onreadystatechange = function() {
                        if (this.readyState === 4&&!(this.status >= 200 && this.status < 300) && cp) {
                            co(cq, ct)
                        } else {
                            if (typeof ct === "function") {
                                ct()
                            }
                        }
                    };
                    cs.setRequestHeader("Content-Type", aO);
                    cs.send(cq)
                } catch (cr) {
                    if (cp) {
                        co(cq, ct)
                    }
                }
            }
            function cb(cq) {
                var cp = new Date();
                var cr = cp.getTime() + cq;
                if (!j || cr > j) {
                    j = cr
                }
            }
            function aB(cp) {
                if (ba ||!b2) {
                    return 
                }
                ba = setTimeout(function cq() {
                    ba = null;
                    if (bq()) {
                        return 
                    }
                    var cr = new Date(), cs = b2 - (cr.getTime() - bn);
                    cs = Math.min(b2, cs);
                    aB(cs)
                }, cp || b2)
            }
            function bd() {
                if (!ba) {
                    return 
                }
                clearTimeout(ba);
                ba = null
            }
            function aw() {
                if (bq()) {
                    return 
                }
                aB()
            }
            function bl() {
                bd()
            }
            function bE() {
                if (bM ||!b2) {
                    return 
                }
                bM = true;
                U(G, "focus", aw);
                U(G, "blur", bl);
                aB()
            }
            function aH(ct) {
                var cq = new Date();
                var cp = cq.getTime();
                bn = cp;
                if (bf && cp < bf) {
                    var cr = bf - cp;
                    setTimeout(ct, cr);
                    cb(cr + 50);
                    bf += 50;
                    return 
                }
                if (bf === false) {
                    var cs = 800;
                    bf = cp + cs
                }
                ct()
            }
            function a3(cq, cp, cr) {
                if (!b8 && cq) {
                    aH(function() {
                        if (bD === "POST") {
                            bT(cq, cr)
                        } else {
                            co(cq, cr)
                        }
                        cb(cp)
                    })
                }
                if (!bM) {
                    bE()
                } else {
                    aB()
                }
            }
            function bh(cp) {
                if (b8) {
                    return false
                }
                return (cp && cp.length)
            }
            function ap(cr, cp) {
                if (!bh(cr)) {
                    return 
                }
                var cq = '{"requests":["?' + cr.join('","?') + '"]}';
                aH(function() {
                    bT(cq, null, false);
                    cb(cp)
                })
            }
            function bR(cp) {
                return cg + cp + "." + b4 + "." + bI
            }
            function ae() {
                if (ao) {
                    return "0"
                }
                if (!w(e.cookieEnabled)) {
                    var cp = bR("testcookie");
                    bS(cp, "1");
                    return av(cp) === "1" ? "1" : "0"
                }
                return e.cookieEnabled ? "1" : "0"
            }
            function bu() {
                bI = a1((aq || bX) + (ch || "/")).slice(0, 4)
            }
            function ar() {
                var cq = bR("cvar"), cp = av(cq);
                if (cp.length) {
                    cp = JSON2.parse(cp);
                    if (J(cp)) {
                        return cp
                    }
                }
                return {}
            }
            function Z() {
                if (ag === false) {
                    ag = ar()
                }
            }
            function ce() {
                return a1((e.userAgent || "") + (e.platform || "") + JSON2.stringify(b5) + (new Date()).getTime() + Math.random()).slice(0, 16)
            }
            function Y() {
                var cr = new Date(), cp = Math.round(cr.getTime() / 1000), cq = bR("id"), cu = av(cq), ct, cs;
                if (cu) {
                    ct = cu.split(".");
                    ct.unshift("0");
                    if (a6.length) {
                        ct[1] = a6
                    }
                    return ct
                }
                if (a6.length) {
                    cs = a6
                } else {
                    if ("0" === ae()) {
                        cs = ""
                    } else {
                        cs = ce()
                    }
                }
                ct = ["1", cs, cp, 0, cp, "", ""];
                return ct
            }
            function bL() {
                var cw = Y(), cs = cw[0], ct = cw[1], cq = cw[2], cp = cw[3], cu = cw[4], cr = cw[5];
                if (!w(cw[6])) {
                    cw[6] = ""
                }
                var cv = cw[6];
                return {
                    newVisitor: cs,
                    uuid: ct,
                    createTs: cq,
                    visitCount: cp,
                    currentVisitTs: cu,
                    lastVisitTs: cr,
                    lastEcommerceOrderTs: cv
                }
            }
            function aP() {
                var cs = new Date(), cq = cs.getTime(), ct = bL().createTs;
                var cp = parseInt(ct, 10);
                var cr = (cp * 1000) + ax - cq;
                return cr
            }
            function am(cp) {
                if (!b4) {
                    return 
                }
                var cr = new Date(), cq = Math.round(cr.getTime() / 1000);
                if (!w(cp)) {
                    cp = bL()
                }
                var cs = cp.uuid + "." + cp.createTs + "." + cp.visitCount + "." + cq + "." + cp.lastVisitTs + "." + cp.lastEcommerceOrderTs;
                bS(bR("id"), cs, aP(), ch, aq)
            }
            function X() {
                var cp = av(bR("ref"));
                if (cp.length) {
                    try {
                        cp = JSON2.parse(cp);
                        if (J(cp)) {
                            return cp
                        }
                    } catch (cq) {}
                }
                return ["", "", 0, ""]
            }
            function b3(cr, cq, cp) {
                bS(cr, "", - 86400, cq, cp)
            }
            function bm(cq) {
                var cp = "testvalue";
                bS("test", cp, 10000, null, cq);
                if (av("test") === cp) {
                    b3("test", null, cq);
                    return true
                }
                return false
            }
            function W() {
                var cr = ao;
                ao = false;
                var cp = ["id", "ses", "cvar", "ref"];
                var cq, cs;
                for (cq = 0; cq < cp.length; cq++) {
                    cs = bR(cp[cq]);
                    if (0 !== av(cs)) {
                        b3(cs, ch, aq)
                    }
                }
                ao = cr
            }
            function cl(cp) {
                b4 = cp;
                am()
            }
            function b1(ct) {
                if (!ct ||!J(ct)) {
                    return 
                }
                var cs = [];
                var cr;
                for (cr in ct) {
                    if (Object.prototype.hasOwnProperty.call(ct, cr)) {
                        cs.push(cr)
                    }
                }
                var cu = {};
                cs.sort();
                var cp = cs.length;
                var cq;
                for (cq = 0; cq < cp; cq++) {
                    cu[cs[cq]] = ct[cs[cq]]
                }
                return cu
            }
            function a8() {
                bS(bR("ses"), "*", aD, ch, aq)
            }
            function aX(cr, cK, cL, cs) {
                var cJ, cq = new Date(), cy = Math.round(cq.getTime() / 1000), cv, cI, ct = 1024, cP, cz, cG = ag, cu = bR("ses"), cE = bR("ref"), cB = bR("cvar"), cC = av(cu), cH = X(), cN = bc || ci, cw, cp;
                if (ao) {
                    W()
                }
                if (b8) {
                    return ""
                }
                var cD = bL();
                if (!w(cs)) {
                    cs = ""
                }
                var cA = u.characterSet || u.charset;
                if (!cA || cA.toLowerCase() === "utf-8") {
                    cA = null
                }
                cw = cH[0];
                cp = cH[1];
                cv = cH[2];
                cI = cH[3];
                if (!cC) {
                    var cM = aD / 1000;
                    if (!cD.lastVisitTs || (cy - cD.lastVisitTs) > cM) {
                        cD.visitCount++;
                        cD.lastVisitTs = cD.currentVisitTs
                    }
                    if (!a9 ||!cw.length) {
                        for (cJ in a2) {
                            if (Object.prototype.hasOwnProperty.call(a2, cJ)) {
                                cw = I(cN, a2[cJ]);
                                if (cw.length) {
                                    break
                                }
                            }
                        }
                        for (cJ in aT) {
                            if (Object.prototype.hasOwnProperty.call(aT, cJ)) {
                                cp = I(cN, aT[cJ]);
                                if (cp.length) {
                                    break
                                }
                            }
                        }
                    }
                    cP = c(bF);
                    cz = cI.length ? c(cI) : "";
                    if (cP.length&&!bC(cP) && (!a9 ||!cz.length || bC(cz))) {
                        cI = bF
                    }
                    if (cI.length || cw.length) {
                        cv = cy;
                        cH = [cw, cp, cv, cc(cI.slice(0, ct))];
                        bS(cE, JSON2.stringify(cH), bg, ch, aq)
                    }
                }
                cr += "&idsite=" + b4 + "&rec=1&r=" + String(Math.random()).slice(2, 8) + "&h=" + cq.getHours() + "&m=" + cq.getMinutes() + "&s=" + cq.getSeconds() + "&url=" + l(cc(cN)) + (bF.length ? "&urlref=" + l(cc(bF)) : "") + ((aN && aN.length) ? "&uid=" + l(aN) : "") + "&_id=" + cD.uuid + "&_idts=" + cD.createTs + "&_idvc=" + cD.visitCount + "&_idn=" + cD.newVisitor + (cw.length ? "&_rcn=" + l(cw) : "") + (cp.length ? "&_rck=" + l(cp) : "") + "&_refts=" + cv + "&_viewts=" + cD.lastVisitTs + (String(cD.lastEcommerceOrderTs).length ? "&_ects=" + cD.lastEcommerceOrderTs : "") + (String(cI).length ? "&_ref=" + l(cc(cI.slice(0, ct))) : "") + (cA ? "&cs=" + l(cA) : "") + "&send_image=0";
                for (cJ in b5) {
                    if (Object.prototype.hasOwnProperty.call(b5, cJ)) {
                        cr += "&" + cJ + "=" + b5[cJ]
                    }
                }
                if (cK) {
                    cr += "&data=" + l(JSON2.stringify(cK))
                } else {
                    if (an) {
                        cr += "&data=" + l(JSON2.stringify(an))
                    }
                }
                function cx(cQ, cR) {
                    var cS = JSON2.stringify(cQ);
                    if (cS.length > 2) {
                        return "&" + cR + "=" + l(cS)
                    }
                    return ""
                }
                var cO = b1(bp);
                var cF = b1(ab);
                cr += cx(cO, "cvar");
                cr += cx(cF, "e_cvar");
                if (ag) {
                    cr += cx(ag, "_cvar");
                    for (cJ in cG) {
                        if (Object.prototype.hasOwnProperty.call(cG, cJ)) {
                            if (ag[cJ][0] === "" || ag[cJ][1] === "") {
                                delete ag[cJ]
                            }
                        }
                    }
                    if (bb) {
                        bS(cB, JSON2.stringify(ag), aD, ch, aq)
                    }
                }
                if (a5) {
                    if (aL) {
                        cr += "&gt_ms=" + aL
                    } else {
                        if (f && f.timing && f.timing.requestStart && f.timing.responseEnd) {
                            cr += "&gt_ms=" + (f.timing.responseEnd - f.timing.requestStart)
                        }
                    }
                }
                cD.lastEcommerceOrderTs = w(cs) && String(cs).length ? cs : cD.lastEcommerceOrderTs;
                am(cD);
                a8();
                cr += O(cL);
                if (bz.length) {
                    cr += "&" + bz
                }
                if (q(au)) {
                    cr = au(cr)
                }
                return cr
            }
            bq = function bv() {
                var cp = new Date();
                if (bn + b2 <= cp.getTime()) {
                    var cq = aX("ping=1", null, "ping");
                    a3(cq, by);
                    return true
                }
                return false
            };
            function bV(cs, cr, cw, ct, cp, cz) {
                var cu = "idgoal=0", cv, cq = new Date(), cx = [], cy;
                if (String(cs).length) {
                    cu += "&ec_id=" + l(cs);
                    cv = Math.round(cq.getTime() / 1000)
                }
                cu += "&revenue=" + cr;
                if (String(cw).length) {
                    cu += "&ec_st=" + cw
                }
                if (String(ct).length) {
                    cu += "&ec_tx=" + ct
                }
                if (String(cp).length) {
                    cu += "&ec_sh=" + cp
                }
                if (String(cz).length) {
                    cu += "&ec_dt=" + cz
                }
                if (bQ) {
                    for (cy in bQ) {
                        if (Object.prototype.hasOwnProperty.call(bQ, cy)) {
                            if (!w(bQ[cy][1])) {
                                bQ[cy][1] = ""
                            }
                            if (!w(bQ[cy][2])) {
                                bQ[cy][2] = ""
                            }
                            if (!w(bQ[cy][3]) || String(bQ[cy][3]).length === 0) {
                                bQ[cy][3] = 0
                            }
                            if (!w(bQ[cy][4]) || String(bQ[cy][4]).length === 0) {
                                bQ[cy][4] = 1
                            }
                            cx.push(bQ[cy])
                        }
                    }
                    cu += "&ec_items=" + l(JSON2.stringify(cx))
                }
                cu = aX(cu, an, "ecommerce", cv);
                a3(cu, by)
            }
            function bU(cp, ct, cs, cr, cq, cu) {
                if (String(cp).length && w(ct)) {
                    bV(cp, ct, cs, cr, cq, cu)
                }
            }
            function cf(cp) {
                if (w(cp)) {
                    bV("", cp, "", "", "", "")
                }
            }
            function bk(cr, cs) {
                var cp = new Date(), cq = aX("action_name=" + l(V(cr || aW)), cs, "log");
                a3(cq, by)
            }
            function aK(cr, cq) {
                var cs, cp = "(^| )(piwik[_-]" + cq;
                if (cr) {
                    for (cs = 0; cs < cr.length; cs++) {
                        cp += "|" + cr[cs]
                    }
                }
                cp += ")( |$)";
                return new RegExp(cp)
            }
            function bO(cp) {
                return (aa && cp && 0 === String(cp).indexOf(aa))
            }
            function b0(ct, cp, cu, cq) {
                if (bO(cp)) {
                    return 0
                }
                var cs = aK(bo, "download"), cr = aK(aG, "link"), cv = new RegExp("\\.(" + aY.join("|") + ")([?&#]|$)", "i");
                if (cr.test(ct)) {
                    return "link"
                }
                if (cq || cs.test(ct) || cv.test(cp)) {
                    return "download"
                }
                if (cu) {
                    return 0
                }
                return "link"
            }
            function be(cq) {
                var cp;
                cp = cq.parentNode;
                while (cp !== null && w(cp)) {
                    if (Q.isLinkElement(cq)) {
                        break
                    }
                    cq = cp;
                    cp = cq.parentNode
                }
                return cq
            }
            function bs(ct) {
                ct = be(ct);
                if (!Q.hasNodeAttribute(ct, "href")) {
                    return 
                }
                if (!w(ct.href)) {
                    return 
                }
                var cs = Q.getAttributeValueFromNode(ct, "href");
                if (bO(cs)) {
                    return 
                }
                var cu = ct.hostname || c(ct.href);
                var cv = cu.toLowerCase();
                var cq = ct.href.replace(cu, cv);
                var cr = new RegExp("^(javascript|vbscript|jscript|mocha|livescript|ecmascript|mailto):", "i");
                if (!cr.test(cq)) {
                    var cp = b0(ct.className, cq, bC(cv), Q.hasNodeAttribute(ct, "download"));
                    if (cp) {
                        return {
                            type: cp,
                            href: cq
                        }
                    }
                }
            }
            function ck(cp, cq, cr, cs) {
                var ct = m.buildInteractionRequestParams(cp, cq, cr, cs);
                if (!ct) {
                    return 
                }
                return aX(ct, null, "contentInteraction")
            }
            function cj(cr, cs, cw, cp, cq) {
                if (!w(cr)) {
                    return 
                }
                if (bO(cr)) {
                    return cr
                }
                var cu = m.toAbsoluteUrl(cr);
                var ct = "redirecturl=" + l(cu) + "&";
                ct += ck(cs, cw, cp, (cq || cr));
                var cv = "&";
                if (aa.indexOf("?") < 0) {
                    cv = "?"
                }
                return aa + cv + ct
            }
            function a7(cp, cq) {
                if (!cp ||!cq) {
                    return false
                }
                var cr = m.findTargetNode(cp);
                if (m.shouldIgnoreInteraction(cr)) {
                    return false
                }
                cr = m.findTargetNodeNoDefault(cp);
                if (cr&&!H(cr, cq)) {
                    return false
                }
                return true
            }
            function aV(cr, cq, ct) {
                if (!cr) {
                    return 
                }
                var cp = m.findParentContentNode(cr);
                if (!cp) {
                    return 
                }
                if (!a7(cp, cr)) {
                    return 
                }
                var cs = m.buildContentBlock(cp);
                if (!cs) {
                    return 
                }
                if (!cs.target && ct) {
                    cs.target = ct
                }
                return m.buildInteractionRequestParams(cq, cs.name, cs.piece, cs.target)
            }
            function aS(cq) {
                if (!ah ||!ah.length) {
                    return false
                }
                var cp, cr;
                for (cp = 0; cp < ah.length; cp++) {
                    cr = ah[cp];
                    if (cr && cr.name === cq.name && cr.piece === cq.piece && cr.target === cq.target) {
                        return true
                    }
                }
                return false
            }
            function ac(cs) {
                if (!cs) {
                    return false
                }
                var cv = m.findTargetNode(cs);
                if (!cv || m.shouldIgnoreInteraction(cv)) {
                    return false
                }
                var cw = bs(cv);
                if (b6 && cw && cw.type) {
                    return false
                }
                if (Q.isLinkElement(cv) && Q.hasNodeAttributeWithValue(cv, "href")) {
                    var cp = String(Q.getAttributeValueFromNode(cv, "href"));
                    if (0 === cp.indexOf("#")) {
                        return false
                    }
                    if (bO(cp)) {
                        return true
                    }
                    if (!m.isUrlToCurrentDomain(cp)) {
                        return false
                    }
                    var ct = m.buildContentBlock(cs);
                    if (!ct) {
                        return 
                    }
                    var cr = ct.name;
                    var cx = ct.piece;
                    var cu = ct.target;
                    if (!Q.hasNodeAttributeWithValue(cv, m.CONTENT_TARGET_ATTR) || cv.wasContentTargetAttrReplaced) {
                        cv.wasContentTargetAttrReplaced = true;
                        cu = m.toAbsoluteUrl(cp);
                        Q.setAnyAttribute(cv, m.CONTENT_TARGET_ATTR, cu)
                    }
                    var cq = cj(cp, "click", cr, cx, cu);
                    m.setHrefAttribute(cv, cq);
                    return true
                }
                return false
            }
            function af(cq) {
                if (!cq ||!cq.length) {
                    return 
                }
                var cp;
                for (cp = 0; cp < cq.length; cp++) {
                    ac(cq[cp])
                }
            }
            function br(cp) {
                return function(cq) {
                    if (!cp) {
                        return 
                    }
                    var ct = m.findParentContentNode(cp);
                    var cu;
                    if (cq) {
                        cu = cq.target || cq.srcElement
                    }
                    if (!cu) {
                        cu = cp
                    }
                    if (!a7(ct, cu)) {
                        return 
                    }
                    cb(by);
                    if (Q.isLinkElement(cp) && Q.hasNodeAttributeWithValue(cp, "href") && Q.hasNodeAttributeWithValue(cp, m.CONTENT_TARGET_ATTR)) {
                        var cr = Q.getAttributeValueFromNode(cp, "href");
                        if (!bO(cr) && cp.wasContentTargetAttrReplaced) {
                            Q.setAnyAttribute(cp, m.CONTENT_TARGET_ATTR, "")
                        }
                    }
                    var cy = bs(cp);
                    if (bJ && cy && cy.type) {
                        return cy.type
                    }
                    if (ac(ct)) {
                        return "href"
                    }
                    var cv = m.buildContentBlock(ct);
                    if (!cv) {
                        return 
                    }
                    var cs = cv.name;
                    var cz = cv.piece;
                    var cx = cv.target;
                    var cw = ck("click", cs, cz, cx);
                    a3(cw, by);
                    return cw
                }
            }
            function aJ(cr) {
                if (!cr ||!cr.length) {
                    return 
                }
                var cp, cq;
                for (cp = 0; cp < cr.length; cp++) {
                    cq = m.findTargetNode(cr[cp]);
                    if (cq&&!cq.contentInteractionTrackingSetupDone) {
                        cq.contentInteractionTrackingSetupDone = true;
                        U(cq, "click", br(cq))
                    }
                }
            }
            function aF(cr, cs) {
                if (!cr ||!cr.length) {
                    return []
                }
                var cp, cq;
                for (cp = 0; cp < cr.length; cp++) {
                    if (aS(cr[cp])) {
                        cr.splice(cp, 1);
                        cp--
                    } else {
                        ah.push(cr[cp])
                    }
                }
                if (!cr ||!cr.length) {
                    return []
                }
                af(cs);
                aJ(cs);
                var ct = [];
                for (cp = 0; cp < cr.length; cp++) {
                    cq = aX(m.buildImpressionRequestParams(cr[cp].name, cr[cp].piece, cr[cp].target), undefined, "contentImpressions");
                    ct.push(cq)
                }
                return ct
            }
            function a0(cq) {
                var cp = m.collectContent(cq);
                return aF(cp, cq)
            }
            function bN(cq) {
                if (!cq ||!cq.length) {
                    return []
                }
                var cp;
                for (cp = 0; cp < cq.length; cp++) {
                    if (!m.isNodeVisible(cq[cp])) {
                        cq.splice(cp, 1);
                        cp--
                    }
                }
                if (!cq ||!cq.length) {
                    return []
                }
                return a0(cq)
            }
            function bY(cr, cp, cq) {
                var cs = m.buildImpressionRequestParams(cr, cp, cq);
                return aX(cs, null, "contentImpression")
            }
            function aZ(cs, cq) {
                if (!cs) {
                    return
                }
                var cp = m.findParentContentNode(cs);
                var cr = m.buildContentBlock(cp);
                if (!cr) {
                    return 
                }
                if (!cq) {
                    cq = "Unknown"
                }
                return ck(cq, cr.name, cr.piece, cr.target)
            }
            function bH(cq, cs, cp, cr) {
                return "e_c=" + l(cq) + "&e_a=" + l(cs) + (w(cp) ? "&e_n=" + l(cp) : "") + (w(cr) ? "&e_v=" + l(cr) : "")
            }
            function al(cr, ct, cp, cs, cu) {
                if (String(cr).length === 0 || String(ct).length === 0) {
                    return false
                }
                var cq = aX(bH(cr, ct, cp, cs), cu, "event");
                a3(cq, by)
            }
            function aR(cp, cs, cq, ct) {
                var cr = aX("search=" + l(cp) + (cs ? "&search_cat=" + l(cs) : "") + (w(cq) ? "&search_count=" + cq : ""), ct, "sitesearch");
                a3(cr, by)
            }
            function bw(cp, cs, cr) {
                var cq = aX("idgoal=" + cp + (cs ? "&revenue=" + cs : ""), cr, "goal");
                a3(cq, by)
            }
            function bZ(cs, cp, cw, cv, cr) {
                var cu = cp + "=" + l(cc(cs));
                var cq = aV(cr, "click", cs);
                if (cq) {
                    cu += "&" + cq
                }
                var ct = aX(cu, cw, "link");
                a3(ct, (cv ? 0 : by), cv)
            }
            function b7(cq, cp) {
                if (cq !== "") {
                    return cq + cp.charAt(0).toUpperCase() + cp.slice(1)
                }
                return cp
            }
            function aQ(cu) {
                var ct, cp, cs = ["", "webkit", "ms", "moz"], cr;
                if (!a4) {
                    for (cp = 0; cp < cs.length; cp++) {
                        cr = cs[cp];
                        if (Object.prototype.hasOwnProperty.call(u, b7(cr, "hidden"))) {
                            if (u[b7(cr, "visibilityState")] === "prerender") {
                                ct = true
                            }
                            break
                        }
                    }
                }
                if (ct) {
                    U(u, cr + "visibilitychange", function cq() {
                        u.removeEventListener(cr + "visibilitychange", cq, false);
                        cu()
                    });
                    return 
                }
                cu()
            }
            function aU(cp) {
                if (u.readyState === "complete") {
                    cp()
                } else {
                    if (G.addEventListener) {
                        G.addEventListener("load", cp)
                    } else {
                        if (G.attachEvent) {
                            G.attachEvent("onLoad", cp)
                        }
                    }
                }
            }
            function aE(cq) {
                var cp = false;
                if (u.attachEvent) {
                    cp = u.readyState === "complete"
                } else {
                    cp = u.readyState !== "loading"
                }
                if (cp) {
                    cq()
                } else {
                    if (u.addEventListener) {
                        u.addEventListener("DOMContentLoaded", cq)
                    } else {
                        if (u.attachEvent) {
                            u.attachEvent("onreadystatechange", cq)
                        }
                    }
                }
            }
            function bP(cp) {
                var cq = bs(cp);
                if (cq && cq.type) {
                    cq.href = F(cq.href);
                    bZ(cq.href, cq.type, undefined, null, cp)
                }
            }
            function aM() {
                return u.all&&!u.addEventListener
            }
            function aC(cp) {
                var cr = cp.which;
                var cq = (typeof cp.button);
                if (!cr && cq !== "undefined") {
                    if (aM()) {
                        if (cp.button & 1) {
                            cr = 1
                        } else {
                            if (cp.button & 2) {
                                cr = 3
                            } else {
                                if (cp.button & 4) {
                                    cr = 2
                                }
                            }
                        }
                    } else {
                        if (cp.button === 0 || cp.button === "0") {
                            cr = 1
                        } else {
                            if (cp.button & 1) {
                                cr = 2
                            } else {
                                if (cp.button & 2) {
                                    cr = 3
                                }
                            }
                        }
                    }
                }
                return cr
            }
            function az(cp) {
                switch (aC(cp)) {
                case 1:
                    return "left";
                case 2:
                    return "middle";
                case 3:
                    return "right"
                }
            }
            function ca(cp) {
                return cp.target || cp.srcElement
            }
            function cn(cp) {
                return function(cs) {
                    cs = cs || G.event;
                    var cr = az(cs);
                    var ct = ca(cs);
                    if (cs.type === "click") {
                        var cq = false;
                        if (cp && cr === "middle") {
                            cq = true
                        }
                        if (ct&&!cq) {
                            bP(ct)
                        }
                    } else {
                        if (cs.type === "mousedown") {
                            if (cr === "middle" && ct) {
                                bt = cr;
                                at = ct
                            } else {
                                bt = at = null
                            }
                        } else {
                            if (cs.type === "mouseup") {
                                if (cr === bt && ct === at) {
                                    bP(ct)
                                }
                                bt = at = null
                            } else {
                                if (cs.type === "contextmenu") {
                                    bP(ct)
                                }
                            }
                        }
                    }
                }
            }
            function bK(cq, cp) {
                U(cq, "click", cn(cp), false);
                if (cp) {
                    U(cq, "mouseup", cn(cp), false);
                    U(cq, "mousedown", cn(cp), false);
                    U(cq, "contextmenu", cn(cp), false)
                }
            }
            function bj(cq) {
                if (!bJ) {
                    bJ = true;
                    var cr, cp = aK(ai, "ignore"), cs = u.links;
                    if (cs) {
                        for (cr = 0; cr < cs.length; cr++) {
                            if (!cp.test(cs[cr].className)) {
                                bK(cs[cr], cq)
                            }
                        }
                    }
                }
            }
            function bG(cr, ct, cu) {
                if (aA) {
                    return true
                }
                aA = true;
                var cv = false;
                var cs, cq;
                function cp() {
                    cv = true
                }
                aU(function() {
                    function cw(cy) {
                        setTimeout(function() {
                            if (!aA) {
                                return 
                            }
                            cv = false;
                            cu.trackVisibleContentImpressions();
                            cw(cy)
                        }, cy)
                    }
                    function cx(cy) {
                        setTimeout(function() {
                            if (!aA) {
                                return
                            }
                            if (cv) {
                                cv = false;
                                cu.trackVisibleContentImpressions()
                            }
                            cx(cy)
                        }, cy)
                    }
                    if (cr) {
                        cs = ["scroll", "resize"];
                        for (cq = 0; cq < cs.length; cq++) {
                            if (u.addEventListener) {
                                u.addEventListener(cs[cq], cp)
                            } else {
                                G.attachEvent("on" + cs[cq], cp)
                            }
                        }
                        cx(100)
                    }
                    if (ct && ct > 0) {
                        ct = parseInt(ct, 10);
                        cw(ct)
                    }
                })
            }
            function cd() {
                var cq, cr, cs = {
                    pdf: "application/pdf",
                    qt: "video/quicktime",
                    realp: "audio/x-pn-realaudio-plugin",
                    wma: "application/x-mplayer2",
                    dir: "application/x-director",
                    fla: "application/x-shockwave-flash",
                    java: "application/x-java-vm",
                    gears: "application/x-googlegears",
                    ag: "application/x-silverlight"
                }, cp = G.devicePixelRatio || 1;
                if (!((new RegExp("MSIE")).test(e.userAgent))) {
                    if (e.mimeTypes && e.mimeTypes.length) {
                        for (cq in cs) {
                            if (Object.prototype.hasOwnProperty.call(cs, cq)) {
                                cr = e.mimeTypes[cs[cq]];
                                b5[cq] = (cr && cr.enabledPlugin) ? "1" : "0"
                            }
                        }
                    }
                    if (typeof navigator.javaEnabled !== "unknown" && w(e.javaEnabled) && e.javaEnabled()) {
                        b5.java = "1"
                    }
                    if (q(G.GearsFactory)) {
                        b5.gears = "1"
                    }
                    b5.cookie = ae()
                }
                b5.res = K.width * cp + "x" + K.height * cp
            }
            cd();
            bu();
            am();
            return {
                getVisitorId: function() {
                    return bL().uuid
                },
                getVisitorInfo: function() {
                    return Y()
                },
                getAttributionInfo: function() {
                    return X()
                },
                getAttributionCampaignName: function() {
                    return X()[0]
                },
                getAttributionCampaignKeyword: function() {
                    return X()[1]
                },
                getAttributionReferrerTimestamp: function() {
                    return X()[2]
                },
                getAttributionReferrerUrl: function() {
                    return X()[3]
                },
                setTrackerUrl: function(cp) {
                    aa = cp
                },
                getTrackerUrl: function() {
                    return aa
                },
                getSiteId: function() {
                    return b4
                },
                setSiteId: function(cp) {
                    cl(cp)
                },
                setUserId: function(cp) {
                    if (!w(cp) ||!cp.length) {
                        return 
                    }
                    aN = cp;
                    a6 = a1(aN).substr(0, 16)
                },
                getUserId: function() {
                    return aN
                },
                setCustomData: function(cp, cq) {
                    if (J(cp)) {
                        an = cp
                    } else {
                        if (!an) {
                            an = {}
                        }
                        an[cp] = cq
                    }
                },
                getCustomData: function() {
                    return an
                },
                setCustomRequestProcessing: function(cp) {
                    au = cp
                },
                appendToTrackingUrl: function(cp) {
                    bz = cp
                },
                getRequest: function(cp) {
                    return aX(cp)
                },
                addPlugin: function(cp, cq) {
                    a[cp] = cq
                },
                setCustomVariable: function(cq, cp, ct, cr) {
                    var cs;
                    if (!w(cr)) {
                        cr = "visit"
                    }
                    if (!w(cp)) {
                        return 
                    }
                    if (!w(ct)) {
                        ct = ""
                    }
                    if (cq > 0) {
                        cp=!n(cp) ? String(cp) : cp;
                        ct=!n(ct) ? String(ct) : ct;
                        cs = [cp.slice(0, b9), ct.slice(0, b9)];
                        if (cr === "visit" || cr === 2) {
                            Z();
                            ag[cq] = cs
                        } else {
                            if (cr === "page" || cr === 3) {
                                bp[cq] = cs
                            } else {
                                if (cr === "event") {
                                    ab[cq] = cs
                                }
                            }
                        }
                    }
                },
                getCustomVariable: function(cq, cr) {
                    var cp;
                    if (!w(cr)) {
                        cr = "visit"
                    }
                    if (cr === "page" || cr === 3) {
                        cp = bp[cq]
                    } else {
                        if (cr === "event") {
                            cp = ab[cq]
                        } else {
                            if (cr === "visit" || cr === 2) {
                                Z();
                                cp = ag[cq]
                            }
                        }
                    }
                    if (!w(cp) || (cp && cp[0] === "")) {
                        return false
                    }
                    return cp
                },
                deleteCustomVariable: function(cp, cq) {
                    if (this.getCustomVariable(cp, cq)) {
                        this.setCustomVariable(cp, "", "", cq)
                    }
                },
                storeCustomVariablesInCookie: function() {
                    bb = true
                },
                setLinkTrackingTimer: function(cp) {
                    by = cp
                },
                setDownloadExtensions: function(cp) {
                    if (n(cp)) {
                        cp = cp.split("|")
                    }
                    aY = cp
                },
                addDownloadExtensions: function(cq) {
                    var cp;
                    if (n(cq)) {
                        cq = cq.split("|")
                    }
                    for (cp = 0; cp < cq.length; cp++) {
                        aY.push(cq[cp])
                    }
                },
                removeDownloadExtensions: function(cr) {
                    var cq, cp = [];
                    if (n(cr)) {
                        cr = cr.split("|")
                    }
                    for (cq = 0; cq < aY.length; cq++) {
                        if (z(cr, aY[cq])===-1) {
                            cp.push(aY[cq])
                        }
                    }
                    aY = cp
                },
                setDomains: function(cp) {
                    bA = n(cp) ? [cp] : cp;
                    bA.push(bX)
                },
                setIgnoreClasses: function(cp) {
                    ai = n(cp) ? [cp] : cp
                },
                setRequestMethod: function(cp) {
                    bD = cp || bB
                },
                setRequestContentType: function(cp) {
                    aO = cp || bi
                },
                setReferrerUrl: function(cp) {
                    bF = cp
                },
                setCustomUrl: function(cp) {
                    bc = bW(ci, cp)
                },
                setDocumentTitle: function(cp) {
                    aW = cp
                },
                setAPIUrl: function(cp) {
                    ay = cp
                },
                setDownloadClasses: function(cp) {
                    bo = n(cp) ? [cp] : cp
                },
                setLinkClasses: function(cp) {
                    aG = n(cp) ? [cp] : cp
                },
                setCampaignNameKey: function(cp) {
                    a2 = n(cp) ? [cp] : cp
                },
                setCampaignKeywordKey: function(cp) {
                    aT = n(cp) ? [cp] : cp
                },
                discardHashTag: function(cp) {
                    ak = cp
                },
                setCookieNamePrefix: function(cp) {
                    cg = cp;
                    ag = ar()
                },
                setCookieDomain: function(cp) {
                    var cq = y(cp);
                    if (bm(cq)) {
                        aq = cq;
                        bu()
                    }
                },
                setCookiePath: function(cp) {
                    ch = cp;
                    bu()
                },
                setVisitorCookieTimeout: function(cp) {
                    ax = cp * 1000
                },
                setSessionCookieTimeout: function(cp) {
                    aD = cp * 1000
                },
                setReferralCookieTimeout: function(cp) {
                    bg = cp * 1000
                },
                setConversionAttributionFirstReferrer: function(cp) {
                    a9 = cp
                },
                disableCookies: function() {
                    ao = true;
                    b5.cookie = "0";
                    if (b4) {
                        W()
                    }
                },
                deleteCookies: function() {
                    W()
                },
                setDoNotTrack: function(cq) {
                    var cp = e.doNotTrack || e.msDoNotTrack;
                    b8 = cq && (cp === "yes" || cp === "1");
                    if (b8) {
                        this.disableCookies()
                    }
                },
                addListener: function(cq, cp) {
                    bK(cq, cp)
                },
                enableLinkTracking: function(cp) {
                    b6 = true;
                    if (p) {
                        bj(cp)
                    } else {
                        E.push(function() {
                            bj(cp)
                        })
                    }
                },
                enableJSErrorTracking: function() {
                    if (cm) {
                        return 
                    }
                    cm = true;
                    var cp = G.onerror;
                    G.onerror = function(cu, cs, cr, ct, cq) {
                        aQ(function() {
                            var cv = "JavaScript Errors";
                            var cw = cs + ":" + cr;
                            if (ct) {
                                cw += ":" + ct
                            }
                            al(cv, cw, cu)
                        });
                        if (cp) {
                            return cp(cu, cs, cr, ct, cq)
                        }
                        return false
                    }
                },
                disablePerformanceTracking: function() {
                    a5 = false
                },
                setGenerationTimeMs: function(cp) {
                    aL = parseInt(cp, 10)
                },
                enableHeartBeatTimer: function(cp) {
                    cp = Math.max(cp, 1);
                    b2 = (cp || 15) * 1000;
                    if (bn !== null) {
                        bE()
                    }
                },
                killFrame: function() {
                    if (G.location !== G.top.location) {
                        G.top.location = G.location
                    }
                },
                redirectFile: function(cp) {
                    if (G.location.protocol === "file:") {
                        G.location = cp
                    }
                },
                setCountPreRendered: function(cp) {
                    a4 = cp
                },
                trackGoal: function(cp, cr, cq) {
                    aQ(function() {
                        bw(cp, cr, cq)
                    })
                },
                trackLink: function(cq, cp, cs, cr) {
                    aQ(function() {
                        bZ(cq, cp, cs, cr)
                    })
                },
                trackPageView: function(cp, cq) {
                    ah = [];
                    if (A(b4)) {
                        aQ(function() {
                            M(aa, ay, b4)
                        })
                    } else {
                        aQ(function() {
                            bk(cp, cq)
                        })
                    }
                },
                trackAllContentImpressions: function() {
                    if (A(b4)) {
                        return
                    }
                    aQ(function() {
                        aE(function() {
                            var cp = m.findContentNodes();
                            var cq = a0(cp);
                            ap(cq, by)
                        })
                    })
                },
                trackVisibleContentImpressions: function(cp, cq) {
                    if (A(b4)) {
                        return 
                    }
                    if (!w(cp)) {
                        cp = true
                    }
                    if (!w(cq)) {
                        cq = 750
                    }
                    bG(cp, cq, this);
                    aQ(function() {
                        aU(function() {
                            var cr = m.findContentNodes();
                            var cs = bN(cr);
                            ap(cs, by)
                        })
                    })
                },
                trackContentImpression: function(cr, cp, cq) {
                    if (A(b4)) {
                        return 
                    }
                    if (!cr) {
                        return 
                    }
                    cp = cp || "Unknown";
                    aQ(function() {
                        var cs = bY(cr, cp, cq);
                        a3(cs, by)
                    })
                },
                trackContentImpressionsWithinNode: function(cp) {
                    if (A(b4) ||!cp) {
                        return 
                    }
                    aQ(function() {
                        if (aA) {
                            aU(function() {
                                var cq = m.findContentNodesWithinNode(cp);
                                var cr = bN(cq);
                                ap(cr, by)
                            })
                        } else {
                            aE(function() {
                                var cq = m.findContentNodesWithinNode(cp);
                                var cr = a0(cq);
                                ap(cr, by)
                            })
                        }
                    })
                },
                trackContentInteraction: function(cr, cs, cp, cq) {
                    if (A(b4)) {
                        return 
                    }
                    if (!cr ||!cs) {
                        return 
                    }
                    cp = cp || "Unknown";
                    aQ(function() {
                        var ct = ck(cr, cs, cp, cq);
                        a3(ct, by)
                    })
                },
                trackContentInteractionNode: function(cq, cp) {
                    if (A(b4) ||!cq) {
                        return 
                    }
                    aQ(function() {
                        var cr = aZ(cq, cp);
                        a3(cr, by)
                    })
                },
                trackEvent: function(cq, cs, cp, cr) {
                    aQ(function() {
                        al(cq, cs, cp, cr)
                    })
                },
                trackSiteSearch: function(cp, cr, cq) {
                    aQ(function() {
                        aR(cp, cr, cq)
                    })
                },
                setEcommerceView: function(cs, cp, cr, cq) {
                    if (!w(cr) ||!cr.length) {
                        cr = ""
                    } else {
                        if (cr instanceof Array) {
                            cr = JSON2.stringify(cr)
                        }
                    }
                    bp[5] = ["_pkc", cr];
                    if (w(cq) && String(cq).length) {
                        bp[2] = ["_pkp", cq]
                    }
                    if ((!w(cs) ||!cs.length) && (!w(cp) ||!cp.length)) {
                        return 
                    }
                    if (w(cs) && cs.length) {
                        bp[3] = ["_pks", cs]
                    }
                    if (!w(cp) ||!cp.length) {
                        cp = ""
                    }
                    bp[4] = ["_pkn", cp]
                },
                addEcommerceItem: function(ct, cp, cr, cq, cs) {
                    if (ct.length) {
                        bQ[ct] = [ct, cp, cr, cq, cs]
                    }
                },
                trackEcommerceOrder: function(cp, ct, cs, cr, cq, cu) {
                    bU(cp, ct, cs, cr, cq, cu)
                },
                trackEcommerceCartUpdate: function(cp) {
                    cf(cp)
                }
            }
        }
        function v() {
            return {
                push: R
            }
        }
        function b(ab, aa) {
            var ac = {};
            var Y, Z;
            for (Y = 0; Y < aa.length; Y++) {
                var W = aa[Y];
                ac[W] = 1;
                for (Z = 0; Z < ab.length; Z++) {
                    if (ab[Z] && ab[Z][0]) {
                        var X = ab[Z][0];
                        if (W === X) {
                            R(ab[Z]);
                            delete ab[Z];
                            if (ac[X] > 1) {
                                if (console !== undefined && console && console.error) {
                                    console.error("The method " + X + ' is registered more than once in "paq" variable. Only the last call has an effect. Please have a look at the multiple Piwik trackers documentation: http://developer.piwik.org/guides/tracking-javascript-guide#multiple-piwik-trackers')
                                }
                            }
                            ac[X]++
                        }
                    }
                }
            }
            return ab
        }
        U(G, "beforeunload", S, false);
        o();
        Date.prototype.getTimeAlias = Date.prototype.getTime;
        L = new D();
        var r = ["disableCookies", "setTrackerUrl", "setAPIUrl", "setCookiePath", "setCookieDomain", "setUserId", "setSiteId", "enableLinkTracking"];
        _paq = b(_paq, r);
        for (t = 0; t < _paq.length; t++) {
            if (_paq[t]) {
                R(_paq[t])
            }
        }
        _paq = new v();
        d = {
            addPlugin: function(W, X) {
                a[W] = X
            },
            getTracker: function(W, X) {
                if (!w(X)) {
                    X = this.getAsyncTracker().getSiteId()
                }
                if (!w(W)) {
                    W = this.getAsyncTracker().getTrackerUrl()
                }
                return new D(W, X)
            },
            getAsyncTracker: function() {
                return L
            }
        };
        if (typeof define === "function" && define.amd) {
            define("piwik", [], function() {
                return d
            })
        }
        return d
    }())
}
if (window && window.piwikAsyncInit) {
    window.piwikAsyncInit()
}(function() {
    var a = (typeof AnalyticsTracker);
    if (a === "undefined") {
        AnalyticsTracker = Piwik
    }
}());
if (typeof piwik_log !== "function") {
    piwik_log = function(b, f, d, g) {
        function a(h) {
            try {
                return eval("piwik_" + h)
            } catch (i) {}
            return 
        }
        var c, e = Piwik.getTracker(d, f);
        e.setDocumentTitle(b);
        e.setCustomData(g);
        c = a("tracker_pause");
        if (c) {
            e.setLinkTrackingTimer(c)
        }
        c = a("download_extensions");
        if (c) {
            e.setDownloadExtensions(c)
        }
        c = a("hosts_alias");
        if (c) {
            e.setDomains(c)
        }
        c = a("ignore_classes");
        if (c) {
            e.setIgnoreClasses(c)
        }
        e.trackPageView();
        if (a("install_tracker")) {
            piwik_track = function(i, k, j, h) {
                e.setSiteId(k);
                e.setTrackerUrl(j);
                e.trackLink(i, h)
            };
            e.enableLinkTracking()
        }
    };
    /*! @license-end */
};

