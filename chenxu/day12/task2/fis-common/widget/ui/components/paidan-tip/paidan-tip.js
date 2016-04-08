/**
 * 派单提示符层
 *
 * @author defcc
 *
 */

// 原来是css，现在require less
require('./paidan-tip.less');

var mask = require('arale/overlay/1.1.4/mask');

// 改了下pandan-tip.tmpl的名字，不然会把原来的js覆盖掉
var paidanTipTpl = require('./paidan-tip-default.tmpl');
var paidanCountdownTpl = require('./paidan-tip-countdown.tmpl');
var paidanTipMissTpl = require('./paidan-tip-miss.tmpl');

var cookie = require('arale/cookie/1.0.2/cookie');
var userId = cookie.get('userid');

var utils = require('common:components/utils/utils');

var getUrl = utils.getUrl;

var officialtaskinviteUrl = getUrl('u', 'officialtaskinvite/snatch/');

// 动画兼容性问题，只有 chrome 才应用动画
var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isChrome = !!window.chrome && !isOpera;
var isFirefox = typeof InstallTrigger !== 'undefined';
var animationOn = isChrome || isFirefox;

var transitionEndEvt = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';

$(document.body).addClass( animationOn ? 'paidan-animation-env' : 'paidan-noanimation-env');

var paidanOrderTip = {
    _countdownTipElement: null,
    _mainTipElement: null,
    _timer: null,
    _mainTipHide: 0,
    _showed: 0,
    _mainTipClosed: 0,
    init: function() {
        var self = this;
        $(window).on('WebIM:notifier:paidan', function(evt, data) {
            processData(data );
        });

        if ( window.WebIM && WebIM.notifier ) {
            var data =  WebIM.notifier.getMsg( 'paidan' );
            data && processData(data );
        }

        function processData( data ){
            data.url = officialtaskinviteUrl;
            data.taskUrl = getUrl('task', data.taskId + '/');
            if ( data.statue ) {
                data.status = 'viewed';
            }
            if (data.status != 'close') {
                self.show(data);
                self._showed = 1;
            } else {
                if(data.type == 'miss'){
                    if ( self._missTipElement ) {
                        self._missTipElement.remove();
                        self._missTipElement = null;
                        mask.hide();
                    }
                }else{
                    self.hideTip();
                }
            }
        }

    },

    show: function( data ){
        var self = this;
        if ( data.status == 'notify' && document.location.href.indexOf('officialtaskinvite/snatch') < 0) {
            mask.set({opacity: 0.6}).show();
            this.showTip( data );
            this.showCountdownTip( data).hide();
        } else if( data.status == 'viewed' ) {
            if ( this._mainTipClosed ) {
                return;
            }
            if ( this._mainTipElement ) {
                this.hideMainTip(function(){
                    self.showCountdownTip( data ).show();
                });
            } else {
                this.showCountdownTip( data).show();
            }
        /*错过派单提示*/
        } else if( data.status == 'miss'){
            var now = new Date();
            var time = new Date( data.send_time*1000 );
            //如果不是当天就不谭
            if(now.getDate() != time.getDate()){
                return;
            }
            mask.set({opacity: 0.6}).show();
            this.showMissTip(data);
        }

        if ( !this._timer ) {
            this._countdown();
        }
    },
    showTip: function( data ){

        var self = this;

        var $tipElement = $(paidanTipTpl( {data: data} )).appendTo($('body')).show();

        this._mainTipElement = $tipElement;

        if ( animationOn ) {

            $tipElement.addClass('paidan-tip-wrap-show');

            $tipElement.one(transitionEndEvt, function(){
                var self = $(this);
                self.addClass('paidan-tip-wrap-move');
                setTimeout(function(){
                    self.addClass('paidan-tip-wrap-active');
                    setTimeout(function(){
                        $('.paidan-tip-cover-wrap').css({'z-index': 15, 'top': 10});
                    }, 100)
                }, 300);
            });

            $tipElement.find('.paidan-tip-msg').one(transitionEndEvt, function(){
                $('.paidan-tip-msg-close').fadeIn();
                $('.paidan-tip-msg-detail-wrap').fadeIn();
            });
        } else {
            $tipElement.addClass('paidan-tip-wrap-active');
        }

        if ( window.WebIM ) {
            window.WebIM.ui.sound.notice( true, 'http://cms.zbjimg.com/webim/25.mp3' );
        }

        $tipElement.find('.paidan-tip-msg-close, .paidan-tip-msg-detail').on('click', function(){
            closePaidanTip( $(this).attr('data-taskid') );
        });

        function closePaidanTip( taskId ) {
            var ajaxUrl = 'http://u.' + ZBJInfo.baseURI + '/officialtaskinvite/CancelNewReco';
            $.ajax({
                data: 'user_id='+ userId +'&task_id=' + taskId,
                url: ajaxUrl,
                dataType: "jsonp",
                jsonp: "jsonpcallback",
                success: function(json) {}
            });
            self.hideMainTip(function(){
                self.showCountdownTip().show();
            });

        }
    },

    showCountdownTip: function(data) {
        if ( !this._countdownTipElement ) {
            this._countdownTipElement = $(paidanCountdownTpl({data: data})).appendTo($('body'));
        }
        return this._countdownTipElement;
    },
    showMissTip: function(data){
        var missTipElement;
        if ( !this._missTipElement ) {
            this._missTipElement  = $(paidanTipMissTpl({data: data})).appendTo($('body'));
        }
        missTipElement = $(this._missTipElement);

        missTipElement.on('click', '.paidan-miss-close', function(){
            mask.hide();
            missTipElement.hide();
            closeAllMissTips(function(){
                location.reload();
            });
        })

        missTipElement.on('click', '.paidan-miss-history', function(){
            closeAllMissTips(function(){
                location.href = 'http://u.' + ZBJInfo.baseURI +  '/seller/Recommend';
            });
        })

        missTipElement.on('click', '.paidan-miss-rework', function(){
            var ajaxUrl = 'http://u.' + ZBJInfo.baseURI + '/duty/ModeDutyState-t-1-uid-' + userId;
            $.ajax({
                url: ajaxUrl,
                dataType: "jsonp",
                jsonp: "jsonpcallback",
                success: function(json) {
                    if (json.success) {
                        ZDK.Tips(json.data, 3000, 'success');
                        closeAllMissTips(function(){
                            location.reload();
                        });
                    } else {
                        ZDK.Tips(json.data, 3000, 'error');
                    }
                }
            })
        })

        //发送关闭弹窗请求,通知后端发送sockit事件
        function closeAllMissTips(callback){
            var ajaxUrl = 'http://task.' + ZBJInfo.baseURI + '/api/closeWebimNotice';
            $.ajax({
                url: ajaxUrl,
                dataType: "jsonp",
                jsonp: "jsonpcallback",
                success: function(json) {
                    if(callback){
                        callback();
                    }
                }
            });
        }

        return this._missTipElement;
    },
    hideMainTip: function( cb ){

        var self = this;

        var $mainTipElement = this._mainTipElement;

        if ( animationOn ) {
            $mainTipElement.find('.paidan-tip-msg-close, .paidan-tip-msg-detail-wrap').remove();

            $mainTipElement.find('.paidan-tip-msg').css({
                bottom: 100,
                height: 100
            });
            setTimeout(function(){
                $mainTipElement.find('.paidan-tip-cover-wrap').css({'top': 10, 'z-index': 25});

                $mainTipElement.removeClass('paidan-tip-wrap-show');
                setTimeout(function(){
                    $mainTipElement.removeClass('paidan-tip-wrap-active');
                    $mainTipElement.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(){
                        $mainTipElement.css({
                            left: $(window).width(),
                            top: '20%',
                            opacity:0
                        });
                        setTimeout(function(){
                            destroy( cb );
                        }, 300);
                    });
                }, 200)

            }, 500);
        } else {
            destroy( cb );
        }



        function destroy( cb ){
            mask.hide();
            self._mainTipElement && self._mainTipElement.remove();
            self._mainTipElement = null;
            self._mainTipClosed = 1;
            cb();
        }
    },
    hideTip: function() {
        if ( this._timer ) {
            clearInterval(this._timer);
            this._timer = null;
            mask.hide();
        }
        if ( this._mainTipElement ) {
            this._mainTipElement.remove();
            this._mainTipElement = null;
            mask.hide();
        }
        if ( this._countdownTipElement ) {
            this._countdownTipElement.remove();
            this._countdownTipElement = null;
            mask.hide();
        }
        this._mainTipClosed = 0;
    },
    _countdown: function( ) {
        var self = this;

        var timeWarp = $('#paidan-tip-countdown .j-paidan-tip-countdown, #j-paidan-tip-wrap .j-paidan-tip-countdown');
        if(!timeWarp.length) return;

        var leftTime = timeWarp.attr('data-time') * 1000;

        this._timer = setInterval(function() {
            var result = cutDown(leftTime);
            if (result) {
                timeWarp.html(result);
            } else {
                self._timer && clearInterval(self._timer);
                self.hideTip();
            }
        }, 1000);

        function cutDown(time) {
            var now = +new Date();
            var diff = time - now;
            if (diff > 0) {
                var minute = Math.floor(diff / (60 * 1000));
                var second = Math.floor((diff - minute * 60 * 1000) / 1000);
                minute = minute >= 10 ? minute : ('0' + minute);
                second = second >= 10 ? second : ('0' + second);
                return minute + ':' + second;
            } else {
                return false;
            }
        }
    }
};


module.exports = paidanOrderTip;