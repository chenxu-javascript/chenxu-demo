var rtbclient = {
    rtbRelease: function(){
        $.ajax({
            url: 'http://gg.'+ZBJInfo.baseURI+'/api/release',
            data: {
                "pid": window.ZBJInfo.pid
            },
            type: 'get',
            dataType: 'jsonp',
            jsonp: 'jsonpcallback',
            success: function(jsonp) {
                if (jsonp.success) {
                    imageIns(jsonp);
                    var $thumbExchenge = $(".slide-pager-ul li");
                    if ($thumbExchenge) {
                        for (var i = 0; i < $thumbExchenge.length; i++) {
                            var rtbsrc = $(".rtb-realese-item").find('img').eq(i).attr('src');
                            $thumbExchenge.eq(i).find('img').attr('src', rtbsrc);
                        }
                    }
                }
            }
        });

        if(window.ZBJInfo.pid == '1000'){
            topAdGet();
        }

        function imageIns(jsonp) {
            var data = jsonp.data
            var $rtbItem = $(".rtb-realese-item");
            if ($rtbItem.length > 0 && data) {
                for (var rtbkey in data) {
                    $rtbItem.each(function() {
                        if (rtbkey == $(this).attr('data-rtbid')) {
                            $(this).attr('href', data[rtbkey].release_url);
                            $(this).attr('title', data[rtbkey].title);
                            $(this).find('img').attr('src', data[rtbkey].img_url);
                            $(this).find('img').attr('title', data[rtbkey].pic_title);
                            $(this).find('img').attr('alt', data[rtbkey].pic_description);
                        }
                    });
                }
                var pageid = window.ZBJInfo.pid;
                var RTB_URL = 'http://rtb.'+ZBJInfo.baseURI+'/ad_show?';
                var rtbimg = new Image();
                var url = RTB_URL + "pageid=" + pageid;
                rtbimg.onload = rtbimg.onerror = function() {
                        rtbimg = null;
                    };
                rtbimg.src = url;

                $(document.body).delegate('[data-rtbid]', 'click', function() {
                    var RTB_URL_CLICK = 'http://rtb.'+ZBJInfo.baseURI+'/ad_click?';
                    if (!this.getAttribute('data-rtbid')) {
                        return;
                    }
                    var exhid = this.getAttribute('data-rtbid');
                    var urlclick = RTB_URL_CLICK + "pageid=" + pageid + "&exhid=" + exhid;
                    var rtbcimg = new Image();
                    rtbcimg.onload = rtbcimg.onerror = function() {
                        rtbcimg = null;
                    };
                    rtbcimg.src = urlclick;
                });
            }
        }

        function topAdGet(){
            $.ajax({
                url: 'http://gg.'+ZBJInfo.baseURI+'/api/IndexTopBanner',
                type: 'get',
                dataType: 'jsonp',
                jsonp: 'jsonpcallback',
                success: function(jsonp){
                    if(jsonp.success){
                        var topDiv = $(".ui-header-a-d>div");
                        if(topDiv){
                            var topSrc = jsonp.data.image_src;
                            var topTitle = jsonp.data.title;
                            var topUrl = jsonp.data.url;
                            topDiv.find('a').attr('href',topUrl);
                            topDiv.find('a').attr('title',topTitle);
                            topDiv.find('img').attr('src',topSrc);
                            topDiv.find('img').attr('alt',topTitle);
                        }
                    }
                }
            });
        }
    }
};
module.exports = rtbclient;