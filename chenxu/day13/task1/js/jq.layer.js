/**
 * Created by Administrator on 2016/3/25.
 */

// 弹出层分为3部分； header  正文 还有 下面的按钮

;(function ($, window, document, undefined) {
    var pluginName = "Poplayer";
    var  defaults = {
        id:"mywin",
        width: 500,
        height: 200,
        title: "我是标题",
        isDrag: true,  // 是否可以拖拽
        isUpdown:false, // 是否存在遮罩
        submitBtn: [{ "id": "01", "value": "确定", "style": "" }],
        cancelBtn: [{ "id": "02", "value": "取消", "style": "" }],
        url: "",
        content:"我是正文内容",
        zindex: 30,
        onsuccess: function () {

            console.log('点击确定时候的回调');
        },
        onfail:function(){

            console.log('点击取消时候的回调');
        }
    };
    // element 是外面穿进来的当前对象
    function Poplayer(element,options){
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._name = pluginName;
        this._defaults = defaults;
        this.parentdiv = $('<div></div>');
        this.parentdiv.attr('id',this.settings.id);
        this.init();
    }
    // 扩展
    Poplayer.prototype ={
        // 初始化
        init:function(){
            this.createEle();
            if(this.settings.isDrag){
                this.drag(this.settings.id);
            }
            if(this.settings.isUpdown){
                this.createMask();
            }
            this.event();
        },
        // 创建节点 弹出层
        createEle:function(){
            var headdiv = $('<div></div>');
            var h3 = $('<h2></h2>');
            h3.addClass('h3header');
            var title = $('<span></span>');
            title.text(this.settings.title);
            var close = $('<span>X</span>');
            title.addClass('title');
            close.addClass('close');
            h3.append(title).append(close);
            var p = $('<p></p>');
            p.text(this.settings.content);
            p.addClass('content');
            var buttondiv = $('<div></div>');
            buttondiv.addClass('button');
            var submitBtn = $('<button></button>');
            var cancelBtn = $('<button></button>');
            submitBtn.addClass('submitBtn');
            cancelBtn.addClass('cancelBtn');
            submitBtn.text(this.settings.submitBtn[0].value);
            cancelBtn.text(this.settings.cancelBtn[0].value);
            headdiv.append(h3);
            buttondiv.append(submitBtn).append(cancelBtn);
            this.parentdiv.append(headdiv).append(p).append(buttondiv);
            this.parentdiv.css({
                "width":this.settings.width,
                "height":this.settings.height,
                "position":"absolute",
                "z-index":this.settings.zindex,
                "top":"50%",
                "left":"50%",
                "margin-left":-(this.settings.width/2),
                "margin-top":-(this.settings.height/2),
                "display":"block"
            });
            $("body").prepend(this.parentdiv);
        },
        // 遮罩 可选  是否存在
        createMask:function(){
            var mask = $('<div></div>');
            mask.attr('id','mask');
            mask.css({
                'background-color':'#000',
                'opacity':0.5,
                'filter':'alpha(50)',
                'position':'absolute',
                'left':0,
                'top':0,
                'bottom':0,
                'right':0
            });
            $("body").prepend(mask);
        },
        event:function(){
            var obj = this.parentdiv;
            var mask = $('#mask');
            var oClose = obj.find(".close");
            var oBtn_1 = obj.find(".submitBtn");
            var oBtn_2 = obj.find(".cancelBtn");
            var onsuccess = this.settings.onsuccess;
            var onfail = this.settings.onfail;
            oClose.click(function(){
                obj.remove();
                mask.remove();
               $('body').remove("#mask");
            });
            oBtn_1.click(function(){
                obj.remove();
                mask.remove();
                // 回调方法 还有点问题

               onsuccess();
            });
            oBtn_2.click(function(){
                obj.remove();
                mask.remove();
               onfail();
            });
        },
        // 是否可以拖拽
        drag:function(Obj){
            if(!this.settings.isDrag){
                return;
            }
            var z_index = 99; // Z-index
            var bDrag = false;
            var obj =  document.getElementById(Obj);
            var myobj = $("#"+Obj);
            var oClose = myobj.find(".close");
            var oBtn_2 = myobj.find(".cancelBtn");
            var dragbody=document.getElementsByTagName("div");
            obj.style.display = "block";
            obj.style.zIndex = z_index+2;
            var disX = disY = 0;

            myobj.mousedown(function(event){
                for(var i=0;i<dragbody.length;i++){
                    dragbody[i].style.zIndex = z_index-1;
                }
                obj.style.zIndex = z_index+1;
                bDrag = true;
                disX = event.clientX - obj.offsetLeft;
                disY = event.clientY - obj.offsetTop;
                this.setCapture && this.setCapture();
                return false;
            });
            $(document).mousemove(function(event){
                if (!bDrag) return;
                var event = event || window.event;
                var iL = event.clientX - disX;
                var iT = event.clientY - disY;
                var maxL = document.documentElement.clientWidth - obj.offsetWidth;
                var maxT = document.documentElement.clientHeight - obj.offsetHeight;
                iL = iL < 0 ? 0 : iL;
                iL = iL > maxL ? maxL : iL;
                iT = iT < 0 ? 0 : iT;
                iT = iT > maxT ? maxT : iT;
                obj.style.marginTop = obj.style.marginLeft = 0;
                obj.style.left = iL + "px";
                obj.style.top = iT + "px";
                return false ;
            });
            $(document).mouseup(function(){
                bDrag = false;
                obj.releaseCapture && obj.releaseCapture();
            });
            window.blur(function(){
                bDrag = false;
                obj.releaseCapture && obj.releaseCapture();
            });

            oBtn_2.mousedown(function(){
                (event || window.event).cancelBubble = true;
            });
            oClose.mousedown(function(){
                (event || window.event).cancelBubble = true;
            });
        }
    };

    $.fn[pluginName] = function(options){
        this.each(function () {
            $.data(this, "plugin_" + pluginName, new Poplayer(this, options));
        });
        return this;
    };
})(jQuery, window, document);

