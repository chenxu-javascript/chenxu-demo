
<h3>初始状态</h3>

<div class="example">
<ul class="zbj-step">
    <li><em>1</em>发布需求<!--[if IE 8]><span class="after"></span><![endif]--></li>
    <li><em>2</em>众多服务商参与<!--[if IE 8]><span class="after"></span><![endif]--></li>
    <li><em>3</em>选择满意方案<!--[if IE 8]><span class="after"></span><![endif]--></li>
    <li><em>4</em>验收后付款</li>
</ul>
</div>

<h4>单一选中状态</h4>
<p>添加样式名<code>active</code></p>

<div class="example">
<ul class="zbj-step">
    <li><em>1</em>发布需求<!--[if IE 8]><span class="after"></span><![endif]--></li>
    <li class="active"><em>2</em>众多服务商参与<!--[if IE 8]><span class="after"></span><![endif]--></li>
    <li><em>3</em>选择满意方案<!--[if IE 8]><span class="after"></span><![endif]--></li>
    <li><em>4</em>验收后付款</li>
</ul>
</div>

<h4>完成态+选中状态</h4>
<p>已完成状态，添加样式名<code>done</code></p>

<div class="example">
<ul class="zbj-step">
    <li class="done"><em>1</em>发布需求<!--[if IE 8]><span class="after"></span><![endif]--></li>
    <li class="done"><em>2</em>众多服务商参与<!--[if IE 8]><span class="after"></span><![endif]--></li>
    <li class="active"><em>3</em>选择满意方案<!--[if IE 8]><span class="after"></span><![endif]--></li>
    <li><em>4</em>验收后付款</li>
</ul>
</div>

<h4>large版</h4>
<p>添加样式名 <code>zbj-step-lg</code></p>
<div class="example">
<ul class="zbj-step zbj-step-lg">
    <li class="done"><em>1</em>发布需求<!--[if IE 8]><span class="after"></span><![endif]--></li>
    <li class="done"><em>2</em>众多服务商参与<!--[if IE 8]><span class="after"></span><![endif]--></li>
    <li class="active"><em>3</em>选择满意方案<!--[if IE 8]><span class="after"></span><![endif]--></li>
    <li><em>4</em>验收后付款</li>
</ul>
</div>


<h3>说明</h3>
<p><code>:after</code>不支持滤镜，针对ie8浏览器用节点代替</p>
<div class="code">
<!--[if IE 8]><span class="after"></span><![endif]-->
</div>

<p>ie6、7层级不合理，做优雅降级，去掉箭头，也不支持 <code>display：table</code>布局，需要自行设置每个步骤宽度</p>
<pre class="code code-css">
.zbj-step li{*width: 总宽度/步骤数} //默认4步操作，设置为25%
</pre>

