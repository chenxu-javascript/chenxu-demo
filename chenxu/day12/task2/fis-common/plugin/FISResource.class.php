<?php

class FISResource {

    const CSS_LINKS_HOOK = '<!--[FIS_CSS_LINKS_HOOK]-->';
    const JS_SCRIPT_HOOK = '<!--[FIS_JS_SCRIPT_HOOK]-->';
    const FRAMEWORK_HOOK = '<!--[FIS_FRAMEWORK_HOOK]-->';

    private static $arrMap = array();
    private static $arrLoaded = array();
    private static $arrAsyncDeleted = array();

    private static $arrStaticCollection = array();
    //收集require.async组件
    private static $arrRequireAsyncCollection = array();
    private static $arrScriptPool = array();

    public static $framework = null;

    //记录{%script%}, {%style%}的id属性
    public static $cp = null;

    //{%script%} {%style%}去重
    public static $arrEmbeded = array();

    // 当前的模版入口，将会加载模版的同名依赖资源 ( css/js )
    public static $templateEntry = null;

    public static $autoConcat = false;

    public static $siteConfig = false;

    public static function reset(){
        self::$arrMap = array();
        self::$arrLoaded = array();
        self::$arrAsyncDeleted = array();
        self::$arrStaticCollection = array();
        self::$arrScriptPool = array();
        self::$framework  = null;
    }

    public static function setTemplateEntry( $smarty, $autoConcat ){
        if ( self::$templateEntry ) {
            return;
        }
        $entryTemplateObj = array_shift( $smarty->template_objects );
        self::$templateEntry = preg_replace('/[\\/\\\\]+/', '/', $entryTemplateObj->template_resource);
        self::$autoConcat = $autoConcat;
    }

    public static function registerZBJVariable( $siteConfig ){
        if ( self::$siteConfig ) {
            return;
        }
        self::$siteConfig = $siteConfig;
    }

    public  static function autoloadTemplateResourcess( $smarty ){
        // 收集页面的同名依赖
        // page/love.tpl => static/love/love.less && static/love/love.js
        // page/love/love.tpl => static/love/love.less && static/love/love.js
        // page/love/loveme.tpl => static/love/loveme.less && static/love/loveme.js

        // 如果有相对路径，那么就不去加载站点的 common.js 和 common.less 了
        $isTemplateRelative = strpos( self::$templateEntry, '..') > 0;

        $templatePathArr = explode('/', self::$templateEntry);

        $namespace = array_shift( $templatePathArr );

        $commonDependentLess = $namespace . ':static/common/common.less';

        if ( self::resourceExists( $commonDependentLess, $smarty )  && !$isTemplateRelative ) {
            FISResource::load($commonDependentLess, $smarty, false, false);
        }


        // 去掉第二项的 page
        array_shift( $templatePathArr );

        $templateId = str_replace('.tpl', '', array_pop( $templatePathArr ));

        // 拿到同名依赖，添加同名依赖
        $dependentPath = $namespace . ':static/' .
            (count( $templatePathArr ) ? join('/', $templatePathArr) . '/' : '' ) .
            $templateId;



        // 如果是 page/love.tpl 这种的模版路径，那么找 static/love/love.less 和 static/love/love.js
        if ( !count($templatePathArr) ) {
            $dependentPath .= '/' . $templateId;
        }

        // css
        FISResource::load($dependentPath . '.less', $smarty, false, false);

        // 入口 js
        // @TODO 先检测是否存在，如果不存在，那么就不加载了

        $dependentJs = $dependentPath . '.js';

        $commonDependentJs = $namespace . ':static/common/common.js';

        $autoLoadEntry = array();

        if ( self::resourceExists( $commonDependentJs, $smarty ) && !$isTemplateRelative ) {
            array_push( $autoLoadEntry, $commonDependentJs );
        }
        if ( self::resourceExists( $dependentJs, $smarty ) ) {
            array_push( $autoLoadEntry, $dependentJs );
        }

        if ( count($autoLoadEntry) ) {
            $scriptContent = 'seajs.use(["'. implode('","', $autoLoadEntry) .'"])';
            FISResource::addScriptPool( $scriptContent, 0 );
        }
    }

