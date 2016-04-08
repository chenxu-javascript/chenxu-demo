<h3>后端数据</h3>
<div class="code">
    'paging': {
        'totalPage': 100,
        'perPage': 10,
        'currentPage': 2
    )

</div>
<h3>模板使用</h3>
<p>currentPage：[必须]当前页变量 </p>
<p>totalPage：[必须]总页数</p>
<p>pageUrl：[必须]分页链接格式，前缀+"#page#"，如 "/list?page=#page#"，最后生成"/list?page=x"</p>
<p>className：[可选]分页组件扩展类，如 <code>zbj-paging-large zbj-paging-left</code></p>
<style type="text/css">
    .zbj-paging{
        margin-bottom: 10px;
    }
</style>
<div class="code">
{%literal%}
{%widget
    name="common:widget/paging/paging.tpl"
    currentPage=8
    totalPage=15
    pageUrl='/page/#page#'
%}{%/literal%}
</div>
{%widget
    name="common:widget/paging/paging.tpl"
    currentPage=7
    totalPage=1500
    pageUrl='/page/#page#'
%}

<h4>mini左右翻页</h4>
<p>调用时候 <code>page_type=mini</code></p>
<div class="code">
{%literal%}
{%widget
    name="common:widget/paging/paging.tpl"
    currentPage=10
    totalPage=15
    pageUrl='/list/page/#page#'
    pageType='mini'
%}{%/literal%}
</div>
<div style="text-align: right">
{%widget
    name="common:widget/paging/paging.tpl"
    currentPage=7
    totalPage=150
    pageUrl='/page/#page#'
    pageType='mini'
%}
</div>

<h4>pageBar尺寸和水平对齐方式</h4>
<p>默认右对齐和普通大小，设置 <code>class_name</code></p>
<p>small版本:<code>zbj-paging-small</code>,居中对齐:<code>zbj-paging-center</code>,居左对齐:<code>zbj-paging-left</code></p>
<div class="code">
{%literal%}
{%widget
    name="common:widget/paging/paging.tpl"
    currentPage=10
    totalPage=15
    pageUrl='/list/page/#page#'
    className='zbj-paging-small zbj-paging-left'
%}
{%widget
    name="common:widget/paging/paging.tpl"
    currentPage=10
    totalPage=15
    pageUrl='/list?page=#page#'
    className='zbj-paging-center'
%}
{%widget
    name="common:widget/paging/paging.tpl"
    currentPage=1
    totalPage=15
    pageUrl='/list?page=#page#'
    className='zbj-paging-left zbj-paging-small'
    pageType='mini'
%}{%/literal%}
</div>
{%widget
    name="common:widget/paging/paging.tpl"
    currentPage=11
    totalPage=15
    pageUrl='/list/page/#page#'
    className='zbj-paging-small zbj-paging-left'
%}
{%widget
    name="common:widget/paging/paging.tpl"
    currentPage=10
    totalPage=15
    pageUrl='/list?page=#page#'
    className='zbj-paging-center'
%}
{%widget
    name="common:widget/paging/paging.tpl"
    currentPage=1
    totalPage=15
    pageUrl='/list?page=#page#'
    className='zbj-paging-left zbj-paging-small'
    pageType='mini'
%}

<h4>隐藏跳转样式</h4>
<p>添加样式名 <code>zbj-paging-short</code>，可隐藏跳转区域</p>

<div class="code">
{%literal%}
{%widget
    name="common:widget/paging/paging.tpl"
    currentPage=10
    totalPage=15
    pageUrl='/list/page/#page#'
    className='zbj-paging-large zbj-paging-short'
%}{%/literal%}
</div>
{%widget
    name="common:widget/paging/paging.tpl"
    currentPage=10
    totalPage=15
    pageUrl='/list/page/#page#'
    className='zbj-paging-large zbj-paging-short'
%}