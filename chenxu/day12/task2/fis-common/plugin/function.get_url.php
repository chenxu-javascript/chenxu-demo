<?php
/**
 * Smarty plugin
 * @package Smarty
 * @subpackage plugins
 */


/**
 * 获取URL地址,需要处理复杂的查询方式,比如多参数，搜索等，请使用query,_GET等参数
 * 
 * @param    array('domain' => '', 'path' => '', 'ssl' => '');
 * @param    Smarty
 * @return   string
 */

/**
 *
 *
 *
 */

function smarty_function_get_url( $params, $smarty ){

    $strResourceApiPath = preg_replace('/[\\/\\\\]+/', '/', dirname(__FILE__) . '/FISResource.class.php');
    require_once( $strResourceApiPath );

    $url = 'http';

    $mainDomain = FISResource::$siteConfig['siteBaseUrl'];

    $subDomain = $params['domain'];
    if ( $subDomain == 'login' ) {
        $url .= 's';
    }
    $url .= '://';
    if ( $subDomain ) {
        $url .= $subDomain . '.' . $mainDomain;
    }

    $path = $params['path'];
    $path = preg_replace('/^\/*/', '', $path);

    return $url . '/' . $path;
}