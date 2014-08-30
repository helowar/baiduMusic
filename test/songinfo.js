/**
 * Created by tsq on 14-8-29.
 */

var request = require('request');
request = request.defaults({jar: true});
var cheerio = require('cheerio');
var fs = require('fs');
var _ = require("underscore")._;


// 为什么post方法不可以呢？很奇怪
var options = {
    url: 'http://play.baidu.com/data/music/songinfo?songIds=1982842'
/*    method: 'POST',
    json: {'songIds': 463390},
    headers: {
        'Referer':'http://play.baidu.com'
    }*/
};
request(options, function (error, re, body) {
    if (!error && re.statusCode == 200) {
        console.log("body", body);
    }
})