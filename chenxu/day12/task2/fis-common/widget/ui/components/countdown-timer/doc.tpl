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
<style>
    .verif-code-disabled {
        background-color: #eeeeee;
        cursor: not-allowed !important;
    }
</style>

<div class="section">
    <div class="component-meta">
        <div class="component-id"><strong
                    class="component-name">common:components/countdown-timer/countdown-timer</strong></div>

        <h4>实例化调用</h4>

        <div class="code javascript">
            var CountdownTimer = require('common:components/countdown-timer/countdown-timer');
            var countdownTimer = new CountdownTimer(target, opts);
            countdownTimer.start();
            countdownTimer.stop();
        </div>

        <h4>构造器：target 参数</h4>

        <table class="zbj-table zbj-table-default">
            <tr>
                <th>参数名</th>
                <th>参数类型</th>
                <th>参数说明</th>
                <th>默认值</th>
            </tr>
            <tr>
                <td>target</td>
                <td>selector | jquery obj</td>
                <td>倒计时显示的节点，如果为空则绑定失败</td>
                <td>(Must)</td>
            </tr>
        </table>

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
                <td>selector | jquery obj</td>
                <td>触发倒计时的节点。1. 若没传则为默认开始倒计时 2. 若传递则对象点击后触发倒计时</td>
                <td>null</td>
            </tr>
            <tr>
                <td>total</td>
                <td>number</td>
                <td>默认倒计时开始时间(s)</td>
                <td>60</td>
            </tr>
            <tr>
                <td>startTime/beginTime</td>
                <td>number</td>
                <td>开始时间(ms) | [Object Date] | "2015/12/9 18:00"、"2015 12 10"、"2015/12/10"</td>
                <td>null</td>
            </tr>
            <tr>
                <td>endTime</td>
                <td>number</td>
                <td>结束时间(ms) | [Object Date] | "2015/12/9 18:00"、"2015 12 10"、"2015/12/10"</td>
                <td>null</td>
            </tr>
            {%*            <tr>
                            <td>interval</td>
                            <td>number</td>
                            <td>默认1000间隔 每一个时间间隔会执行一次内部 _onTick() 方法</td>
                            <td>1000</td>
                        </tr>*%}
            <tr>
                <td>display</td>
                <td>string</td>
                <td>显示关键字段</td>
                <td>“验证码”</td>
            </tr>
            <tr>
                <td>displayTemplate</td>
                <td>string</td>
                <td>倒计时开始后每秒填充在target的innerHtml</td>
                <td>“{year}年 - {month}月 - {date}天 - {hour}小时 - {minute}分钟 - {second}秒后重新发送{display}”</td>
            </tr>
            <tr>
                <td>defaultTemplate</td>
                <td>string</td>
                <td>倒计时的结束还原target的innerHtml默认值</td>
                <td>“重发{display}”</td>
            </tr>
            <tr>
                <td>disabledClassName</td>
                <td>string</td>
                <td>
                    不可点击时的className，如果target有这个类名那么将不再开始倒计时。 默认结束会被移除 (注意:目前此处只支持一个类名，用的 hasClass 判断，用的时候需要注意 )
                </td>
                <td>“”</td>
            </tr>
            <tr>
                <td>before</td>
                <td>function</td>
                <td>
                    设置倒计时前执行异步方法。
                    方法参数$.Deferred()，需要在方法完毕手动执行promises.resolve()；如果内部异步请求返回异常，可以通过promises.reject()；重新还原成可点击状态。
                    如果绑定trigger对象那么当对象被点击时触发
                </td>
                <td>function (promises) {
                    promises.resolve();
                    }
                </td>
            </tr>
            <tr>
                <td>onStart</td>
                <td>function</td>
                <td>倒计时前，放置一些提示信息，或设置倒计时前样式。注意：此方法会在before方法后执行</td>
                <td>function () {
                    }
                </td>
            </tr>
            <tr>
                <td>onEnd</td>
                <td>function</td>
                <td>倒计时结束，放置一些提示信息，或还原default样式。</td>
                <td>function () {
                    }
                </td>
            </tr>

        </table>

        <h4>类对象方法</h4>

        <table class="zbj-table zbj-table-default">
            <tr>
                <th>方法名</th>
                <th>方法参数</th>
                <th>方法说明</th>
                <th>注意事项</th>
            </tr>
            <tr>
                <td>start</td>
                <td>无</td>
                <td>再一次开始倒计时，从最初的total开始</td>
                <td></td>
            </tr>
            <tr>
                <td>stop</td>
                <td>无</td>
                <td>归零这次倒计时</td>
                <td>倒计时开始前执行stop无效</td>
            </tr>
        </table>
    </div>
