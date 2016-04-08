/**
 * 简版套餐组件
 * @date 2015-12-12
 * @author tracyqiu
 */

require('common:components/package-item/index.less');
require('jquery/mousewheel/jquery.mousewheel.min');
require('jquery/mCustomeScrollbar/jquery.mCustomScrollbar');
require('jquery/mCustomeScrollbar/jquery.mCustomScrollbar.css');

var Events = require('events');
var tpl = require('./tpl.index.tmpl');

var packageManager = {
    instances: {},
    getInstance: function( opts ){
        var key = 'package-item-' + (opts.invokefrom || 'channel');
        var obj = this.instances[ key ];
        var options = $.extend();
        if ( obj ) {
            return obj;
        }
        return this.instances[ key ] = new PackageItem( opts );
    }
};

function PackageItem( opts ){
    this.init(opts);
}

PackageItem.prototype = {
	constructor: PackageItem,

	init: function(opts) {
		this.opts = opts;
		this.$el = opts.parentEl;

		this.render(opts);
		this.initEvent();
	},
	initEvent: function(){
		var me = this;

		me.$el.on('keyup', '.area-input', function(){
			me.caculate($(this));
		});
	},
	render: function(data){
		this.$el.html(tpl(data));
	},
	caculate: function(tar) {
		var me = this,
			val = tar.val(),
			unitPrice = Number(tar.attr('unit-price')),
			re = /^\d+(\.\d+)?$/,
			totlePrice = tar.next(),
			timer;

		timer && clearTimeout(timer);

		timer = setTimeout(function(){
			if(re.test(val)) {
				totlePrice.html('&yen;' + Math.floor(unitPrice * val));
			} else if(!val){
				totlePrice.html('&yen;0');
			}else {
				totlePrice.html('输入无效');
			}
		}, 300);
	}
};

Events.mixTo( PackageItem );

module.exports = packageManager;