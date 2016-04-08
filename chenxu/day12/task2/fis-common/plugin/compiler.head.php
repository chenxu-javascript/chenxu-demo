<?php

function smarty_compiler_head($arrParams,  $smarty){
    $strResourceApiPath = preg_replace('/[\\/\\\\]+/', '/', dirname(__FILE__) . '/FISResource.class.php');
    $strCode = '<?php ';
    $strCode .= 'if(!class_exists(\'FISResource\', false)){require_once(\'' . $strResourceApiPath . '\');}';
    $strCode .= 'FISResource::setTemplateEntry($_smarty_tpl->smarty,'. $arrParams['autoConcat'] .');';
    $strCode .= '?>';

//    unset($arrParams['autoConcat']);

    $strAttr = '';
    foreach ($arrParams as $_key => $_value) {
        $strAttr .= ' ' . $_key . '="<?php echo ' . $_value . ';?>"';
    }
    return $strCode . '<head' . $strAttr . '>';
}

function smarty_compiler_headclose($arrParams,  $smarty){
    $strResourceApiPath = preg_replace('/[\\/\\\\]+/', '/', dirname(__FILE__) . '/FISResource.class.php');
    $strCode = '<?php ';
    $strCode .= 'if(!class_exists(\'FISResource\', false)){require_once(\'' . $strResourceApiPath . '\');}';
    $strCode .= 'echo FISResource::cssHook();';
    $strCode .= '?>';
    $strCode .= '</head>';
    return $strCode;
}
