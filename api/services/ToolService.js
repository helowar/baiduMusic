/**
 * Created by tsq on 14-8-30.
 */

var request = require('request');
request = request.defaults({jar: true});
var cheerio = require('cheerio');
var fs = require('fs');
var _ = require("underscore")._;
var async = require('async');

function ToGB2312(str) {
    return unescape(str.replace(/\\u/gi, '%u'));
}

function decodeUnicode(str) {
    return unescape(encodeURIComponent(str))
}

function decodeDownUrl(str) {
    var s = unescape(encodeURIComponent(str))
    return s.replace(/"/g, '\\"');
}

exports.getSug = function (param, cb) {
    var name = param.name;
    if (!name) {
        return cb(null)
    }
    var url = 'http://sug.music.baidu.com/info/suggestion?format=json&word=' + name;
    console.log("url", url);
    request(url, function (error, re, body) {
        if (!error && re.statusCode == 200) {
//        console.log("body", body);
            var json = JSON.parse(body);
            var song = json.song;
            song = _.map(song, function (s) {
                var obj = {
                    songid: s.songid,
                    songname: ToGB2312(s.songname),
                    artistname: ToGB2312(s.artistname)
                };
                return obj;
            });
            if (param.flag) {
                async.map(song, function (s, cb2) {
                    var url = 'http://play.baidu.com/data/music/songinfo?songIds=' + s.songid;
//                    console.log("url", url);
                    request(url, function (error, re, body) {
                        if (!error && re.statusCode == 200) {
                            body = JSON.parse(body);
                            var song = body.data.songList[0];
//                            console.log("song.area", song.area);
                            var obj = {
                                albumName: song.albumName,
                                songPicSmall: decodeUnicode(song.songPicSmall),
                                songPicBig: decodeUnicode(song.songPicBig),
                                songName: song.songName,
                                songid: s.songid
                            };
                            cb2(null, obj);
                        } else {
                            cb2(null);
                        }
                    })
                }, function (err, result) {
//                    console.log("result", result);
                    async.map(song, function(s, cb3){
                        var url = 'http://play.baidu.com/data/music/songlink?songIds=' + s.songid;
                        console.log("url", url);
                        request(url, function (error, re, body) {
                            if (!error && re.statusCode == 200) {
                                body = JSON.parse(body);
//                                console.log("body", body);
                                var obj = {
                                    songid: s.songid,
                                    song: decodeDownUrl(body.data.songList[0].songLink),
                                    lrcLink: 'http://play.baidu.com' + decodeDownUrl(body.data.songList[0].lrcLink),
                                    showLink: decodeDownUrl(body.data.songList[0].showLink),
                                    artistName: (body.data.songList[0].artistName)
                                };
//                                console.log("obj", obj);
                                cb3(null,obj);
                            } else {
                                return cb3(null);
                            }
                        })
                    }, function(err, result3){
//                        console.log("result3", result3);
//                        console.log("result", result);
                        for (var v = 0; v < result.length; v++) {
                            var songid = result[v].songid
                            for (var x = 0; x < result3.length; x++) {
                                if (result3[x].songid == songid) {
                                    _.extend(result[v], result3[x]);
                                    console.log("result", result);
                                    break;
                                }
                            }
                        }
                        cb(result);
                    });
                })
            } else {
                cb(song);
            }

        } else {
            return cb(null);
        }
    })
};


exports.getInfo = function (param, cb) {
    var id = param.id;
    if (!id) {
        return cb(null)
    }
    var url = 'http://play.baidu.com/data/music/songinfo?songIds=' + id;
    console.log("url", url);
    request(url, function (error, re, body) {
        if (!error && re.statusCode == 200) {
            body = JSON.parse(body);
            var song = body.data.songList[0];
            console.log("song.area", song.area);
            var obj = {
                albumName: song.albumName,
                songPicSmall: decodeUnicode(song.songPicSmall),
                songPicBig: decodeUnicode(song.songPicBig),
                songName: song.songName
            };
            return cb(obj);
        } else {
            return cb(null);
        }
    })
};

exports.getDownUrl = function (param, cb) {
    var id = param.id;
    if (!id) {
        return cb(null)
    }
    var url = 'http://play.baidu.com/data/music/songlink?songIds=' + id;
    console.log("url", url);
    request(url, function (error, re, body) {
        if (!error && re.statusCode == 200) {
            body = JSON.parse(body);
            console.log("body", body);
            var song = body.data.songList[0];
            console.log("song", song);
            /*            var obj = {
             albumName: song.albumName,
             songPicSmall: decodeUnicode(song.songPicSmall),
             songPicBig: decodeUnicode(song.songPicBig),
             songName: song.songName
             };*/

            return cb(decodeDownUrl(song.songLink));
        } else {
            return cb(null);
        }
    })
};
exports.getLrc = function (param, cb) {
    var url = param.url;
    if (!url) {
        return cb(null)
    }
    console.log("url", url);
    request(url, function (error, re, body) {
        if (!error && re.statusCode == 200) {
//            console.log("body", body.replace(/^\[$\]/g), '');
            return cb(body);

        } else {
            return cb(null);
        }
    })
};