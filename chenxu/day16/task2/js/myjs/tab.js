/**
 * Created by Administrator on 2016/3/18.
 */

    class Tab {
        constructor() { // 构造方法
            this.i = 0; // 初始化 0
            this.SPEED = 5000; // 常量 速度5s
            this.timer = null; // 定时器
            this.carousel;  // 这个是class 装 轮播的父级
            this.len; // 轮播的长度数组
            this.headerCircle; // 圈圈
            this.init();
        }
        init() {
            // 初始化 代码
            var self =this;
            let allcircle = document.getElementById('allcircle');
            let headernav = document.getElementById('header-circle');
            self.headerCircle = headernav.querySelectorAll('.mediareports-circlr');// 圈圈点击
            let mianlistall = document.querySelector('.allcircleshow');
            self.carousel = mianlistall;
            let mianlist = mianlistall.querySelectorAll('.mediareports-left-main');//主体
            self.len = mianlist.length;
            mianlistall.style.width = (100 * self.len) + '%';
            mianlistall.style.left = '0%';
            [].forEach.call(mianlist, function (item) {
                item.style.width = (100 / self.len) + "%";
            });
            self.timeout();
            self.event();
        };
        event() {
            // 点击事件
            var self = this;
            for (let i = 0; i < self.len; i++) {
                self.headerCircle[i].onclick =  () => {
                    self.Switching(i);
                }
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
        };
        pre(){
            // 往左走
            var self = this;
            let left = self.carousel.style.left;
            let i = this.i;
            if (i < self.len - 1) {
                self.carousel.style.left = (parseInt(left) - 100) + "%";
                (self.i)++;
            }
            else if (i == self.len - 1) {
                self.carousel.style.left = "0%";
                self.i = 0;
            }
            this.choosetab();
        };
        next() {
            // 右
            var self = this;
            let left = self.carousel.style.left;
            let i = this.i;
            if (i > 0) {
                self.carousel.style.left = (parseInt(left) + 100) + "%";
                (self.i)--;
            } else if (i == 0) {
                self.carousel.style.left = -parseInt(carousel.style.width) + 100 + "%";
                self.i = self.len - 1;
            }
            this.choosetab();
        };
        choosetab(){
            //圈圈颜色切换
            var self = this;
            tool.removeClassAll(self.headerCircle, 'mediareports-choose');
            tool.addClass(self.headerCircle[self.i], 'mediareports-choose');
        };
        timeout(){
            // 定时轮播
            var self = this;
            this.timer = setInterval(function () {
                self.pre();
            }, self.SPEED);
        };
        Switching(j){
            // 点击跳转
            clearInterval(this.timer);
            this.carousel.style.left = (-j * 100) + "%";
            this.i = j;
            this.choosetab();
            this.timeout();
        }
    }
    window.onload = function(){
        var tab = new Tab();
    }
    //    module.exports = Tab;
//});


// 工具类
   let tool = {
        toCamel(name){
            return name.replace(/-[a-z]{1}/g, function(item){
                return item.slice(1).toUpperCase();
            });
        },
        getCss(source, attr) {
            if (source.currentStyle) {
                return source.currentStyle[attr];
            } else {
                return getComputedStyle(source, false)[attr];
            }
        },

        hasClass(source, value){
            return source.className.match(new RegExp('(\\s|^)' + value + '(\\s|$)'));
        },

        addClass(source, value){
            if(!this.hasClass(source, value)){
                source.className += ' ' + value;
            }
        },

        removeClass(source, value){
            if(this.hasClass(source, value)){
                source.className = source.className.replace(new RegExp('(\\s|^)' + value + '(\\s|$)'), '')
            }
        },

        addClassAll(source, value){
            for(var i = 0, len = source.length; i < len; i++){
                this.addClass(source[i], value);
            }
        },

        removeClassAll(source, value){
            for(var i = 0, len = source.length; i < len; i++){
                this.removeClass(source[i], value);
            }
        }
    }










