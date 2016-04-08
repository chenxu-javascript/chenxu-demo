var AraleValidator = require('arale/validator/0.9.7/validator'),
    $ = require('jquery');

var toString = Object.prototype.toString;

var Validator = AraleValidator.extend({
    attrs: {
        explainClass: 'zbj-form-explain',
        itemClass: 'zbj-form-item',
        itemHoverClass: 'zbj-form-item-hover',
        itemFocusClass: 'zbj-form-item-focus',
        itemErrorClass: 'zbj-form-item-error',
        itemSuccessClass: 'zbj-form-item-success',
        inputClass: 'zbj-input',
        textareaClass: 'zbj-textarea',
        autoSubmit: true,
        submitBtn: 'input[type="submit"]', // 如果 submitBtn 在form里面，可以只填写一个selector，否则需要传一个jQuery对象

        showMessage: function (message, element) {
            this.getExplain(element).html(message);
            this.getItem(element).addClass(this.get('itemErrorClass')).removeClass(this.get('itemSuccessClass'));
        },

        hideMessage: function (message, element) {
            var successExplain;
            if ( element.attr('data-explain') ) {
                successExplain = '<i class="icon-font icon-success">&#xe812;</i>' + element.attr('data-explain');
            } else {
                successExplain = ' ';
            }
            this.getExplain(element).html( successExplain );
            this.getItem(element).removeClass(this.get('itemErrorClass')).addClass(this.get('itemSuccessClass'));
        },
        startSubmit: function(){
            this.submitBtn.attr('disabled', 'disabled').addClass('disabled');
        },
        endSubmit: function(){
            this.submitBtn.removeAttr('disabled').removeClass('disabled');
        },
        doSubmit: null,
        submitSuccess: $.noop,
        submitError: $.noop
    },

    setup: function(){
        Validator.superclass.setup.call(this);

        var self = this;
        var targetForm = self.element;
        var opts = {
            optsDoSubmit   : self.get('doSubmit'),
            optsStartSubmit: self.get('startSubmit'),
            optsEndSubmit  : self.get('endSubmit'),
            optsOnSuccess  : self.get('submitSuccess'),
            optsOnError    : self.get('submitError')
        };

        self.submitBtn = self.getSubmitBtn();
        //去掉 arale 默认的表单提交函数
        self.element.off("submit.validator");

        self.submitBtn.on('click', function( evt ){
            evt.preventDefault();
            setTimeout(function(){
                targetForm.submit();
            });

        });

        self.element.on("submit.validator", function(e) {
            e.preventDefault();
            self.submit.call(self, opts);
        });

        // 默认表单处理
        opts.doSubmit = function (){
            var data = self.getSubmitData();
            $.ajax({
                url: targetForm.attr('action'),
                data: data,
                type: targetForm.attr('method'),
                dataType: targetForm.attr('data-type') || 'json',
                jsonp: 'jsonpcallback',
                success: function( rs ){
                    if ( rs.success ) {
                        isFunction(opts.optsOnSuccess) && opts.optsOnSuccess.call( self, rs );
                    } else {
                        isFunction(opts.optsOnError) && opts.optsOnError.call( self, rs );
                        isFunction(opts.optsEndSubmit) && opts.optsEndSubmit.call( self );
                    }
                }
            });
        }

    },
    submit: function(opts){
        var self = this;
        opts.optsStartSubmit.call( self );
        self.execute(function(err) {
            if ( !err && self.get('autoSubmit') ) {
                // 如果自定义了 doSubmit 方法，那么就直接调用了
                if ( isFunction(opts.optsDoSubmit) ) {
                    opts.optsDoSubmit.call( self );
                } else {
                    opts.doSubmit.call( self );
                }
            } else {
                opts.optsEndSubmit.call( self );
            }
        });
    },
    getSubmitData: function(){
        var rs = {
            data: this.element.serialize()
        };
        // 曝露事件和数据，方便调用时修改
        this.trigger('getsubmitdata', rs);
        return rs.data;
    },
    getSubmitBtn: function(){
        var submitBtn = this.get('submitBtn');
        if ( isString( submitBtn ) ) {
            return $(submitBtn, this.element);
        } else {
            return submitBtn;
        }
    }

});


function isString ( str ) {
    return toString.call( str ) == '[object String]';
}
function isFunction ( fun ) {
    return toString.call( fun ) == '[object Function]';
}


module.exports = Validator;