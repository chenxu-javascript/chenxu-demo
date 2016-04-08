
<style type="text/css">
    .icons-list div{
        float: left;
        width: 25%;
        font-size: 18px;
        line-height: 3;
    }
    .icons-list span{
        display: inline-block;
        text-align: center;
        width: 50px;
    }
    .icons-list span i{
        font-size: 32px;
        vertical-align: middle;
    }
    .icons-list span i:hover{
        color: #ff9400;
    }
</style>

<h3>图标列表</h3>
<div class="clearfix icons-list">
    {%*从guideline.php遍历*%}
    {%foreach $icon.icons as $item%}
        <div><span><i class="icon-{%$item.properties.name%}"></i></span> icon-{%$item.properties.name%}</div>
    {%/foreach%}
</div>

<h3>使用方法</h3>
<p>通过单独节点添加对应样式名形式</p>
<div class="example">
<i class="icon-loading"><!-- loading图标 --></i> 加载中
</div>

<h3>图标的管理</h3>
<p>图标的维护依赖于第三方工具IcoMoon <a class="blue" href="https://icomoon.io/app/" target="_blank">https://icomoon.io/app/</a>,更多介绍参考官方文档</p>
<p>请勿随意编辑icon，保障可维护性和可用性；如需更改，征求所有前端同意和知晓</p>

<h4>第一步：上传已有列表配置文件</h4>
<p>在IcoMoon管理页面，通过“Import Icons”导入iconfont组件库里面的<strong>selection.json</strong>，导入已有图标列表和项目信息 <code>非常重要</code></p>

<h4>第二步：导入新的图标</h4>
<p>导入完整库的json文件，为了保持图标风格一致，推荐导入组件根目录的icomoon-all.json，选取新增的图标 <code>推荐</code></p>
<p>也可以通过导入按钮，添加我们需要新增的图标（SVG格式，制作工具为AI或其他）</p>

<h4>第三步：生成新的图标库</h4>
<p>选择“GenerateFont”，给图标添加样式名，生成新的font和配置文件，并下载</p>
<p>样式名的规则：底色版添加后缀<code>-bg</code>，线条版加后缀<code>-bd</code></p>

<h4>第四步：覆盖组件库文件</h4>
<p>包里的 <code>style.css</code> <code>selection.json</code> <code>fonts文件夹</code> 全量覆盖组件文件</p>
