

### ʵ��һ�����������ҳ�� ###

Ҫ��һ�����е�ͼ�Ĳ��֣��������С�ͼƬ�洰�ڷŴ���С�Զ�����仯��

### ʵ��ָ���� ###

����Ϊ�������deviceorientation�¼��ʹ������

�ٸ�����

//add deviceorientation event listener
if(window.DeviceOrientationEvent){//����һ��DeviceOrientationEvent����
    window.addEventListener('deviceorientation',DeviceOrientationHandler,false);///��Ӽ����¼�
}else{
    alert("�����������֧��DeviceOrientation");
}

function DeviceOrientationHandler(event) {
    alpha = event.alpha; //Z�᷽��
    var beta = event.beta,//X�᷽��
        gamma = event.gamma;//Y�᷽��
    if (alpha != null) {
        arrow.style.webkitTransform = "rotate(" + alpha + "deg)";//��ͷ��ת
    }
}