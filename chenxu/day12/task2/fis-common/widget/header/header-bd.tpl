{%* 换首页logo *%}

{%$defaultLogoPath="output/global/img/2015/newlogo.png"%}
{%$sslLogo=$defaultLogoPath%}

{%if !empty($is_index) && $indexSpecialLogo%}
    {%$logoImg=$indexSpecialLogo%}
{%else%}
    {%$logoImg="{%$site_config['t6_url']%}/`$defaultLogoPath`"%}
{%/if%}

{%* seo 要求，首页用 h1，内页用 div *%}
{%if empty($is_index)%}
    {%$headerTag="div"%}
{%else%}
    {%$headerTag="h1"%}
{%/if%}

{%**
 zbj-header-hashotwords
 zbj-header-bd-mini
*%}
<div class="zbj-header-bd-wrap ibj-header-bd" id="j-zbj-header-bd-wrap">
    <div class="grid zbj-grid zbj-header-bd">
        <{%$headerTag%} class="fl zbj-logo">
        <a data-linkid="logo" data-process="1" href="{%get_url domain="www"%}" title="猪八戒网" class="zbj-logo-main">
            {%if $smarty.server.SERVER_NAME|strstr:"login"%}
                <img src="/v6style/{%$sslLogo%}" alt="猪八戒让人民为你服务"/>
            {%else%}
                <img src="{%$logoImg%}" alt="猪八戒让人民为你服务"/>
            {%/if%}
        </a>
        {%if $sublogo_txt%}
            <a class="yahei zbj-logo-sub"  href="{%if $channel.current_cndir!=$channel.cndir%}#{%else%}{%$sublogo_url%}{%/if%}" data-process="1" title="{%$sublogo_txt%}">
                <span class="item-txt" rel="{%$channel.cndir%}">{%if $channel.virtual_name%}{%$channel.virtual_name%}{%else%}{%if $channel.current_name%}{%$channel.current_name%}{%else%}{%$sublogo_txt%}{%/if%}{%/if%}</span>
            </a>
        {%/if%}
        {%if $sublogo_extra%}
            {%$sublogo_extra%}
        {%/if%}
    </{%$headerTag%}>

    {%$wwwbase=$siteurl.main%}
    {%$taskbase=$siteurl.task%}
    {%$current_category = ""%}
    {%if !empty($channel.virtual_id) || $vir1id%}
        {%$current_category_id = {%$channel.virtual_id|default:$vir1id%}%}
        {%$current_category = "-category-`$current_category_id`"%}
    {%elseif !empty($virtual_id)%}
        {%$current_category_id = {%$virtual_id%}%}
        {%$current_category = "-category-`$current_category_id`"%}
    {%/if%}
    {%if strpos($smarty.server['SERVER_NAME'], 'home.') === 0%}
        {%$taskUrl="`$wwwbase`/direct/d?c=4&l=`$taskbase`/pub/step1`$current_category`?from_cid=10001"%}
    {%else%}
        {%$taskUrl="`$taskbase`/pub/step1`$current_category`?from_cid=10001"%}
    {%/if%}
    {%strip%}
    {%*传递一个参数就可以隐藏掉右边的搜索和发布*%}
        {%if $hidesearch neq null%}<div class="hide">{%/if%}
        <div class="fr zbj-header-entry">
            <div id="j-head-pubentry" data-process="1" class="zbj-dropdown zbj-header-task-entry">
                <a data-linkid="taskentry"  rel="nofollow" target="_blank" href="{%$taskUrl%}" class="zbj-dropdown-hd zbj-header-task-entry-link">发布需求<b></b></a>
                <div class="fr zbj-dropdown-menu zbj-header-task-panel">
                    <div class="task-panel-hd yahei">发布你的需求，坐等服务商上门</div>
                    <div class="task-panel-bd">
                        <ul class="unstyled list-unstyled task-reason">
                            <li class="task-reason-response">
                                <div class="task-reason-title">需求发布后</div>
                                <div class="task-reason-desc">1小时内收到服务商响应</div>
                            </li>
                            <li class="task-reason-join">
                                <div class="task-reason-title">每个需求</div>
                                <div class="task-reason-desc">平均有10个服务商参与</div>
                            </li>
                            <li class="task-reason-result">
                                <div class="task-reason-title">95%以上的需求</div>
                                <div class="task-reason-desc">得到了圆满解决</div>
                            </li>
                            <li class="task-reason-free">
                                <div class="task-reason-title">所有需求</div>
                                <div class="task-reason-desc">不向雇主和服务商收取任何佣金</div>
                            </li>
                        </ul>
                        <a data-linkid="taskentry2" rel="nofollow" class="zbj-btn zbj-btn-inverse zbj-header-gotopub zbj-btn zbj-btn-primary" href="{%$taskUrl%}" target="_blank">立即发布需求</a>
                    </div>
                    <div class="task-panel-ft clearfix">
                        <div class="fl zbj-header-tasklist">
                            <div class="zbj-header-tasklist-scroll" id="j-zbj-header-tasklist">
                            </div>
                        </div>
                        <a data-linkid="hall" class="fr zbj-header-gototaskhall" target="_blank" href="{%$taskbase%}/">&nbsp;</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="fr zbj-header-bd-delimiter">或者</div>
        <div class="fr zbj-header-search" id="header-search">
            {%$search_type=$search_type|default:'service'%}
            {%$search_label=['witkey' => '找服务商', 'task' => '找需求', 'service' => '找服务']%}
            {%$search_actionmap=['witkey' => '/p/', 'task' => '/t/', 'service' => '/s/']%}
            <form data-process="1" id="j-header-searchform" action="{%$siteurl.search%}{%$search_actionmap[$search_type]%}" class="zbj-form-search">
                <div class="input-append" style="position: relative;">
                    {%if empty($search_hideoption)%}
                        <div class="zbj-dropdown" id="j-header-searchwrap">
                            <div class="zbj-dropdown-hd"><span id="j-header-searchlabel">{%$search_label[$search_type]%}</span><i class="iconfont icon-font">&#xe807;</i></div>
                            <ul class="unstyled zbj-dropdown-menu">
                                <li {%if $search_type == 'witkey'%} class="hide" {%/if%}data-type="witkey"><a href="javascript:;" data-linkid="search-type-switch-witkey">找服务商</a></li>
                                <li {%if $search_type == 'task'%} class="hide" {%/if%}data-type="task"><a href="javascript:;" data-linkid="search-type-switch-task">找需求</a></li>
                                <li {%if $search_type == 'service'%} class="hide" {%/if%}data-type="service"><a href="javascript:;" data-linkid="search-type-switch-service">找服务</a></li>
                            </ul>
                        </div>
                    {%/if%}
                    <input data-default="{%$searchbox[$search_type].def_keyword%}" data-type="{%$search_type|default:'witkey'%}" name="kw" value="{%$kw%}" id="j-header-kw" type="text"  class="search-query" autocomplete="off" disableautocomplete autocorrect="off" onwebkitspeechchange="this.form.submit();" lang="zh-CN" x-webkit-grammar="builtin:search" x-webkit-speech="true"/>
                    <button type="submit" id="j-header-search-btn" class="zbj-btn zbj-btn-inverse yahei">搜索</button>
                    <div id="j-placeholder-tip" style="{%if $search_type != 'witkey' || $kw%}display: none;{%/if%}" class="placeholder-tip">
                        {%$searchbox[$search_type].placeholder%}
                    </div>
                </div>
            </form>
            {%if empty($search_hidehotwords)%}
                <div class="zbj-header-search-hotwords">
                    热门搜索： {%foreach $hotWords as $word%}
                        <a  data-linkid="hotwords-{%$word@index%}" {%if $word.is_hot%}class="hot"{%/if%} target="_blank"
                            href="{%if $word.url%}{%$word.url%}{%else%}{%$siteurl.search|cat:"/p/?kw=$word.keywords"%}{%/if%}">
                            {%$word.keywords%}
                        </a>
                    {%/foreach%}
                </div>
            {%/if%}
        </div>
        <div class="qr-code-wrap">
            <a href="javascript:;" id="close-qr-code" class="close-qr-code"></a>
        </div>
        {%if $hidesearch neq null%}</div>{%/if%}
    {%/strip%}
</div>
</div>