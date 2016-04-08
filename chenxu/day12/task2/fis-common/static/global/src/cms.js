$(document).ready(function(){

    var cache = {};
    var $cmsCtn = $('.j_cms_ctn');
    var endlessDate = '2020.01.01';
    var domain = 'http://cms.zbjimg.com';
    if(location.protocol == 'https:'){
        domain = 'https://login.' + window.ZBJInfo.baseURI + '/cms';
    }
    function getCmsItem($item){
        var token = $item.attr('data-cmstoken');
        if(!token){
            return;
        }
        if(cache[token]){//已经在请求cms文件了，直接return
            return;
        }else{
            cache[token] = true;

            $.ajax({
                url: domain + '/cmsfiles/' + token +'.js',
                jsonpCallback: '_' + token.replace(/.*\//,'') + '_js',
                dataType: 'jsonp',
                success: function(res){
                    var content = formatCmsContent( res );
                    $cmsCtn.filter('[data-cmstoken="'+ token +'"]').each(function(i, o){
                        var $this = $(this);
                        var index = $this.attr('data-cmsindex') || 0;
                        $this.html(content[index] || '');
                    });
                }
            });
        }
    }
    $cmsCtn.each(function(i, o){
        var $item = $(o);
        getCmsItem($item);
    });

    function formatCmsContent( sourceData ){
        var data = [];
        var content = sourceData.content.split('##split##');
        var extData = sourceData.ext || [];
        $.each( content, function( idx, item ){
            var ext = extData[ idx ];
            if ( !ext ) {
                data.push( item );
                return;
            }
            var currentTime = +new Date();

            var rsContent = item;

            // 定义了起始时间
            if ( ext.showtime  ) {

                var startend = ext.showtime.split('-');
                // 如果只定义了一个时间，即为开始时间
                if ( startend.length == 1 ) {
                    startend.push( endlessDate );
                }
                if ( !isValidDate(currentTime, startend) ) {
                    rsContent = '';
                }
            }

            //定义了计划内容
            if ( ext.schedule ) {
                var  schedule = ext.schedule;
                // 定义了时间才替换
                if ( schedule.showtime ) {
                    var scheduleShowtime = schedule.showtime.split('-');
                    if ( scheduleShowtime.length == 1 ) {
                        scheduleShowtime.push( endlessDate );
                    }
                    if ( isValidDate(currentTime, scheduleShowtime) ) {
                        rsContent = schedule.content;
                    }
                }
            }

            //如果是login页面，需要对图片数据进行替换
            if(location.protocol == 'https:'){
                rsContent = rsContent.replace(/http:\/\/cms\.zbjimg\.com/, function( rs ){return domain;})
            }
            data.push( rsContent );
        });

        return data;
    }

    function isValidDate( targetDate, validDateRange ){
        var start = validDateRange[0].split('.');
        var end = validDateRange[1].split('.');
        if ( targetDate >= (+new Date( start[0], start[1]*1-1, start[2] )) && targetDate <= (+new Date( end[0], end[1]*1-1, end[2] )) ) {
            return true;
        }
        return false;
    }
});