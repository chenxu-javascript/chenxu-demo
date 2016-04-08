{%extends file="common/page/base.tpl"%}

{%block name="layout_before" append%}
    {%$project["name"]="common"%}
{%/block%}

{%block name="base" append%}
    <!DOCTYPE html>
    {%html%}
        {%head autoConcat=$autoConcat%}
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
            <meta name="renderer" content="webkit" />
            <meta http-equiv="Cache-Control" content="no-transform " />
            <title>{%$title%}</title>
            <meta name="keywords" content="{%$keywords%}">
            <meta name="description" content="{%$description%}">
            {%block name="block_head_meta"%}{%/block%}
            {%block name="block_head_favicon"%}
                <link rel="shortcut icon" href="http://s.zbjimg.com/img/favicon.ico" type="image/x-icon"/>
            {%/block%}
            {%block name="block_head_static"%}
                {%require name="common:static/global/global.less"%}
            {%/block%}
        {%/head%}

        {%body class=$bodyClass%}
            {%block name="header"%}
                <div class="zbj-header ibj-header">
                    {%if !$headerConfig['hideTop']%}
                        {%block name="header_top"%}
                            {%widget name="common:widget/header/header-top.tpl" config=$headerConfig%}
                        {%/block%}
                    {%/if%}
                    {%if !$headerConfig['hideBd']%}
                        {%block name="header_bd"%}
                            {%widget name="common:widget/header/header-bd.tpl" config=$headerConfig%}
                        {%/block%}
                    {%/if%}
                </div>
            {%/block%}
            {%block name="content"%}{%/block%}
            {%block name="footer"%}
                {%widget name="common:widget/footer/footer.tpl"%}
            {%/block%}

            {%block name="global_js"%}
                {%widget name="common:widget/global/global.tpl" siteConfig=$site_config%}
            {%/block%}
            {%block name="globalJsVariables"%}{%/block%}
        {%/body%}

        {%* 需要手动放到页尾的脚本，比如统计脚本 *%}
        {%block name="extra_js"%}
            {%widget name="common:widget/global/js_base.tpl" siteConfig=$site_config%}
        {%/block%}

        {%*_d=1 调试模式*%}
        {%if $smarty.get._d eq 1 && ($site_config['dev'] || $smarty.cookies.debugflag=='57fa30bed011a50f')%}
            {%widget name="common:widget/debug/debug.tpl"%}
        {%/if%}
    {%/html%}
{%/block%}