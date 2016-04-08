require('./slider.less');

var AraleSlider = require("arale/switchable/1.0.3/switchable");

var Slider = AraleSlider.extend({

    attrs: {
        autoplay: true,
        circular: true,
        effect: 'scrollx'
    },

    setup: function(){
        Slider.superclass.setup.call(this);

        var self = this;
        this.$('[data-role=prev]').on('click', function(){
            self.prev();
        });

        this.$('[data-role=next]').on('click', function(){
            self.next();
        });
    }
});

module.exports = Slider;