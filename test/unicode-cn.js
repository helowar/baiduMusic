/**
 * Created by tsq on 14-8-29.
 */
var GB2312UnicodeConverter={
    ToUnicode:function(str){
        return escape(str).toLocaleLowerCase().replace(/%u/gi,'\\u');
    }
    ,ToGB2312:function(str){
        return unescape(str.replace(/\\u/gi,'%u'));
    }
};
function ToGB2312(str) {
    return unescape(str.replace(/\\u/gi,'%u'));
}
var request = require('request');
request = request.defaults({jar: true});
var cheerio = require('cheerio');
var fs = require('fs');
var _ = require("underscore")._;

//console.log(GB2312UnicodeConverter.ToGB2312('\u6211\u53ea\u5728\u4e4e\u4f60'))
var keyword = '周杰伦';
var url = 'http://sug.music.baidu.com/info/suggestion?format=json&word=' + keyword;
request(url, function (error, re, body) {
    if (!error && re.statusCode == 200) {
//        console.log("body", body);
        var json = JSON.parse(body);
        var song = json.song;
        song = _.map(song, function(s){
            var obj = {
                songid: s.songid,
                songname: ToGB2312(s.songname),
                artistname: ToGB2312(s.artistname)
            };
            return obj;
        });
        console.log("song", song);
//        console.log("song.length", song.length);
    }
})