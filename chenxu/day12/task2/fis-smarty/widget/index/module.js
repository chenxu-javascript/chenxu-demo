/**
 * Created by Administrator on 2016/3/21.
 */


     // ..模块代码
     /*
     * tabnav ： tab 父 class
     * tablist ：tab 子 class
     * tabnavclass ：主体 父 class
     * tablistclass ：主体 子 class
     * 功能是 tab切换 设置display：block 和display：none
     * */
      function tab(tabnav,tablist,tabnavclass,tablistclass){
        var borderTab = document.getElementsByClassName(tabnav);
        var bannerlist = document.getElementsByClassName(tablist);

        var borderlength = borderTab.length;
        for(var i = 0; i < borderlength; i++){
            borderTab[i].onclick = function(){
                change(this,borderTab,bannerlist);
            }
        }
        /**
         *  obj 点击的当前对象
         * @param obj
         */
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
          /**
           *    has 函数
           * @param obj
           * @param cls
           * @returns {Array|{index: number, input: string}}
           */

        function hasClass(obj, cls) {
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        }
        // 添加class 函数
        function addClass(obj, cls) {
            if (!hasClass(obj, cls)) obj.className += " " + cls;
        }
        // 移除class函数
        function removeClass(obj, cls) {
            if (hasClass(obj, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                obj.className = obj.className.replace(reg, ' ');
            }
        }

    }
    // 导出 tab 函数
    module.exports = tab;
