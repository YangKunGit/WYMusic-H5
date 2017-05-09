/**
 * Created by yk on 2017/5/7.
 */
//    接口地址
const apiUrl = 'http://192.168.1.114:8888/api.php'
//const apiUrl = 'http://192.168.1.115:8888/api.php'
//const apiUrl = 'http://192.168.1.101:8888/api.php'
//    常参
const PLAY_MODE_NAME = ['单曲循环', '顺序播放', '随机播放']
const SINGLE = 0          //  单曲循环
const SEQUENTIAL = 1      //  顺序播放
const RANDOM = 2          //  随机播放
const DEFAULT_IMG = '../assets/Vue_Music_Blur.png'
const DEFAULT_SONG_NAME = 'MUSIC'
const DEFAULT_SINGER_NAME = 'NAME'

//  变量
var playMode = SEQUENTIAL                   //  播放模式
var volume = 0.5                           //  播放音量
var autoPlay = false                        //  自动播放
