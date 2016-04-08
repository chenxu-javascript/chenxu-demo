$.fn.extend({
    ie6hover:function(className){
        if($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
            className = className || "hover";
            this.each(function(){
                $(this).hover(function(){
                    $(this).addClass(className)
                },function(){
                    $(this).removeClass(className)
                });
            });
        }
    }
});