angular.module('MyApp')
    .controller('registerCtrl',function ($rootScope, $scope, apiConnect, $state, chatUser) {

        $scope.chatUser = new chatUser();

        $scope.SignIn = function () {
            if ($scope.chatUser.password != $scope.checkpassword) {
                $scope.error = "Ваши пароли не совпадают!";
                return;
            }
            var promise = $scope.chatUser.createUser();
            promise.then(function (data) {
                console.log(data);
                $state.go("chat");
            }, function (reason) {
                console.log(reason);
            });
        };
    });