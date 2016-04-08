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
<h3>API</h3>

<div class="component-meta">
    <div class="component-id">模块ID: <strong class="component-name">common:components/validator/validator</strong></div>
    <div>调用：var Validator = require('common:components/validator/validator');</div>
    <dl>
        <dt>构造器参数</dt>
        <dd>element: 要校验的表单 ( selector | dom | jquery object )</dd>
        <dd>doSubmit: 表单验证通过后手动提交的处理函数( 如果设置了，那么 submitSuccess，和 submitError 不会起作用 )</dd>
        <dd>beforeSubmit: 表单提交前的处理函数，如果返回false，则将取消表单提交</dd>
        <dd>startSubmit: 表单开始提交时的处理函数，比如 disable 掉提交按钮</dd>
        <dd>endSubmit: 提交时的处理函数，比如 disable 掉提交按钮</dd>
        <dd>submitSuccess: 提交成功时的回调函数</dd>
        <dd>submitError: 提交失败时的回调函数</dd>
        <dd>triggerType: 默认值为 'blur',</dd>
        <dd>checkOnSubmit: 默认值为 true, 是否在表单提交前校验</dd>
        <dd>stopOnError: 默认值为 false, 提交前校验整个表单时，遇到错误时是否停止校验其他表单项</dd>
        <dd>autoSubmit: 默认值为 true, 当校验全部通过后，是否提交表单</dd>
        <dd>checkNull: 默认值 true。除提交前的校验外，表单项的值为空时是否校验。</dd>
        <dd></dd>

        <dt>类方法</dt>
        <dd></dd>
    </dl>

</div>

<h3>示例</h3>

<div class="code">
    var Validator = require('common:components/validator/validator');

    // 初始化
    var validator = new Validator({
        element: '#test-form',
        doSubmit: function(){
            this.element.get(0).submit()
        },
        // 开始做提交操作时会调用的函数
        startSubmit: function(){

        },

        // 提交操作结束时会调用的函数
        endSubmit: function(){

        },

        // 提交成功时的回调函数
        submitSuccess: function(){

        },

        // 提交失败时的回调函数
        submitError: function(){

        },

        failSilently: true
    });

    validator.addItem({
        element: '[name=topicname]',
        required: true,
        errormessageRequired: '请填写分享主题'
    })

    .addItem({
        element: '[name=username]',
        required: true,
        errormessageRequired: '请填写分享人'
    })

    .addItem({
        element: '[name=sharetime]',
        required: true,
        errormessageRequired: '请填写分享日期'
    });
</div>
<h3>DEMO</h3>
<form id="test-form" class="zbj-form example" action="/topic/doadd" method="post">
    <div class="zbj-form-item">
        <label for="topicname" class="zbj-label"><span class="zbj-form-required">*</span>课题：</label>
        <input id="topicname" name="topicname" class="zbj-input" type="text" />
        <div class="zbj-form-explain">请填写你要分享的课题</div>
    </div>

    <div class="zbj-form-item">
        <label for="username" class="zbj-label"><span class="zbj-form-required">*</span>主讲人：</label>
        <input id="username" name="username" class="zbj-input" type="text" />
        <div class="zbj-form-explain">用户名需已由微信绑定</div>
    </div>

    <div class="zbj-form-item">
        <label for="sharetime" class="zbj-label"><span class="zbj-form-required">*</span>分享日期：</label>
        <input id="sharetime" name="sharetime" class="zbj-input" type="text" readonly />
        <div class="zbj-form-explain">请填写可分享的日期</div>
    </div>

    <div class="zbj-form-item">
        <label for="note" class="zbj-label">简介：</label>
        <textarea class="zbj-textarea" name="note" id="note" cols="40" rows="8"></textarea>
        <div class="zbj-form-explain">请填写简介</div>
    </div>
    <div class="zbj-form-item">
        <input type="submit" id="submitBtn" class="zbj-btn zbj-btn-primary" value="提交">

    </div>
</form>
<script>
    seajs.use('common:components/validator/validator', function(Validator) {
            var validator = new Validator({
                element: '#test-form',
                doSubmit: function(){
                    this.element.get(0).submit()
                },
                failSilently: true,
                submitBtn: $('#submitBtn')
            });

            validator.addItem({
                element: '[name=topicname]',
                required: true,
                errormessageRequired: '请填写分享主题'
            })

            .addItem({
                element: '[name=username]',
                required: true,
                errormessageRequired: '请填写分享人'
            })

            .addItem({
                element: '[name=sharetime]',
                required: true,
                errormessageRequired: '请填写分享日期'
            });

    });

    seajs.use('common:components/calendar/calendar', function(Calendar) {
        new Calendar({trigger: '#sharetime'});
    });
</script>

