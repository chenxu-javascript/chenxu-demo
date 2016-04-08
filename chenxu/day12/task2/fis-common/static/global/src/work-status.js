$('body').on('click', '.ui-work-act', function() {
    var $self = $(this);
    var $warp = $self.closest('.ui-work');
    var $stateWarp = $warp.find('.ui-work-state');
    var $state = $self.attr('data-state');
    var uid = $self.attr('data-uid');
    // t => 1是上班，2是下班
    var ajaxUrl = 'http://u.' + ZBJInfo.baseURI + '/duty/ModeDutyState-t-' + $state + '-uid-' + uid;
    $.ajax({
        url: ajaxUrl,
        dataType: "jsonp",
        jsonp: "jsonpcallback",
        success: function(json) {
            if (json.success) {
                if ($state == 1) {
                    $warp.removeClass('ui-work-off').addClass('ui-work-on');
                    $stateWarp.html('工作中');
                    $self.attr('data-state', 2).html('下班');
                } else {
                    $warp.removeClass('ui-work-on').addClass('ui-work-off');
                    $stateWarp.html('未上班');
                    $self.attr('data-state', 1).html('上班');
                }
            } else {
                alert(json.data);
            }
        }
    })
});