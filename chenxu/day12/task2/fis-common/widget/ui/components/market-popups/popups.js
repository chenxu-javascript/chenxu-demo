var htmltpl = require('./tpl.popups.tmpl');
var submittpl = require('./tpl.popups-submit.tmpl');

var cookie = require('cookie');
var utils = require('common:components/utils/utils');
//var Dialog = require('arale/dialog/1.3.0/dialog');
var ConfirmBox = require('arale/dialog/1.3.0/confirmbox');
//var ConfirmBox = Dialog.ConfirmBox;

var log = require('common:components/log/log');

var firstPop = '';
var ctName = [];
var wrapper = null;
var _cover = null;

//referrer
var _referrer = '';
var _href = location.href;

//开始生效的时间
var startTimeSpan = 0;
//结束生效的时间
var stopTimeSpan = 0;

//新加的统计信息
var referrerInfo = require('common:components/refer-statistics/refer-statistics');
var unionData = '';

//搜索引擎站点
var regexpBD = /^(http:|https:)\/\/(www|bzclk)\.(baidu|google|haosou|sogou)\..*/i;
//前一个页面是猪八戒的页面，则不弹。
var regexp = /^(http:|https:)\/\/\w+\.(t5.zbj|t6.zbj|zbj|zhubajie)\..*/i;

//统计代码
var countData = {linkid: 10001807};

//阻止多次提交
var mulSubmit = false;

//四大类站点
/*
* 2015-07-28 开放首页弹窗
*
*/
var siteRegexp = /^(http|https):\/\/(task\.zhubajie\.com\/pub.*|task\.zhubajie\.la\/pub.*|union\.t6\.zbj\.com.*|union\.zhubajie\.com.*|www\.t6\.zbj\.com\/bzsj.*|www\.zhubajie\.com\/bzsj.*|youxuan\.zhubajie\.com\/fmcg.*|task\.t6\.zbj\.com\/pub.*|login\.zhubajie\.com\/.*|login\.t6\.zbj\.com\/.*|match\.zhubajie\.com\/.*|match\.t6\.zbj\.com\/.*|shop\.zhubajie\.com\/.*|shop\.t6\.zbj\.com\/.*|zt\.zhubajie\.com\/.*|zt\.zbj\.com\/.*|zt\.t6\.zbj\.com\/.*)$/i;
var siteRegxp2 =  /^(http|https):\/\/(task\.zhubajie\.com\/\d+\/.*|task\.zbj\.com\/\d+\/.*|task\.dev\.zbjdev\.com\/\d+\/.*|task\.t11\.zbjdev\.com\/\d+\/.*|task\.t13\.zbjdev\.com\/\d+\/.*|task\.stage\.zbjdev\.com\/\d+\/.*)$/i;
//校验弹出规则
function getCorrectRole(){
	//return _referrer && regexp.test(_referrer) && !siteRegexp.test(_href);
    //从搜索页面进入或者从CPS渠道进入时才弹窗
    _referrer = document.referrer;

	// 测试环境
	if(location.href.indexOf('t8.zbj.com') > -1 || location.href.indexOf('test.zbj.com') > -1){
		return true;
	}
    //console.log((siteRegexp.test(_href) + ':href:' + _href) + '&&' + (regexp.test(document.referrer) + ':from:' + _referrer));
    if(_href.indexOf('utm_medium=CPS')> -1|| regexpBD.test(_referrer) || (navigator.userAgent.indexOf("MSIE")!=-1 && _referrer.indexOf('baidu.com')>-1)){
        return !regexp.test(_referrer) && siteRegxp2.test(_href);
    }
    else{
        return false;
    }
};

//写入cookie
function writeCookie(){
	var _domain = document.domain;
	var _expires = 15;
	cookie.set('market-pop',1,{
		domain: _domain,
		path: '/',
		expires: 15
	});
};

