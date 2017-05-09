/**
 * Created by YK on 17/4/6.
 */
$(function () {
    //  导航栏的点击状态方法
    navbarAction()

//    滚动监听
    scrollListener()

//    discover页添加轮播图
    initDiscover()

//     iframe界面
    hashChange()
    $(window).on("hashchange", function() {//兼容ie8+和手机端
        hashChange()
    });

//    iframe高度计算
    startInit('myIframe', 700)

    //playBar
    playBarCtrol()

//    keyborad
    keyboradListen()

//    搜索框监听
    inputListen()

})

function hashChange() {
    var hash = gethash()
    if (hash) {
        if (hash.indexOf('discover') === 0) {
            labelClickFun(0)
        } else if (hash.indexOf('toplist') === 0) {
            labelClickFun(1)
        } else if (hash.indexOf('search') === 0) {
            $('#main-menu li').removeClass('active')
            $('.zone-list li').removeClass('active')
            $('#zone').css('height', '5px')
            $('.zone-list').hide()
            $('#myIframe')[0].contentWindow.location.href = '../WYMusic-H5/search.html'
        }
    } else {
        labelClickFun(0)
    }
}


function navbarAction() {
    //        开启popover插件
    $('[data-toggle=popover]').popover({
        html: true,
        trigger: 'click',
        content: '<ul class="popover-list">' +
        '<li><i class="fa fa-mobile-phone fa-lg"></i>手机号登录</li>' +
        '<li><i class="fa fa-wechat"></i>微信登录</li>' +
        '<li><i class="fa fa-qq"></i>QQ登录</li>' +
        '<li><i class="fa fa-weibo"></i>新浪微博登录</li>'
    })
//        切换箭头样式
    $('.login-btn').click(function () {
        $('.login-btn i').toggleClass('fa-caret-down fa-caret-up')
    })
//        点击导航栏切换
    $('#main-menu li').click(function () {
//            切换导航栏点击效果
        $('#main-menu li').removeClass('active')
        $(this).addClass('active')
        if (!$(this).hasClass('discover')) {
            $('#zone').css('height', '5px')
            $('.zone-list').hide()
        } else {
            $('#zone').css('height', '40px')
            $('.zone-list').show()
        }
//            页面切换
        $('#content-box').children().fadeOut()
        switch ($(this).index()) {
            case 0:    // 发现音乐
                $('#myIframe').fadeIn()
                $('.zone-list li').removeClass('active').first().addClass('active')
                break
            case 1:    // 我的音乐
                break
            case 2:     // 朋友
                break
            case 3:     // 商城
                break
            case 4:     //音乐人
                break
            case 5:     // 下载客户端
                break
        }
    })
//        点击首页标签栏
    $('.zone-list li').click(function () {
        labelClickFun($(this).index())
    })
}

function labelClickFun(index) {
    //$('#content-box').children().fadeOut()
    var li = $('.zone-list li')
    li.removeClass('active')
    li.eq(index).addClass('active')
    //$(this).addClass('active')
    var box = $('#myIframe')[0]
    switch (index) {
        case 0:     //  推荐
            box.contentWindow.location.href = '../WYMusic-H5/discover/discover.html'
            break
        case 1:     //  排行榜
            box.contentWindow.location.href = '../WYMusic-H5/discover/RankList.html'
            break
        case 2:     //  歌单
            break
        case 3:     //  主播电台
            break
        case 4:     //  歌手
            break
        case 5:     //  新碟上架
            break
    }
    startInit('myIframe', 700)
}

//  TODO 获取锚点
function gethash() {
    var u = window.location.hash
    var rurl = u.split('/')
    return rurl[rurl.length - 1]
}

// 滚动监听
function scrollListener() {
    $(window).scroll(function (event) {
        var scrollY = event.currentTarget.scrollY
        $('.scrollup').css('display', scrollY > 0 ? 'block' : 'none')
    })
}

//  初始化发现音乐页
function initDiscover() {
    for (var obj in bannerList) {
        var element = '<li><a href="' + bannerList[obj].url + '"><img src="' + bannerList[obj].picUrl + '"></a></li>'
        //$('.slides').append(element)
    }
}


//  iframe高度自适应
//  TODO iframe切换仍存在问题, 切换到榜单界面再切回来,  高度还是榜单界面的高度
function reinitIframe(iframeId, minHeight) {
    var browserVersion = window.navigator.userAgent.toUpperCase();
    var isOpera = browserVersion.indexOf("OPERA") > -1 ? true : false;
    var isFireFox = browserVersion.indexOf("FIREFOX") > -1 ? true : false;
    var isChrome = browserVersion.indexOf("CHROME") > -1 ? true : false;
    var isSafari = browserVersion.indexOf("SAFARI") > -1 ? true : false;
    var isIE = (!!window.ActiveXObject || "ActiveXObject" in window);
    var isIE9More = (! -[1, ] == false);
    try {
        var iframe = document.getElementById(iframeId);
        var bHeight = 0;
        if (isChrome == false && isSafari == false) {
            bHeight = iframe.contentWindow.document.body.scrollHeight;
        }
        var dHeight = 0;
        if (isFireFox == true) {
            dHeight = iframe.contentWindow.document.documentElement.offsetHeight + 2;
        } else if (isIE == false && isOpera == false) {
            dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
        } else if (isIE == true && isIE9More) {//ie9+
            var heightDeviation = bHeight - eval("window.IE9MoreRealHeight" + iframeId);
            if (heightDeviation == 0) {
                bHeight += 3;
            } else if (heightDeviation != 3) {
                eval("window.IE9MoreRealHeight" + iframeId + "=" + bHeight);
                bHeight += 3;
            }
        } else {  //ie[6-8]、OPERA
            bHeight += 3;
        }
        var height = Math.max(bHeight, dHeight);
        if (height < minHeight) height = minHeight;
        iframe.style.height = height + "px";
    } catch (ex) { }
}

