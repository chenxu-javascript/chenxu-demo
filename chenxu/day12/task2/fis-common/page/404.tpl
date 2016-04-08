{%extends file="common/page/layout.tpl"%}
{%block name="layout_before" append%}
    {%$load_webim=true%}
    {%$title=$title|default:'找不到页面了'%}
{%/block%}

{%block name="content"%}
    {%if $isMobileENV %}
        {%widget name="common:widget/404/404-mobile.tpl"%}
    {%else%}
        {%widget name="common:widget/404/404.tpl"%}
    {%/if%}
{%/block%}

{%block name="extra_js" append%}
    {%widget name="common:widget/global/js_base.tpl" siteConfig=$site_config%}
{%/block%}


