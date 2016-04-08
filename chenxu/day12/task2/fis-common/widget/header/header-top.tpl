<div class="zbj-header-top" id="j-header-top">
    <div class="zbj-grid">
        <div class="fl zbj-header-greet">
            <div class="zbj-dropdown zbj-dropdown-section">
                <div class="zbj-dropdown-hd">
                    <a data-linkid="topbar-app" class="ui-dropdown-hd mobiphone" id="j-mobiphone"
                       target="_blank" href="{%get_url domain="app"%}">
                         <i class="wei"></i><span>手机猪八戒</span>
                    </a>
                </div>
                <div class="zbj-dropdown-menu j_cms_ctn" data-cmstoken="mobile/f930fa8dc97d3593"></div>
            </div>
            <span class="split">|</span>
            <a data-linkid="topbar-int" rel="nofollow" href="{%get_url domain="int"%}?utm_source=INT_LuPai&utm_medium=Top&utm_campaign=INT" target="_blank">国际猪八戒</a>
        </div>
        <div class="fr zbj-header-nav">
            {%if empty($is_index)%}
                <a href="{%get_url domain="www"%}"><i class="highlight iconfont icon-font">&#xe830;</i> 猪八戒首页</a>
                <span class="split">|</span>
            {%/if%}
            <span id="J-header-logic3" class="item-userinfo">
                    <div class="zbj-dropdown zbj-dropdown-section">
                        <div class="zbj-dropdown-hd">
                            <a data-linkid="topbar-login" rel="nofollow" href="{%get_url domain="login"%}login"
                               class=" item-login">
                                登录
                                <b><i class="iconfont icon-font">&#xe807;</i></b>
                            </a>
                        </div>
                        <ul class="unstyled hezuo-login zbj-dropdown-menu">
                            <li><a data-linkid="topbar-login-zbj" rel="nofollow" href="{%get_url domain="login"%}login" class="zhubajie">猪八戒账号登录</a></li>
                            <li><a data-linkid="topbar-login-tb" rel="nofollow" href="{%get_url domain="login"%}oauth/redirect/act/taobao" class="taob" title="使用淘宝账号登录">淘宝账号登录</a></li>
                            <li><a data-linkid="topbar-login-wb" rel="nofollow" href="{%get_url domain="login"%}oauth/redirect/act/sina" class="xinL" title="使用新浪微博账号登录">新浪微博账号登录</a></li>
                            <li><a data-linkid="topbar-login-qq" rel="nofollow" href="{%get_url domain="login"%}oauth/redirect/act/QQ" class="qq" title="使用QQ账号登录">QQ账号登录</a></li>
                        </ul>
                    </div>
                    <span class="split">|</span>
                    <a data-linkid="topbar-reg" rel="nofollow" href="{%get_url domain="login"%}register" class="item-regx">免费注册</a>
                </span>
            <span class="split">|</span>
            <a data-linkid="topbar-u-order" rel="nofollow" target="_blank" href="{%get_url domain="u"%}task/order">我的订单</a>
            <span class="split">|</span>
            <div class="zbj-dropdown  zbj-dropdown-section">
                <div class="zbj-dropdown-hd">
                    <a data-linkid="topbar-u-me" rel="nofollow" href="{%get_url domain="u"%}"
                       class="">
                        我是雇主
                        <b><i class="iconfont icon-font">&#xe807;</i></b>
                    </a>
                </div>
                <ul class="unstyled fr zbj-dropdown-menu ui-menu-fix">
                    <li><a data-linkid="topbar-u-find" target="_blank" href="{%get_url domain="home"%}">找服务商</a></li>
                    <li><a data-linkid="topbar-u-release" rel="nofollow" target="_blank" href="{%get_url domain="task"%}pub/step1">发布需求</a></li>
                </ul>
            </div>
            <span class="split">|</span>
            {%*是否是签约服务商容器,此处由是ajax加载*%}
            <span id="j-work-status">
            </span>
            <div class="zbj-dropdown  zbj-dropdown-section" id="j-need-invite">
                <div class="zbj-dropdown-hd">
                    <a data-linkid="topbar-u-seller" rel="nofollow" href="{%get_url domain="u"%}seller/">
                        我是服务商 <b><i class="iconfont icon-font">&#xe807;</i></b>
                    </a>
                </div>
                <ul class="unstyled fr zbj-dropdown-menu ui-menu-fix">
                    <li><a data-linkid="topbar-u-orderctr" rel="nofollow" href="{%get_url domain="u"%}task/seller" target="_blank">交易管理</a></li>
                    {%if $isfws%}
                        <li><a data-linkid="topbar-u-shop" rel="nofollow" href="{%get_url domain="shop"%}{%$_userid%}" target="_blank">我的店铺</a></li>
                        <li><a data-linkid="topbar-u-service" rel="nofollow" href="{%get_url domain="u"%}services/index" target="_blank">我的服务</a></li>
                    {%else%}
                        <li><a data-linkid="topbar-u-wikeyentrance"  class="j-zbj-shop-entry"  rel="nofollow"  href="{%get_url domain="www"%}direct/d?c=5&l={%get_url domain="www"%}active/wikeyentrance" target="_blank">免费开店</a></li>
                    {%/if%}
                    <li><a data-linkid="topbar-u-task" target="_blank" href="{%get_url domain="task"%}xuqiu/" class="highlight">投标赚钱</a></li>
                    <li><a data-linkid="topbar-fws" rel="nofollow" target="_blank" href="{%get_url domain="edu"%}">猪八戒商学院</a></li>
                    <li><a data-linkid="10015249" rel="nofollow" target="_blank" href="{%get_url domain='u'%}activity/ActivityListAll?f=user">八戒活动</a></li>
                    <li><a data-linkid="topbar-qyfws" rel="nofollow" target="_blank" href="{%get_url domain="www"%}vip/index/" class="highlight">八戒通</a></li>
                    <li><a data-linkid="topbar-bjtgt" rel="nofollow" target="_blank" href="{%get_url domain='tgt'%}">八戒推广通</a></li>
                    <li><a rel="nofollow" target="_blank" href="{%get_url domain='zt'%}bgl/2015-10-27/jingzhuntoufang3.html">区域广告位</a></li>
                </ul>
              {%*  <div class="ui-poptipnoc ui-poptipnoc-bottom topbar-seller-tips" style="display: none">
                    <div class="ui-poptipnoc-arrow"><i></i></div>
                    <div class="ui-poptipnoc-bd">需求市场搬到这了，快来投标赚钱</div>
                </div>*%}
            </div>
            <span class="split">|</span>
            <a data-linkid="topbar-u-follow" rel="nofollow" href="{%get_url domain="u"%}fav/follow?iden=buyer&_t=1397472922605" target="_blank">我的收藏</a>
            <span class="split">|</span>
            <a data-linkid="topbar-contact" rel="nofollow" href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODA3ODA5MV8xNTgwNDFfNDAwMTg4NjY2Nl8yXw" target="_blank">联系客服</a>
            <span class="split">|</span>
            <div class="zbj-dropdown  zbj-dropdown-section zbj-dropdown-multi">
                <div class="zbj-dropdown-hd">
                    <a data-linkid="topbar-nav" rel="nofollow" href="#none" class="">
                        网站导航 <b><i class="iconfont icon-font">&#xe807;</i></b>
                    </a>
                </div>
                <ul class="unstyled fr zbj-dropdown-menu ui-menu-sitemap">
                    <li class="map-01">
                        <strong class="map-tit">基础服务</strong>
                        <div class="map-lnk">
                            <!--暂时关闭优选-->
                            <!-- <a data-linkid="topbar-youxuan" data-process="1" rel="nofollow" target="_blank" href="{%get_url domain="youxuan"%}" class="highlight">优选商城</a> -->
                            <a target="_blank" href="{%get_url domain="home"%}">服务商库</a>
                            <a target="_blank" href="{%get_url domain="task"%}">需求大厅</a>
                            <a target="_blank" href="{%get_url domain="task"%}success/">案例库</a>
                        </div>
                    </li>
                  {%*  <li class="map-02">
                        <strong class="map-tit">行业市场</strong>
                        <div class="map-lnk">
                            <a target="_blank" href="{%get_url domain="www"%}logovi/">Logo设计</a>
                            <a target="_blank" href="{%get_url domain="www"%}xcpsj/">宣传品设计</a>
                            <a target="_blank" href="{%get_url domain="www"%}uisheji/">UI设计</a>
                            <a target="_blank" href="{%get_url domain="www"%}wzkf/">网站开发</a>
                            <a target="_blank" href="{%get_url domain="www"%}ydyykf/">APP开发</a>
                            <a target="_blank" href="{%get_url domain="www"%}rjkf/">软件开发</a>
                            <a target="_blank" href="{%get_url domain="www"%}tuiguang/">营销推广</a>
                            <a target="_blank" href="{%get_url domain="www"%}xiezuo/">文案策划</a>
                            <a target="_blank" href="{%get_url domain="www"%}wdtg/">网店服务</a>
                            <a target="_blank" href="{%get_url domain="www"%}gycpsj/">工业设计</a>
                            <a target="_blank" href="{%get_url domain="www"%}dhsj/">动画影音</a>
                            <a target="_blank" href="{%get_url domain="gc"%}">建筑工程</a>
                        </div>
                    </li>*%}
                    <li class="map-02">
                        <strong class="map-tit">{%$guideMarket.name%}</strong>
                        <div class="map-lnk">

                            {%foreach from=$guideMarket.list item=item%}
                                {%if $item.imgurl%}
                                    <a class="highlight" target="_blank" href="{%$item.href_url%}">{%$item.title%}<i></i></a>
                                {%else%}
                                    <a target="_blank" href="{%$item.href_url%}">{%$item.title%}</a>
                                {%/if%}
                            {%/foreach%}
                        </div>
                    </li>
                    <li class="map-03">
                        <strong class="map-tit">特色市场</strong>
                        <div class="map-lnk">
                            {%if $smarty.server.HTTPS eq "on"%}
                                {%$imgPrefix="{%get_url domain="login"%}cms"%}
                            {%else%}
                                {%$imgPrefix="http://cms.zbjimg.com"%}
                            {%/if%}

                            <a target="_blank" href="{%get_url domain="shang"%}" class="highlight">八戒悬赏<i></i></a>
                            <a target="_blank" href="{%get_url domain="task"%}zhongbang/" class="highlight">八戒众帮</a>
                            <a target="_blank" href="{%get_url domain="sj"%}?fr=2015">素材市集</a>
                            <a target="_blank" href="http://trademark.witmart.com/?utm_source=ZBJ&amp;utm_medium=DINGBUDAOHANG&amp;utm_campaign=YBJ" class="highlight" data-linkid="10005501">国际商标注册<i></i></a>
                            <a target="_blank" href="{%get_url domain="dakehu"%}">大赛</a>
                            <a target="_blank" href="{%get_url domain='gszc'%}?zqz_dh=1" class="highlight" data-linkid="10006546">开办公司<i></i></a>
                            <a class="img" target="_blank" href="http://ipr.zbj.com/?_union_uid=7223946&_union_itemid=136888">
                                <img src="{%$imgPrefix%}/zscq.png">
                            </a>
                            <a class="img" target="_blank" href="http://www.tianpeng.com/?hmsr=zbj&amp;hmmd=icon&amp;hmpl=navigation&amp;hmkw=&amp;hmci=">
                                <img src="{%$imgPrefix%}/tpw.png" href="http://www.tianpeng.com/?hmsr=zbj&amp;hmmd=icon&amp;hmpl=navigation&amp;hmkw=&amp;hmci=" alt="天蓬网">
                            </a>
                        </div>
                    </li>
                    <li class="map-04">
                        <strong class="map-tit">卖家服务</strong>
                        <div class="map-lnk">
                            <a target="_blank" href="{%get_url domain="edu"%}">八戒商学院</a>
                            <a target="_blank" href="{%get_url domain="u"%}shangjindai/index">赏金贷</a>
                            <a target="_blank" href="{%get_url domain="u"%}bajiedata">八戒数据</a>
                            {%*crm 下线*%}
                            {%*<a target="_blank" href="{%get_url domain="u"%}statistics/index">八戒CRM</a>*%}
                            <a target="_blank" href="{%get_url domain="app"%}wk/">抢单宝APP</a>
                            <a target="_blank" href="{%get_url domain="u"%}shop/editIndex">八戒旺铺</a>
                            <a target="_blank" href="{%get_url domain="tgt"%}">八戒推广通</a>
                            <a target="_blank" href="{%get_url domain="www"%}vip/index/">八戒通</a>
                            <a target="_blank" data-linkid="10011196" href="{%get_url domain='edu'%}university/ArticleList?cid=1267">八戒评测</a>
                            <a target="_blank" href="{%get_url domain='zt'%}bgl/2015-10-27/jingzhuntoufang3.html">区域广告位</a>
                        </div>
                    </li>
                    <li class="map-05">
                        <strong class="map-tit">八戒资讯</strong>
                        <div class="map-lnk">
                            <a target="_blank" href="{%get_url domain="gushi"%}weike/">威客故事</a>
                            <a target="_blank" href="{%get_url domain="gushi"%}guzhu/">雇主故事</a>
                            <a target="_blank" href="{%get_url domain="gl"%}">八戒攻略</a>
                            <a target="_blank" href="{%get_url domain="quanzi"%}">八戒圈子</a>
                            <a target="_blank" href="{%get_url domain="news"%}">八戒动态</a>
                        </div>
                    </li>
                    <li class="map-06">
                        <strong class="map-tit">交易保障</strong>
                        <div class="map-lnk">
                            <a target="_blank" href="{%get_url domain="www"%}fuwubao/index">服务宝</a>
                            <a target="_blank" href="{%get_url domain="chengxin"%}">诚信管理中心</a>
                            <a target="_blank" href="{%get_url domain="help"%}">帮助中心</a>
                            <a target="_blank" data-linkid="10011198" href="{%get_url domain='edu'%}university/ArticleList?cid=1267">八戒评测</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>