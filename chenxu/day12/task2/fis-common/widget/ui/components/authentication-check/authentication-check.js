/*
 *快速实名认证弹窗
 */
var dialogTpl = require("./authentication-check.tpl");
require('./authentication-check.less');

function AuthenticationCheck(options) {
    this.options = options;
    this.init();
}
AuthenticationCheck.prototype = {
    init: function() {
        this.authWin = $(dialogTpl({
            baseUri: "http://" + ZBJInfo.baseURI
        }));
        this.authWin.css("marginTop", -this.authWin.height() / 2).show();
        $("<div class='ui-mask'></div>").height($("body").height()).show().appendTo("body").show();
        this.bindEvent();
        this.authWin.appendTo("body");
    },
    bindEvent: function() {
        var self = this;
        this.authWin.find(".win-authentication-close").click(function() {
            self.reset();
        });
        this.authWin.find(".btn-authentication-validate.pass").click(function() {
            $(".win-authentication-close").trigger("click");
        });
        //点击实名认证按钮
        this.authWin.find(".btn-authentication-validate").click(function() {
            var reg_id_card = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            var reg_name = /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5}){0,4}/;
            if ($(this).hasClass("disabled") || $(this).hasClass("loading")) {
                //等待中或者不可点击状态
                return;
            } else if ($(this).hasClass("pass")) {
                //验证已通过
                $(".win-authentication-close").trigger("click");
            } else {
                //开始验证
                var _this = $(this);
                $("#card_num .win-authentication-error").hide();
                $("#name .win-authentication-error").hide();
                var realname = self.authWin.find("#name input:text").val();
                realname = realname.replace(/\s+/g, ""); //去除空格
                var cardId = $("#card_num input:text").val(); //身份证号
                var nameWarn = $("#name .win-authentication-error");
                var cardIdWarn = $("#card_num .win-authentication-error");
                if (realname.length == 0) {
                    nameWarn.show().find("em").text("姓名不能为空！");
                    return;
                }
                else if (!reg_name.test(realname)) {
                    nameWarn.show().find("em").text("请正确输入您的真实姓名!");
                    return;
                } 
                else if(realname.length>20){
                    nameWarn.show().find("em").text("真实姓名最大长度不能超过20!");
                    return;
                }
                else if(!self._eqName({val:realname})){
                    nameWarn.show().find("em").text("相同字符不能大于2个!");
                    return;
                }
                else if(!self._notContain({val:realname})){
                    nameWarn.show().find("em").text("真实姓名不能包含特殊词汇，如：反动词汇、“测试”等字样!");
                    return;
                }
                else if(!self._specialWord({val:realname})){
                    nameWarn.show().find("em").text("真实姓名不能包含特殊字符!");
                    return;
                }
                else if (cardId.length == 0) {
                    cardIdWarn.show().find("em").text("身份证号不能为空！");
                    return;
                } else if (!reg_id_card.test(cardId)) {
                    cardIdWarn.show().find("em").text("身份证号格式有错误！");
                    return;
                } else if (self._getCurrentAge(cardId) < 18) {
                    cardIdWarn.show().find("em").text("年龄不足18周岁，不能认证!");
                    return;
                } else {
                    cardId = cardId.replace(/x/, "X");
                    $.ajax({
                        type: 'GET',
                        url: 'http://task.' + ZBJInfo.baseURI + '/payorder/realNameCertifySimple',
                        data: {
                            real_name: realname,
                            card_id: cardId
                        },
                        dataType: 'jsonp',
                        jsonp: 'jsonpcallback',
                        success: function(data) {
                            if (data.success) {
                                ZDK.module.btnloading.reset(_this);
                                $(".btn-authentication-validate").text("OK，3s后自动关闭").removeClass("loading").addClass("pass");
                                setTimeout(function() {
                                    $(".win-authentication-close").trigger("click");
                                }, 3000);
                            } else {
                                ZDK.module.btnloading.reset(_this);
                                $(".btn-authentication-validate").text("马上验证").removeClass("loading").addClass("disabled");
                                cardIdWarn.show().find("em").text(data.msg);
                                $(".win-authentication-row input:text").keyup(function() {
                                    $(".btn-authentication-validate").removeClass("disabled");
                                });
                            }
                        }
                    });
                }
                ZDK.module.btnloading({
                    obj: _this,
                    addClass: "loading",
                    txt: "验证中，只需几秒"
                });
            }
        });
    },
    reset: function() {
        this.authWin.remove();
        $(".ui-mask").remove();
    },
    _getCurrentAge: function(number) { //很据身份证号得到年龄
        var age = 0;
        if (number) {
            var IDNum = number;
            var today = new Date();
            var month = today.getMonth() + 1;
            var day = today.getDate();
            age = today.getFullYear() - IDNum.substring(6, 10) - 1;
            if (IDNum.substring(10, 12) < month || IDNum.substring(10, 12) == month && IDNum.substring(12, 14) <= day) {
                age++;
            }
        }
        return age;
    },
    _eqName: function(options) { //获取相同字符数
        var val = options.val;
        var array = val.split('');
        var length = options.length || 2;
        for (var k = 0; k < array.length; k++) {
            if (getEqLength(array[k], array) > length) {
                return false;
            }
        }
        return true;

        function getEqLength(val, array) {
            var length = 0;
            for (var i = 0; i < array.length; i++) {
                if (val == array[i]) {
                    length++;
                }
            }
            return length;
        }
    },
    _notContain: function(options) {
        var val = options.val;
        var array = ['公司', '测试', '共产党'];
        var currentContain = '';
        for (var k = 0; k < array.length; k++) {
            if (val.indexOf(array[k]) != -1) {
                currentContain = array[k];
                return false;
            }
        }
        return true;
    },
    _specialWord: function(options) {
        var specialReg = /[!@#$%^*~`！＠＃＄％＾＊～｀！@#￥%…*~！＠＃￥％…×～]/;
        return !specialReg.test(options.val);
    }
}
module.exports = AuthenticationCheck;