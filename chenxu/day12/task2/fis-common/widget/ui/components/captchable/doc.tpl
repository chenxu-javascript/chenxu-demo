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
        <div class="component-id"><strong class="component-name">common:components/captchable/captchable</strong></div>
        <h4>实例化调用</h4>
        <div class="code javascript">
var Captchable = require('common:components/captchable/captchable');
var captchable = new Captchable( opts );
captchable.show(); //显示出来
        </div>
        <h4>构造器：opts 参数</h4>
        <table class="zbj-table zbj-table-default">
            <tr>
                <th>参数名</th>
                <th>参数类型</th>
                <th>参数说明</th>
                <th>默认值</th>
            </tr>
            <tr>
                <td>holder</td>
                <td>selector | dom | jquery obj</td>
                <td>放置图片验证码的容器</td>
                <td></td>
            </tr>
            <tr>
                <td>theme</td>
                <td>string</td>
                <td>加载图片验证码节点上的样式名，方便重定义样式</td>
                <td>默认为空</td>
            </tr>
            <tr>
                <td>captchaHTML</td>
                <td>string</td>
                <td>自定义图片验证码的 html 片段</td>
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


<h4>默认 UI 例子</h4>

<div class="cell" id="cell1">

</div>

<div class="code">
    <script>
        seajs.use('common:components/captchable/captchable', function ( Captchable ) {
            var captchable = new Captchable( {
                holder: '#cell1'
            });
            captchable.show();
        });
    </script>
</div>

<h4>自定义 UI 例子</h4>

<div class="cell" id="cell2">

</div>

<div class="code">
    <script>
        seajs.use('common:components/captchable/captchable', function ( Captchable ) {
            var captchable = new Captchable({
                holder: '#cell2',
                captchaHTML: '<input placeholder="图片验证码" type="text" value="" name="catcha" role="captcha">\
                <a href="javascript:void(0);" role="refresh" class="refimg">\
                <img class="yzm" src="#" alt=""  role="captchaimg">\
                </a>\
                <input type="hidden" name="seed" role="seed"/>'
            });
            captchable.show();
        });
    </script>
</div>

