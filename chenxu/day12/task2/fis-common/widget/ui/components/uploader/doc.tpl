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
        <div class="component-id"><strong class="component-name">common:components/uploader/uploader</strong></div>
        <h4>调用</h4>
        <div class="code javascript">
    var Uploader = require('common:components/uploader/uploader');
    new Uploader( opts )
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
                <td>element</td>
                <td>selector</td>
                <td>上传列表的容器</td>
                <td></td>
            </tr>
            <tr>
                <td>browse_button</td>
                <td>dom | id | jQ object</td>
                <td>上传按钮</td>
                <td></td>
            </tr>
            <tr>
                <td>runtimes</td>
                <td>string</td>
                <td>运行环境</td>
                <td>html5,flash,html4,silverligh</td>
            </tr>
            <tr>
                <td>acceptExt</td>
                <td>Array</td>
                <td>允许的扩展文件类型</td>
                <td>[{title : "Image files", extensions : "jpg,gif,png"}]</td>
            </tr>
            <tr>
                <td>prevent_duplicates</td>
                <td>boolean</td>
                <td>不允许文件重复</td>
                <td>true</td>
            </tr>
        </table>
    </div>

    <a id="triggerUploadBtn">点击上传</a>
    <div class="holder"></div>

    <script type="text/javascript">
        seajs.use('common:components/uploader/uploader', function( Uploader ){
            var uploader = new Uploader({
                element: '.holder',
                browse_button: 'triggerUploadBtn',
                prevent_duplicates: 1,
                count_limit: 2,
                extra_params: 'key=1',
                url: 'http://www.t6.tp.com/upload/uploadnew-key-1.html?',
                acceptExt: [{title : "Image files", extensions : "jpg,gif,png"}],
                init_files: [{
                    name: 'baidu.png',
                    file: 'baidu/baidu.png'
                }]
            });

            console.log( uploader );
        });

    </script>
</div>