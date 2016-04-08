{%if $load_webim eq true%}
    <link rel="stylesheet" type="text/css" href="{%$site_config['t5_url']%}/v/webim/WebIM.css">
    <script src="{%$site_config['t5_url']%}/c/product/webim/socket.io.js"></script>
    <script src="{%$site_config['t5_url']%}/c/product/webim/WebIM.max.js"></script>
    <script src="{%$site_config['t5_url']%}/c/product/webim/WebIM.UI.max.js?new2015"></script>
{%/if%}
<script>
    var date = new Date();

    //添加时间戳，精确到小时，便于文件更新
    var timestamp = '' + date.getFullYear() + date.getMonth() + 1 + date.getDate() + date.getHours();

    var scriptUrl = '{%$site_config['t5_url']%}/t5s/output/common/js/count.js?' + timestamp;

    var countScript = document.createElement('script');
    countScript.type = 'text/javascript';
    countScript.async = 1;
    countScript.src = scriptUrl;

    var sourceScript = document.getElementsByTagName('script')[0];
    sourceScript.parentNode.insertBefore(countScript, sourceScript);
</script>


