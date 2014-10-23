/**
 * Created by Zem on 2014-10-23.
 */
var mongoose = require('mongoose');
ObjectId = mongoose.Types.ObjectId;

var service = {
    updateTags: function(tags, callback){
        if(!tags || tags.length == 0){
            callback();
        }
        else{
            this.getTags(function(error, savedTags){
                if(error){
                    callback(error);
                }else if(savedTags){
                    tags.forEach(function(tag){
                        var index = indexOfTag(savedTags.tags, tag);
                        if(index == -1){
                            savedTags.tags.push(mapTag(tag, 0));
                        }else{
                            var currentCount = savedTags.tags[index].count;
                            savedTags.tags[index].count = currentCount + 1;
                        }
                    });
                    var upsertData = savedTags.toObject();
                    delete upsertData._id;
                    Tags.update({_id: savedTags.id}, upsertData, {upsert: true}, callback);
                }else{
                    var tagsObj = new Tags({tags: mapNewTags(tags)});
                    tagsObj.save(callback);
                }
            });
        }
    },
    getTags: function(callback){
        Tags.find(function(error, tags){
            if(tags && tags.length != 0){
                callback(error, tags[0]);
            }else{
                callback(error);
            }
        });
    }

}

function indexOfTag(dbTags, tag){
    var index = -1;
    for(var i=0; i<dbTags.length; i++){
        if(dbTags[i].tag == tag){
            index = i;
        }
    }
    return index;
}

function mapNewTags(tags){
    var result = [];
    tags.forEach(function(tag){
        result.push(mapTag(tag, 0));
    });
    return result;
}

function mapTag(tag, count){
    return {tag: tag, count: count};
}

var Tags =  mongoose.model('Tags',{
    tags: []
});

module.exports = service;