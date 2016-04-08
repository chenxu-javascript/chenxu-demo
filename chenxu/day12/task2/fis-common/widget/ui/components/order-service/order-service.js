var Dialog = require('arale/dialog/1.3.0/dialog');
var PopTip = require('common:components/poptip/poptip');
var Events = require('arale/events/1.1.0/events');
var contentTpl = require("common:components/order-service/tpl-order-service.tmpl");
var Uploader = require("common:components/uploader-qiniu/uploader-qiniu");
var loading = require('common:components/loading/loading');
require('common:components/order-service/order-service.less');
var msgTpl = require("common:components/order-service/msg.tmpl");

function OrderService(opt) {
    this.opt = opt;
    this.init();
}
OrderService.prototype = {
    init: function() {
        var dialog = this.orderDialog = new Dialog({
            width: 674,
            content: contentTpl(),
            classPrefix:"order-service"
        }).render();
        this.orderElement = dialog.element;
        dialog.show();
        this.initEvent();
        this.initDate(1); //初始化日期
        this.dayDom.trigger("change"); //初始化时间
        this.initUploader(); //初始化上传组件
        this.initPlaceHolder(); //初始化placeholder
    },
    initPlaceHolder: function() { //ie8 placeholder!!!!!!
        var isInputSupported = "placeholder" in document.createElement("input"); //是否支持placeholder
        var ele = this.orderElement;
        if (!isInputSupported) {
            ele.find("#phone,#des").css("color", "#a9a9a9");
            ele.find("#phone,#des").each(function() {
                $(this).val($(this).attr("placeholder"));
            });
            ele.find("#phone,#des").on("focus", function() {
                if ($(this).val() == $(this).attr("placeholder")) {
                    $(this).css("color", "#000");
                    $(this).val("");
                }
            }).on("blur", function() {
                if ($(this).val().length == 0) {
                    $(this).css("color", "#a9a9a9");
                    $(this).val($(this).attr("placeholder"));
                }
            });
        }
    },
    initEvent: function() {
        var me = this;
        var element = this.orderElement;
        this.dayDom = element.find("#selDay");
        this.timeDom = element.find("#selTime");
        this.roleDom = element.find(".role-sel");
        this.uploadWrap = element.find(".upload-wrap");
        this.winClose = element.find('.order-service-close');
        this.submitBtn = element.find("#orderSubmit");
        this.roleDom.on("click", function(e) {
            e.preventDefault();
            $(this).addClass("sel").siblings(".role-sel").removeClass("sel");
            me.initDate($(this).data("type"));
            var selDay = me.dayDom.find("option:selected");
            me.initTime($(this).data("type"), new Date(selDay.data("year"), selDay.data("month"), selDay.data("day")));
        });
        this.dayDom.on("change", function() {
            var selDay = $(this).find("option:selected");
            me.initTime(me.roleDom.filter(".sel").data("type"), new Date(selDay.data("year"), selDay.data("month"), selDay.data("day")));
        });
        this.winClose.on('click', function() {
            me.orderDialog.hide();
            element.parent().remove();
        });
        this.submitBtn.on("click", function(e) {
            e.stopPropagation();
            if (me.validateForm()) {
                loading.start($(this));
                me.submitData(me.packageData());
            }
        });
    },
    packageData: function() { //组装接口参数
        var data = new Object(),
            ele = this.orderElement;
        data.uType = ele.find(".role-sel.sel").data("type"); //用户类型
        data.mobile = ele.find("#phone").val(); //手机号码
        data.reqTime = this.dayDom.val() + " " + this.timeDom.val(); //预约时间
        data.question = ele.find("#des").val(); //问题描述
        var attachs = new Array();
        ele.find("#filelist li").each(function() { //附件
            var o = new Object();
            o.filename = $(this).data("name");
            o.url = $(this).data("url");
            attachs.push(o);
        });
        data.attachs = attachs;
        return data;
    },
    submitData: function(data) {
        var me = this;
        $.ajax({
            url: "http://task." + ZBJInfo.baseURI + "/api/subscribe",
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            data: data,
            success: function(json) {
                loading.end(me.submitBtn);
                if (json.state == 1) {
                    me.showTip("ok", "提交成功！", 3000, "", function() {
                        me.winClose.trigger("click");
                    });
                } else {
                    me.showTip("error", "提交失败！", false, json.msg);
                }
            }
        });
    },
    validateForm: function() { //校验表单
        var phone = this.orderElement.find("#phone"),
            des = this.orderElement.find("#des"),
            mobileReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$/;
        if (phone.val().length == 0) {
            PopTip.tip('手机号码不能为空！', phone, 'bellow',{theme: 'yellow'});
            return false;
        } else if (!mobileReg.test(phone.val())) {
            PopTip.tip('手机号码格式不正确！', phone, 'bellow',{theme: 'yellow'});
            return false;
        } else if (des.val().length == 0) {
            PopTip.tip('问题描述不能为空！', des, 'bellow',{theme: 'yellow'});
            return false;
        } else if (des.val().length > 400) {
            PopTip.tip('问题描述太长！', des, 'bellow',{theme: 'yellow'});
            return false;
        }
        return true;
    },
    initUploader: function() {
        var me = this;
        var uploadBtn = this.orderElement.find(".order-file");
        var uploader = this.uploader = new Uploader.baseUploader({
            element: me.uploadWrap,
            browse_button: uploadBtn,
            prevent_duplicates: true,
            max_file_size: "10240kb",
            acceptExt: [{
                title: "Image files",
                extensions: "jpg,jpeg,png,gif,bmp"
            }],
            count_limit: 3,
            belongToDomain: 'homesite',
            belongToSystem: 'task',
            tokenUrl: window.ZBJInfo.qiniuUploadTokenUrl + '/resource/'
        });
        uploader.on('add', function(uploader, files) {});
        uploader.on('uploaded', function(u, file, data) {
            var key = uploader.tokenObj[file.name][1];
            var url = uploader.getUrl(key).previewUrl
            var filename = file.name;
            if (filename.length > 20) {
                filename = filename.substr(0, 20) + "....";
            }
            $('<li data-pid="' + file.id + '" data-name="' + filename + '" data-url="' + url + '"><span>' + filename + '</span><a class="del" href="javascript:void(0)">删除</a></li>').appendTo(me.uploadWrap.find('#filelist'));
            uploadBtn.html('点击上传');
        });
        uploader.on('progress', function(uploader, file) {
            var val = file.percent;
            if (val >= 99) {
                val = 99;
            }
            var c = val + '%';
            uploadBtn.html('上传' + c);
        });
        uploader.on('error', function(uploader, error) {
            PopTip.tip(error.message, uploadBtn, 'bellow',{theme: 'yellow'});
        });
        //删除附件
        me.uploadWrap.on("click", ".del", function(e) {
            e.preventDefault();
            var $li = $(this).parent();
            var key = $li.attr("data-pid");
            uploader.uploader.removeFile(key);
            $li.remove();
        });
    },
    initDate: function(type) {
        var today = new Date(),
            dayDom = this.dayDom,
            now = new Date(),
            endDate = new Date(),
            tomorrow = new Date();
        if (type == 1) { //雇主
            endDate.setHours(22);
            endDate.setMinutes(45);
        } else if (type == 2) { //服务商
            endDate.setHours(17);
            endDate.setMinutes(45);
        }
        tomorrow.setDate(today.getDate() + 1);
        dayDom.empty();
        if (now.getTime() < endDate.getTime()) {
            dayDom.append("<option data-year='" + today.getFullYear() + "' data-month='" + today.getMonth() + "' data-day='" + today.getDate() + "' value='" + today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + "'>" + today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + "</option>");
        }
        dayDom.append("<option  data-year='" + tomorrow.getFullYear() + "' data-month='" + tomorrow.getMonth() + "' data-day='" + tomorrow.getDate() + "' value='" + tomorrow.getFullYear() + "-" + (tomorrow.getMonth() + 1) + "-" + tomorrow.getDate() + "'>" + tomorrow.getFullYear() + "-" + (tomorrow.getMonth() + 1) + "-" + tomorrow.getDate() + "</option>");
    },
    initTime: function(type, date) { //初始化时间框
        var now = new Date(),
            hour = now.getHours(),
            minute = now.getMinutes(),
            timeDom = this.timeDom,
            today = new Date(),
            tomorrow = new Date(),
            moment = [00, 15, 30, 45];
        tomorrow.setDate(today.getDate() + 1);
        timeDom.empty();
        if (type == 1 && date.getDate() == tomorrow.getDate()) { //雇主9点到23点，明天
            for (var h = 9; h <= 23; h++) {
                for (var i = 0; i < (h == 23 ? 1 : moment.length); i++) {
                    timeDom.append(this._formateTime(h, moment[i]));
                }
            }
        } else if (type == 2 && date.getDate() == tomorrow.getDate()) { //服务商9点到18点，明天
            for (var h = 9; h <= 18; h++) {
                for (var i = 0; i < (h == 18 ? 1 : moment.length); i++) {
                    timeDom.append(this._formateTime(h, moment[i]));
                }
            }
        } else if (type == 1 && date.getDate() == today.getDate()) { //雇主9点到23点，今天
            for (var h = (hour>=9?hour:9); h <= 23; h++) {
                for (var i = 0; i < (h == 23 ? 1 : moment.length); i++) {
                    var momentDate = new Date();
                    momentDate.setHours(h);
                    momentDate.setMinutes(moment[i]);
                    if (now.getTime() + 15 * 60 * 1000 < momentDate.getTime()) {
                        timeDom.append(this._formateTime(h, moment[i]));
                    }
                }
            }
        } else if (type == 2 && date.getDate() == today.getDate()) { //服务商9点到18点，今天
            for (var h = (hour>=9?hour:9); h <= 18; h++) {
                for (var i = 0; i < (h == 18 ? 1 : moment.length); i++) {
                    var momentDate = new Date();
                    momentDate.setHours(h);
                    momentDate.setMinutes(moment[i]);
                    if (now.getTime() + 15 * 60 * 1000 < momentDate.getTime()) {
                        timeDom.append(this._formateTime(h, moment[i]));
                    }
                }
            }
        }
    },
    _formateTime: function(h, m) {
        if (m == 0) {
            m = m + "0";
        }
        return "<option value='" + h + ":" + (m) + ":00" + "'>" + h + ":" + (m) + ":00" + "</option>"
    },
    showTip: function(type, con, time, error, callback) {
        var msgDialog = new Dialog({
            width: 206,
            content: msgTpl({
                type: type || "",
                con: con,
                error: error || ""
            }),
            confirmTpl: true,
            effect: "fade"
        }).render();
        var ele = msgDialog.element;
        ele.find(".ui-dialog-close").hide();
        ele.find(".btn-sure").on("click", function() {
            ele.find(".ui-dialog-close").trigger("click");
        });
        if (time) {
            setTimeout(function() {
                ele.parent().remove();
                callback && callback();
            }, time)
        }
        msgDialog.show();
    }
}
Events.mixTo(OrderService);
module.exports = OrderService;