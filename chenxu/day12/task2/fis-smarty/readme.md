**准备工作**

 1. 安装好 rake-zbj （必需）
 2. 使用fisp server init，初始化好本地环境
 3. 解压缩代码里的fis-common和fis-smarty项目
 4. 启动rk 服务器： rk server start
 4. 使用命令行分别进入到fis-common 和 fis-smarty 项目，执行rk release -c(w可选，表示监听文件变化）
 5. 将你之前制作的页面,丢在index.tpl里面
 6. 将你之前制作的less,丢在index.less里面
 7. 将你之前制作的js,丢在index.js
 8. 访问这个 页面 http://127.0.0.1:8080/page/demo


**注意**
将下面的链接保存到收藏夹，编辑数据时使用：
```js
javascript: (function() {var d = new Date();d.setFullYear(d.getFullYear() + 1);document.cookie='FIS_DEBUG_DATA=4f10e208f47bfb4d35a5e6f115a6df1a;path=/;expires=' + d.toGMTString() + '';location.reload(); })();
```


