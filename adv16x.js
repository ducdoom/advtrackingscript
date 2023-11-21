! function() {
    let e = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(t, o) {
        this._method = t, this._url = o, e.apply(this, arguments)
    };
    let t = XMLHttpRequest.prototype.send;

    function o(e) {
        let t = document.cookie,
            o = t.split(";");
        for (let n = 0; n < o.length; n++) {
            let r = o[n].split("="),
                i = r[0].trim();
            if (i === e) return decodeURIComponent(r[1])
        }
        return null
    }
    XMLHttpRequest.prototype.send = function(e) {
        "POST" === this._method && this._url.includes("checkout/payment") && function e(t, n, r) {
            r = JSON.parse(r), (i = n).split("?")[0];
            var i, a = o("ManyAff_Cookies");
            if (null != a) {
                var s = r.customer_email,
                    f = r.customer_first_name,
                    p = r.customer_phone,
                    l = new XMLHttpRequest,
                    c = {
                        url: window.location.href,
                        referrer: window.document.referrer,
                        aff_code: a,
                        email: s,
                        fullname: f,
                        phone: p,
                        partner: "adv16"
                    };
                l.open("POST", "https://api.manyaff.com/api/v1/log_success_custom", !0), l.setRequestHeader("Content-Type", "application/json"), l.send(JSON.stringify(c))
            }
        }(this._method, this._url, e), t.apply(this, arguments)
    };
    let n = {
        logView: function e() {
            var t, n, r, i = new URLSearchParams(window.location.search).get("aff"),
                a = o("ManyAff_Cookies");
            if (null != i && a != i && (t = i, r = (n = new Date).getTime(), n.setTime(r + 1296e6), document.cookie = "ManyAff_Cookies=" + t + ";expires=" + n.toUTCString() + "; domain=.ducdoom.io.vn;path=/", a = i), null != a) {
                var s = new XMLHttpRequest,
                    f = {
                        url: window.location.href,
                        referrer: window.document.referrer,
                        aff_code: a
                    };
                s.open("POST", "https://api.manyaff.com/api/v1/log_view", !0), s.setRequestHeader("Content-Type", "application/json"), s.send(JSON.stringify(f))
            }
        },
        logSuccess: function e() {
            var t = o("ManyAff_Cookies");
            if (null != t) {
                var n = params.get("your-email"),
                    r = new XMLHttpRequest,
                    i = {
                        url: window.location.href,
                        referrer: window.document.referrer,
                        aff_code: t,
                        email: n,
                        partner: "adv16"
                    };
                r.open("POST", "https://api.manyaff.com/api/v1/log_success_custom", !0), r.setRequestHeader("Content-Type", "application/json"), r.send(JSON.stringify(i))
            }
        }
    };
    "undefined" != typeof module && void 0 !== module.exports ? module.exports = n : "function" == typeof define && define.amd ? define([], function() {
        return n
    }) : window.Logs = n, n.logView()
}();
