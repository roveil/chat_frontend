/**
 * Created by roveil on 01.07.16.
 */
angular
    .module('MyApp')
    .factory('chatUser', function (apiConnect, $q) {
        function User() {
            this.url = null;
            this.username = null;
            this.email = null;
            this.first_name = null;
            this.last_name = null;
            this.password = null;
        }
        User.prototype = {
            setData : function (data) {
                angular.extend(this, data);
            },
            createUser : function (args) {
                var scope = this;
                var deferred = $q.defer();
                apiConnect.post("users/", scope).then(function (data) {
                    deferred.resolve(data);
                },function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            }
        };
        return User;
    });