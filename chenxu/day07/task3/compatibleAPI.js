/**
 * Created by cx on 2016/3/16.
 */
(function(){
    var EventUtil = {};
    window.EventUtil= {
        addEvent: function(element, type, handler){
            if(element.addEventListener){  // 标准浏览器
                element.addEventListener(type,handler,false);
            }
            else if(element.attachEvent){ // ie8 及以下浏览器
                element.addEvent('on'+type,handler);
            }
            else{
                element['on'+type] = handler;
            }
        },
        removeEvent: function(element, type, handler) {
            if(element.removeEventListener){  // 标准浏览器
                element.removeEventListener(type,handler,false);
            }
            else if(element.detachEvent){ // ie8 及以下浏览器
                element.detachEvent('on'+type,handler);
            }
            else{
                element['on'+type] = null;
            }
        },
        getEvent: function(event){
            if(document.all)  return window.event;
            func=getEvent.caller;
            while(func!=null){
                var arg0=func.arguments[0];
                if(arg0)
                {
                    if((arg0.constructor==Event || arg0.constructor ==MouseEvent) || (typeof(arg0)=="object" && arg0.preventDefault && arg0.stopPropagation))
                    {
                        return arg0;
                    }
                }
                func=func.caller;
            }
            return null;
        },
        getTarget: function(event){
            var ev = this.getEvent(event);
            var target = ev.target || ev.srcElement;
            // IE下，even对象有srcElement属性，但是没有target属性；Firefox下，even对象有target属性，但是没有 srcElement属性。
            return target;
        },
        preventDefault: function(event) {
            var  e = event||window.event;
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        },
        stopPropagation: function(event) {
            var e=this.getEvent(event);
            if(window.event){
                //e.returnValue=false;//阻止自身行为
                e.cancelBubble=true;//阻止冒泡
            }else if(e.preventDefault){
                //e.preventDefault();//阻止自身行为
                e.stopPropagation();//阻止冒泡
            }
        }
    }
})();

(function(){
    function delegate(superEl, eventType, el, callback){
        // 回调函数
        function hander(){
            var target = EventUtil.getTarget(event);
            if(target.nodeName == el){
                    callback.call(el);
            }
        }
        EventUtil.addEvent(superEl,eventType,hander);
    }
})();
