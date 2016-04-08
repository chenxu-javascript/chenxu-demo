/*
 * 上传组件 defaultUI
 *
 * created by chenxia
 *
 * 2015.12.31
 *
 * */

var utils = require('common:components/utils/utils');
var log = require('common:components/log/log');
var uploaderSDK = require('../baseUploader');

var LogoUploader = uploaderSDK.extend({
    attrs: {
        initData: null,
        uploadedWrapper: null,
        fileInput: null,
        ui: null,
        onError: function(up, error){
            if(error.isOut){
                this.ui.makeLimitError.call( this, error.file, error );
            }else if (error.file) {
                this.ui.makeError.call( this, error.file, error );
            }
        }
    }
    ,
    setup: function(options){
        LogoUploader.superclass.setup.call(this, options);
        this.init();
    },
    init: function(){
        this.ui.itemTpl = this.get('ui').itemTpl;
        this.uploadedWrapper = this.get('uploadedWrapper');
        this.fileInput = this.get('fileInput');
        this.uploadBtn.onclick = function(){
            log.sendLog({
                linkid: '10000285'
            });
        };
        this.ui.uiInit.call(this);
    },
    uploadedWrapper: null,
    fileInput: null,
    ui : {
        itemTpl: null,
        tip: $.noop,
        addFile: function( file ){
            var self = this;
            var item = $( tpl( this.ui.itemTpl, file ) );
            var ext = /(\.[^\.]+)?$/.exec( file.name )[1];
            if (/^(?:mp3|wav|wma|ogg)$/.test(ext)) {
                item.addClass('upload-type-music');
            }
            item.on('click', 'a[action-type="cancel"]', function () {
                self.ui.removeFile.call(self, file);
            });
            item.appendTo( this.uploadedWrapper );
            this.trigger('added', file);
        },
        removeFile: function( file ){
            this.uploadedWrapper.children('[data-pid="'+ file.id + '"]').remove();
            this.uploader.removeFile( file );
            this.trigger('remove', file);
        },
        uploadedCallback: function( file, res ){
            this.ui.makeSuccessUI.call( this, file, res );
        },
        makeSuccessUI: function( file, info ){
            var sData = JSON.stringify(info);
            var item = this.uploadedWrapper.children('[data-pid="'+ file.id + '"]');

            item.addClass('zbj-uploadfile-uploaded').removeClass("zbj-uploadfile-uploading");
            item.find('.zbj-uploadfile-status').html('上传成功!');
            item.find('.zbj-uploadfile-percent-ui').css('width','100%');
            item.find('.zbj-uploadfile-cancel').attr("del-val", sData);

            this.trigger('success', info, item, file);
        },
        makeError: function(file, error){
            var msg = error.message || '上传失败';
            var item = this.uploadedWrapper.children('[data-pid="'+ file.id + '"]');
            if(item && item.length){
                item.addClass('zbj-uploadfile-uploadfail').removeClass("zbj-uploadfile-uploading");
                item.find('.zbj-uploadfile-status').html( msg ).css('color','red');
                item.find('a[del-val]').removeAttr('del-val');
                if (error.response) {
                    var json = $.parseJSON(error.response) || {};
                    msg = json.message || msg;
                }
                this.ui.tip( msg );
                this.trigger('imgError', msg);
            }else{
                this.ui.makeLimitError.call(this, file, error);
            }
        },
        makeLimitError: function(file, error){
            var msg = error.message || '上传失败';
            var div = document.createElement('div');
            div.innerHTML = msg;
            div.style.color = 'red';
            div.className = 'limit_error';

            var parent = this.uploadBtn.parentNode;
            parent.appendChild(div);

            setTimeout(function(){
                $('.limit_error').hide().remove();
            }, 3000);

        },
        updateProgress: function( file ){
            var val = file.percent.toFixed(2);
            if ( val > 90 ) {
                val = 90;
            }
            var percent = val + '%';

            var item = this.uploadedWrapper.children( '[data-pid="'+ file.id + '"]' );
            item.addClass('zbj-uploadfile-uploading');
            item.find('.zbj-uploadfile-percent-val').html( percent );
            item.find('.zbj-uploadfile-percent-ui').css('width', percent);
        },
        uiInit: function(){
            var self = this;
            this.on('add', function(up, files){
                for(var i=0; i<files.length; i++){
                    self.ui.addFile.call( self, files[i] );
                }
            });
            this.on('progress', function(uo, file){
                self.ui.updateProgress.call( self, file );
            });
            this.on('uploaded', function(up, file, info){
                self.ui.uploadedCallback.call( self, file, info );
            });
            this.on('remove success', function(){
                var filesList = self.uploadedWrapper.find('a[del-val]');
                var filesVal = [];
                filesList.each(function(i, a){
                    filesVal.push( $(a).attr('del-val') );
                });
                self.fileInput.val(filesVal.join('-,'));
                self.trigger('datachange', self.getUploadedFileSize());
            });

            this.on("remove add", function(){
                self.trigger('filechange', self.uploader.files.length);
            });

            if( self.initData && self.initData.length ){
                //var initDataArrray = self.initData.split('-,');
                //init( initDataArrray );

                init(self.initData);
            }

            function init( data ){
                for ( var i = 0; i < data.length; i ++ ) {
                    var fileObj = mockFileObj( data[i] );
                    self.ui.addFile.call( self, fileObj );
                    self.ui.makeSuccessUI.call( self, fileObj, data[i] );
                    self.uploader.files.push( fileObj );
                }
            }

            function mockFileObj( data ){
                var fileName = readInfoFromData( '"ofilename";s:\\d+:"([^"]*)"', data );
                var fileId = data.file_id || utils.uuid();
                var fileType = readInfoFromData( '"ext";s:\\d+:"([^"]*)"', data );
                var size = readInfoFromData( '"size";s:\\d+:"([^"]*)"', data );

                data.id = fileId;
                self.setFileData(data);

                return {
                    id: fileId,
                    file_id: fileId,
                    name: fileName,
                    type: fileType,
                    size: size,
                    origSize: size,
                    loaded: size,
                    percent: 100,
                    status: plupload.DONE,
                    lastModifiedDate: +new Date(),
                    getNative: $.noop,
                    getSource: $.noop,
                    destroy: $.noop
                }
            }

            function readInfoFromData( pattern, str ){
                var reg = new RegExp( pattern );
                var rs = reg.exec( str );
                return rs[1];
            }
        }
    },
    isBusy: function(){
        for (var i = 0; i < this.uploader.files.length; i++) {
            var file = this.uploader.files[i];
            if (file.status == plupload.QUEUED ||
                file.status == plupload.UPLOADING) {
                return true;
            }
        }
        return false;
    },
    getUploadedFileSize: function(){
        var i = 0;
        $.each( this.uploader.files, function( idx, item ){
            if ( item.status == plupload.DONE ) {
                i++
            }
        } );
        return i;
    }
});

function tpl( str, data ){
    return str.replace(/<#([^#]*)#>/g,
        function(){
            var id = arguments[1];
            return data[id];
        }
    );
}

module.exports = LogoUploader;