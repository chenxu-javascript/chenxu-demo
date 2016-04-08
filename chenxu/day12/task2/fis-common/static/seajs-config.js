;(function (ZBJInfo, isRakeProject) {

    //老项目中newStaticLibURI指向的是v6style
    var staticT6Lib = isRakeProject ?
        ZBJInfo.newStaticLibURI :
        ZBJInfo.rakeStaticLibURI;

    if (typeof staticT6Lib == 'undefined') {
        staticT6Lib = 'http://a.zbjimg.com';
    }

    // 目前已经合并的组件
    var mergeComponents = [
        'common:components/uploader-qiniu/',
        'common:components/business-opportunities/',
        'common:components/utils/',
        'common:components/log/',
        'common:components/loginable/',
        'common:components/captchable/',
        'common:components/loading/',
        'common:components/poptip',
        'common:components/refer-statistics/',
        'common:components/baidutemplate/',
        'common:components/order-service',
        'common:components/webim/',
        'common:components/visibility/'
    ];

    var commonComponentsId = 'common:components';

    var seajsPaths = {
        "arale": staticT6Lib + '/static/common/lib/arale',
        "gallery": staticT6Lib + '/static/common/lib/gallery',
        "jquery": staticT6Lib + '/static/common/lib/jquery',
        "zepto": staticT6Lib + '/static/common/lib/zepto'
    };

    var seajsAlias = {
        "seajs-debug": "seajs/seajs-debug/1.1.1/seajs-debug",
        "widget": 'arale/widget/1.1.1/widget',

        "position": 'arale/position/1.0.1/position',
        "cookie": 'arale/cookie/1.0.2/cookie',
        "sticky": 'arale/sticky/1.3.1/sticky',

        //switchable
        "tabs": 'arale/switchable/1.0.3/tabs',
        "slide": 'arale/switchable/1.0.3/slide',
        "accordion": 'arale/switchable/1.0.3/accordion',
        "carousel": 'arale/switchable/1.0.3/carousel',
        "overlay": 'arale/overlay/1.1.3/overlay',
        "mask": 'arale/overlay/1.1.3/mask',
        "dialog": 'arale/dialog/1.3.0/dialog',
        "events": 'arale/events/1.1.0/events',

        "validator": 'arale/validator/0.9.7/validator',

        "autocomplete": 'arale/autocomplete/1.2.3/autocomplete',

        "tpl": 'arale/templatable/0.9.2/templatable',

        // zbj
        "verifycode": 'zbj/verifycode/1.1.0/verifycode',
        "address-selector": 'zbj/address-selector/1.0.0/index',

        "backbone": 'components/backbone/index',
        "underscore": 'components/underscore/index'
    };

    var rakeProject = {
        beforeConfig: function () {
            setHTTPS();
            setDevRakeBase();
        },
        postConfig: function () {
            resolveRakeBase();
            resolve$();
        }
    };

    var nonRakeProject = {
        beforeConfig: function () {
            seajsAlias = {};
            fixComponentMap();
        },
        postConfig: function () {
            resolveV6styleBase();
            resolveLessAndTmplFile();
        }
    };

    var runtimeEnv = !isRakeProject ? nonRakeProject : rakeProject;


    runtimeEnv.beforeConfig();
    initSeajsConfig();
    runtimeEnv.postConfig();


    function initSeajsConfig() {
        seajs.config({
            debug: false,
            paths: seajsPaths,
            alias: seajsAlias
        });
    }


    function setHTTPS() {
        // https 页面
        if (document.location.protocol == 'https:') {
            commonComponentsId = 'login-common:components';
            staticT6Lib = document.location.protocol + '//' + document.location.host + '/rake';
            seajs.config({
                paths: {
                    "arale": staticT6Lib + '/static/login-common/lib/arale',
                    "gallery": staticT6Lib + '/static/login-common/lib/gallery',
                    "jquery": staticT6Lib + '/static/login-common/lib/jquery'
                }
            })
        }
    }

    function resolveV6styleBase() {
        var originBaseData = seajs.data.base;
        seajs.on('resolve', function (data) {
            seajs.data.base = _inArray(mergeComponents, data.id) ? '' : originBaseData;
        });
    }

    function setDevRakeBase(){
        seajs.config({
            base: '/'
        })
    }

    function resolveRakeBase() {
        // 如果不是本地开发环境，那么 map 出来的就是全路径了，所以不需要做 base 的处理，直接重置为空
        (function () {
            var seajsNode = document.getElementById('seajsnode');
            var seajsDir = seajsNode && seajsNode.getAttribute('src');
            if (seajsDir && !/^\//.test(seajsDir)) {
                seajs.data.base = '';
            }
        })();
    }


    function resolve$() {
        if (window.$) {
            define('hack$', [], function () {
                return window.$;
            });
            seajs.use('hack$');
            seajs.cache[seajs.resolve('$')] =
                seajs.cache[seajs.resolve('$-debug')] =
                    seajs.cache[seajs.resolve('jquery')] =
                        seajs.cache[seajs.resolve('jquery-debug')] =
                            seajs.cache[seajs.resolve('hack$')];
        }
    }


    function _inArray(array, clue) {
        for (var i = 0, item; item = array[i++];) {
            if (clue.indexOf(item) == 0) {
                return true;
            }
        }
        return false;
    }



    function fixComponentMap(){
        var _config = seajs.config;

        seajs.config = function(opts){
            if(opts.map){
                seajs.data.map = opts.map.concat(seajs.data.map);
                delete opts.map;
            }
            _config(opts);
        };
    }

    // less 文件 和 tmpl 文件的加载
    function resolveLessAndTmplFile(){
        seajs.on("resolve", function(data) {
            var id = data.id;
            if (!id) return "";

            var rExt = id.substring( id.lastIndexOf('.') + 1 );
            if(rExt == 'less' || rExt == 'tmpl'){
                id += "#";
            }

            data.uri = seajs.resolve(id, data.refUri);
        });
    }


})(window.ZBJInfo, window.ZBJInfo.rakeProject);