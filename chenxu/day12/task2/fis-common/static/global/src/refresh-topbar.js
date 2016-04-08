// TODO zbj.passport

var utils = require('common:components/utils/utils');

var $topBarCtn = $('#J-header-logic3');
var passportUrl = utils.getUrl('login');
var cookie = require('cookie');

var passport = {
    /***
     * 如果已登录，则渲染topbar
     * @method refreshTopbar
     * @example
     ZDK.passport.refreshTopbar();
     * */
    refreshTopbar: function () {
        var userInfo = this.getUserInfoByCookie();
        if (this._isTopBarlogined() || !userInfo.id) {
            return false;
        }
        var userUrl = 'http://u.' + ZBJInfo.baseURI;
        var userProfile = 'http://u.' + ZBJInfo.baseURI;
        var passportUrl = this.passportUrl;

        var topbarContent =

            '<div class="zbj-dropdown">'+
                '    <span href="#none" class="zbj-dropdown-hd">'+
                '        <a class="username" href="' + userProfile + '" title="'+ userInfo.brandName +'">' + userInfo.brandName + '<b><i class="iconfont icon-font">&#xe807;</i></b></a>'+
                '    </span>'+
                '    <div class="zbj-dropdown-menu nouserinfo">正在加载...</div>'+
                '</div>'+
                '<span class="split">|</span>'+
                '<div class="navusernews zbj-dropdown">'+
                '        <div id="j-msg-tip" class="zbj-poptipnoc zbj-poptipnoc-bottom">' +
                '        <div class="zbj-poptipnoc-arrow"><i></i></div>'+
                '        <div class="zbj-poptipnoc-bd">你有新的消息!</div>'+
                '    </div>'+
                '    <a href="#" class="zbj-dropdown-hd item-usernews">' +
                '        <i id="j-msg-icon" class="icon-font">&#xe81d;</i><b><i class="iconfont icon-font">&#xe807;</i></b></span>'+
                '    </a>'+
                '    <ul class="list-unstyled  fr zbj-dropdown-menu item-usernews-dropdown navmsg">'+
                '    <li><a id="j-msg-recommend" href="'+ userUrl +'/officialtaskinvite/snatch" target="_blank">官方推荐订单</a></li>'+
                '    <li><a id="j-msg-trade" href="'+ userUrl +'/notice/list-type-1" target="_blank">查看交易提醒</a></li>'+
                '    <li><a id="j-msg-system" href="'+ userUrl +'/notice/list-type-2" target="_blank">查看活动/其他通知</a></li>'+
                '    <li style="display:none;"><a id="j-msg-chengxin" href="'+ userUrl +'/notice/list-type-3" target="_blank">查看诚信委员通知</a></li>'+
                '    <li><a id="j-msg-reply" href="'+ userUrl +'/taskcomment/commentlist-state-1.html" target="_blank">查看评论</a></li>'+
                '    <li><a id="j-msg-logs" href="'+ userUrl +'/notice/chat" target="_blank">查看聊天记录</a></li>'+
                '    <li><a id="j-msg-bid" href="'+ userUrl +'/taskcomment/bids" target="_blank">查看参与</a></li>'+
                '    </ul>'+
                '</div>';

        $topBarCtn.addClass('zbj-header-logined').addClass('item-userinfo').html(topbarContent);
        var welomeContent = '欢迎来到猪八戒网' +
            '<a href="' + userProfile + '" class="user-name">' + userInfo.brandName + '</a>' +
            '<a href="' + passportUrl + '/login/dologout">退出</a>';
        $('#J-header-logic1').html(welomeContent);

        if( utils.isHTTPSPage() ){
            return;
        }

        // 显示我的店铺
        this.loadShopEntry(userInfo);
        // 显示上下班状态
        this.loadWorkState();

        var pass = this;
        $('.item-userinfo .zbj-dropdown').eq(0).one('mouseover',function() {
            $.ajax({
                url:"http://www."+ZBJInfo.baseURI+"/main/Ajaxuserinfo-uid-"+userInfo.id,
                type:"post",
                dataType:"jsonp",
                jsonp: "jsonpcallback",
                success:function(json){
                    $('.nouserinfo').html(json.replace(/^\s*"/,'').replace(/"\s*$/,'')).removeClass('.nouserinfo');
                    pass.loadBalance();
                }
            });
        });
    },

    /**
     * 如果用户已经开店，则显示我的店铺，否则显示免费开店
     */
    loadShopEntry : function(userInfo){
        var $elements = $('.j-zbj-shop-entry');
        var link = "http://shop." + ZBJInfo.baseURI + '/' + userInfo.id + '/';
        $.ajax({
            url:"http://www."+ZBJInfo.baseURI+"/main/Ajaxisfws-uid-"+ userInfo.id,
            type:"post",
            dataType:"jsonp",
            jsonp: "jsonpcallback",
            success:function(json){
                if(json.isfws){
                    $elements.html('我的店铺').attr('href', link);
                    // 用户已经开店，则不显示开店赚钱
                    $('.j-not-openshop').hide();
                } else {
                    //用户未开店
                    $('.j-has-openshop').hide();
                }
            }
        })

    },

    /*
    * 加载用户上下班状态
    * */
    loadWorkState : function(){
        var id = cookie.get('userid');
        var $element = $('#j-work-status');
        var $tpl = $('<span class="ui-work">' +
                      '<span class="ui-work-icon"><i class="ui-work-icon-bg"></i></span>' +
                      '<span class="ui-work-state">未上班</span>' +
                      '<span class="split">|</span>' +
                      '<a href="javascript:;" class="ui-work-act" data-state="{state}" data-uid="'+ id +'">上班</a>' +
                  '</span>');
        var $workState = $tpl.find('.ui-work-state');
        var $workAct = $tpl.find('.ui-work-act');
        var ajaxUrl = "http://u." + ZBJInfo.baseURI + "/duty/JudgeIsWorkState-uid-" + id;
        $.ajax({
            url : ajaxUrl,
            type : "post",
            dataType : "jsonp",
            jsonp : "jsonpcallback",
            success : function(json){
                if(json.success){
                    /*上班*/
                    if(json.data === 1){
                        $workState.html("工作中");
                        $workAct.attr('data-state', '2').html('下班');
                        $tpl.addClass('ui-work-on');
                    }else if(json.data === 2){
                        $workState.html("未上班");
                        $workAct.attr('data-state', '1').html('上班');
                        $tpl.addClass('ui-work-off');
                    }
                    $element.empty().append($tpl);
                }else{
                    $element.empty();
                }
            }
        })
    },

    /**
     * 加载用户的账户余额
     */
    loadBalance: function() {
        var balance_holder = $("#my-balance-holder,.my-balance-holder");
        var url = "http://task." + ZBJInfo.baseURI + "/api/MyBalance";
        if ( balance_holder.length > 0 ) {
            $.ajax({
                url: url,
                type: "get",
                dataType: 'jsonp',
                jsonp: 'jsonp',
                data: {pic:'1'},
                success: function(data) {
                    if (data.state == 1) {
                        balance_holder.html(data.amount);
                        if (data.amount>0) {
                            $("#withdraw-link").show();
                        }
                    }
                }
            });
        }
    },

    /***
     * 检查当前用户是否登陆
     * @method checkLogin
     * @param {Boolean} [showTips] 为true时在检测到未登录时会提示请先登录
     * @return {Boolean} true：已登录   false：未登录
     * @example
     if(ZDK.passport.checkLogin()){
            alert('您已经登录！');
        }
     * @example
     if(ZDK.passport.checkLogin()){
           alert('已登录');
        }else{
           alert('你妹的还没登录！');
        }
     * */


    checkLogin: function (showTips) {
        if (!cookie.get('userid')) {
            if (showTips) {
                //ZDK.Tips('请先登录!', 3 * 1000, 'error');
            }
            return false;
        }
        return true;
    },

    /***
     * 获取当前登录用户的信息
     * @method getUserInfoByCookie
     * @return {Object} userInfo: {id: 用户id, brandName: 用户品牌名, avatar: 用户头像的url}
     * @example
     var userInfo = ZDK.passport.getUserInfoByCookie();
     console.log(userInfo);
     * */
    getUserInfoByCookie: function () {
        var getCookie = cookie.get;
        var id = getCookie('userid');
        var userInfo = {
            id: id,
            brandName: getCookie('brandname') || getCookie('nickname'),
            avatar: utils.getUserAvatar( id )
        };
        return userInfo;
    },
    /***
     * @desc 判断topbar是否渲染过
     * */
    _isTopBarlogined: function () {
        return !!$('.zbj-header-logined').length;
    }
};
passport.refreshTopbar();
