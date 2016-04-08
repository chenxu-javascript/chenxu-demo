<?php

function smarty_modifier_avatar( $userId, $size ){

    $types = array('big', 'middle', 'small');

    $avatarSuffix = '!big';

    if (in_array($size, $types)) {

        switch ( $size ) {

            case 'big':
                $avatarSuffix = '!big';
                break;
            case 'middle':
                $avatarSuffix = '!middle';
                break;
            case 'small':
                $avatarSuffix = '!small';
                break;
            default :
                $avatarSuffix = '!big';
                break;
        }

    }

    $strResourceApiPath = preg_replace('/[\\/\\\\]+/', '/', dirname(__FILE__) . '/FISResource.class.php');
    require_once( $strResourceApiPath );

    $str = FISResource::$siteConfig['siteUrlList']['face'] . getAvatar(abs(intval( $userId ))) . $avatarSuffix;

    return $str;
}

function getAvatar( $userId, $suffix = '.jpg', $prefix = '' ){
    $uid = sprintf("%09d", $userId);
    $dir1 = substr($uid, 0, 3);
    $dir2 = substr($uid, 3, 2);
    $dir3 = substr($uid, 5, 2);
    return $prefix . '/' . $dir1 . '/' . $dir2 . '/' . $dir3 . '/200x200_avatar_' . substr($uid, -2) . $suffix;
}