/*
 * 微信上的支付组件
 *
 * @opts
 * dataHolder 提交到收银台的所需数据存在一个表单里面,可以序列化相关数据
 * theme 组件最外层节点上加的className
 * rule 支持的支付方式， 如 rule: 'wechat jd'，同时显示 微信支付，京东支付
 * default 默认的支付方式 如设置 default: 'wechat' 则点击后直接以微信支付方式提交
 *
 * example:
 * $('#wechat-pay').on('click', function(e){
     var pay = new WechatPayPlat({
         dataHolder:'#orderSend',
         theme:'good',
         rule:'wechat'
     });
   });
 *
 * --------------------- 没想好，要不要加
 * triggers 触发源元素
 * triggerType 触发事件类型
 * */

require('./wechat-pay-new.less');
var wechatPayTpl = require('./wechat-pay-new.tmpl');

var UA = navigator.userAgent;
var payData;

function WechatPayPlat(opts) {
    if (!opts.dataHolder) {
        return;
    }

/*    //合并默认
    opts = $.extend({
        triggerType: 'click',
        activeIndex: 0,//默认高亮的索引
        activeTriggerClass: 'ui-tab-active',//默认导航的高亮样式
        element: null,//tab主体
        triggers: '.triggers',//触发源元素,一般为导航类
        contents: '.contents'//目标内容
    }, opts || {});*/
    this.target = opts.target || null;
    this.dataHolder = $(opts.dataHolder || null);
    this.theme = opts.theme || '';
    this.itemTpl = wechatPayTpl( {theme: this.theme});
    this.default = opts.default || null;
    this.rule = opts.rule || null;
    this.isDisible = false;
    this.price = opts.price || null;
    this.init();
    this.isCompleted = true;
    this.env = opts.env || 3
}

WechatPayPlat.prototype = {
    init: function () {
        var self = this;
        var holder = $('#J_payment-form').find('.pay-layer');
        self.render();
    },
    isWebviewSupported: function () {
        var wechatUA = UA.match(/MicroMessenger\/([\d\.]+)/i);
        if (!wechatUA) {
            alert('该支付方式仅支持在微信使用');
            return false;
        } else if (wechatUA[1] < '5.0') {
            alert('该支付方式仅支持微信5.0及以上版本');
            return false;
        } else {
            return true;
        }
    },
    render: function () {
        var self = this;
        $(self.target).append(self.itemTpl);
        $('#J_payment-form').find('.J_pay-layer').show();

    },
    paying: function (channelID) {
        var self = this;
        self.calcParams(channelID, function(){
            var mydata = self.dataHolder.serialize() + '&' + $('#J_payment-form').serialize() + '&isAjax=1';
            //alert('pay/to--data:----'+ mydata);
            //微信支付需要使用5.0以上版本
            $.ajax({
                url: self.getAjaxUrl() + '/payorder/to/',
                dataType: 'jsonp',
                jsonp: "jsoncallback",
                data: self.dataHolder.serialize() + '&' + $('#J_payment-form').serialize() + '&isAjax=1',
                success: function (evt) {
                    //alert(evt.state);
                    if (evt.state === 1) {
                        if (channelID == '65') {
                            self.createWXPayForm(evt.params);
                        }
                    }else{
                        alert('付款失败，请稍后重试...');
                        self.isCompleted = true;
                    }
                },
                error: function(xhr, status, error){
                    // console.log(err);
                    alert('连接失败，请稍后重试...' + error);
                    self.isCompleted = true;
                }
            });
        });
    },
    getAjaxUrl : function(){
        var self = this;
        if(self.env === 1){
            return 'http://pay.t6.zbj.com';
        }else if( self.env === 2){
            return 'http://pay.zhubajie.la';
        }else if( self.env === 3){
            return 'http://pay.'+window.ZBJInfo.baseURI;
        }
    },
    calcParams: function (channelID, cb) {
        var self = this;
        //计算提供给后端的变量
        var $wrap = $('#J_payment-form');

        $wrap.find('[name="bankcode"]').val('');
        $wrap.find('[name="balance_amount"]').val('0');
        $wrap.find('[name="ebank_amount"]').val(self.price);
        $wrap.find('[name="paychnid"]').val(channelID);
        $wrap.find('[name="coupon"]').val('');
        $wrap.find('[name="data"]').val(payData);
        $wrap.find('[name="bs_key"]').val('');
        $wrap.find('[name="code"]').val('');

        cb();
    },
    successGoto: function () {
        var self = this;
        $.ajax({
            url: self.getAjaxUrl() + '/payorder/checkstate',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            data: {'data': payData},
            success: function (evt) {
                if(evt.state == 1){
                    self.isCompleted = true;
                    location.href = evt.url;
                }else{
                    //支付失败
                    alert('支付失败，2秒后自动重试...');
                    setInterval(self.successGoto, 1000*2);
                }
            },
            error: function(){
                alert('连接失败，请稍后重试...');
                self.isCompleted = true;
            }
        });
    },
    createWXPayForm: function (params) {
        //alert('params:---' + JSON.stringify(params));
        var self = this;
        function onBridgeReady(params) {
            WeixinJSBridge.invoke('getBrandWCPayRequest', {
                    'appId': params.appId,     //公众号名称，由商户传入
                    'timeStamp': params.timeStamp.toString(),         //时间戳，自1970年以来的秒数
                    'nonceStr': params.nonceStr, //随机串
                    'package': params.package,
                    'signType': params.signType,         //微信签名方式:
                    'paySign': params.paySign //微信签名
                },
                function (res) {
                    //alert('res.err_msg:' + res.err_msg );
                    if (res.err_msg == 'get_brand_wcpay_request:ok') {
                        // alert('支付成功')
                        self.successGoto();
                    }else if(res.err_msg == 'get_brand_wcpay_request:cancel'){
                        alert('支付取消');
                        self.isCompleted = true;
                    }else if(res.err_msg == 'get_brand_wcpay_request:fail'){
                        alert('支付失败');
                        self.isCompleted = true;
                    }else{
                        alert('支付失败:' + res.err_msg);
                        self.isCompleted = true;
                    }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                }
            );
            
        }

        if (typeof WeixinJSBridge == 'undefined') {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                self.isCompleted = true;
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                self.isCompleted = true;
            }
        } else {
            onBridgeReady(params);
        }
    },
    action: function () {
        var self = this;
        if(!self.isCompleted) return;
        self.isCompleted = false;
        $.ajax({
            url: self.getAjaxUrl() + '/payorder/getPartnerTpl/',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            data: self.dataHolder.serialize(),
            success: function (evt) {
                if (evt.state === 1) {
                    var arrPayment = evt.channel.split(',');
                    payData = evt.data;
                    self.paying('65');
                } else {
                    alert(evt.msg);
                    self.isCompleted = true;
                }
            },
            error: function () {
                alert('当前网络异常，请稍后再试。');
                self.isCompleted = true;
            }
        });
    }
};

module.exports = WechatPayPlat;

