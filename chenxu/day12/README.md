
## task1 ������ʽ
- ƥ��ip��ַ
��дһ��������ʽ��ƥ��ip��ַ
//����д�õ�������ʽ
var regex // = ??
console.log(regex.test('abcd') === false);
console.log(regex.test('999.999.999.999') === false);
console.log(regex.test('192.168.1.1') === true);
- ƥ�������ַ
��дһ��������ʽ��ƥ�������ַ
//����д�õ�������ʽ
var regex // = ??
console.log(regex.test('abcd') === false);
console.log(regex.test('user@zbj.com') === true);
- ����ǿ�ȼ��
��дһ��������ʽ����֤�ַ���������Сд��ĸ����д��ĸ�����������������ַ�
//����д�õ�������ʽ
var regex // = ??
console.log(regex.test('abc') === false);
console.log(regex.test('ABC') === false);
console.log(regex.test('123') === false);
console.log(regex.test('aA1') === true);


## task2 ǰ���ģ��

- ��װ�� rake-zbj �����裩 http://git.zhubajie.la/fe/rake-zbj/blob/master/README.md
- ʹ��rk server init ����ʼ���ñ��ػ���
- ��ѹ���������fis-common��fis-smarty��Ŀ
- ����rk �������� rk server start
- ʹ�������зֱ���뵽fis-common �� fis-smarty ��Ŀ��ִ��rk release -c(w��ѡ����ʾ�����ļ��仯��
- ����֮ǰ������html,���� fis-smarty/page/index/index.tpl (����������� <%block name="content%><%/block%> ����)
- ����֮ǰ������less,���� fis-smarty/static/index/index.less����
- ����֮ǰ������js,���� fis-smarty/static/index/index.js ����
- �������img��Դ,������fis-smarty/static/index Ŀ¼������img�ļ���,��ͼƬ����������
less��ʹ�õ�ͼƬʹ�����·����ȡ :D
ģ��ʹ�õ�ͼƬ ��ʹ����������������ʽ(ע:demo������Լ���Ķ������Ŀ������):
<img src="<%uri name="demo:static/index/img/aa.png"%>" alt="">
ÿ����Ĵ����б仯֮��,����Ӧ����Ŀִ�� rk release -c(w��ѡ����ʾ�����ļ��仯)
- ������� ҳ�� http://127.0.0.1:8080/page/demo



