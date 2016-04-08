<script>
    window.ZBJInfo = {
        pageDomain: "{%$site_config['domain']%}",
        baseURI: "{%$site_config['siteBaseUrl']%}",
        newStaticLibURI: "{%$site_config['newlib_url']%}",
        rakeProject: true,
        upFileUrl : "{%$site_config['upfile_url']%}",
        t6Url: "{%$site_config['t6_url']%}",
        t5Url: "{%$site_config['t5_url']%}",
        qiniuUploadTokenUrl: "{%$site_config['qiniu_upload_token_url']%}"

        {%if !empty($searchbox)%}
            ,searchCfg: {%json_encode($searchbox)%}
        {%/if%}

        {%if $site_config['extra']%}
        , {%$site_config['extra']%}
        {%/if%}
    };
</script>
<script>
    {%if $load_webim eq true%}
        window.WEBIMCONFIG = {
            host:"{%$site_config['webim_url']%}",
            getbrandnameurl:"{%$siteurl.uc%}/ajax/getbrandname",
            userHost : "{%$siteurl.uc%}",
            filterUrl : "{%$siteurl.task%}/api/filter",
            getAboutUrl :"{%$siteurl.task%}/api/urltitle",
            defaultIcon : 'http://t4.zbjimg.com/r/p/task/48.gif',
            rulepage : '{%get_url domain="help"%}1037.html'
        };
    {%/if%}
</script>

{%if !$isMobileENV%}
    {%*如果不是移动端WAP*%}
    {%$initJsFiles = [
    "jquery/jquery171.js",
    "seajs/seajs/2.1.1/sea`$debugSuffix`.js",
    "seajs/seajs-combo/1.0.1/seajs-combo`$debugSuffix`.js",
    "seajs/seajs-style/1.0.0/seajs-style`$debugSuffix`.js",
    "seajs/seajs-text/1.0.3/seajs-text`$debugSuffix`.js"
    ]%}
{%else%}
    {%*如果是移动端WAP*%}
    {%$initJsFiles = [
    "zepto/zepto.min.js",
    "seajs/seajs/2.1.1/sea`$debugSuffix`.js",
    "seajs/seajs-combo/1.0.1/seajs-combo`$debugSuffix`.js",
    "seajs/seajs-style/1.0.0/seajs-style`$debugSuffix`.js",
    "seajs/seajs-text/1.0.3/seajs-text`$debugSuffix`.js"
    ]%}
{%/if%}

{%if !$autoConcat%}
    {%foreach from=$initJsFiles item=item%}
        {%if !strstr($item, 'seajs-combo')%}
            <script {%if strstr($item, 'sea.js') || strstr($item, 'sea-debug.js')%}id="seajsnode"{%/if%} type="text/javascript" src="{%uri name="common:static/lib/`$item`"%}"></script>
        {%/if%}
    {%/foreach%}
{%else%}
    {%strip%}
    <script id="seajsnode" type="text/javascript" src="{%$site_config['newlib_url']%}/??/
        {%foreach from=$initJsFiles item=item name=initJsFilesLoop%}
            {%if !$smarty.foreach.initJsFilesLoop.first%},{%/if%}static/common/lib/{%$item%}
        {%/foreach%}
    "></script>
    {%/strip%}
{%/if%}

<script src="{%uri name="common:static/seajs-config.js"%}"></script>
{%if "`$project["name"]`:static" != "common:static"%}
    <script src="{%uri name="`$project["name"]`:static/seajs-config.js"%}"></script>
{%/if%}
