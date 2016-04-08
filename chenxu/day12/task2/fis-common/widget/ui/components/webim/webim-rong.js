// ie9以下 用 xhr_polling 方式
var lowerIE = false;
if ($.browser.msie && parseInt($.browser.version, 10) <= 9) {
    lowerIE = true;
    window["WEB_XHR_POLLING"] = true;
}
var RongIMLib = require('./lib/RongIMLib');
// 表情解析类
var Expression = require('./lib/emoji');
var RongIMClient = RongIMLib.RongIMClient;
RongIMLib.Expression = Expression;

var Util = require('common:components/utils/utils');
var baiduTpl = require('common:components/baidutemplate/baidutemplate');
var cookie = require('arale/cookie/1.0.2/cookie');
require('./webim.less');
// 页面tab 显示隐藏 检测类
require('common:components/visibility/visibility');

//  接口
var TOKEN_URL = Util.getUrl('task', 'api/GetRongCloudToken');
var ID_URL = Util.getUrl('task', 'api/GetRongCloudId');
var NAME_URL = Util.getUrl('task', 'api/GetBrandName');

// app key 区分测试和线上
var APP_KEY = window.ZBJInfo.runtime == 'product' ? 'pgyu6atqyxixu' : 'cpj2xarljdodn';
// 私聊类型
var PRIVATE = RongIMLib.ConversationType.PRIVATE;
var pageInited = false;
var user_id = cookie.get("userid");

var proxy = $('iframe[src^="http://api"]')[0].contentWindow.store;
if (!proxy) {
    var _domain = window.ZBJInfo.pageDomain;
    var _proxyUrl = 'http://api.' + window.ZBJInfo.baseURI + '/union/index?domain=' + _domain;
    var proxyIframe = document.createElement('iframe');

    // 写 domain
    if (document.domain != _domain) {
        document.domain = _domain;
    }
    proxyIframe.onload = function () {
        proxy = proxyIframe.contentWindow.store;
    };

    proxyIframe.src = _proxyUrl;
    proxyIframe.style.display = 'none';
    document.body.appendChild(proxyIframe);
}

//// 聊天私有变量存$scope
var $scope = proxy.get("rongChat-" + user_id) || {chatHistory: {}, chatList: {}, chatSort: []};

// 登录用户信息
$scope.sourceInfo = {
    id: user_id,
    avatar: Util.getUserAvatar(user_id)
};
//var $scope = {
//    sourceInfo = {id: ,avatar: }
//    isMute:  false, // 是否禁音
//    currentChatId:  '', // 当前聊天Id
//    chatHistory:  {},//最近一次历史记录的消息时间 {"登录id-目标id":[{content:'',msgType:'',sentTime:"", sendUserId: 000000}]}
//    chatList:  {} //会话列表 {"登录id-目标id":{name:'',avatar:'',unread:""}}
//    chatSort: [目标id，目标id2]
//};

// 初始化html
var wrapTpl = require('./wrap.tmpl')({isMute: $scope.isMute});
$(document.body).append(wrapTpl);

// 会话列表tpl
var user_item = ['<li title="<%=name%>" data-id="<%=id%>">',
    '<span class="item-close fr">&times;</span>',
    '<img src="<%=avatar%>" class="item-avatar"/>',
    '<span class="item-name"><%=name%></span>',
    '<i class="item-count<%if(unread < 1){%> hide<%}%>"><%=unread%></i>',
    '</li>'].join("");

// 消息内容tpl,2图片，3语音，1本文
var msg_item = ['<div class="webim-chat-msg clearfix webim-chat-<%=direction%>msg">',
    '<span class="webim-chat-msg-avatar"><img src="<%=avatar%>"/></span>',
    '<div class="webim-chat-msg-dialog"><p class="webim-msg-dialog-txt">',
    '<%if(type === "ImageMessage"){%>',
    '<a href="<%=detail.imageUri%>" target="_blank"><img src="data:image/jpeg;base64,<%=detail.content%>"/></a>',
    '<%}else if(type === "VoiceMessage"){%>',
    '【语音消息】：<a href="http://app.<%=window.ZBJInfo.baseURI%>/" target="_blank">下载APP收听</a>',
    '<%}else{%>',
    '<%=detail.content%>',
    '<%}%>',
    '</p></div>',
    '</div>'].join("");

