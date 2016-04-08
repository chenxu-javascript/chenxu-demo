var BasicTip = require("./src/basic-tip");

var popTpl = require("./tpl.poptip.tmpl");

var Position = require("arale/position/1.0.1/position");

require("./poptip.less");

var showCloseCls = 'zbj-poptip-showclose';
var closeBtnCls = 'zbj-poptip-close';
var tipArrowCls = 'zbj-poptip-arrow';

// 气泡提示弹出组件
// ---
var Tip = BasicTip.extend({
    attrs: {
        autoHide: true,
        showClose: false,
        template: popTpl(),
        // 提示内容
        content: "A TIP BOX",
        // 箭头位置
        // 按钟表点位置，目前支持1、2、5、7、10、11点位置
        // https://i.alipayobjects.com/e/201307/jBty06lQT.png
        arrowPosition: 7,
        align: {
            setter: function(val) {
                // 用户初始化时主动设置了 align
                // 且并非来自 arrowPosition 的设置
                if (val && !val.comeFromArrowPosition) {
                    this._specifiedAlign = true;
                }
                return val;
            }
        },
        // 颜色 [yellow|blue|white]
        theme: "zbj-poptip-white",
        // 当弹出层显示在屏幕外时，是否自动转换浮层位置
        inViewport: false
    },
    setup: function() {
        BasicTip.superclass.setup.call(this);
        this._originArrowPosition = this.get("arrowPosition");
        this.after("show", function() {
            this._makesureInViewport();
            this._scrollIntoView();
        });
        this.bindCloseEvent();
        this.setPinTipAction();
    },
    updatePosition: function () {
        this._setPosition();
    },
    setPinTipAction: function(){
        if ( this.get('pinTip') ) {
            this._specifiedBaseElement = true;

            this.after('hide', function(){
                this.destroy();
            });
        }
    },
    bindCloseEvent: function(){
        if ( !this.get('showClose') ) {
            return;
        }
        var self = this;

        this.element
            .addClass( showCloseCls )
            .find('.' + closeBtnCls).on('click', function(){
                self.hide();
            });
    },
    _scrollIntoView: function(){
        var self = this;
        if ( this.get('scrollIntoView') ) {
            setTimeout(function(){

                // fixme，需要考虑气泡的高度，另外如果气泡是在可视区，那么不需要滚动
                $(self.get('align').baseElement)[0].scrollIntoView();
            });
        }
    },
    _makesureInViewport: function() {
        if (!this.get("inViewport")) {
            return;
        }
        var ap = this._originArrowPosition, scrollTop = $(window).scrollTop(), viewportHeight = $(window).outerHeight(), elemHeight = this.element.height() + this.get("distance"), triggerTop = this.get("trigger").offset().top, triggerHeight = this.get("trigger").height(), arrowMap = {
            "1": 5,
            "5": 1,
            "7": 11,
            "11": 7
        };
        if ((ap == 11 || ap == 1) && triggerTop + triggerHeight > scrollTop + viewportHeight - elemHeight) {
            // tip 溢出屏幕下方
            this.set("arrowPosition", arrowMap[ap]);
        } else if ((ap == 7 || ap == 5) && triggerTop < scrollTop + elemHeight) {
            // tip 溢出屏幕上方
            this.set("arrowPosition", arrowMap[ap]);
        } else {
            // 复原
            this.set("arrowPosition", this._originArrowPosition);
        }
    },
    // 用于 set 属性后的界面更新
    _onRenderArrowPosition: function(val, prev) {
        val = parseInt(val, 10);
        var arrow = this.$("." + tipArrowCls);
        arrow.removeClass(tipArrowCls + "-" + prev).addClass(tipArrowCls + "-" + val);
        // 用户设置了 align
        // 则直接使用 align 表示的位置信息，忽略 arrowPosition
        if (this._specifiedAlign) {
            return;
        }
        var direction = "", arrowShift = 0;
        if (val === 10) {
            direction = "right";
            arrowShift = 20;
        } else if (val === 11) {
            direction = "down";
            arrowShift = 22;
        } else if (val === 1) {
            direction = "down";
            arrowShift = -22;
        } else if (val === 2) {
            direction = "left";
            arrowShift = 20;
        } else if (val === 5) {
            direction = "up";
            arrowShift = -22;
        } else if (val === 7) {
            direction = "up";
            arrowShift = 22;
        }
        this.set("direction", direction);
        this.set("arrowShift", arrowShift);
        this._setAlign();
    },
    _onRenderWidth: function(val) {
        this.$('[data-role="content"]').css("width", val);
    },
    _onRenderHeight: function(val) {
        this.$('[data-role="content"]').css("height", val);
    },
    _onRenderTheme: function(val, prev) {
        if ( this.get('showClose') ) {
            val += ' ' + showCloseCls;
        }
        this.element.removeClass(prev);
        this.element.addClass(val);
    }
});

module.exports = Tip;
module.exports.outerBoxClass = "zbj-poptip-1_2_2";


var alignConfig = {
    'above': {
        arrowPosition: 7,
        align: {
            baseXY: ['0', '0'],
            selfXY: [0, '100%+8px']
        }
    },
    'bellow': {
        arrowPosition: 11,
        align: {
            baseXY: [0, '100%'],
            selfXY: ['0', '-8px']
        }
    },
    'left': {
        arrowPosition: 2,
        align: {
            baseXY: ['0%', 'center'],
            selfXY: ['100%+8px', 'center']
        }
    },
    'right': {
        arrowPosition: 10,
        align: {
            baseXY: ['100%+8px', 'center'],
            selfXY: ['0', 'center']
        }
    }
};


var tipList = {};

module.exports.tip = function( content, target, direction, opts ){
    var defaults = {
        triggerType: 'click',
        content: content,
        theme: 'zbj-poptip-red',
        comeFromArrowPosition: false,
        scrollIntoView: false,
        pinTip: true,
        zIndex: 1000,
        align: {
            baseElement: target,
            baseXY: ['0', '0'],
            selfXY: [0, '100%+8px']
        }
    };

    if ( Object.prototype.toString.call( direction ) != '[object String]' ) {
        opts = direction;
        direction = 'above';
    }
    direction = direction || 'above';

    var config = alignConfig[ direction ];
    if ( !config )  {
        config = $.extend(true, defaults, opts);
    } else {
        config = $.extend(true, defaults, config, opts);
    }

    if ( tipList[target] ) {
        tipList[target].hide();
        delete tipList[target]
    }

    tipList[ target ] = new Tip( config).show();


    return tipList[ target ];
};