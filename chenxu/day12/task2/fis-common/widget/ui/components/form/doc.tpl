<h3>输入框</h3>

<h4>普通输入框</h4>
<div class="example">
<input type="text" class="zbj-input" placeholder="普通输入框"/>
<input type="text" disabled class="zbj-input" placeholder="不可用输入框"/>
</div>

<h4>不同尺寸输入框</h4>
<div class="example">
<input type="text" class="zbj-input zbj-input-lg" placeholder="大号输入框"/>
<input type="text" class="zbj-input" placeholder="正常输入框"/>
<input type="text" class="zbj-input zbj-input-sm" placeholder="小号输入框"/>
</div>

<h4>普通输入框组</h4>
<div class="example">
<div class="input-group">
    <span class="input-group-addon prepend">@</span>
    <input type="text" class="zbj-input" placeholder="Username">
</div>
<div class="input-group">
    <input type="text" class="zbj-input" placeholder="Username"><span class="input-group-addon append">.00</span>
</div>
</div>

<h4>不同尺寸输入框组</h4>
<div class="example">
<div class="input-group  input-group-lg">
    <span class="input-group-addon prepend">@</span>
    <input type="text" class="zbj-input" placeholder="大号输入框组">
</div>
<div class="input-group">
    <input type="text" class="zbj-input" placeholder="正常输入框组"><span class="input-group-addon append">元/件</span>
</div>
<div class="input-group   input-group-sm">
    <input type="text" class="zbj-input" placeholder="小号输入框组"><span class="input-group-addon append">.00</span>
</div>
</div>

<h3>水平表单示例</h3>
<div class="example">
    <form class="zbj-form" name="" method="post" action="#" id="">
        <fieldset>
            <legend>表单标题</legend>

            <div class="zbj-form-item zbj-form-item-error">
                <label for="" class="zbj-label">表单项文本</label>
                <p class="zbj-form-text">一个个文字文字</p>
            </div>

            <div class="zbj-form-item">
                <label for="" class="zbj-label">
                    <span class="zbj-form-required">*</span>表单项文本
                </label>
                <input class="zbj-input" type="text">
                <p class="zbj-form-explain">默认文案。</p>
            </div>

            <div class="zbj-form-item zbj-form-item-error">
                <label for="" class="zbj-label">表单项文本</label>
                <input class="zbj-input zbj-input-large" type="text"> <span class="zbj-form-other"><a href="#">表单项其他</a></span>
                <p class="zbj-form-explain zbj-tiptext zbj-tiptext-error">
                    <i class="zbj-tiptext-icon icon-font" title="出错">&#xF045;</i>
                    此在DOM上保存属性值，请使用data-xxx的形式。
                </p>
            </div>

            <div class="zbj-form-item zbj-form-item-error zbj-form-item-focus">
                <label for="" class="zbj-label">表单项文本</label>
                <input class="zbj-input" type="text"> <span class="zbj-form-other"><a href="#">表单项其他</a></span>
                <p class="zbj-form-explain zbj-tiptext zbj-tiptext-error">
                    <i class="zbj-tiptext-icon icon-font" title="出错">&#xF045;</i>
                    zbj-form-item-focus 的效果。
                </p>
            </div>

            <div class="zbj-form-item zbj-form-item-success">
                <label for="" class="zbj-label">表单项文本</label>
                <textarea class="zbj-textarea">一二三四五六七八九十</textarea>
                <p class="zbj-form-explain zbj-tiptext zbj-tiptext-success">
                    <i class="zbj-tiptext-icon icon-font" title="成功">&#xF049;</i>
                    成功文案。
                </p>
            </div>

            <div class="zbj-form-item">
                <label for="" class="zbj-label">下拉选择</label>
                <select id="province" name="province">
                    <option value="">
                        请选择
                    </option>
                    <option value="北京">
                        北京
                    </option>
                    <option value="上海">
                        上海
                    </option>
                    <option value="天津">
                        天津
                    </option>
                    <option value="浙江">
                        浙江
                    </option>
                </select>
                <p class="zbj-form-explain">更多地区即将开通，敬请期待。</p>
            </div>

            <div class="zbj-form-item">
                <label for="" class="zbj-label zbj-label-reset">不可用input</label>
                <input class="zbj-input zbj-input-disable" type="text" disabled>
                <p class="zbj-form-explain">目前不可用</p>
            </div>

            <div class="zbj-form-item">
                <label for="" class="zbj-label">验证码</label>
                <input class="zbj-input zbj-input-checkcode" type="text" data-explain="请输入右图中字符，不区分大小写。" maxlength="4" autocomplete="off" value="" name="fourcode">
                <img class="zbj-checkcode-imgcode-img" align="absMiddle" alt="请输入您看到的内容" src="https://omeo.alipay.com/service/checkcode?sessionID=82012ab6b1f4ed9e675fb9092a25cb3b&r=0.9321065918075809"  title="点击刷新图片校验码">
                <a href="#">看不清，换一张</a>
                <div class="zbj-form-explain">请输入右图中字符，不区分大小写。</div>
            </div>

            <div class="zbj-form-item">
                <label for="test">
                    <input class="zbj-checkbox" id="test" value="" type="checkbox">
                    我已阅读并接受自主缴费服务协议
                </label>
            </div>

            <div class="zbj-form-item">
                <input type="submit" class="zbj-btn zbj-btn-primary" value="确定">
                <input type="button" class="zbj-btn zbj-btn-default" value="取消">
            </div>
        </fieldset>
    </form>