var im = $("#webim");
var user_list = $("#webim-people-list");
var chat_input = $("#webim-chat-input");
var chat_body = $("#webim-chat-body");
var chatLast = {};

function getTargetUser(target) {
    return user_list.find("li[data-id=" + target + "]");
}
var IM = {
    rongInit: function () {
        var self = this;
        //初始化SDK
        RongIMClient.init(APP_KEY);

        //获取token
        $.ajax({
            url: TOKEN_URL,
            dataType: 'jsonp',
            jsonp: 'jsonpcallback',
            success: function (data) {
                if (data.state == 1) {
                    // 连接融云服务器。
                    RongIMClient.connect(data.msg, {
                        onSuccess: function () {
                            // 链接成功之后同步会话列表
                            self.initUserList();
                            pageInited = true;
                        },
                        onTokenIncorrect: function () {
                            self.viewCtrl("mini", "token无效");
                        },
                        onError: function (errorCode) {
                            // 此处处理连接错误。
                            var info = '';
                            switch (errorCode) {
                                case RongIMLib.ErrorCode.TIMEOUT:
                                    info = '超时';
                                    break;
                                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                                    info = '未知错误';
                                    break;
                                case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                                    info = '不可接受的协议版本';
                                    break;
                                case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                                    info = 'appkey不正确';
                                    break;
                                case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                                    info = '服务器不可用';
                                    break;
                            }
                            self.viewCtrl("mini", "IM" + info);
                        }
                    });
                } else {
                    self.viewCtrl("mini", "网络错误");
                }
            },
            error: function () {
                self.viewCtrl("mini", "网络错误");
            }
        });

        //链接状态监听器
        RongIMClient.setConnectionStatusListener({
            onChanged: function (status) {
                var info = '';
                switch (status) {
                    //链接成功
                    case RongIMLib.ConnectionStatus.CONNECTED:
                        info = "最近联系人";
                        break;
                    //正在链接
                    case RongIMLib.ConnectionStatus.CONNECTING:
                        info = "正在链接";
                        break;
                    //重新链接
                    case RongIMLib.ConnectionStatus.DISCONNECTED:
                        info = "断开链接";
                        break;
                    //其他设备登陆
                    case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                        info = "其他设备登陆";
                        break;
                    //网络不可用
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                        info = "网络不可用";
                }
                self.viewCtrl("mini", info);
            }
        });
        // 消息监听器
        RongIMClient.setOnReceiveMessageListener({
            // 接收到的消息
            onReceived: function (message) {
                //接收到消息播放声音
                if (!$scope.isMute && !lowerIE && !visibly.hidden()) {
                    $("#webim-sound")[0].play();
                }

                //接收到消息的时候，如果box是隐藏状态则闪动
                if (im.hasClass("webim-normal") == false) {
                    // 闪动消息 css class
                    im.addClass("webim-unread-animation");
                }

                // 判断消息类型
                switch (message.messageType) {
                    case RongIMClient.MessageType.TextMessage:
                    case RongIMClient.MessageType.ImageMessage:
                    case RongIMClient.MessageType.VoiceMessage:
                        var _target = message.targetId;

                        //添加到历史聊天记录
                        self.putLocalStorage(message);

                        // 是否当前聊天会话
                        if (_target == $scope.currentChatId) {
                            if ($scope.chatList[_target]) {
                                RongIMClient.getInstance().clearUnreadCount(PRIVATE, _target, {
                                    onSuccess: function () {
                                        $scope.chatList[_target].unread = 0;
                                    },
                                    onError: function () {
                                    }
                                });
                            }
                            self.msgRender([{
                                detail: message.content,
                                sendUserId: message.senderUserId,
                                sentTime: message.sentTime,
                                msgType: message.messageType
                            }]);
                        } else {
                            // 如果存在会话列表则跳出
                            if ($.inArray(_target, $scope.chatSort) > -1) {
                                self.showUnread(_target, message);
                            } else {
                                $scope.chatSort.unshift(_target);
                                self.viewCtrl("", "最近联系人");

                                self.tplUserItem(_target, null, null, 0, function () {
                                    self.showUnread(_target, message);
                                }, "prepend");
                            }
                        }

                        break;
                    case RongIMClient.MessageType.RichContentMessage:
                    case RongIMClient.MessageType.LocationMessage:
                    case RongIMClient.MessageType.DiscussionNotificationMessage:
                    case RongIMClient.MessageType.InformationNotificationMessage:
                    case RongIMClient.MessageType.ContactNotificationMessage:
                    case RongIMClient.MessageType.ProfileNotificationMessage:
                    case RongIMClient.MessageType.CommandNotificationMessage:
                    case RongIMClient.MessageType.UnknownMessage:
                        // do something...
                        break;
                    default:
                    // 自定义消息
                    // do something...
                }
            }
        });
    },
    initUserList: function () {
        var self = this;
        var chat_sort = $scope.chatSort;

        if (chat_sort.length == 0 || $.isEmptyObject($scope.chatList)) {
            RongIMClient.getInstance().getConversationList({
                onSuccess: function (list) {
                    if (list.length > 0) {
                        $.each(list, function (idx, obj) {
                            if (obj.conversationType == PRIVATE && $.inArray(obj.targetId, $scope.chatSort) == -1) {
                                //同步会话列表
                                chat_sort.push(obj.targetId);
                                $scope.chatList[obj.targetId] = {
                                    id: obj.targetId,
                                    name: obj.senderUserName,
                                    avatar: obj.senderPortraitUri,
                                    unread: obj.unreadMessageCount
                                };
                            }
                        });

                        initUserListHtml();
                    } else {
                        self.viewCtrl("mini", "无最近联系人")
                    }
                },
                onError: function (error) {
                    // do something...
                }
            }, null);
        } else {
            initUserListHtml();
        }

        function initUserListHtml() {
            $.each(chat_sort, function (key, val) {
                var obj = $scope.chatList[val];
                self.tplUserItem(obj.id, obj.name, obj.avatar, obj.unread)
            });
            $scope.currentChatId = $scope.currentChatId || $scope.chatSort[0];

            self.createConversation($scope.currentChatId);
        }

    },
    tplUserItem: function (target, name, avatar, unread, callback, appendto) {

        if (getTargetUser(target).length > 0) {
            return false;
        }

        if (!name || !avatar) {
            var userId = target.substr(16);
            avatar = Util.getUserAvatar(userId);

            //获取聊天ID
            $.ajax({
                url: NAME_URL,
                data: {"user_id": userId},
                dataType: 'jsonp',
                jsonp: 'jsonpcallback',
                success: function (data) {

                    if (data.state == 1) {
                        name = data.msg;
                    } else {
                        name = "用户" + userId;
                    }

                    $scope.chatList[target] = {
                        id: target,
                        name: name,
                        avatar: avatar,
                        unread: unread
                    };

                    var user_item_tpl = baiduTpl.template(user_item, {
                        name: name,
                        id: target,
                        avatar: avatar,
                        unread: unread
                    });

                    if (appendto == "prepend") {
                        user_list.prepend(user_item_tpl);
                    } else {
                        user_list.append(user_item_tpl);
                    }
                    typeof callback === 'function' && callback();
                }
            });

        } else {

            var user_item_tpl = baiduTpl.template(user_item, {
                name: name,
                id: target,
                avatar: avatar,
                unread: unread
            });

            if (appendto == "prepend") {
                user_list.prepend(user_item_tpl);
            } else {
                user_list.append(user_item_tpl);
            }

            typeof callback === 'function' && callback();
        }
    },
    reconnect: function () {
        var self = this;
        RongIMClient.reconnect({
            onSuccess: function () {
                self.initUserList();
            }, onError: function () {
                //重连失败
                self.viewCtrl("mini", "重连失败")
            }
        });
    },
    createConversation: function (target) {
        var self = this;

        // 保存前一个会话的草稿
        if ($scope.currentChatId) {
            RongIMClient.getInstance().saveTextMessageDraft(PRIVATE, $scope.currentChatId, chat_input.val());
        }


        // 不能和自己聊天
        var userId = target.substr(16);
        if (userId == $scope.sourceInfo.id) {
            return false;
        }

        $scope.currentChatId = target;

        // 切换当前状态
        user_list.find('li.active').removeClass('active');
        getTargetUser(target).addClass("active").find('.item-count').addClass("hide");//隐藏消息数目

        RongIMClient.getInstance().clearUnreadCount(PRIVATE, target, {
            onSuccess: function () {
                $scope.chatList[target].unread = 0;
            },
            onError: function () {
            }
        });

        var _name = $scope.chatList[target].name || "用户" + userId;
        var _url = Util.getUrl("shop", userId + "/");

        // 渲染会话标题
        $("#webim-chat-title").html('<a href="' + _url + '" target="_blank" title="' + _name + '">' + _name + '</a>');
        chat_body.html('<div class="webim-chat-tips webim-load-history"><span id="webim-load-history">点击加载历史消息<span></div>');
        chat_input.focus();

        var _chatHis = $scope.chatHistory[target];
        if (_chatHis) {
            self.msgRender(_chatHis);
        }

        // 渲染当前会话草稿
        chat_input.val(RongIMClient.getInstance().getTextMessageDraft(PRIVATE, $scope.currentChatId) || "");
    },
    putLocalStorage: function (msg) {//将消息放进localStorage
        var self = this;
        var msgObj = {
            detail: msg.content,
            sentTime: msg.sentTime,
            sendUserId: msg.senderUserId,
            msgID: msg.messageId,
            msgType: msg.content.messageName
        };

        // targetStr:localStoarge key值，登录ID+会话对方ID
        var targetStr;
        if (msg.targetId.substr(16) == user_id) {
            targetStr = msg.senderUserId;
        } else {
            targetStr = msg.targetId
        }

        var proxyHistory = $scope.chatHistory[targetStr] || [];
        if (proxyHistory.length > 0) {
            var repeatArr = $.grep(proxyHistory, function (val) {
                return val.sentTime == msg.sentTime
            });
            if (repeatArr.length == 0) {
                proxyHistory.push(msgObj);

                proxyHistory.sort(function (a, b) {
                    return a.sentTime - b.sentTime;
                });
            }
        } else {
            proxyHistory = [msgObj];
        }

        $scope.chatHistory[targetStr] = proxyHistory;
        self.setProxy();
    },
    sendMsg: function (msg) {
        var self = this;

        var target = $scope.currentChatId;

        RongIMClient.getInstance().sendMessage(PRIVATE, target, msg, {
            // 发送消息成功
            onSuccess: function (message) {
                self.putLocalStorage(message);
                self.msgRender([{
                    detail: message.content,
                    sendUserId: message.senderUserId,
                    sentTime: message.sentTime,
                    msgType: message.content.messageName
                }]);

                //// 置顶聊天对象
                user_list.prepend(getTargetUser(target).remove());
                var chatSort = $scope.chatSort;
                chatSort.splice($.inArray(target, chatSort), 1);
                chatSort.unshift(target);
                $scope.chatSort = chatSort;

            },
            onError: function (errorCode) {
                var info = '';
                switch (errorCode) {
                    case RongIMLib.ErrorCode.TIMEOUT:
                        info = '超时';
                        break;
                    case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                        info = '未知错误';
                        break;
                    case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                        info = '在黑名单中，无法向对方发送消息';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                        info = '不在讨论组中';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_GROUP:
                        info = '不在群组中';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                        info = '不在聊天室中';
                        break;
                    default :
                        info = x;
                        break;
                }
                self.chatTip(info, 'warn');
            }
        });
    },
    getHistoryMsg: function (targetId) {
        var self = this;
        // 计算本地缓存消息数
        var startLen = $scope.chatHistory[targetId] ? $scope.chatHistory[targetId].length : 0;
        var startTop = startLen > 0 && chat_body.find(".webim-chat-msg").eq(0).position().top;

        _getHistory();

        //获取历史消息 一次性拉取完，避免和本地重复，空点击
        function _getHistory() {
            RongIMClient.getInstance().getHistoryMessages(PRIVATE, targetId, null, 20, {
                onSuccess: function (HistoryMessages, symbol) {
                    // symbol为boolean值，如果为true则表示还有剩余历史消息可拉取，为false的话表示没有剩余历史消息可供拉取。
                    // HistoryMessages 为拉取到的历史消息列表
                    var _len = HistoryMessages.length;
                    if (_len > 0) {
                        for (var i = 0; i < _len; i++) {
                            self.putLocalStorage(HistoryMessages[i]);
                        }
                    }
                    if (!symbol) {
                        var _historyHtml = $scope.chatHistory[targetId] ? self.msgHtml($scope.chatHistory[targetId]) : "";
                        chat_body.html('<div class="webim-chat-tips webim-load-history">没有历史消息了</div>' + _historyHtml);
                        // 反向查询位置，获取顶边距， 36为第一个dom的高度
                        var dis = startLen > 0 ? chat_body.find(".webim-chat-msg").eq(-startLen).position().top - startTop : 0;
                        chat_body.scrollTop(dis);
                    } else {
                        _getHistory();
                    }
                },
                onError: function () {
                    self.chatTip("获取失败");
                }
            });
        }
    },

    msgHtml: function (msgList) {//用来渲染消息，只返回html字符串
        var self = this;
        var showTimeInterval = 60 * 1000;

        var html = $.map(msgList, function (val) {
            var _type = val.msgType;
            var _detail = val.detail;
            var _time = val.sentTime;
            var target = val.sendUserId;
            var _direction = "",
                _avatar,
                _html = "";

            if (target.substr(16) == user_id) {
                _direction = "my-";
                _avatar = $scope.sourceInfo.avatar;
            } else {
                _avatar = $scope.chatList[target].avatar || Util.getUserAvatar(target);
            }

            // 根据最后消息时间，是否需要添加聊天时间
            var _lastTime = chatLast[$scope.currentChatId];
            if (!_lastTime || Math.abs(_time - _lastTime) > showTimeInterval) {
                _html += '<div class="webim-chat-tips"><span>' + self.formatDate(_time) + '</span></div>';
            }
            chatLast[$scope.currentChatId] = _time;

            _html += baiduTpl.template(msg_item, {
                direction: _direction,
                avatar: _avatar,
                detail: _detail,
                type: _type
            });
            return _html;
        });

        return self.decodeMsg(html.join(""));
    },
    msgRender: function (msg) {
        var self = this;
        chat_body.append(self.msgHtml(msg));
        self.scrollToBottom();
    },
    viewCtrl: function (ctrl, msg) {
        var self = this;
        msg = msg || "最近联系人";
        var im_tips = im.find(".webim-switch-txt");
        im_tips.text(msg);

        switch (ctrl) {
            // 收缩成提示条
            case "mini":
                im.removeClass("webim-normal webim-fullpage");
                break;
            case "normal":
                var user_item = user_list.find("li");

                // 链接异常
                if (RongIMClient.getInstance().getCurrentConnectionStatus() !== RongIMLib.ConnectionStatus.CONNECTED) {
                    im_tips.text("重新连接中…");
                    self.reconnect();
                } else if (user_item.length > 0) {

                    im.addClass("webim-normal").removeClass("webim-unread-animation");

                    if ($scope.fullpage) {
                        im.addClass("webim-fullpage");
                    }

                    if (user_list.find(".active").length == 0) {
                        user_item.eq(0).addClass("active");
                        self.createConversation($scope.chatSort[0]);
                    }

                } else {
                    im_tips.text("无最近联系人")
                }
                break;
        }
    },
    showUnread: function (target, message) {
        var self = this;

        // 更新未读数
        var unreadCount;
        if (typeof $scope.chatList[target] == "undefined" || typeof $scope.chatList[target].unread == "undefined") {
            unreadCount = 1;
            setTimeout(updateCount(unreadCount), 1000);
        } else {
            unreadCount = $scope.chatList[target].unread + 1;
            updateCount(unreadCount);
        }

        function updateCount(count) {
            $scope.chatList[target].unread = count;
            getTargetUser(target).find(".item-count").text(count).removeClass("hide");
        }

        // 只有没有静音才桌面通知
        if (!$scope.isMute && !visibly.hidden()) {
            self.deskNotice(message.content, message.receivedTime, message.messageType, target);
        }
    },
    eventHandle: function () {
        var self = this;
        var webim_chat_scale = $('#webim-fullpage-set');
        var face_content = $('.webim-emoji');//表情框

        // 切换聊天对象
        user_list.on("click", "li", function () {
            self.createConversation($(this).data("id"));
        });

        // 发送消息
        $("#chat_input_btn").click(function (e) {
            e.preventDefault();
            textMsg();
        });
        //按ctrl+enter 换行,enter 提交
        $(chat_input).keydown(function (el) {
            if (el.which == 13 && el.ctrlKey) {
                var _this = this;
                if (typeof _this.selectionStart == "number" && typeof _this.selectionEnd == "number") {
                    var val = _this.value;
                    var selStart = _this.selectionStart;
                    _this.value = val.slice(0, selStart) + "\n" + val.slice(_this.selectionEnd);
                    _this.selectionEnd = _this.selectionStart = selStart + 1;
                } else if (typeof document.selection != "undefined") {
                    var textRange = document.selection.createRange();
                    textRange.text = "\n";
                    textRange.collapse(false);
                    textRange.select();
                }
            } else if (el.which == 13) {
                el.preventDefault();
                textMsg();
            }
        });

        function textMsg() {
            var msgText = chat_input.val();

            //// 消息检查
            if (!self.checkMsg(msgText)) {
                return false;
            }
            msgText = self.encodeMsg(msgText);
            // 定义消息类型,文字消息使用 RongIMClient.TextMessage
            var msg = RongIMLib.TextMessage.obtain(msgText);
            self.sendMsg(msg);

            chat_input.val("").focus();
            // 删除当前会话草稿
            RongIMClient.getInstance().clearTextMessageDraft(PRIVATE, $scope.currentChatId);
        }

        //获取历史消息
        chat_body.on('click', '#webim-load-history', function () {//点击获取历史消息
            self.getHistoryMsg($scope.currentChatId);
        });

        // 删除会话
        user_list.on("click", ".item-close", function (e) {
            e.stopPropagation();

            var user = $(this).parent("li");
            var target = user.data("id");

            // 删除融云会话
            RongIMClient.getInstance().removeConversation(PRIVATE, target, {
                onSuccess: function (list) {
                    // 删除本地记录
                    var backUP = user.prev().length > 0 ? user.prev() : user.next();
                    user.remove();

                    if (backUP.length > 0) {
                        self.createConversation(backUP.data("id"));
                    } else {
                        $scope.currentChatId = undefined;
                        self.viewCtrl("mini", "无最近联系人")
                    }

                    $scope.chatList[target] = undefined;
                    $scope.chatHistory[target] = undefined;
                    var chatSort = $scope.chatSort;
                    chatSort.splice($.inArray(target, chatSort), 1);
                    $scope.chatSort = chatSort;

                    self.setProxy();
                }
            });


        });

        // 最小化聊天
        $("#webim-chat-close").click(function () {
            self.viewCtrl("mini");
        });

        // 还原聊天窗口
        $(".webim-switch").click(function () {
            self.viewCtrl("normal");
            self.scrollToBottom();
        });

        // 显示关闭表情
        $('#webim-chat-foot').on('click', ".item-face", function (e) {
            e.stopPropagation();

            // 初始化表情
            if (face_content.html() == "") {
                var len = 64; //表情个数
                var _html = "";
                var emojiObjectList = RongIMLib.Expression.getAllExpression(len, 0);
                for (var i = 0; i < len; i++) {
                    var _item = emojiObjectList[i];
                    _html += '<span title="' + _item.chineseName + '">' + _item.img.outerHTML + '</span>'
                }
                face_content.html(_html);
            }
            face_content.toggle();
        });
        im.click(function () {
            if (face_content.is(':visible')) {
                face_content.hide();
            }
        });

        face_content.on('click', "span", function (e) {//表情选择
            e.stopPropagation();
            var _origin = chat_input.val();
            chat_input.val(_origin + '[' + $(this).attr("title") + ']');

            face_content.hide();
            chat_input.focus();
        });


        // 关闭悬浮提示
        $('#webim-warn-close').on('click', function () {
            $(this).parent().remove();
            chat_body.addClass('hide-warn');
        });

        // 禁音
        $('#webim-sound-set').click(function () {
            var _this = $(this);
            if ($scope.isMute) {
                _this.addClass('webim-chat-sound-mute').attr('title', '关闭提示音');
                $scope.isMute = false;
            } else {
                _this.removeClass('webim-chat-sound-mute').attr('title', '打开提示音');
                $scope.isMute = true;
            }
        });
        webim_chat_scale.on('click', function () {//全屏和缩小
            if (!$scope.fullpage) {
                im.addClass('webim-fullpage');
                webim_chat_scale.attr('title', '最小化');
                $scope.fullpage = true;
            } else {
                im.removeClass('webim-fullpage');
                webim_chat_scale.attr('title', '全屏');
                $scope.fullpage = false;
            }
        });

        // 页面绑定聊天事件
        $(document).on("click", "[webim]", function (e) {
            e.preventDefault();

            var userInfo = $(this).attr("webim");
            var userId = /uid:\s*(\d+)/g.exec(userInfo)[1];


            var taskId = $("#task_id");
            var task_id = (taskId.length > 0 ? taskId.val() : window.gtid) || 0;

            //获取聊天ID
            $.ajax({
                url: ID_URL,
                data: {
                    "to_id": userId,
                    "task_id": task_id,
                    "zbj_csrf_token": window.ZBJInfo.webIMToken || 0
                },
                dataType: 'jsonp',
                jsonp: 'jsonpcallback',
                success: function (data) {
                    if (data.state == 1) {
                        var target = data.msg;
                        var _callback = function () {
                            self.viewCtrl("normal");
                            self.createConversation(target);
                        };
                        // 如果存在则直接会话
                        if ($.inArray(target, $scope.chatSort) > -1) {
                            _callback();
                        } else {
                            $scope.chatSort.unshift(target);
                            self.tplUserItem(target, null, null, 0, _callback, "prepend");
                            self.setProxy();
                        }
                    } else {
                        alert(data.msg);
                    }
                }
            });

        });

        visibly.onHidden(function () {
            self.setProxy();
        });

        visibly.onVisible(function () {
            if (!pageInited || lowerIE) {
                return false;
            }
            // 重新拉取会话列表
            self.getProxy();
            user_list.empty();
            // 如果链接关闭，重连
            if (RongIMClient.getInstance().getCurrentConnectionStatus() == RongIMLib.ConnectionStatus.CONNECTED) {
                self.initUserList();
            } else {
                self.reconnect();
            }
        });
    },
    encodeMsg: function (txt) {
        return txt.replace(/\[(.+?)\]/g, function (match, $1) {
            // 目前只有一组表情，直接取值，后续考虑循环
            return RongIMLib.Expression.getEmojiObjByEnglishNameOrChineseName($1).tag || match;
        });
    },
    decodeMsg: function (txt) {
        var preRegx = /(\n)|(http:\/\/[\w]+\.zbj\.com[-\/\w?@%&+~#=]*)/g;
        var preStr = txt.replace(preRegx, function (macth, p1, p2) {
            // 处理换行
            if (p1) {
                return "<br>";
            }
            // 处理http信任链接
            if (p2) {
                return '<a href=' + p2 + ' target="_blank">' + p2 + '</a>';
            }
        });

        // 处理emoji
        return RongIMLib.Expression.retrievalEmoji(preStr, function (_item) {
            return '<span title="' + _item.chineseName + '">' + _item.img.outerHTML + '</span>';
        });

    },
    formatDate: function (time) {
        time = new Date(time);
        if (time) {
            var year = time.getFullYear();
            var month = time.getMonth() + 1;
            var date = time.getDate();
            var hour = time.getHours();
            var minute = time.getMinutes() > 9 ? time.getMinutes() : "0" + time.getMinutes();
            var second = time.getSeconds() > 9 ? time.getSeconds() : "0" + time.getSeconds();
            return year + "/" + month + "/" + date + " " + hour + ":" + minute + ":" + second;
        } else {
            return false;
        }
    },
    chatTip: function (msg, type) {//type: warn 或不填，不填是灰色字体
        var self = this;
        var _type = type || '';
        var str = '<div class="webim-chat-tips ' + _type + '"><span>' + msg + '</span></div>';
        chat_body.append(str);
        self.scrollToBottom();
    },
    checkMsg: function (msgText) {//内容发送前的动作
        var self = this;
        var contentLength = msgText.replace(/\s/g, "").length;

        if (contentLength > 1000) {
            self.chatTip('您输入的内容过长，请分条发送', 'warn');
            return false;
        } else if (contentLength === 0) {
            self.chatTip('内容不能为空', 'warn');
            return false;
        } else {
            return true;
        }
    },
    deskNotice: function (content, sentTime, type, target) {
        var self = this;
        var _time = self.formatDate(sentTime);
        var _content = (type !== RongIMClient.MessageType.TextMessage) ? "新的消息" : content.content;

        function notice() {
            var _targetInfo = $scope.chatList[target];
            var _title = "消息：" + _targetInfo.name + "," + _time;
            var options = {
                dir: "ltr",
                lang: "utf-8",
                icon: _targetInfo.avatar,
                body: _content
            };
            var notice = new Notification(_title, options);
            notice.onclick = function () {
                self.createConversation(target);
            };
        }

        if (Notification && Notification.permission === "granted") {
            notice();
        } else if (Notification && Notification.permission !== 'denied') {
            Notification.requestPermission(function (status) {
                if (status === 'granted') {
                    notice()
                }
            });
        }
    },
    uploadImg: function () {
        var self = this;
        var Uploader = require('components/uploader-qiniu/uploader-qiniu');
        var QINIU_UPLOAD_TOKEN_URL = window.ZBJInfo.qiniuUploadTokenUrl;

        var imgUploader = new Uploader.baseUploader({
            browse_button: "webim-upload-img",
            acceptExt: [
                {title: "Image files", extensions: "jpg,gif,png,jpeg"}
            ],
            prevent_duplicates: false,
            max_file_size: "2048kb",
            resize: {width: 960, height: 960, quality: 90},
            count_limit: 100,
            multi_selection: false,
            belongToDomain: 'homesite',
            belongToSystem: 'res',
            tokenUrl: QINIU_UPLOAD_TOKEN_URL + '/resource/'
        });


        imgUploader.on('uploaded', function (up, file) {

            var fileReader = new mOxie.Image();
            fileReader.onload = function () {
                fileReader.downsize(240, 240);

                var key = imgUploader.tokenObj[file.name][1];
                var thumbBase64 = fileReader.getAsDataURL().replace("data:image/jpeg;base64,", "");
                //获取真实地址
                $.ajax({
                    url: imgUploader.get("tokenUrl") + 'getDownloadParamJsonp?key=' + key,
                    dataType: 'jsonp',
                    jsonp: 'jsonpCallback',
                    success: function (result) {
                        if (result.code == "success") {
                            var url = result.data.downloadUrl;
                            var msg = RongIMLib.ImageMessage.obtain(thumbBase64, url);
                            self.sendMsg(msg);
                        }
                    },
                    error: function () {
                        self.chatTip("上传失败", "warn")
                    }
                });

            };
            fileReader.load(file.getSource());
        });

        imgUploader.on('error', function (up, error) {
            self.chatTip(error.message, "warn");
        })
    },
    setProxy: function () {
        try {
            proxy.set("rongChat-" + user_id, $scope);
        }
        catch (error) {
            // *4680000 为localstorage最小容量5200000字节的90%，超过90%将删除旧的记录，保留10个
            if (JSON.stringify($scope).length > 4680000) {
                var len = $scope.chatSort.length;
                for (var i = 10; i < len; i++) {
                    $scope.chatHistory[$scope.chatSort[i]] = {};
                }
            }
        }
    },
    getProxy: function () {
        $scope = proxy.get("rongChat-" + user_id);
    },
    scrollToBottom: function () {//滚动条滚动到最底部
        chat_body.scrollTop(chat_body[0].scrollHeight);
    },

    init: function () {
        this.rongInit();
        this.eventHandle();
        this.uploadImg();
    }
};

module.exports = IM;