$(document).ready(function(){

    $("#mydom").click(function() {
        console.log(1);
        $("#mydom").Poplayer({
            "id": "one",
            "title": "我是标题",
            "content": '弹出层 可以拖拽 没有遮罩',
            "onsuccess":function () {
                alert('确定的回调1111');
                console.log('点击确定时候的回调111');
            },
            "onfail":function(){
                alert('取消的回调成功1111');
                console.log('点击取消时候的回调111');
            }
        });
    });
        $("#mydom01").click(function () {
            console.log(2);
            $("#mydom01").Poplayer({
                "id": "four",
                "title": "我是标题01",
                "content": '弹出层 不可以拖拽 没有遮罩',
                "isDrag": false,
                "onsuccess":function () {
                    alert('确定的回调333');
                    console.log('点击确定时候的回调333');
                },
                "onfail":function(){
                    alert('取消的回调成功333');
                    console.log('点击取消时候的回调333');
                }
            });
        });

        $("#mubutton").click(function () {
            console.log(3);
            $("#mubutton").Poplayer({
                "id": "two",
                "title": "标题1",
                "content": '这是提交按钮',
                'isDrag': true,
                "isUpdown": true,
                "submitBtn": [{'value': '提交'}],
                "onsuccess":function () {
                    alert('确定的回调444');
                    console.log('点击确定时候的回调444');
                },
                "onfail":function(){
                    alert('取消的回调成功444');
                    console.log('点击取消时候的回调444');
                }
            });
        });
    $("#mubutton01").click(function () {
        $("#mubutton01").Poplayer({
            "id": "three",
            "title": "标题2",
            "content": '弹出层 不可以拖拽 有遮罩',
            'isDrag': false,
            "isUpdown": true,
            "onsuccess":function () {
                alert('确定的回调222');
                console.log('点击确定时候的回调222');
            },
            "onfail":function(){
                alert('取消的回调成功222');
                console.log('点击取消时候的回调222');
            }
        });
    });



});