    public static function addStatic($src) {
        preg_match('/\.(\w+)(?:\?[\s\S]+)?$/', $src, $m);
        if (!$m) {
            return;
        }
        $typ = $m[1];
        if (!in_array($src, self::$arrStaticCollection[$typ])) {
            if (!is_array(self::$arrStaticCollection[$typ])) {
                self::$arrStaticCollection[$typ] = array();
            }
            self::$arrStaticCollection[$typ][] = $src;
        }
    }

    public static function cssHook(){
        return self::CSS_LINKS_HOOK;
    }

    public static function jsHook(){
        return self::JS_SCRIPT_HOOK;
    }

    public static function placeHolder($mode){
        $placeHolder = '';
        switch ($mode) {
            case 'modjs':
                $placeHolder = self::FRAMEWORK_HOOK;
                break;
            default:
                break;
        }
        return $placeHolder;
    }

    //输出模板的最后，替换css hook为css标签集合,替换js hook为js代码
    public static function renderResponse($strContent, $smarty){

        self::autoloadTemplateResourcess( $smarty );

        $cssIntPos = strpos($strContent, self::CSS_LINKS_HOOK);
        if($cssIntPos !== false){
            $strContent = substr_replace($strContent, self::render('css'), $cssIntPos, strlen(self::CSS_LINKS_HOOK));
        }
        $frameworkIntPos = strpos($strContent, self::FRAMEWORK_HOOK);
        if($frameworkIntPos !== false){
            $strContent = substr_replace($strContent, self::render('framework'), $frameworkIntPos, strlen(self::FRAMEWORK_HOOK));
        }
        $jsIntPos = strpos($strContent, self::JS_SCRIPT_HOOK);
        if($jsIntPos !== false){
            $jsContent = ($frameworkIntPos !== false) ? '' : self::getModJsHtml(); 
            $jsContent .= self::render('js') . self::renderScriptPool();
            $strContent = substr_replace($strContent, $jsContent, $jsIntPos, strlen(self::JS_SCRIPT_HOOK));
        }
        self::reset();
        return $strContent;
    }

    //设置framewok mod.js
    public static function setFramework($strFramework) {
        self::$framework = $strFramework;
    }

    //返回静态资源uri，有包的时候，返回包的uri
    public static function getUri($strName, $smarty) {
        $intPos = strpos($strName, ':');
        if($intPos === false){
            $strNamespace = '__global__';
        } else {
            $strNamespace = substr($strName, 0, $intPos);
        }
        if(isset(self::$arrMap[$strNamespace]) || self::register($strNamespace, $smarty)) {
            $arrMap = &self::$arrMap[$strNamespace];
            if (isset($arrMap['res'][$strName])) {
                $arrRes = &$arrMap['res'][$strName];
                if (!array_key_exists('fis_debug', $_GET) && isset($arrRes['pkg'])) {
                    $arrPkg = &$arrMap['pkg'][$arrRes['pkg']];
                    return $arrPkg['uri'];
                } else {
                    return $arrRes['uri'];
                }
            }
        }
    }

    public static function getTemplate($strName, $smarty) {
        //绝对路径
        return $smarty->joined_template_dir . str_replace('/template', '', self::getUri($strName, $smarty));
    }

    private static function getModJsHtml(){
        $html = '';
        $resourceMap = self::getResourceMap();
        $loadModJs = (self::$framework && (isset(self::$arrStaticCollection['js']) || $resourceMap));
        //require.resourceMap要在mod.js加载以后执行
        if ($loadModJs) {
            $html .= '<script type="text/javascript" src="' . self::$framework . '"></script>' . PHP_EOL;
        }
        if ($resourceMap) {
            $html .= '<script type="text/javascript">';
            $html .= 'require.resourceMap('.$resourceMap.');';
            $html .= '</script>';
        }
        return $html;
    }

