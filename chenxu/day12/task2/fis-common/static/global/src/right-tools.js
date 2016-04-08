(function(){

if ( document.location.href.indexOf('https://') >= 0 ) {
    return;
}
var OrderService = require('common:components/order-service/order-service');
var formatStr = function( format, args ){
    return format.replace(/{%([^%]*)%}/g, function( str, match ){
        return args[match];
    });
};

function generateChatDom(){
    var defaultCfg = {
        'title': '在线咨询',
        'link': 'http://livechat.' + window.ZBJInfo.baseURI + '/LR/Chatpre.aspx?id=PCF83427900&skid=27',
        'className': ''
    };
    if ( window.ZBJInfo && window.ZBJInfo.chatCfg ) {
        $.extend( defaultCfg, window.ZBJInfo.chatCfg );
    }
    var chatHTML = '<div class="zbj-tools-top zbj-tools-livechat">' +
        '<a class="{%className%}" href="{%link%}" target="_blank" title="{%className%}">' +
        '<i class="zbj-ico zbj-ico-cs"></i>' +
        '</a>' +
        '</div>';

    chatHTML = formatStr( chatHTML, defaultCfg );
    return $(chatHTML).appendTo(document.body);
}


var rightToolBtm = '<div class="zbj-tools-bottom">' +
    '<div class="zbj-tools-app">' +
    '<a class="item-tools" href="http://app.' + window.ZBJInfo.baseURI + '/bz/" target="_blank">' +
    '<span class="item-ico"><i class="zbj-ico zbj-ico-mobile"></i></span>' +
    '<span class="item-txt">移动应用</span>' +
    '<div class="zbj-poptipnoc zbj-poptipnoc-left">' +
    '<div class="zbj-poptipnoc-arrow"><i></i></div>' +
    '<div class="zbj-poptipnoc-bd">' +
    '<div>' +
    '<div class="item-weixin"></div>' +
    '<p>官方微信<br/>轻松找人做事</p>' +
    '</div>' +
    '<div class="zbj-vline"></div>' +
    '<div>' +
    '<div class="item-mobile"></div>' +
    '<p style="color:#ff0000">八戒特惠<br/><span>手机专享5折抢</span></p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</a>' +
    '</div>' +
    '<div class="ui-tools-service">'+
    '<a href="javascript:;" class="item-tools">'+
    '<span class="item-ico"><i class="ui-ico ui-ico-service"></i></span>'+
    '<span class="item-txt">预约客服</span>'+
    '</a>'+
    '</div>'+
    '<div class="zbj-tools-gotop">' +
    '<a class="item-tools" href="javascript:;" title="返回顶部" id="j-goTop"><i class="icon-font">&#xe806;</i></a>' +
    '</div>' +
    '</div>';

// 不考虑IE6
$(function(){
    var $body = $('body');

    if ( window.ZBJInfo && window.ZBJInfo.isShowChatEntry ) {
        generateChatDom();
    }
    var $rightToolBtm = $(rightToolBtm).appendTo($body);
    if (window.fix_poptip_on_t5) {
        fix_poptip_on_t5($rightToolBtm);
    }
    var $goTop = $rightToolBtm.find('.zbj-tools-gotop').css('visibility', 'hidden');
    var goTopPig = $goTop.find(".zbj-ico-toppig").hide();
    var goTopIco = $goTop.find(".item-tools");
    function getScrollTop(){
        return $(window).scrollTop();
    }
    function setScrollTop(value){
        $(window).scrollTop(~~value);
    }
    $(window).scroll(function(){
        if(getScrollTop()>0){
            $goTop.css('visibility','visible');
        }else{
            $goTop.css('visibility','hidden');
        }
    });
    $rightToolBtm.delegate(".zbj-tools-gotop",'click',function(){
        $(window).trigger('startdocumentscroll');
        var timer=setInterval(scrollMove,5);
        function scrollMove(){
            setScrollTop(getScrollTop()/1.1);
            if(getScrollTop()<1){
                clearInterval(timer);
                $(window).trigger('enddocumentscroll');
            }
        }
    });
    $(".zbj-tools-app .item-tools").hover(function(){
            $(this).find(".zbj-poptipnoc").show();
        },function(){
            $(this).find(".zbj-poptipnoc").hide();
    });
    //预约服务
    var $service = $rightToolBtm.find(".ui-tools-service a");
    $service.on("click",function(){
        var service = new OrderService();
    });
});
})();