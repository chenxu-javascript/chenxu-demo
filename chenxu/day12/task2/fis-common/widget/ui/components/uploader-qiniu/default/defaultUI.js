/*
 * 上传组件 defaultUI
 *
 * created by chenxia
 *
 * 2015.12.31
 *
 * */

var utils = require('common:components/utils/utils');
var uploaderSDK = require('../baseUploader');
require('./uploader.less');
var itemTpl = require('./item.tmpl');

var UploaderDefaultUI = uploaderSDK.extend({
    attrs: {
        uploadItemTpl: itemTpl,
        delete_input: '#delfiles',
        delete_val_type: 'pid', // 删除的数据类型，默认为 fileid，也可以是 key
        addItemUI: function( file, str ){
            var olddel = str === 'init';
            var itemStr = this.get('uploadItemTpl')({file: file, olddel: olddel});
            $( itemStr ).appendTo( this.list );
        },
        addItem: function( file, str){
            this.get('addItemUI').call(this, file, str);
            this.trigger('afterAdd', file);
        },
        updateUploadedItemUI: function( item, file, info ){
            var data = JSON.stringify(info);
            item
                .addClass('zbj-uploadfile-uploaded')
                .removeClass("zbj-uploadfile-uploading");

            item.find('.zbj-uploadfile-status').html('上传成功!');
            item.find('.zbj-uploadfile-percent-ui').css('width','100%');
            item.find('input[name="upload_files[]"]').val( data );

            file.isDrawed = true;
        },
        uploadedItem: function( file, info ){
            var item = this.getItem( file.id );

            this.get('updateUploadedItemUI').call( this, item, file, info );
            this.trigger('success', info, item, file);
        },
        onAdd: function( uploader, files ) {
            var self = this;
            $.each( files, function( i, file ) {
                self.get('addItem').call( self, file);
            });
        },
        updateProgressUI: function( item, percent, file ){
            item
                .addClass('zbj-uploadfile-uploading')
                .find('.zbj-uploadfile-percent-val').html( percent );
            item.find('.zbj-uploadfile-percent-ui').css('width', percent);
        },
        onProgress: function( uploader, file ) {
            var val = file.percent >= 90 ? 90 : file.percent;
            var percent = val + '%';
            var item = this.list.children( '[data-pid="'+ file.id + '"]' );

            this.get('updateProgressUI').call( this, item, percent, file );
        },
        onComplete : function(uploader, file){

        },
        onUploaded: function( uploader, file, res ) {
            this.get('uploadedItem').call( this, file, res );
        },

        updateErrorUI: function( item, error ){
            var msg = error.message || '上传失败';

            item
                .addClass('zbj-uploadfile-uploadfail')
                .removeClass("zbj-uploadfile-uploading");
            item
                .find('.zbj-uploadfile-status')
                .html( msg )
                .css('color','red');
        },
        onError: function( uploader, error ){
            var isOut = error.isOut;
            var file = error.file;
            var id = file ? file.id : null;
            var item = id ? this.getItem( id ) : [];

            if(isOut) {
                item = this.element.find('.limit_error');
                if(item.length == 0){
                    ($('<div class="limit_error"></div>')).appendTo(this.element);
                    item = this.element.find('.limit_error');
                }
                this.get('limitErrorUI').call( this, item, error );
            }else{
                if(item.length === 0 || !item){
                    item = this.element.find('.limit_error');
                    if(item.length == 0){
                        ($('<div class="limit_error"></div>')).appendTo(this.element);
                        item = this.element.find('.limit_error');
                    }
                    this.get('limitErrorUI').call( this, item, error );
                }else{
                    this.get('updateErrorUI').call( this, item, error );
                }

            }

            this.trigger('uploadError', error);
        },
        limitErrorUI: function(item, err){
            var msg = err.message;
            var code = err.code;

            if(code == 'noflash'){
                item.append( '<p>'+msg+'</p>' );
            }else{
                item.append( '<p>'+msg+'</p>' );
                setTimeout(function(){
                    item.html('');
                }, 5000);
            }

        },
        onBeforeRemove: function(item, file){
            item
                .addClass('zbj-uploadfile-uploadfail')
                .removeClass("zbj-uploadfile-uploading");
            item
                .find('.zbj-uploadfile-status')
                .html('正在删除...');
        }
    },
    setup: function(options){
        UploaderDefaultUI.superclass.setup.call(this, options);
        this.init();
    },
    init: function(){
        var self = this;
        var list = this.element.find('.zbj-uploadfile-list');

        if ( !list.length ) {
            list = $('<ul class="zbj-uploadfile-list"></ul>').appendTo( this.element );
        }
        this.list = list;

        var initFiles =  this.get('init_files');
        var fileList = this.list.find('li');
        var defaultFiles = [];

        if(fileList.length > 0) {
            fileList.each(function(i){
                var val = $(this).find('input[type="hidden"]').val();
                val = self.parseJSON(val);
                defaultFiles[i] = val;
                self.initBaseFile( defaultFiles[i] );
            });
            this.set('init_files', defaultFiles);
        }else if(fileList.length === 0 && initFiles.length > 0) {
            for(var i=0; i<initFiles.length; i++){
                self.initFile( initFiles[i] );
            }
        }

        $('#'+this.get('browse_button')).addClass('zbj-upload-btn');
    },
    initBaseFile: function( fileData ){
        var fileObj = this.mockFileObj( fileData );

        this.uploader.files.push( fileObj );
        this.uploader.trigger('queueChanged');
    },
    initFile: function( fileData ){
        var fileObj = this.mockFileObj( fileData );

        this.get('addItem').call( this, fileObj, 'init');
        this.get('uploadedItem').call( this, fileObj, fileData );

        this.uploader.files.push( fileObj );
        this.uploader.trigger('queueChanged');

    },
    mockFileObj: function( fileData ){
        var fileId = fileData.file_id || utils.uuid();
        var size = fileData.filesize || 100;
        var type = fileData.filext ? fileData.filext.substring( fileData.filext.lastIndexOf('.') + 1 ) : '';
        var name = fileData.ofilename || '';
        var fileObj = {
            id: fileId,
            name: name,
            type: type,
            size: size,
            origSize: size,
            loaded: size,
            percent: 100,
            status: plupload.DONE,
            lastModifiedDate: +new Date(),
            getNative: $.noop,
            getSource: $.noop,
            destroy: $.noop
        };

        fileData.id = fileId;
        this.setFileData(fileData);

        return fileObj;
    },
    removeFile: function( evt ){

        evt.preventDefault();
        evt.stopPropagation();

        var self = this;
        var currentTarget = $(evt.target);
        var pid = currentTarget.attr('data-pid');
        var isOld = currentTarget.attr('data-olddel');
        var fileInput = currentTarget.parent().find('input[type="hidden"]');
        var fileInputVal = fileInput.val();
        var data =  fileInputVal ? self.parseJSON(fileInputVal) : {};
        var file = this.uploader.getFile( Number(pid) ) || this.uploader.getFile( pid );  //后端传过来的值有可能是数字也可能是字符串,没有统一,就这里处理下吧
        var item = this.getItem( pid );
        var key = data ? data.filename : null;
        var delUrl = key ? this.getUrl(key).deleteUrl : null;
        var removedSuccess = function(){
            if(isOld == 'true'){
                self.insertDeleteInput( self.get('delete_val_type') == 'pid' ? pid : key );
            }
            item.remove();
            if(file){
                self.uploader.removeFile( file );
            }
            self.trigger('remove', file);
        };

        self.trigger('beforeRemove', item, file);

        removedSuccess();
    },
    getItem: function( fileId ){
        return this.list.children( '[data-pid="'+ fileId + '"]' );
    },
    insertDeleteInput: function(key){
        var delfilesInput = $(this.get('delete_input'));

        if(delfilesInput.length === 0){
            delfilesInput = $('<input type="hidden" name="delfiles" id="delfiles"/>').appendTo(this.element);
        }

        var delfileVal = delfilesInput.val();

        delfilesInput.val(delfileVal ? delfileVal + ',' + key : key);
    },
    isBusy: function () {
        var files = this.uploader.files;
        var isAllDrawed = true;
        var queued = this.uploader.total.queued ? true : false;

        for(var i=0;i<files.length;i++){
            if(!files[i].isDrawed){
                isAllDrawed = false;
            }
        }

        var isBusy = queued || !isAllDrawed;

        return isBusy;
    }

});

module.exports = UploaderDefaultUI; //无ui版uploader

