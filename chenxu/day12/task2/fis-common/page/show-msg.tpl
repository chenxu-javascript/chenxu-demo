{%extends file="common/page/layout.tpl"%}

{%block name="header"%}{%/block%}
{%block name="footer"%}{%/block%}

{%block name="layout_before" append%}
    {%$title=$title|default:'系统提示'%}
{%/block%}

{%block name="block_head_meta" append%}
    {%if $second && $url%}
        <meta http-equiv="refresh" content="{%$second%};URL={%$url%}"/>
    {%/if%}
{%/block%}

{%block name="content"%}
    {%if $isMobileENV %}
        {%widget name="common:widget/show-msg/show-msg-mobile.tpl"%}
    {%else%}
        {%widget name="common:widget/show-msg/show-msg.tpl"%}
    {%/if%}
{%/block%}

