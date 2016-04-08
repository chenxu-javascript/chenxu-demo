var Widget = require("arale/widget/1.1.1/widget-debug");
var Dnd = require('arale/dnd/1.0.0/dnd');
var utils = require('common:components/utils/utils');

require('./cropper.less');

var Crop = Widget.extend({
    attrs: {
        preview: '',
        img: {},
        cropWidth: 260,
        cropHeight: 190
    },

    imgRatio: 1,
    cropRatio: 1,
    cropper: null,
    cropperResizer: null,
    imgResizeInfo: null,

    maxWidth: 600,
    maxHeight: 400,

    rs: {},

    setup: function(){
        Crop.superclass.setup.call(this);
        this.init();
    },
    init: function(){
        this.maxWidth = this.element.width();
        this.maxHeight = this.element.height();

        this.initEvents();
        this.setImg( this.get('img') );
    },

    setImg: function( img ){
        this.set('img', img);
    },
    getCropResult: function(){
        return this.rs;
    },
    initEvents: function(){
        this.on('cropupdate', function( data ){
            var cropLayer
            if ( data.type == 'drag' ) {
                cropLayer = this.cropper.get('proxy');
            } else {
                cropLayer = this.element.find('.crop-layer');
            }


            this.trigger('cropchange', {
                img: {
                    width: this.get('img').width,
                    height: this.get('img').height,
                    url: this.get('img').src
                },
                ratio: this.imgRatio / this.cropRatio,
                crop: {
                    width: cropLayer.width(),
                    height: cropLayer.height(),
                    left: parseFloat( cropLayer.css('left') ),
                    top: parseFloat( cropLayer.css('top') )
                }
            })
        });

        this.on('cropchange', function( data ){
            var previewDom = $(this.get('preview'));

            var coordsWdith = data.crop.width;
            var coordsHeight = data.crop.height;

            var previewStageWidth = previewDom.width();
            var previewStageHeight = previewDom.height();

            var previewImgWidth = this.get('cropWidth');
            var previewImgHeight = this.get('cropHeight');


            var imgResizeInfo = utils.getImgResizeInfo( {
                imgWidth: previewImgWidth,
                imgHeight: previewImgHeight,
                maxWidth: previewStageWidth,
                maxHeight: previewStageHeight
            } );


            var previewImgWrapStyle =
                'width: ' + imgResizeInfo.width + 'px;' +
                'height: ' + imgResizeInfo.height + 'px;' +
                'margin-left: ' + (previewStageWidth - imgResizeInfo.width) / 2 + 'px;' +
                'margin-top: ' + (previewStageHeight - imgResizeInfo.height) / 2 + 'px;overflow: hidden'


            var previewRealWidth = imgResizeInfo.width;
            var previewRealHeight = imgResizeInfo.height;

            var rx = previewRealWidth / coordsWdith * this.cropRatio;
            var ry = previewRealHeight / coordsHeight * this.cropRatio;

            var previewImgStyle =
                'width: ' + rx * data.ratio  * data.img.width + 'px;' +
                'height: ' + ry * data.ratio  * data.img.height + 'px;' +
                'margin-left: ' + -data.crop.left * rx / this.cropRatio + 'px;' +
                'margin-top: ' + -data.crop.top * ry / this.cropRatio + 'px;';

            previewDom.html( '<div style="'+ previewImgWrapStyle +'">' +
                '<img src="'+ this.get('img').src +'" style="'+ previewImgStyle +'"/>' +
                '</div>' );

            this.rs = {
                src: this.get('img').src,
                ratio: data.ratio,
                x: data.crop.left / this.cropRatio,
                y: data.crop.top / this.cropRatio,
                width: this.get('cropWidth'),
                height: this.get('cropHeight')
            };
        });

        this.on('cropresizeend', function(){
            this.cropper.set('proxy', null);
            this.element.find('.crop-layer-resize').removeAttr('style');
        });
    },
    _onRenderImg: function(){
        var imgInfo = this.get('img');
        var imgUrl  = imgInfo.src;
        var imgWidth = imgInfo.width;
        var imgHeight = imgInfo.height;

        var maxWidth = this.maxWidth;
        var maxHeight = this.maxHeight;

        var imgResizeInfo = this.imgResizeInfo = utils.getImgResizeInfo( {
            imgWidth: imgWidth,
            imgHeight: imgHeight,
            maxWidth: maxWidth,
            maxHeight: maxHeight
        } );

        this.imgRatio = imgResizeInfo.ratio;


        var cropImgStyle =
            'width: ' + imgResizeInfo.width + 'px;' +
            'height: ' + imgResizeInfo.height + 'px;' +
            'margin-top: ' + ( ( maxHeight - imgResizeInfo.height ) / 2 ) + 'px;' +
            'margin-left: ' + ( ( maxWidth - imgResizeInfo.width ) / 2 ) + 'px;';

        var cropMaskStyle =
            'top: ' + ( ( maxHeight - imgResizeInfo.height ) / 2 ) + 'px;' +
            'left: ' + ( ( maxWidth - imgResizeInfo.width ) / 2 ) + 'px;' +
            'width: ' + imgResizeInfo.width + 'px;' +
            'height: ' + imgResizeInfo.height + 'px;';



        this.element.html('' +
            '<img class="crop-img" src="'+ imgUrl +'" style="'+ cropImgStyle +'"/>' +
            '<div class="crop-mask" style="'+ cropMaskStyle +'">' +
                '<div class="crop-layer">' +
                    '<div class="crop-layer-preview">' +
                        '<img class="crop-view-img" src="'+ imgUrl +'" />' +
                    '</div>' +
                    '<div class="crop-layer-resize"></div>' +
                '</div>' +
            '</div>');

        $('.crop-layer-resize').removeAttr('style');

        this.autoFitCropLayer();

        this.bindCropEvents();

        this.trigger('cropupdate', {type: 'resize'});

    },

    autoFitCropLayer: function( ){
        var canvasWidth = this.imgResizeInfo.width;
        var canvasHeight = this.imgResizeInfo.height;
        var cropWidth = this.get('cropWidth');
        var cropHeight = this.get('cropHeight');

        var resizeInfo = utils.getImgResizeInfo( {
            imgWidth: cropWidth,
            imgHeight: cropHeight,
            maxWidth: canvasWidth,
            maxHeight: canvasHeight
        });

        this.cropRatio = this.initCropRatio = resizeInfo.ratio;

        cropWidth = resizeInfo.width;
        cropHeight = resizeInfo.height;

        var cropLayerLeft = ( canvasWidth - cropWidth ) / 2;
        var cropLayerTop = ( canvasHeight - cropHeight ) / 2;

        var cropLayerStyle = {
            top: cropLayerTop,
            left: cropLayerLeft,
            width: cropWidth,
            height: cropHeight
        };

        this.element.find('.crop-layer').css( cropLayerStyle );

        this.element.find('.crop-view-img').css({
            'width': this.imgResizeInfo.width,
            'height': this.imgResizeInfo.height,
            'margin-left': -cropLayerLeft,
            'margin-top': -cropLayerTop
        });
    },

    bindCropEvents: function(){

        var self = this;

        var cropWidth = this.get('cropWidth');
        var cropHeight = this.get('cropHeight');

        var dnd = this.cropper = new Dnd(this.element.find('.crop-layer'), {
            containment: '.crop-mask'
        });

        var cropLayerLeft, cropLayerTop;


        dnd.on('drag', function( proxy ){

            $('.crop-layer-resize').removeAttr('style');

            cropLayerLeft = parseFloat( proxy.css('left') );
            cropLayerTop = parseFloat( proxy.css('top') );

            self.element.find('.crop-view-img').css({
                'width': self.imgResizeInfo.width,
                'height': self.imgResizeInfo.height,
                'margin-left': -cropLayerLeft,
                'margin-top': -cropLayerTop
            });

            self.trigger('cropupdate', {type: 'drag'});
        });

        dnd.on('dragend', function( element ){
            element.css({
                left: cropLayerLeft,
                top: cropLayerTop
            });
        });

        var dnd = this.cropperResizer =  new Dnd(this.element.find('.crop-layer-resize'), {
            containment: '.crop-mask'
        });

        var left, top;
        var initLeft, initTop;
        var initWidth, initHeight;

        dnd.on('dragstart', function( dataTransfer, proxy ){
            initLeft = parseFloat( proxy.css('left') );
            initTop = parseFloat( proxy.css('top') );


            initWidth = self.element.find('.crop-layer').width();
            initHeight = self.element.find('.crop-layer').height();

        });

        dnd.on('drag', function( proxy ){
            left = parseFloat( proxy.css('left') );
            top = parseFloat( proxy.css('top') );

            var deltaX = left - initLeft;
            var deltaY = deltaX * cropHeight / cropWidth;

            var cropRatio = ( deltaX + initWidth ) / cropWidth;

            if ( cropRatio > self.initCropRatio ) {
                proxy.css('left', initLeft);
                proxy.css('top', initTop);
            } else {
                self.cropRatio = cropRatio;
                self.element.find('.crop-layer').css({
                    width: initWidth + deltaX,
                    height: initHeight + deltaY
                });

                proxy.css('top', initTop + deltaY);

                self.trigger('cropupdate', {type: 'resize'});
            }

        });

        dnd.on('dragend', function( element ){
            element.css({
                left: left,
                top: top
            });

            self.trigger('cropresizeend');
        });
    }
});

module.exports = Crop;