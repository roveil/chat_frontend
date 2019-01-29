/**
 * Created by roveil on 28.06.16.
 */
var MyApp = angular.module('MyApp', ['ui.router', 'ngCookies']);

MyApp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $cookiesProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/login/');
    $stateProvider
        .state('login', {
            url: '/login/',
            templateUrl: '/views/auth/login.html',
            data : {pageTitle : 'Welcome to chat!'},
            controller : 'AuthCtrl',
            NeedAuthentication : false
        })
        .state('chat', {
            url: '/chat/',
            templateUrl: '/views/chat/chat.html',
            controller: 'chatCtrl',
            NeedAuthentication: true
        })
        .state('register', {
            url: '/register/',
            templateUrl: '/views/register/register.html',
            controller: 'registerCtrl',
            NeedAuthentication: false
        });

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
});
MyApp.run(function ($rootScope, $state, $timeout, User, $cookieStore, $cookies, $http) {
    $rootScope.User = new User();
    $rootScope.showAlert = false;
    $rootScope.message = "";
    //Get access to csrf token
    var promise = $rootScope.User.getMe();
    promise.then(function (data) {
        $http.defaults.headers.common['X-CSRFToken'] = data['csrftoken'];
    }, function (data) {
        //TODO except this
        console.log("can't access to csrf token");
    });
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
       if (toState.NeedAuthentication === true && $rootScope.User.isAuthenticated() === false){
           event.preventDefault();
           var promise = $rootScope.User.getMe();
           promise.then(function (data) {
               if (data['auth'] === "yes") {
                   $state.go(toState.name, toParams);
               }
               else {
                    $rootScope.User.AuthStatus = false;
                   event.preventDefault();
                   $timeout(function () {
                       $state.go('login');
                   });
               }
           }, function () {
               event.preventDefault();
               $timeout(function () {
                   //some error page needed
                   $state.go('login');
               });
           });
       }
    });
});
