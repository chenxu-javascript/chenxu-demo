/**
 * 验证码组件
 *
 * todo 待后端功能完成后，加入验证逻辑 defcc
 */
require('./captcha.less');

var captchaTpl = require('./captcha.tmpl');
var utils = require('common:components/utils/utils');
var getUrl = utils.getUrl;

/**
 * @opts
 * holder: 验证码的 dom 容器
 * theme: 验证码的最外层节点上加的 class，方便对样式进行覆盖
 * captchaHTML: 验证码的 html 代码，参见 captchable.tpl 模版
 *
 */

function Captchable( opts ){
    this.captchaHolder = $( opts.holder );
    this.captchaTheme = opts.theme || '';
    this.captchaHTML = opts.captchaHTML || captchaTpl( {theme: this.captchaTheme} );
    this.initEvents();
}

Captchable.prototype.initEvents = function(){
    var captchaHolder = this.captchaHolder;

    var captchaImgSrc = getUrl('task', 'api/catcha?seed=');

    var refresher = function(){
        var captchaImg = captchaHolder.find('img[role=captchaimg]');
        var captchaSeed = captchaHolder.find('input[role=seed]');

        var seed = +new Date;
        var src = captchaImgSrc + seed;

        captchaImg.attr('src', src);
        captchaHolder.find('input[role=captcha]').val('');
        captchaSeed.val(seed);

        return false;
    };
    captchaHolder.delegate('[role=refresh]', 'click', refresher);
};

Captchable.prototype.refresh = function(){
    this.captchaHolder.find('[role=refresh]').click();
};

Captchable.prototype.checkCaptcha = function(){
    var rs = {};
    var data = this.getData();

    if ( data.exists ) {
        rs.value = data.captcha;
        rs.isValid = !!rs.value;
    } else {
        rs = {
            isValid: 1,
            value: null
        };
    }
    rs.data = data;
    return rs;
};

Captchable.prototype.getData = function(){
    var captchaHolder = this.captchaHolder;
    return {
        exists: captchaHolder.find('input[role=captcha]').size(),
        seed: captchaHolder.find('input[role=seed]').val(),
        captcha: captchaHolder.find('input[role=captcha]').val()
    };
};

Captchable.prototype.show = function(){
    var captchaHolder = this.captchaHolder;

    captchaHolder.html( this.captchaHTML );

    this.refresh();
};

module.exports = Captchable;