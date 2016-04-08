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
        margin-left: 10px;
        font-family: monospace;
        font-weight: normal;
    }
</style>
<div class="section">
    <h3>API</h3>
    <div class="component-meta">
        <div class="component-id">模块ID: <strong class="component-name">common:components/dialog/dialog</strong></div>
        <div>调用：var Dialog = require('common:components/dialog/dialog');</div>
        <dl>
            <dt>构造器参数</dt>
            <dd>theme: 弹窗的 className</dd>
            <dd>trigger: 触发弹窗的节点</dd>
            <dd>title: 标题</dd>
            <dd>width: 宽度</dd>
            <dd>message: dialog 内容区</dd>
            <dd>cancelTpl: 取消按钮的模版</dd>
            <dd>confirmTpl: 确认按钮的模版</dd>
            <dd>onConfirm: 确定按钮的回调函数</dd>
            <dd>onCancel: 取消按钮的回调函数</dd>
            <dd>beforeHide: 弹窗关闭前的处理函数，如果 return false 的话，弹窗不会被关闭</dd>
            <dd>afterHide: 弹窗被关闭后的处理函数</dd>
            <dd>beforeShow: 弹窗显示前的处理函数</dd>
            <dd>afterShow: 弹窗显示后的处理函数</dd>

            <dt>类方法</dt>
            <dd></dd>
        </dl>

    </div>

    <div class="code">
       seajs.use('common:components/dialog/dialog', function( Dialog ){
            var dialog = new Dialog({
                theme: 'tianpeng-dialog',
                title: '购买服务',
                width: 400,
                message: 'body',
                cancelTpl: false, // 关闭按钮，默认为 true
                confirmTpl: '<a class="ui-dialog-button-orange" href="javascript:;">提&nbsp;&nbsp;交</a>',
                onConfirm: function() {
                    this.hide();
                },
                onCancel: function(){

                },
                beforeHide: function(e) {
                    // 如果返回 false，那么就不会被关闭
                    // return false;
                }
            }).render().show();

            var dialog = new Dialog({
                trigger: $('#triggerDialog'),
                title: '购买服务',
                width: 500,
                message: 'body',
                confirmTpl: '<a class="ui-dialog-button-orange" href="javascript:;">提&nbsp;&nbsp;交</a>',
                onConfirm: function() {
                },
                beforeShow: function(e) {
                    // return false;
                }
            });
            dialog.after('show', function(){
                this.set('title', '三秒后关闭对话框');
            })
        });

    </div>

    <a id="triggerDialog">点击打开 dialog</a>

    <script type="text/javascript">
        seajs.use('common:components/dialog/dialog', function( Dialog ){
            var dialog = new Dialog({
                theme: 'tianpeng-dialog',
                title: '购买服务',
                width: 400,
                message: 'body',
                cancelTpl: false, // 关闭按钮，默认为 true
                confirmTpl: '<a class="ui-dialog-button-orange" href="javascript:;">提&nbsp;&nbsp;交</a>',
                onConfirm: function() {
                    this.hide();
                },
                onCancel: function(){

                },
                beforeHide: function(e) {
                    // 如果返回 false，那么就不会被关闭
                    // return false;
                }
            }).render().show();

            var dialog = new Dialog({
                trigger: $('#triggerDialog'),
                title: '购买服务',
                width: 500,
                message: 'body',
                confirmTpl: '<a class="ui-dialog-button-orange" href="javascript:;">提&nbsp;&nbsp;交</a>',
                onConfirm: function() {
                },
                beforeShow: function(e) {
                    // return false;
                }
            });
            dialog.after('show', function(){
                this.set('title', '三秒后关闭对话框');
                this.set('message', '不要啊！！');
            })
        });

    </script>
</div>