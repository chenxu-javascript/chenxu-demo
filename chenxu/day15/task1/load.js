/**
 * Created by Administrator on 2016/3/28.
 */


(function(){
    // 文件路径
    var url = [
        "js/flexible.js",
        "css/sprite.css",
        "css/index.css",
        "js/less.min.js",
        "http://t6.zbjimg.com/seajs/seajs/2.1.1/sea.js"
    ];
    function ayncLoad(files){
        var length = files.length;
        for(var i = 0 ; i<length;i++){
            (function(i){
                var suffix = files[i].split('.');
                if(suffix[suffix.length-1] === 'css'){
                    // 创建 css
                    loadCss(files[i]);
                }
                else if(suffix[suffix.length-1] === 'js'){
                    // 动态创建 js
                    loadScript(files[i]);
                }
                else{
                    // 其他格式的文件
                    console.log(files[i]);
                }
            })(i);
        }
    }

    function loadScript(url){
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = url;
        console.log(script);
        document.documentElement.appendChild(script);
    }
    function loadCss(url){
        var doc=document;
        var link=doc.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", url);

        var heads = doc.getElementsByTagName("head");
        if(heads.length)
            heads[0].appendChild(link);
        else
            doc.documentElement.appendChild(link);
    }
    // 调用
    ayncLoad(url);
})();