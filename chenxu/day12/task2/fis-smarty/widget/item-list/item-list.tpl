







<ul class="moving-right-list">
{%foreach $data.posts as $post%}
        <li >
             <span class="moving-right-list-detial"><em>{%$post.name%}</em>&nbsp;&nbsp;{%$post.title%}</span>
             <span class="moving-right-minuts-right">{%$post.time%}</span>
        </li>
 {%/foreach%}
</ul>