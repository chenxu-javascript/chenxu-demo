var cookie = require('cookie');

var head_gg = $('.zbj-header-a-d');

//移动广告
if ( !cookie.get('tmpmobileentry') ) {
    $('#j-tmp-mobile-entry').css('visibility', 'visible');
}
var entryExpireDate = function(n){
    var currentDate = new Date();
    var currentDay = currentDate.getDate();
    currentDate.setDate( currentDay + n );
    return currentDate;
};
$(document).delegate('#j-mobile-entry-close', 'click', function(){
    cookie.set('tmpmobileentry', 1, {
        expires: entryExpireDate(360),
        path: '/',
        domain: ZBJInfo.pageDomain
    });
    $('#j-tmp-mobile-entry').css('visibility', 'hidden');
});

head_gg.find('.grid').addClass('index-a-d').find('span.item-close i').addClass('icon-font');

if ( !cookie.get('head_a_d') ) {
    head_gg.show();
}

$(document).delegate(".zbj-header-a-d .item-close", "click", function(){
    cookie.set('head_a_d', 1, {
        expires: entryExpireDate(7),
        path: '/',
        domain: ZBJInfo.pageDomain
    });
    cookie.set('head_a_d_img', head_gg.find('img').attr('src'), {
        expires: entryExpireDate(7),
        path: '/',
        domain: ZBJInfo.pageDomain
    });
    head_gg.hide();
});