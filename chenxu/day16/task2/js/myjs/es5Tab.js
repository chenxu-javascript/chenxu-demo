'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Administrator on 2016/3/18.
 */

var Tab = function () {
    function Tab() {
        _classCallCheck(this, Tab);

        // 构造方法
        this.i = 0; // 初始化 0
        this.SPEED = 5000; // 常量 速度5s
        this.timer = null; // 定时器
        this.carousel; // 这个是class 装 轮播的父级
        this.len; // 轮播的长度数组
        this.headerCircle; // 圈圈
        this.init();
    }

    _createClass(Tab, [{
        key: 'init',
        value: function init() {
            // 初始化 代码
            var self = this;
            var allcircle = document.getElementById('allcircle');
            var headernav = document.getElementById('header-circle');
            self.headerCircle = headernav.querySelectorAll('.mediareports-circlr'); // 圈圈点击
            var mianlistall = document.querySelector('.allcircleshow');
            self.carousel = mianlistall;
            var mianlist = mianlistall.querySelectorAll('.mediareports-left-main'); //主体
            self.len = mianlist.length;
            mianlistall.style.width = 100 * self.len + '%';
            mianlistall.style.left = '0%';
            [].forEach.call(mianlist, function (item) {
                item.style.width = 100 / self.len + "%";
            });
            self.timeout();
            self.event();
        }
    }, {
        key: 'event',
        value: function event() {
            // 点击事件
            var self = this;

            var _loop = function _loop(i) {
                self.headerCircle[i].onclick = function () {
                    self.Switching(i);
                };
            };

            for (var i = 0; i < self.len; i++) {
                _loop(i);
            }
            /*  console.log(headerCircle); */
            /*console.log(self.headerCircle);
            let iterator = self.headerCircle[Symbol.iterator]();
            for(let [index,elem] of self.headerCircle.entries()){
                this.elem.onclick = function () {
                    self.Switching(index);
                    console.log(index, elem);
                }
            }*/
        }
    }, {
        key: 'pre',
        value: function pre() {
            // 往左走
            var self = this;
            var left = self.carousel.style.left;
            var i = this.i;
            if (i < self.len - 1) {
                self.carousel.style.left = parseInt(left) - 100 + "%";
                self.i++;
            } else if (i == self.len - 1) {
                self.carousel.style.left = "0%";
                self.i = 0;
            }
            this.choosetab();
        }
    }, {
        key: 'next',
        value: function next() {
            // 右
            var self = this;
            var left = self.carousel.style.left;
            var i = this.i;
            if (i > 0) {
                self.carousel.style.left = parseInt(left) + 100 + "%";
                self.i--;
            } else if (i == 0) {
                self.carousel.style.left = -parseInt(carousel.style.width) + 100 + "%";
                self.i = self.len - 1;
            }
            this.choosetab();
        }
    }, {
        key: 'choosetab',
        value: function choosetab() {
            //圈圈颜色切换
            var self = this;
            tool.removeClassAll(self.headerCircle, 'mediareports-choose');
            tool.addClass(self.headerCircle[self.i], 'mediareports-choose');
        }
    }, {
        key: 'timeout',
        value: function timeout() {
            // 定时轮播
            var self = this;
            this.timer = setInterval(function () {
                self.pre();
            }, self.SPEED);
        }
    }, {
        key: 'Switching',
        value: function Switching(j) {
            // 点击跳转
            clearInterval(this.timer);
            this.carousel.style.left = -j * 100 + "%";
            this.i = j;
            this.choosetab();
            this.timeout();
        }
    }]);

    return Tab;
}();

window.onload = function () {
    var tab = new Tab();
};
//    module.exports = Tab;
//});

// 工具类
var tool = {
    toCamel: function toCamel(name) {
        return name.replace(/-[a-z]{1}/g, function (item) {
            return item.slice(1).toUpperCase();
        });
    },
    getCss: function getCss(source, attr) {
        if (source.currentStyle) {
            return source.currentStyle[attr];
        } else {
            return getComputedStyle(source, false)[attr];
        }
    },
    hasClass: function hasClass(source, value) {
        return source.className.match(new RegExp('(\\s|^)' + value + '(\\s|$)'));
    },
    addClass: function addClass(source, value) {
        if (!this.hasClass(source, value)) {
            source.className += ' ' + value;
        }
    },
    removeClass: function removeClass(source, value) {
        if (this.hasClass(source, value)) {
            source.className = source.className.replace(new RegExp('(\\s|^)' + value + '(\\s|$)'), '');
        }
    },
    addClassAll: function addClassAll(source, value) {
        for (var i = 0, len = source.length; i < len; i++) {
            this.addClass(source[i], value);
        }
    },
    removeClassAll: function removeClassAll(source, value) {
        for (var i = 0, len = source.length; i < len; i++) {
            this.removeClass(source[i], value);
        }
    }
};
