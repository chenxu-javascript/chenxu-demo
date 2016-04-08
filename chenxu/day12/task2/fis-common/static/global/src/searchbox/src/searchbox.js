var seachKw = $('#j-header-kw');
var placeholderTxt = '请输入关键词';

var fakePlaceholder = {
    dom: $('#j-placeholder-tip'),
    init: function(){
        var self = this;
        this.dom.on('click', function(){
            $('#j-header-kw').focus();
        });

        $('#j-header-kw').on('keyup', function(){
            if ( this.value ) {
                self.hide();
            } else {
                self.show();
            }
        });

        $('#j-header-search-btn').on('click', function( evt ){
            var type = seachKw.data('type');
            try {
                var current = window.ZBJInfo.searchCfg[ seachKw.data('type') ];
                if ( current ) {
                    evt.preventDefault();
                    if( !$('#j-header-kw').val() ){
                        document.location.href = $('#j-header-searchform').attr('action') + '?kw=' + encodeURIComponent(current.def_keyword);
                        return;
                    }
                }
            } catch(e) {
            }
            $(this).parents('form').submit();
        });
        this.show();
    },
    setKw: function( type ){
        try {
            var currentCfg = window.ZBJInfo.searchCfg[ type ];
            if ( currentCfg ) {
                seachKw.attr('data-default', currentCfg.def_keyword );
                $('#j-placeholder-tip').html( currentCfg.placeholder );
            }
        }catch(e) {

        }
    },
    show: function(){
        if ( seachKw.val() ) {
            return;
        }
        try {
            var currentCfg = window.ZBJInfo.searchCfg[ seachKw.data('type') ];
            if ( !currentCfg ) {
                $('#j-header-kw').attr('placeholder', placeholderTxt);
                this.dom.hide();
            } else {
                $('#j-header-kw').removeAttr('placeholder');
                this.dom.show();
            }
        } catch(e) {

        }
    },
    hide: function(){
        try {
            var currentCfg = window.ZBJInfo.searchCfg[ seachKw.data('type') ];
            if ( !currentCfg ) {
                $('#j-header-kw').attr('placeholder', placeholderTxt);
            }
        } catch (e) {

        }

        this.dom.hide()
    }
};
fakePlaceholder.init();

var selectedType;
var searchURI = 'http://search.' + ZBJInfo.baseURI;
// header中搜索框选择搜索类型
$('#j-header-searchwrap li').click(function(){
    var _this = $(this);
    selectedType = _this.data('type'); // witkey 或者 task 或者 service
    var searchType;
    if(selectedType == 'witkey'){
        searchType = 0;
    }else if(selectedType == 'task'){
        searchType = 1;
    }else if(selectedType == 'service'){
        searchType = 2;
    }

    $('#j-header-searchlabel').text(_this.find('a').text());
    _this.hide().siblings().show();
    _this.parent().hide();
//        增加搜索类型数据以便自动完成
    $('#j-header-kw').data('type',selectedType).focus();

    var form = $('#j-header-searchform')[0];
    if (searchType == 0) {
        form.action = searchURI+"/p/";
    } else if(searchType == 1) {
        form.action = searchURI + "/t/";
    }else if(searchType == 2){
        form.action = searchURI + "/s/";
    }
    fakePlaceholder.setKw( selectedType );
    fakePlaceholder.show();
});

$('#j-header-searchwrap').hover(function() {
    $(this).find('.zbj-dropdown-menu').show();
},function() {
    $(this).find('.zbj-dropdown-menu').hide();
});