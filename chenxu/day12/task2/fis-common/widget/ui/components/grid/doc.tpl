<p>基础的布局，以1200宽屏设计为主，同时考虑兼容1024以下分辨率响应式</p>

<h3>通用一栏布局</h3>
<style>

    .grid-inner{
        background: #5DBB73;
        box-shadow: 0 1px 0 #4FAA65 inset, 0 -1px 0 #4FAA65 inset, 1px 0 0 #4FAA65 inset, -1px 0 0 #4FAA65 inset;
        transition-duration: 0.3s;
        text-align: center;
        padding: 5px 0;
    }
    .grid-inner:hover{
        background: #72DD8D;
    }

</style>


<div class="example">
    <div class="zbj-grid">
        <p class="grid-inner">通栏布局 1190px，低于1210分辨率时990px</p>
    </div>
</div>

<h3>通用两栏布局</h3>

<p>左宽右窄</p>
<div class="example">
    <div class="zbj-grid">
        <div class="main-wrap">
            <div class="main">
                <p class="grid-inner">主栏930px，低于1210分辨率时730px</p>
            </div>
        </div>
        <div class="sidebar">
            <p class="grid-inner">侧栏 240px</p>
        </div>
    </div>
</div>

<p>左窄右宽，样式名 <code>zbj-grid-inverse</code></p>
<div class="example">
    <div class="zbj-grid zbj-grid-inverse">
        <div class="main-wrap">
            <div class="main">
                <p class="grid-inner">主栏930px，低于1210分辨率时730px</p>
            </div>
        </div>
        <div class="sidebar">
            <p class="grid-inner">侧栏 240px</p>
        </div>
    </div>
</div>

<h3>自适应处理</h3>

<p>当窗口分辨率宽低于1210时,建议重点页面增加响应式体验，总宽为990px</p>
<p>用户浏览器支持媒体查询，单独添加响应式代码</p>
<p>不支持媒体查询浏览器，TODO：响应式插件介绍，需要添加样式名<code>zbj-grid-990</code></p>
<div class="example">
<style type="text/css">
    @media (max-width:1210px) {
        .zbj-grid{
            width:990px;
        }
        .zbj-grid-inverse .sidebar{
            margin-left:-990px;
        }
    }
</style>
</div>

