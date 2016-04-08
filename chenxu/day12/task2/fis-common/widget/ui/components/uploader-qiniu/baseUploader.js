/*
 * 上传组件 baseUploader
 *
 * created by chenxia
 *
 * 2015.12.31
 *
 * */

var Widget = require("arale/widget/1.1.1/widget-debug");
var utils = require('common:components/utils/utils');
var log = require('common:components/log/log');

require("./plupload/plupload.full.min.js");

var swfPath = __uri('./plupload/Moxie.cdn.swf');
var xapPath = __uri('./plupload/Moxie.xap');

var FILE_COUNT_ERROR = 9001;
var FILE_EMPTY_ERROR = 9002;

var uploadLog = function ( name, value  ){
    log.sendLog({
        name: name,
        value: value || 1,
        t: 'upload-qiniu'
    });
};

var timeCache = {
    list: {},
    set: function( file ){
        if ( !this.list[ file.id ] ) {
            this.list[ file.id ] = +new Date();
        }
    },
    get: function( file ){
        return +new Date() - this.list[ file.id ] || 0;
    }
};


plupload.addFileFilter('max_file_count', function(maxCount, file, cb) {
    if ( this.files.length + 1 > maxCount ) {
        this.trigger('Error', {
            code : FILE_COUNT_ERROR,
            file : file,
            isOut : true
        });
        cb( false );
    } else {
        cb( true );
    }
});

