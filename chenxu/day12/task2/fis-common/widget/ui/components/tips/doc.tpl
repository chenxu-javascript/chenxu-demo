
<h3>单行提示文本</h3>
<p>图标必须，关闭按钮可选</p>

<p>默认警告，品牌颜色，图标<code>!</code>圆点在下</p>

<div class="example">
<div class="zbj-tips">
    <i class="zbj-tips-icon icon-warn-bg" title="警告"></i>
    <div class="zbj-tips-bd">单行提示内容</div>
    <i class="zbj-tips-close">&times;</i>
</div>
</div>

<p>提示：<code>zbj-tips-info</code>，提示颜色，图标<code>i</code>圆点在上</p>
<div class="example">
<div class="zbj-tips zbj-tips-info">
    <i class="zbj-tips-icon icon-info-bg" title="提示"></i>
    <div class="zbj-tips-bd">单行提示内容</div>
    <i class="zbj-tips-close">&times;</i>
</div>
</div>

<p>报错：<code>zbj-tips-danger</code>，警告颜色，慎用，图标<code>X</code></p>
<div class="example">
<div class="zbj-tips zbj-tips-danger">
    <i class="zbj-tips-icon icon-error-bg" title="错误"></i>
    <div class="zbj-tips-bd">单行提示内容</div>
    <i class="zbj-tips-close">&times;</i>
</div>
</div>
<p>成功：<code>zbj-tips-success</code>，绿色，图标<code>√</code></p>
<div class="example">
<div class="zbj-tips zbj-tips-success">
    <i class="zbj-tips-icon icon-ok-bg" title="成功"></i>
    <div class="zbj-tips-bd">单行提示内容</div>
    <i class="zbj-tips-close">&times;</i>
</div>
</div>

<h3>多行提示块</h3>
<p>叠加样式<code>zbj-tips-lg</code>，图标必须，无关闭按钮，颜色和图标同单行提示文本</p>
<div class="example">
<div class="zbj-tips zbj-tips-lg">
    <i class="zbj-tips-icon icon-warn-bg" title="警告"></i>
    <div class="zbj-tips-bd">
        <h4 class="zbj-tips-tit">提示标题</h4>
        <div>提示内容<br /><a href="#">我是链接</a> | <a href="#">也是链接</a></div>
    </div>
</div>
</div>

<p>多行列表</p>

<div class="example">
<div class="zbj-tips zbj-tips-info zbj-tips-lg">
    <i class="zbj-tips-icon icon-info-bg" title="信息"></i>
    <div class="zbj-tips-bd">
        <h4 class="zbj-tips-tit">提示标题</h4>
        <ul class="zbj-tips-list">
            <li>第一条内容</li>
            <li>第二条内容</li>
            <li>第三条内容</li>
        </ul>
    </div>
</div>
<div class="zbj-tips zbj-tips-success zbj-tips-lg">
    <i class="zbj-tips-icon icon-ok-bg" title="成功"></i>
    <div class="zbj-tips-bd">
        <h4 class="zbj-tips-tit">提示标题</h4>
        <ol class="zbj-tips-list">
            <li>第一条内容</li>
            <li>第二条内容</li>
            <li>第三条内容</li>
        </ol>
    </div>
</div>
</div>

<h3>提示浮层</h3>
<style>
    .zbj-poptip{
        display:block;
        position:relative;
    }
</style>
<p><code>zbj-poptip-top</code>，<code>zbj-poptip-left</code>，<code>zbj-poptip-right</code>，<code>zbj-poptip-bottom</code>，代表出现4个位置，关闭按钮可选</p>
<p>zbj-poptip-arrow 添加样式名<code>top bottom left right</code>可控制箭头位置，默认居中</p>
<div class="example">
<div class="zbj-poptip zbj-poptip-top">
    <div class="zbj-poptip-arrow"><i></i></div>
    <div class="zbj-poptip-bd">
        提示文字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字
    </div>
    <i class="zbj-tips-close">&times;</i>
</div>
</div>

<div class="example">
<div class="zbj-poptip zbj-poptip-right">
    <div class="zbj-poptip-arrow"><i></i></div>
    <div class="zbj-poptip-bd">
        提示文字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字
    </div>
    <i class="zbj-tips-close">&times;</i>
</div>
</div>

<div class="example">
<div class="zbj-poptip zbj-poptip-left">
    <div class="zbj-poptip-arrow top"><i></i></div>
    <div class="zbj-poptip-bd">
        提示文字字字字字字字字字字字字字字字字字字字字字字 <br/>
        提示文字字字字字字字字字字字字字字字字字字字字字字 <br/>
        提示文字字字字字字字字字字字字字字字字字字字字字字 <br/>
        字字字字字字字字字字字字字字字字字字字字字字字字字
    </div>
    <i class="zbj-tips-close">&times;</i>
</div>
</div>

<div class="example">
<div class="zbj-poptip zbj-poptip-bottom">
    <div class="zbj-poptip-arrow left"><i></i></div>
    <div class="zbj-poptip-bd">
        提示文字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字
    </div>
    <i class="zbj-tips-close">&times;</i>
</div>
<div class="zbj-poptip zbj-poptip-bottom">
    <div class="zbj-poptip-arrow right"><i></i></div>
    <div class="zbj-poptip-bd">
        提示文字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字
    </div>
    <i class="zbj-tips-close">&times;</i>
</div>
</div>

<p>紧凑版<code>zbj-poptip-sm</code>,压缩浮层间距，一般单行使用</p>
<div class="example">
<div class="zbj-poptip zbj-poptip-top zbj-poptip-sm">
    <div class="zbj-poptip-arrow"><i></i></div>
    <div class="zbj-poptip-bd">
        提示文字字字字
    </div>
    <i class="zbj-tips-close">&times;</i>
</div>
<div class="zbj-poptip zbj-poptip-bottom zbj-poptip-sm">
    <div class="zbj-poptip-arrow"><i></i></div>
    <div class="zbj-poptip-bd">
        提示文字字字字
    </div>
    <i class="zbj-tips-close">&times;</i>
</div>
</div>