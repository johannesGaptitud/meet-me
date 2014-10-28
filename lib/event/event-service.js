/**
 * Created by Zem on 2014-10-22.
 */
var mongoose = require('mongoose');
var uuid = require('node-uuid');
var fileSystem = require('fs');
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
    savePhoto: function(srcUrl, callback){
        var imageBuffer = decodeBase64Image(srcUrl);
        var fileName = uuid.v1();
        var type = imageBuffer.type;
        var filePath = 'uploads/'+ fileName + '.' + type;
        fileSystem.writeFile(filePath, imageBuffer.data, function(err) {
            callback(err,  {url: filePath});
        });
    },
    deleteEvent: function(eventId, callback){
        this.getEvent(eventId, function(error, event){
            if(event.photo){
                fileSystem.unlinkSync(event.photo);
            }
            Event.findByIdAndRemove(eventId, callback);
        });
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

function decodeBase64Image(dataString) {

    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/), response = {};

    if (matches.length !== 3) {
        console.log('Invalid input string');
        return new Error('Invalid input string');
    }

    response.type = matches[1].split('/')[1];
    response.data = new Buffer(matches[2], 'base64');
    return response;
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

module.exports = service;