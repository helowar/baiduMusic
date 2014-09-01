/**
 * Created by tsq on 14-8-30.
 */


module.exports = {
    getSug: function (req, res) {
        ToolService.getSug(req.query, function(result){
            if (!result) {
                return res.send(500, '获取搜索建议失败!');
            }
            return res.send(result);
        })
    },
    getInfo: function (req, res) {
        ToolService.getInfo(req.body, function(result){
            if (!result) {
                return res.send(500, '获取歌曲信息失败!');
            }
            return res.send(result);
        })
    },
    getDownUrl: function (req, res) {
        ToolService.getDownUrl(req.body, function(result){
            if (!result) {
                return res.send(500, '获取下载链接失败!');
            }
            return res.json({r: result});
        })
    },
    getLrc: function (req, res) {
        ToolService.getLrc(req.body, function(result){
            if (!result) {
                return res.send(500, '获取歌词失败!');
            }
            return res.send(result);
        })
    }


};