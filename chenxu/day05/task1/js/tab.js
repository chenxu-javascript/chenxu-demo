/**
 * Created by Administrator on 2016/3/18.
 */


// 原生js 加 css3 轮播新闻切换
define(function(require, exports, module) {
    //  这次是新闻直接在页面有html，不用js生成，只写控制代码
    var i = 0; // 初始化 0
    var SPEED = 5000; // 常量 速度5s
    var timer = null; // 定时器
    var carousel;  // 这个是class 装 轮播的父级
    var len; // 轮播的长度数组
    var headerCircle; // 圈圈
    var tabself = {
        init:function(){
            // 初始化 代码
            var allcircle = document.getElementById('allcircle');
            var headernav = document.getElementById('header-circle');
            headerCircle = headernav.querySelectorAll('.mediareports-circlr');// 圈圈点击
            var mianlistall = document.querySelector('.allcircleshow');
            carousel = mianlistall;
            var mianlist = mianlistall.querySelectorAll('.mediareports-left-main');//主体
            len = mianlist.length;
            mianlistall.style.width = (100*len)+'%';
            mianlistall.style.left = '0%';
            [].forEach.call(mianlist, function (item) {
                item.style.width = (100 / len) + "%";
            });
            tabself.timeout();
            tabself.event();
        },
        event:function(){
            // 点击事件
            for(var i = 0;i<len;i++){
                (function(i){
                    headerCircle[i].onclick = function(){
                        tabself.Switching(i);
                    }
                })(i);

            }
        },
        pre:function(){
            // 往左走
            console.log(i);
            var left = carousel.style.left;
            if (i < len - 1) {
                carousel.style.left = (parseInt(left) - 100) + "%";
                i++;
            }
            else if (i == len - 1) {
                carousel.style.left = "0%";
                i = 0;
            }
            this.choosetab();
        },
        next:function(){
            // 右
            var left = carousel.style.left;
            if (i > 0) {
                carousel.style.left = (parseInt(left) + 100) + "%";
                i--;
            } else if (i == 0) {
                carousel.style.left = -parseInt(carousel.style.width) + 100 + "%";
                i = len - 1;
            }
            this.choosetab();
        },
        choosetab:function(){
            //圈圈颜色切换
            console.log(i);
            tool.removeClassAll(headerCircle,'mediareports-choose');
            tool.addClass(headerCircle[i],'mediareports-choose');
        },
        timeout:function(){
            // 定时轮播
            timer = setInterval(function(){
                tabself.pre()
            },SPEED);
        },
        Switching:function(j){
            // 点击跳转
            clearInterval(timer);
            carousel.style.left = (-j*100) + "%";
            i = j;
            this.choosetab();
            this.timeout();
        }
    };
    module.exports = tabself;
});

// 工具类
(function(){
    var tool;
    window.tool = {
        toCamel: function(name){
            return name.replace(/-[a-z]{1}/g, function(item){
                return item.slice(1).toUpperCase();
            });
        },

        setCss: function(source, obj){
            if(Object.prototype.toString.call(source) == '[object String]'){
                var list = document.querySelectorAll(source);
                arguments.callee(list, obj);
            }else if(Object.prototype.toString.call(source) == '[object NodeList]' ||
                Object.prototype.toString.call(source) == '[object HTMLCollection]' ||
                Object.prototype.toString.call(source) == '[object Array]'){
                for(var i = 0, len = source.length; i < len; i++){
                    for(var k in obj){
                        source[i].style[this.toCamel(k)] = obj[k];
                    }
                }
            }else{
                for(var k in obj){
                    source.style[this.toCamel(k)] = obj[k];
                }
            }
        },

        getCss: function(source, attr) {
            if (source.currentStyle) {
                return source.currentStyle[attr];
            } else {
                return getComputedStyle(source, false)[attr];
            }
        },

        hasClass: function(source, value){
            return source.className.match(new RegExp('(\\s|^)' + value + '(\\s|$)'));
        },

        addClass: function(source, value){
            if(!this.hasClass(source, value)){
                source.className += ' ' + value;
            }
        },

        removeClass: function(source, value){
            if(this.hasClass(source, value)){
                source.className = source.className.replace(new RegExp('(\\s|^)' + value + '(\\s|$)'), '')
            }
        },

        addClassAll: function(source, value){
            for(var i = 0, len = source.length; i < len; i++){
                this.addClass(source[i], value);
            }
        },

        removeClassAll: function(source, value){
            for(var i = 0, len = source.length; i < len; i++){
                this.removeClass(source[i], value);
            }
        }
    }

})();
/*(function(){
    /!*
    * tabnav ： tab 父 class
    * tablist ：tab 子 class
    * tabnavclass ：主体 父 class
    * tablistclass ：主体 子 class
    * *!/
    window.tab = function(tabnav,tablist,tabnavclass,tablistclass){
        var borderTab = document.getElementsByClassName(tabnav);
        var bannerlist = document.getElementsByClassName(tablist);
        var borderlength = borderTab.length;
        for(var i = 0; i < borderlength; i++){
            borderTab[i].onclick = function(){
                change(this,borderTab,bannerlist);
            }
        }
        /!**
         *  obj 点击的当前对象
         * @param obj
         *!/
        function change(obj,borderTab,bannerlist){

            for(var i = 0; i < borderTab.length; i++){
                removeClass(borderTab[i],tabnavclass);
                removeClass(bannerlist[i],tablistclass);
                if(borderTab[i] == obj){
                    addClass(borderTab[i],tabnavclass);
                    addClass(bannerlist[i],tablistclass);
                }
            }
        }
        function hasClass(obj, cls) {
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        }

        function addClass(obj, cls) {
            if (!hasClass(obj, cls)) obj.className += " " + cls;
        }

        function removeClass(obj, cls) {
            if (hasClass(obj, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                obj.className = obj.className.replace(reg, ' ');
            }
        }

    }
})();
// tab nav 调用 切换
tab('bannermain-border-nav-title','bannermain-hide','bannermain-border-now','bannermain-show');*/
// 新闻切换  采用下面一种方法 不只是切换 加上轮播效果
//tab('mediareports-circlr','mediareports-left-main','mediareports-choose','mediareports-show');







