/**
 * Created by Zem on 2014-10-27.
 */
app.controller('EventDetailsController', function($scope, $routeParams,  $location, MapService, EventService, SessionService) {

    $scope.map = {
        center: {
            latitude: 0,
            longitude: 0
        },
        zoom: 13,
        gmapRef: {},
        markers: []
    };

    $scope.removeEvent = function(){
        EventService.removeEvent($scope.event._id, function(){
            $location.path('/myevents');
        });
    }

    $scope.init = function(){
        EventService.getEvent($routeParams.param, function(event){
            $scope.event = event;
            if(event.photo){
                $scope.headerImg =  "background: center no-repeat url("+event.photo+"); border-radius: 4px;";
            }
            MapService.getGoogleMap(function(map){
                $scope.map.gmapRef = map;
                MapService.addMarkOnMap(event.location, $scope.map, function(error, marker){
                    if(error) alert(error);
                    $scope.map.markers.push(marker);
                });
            });

        });
        $("#editlocation").autocomplete({
            source: [],
            close: function() {
                $scope.event.location.name = $("#editlocation").val();
                MapService.addMarkOnMap({address: $scope.event.location.name}, $scope.map, function(error, marker){
                    if(error) alert(error);
                    $scope.map.markers.push(marker);
                });

            }
        });
        $scope.editProperties = {};
    }

    $scope.autocompleet = function() {
        if ($scope.event.location.name) {
            MapService.getPredictionsOnQuery($scope.event.location.name, function (error, predictions) {
                if (error) alert(error);
                $("#editlocation").autocomplete("option", "source", predictions);
            });
        }
    }

    $scope.init();
});