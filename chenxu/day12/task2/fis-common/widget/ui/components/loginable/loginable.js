/**
 * 提供可登录的基础组件
 *
 * todo css 单独引入进来，同时加入配置，允许用户自定义 UI by defcc
 *
 */

var Events = require('arale/events/1.1.0/events');
var cookie = require('arale/cookie/1.0.2/cookie');

var loading     = require('common:components/loading/loading');
var utils       = require('common:components/utils/utils');
var Captchable  = require('common:components/captchable/captchable');

var getUrl = utils.getUrl;
var getLoginUrl = utils.getLoginUrl;

var switchPhoneVerifyUrl = getUrl('u', 'cert/mobileverify');
var switchPhoneSendCode  = getUrl('u', 'cert/mobilesendcode');
var switchPhoneResend    = getUrl('u', 'cert/resendcode');
var sendCodeUrl          = getUrl('u', 'cert/SendCode');
var verifyUrl            = getUrl('u', "cert/vmobile");

var loginabletpl = require('./tpl.loginable.tmpl');

require('loginable.less');

function Loginable( opts ){
    this.root = $( opts.loginArea );
    this.logintpl = opts.logintpl || loginabletpl( {phone: opts.phone} );
    this.init();
}

(function(){

    /**
     *
     * 初始化登录区
     * 目前只是获得操作区的 UI 引用，并绑定相关的事件
     *
     * todo 从后端的接口获取当前用户的手机号码等信息，将手机号码操作区的 UI 进行封装
     *
     */
    this.init = function(){

        var self = this;
        var root = this.root;

        root.html( this.logintpl );

        root.find('input[name="exists_phone"]').click(function(){
            var val = $(this).val();
            $(".employ-dialog-modifyphone")[ val == 0 ? 'show' : 'hide' ]();
        });

        var inputPhone = root.find('input[name="modifyphone"]');

        var verifyBtn = root.find('a.employ-dialog-modifyphone-verify');

        var inputVerify = root.find('input[name="modifyphone-yzm"]');

        verifyBtn
            .on('click', function( evt ){
                if (  $(this).hasClass('disabled') || !checkInputPhone() ) {
                    return;
                }
                if ( cookie.get('userid') ) {
                    self.switchPhoneWhenLoggedin();
                } else {
                    self.registerPhoneIfNotLoggedin();
                }
            });

        inputPhone
            .on('keyup change', function(){
                checkInputPhone();
                self.trigger("login.phone.changed");
            });

        inputVerify.on('keyup change', function(){
            self.trigger("login.verify.changed");
        });

        this.on("login.verify.changed", function(){
            self.hideError('verify');
        });

        this.captchable = new Captchable({
            holder: root.find('.modifyphone-captcha-wrap'),
            captchaHTML: '<input placeholder="图片验证码" type="text" value="" name="catcha" role="captcha">\
                <a href="javascript:void(0);" role="refresh" class="refimg">\
                <img class="yzm" src="#" alt=""  role="captchaimg">\
                </a>\
                <input type="hidden" name="seed" role="seed"/>'
        });

        function checkInputPhone(){
            var inputPhoneVal = inputPhone.val();
            if ( !/^1\d{10}$/.test( inputPhoneVal ) ) {
                if( isNaN( inputPhoneVal ) || inputPhoneVal.length > 11 ){
                    self.showError('phone');
                }
                verifyBtn.addClass('disabled');
                return false;
            } else {
                self.hideError('phone');
                if ( !loading.isBusy( verifyBtn ) ) {
                    verifyBtn.removeClass('disabled');
                }
                return true;
            }
        }
    };

    this.login = function( callback ){
        var root = this.root;
        if (cookie.get("userid") || root.find("input[name=uid]").val()) {
            this.loginedUserSubmit( function(){
                callback();
            } );
        } else {
            this.mobileSubmit( function(){
                callback();
            } );
        }
    };

    this.loginedUserSubmit = function( cb ){
        // 处理 登录用户绑定新手机号
        var self = this;
        var root = this.root;

        var verifyPhoneUrl = switchPhoneVerifyUrl;
        var selectedPhone = root.find("input[name='exists_phone']:checked").val();
        if ( cookie.get('userid') && !root.find("input[name='exists_phone']").size() ) {
            verifyPhoneUrl = verifyUrl;
        }


        var phoneInput = root.find('input[name="modifyphone"]');

        var verifyCode = root.find('input[name="modifyphone-yzm"]').val();

        var data = "vid=" + root.find("input[name=vid]").val();
        if ( root.find("input[name=uid]").val() ) {
            data += "&user_id=" + root.find("input[name=uid]").val() + "&code=" + verifyCode;
            data += "&mobile=" + phoneInput.val();
        } else {
            data += "&code=" + verifyCode;
            data += "&mobile=" + phoneInput.val();
        }

        if ( typeof root.find("input[name='exists_phone']:checked").val() == 'undefined'
            || selectedPhone == "0" ) {
            $.ajax({
                url: verifyPhoneUrl,
                data: data,
                dataType: "jsonp",
                jsonp: "jsonpcallback",
                success: function (json) {
                    if (json.state == 1) {
                        // set phone
                        if ( !root.find("input[name=uid]").val() ) {
                            setPhone( phoneInput.val() );
                        }
                        self.hideError( 'verify' );
                        cb();
                    } else {
                        self.showError( 'verify', json.msg );
                    }
                }
            });
        } else {
            setPhone( selectedPhone );
            cb();
        }

        function setPhone( val ){
            root.find('input[name="phone"]').val( val );
        }
    };

    this.checkInput = function( showValidateMsg ){
        showValidateMsg = showValidateMsg || 0;
        var root = this.root;
        var phoneInput = root.find('input[name="modifyphone"]').val();
        var verifyCode = root.find('input[name="modifyphone-yzm"]').val();
        var selectedPhone = root.find("input[name='exists_phone']:checked").val();

        var rs = 1;

        if ( selectedPhone == '0' ) {
            if ( !phoneInput ) {
                showValidateMsg && this.showError('phone', '请输入手机号');
                rs = 0;
            } else if ( !verifyCode ) {
                showValidateMsg && this.showError('verify', '请输入验证码');
                rs = 0;
            }
        }
        return rs;
    };

    /**
     *
     * @param type:  phone (手机) 和 verify（手机验证码）
     * @param msg: 提示消息
     */
    this.showError = function( type, msg ){
        var root = this.root;

        if ( type == 'phone' ) {
            !msg && ( msg = '请输入正确的手机号' );
            if ( msg.indexOf('该手机号码已被注册') >= 0 ) {
                msg = '该手机号码已被注册，需用此号码重新登录';
            }
        } else {
            msg.indexOf('验证码错误') >= 0 && ( msg = '请输入正确验证码' );
        }

        root
            .find('.j-'+ type +'-error')
            .css('visibility', 'visible')
            .find('.j-error-tip')
            .html( msg );

        this.trigger('loginerror', msg);
    };

    this.hideError = function( type ){
        var root = this.root;

        root
            .find('.j-'+ type +'-error')
            .css('visibility', 'hidden');
    };

    this.mobileSubmit = function( cb ){

        var self = this;

        var root = this.root;

        var phoneInput = root.find('input[name="modifyphone"]');

        var catchaWrap = root.find('.j-catcha-wrap');

        var mobile = phoneInput.val().replace(/^\s*|\s$/, '');

        var verifyCode = root.find('input[name="modifyphone-yzm"]').val();

        var data = 'mobile=' + mobile + '&ticket=' + verifyCode;

        if($('.j-pubBtn-yzm').hasClass('disabled')) {
            ZDK.Tips("请输入正确的手机号码",3000,"error");
            return;
        }
        if( catchaWrap.length > 0 ){
            data += '&catcha=' + catchaWrap.find('input[name="catcha"]').val();
        }
        //提交注册，from提交
        $.ajax({
            url:      getLoginUrl( "/register/verify" ),
            data:     data,
            jsonp:    "jsonpcallback",
            dataType: "jsonp",
            success:  function(json){
                if(json.state == 1){
                    self.hideError( 'verify' );
                    root.find('input[name="phone"]').val($('input[name="modifyphone"]').val());
                    cb();
                }else{
                    self.showError( 'verify', json.msg );
                }
            },
            error:function(){
                return false;
            }
        });
    };

    this.switchPhoneWhenLoggedin = function(){
        var root = this.root;

        var phoneInput   = root.find('.employ-dialog-modifyphone-input');

        var phoneVal = phoneInput.val().replace(/^\s*|\s$/, '');

        var forceResend = 1;
        if ( cookie.get("userid") && root.find("input[name=exists_phone]").size() ) {
            sendCodeUrl = switchPhoneSendCode;
            forceResend = 0;
        }
        var sendBtn = root.find('a.employ-dialog-modifyphone-verify');
        this.registerSendPhoneCodeService( sendCodeUrl, phoneVal, sendBtn, forceResend );
    };

    this.registerSendPhoneCodeService = function(){
        var inputedPhone = [];
        var root = this.root;

        return function( sendCodeUrl, phoneVal, sendBtn, forceResend ){
            var self = this;
            var root = this.root;

            if ( !forceResend && $.inArray( phoneVal, inputedPhone ) >= 0 ) {
                sendCodeUrl = switchPhoneResend + "?vid=" + root.find('input[name=vid]').val();
            } else {
                sendCodeUrl += "?";
            }

            if ( root.find("input[name=uid]").val() ) {
                sendCodeUrl += "&user_id=" + root.find("input[name=uid]").val();
            }
            sendCodeUrl += "&mobile=" + phoneVal + "&pub=1&jsonpcallback=?";

            $.ajax({
                url: sendCodeUrl,
                cache: false,
                dataType: "jsonp",
                timeout: 6e4,
                success: function(data) {
                    if (data.state == -1) {
                        self.showError('phone', data.msg);
                    } else {
                        inputedPhone.push( phoneVal );
                        root.find('input[name=vid]').val(data.vid);
                        loading.start( sendBtn, {countingdown: 1} );
                    }
                },
                error: function(){}
            });
        }
    }();

    this.registerPhoneIfNotLoggedin = function(){

        var self = this;
        var root = self.root;
        var sendBtn = root.find('a.employ-dialog-modifyphone-verify');

        //是否注册限制
        $.ajax({
            url:      getLoginUrl("register/doapply"),
            jsonp:    "jsonpcallback",
            dataType: "jsonp",
            success:  function(json){
                if(json.state == 1){    //限制提示 ==1
                    self.showError('phone', '您涉嫌恶意注册，24小时内无法注册新账号, <a target="_blank" href="'+ getLoginUrl('register') +'">前往注册页面申诉</a>')
                } else{
                    checkMobileAvailable();
                }
            },
            error:function(){
                alert('您当前的网络遇到点问题');
                return false;
            }
        });

        function checkMobileAvailable(){
            var phoneInput = root.find('.employ-dialog-modifyphone-input');

            var csrfInput  = root.find('input[name="zbj_csrf_token"]');

            var catchaWrap = root.find('.j-catcha-wrap');

            var mobile = phoneInput.val().replace(/^\s*|\s$/, '');

            var Regurl = getUrl('u', "cert/chkun-type-2.html?mobile=" + mobile);

            $.ajax({
                url: Regurl,
                dataType: "jsonp",
                jsonp: "jsonpcallback",
                success: function ( json ) {
                    if ( json.state == 1 ) {
                        csrfInput.val( json.zbj_csrf_token);
                        var data = 'mobile=' + mobile + '&zbj_csrf_token=' + csrfInput.val();
                        var catchaRs = self.captchable.checkCaptcha( catchaWrap );

                        if ( !catchaRs.isValid ) {
                            return;
                        } else {
                            if ( catchaRs.value !== null ) {
                                var mobileSeedVal = catchaRs.data.seed;
                                data += '&seed=' + mobileSeedVal + '&catcha=' + catchaRs.data.captcha;
                            }
                        }
                        $.ajax({
                            url: getLoginUrl( "register/quick?send=1" ),
                            data: data,
                            jsonp: "jsonpcallback",
                            dataType: "jsonp",
                            success:  function(json){
                                if ( json.state == 1 ) {
                                    csrfInput.val( json.zbj_csrf_token);
                                    loading.start( sendBtn, { countingdown: 1 } );
                                } else {
                                    var msg = json.msg;
                                    if ( json.state == -1 ) {
                                        if ( json.type == 5 ) {
                                            self.captchable.show( catchaWrap );
                                        }
                                    }
                                    alert(msg, 5000, "error");
                                    self.captchable.refresh( catchaWrap );
                                }
                            }
                        });
                    } else if ( json.state == 2 ) {
                        if ( json.uinfo ) {
                            root.find("input[name=uid]").val( json.uinfo.user_id );
                        } else {
                            root.find("input[name=uid]").val( 250 );
                        }

                        // 用户处于未登录状态，并且该帐号已经绑定了手机，并且该手机通过了验证
                        sendVerifyCode();
                    } else if ( json.state == -2 ) {
                        // 用户处于未登录状态，并且该帐号已经绑定了手机，并且该手机未通过验证
                        alert('您的手机号没有验证成功，请您重新登录一下', 5000, 'error');

                        setTimeout(function(){
                            document.location.href = getLoginUrl('login/');
                        });

                    } else {
                        //错误提示
                        alert(json.msg,5000,'error');
                        return false;
                    }
                },
                error: function(err){
                    alert(err.msg,5000,'error');
                }
            });

            function sendVerifyCode(){
                var sendBtn = root.find('a.employ-dialog-modifyphone-verify');
                self.registerSendPhoneCodeService( switchPhoneSendCode, mobile, sendBtn );
            }
        }
    };

}).call( Loginable.prototype );

Events.mixTo( Loginable );

module.exports = Loginable;