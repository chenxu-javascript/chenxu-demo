//针对静态头部进行的处理. a 或者 form 或者area带有data-process=1的节点的地址需要替换一下，
//同时如果页面有j_current_category节点，那么在发布的url上加上-category-{categoryid}-
if ( ZBJInfo.baseURI != 'zbj.com' ) {
    var tobeProcessedDoms = $('#j-zbj-header').find('a[data-process="1"], form[data-process="1"], area[data-process="1"]');
    tobeProcessedDoms.each(function( idx, item ){
        var hrefAttr = item.nodeName == 'FORM' ? 'action' : 'href';

        var href = item[hrefAttr];
        item[hrefAttr] = href.replace('zbj.com', ZBJInfo.baseURI);
    });
}

var headerPubEntey = $('#j-head-pubentry a.zbj-header-task-entry-link');
var jCurrentCategory = $('#j_current_category');
if( headerPubEntey.size() && jCurrentCategory.size() ){
    var href = headerPubEntey.attr('href');
    headerPubEntey.attr('href', href.replace('step1', 'step1-category-' + jCurrentCategory.val()));
}

//如果是搜索页，还需要将搜索表单相关信息进行更正
var labelMap = {
    'witkey': '找服务商',
    'task': '找&nbsp;需&nbsp;求',
    'service': '找&nbsp;服&nbsp;务'
};
var actionMap = {
    'witkey': '/p/',
    'task': '/t/',
    'service': '/s/'
};
var searchType = ZBJInfo.searchType;
if ( searchType ) {
    var formAction = $('#j-header-searchform').attr('action');
    $('#j-header-kw').val( ZBJInfo.kw).data('type',searchType);
    $('#j-header-searchlabel').html( labelMap[searchType] );
    $('#j-header-searchform').attr('action', formAction.replace('/p/', actionMap[searchType]));
    $('#j-header-searchwrap li').each(function(){
        if ($(this).data('type') == searchType){
            $(this).hide();
        } else{
            $(this).show();
        }
    });
}