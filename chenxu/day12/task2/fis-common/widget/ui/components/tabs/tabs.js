var AraleTabs = require("arale/switchable/1.0.3/tabs");

var Tabs = AraleTabs.extend({

    attrs: {
        activeIndex: 0,
        classPrefix: 'zbj-tabs',
        triggerType: 'click'
    },

    setup: function(){
        Tabs.superclass.setup.call(this);
    }
});

module.exports = Tabs;