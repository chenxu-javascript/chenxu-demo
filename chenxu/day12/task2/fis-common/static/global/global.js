// 没有加雇佣购买的弹窗 和 余额 的，不知道是哪里用的，右侧固定的注释掉了，其他拷贝自 static/global

require('jquery/lazyload/jquery.lazyload');
require('jquery/menuaim/jquery.menu-aim');
require('jquery/ie6hover/ie6hover');


var utils = require('common:components/utils/utils');

var isHTTPSPage = utils.isHTTPSPage();



// 刷新头部信息 上下班
require('./src/msg');
require('./src/refresh-topbar');

//内容发布系统
require('./src/cms');

// 页面右侧的返回顶部以及意见反馈等等
require('./src/right-tools');

// 统计请求
require('./src/log');

// 搜索框
require('./src/searchbox/index');

// head_bd 发布需求下拉的需求
require('./src/task-pub-btn');

//针对静态头部进行的处理. a 或者 form 或者area带有data-process=1的节点的地址需要替换一下，
require('./src/replace-zhubajie');

if ( !isHTTPSPage ) {
    // 全站派单
    var PaidanTip = require('common:components/paidan-tip/paidan-tip');
    PaidanTip.init();

    // 上线班状态
    require('./src/work-status');
}


//  统计
(function(){
    var referStatistics = require('common:components/refer-statistics/refer-statistics');
    var protocol = 'http://';
    if ( location.protocol == 'https:' ) {
        protocol = 'https://';
    }
    referStatistics.init({
        mode: 'write',
        domain: window.ZBJInfo.pageDomain,
        proxyUrl: protocol + 'api.'+ window.ZBJInfo.baseURI +'/union/index'
    });
})();

