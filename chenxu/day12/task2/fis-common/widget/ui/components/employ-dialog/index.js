// fixme 在编译过程增加对前端模版的编译
// todo defcc 3.30 日完成 将字符串拼接转移到单独的模版中

require('./index.less');
// 雇佣服务商和购买服务
// type: witkey || service

var cookie      = require('arale/cookie/1.0.2/cookie');
var Events      = require('arale/events/1.1.0/events');
var ConfirmBox  = require('arale/dialog/1.3.0/confirmbox');

var Uploader    = require('common:components/uploader/index');
var loading     = require('common:components/loading/loading');
var Loginable   = require('common:components/loginable/loginable');
var Captchable  = require('common:components/captchable/captchable');

var utils       = require('common:components/utils/utils');

var employTpl = require('./employ.tmpl');

function Tip( msg ){
    alert( msg );
}

var employManager = {
    instances: {},
    getInstance: function( opts ){
        var key = opts.witkeyId + '-' + opts.serviceId;
        var obj = this.instances[ key ];
        if ( obj ) {
            obj.show();
            return obj;
        }
        return this.instances[ key ] = new EmployDialog( opts );
    }
};

function EmployDialog( opts ){
    this.type = opts.type || 'service';
    this.employId = opts.witkeyId || null;
    this.serviceId = opts.serviceId || null;
    this.dialog = null;
    this.dialogElement = null;
    this.employData = {};
    this.init();
}
EmployDialog.prototype = {
    init: function(){
        var self = this;
        var infoUrl = getWitkeyInfoUrl( this.employId );
        if ( this.type == 'service' ) {
            infoUrl = getServiceInfoUrl( this.employId, this.serviceId );
        }
        $.ajax({
            url: infoUrl,
            dataType: 'jsonp',
            jsonp: 'jsonpcallback',
            success: function( rs ){
                self.employData = rs.msg;
                self.showEmployDialog( rs.msg );
                self.initLoginable();
                self.initCaptchable();
                self.initUploader();
                if ( self.type == 'service' ) {
                    self.initCoupon();
                }
                self.trigger('inited');
            }
        });
    },

    initLoginable: function(){
        var self = this;
        this.loginable = new Loginable( {
            loginArea: this.dialogElement.find('.employ-dialog-contact'),
            phone: this.employData.phone
        });

        this.loginable.on('loginerror', function(){
            self.endSubmit();
        });
    },

    initCaptchable: function(){
        this.captchable = new Captchable( {
            holder: this.dialogElement.find('.employ-dialog-captcha')
        });
        if ( this.employData.need_captcha ) {
            this.captchable.show();
        }
    },

    elem: function( selector ){
        return this.dialogElement.find( selector );
    },

    beforeSubmit: function(){
        var rs = this.loginable.checkInput( true );
        if ( !rs ) {
            return rs;
        }
        var content = this.elem('textarea[name="content"]').val();
        if ( !content ) {
            Tip( "请输入您的需求" );
            rs = 0;
        }

        var amount = this.elem('input[name="amount"]').val();
        if ( rs && !amount ) {
            Tip( "请输入您的预算" );
            rs = 0;
        }

        return rs;
    },
    startSubmit: function(){
        loading.start(this.dialogElement.find('.ui-dialog-button-orange'));
    },
    endSubmit: function(){
        loading.end(this.dialogElement.find('.ui-dialog-button-orange'));
    },

    submitCallback: function( data ){
        if ( data.state == '1' ) {
            ZbjLog && ZbjLog({linkid: this.type == 'service' ? 'endbuyservice' :  'endemploy'});
            document.location.href = data.msg;
        } else {
            if ( data.state == -1 && data.msg == '请输入正确的验证码' ){
                this.captchable.show();
            }
            Tip( data.msg );
            this.endSubmit();
        }
    },
    registerSubmitCallbackFunc: function(){
        var self = this;
        var callbackName = 'submitCallback' + (+new Date());
        window[ callbackName ] = function( data ){
            self.submitCallback( data );
        };
        return callbackName;
    },
    showEmployDialog: function( data ){
        this.processData( data );
        var self = this;
        var dialog = new ConfirmBox({
            title: this.type == 'service' ? '购买服务' : '雇佣服务商',
            width: 900,
            message: employTpl({
                data: data,
                type: this.type,
                employId: this.employId
            }),
            cancelTpl: false,
            confirmTpl: '<a class="ui-dialog-button-orange" href="javascript:;">提&nbsp;&nbsp;交</a>',
            onConfirm: function() {
                if ( !self.beforeSubmit() ) {
                    return;
                }
                self.startSubmit();
                self.loginable.login( function(){
                    self.doSubmit();
                });
            }
        }).render();

        this.dialog = dialog;
        this.dialogElement = dialog.element;
        this.dialogElement.parent().addClass("employ-dialog");

        this.dialog.after('hide', function(){
            self.endSubmit();
        });
        this.show();
    },
    show: function(){
        this.dialog.show();
        this.trigger('ready');
    },
    processData: function( data ){
        var goldTip = {
            1: '银牌',
            2: '金牌',
            3: '钻石',
            4: '皇冠'
        };
        if ( this.type == 'witkey' ) {
            data.avatar = utils.getUserAvatar( this.employId, 'middle' );
            if ( data.userMeta.isGolden != '0') {
                data.userMeta.goldTip = goldTip[ data.userMeta.isGolden ];
            }
            if ( data.userMeta.level ) {
                data.userMeta.levelImg = utils.getUserLevelImg( data.userMeta.level );
            }
            data.userMeta.is_mall = data.is_mall;
        }
    },
    doSubmit: function(){
        var id = this.type == 'service' ? this.serviceId : this.employId;

        var callbackName = this.registerSubmitCallbackFunc();
        var submitUrl = getSubmitUrl( id, this.type, callbackName );

        this.dialogElement
            .find("form")
            .attr("action", submitUrl)
            .submit();

    },
    initUploader: function(){
        var uploadConfig = {
            uploadBtn: this.dialogElement.find(".employ-dialog-upload-btn"),
            uploadedWrapper: this.dialogElement.find('.employ-dialog-attachment ul'),
            fileInput: this.dialogElement.find('input[name="affix"]'),
            prevent_duplicates: 1,
            count_limit: 5,
            extra_params: 'key=1'
        };
        var uploader = new Uploader( uploadConfig );
        uploader.on('overflow', function( num ){
            Tip('最多上传'+ num +'个附件');
        });
    },
    initCoupon: function(){
        var self = this;
        var couponOfferText = this.dialogElement.find('.service-reward-coupon');
        var couponFinal = this.dialogElement.find('.service-reward-total input');
        var couponWrap = this.dialogElement.find('.service-reward-coupon');
        this.dialogElement.find('input[name="coupon"]').click(function(){
            if ( $(this).attr('disabled') ) {
                return false;
            }
            var offer = $(this).attr('data-offer');
            couponOfferText.html( offer );
            couponFinal.val( self.employData.servicePrice - offer );
            couponWrap.show();
        });
    }
};

Events.mixTo( EmployDialog );

module.exports = employManager;

function getUrl( domain, path ){
    var url = 'http';
    if ( domain == 'login' ) {
        url += 's';
    }
    return url + "://" + domain + "." + window.ZBJInfo.baseURI + '/' + path;
}

function getSubmitUrl( id, type, callbackName ){
    var url = getUrl('task', 'buy/dindex-'+ (type == 'service' ? 'sid' : 'uid' ) + '-' + id +'.html');
    return url + '?iframe=1&domain='+ document.domain +'&jsonpcallback=' + callbackName;
}

function getWitkeyInfoUrl( id ){
    return getUrl('task', 'buy/dindex-uid-' + id +'.html');
}

function getServiceInfoUrl( witkeyId, serviceId ){
    return getUrl('shop', witkeyId + '/dialog-sid-'+ serviceId +'.html');
}