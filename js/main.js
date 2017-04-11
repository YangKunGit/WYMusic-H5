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

//    iframe高度计算
    startInit('discover-box', 700)

})


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
                $('#discover-box').fadeIn()
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
        $('#content-box').children().fadeOut()
        $('.zone-list li').removeClass('active')
        $(this).addClass('active')
        switch ($(this).index()) {
            case 0:     //  推荐
                $('#discover-box').fadeIn()
                break
            case 1:     //  排行榜
                $('#rank-list-box').fadeIn()
                startInit('rank-list-box', 700)
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
    })
}

// 滚动监听
function scrollListener() {
    $(window).scroll(function (event) {
        //console.log(event)
        var scrollY = event.currentTarget.scrollY
        $('.scrollup').css('display', scrollY > 0 ? 'block' : 'none')
    })
}

//  初始化发现音乐页
function initDiscover() {
    //console.log($('#discover-box').contents().find('#discover'))
    for (var obj in bannerList) {
        var element = '<li><a href="' + bannerList[obj].url + '"><img src="' + bannerList[obj].picUrl + '"></a></li>'
        //$('.slides').append(element)
    }
}


//  iframe高度自适应
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
        if (isChrome == false && isSafari == false)
            bHeight = iframe.contentWindow.document.body.scrollHeight;

        var dHeight = 0;
        if (isFireFox == true)
            dHeight = iframe.contentWindow.document.documentElement.offsetHeight + 2;
        else if (isIE == false && isOpera == false)
            dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
        else if (isIE == true && isIE9More) {//ie9+
            var heightDeviation = bHeight - eval("window.IE9MoreRealHeight" + iframeId);
            if (heightDeviation == 0) {
                bHeight += 3;
            } else if (heightDeviation != 3) {
                eval("window.IE9MoreRealHeight" + iframeId + "=" + bHeight);
                bHeight += 3;
            }
        }
        else//ie[6-8]、OPERA
            bHeight += 3;
        var height = Math.max(bHeight, dHeight);
        if (height < minHeight) height = minHeight;
        iframe.style.height = height + "px";
    } catch (ex) { }
}

function startInit(iframeId, minHeight) {
        //eval("window.IE9MoreRealHeight" + iframeId + "=0");
    window.setInterval(function () {
        reinitIframe(iframeId, minHeight)
    }, 100)
}
