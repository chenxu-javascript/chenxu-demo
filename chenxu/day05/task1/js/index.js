/**
 * Created by Administrator on 2016/3/21.
 */



define(function(require) {

    var tab = require('./module');
    tab('bannermain-item','bannermain-hide','bannermain-item-now','bannermain-show');

    var navnews = require('./tab.js');
    navnews.init();

});
(function(){
    var btn = document.getElementById('header-btn');
    var nav = document.querySelector('.header-nav-right');
    btn.addEventListener('click',hander,false);
    function hander(){
        var status = nav.getAttribute('datastatus');
        if(status === 'close'){
            nav.style.display = 'block';
            nav.setAttribute('datastatus','open');
        }
        else if(status === 'open'){
            nav.style.display = 'none';
            nav.setAttribute('datastatus','close');
        }

    }
})();