var  _array = [];
var  _obj = {};
var  _slice = _array.slice;
var  _toString = _obj.toString;

//定义一个Class
var Class = (function(){
    var _mix = function(a,b){
        for(var i in b){
            if(b.hasOwnProperty(i)){
                a[i] = b[i];
            }
        }
    };
    var _extend = function(){
        //开关 用来使生成原型时,不调用真正的构成流程init
        this.initPrototype = true;
        var _prototype = new this();
        this.initPrototype = false;
        //定义子类构造器
        var SubClass = function(cfg){
            if(!SubClass.initPrototype && this.init){
                this.init(cfg);
            }
        };

        //扩展子类构造器原型
        var args = _slice.call(arguments);
        var i = null;
        while(i = args.shift()){
            _mix(_prototype,i.prototype||i);
        }

        //子类保存父类原型的引用
        _prototype._super = this.prototype;
        //给子类的原型赋值，实现继承
        SubClass.prototype = _prototype;
        SubClass.prototype.constructor = SubClass;

        //添加子类静态方法
        SubClass.extend = _extend;
        return SubClass;
    };

    var Class = function(){};
    Class.extend = _extend;
    return Class;
})();

//组件的几个生命周期，初始化->绑定事件->渲染组件->销毁组件
//实现简单的事件机制，实现很简单，主要阐述事件机制原理
var Dialog = Class.extend({
    cfg:{
        id:"mylayer",
        width:500,
        height:300,
        title: "我是标题",
        isDrag: true,  // 是否可以拖拽
        submitBtn: [{ "id": "01", "value": "确定", "style": "" }],
        cancelBtn: [{ "id": "02", "value": "取消", "style": "" }],
        url: "",
        content:"我是正文内容",
        zindex: 30,
        onsuccess: function () {
            alert('点击确定的回调')
            console.log('点击确定时候的回调');
        },
        onfail:function(){
            alert('点击取消的回调')
            console.log('点击取消时候的回调');
        }
    },
    /**
     * 初始化
     * @return {[type]} [description]
     */
    init:function(){
        this.mask();
        this.createDialog();
        this.renderContent();
        this.event();
        this.on('dialoga',function(){
            console.log('#################');
            console.log('dialog');
            console.log('#################');
        });
    },
    /**
     * 遮罩层
     * @return {[type]} [description]
     */
    mask:function(){
        //todo 遮罩层
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
        // 把弹出层 挂在 this上
        this.el = mask;
    },
    /**
     * 创建弹框
     * @return {[type]} [description]
     */
    createDialog:function(){
        //todo 创建弹框
        var parentdiv = $('<div></div>');
        parentdiv.attr('id',this.cfg.id);
        var headdiv = $('<div></div>');
        var h3 = $('<h2></h2>');
        h3.addClass('h3header');
        var title = $('<span></span>');
        var close = $('<span>X</span>');
        title.addClass('title');
        close.addClass('close');
        h3.append(title).append(close);
        var p = $('<p></p>');
        p.addClass('content');
        var buttondiv = $('<div></div>');
        buttondiv.addClass('button');
        var submitBtn = $('<button></button>');
        var cancelBtn = $('<button></button>');
        submitBtn.addClass('submitBtn');
        cancelBtn.addClass('cancelBtn');

        headdiv.append(h3);
        buttondiv.append(submitBtn).append(cancelBtn);

        parentdiv.append(headdiv).append(p).append(buttondiv);
        console.log(parentdiv);
        parentdiv.css({
            "width":this.cfg.width,
            "height":this.cfg.height,
            "position":"absolute",
            "z-index":this.cfg.zindex,
            "top":"50%",
            "left":"50%",
            "margin-left":-(this.cfg.width/2),
            "margin-top":-(this.cfg.height/2),
            "display":"block"
        });
        this.el.append(parentdiv);
        $("body").prepend(this.el);


    },
    /**
     * 渲染弹框内容
     * @return {[type]} [description]
     */
    renderContent:function(){
        //todo 渲染弹框内容
        this.el.find('.title').text(this.cfg.title);
        this.el.find('.content').text(this.cfg.content);
        this.el.find('.submitBtn').text(this.cfg.submitBtn[0].value);
        this.el.find('.cancelBtn').text(this.cfg.cancelBtn[0].value);
    },
    /**
     * 事件 点击事件
     */
    event:function(){
        // 点击事件
        var self = this;
        self.el.find('.close').on('click',function(){
            self.el.remove();
            self.el.find(self.cfg.id).remove();
        });
        self.el.find('.submitBtn').on('click',function(){
            self.el.remove();
            self.el.find(self.cfg.id).remove();
            self.cfg.onsuccess();
        });
        self.el.find('.cancelBtn').on('click',function(){
            self.el.remove();
            self.el.find(self.cfg.id).remove();
            self.cfg.onfail();
        });
    },
    /**
     * 销毁组件
     * @type {[type]}
     */
    destroy:function(){
        //todo 销毁
        // 去掉所有事件的监听
        this.off();
    },
    /**
     * 绑定事件
     */
    on:function(key,fn){
        var event = this.event;
        var currentEvent = event[key] ? event[key] : event[key] = [];
        if(currentEvent.indexOf(fn) === -1 && _toString.call(fn) === '[object Function]'){
            currentEvent.push(fn);
        }
    },
    /**
     * 解绑事件
     */
    off:function(key,fn){
        var event = this.event;
        var currentEvent = event[key];
        if(currentEvent){
            var index = currentEvent.indexOf(fn);
            if(index !== -1){
                currentEvent.splice(index,1);
            }
        }
    },
    /**
     * 触发事件，通知观察者，状态改变
     */
    fire:function(key){
        var event = this.event;
        var currentEvent = event[key];
        var length = currentEvent.length;
        var args = _slice.call(arguments,1);
        if(length > 0){
            var i=0;
            for(;i < length;i++){
                currentEvent[i].call(this,args);
            }
        }
    }
});
var Alert = Dialog.extend({
    init:function(cfg){
        this.cfg = cfg;
        this._super.init();
        this.renderContent();
        this.on('dialoga',function(){
            console.log('##############');
            console.log('alert');
            console.log('##############');
        });
    },
    renderContent:function(){
        //todo 渲染弹框内容
        this.el.find('.title').text(this.cfg.title);
        this.el.find('.content').text(this.cfg.content);
        this.el.find('.submitBtn').text(this.cfg.submitBtn[0].value);
        this.el.find('.cancelBtn').text(this.cfg.cancelBtn[0].value);
    }
});
var Confirm = Dialog.extend({
    init:function(cfg){
        //todo init
        this.cfg = cfg;
        this._super.init();
        this.renderContent();
        this.on('dialoga',function() {
            console.log('confirm');

        });
    },
    renderContent:function(){
        //todo 渲染弹框内容
        this.el.find('.title').text(this.cfg.title);
        this.el.find('.content').text(this.cfg.content);
        this.el.find('.submitBtn').text(this.cfg.submitBtn[0].value);
        this.el.find('.cancelBtn').text(this.cfg.cancelBtn[0].value);
    }
});
$(function(){
    $('.alert').click(function(){
        var a = new Alert({
            'content':'我是alert',
             submitBtn: [{ "id": "01", "value": "知悉", "style": "" }],
             cancelBtn: [{ "id": "02", "value": "不清楚", "style": "" }]
        });
        a.on('dialog',function(){
          console.log('已经绑定了3个dialog方法了');
        });
        a.fire('dialog');
    });

    $('.comfire').click(function(){
        var b = new Confirm({
            'content':'我是comfire',
            submitBtn: [{ "id": "01", "value": "警告", "style": "" }],
            cancelBtn: [{ "id": "02", "value": "允许", "style": "" }]
    });
         b.on('dialog',function(){
         console.log('已经绑定了3个dialog方法了');
         });
        // b.fire('dialog');
    })
});



