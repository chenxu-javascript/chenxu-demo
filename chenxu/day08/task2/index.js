/**
 * Created by cx on 2016/3/17.
 */

if(window.DeviceOrientationEvent){//返回一个DeviceOrientationEvent对象
    window.addEventListener('deviceorientation',DeviceOrientationHandler,false);///添加监听事件
}else{
    alert("您的浏览器不支持DeviceOrientation");
}

function DeviceOrientationHandler(event) {
    var arrow  = document.getElementById('compasss');
    var absolute = event.absolute;
    var alpha = event.alpha; //Z轴方向
    var beta = event.beta;//X轴方向
    var gamma = event.gamma;//Y轴方向

    if (alpha != null) {
        arrow.style.webkitTransform = "rotate(" + alpha + "deg)";//箭头旋转
    }
}
