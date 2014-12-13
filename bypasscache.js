/*
 * bypasscache.js 0.0.2
 * Copyright (c) 2014 Guilherme Nascimento (brcontainer@yahoo.com.br)
 * Released under the MIT license
 *
 * https://github.com/brcontainer/bypass-cache
 */

function BypassCache(msg, onlyResources) {
    "use strict";

    var s, l, j, i, rl, al, r = [];

    rl = function (uri, c) {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
        } else {
            window.setTimeout(c, 1);
            return;
        }

        xhr.open("POST", uri, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 1) {
                window.setTimeout(c, 1);
                if (xhr.readyState < 4) {
                    xhr.abort();
                }
            }
        };
        xhr.send("");
    };

    if (onlyResources !== true) {
        r.push(String(window.location));
    }

    s = document.getElementsByTagName("script");
    l = document.getElementsByTagName("link");

    i = 0;
    for (j = s.length; i < j; i += 1) {
        if (s[i].src) {
            r.push(s[i].src);
        }
    }

    i = 0;
    for (j = l.length; i < j; i += 1) {
        if (l[i].href) {
            r.push(l[i].href);
        }
    }

    i = -1;
    j = r.length;

    if (msg && document.body) {
        document.body.innerHTML = msg;
    }

    if (j > 0) {
        al = function () {
            i += 1;
            if (i < j) {
                rl(r[i], al);
            } else {
                window.location.reload(true);
            }
        };
        al();
    } else {
        window.location.reload(true);
    }
}
