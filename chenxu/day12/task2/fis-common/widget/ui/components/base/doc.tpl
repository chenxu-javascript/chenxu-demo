
<p>包含normalize、reset、文字排版，全局设置，常见功能样式。</p>

<h3>normalize</h3>
<p>引入normalize.css v3.0.1 <a class="blue" target="_blank" href="http://git.io/normalize">http://git.io/normalize</a></p>
<ul>
    <li>保留有用的默认值</li>
    <li>让浏览器渲染表现得统一</li>
    <li>是新一代CSS库普遍采用的形式</li>
</ul>

<h3>文字排版</h3>
<p>引自bootstrap，包含H(n)系列的间距和字体大小，列表样式，段落样式等</p>
<div class="example">
<h1>h1. 一级标题</h1>
<h2>h2. 二级标题</h2>
<h3>h3. 三级标题</h3>
<h4>h4. 四级标题</h4>
<h5>h5. 五级标题</h5>
<h6>h6. 六级标题</h6>

<ul>
    <li>无序列表</li>
    <li>无需列表包含有序列表
        <ol>
            <li>有序列表</li>
            <li>有序列表</li>
        </ol>
    </li>
    <li>无需列表</li>
</ul>

<ul class="list-inline">
    <li>行内列表1</li>
    <li>行内列表2</li>
    <li>行内列表3</li>
    <li>行内列表4</li>
    <li>行内列表5</li>
</ul>

<ul class="list-unstyled">
    <li>无样式列表</li>
    <li>无样式列表</li>
    <li>无样式列表</li>
</ul>
</div>

<h3>传统Reset</h3>
<p>在body加上样式名<code>reset</code>，会重置默认排版样式，间距都归零</p>
<div class="code code-css">
.reset{
    p,ul,ol,li,dl,dt,dd,h1,h3,h3,h4,h5,h6,form,fieldset,legend,input,select,textarea,button,blockquote,address,pre{margin:0;padding:0;}
    h1,h3,h3,h4,h5,h6,input,textarea,select,label{font-size:100%;}
    ul,ol{list-style:none;}
    textarea{resize:none;}
}
</div>

<h3>全局设置</h3>
<p>只做英文字体reset，中文使用系统默认字体（windows为宋体，mac为华为细黑）</p>
<p>默认字体大小12像素，行高1.5（约为18px）</p>
<pre class="code code-css">
body {
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: @font-size-small; //12px
    line-height: 1.5;
    color: #333333;
    background-color: #fff;
}
a {
    color: #555555;
    text-decoration: none;
}
a:hover,
a:focus {
    color: #ff9400;
    text-decoration: underline;
}
</pre>

<h3>功能样式</h3>
<h4>常见字体和颜色</h4>
<div class="example">
<p><a href="#">默认链接</a></p>
<p class="primary">我是品牌色字体 <a href="#" class="primary">品牌色链接</a></p>
<p class="highlight">我是高亮字体 <a href="#" class="highlight">高亮链接</a></p>
<p class="gray">我是灰色字体 <a href="#" class="gray">灰色链接</a></p>
<p class="blue">我是蓝色字 <a href="#" class="blue">蓝色链接</a></p>
<p class="yahei">我是雅黑</p>
<p class="simsun">我是宋体&gt;&gt;</p>
</div>

<h4>分隔符</h4>
<p><code>split</code>:"|"分隔符带左右5px默认间距
<pre class="code code-css">
.split{
    display:inline-block;
    padding:0 5px;
}
</pre>

<h4>浮动</h4>
<p><code>fl</code>：左浮动，<code>fr</code>：右浮动</p>
<pre class="code code-css">
.fr {float: right;}
.fl {float: left;display: inline;}
</pre>
<p><code>clearfix</code>:清除浮动</p>
<pre class="code code-css">
.clearfix {
    *zoom: 1;
}
.clearfix:before,
.clearfix:after {
    content: " ";
    display: table;
}
.clearfix:after {
    clear: both;
}
</pre>

<h4>隐藏开关</h4>
<p><code>hide-txt</code>设置文字隐藏，不占页面空间，不影响非正常用户阅读体验（SEO搜索spider，屏幕阅读器）</p>
<p>常用于banner，图片标题，包含重要文字的场景</p>
<pre class="code code-css">
.hide-txt {
    visibility:hidden;
    display:inline-block;
    width:0;
    height:0;
    overflow:hidden;
}
</pre>


<p><code>invisible</code>设置元素不可见，占页面空间，不影响SEO，屏幕阅读器</p>
<pre class="code code-css">
.invisible {
    visibility: hidden;
}
</pre>

<p><code>hide</code> 通常给js用</p>
<pre class="code code-css">
.hide {
    display: none;
}
</pre>


<h4>文字溢出</h4>
<p><code>text-overflow</code>:用于块级元素或内联块级，需设定宽度</p>
<div class="example">
    <div class="text-overflow" style="width: 100px;">文字超长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长</div>
    <span class="text-overflow" style="display:inline-block;width:80px;">内联元素文字超长长长长长长长长长长长长长长长长长长长长</span>
</div>


<h4>文字对齐</h4>
<p><code>text-left</code>,<code>text-right</code>,<code>text-center</code>,<code>text-justify</code>四种对齐方式
<pre class="code code-css">
.text-left { text-align: left; }
.text-right { text-align: right; }
.text-center { text-align: center; }
.text-justify { text-align: justify; }
</pre>