</div>

<h3>垂直表单示例</h3>
<div class="example">
    <form class="zbj-form zbj-form-vertical" name="" method="post" action="#" id="">
        <fieldset>
            <legend>表单标题</legend>

            <div class="zbj-form-item zbj-form-item-error">
                <label for="" class="zbj-label">表单项文本</label>
                <p class="zbj-form-text">一个个文字文字</p>
            </div>

            <div class="zbj-form-item">
                <label for="" class="zbj-label">
                    <span class="zbj-form-required">*</span>表单项文本
                </label>
                <input class="zbj-input" type="text">
                <p class="zbj-form-explain">默认文案。</p>
            </div>

            <div class="zbj-form-item zbj-form-item-error">
                <label for="" class="zbj-label">表单项文本</label>
                <input class="zbj-input zbj-input-large" type="text"> <span class="zbj-form-other"><a href="#">表单项其他</a></span>
                <p class="zbj-form-explain zbj-tiptext zbj-tiptext-error">
                    <i class="zbj-tiptext-icon icon-font" title="出错">&#xF045;</i>
                    此在DOM上保存属性值，请使用data-xxx的形式。
                </p>
            </div>

            <div class="zbj-form-item zbj-form-item-error zbj-form-item-focus">
                <label for="" class="zbj-label">表单项文本</label>
                <input class="zbj-input" type="text"> <span class="zbj-form-other"><a href="#">表单项其他</a></span>
                <p class="zbj-form-explain zbj-tiptext zbj-tiptext-error">
                    <i class="zbj-tiptext-icon icon-font" title="出错">&#xF045;</i>
                    zbj-form-item-focus 的效果。
                </p>
            </div>

            <div class="zbj-form-item zbj-form-item-success">
                <label for="" class="zbj-label">表单项文本</label>
                <textarea class="zbj-textarea">一二三四五六七八九十</textarea>
                <p class="zbj-form-explain zbj-tiptext zbj-tiptext-success">
                    <i class="zbj-tiptext-icon icon-font" title="成功">&#xF049;</i>
                    成功文案。
                </p>
            </div>

            <div class="zbj-form-item">
                <label for="" class="zbj-label">下拉选择</label>
                <select id="province" name="province">
                    <option value="">
                        请选择
                    </option>
                    <option value="北京">
                        北京
                    </option>
                    <option value="上海">
                        上海
                    </option>
                    <option value="天津">
                        天津
                    </option>
                    <option value="浙江">
                        浙江
                    </option>
                </select>
                <p class="zbj-form-explain">更多地区即将开通，敬请期待。</p>
            </div>

            <div class="zbj-form-item">
                <label for="" class="zbj-label zbj-label-reset">不可用input</label>
                <input class="zbj-input zbj-input-disable" type="text" disabled>
                <p class="zbj-form-explain">目前不可用</p>
            </div>

            <div class="zbj-form-item">
                <label for="" class="zbj-label">验证码</label>
                <input class="zbj-input zbj-input-checkcode" type="text" data-explain="请输入右图中字符，不区分大小写。" maxlength="4" autocomplete="off" value="" name="fourcode">
                <img class="zbj-checkcode-imgcode-img" align="absMiddle" alt="请输入您看到的内容" src="https://omeo.alipay.com/service/checkcode?sessionID=82012ab6b1f4ed9e675fb9092a25cb3b&r=0.9321065918075809"  title="点击刷新图片校验码">
                <a href="#">看不清，换一张</a>
                <div class="zbj-form-explain">请输入右图中字符，不区分大小写。</div>
            </div>

            <div class="zbj-form-item">
                <label for="test">
                    <input class="zbj-checkbox" id="test" value="" type="checkbox">
                    我已阅读并接受自主缴费服务协议
                </label>
            </div>

            <div class="zbj-form-item">
                <input type="submit" class="zbj-btn zbj-btn-primary" value="确定">
                <input type="button" class="zbj-btn zbj-btn-default" value="取消">
            </div>
        </fieldset>
    </form>
