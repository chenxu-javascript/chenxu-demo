{%extends file="common/page/layout.tpl"%}

{%block name="layout_before" append%}
{%* 当前的项目名, 和 fis-conf.js里配置保持一致 *%}
{%$project["name"]="demo"%}
{%$headerConfig['hideBd'] = true%}
{%/block%}

{%block name="block_head_meta"%}
<meta name="baidu-site-verification" content="k1JyNmya6P">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="renderer" content="webkit">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0">
{%/block%}

{%block name="block_head_static"%}{%/block%}
{%block name="header"%}{%/block%}

{%block name="content"%}{%/block%}

{%block name="footer"%}{%/block%}
{%block name="extra_js"%}{%/block%}