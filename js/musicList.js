/**************************************************
 * MKOnlinePlayer v2.0
 * 播放列表配置模块
 * 编写：mengkun(http://mkblog.cn)
 * 时间：2017-3-16
 *************************************************/
// 建议修改前先备份一下
// 获取 歌曲的网易云音乐ID 或 网易云歌单ID 的方法：
// 先在 js/player.js 中开启调试模式，然后按 F12 打开浏览器的控制台。播放歌曲或点开歌单即可看到相应信息

var musicList = [
    // 以下三个系统预留列表请勿更改，否则可能导致程序无法正常运行！
    // 预留列表：搜索结果
    {
        name: "搜索结果",   // 播放列表名字
        cover: "",          // 播放列表封面
        creatorName: "",        // 列表创建者名字
        creatorAvatar: "",      // 列表创建者头像
        item: []
    },
    // 预留列表：正在播放
    {
        name: "正在播放",   // 播放列表名字
        cover: "",          // 播放列表封面
        creatorName: "",        // 列表创建者名字
        creatorAvatar: "",      // 列表创建者头像
        item: []
    },
    // 预留列表：播放历史
    {
        name: "播放历史",   // 播放列表名字
        cover: "",          // 播放列表封面
        creatorName: "",        // 列表创建者名字
        creatorAvatar: "",      // 列表创建者头像
        item: []
    },
    // 以上三个系统预留列表请勿更改，否则可能导致程序无法正常运行！
    //*********************************************
    // 自定义列表开始，您可以自由添加您的自定义列表
    {
        id: 3778678     // 云音乐热歌榜
    },
    {
        id: 3779629     // 云音乐新歌榜
    },
    {
        id: 4395559     // 华语金曲榜
    },
    {
        id: 64016     // 中国TOP排行榜（内地榜）
    },
    {
        id: 112504     // 中国TOP排行榜（港台榜）
    },
    {
        id: 19723756     // 云音乐飙升榜
    },
    {
        id: 2884035     // "网易原创歌曲榜"
    },
    // 自定义列表教程开始！
    // 方式一：手动创建列表并添加歌曲信息
    {
        name: "自定义列表",   // 播放列表名字
        cover: "http://p3.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg", // 播放列表封面图像
        creatorName: "",        // 列表创建者名字(暂时没用到，可空)
        creatorAvatar: "",      // 列表创建者头像(暂时没用到，可空)
        item: [                 // 这里面放歌曲
            {
                musicName: "成都",      // 音乐名字
                artistsName: "赵雷",    // 歌手名字
                albumName: "成都",      // 歌曲专辑
                albumPic: "http://p3.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg",  // 歌曲封面
                musicId: 436514312,     // 歌曲的网易云音乐ID(歌曲的歌词会根据这个 ID 来获取，请务必填写正确。id值不需要加引号)
                mp3Url: "http://p2.music.126.net/7o5D4dA6271VktgawcbZFA==/18665309393829604.mp3"    // 歌曲链接(这里不加逗号)
            },
            {
                musicName: "淘汰",      // 音乐名字
                artistsName: "陈奕迅",  // 歌手名字
                albumName: "认了吧",    // 歌曲专辑
                albumPic: "http://p3.music.126.net/BFuOepLmD63tY75UJs1c0Q==/18872017579169120.jpg", // 歌曲封面
                musicId: 65528,         // 歌曲网易云ID
                mp3Url: "http://p2.music.126.net/cMlOV_XZceHNLA1GpvkyLQ==/7990151000576820.mp3" // 歌曲链接(这里不加逗号)
            }   // 列表中最后一首歌大括号后面不要加逗号
        ]
    },
    // 方式二：直接提供网易云歌单ID
    {
        id: 440103454   // 网易云歌单ID
    }   // 播放列表的最后一项大括号后面不要加逗号
];



































//var GUserAcc={topic:1, reward:false};
//(function(){
//    var topbar = document.getElementById('g-topbar'),
//        scrollBarWidth = document.body.clientWidth - topbar.clientWidth;
//    topbar.style.width = topbar.clientWidth+'px';
//    topbar.className = 'g-topbar';
//    if(window.addEventListener){
//        window.addEventListener('resize', onResize)
//    }else{
//        window.attachEvent('onresize', onResize)
//    }
//    function onResize(){
//        topbar.style.width = (document.body.clientWidth-scrollBarWidth)+'px';
//    };
//})();
/*!
 * Copyright (c) 2009-2011 Andreas Blixt <andreas@blixt.org>
 * Contributors: Aaron Ogle <aogle@avencia.com>,
 * Matti Virkkunen <mvirkkunen@gmail.com>,
 * Simon Chester <simonches@gmail.com>
 * http://github.com/blixt/js-hash
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Hash handler
 * Keeps track of the history of changes to the hash part in the address bar.
 */
