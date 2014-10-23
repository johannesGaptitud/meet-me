/**
 * Created by Zem on 2014-10-22.
 */
var mongoose = require('mongoose');
ObjectId = mongoose.Types.ObjectId;

var service = {
    createEvent: function(eventdata, callback){
        var event = new Event(eventdata);
        event.save(callback);
    },
    listEvents: function(callback){
        Event.find(callback);
    },
    listUserEvents: function(userId, callback){
        Event.find({ user_id: userId }, callback);
    },
    getPhoto: function(photoId, callback){
        Photo.find({ _id: ObjectId.fromString(photoId) }, function(error, events){
            if(events && events.length != 0){
                callback(error, events[0]);
            }else{
                callback(error);
            }
        });
    },
    savePhoto: function(src, callback){
        var photo = new Photo({src: src});
        photo.save(callback);
    },
    getEvent: function(eventid, callback){
        Event.find({ _id: ObjectId.fromString(eventid) }, function(error, events){
            if(events && events.length != 0){
                callback(error, events[0]);
            }else{
                callback(error);
            }
        });
    }

}

var Event =  mongoose.model('Event',{
    user_id: String,
    name: String,
    date: String,
    description: String,
    tags: [String],
    photo: String,
    location: {
        name: String,
        latitude: Number,
        longitude: Number
    }
});

var Photo = mongoose.model('Photo',{
    src: String
});

module.exports = service;