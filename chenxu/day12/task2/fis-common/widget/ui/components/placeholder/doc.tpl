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

    .test-placeholder-input {
        width: 20%;
    }
</style>
<div class="section">
    <div class="component-meta">
        <div class="component-id">
            <strong class="component-name">
                jquery/placeholder/placeholder
            </strong>
        </div>

        <h4>同Jquery的方法调用</h4>

        <div class="code javascript">
            require('jquery/placeholder/placeholder');
            $('input, textarea').placeholder();
        </div>

        <h4>参数</h4>

        <table class="zbj-table zbj-table-default">
            <tr>
                <th>参数名</th>
                <th>参数类型</th>
                <th>参数说明</th>
                <th>默认值</th>
            </tr>
            <tr>
                <td>labelMode</td>
                <td>boolean</td>
                <td>默认是Label模拟</td>
                <td>true</td>
            </tr>
            <tr>
                <td>labelStyle</td>
                <td>object</td>
                <td>用于定位Label样式</td>
                <td>{}</td>
            </tr>
            <tr>
                <td>labelAcross</td>
                <td>boolean</td>
                <td>默认不开启跨浏览器支持</td>
                <td>false</td>
            </tr>
            <tr>
                <td>debug</td>
                <td>boolean</td>
                <td>表示是否开启测试模式，在测试模式中即使浏览器原生支持 placeholder 也会调用插件</td>
                <td>false</td>
            </tr>
            <tr>
                <td>defaultClass</td>
                <td>string</td>
                <td>placeholderLabel默认类名</td>
                <td>false</td>
            </tr>
            <tr>
                <td>focusClass</td>
                <td>string</td>
                <td>placeholderLabel focus时 动态添加类名</td>
                <td>false</td>
            </tr>
        </table>
    </div>
</div>

<div class="code javascript">
    载入js
    <script src="{%uri name="common:static/lib/jquery/placeholder/placeholder.js"%}"></script>
</div>

<h4>
    这个用于测试正常情况下
</h4>
<div>
    <input class="zbj-input test-placeholder-input" type="text" id="test-auto" placeholder="这个用于测试正常情况下">
</div>
<div class="code javascript">
    <script>
        setTimeout(function () {
//          seajs.use("jquery/placeholder/placeholder", function () {
            //这个用于测试正常情况下
            $("#test-auto").placeholder();
//          });
        }, 2000);
    </script>
</div>

<h4>
    这个用于测试跨浏览器情况下
</h4>
<div>
    <input class="zbj-input test-placeholder-input" type="text" id="test-label-across" placeholder="这个用于测试跨浏览器情况下">
</div>
<div class="code javascript">
    <script>
        setTimeout(function () {
//          seajs.use("jquery/placeholder/placeholder", function () {
            //这个用于测试跨浏览器情况下
            $("#test-label-across").placeholder({
                labelAcross: true
            });
//          });
        }, 2000);
    </script>
</div>

<h4>
    这个用于测试debug模式
</h4>
<div>
    <input class="zbj-input test-placeholder-input" type="text" id="test-debug" placeholder="这个用于测试debug模式">
</div>
<div class="code javascript">
    <script>
        setTimeout(function () {
//          seajs.use("jquery/placeholder/placeholder", function () {
            //这个用于测试debug模式
            $("#test-debug").placeholder({
                debug: true
            });
//          });
        }, 2000);
    </script>
</div>

{%*<div>
    <input type="text" id="test-label-across" placeholder="这个用于测试正常情况下">
</div>*%}

<h4 id="test-move-div">
    这个用于测试 '由于一些原因引发的输入框位置变化'
</h4>
<h5>
    <button id="move">移动</button>
</h5>
<div>
    <input class="zbj-input test-placeholder-input" type="text" id="test-move" placeholder="这个用于测试 '由于一些原因引发的输入框位置变化'">
</div>
<div class="code javascript">
    <script>
        setTimeout(function () {
//          seajs.use("jquery/placeholder/placeholder", function () {
            //这个用于测试 '由于一些原因引发的输入框位置变化
            $("#test-move").placeholder({
                debug: true
            });
            $("#move").on("click", function () {
                var testMoveLabel = $("#test-move-div");
                var temp = testMoveLabel.css("margin-top");
                testMoveLabel.css("margin-top", parseInt(temp) + 100);
                //添加复位操作
                $("#test-move").placeholder({
                    debug: true
                });
            });
//          });
        }, 2000);
    </script>
</div>

<h4>
    用于因为一些需求，导致输入框由隐藏 ==》显示
</h4>
<h5>
    <button id="show">显示</button>
    <button id="hide">隐藏</button>
</h5>
<div id="test-show-div" style="display: none">
    <input class="zbj-input test-placeholder-input" type="text" id="test-show" placeholder="用于因为一些需求，导致输入框由隐藏 ==》显示">
</div>
<div class="code javascript">
    <script>
        setTimeout(function () {
//          seajs.use("jquery/placeholder/placeholder", function () {
            $("#show").on("click", function () {
                var testShowLabel = $("#test-show-div");
                testShowLabel.show();
                //添加复位操作
                $("#test-move").placeholder({
                    debug: true
                });
            });
            $("#hide").on("click", function () {
                var testShowLabel = $("#test-show-div");
                testShowLabel.hide();
            });
//          });
        }, 2000);
    </script>
</div>


<h4>
    由于一些原因清空了 input 输入框中的值，因为没有触发blur事件，导致模拟的 placeholder 没有显示的问题
</h4>
<h5>
    <button id="delete">清空输入框</button>
</h5>
<div>
    <input class="zbj-input test-placeholder-input" type="text" id="test-delete"
           placeholder="用于因为一些需求，导致输入框值被清空 且没有触发 blur 事件">
</div>
<div class="code javascript">
    <script>
        setTimeout(function () {
//          seajs.use("jquery/placeholder/placeholder", function () {
            $("#delete").on("click", function () {
                var $testDelete = $("#test-delete");
                $testDelete.val("");
                //重新显示
                $testDelete.placeholder({
                    debug: true
                });
            });
            $("#test-delete").placeholder({
                debug: true
            });
//          });
        }, 2000);
    </script>
</div>


