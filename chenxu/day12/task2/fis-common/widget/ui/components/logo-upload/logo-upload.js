
require('./logo-upload.less');

var mask 		= require('mask');
var Dialog 		= require('dialog');
var Events 		= require('events');
var Tip 		= require('arale/tip/1.2.1/tip');

var htmlTpl 	= require('./logoupload.tmpl');
var previewTpl  = require('./preview.tmpl');


var utils 		= require('common:components/utils/utils');
var Uploader 	= require('common:components/uploader-qiniu/uploader-qiniu');
var tokenUrl = window.ZBJInfo.qiniuUploadTokenUrl + '/resource/';

var getUrl = utils.getUrl;


var RULE_WIDTH = 700;
var RULE_HEIGHT = 500;

// var instance = null;


var config = {
	type: [{
		val: 11,
		label: '文字',
		cls: 'text'
	},{
		val: 12,
		label: '图文',
		cls: 'mixed'
	},{
		val: 13,
		label: '图形',
		cls: 'graphic'
	}],
	color: [{
		val: 1,
		label: '红色',
		cls: 'red'
	},{
		val: 2,
		label: '橙色',
		cls: 'orange'
	},{
		val: 3,
		label: '黄色',
		cls: 'yellow'
	},{
		val: 4,
		label: '绿色',
		cls: 'green'
	},{
		val: 5,
		label: '蓝色',
		cls: 'blue'
	},{
		val: 6,
		label: '紫色',
		cls: 'purple'
	},{
		val: 7,
		label: '棕色',
		cls: 'brown'
	},{
		val: 8,
		label: '灰色',
		cls: 'gray'
	},{
		val: 9,
		label: '黑色',
		cls: 'black'
	},{
		val: 10,
		label: '白色',
		cls: 'white'
	}]
};
var logoUploadTip;
var tips = {
	uploaded:'(已上传)',
	isfws:'(<a class="upsrc-tips" href="http://u.'+window.ZBJInfo.baseURI+'/witkey/index">请先开店才可以上传作品馆</a>)',
	filepermit:'(该需求雇主不同意将作品展示在作品馆)',
	realName:'(<a class="upsrc-tips" href="http://yan.'+window.ZBJInfo.baseURI+'/certification/index-from-t5?redirect=1">请先通过实名认证才可以上传作品馆</a>)',
	security:'(<a class="upsrc-tips" href="http://u.'+window.ZBJInfo.baseURI+'/newsecurity/join-secid-1?_t=1430113582177">请先加入“保证完成”才可以上传作品馆</a>)',
	originworks:'(<a class="upsrc-tips" href="http://u.'+window.ZBJInfo.baseURI+'/newsecurity/mysecurity?_t=1430113565253">请先加入“保证原创”才可以上传作品馆</a>)'
};


function LogoUpload( state, fileID) {


	// if ( instance ) {
	// 	instance.dialog.show();
	// 	return;
	// }

	this.colorData = [];
	this.tagData = [];
	this.typeData = '';
	this.imgData = '';
	this.fileId = fileID;
	this.agreeRule = false;
	this.state = state;
	this.renderHtml();
	// instance = this;
	this.clickSaveBtn();


}

module.exports = LogoUpload;
Events.mixTo(LogoUpload);