/* WARNING for Internet Explorer 7 and below:
 * If an element on the page has the same ID as the hash used, the history will
 * get messed up.
 *
 * Does not support history in Safari 2 and below.
 *
 * Example:
 * function handler(newHash, initial) {
 * if (initial)
 * alert('Hash is "' + newHash + '"');
 * else
 * alert('Hash changed to "' + newHash + '"');
 * }
 * Hash.init(handler);
 * Hash.go('abc123');
 *
 *
 * Updated by Simon Chester (simonches@gmail.com) on 2011-05-16:
 * - Removed the need for blank.html and the iframe argument by creating the
 * iframe on initialization.
 *
 * Updated by Matti Virkkunen (mvirkkunen@gmail.com) on 2009-11-16:
 * - Added second argument to callback that indicates whether the callback is
 * due to initial state (true) or due to an actual change to the hash
 * (false).
 *
 * Updated by Aaron Ogle (aogle@avencia.com) on 2009-08-11:
 * - Fixed bug where Firefox automatically unescapes location.hash but no
 * other browsers do. Always get the hash by parsing location.href and
 * never use location.hash.
 */
//var Hash = (function () {
//    var
//// Import globals
//        window = this,
//        documentMode = document.documentMode,
//        history = window.history,
//// Plugin variables
//        callback, hash,
//// IE-specific
//        iframe,
//        getHash = function () {
//// Internet Explorer 6 (and possibly other browsers) extracts the query
//// string out of the location.hash property into the location.search
//// property, so we can't rely on it. The location.search property can't be
//// relied on either, since if the URL contains a real query string, that's
//// what it will be set to. The only way to get the whole hash is to parse
//// it from the location.href property.
////
//// Another thing to note is that in Internet Explorer 6 and 7 (and possibly
//// other browsers), subsequent hashes are removed from the location.href
//// (and location.hash) property if the location.search property is set.
////
//// Via Aaron: Firefox 3.5 (and below?) always unescape location.hash which
//// causes poll to fire the hashchange event twice on escaped hashes. This
//// is because the hash variable (escaped) will not match location.hash
//// (unescaped.) The only consistent option is to rely completely on
//// location.href.
//            var index = window.location.href.indexOf('#');
//            return (index == -1 ? '' : window.location.href.substr(index + 1));
//        },
//// Used by all browsers except Internet Explorer 7 and below.
//        poll = function () {
//            var curHash = getHash();
//            if (curHash != hash) {
//                hash = curHash;
//                callback(curHash, false);
//            }
//        },
//// From:
//// http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
//        isHashChangeSupported = function() {
//            var eventName = 'onhashchange';
//            var isSupported = (eventName in document.body);
//            if (!isSupported) {
//                document.body.setAttribute(eventName, 'return;');
//                isSupported = typeof document.body[eventName] == 'function';
//            }
//// documentMode logic from YUI to filter out IE8 Compat Mode (which
//// generates false positives).
//            return isSupported && (document.documentMode === undefined ||
//                document.documentMode > 7);
//        },
//        createIframe = function () {
//            var tempEl = document.createElement();
//            tempEl.innerHTML = '<iframe src="javascript:void(0)" tabindex="-1" ' +
//                'style="display: none;"></iframe>';
//            var frame = tempEl.childNodes[0];
//            document.body.appendChild(frame);
//            return frame;
//        },
//// Used to create a history entry with a value in the iframe.
//        setIframe = function (newHash) {
//            try {
//                var doc = iframe.contentWindow.document;
//                doc.open();
//                doc.write('<html><body>' + newHash + '</body></html>');
//                doc.close();
//                hash = newHash;
//            } catch (e) {
//                setTimeout(function () { setIframe(newHash); }, 10);
//            }
//        },
//// Used by Internet Explorer 7 and below to set up an iframe that keeps track
//// of history changes.
//        setUpIframe = function () {
//// Don't run until access to the body is allowed.
//            try {
//                iframe = createIframe();
//            } catch (e) {
//                setTimeout(setUpIframe, 10);
//                return;
//            }
//// Create a history entry for the initial state.
//            setIframe(hash);
//            var data = hash;
//            setInterval(function () {
//                var curData, curHash;
//                try {
//                    curData = iframe.contentWindow.document.body.innerText;
//                    if (curData != data) {
//                        data = curData;
//                        window.location.hash = hash = curData;
//                        callback(curData, true);
//                    } else {
//                        curHash = getHash();
//                        if (curHash != hash) setIframe(curHash);
//                    }
//                } catch (e) {
//                }
//            }, 50);
//        };
//    return {
//        init: function (cb) {
//// init can only be called once.
//            if (callback) return;
//            callback = cb;
//// Keep track of the hash value.
//            hash = getHash();
//            cb(hash, true);
//            if (isHashChangeSupported()) {
//                if (window.addEventListener){
//                    window.addEventListener('hashchange', poll, false);
//                } else if (window.attachEvent){
//                    window.attachEvent('onhashchange', poll);
//                }
//            } else {
//// Run specific code for Internet Explorer.
//                if (window.ActiveXObject) {
//                    if (!documentMode || documentMode < 8) {
//// Internet Explorer 5.5/6/7 need an iframe for history
//// support.
//                        setUpIframe();
//                    }
//                } else {
//// Change Opera navigation mode to improve history support.
//                    if (history.navigationMode) {
//                        history.navigationMode = 'compatible';
//                    }
//                    setInterval(poll, 50);
//                }
//            }
//        },
//        go: function (newHash) {
//// Cancel if the new hash is the same as the current one, since there
//// is no cross-browser way to keep track of navigation to the exact
//// same hash multiple times in a row. A wrapper can handle this by
//// adding an incrementing counter to the end of the hash.
//            if (newHash == hash) return;
//            if (iframe) {
//                setIframe(newHash);
//            } else {
//                window.location.hash = hash = newHash;
//                callback(newHash, false);
//            }
//        }
//    };
//})();
//var GDispatcher = (function(){
//    var _lastPage = '',
//        _igReg = /f=(.*?)/,
//        _hReg = /\/?#.*/,
//        _xssReg = /(java|vb)script/,//xss注入
//        _default = '/discover';
//    function _isIE10plus(){
//        var _ua = window.navigator.userAgent;
//        return (/msie\s+(.*?);/i.test(_ua)||/trident\/.+rv:([\d\.]+)/i.test(_ua))&&(parseInt(RegExp.$1)>=10);
//    };
//    function _onHashChange(_hash){
//        var _url,
//            _iframe = document.getElementById('g_iframe');
//        if(!_hash||_igReg.test(_hash)||_xssReg.test(_hash)){//忽略统计来源的hash
//            _url = _default;
//        }else{
//            _hash = _hash.replace(/\/+/g, '/');//#29664 http://music.163.com/#// 会死循环
//            var _midx = -1;
//            if((_midx=_hash.indexOf('store/m/'))>=0){
//                _url = _hash.substring(0, _midx+8)+(_hash.substring(_midx+8).replace('/m/','/#/'));
//            }else{
//                _url = _hash.replace('/m/','/#/');
//            }
//        }
//        if(_url.indexOf('http://')<0){
//            _url = location.protocol+'//'+location.hostname+_url;
//        }
////针对ie10+ location.replace的bug做特殊处理
//        if(_isIE10plus()){
//            if(_lastPage.replace(_hReg,'')==_url.replace(_hReg,'')){//只是hash的改变
//                _iframe.contentWindow.location.replace(_url);
//            } else{
//                _iframe.parentNode.removeChild(_iframe);
//                _iframe = document.createElement('iframe');
//                _iframe.id = 'g_iframe';
//                _iframe.src = 'about:blank';
//                _iframe.className = 'g-iframe';
//                document.body.insertAdjacentElement('afterBegin',_iframe);
//                _iframe.contentWindow.location.href = _url;
//            }
//        }else{
//            _iframe.contentWindow.location.replace(_url);
//        }
//        _lastPage = _url;
//        if(typeof window.onHashChange=='function'){
//            window.onHashChange(_hash);
//        }
//    };
//    Hash.init(_onHashChange);
//    return {
//        dispatch:function(_url,_replace){
//            var _ph = GUtil.getPathAndHash(_url);
//            if(!_ph) return;
//            if(_replace){
//                location.replace(GUtil.getBase()+'#'+_ph);
//            }else{
//                location.hash = _ph;
//            }
//        },
//        refreshIFrame:function(_url){
//            _onHashChange(_url);
//        }
//    };
//})();