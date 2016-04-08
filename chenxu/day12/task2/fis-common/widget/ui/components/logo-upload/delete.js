require('./delete.less');

var Dialog = require('dialog');

var delHtml = require('./delete.tmpl')

var utils  = require('common:components/utils/utils');  
var getUrl = utils.getUrl;

function DelLogo(currentNode) {
	this.currentNode = currentNode;
	this.delDialog;
	this.renderHtml();
}

module.exports = DelLogo;

DelLogo.prototype.renderHtml = function() {
	$('body').append( delHtml() );
	this.delOverlay();
}

DelLogo.prototype.delOverlay = function() {
	 //if( $('.j_logo-del').size() ){
	 //	$('.j_logo-del').remove();
	 //	$('.ui-mask').remove();	
	 //}
	var dialog = new Dialog({
		template: '.j_logo-del',
		width: '285px'
	}).show();

	this.delDialog = dialog;

	$('.cancel-del,.J_close').on('click', function(){
		$('.j_logo-del').remove();
		$('.ui-mask').remove();
	})

	this.postData();
}

DelLogo.prototype.postData = function() {
	var self = this;
	$('.sure-del').on('click', function(){

		var flieId = $(".J_flie_id").val();
		var wordId = $("#js-upload-box").attr('data-wid');
		

		var url = getUrl('task','addfiletocrm/delfile');

        $.ajax({
            type:'POST',
            data: {fileinfo_id: flieId,work_id:wordId },
            url: url,
            success:function(state){
                var results = false,
                	target = $('.upload-btn').nextAll();
                if(state == 1){
                    self.currentNode.parent().parent().remove();
                    target.filter('button').attr('data-uploaded',0);
                    target.filter('.tips').text('');
                    target.show();
                }else{
                    results = true;
                }
            	$('.j_logo-del').remove();
				$('.ui-mask').remove();
                if(results){
                    alert(state.msg);
                }
            },
            error:function(){
                console.log('出错了哦~'); 
            }
        });
	})

}