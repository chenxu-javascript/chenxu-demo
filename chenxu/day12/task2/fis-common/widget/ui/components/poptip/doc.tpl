<style>
    .component-meta {
        font-size: 14px;
        margin: 20px auto;
    }
    .component-name {
        background-color: rgb(209, 230, 231);
        display: inline-block;
        padding: 0 10px;
        border-radius: 5px;
        color: #527762;
        font-size: 16px;;
        font-family: monospace;
        font-weight: normal;
        margin-bottom: 20px;;
    }

    .api-list li {
        margin-bottom: 10px;;
    }
    .api-title {
        font-weight: bold;
        margin-bottom: 15px;;
    }
    .api-param-type {
        margin-left: 10px;
        display: inline-block;
        background-color: #efefef;
        color: green;
        border-radius: 5px;
        padding: 5px;
        border: 1px solid #eee;
    }
</style>
<div class="section">
    <div class="component-meta">
        <div class="component-id"><strong class="component-name">common:components/poptip/poptip</strong></div>
        <h4>实例化调用</h4>
        <div class="code javascript">

var Poptip = require('common:components/poptip/poptip');
// 实例化一个由 dom 节点交互显示的 poptip
new Poptip( opts )</div>
        <h4>构造器：opts 参数</h4>
        <table class="zbj-table zbj-table-default">
            <tr>
                <th>参数名</th>
                <th>参数类型</th>
                <th>参数说明</th>
                <th>默认值</th>
            </tr>
            <tr>
                <td>trigger</td>
                <td>selector</td>
                <td>触发点元素</td>
                <td>默认为 hover</td>
            </tr>
            <tr>
                <td>triggerType</td>
                <td>string</td>
                <td>触发方式</td>
                <td>hover | click | focus</td>
            </tr>
            <tr>
                <td>content</td>
                <td>string</td>
                <td>提示内容，支持字符和 html 结构</td>
                <td></td>
            </tr>
            <tr>
                <td>theme</td>
                <td>string</td>
                <td>tip的样式</td>
                <td>默认为 zbj-poptip-white，内置了 white | blue | red | yellow ，<br/>可以写多个样式，比如 zbj-poptip-white pay-tip</td>
            </tr>
            <tr>
                <td>arrowPosition</td>
                <td>number</td>
                <td>箭头方向</td>
                <td>按钟表点位置，支持1、2、5、7、10、11点位置</td>
            </tr>
        </table>
        <h4>实例方法</h4>
        <div class="code javascript">
1. 更新 tip 的内容：set('content', content)
2. 更新 tip 的位置 updatePosition
3. 切面方法：before('show', function(){}) 显示前的回调，比如动态设置 tip 的内容
4. 切面方法：after('show', function(){})</div>
        <h4>静态方法</h4>
        <div class="code javascript">
var Poptip = require('common:components/poptip/poptip');
// 将一个提示信息固定在一个特定的 dom 节点位置上, 返回值 poptip 类型
Poptip.tip( content, opts )</div>
        <h4>参数</h4>
        <table class="zbj-table zbj-table-default">
            <tr>
                <th>参数名</th>
                <th>参数类型</th>
                <th>参数说明</th>
                <th>默认值</th>
            </tr>
            <tr>
                <td>content</td>
                <td>string</td>
                <td>提示内容，支持字符和 html 结构</td>
                <td></td>
            </tr>
        </table>
    </div>
</div>

<style>
    .cell {
        overflow:hidden;
        margin-bottom:20px;
        margin-top: 20px;
        zoom:1;
    }
    .cell p {
        float:left;
        padding:10px;
        margin-right: 5px;
        background-color:#FFCB88;
        border-radius: 4px;
        cursor: pointer;
        overflow:hidden;
    }
    .cell p:hover {
        background-color:#FFB556;
    }
</style>

<div class="cell">
    <p id="test">10点钟位置</p>
</div>

<div class="code">
    <script>
        seajs.use('common:components/poptip/poptip', function ( Poptip ) {
            new Poptip({
                trigger: '#test',
                content: '<div style="padding:10px">我是内容 我是内容</div>',
                arrowPosition: 10
            });
        });
    </script>
</div>

