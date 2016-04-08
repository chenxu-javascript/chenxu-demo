(function ($, undefined) {
    $.fn.placeholder = function (options) {
        var defaults = {
            labelMode: true,
            labelStyle: {},
            labelAcross: false,
            debug: false,
            defaultClass: "zbj-placeholder",
            focusClass: "zbj-placeholder-focus"
        };
        //默认样式
        var defaultStyle = {
            position: "absolute",
            cursor: "text",
            overflow: "hidden"
        };
        var params = $.extend({}, defaults, options || {});
        //chrome浏览器测试IE8效果 默认开启labelAcross
        if (params.debug) {
            //debug那么改为跨浏览器支持
            params.labelAcross = true;
        }

        //方法
        var changeLabel = function (element, elementLabel) {
            if (element.val() === "") {
                elementLabel.show();
            } else {
                elementLabel.hide();
            }
        };

        var getPlaceholder = function (element) {
            return $(element).attr("placeholder")
                || $(element).data("placeholder");
            //
            //if (document.querySelector) {
            //    return $(element).attr("placeholder");
            //} else {
            //    // IE6, 7
            //    var ret;
            //    ret = element.getAttributeNode("placeholder");
            //    // Return undefined if nodeValue is empty string
            //    return ret && ret.nodeValue !== "" ? ret.nodeValue : undefined;
            //}
        };

        var getElementPosition = function (element) {

            var marginLeft = parseInt(element.css("marginLeft"));

            var marginTop = parseInt(element.css("marginTop"));

            var paddingLeft = parseInt(element.css("paddingLeft"));

            var paddingTop = parseInt(element.css("paddingTop"));

            var borderLeftWidth = parseInt(element.css("borderLeftWidth"));

            var borderTopWidth = parseInt(element.css("borderTopWidth"));

            var position = element.position();

            var left = position.left + marginLeft + paddingLeft + borderLeftWidth;

            var top = position.top + marginTop + paddingTop + borderTopWidth;

            return {
                left: left,
                top: top
            }
        };
        //该方法主要有两大功能 调用方法： jquery obj + .placeholder();
        // 1. 重新定位 --
        //      1）用于因为一些需求，导致输入框由隐藏 ==》显示
        //      2）由于一些原因引发的输入框位置变化
        // 2. 重新显示 placeholderLabel -- 由于一些原因清空了 input 输入框中的值，因为没有触发blur事件，
        // 导致模拟的 placeholder 没有显示的问题
        var resetPlaceholder = function (element, elementLabel) {

            var elementPosition = getElementPosition(element);

            elementLabel.css($.extend({
                width: element.css("width"),
                height: element.css("height"),
                left: elementPosition.left,//默认取得相对定位+输入框内边距
                top: elementPosition.top
            }, params.labelStyle));

            if (element.val() === "") {
                elementLabel.removeClass(params.focusClass).show();
            } else {
                elementLabel.hide();
            }
        };

        $(this).each(function () {

            var element = $(this);

            //浏览器是否支持placeholder
            var isSupportPlaceholder = "placeholder" in document.createElement("input");

            var placeholder = getPlaceholder(this);

            //1. 如果不存在placeholder 那么不执行
            //2. 如果浏览器native支持placeholder 且 不是跨浏览器测试(debug)
            if ((!placeholder) || (isSupportPlaceholder && !params.labelAcross)) {
                return;
            }
            // label模拟
            if (params.labelMode) {
                //TODO id 用于Label的for属性，避免点击时无法选中input框
                var elementId = element.attr("id");

                //如果elementId 是 undefined / "" 时 那么表示这个placeholder肯定不存在，那么执行下面的初始化操作

                if (elementId) {

                    var elementLabel = $("#" + elementId + '-placeholder-label');

                    if (elementLabel.length > 0) {
                        //如果已存在那么重新定位并返回
                        resetPlaceholder(element, elementLabel);
                        return;
                    }
                } else {
                    //如果id不存在给予默认ID
                    elementId = "placeholder" + new Date().getTime();

                    element.attr("id", elementId);
                }

                // 状态初始化

                // 存储，因为有时会清除placeholder属性
                element.data("placeholder", placeholder);

                var elementPosition = getElementPosition(element);

                //TODO 这个地方是加 'id="' + elementId + '-placeholder-label"' 好呢还是 改为 h5 data属性 好呢 ?
                elementLabel = $('<label id="' + elementId + '-placeholder-label" class="' + params.defaultClass + '" for="' + elementId + '"></label>');

                elementLabel.css($.extend(defaultStyle, {
                    lineHeight: element.css("lineHeight"),
                    width: element.css("width"),
                    height: element.css("height"),
                    fontSize: element.css("fontSize"),//默认取得输入框字体大小
                    left: elementPosition.left,//默认取得相对定位+输入框内边距
                    top: elementPosition.top
                }, params.labelStyle)).insertBefore(element);

                // 事件绑定

                // 如果是为空focus透明度改变交互
                element.on({
                    "focus": function () {
                        changeLabel($(this), elementLabel);
                        elementLabel.addClass(params.focusClass);
                    },
                    "input": function () {
                        changeLabel($(this), elementLabel);
                    },
                    "blur": function () {
                        //这里注意一下 触发事件时this指向的是js对象而非JQ对象
                        if (this.value === "") {
                            elementLabel.removeClass(params.focusClass).show();
                        }
                    }
                });
                ////同时需要给当前元素的offsetParent绑定事件
                // TODO
                //element.offsetParent().heigh().on("change",function(){
                //    //重新计算高度
                //    elementLabel.css({
                //        left: element.position().left + parseInt(element.css("paddingLeft")),//默认取得相对定位+输入框内边距
                //        top: element.position().top + parseInt(element.css("paddingTop"))
                //    });
                //});
                //IE6~8不支持oninput事件，需要另行绑定
                if (!window.screenX) {
                    element.get(0).onpropertychange = function (event) {
                        event = event || window.event;
                        if (event.propertyName == "value") {
                            //changeLabel(element, elementLabel);
                            changeLabel($(this), elementLabel);
                        }
                    }
                }

                // 右键事件
                elementLabel.get(0).oncontextmenu = function () {
                    element.trigger("focus");
                    return false;
                };

                // 内容初始化
                if (params.labelAcross) {
                    element.removeAttr("placeholder");
                }

                elementLabel.html(placeholder);
                if (element.val() !== "") {
                    elementLabel.hide();
                }
            } else {
                // value模拟 目前因为不支持input[type="password"]问题, 暂时无法使用

                // 存储，因为有时会清除placeholder属性
                element.data("placeholder", placeholder);

                element.on({
                    "focus": function () {
                        if ($(this).val() === placeholder) {
                            $(this).val("");
                        }
                        $(this).css("color", "");
                    },
                    "blur": function () {
                        if ($(this).val() === "") {
                            $(this).val(placeholder).css("color", "graytext");
                        }
                    }
                });

                // 初始化
                if (element.val() === "") {
                    element.val(placeholder).css("color", "graytext");
                }
            }
        });
        return $(this);
    };
})(jQuery);