/**
 * Created by Administrator on 2016/3/21.
 */




        /**
         *  obj 点击的当前对象
         * @param obj
         */
      function tab(tabnav,tablist,tabnavclass,tablistclass) {

            let borderTab = document.getElementsByClassName(tabnav);
            let bannerlist = document.getElementsByClassName(tablist);
            let borderlength = borderTab.length;
            for (let i = 0; i < borderlength; i++) {
                borderTab[i].onclick = () => {
                    change(borderTab[i], borderTab, bannerlist);
                }
            }
            var change = (obj, borderTab, bannerlist) => {
                for (let i = 0; i < borderTab.length; i++) {
                    removeClass(borderTab[i], tabnavclass);
                    removeClass(bannerlist[i], tablistclass);
                    if (borderTab[i] == obj) {
                        addClass(borderTab[i], tabnavclass);
                        addClass(bannerlist[i], tablistclass);
                    }
                }
            };
        }
        var hasClass = (obj, cls) => {
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        };
        // 添加class 函数
        var addClass = (obj, cls) => {
            if (!hasClass(obj, cls)) obj.className += " " + cls;
        };
        // 移除class函数
        var removeClass = (obj, cls) => {
            if (hasClass(obj, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                obj.className = obj.className.replace(reg, ' ');
            }
        };
window.onload =function(){
    tab('bannermain-item','bannermain-hide','bannermain-item-now','bannermain-show');
}

