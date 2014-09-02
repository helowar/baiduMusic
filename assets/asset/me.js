/**
 * Created by tsq on 14-8-30.
 */
var music = angular.module('tsq', [
    'ngResource',
    'ui.bootstrap'
]);

music.factory("Music", ['$resource', function ($resource) {
    return $resource('/music/:todo/:id', {id: "@id"}, {
        getSug: {method: 'GET', isArray: true, params: {todo: 'getSug'}},
        getInfo: {method: 'POST', params: {todo: 'getInfo'}},
        getDownUrl: {method: 'POST', params: {todo: 'getDownUrl'}},
        getLrc: {method: 'POST', params: {todo: 'getLrc'}},
        getPipe: {method: 'GET', params: {todo: 'getPipe'}}
    });
}]);
music.controller('MainCtrl', ['$scope', 'Music', '$http', '$modal', function ($scope, Music, $http, $modal) {
    $scope.search = {};
    $scope.submit = function () {
        var name = $scope.search.name;
        if (!name) {
            return;
        }
        Music.getSug({name: name, flag: true}, function (r) {
            $scope.random = Math.floor(Math.random() * 9) + 1;
            r = r.map(function(item){
                if (item.songName.length>8) {
                    item.songName = item.songName.substring(0, 8) + '...';
                }
                return item;
            })
            $scope.objs = r;
        })
    };
    $scope.getValue = function (val) {
        return $http.get('/music/getSug', {
            params: {
                name: val
            }
        }).then(function (res) {
            var titles = [];
            angular.forEach(res.data, function (item) {
                titles.push(item.songname);
            });
            return titles;
        });
    };
    function downHandler(target) {
        console.log("target", target);
        var a = $("<a href='" + target + "'>361so</a>").get(0);
        var e = document.createEvent('MouseEvents');
        e.initEvent('click', true, true);
        a.dispatchEvent(e);
    }

    $scope.down = function (url) {
        window.location = url;
    };
    $scope.showLrc = function (lrcUrl, name) {
        console.log("lrcUrl", lrcUrl);
        Music.getLrc({url: lrcUrl}, function(r){
            var user = {
                name:name,
                lrc: r.r
            };
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    user: function () {
                        return user;
                    }
                }
            });
            modalInstance.result.then(function () {
            }, function () {

            });
        })
    };
    var names = ['王菲', '陈奕迅', '邓丽君', '久石让', '雅尼'];
    $scope.search.name = names[Math.floor(Math.random()*names.length)];
    $scope.submit();
}]);

var ModalInstanceCtrl = function ($scope, $modalInstance, user) {

    $scope.user = user;
    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};
