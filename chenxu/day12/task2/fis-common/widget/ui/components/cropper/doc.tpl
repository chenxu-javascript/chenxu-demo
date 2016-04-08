<style>
    .component-meta {
        font-size: 14px;
        margin: 20px auto;
    }
    .component-name {
        background-color: rgb(209, 230, 231);
        display: inline-block;
        padding: 0 10px;
        border-radius: 5px;
        color: #527762;
        margin-left: 10px;
        font-family: monospace;
        font-weight: normal;
    }
</style>
<div class="section">
    <h3>API</h3>
    <div class="component-meta">
        <div class="component-id">模块ID: <strong class="component-name">common:components/cropper/cropper</strong></div>
    </div>

    <div class="code"></div>

    <div class="holder" style="float: left;"></div>

    <div class="preview" style="background: #ecc;width: 260px; height: 190px;  overflow: hidden;float: left;;"></div>

    <a class="zbj-btn" id="changeImg">换个图</a>

    <style>
        .holder {
            width: 300px;
            height: 400px;
            position: relative;
            overflow: hidden;
            background: #ccc;;
        }
    </style>

    <script type="text/javascript">

        var size = {
            w: 260,
            h: 190
        };

        var testImgData = {
            src: '{%uri name="common:components/cropper/564d29c4029d6.jpg"%}',
            width: '450',
            height: '497'
        };


        seajs.use('common:components/cropper/cropper', function( Cropper ){
            var cropper = window.cropper = new Cropper({
                element: '.holder',
                preview: '.preview',
                cropWidth: size.w || 200,
                cropHeight: size.h || 200,
                img: {
                    width: testImgData.width,
                    height: testImgData.height,
                    src: testImgData.src
                }
            }).render();
        });

    </script>
</div>