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
        $('#content-box').children().hide()
        switch ($(this).index()) {
            case 0:    // 发现音乐
                $('#discover-box').show()
                break
            case 1:    // 我的音乐
                $('#rank-list-box').show()
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
        $('.zone-list li').removeClass('active')
        $(this).addClass('active')
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