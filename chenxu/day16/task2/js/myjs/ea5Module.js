'use strict';

/**
 * Created by Administrator on 2016/3/21.
 */

/**
 *  obj 点击的当前对象
 * @param obj
 */
function tab(tabnav, tablist, tabnavclass, tablistclass) {

    var borderTab = document.getElementsByClassName(tabnav);
    var bannerlist = document.getElementsByClassName(tablist);
    var borderlength = borderTab.length;

    var _loop = function _loop(i) {
        borderTab[i].onclick = function () {
            change(borderTab[i], borderTab, bannerlist);
        };
    };

    for (var i = 0; i < borderlength; i++) {
        _loop(i);
    }
    var change = function change(obj, borderTab, bannerlist) {
        for (var _i = 0; _i < borderTab.length; _i++) {
            removeClass(borderTab[_i], tabnavclass);
            removeClass(bannerlist[_i], tablistclass);
            if (borderTab[_i] == obj) {
                addClass(borderTab[_i], tabnavclass);
                addClass(bannerlist[_i], tablistclass);
            }
        }
    };
}
var hasClass = function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};
// 添加class 函数
var addClass = function addClass(obj, cls) {
    if (!hasClass(obj, cls)) obj.className += " " + cls;
};
// 移除class函数
var removeClass = function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
};
window.onload = function () {
    tab('bannermain-item', 'bannermain-hide', 'bannermain-item-now', 'bannermain-show');
};
