/**
 * Created by yk on 2017/5/8.
 */
//  将秒格式化为mm:ss
function timeComplate(seconds) {
    seconds = Math.floor(seconds)
    var min = Math.floor(seconds / 60),
        second = seconds % 60
    return (add0(min) + ':' + add0(second))
}

function add0(m) {
    return m < 10 ? '0' + m : m
}


//    两个时间戳的时间差
function diffTime(t) {
    var date1 = new Date(t);  //开始时间
    var date2 = new Date();    //结束时间
    var date3 = date2.getTime() - date1.getTime()  //时间差的毫秒数
//计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000))
//计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))
//计算相差分钟数
    var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))
//计算相差秒数
    var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)
    if (days > 1) {
        return date1.Format('MM月dd日 hh:mm')
    } else if (days === 1) {
        return date1.Format('昨天 hh:mm')
    } else if (days < 1 && hours > 1) {
        return date1.Format('hh:mm')
    } else {
        return date1.Format('mm分钟前')
    }
}

//    将时间戳转成日期格式
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//      获取url中的参数
function getParams(name) {
    var hash = window.parent.location.hash
    var str = hash.split('?')[1]
    if (str) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = str.match(reg);
        if (r != null) return decodeURI(r[2]);
    }
}

//  数量转换
function filterCount(num) {
    if (num > 100000) {
        var w = num / 10000
        return Math.floor(w) + '万'
    } else {
        return num
    }
}