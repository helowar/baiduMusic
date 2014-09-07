
```
1.项目技术
    |-- SailsJS + Angular + Ejs

2.网站介绍
    |-- 提供歌曲搜索并获得歌曲的下载地址以及歌词。
    
3.建站原因
    |-- 很早之前就想使用nodejs去破解一些音乐网站的下载链接,尝试过,QQ音乐,网易音乐,酷狗音乐,
        百度音乐,虾米音乐。但因为种种原因都失败了。可是这种想法却从没放弃过。不久前的一次偶然,
        因为做项目实在是太累了,便停下来休息一下,真巧,眼前电脑上显示的是百度的搜索主页,因为
        当时使用了百度帐号登录了,所以页面下方会有一个听音乐的功能,于是乎就点击了一下播放按钮,
        就在点击的那一下,突然又激起了爬虫的念头--既然我点击了,页面能播放音乐,那一定说明当前页面
        获取了音乐的的url。更加幸运的是,此时页面并没有发生跳转。于是,打开浏览器的控制台,重新点击
        了一下播放按钮,监视这Network中的请求。或许是当时发现了一丝蜘丝马迹,经过一番努力,终于获取
        到了关键性的几个请求url：

4.三个关键api
    这三个api都是由百度提供,我们发送get请求,获取到一串json，而json中就包含我们想要的东西。
    |-- 根据输入关键词,获取搜索建议
            http://sug.music.baidu.com/info/suggestion?format=json&word=？// 只需要将？换成你想输的单词即可
            e.g
            发送Get请求: http://sug.music.baidu.com/info/suggestion?format=json&word=成龙;
            请求结果:{"song": [
                              {
                                  "songid": "31629985",
                                  "songname": "\u5f53\u6211\u60f3\u4f60\u7684\u65f6\u5019",
                                  "artistname": "\u6210\u9752"
                              },
                              {
                                  "songid": "23188165",
                                  "songname": "\u6211\u53ea\u5728\u4e4e\u4f60",
                                  "artistname": "\u6210\u9f99"
                              },
                              {
                                  "songid": "16592627",
                                  "songname": "\u5fc3\u4e2d\u7684\u65e5\u6708",
                                  "artistname": "\u6210\u6797\u6c5f\u63aa"
                              },
                              {
                                  "songid": "14632293",
                                  "songname": "\u7ae5\u5e74",
                                  "artistname": "\u6210\u65b9\u5706"
                              },
                              {
                                  "songid": "34548361",
                                  "songname": "\u5176\u5b9e\u4f60\u4e0d\u61c2\u6211\u7684\u5fc3",
                                  "artistname": "\u6210\u9e4f\u98de"
                              },
                              {
                                  "songid": "70085561",
                                  "songname": "\u6211\u7231\u4f60",
                                  "artistname": "\u6210\u4f91\u5f6c"
                              },
                              {
                                  "songid": "235635",
                                  "songname": "\u771f\u5fc3\u82f1\u96c4",
                                  "artistname": "\u6210\u9f99"
                              },
                              {
                                  "songid": "5543225",
                                  "songname": "\u5353\u739b",
                                  "artistname": "\u6210\u683c\u5c14"
                              },
                              {
                                  "songid": "1020690",
                                  "songname": "\u9189\u62f3",
                                  "artistname": "\u6210\u9f99"
                              },
                              {
                                  "songid": "31650818",
                                  "songname": "\u6211\u7231\u4f60\u4e2d\u56fd",
                                  "artistname": "\u6210\u9752"
                              }
                              ...... // 因为太多,已经省略一部分了
                          ]}
            可以看到此api可以让我们根据关键词获取歌曲的id(songid)，歌曲名(songname),歌手名(artistname)
            
    |-- 根据songid获取歌曲的详情:
            http://play.baidu.com/data/music/songinfo?songIds=?  // 只需要将？换成相应的songid即可
            e.g
            发送Get请求: http://play.baidu.com/data/music/songinfo?songIds=31650818;
            请求结果:{
                    "errorCode": 22000,
                    "data": {
                        "songList": [
                            {
                                "queryId": "31650818",
                                "songId": "31650818",
                                "songName": "我爱你中国",
                                "artistId": "36840789",
                                "artistName": "成青",
                                "albumId": 31651373,
                                "albumName": "直通春晚 第5场",
                                "songPicSmall":           "http://a.hiphotos.baidu.com/ting/pic/item/9e3df8dcd100baa1eb32ee9e4510b912c8fc2efc.jpg",
                                "songPicBig": "http://a.hiphotos.baidu.com/ting/pic/item/6f061d950a7b0208ffb496c460d9f2d3572cc892.jpg",
                                "songPicRadio": "http://a.hiphotos.baidu.com/ting/pic/item/32fa828ba61ea8d3e93cdd21950a304e251f58fc.jpg",
                                "relateStatus": "0",
                                "resourceType": "0",
                                "del_status": 0,
                                "fchar": "C",
                                "allRate": "24,64,128,192,256,320",
                                "distribution": "0000000000,0000000000,0000000000,0000000000,0000000000,0000000000,0000000000,0000000000,0000000000,0000000000",
                                "area": 0,
                                "compress_status": 1,
                                "tingUid": 36840789,
                                "piao": 0,
                                "sid": 0,
                                "musician": 0,
                                "resource_type_ext": 0,
                                "source": "web",
                                "yyr_artist_id": "",
                                "korean_bb_song": 0
                            }
                        ]
                    }
                }
            可以看到此api可以帮我们根据songid获得很多歌曲的信息,不过我做的时候只用了它的songPicBig，即
            一个歌曲对应的大图照片
            
    |-- 根据songid获取歌曲的下载地址:
            http://play.baidu.com/data/music/songlink?songIds=？ //  只需要将？换成相应的songid即可
            e.g
            发送Get请求: http://play.baidu.com/data/music/songlink?songIds=31650818;
            请求结果:
                        {
                "errorCode": 22000,
                "data": {
                    "time": 3600,
                    "xcode": "276d3916dd5dbc072a7250ec29f7e010",
                    "songList": [
                        {
                            "queryId": "31650818",
                            "status": 0,
                            "songId": 31650818,
                            "songName": "我爱你中国",
                            "artistId": "31629984",
                            "artistName": "成青",
                            "albumId": 31651373,
                            "albumName": "直通春晚 第5场",
                            "lrcLink": "/data2/lrc/31729339/31729339.lrc",
                            "time": 118,
                            "linkCode": 22000,
                            "songLink": "http://yinyueshiting.baidu.com/data2/music/43096444/31650818180000128.mp3?xcode=4958d4730eeaa7931e00b0f2369901583689d1c11028f47b",
                            "showLink": "http://yinyueshiting.baidu.com/data2/music/43096444/31650818180000128.mp3?xcode=4958d4730eeaa7931e00b0f2369901583689d1c11028f47b",
                            "format": "mp3",
                            "rate": 128,
                            "size": 1883373,
                            "linkinfo": null,
                            "version": "现场",
                            "copyType": 1,
                            "enhancement": "5.139999"
                        }
                    ]
                }
            }
          此api非常的重要,因为我们根据songid可以获取到它的下载地址，即上面的songLink属性值,还有就是歌词:lrcLink属性值
  
        
        
4.三种下载方式
    经过一番整理与封装,现在可以使用三种方式下载音乐
    |-- 通过在html中的a标签上放置下载链接，点击时请求下载。但缺点是,再弹出的页面中需要手动在地址栏中回车一下才行，
        这个bug，一直没有找到解决的办法。
    |-- 由自己的node服务器去请求下载，并将获取的数据通过管道转发给浏览器。但缺点，文件名会丢失。
    |-- 通过百度网盘,因为根据songid获取的json中有的也包含此歌曲百度网盘的链接
    
5.运行
    |-- 项目根目录下node baidu.js ,启动后访问 http://localhost:2015
    
6.心得
	  |-- 做完这个项目，毫无成就感，因为关键的数据都是直接通过一次get请求便可以获取。相比虾米网的各种加密
	      方式，这种做法真的不值一提。期待着有一天能够破解虾米网的音乐。
7.备注
    |-- 由于网站的内容都是根据百度提供的api动态获取的，所以我并不能保证，当你打开网站时，还是否有内容显示。
        同样上面三个api请求，若百度更换了策略，也会失败
8.本文档完成日期
    |-- 2014-9-7 9:10
```
