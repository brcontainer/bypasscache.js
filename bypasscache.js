/*
bypasscache.js 0.0.1
* Copyright (c) 2014 Guilherme Nascimento (brcontainer@yahoo.com.br)
* Released under the MIT license
*/

function ByPassCache(msg) {
    var s, l, j, i, r = [];
    var rl = function(uri, c) {
        if (window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
        } else {
            c();
        }

        xhr.open("POST", r[i], true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                c();
            }
        };
        xhr.send("");
    };

    s = document.getElementsByTagName("script");
    l = document.getElementsByTagName("link");

    i = 0;
    for (j = s.length; i < j; ++i) {
        if (s[i].src) {
            r.push(s[i].src);
        }
    }

    i = 0;
    for (j = l.length; i < j; ++i) {
        if (l[i].href) {
            r.push(l[i].href);
        }
    }

    i = -1;
    j = r.length;

    if (msg) {
        document.body.innerHTML = msg;
    }

    if (j > 0) {
        asyncLoop = function() {
            ++i;
            if (i < j) {
                rl(r[i], asyncLoop);
            } else {
                window.location.reload(true);
            }
            
        };
        asyncLoop();
    } else {
        window.location.reload(true);
    }
}
