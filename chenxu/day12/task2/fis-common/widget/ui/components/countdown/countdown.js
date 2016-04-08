var moment = require("gallery/moment/2.0.0/moment");
var Base = require("arale/base/1.1.1/base");
var $ = require("jquery")
var countdown = Base.extend({
    attrs: {
        endtime: {
            value: null,
            getter: function(val) {
                return val == null ? null : moment(val);
            }
        },
        dstarget: {
            value: null,
            getter: function(val) {
                return $(val);
            }
        },
        format: "{{days}}天{{hours}}小时{{minutes}}分钟{{seconds}}秒",
        callback: function() {}
    },
    initialize: function(config) {
        countdown.superclass.initialize.call(this, config)
        this._setup();
    },
    _setup: function() {
        var that = this;
        var interval = 1000;
        var clone = this.get("format");
        var endTime = this.get("endtime")? this.get("endtime").valueOf():null;
        var currentTime = new moment().valueOf();
        var diffTime = endTime - currentTime;
        var duration = [];
        that.get("dstarget").each(function(i) {
            duration.push({
                id: i,
                dtime: that.get("endtime") ? diffTime  : $(this).data("difftime") * 1000,
                hastrigger: false
            });
        });

        var st = setInterval(function() {

            for (var j = 0; j < duration.length; j++) {
                var cost = moment.duration(duration[j].dtime -= interval, 'milliseconds');
                var resultarr = {
                    days: cost.days(),
                    hours: cost.hours(),
                    minutes: cost.minutes(),
                    seconds: cost.seconds()
                };
                if (!duration[j].hastrigger) {

                    if (cost.hours() <= 0 && cost.minutes() <= 0 && cost.seconds() <= 0) {
                        var tem = j;
                        setTimeout(function() {
                            that.get("callback").call(that.get("dstarget").eq(duration[tem].id))
                        }, interval);
                        duration[j].hastrigger = true;
                    }
                    else{
                        that.get("dstarget").eq(duration[j].id).html(parseElement(clone, resultarr));
                    }
                }

            }
        }, interval);


    }
});



function parseElement(string, args) {
    var reg1 = /{{([^}]*)}}/g;
    var reg2 = /\w+/;
    return string.replace(reg1, function(str, word) {
        return word = "" + args[word.match(/\w+/)] + "";
    })
}

module.exports = countdown;