<!--快速实名认证弹窗-->
<div class="win-authentication">
    <div class="win-authentication-header">
        <h3>快速实名认证</h3>
        <a href="javascript:void(0)" class="win-authentication-close"></a>
    </div>
    <div class="win-authentication-body">
        <div class="win-authentication-note">
            <p><i></i>抱歉，因国家政策要求，在使用本功能之前需要先进行实名认证。</p>
            <p>（温馨提示：港澳台用户暂不支持此认证，请进行<a href="http://yan.<%=window.ZBJInfo.baseURI%>/certification/index-from-t5">增强认证</a>，审核需1~3个工作日）</p>
        </div>
        <div class="win-authentication-input">
            <h4>请务必填写本人信息：</h4>
            <div class="win-authentication-row" id="name">
            	<p>
            		<span>您的姓名：</span>
            		<input type="text" class="txt" />
            	</p>
                <p class="win-authentication-error">
                    <img src="<%=baseUri%>/output/components/authentication-check/images/ico-authentication-error.png" />
                    <em>
                        对不起，您的身份信息有误，请修改后重新认证。
                    </em>
                </p>	
            </div>
            <div class="win-authentication-row" id="card_num">
            	<p>
            		<span>您的身份证号：</span>
            		<input type="text" class="txt" />
            	</p>
            	<p class="win-authentication-error">
                    <img src="<%=baseUri%>/output/components/authentication-check/images/ico-authentication-error.png" />
                    <em>
            		   对不起，您的身份信息有误，请修改后重新认证。
                    </em>
            	</p>
            </div>
            <a href="javascript:void(0)" class="btn-authentication-validate">马上验证</a>
        </div>
    </div>
</div>