<div class="cell">
    <p id="test2">11点钟位置</p>
</div>

<div class="code">
    <script>
        seajs.use('common:components/poptip/poptip', function ( Poptip ) {
            new Poptip({
                trigger: '#test2',
                content: '<div style="padding:10px">我是内容 我是内容</div>',
                theme: 'zbj-poptip-white',
                arrowPosition: 11
            })
        });
    </script>
</div>

<div class="cell">
    <p id="test3">1点钟位置</p>
</div>

<div class="code">
    <script>
        seajs.use('common:components/poptip/poptip', function ( Poptip ) {
            new Poptip({
                trigger: '#test3',
                content: '<div style="padding:10px">我是内容 我是内容</div>',
                arrowPosition: 1
            });
        });
    </script>
</div>

<div class="cell">
    <p id="test4">2点钟位置</p>
</div>

<div class="code">
    <script>
        seajs.use('common:components/poptip/poptip', function ( Poptip ) {
            new Poptip({
                trigger: '#test4',
                content: '<div style="padding:10px">我是内容 我是内容</div>',
                arrowPosition: 2
            });
        });
    </script>
</div>

<div class="cell">
    <p id="test5">5点钟位置</p>
</div>

<div class="code">
    <script>
        seajs.use('common:components/poptip/poptip', function ( Poptip ) {
            new Poptip({
                trigger: '#test5',
                content: '<div style="padding:10px">我是内容 我是内容</div>',
                arrowPosition: 5
            });
        });
    </script>
</div>

<div class="cell">
    <p id="test6">7点钟位置，更改内容</p>
</div>

<div class="code">
    <script>
        seajs.use('common:components/poptip/poptip', function ( Poptip ) {
            var t = new Poptip({
                trigger: '#test6',
                content: '<div style="padding:10px">我是内容 我是内容</div>',
                theme: 'zbj-poptip-blue',
                arrowPosition: 7
            });
            t.before('show', function(){
                this.set('content', '更改后的内容');
            });

        });
    </script>
</div>

<h3>动画效果</h3>

<div class="cell">
    <p id="test7-1">淡入淡出</p>
</div>

<div class="code">
    <script>
        seajs.use('common:components/poptip/poptip', function ( Poptip ) {
            new Poptip({
                trigger: '#test7-1',
                effect: 'fade'
            });
        });
    </script>
</div>

<div class="cell">
    <p id="test7-2">下拉动画</p>
</div>

<div class="code">
    <script>
        seajs.use('common:components/poptip/poptip', function ( Poptip ) {
            new Poptip({
                trigger: '#test7-2',
                effect: 'slide',
                arrowPosition: 11,
                duration: 100
            });
        });
    </script>
</div>

<h3>inViewport 属性</h3>

当屏幕空间不够时，自动转换箭头位置。

<div class="cell">
    <p id="test8">本来是7点钟的Tip，屏幕空间不够时会变成11点的Tip</p>
</div>

<div class="code">
    <script>
        seajs.use('common:components/poptip/poptip', function ( Poptip ) {
            new Poptip({
                trigger: '#test8',
                height: 100,
                width: 200,
                content: '<div>比较高的内容</div>',
                theme: 'zbj-poptip-white',
                inViewport: true,
                arrowPosition: 7
            });
        });
    </script>
</div>

<div class="cell">
    <p id="test9">本来是1点钟的Tip，屏幕空间不够时会变成5点的Tip</p>
</div>

<div class="code">
    <script>
        seajs.use('common:components/poptip/poptip', function ( Poptip ) {
            new Poptip({
                trigger: '#test9',
                showClose: true,
                height: 100,
                width: 200,
                content: '<div>比较高的内容</div>',
                theme: 'zbj-poptip-white',
                inViewport: true,
                arrowPosition: 1
            });
        });
    </script>
</div>


<h3 id="tip-position">提示框主题</h3>

<div class="cell">
    <p id="test10">蓝色提示框</p>
</div>

<div class="code">
    <script>
        seajs.use('common:components/poptip/poptip', function ( Poptip ) {
            new Poptip({
                trigger: '#test10',
                content: '<div style="padding:10px">我是内容 我是内容</div>',
                theme: 'zbj-poptip-blue'
            });
        });
    </script>
