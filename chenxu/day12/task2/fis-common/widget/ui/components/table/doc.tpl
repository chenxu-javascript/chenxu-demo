
<h3>基础表格</h3>
<p>无任何边框，单元格内间距<code>8px</code>，行高<code>20px</code></p>

<div class="example">
<table class="zbj-table">
    <tbody><tr>
        <td>1</td>
        <td>名字</td>
        <td>电话：13000111222<br>地址：浙江省杭州市西湖区晚唐路567号</td>
        <td>操作</td>
    </tr>
    <tr>
        <td>2</td>
        <td>名字</td>
        <td>电话：13000111222<br>地址：浙江省杭州市西湖区晚唐路567号</td>
        <td>操作</td>
    </tr>
    </tbody>
</table>
</div>
<h3>默认表格</h3>
<p>底边+外边框，添加样式名<code>zbj-table-default</code></p>
<div class="example">
<table class="zbj-table zbj-table-default">
    <thead>
    <tr>
        <th>#</th>
        <th>Table heading</th>
        <th>Table heading</th>
        <th>Table heading</th>
        <th>Table heading</th>
        <th>Table heading</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>1</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
    </tr>
    </tbody>
</table>
</div>
<h3>可嵌套表格</h3>
<p>无外框，可以嵌套到其他容器里，添加样式名<code>zbj-table-inbox</code></p>
<div class="example">
<table class="zbj-table zbj-table-inbox">
    <thead>
    <tr>
        <th>#</th>
        <th>Table heading</th>
        <th>Table heading</th>
        <th>Table heading</th>
        <th>Table heading</th>
        <th>Table heading</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>1</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
    </tr>
    </tbody>
</table>
</div>
<h3>全边框表格</h3>
<p>带全部边线，添加样式<code>zbj-table-bordered</code></p>
<div class="example">
<table class="zbj-table zbj-table-bordered">
    <thead>
    <tr>
        <th>#</th>
        <th>Table heading</th>
        <th>Table heading</th>
        <th>Table heading</th>
        <th>Table heading</th>
        <th>Table heading</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>1</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
    </tr>
    </tbody>
</table>
</div>
<h3>表格样式个性化</h3>
<p>以下样式可以和上面的边框类型叠加使用</p>
<h4>紧凑型表格</h4>
<p>压缩表格内间距为<code>5px</code>，样式<code>zbj-table-condensed</code></p>
<div class="example">
<table class="zbj-table zbj-table-bordered zbj-table-condensed">
    <thead>
    <tr>
        <th>#</th>
        <th>Table heading</th>
        <th>Table heading</th>
        <th>Table heading</th>
        <th>Table heading</th>
        <th>Table heading</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>1</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
    </tr>
    </tbody>
</table>
</div>
<h4>表格隔行变色</h4>
<p>样式<code>zbj-table-striped</code></p>
<p>针对ie8，用js在<code>tbody</code> 偶数行添加样式<code>item-even</code></p>
<div class="example">
<table class="zbj-table zbj-table-default zbj-table-striped">
    <thead>
    <tr>
        <th>#</th>
        <th>Table heading</th>
        <th>Table heading</th>
        <th>Table heading</th>
        <th>Table heading</th>
        <th>Table heading</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>1</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
    </tr>
    <tr class="item-even">
        <td>2</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
    </tr>
    </tbody>
</table>
</div>

<h4>表格鼠标滑过变色</h4>
<p>样式<code>zbj-table-hover</code></p>
<div class="example">
<table class="zbj-table zbj-table-default zbj-table-striped zbj-table-hover">
    <tbody><tr>
        <td>1</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
    </tr>
    </tbody>
</table>
</div>