</div>
<h4>手动触发倒计时 例子</h4>

<button id="verif-code">点击开始倒计时</button>

<div class="code javascript">
    <script>
//        seajs.use('common:components/countdown-timer/countdown-timer', function (CountdownTimer) {
        seajs.use(['common:components/countdown-timer/countdown-timer', 'common:components/poptip/poptip'], function (CountdownTimer, PopTip) {
            var countdownTimer1 = new CountdownTimer("#verif-code", {
                trigger: "#verif-code",
                total: 5,
                display: "短信验证码",
                displayTemplate: "请在{second}秒后重新发送{display}",
                defaultTemplate: "重新发送{display}",
                disabledClassName: "verif-code-disabled",
                before: function (promises) {
                    PopTip.tip('倒计时前，执行初始化异步操作中...', '#verif-code', 'right', {
                        theme: 'zbj-poptip-white'
                    });

                    console.log('倒计时前，执行初始化异步操作中...');
                    setTimeout(function () {
                        if(confirm("异步返回成功了么?")){
                            promises.resolve();
                        }else{
                            promises.reject();
                        }
                    }, 2000);
                },
                onStart: function () {
                    PopTip.tip('倒计时前，放置一些提示信息，或设置倒计时前样式。', '#verif-code', 'right', {
                        theme: 'zbj-poptip-white'
                    });
                    console.log('倒计时前，放置一些提示信息，或设置倒计时前样式。')
                },
                onEnd: function () {
                    PopTip.tip('倒计时结束，放置一些提示信息，或还原default样式。', '#verif-code', 'right', {
                        theme: 'zbj-poptip-white'
                    });
                    console.log('倒计时结束，放置一些提示信息，或还原default样式。');
                }
            });
        });
    </script>
</div>

<h4>自动倒计时 例子</h4>

<p>
    倒计时：<span id="verif-code-auto"></span>
</p>
<button id="resend" onclick="">再来一次</button>
<button id="stop" onclick="">停止</button>

<div class="code javascript">
    <script>
        seajs.use('common:components/countdown-timer/countdown-timer', function (CountdownTimer) {
            //auto start
            var countdownTimer2 = new CountdownTimer("#verif-code-auto", {
                total: 5,
                display: "短信验证码",
                displayTemplate: "请在{second}秒后重新发送{display}",
                defaultTemplate: "重新发送{display}",
                disabledClassName: "verif-code-disabled"
            });
            $("#resend").on("click", function () {
                countdownTimer2.start();
            });
            $("#stop").on("click", function () {
                countdownTimer2.stop();
            });
        });
    </script>
</div>

<h4>自动倒计时 (包含结束时间情况) 例子</h4>

<p>
    倒计时：<span id="verif-code-with-end"></span>
</p>
<div class="code javascript">
    <script>
        seajs.use('common:components/countdown-timer/countdown-timer', function (CountdownTimer) {
            //自动倒计时 (包含结束时间情况)
            var countdownTimer3 = new CountdownTimer("#verif-code-with-end", {
                endTime:"2017/1/3",//"2015 12 10"、"2015/12/10"
                display: "短信验证码",
                defaultTemplate: "重新发送{display}",
                disabledClassName: "verif-code-disabled"
            });
        });
    </script>
</div>

<h4>自动倒计时 (包含"开始时间(beginTime)"以及结束时间(endTime)情况) 例子</h4>

<p>
    倒计时：<span id="verif-code-with-begin-end"></span>
</p>
<div class="code javascript">
    <script>
        seajs.use('common:components/countdown-timer/countdown-timer', function (CountdownTimer) {
            //包含"开始时间(beginTime)"以及结束时间(endTime)情况
            // 当到达开始时间后开始倒计时
            var countdownTimer3 = new CountdownTimer("#verif-code-with-begin-end", {
                startTime:new Date().getTime()+5*1000,
                endTime: new Date().getTime()+60*1000,//"2015 12 10"、"2015/12/10"
                display: "短信验证码",
                defaultTemplate: "重新发送{display}",
                disabledClassName: "verif-code-disabled"
            });
        });
    </script>
</div>

