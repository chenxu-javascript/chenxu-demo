module.exports = {
    isHTTPSPage: isHTTPSPage,
    getUrl: getUrl,
    getLoginUrl: getLoginUrl,
    getUserAvatar: getUserAvatar,
    getUserLevelImg: getUserLevelImg,
    uuid: genUUID(),
    getImgResizeInfo: getImgResizeInfo
};

function isHTTPSPage(){
    return document.location.href.indexOf('https://') >= 0;
}

function getImgResizeInfo ( data ){

    var imgWidth = data.imgWidth,
        imgHeight = data.imgHeight,
        maxWidth = data.maxWidth,
        maxHeight = data.maxHeight;

    var wRatio = maxWidth / imgWidth;
    var hRatio = maxHeight / imgHeight;

    var ratio;
    if ( wRatio >= 1 && hRatio >= 1 ) {
        ratio = 1;
    } else {
        if ( wRatio < hRatio ) {
            ratio = wRatio;
        } else {
            ratio = hRatio;
        }
    }
    return {
        ratio: ratio,
        width: imgWidth * ratio,
        height: imgHeight * ratio
    }
}

function genUUID(){
    var _id = 0;
    return function(){
        return 'zbj_uuid_' + (_id++);
    }
}


function getUserAvatar( uid, size ){
    if( !uid ) return 'http://t4.zbjimg.com/r/p/task/48.gif';//如果没有传入用户ID，则返回国默认图片地址

    var maxIUserid = "000000000" + uid,
        iUserid = maxIUserid.substr( maxIUserid.length - 9, 9),
        sImgUrl;

    size = size || 'small';

    sImgUrl = 'http://avatar.zbjimg.com/'
        + iUserid.substr(0,3)
        + '/'+ iUserid.substr(3,2)
        + '/' + iUserid.substr(5,2)
        + '/200x200_avatar_'
        + iUserid.substr(7,2) + '.jpg!' + size;

    return sImgUrl;
}

function getUrl( domain, path ){
    var url = 'http';
    if ( domain == 'login' ) {
        url += 's';
    }
    return url + "://" + domain + "." + window.ZBJInfo.baseURI + '/' + path;
}

function getLoginUrl (path) {
    return getUrl( 'login', path );
}

function getUserLevelImg( level ){
    level = level * 1;
    var imgPath = 'http://t5.zbjimg.com/r/pic/###.gif';
    if ( level < 9 ) {
        return imgPath.replace("###", 'zbj' + level);
    }
    if ( level < 17 ) {
        return imgPath.replace("###", 'tp' + ( level - 8 ) );
    }

    if ( level < 25 ) {
        return imgPath.replace("###", 'zz' + ( level - 16 ) );
    }

    if ( level < 33 ) {
        return imgPath.replace("###", 'tz' + ( level - 24 ) );
    }
}