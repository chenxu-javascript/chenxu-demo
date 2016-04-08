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
    var time = 0; // 开始时间为 0;
    var status = 0; // 状态 0 表示未计时 1 表示正在及时 2 表示暂停
    var SPEED = 1; // 间隔时间 ms
    var timers = null; // 定时器
    var timer = {};
    window.timer = {
        // 如果未开始计时，则开始计时
        // 如果处于暂停状态，则恢复计时状态
        start: function () {
            // 状态为 正在计时 不起作用
            if(status == 1){
                return false;
            }
            if(status == 0 || status == 2){
                status = 1;
                timeshow(time,1);
                timeadd();
            }
        },
        // 如果正在计时，则暂停计时
        pause: function () {
            if(status == 1){
                clearInterval(timers);
                status = 2;
                timeshow(time,2);
            }
        },
        // 如果处于暂停状态，则清空记录
        reset: function () {
            if(status == 2){
                time = 0;
                status = 0;
                timeshow(0,0);
            }
        },
        // 如果未开始计时，则返回0
        // 如果正在计时，则返回从开始到现在已经经历的毫秒数
        // 如果处于暂停状态，则返回从开始到暂停经历的毫秒数
        getDuration: function () {
            if (status != 0)
            {
                $(".timems").html("从开始到暂停经历的毫秒数" + time + "ms");
                console.log(time + 'ms');
                return time;
            }
        }
    };
    /*
    ** 时间动态加 函数
    **
     */
    function timeadd(){
        timers = setInterval(function(){
            time++;
            timeshow(time,status);
        },SPEED);
    }
    /*
    / 渲染函数
     time 时间
     status 状态
     */
    function timeshow(time,status){
        var statusof = ['未计时','正在计时','暂停'];
        $(".status").html("状态："+statusof[status]);
        $(".timeshow").html("时间:"+time+"ms");
    }
})();

//组合成测试工具
(function (doc, timer, _) {
    var ul = doc.createElement('ul');

    function appendList () {
        doc.body.appendChild(ul);
        doc.removeEventListener('DOMContentLoaded', appendList);
    }
    doc.addEventListener('DOMContentLoaded', appendList);

    var STATUS_CLASS = {
        true: 'success-test-unit',
        false: 'error-test-unit'
    };
    var STATUS_REPORT = {
        true: '验证成功',
        false: '验证失败'
    };
    //参数列表：
    // Function 当函数的执行结果为true时，证明验证成功
    // String 用来标明验证目标的字符串
    // Boolean 为true时，证明要计算函数执行所耗费的时长

     window.test = function (cb, title, needCounting) {
        var li = doc.createElement('li');
        var titleSpan = doc.createElement('span');
        var reportSpan = doc.createElement('span');

        li.appendChild(titleSpan);
        li.appendChild(reportSpan);

        var passed;
        timer.start();

        try {
            passed = cb(_) == true;
        } catch (e) {
            console.log(e.message);
            console.log(e.description);
            console.log(e.number);
            console.log(e.name);
            passed = false;
        }

        timer.pause();
        li.classList.add(STATUS_CLASS[passed]);

        var report = STATUS_REPORT[passed];
        var duration;
        if (needCounting) {
            duration = timer.getDuration();
            report += '，耗时' + duration + '毫秒';
        }
        timer.reset();

        titleSpan.textContent = title + '：';
        reportSpan.textContent = report;

        ul.appendChild(li);
    };

})(document, timer, utils);