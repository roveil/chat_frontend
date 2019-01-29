/**
 * Created by roveil on 01.07.16.
 */
angular
    .module('MyApp')
    .factory('User', function (apiConnect, $q) {
        function User() {
            this.username = null;
            this.AuthStatus = false;
        }
        User.prototype = {
            setData : function (data) {
                angular.extend(this, data);
            },
            getMe : function () {
                var deferred = $q.defer();
                var scope = this;
                apiConnect.get("auth/").then(function (data) {
                    scope.setData(data);
                    scope.AuthStatus = true;
                    deferred.resolve(data);
                },function (data) {
                    scope.AuthStatus = false;
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            signIn : function (args) {
                var scope = this;
                var deferred = $q.defer();
                apiConnect.post("auth/",args).then(function (data) {
                    scope.setData(data);
                    scope.AuthStatus = true;
                    deferred.resolve(data);
                },function (data) {
                    scope.AuthStatus = false;
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            signOut : function () {
                var scope = this;
                var deferred = $q.defer();
                apiConnect.delete("auth/").then(function (data) {
                    scope.AuthStatus = false;
                    deferred.resolve(data);
                },function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            isAuthenticated : function () {
                return this.AuthStatus;
            }
        };
        return User;
    });