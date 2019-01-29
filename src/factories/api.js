/**
 * Created by roveil on 29.06.16.
 */
angular
    .module("MyApp")
    .factory("apiConnect", ['$http',
        function ($http) {
            var apiUrl = 'http://127.0.0.1:8000/';
            return {
                get: function (params) {
                    return $http.get(apiUrl+params).then(function (results) {
                        return results.data;
                    });
                },
                post: function (ref, object) {
                    return $http.post(apiUrl+ref, object).then(function (results) {
                        return results.data;
                    });
                },
                put: function (ref, object) {
                    return $http.put(apiUrl+ref, object).then(function (results) {
                        return results.data;
                    });
                },
                delete: function (ref) {
                    return $http.delete(apiUrl+ref).then(function (results) {
                        return results.data;
                    });
                }
            };
        }]);