/*
 * 收集 headtime，首屏时间，domready 时间，onload 时间
 *
 * */
(function(winElement, docElement) {
    // 压缩代码相关
    /* compressor */

    var objectName = winElement.alogObjectName || 'alog';

    var alog = winElement[objectName] = winElement[objectName] || function() {
            winElement[objectName].l = winElement[objectName].l || +new Date;
            (winElement[objectName].q = winElement[objectName].q || []).push(arguments);
        };
    var trackerName = 'speed';
    alog('define', trackerName, function() {
        var tracker = alog.tracker(trackerName);
        var timestamp = alog.timestamp; // 获取时间戳的函数，相对于alog被声明的时间
        var data = {};
        tracker.on('record', function(url, time) {
            var data = {};
            data[url] = timestamp(time);
            tracker.send('timing', data);
        });
        tracker.set('protocolParameter', {
            // 配置字段，不需要上报
            fsItems: null
        });

        tracker.on('send', function( data ){
            var rsData = {};
            $.each(data, function( idx, item ){
                if ( idx != 'fsItems' && idx != 'protocolParameter' ) {
                    rsData[idx] = item;
                }
            });
            seajs.use('components/log/log', function( log ){
                log.sendLog( rsData );
            });
        });

        (function() {
            function _uaMatch(ua) {
                var rchrome = /(chrome)\/(\d+\.\d)/,
                    rsafari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/,
                    ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                    rmsie = /(msie) ([\w.]+)/,
                    rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
                    ua = ua.toLowerCase(),
                    b = {};
                var match = rchrome.exec(ua) || ropera.exec(ua) || rmsie.exec(ua) || ua.indexOf("compatible") < 0 && rmozilla.exec(ua) || [];
                if (rsafari.test(ua) && !/chrome/.test(ua)) {
                    match[1] = "safari";
                    match[2] = RegExp["$1"] || RegExp["$2"]
                }
                return {
                    browser: match[1] || "unknown",
                    version: match[2] || "0"
                }
            }

            function _browser() {
                var b = _uaMatch(navigator.userAgent);
                var browser = b.browser;
                if (browser == "msie") {
                    if (document.documentMode) {
                        var vers = b.version.substring(0, 1);
                        if (window.performance) {
                            browser += "9.0";
                            data.ebrowser = vers + "9" + document.documentMode
                        } else {
                            browser += "8.0";
                            data.ebrowser = vers + "8" + document.documentMode
                        }
                    } else {
                        browser += b.version
                    }
                }
                var map = {
                    "msie6.0": 16,
                    "msie7.0": 17,
                    "msie8.0": 18,
                    "msie9.0": 19,
                    chrome: 20,
                    mozilla: 30,
                    safari: 40,
                    opera: 50
                };
                data.browser = map[browser] || 0
            }
            _browser();
        })();

        var _onload = window.onload;
        window.onload = function(){

            var config = window.alogConfig;
            // onload 时间
            tracker.set('lt', +new Date());


            _onload && _onload();

            calculateFirstScreenTime();

            data.product = config.speed.product;
            if ( config.speed.url ) {
                data.url = config.speed.url;
            } else if ( config.speed.page ) {
                data.page = config.speed.page;
            }

            data.fs = timestamp(tracker.get('fs'));
            data.ht = timestamp(tracker.get('ht'));
            data.drt = timestamp(tracker.get('drt'));
            data.lt = timestamp(tracker.get('lt'));


            tracker.send('pagespeed', data);

        };
        return tracker;

        function calculateFirstScreenTime(){
            var fsItems = tracker.get("fsItems");
            var sh = docElement.documentElement.clientHeight;
            var fs = tracker.get("fs");
            for (var i = 0; fsItems && i < fsItems.length; i++) {
                var item = fsItems[i],
                    img = item.img,
                    time = item.time,
                    top = img.offsetTop || 0;
                if (top > 0 && top < sh) {
                    fs = time > fs ? time : fs
                }
            }
            data.fs = fs;
        }
    });

})(window, document);