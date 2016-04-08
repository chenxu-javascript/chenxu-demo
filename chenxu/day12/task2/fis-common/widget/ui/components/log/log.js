var cookie = require('arale/cookie/1.0.2/cookie');

var logList = [];
function sendLog(data) {
    if ((!window.ZBJInfo || window.ZBJInfo.pageDomain != 'zbj.com') && !cookie.get('collectDevData')) {
        return;
    }
    //data = $.extend({}, getBaseData(), data);
    /*
     * DataInterface Object通过count.js的全局变量获取
     * onDataInterface Event 通过count.js注册事件
     * */
    if(typeof(DataInterface) != "undefined"){
        DataInterface.collectData(data);
    }else{
        logList.push(data);
    }
}

function processLogList(list){
    $.each(list,function(index,data){
        DataInterface.collectData(data);
    });
}

$(window).on('onDataInterface',function(){
    if(logList.length > 0){
        processLogList(logList);
    }
});

module.exports = {
    sendLog: sendLog
};