{%extends file="common/page/base.tpl"%}
{%block name="layout_before" append%}
    {%* 当前的项目名, 和 fis-conf.js里配置保持一致 *%}
    {%$project["name"]="common"%}

    {%$site_config = [
    "autoConcat" => false,
    "dev" =>true,
    "domain" =>"zbj.com",
    "newlib_url" =>"http://a.t6.zbj.com",
    "t5_url" =>"http://t.t6.zbj.com",
    "t6_url" =>"http://t6.zbj.com",
    "upfile_url" =>"http://image.zhubajie.la/",
    "webim_url" =>"http://webim.t6.zbj.com:32768",
    "www_url" =>"http://www.t6.zbj.com"
    ]%}

    {%$site_config['siteBaseUrl'] = $site_config['www_url']|regex_replace:"/(.*)www\./":""%}

{%/block%}
{%block name="base" append%}
<!DOCTYPE html>
{%html lang="zh-CN"%}
{%head autoConcat=false%}
    <meta charset="utf-8"/>
    <title>{%$title%}-{%$desc%}</title>
    {%require name="common:static/global/global.less"%}

    <style type="text/css">
    .lib-nav{
        float: left;
        /*position: fixed;*/
        width: 20%;
        background: #F9F9F5;
        border-right: 1px solid #EEE;
        padding: 40px 2%;
        box-sizing: border-box;
        min-height: 100%;
    }
    .lib-nav dt{
        color: #999;
        border-bottom: 1px solid #ddd;
        margin-top: 10px;
        line-height: 2;
        width: 60%;
    }
    .lib-nav dd{
        font-size: 14px;
        line-height: 25px;
        text-transform: capitalize;
    }
    .lib-nav dd.active a{
        color: #4092CC;
    }
    .lib-nav h1{
        color: orange;
        margin-bottom: 1em;
    }
    .lib-nav h1 small{
        font-size: 16px;
    }
    .lib-content{
        float: right;
        width: 80%;
        padding: 20px 3%;
        box-sizing: border-box;
    }
    .lib-content p code{
        background: #fee9cc;
        padding: 1px 3px;
        border-radius: 3px;
    }
    .lib-content > h2,
    .lib-content > h3{
        padding-bottom: 10px;
        border-bottom: 3px solid #eee;
    }
    .lib-content > h3 {
        border-bottom: 1px solid #eee;
    }
    .lib-content > hr {
        display: block;
        border: 0;
        height: 2px;
        background-color: #eee;
        margin-top: 20px;
        border-radius: 10px;
    }
    .lib-title{
        font-size: 20px;
    }
    .lib-title small{
        font-size: 12px;
        color: #ff9400;
    }

    /* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript */
    /**
     * prism.js default theme for JavaScript, CSS and HTML
     * Based on dabblet (http://dabblet.com)
     * @author Lea Verou
     */

    code[class*="language-"],
    pre[class*="language-"] {
        color: black;
        text-shadow: 0 1px white;
        font-family: Consolas, Monaco, 'Andale Mono', monospace;
        direction: ltr;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        line-height: 1.5;

        -moz-tab-size: 4;
        -o-tab-size: 4;
        tab-size: 4;

        -webkit-hyphens: none;
        -moz-hyphens: none;
        -ms-hyphens: none;
        hyphens: none;
    }

    pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
    code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
        text-shadow: none;
        background: #b3d4fc;
    }

    pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
    code[class*="language-"]::selection, code[class*="language-"] ::selection {
        text-shadow: none;
        background: #b3d4fc;
    }

    @media print {
        code[class*="language-"],
        pre[class*="language-"] {
            text-shadow: none;
        }
    }

    /* Code blocks */
    pre[class*="language-"] {
        padding: 1em;
        margin: .5em 0;
        overflow: auto;
    }

    :not(pre) > code[class*="language-"],
    pre[class*="language-"] {
        background: #f5f2f0;
    }

    /* Inline code */
    :not(pre) > code[class*="language-"] {
        padding: .1em;
        border-radius: .3em;
    }

    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
        color: slategray;
    }

    .token.punctuation {
        color: #999;
    }

    .namespace {
        opacity: .7;
    }

    .token.property,
    .token.tag,
    .token.boolean,
    .token.number,
    .token.constant,
    .token.symbol,
    .token.deleted {
        color: #905;
    }

    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin,
    .token.inserted {
        color: #690;
    }

    .token.operator,
    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string {
        color: #a67f59;
        background: hsla(0, 0%, 100%, .5);
    }

    .token.atrule,
    .token.attr-value,
    .token.keyword {
        color: #07a;
    }

    .token.function {
        color: #DD4A68;
    }

    .token.regex,
    .token.important,
    .token.variable {
        color: #e90;
    }

    .token.important,
    .token.bold {
        font-weight: bold;
    }
    .token.italic {
        font-style: italic;
    }

    .token.entity {
        cursor: help;
    }

    .lib-content pre[class*="language-"]{
        max-height: 300px;
    }
