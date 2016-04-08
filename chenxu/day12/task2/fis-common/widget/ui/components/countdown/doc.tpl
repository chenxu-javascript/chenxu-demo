<div class="section" id="section-cutdown">
    <h2>倒计时组件</h2>
    <div class="example">
    <div class="countdown"></div>
    <script type="text/javascript">
        seajs.use(['jquery','common:components/countdown/countdown'], function($,countdown) {
            var ct = new countdown({
                dstarget:".countdown",
                callback:function(){
                    console.log($(this).data("difftime"));
                    $(this).text("时间到！!!!");
                }
            });
        });
    </script>
    </div>
</div>