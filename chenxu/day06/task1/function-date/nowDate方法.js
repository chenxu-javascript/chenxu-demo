/**
 * Created by cx on 2016/3/15.
 */

/**
 * Created by cx on 2016/3/15.
 */

/****
 *   任务一
 * /
 /*写一个工具集，至少包括以下 API
 var utils = {
        // 传入一个数组，除去数组中重复的元素并返回
        // 如果var1 === var2，则说明var1和var2重复
        uniqueArray: function( array ){},
        // 类型判断
        isString: function( val ){},
        isNumber: function( val ){},
        isObject: function( val ){},
        isArray: function( val ){},
        isFunction: function( val ){}
    };*/
(function () {
    var utils = {};
    window.utils = {
        // 传入一个数组，除去数组中重复的元素并返回
        // 如果var1 === var2，则说明var1和var2重复
        uniqueArray: function (array) {
            var resultArray = [];
            var length = array.length;
            for(var i = 0; i < length; i++) //遍历当前数组
            {
                //如果当前数组的第i已经保存进了临时数组，那么跳过，
                //否则把当前项push到临时数组里面
                if (resultArray.indexOf(array[i]) == -1) {
                    resultArray.push(array[i]);
                }
            }
            var resultArraylength = resultArray.length;
            // 判断数组长度 确定是否重复
            if (length === resultArraylength) {
                console.log("说明var1和var2重复");
            }
            // 返回新数组
            console.log(resultArray);
            return resultArray;
        },
        // 类型判断
        // 是否是字符串
        isString: function (val) {
            return (typeof val == 'string') && val.constructor == String;
        },
        // 是否是数字
        isNumber: function (val) {
            return (typeof val == 'number') && val.constructor == Number;
        },
        // 是否是对象
        isObject: function (val) {
            return typeof val === 'object';
        },
        // 是否是数组
        isArray: function (val) {
            return (typeof val == 'object') && val.constructor == Array;
        },
        // 是否是函数
        isFunction: function (val) {
            return (typeof val == 'function') && val.constructor == Function;
        }
    };

})();

/**
 *  任务2
 *
 */
/*
 写一个计时器，包括以下的API
 var timer = {
 // 如果未开始计时，则开始计时
 // 如果处于暂停状态，则恢复计时状态
 start: function () {},
 // 如果正在计时，则暂停计时
 pause: function () {},
 // 如果处于暂停状态，则清空记录
 reset: function () {},
 // 如果未开始计时，则返回0
 // 如果正在计时，则返回从开始到现在已经经历的毫秒数
 // 如果处于暂停状态，则返回从开始到暂停经历的毫秒数
 getDuration: function () {}
 };*/
(function(){
    var timetotal = 0; // 时间的总计
    var timeStart; // 开始时间
    var timeEnd;  // 结束时间
    var flag = false; // false 表示未执行  true 表示正在计时
    var timer = {};
    window.timer = {
        // 如果未开始计时，则开始计时
        // 如果处于暂停状态，则恢复计时状态
        start: function () {
            // 状态为 正在计时 不起作用
            if(flag){
                return;
            }
            flag = true;
            timeStart = new Date().getTime();

        },
        // 如果正在计时，则暂停计时
        pause: function () {
            if(!flag){
                return;
            }
            flag = false;
            timeEnd = new Date().getTime()+timetotal;
        },
        // 如果处于暂停状态，则清空记录
        reset: function () {
            if(flag){
                return;
            }
            timetotal = 0;
        },
        // 如果未开始计时，则返回0
        // 如果正在计时，则返回从开始到现在已经经历的毫秒数
        // 如果处于暂停状态，则返回从开始到暂停经历的毫秒数
        getDuration: function () {
            // 正在计时
            if(flag){
                timeEnd = new Date().getTime()+timetotal;
                timetotal = timeEnd - timeStart;
                console.log(timetotal);
                return timetotal;
            }
            // 未计时 和暂停状态
            else{
                timetotal = timeEnd - timeStart;
                console.log(timetotal);
                return timetotal;

            }
        }
    };
})();
//组合成测试工具
(function (doc, timer, utils) {
    //参数列表：
    // Function 当函数的执行结果为true时，证明验证成功
    // String 用来标明验证目标的字符串
    // Boolean 为true时，证明要计算函数执行所耗费的时长
    window.test = function (cb, title, needCounting) {
        var passed;
        timer.start();
        try {
            passed = cb(utils) == true;
        } catch (e) {
            passed = false;
        }
        timer.pause();
        var report =passed ? '验证成功':'验证失败';
        var duration;
        if (needCounting) {
            duration = timer.getDuration();
            report += '，耗时' + duration + '毫秒';
        }
        timer.reset();
        console.log(title,report);


    };

})(document, timer, utils);