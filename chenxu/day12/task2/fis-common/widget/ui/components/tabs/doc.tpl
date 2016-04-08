<style>
    h3{
        padding: 5px;
        border-left: 3px solid #eee;
    }
    h3:hover{
        border-left-color: #1b809e;
    }
    .max-size{
        font-size: 14px;
    }
    .section-block{
        padding: 30px 0;
    }
    .example-content{
        padding: 20px;
        border: 2px solid #d1e6e7;
        border-radius: 6px;
    }
    .description-content{
        padding: 5px 0;
    }
    .component-table{
        border: 2px solid #d1e6e7;
    }
    .component-table th{
        width: 20%;
    }
    .component-table-second{
        border: 2px solid rgba(253,164,139,0.6);
    }
    .component-table-second th{
        width: 20%;
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
    .component-page-nav{
        background-color: rgba(209, 230, 231, 0.8);
        position: fixed;
        top: 120px;
        right: 0;
        z-index: 999;
        border-radius: 4px;
    }
    .component-nav-tips{
        height: 30px;
        line-height: 30px;
    }
    .component-nav-tips a{
        color: #666;
        font-weight: bold;
        display: block;
        padding: 0 20px;
    }
    .component-nav-tips:hover{
        background-color: rgba(27, 128, 158, 0.6);
    }
    .component-nav-tips a:hover{
        text-decoration: none;
        color: #eee;
    }
    .big-icon{
        font-size: 18px;
        font-weight: bold;
    }
    .option-of-method{
        position: absolute;
        background-color: #fff;
        width: 350px;
        display: none;
        z-index: 999;
    }
    /*样例中相关样式，之前一直写在这个页面*/
    .zbj-tabs-content {
        padding: 10px ;
        margin-bottom: 30px;;
    }
</style>
<!---*每个块都是按需选择，比如，不需要有方法栏就去掉component-methods那块*--->
<div class="section">
    <div class="component-description section-block max-size">
        <h2>Tabs</h2>
        <div class="description-content">
            Tabs - 普通标签页，不同tab对应不同内容块，可通过click等方式来触发切换。
        </div>
        <div class="component-id">模块ID：
            <strong class="component-name">common:components/tabs/tabs</strong>
        </div>
    </div>
    <h3>样例及使用源码</h3>
    <div class="component-examples section-block" id="component-examples">
        <div class="example-content max-size" id="zbj-tabs-demo">
            <ul class="clearfix zbj-tabs">
                <li><a href="javascript:void(0)">标题 A</a></li>
                <li><a href="javascript:void(0)">标题 B</a></li>
                <li><a href="javascript:void(0)">标题 C</a></li>
                <li><a href="javascript:void(0)">标题 D</a></li>
            </ul>
            <div class="zbj-tabs-content">
                <div class="hide zbj-tabs-panel">
                    内容 A
                    <pre>
                        - 在当前 trigger 中 mouseover/mouseout, click, focus, 不触发
                        - 鼠标快速滑过非当前 trigger, 不触发
                        - mouseover 到非当前 trigger, 停留时间到达延迟时，触发
                        - click 或 Tab 切换到 trigger, 立即触发
                        - switch / switched 事件的触发
                    </pre>
                </div>
                <div class="hide zbj-tabs-panel">内容 BB
                    <div>
                        众里寻她千百度，暮然回首
                    </div>
                </div>
                <div class="hide zbj-tabs-panel">内容 CCC
                    <pre>
                        - 在当前 trigger 中 mouseover/mouseout, click, focus, 不触发
                        - 鼠标快速滑过非当前 trigger, 不触发
                        - mouseover 到非当前 trigger, 停留时间到达延迟时，触发
                        - click 或 Tab 切换到 trigger, 立即触发
                        - switch / switched 事件的触发
                    </pre>
                </div>
                <div class="hide zbj-tabs-panel">内容 DDDD
                    <pre>
                        - 在当前 trigger 中 mouseover/mouseout, click, focus, 不触发
                        - 鼠标快速滑过非当前 trigger, 不触发
                        - mouseover 到非当前 trigger, 停留时间到达延迟时，触发
                        - click 或 Tab 切换到 trigger, 立即触发
                        - switch / switched 事件的触发
                    </pre>
                </div>
            </div>
        </div>
        <div class="component-usage">
            <h4>使用源码</h4>
            <div class="code">
                <div class="example-content" id="zbj-tabs-demo">
                    <ul class="clearfix zbj-tabs">
                        <li><a href="javascript:void(0)">标题 A</a></li>
                        <li><a href="javascript:void(0)">标题 B</a></li>
                        <li><a href="javascript:void(0)">标题 C</a></li>
                        <li><a href="javascript:void(0)">标题 D</a></li>
                    </ul>
                    <div class="zbj-tabs-content">
                        <div class="hide zbj-tabs-panel">
                            内容 A
                        <pre>
                            - 在当前 trigger 中 mouseover/mouseout, click, focus, 不触发
                            - 鼠标快速滑过非当前 trigger, 不触发
                            - mouseover 到非当前 trigger, 停留时间到达延迟时，触发
                            - click 或 Tab 切换到 trigger, 立即触发
                            - switch / switched 事件的触发
                        </pre>
                        </div>
                        <div class="hide zbj-tabs-panel">内容 BB
                            <div>
                                众里寻她千百度，暮然回首
                            </div>
                        </div>
                        <div class="hide zbj-tabs-panel">内容 CCC
                        <pre>
                            - 在当前 trigger 中 mouseover/mouseout, click, focus, 不触发
                            - 鼠标快速滑过非当前 trigger, 不触发
                            - mouseover 到非当前 trigger, 停留时间到达延迟时，触发
                            - click 或 Tab 切换到 trigger, 立即触发
                            - switch / switched 事件的触发
                        </pre>
                        </div>
                        <div class="hide zbj-tabs-panel">内容 DDDD
                        <pre>
                            - 在当前 trigger 中 mouseover/mouseout, click, focus, 不触发
                            - 鼠标快速滑过非当前 trigger, 不触发
                            - mouseover 到非当前 trigger, 停留时间到达延迟时，触发
                            - click 或 Tab 切换到 trigger, 立即触发
                            - switch / switched 事件的触发
                        </pre>
                        </div>
                    </div>
                </div>
            </div>
            <div class="code javascript">
                var Tabs = require('common:components/tabs/tabs');
                var tab = new Tabs({
                element: '#zbj-tabs-demo',
                triggers: '#zbj-tabs-demo .zbj-tabs li',
                panels: '#zbj-tabs-demo .zbj-tabs-content .zbj-tabs-panel',
                activeIndex: 0
                });

                tab.on('switch', function( toIndex, fromIndex ){
                console.log('to switch to ' + toIndex);
                });

                tab.on('switched', function( toIndex, fromIndex ){
                console.log('switched to ' + toIndex);
                });

            </div>
        </div>
    </div>
    <h3>构造器：options参数</h3>
    <div class="component-options section-block"  id="component-options" >
        <table class="zbj-table component-table zbj-table-hover">
            <thead>
            <tr>
                <th>参数名</th>
                <th>参数类型</th>
                <th>默认值</th>
                <th>参数说明</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>element</td>
                <td>selector</td>
                <td></td>
                <td>tab 外层容器</td>
            </tr>
            <tr>
                <td>triggers</td>
                <td>String|Array</td>
                <td></td>
                <td>触发器列表，支持直接传入选择器，也可以是元素数组</td>
            </tr>
            <tr>
                <td>panels</td>
                <td>String|Array</td>
                <td></td>
                <td>面板列表，支持直接传入选择器，也可以是元素数组</td>
            </tr>
            <tr>
                <td>triggerType</td>
                <td>string</td>
                <td>默认是 click</td>
                <td>触发类型</td>
            </tr>
            <tr>
                <td>activeIndex</td>
                <td>Number</td>
                <td>默认为 0</td>
                <td>初始化时，自动切换到指定面板</td>
            </tr>
            </tbody>
        </table>
    </div>
    <h3>方法()</h3>
    <div class="component-methods section-block"  id="component-methods">
        <table class="zbj-table component-table zbj-table-hover">
            <thead>
            <tr>
                <th>方法名</th>
                <th>描述</th>
                <th>方法参数（点击查看<span class="big-icon">↓</span>）</th>
                <th>使用</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>on(options)</td>
                <td>on()是JQuery官方的绑定事件方法</td>
                <td>
                    <a href="javascript:;" class="show-method-options"> event,childSelector,data,function</a>
                    <div class="option-of-method">
                        <table class="zbj-table component-table-second">
                            <thead>
                            <tr>
                                <th>参数名</th>
                                <th>参数描述</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    event
                                </td>
                                <td>一个或多个空格分隔的事件类型和可选的命名空间，如“click”或“keydown.myPlugin”。</td>
                            </tr>
                            <td>
                                childSelector
                            </td>
                            <td>子选择器匹配的后代元素才能触发，如果被省略，则选中元素总能触发事件。</td>
                            </tr>
                            <tr>
                                <td>
                                    data
                                </td>
                                <td>当事件被触发时，data通过event.data传递给事件处理函数。</td>
                            </tr>
                            <tr>
                                <td>
                                    function
                                </td>
                                <td>触发后要做的事</td>
                            </tr>
                            </tbody>
                        </table>

                    </div>
                </td>
                <td>$(selector).on(event,childSelector,data,function(){})</td>
            </tr>
            <tr>
                <td>on(options)</td>
                <td>on()是JQuery官方的绑定事件方法</td>
                <td>
                    <a href="javascript:;" class="show-method-options"> event,childSelector,data,function</a>
                    <div class="option-of-method">
                        <table class="zbj-table component-table-second">
                            <thead>
                            <tr>
                                <th>参数名</th>
                                <th>参数描述</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    event
                                </td>
                                <td>一个或多个空格分隔的事件类型和可选的命名空间，如“click”或“keydown.myPlugin”。</td>
                            </tr>
                            <td>
                                childSelector
                            </td>
                            <td>子选择器匹配的后代元素才能触发，如果被省略，则选中元素总能触发事件。</td>
                            </tr>
                            <tr>
                                <td>
                                    data
                                </td>
                                <td>当事件被触发时，data通过event.data传递给事件处理函数。</td>
                            </tr>
                            <tr>
                                <td>
                                    function
                                </td>
                                <td>触发后要做的事</td>
                            </tr>
                            </tbody>
                        </table>

                    </div>
                </td>
                <td>$(selector).on(event,childSelector,data,function(){})</td>
            </tr>
            </tbody>
        </table>
    </div>
    <h3>事件</h3>
    <div class="component-events section-block"  id="component-events">
        <table class="zbj-table component-table zbj-table-hover">
            <thead>
            <tr>
                <th>事件名</th>
                <th>事件描述</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>switch</td>
                <td>面板切换前触发</td>
            </tr>
            <tr>
                <td>switched</td>
                <td>面板切换后触发</td>
            </tr>
            </tbody>
        </table>
    </div>

    <div class="component-page-nav">
        <ul>
            <li class="component-nav-tips">
                <a href="#component-examples">样例.源码</a>
            </li>
            <li class="component-nav-tips">
                <a href="#component-options">option参数</a>
            </li>
            <li class="component-nav-tips">
                <a href="#component-methods">方法</a>
            </li>
            <li class="component-nav-tips">
                <a href="#component-events">事件</a>
            </li>
        </ul>
    </div>
    <script>
        seajs.use('common:components/tabs/tabs', function( Tabs ){
            var tab = new Tabs({
                element: '#zbj-tabs-demo',
                triggers: '#zbj-tabs-demo .zbj-tabs li',
                panels: '#zbj-tabs-demo .zbj-tabs-content .zbj-tabs-panel',
                activeIndex: 0
            });

            tab.on('switch', function( toIndex, fromIndex ){
                console.log('to switch to ' + toIndex);
            });

            tab.on('switched', function( toIndex, fromIndex ){
                console.log('switched to ' + toIndex);
            });

        });
//        点击查看方法属性性情
        $('body').on('click','.show-method-options',function(){
            var $optionOfMethod = $(this).siblings('.option-of-method');
            $optionOfMethod.slideToggle();
        })
    </script>
</div>