</div>

<div class="cell">
    <p id="test10-1">红色提示框</p>
</div>

<div class="code">
    <script>
        seajs.use('common:components/poptip/poptip', function ( Poptip ) {
            new Poptip({
                trigger: '#test10-1',
                content: '<div style="padding:10px">我是内容 我是内容</div>',
                theme: 'zbj-poptip-red'
            });
        });
    </script>
</div>

<div class="cell">
    <p id="test10-2">白色提示框</p>
</div>

<div class="code">
    <script>
        seajs.use('common:components/poptip/poptip', function ( Poptip ) {
            new Poptip({
                trigger: '#test10-2',
                content: '<div style="padding:10px">我是内容 我是内容</div>',
                theme: 'zbj-poptip-white'
            });
        });
    </script>
</div>


<h3>自定义位置</h3>

<div class="cell">
    <p id="test11">利用 align 属性设置自定义位置</p>
</div>

<div class="code">
    <script>
        seajs.use('common:components/poptip/poptip', function ( Poptip ) {
            new Poptip({
                trigger: '#test11',
                content: '<div style="padding:10px">我是内容 我是内容</div>',
                align: {
                    baseXY: [0, 0],
                    selfXY: [0, '100%+8px']
                }
            });
        });
    </script>
</div>


<h3 id="tip-position">手动触发 poptip</h3>

<div class="cell">
    提示在上方 <input id="test12" />
</div>
<style>
    .hey .man {
        padding: 100px;;
    }
</style>
<div class="code">
    <script>
        seajs.use('common:components/poptip/poptip', function ( Poptip ) {
            Poptip.tip('输入验证码有误，您还剩下1次机会', '#test12', 'above', {
                theme: 'zbj-poptip-red'
            });
        });
    </script>
</div>

<div class="cell">
    提示在下方 <input id="test13" />
</div>
<style>
    .hey .man {
        padding: 100px;;
    }
</style>
<div class="code">
    <script>
        seajs.use('common:components/poptip/poptip', function ( Poptip ) {
            Poptip.tip('输入验证码有误，您还剩下1次机会', '#test13', 'bellow', {
                theme: 'zbj-poptip-red'
            });
        });
    </script>
</div>


<div class="cell">
    提示在左方 <input id="test14" />
</div>
<style>
    .hey .man {
        padding: 100px;;
    }
</style>
<div class="code">
    <script>
        seajs.use('common:components/poptip/poptip', function ( Poptip ) {
            Poptip.tip('输入验证码有误，您还剩下1次机会', '#test14', 'left', {
                theme: 'zbj-poptip-red'
            });
        });
    </script>
</div>

<div class="cell">
    提示在右方 <input id="test15" />
</div>
<style>
    .hey .man {
        padding: 100px;;
    }
</style>
<div class="code">
    <script>
        seajs.use('common:components/poptip/poptip', function ( Poptip ) {
            Poptip.tip('输入验证码有误，您还剩下1次机会', '#test15', 'right', {
                theme: 'zbj-poptip-white'
            });
        });

    </script>
</div>

<div class="cell">
    <button id="showTip">滚动到特定提示信息的位置</button>
</div>
<style>
    .hey .man {
        padding: 100px;;
    }
</style>
<div class="code">
    <script>

        seajs.use('common:components/poptip/poptip', function ( Poptip ) {

            $('#showTip').click(function( evt ){
                evt.stopPropagation();
                Poptip.tip('输入验证码有误<br/>您还剩下1次机会', '#tip-position', 'above', {
                    theme: 'zbj-poptip-white',
                    scrollIntoView: true
                });
            });

        });

    </script>
</div>


<h3>固定 tip，只有手动调用 hide, tip 才会消失</h3>

<div class="cell">
    提示在右方，固定 <input id="test16" />
</div>
<style>
    .hey .man {
        padding: 100px;;
    }
</style>
<div class="code">
    <script>
        seajs.use('common:components/poptip/poptip', function ( Poptip ) {
            Poptip.tip('tip固定，只有手动调用 hide 才会消失', '#test16', 'right', {
                theme: 'zbj-poptip-white',
                autoHide: false,
                showClose: true
            });
        });

    </script>
</div>
