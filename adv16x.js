! function() {
    const o = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(e, t) {
        this._method = e, this._url = t, o.apply(this, arguments)
    };
    const t = XMLHttpRequest.prototype.send;

    function s(t) {
        const e = document.cookie,
            o = e.split(";");
        for (let e = 0; e < o.length; e++) {
            const n = o[e].split("=");
            if (n[0].trim() === t) return decodeURIComponent(n[1])
        }
        return null
    }
    XMLHttpRequest.prototype.send = function(e) {
        "POST" === this._method && function(e, t) {
            t = JSON.parse(t);
            var o, n, i = e.split("?")[0];
            "https://api.checkout.ladisales.com/1.0/checkout/payment" != i && "https://api.checkout.ladisales.com/1.0/checkout/payment/" != i || null != (o = s("ManyAff_Cookies")) && (n = t.customer_email, e = t.customer_first_name, i = t.customer_phone, t = new XMLHttpRequest, i = {
                url: window.location.href,
                referrer: window.document.referrer,
                aff_code: o,
                email: n,
                fullname: e,
                phone: i,
                partner: "adv16"
            }, t.open("POST", "https://api.manyaff.com/api/v1/log_success_custom", !0), t.setRequestHeader("Content-Type", "application/json"), t.send(JSON.stringify(i)))
        }((this._method, this._url), e), t.apply(this, arguments)
    };
    const e = {
        logView: function() {
            var e, t, o, n = new URLSearchParams(window.location.search).get("aff"),
                i = s("ManyAff_Cookies");
            null != n && i != n && (e = n, t = new Date, o = t.getTime() + 1296e6, t.setTime(o), document.cookie = "ManyAff_Cookies=" + e + ";expires=" + t.toUTCString() + "; domain=.ducdoom.io.vn;path=/", i = n), null != i && (n = new XMLHttpRequest, i = {
                url: window.location.href,
                referrer: window.document.referrer,
                aff_code: i
            }, n.open("POST", "https://api.manyaff.com/api/v1/log_view", !0), n.setRequestHeader("Content-Type", "application/json"), n.send(JSON.stringify(i)))
        },
        logSuccess: function() {
            var e, t, o = s("ManyAff_Cookies");
            null != o && (t = params.get("your-email"), e = new XMLHttpRequest, t = {
                url: window.location.href,
                referrer: window.document.referrer,
                aff_code: o,
                email: t,
                partner: "adv16"
            }, e.open("POST", "https://api.manyaff.com/api/v1/log_success_custom", !0), e.setRequestHeader("Content-Type", "application/json"), e.send(JSON.stringify(t)))
        }
    };
    "undefined" != typeof module && void 0 !== module.exports ? module.exports = e : "function" == typeof define && define.amd ? define([], function() {
        return e
    }) : window.Logs = e, e.logView()
}();
