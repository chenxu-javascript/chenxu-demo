var log = require('common:components/log/log');

$(document.body).delegate('[data-linkid]', 'click', function() {
    if (!this.getAttribute('data-linkid')) {
        return;
    }
    var target = $(this);
    var data = target.data();
    log.sendLog( data );
});
