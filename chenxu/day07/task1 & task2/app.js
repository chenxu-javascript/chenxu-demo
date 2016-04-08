/**
 * Created by cx on 2016/3/16.
 */
(function(){
    var p = document.createElement('p');
    p.innerHTML = 'Hello,World';

    var ul = document.createElement('ul');
    ul.id = 'id';

    var li = document.createElement('li');
    li.innerHTML = 'first';

    ul.appendChild(li);
    var buttonadd = document.createElement('button');
    buttonadd.id = 'addli';
    buttonadd.innerHTML = '新增';
    var buttondelet = document.createElement('button');
    buttondelet.id = 'removeLi';
    buttondelet.innerHTML = '删除';

    document.body.appendChild(p);
    document.body.appendChild(ul);
    document.body.appendChild(buttonadd);
    document.body.appendChild(buttondelet);
})();
(function () {
    function deletLitoUl(){
        var _ulid = document.getElementById('id');
        var _lastli = _ulid.lastChild;
        _lastli.remove();
    }

    var removeLi = document.getElementById("removeLi");
    EventUtil.addEvent(removeLi,'click',deletLitoUl);

    function addLitoUl(){
        var _ulid = document.getElementById('id');
        var _li = document.createElement('li');
        _li.innerHTML = '我是li';
        _ulid.appendChild(_li);
    }

    var addli = document.getElementById("addli");
    EventUtil.addEvent(addli,'click',addLitoUl);


})();
