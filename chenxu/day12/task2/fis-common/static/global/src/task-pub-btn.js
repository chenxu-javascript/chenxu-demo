
var Handlebars = require('gallery/handlebars/1.0.2/handlebars');

var tasklistLoaded = 0;
var headerTaskEntry = $('#j-head-pubentry');
var headerTaskList = $('#j-zbj-header-tasklist');

var tasklistTpl = '{{#each data}}' +
    '<div class="task-list-item clearfix">' +
    '<div class="task-title">' +
    '<span class="highlight">￥{{price}}</span> ' +
    '<a href="http://task.' + window.ZBJInfo.baseURI + '/{{task_id}}" title="{{title}}" target="_blank">{{title}}</a>' +
    '</div>' +
    '<div class="task-detail">' +
    '<span class="fr">{{day}}天完成</span><span class="fl">{{works_num}}个服务商参与</span></div>' +
    '</div>' +
    '{{/each}}';

headerTaskEntry.ie6hover('zbj-header-task-entry-hover');

headerTaskEntry.on('mouseenter', function(){
    if ( tasklistLoaded ) {
        return;
    }
    tasklistLoaded = 1;

    function renderData( data ){
        var tplEngine = Handlebars.compile( tasklistTpl );
        $('#j-zbj-header-tasklist').html( tplEngine( {data: data} ) );
        tasklistRun();
    }

    function tasklistRun(){
        var list = headerTaskList.find('.task-list-item').length;
        var idx = 0;
        setInterval(function(){
            idx = idx + 1;
            if ( idx == list ) {
                idx = 0;
            }
            headerTaskList.animate({
                'margin-top': -idx * 42
            });
        }, 5 * 1000);
    }
    if ( document.location.href.indexOf('https://') >= 0 ) {
        headerTaskEntry.find('.task-panel-ft').hide();
    } else {
        $.ajax({
            url:"http://u."+ZBJInfo.baseURI+"/ajax/lasttasklist",
            dataType:"jsonp",
            jsonp: "jsonpcallback",
            success:function( rs ){
                renderData( rs );
            }
        });
    }
});