//按时每天9点到18点生效
//function autoEffect() {
//	var nowTime = new Date();
//	var _year = nowTime.getFullYear();
//	var _month = nowTime.getMonth();
//	var _day = nowTime.getDate();
//	startTimeSpan = +new Date(_year,_month,_day,9,00,00);
//	stopTimeSpan = +new Date(_year,_month,_day,18,00,00);
//}
//autoEffect();

var Popups = {
	init: function(){
		//var _nowTime = +new Date; //当前时间戳
		//弹出规则baidu,google,haosou的跳转 &&  四大类
		if(getCorrectRole() && !cookie.get('userid') && !cookie.get('market-pop')){
            function play(that){
                firstPop = submittpl();
                $(firstPop).appendTo('body');
				require('common:components/market-popups/popups.less');
                wrapper = $('.chance-wrap');
                successWraper = $('.market-chance-success');
                //屏蔽营销QQ弹框
                $('#marketing-box').addClass('kill');
                log.sendLog(countData); //触发点击
                _cover = $('.cover');
                that.bindEvents();
                var lastCat = $(".task_abstract_bg li:last a").text();
                if(lastCat.length==0){
                	lastCat = $(".task_abstract_bg li:last").prev().find("a").text();
                }
                var pubKey = window.pub_key||lastCat;
                 //查询分类
			    $.ajax({
			        url: 'http://task.'+window.ZBJInfo.baseURI+'/api/getCatByWordss',
			        data:{kw:pubKey},
			        dataType: 'jsonp',
			        jsonp: "jsonpcallback",
			        success: function(rs) {
                        if(rs.data.currentData.current==1) {
                            $("#J-market-chance").val("我需要" + rs.data.currentData.title);
                            $("#dialog_ct_bid").val(rs.data.currentData.default_id);
                            window.pub_key = rs.data.currentData.default_name;
                        }
                        $("#market-select-combo").empty();
                        for (var i = 0; i < rs.data.commonData.length; i++) {
                            $("#market-select-combo").append('<label class="market-ui-checkbox"><span data-value="' + rs.data.commonData[i].default_id + '" class="market-circle"></span>' + rs.data.commonData[i].title + '<input type="checkbox" class="unvisible-checkbox"></label>');
                        }
			        }
			    });
            }
            function _play(that) {
                return function() {
                    play(that);
                }
            }
            setTimeout(_play(this),2000);

		};
	},
	bindEvents: function(){
		//var popCheckbox = $('.pop-checkbox')
		//checkbox check事件
		var _body = $('body');
		var selectSection = $('.select-section');
		wrapper.on('click', '.market-ui-checkbox', function(event){
			var that = $(this).children('.market-circle');
			if(!that.hasClass('checked') && $('.checked').length < 3){
				that.addClass('checked');
			}else if(that.hasClass('checked')){
				that.removeClass('checked');
			}
			return false;
		});

		//关闭选项
		wrapper.on('click','.market-select-delete', function(event){
			selectSection.hide();
			return false;
		});

		//弹出选择项 .select-item
		wrapper.on('click','.select-item,#J-market-chance', function(event){
			event.stopPropagation();
			selectSection.show();
			selectSection.find(".market-circle").removeClass("checked").each(function(){
				if("我需要"+$(this).parent().text()==$("#J-market-chance").val()){
					$(this).addClass("checked");	
				}
			});
			event.preventDefault();
		});

		// 选好按钮事件  .market-select-ok
		wrapper.on('click','.market-select-ok', function(event){
			ctName.length = 0;
			$('.checked').map(function(inx,el){
				ctName.push($(el).attr('data-value'));
			});
			$('#J-market-chance').val(ctName.join(';'));
			selectSection.hide();
			event.preventDefault();
		});

		//确定
		_body.on('click', '#J-choice-btn', function(event) {
			var describle = $('#J-market-chance').val();
			var mobile = $('#mobile');
			var name = $('#person').val();
            var txtMobileFlash = $('.chance-box .txt-mobile-flash');
            var txtFlash = $('.chance-box .txt-flash');

            if(!/^1[3|4|5|7|8]\d{9}$/i.test(mobile.val())){
                /*ConfirmBox.alert('<div style="color:red;font-size:16px;">请填写正确的电话号码！</div>');*/
                alert('请输入正确的手机号码');
                txtMobileFlash.show();
            }else if ('' === name) {
                /*ConfirmBox.alert('<div style="color:red;font-size:16px;">请填写联系人姓名！</div>');*/
                alert('请输入您的称呼');
                txtFlash.show();
            }else if(name.length > 5){
                /*ConfirmBox.alert('<div style="color:red;font-size:16px;">姓名长度应限制在5个字以内！</div>');*/
                alert('请输入正确长度的姓名');
            }else if(describle.length == 0){
                alert('请填写需求');
            }
            else{
            	var referStatistics = require('common:components/refer-statistics/refer-statistics');
                if(mulSubmit){
                    ConfirmBox.alert('<div style="color:red;font-size:16px;">上次请求还没完成，请不要重复提交！</div>');
                    return false;
                }
                mulSubmit = true;
                //获取请求地址
              /*  var host = document.location.hostname;
                var _url = '';
                if(host.indexOf('zhubajie.la')>-1){
                    _url = 'http://www.zhubajie.la/market/TaskCollect'
                }
                else if(host.indexOf('t6.zbj')>-1){
                    _url = 'http://www.t6.zbj.com/market/TaskCollect'
                }
                else{
                    _url = 'http://www.zhubajie.com/market/TaskCollect'
                }*/

                var _url = "http://task."+window.ZBJInfo.baseURI+"/api/pubchance";
				var _uData = referrerInfo.getStatisticsData("object");
				var postData = {};
				postData.ct_name = name;
				postData.ct_mobile = mobile.val();
				postData.ct_note = $("#J-market-chance").val();
				postData.ct_bid = $("#dialog_ct_bid").val();
				postData.ct_source = 2;
				if(_uData){
					$.extend(postData,_uData,{post_page: encodeURIComponent(window.location.href) + '#popup'});
				}
				else{
					$.extend(postData,{post_page: encodeURIComponent(window.location.href) + '#popup'});
				}
				$.ajax({
					url: _url,
					type: 'GET',
					dataType: 'json',
					data:postData
				})
				.done(function(res) {
					if(res.state){
						wrapper.remove();
						$(htmltpl()).appendTo('body');
						//writeCookie();
					}
					else{
						alert(res.msg);
					}
					mulSubmit = false;
				});
			}
			event.preventDefault();
			/* Act on the event */
		});
		//删除
        _body.on('click', '.market-delete', function(event){
            event.preventDefault();
            $('.market-chance-success').remove();
            _cover.remove();
            wrapper.remove();
        });

		//成功提交market-success-know
		_body.on('click', '.market-success-know', function(event) {
			$('.market-chance-success').remove();
			_cover.remove();
			event.preventDefault();
			/* Act on the event */
		});


		//空白处点击消失
		_body.on('click', '.cover', function(event) {
			wrapper.remove();
			_cover.remove();
			event.preventDefault();
			/* Act on the event */
		});

		//不在提示事件 .market-delete-cookie
		wrapper.on('click', '.market-delete-cookie', function(event) {
			wrapper.remove();
			_cover.remove();
			writeCookie();
			event.preventDefault();
			/* Act on the event */
		});

		//需求选项点击
		$("#market-select-combo").on("click","label",function(){
	        $("#J-market-chance").val("我需要"+$(this).text());
	        var ct_bid = $(this).find(".market-circle").attr("data-value");
	        pub_key = $(this).text();
	        $("#dialog_ct_bid").val(ct_bid);
	        $(".select-section").hide();
	        $('#watch-ct-bid').attr('ctbid', 1);
    	});

    	//点击弹窗其他部分收起需求下拉
    	wrapper.on("click",function(){
    		selectSection.hide();
    	});

    	selectSection.on("click",function(e){
    		e.stopPropagation();
    		e.preventDefault();
    	});
	}
}

module.exports = Popups; 