    //渲染资源，将收集到的js css，变为html标签，异步js资源变为resorce map。
    public static function render($type){
        $html = '';
        if ($type === 'js') {
            if (isset(self::$arrStaticCollection['js'])) {
                $arrURIs = &self::$arrStaticCollection['js'];

                $arrURIs = self::combo( $arrURIs, 'js' );

                $html = '<script type="text/javascript" src="' . implode('"></script><script type="text/javascript" src="', $arrURIs) . '"></script>';
            }
        } else if($type === 'css'){
            if(isset(self::$arrStaticCollection['css'])){
                $arrURIs = &self::$arrStaticCollection['css'];
                $arrURIs = self::combo( $arrURIs );
                $html = '<link rel="stylesheet" type="text/css" href="' . implode('"/><link rel="stylesheet" type="text/css" href="', $arrURIs) . '"/>';
            }
        } else if($type === 'framework'){
            $html .= self::getModJsHtml();
        }

        return $html;
    }

    public static function combo( $files, $type = 'css' ){
        $rs = array();
        $maxChrs = 2000;
        $curChrs = 0;
        $url = '';
        $root = '';

        $totalFiles = count( $files );

        if ( !$totalFiles ) {
            return $rs;
        }

        $tester = $files[0];

        $isHTTPS = strpos($tester, 'https://') === 0;


        if ( (strpos($tester, 'http://') === false && !$isHTTPS) || self::$autoConcat == false ) {
            return $files;
        }

        $urlInfo = parse_url( $tester );
        $scheme  = $urlInfo['scheme'];
        $host    = $urlInfo['host'];

        if ( $scheme ) {
            $root = $scheme . ':';
        }
        $root .= '//' . $host;

        // https://a.zbjimg.com/rake/
        if ( $isHTTPS ) {
            $root .= '/rake';
        }
        $rootLen = strlen( $root );

        $url = $root . '/??';

        $startIdx = 0;

        urlLoop: {
            $currentUrlPool = array();
            $curChrs = $rootLen + 3;

            // do combo
            for ( ; $startIdx < $totalFiles; $startIdx++ ) {
                $item = substr( $files[$startIdx], $rootLen );
                $itemLen = strlen( $item );

                // 如果是 css 资源，默认 common 的 global.css 会单独加载，以及项目有 common.css 的话，也会单独加载
                if ( $type == 'css'
                    && ( preg_match('/^\/static\/login\-common\/global/', $item) || preg_match('/^\/static\/common\/global/', $item) || preg_match('/^\/static\/[a-zA-Z0-9-]*\/common/', $item) )) {
                    count($currentUrlPool) && array_push( $rs, $url . join(',', $currentUrlPool));
                    array_push( $rs, $url . $item);
                    $startIdx++;
                    goto urlLoop;
                    break;

                }

                if ( $curChrs + $itemLen > $maxChrs ) {
                    array_push( $rs, $url . join(',', $currentUrlPool));
                    goto urlLoop;
                    break;
                }

                array_push( $currentUrlPool, $item );
                $curChrs += $itemLen + 1;
            }

            count($currentUrlPool) && array_push( $rs, $url . join(',', $currentUrlPool));
        }
        return $rs;
    }



    public static function addScriptPool($str, $priority) {
        $priority = intval($priority);
        if (!isset(self::$arrScriptPool[$priority])) {
            self::$arrScriptPool[$priority] = array();
        }
        self::$arrScriptPool[$priority][] = $str;
    }

    //输出js，将页面的js源代码集合到pool，一起输出
    public static function renderScriptPool(){
        $html = '';
        if(!empty(self::$arrScriptPool)) {
            $priorities =  array_keys(self::$arrScriptPool);
            rsort($priorities);
            foreach ($priorities as $priority) {
                $html .= '<script type="text/javascript">!function(){' . implode("}();\n!function(){", self::$arrScriptPool[$priority]) . '}();</script>';
            }
        }
        return $html;
    }

