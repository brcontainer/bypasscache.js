/*
 * Bypasscache.js 0.1.1
 * Copyright (c) 2018 Guilherme Nascimento (brcontainer@yahoo.com.br)
 * Released under the MIT license
 *
 * https://github.com/brcontainer/bypasscache.js
 */

(function (w, d) {
    'use strict';

    function Reload()
    {
        w.location.reload(true);
    }

    function Request(url, callback)
    {
        var undone = true, xhr = new w.XMLHttpRequest;

        xhr.open('POST', url, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState > 1) {
                if (undone) setTimeout(callback, 1);

                undone = false;

                if (xhr.readyState < 4) xhr.abort();
            }
        };

        xhr.send('');
    }

    function ClearUrls(urls, callback)
    {
        var current = 0, total = urls.length;

        if (!total) return setTimeout(callback, 1);

        (function trigger() {
            if (current >= total) return setTimeout(callback, 1);

            Request(urls[current++], trigger);
        })();
    }

    function GetUrlsByElements(query, attribute)
    {
        var urls = [], els = d.querySelectorAll(query);

        for (var i = 0, j = els.length; i < j; i++) {
            urls.push(els[i][attribute]);
        }

        return urls;
    }

    var q = 'link[href]';

    w.BypassCache = {
        'url': function (url, callback) {
            Request(url, callback);
        },
        'current': function (callback) {
            Request(w.location.href.replace(/#.*?$/, ''), callback);
        },
        'images': function (callback) {
            ClearUrls(GetUrlsByElements('img[src]', 'src'), callback);
        },
        'scripts': function (callback) {
            ClearUrls(GetUrlsByElements('script[src]', 'src'), callback);
        },
        'styles': function (callback) {
            ClearUrls(GetUrlsByElements(q + '[rel~=stylesheet]', 'href'), callback);
        },
        'links': function (callback, ignoreStyles) {
            var query = q + (ignoreStyles == true ? ':not([rel~=stylesheet])' : '');

            ClearUrls(GetUrlsByElements(query, 'href'), callback);
        },
        'reload': function () {
            var urls = GetUrlsByElements('img[src], script[src], audio[src], video[src]', 'src');

            urls = urls.concat(GetUrlsByElements(q + '[rel~=stylesheet], ' + q + '[rel~=icon]', 'href'));

            ClearUrls(urls, Reload);
        }
    };
})(window, document);
