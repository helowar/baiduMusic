/**
 * Created by tsq on 14-8-29.
 */

var request = require('request');
request = request.defaults({jar: true});
var cheerio = require('cheerio');
var fs = require('fs');
var _ = require("underscore")._;


function decode(str) {
    var s = unescape(encodeURIComponent(str))
    return s.replace(/"/g, '\\"');
}

request('http://play.baidu.com/data/music/songlink?songIds=209692', function (error, re, body) {
    if (!error && re.statusCode == 200) {
        console.log("body", body);
        var downUrl = JSON.parse(body).data.songList[0].songLink;
        console.log("downUrl", downUrl);
    }
})