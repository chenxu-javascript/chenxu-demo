
## task1 正则表达式
- 匹配ip地址
书写一个正则表达式，匹配ip地址
//你所写好的正则表达式
var regex // = ??
console.log(regex.test('abcd') === false);
console.log(regex.test('999.999.999.999') === false);
console.log(regex.test('192.168.1.1') === true);
- 匹配邮箱地址
书写一个正则表达式，匹配邮箱地址
//你所写好的正则表达式
var regex // = ??
console.log(regex.test('abcd') === false);
console.log(regex.test('user@zbj.com') === true);
- 密码强度检查
书写一个正则表达式，验证字符串包括了小写字母、大写字母、数字中至少两种字符
//你所写好的正则表达式
var regex // = ??
console.log(regex.test('abc') === false);
console.log(regex.test('ABC') === false);
console.log(regex.test('123') === false);
console.log(regex.test('aA1') === true);


## task2 前后端模板

- 安装好 rake-zbj （必需） http://git.zhubajie.la/fe/rake-zbj/blob/master/README.md
- 使用rk server init ，初始化好本地环境
- 解压缩附件里的fis-common和fis-smarty项目
- 启动rk 服务器： rk server start
- 使用命令行分别进入到fis-common 和 fis-smarty 项目，执行rk release -c(w可选，表示监听文件变化）
- 将你之前制作的html,丢在 fis-smarty/page/index/index.tpl (请把内容塞到 <%block name="content%><%/block%> 里面)
- 将你之前制作的less,丢在 fis-smarty/static/index/index.less里面
- 将你之前制作的js,丢在 fis-smarty/static/index/index.js 里面
- 如果你有img资源,可以在fis-smarty/static/index 目录下新增img文件夹,把图片都丢在里面
less所使用的图片使用相对路径来取 :D
模板使用的图片 请使用类似下面代码的形式(注:demo是我们约定的对这个项目的命名):
<img src="<%uri name="demo:static/index/img/aa.png"%>" alt="">
每当你的代码有变化之后,在相应的项目执行 rk release -c(w可选，表示监听文件变化)
- 访问这个 页面 http://127.0.0.1:8080/page/demo



