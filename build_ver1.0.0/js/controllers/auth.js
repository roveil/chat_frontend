/**
 * Created by roveil on 28.06.16.
 */
angular.module('MyApp')
    .controller('AuthCtrl',function ($rootScope, $scope, User, $state) {
        $scope.SignIn = function () {
            var promise = $rootScope.User.signIn($scope.loginparam);
            promise.then(function (data) {
                $state.go("chat");
            },function (data) {
                $scope.error = "Неверное имя пользователя или пароль!";
            });
        };


        $scope.SignOut = function () {
            var promise = $rootScope.User.signOut();
            promise.then(function (data) {
                $state.go("login");
            },function (data) {
                //TO DO go to error page
            });
        };
});