LogoUpload.prototype.uploadImg = function() {
	var self = this;
	var uploadConfig = {
        uploadBtn: $('.logo-upload').find(".add-logo-upload-btn"),
        uploadedWrapper: $('.logo-upload').find('ul'),
        fileInput: $('.logo-upload').find('input[name="upload"]'),
        prevent_duplicates: 1,
        count_limit: 1,
        extra_params: 'key=1',
		max_file_size: '200k',
        acceptExt:[
			   {title : "Image files", extensions : "jpg,png"}
			],
        ui: {
        	itemTpl: '<li data-pid="<#id#>" class="zbj-uploadfile-item">\
        		<a href="javascript:void(0)" class="zbj-uploadfile-cancel" action-type="cancel" id="zbj-uploadfile-cancel"></a>\
               	<div class="zbj-uploadfile-percent-ui" id="zbj-uploadfile-percent-now"></div>\
                <div class="zbj-uploadfile-percent-bg"></div>\
                <div class="zbj-uploadfile-item-detail">\
                <span class="zbj-uploadfile-status">等待上传...</span>\
                <span class="zbj-uploadfile-percent-val"></span>\
                </div>\
                <div id="preview"></div>\
            </li>'
        },
		belongToDomain: 'homesite',
		belongToSystem: 'task',
		tokenUrl : tokenUrl
    };
    var logoUploader = new Uploader.logoUploader( uploadConfig );

   	logoUploader.on('filechange', function(data){
    	if(data){
    		//$('.logo-photo').hide();
			$('.logo-photo').css("opacity", 0);
    	}else{
    		//$('.logo-photo').show();
			$('.logo-photo').css("opacity", 1);
    	}
    })

    logoUploader.on('datachange', function( fileLength ){
    	self.trigger('datachange', {
    		type: 'succeed_file',
    		isvalid: fileLength
    	})
    });

   	//logoUploader.on('add', function( file ){

	logoUploader.on('added', function( file ){
		var img = new mOxie.Image();

		img.onload = function() {
			this.embed($('#preview').get(0), {
				width: 175,
				height: 125,
				crop: true
			});
		};
		img.load(file.getSource()); 
    });

    logoUploader.on('success', function( info, uiItem, fileObj ){
    	var _this = this;

        //var imgHeight = getSizeVal( 'height', info );
		//var imgWidth = getSizeVal( 'width', info );
		var imgHeight = info.height;
		var imgWidth = info.width;
		var uploadStaus = true;

		if( imgHeight != RULE_HEIGHT || imgWidth != RULE_WIDTH || fileObj.size > 204800){
			var msg = '尺寸错误，上传失败！';
			if(fileObj.size > 204800){msg = '图片大小超过限制！';}
			_error(msg);
		}

		function _error(msg){
			$('.zbj-uploadfile-status').css({
				left: '23px',
				color: '#909090'
			});
			$('#preview').addClass('gray');
			_this.ui.makeError.call(_this, fileObj, {
				message:msg
			});
			$('.logo-upload').find('input[name="upload"]').val('');
			_this.trigger('remove');
			uploadStaus = false;
		}

    	function getSizeVal( pattern, str ){
			var reg = new RegExp( '"' + pattern + 'f";s:\\d:"(\\d+)"');
			var rs = reg.exec( str );
			return rs[1];
    	} 

    	self.trigger('datachange',{
			type: 'upload',
			isvalid: uploadStaus
		});
    });

     logoUploader.on('imgError', function( msg ){
		 //var logoTip = new Tip({
		 //    content: '<div>' +msg + '</div>',
          //   zIndex: 1000,
          //   align: {
		 //    	selfXY: ['-30%', '-10%'],
		 //	    baseElement: '.J_overlay',     // 基准定位元素
		 //	    baseXY: [0, 0]
         //
	      //   }
		 //});
		 //logoTip.show();
     });
    this.hoverImg();
}

LogoUpload.prototype.hoverImg = function() {
 	$('.upload-status').on('mouseover', function(){
 		$('#zbj-uploadfile-cancel').show();
 	}).on('mouseout', function() {
 		$('#zbj-uploadfile-cancel').hide();
 	});
}

LogoUpload.prototype.renderHtml = function() {
	var self = this; 
	var overlayContent = $("<div class='J_overlay'></div>");
	if( self.state == 'edit' ){
		var url = getUrl('task','addfiletocrm/editfile');
        $.ajax({
            type:'POST',
            data: {fileinfo_id: self.fileId},
            url: url,
            dataType:'json',
            success:function( json ){
				renderInfo( json , 'edit');
				self.colorData = json.color.split(",");
				self.tagData = json.tag.split(",");
				self.typeData = json.style;
				self.imgData = json.file_url;
				self.agreeRule = true;
				self.initEvents();
            },
            error:function(){
                console.log('出错了哦~'); 
            }
        });
	}else{
		renderInfo();
	}
	
	function renderInfo ( data ,type) {

		!data && (data = {})
		if( $('.J_overlay').size() ){
			$('.J_overlay').remove();
		}
		overlayContent.html(htmlTpl( {data: data, config: config} ));
		$('body').append(overlayContent);
		self.logoOverlay(type);

	}	
}

