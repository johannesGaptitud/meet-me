/**
 * Created by Zem on 2014-10-21.
 */
var app = angular.module('MeetMeWebApp',['ngRoute', 'google-maps'.ns()]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: '/views/home.html',
            controller: 'HomeController'
        }).
        when('/login', {
            templateUrl: '/views/login.html',
            controller: 'LoginController'
        }).
        when('/myevents', {
            templateUrl: '/views/my-events.html',
            controller: 'EventListController'
        }).
        when('/newevent', {
            templateUrl: '/views/new-event.html',
            controller: 'EventController'
        }).
        when('/eventdetails', {
            templateUrl: '/views/event-details.html',
            controller: 'EventListController'
        }).
        otherwise({
            redirectTo: '/home'
        });
}]);

app.config(['GoogleMapApiProvider'.ns(), function (GoogleMapApi) {
    GoogleMapApi.configure({
        key: 'AIzaSyBS5asJJWOEQLIr3K7vj_8LWd0tmmgqlhQ',
        v: '3.17',
        libraries: 'weather,geometry,visualization,places'
    });
}])
