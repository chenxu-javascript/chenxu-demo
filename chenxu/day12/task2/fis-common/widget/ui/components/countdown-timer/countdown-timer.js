//1. 倒计时分为两种情况,一种是自动开始(不传trigger时),一种是绑定按钮点击开始倒计时
//2. 执行顺序start => _before => before => _startCountDown => onStart => stop => _end => onEnd =>

function CountdownTimer(target, opts) {

    var defaults = {
        //显示对象/显示位置(MUST)
        target: target,//默认为空则绑定失败return false
        //触发器 1. 若没传则为默认开始倒计时 2. 若传递则对象点击后触发倒计时
        trigger: null,
        total: 60,//默认倒计时60(s)
        startTime: null,//开始时间(ms)
        beginTime: null,//开始时间(ms)
        endTime: null, //结束时间(ms)
        //显示模板
        display: "验证码",
        displayTemplate: "{year}年 - {month}月 - {date}天 - {hour}小时 - {minute}分钟 - {second}秒后重新发送{display}",
        defaultTemplate: "重发{display}",
        disabledClassName: "",//不可点击时的className，如果target有这个类名那么将不再开始倒计时。 默认结束会被移除 (注意:目前此处只支持一个类名，用的 hasClass 判断，用的时候需要注意 )

        //倒计时前
        before: function (promises) {
            promises.resolve();
        },
        onStart: function () {

        },
        onEnd: function () {

        }
    };

    var config = {};
    config = $.extend(true, defaults, opts);

    $.extend(true, this, config);

    this.beginTime = this.startTime;

    this.init();
}

CountdownTimer.prototype = {

    timer: null,//记录倒计时指针
    current: 0,//记录当前值

    init: function () {
        //保存内部变量
        var self = this;

        //显示位置(MUST)
        if (!this.target) {
            //必须指定倒计时显示的位置 否则返回
            return;
        }

        //处理显示目标 将其转化为jq对象
        this.target = select(this.target);

        //触发器 将其转化为jq对象 如果为空则自动触发型,否则会在点击时,马上触发
        this.trigger = select(this.trigger);

        //计算总时间 这里判断如果结束时间为空，那么就表示结束时间不确定，总时间以默认值60s开始
        if (this.endTime) {

            this.endTime = new Date(this.endTime);//处理结束时间 转为Data对象

            //清空触发器，倒计时会根据所传的开始时间确定。如果开始时间空，默认自动开始倒计时。
            this.trigger = null;

            if (this.beginTime) {
                this.beginTime = new Date(this.beginTime);//处理开始时间 转为Data对象

                if (this.beginTime > new Date()) {
                    //如果开始时间大于当前时间，即是活动还未开始
                    setTimeout(function () {
                        self.total = Math.round((self.endTime - new Date()) / 1000);
                        self.start();
                    }, this.beginTime - new Date());
                    return;
                } else {
                    //如果开始时间小于当前时间那么默认当前开始
                    this.total = Math.round((this.endTime - new Date()) / 1000);
                }
            } else {
                //开始时间为空，默认当前开始
                // 结束时间-当前时间 单位s
                this.total = Math.round((this.endTime - new Date()) / 1000);

            }
        }

        //没有触发器默认倒计时开始
        if (!this.trigger || this.trigger.length === 0) {

            this.start();

        } else {

            $("body").on("click", this.trigger.selector, function () {

                self.start();

            });

        }

    },
    //每次start都会重新total开始计时
    start: function () {
        if (this.endTime) {
            if (this.endTime > new Date()) {
                this._before();
            } else {
                //活动已结束
                // TODO 这里是否需要加上提示
            }
        } else {
            this._before();
        }
    },
    //停止: 会先执行
    stop: function () {
        //如果结束时间已确定，那么禁手动调用开始与结束功能
        if (!this.endTime || this === window) {
            // TODO 这里空着未来可能需要添加一些东西
            this._end();
        }
    },
    _before: function () {
        // TODO 改为以空格分割开，单个判断hasClass，不再直接 hasClass（str）
        if (!this.timer && !$(this.target).hasClass(this.disabledClassName)) {
            //设置倒计时开始前的状态
            //TODO
            this.timer = "";//不会被多次触发

            var self = this;

            //初始化样式,在执行异步请求promise时，禁止用户点击，以及添加 disabledClassName样式
            self.target.addClass(self.disabledClassName).attr("disabled", "true");

            var promises = $.Deferred();

            this.before(promises);

            $.when(promises).done(function () {

                self.target.html(displayCountMessage(self.displayTemplate, self.total, self.display));

                self.current = self.total;//每次开始都从头开始

                // 倒计时开始
                self._startCountDown();

            }).fail(function () {
                //如果promise返回 reject ，禁止用户点击 ，以及添加 disabledClassName样式
                self.target.removeClass(self.disabledClassName).removeAttr("disabled");
            });
        }
    },
    _startCountDown: function () {
        //函数占位
        var self = this;
        this.onStart();
        this.timer = setInterval(function () {
            //固定时间间隔会被调用(_onTick)
            //每个时间间隔会执行
            self.current--;
            self.target.html(displayCountMessage(self.displayTemplate, self.current, self.display));

            if (self.current <= 0) {
                self.stop();
            }
        }, 1000);
    },
    _end: function () {

        //函数占位
        this.onEnd();

        //还原默认状态
        this.target.removeClass(this.disabledClassName).removeAttr("disabled");

        this.target.html(displayCountMessage(this.defaultTemplate, 0, this.display));

        clearInterval(this.timer);

        this.timer = null;

    }
};

//转换为jq对象
// TODO 这里空着未来可能需要添加一些东西 需要加入可以传入Element
function select(obj) {
    //判断是否是字符串选择器
    if (Object.prototype.toString.call(obj) === "[object String]") {
        return $(obj);
    } else {
        return obj;
    }
}

//替换模板中的关键字
function displayCountMessage(template, count, display) {
    //按照时间划分 小于等于60s时只替换

    //根据时间戳获取年月日秒
    var currentDate = new Date(count * 1000);

    var year = currentDate.getFullYear() - 1970; // Math.floor(count / 31536000);//按365天计 下舍入 31536000 31622400

    var month = currentDate.getMonth(); // Math.floor(count % 31536000 / 2592000);//每月30天计算  2592000

    var date = currentDate.getDate() - 1; //Math.floor(count % 2592000 / 86400);//86400 一天

    var hour = currentDate.getHours() - 8;//Math.floor(count % 86400 / 3600);// 3600s一小时

    if (hour < 0) {
        hour = hour + 24;
        date--;
    }
    var minute = currentDate.getMinutes();//Math.floor(count % 3600 / 60);

    var second = currentDate.getSeconds();// Math.floor(count % 60);


    return template.replace(/\{year\}/g, year)
        .replace(/\{month\}/g, month)
        .replace(/\{date\}/g, date)
        .replace(/\{hour\}/g, hour)
        .replace(/\{minute\}/g, minute)
        .replace(/\{second\}/g, second)
        .replace(/\{display\}/g, display);

}

//目前为了测试把全部暴漏出去了
module.exports = CountdownTimer;