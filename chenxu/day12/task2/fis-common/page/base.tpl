{%block name="layout_before"%}
    {%$bodyClass=""%}
    {%$pageCur=""%}
    {%$headerConfig=[]%}

    {%$debugSuffix='-debug'%}

    {%$site_config['siteUrlList']=$siteurl%}
    {%$site_config['debugSuffix'] = $debugSuffix%}
    {%$site_config['dev'] = $site_config['dev']|default: true%}
    {%$site_config['siteBaseUrl'] = $site_config['www_url']|regex_replace:"/(.*)www\./":""%}

    {%$autoConcat=$site_config['autoConcat']|default: false%}

    {%$isMobileENV= false%}
{%/block%}
{%block name="base"%}
    {%registerZBJVariable siteConfig=$site_config%}
{%/block%}