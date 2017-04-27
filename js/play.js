/**
 * Created by YK on 17/4/18.
 */

//    常参
var PLAY_MODE_NAME = ['单曲循环', '顺序播放', '随机播放']
var SINGLE = 0          //  单曲循环
var SEQUENTIAL = 1      //  顺序播放
var RANDOM = 2          //  随机播放
var DEFAULT_IMG = '../assets/Vue_Music_Blur.png'
var DEFAULT_SONG_NAME = 'MUSIC'
var DEFAULT_SINGER_NAME = 'YANG KUN'


//  变量
var playing = false                         //  是否在播放
var playMode = SEQUENTIAL                   //  播放模式
var volume = 0.5                           //  播放音量
var autoPlay = false                        //  自动播放
var lock = false                            //  播放bar锁
var index = 0                               //  播放列表中的下标
var song = {
    name: DEFAULT_SONG_NAME,                //  歌曲名
    singer: DEFAULT_SINGER_NAME,            //  歌手
    coverImgUrl: DEFAULT_IMG,                //  歌曲图片
    id: 0,                                  //  歌曲id
    url: '',                                 //  歌曲链接
    duration: '00:00'                            //  歌曲时长
}
var playList = []                           //  播放列表

$(function () {
    //  本地保存信息的初始化
    if (window.localStorage.getItem('playSetting')) {
        var playSetting = JSON.parse(window.localStorage.getItem('playSetting'))
        console.log(playSetting)
        playMode = playSetting.playMode
        volume = playSetting.volume
        autoPlay = playSetting.autoPlay
        lock = playSetting.lock
        index = playSetting.index
    }
    changeVolume(volume)
    changePlayMode(true)
    if (lock) {
        var bar = $('.g-bottomBar')
        bar.removeClass('m-playbar-unlock')
        bar.addClass('m-playbar-lock')
        bar.css('bottom', '0')
    }

    if (window.localStorage.getItem('play-list')) {
        var playlist = JSON.parse(window.localStorage.getItem('play-list'))
        setPlayList(playlist)
        setPlayMusic()
    }
})

//  播放
function play() {
    console.log('播放')
    $('#music')[0].play()
    $('#g-player .play').css('background-position', '-40px -165px')
    playing = true
}

//  暂停
function pause() {
    $('#music')[0].pause()
    $('#g-player .play').css('background-position', '0 -204px')
    playing = false
}

//  播放暂停
function playOrPause() {
    if (playing) {
        pause()
    } else {
        play()
    }
}

//  设置播放列表
function setPlayList(list) {
    playList = list.list
    index = list.index
    song = playList[index]
    window.localStorage.setItem('play-list', JSON.stringify({index: index, list: playList}))
}

//  设置播放单曲信息
function setPlayMusic() {
    console.log(song)
    $('#music').attr('src', song.url)
    $('.song-img>img').attr('src', song.coverImgUrl)
    $('.play-ctrl>.words>.name').text(song.name)
    $('.play-ctrl>.words>.by').text(song.singer)
    $('.m-pbar>.time>span:last-child').text(' / ' + song.duration)

    if (window.localStorage.getItem('play-list')) {
        var playlistStorage = JSON.parse(window.localStorage.getItem('play-list'))
        playlistStorage.index = index
        window.localStorage.setItem('play-list', JSON.stringify(playlistStorage))
    } else {
        window.localStorage.setItem('play-list', JSON.stringify({index: index, list: playList}))
    }
}

//  播放进度改变
function updateTime() {
    var current = $('#music')[0].currentTime
    var currentTime = timeComplate(current)
    //console.log(currentTime)
    var duration = $('#music')[0].duration
    var durationTime = timeComplate(duration)
    //console.log(Math.ceil((current / duration) * 100) + '%')
    $('.m-pbar>.barbg>.cur').css('width', ((current / duration) * 100).toFixed(2) + '%')
    $('.m-pbar>.time>span:first-child').text(currentTime)
}

//  上一首
function playFront() {
    playContinue(false)
}

//  下一首
function playNext() {
    playContinue(true)
}

//  当前歌曲播放完成
function playContinue(type) {
    // type: true为下一首, false为上一首
    switch (playMode) {
        case SINGLE:
            break
        case SEQUENTIAL:
            index = type ? (index + 1) % playList.length : (index - 1 + playList.length) % playList.length
            song = playList[index]
            break
        case RANDOM:
            index = Math.floor(Math.random() * playList.length)
            song = playList[index]
            break
    }
    setPlayMusic()
    play()
}

//  改变循环模式
function changePlayMode(isinit) {
    if (!isinit) playMode = (playMode + 1) % 3
    var mode = $('.oper [data-action=mode]')
    mode.removeClass()
    switch (playMode) {
        case SINGLE:
            mode.addClass('icn icn-one')
            break
        case SEQUENTIAL:
            mode.addClass('icn icn-loop')
            break
        case RANDOM:
            mode.addClass('icn icn-shuffle')
            break
    }
   changePlaySetting('playMode')
}

//  改变音量
function changeVolume(val) {
    volume = val
    $('#music')[0].volume = volume
    changePlaySetting('volume')
}



//  辅助函数
//
function changePlaySetting(key) {
    if (window.localStorage.getItem('playSetting')) {
        var playSetting = JSON.parse(window.localStorage.getItem('playSetting'))
        playSetting[key] = eval(key)
        window.localStorage.setItem('playSetting', JSON.stringify(playSetting))
    } else {
        window.localStorage.setItem('playSetting', JSON.stringify({playMode: playMode, volume: volume, autoPlay: autoPlay, index: index, lock: lock}))
    }
}


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