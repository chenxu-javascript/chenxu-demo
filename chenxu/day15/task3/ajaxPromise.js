/**
 * Created by Administrator on 2016/3/28.
 */


var ajax = function(url,options) {
    return new Promise(function(resolve, reject) {

        var xhr = getXhr(); // 创建核心参数
        var _thisoptions = this;
        _thisoptions.url = url;
        _thisoptions.type = options.type || 'responseText';
        _thisoptions.method = options.method || 'GET';
        _thisoptions.async = options.async || true;
        _thisoptions.data = options.data || {};
        _thisoptions.success = options.onsuccess || function(){ console.log('success')};
        _thisoptions.onfail =  options.onfail || function (mes) { alert(url+'->status:'+mes+'error!')};

        _thisoptions.send = function(){
            var datastring = formatData(_thisoptions.data);
            var sendstring;
            var get = false;
            var async = _thisoptions.async;
            var method = _thisoptions.method;
            var type = _thisoptions.type;

            if(method === 'GET'){
                _thisoptions.url +='?'+datastring;
            }
            xhr.open(method,url,async); // 建立连接

            if(!get) {
                xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                sendstring = datastring;
            }
            xhr.onreadystatechange = function  () {
                if (xhr.readyState ==4){
                    // 执行完成

                    if(xhr.status == 200) {
                        // 成功
                        _thisoptions.success(xhr[type],xhr);
                        resolve();
                    } else {
                        // 失败
                        _thisoptions.onfail(xhr.status);
                       reject(e);
                    }
                }
            };
            xhr.send(sendstring);
            if(!async) {
                _thisoptions.success(xhr[type]);
            }
        };
        _thisoptions.url&&_thisoptions.send(null);
    });
};

function getXhr(){
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    return xhr;
}
function formatData(fd) {
    var res = '';
    for(var f in fd) {
        res += f+'='+fd[f]+'&';
    }
    return res.slice(0,-1);
}

ajax(
    'data.json',
    {
        data:{
            name:'simon',
            password:'123456'
        }
    }
).then(onsuccess,onfail);

function onsuccess(){
    alert('成功了,不容易啊')
}
function onfail(){
    alert('失败了')
}
