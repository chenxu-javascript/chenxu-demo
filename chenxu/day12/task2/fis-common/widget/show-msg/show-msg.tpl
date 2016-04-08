<div class="message {%if $state eq 1%}success{%elseif $state eq 2%}error{%else%}warning{%/if%}">
    <div class="message-content">
        <div class="message-context">

            <h3 class="message-title ">
                {%if $url%}<a href="{%$url%}">{%$msg%}</a>{%else%}{%$msg%}{%/if%}
            </h3>

            <p class="message-bottom">
                {%if $url eq ''%}
                    <a class="message-bottom-link" href="javascript:history.go(-1);">返回上一层
                    </a>
                {%else%}
                    {%if $second%}
                        系统会在
                        <span class="message-second">{%$second%}</span>
                        秒内自动跳转，
                        <a class="message-bottom-link" href="{%$url%}">如果未响应请点击这里!</a>
                    {%else%}
                        <a class="message-bottom-link" href="{%$url%}">转向到目标页面!</a>
                    {%/if%}
                {%/if%}
            </p>
        </div>
    </div>
</div>