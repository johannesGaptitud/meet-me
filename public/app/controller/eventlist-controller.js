/**
 * Created by Zem on 2014-10-22.
 */
app.controller('EventListController', function($scope, $rootScope, $location, EventService, SessionService){

    $scope.init = function(){
        $scope.events = [];
        if(!$rootScope.photos){
            $rootScope.photos = {};
            console.log('init root');
        }
        var userId = SessionService.getUser().id;
        EventService.listUserEvents(userId, function(eventList){
            $scope.events = eventList;
        });


    }

    $scope.photoStyle = function(photoId){
        if(photoId){
            if(!$rootScope.photos[photoId]){
                $rootScope.photos[photoId] = "loading";
                EventService.getPhoto(photoId, function(photo){
                    $scope.photos[photoId] = photo.src;
                    console.log(photo.src);
                })
            }
            return "background: center no-repeat url("+$rootScope.photos[photoId]+");";
        }
    }

    $scope.goToEvent = function(){
        $location.path('/eventdetails');
    }

    $scope.init();
});