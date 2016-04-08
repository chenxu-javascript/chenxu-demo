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
        <h2>Address-selector</h2>
        <div class="description-content">
            Address-selector - 通用地区选择控件
        </div>
        <div class="component-id">模块ID：
            <strong class="component-name">common:components/address-selector/address-selector</strong>
        </div>
        <div class="component-call">实例化调用:
            <div class="code javascript">
var AddressSelector = require('common:components/address-selector/address-selector');
var addressSelector = new AddressSelector({
    parentNode: '#area-holder'
)};
            </div>
        </div>
    </div>
    <h3>样例及使用源码</h3>
    <div class="component-examples section-block" id="component-examples">
        <div class="example-content">
            <h4>例一</h4>
        <span class="example-describe">
            栗子小贴士：默认地区选择器，需要一个一个选择
        </span>
            <div class="cell" id="area-holder"></div>
            <script>
                seajs.use('common:components/address-selector/address-selector', function ( AddressSelector ) {
                    new AddressSelector({
                        parentNode: '#area-holder'
                    });
                });
            </script>
            <div class="show-source-code">
                <a href="javascript:;" class="look-component-code" id="j-show-code">查看源码</a>
            </div>
            <div class="component-usage hide">
                <div class="code">
<div class="cell" id="area-holder"></div>
                </div>
                <div class="code javascript">
seajs.use('common:components/address-selector/address-selector', function ( AddressSelector ) {
    new AddressSelector({
        parentNode: '#cell'
    });
});
                </div>
            </div>
        </div>
        <div class="example-content">
            <h4>例二</h4>

        <span class="example-describe">
            栗子小贴士：带有默认值的地区选择器，通常可见收件人信息的编辑状态
        </span>
            <div class="cell" id="area-holder-2"></div>
            <script>
                seajs.use('common:components/address-selector/address-selector', function ( AddressSelector ) {
                    new AddressSelector({
                        parentNode: '#area-holder-2',
                        provinceId: 6561,
                        cityId: 3418,
                        townId: 3431
                    });
                });
            </script>
            <div class="show-source-code">
                <a href="javascript:;" class="look-component-code" id="j-show-code">查看源码</a>
            </div>
            <div class="component-usage hide">
                <div class="code">
                    <div class="cell" id="area-holder-2"></div>
                </div>
                <div class="code javascript">
seajs.use('common:components/address-selector/address-selector', function ( AddressSelector ) {
    new AddressSelector({
        parentNode: '#area-holder-2',
        provinceId: 6561,
        cityId: 3418,
        townId: 3431
    });
});
                </div>
            </div>
        </div>

        <div class="example-content">
            <h4>例三</h4>

        <div class="example-describe">
            栗子小贴士：获取地区选择器的值
        </div>
            <div class="cell" id="area-holder-3"></div>
            <div class="cell"><a href="javascript:;" class="look-component-code" id="j-show-data">查看地区值</a></div>
            <style>
                #area-holder-3, #area-holder-3 .address-selector {
                    display: inline;
                }
            </style>
            <script>
                seajs.use('common:components/address-selector/address-selector', function ( AddressSelector ) {
                    var as = new AddressSelector({
                        parentNode: '#area-holder-3',
                        provinceId: 6561,
                        cityId: 3418,
                        townId: 3431
                    });
                    $('#j-show-data').on('click', function(){
                        var val = as.getAddress();
                        var alertStr = '省ID: ' + val.province.id + ', 省名字: ' + val.province.name + '\n' +
                                '市ID: ' + val.city.id + ', 省名字: ' + val.city.name + '\n' +
                                '区ID: ' + val.town.id + ', 省名字: ' + val.town.name + '\n';

                        alert(alertStr)
                    })
                });
            </script>
            <div class="show-source-code">
                <a href="javascript:;" class="look-component-code" id="j-show-code">查看源码</a>
            </div>
            <div class="component-usage hide">
                <div class="code">
                    <div class="cell" id="area-holder-3"></div>
                    <div class="cell"><a href="javascript:;" class="look-component-code" id="j-show-data">查看地区值</a></div>
                </div>
                <div class="code javascript">
                    seajs.use('common:components/address-selector/address-selector', function ( AddressSelector ) {
                    var as = new AddressSelector({
                    parentNode: '#area-holder-3',
                    provinceId: 6561,
                    cityId: 3418,
                    townId: 3431
                    });
                    $('#j-show-data').on('click', function(){
                    var val = as.getAddress();
                    alert(val.province.id)
                    })
                    });
                </div>
            </div>
        </div>

        <div class="example-content">
            <h4>例四</h4>

            <div class="example-describe">
                栗子小贴士：地区选择器和详细地区输入
            </div>
            <div class="cell" id="area-holder-4"></div><input type="text"/>
            <style>
                #area-holder-4, #area-holder-4 .address-selector {
                    display: inline;
                }
            </style>
            <script>
                seajs.use('common:components/address-selector/address-selector', function ( AddressSelector ) {
                    var as = new AddressSelector({
                        parentNode: '#area-holder-4',
                        provinceId: 6561,
                        cityId: 3418,
                        townId: 3431
                    });
                });
            </script>
            <div class="show-source-code">
                <a href="javascript:;" class="look-component-code" id="j-show-code">查看源码</a>
            </div>
            <div class="component-usage hide">
                <div class="code">
        <div class="cell" id="area-holder-4"></div>
                </div>
                <div class="code">
        #area-holder-4, #area-holder-4 .address-selector {
            display: inline;
        }
                </div>
                <div class="code javascript">
        seajs.use('common:components/address-selector/address-selector', function ( AddressSelector ) {
            var as = new AddressSelector({
                parentNode: '#area-holder-4',
                provinceId: 6561,
                cityId: 3418,
                townId: 3431
            });
        });
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
                <td>parentNode</td>
                <td>selector | dom | jquery obj</td>
                <td></td>
                <td>地区的容器</td>
            </tr>
            <tr>
                <td>provinceId</td>
                <td>number</td>
                <td></td>
                <td>省份ID</td>
            </tr>
            <tr>
                <td>cityId</td>
                <td>number</td>
                <td></td>
                <td>市ID</td>
            </tr>

            <tr>
                <td>townId</td>
                <td>number</td>
                <td></td>
                <td>地区ID</td>
            </tr>

            <tr>
                <td>template</td>
                <td>string</td>
                <td></td>
                <td>地区选择器的模版</td>
            </tr>
            </tbody>
        </table>

    </div>

    <h3>默认地区选择器的模版</h3>
    <div class="code section-block">
<div class="address-selector">
    <select name="province">
        <option value="-1">--请选择省份-</option>
    </select>
    <select name="city">
        <option value="-1">--请选择城市--</option></select>
    <select name="town">
        <option value="-1">--请选择地区--</option>
    </select>
</div>
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
                <td>getData</td>
                <td>获取地区选择器的值</td>
                <td>
                    <a href="javascript:;" class="show-method-options"></a>
                </td>
                <td>areaSelector.getData()<br/>
                    <pre>
                返回的数据
                {
                    province: {
                        id: 省ID,
                        text: 省名字
                    },
                    city: {
                        id: 市ID,
                        text: 市名字
                    },
                    town: {
                        id: 镇ID,
                        text: 镇名字
                    }
                }
                    </pre>
                </td>
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



