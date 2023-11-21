(function () {
    // Function to handle the intercepted request
    function handleRequest(method, url, data_json) {
        // Do something with the POST request
        // console.log('POST request caught:', { method, url, data });
        // You can perform any other logic here to handle the request.
        data_json = JSON.parse(data_json);
        // console.log(data.customer_email);
        var url_action = split_url(url);
        // console.log(url_action);
        // if(url_action == 'https://api.checkout.ladisales.com/1.0/checkout/payment' || url_action == 'https://api.checkout.ladisales.com/1.0/checkout/payment/'){
            var aff_code_in_cookies = getCookie('ManyAff_Cookies');
            if(aff_code_in_cookies != null){
                // console.log("se post");
                // const formData_2 = new FormData(event.target);

                var email = data_json.customer_email;
                var fullname = data_json.customer_first_name;
                var phone = data_json.customer_phone;
                var xhr = new XMLHttpRequest();
                var data = {
                    url: window.location.href,
                    referrer: window.document.referrer,
                    aff_code: aff_code_in_cookies,
                    email: email,
                    fullname: fullname,
                    phone: phone,
                    partner: 'adv19'
                };
                xhr.open('POST', 'https://api.manyaff.com/api/v1/log_success_custom', true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            }
        // }
    }
    
    // Intercept the XMLHttpRequest open and send methods
    const open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url) {
        this._method = method;
        this._url = url;
        open.apply(this, arguments);
    };
    
    const send = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function (data) {
        if (this._method === 'POST') {
            if(this._url.includes('checkout/payment')){
                handleRequest(this._method, this._url, data);
            }
        }
        send.apply(this, arguments);
    };
    // document.addEventListener("fetch", function(event) {
    //     console.log("fetch");
    //     if (event.target.method === "post" || event.target.method === "POST") {
    //         console.log("post");
    //         var url_action = split_url(event.target.action);
    //         console.log(url_action);
    //         if(url_action == 'https://api.checkout.ladisales.com/1.0/checkout/payment' || url_action == 'https://api.checkout.ladisales.com/1.0/checkout/payment/' || url_action == 'https://api.checkout.ladisales.com/1.0/checkout/create' || url_action == 'https://api.checkout.ladisales.com/1.0/checkout/create/'){
    //             var aff_code_in_cookies = getCookie('ManyAff_Cookies');
    //             if(aff_code_in_cookies != null){
    //                 const formData_2 = new FormData(event.target);

    //                 var email = formData_2.get("customer_email");
    //                 var fullname = formData_2.get("customer_first_name");
    //                 var phone = formData_2.get("customer_phone");
    //                 var xhr = new XMLHttpRequest();
    //                 var data = {
    //                     url: window.location.href,
    //                     referrer: window.document.referrer,
    //                     aff_code: aff_code_in_cookies,
    //                     email: email,
    //                     fullname: fullname,
    //                     phone: phone,
    //                     partner: 'adv14'
    //                 };
    //                 xhr.open('POST', 'https://api.manyaff.com/api/v1/log_success_custom', true);
    //                 xhr.setRequestHeader('Content-Type', 'application/json');
    //                 xhr.send(JSON.stringify(data));
    //             }
    //         }
    //     }
    // });

    function split_url(url){
        var arrayURL = url.split("?");
        return arrayURL[0];
    }

    function logView() {
        var params = new URLSearchParams(window.location.search);
        var aff_code = params.get('aff');
        var aff_code_in_cookies = getCookie('ManyAff_Cookies');

        if(aff_code != null && aff_code_in_cookies != aff_code){
            setCookies(aff_code)
            aff_code_in_cookies = aff_code;
        }
        
        if(aff_code_in_cookies != null){
            var xhr = new XMLHttpRequest();
            var data = {
                url: window.location.href,
                referrer: window.document.referrer,
                aff_code: aff_code_in_cookies
            };
            xhr.open('POST', 'https://api.manyaff.com/api/v1/log_view', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
    }

    function logSuccess() {
        var aff_code_in_cookies = getCookie('ManyAff_Cookies');
        if(aff_code_in_cookies != null){
            var email = params.get('your-email');
            var xhr = new XMLHttpRequest();
            var data = {
                url: window.location.href,
                referrer: window.document.referrer,
                aff_code: aff_code_in_cookies,
                email: email,
                partner: 'adv16'
            };
            xhr.open('POST', 'https://api.manyaff.com/api/v1/log_success_custom', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
    }

    function setCookies(value){
        var now = new Date();
        var time = now.getTime();
        var expireTime = time + (15 * 24 * 60 * 60 * 1000);
        var domain = "; domain=.ducdoom.io.vn";
        now.setTime(expireTime);
        document.cookie = 'ManyAff_Cookies='+value+';expires=' + now.toUTCString() + domain + ';path=/';
    }

    function getCookie(key) {
        const cookieStr = document.cookie;
        const cookies = cookieStr.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookiePair = cookies[i].split('=');
            const cookieName = cookiePair[0].trim();
            if (cookieName === key) {
            return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    }
    
    const Logs = {
      logView: logView,
      logSuccess: logSuccess
    };
  
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
      module.exports = Logs;
    }
    
    else if (typeof define === 'function' && define.amd) {
      define([], function() {
        return Logs;
      });
    }
    
    else {
      window.Logs = Logs;
    }

    Logs.logView();
    // Logs.logSuccess();
})();
  