var UploaderSDK = Widget.extend({
    attrs: {
        uploadItemTpl: null,
        delete_input: null,
        init_files: [],
        uploadBtn: null,
        browse_button: {
            value: '',
            getter: function (val) {
                return typeof val == 'object' ? ( val.length ? val[0] : val) : val;
            }
        },
        runtimes: 'html5,flash,html4',
        fileInput: '',
        acceptExt: [ //所有类型
            { title : "Image files", extensions : "jpg,gif,png,bmp,jpeg,tif,eps" },
            { title : "Zip files", extensions : "zip,rar,7z" },
            { title : "Document files", extensions: "pdf,ppt,pptx,doc,docx,xls,xlsx,page,txt,mht,numbers" },
            { title : "Media files", extensions: "swf,fla,mp3,mp4,m4a,wma,mpg"},
            { title : "Project files", extensions : "dwg,psd,max,ezp,ai,cdr,indd,obj" },
            { title : "Other files",  extensions: "ttc,ttf,otf,key,abr,eip" }
        ],
        resize: {},
        key_handler: null,
        max_file_size: '10mb',
        count_limit: 5,
        file_params: '',
        max_retries: 1,
        chunk_size: '4mb',
        prevent_duplicates: 1,
        url: window.location.protocol === 'https:' ? 'https://up.qbox.me' : 'http://upload.qiniu.com',
        qiniuUploadUrls: [
            "http://upload.qiniu.com",
            "http://up.qiniu.com"
        ],
        changeUrlTimes: 0,
        getTotalFiles: $.noop,
        onAdd: $.noop,
        onProgress: $.noop,
        onUploaded: $.noop,
        onComplete: $.noop,
        onQueueChanged: $.noop,
        onAfterAdd: $.noop,
        onRemove: $.noop,
        onError: $.noop,
        belongToDomain: 'default',
        belongToSystem: 'default',
        tokenUrl : 'http://192.168.143.0:8087/rms/resource/',
        drop_element: null,
        multi_selection: true,
        watermark_type: '',
        watermark_img: ''

    },

    // 存储获取的token值，{name: [token,key]}
    tokenObj: {},
    uploader: null,
    files: {},
    uploadBtn: null,
    events: {
        'click [action-type="delete"]': "removeFile"
    },
    setup: function (options) {
        UploaderSDK.superclass.setup.call(this, options);
        var self = this, ctx = '';
        var speedCalInfo = {
            isResumeUpload: false,
            resumeFilesize: 0,
            startTime: '',
            currentTime: ''
        };

        self.resetUploadUrl();
        self.resetChunkSize();

        self.uploadBtn = this.get('browse_button') || this.get('uploadBtn').get(0);

        var uploader = this.uploader = new plupload.Uploader({
            runtimes: this.get('runtimes'),
            browse_button: this.uploadBtn,
            flash_swf_url: swfPath,
            silverlight_xap_url: xapPath,
            max_retries: this.get('max_retries'),
            url: this.get('url'),
            chunk_size: this.get('chunk_size'),
            drop_element: this.get('drop_element'),
            filters : {
                max_file_size: this.get('max_file_size'),
                mime_types: this.get('acceptExt'),
                prevent_duplicates: this.get('prevent_duplicates')
            },
            max_file_count: this.get('count_limit'),
            multi_selection: this.get('multi_selection'),
            init: {
                Init: function(up){
                    var hasFlash = self.hasflash();
                    var runtime = up.runtime;

                    if(!hasFlash && runtime === 'html4') {
                        uploader.trigger('Error', {
                            code : 'noflash',
                            isOut: true
                        });
                        uploadLog('noflash');
                        up.destroy();
                    }

                },
                'FilesAdded': function (up, files) {
                    var overflow = 0;
                    var deletedFiles = [];
                    var filterFiles = [];


                    for(var i = files.length, file; file = files[--i]; ){
                        if(!file.size){
                            this.trigger('Error', {
                                code : FILE_EMPTY_ERROR,
                                file : file,
                                isOut: true
                            }, file.name+'为空文件， 不能上传');
                            uploader.removeFile( file );
                        }else{
                            filterFiles.unshift(file);
                        }
                    }

                    for ( var i = filterFiles.length, file; file = filterFiles[--i]; ) {
                        file.name = self.filterFileName(file.name);
                        if ( uploader.files.length > self.get('count_limit')  ) {
                            uploader.removeFile( file );
                            deletedFiles.push( filterFiles.pop() );
                            overflow = 1;
                        }
                    }

                    if(filterFiles.length > 0){
                        // 获取toke和key
                        self.getUpToken(filterFiles, function (errData) {
                            if(errData && errData.code){
                                uploader.trigger('Error', {
                                    code : errData.code,
                                    isOut: true
                                }, errData.description);
                            }else{
                                self.trigger('add', uploader, filterFiles);
                                up.start();
                            }

                            up.refresh(); // Reposition Flash/Silverlight

                        });
                    }

                    overflow && this.trigger('Error', {
                        code : FILE_COUNT_ERROR,
                        isOut: true
                    });
                },
                'BeforeUpload': function (up, file) {
                    file.speed = file.speed || 0; // add a key named speed for file obj
                    ctx = '';

                    var directUpload = function(up, file) {
                        speedCalInfo.startTime = new Date().getTime();
                        var multipart_params_obj = {
                            'key': self.tokenObj[file.name][1],
                            'token': self.tokenObj[file.name][0]
                        };

                        up.setOption({
                            'url': self.get('url'),
                            'multipart': true,
                            'chunk_size': up.getOption('max_file_size') || undefined,
                            'multipart_params': multipart_params_obj
                        });
                    };

                    var chunk_size = up.getOption && up.getOption('chunk_size');
                    var fsize = file.size ? file.size : 0;
                    chunk_size = chunk_size || (up.settings && up.settings.chunk_size);
                    if (uploader.runtime === 'html5' && chunk_size) {
                        if (fsize < chunk_size) {
                            directUpload(up, file);
                        } else {
                            var localFileInfo = localStorage.getItem(file.name);
                            var blockSize = chunk_size;
                            if (localFileInfo) {
                                localFileInfo = eval('('+localFileInfo+')');
                                var now = (new Date()).getTime();
                                var before = localFileInfo.time || 0;
                                var aDay = 24 * 60 * 60 * 1000; //  milliseconds
                                if (now - before < aDay) {
                                    if (localFileInfo.percent !== 100) {
                                        if (file.size === localFileInfo.total) {
                                            // 通过文件名和文件大小匹配，找到对应的 localstorage 信息，恢复进度
                                            file.percent = localFileInfo.percent;
                                            file.loaded = localFileInfo.offset;
                                            ctx = localFileInfo.ctx;

                                            //  计算速度时，会用到
                                            speedCalInfo.isResumeUpload = true;
                                            speedCalInfo.resumeFilesize = localFileInfo.offset;
                                            if (localFileInfo.offset + blockSize > file.size) {
                                                blockSize = file.size - localFileInfo.offset;
                                            }
                                        } else {
                                            localStorage.removeItem(file.name);
                                        }

                                    } else {
                                        // 进度100%时，删除对应的localStorage，避免 499 bug
                                        localStorage.removeItem(file.name);
                                    }
                                } else {
                                    localStorage.removeItem(file.name);
                                }
                            }

                            speedCalInfo.startTime = new Date().getTime();
                            up.setOption({
                                'url':  self.get('url') + '/mkblk/' + blockSize,
                                'multipart': false,
                                'chunk_size': chunk_size,
                                'required_features': "chunks",
                                'headers': {
                                    'Authorization': 'UpToken ' + self.tokenObj[file.name][0]
                                },
                                'multipart_params': {}
                            });

                            // directUpload(up, file);

                        }
                    } else {
                        directUpload(up, file);
                    }

                },
                'QueueChanged': function (uploader) {
                    self.trigger('queuechanged', uploader);
                },
                'UploadProgress': function (up, file) {
                    // 计算速度
                    speedCalInfo.currentTime = new Date().getTime();
                    var timeUsed = speedCalInfo.currentTime - speedCalInfo.startTime; // ms
                    var fileUploaded = file.loaded || 0;
                    if (speedCalInfo.isResumeUpload) {
                        fileUploaded = file.loaded - speedCalInfo.resumeFilesize;
                    }
                    file.speed = (fileUploaded / timeUsed * 1000).toFixed(0) || 0; // unit: byte/s

                    timeCache.set( file );
                    self.trigger('progress', up, file);
                },
                'UploadComplete': function (up) {
                    self.trigger('complete', up);
                    uploadLog('complete');
                },
                'ChunkUploaded': function (up, file, info) {
                    var res = self.parseJSON(info.response);
                    ctx = ctx ? ctx + ',' + res.ctx : res.ctx;
                    var leftSize = info.total - info.offset;
                    var chunk_size = up.getOption && up.getOption('chunk_size');
                    chunk_size = chunk_size || (up.settings && up.settings.chunk_size);
                    if (leftSize < chunk_size) {
                        up.setOption({
                            'url': self.get('url') + '/mkblk/' + leftSize
                        });
                    }
                    localStorage.setItem(file.name, JSON.stringify({
                        ctx: ctx,
                        percent: file.percent,
                        total: info.total,
                        offset: info.offset,
                        time: (new Date()).getTime()
                    }));

                    self.trigger('chunkuploaded', up, file, info);
                },
                'FileUploaded': function (up, file, info) {
                    var key = self.tokenObj[file.name][1];
                    var fkey = '/key/' + self.URLSafeBase64Encode(key);
                    var fname = '/fname/' +  self.URLSafeBase64Encode(file.name);
                    var fsize = file.size ? file.size : 0;
                    var url = self.get('url') + '/mkfile/' + fsize + fkey + fname;
                    var last_step = function(up, file, info){
                        var data = {}, dataStr = info.response || info;
                        try {
                            data = $.parseJSON(dataStr).data || {};
                            data.id = file.id;
                            data = self.mockFileJson(data);
                        } catch(ex){}

                        self.trigger('uploaded', up, file, data);
                        uploadLog('uploadtime', timeCache.get( file ));
                    };

                    var res = self.parseJSON(info.response);
                    ctx = ctx ? ctx : res.ctx;

                    if(ctx){
                        var ajax = self.createAjax();
                        ajax.open('POST', url, true);
                        ajax.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
                        ajax.setRequestHeader('Authorization', 'UpToken ' + self.tokenObj[file.name][0]);
                        ajax.onreadystatechange = function() {
                            if (ajax.readyState === 4) {
                                localStorage.removeItem(file.name);
                                if (ajax.status === 200) {
                                    var info = ajax.responseText;
                                    last_step(up, file, info);
                                } else {
                                    uploader.trigger('Error', {
                                        status: ajax.status,
                                        response: ajax.responseText,
                                        file: file,
                                        code: -200
                                    });
                                }
                            }
                        };
                        ajax.send(ctx);
                    }else{
                        last_step(up, file, info);
                    }
                },
                'FilesRemoved': function (uploader, files) {
                    self.trigger('removed', uploader, files);
                },
                'Error': function (up, err, errTip) {
                    var errTip = errTip || '';

                    switch (err.code) {
                        case plupload.FAILED:
                            errTip = '上传失败,请稍后再试。';
                            break;
                        case plupload.FILE_SIZE_ERROR:
                            errTip = '文件超过大小限制。';
                            break;
                        case plupload.FILE_EXTENSION_ERROR:
                            errTip = '文件验证失败,' + (err.file ? err.file.name : '') + ' 不符合上传类型';
                            break;
                        case plupload.FILE_DUPLICATE_ERROR:
                            errTip = '文件已存在。';
                            break;
                        case plupload.HTTP_ERROR:
                            if (err.response === '') {
                                errTip = err.message || '未知网络错误。';
                                break;
                            }
                            var errorObj = self.parseJSON(err.response);
                            var errorText = errorObj.error;
                            switch (err.status) {
                                case 400:
                                    errTip = "请求报文格式错误。";
                                    break;
                                case 401:
                                    errTip = "客户端认证授权失败。请重试或提交反馈。";
                                    break;
                                case 405:
                                    errTip = "客户端请求错误。请重试或提交反馈。";
                                    break;
                                case 579:
                                    errTip = "资源上传成功，但回调失败。";
                                    break;
                                case 599:
                                    errTip = "网络连接异常。请重试或提交反馈。";
                                    break;
                                case 614:
                                    errTip = "文件已存在。";
                                    try {
                                        errorObj = self.parseJSON(errorObj.error);
                                        errorText = errorObj.error || 'file exists';
                                    } catch (e) {
                                        errorText = errorObj.error || 'file exists';
                                    }
                                    break;
                                case 631:
                                    errTip = "指定空间不存在。";
                                    break;
                                case 701:
                                    errTip = "上传数据块校验出错。请重试或提交反馈。";
                                    break;
                                default:
                                    errTip = "未知错误。";
                                    break;
                            }
                            break;
                        case plupload.SECURITY_ERROR:
                            errTip = '安全配置错误。请联系网站管理员。';
                            break;
                        case plupload.GENERIC_ERROR:
                            errTip = '上传失败。请稍后再试。';
                            break;
                        case plupload.IO_ERROR:
                            errTip = '上传失败。请稍后再试。';
                            break;
                        case plupload.INIT_ERROR:
                            errTip = '网站配置错误。请联系网站管理员。';
                            uploader.destroy();
                            break;
                        case FILE_COUNT_ERROR:
                            errTip = "只允许上传" + self.get('count_limit') + "个文件！";
                            break;
                        case '6xx':
                            errTip = '文件名称太长，请重命名后上传';
                            break;
                        case '5xx':
                            break;
                        case '4xx':
                            break;
                        case 'noflash':
                            errTip = '您还没安装flash, 请<a href="https://get.adobe.com/cn/flashplayer/" target="_blank">立即安装</a>。';
                            break;
                        case 'notComplete':
                            errTip = '文件正在上传，请上传完后再做操作';
                            break;
                        case FILE_EMPTY_ERROR:
                            break;
                        default:
                            // errTip = err.message + err.details;
                            errTip = err.message ? err.message : '未知网络错误。';
                            break;
                    }

                    up.refresh();

                    err.message = errTip;

                    self.trigger('error', up, err);
                    uploadLog('error');
                }
            }
        });

        uploader.init();

    },

    reset : function(){

        this.uploader.files = [];

        //var files = this.uploader.files;
        //for(var i=0; i<files.length;i++){
        //    this.uploader.removeFile(files[i]);
        //}
    },

    removeFile : function(evt){
        evt.preventDefault();
        evt.stopPropagation();

        var self = this;
        var currentTarget = $(evt.target);
        var pid = currentTarget.attr('data-pid');
        var file = this.uploader.getFile( pid );

        self.uploader.removeFile( file );
        self.trigger('remove', file);
    },

    // 七牛上传token与KEy获取
    getUpToken: function (files, callback) {
        var self = this;

        // 如果要打水印，那么需要将资源文件分为两份，图片和非图片资源
        var watermark_type = this.get('watermark_type');
        if(watermark_type){
            var processType = this.get('watermark_type');
            var processParam = this.URLSafeBase64Encode(this.get('watermark_img'));
        }


        var img_group = [];
        var nonimg_group = [];

        initFilesGroup();

        var taskLen = Number(!!img_group.length) + Number(!!nonimg_group.length);

        if(watermark_type && img_group.length) {
            requestUploadParams(img_group, 'img');
        }
        if(nonimg_group.length){
            requestUploadParams(nonimg_group);
        }


        function onComplete(err){
            taskLen--;
            if(taskLen == 0){
                callback(err);
            }
        }


        function initFilesGroup(){
            $.each(files, function(idx, item){
                if(watermark_type && self.isImage(item.name)){
                    img_group.push(item);
                } else {
                    nonimg_group.push(item);
                }
            })
        }

        function requestUploadParams(files, type){
            var data = makeRequestData(files, type);

            $.ajax({
                url: self.get('tokenUrl') + 'getUploadParamJsonp',
                data: data,
                type: 'get',
                jsonp: 'jsonpCallback',
                traditional: true,
                dataType: 'jsonp',
                success: function (json) {
                    onGetData(json, files);
                }
            })

        }

        function onGetData(json, files){
            if (json.success) {
                var data = json.data;
                for (var i = 0, n = data.length; i < n; i++) {
                    var name = data[i].name;
                    var token = data[i].token;
                    var key = data[i].key;
                    self.tokenObj[name] = [token, key];
                }
                onComplete();
            }else{
                for(var i = 0; i < files.length; i++){
                    self.uploader.removeFile(files[i]);
                }
                onComplete(json);
            }
        }

        function makeRequestData(files, type){
            var fileNames = [];
            for (var i = 0, n = files.length; i < n; i++) {
                fileNames.push(files[i].name);
            }

            var data = {
                name: fileNames,
                belongToDomain: self.get('belongToDomain'),
                belongToSystem: self.get('belongToSystem')
            };

            if(type == 'img' && processType){
                data.processType = processType;
                data.processParam = processParam;
            }

            return data;
        }

    },

    removeFileOfUploader: function(id){

    },

    removeFileOfUploader: function(id){

    },

    // 获取相关操作地址(下载，预览，删除)
    getUrl : function(key){
        var downloadUrl = this.get('tokenUrl') + 'getDownloadParamJsonp?key=' + key;
        var redirectUrl = this.get('tokenUrl') + 'redirect?key=' + encodeURIComponent(key);
        return {
            downloadUrl : downloadUrl,
            previewUrl : redirectUrl
        };
    },

    //文件上传七牛之后返回数据重构
    mockFileJson: function( fileData ){
        var fileObj = {
            id: fileData.id || utils.uuid(),
            filename: fileData.key,
            ofilename: fileData.fname,
            filesize: fileData.fsize,
            filext: fileData.ext.substring( fileData.ext.lastIndexOf('.') + 1 ),
            mimetype: fileData.mimeType,
            hash: fileData.hash,
            width: fileData.width,
            height: fileData.height
        };

        this.setFileData(fileObj);

        return fileObj;
    },

    // 检测是否为图片
    /**
     * is image
     * @param  {string}  url of a file
     * @return {Boolean} file is a image or not
     */
    isImage : function(key){
        return /\.(png|jpg|jpeg|gif|bmp)$/i.test(key);
    },

    // 图片预览
    imageView : function(op, key){
        var mode = op.mode || '',
            w = op.w || '',
            h = op.h || '',
            q = op.q || '',
            format = op.format || '';
        if (!mode) {
            return false;
        }
        if (!w && !h) {
            return false;
        }

        var imageUrl = 'imageView2/' + mode;
        imageUrl += w ? '/w/' + w : '';
        imageUrl += h ? '/h/' + h : '';
        imageUrl += q ? '/q/' + q : '';
        imageUrl += format ? '/format/' + format : '';
        if (key) {
            imageUrl = this.getUrl(key) + '?' + imageUrl;
        }
        return imageUrl;

    },

    // 获取文件扩展名
    /**
     * get file extension
     * @param  {string} filename
     * @return {string} file extension
     * @example
     *     input: test.txt
     *     output: txt
     */
    getFileExtension: function(filename) {
        var tempArr = filename.split(".");
        var ext;
        if (tempArr.length === 1 || (tempArr[0] === "" && tempArr.length === 2)) {
            ext = "";
        } else {
            ext = tempArr.pop().toLowerCase(); //get the extension and make it lower-case
        }
        return ext;
    },

    // 对数据进行 base64 编码转换
    /**
     * encode data by base64
     * @param  {string} data to encode
     * @return {string} encoded data
     */
    base64_encode : function(data) {
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
            ac = 0,
            enc = '',
            tmp_arr = [];

        if (!data) {
            return data;
        }

        data = this.utf8_encode(data + '');

        do { // pack three octets into four hexets
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);

            bits = o1 << 16 | o2 << 8 | o3;

            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;

            // use hexets to index into b64, and append result to encoded string
            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (i < data.length);

        enc = tmp_arr.join('');

        switch (data.length % 3) {
            case 1:
                enc = enc.slice(0, -2) + '==';
                break;
            case 2:
                enc = enc.slice(0, -1) + '=';
                break;
        }

        return enc;
    },

    // 对 URL 进行 base64 编码转换
    URLSafeBase64Encode : function(v) {
        v = this.base64_encode(v);
        return v.replace(/\//g, '_').replace(/\+/g, '-');
    },

    stringifyJSON : function(object){
        if (window.JSON && window.JSON.stringify) {
            return window.JSON.stringify(object);
        }
    },

    // todo图片水印
    watermark : function(op, key){
        /*var mode = op.mode;
         if (!mode) {
         return false;
         }

         var imageUrl = 'watermark/' + mode;

         if (mode === 1) {
         var image = op.image || '';
         if (!image) {
         return false;
         }
         imageUrl += image ? '/image/' + this.URLSafeBase64Encode(image) : '';
         } else if (mode === 2) {
         var text = op.text ? op.text : '',
         font = op.font ? op.font : '',
         fontsize = op.fontsize ? op.fontsize : '',
         fill = op.fill ? op.fill : '';
         if (!text) {
         return false;
         }
         imageUrl += text ? '/text/' + this.URLSafeBase64Encode(text) : '';
         imageUrl += font ? '/font/' + this.URLSafeBase64Encode(font) : '';
         imageUrl += fontsize ? '/fontsize/' + fontsize : '';
         imageUrl += fill ? '/fill/' + this.URLSafeBase64Encode(fill) : '';
         } else {
         // Todo mode3
         return false;
         }

         var dissolve = op.dissolve || '',
         gravity = op.gravity || '',
         dx = op.dx || '',
         dy = op.dy || '';

         imageUrl += dissolve ? '/dissolve/' + dissolve : '';
         imageUrl += gravity ? '/gravity/' + gravity : '';
         imageUrl += dx ? '/dx/' + dx : '';
         imageUrl += dy ? '/dy/' + dy : '';

         if (key) {
         imageUrl = this.getUrl(key) + '?' + imageUrl;
         }
         return imageUrl;
         */
    },

    isBusy: function () {
        var isBusy = this.uploader.total.queued ? true : false;
        return isBusy;
    },
    setFileData : function(file){
        if(file && file.id){
            this.files[file.id] = file;
        }
    },
    getFileData : function(fileId){
        var file = this.files[fileId];
        return file;
    },
    filterFileName: function(str){
        return str.replace(/[\s]/g,"-").replace(/[,]/g,"-");
    },
    /**
     * detect IE version
     * if current browser is not IE
     *     it will return false
     * else
     *     it will return version of current IE browser
     * @return {[int]|[bool]} IE version or false
     */
    detectIEVersion: function() {
        var v = 4,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');
        while (
            div.innerHTML = '<!--[if gt IE ' + v + ']><i></i><![endif]-->',
                all[0]
            ) {
            v++;
        }
        return v > 4 ? v : false;
    },

    /**
     * reset upload url
     * if current page protocal is https
     *     it will always return 'https://up.qbox.me'
     * else
     *     it will set 'qiniuUploadUrl' value with 'qiniuUploadUrls' looply
     */
    resetUploadUrl: function(){
        if (window.location.protocol === 'https:') {
            this.set('url', 'https://up.qbox.me')
        } else {
            var qiniuUploadUrls = this.get('qiniuUploadUrls');
            var changeUrlTimes = this.get('changeUrlTimes');
            var i = changeUrlTimes % qiniuUploadUrls.length;
            var qiniuUploadUrl = qiniuUploadUrls[i];

            changeUrlTimes++;

            this.set('url', qiniuUploadUrl);
            this.set('changeUrlTimes', changeUrlTimes);
        }
    },

    // 创建 Ajax 对象
    createAjax: function(argument) {
        var xmlhttp = {};
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xmlhttp;
    },

    // 对字符串进行 utf8 编码转换
    /**
     * encode string by utf8
     * @param  {string} string to encode
     * @return {string} encoded string
     */
    utf8_encode: function(argString) {
        // http://kevin.vanzonneveld.net
        // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   improved by: sowberry
        // +    tweaked by: Jack
        // +   bugfixed by: Onno Marsman
        // +   improved by: Yves Sucaet
        // +   bugfixed by: Onno Marsman
        // +   bugfixed by: Ulrich
        // +   bugfixed by: Rafal Kukawski
        // +   improved by: kirilloid
        // +   bugfixed by: kirilloid
        // *     example 1: this.utf8_encode('Kevin van Zonneveld');
        // *     returns 1: 'Kevin van Zonneveld'

        if (argString === null || typeof argString === 'undefined') {
            return '';
        }

        var string = (argString + ''); // .replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        var utftext = '',
            start, end, stringl = 0;

        start = end = 0;
        stringl = string.length;
        for (var n = 0; n < stringl; n++) {
            var c1 = string.charCodeAt(n);
            var enc = null;

            if (c1 < 128) {
                end++;
            } else if (c1 > 127 && c1 < 2048) {
                enc = String.fromCharCode(
                    (c1 >> 6) | 192, (c1 & 63) | 128
                );
            } else if (c1 & 0xF800 ^ 0xD800 > 0) {
                enc = String.fromCharCode(
                    (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                );
            } else { // surrogate pairs
                if (c1 & 0xFC00 ^ 0xD800 > 0) {
                    throw new RangeError('Unmatched trail surrogate at ' + n);
                }
                var c2 = string.charCodeAt(++n);
                if (c2 & 0xFC00 ^ 0xDC00 > 0) {
                    throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
                }
                c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
                enc = String.fromCharCode(
                    (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                );
            }
            if (enc !== null) {
                if (end > start) {
                    utftext += string.slice(start, end);
                }
                utftext += enc;
                start = end = n + 1;
            }
        }

        if (end > start) {
            utftext += string.slice(start, stringl);
        }

        return utftext;
    },

    // 将 JSON 格式数据转换为对象
    parseJSON: function(data) {
        if (window.JSON && window.JSON.parse) {
            return window.JSON.parse(data);
        }

        var rx_one = /^[\],:{}\s]*$/,
            rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            rx_four = /(?:^|:|,)(?:\s*\[)+/g,
            rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

        var json;

        text = String(data);
        rx_dangerous.lastIndex = 0;
        if(rx_dangerous.test(text)){
            text = text.replace(rx_dangerous, function(a){
                return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            });
        }

        // todo 使用一下判断,增加安全性
        //if (
        //    rx_one.test(
        //        text
        //            .replace(rx_two, '@')
        //            .replace(rx_three, ']')
        //            .replace(rx_four, '')
        //    )
        //) {
        //    return eval('(' + text + ')');
        //}

        return eval('('+text+')');
    },

    // 去除文本收尾空格
    trim : function(text) {
        return text === null ? "" : text.replace(/^\s+|\s+$/g, '');
    },

    is_android_weixin_or_qq : function (){
        var ua = navigator.userAgent.toLowerCase();
        return !!((ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/V1_AND_SQ/i) == "v1_and_sq") && mOxie.Env.OS.toLowerCase() == "android");
    },

    resetChunkSize : function() {
        var self = this;
        var ie = this.detectIEVersion();
        var BLOCK_BITS, MAX_CHUNK_SIZE, chunk_size, runtimes;
        // case Weixin and QQ inner browser set isSpecialAndroidWebView to true
        var isSpecialAndroidWebView = this.is_android_weixin_or_qq();
        // case Safari 5、Windows 7、iOS 7 set isSpecialSafari to true
        var isSpecialSafari = (mOxie.Env.browser === "Safari" && mOxie.Env.version <= 5 && mOxie.Env.os === "Windows" && mOxie.Env.osVersion === "7") || (mOxie.Env.browser === "Safari" && mOxie.Env.os === "iOS" && mOxie.Env.osVersion === "7");

        chunk_size = self.get('chunk_size');
        runtimes = self.get('runtimes');

        // case IE 9 or below，has set chunk_size and flash is included in runtimes
        if (ie && ie <= 9 && chunk_size && runtimes.indexOf('flash') >= 0) {
            //  link: http://www.plupload.com/docs/Frequently-Asked-Questions#when-to-use-chunking-and-when-not
            //  when plupload chunk_size setting is't null ,it cause bug in ie8/9  which runs  flash runtimes (not support html5) .
            self.set('chunk_size', 0);
        } else if (isSpecialSafari) {
            // win7 safari / iOS7 safari have bug when in chunk upload mode
            // reset chunk_size to 0
            // disable chunk in special version safari
            self.set('chunk_size', 0);
        } else if (isSpecialAndroidWebView) {
            // Weixin and QQ inner browser have bug when in chunk upload mode
            // reset chunk_size to 0
            // disable chunk in special version webview
            self.set('chunk_size', 0);
        } else {
            BLOCK_BITS = 20;
            MAX_CHUNK_SIZE = 4 << BLOCK_BITS; //4M

            chunk_size = plupload.parseSize(self.get('chunk_size'));
            if (chunk_size > MAX_CHUNK_SIZE) {
                self.set('chunk_size', MAX_CHUNK_SIZE);
            }
            // qiniu service  max_chunk_size is 4m
            // reset chunk_size to max_chunk_size(4m) when chunk_size > 4m
        }
    },
    hasflash: function(){
        if(navigator.mimeTypes.length>0){
            var flashAct = navigator.mimeTypes["application/x-shockwave-flash"];
            return flashAct != null ? flashAct.enabledPlugin!=null : false;
        }else if(ActiveXObject) {
            try {
                new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                return true;
            } catch (oError) {
                return false;
            }
        }
    }
});

module.exports = UploaderSDK;
