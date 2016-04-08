(function(){

    var utils = require('common:components/utils/utils');

    var isHTTPSPage = utils.isHTTPSPage();

    if( isHTTPSPage ) {
        return;
    }



    var searchURI = 'http://search.' + ZBJInfo.baseURI;
    var typeMap = {
        witkey:1,
        task:3,
        service:2
    };
    var $kw = $('#j-header-kw');
    var $fm = $('#j-header-searchform');
    var $type = $('<input type="hidden" name="type" id="j-header-search-type" />').appendTo($fm);
    var overlayPos = getOverlayPosInfo();

    var alignX = overlayPos.alignX;
    var normalWidth = overlayPos.width;
    require.async(['arale/autocomplete/1.2.3/autocomplete', 'http://t5.zbjimg.com/alice/select/1.0.2/select.css'], function(AutoComplete){
        var auto = new AutoComplete({
            trigger: '#j-header-kw',
            classPrefix:'ui-select',
            filter:'default',
            submitOnEnter:false,
            width: normalWidth,
            align: {
                baseXY: [ alignX, "100%" ]
            },
            dataSource: function(query,done){
                var inptData = $kw.data('type');
                var type =inptData? typeMap[inptData]:1;
                $.ajax({
                    url:searchURI + '/main/smartcue',
                    data:{
                        kw:query,
                        t:type
                    },
                    dataType:"jsonp",
                    jsonp:'jsonpcallback'
                }).success(function(data) {
                    if(!data){return}
                    var ret =  $.map(data,function(value){
                        return value.keyword;
                    });
                    done(ret);
                });
                return false;
            },
            zIndex:500
        }).render();

        auto.on('itemSelect', function(data, item){
            $type.val(1);
            $fm[0].submit();
        });
        var suggestList = auto.element;
        suggestList.addClass('header-search-suggest');

        var stickyRect;

        var headerBd = $("#j-zbj-header-bd-wrap");

        function stickySuggestion(){
            var overlayPos = getOverlayPosInfo();
            var left = stickyRect.left + overlayPos.alignX;
            suggestList.css({
                width: overlayPos.width,
                position: 'fixed',
                top: stickyRect.bottom,
                left: left
            });
        }

        function updatePosOnSticky(){
            $('#j-zbj-header-bd-wrap').addClass('zbj-header-fixed');
            if ( !stickyRect ) {
                stickyRect = $kw[0].getBoundingClientRect();
            }
            auto.on('after:_setPosition', stickySuggestion);
            if ( auto.element.is(":visible") ) {
                stickySuggestion();
            }
        }

        headerBd.on('onHeaderSticky', updatePosOnSticky);
        if ( headerBd.css('position') == 'fixed' ) {
            updatePosOnSticky();
        }

        headerBd.on('offHeaderSticky', function(){
            $('#j-zbj-header-bd-wrap').removeClass('zbj-header-fixed');
            auto.off('after:_setPosition', stickySuggestion);
            suggestList.width( normalWidth );
            auto.element.css({
                width: normalWidth,
                position: 'absolute'
            });
            auto.set('align', {
                baseElement: '#j-header-kw',
                baseXY: [alignX, '100%']
            });
        });
    });
    function getOverlayPosInfo() {
        var gutterWidth = parseInt($kw.css('padding-left'));
        var kwInputOuterWidth = $kw.outerWidth();
        var alignX = gutterWidth - 3;
        var normalWidth = kwInputOuterWidth - gutterWidth;
        return {
            width: normalWidth,
            alignX: alignX
        }
    }


})();