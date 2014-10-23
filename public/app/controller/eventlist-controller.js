/**
 * Created by Zem on 2014-10-22.
 */
app.controller('EventListController', function($scope, $location, EventService, SessionService){

    $scope.init = function(){
        $scope.events = [];
        var userId = SessionService.getUser().id;
        EventService.listUserEvents(userId, function(eventList){
            $scope.events = eventList;
        });
    }

    $scope.photoStyle = function(photo){
        if(photo){
            return "background: center no-repeat url("+photo+");";
        }
    }

    $scope.goToEvent = function(){
        $location.path('/eventdetails');
    }

    $scope.init();
});