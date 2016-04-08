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
        padding: 10px;
        border: 2px solid #d1e6e7;
        border-radius: 6px;
        margin-bottom: 20px;
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
    .look-component-code{
        padding: 5px 15px;
        background-color: #d1e6e7;
        color: #666;
        border-radius: 3px;
    }
    .look-component-code:hover{
        text-decoration: none;
        color: #666;
        background-color: #b5f4f7;
    }
    .show-source-code{
        height: 25px;
        margin-bottom: 10px;
    }
    .more-examples{
         padding: 5px 20px;
         color: rgb(253,164,139);
         border: 2px solid rgba(253,164,139,0.6);
         border-radius: 3px;
     }
    .more-examples:hover{
        text-decoration: none;
        border: 2px solid #fea500;
    }
        /*样例中相关样式，之前一直写在这个页面*/
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
<!---*每个块都是按需选择，比如，不需要有方法栏就去掉component-methods那块*--->
<div class="section">
<div class="component-description section-block max-size">
    <h2>Calender</h2>
    <div class="description-content">
        Calender - 日历表组件，一般是通过点击触发下滑出可以选择日期的日历。可以设置默认日期，也可任意控制选择的时间段。
    </div>
    <div class="component-id">模块ID：
        <strong class="component-name">common:components/calendar/calendar</strong>
    </div>
    <div class="component-call">实例化调用:
        <div class="code javascript">
var Calendar = require('common:components/calendar/calendar');
var calendar = new Calendar( opts );
        </div>
    </div>
</div>
<h3>样例及使用源码</h3>
<div class="component-examples section-block" id="component-examples">
    <div class="example-content">
        <h4>例一</h4>
        <span class="example-describe">
            栗子小贴士：普通日历表，展开时默认选中当前日期。
            点击下方输入框，弹出日历表，可进行日期选择，选中后，点击空白处日历表收起
        </span>
        <div class="cell" id="cell1">
            <input id="date-nothing" type="text" />
        </div>
        <script>
            seajs.use('common:components/calendar/calendar', function ( Calendar ) {
                new Calendar({trigger: '#date-nothing'});
            });
        </script>
        <div class="show-source-code">
            <a href="javascript:;" class="look-component-code" id="j-show-code">查看源码</a>
        </div>
        <div class="component-usage hide">
            <div class="code">
<input id="date-nothing" type="text" />
            </div>
            <div class="code javascript">
<script>
    seajs.use('common:components/calendar/calendar', function ( Calendar ) {
        new Calendar({trigger: '#date-nothing'});
    });
</script>
            </div>
        </div>
    </div>
    <div class="example-content">
        <h4>例二</h4>

        <span class="example-describe">
            栗子小贴士：普通日历表，展开时默认选中非当前日期。
            点击下方输入框，弹出日历表，可进行日期选择，选中后，点击空白处日历表收起
        </span>
        <div class="cell" id="cell1">
            <input id="date-nothing2" type="text" />
        </div>
        <script>
            seajs.use('common:components/calendar/calendar', function ( Calendar ) {
                new Calendar({trigger: '#date-nothing2', focus: '2012-12-12'});
            });
        </script>
        <div class="show-source-code">
            <a href="javascript:;" class="look-component-code" id="j-show-code">查看源码</a>
        </div>
        <div class="component-usage hide">
            <div class="code">
<input id="date-nothing2" type="text" />
            </div>
            <div class="code javascript">
<script>
    seajs.use('common:components/calendar/calendar', function ( Calendar ) {
        new Calendar({trigger: '#date-nothing2'});
    });
</script>
            </div>
        </div>
    </div>
    <div class="example-content">
        <h4>例三</h4>

        <span class="example-describe">
            栗子小贴士：日历表，自行设置展开时默认选中日期。
            点击下方输入框，弹出日历表，可进行日期选择，选中后，点击空白处日历表收起
        </span>
        <div class="cell" id="cell1">
            <input id="date-focus-2" type="text" value="2012-12-25" />
        </div>
        <script>
            seajs.use('common:components/calendar/calendar', function ( Calendar ) {
                new Calendar({trigger: '#date-focus-2'});
            });
        </script>
        <div class="show-source-code">
            <a href="javascript:;" class="look-component-code" id="j-show-code">查看源码</a>
        </div>
        <div class="component-usage hide">
            <div class="code">
<input id="date-focus-2" type="text" value="2012-12-25" />
            </div>
            <div class="code javascript">
<script>
    seajs.use('common:components/calendar/calendar', function ( Calendar ) {
        new Calendar({trigger: '#date-focus-2'});
    });
</script>
            </div>
        </div>
    </div>
    <div class="example-content">
        <h4>例四</h4>

        <span class="example-describe">
            栗子小贴士：日历表，自行设置展开时默认选中日期，并通过range参数控制选择的最大范围。
            点击下方输入框，弹出日历表，可进行日期选择，选中后，点击空白处日历表收起
        </span>
        <div class="cell" id="cell1">
            <input id="date-disable-2" type="text" value="2012-12-08" />
        </div>
            <script>
                seajs.use('common:components/calendar/calendar', function ( Calendar ) {
                    var cal = new Calendar({
                        trigger: '#date-disable-2',
                        range: [null, '2012-12-25']
                    });
                });
            </script>
        <div class="show-source-code">
            <a href="javascript:;" class="look-component-code" id="j-show-code">查看源码</a>
        </div>
        <div class="component-usage hide">
            <div class="code">
