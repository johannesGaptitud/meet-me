/**
 * Created by Zem on 2014-10-22.
 */
app.service('MapService', ['GoogleMapApi'.ns(), 'IsReady'.ns(), function(GoogleMapApi, IsReady){

    var autocompleteService, geocoder;
    GoogleMapApi.then(function() {
        console.log("create");
        autocompleteService = new google.maps.places.AutocompleteService();
        geocoder = new google.maps.Geocoder();
    });

    this.getCurrentPosition = function(callback){
        navigator.geolocation.getCurrentPosition(callback);
    }

    this.getGoogleMap = function(callback){
        IsReady.promise(1).then(function (instances) {
            instances.forEach(function(inst){
                var map = inst.map;
                callback(map);
            });
        });
    }

    this.getPredictionsOnQuery = function(query, callback){

        autocompleteService.getQueryPredictions({ input: query }, function(predictions, status){
            var error;
            var availablePrediction= [];
            if (status != google.maps.places.PlacesServiceStatus.OK) {
                error = status;
            }
            else{
                for (var i = 0, prediction; prediction = predictions[i]; i++) {
                    availablePrediction.push(prediction.description);
                }
            }
            callback(error, availablePrediction);
        });
    }

    this.addMarkOnMap = function(possition, map, callback){
        if(possition.address){
            geocoder.geocode( { 'address': possition.address}, function(results, status) {
                var error, marker;
                if (status == google.maps.GeocoderStatus.OK) {
                    map.center.longitude = results[0].geometry.location.B;
                    map.center.latitude = results[0].geometry.location.k;
                    var myLatlng = new google.maps.LatLng(map.center.latitude,map.center.longitude);
                    marker = new google.maps.Marker({position: myLatlng});
                    marker.setMap(map.gmapRef);
                } else {
                    error = status;
                }
                callback(error, marker);
            });
        }
    }

}]);