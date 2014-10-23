/**
 * Created by Zem on 2014-10-22.
 */
app.service('EventService', function($http){

    this.createEvent = function(event, callback){
        $http.post('/event/create', {event: event}).success(callback);
    }

    this.listEvents = function(callback){
        $http.get('/event/list').success(callback);
    }

    this.listUserEvents = function(userId, callback){
        $http.get('/event/userlist',{
            params: {
                userId: userId
        }
        }).success(callback);
    }

    this.getEventTags = function(callback){
        $http.get('/event/tags').success(callback);
    }
});