</div>

<h4>两列表单</h4>
<div class="example">
    <form class="zbj-form zbj-form-vertical" name="" method="post" action="#" id="">
        <fieldset>
            <legend>表单标题</legend>
            <div class="zbj-form-fields zbj-form-fields-two">
                <div class="zbj-form-field">
                    <div class="zbj-form-item">
                        <label for="" class="zbj-label">
                            <span class="zbj-form-required">*</span>用户名
                        </label>
                        <input class="zbj-input" type="text">
                        <span class="zbj-form-other"></span>
                        <p class="zbj-form-explain">5-10个字符，英文字母开头</p>
                    </div>
                </div>
                <div class="zbj-form-field">
                    <div class="zbj-form-item">
                        <label for="" class="zbj-label">
                            <span class="zbj-form-required">*</span>密码
                        </label>
                        <input class="zbj-input" type="text">
                        <p class="zbj-form-explain">最少8位，需要包含字母和数字</p>
                    </div>
                </div>
            </div>
            <div class="zbj-form-item">
                <label for="" class="zbj-label">
                    <span class="zbj-form-required">*</span>你的个人说明
                </label>
                <input class="zbj-input" type="text">
                <span class="zbj-form-other">写下一些关于你的最好介绍，一句话就可以</span>
                <p class="zbj-form-explain">至少20个字</p>
            </div>
        </fieldset>
    </form>
</div>
<h4>三列表单</h4>
<div class="example">
    <form class="zbj-form zbj-form-vertical" name="" method="post" action="#" id="">
        <fieldset>
            <legend>表单标题</legend>
            <div class="zbj-form-fields zbj-form-fields-three">
                <div class="zbj-form-field">
                    <div class="zbj-form-item">
                        <label for="" class="zbj-label">表单项文本</label>
                        <input class="zbj-input" type="text">
                    </div>
                </div>
                <div class="zbj-form-field">
                    <div class="zbj-form-item">
                        <label for="" class="zbj-label">
                            <span class="zbj-form-required">*</span>表单项文本
                        </label>
                        <input class="zbj-input" type="text">
                        <p class="zbj-form-explain">默认文案。</p>
                    </div>
                </div>
                <div class="zbj-form-field">
                    <div class="zbj-form-item">
                        <label for="" class="zbj-label">
                            <span class="zbj-form-required">*</span>表单项文本
                        </label>
                        <input class="zbj-input" type="text">
                        <p class="zbj-form-explain">默认文案。</p>
                    </div>
                </div>
            </div>
        </fieldset>
    </form>
</div>