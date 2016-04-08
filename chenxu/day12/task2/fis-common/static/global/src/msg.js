var cookie = require('cookie');
var msgRequestURI = 'http://u.' + ZBJInfo.baseURI + '/notice/getcount?jsonpcallback=?';
var msgHandle = {
    requestTime: 200,
    intervalTime: 30 * 60 * 1000,
    init: function(){
        if ( /https/.test(window.location.href) ) {
            return false;
        }
        if ( !cookie.get('userid') ) {
            return;
        }
        this.start();
        this.bindEvent();
    },
    start: function(){
        var self = this;
        setTimeout(function(){
            self.sendRequest();
        }, self.requestTime);
    },
    sendRequest: function(){
        var self = this;
        $.getJSON(msgRequestURI, function(json){
            if (json) {
                self.updateMsgIndicator(json);
            }
        });
    },
    updateMsgIndicator: function( data ) {
        var totalMsg = 0;
        for ( var p in data ) {
            if ( data.hasOwnProperty(p) ) {
                var msgNum = data[p]*1;
                var msgItem = $('#j-msg-' + p);
                // 后台返回的数据中居然有负值!!!
                if (msgNum > 0) {
                    totalMsg += msgNum;
                }

                if ( msgNum > 0 ) {
                    msgItem.find('.highlight').remove();
                    msgItem.prepend(' <span class="highlight">' + msgNum + '</span>');
                    if (p=='chengxin') {
                        msgItem.parent('li').show();
                    }
                } else {
                    msgItem.find('span').remove();
                    if (p=='chengxin') {
                        msgItem.parent('li').hide();
                    }
                }

            }
        }
        this.setBlinkIcon(totalMsg > 0);
        this.requestTime = this.intervalTime;
        this.start();
    },
    setBlinkIcon: function (blink){
        if (blink) {
            if (!this._blinkTimer) {
                this._blinkTimer = setInterval(function (){
                    $('#j-msg-icon').css('visibility', 'hidden');
                    setTimeout(function (){
                        $('#j-msg-icon').css('visibility', 'visible');
                    }, 400);
                }, 1000);
                $('#j-msg-tip').show();
                var self = this;
                $('.navusernews').one('mouseover', function () {
                    $('#j-msg-tip').hide();
                    self.setBlinkIcon(false);
                });
            }
        } else {
            if (this._blinkTimer) {
                clearInterval(this._blinkTimer);
                $('#j-msg-icon').css('visibility', 'visible');
                this._blinkTimer = null;
            }
        }
    },
    bindEvent: function(){
        var self = this;
        $('ul.item-usernews-dropdown a').click(function(){
            self.onmsgItemClick( $(this) );
        });
    },
    onmsgItemClick: function( obj ){
        var msgNumObj = obj.find('span');
        if ( msgNumObj.size() ) {
            var leftMsgNum = parseInt($('#j-msg-total').html(),10) - parseInt(msgNumObj.html().replace(/\s/g,''),10);
            if ( leftMsgNum > 0 ) {
                $('#j-msg-total').html( leftMsgNum).show();
            } else {
                $('#j-msg-total').hide();
            }
            msgNumObj.remove();
        }
    },
    makeTips: function(){

    }

};
msgHandle.init();


//实时系统消息推送
if(!/login.v5.zbj.com/.test(window.location.href) && !/login.zbj.com/.test(window.location.href)){
    if(window.WebIM && WebIM.onNotification){
        WebIM.onNotification(function(notification){
            var json = notification.content.msgcount;
            msgHandle.updateMsgIndicator( json );
        });
    }
}