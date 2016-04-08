// default settings. fis3 release

// Global start
fis.match('*.{js,css}', {
  useHash: true
});

fis.match('::image', {
  useHash: true
});

// 启用 fis-spriter-csssprites 插件
fis.match('::package', {
  spriter: fis.plugin('csssprites')
})

fis.match('*.js', {
  optimizer: fis.plugin('uglify-js')
});

//fis.match('*.less', {
//  // fis-parser-less 插件进行解析
//  parser: fis.plugin('less'),
//  // .less 文件后缀构建后被改成 .css 文件
//  rExt: '.css'
//})

fis.match('*.css', {
  // 给匹配到的文件分配属性 `useSprite`
  useSprite: true,
  optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
  optimizer: fis.plugin('png-compressor')
});

// Global end

// default media is `dev`
fis.media('dev')
  .match('*', {
    useHash: false,
    optimizer: null
  });

// extends GLOBAL config
fis.media('production');
