<?php

function smarty_compiler_registerZBJVariable($arrParams,  $smarty){
    $strResourceApiPath = preg_replace('/[\\/\\\\]+/', '/', dirname(__FILE__) . '/FISResource.class.php');
    $strCode = '<?php ';
    $strCode .= 'if(!class_exists(\'FISResource\', false)){require_once(\'' . $strResourceApiPath . '\');}';
    $strCode .= 'FISResource::registerZBJVariable(' . $arrParams['siteConfig'] . ');';
    $strCode .= '?>';

    return $strCode;
}
