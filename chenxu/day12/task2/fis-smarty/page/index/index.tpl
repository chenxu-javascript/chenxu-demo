{%extends file="../common/layout.tpl"%}
{%block name="content"%}

 <header class="header">
       <!-- 注册 登录 顶部-->
       <div class="header-title">
           <div class="center">
                <p class="header-title-company"><a href="#">猪八戒网</a> 旗下专业企业财税服务平台</p>
                <ul class="header-title-ul">
                    <li class="header-login"><a href="#">注册</a></li>
                    <li><a href="#">登录</a></li>
                    <li><a href="#" class="nav-last">联系我们:4001886666</a></li>
                </ul>
           </div>
       </div>
        <!--nav 导航栏 logo-->
       <div class="header-nav">
           <div class="center header-nav-center">
                <div class="header-nav-logo">
                    <img   src="{%uri name="demo:static/index/img/logo02_03.png"%}" alt="logo" title="八戒代账">
                </div>
                <div class="header-btn" id="header-btn">
                    <img   src="{%uri name="demo:static/index/img/drawer-icon.png"%}" title="anliu" alt="手机三条线">
                </div>
                <ul class="header-nav-right" datastatus="close">
                    <li ><a class="nav-choose">首页</a></li>
                    <li><a>八戒代账</a></li>
                    <li><a>注册公司</a></li>
                    <li><a href="#" class="nav-last">财税学堂</a></li>
                </ul>
           </div>
       </div>
    </header>
    <!--主体部分-->
    <section>
        <!--banner  部分-->
        <div class="bannermain">
            <div class="center position-center">
                <div class="bannermain-banner">
                      <p>二师兄来带账啦</p>
                      <span>99元/月 冰点价，带你飞</span>
                </div>
                <div class="bannermain-border">
                    <ul class="bannermain-nav" id="bannermain-nav">
                        <li class="bannermain-item bannermain-item-now"><span>财税咨询</span></li>
                        <li class="bannermain-item"><span>税务代理</span></li>
                        <li class="bannermain-item"><span>注册公司</span></li>
                    </ul>
                    <div class="bannermain-hide bannermain-show">
                        <div class="bannermain-border-lable">
                            <label>
                                <input class="bannermain-input bannermain-name" type="text" placeholder="您的称呼">
                            </label>
                            <label>
                                <input class="bannermain-input bannermain-phone" type="text" placeholder="您的电话">
                            </label>
                        </div>
                        <p class="bannermain-detail">·目前仅支持重庆地区</p>
                        <div class="bannermain-button">
                            <button class="bannermainr-button-offer">免费申请</button>
                        </div>
                        <div class="bannermain-smalltitle">
                            <span>小规模纳税人：每月<em> 49 </em> 元起,<em> 1990 </em>元封顶</span>
                        </div>
                    </div>
                    <div class="bannermain-hide ">
                        <div class="bannermain-border-lable">
                            <label>
                                <input class="bannermain-input bannermain-name" type="text" placeholder="代理人">
                            </label>
                            <label>
                                <input class="bannermain-input bannermain-phone" type="text" placeholder="密码">
                            </label>
                        </div>
                        <p class="bannermain-detail">·目前仅支持中国地区</p>
                        <div class="bannermain-button">
                            <button class="bannermain-button-offer">免费申请</button>
                        </div>
                        <div class="bannermain-smalltitle">
                            <span>小规模纳税人：每月<em> 49 </em> 元起,<em> 199 </em>元封顶</span>
                        </div>
                    </div>
                    <div class="bannermain-hide ">
                        <div class="bannermain-border-lable">
                            <label>
                                <input class="bannermain-input bannermain-name" type="text" placeholder="账号">
                            </label>
                            <label>
                                <input class="bannermain-input bannermai-phone" type="text" placeholder="密码">
                            </label>
                        </div>
                        <p class="bannermain-detail">·目前支持全球地区</p>
                        <div class="bannermain-button">
                            <button class="bannermain-button-offer">免费申请</button>
                        </div>
                        <div class="bannermain-smalltitle">
                            <span>小规模纳税人：每月<em> 49 </em> 元起,<em> 199 </em>元封顶</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--专业不只是说说而已-->
        <div class="profession">
            <div class="center">
                <p class="profession-title">专业，不是说说而已</p>
                <ul class="profession-list">
                    <li>
                        <span class="profession-one"></span>
                        <p>创办公司，<em>0</em>服务费</p>
                    </li>
                    <li>
                        <span class="profession-two"></span>
                        <p>代账<em>49</em>元，包年更优惠</p>
                    </li>
                    <li>
                        <span class="profession-three"></span>
                        <p>双审核制，代账有保障 </p>
                    </li>
                    <li>
                        <span class="profession-four"></span>
                        <p>出错全赔付，代账更放心</p>
                    </li>
                </ul>
            </div>
        </div>
        <!--装饰图 八戒代账-->
        <div class="description">
            <div class="description-one">
                <div class="center">
                    <div class="description-01-leftimg">
                    </div>
                    <div class="description-01">
                        <h2>八戒代账，无忧省心</h2>
                        <ul class="description-01-list">
                            <li><span>标准化流程</span></li>
                            <li><span>分档收费</span></li>
                            <li><span>差错赔付</span></li>
                            <li><span>随查随看</span></li>
                        </ul>
                        <div class="description-01-onaccout">
                            <a href="#" title="我要代账">我要代账</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="description-two">
                <div class="center">
                    <div class="description-02-rightimg">
                    </div>
                    <div class="description-02">
                        <h2>注册公司，0服务费</h2>
                        <ul class="description-02-list">
                            <li><span>0服务费</span></li>
                            <li><span>15个工作日全部搞定</span></li>
                        </ul>
                        <div class="description-02-opencampany">
                            <a href="#" title="我要代账">我要开公司</a>
                        </div>
                    </div>

                </div>
           </div>
        </div>
        <!--客户心声-->
        <div class="customervoice">
            <div class="center">
                 <div class="customervoice-header">
                     <span class="customervoice-line-left"></span>
                     <span class="customervoice-header-title">客户心声</span>
                     <span class="customervoice-line-right"></span>
                 </div>
                 <ul class="customervoice-list">
                     <li>
                         <span class="customervoice-img-one"></span>
                         <div class="customervoice-list-body">
                             <p class="customervoice-list-name">巩书凯</p>
                             <span class="customervoice-list-detial">艺点品牌策划创始人</span>
                             <p class="customervoice-list-p">"非常专业，很贴心，更及时，
                                 有了八戒代账我们就不需要专门招财务，
                                 省了一大笔资金，
                                 另外八戒代账能很好地帮我们规避一些税务风险，
                                 省去了很多麻烦"</p>
                         </div>
                     </li>
                     <li class="customervoice-list-margin">
                         <span class="customervoice-img-two"></span>
                         <div class="customervoice-list-body">
                             <p class="customervoice-list-name">陈希易</p>
                             <span class="customervoice-list-detial">本子推广创始人 </span>
                             <p class="customervoice-list-p">"八戒代账对我来说，
                                 确实非常省心，
                                 文件安全保密，
                                 价格上也相当实惠，
                                 和八戒代账合作真的很愉快！"</p>
                         </div>
                     </li>
                     <li>
                         <span class="customervoice-img-three"></span>
                         <div class="customervoice-list-body">
                             <p class="customervoice-list-name">补艳梅</p>
                             <span class="customervoice-list-detial">甲骨映画行政总监</span>
                             <p class="customervoice-list-p">"八戒代账给了我太大的帮助，
                                 价格对于刚初创的企业来说是完全可以接受的，
                                 公司的财税交给他们，
                                 我就没有后顾之忧了。支持！"</p>
                         </div>
                     </li>
                 </ul>
            </div>
        </div>
       <!-- 媒体报道 以及 动态-->
        <div class="mediamodule">
            <div class="center">

                <div class="mediareports-left">
                    <div class="mediareports-left-header">
                        <h2>媒体报道</h2>
                        <ul class="mediareports-left-header-circle" id="header-circle">
                            <li><span class="mediareports-circlr mediareports-choose"></span></li>
                            <li><span class="mediareports-circlr"></span></li>
                            <li><span class="mediareports-circlr"></span></li>
                            <li><span class="mediareports-circlr"></span></li>
                        </ul>
                    </div>
                    <div class="allcircle" id="allcircle">
                        <div class="allcircleshow" id="allcircleshow">
                            <div class="mediareports-left-main mediareports-show">
                                <div class="mediareports-left-main-one">
                                    <div class="mediareports-left-main-leftimg">

                                    </div>
                                    <div class="mediareports-main">
                                        <h3>八戒代账为中小微企业开创企业财税服务新时代1</h3>
                                        <span>2015-11-25</span>
                                        <p>非常专业，很贴心，更及时，
                                            有了八戒代账我们就不需要专门招财务，
                                            省去了很多麻烦，
                                            非常专业，很贴心，更及时，
                                            有了八戒代账我们就不需要专门招财务。。</p>
                                    </div>
                                </div>
                                <div class="mediareports-footer">
                                    <h3>八戒代账为中小微企业开创企业财税服务新时代</h3>
                                    <span>2015-11-25</span>
                                    <p>非常专业,很贴心更及时,
                                        有了八戒代账我们就不需要专门招财务,
                                        省了一大笔资金,
                                        另外八戒代账能很好地帮我们规避一些税务风险,
                                        省去了很多麻烦,
                                        非常专业,很贴心,更及时,
                                        有了八戒代账我们就不需要专门招财务。。</p>
                                </div>
                            </div>
                            <div class="mediareports-left-main">
                                <div class="mediareports-left-main-one">
                                    <div class="mediareports-left-main-leftimg">

                                    </div>
                                    <div class="mediareports-main">
                                        <h3>八戒代账为中小财税服务新时代2</h3>
                                        <span>2015-11-25</span>
                                        <p>非常专业，很贴心，更及时，
                                            有了八戒代账我们就不需要专门招财务
                                            有了八戒代账我们就不需要专门招财务。。</p>
                                    </div>
                                </div>
                                <div class="mediareports-footer">
                                    <h3>八戒代账为中小微企业开创企业财税服务</h3>
                                    <span>2015-11-25</span>
                                    <p>非常专业,很贴心更及时,
                                        有了八戒代账我们就不需要专门招财务,
                                        省了一大笔资金,
                                        另外八戒代账能很好地帮我们规避一些税务风险,
                                        省去了很多麻烦,
                                        非常专业,很贴心,更及时,
                                        有了八戒代账我们就不需要专门招财务。。</p>
                                </div>
                            </div>
                            <div class="mediareports-left-main">
                                <div class="mediareports-left-main-one">
                                    <div class="mediareports-left-main-leftimg">

                                    </div>
                                    <div class="mediareports-main">
                                        <h3>八戒代账为中小财税服务新时代2</h3>
                                        <span>2015-11-25</span>
                                        <p>非常专业，很贴心，更及时，
                                            有了八戒代账我们就不需要专门招财务，
                                            省了一大笔资金，
                                            有了八戒代账我们就不需要专门招财务。。</p>
                                    </div>
                                </div>
                                <div class="mediareports-footer">
                                    <h3>八戒代账为中小微企业开创企业财税服务</h3>
                                    <span>2015-11-25</span>
                                    <p>非常专业,很贴心更及时,
                                        有了八戒代账我们就不需要专门招财务,
                                        省了一大笔资金,
                                        另外八戒代账能很好地帮我们规避一些税务风险,
                                        省去了很多麻烦,
                                        非常专业,很贴心,更及时,
                                        有了八戒代账我们就不需要专门招财务。。</p>
                                </div>
                            </div>
                            <div class="mediareports-left-main">
                                <div class="mediareports-left-main-one">
                                    <div class="mediareports-left-main-leftimg">

                                    </div>
                                    <div class="mediareports-main">
                                        <h3>八戒代账为中小微企业开创企业财税服务新时代3</h3>
                                        <span>2015-11-25</span>
                                        <p>非常专业，很贴心，更及时，
                                            有了八戒代账我们就不需要专门招财务，
                                            省了一大笔资金，
                                            有了八戒代账我们就不需要专门招财务。。</p>
                                    </div>
                                </div>
                                <div class="mediareports-footer">
                                    <h3>八戒代账为中小微企业开创企业财税服务新时代</h3>
                                    <span>2015-11-25</span>
                                    <p>非常专业,很贴心更及时,
                                        有了八戒代账我们就不需要专门招财务,
                                        省了一大笔资金,
                                        另外八戒代账能很好地帮我们规避一些税务风险,
                                        省去了很多麻烦,
                                        gff
                                        有了八戒代账我们就不需要专门招财务。。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="moving-right">
                    <div class="moving-right-header">
                        <h2>动态</h2>
                    </div>
                    {%widget name="demo:widget/item-list/item-list.tpl"%}
                    <!-- <ul class="moving-right-list">
                        <li>
                            <span class="moving-right-list-detial"><em>重庆秦先生</em>&nbsp;&nbsp;办理了一年的企业代账</span>
                            <span class="moving-right-minuts-right">6分钟前</span>
                        </li>
                        <li>
                            <span class="moving-right-list-detial"><em>重庆秦先生</em>&nbsp;&nbsp;办理了一年的企业代账</span>
                            <span class="moving-right-minuts-right">6分钟前</span>
                        </li>
                        <li>
                            <span class="moving-right-list-detial"><em>重庆秦先生</em>&nbsp;&nbsp;办理了一年的企业代账</span>
                            <span class="moving-right-minuts-right">6分钟前</span>
                        </li>
                        <li>
                            <span class="moving-right-list-detial"><em>重庆秦先生</em>&nbsp;&nbsp;办理了一年的企业代账</span>
                            <span class="moving-right-minuts-right">6分钟前</span>
                        </li>
                        <li>
                            <span class="moving-right-list-detial"><em>重庆秦先生</em>&nbsp;&nbsp;办理了一年的企业代账</span>
                            <span class="moving-right-minuts-right">6分钟前</span>
                        </li>
                        <li>
                            <span class="moving-right-list-detial"><em>重庆秦先生</em>&nbsp;&nbsp;办理了一年的企业代账</span>
                            <span class="moving-right-minuts-right">6分钟前</span>
                        </li>
                        <li>
                            <span class="moving-right-list-detial"><em>重庆秦先生</em>&nbsp;&nbsp;办理了一年的企业代账</span>
                            <span class="moving-right-minuts-right">6分钟前</span>
                        </li>
                        <li>
                            <span class="moving-right-list-detial"><em>重庆秦先生</em>&nbsp;&nbsp;办理了一年的企业代账</span>
                            <span class="moving-right-minuts-right">6分钟前</span>
                        </li>
                        <li>
                            <span class="moving-right-list-detial"><em>重庆秦先生</em>&nbsp;&nbsp;办理了一年的企业代账</span>
                            <span class="moving-right-minuts-right">6分钟前</span>
                        </li>
                    </ul> -->
                </div>
            </div>
        </div>
    </section>
    <!--页脚部分-->
    <footer>
        <div class="platform">
            <div class="center">
                 <h3>中国领先的财税服务平台</h3>
                 <ul class="platform-list">
                     <li>
                         <span class="platform-home"> </span>
                         <div class="platform-home-right">
                             <p class="platform-home-right-one"><em>438,731</em> 家</p>
                             <p class="platform-home-right-two">企业</p>
                         </div>
                     </li>
                     <li>
                         <span class="platform-month"> </span>
                         <div class="platform-home-right">
                         <p class="platform-home-right-one"><em>1,738,009</em> 个</p>
                         <p class="platform-home-right-two">月次</p>
                         </div>
                     </li>
                     <li>
                         <span class="platform-money"> </span>
                         <div class="platform-home-right">
                         <p class="platform-home-right-one"><em>192,738,009 </em> 元</p>
                         <p class="platform-home-right-two">流水金额</p>
                         </div>
                     </li>
                 </ul>
            </div>
        </div>
        <div class="footer">
            <div class="center">
                <div class="footer-left">
                     <ul class="footer-left-list">
                         <li><a>首页</a></li>
                         <li><a>关于我们</a></li>
                         <li><a>新手帮助</a></li>
                         <li><a>公司资质</a></li>
                         <li><a>联系我们</a></li>
                     </ul>
                    <p class="footer-left-list-p1">Copyright 2005-2015 zhubiaoju.com 版权所有 </p>
                    <p class="footer-left-list-p2">渝ICP备10202274号-7 渝B2-20</p>
                    <div class="footer-companyimg">

                    </div>
                </div>
                <div class="footer-right">
                     <div class="footer-right-phone">
                         <span class="telephone"></span>
                         <div class="footer-right-phone-list">
                             <p class="footer-right-phone-list-one">400-188-6666</p>
                             <p class="footer-right-phone-list-two">周一至周日9:00 - 23:00</p>
                         </div>
                         <div class="qqicon">

                         </div>
                     </div>
                </div>
            </div>
        </div>
    </footer>


{%/block%}