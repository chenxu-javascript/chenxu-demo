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

require('./wechat-pay.css');
var wechatPayTpl = require('./wechat-pay.tmpl');

var UA = navigator.userAgent;
var payUrl = 'http://pay.t6.zbj.com';
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

    this.dataHolder = $(opts.dataHolder || null);
    this.theme = opts.theme || '';
    this.itemTpl = wechatPayTpl( {theme: this.theme});
    this.default = opts.default || null;
    this.rule = opts.rule || null;
    this.isDisible = false;
    this.price = opts.price || null;
    this.init();
}

WechatPayPlat.prototype = {
    init: function () {
        var self = this;
        var holder = $('#J_payment-form').find('.pay-layer');

        if (holder.length) {
            holder.show();
        } else {
            if (self.isDefaultPaying()) {
            } else {
                self.render();
            }
        }
    },
    close: function () {
        $('#J_payment-form').find('.pay-layer').hide();
    },
    destroy: function () {
        $('#J_payment-form').remove();
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
    beforeShow: function () {
        var self = this;
        var holder = $('#J_payment-form').find('.pay-layer');

        self.initPayment();

        holder.on('click', '.pay-close', function () {
            self.close();
        });

        holder.on('click', '.wechat,.jd', function (e) {
            e.stopPropagation();
            e.preventDefault();
            if(!self.isDisible){
                
                self.disible(true);
                var payChnID = $(this).attr('data-paychnid');
                self.paying(payChnID);
            }else{
                alert('请稍后,正在连接...');
            }

        });
    },
    afterShow: function () {

    },
    render: function () {
        var self = this;

        $('body').append(self.itemTpl);

        self.beforeShow();

        $('#J_payment-form').find('.J_pay-layer').show();

        self.afterShow();
    },
    paymentHtml: function (className, channelID, text) {
        // return '<a href="#" class="' + className + '" data-paychnid="' + channelID + '">' + text + '</a>'
        return '<button class="' + className + '" data-paychnid="' + channelID + '">' + text + '</button>'
    },
    initPayment: function () {
        var self = this;
        $.ajax({
            url: payUrl + '/payorder/getPartnerTpl/',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            data: self.dataHolder.serialize(),
            success: function (evt) {
                if (evt.state === 1) {
                    var arrPayment = evt.channel.split(',');
                    payData = evt.data;

                    for (var i = 0; i < arrPayment.length; i++) {
                        switch (arrPayment[i]) {
                            case "65":
                                self.addPayment(self.paymentHtml('wechat', '65', '微信支付'));
                                break;
                            case "66":
                                self.addPayment(self.paymentHtml('jd', '66', '京东支付'));
                                break;
                            default:
                                break;
                        }
                    }
                } else {
                    alert(evt.msg);
                }
            },
            error: function () {
                alert('当前网络异常，请稍后再试。');
            }
        });
    },
    addPayment: function (dom) {
        $('#J_payment-wrap').append(dom);
    },
    isDefaultPaying: function(){
        var self = this;

        if (self.default === null) {
            return false;
        } else {
            switch (self.default) {
                case 'wechat':
                    self.doDefaultPaying(65);
                    return true;
                case 'jd':
                    self.doDefaultPaying(66);
                    return true;
                default:
                    return false;
            }
        }
    },
    doDefaultPaying: function (channelID) {
        var self = this;
        self.paying(channelID);
    },
    disible: function (state) {
        var self = this,
            btn = $('.wechat,.jd');
        if(state){
            self.isDisible = state;
            btn.addClass('disable');
        }else{
            self.isDisible = state;
            btn.removeClass('disable');
        }
    },
    paying: function (channelID) {
        var self = this;
        self.calcParams(channelID, function(){
            //微信支付需要使用5.0以上版本
            $.ajax({
                url: payUrl + '/payorder/to/',
                dataType: 'jsonp',
                jsonp: "jsoncallback",
                data: self.dataHolder.serialize() + '&' + $('#J_payment-form').serialize() + '&isAjax=1',
                success: function (evt) {
                    self.disible(false);
                    if (evt.state === 1) {
                        if (channelID == '65') {
                            self.createWXPayForm(evt.params);
                        }
                    }else{
                        alert('付款失败，请稍后重试...');
                    }
                },
                error: function(err){
                    console.log(err);
                    alert('连接失败，请稍后重试...');
                    self.disible(false);
                }
            });
        });

        
        
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
            url: payUrl + '/payorder/checkstate',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            data: {'data': payData},
            success: function (evt) {
                if(evt.state == 1){
                    location.href = evt.url;
                }else{
                    //支付失败
                }
            },
            error: function(){
                alert('连接失败，请稍后重试...');
            }
        });
    },
    createWXPayForm: function (params) {
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
                    // alert('res.err_msg:' + res.err_msg + '-----appid:' + params.appId);
                    if (res.err_msg == 'get_brand_wcpay_request:ok') {
                        // alert('支付成功')
                        self.successGoto();
                    }else if(res.err_msg == 'get_brand_wcpay_request:cancel'){
                        alert('支付取消')
                    }else if(res.err_msg == 'get_brand_wcpay_request:fail'){
                        alert('支付失败')
                    }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                }
            );
            
        }

        if (typeof WeixinJSBridge == 'undefined') {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            onBridgeReady(params);
        }
    }
};

module.exports = WechatPayPlat;

