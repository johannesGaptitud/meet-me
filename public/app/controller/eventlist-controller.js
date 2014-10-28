/**
 * Created by Zem on 2014-10-22.
 */
app.controller('EventListController', function($scope, $rootScope, $location, EventService, SessionService){

    $scope.init = function(){
        $scope.events = [];
        var userId = SessionService.getUser().id;
        EventService.listUserEvents(userId, function(eventList){
            $scope.events = eventList;
        });


    }

    $scope.photoStyle = function(photoUrl){
        if(photoUrl){
            return "background: center no-repeat url("+photoUrl+");";
        }
    }

    $scope.goToEvent = function(event){
        $location.path('/eventdetails/'+ event._id +'/' +SessionService.getUser().id);
    }

    $scope.init();
});