// ==UserScript==
// @name         Gemz web
// @version      1.0
// @author       mudachyo
// @match        *://ff.notgemz.gemz.fun/*
// @icon         https://ff.notgemz.gemz.fun/favicon.ico
// @run-at       document-start
// @grant        none
// @downloadURL  https://github.com/mudachyo/Gemz/raw/main/gemz-web.user.js
// @updateURL    https://github.com/mudachyo/Gemz/raw/main/gemz-web.user.js
// @homepage     https://github.com/mudachyo/Gemz
// ==/UserScript==

(function() {
    'use strict';
    // Изменить User-Agent
    var newUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";
    Object.defineProperty(navigator, 'userAgent', {
        get: function() { return newUserAgent; }
    });
    Object.defineProperty(navigator, 'platform', {
        get: function() { return 'iPhone'; }
    });
    Object.defineProperty(navigator, 'vendor', {
        get: function() { return 'Apple Computer, Inc.'; }
    });

})();
