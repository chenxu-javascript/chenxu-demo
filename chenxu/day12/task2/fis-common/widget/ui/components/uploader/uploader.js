/**
 *
 * 上传组件
 *
 */

/**
 *
 * 上传的核心，以及一个 默认的带的 UI 上传器
 *
 */

var Widget = require("arale/widget/1.1.1/widget-debug");
var utils = require('common:components/utils/utils');

require("./plupload/plupload.full.min.js");
require("./uploader.less");

var swfPath = __uri('./plupload/moxie.swf');
var xapPath = __uri('./plupload/moxie.xap');

var itemTpl = require('./item.tmpl');

//    require.async('common:components/uploader/item.tmpl#', function( tpl ){
//        console.log( tpl.toString() );
//    });

var uid = $('#upload_uid').val() || 2551;
var token = $('#upload_token').val() || window.ZBJInfo.uploadToken;

var uploadUrl =  utils.getUrl('upload', 'fileupload/index' + '?uid='+ uid +'&token=' + token);

var FILE_COUNT_ERROR = 9001;

plupload.addFileFilter('max_file_count', function(maxCount, file, cb) {
    if ( this.files.length + 1 > maxCount ) {
        this.trigger('Error', {
            code : FILE_COUNT_ERROR,
            message : "File count error.",
            file : file
        });
        cb( false );
    } else {
        cb( true );
    }
});


var UploaderCore = Widget.extend({
    attrs: {
        init_files: [],
        browse_button: {
            value: '',
            getter: function( val ){
                return typeof val == 'object' ? val[0] : val;
            }
        },
        runtimes : 'html5,html4,flash,silverlight',
        fileInput: '',
        acceptExt: '',
        max_file_size: 0,
        count_limit: 10,
        extra_params: '',
        max_retries: 1,
        multi_selection: true,
        chunk_size: 0,
        prevent_duplicates: 1,
        url: uploadUrl,
        getTotalFiles: $.noop,
        onAdd: $.noop,
        onProgress: $.noop,
        onUploaded: $.noop,
        onComplete: $.noop,
        onError: $.noop
    },

    uploader: null,

    setup: function(){
        var self = this;

        var extra_params = this.get('extra_params');

        var uploader = this.uploader = new plupload.Uploader({
            runtimes : this.get('runtimes'),
            browse_button: this.get('browse_button'),
            url: this.get('url') + (extra_params ? '&' + extra_params : ''),
            flash_swf_url: swfPath,
            silverlight_xap_url: xapPath,
            chunk_size: this.get('chunk_size'),
            max_retries: this.get('max_retries'),
            multi_selection: this.get('multi_selection'),

            filters: {
                mime_types : this.get('acceptExt'),
                prevent_duplicates: this.get('prevent_duplicates'),
                max_file_size: this.get('max_file_size'),
                max_file_count: this.get('count_limit')
            },

            init: {
                FilesAdded: function (uploader, files) {

                    var overflow = 0;
                    var deletedFiles = [];

                    for ( var i = files.length, file; file = files[--i]; ) {
                        if ( uploader.files.length > self.get('count_limit')  ) {
                            uploader.removeFile( file );
                            deletedFiles.push( files.splice(i - 1) );
                            overflow = 1;
                        }
                    }

                    self.trigger('add', uploader, files);
                    overflow && this.trigger('Error', {
                        code : FILE_COUNT_ERROR,
                        message : "File count error.",
                        file : deletedFiles
                    });

                },
                QueueChanged: function ( uploader ) {
                    setTimeout(function () {
                        if (uploader.files.length > 0 && uploader.state !== plupload.STARTED) {
                            uploader.start();
                        }
                    });
                },
                UploadProgress: function (uploader, file) {
                    self.trigger('progress', uploader, file);
                },
                FileUploaded: function (uploader, file, info) {
                    self.trigger('uploaded', uploader, file, info );
                },
                UploadComplete: function (uploader) {
                    self.trigger('complete', uploader );
                },
                Error: function (uploader, error) {
                    self.trigger('error', uploader, error );
                }
            }
        });
        uploader.init();
    },
    isBusy: function(){
        return this.uploader.total.queued;
    }
});