LogoUpload.prototype.logoOverlay = function(type) {
	var target = $('.js-logo-upload-tip'),
		$tip = target.nextAll('.tips');
	var isfws = target.attr('data-isfws'),
		filepermit = target.attr('data-filepermit'),
		realName = target.attr('data-realname'),
		security = target.attr('data-security'),
		originworks = target.attr('data-originworks'),
		uploaded = target.attr('data-uploaded'),
		authType = target.attr('data-authType');

	if(isfws == '0'){
		$tip.html(tips['isfws']);
	}
	else if(filepermit == '0'){
		$tip.html(tips['filepermit']);
	}else if(!(realName == '1' || authType == '1')){
		$tip.html(tips['realName']);
	}else if(security == '0'){
		$tip.html(tips['security']);
	}else if(originworks == '0'){
		$tip.html(tips['originworks']);
	}else if(uploaded == "1" && type !='edit'){
		$tip.html(tips['uploaded']);
	}else{
		var over = new Dialog({
			template: '.J_overlay',
			width: '995px'
		}).show();
		// this.dialog = over;

		$('.J_close').on('click', function() {
			over.hide();
			$('.ui-mask').hide();
		});
		$('.upload-save-btn').on('click', function(){
			if( !$(this).hasClass('disabled') ){
				over.hide();
	            $('.ui-mask').remove();
			}
		});
		this.uploadImg();
		this.pastTag();
		this.initEvents();
		this.selectColor();
		this.selectType();
		this.isAgreeRule();
		this.delFile();

	}
}

LogoUpload.prototype.initEvents = function() {

	var dataValid = {
		color: this.colorData.length,
		tag: this.tagData.length,
		rule: this.agreeRule,
		type: this.typeData,
		succeed_file: this.imgData
	};

	this.on('datachange', function( data ){
		dataValid[ data.type ] = data.isvalid;
		var isValid = 1;
		$.each( dataValid, function( id, item ){
			if ( !item ) {
				isValid = 0;
				if( !$('.upload-save-btn').hasClass('disabled') ){
					$('.upload-save-btn').addClass('disabled');
					$('.save').append("<span class='upload-error'>（信息未填写完整）</span>");
				}
				return false;
			}
		});

		if( isValid ){
			$('.upload-save-btn').removeClass('disabled');
			$('.upload-error').remove();
		}
	});

	
}

LogoUpload.prototype.selectType = function() {	
	var self = this;
	$('.type-group').on('click', 'input', function(){
		if( $(this).is( ':checked' ) ){
			self.typeData = $(this).val();
		}
		self.trigger('datachange', {
			type: 'type',
			isvalid: self.typeData
		});
	})
}

LogoUpload.prototype.pastTag = function() {		
	
	var self = this;
	var tagManager = {
		maxSize: 6,
		txtLength: 7,
		
		getAddableStatus: function( item ) {
			var status = 1;
			var msg = '';

			if( !item ){
				status = 0;
				msg = '请添加标签';
			}

			if ( self.tagData.length >= this.maxSize || item.length > this.txtLength ) {
				status = 0;
				msg = '最多只能' + this.maxSize + '个标签, 每个标签字数最多' + this.txtLength + '个字';
			}

			return {
				status: status && $.inArray(item, self.tagData) < 0,
				msg: msg
			};
		},
		add: function( item ){
			var rs = this.getAddableStatus( item );
			if ( rs.status ) {
				self.tagData.push( item );
				this.updateUI();
			} else {
				rs.msg && alert( rs.msg );
			}
		},
		remove: function( idx ){
			self.tagData.splice(idx, 1);
			this.updateUI();
		},
		updateUI: function(){
			var labelHTML = '';
			$.each( self.tagData, function( idx, item ){
				labelHTML += "<div class='J_label-group'>\
				<p class='tag-val'>" + item + "</p>\
				<span class='close_label'>x</span>\
			</div>"
			} );

			$('.J_label-content').html( labelHTML );

			self.trigger('datachange',{
				type: 'tag',
				isvalid: self.tagData.length>0
			});
		}
	};

	//创建标签
	$('.J_past').on('click', function( evt ){
		evt.preventDefault();
		var target = $('.J_style-detail input');
		var labelVal = target.val().replace(/\s+/g,"");//获取标签内容
		tagManager.add( labelVal );
		target.val('');

	})

	//删除标签
	$('.J_label-content').on('click', '.close_label', function(){
		var tagIdx = $(this).parent().index();
		tagManager.remove( tagIdx );
	})
}

