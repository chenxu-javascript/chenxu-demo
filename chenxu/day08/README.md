

### 实现一个多屏适配的页面 ###

要求一行两列的图文布局，多行排列。图片随窗口放大缩小自动跟随变化。

### 实现指南针 ###

首先为浏览器绑定deviceorientation事件和处理程序

举个栗子

//add deviceorientation event listener
if(window.DeviceOrientationEvent){//返回一个DeviceOrientationEvent对象
    window.addEventListener('deviceorientation',DeviceOrientationHandler,false);///添加监听事件
}else{
    alert("您的浏览器不支持DeviceOrientation");
}

function DeviceOrientationHandler(event) {
    alpha = event.alpha; //Z轴方向
    var beta = event.beta,//X轴方向
        gamma = event.gamma;//Y轴方向
    if (alpha != null) {
        arrow.style.webkitTransform = "rotate(" + alpha + "deg)";//箭头旋转
    }
}