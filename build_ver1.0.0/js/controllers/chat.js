angular.module('MyApp')
    .controller('chatCtrl',function ($rootScope, $scope, $http, Message, $timeout) {
        $scope.mymsg = "";
        $scope.needtoscrolldown = false;
        $scope.ws = new WebSocket("ws://192.168.0.2:8000/chat/");
        $scope.msgs = [];
        $scope.ws.onopen = function () {
            //TODO
        };

        var promise = $rootScope.User.getMe();
        promise.then(function (data) {
            $http.defaults.headers.common['X-CSRFToken'] = data['csrftoken'];
        });

        var getmsgpromise = new Message().getMessages();
        getmsgpromise.then(function (data) {
            console.log(data.results);
            for (var i=data.results.length-1; i>=0; i--) {
                data.results[i].created= new Date(data.results[i].created).toLocaleTimeString();
                $scope.msgs.push(data.results[i]);
            }
            $scope.needtoscrolldown = true;
            //safely run apply
            $timeout(function() {
                $scope.$apply();
                $scope.Refresh();
            })
        });

        $scope.ws.onmessage = function(data) {
            var resp = JSON.parse(data.data);
            resp.created = new Date(resp.created).toLocaleTimeString();
            //sender is not our user show red point
            if ($rootScope.User.username !== resp.username) {
                resp.new_message = true;
            }
            $scope.msgs.push(resp);
            $scope.needtogrey = true;
            $scope.$apply();
            $scope.Refresh();
        };

        $scope.needtogrey = false;

        $scope.needtoscrolldown = true;

        $scope.sendMsg = function () {
            var send = new Message().sendMessage({'data':$scope.mymsg});
            $scope.mymsg = "";
            $scope.needtoscrolldown = true;

        };

        $scope.Refresh = function () {
            if ($scope.needtoscrolldown == true) {
                $('#chat_body').scrollTop($('#chat_body')[0].scrollHeight);
                $scope.needtoscrolldown = false;
            }
        };

        $scope.mouseOver = function (scope) {
            scope.msg.new_message = false;
        }
    });