LogoUpload.prototype.selectColor = function() {	
	var self = this;
	$('.color-group').on('click', 'input', function(){
        var itemWarp = $(this).closest(".color-group");
		var colorVal = $(this).val();
		if( $(this).is( ':checked' ) ){
			self.colorData.push(colorVal);
            itemWarp.addClass('color-checked');
		}else{
			var idx = $.inArray(colorVal, self.colorData)
	 		self.colorData.splice(idx, 1);
            itemWarp.removeClass('color-checked');
		}
		self.trigger('datachange', {
			type: 'color',
			isvalid: self.colorData.length
		});
	})
}

LogoUpload.prototype.isAgreeRule = function() {
	var self = this;
	$('#logo-rule').on('click', function(){
		self.trigger('datachange', {
			type: 'rule',
			isvalid: this.checked
		});
	})
}

LogoUpload.prototype.toString = function() {
	var logoColor = this.colorData.join(",");
	var logoTag = this.tagData.join("########");
	var target = $('#js-upload-box');
    var taskId = target.attr('data-taskID');
    var workId = target.attr('data-wid');
    var obj = {
    	fileinfo_id: this.fileId,
		work_id: workId, 
		task_id: taskId,
		logo_type: this.typeData,
		color:  logoColor,
		style: logoTag
    };
    this.imgData = $('.logo-upload').children('input').val();
    var reg = /^http/;
    if(!reg.test(this.imgData)){
    	obj.files=this.imgData;
    }
	return obj;
}

LogoUpload.prototype.clickSaveBtn = function() {
	var self = this;
	var url = getUrl('task', 'addfiletocrm/addfiletocrm');

	$(document.body).undelegate('.save');
	$(document.body).delegate('.upload-save-btn','click.save', function(evt){
		if( !$('.upload-save-btn').hasClass('disabled') ){
			evt.preventDefault();

			var data = self.toString();

			$.ajax({
	            type:'POST',
	            data: getData(data),
	            url: url,
	            dataType:'json',
	            success:function(json){
					if(json.state == -1){
						if(ZDK){
							ZDK.Tips(json.msg, 3000, "error");
						}else{
							alert(json.msg);
						}
					}else{
						self.previewData(json);
					}

	            },
	            error:function(){
	                console.log('出错了哦~');
	            }
	        });
		}else{
			return;
		}
	});


	function getData(data){
	
		var rs = [];

		for( var i in data){
			rs.push( i + '=' + encodeURIComponent( data[i] ) );	
		}
		
		return rs.join('&');

	}

	function getImgSrc(url){
        var imgUrlReg = /^.*?(task\/\d{4}-\d{2}\/.*?\/)(\w+.\w+?)".*$/;
        if (url.match(imgUrlReg)) {
            var imgUrl = url.replace(imgUrlReg,"$1middle$2");
            return "http://p6.zbjimg.com/"+imgUrl;
        }
        return null;
    }
}

LogoUpload.prototype.previewData = function( data ) {
	var logoFile = $('.j-logo-file'),
		target = $('.js-logo-upload-tip').attr('data-uploaded','1');
	if( logoFile.size() ){
		logoFile.remove();
	}

	$(".upload-box-bt").addClass('had-upload');

	$('.upload-box-wrap').after( previewTpl({data: data}) );
	target.show().nextAll('.tips').html('(已上传)');
	target.prev().show();

}

LogoUpload.prototype.delFile = function() {
	var self = this;
	$(document).on('click', '.uploadfile-cancel', function(){
		$(this).parent('li').remove();
		$('.logo-photo').show();
		self.imgData = '';
		self.trigger('datachange', {
			type: 'succeed_file',
			isvalid: self.imgData
		});
	})
}
