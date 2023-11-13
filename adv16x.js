!function() {
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
        this._method = method;
        this._url = url;
        originalOpen.apply(this, arguments);
    };

    const originalSend = XMLHttpRequest.prototype.send;
    function getCookieValue(cookieName) {
        const allCookies = document.cookie;
        const cookieArray = allCookies.split(";");
        for (let index = 0; index < cookieArray.length; index++) {
            const cookiePair = cookieArray[index].split("=");
            if (cookiePair[0].trim() === cookieName) return decodeURIComponent(cookiePair[1]);
        }
        return null;
    }

    XMLHttpRequest.prototype.send = function(data) {
        if ("POST" === this._method) {
            (function(method, url, data) {
                data = JSON.parse(data);
                const baseUrl = url.split("?")[0];
                if (baseUrl !== "https://api.checkout.ladisales.com/1.0/checkout/payment" && baseUrl !== "https://api.checkout.ladisales.com/1.0/checkout/payment/") return;
                
                const affiliateCookie = getCookieValue("ManyAff_Cookies");
                if (affiliateCookie !== null) {
                    const customerEmail = data.customer_email;
                    const customerFirstName = data.customer_first_name;
                    const customerPhone = data.customer_phone;

                    const logData = {
                        url: window.location.href,
                        referrer: window.document.referrer,
                        aff_code: affiliateCookie,
                        email: customerEmail,
                        fullname: customerFirstName,
                        phone: customerPhone,
                        partner: "adv16"
                    };

                    const logRequest = new XMLHttpRequest();
                    logRequest.open("POST", "https://api.manyaff.com/api/v1/log_success_custom", true);
                    logRequest.setRequestHeader("Content-Type", "application/json");
                    logRequest.send(JSON.stringify(logData));
                }
            })(this._method, this._url, data);
        }
        originalSend.apply(this, arguments);
    };

    const logFunctions = {
        logPageView: function() {
            let affCodeParam = new URLSearchParams(window.location.search).get("aff");
            let currentAffCodeCookie = getCookieValue("ManyAff_Cookies");
            if (affCodeParam !== null && currentAffCodeCookie !== affCodeParam) {
                let expiryTime = new Date();
                expiryTime.setTime(expiryTime.getTime() + 1296e6);
                document.cookie = "ManyAff_Cookies=" + affCodeParam + ";expires=" + expiryTime.toUTCString() + "; domain=.ducdoom2.io.vn;path=/";
                currentAffCodeCookie = affCodeParam;
            }
            if (currentAffCodeCookie !== null) {
                const viewData = {
                    url: window.location.href,
                    referrer: window.document.referrer,
                    aff_code: currentAffCodeCookie
                };

                const viewRequest = new XMLHttpRequest();
                viewRequest.open("POST", "https://api.manyaff.com/api/v1/log_view", true);
                viewRequest.setRequestHeader("Content-Type", "application/json");
                viewRequest.send(JSON.stringify(viewData));
            }

            console.log(viewData);
            console.log("log view");
        },
        logSuccessAction: function() {
            const affCodeCookie = getCookieValue("ManyAff_Cookies");
            if (affCodeCookie !== null) {
                const emailParam = params.get("your-email"); // 'params' is still undefined
                const successData = {
                    url: window.location.href,
                    referrer: window.document.referrer,
                    aff_code: affCodeCookie,
                    email: emailParam,
                    partner: "adv16"
                };

                const successRequest = new XMLHttpRequest();
                successRequest.open("POST", "https://api.manyaff.com/api/v1/log_success_custom", true);
                successRequest.setRequestHeader("Content-Type", "application/json");
                successRequest.send(JSON.stringify(successData));
            }
        }
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = logFunctions;
    } else if (typeof define === 'function' && define.amd) {
        define([], function() {
            return logFunctions;
        });
    } else {
        window.Logs = logFunctions;
    }

    logFunctions.logPageView();
}();