</style>
{%widget name="common:widget/global/global.tpl" isDev=$site_config['dev']|default:1%}
{%/head%}
{%body%}
    <div class="lib-wrap">
        {%*侧边导航*%}
        <div class="lib-nav">
            <h1>{%$title%}<small>{%$desc%}</small></h1>
            <dl>
                <dt>基础组件</dt>
                {%foreach $map as $key => $val%}
                    {%if $val["type"] eq "base"%}
                        <dd{%if $key eq $current%} class="active" {%/if%}><a href="?doc={%$key%}">{%$key%}</a></dd>
                    {%/if%}
                {%/foreach%}

                <dt>通用组件</dt>
                {%foreach $map as $key => $val%}
                    {%if $val.type eq "comm"%}
                        <dd{%if $key eq $current%} class="active" {%/if%}><a href="?doc={%$key%}">{%$key%}</a></dd>
                    {%/if%}
                {%/foreach%}

                <dt>三方组件</dt>
                {%foreach $map as $key => $val%}
                    {%if $val.type eq "vendor"%}
                        <dd{%if $key eq $current%} class="active" {%/if%}><a href="?doc={%$key%}">{%$key%}</a></dd>
                    {%/if%}
                {%/foreach%}
            </dl>
        </div>
        {%*对应导航内容*%}
        <div class="lib-content">
            {%foreach $map as $key => $val%}
                {%if $key eq $current%}
                    {%*标题*%}
                    <h2 class="lib-title">
                    {%if $val["type"] eq "base"%}
                        {%$key%}组件 <small>默认引入，直接使用</small>
                    {%else%}
                        {%$key%}组件 <small>按需加载</small>
                    {%/if%}
                    </h2>
                    {%widget name=$val["tpl"]%}
                {%/if%}
            {%/foreach%}
        </div>
    </div>
{%script%}
    /* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript */
    self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{};var Prism=function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=self.Prism={util:{encode:function(e){return e instanceof n?new n(e.type,t.util.encode(e.content),e.alias):"Array"===t.util.type(e)?e.map(t.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var a={};for(var r in e)e.hasOwnProperty(r)&&(a[r]=t.util.clone(e[r]));return a;case"Array":return e.map(function(e){return t.util.clone(e)})}return e}},languages:{extend:function(e,n){var a=t.util.clone(t.languages[e]);for(var r in n)a[r]=n[r];return a},insertBefore:function(e,n,a,r){r=r||t.languages;var i=r[e];if(2==arguments.length){a=arguments[1];for(var l in a)a.hasOwnProperty(l)&&(i[l]=a[l]);return i}var s={};for(var o in i)if(i.hasOwnProperty(o)){if(o==n)for(var l in a)a.hasOwnProperty(l)&&(s[l]=a[l]);s[o]=i[o]}return t.languages.DFS(t.languages,function(t,n){n===r[e]&&t!=e&&(this[t]=s)}),r[e]=s},DFS:function(e,n,a){for(var r in e)e.hasOwnProperty(r)&&(n.call(e,r,e[r],a||r),"Object"===t.util.type(e[r])?t.languages.DFS(e[r],n):"Array"===t.util.type(e[r])&&t.languages.DFS(e[r],n,r))}},highlightAll:function(e,n){for(var a,r=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),i=0;a=r[i++];)t.highlightElement(a,e===!0,n)},highlightElement:function(a,r,i){for(var l,s,o=a;o&&!e.test(o.className);)o=o.parentNode;if(o&&(l=(o.className.match(e)||[,""])[1],s=t.languages[l]),s){a.className=a.className.replace(e,"").replace(/\s+/g," ")+" language-"+l,o=a.parentNode,/pre/i.test(o.nodeName)&&(o.className=o.className.replace(e,"").replace(/\s+/g," ")+" language-"+l);var u=a.textContent;if(u){u=u.replace(/^(?:\r?\n|\r)/,"");var g={element:a,language:l,grammar:s,code:u};if(t.hooks.run("before-highlight",g),r&&self.Worker){var c=new Worker(t.filename);c.onmessage=function(e){g.highlightedCode=n.stringify(JSON.parse(e.data),l),t.hooks.run("before-insert",g),g.element.innerHTML=g.highlightedCode,i&&i.call(g.element),t.hooks.run("after-highlight",g)},c.postMessage(JSON.stringify({language:g.language,code:g.code}))}else g.highlightedCode=t.highlight(g.code,g.grammar,g.language),t.hooks.run("before-insert",g),g.element.innerHTML=g.highlightedCode,i&&i.call(a),t.hooks.run("after-highlight",g)}}},highlight:function(e,a,r){var i=t.tokenize(e,a);return n.stringify(t.util.encode(i),r)},tokenize:function(e,n){var a=t.Token,r=[e],i=n.rest;if(i){for(var l in i)n[l]=i[l];delete n.rest}e:for(var l in n)if(n.hasOwnProperty(l)&&n[l]){var s=n[l];s="Array"===t.util.type(s)?s:[s];for(var o=0;o<s.length;++o){var u=s[o],g=u.inside,c=!!u.lookbehind,f=0,h=u.alias;u=u.pattern||u;for(var p=0;p<r.length;p++){var d=r[p];if(r.length>e.length)break e;if(!(d instanceof a)){u.lastIndex=0;var m=u.exec(d);if(m){c&&(f=m[1].length);var y=m.index-1+f,m=m[0].slice(f),v=m.length,k=y+v,b=d.slice(0,y+1),w=d.slice(k+1),N=[p,1];b&&N.push(b);var O=new a(l,g?t.tokenize(m,g):m,h);N.push(O),w&&N.push(w),Array.prototype.splice.apply(r,N)}}}}}return r},hooks:{all:{},add:function(e,n){var a=t.hooks.all;a[e]=a[e]||[],a[e].push(n)},run:function(e,n){var a=t.hooks.all[e];if(a&&a.length)for(var r,i=0;r=a[i++];)r(n)}}},n=t.Token=function(e,t,n){this.type=e,this.content=t,this.alias=n};if(n.stringify=function(e,a,r){if("string"==typeof e)return e;if("Array"===t.util.type(e))return e.map(function(t){return n.stringify(t,a,e)}).join("");var i={type:e.type,content:n.stringify(e.content,a,r),tag:"span",classes:["token",e.type],attributes:{},language:a,parent:r};if("comment"==i.type&&(i.attributes.spellcheck="true"),e.alias){var l="Array"===t.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(i.classes,l)}t.hooks.run("wrap",i);var s="";for(var o in i.attributes)s+=o+'="'+(i.attributes[o]||"")+'"';return"<"+i.tag+' class="'+i.classes.join(" ")+'" '+s+">"+i.content+"</"+i.tag+">"},!self.document)return self.addEventListener?(self.addEventListener("message",function(e){var n=JSON.parse(e.data),a=n.language,r=n.code;self.postMessage(JSON.stringify(t.util.encode(t.tokenize(r,t.languages[a])))),self.close()},!1),self.Prism):self.Prism;var a=document.getElementsByTagName("script");return a=a[a.length-1],a&&(t.filename=a.src,document.addEventListener&&!a.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)),self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism);;
    Prism.languages.markup={comment:/<!--[\w\W]*?-->/,prolog:/<\?.+?\?>/,doctype:/<!DOCTYPE.+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/i,inside:{tag:{pattern:/^<\/?[\w:-]+/i,inside:{punctuation:/^<\/?/,namespace:/^[\w-]+?:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{punctuation:/=|>|"/}},punctuation:/\/?>/,"attr-name":{pattern:/[\w:-]+/,inside:{namespace:/^[\w-]+?:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.hooks.add("wrap",function(t){"entity"===t.type&&(t.attributes.title=t.content.replace(/&amp;/,"&"))});;
    Prism.languages.css={comment:/\/\*[\w\W]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{punctuation:/[;:]/}},url:/url\((?:(["'])(\\\n|\\?.)*?\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*(?=\s*\{)/,string:/("|')(\\\n|\\?.)*?\1/,property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,punctuation:/[\{\};:]/,"function":/[-a-z0-9]+(?=\()/i},Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/<style[\w\W]*?>[\w\W]*?<\/style>/i,inside:{tag:{pattern:/<style[\w\W]*?>|<\/style>/i,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css},alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag));;
    Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.+/,lookbehind:!0}],string:/("|')(\\\n|\\?.)*?\1/,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(true|false)\b/,"function":{pattern:/[a-z0-9_]+\(/i,inside:{punctuation:/\(/}},number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,operator:/[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/,ignore:/&(lt|gt|amp);/i,punctuation:/[{}[\];(),.:]/};;
    Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|-?Infinity)\b/,"function":/(?!\d)[a-z0-9_$]+(?=\()/i}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/<script[\w\W]*?>[\w\W]*?<\/script>/i,inside:{tag:{pattern:/<script[\w\W]*?>|<\/script>/i,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript},alias:"language-javascript"}});;

    // 处理&#xe819;等在源代码显示字符实体
    function unescape_icon(html){
        var ele = $("<div></div>");
        ele.html(html);

        var icon = ele.find(".icon-font");
        icon.each(function(){
           var str = $(this).html().charCodeAt(0).toString(16);
            $(this).text("&#x" + str + ";");
        });

        return ele.html().replace(/&amp;/g, "&");
    }

    $(function(){

        // code+example
        $('.example').each(function(){
            var _this = $(this);



            // 转义html
            var code = $('<code class="language-markup"></code>').text(unescape_icon(_this.html()));

            // 插入html
            _this.append('<pre></pre>');
            _this.find('pre').html(code);
        });

        // 纯code
        $('.code').each(function(){
            var _this = $(this);
            var clsName = this.className;
            var _type = clsName.match(/css|javascript/i) ? clsName.match(/css|javascript/i) : "markup";

            // 转义html
            var codeWrap = $('<pre></pre>');
            var codeDom = $('<code class="language-' + _type + '"></code>').text(_this.html());

            // 插入html
            codeWrap.append(codeDom);
            _this.html(codeWrap);

        });

        // 代码高亮
        Prism.highlightAll();
    });
{%/script%}
{%/body%}
{%/html%}
{%/block%}