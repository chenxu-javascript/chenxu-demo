<style>
    #slide-demo-1 {
        position: relative;
        width: 450px;
        height: 470px;
        overflow: hidden;
    }
    #slide-demo-1 .ui-switchable-content {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    #slide-demo-1 .ui-switchable-content .ui-switchable-panel {
        position: relative;
        width: 450px;
        height: 470px;
        overflow: hidden;
    }

</style>
<div class="example">
    <!--幻灯片的容器-->
    <div id="slide-demo-1" class="slide-demo">
        <!--幻灯片的内容区-->
        <ul class="ui-switchable-content" data-role="content">

            <!--单个幻灯片项-->
            <li class="ui-switchable-panel">
                <a href="#"><img src="http://cms.zbjimg.com/components_demo/slider/558375f747c6f.jpg" /></a>
            </li>
            <li class="ui-switchable-panel">
                <a href="#"><img src="http://cms.zbjimg.com/components_demo/slider/5588b7e99225d.jpg" /></a>
            </li>
            <li class="ui-switchable-panel">
                <a href="#"><img src="http://cms.zbjimg.com/components_demo/slider/5546d03dbd3da.jpg" /></a>
            </li>
        </ul>
        <!--可选-->
        <ul class="ui-switchable-nav" data-role="nav">
            <li class="ui-switchable-trigger">第一个</li>
            <li class="ui-switchable-trigger">第二个</li>
            <li class="ui-switchable-trigger">第三个</li>
        </ul>

        <!--可选的，左右箭头-->
        <a data-role="prev" class="prev-btn" data-linkid="focusslider-pre"><i class="icon-font">&#xe804;</i></a>
        <a data-role="next" class="next-btn" data-linkid="focusslider-next"><i class="icon-font">&#xe805;</i></a>
    </div>
</div>
<script>
    seajs.use('common:components/slider/slider', function( Slider ){
        new Slider({
            element: '#slide-demo-1'
        });
    });

</script>