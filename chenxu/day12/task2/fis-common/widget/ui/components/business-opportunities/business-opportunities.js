/**
 *
 * 商机信息完善弹框
 *
 * 8.8 by lipeng
 *
 * options 组件调用参数 ct_mobile: 手机号; ct_name: 称呼; ct_note: 关键字; cat1: 一级类目; cat2: 二级类目; cat3: 三级类目
 * ct_position: 如果一个页面有多个机会入口，标注是哪个位置的入口进来的
 *
 */
var cookie = require('arale/cookie/1.0.2/cookie');
var Events = require('arale/events/1.1.0/events');
var Dialog = require('arale/dialog/1.3.0/confirmbox');


require('./opportunities.less');

var Loginable = require('common:components/loginable/loginable');
var loading = require('common:components/loading/loading');
var referStatistics = require('common:components/refer-statistics/refer-statistics');
var Poptip = require('common:components/poptip/poptip');
var dialogMsg = require("./tpl.msg.tmpl");

require('jquery/mousewheel/jquery.mousewheel.min');
require('jquery/mCustomeScrollbar/jquery.mCustomScrollbar');
require('jquery/mCustomeScrollbar/jquery.mCustomScrollbar.css');

function BusinessOpport(options) {
    this.options = options;
    this.init();
}
(function() {
    /**
     *
     * 初始化商机信息完善弹框
     * 获得初始化弹框，并绑定相关事件
     */
    this.init = function() {
        //this.generateOpport();
        this.initDialog();
    };
    /**
     *初始化商机弹窗
     */
    this.initDialog = function() {
        var self = this,
            data = this.options;
        self.opportDialog = new Dialog({
            width: 690,
            message: dialogMsg,
            confirmTpl: false,
            cancelTpl: false
        }).render();
        self.opportElement = self.opportDialog.element;
        self.opportElement.parent().addClass("business-opportunities");
        self.phoneState = self.opportElement.find('.complete-business-info').attr('data-state');
        self.$category1 = self.opportElement.find('#category1');
        self.$category2 = self.opportElement.find('#category2');
        self.$categoryEdit = self.opportElement.find('#category-edit');
        self.$categoryCon = self.opportElement.find('#category-content');
        self.loadCategory();
        self.initLoginable();
        self.$notperfect = self.opportElement.find('.not-perfect');
        self.$yanzhenma = self.opportElement.find('.j-pubBtn-yzm');
        self.$winClose = self.opportElement.find('.ui-win-close');
        self.$confirmBtn = self.opportElement.find('#confirm-btn');
        self.$submitNow = self.opportElement.find('#submit-now');
        self.$saveBusiness = self.opportElement.find('#save-business-info');
        self.$key = self.opportElement.find('input[name="key"]');
        self.$textarea = self.opportElement.find('textarea[name="intro"]');
        self.$mobilevercode = self.opportElement.find('#j-mobilevercode');
        self.$category1DropDown = self.$category1.find(".category-dropDown");
        self.$category1Input = self.$category1.find(".select-input");
        self.$category2DropDown = self.$category2.find(".category-dropDown");
        self.$category2Input = self.$category2.find(".select-input");
        self.hadEdit = false;
        // 弹框元素绑定事件
        self.$categoryEdit.on('click', function() {
            self.$categoryCon.hide();
            self.$categoryEdit.hide();
            self.$category1.show();
            self.$category2.show();
            self.$category1.attr('value', -1);
            self.$category2.attr('value', -1);
        });
        $('.select-input').on('click', function(event) {
            $(this).siblings('.category-dropDown').addClass('show');
            $(this).siblings('.j-arrow').addClass('up');
        });
        $('.j-arrow').on('click', function(){
            $(this).toggleClass('up');
            $(this).siblings('.category-dropDown').toggleClass('show');
        })
        $('.category-dropDown').on('click', 'li', function(){
            var _this = $(this);
            var parentNode = _this.closest('.category-dropDown')
            var tit = _this.html();

            _this.closest('.category').attr('value', _this.attr('value')).find('.select-input').val(tit);
            parentNode.find('.selected').removeClass('selected');
            _this.addClass('selected');
            parentNode.removeClass('show');
            _this.closest('.category').find('.j-arrow').removeClass('up');

            if(parentNode.closest('.category').hasClass('category1')){
                var id = _this.attr('value');
                self.loadCatSuc(id, -1);
            }
            self.hadEdit = true;
        });
        $(document).click(function(event){
            if(!$(event.target).closest('.category').length){
                $('.category-dropDown').removeClass('show');
                $('.j-arrow').removeClass('up');
            }
        })
        self.$winClose.on('click', function() {
            if ($('#business-info').find("input[name=bs_to_ct_id]").val().length == 0){
                self.generateOpport(successTip);
            }
            self.opportDialog.hide();
            self.opportElement.parent().remove();
            $(window).unbind('beforeunload');
            window.onbeforeunload = null; 
        });
        self.$notperfect && self.$notperfect.on('click', function() {
            if ($('#business-info').find("input[name=bs_to_ct_id]").val().length == 0){
                self.generateOpport(successTip);
            }
            self.opportDialog.hide();
            self.opportElement.parent().remove();
            $(window).unbind('beforeunload');
            window.onbeforeunload = null;
        });
        self.$confirmBtn && self.$confirmBtn.on('click', function() {
            self.opportDialog.hide();
            self.opportElement.parent().remove();
        });
        $(window).bind('beforeunload',function(){
        	self.opportDialog.hide();
            self.opportElement.parent().remove();
            self.generateOpport();
            $(window).unbind('beforeunload');
        	return false;
        });

        var showError = function(){
            var errorTip;

            return function(){
                if ( errorTip ) {
                    errorTip.hide();
                }
                errorTip = Poptip.tip.apply(null, arguments);
            }
        }();
        self.$submitNow && self.$submitNow.on('click', function() {
            self.$phone = self.opportElement.find('input[name="modifyphone-yzm"]');

            if (self.$category1.attr("value") == -1) {
                showError('需求类目不能为空', self.$category1, 'bellow', {theme: 'yellow'});
                return false;
            } else if (self.$category2.attr("value") == -1) {
                showError('需求类目不能为空', self.$category2, 'bellow', {theme: 'yellow'});
                return false;

            } else if (!$.trim(self.$key.val())) {
                showError('需求标题不能为空', self.$key, 'bellow', {theme: 'yellow'});
                return false;

            } else if (!$.trim(self.$textarea.val())) {
                showError('具体要求不能为空', self.$textarea, 'bellow', {theme: 'yellow'});
                return false;
            } else if (!cookie.get('userid') || self.phoneState == 0) {
                if (!$.trim(self.$phone.val())) {
                    showError('短信验证码不能为空', self.$phone, 'bellow', {theme: 'yellow'});
                    return false;
                }
            }
            var $businessForm = $('#business-info');

            function _success(json) {
                var callback = function() {
                    self.$submitNow.css('display', 'none');
                    self.$saveBusiness.css('display', 'inline-block');

                    loading.start(self.$saveBusiness);
                    $('#business-info').submit();
                };
                if (json.state != 0) {
                    $businessForm.find("input[name=bs_to_ct_id]").val(json.msg);
                    // 获取统计参数
                    var data = referStatistics.getStatisticsData();
                    data = data + '&pub_page=' + encodeURIComponent(window.location.href);
                    $businessForm.append('<input type="hidden" name="union" value="' + data + '">');
                    $businessForm.attr('action', 'http://task.' + window.ZBJInfo.baseURI + '/pub/step2-category-' + self.$category2.attr("value")+'?frombox=1');
                    self.loginable.login(callback);
                }
            }
            $(window).unbind('beforeunload');
            if ($businessForm.find("input[name=bs_to_ct_id]").val().length == 0) { //未生成商机
                self.generateOpport(_success, true);
            } else { //已生成商机，直接执行表单提交
                self.loginable.login(function() {
                    self.$submitNow.css('display', 'none');
                    self.$saveBusiness.css('display', 'inline-block');
                    loading.start(self.$saveBusiness);
                    $('#business-info').submit();
                });
            }
        });

        // 提醒弹框
        function successTip(json){
            if (json.state == 2){
                new Dialog({
                    title : '提醒',
                    message : "我们已收到您的需求，请勿重复提交。专业顾问会尽快联系您，请保持手机畅通，谢谢。",
                    cancelTpl : null,
                    width: 300,
                    onConfirm: function() {
                        this.hide();
                    }
                }).show();
            }
        }
    };
    // 初始化短信验证手机号
    this.initLoginable = function() {
        var self = this;
        if (cookie.get("userid")) {
            $.ajax({
                type: 'GET',
                url: 'http://task.' + window.ZBJInfo.baseURI + '/api/gettelbyuserid',
                dataType: 'jsonp',
                jsonp: 'jsonpcallback',
                success: function(re){
                    if( re.state && re.msg.tel == self.options.ct_mobile){
                        self.phoneState = 1;
                    }
                    self.loginable = new Loginable({
                        loginArea: $('.employ-contact'),
                        phone: {
                            phonenum: self.options.ct_mobile,
                            isverified: self.phoneState
                        }
                    });
                    if (self.phoneState == 1 ) {
                        self.loginable.root.addClass('has-verified');
                    } else {
                        self.loginable.root.addClass('not-verified');
                        self.loginable.root.find('input[name="modifyphone"]').val(self.options.ct_mobile);
                        self.loginable.root.find('.employ-dialog-modifyphone-verify').removeClass('disabled');
                        self.loginable.root.find('input[name="exists_phone"]').trigger('click');
                    }
                    self.loginable.on('loginerror', function(msg) {
                        alert(msg, 2500, 'error');
                    })
                }   
            });
        } else {
            self.loginable = new Loginable({
                loginArea: $('.employ-contact'),
                phone: {},
                url: window.location.href,
                userIntention: 1,
                wayType: 13
            });
            self.loginable.root.find('input[name="phone"]').val(self.options.ct_mobile);
            self.loginable.root.find('input[name="modifyphone"]').val(self.options.ct_mobile);
            self.loginable.root.find('.employ-dialog-modifyphone-verify').removeClass('disabled');
            self.loginable.on('loginerror', function(msg) {
                alert(msg, 2500, 'error');
            })
        }
        
    };
    // 生成商机
    this.generateOpport = function(callback, isSubmit) {
        var self = this,
            data = self.options,
            category = this.$category2.find('.selected');

            if( isSubmit &&  self.hadEdit ){
                data.ct_note = category.html();
                data.pub_key = category.html();
                data.cat3 = category.attr('value');
            }
            seajs.use('common:components/refer-statistics/refer-statistics', function(referStatistics) {
                var statisticsData = referStatistics.getStatisticsData('object'),
                    post_page = data.ct_position ? (window.location.href + '#' + data.ct_position) : window.location.href;
                $.extend(data, statisticsData, {
                    post_page: post_page
                });
                $.ajax({
                    type: 'GET',
                    url: 'http://task.' + window.ZBJInfo.baseURI + '/api/pubchance',
                    data: data,
                    dataType: 'jsonp',
                    jsonp: 'jsonpcallback',
                    success: callback
                });
            });
    };
    // 加载需求类目
    this.loadCategory = function() {
        var self = this,
            cateAttr1 = [];
        $.ajax({
            type: 'GET',
            url: 'http://task.' + window.ZBJInfo.baseURI + '/api/pubcategory',
            dataType: 'jsonp',
            jsonp: 'jsonpcallback',
            success: function(json) {
                if (json.state == 1) {
                    self.pub_category = json.msg;
                    self.$category1Input.val('请选择')
                    self.$category1.attr("value", -1);
                    $.each(self.pub_category, function(index, item) {
                        cateAttr1.push('<li value="' + item.virtual_id + '">' + item.virtual_name + '</li>');
                    });
                    self.$category1DropDown.append(cateAttr1.join(''));
                    self.opportDialog.show();
                    if (!self.options.pub_id1 || !self.options.pub_id2) {
                        if (typeof self.options.pub_key != 'undefined' && typeof self.pub_category != 'undefined') {
                            $.ajax({
                                url: 'http://task.' + window.ZBJInfo.baseURI + '/pub/SearchCategory',
                                data: {
                                    key: self.options.pub_key, //该值为全局变量，在页面中声明了window.pub_key,
                                    cattypefilter: 'pub'
                                },
                                dataType: 'jsonp',
                                jsonp: 'jsonpcallback',
                                success: function(res) {
                                    res = typeof res === 'object' ? res : $.parseJSON(res);
                                    if (res.state === 1) {
                                        var _data = res.msg[0] || {};
                                        self.options.callback && self.options.callback();
                                        self.loadCatSuc(_data['virtual2id'], _data['virtual_id']);
                                    } else {
                                        self.$category1Input.val("请选择");
                                        self.$category1.attr('value', -1);
                                        self.$category2Input.val("请选择");
                                        self.$category2.attr('value', -1);
                                    }
                                }
                            });
                        }
                    } else {
                        self.loadCatSuc(self.options.pub_id1, self.options.pub_id2);
                    }
                    if (!self.options.pub_key) {
                        self.$categoryCon.hide();
                        self.$categoryEdit.hide();
                        self.$category1.show();
                        self.$category2.show();
                    }
                    self.changeScrollbar();
                }
            }
        })
    };
    // 加载次级类目
    this.loadCatSuc = function(virtual2id, selectedVal) {
        var result = [];
        var self = this;

        self.$category1.attr('value', -1);
        self.$category2.attr('value', -1);

        self.$category1.find('li').each(function(index, el) {
            if($(this).attr("value") == virtual2id){
                $(this).addClass('selected');
                self.$category1.attr('value', virtual2id);
                return;
            }
        });
        for (var i = 0, len = self.pub_category.length; i < len; i++) {
            if (self.pub_category[i].virtual_id == virtual2id) {
                result.push(this.pub_category[i]);
                self.$category2.attr('value', selectedVal);
                break;
            }
        }
        result = result.length ? result[0].list : result;
        self.$category2Input.val("请选择");
        var selectHTML = this.buildSelectOptions(result, '请选择', selectedVal);
        if(self.$category2DropDown.find(".mCSB_container").length){
            self.$category2DropDown.find(".mCSB_container").html(selectHTML);
        }else{
            self.$category2DropDown.html(selectHTML);
        }
        if ((self.$category1.attr('value') == -1) || (self.$category2.attr('value') == -1)) {
            self.$categoryCon.hide();
            self.$categoryEdit.hide();
            self.$category1.show();
            self.$category2.show();
        }
        self.$categoryCon.text((this.$category1.find('.selected').html()|| "请选择") + '、' + (this.$category2.find('.selected').html()|| "请选择"));
    };
    // 下拉选择类目
    this.buildSelectOptions = function(data, defaultTips, selected) {
        var str="";
        $.each(data, function(idx, val) {
            str += '<li value="' + val.virtual_id + '" ' + (selected == val.virtual_id ? 'class="selected"' : "") + '>' + val.virtual_name + '</li>';
        });
        return str;
    };
    this.changeScrollbar = function (){
        var items = $('.category-dropDown');
        if(items.length) {
            items.mCustomScrollbar({
                theme:"rounded-dots-dark",
                scrollInertia:400
            });
        }
    };
}).call(BusinessOpport.prototype);
Events.mixTo(BusinessOpport);
module.exports = BusinessOpport;