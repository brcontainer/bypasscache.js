/*
 * bypasscache.js 0.0.3
 * Copyright (c) 2017 Guilherme Nascimento (brcontainer@yahoo.com.br)
 * Released under the MIT license
 *
 * https://github.com/brcontainer/bypass-cache
 */

function BypassCache(msg, onlyResources) {
    "use strict";

    var scripts, links, j, i, r = [], w = window, d = document;

    function request(uri, callback) {
        var xhr;

        if (XMLHttpRequest) {
            xhr = new XMLHttpRequest;
        } else if (ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            setTimeout(callback, 1);
            return;
        }

        xhr.open("POST", uri, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 1) {
                setTimeout(callback, 1);

                if (xhr.readyState < 4) {
                    xhr.abort();
                }
            }
        };
        xhr.send("");
    };

    if (onlyResources !== true) r.push(String(w.location));

    scripts = d.getElementsByTagName("script");
    links = d.getElementsByTagName("link");

    i = 0;
    for (j = scripts.length; i < j; i++) {
        if (scripts[i].src) r.push(scripts[i].src);
    }

    i = 0;
    for (j = links.length; i < j; i++) {
        if (links[i].href) r.push(links[i].href);
    }

    i = -1;
    j = r.length;

    if (msg && d.body) d.body.innerHTML = msg;

    if (j > 0) {
        (function check() {
            i++;

            if (i < j) {
                request(r[i], check);
            } else {
                w.location.reload(true);
            }
        })();
    } else {
        w.location.reload(true);
    }
}
