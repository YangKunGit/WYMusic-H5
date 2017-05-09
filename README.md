# WYMusic-H5
---
基于`JQuery`的仿网易云音乐的Web端界面

## 功能介绍
- 网站数据的展示, 歌单列表, 歌曲排行榜的数据展示
- 歌曲, 歌单的搜索
- 基于iframe实现将重复的导航栏, footer, 播放器等元素的抽离, 达到多文件加载, 从而实现页面的局部刷新
- 对于音乐播放部分的抽离, 降低耦合性

## 使用
1. 直接在浏览器打开根目录下的index.html文件即可
2. 部分数据因为接口被加密使用的固定json, 部分请求接口放在api.php中, 运行这个php文件然后将config.js文件中的apiUrl参数的地址改为你当前电脑的IP

## 参考
### 用到的第三方库
- jQuery
- Bootstrap
- font-awesome
### 网易云接口API参考
- https://github.com/mengkunsoft/MKOnlineMusicPlayer
- http://moonlib.com/606.html