    //获取异步js资源集合，变为json格式的resourcemap
    public static function getResourceMap() {
        $ret = '';
        $arrResourceMap = array();
        $needPkg = !array_key_exists('fis_debug', $_GET);
        if (isset(self::$arrRequireAsyncCollection['res'])) {
            foreach (self::$arrRequireAsyncCollection['res'] as $id => $arrRes) {
                $deps = array();
                if (!empty($arrRes['deps'])) {
                    foreach ($arrRes['deps'] as $strName) {
                        if (preg_match('/\.js$/i', $strName)) {
                            $deps[] = $strName;
                        }
                    }
                }

                $arrResourceMap['res'][$id] = array(
                    'url' => $arrRes['uri'],
                );

                if (!empty($arrRes['pkg']) && $needPkg) {
                    $arrResourceMap['res'][$id]['pkg'] = $arrRes['pkg'];
                }

                if (!empty($deps)) {
                    $arrResourceMap['res'][$id]['deps'] = $deps;
                }
            }
        }
        if (isset(self::$arrRequireAsyncCollection['pkg']) && $needPkg) {
            foreach (self::$arrRequireAsyncCollection['pkg'] as $id => $arrRes) {
                $arrResourceMap['pkg'][$id] = array(
                    'url'=> $arrRes['uri']
                );
            }
        }
        if (!empty($arrResourceMap)) {
            $ret = str_replace('\\/', '/', json_encode($arrResourceMap));
        }
        return  $ret;
    }

    //获取命名空间的map.json
    public static function register($strNamespace, $smarty){
        if($strNamespace === '__global__'){
            $strMapName = 'map.json';
        } else {
            $strMapName = $strNamespace . '-map.json';
        }
        $arrConfigDir = $smarty->getConfigDir();
        foreach ($arrConfigDir as $strDir) {
            $strPath = preg_replace('/[\\/\\\\]+/', '/', $strDir . '/' . $strMapName);
            if(is_file($strPath)){
                self::$arrMap[$strNamespace] = json_decode(file_get_contents($strPath), true);
                return true;
            }
        }
        return false;
    }

    /**
     * 分析组件依赖
     * @param array $arrRes  组件信息
     * @param Object $smarty  smarty对象
     * @param bool $async   是否异步
     */
    private static function loadDeps($arrRes, $smarty, $async) {
        //require.async
        if (isset($arrRes['extras']) && isset($arrRes['extras']['async'])) {
            foreach ($arrRes['extras']['async'] as $uri) {
                self::load($uri, $smarty, true);
            }
        }
        if(isset($arrRes['deps'])){
            foreach ($arrRes['deps'] as $strDep) {
                self::load($strDep, $smarty, $async);
            }
        }
    }

    /**
     * 已经分析到的组件在后续被同步使用时在异步组里删除。
     * @param $strName
     */
    private static function delAsyncDeps($strName) {
        if (isset(self::$arrAsyncDeleted[$strName])) {
            return true;
        } else {
            self::$arrAsyncDeleted[$strName] = true;

            $arrRes = self::$arrRequireAsyncCollection['res'][$strName];

            //first deps
            if (isset($arrRes['deps'])) {
                foreach ($arrRes['deps'] as $strDep) {
                    if (isset(self::$arrRequireAsyncCollection['res'][$strDep])) {
                        self::delAsyncDeps($strDep);
                    }
                }
            }

            //second self
            if (isset($arrRes['pkg'])) {
                $arrPkg = self::$arrRequireAsyncCollection['pkg'][$arrRes['pkg']];
                $syncJs = isset(self::$arrStaticCollection['js']) ? self::$arrStaticCollection['js'] : array();
                if ($arrPkg && !in_array($arrPkg['uri'], $syncJs)) {
                    self::$arrStaticCollection['js'][] = $arrPkg['uri'];
                    //@TODO
                    //unset(self::$arrRequireAsyncCollection['pkg'][$arrRes['pkg']]);
                    foreach ($arrPkg['has'] as $strHas) {
                        if (isset(self::$arrRequireAsyncCollection['res'][$strHas])) {
                            self::$arrLoaded[$strName] = $arrPkg['uri'];
                            self::delAsyncDeps($strHas);
                        }
                    }
                } else {
                    //@TODO
                    //unset(self::$arrRequireAsyncCollection['res'][$strName]);
                }
            } else {
                //已经分析过的并且在其他文件里同步加载的组件，重新收集在同步输出组
                self::$arrStaticCollection['js'][] = $arrRes['uri'];
                self::$arrLoaded[$strName] = $arrRes['uri'];
                //@TODO
                //unset(self::$arrRequireAsyncCollection['res'][$strName]);
            }
        }
    }

