fis.config.merge({
    namespace : 'common',
    pack: {
    },
    roadmap : {
        domain : "http://a.t6.zbj.com"
    },
    deploy: {
    
    }
});

fis.config.set('modules.optimizer.tpl', 'smarty-xss');


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