function startInit(iframeId, minHeight) {
    window.setInterval(function () {
        reinitIframe(iframeId, minHeight)
    }, 200)
}

var tn
function playBarCtrol() {
    var bar =  $('.g-bottomBar')
    bar.hover(function () {
        clearTimeout(tn)
        bar.animate({
            bottom: '0px'
        })
    }, function () {
        if (bar.hasClass('m-playbar-unlock')) {
            tn = setTimeout(function () {
                bar.animate({
                    bottom: '-39px'
                }, 'slow')
            }, 5000)
        }
    })

//    锁定playbar
    $('.lock-btn').click(function () {
        var bar = $('.g-bottomBar')
        bar.toggleClass('m-playbar-unlock')
        bar.toggleClass('m-playbar-lock')
        lock = !lock
        changePlaySetting('lock')
    })

}

//  键盘事件监听
function keyboradListen() {
    $(window).keydown(function (event) {
        var keyCode = event.keyCode || event.which || event.charCode;
        var ctrlKey = event.ctrlKey || event.metaKey;
        if (keyCode === 32) {
            playOrPause()
            return false
        } else if (ctrlKey && keyCode === 39) {
            playNext()
            return false
        } else if (ctrlKey && keyCode === 37) {
            playFront()
            return false
        }
        return true
    })
}

//  搜索框监听
function inputListen() {
    $('.search-bar input').focus(function () {  //  输入框获得焦点
        if ($(this).val()) {
            $('.search-menu').fadeIn()
        }
    }).blur(function () {       //  输入框失去焦点
        $('.search-menu').fadeOut()
    }).bind('input propertychange', function() {
        if ($(this).val()) {
            $('.search-menu').fadeIn()
        } else {
            $('.search-menu').fadeOut()
        }
        var val = $(this).val()
        $.ajax({
            type: "GET",
            url: apiUrl,
            data: 'types=search&s=' + val,
            dataType : "jsonp",
            success: function(jsonData) {
                const result = jsonData.result
                if (jsonData == undefined || jsonData.result == undefined || jsonData.result.length == 0) {
                    return
                }
                updataSearchResult(result, val)
            },
            error: function (error) {
                console.log(error)
            }
        })
    })
}

function updataSearchResult(result, val) {
    var searchBox = $('.search-bar .search-menu')
    var subElement = ''
    for (var i = 0; i < result.order.length; i++) {
        var order = result.order[i]
        var title, imgClass, content, liEle = ''
        switch (order) {
            case 'songs':
                title = '单曲'
                for (var s = 0; s < result[order].length; s++) {
                    liEle += '<li><a href="#">' + result[order][s].name + '-' + result[order][s].artists[0].name + '</a></li>'
                }
                break;
            case 'artists':
                title = '歌手'
                for (var ar = 0; ar < result[order].length; ar++) {
                    liEle += '<li><a href="#">' + result[order][ar].name + '</a></li>'
                }
                break;
            case 'albums':
                title = '专辑'
                for (var al = 0; al < result[order].length; al++) {
                    liEle += '<li><a href="#">' + result[order][al].name + '</a></li>'
                }
                break;
            case 'mvs':
                title = 'MV'
                for (var m = 0; m < result[order].length; m++) {
                    liEle += '<li><a href="#">' + result[order][m].name + '-' + result[order][m].artistName + '</a></li>'
                }
                break;
            case 'playlists':
                title = '歌单'
                for (var p = 0; p < result[order].length; p++) {
                    liEle += '<li><a href="#">' + result[order][p].name + '</a></li>'
                }
                break;
        }
        subElement += '<div class="item"> ' +
            '<h3><i class="icn u-icn u-icn-26"></i><em class="f-fl">' + title + '</em></h3> ' +
            '<ul class="f-cb ' + (i % 2 == 1 ? 'active' : '') + '"> ' + liEle + '</ul>' +
            '</div> '
    }
    var element = '<div class="m-search"> ' +
        '<p class="note s-fcs"><a class="s-fcs" href="#/search?s=' + val + '&type=1002">搜“' + val + '” 相关用户</a>&gt;</p> ' +
        subElement +
        '</div>'
    searchBox.html(element)
    $('.search-menu .m-search .note').click(function () {
        console.log('点击跳转')
        $('#myIframe')[0].contentWindow.location.href = '../WYMusic-H5/search.html'
    })
}