    public static function resourceExists( $strName, $smarty ){
        if(isset(self::$arrLoaded[$strName])) {
            return true;
        }

        $intPos = strpos($strName, ':');
        if($intPos === false){
            $strNamespace = '__global__';
        } else {
            $strNamespace = substr($strName, 0, $intPos);
        }
        if(isset(self::$arrMap[$strNamespace]) || self::register($strNamespace, $smarty)){
            $arrMap = &self::$arrMap[$strNamespace];
            if(isset($arrMap['res'][$strName])) {
                return true;
            }
        }
        return false;
    }

    /**
     * 加载组件以及组件依赖
     * @param $strName      id
     * @param $smarty       smarty对象
     * @param bool $async   是否为异步组件（only JS）
     * @return mixed
     */
    public static function load($strName, $smarty, $async = false, $reportError = true){

        if(isset(self::$arrLoaded[$strName])) {
            //同步组件优先级比异步组件高
            if (!$async && isset(self::$arrRequireAsyncCollection['res'][$strName])) {
                self::delAsyncDeps($strName);
            }
            return self::$arrLoaded[$strName];
        } else {
            $intPos = strpos($strName, ':');
            if($intPos === false){
                $strNamespace = '__global__';
            } else {
                $strNamespace = substr($strName, 0, $intPos);
            }
            if(isset(self::$arrMap[$strNamespace]) || self::register($strNamespace, $smarty)){
                $arrMap = &self::$arrMap[$strNamespace];
                $arrPkg = null;
                $arrPkgHas = array();
                if(isset($arrMap['res'][$strName])) {
                    $arrRes = &$arrMap['res'][$strName];
                    if(!array_key_exists('fis_debug', $_GET) && isset($arrRes['pkg'])){
                        $arrPkg = &$arrMap['pkg'][$arrRes['pkg']];
                        $strURI = $arrPkg['uri'];

                        foreach ($arrPkg['has'] as $strResId) {
                            self::$arrLoaded[$strResId] = $strURI;
                        }

                        foreach ($arrPkg['has'] as $strResId) {
                            $arrHasRes = &$arrMap['res'][$strResId];
                            $arrPkgHas[$strResId] = $arrHasRes;
                            self::loadDeps($arrHasRes, $smarty, $async);

                        }
                    } else {
                        $strURI = $arrRes['uri'];
                        self::$arrLoaded[$strName] = $strURI;
                        self::loadDeps($arrRes, $smarty, $async);
                    }

                    if ($async && $arrRes['type'] === 'js') {
                        if ($arrPkg) {
                            self::$arrRequireAsyncCollection['pkg'][$arrRes['pkg']] = $arrPkg;
                            self::$arrRequireAsyncCollection['res'] = array_merge((array)self::$arrRequireAsyncCollection['res'], $arrPkgHas);
                        } else {
                            self::$arrRequireAsyncCollection['res'][$strName] = $arrRes;
                        }
                    } else {
                        self::$arrStaticCollection[$arrRes['type']][] = $strURI;
                    }
                    return $strURI;
                } else {
                    self::triggerError($strName, 'undefined resource "' . $strName . '"', E_USER_NOTICE, $reportError);
                }
            } else {
                self::triggerError($strName, 'missing map file of "' . $strNamespace . '"', E_USER_NOTICE, $reportError);
            }
        }
        self::triggerError($strName, 'unknown resource "' . $strName . '" load error', E_USER_NOTICE, $reportError);
    }

    /**
     * 用户代码自定义js组件，其没有对应的文件
     * 只有有后缀的组件找不到时进行报错
     * @param $strName       组件ID
     * @param $strMessage    错误信息
     * @param $errorLevel    错误level
     */
    private static function triggerError($strName, $strMessage, $errorLevel, $reportError) {
        if ( !$reportError ) {
            return;
        }
        $arrExt = array(
            'js',
            'css',
            'tpl',
            'html',
            'xhtml',
        );
        if (preg_match('/\.('.implode('|', $arrExt).')$/', $strName)) {
            trigger_error(date('Y-m-d H:i:s') . '   ' . $strName . ' ' . $strMessage, $errorLevel);
        }
    }
}
