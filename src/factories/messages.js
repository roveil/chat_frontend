/**
 * Created by roveil on 01.07.16.
 */
angular
    .module('MyApp')
    .factory('Message', function (apiConnect, $q) {
        function Message() {
            this.url = null;
            this.id = null;
            this.user = null;
            this.text = null;
            this.created = null;
            this.users_likes = null;
        }
        Message.prototype = {
            setData : function (data) {
                angular.extend(this, data);
            },
            getMessages : function () {
                var deferred = $q.defer();
                apiConnect.get("messages/?limit=10&offset=0").then(function (data) {
                    deferred.resolve(data);
                },function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            sendMessage : function (args) {
                var deferred = $q.defer();
                apiConnect.post("messages/",args).then(function (data) {
                    deferred.resolve(data);
                },function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            }
        };
        return Message;
    });