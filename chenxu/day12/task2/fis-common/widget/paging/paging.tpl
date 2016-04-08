{%**
    分页 widget
    调用： {%widget
            name="common:widget/paging/paging.tpl"
            currentPage=10
            totalPage=21
            pageUrl=''
            className=''
            pageType=''
          %}

*%}
{%*限制最大分页，避免暴露数据*%}
{%if empty($max_totalPage)%}
    {%$max_totalPage = 100%}
{%/if%}
{%$totalPage = ($totalPage > $max_totalPage) ? $max_totalPage : $totalPage%}

{%function name="getPageLink" page="" tag=""%}
    {%if empty($tag)%}
        {%$tag = $page%}
    {%/if%}
    {%$pageNavgationlUrl={%$pageUrl|regex_replace:'/#page#/':$page%}%}
    <li {%if $currentPage eq $page%}class="active"{%/if%}><a href="{%strip%}{%$pageNavgationlUrl%}{%/strip%}">{%$tag%}</a></li>
{%/function%}

{%*前一页，后一页*%}
{%$page_prev = $currentPage - 1%}
{%$page_next = $currentPage + 1%}

<div class="zbj-paging{%if $className%} {%$className%}{%/if%}">
{%if $pageType eq "mini"%}
    {%if $totalPage > 0%}
        <div class="zbj-paging-mini">
            {%$currentPage%}/{%$totalPage%}
            <div class="item-page-wrap">
                {%if $currentPage > 1%}
                    <a href="{%$pageUrl|regex_replace:'/#page#/':$page_prev%}" title="上一页">&lt;</a>
                {%else%}
                    <span title="已经第一页">&lt;</span>
                {%/if%}
                {%if $currentPage < $totalPage%}
                    <a href="{%$pageUrl|regex_replace:'/#page#/':$page_next%}" title="下一页">&gt;</a>
                {%else%}
                    <span title="已经最后页">&gt;</span>
                {%/if%}
            </div>
        </div>
    {%/if%}
{%else%}
    <ul>
    {%*页面上显示的页数，包含"..."*%}
    {%if empty($visible_num)%}
        {%$visible_num = 11%}
    {%/if%}

    {%*除去上页下页、首页尾页、前后的省略号6个格子后还能显示的格子数*%}
    {%$main_num = $visible_num - 6%}


    {%*页数过大时减少页面上显示的总页数*%}
    {%if $currentPage > 1000%}
    {%$main_num = $main_num - 4%}
    {%elseif $currentPage > 100%}
    {%$main_num = $main_num - 3%}
    {%elseif $currentPage > 10%}
    {%$main_num = $main_num - 1%}
    {%/if%}

    {%*当前页面左边的页面数*%}
    {%$left_nums = ($main_num / 2)|string_format:"%d"%}


    {%*当前页面右边的页面数*%}
    {%$right_nums = $main_num - 1 - $left_nums%}

    {%*循环开始的页面，1、2页特殊处理，循环至少从3开始*%}
    {%$loop_start = $currentPage - $left_nums%}
    {%$loop_end = $currentPage + $right_nums%}

    {%if $loop_start < 3%}
    {%$loop_end = $loop_end + (3 - $loop_start)%}
    {%$loop_start = 3%}
    {%/if%}
    {%*循环结束的页面,倒数1、2页特殊处理，循环至多从total-2结束*%}

    {%if $loop_end > $totalPage - 2%}
    {%if $loop_start - ($loop_end - ($totalPage - 2)) >= 3%}
    {%$loop_start = $loop_start - ($loop_end - ($totalPage - 2))%}
    {%/if%}
    {%$loop_end = $totalPage - 2%}
    {%/if%}


    {%if $currentPage > 1%}
    {%getPageLink page=$page_prev tag="«" rel="prev"%}
    {%/if%}
    {%*第1页*%}
    {%if $totalPage >= 1%}
    {%getPageLink page="1"%}
    {%/if%}


    {%*从第3页开始循环时，直接显示第二页，否则显示...*%}
    {%if $totalPage >= 2%}
    {%if $loop_start eq 3%}
    {%getPageLink page="2"%}
    {%else%}
    <li class="disabled"><a>...</a></li>
    {%/if%}
    {%/if%}

    {%for $i = $loop_start to $loop_end%}
    {%getPageLink page=$i%}
    {%/for%}

    {%if $totalPage >= 4%}
    {%*循环刚好在倒数第三页结束，直接显示倒数第二页，否则显示...*%}
    {%if $loop_end eq $totalPage - 2%}
    {%getPageLink page=$totalPage - 1%}
    {%else%}
    <li class="disabled"><a>...</a></li>
    {%/if%}
    {%/if%}

    {%if $totalPage >= 3%}
    {%*尾页*%}
    {%getPageLink page=$totalPage%}
    {%/if%}


    {%if $currentPage < $totalPage%}
    {%getPageLink page=$page_next tag="»" rel="next"%}
    {%/if%}

    </ul>
    <div class="zbj-paging-form">
        <form action="{%$pageUrl%}" method="post">
            共 {%$totalPage%} 页，到第 <input type="text" class="zbj-input" value="{%$currentPage%}"/> 页
            <input type="submit" class="zbj-btn" value="确定"/>
        </form>
    </div>
{%/if%}
</div>


