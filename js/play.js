/**
 * Created by YK on 17/4/18.
 */

//    常参
var PLAY_MODE_NAME = ['单曲循环', '顺序播放', '随机播放']
var SINGLE = 0
var SEQUENTIAL = 1
var RANDOM = 2
var DEFAULT_IMG = '../assets/Vue_Music_Blur.png'
var DEFAULT_SONG_NAME = 'VUE MUSIC'
var DEFAULT_SINGER_NAME = 'YANG KUN'


//  变量
var playing = false                         //  是否在播放
var currentTime = 0                         //  当前播放进度
var duration = 0                            //  歌曲总时长
var playMode = SEQUENTIAL                   //  播放模式
var index = 0                               //  播放列表中的下标
var song = {
    name: DEFAULT_SONG_NAME,                //  歌曲名
    singer: DEFAULT_SINGER_NAME,            //  歌手
    coverImgUrl: DEFAULT_IMG                //  歌曲图片
}
var playList = []                           //  播放列表

