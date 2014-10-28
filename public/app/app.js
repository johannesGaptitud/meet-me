/**
 * Created by Zem on 2014-10-21.
 */
var app = angular.module('MeetMeWebApp',['ngRoute', 'google-maps'.ns(), 'facebook']);

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
        when('/eventdetails/:param/:u', {
            templateUrl: '/views/event-details-edit.html',
            controller: 'EventDetailsController'
        }).
        when('/eventdetails/:param', {
            templateUrl: '/views/event-details.html',
            controller: 'EventDetailsController'
        }).
        otherwise({
            redirectTo: '/home'
        });
}]);

app.config(function(FacebookProvider) {
    // Set your appId through the setAppId method or
    // use the shortcut in the initialize method directly.
    FacebookProvider.init('1498696873736123');
})


app.run( function($rootScope, $location, SessionService) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if(next.params.u){
            var userid = SessionService.getUser().id;
            if(next.templateUrl == '/views/event-details-edit.html' && userid != next.params.u){
                next.templateUrl = '/views/event-details.html';
            }
            $location.path('/eventdetails/'+ next.params.param);
        }

    });
});

app.config(['GoogleMapApiProvider'.ns(), function (GoogleMapApi) {
    GoogleMapApi.configure({
        key: 'AIzaSyBS5asJJWOEQLIr3K7vj_8LWd0tmmgqlhQ',
        v: '3.17',
        libraries: 'weather,geometry,visualization,places'
    });
}])

