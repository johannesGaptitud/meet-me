/**
 * Created by Zem on 2014-10-21.
 */
app.controller('EventController', function($scope, $location, MapService, EventService, SessionService){

    $scope.map = {
        center: {
            latitude: 0,
            longitude: 0
        },
        zoom: 13,
        gmapRef: {},
        markers: []
    };
    var acceptedTypes = {
        'image/png': true,
        'image/jpeg': true,
        'image/gif': true
    };


    $scope.createEvent = function(){
        if($scope.event.photo){
            EventService.savePhoto($scope.event.photo, function(photo){
                createEvent(photo._id);
            });
        }else{
            createEvent();
        }
    }

    function createEvent(photoId){
        var userId = SessionService.getUser().id;
        EventService.createEvent({
            user_id: userId,
            name: $scope.event.name,
            date: $scope.event.date,
            description: $scope.event.description,
            tags: $scope.event.tags,
            photo: photoId,
            location: {
                name: $scope.event.location,
                latitude: $scope.map.center.latitude,
                longitude: $scope.map.center.longitude
            }}, function(){
            $location.path('/myevents');
        });
    }

    $scope.autocompleet = function(){
        if($scope.event.location){
            MapService.getPredictionsOnQuery($scope.event.location, function(error, predictions){
                if(error) alert(error);
                $("#location").autocomplete("option", "source", predictions );
            });
        }
    }

    function addImg(img){
        var image = new Image();
        image.src = img;
        document.getElementById("filedrag").innerHTML = "";
        document.getElementById('filedrag').appendChild(image);
        $("#filedrag").addClass('uploaded');
        $("#filedrag").find("img").addClass('img-responsive');

    }

    $scope.uploadPhoto= function(){
        var f = $scope.file;
        if(acceptedTypes[f.type]){
            var r = new FileReader();
            r.onloadend = function(e){
                addImg(e.target.result);
                $scope.event.photo = e.target.result;
                console.log($scope.event.photo);
            }
            r.readAsDataURL(f);
        }else{
            alert("Only supports files of type png, jpeg or gif. Max size 0.5Mb");
        }
    }

    $scope.addTags = function(){
        if(!$scope.event.tags){
            $scope.event.tags = $scope.tagsToAdd;
        }else{
            $scope.tagsToAdd.forEach(function(tag){
                if(!$scope.event.tags.contains(tag)){
                    $scope.event.tags.push(tag);
                }
            });
        }
        $scope.tagsToAdd = [];
        $scope.tagToAdd = '';
    }

    $scope.addTag = function(tag){
        var tagToUse = tag ? tag : $scope.tagToAdd;
        if(!$scope.tagsToAdd){
            $scope.tagsToAdd = [];
        }
        if(!$scope.tagsToAdd.contains(tagToUse)){
            $scope.tagsToAdd.push(tagToUse);
        }

    }

    $scope.removeTagFromEvent = function(tag){
        $scope.event.tags.remove(tag);
    }

    $scope.removeTag = function(tag){
        $scope.tagsToAdd.remove(tag);
    }

    //TODO make these global
    Array.prototype.remove = function(v) {
        var index = this.indexOf(v) == -1 ? this.length : this.indexOf(v);
        this.splice(index, 1);
    }

    Array.prototype.contains = function(obj){
        return $.inArray(obj, this) != -1;
    }

    $scope.init = function(){
        $scope.event = {};
        MapService.getCurrentPosition(function(position){
            $scope.map.center.latitude = position.coords.latitude;
            $scope.map.center.longitude = position.coords.longitude;
        });
        MapService.getGoogleMap(function(map){
            $scope.map.gmapRef = map;
        });
        $("#location").autocomplete({
            source: [],
            close: function() {
                $scope.event.location = $("#location").val();
                MapService.addMarkOnMap({address: $scope.event.location}, $scope.map, function(error, marker){
                    if(error) alert(error);
                    $scope.map.markers.push(marker);
                });

            }
        });
        EventService.getEventTags(function(data){
            var usedTags = data.tags;
            usedTags.sort(function(a,b) { return parseFloat(b.count) - parseFloat(a.count) } );
            $scope.commonTags = [];
            for(var i=0; i < usedTags.length && i < 10; i++){
                $scope.commonTags.push(usedTags[i].tag);
            }
        });
    }

    $scope.init();
});