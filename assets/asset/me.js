/**
 * Created by tsq on 14-8-30.
 */
var music = angular.module('tsq',[
    'ngResource',
    'ui.bootstrap'
]);
music.factory("Music", ['$resource', function($resource){
    return $resource('/music/:todo/:id', {id:"@id"}, {
        getSug: {method: 'GET', isArray: true, params:{todo: 'getSug'}},
        getInfo: {method: 'POST', params:{todo: 'getInfo'}},
        getDownUrl: {method: 'POST', params:{todo: 'getDownUrl'}},
        getLrc: {method: 'POST', params:{todo: 'getLrc'}}
    });
}]);
music.controller('MainCtrl', ['$scope', 'Music', '$http',  function($scope, Music, $http){
    $scope.search = {};
    $scope.submit = function(){
        var name = $scope.search.name;
        if (!name) {
            return;
        }
        Music.getSug({name: name}, function(r){
            $scope.objs = r;
/*            angular.forEach(r, function(data){
                $(' <li class="span3" style="cursor: pointer;">'+
                    '<div class="thumbnail border-radius-top">' +
                    '<div class="bg-thumbnail-img">' +
                        '<a class="overlay" href="http://wbpreview.com/previews/WB082S4MT/detail.html">' +
                            '<img src="asset/play.png">'+
                    '</a>'+
                    '<img class="border-radius-top" src="asset/pj2.jpg"' + 'ng-click=down(' + data.songid + ')' + '>'+
                    '</div>'+
                    '<h5><a href="http://wbpreview.com/previews/WB082S4MT/detail.html">' + data.artistname + ' </a></h5>'+
                    '</div>'+
                    '<div class="box border-radius-bottom">'+
                    '<p>'+
                    '<span class="title_torrent pull-left">' + data.songname + ' </span>'+
                    '<span class="number-view pull-right"><i class="icon-white icon-eye-open"></i>' + data.songid + ' </span>'+
                    '</p>'+
                    '</div>'+
                    '</li>')
                    .appendTo($('#container'))
            })*/
        })
    };
    $scope.getValue = function(val) {
        return $http.get('/music/getSug', {
            params: {
                name:val
            }
        }).then(function(res){
            var titles = [];
            angular.forEach(res.data, function(item){
                titles.push(item.songname);
            });
            return titles;
        });
    };
    function downHandler(target){
        console.log("target", target);
        var a = $("<a href='" + target  + "'>361so</a>").get(0);
        var e = document.createEvent('MouseEvents');
        e.initEvent( 'click', true, true );
        a.dispatchEvent(e);
    }
    $scope.down = function(id){
        Music.getDownUrl({id: id}, function(r){
            window.location = r.r;

        });
    }
}])