var receiverUrl = 'http://192.168.1.63/receiver.php';

fis.config.merge({
    namespace : 'login-common',
    pack: {
//        'static/pkg/global.css': [
//            'static/global/global.less',
//            'widget/**/*.less'
//        ],
//        'static/pkg/global.js': [
//            'widget/**/*.js'
//        ]
    },
    roadmap : {
        domain : "https://login.t6.zbj.com/rake"
    },
    deploy: {
        remote: [{
            //如果配置了receiver，fis会把文件逐个post到接收端上
            receiver : receiverUrl,
            //从产出的结果的static目录下找文件
            from : '/static',
            //上传目录从static下一级开始不包括static目录
            // subOnly : true,
            //保存到远端机器的/home/fis/www/static目录下
            //这个参数会跟随post请求一起发送
            to : '/home/ued/static_t6/fisp',
            //某些后缀的文件不进行上传
            exclude : /.*\.(?:svn|cvs|tar|rar|psd).*/
        },{
            //如果配置了receiver，fis会把文件逐个post到接收端上
            receiver : receiverUrl,
            //从产出的结果的config目录下找文件
            from : '/config',
            //保存到远端机器的/home/fis/www/config目录下
            //这个参数会跟随post请求一起发送
            to : '/data/www/html/zbjv6/fis',
            //某些后缀的文件不进行上传
            exclude : /.*\.(?:svn|cvs|tar|rar|psd).*/
        },
        {
            //如果配置了receiver，fis会把文件逐个post到接收端上
            receiver : receiverUrl,
            //从产出的结果的template目录下找文件
            from : '/template',
            //保存到远端机器的/home/fis/www/template目录下
            //这个参数会跟随post请求一起发送
            to : '/data/www/html/zbjv6/fis',
            //某些后缀的文件不进行上传
            exclude : /.*\.(?:svn|cvs|tar|rar|psd).*/
        },
        {
            //如果配置了receiver，fis会把文件逐个post到接收端上
            receiver : receiverUrl,
            //从产出的结果的plugin目录下找文件
            from : '/plugin',
            //保存到远端机器的/home/fis/www/plugin目录下
            //这个参数会跟随post请求一起发送
            to : '/data/www/html/zbjv6/fis',
            //某些后缀的文件不进行上传
            exclude : /.*\.(?:svn|cvs|tar|rar|psd).*/
        }
        ]
    }
});

fis.config.set('modules.optimizer.tpl', 'smarty-xss');

fis.config.set('settings.optimizer.smarty-xss', {
    'xssSafeVars': ['pageNavgationlUrl', 'site_config']
});


fis.config.set('settings.preprocessor.replace', {
    'replacer': {
        '{%extends file="common/': '{%extends file="login-common/',
        '="common"%}': '="login-common"%}',
        'name="common:': 'name="login-common:',
        'name=\'common:': 'name=\'login-common:',
        '\'common:components': '\'login-common:components',
        '"common:components': '"login-common:components',
        '"common:static"': '"login-common:static"',
        'static/common/lib/': 'static/login-common/lib/'
    }
});

fis.config.get('roadmap.path').unshift({
    reg: /^\/static\/lib\/(.*)/,
    useHash: false,
    useCompile: false,
    useParser: false,
    usePreprocessor: false,
    useStandard: false,
    usePostprocessor: false,
    isMod : false,
    release: "${statics}/${namespace}/lib/$1"
});