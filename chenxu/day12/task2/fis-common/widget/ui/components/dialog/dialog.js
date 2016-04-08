var AraleDialog = require('arale/dialog/1.3.0/confirmbox-debug');

require('./dialog.less');

// 考虑 artdialog 的 api
var Dialog = AraleDialog.extend({
    attrs: {
        theme: 'zbj-dialog'
    },

    setup: function(){
        this.after('render', function(){
            this.element.parent().addClass( this.get('theme') );
        });
        Dialog.superclass.setup.call(this);
        this.render();
    }
});

module.exports = Dialog;