<input id="date-disable-2" type="text" value="2012-12-08" />
            </div>
            <div class="code javascript">
<script>
    seajs.use('common:components/calendar/calendar', function ( Calendar ) {
        var cal = new Calendar({
            trigger: '#date-disable-2',
            range: [null, '2012-12-25']
        });
    });
</script>
            </div>
        </div>
    </div>
    <div class="example-content">
        <h4>例五</h4>

         <span class="example-describe">
            栗子小贴士：日历表，自行设置展开时默认选中日期，并通过range参数控制选择的大小范围。
            点击下方输入框，弹出日历表，可进行日期选择，选中后，点击空白处日历表收起
        </span>
        <div class="cell" id="cell1">
            <input id="date-disable-1" type="text" value="2012-12-08" />
        </div>
            <script>
                seajs.use('common:components/calendar/calendar', function ( Calendar ) {
                    var cal = new Calendar({
                        trigger: '#date-disable-1',
                        range: ['2012-12-06', '2012-12-20']
                    });
                });
            </script>
        <div class="show-source-code">
            <a href="javascript:;" class="look-component-code" id="j-show-code">查看源码</a>
        </div>
        <div class="component-usage hide">
            <div class="code">
<input id="date-disable-1" type="text" value="2012-12-08" />
            </div>
            <div class="code javascript">
<script>
    seajs.use('common:components/calendar/calendar', function ( Calendar ) {
        var cal = new Calendar({
            trigger: '#date-disable-1',
            range: ['2012-12-06', '2012-12-20']
        });
    });
</script>
            </div>
        </div>
    </div>

    <div class="example-content">
        <h4>例六</h4>
        <span class="example-describe">
            栗子小贴士：由其他节点触发展示的日历表，通过output参数控制选中日期放置处。
        </span>
        <div class="cell" id="cell1">
            <input id="date-output" type="text" />
            <a id="date-trigger" href="javascript:;">点这里出现日历</a>
        </div>
            <script>
                seajs.use('common:components/calendar/calendar', function ( Calendar ) {
                    new Calendar({trigger: '#date-trigger', output: "#date-output"});
                });
            </script>
        <div class="show-source-code">
            <a href="javascript:;" class="look-component-code" id="j-show-code">查看源码</a>
        </div>
        <div class="component-usage hide">
            <div class="code">
<input id="date-output" type="text" />
<a id="date-trigger" href="javascript:;">点这里出现日历</a>
            </div>
            <div class="code javascript">
<script>
    seajs.use('common:components/calendar/calendar', function ( Calendar ) {
        new Calendar({trigger: '#date-trigger', output: "#date-output"});
    });
</script>
            </div>
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
            <td>trigger</td>
            <td>selector | dom | jquery obj</td>
            <td></td>
            <td>唤出日历的元素</td>
        </tr>
        <tr>
            <td>focus</td>
            <td>moment</td>
            <td></td>
            <td>日历初始聚焦的日期，默认为今天。接受任何 moment 支持的参数，推荐使用 YYYY-MM-DD 格式</td>
        </tr>
        <tr>
            <td>format</td>
            <td>string</td>
            <td>YYYY-MM-DD</td>
            <td>输出日期格式</td>
        </tr>

        <tr>
            <td>startDay</td>
            <td>string | number</td>
            <td>可使用数字 0-6，可使用 'Sun', 'Tue' 等简写，还可以使用 'Sunday', 'Thursday' 等全称</td>
            <td>一周从哪一天开始，默认周日是一周的开始</td>
        </tr>

        <tr>
            <td>range</td>
            <td>array | function</td>
            <td>推荐使用： ["2012-12-12", "2014-01-01"] 这种写法，方便阅读</td>
            <td>设置可选范围，可接受数组与函数。例如 [startDate, endDate]，其中 startDate 与 endDate 支持所有 moment 支持的写法</td>
        </tr>

        <tr>
            <td>hideOnSelect</td>
            <td>boolean</td>
            <td>true</td>
            <td>选择日期时日历自动隐藏</td>
        </tr>
        <tr>
            <td>output</td>
            <td>selector | element | jquery object</td>
            <td>默认 output 同 trigger</td>
            <td>选择日期时自动填充到 output</td>
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
    </ul>
</div>
<script>
    $(function(){
        //    点击展示源码
        $('body').on('click','#j-show-code',function(){
            var $this = $(this);
            $this.closest('.show-source-code').next('.component-usage').slideToggle();
        })
        var  $target    = $('.example-content'),
                $toggleBtn = $('<a href="javascript:;" data-status="" class="J_toggle-btn more-examples">查看更多样例</a>');

        if($target.length > 3){
            $toggleBtn.attr('data-status','').text('查看更多样例').insertBefore($target.eq(3));
            $toggleBtn.nextAll($target).hide();
        }

        $toggleBtn.on('click',function(){
            var $this = $(this),
                    _status = $this.attr('data-status'),
                    _parent = $this.parent();
            _parent.find('.J-toggle-btn').remove();
            if(!_status){
                $toggleBtn.nextAll($target).show();
                _parent.append($toggleBtn.text('收起').attr('data-status',1));
            }else{
                $toggleBtn.attr('data-status','').text('查看更多样例').insertBefore($target.eq(3));
                $toggleBtn.nextAll($target).hide();
            }
        });
    })


</script>
</div>