var Uploader = UploaderCore.extend({
    attrs: {
        uploadItemTpl: itemTpl,
        addItemUI: function( file ){
            var itemStr = this.get('uploadItemTpl')({file: file});
            $( itemStr ).appendTo( this.list );
        },
        addItem: function( file ){
            this.get('addItemUI').call(this, file);
            this.trigger('afteradd', file);
        },
        updateUploadedItemUI: function( item, file, info ){
            item
                .addClass('zbj-uploadfile-uploaded')
                .removeClass("zbj-uploadfile-uploading");

            item.find('.zbj-uploadfile-status').html('上传成功!');
            item.find('.zbj-uploadfile-percent-ui').css('width','100%');
            item.find('input[name="upload_file"]').val( info.file );
        },
        uploadedItem: function( file, info ){
            var item = this.getItem( file.id );

            this.get('updateUploadedItemUI').call( this, item, file, info );
            this.trigger('success', info, item, file);
        },
        onAdd: function( uploader, files ) {
            var self = this;
            $.each( files, function( i, file ) {
                self.get('addItem').call( self, file );
            } );
        },
        updateProgressUI: function( item, percent, file ){
            item
                .addClass('zbj-uploadfile-uploading')
                .find('.zbj-uploadfile-percent-val').html( percent )
                .find('.zbj-uploadfile-percent-ui').css('width', percent);
        },
        onProgress: function( uploader, file ) {
            var val = file.percent;
            if ( val >= 90 ) {
                val = 90;
            }
            var percent = val + '%';

            var item = this.list.children( '[data-pid="'+ file.id + '"]' );

            this.get('updateProgressUI').call( this, item, percent, file );
        },
        onUploaded: function( uploader, file, res ) {
            var info = {};
            try {
                info = $.parseJSON(res.response).data || {};
            } catch(ex){}

            this.get('uploadedItem').call( this, file, info );
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
            var item = this.getItem( error.file.id );
            this.get('updateErrorUI').call( this, item, error );

            this.trigger('uploadError', error);
        }
    },
    events: {
        'click [action-type="delete"]': "removeFile"
    },
    setup: function(){
        Uploader.superclass.setup.call(this);
        this.init();
    },
    init: function(){
        var list = this.element.find('.zbj-uploadfile-list');
        if ( !list.length ) {
            list = $('<ul class="zbj-uploadfile-list"></ul>').appendTo( this.element );
        }

        this.list = list;

        var initFiles =  this.get('init_files');

        if ( initFiles ) {
            for ( var i = 0; i < initFiles.length; i ++ ) {
                this.initFile( initFiles[i] );
            }
        }
    },
    initFile: function( fileData ){

        var fileObj = this.mockFileObj( fileData );

        this.get('addItem').call( this, fileObj );
        this.get('uploadedItem').call( this, fileObj, fileData );

        this.uploader.files.push( fileObj );
        this.uploader.trigger('QueueChanged');

    },
    mockFileObj: function( fileData ){
        var fileId = utils.uuid();
        var file = fileData.file;
        var size = fileData.size || 100;
        var type = file.substring( file.lastIndexOf('.') + 1 );

        var fileObj = {
            id: fileId,
            name: fileData.name,
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
        return fileObj;
    },
    removeFile: function( evt ){
        var pid = $(evt.target).attr('data-pid');
        var item = this.getItem( pid );
        item.remove();

        var file = this.uploader.getFile( pid );
        this.uploader.removeFile( file );
        this.trigger('remove', file);
    },
    getItem: function( fileId ){
        return this.list.children( '[data-pid="'+ fileId + '"]' );
    }
});

module.exports = Uploader;

module.exports.uploadCore = UploaderCore;
