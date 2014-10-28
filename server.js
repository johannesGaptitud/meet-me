/**
 * Created by Zem on 2014-10-21.
 */
/**
 * Created by Zem on 2014-10-10.
 */
// set up ========================
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var userService = require('./lib/user/user-service-adapter');
var eventService = require('./lib/event/event-service');
var tagService = require('./lib/event/tag-service');


// configuration =================


mongoose.connect('mongodb://meetme:pppingla@ds063889.mongolab.com:63889/meetmedb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('Database connected');
});


app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/uploads',  express.static(__dirname + '/uploads'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.set('port', (process.env.PORT || 8080));

// start app ======================================
app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
});

app.get('/event/list', function(req, res){
    eventService.listEvents(function(error, events){
        if(error){
            console.log(error);
            res.send(error);
        }else{
            res.json(events);
        }
    })
});

app.post('/event/savephoto', function(req, res){
    eventService.savePhoto(req.body.src, function(error, photo){
        if(error){
            console.log(error);
            res.send(error);
        }else{
            res.json(photo);
        }
    });
});

app.get('/event/userlist', function(req, res){
    eventService.listUserEvents(req.param('userId'), function(error, events){
        if(error){
            console.log(error);
            res.send(error);
        }else{
            res.json(events);
        }
    })
});

app.post('/event/create', function(req, res){
    eventService.createEvent(req.body.event, function(error, event){
        if(error){
            console.log(error);
            res.send(error);
        }else{
            res.json(event);
        }
    });
    tagService.updateTags(req.body.event.tags, function(error, data){
        if(error){
            console.log(error);
        }
    });
});

app.get('/event/details', function(req, res){
    eventService.getEvent(req.param('eventId'), function(error, event){
        if(error){
            console.log(error);
            res.send(error);
        }else{
            res.json(event);
        }
    });
});

app.get('/event/remove', function(req, res){
    eventService.deleteEvent(req.param('eventId'), function(error){
        if(error){
            console.log(error);
        }
        res.send(error);
    });
});

app.get('/event/tags', function(req, res){
    tagService.getTags(function(error, tags){
        if(error){
            console.log(error);
            res.send(error);
        }else{
            res.json(tags);
        }
    })
});

app.get('/user/create', function(req, res){
    userService.create(req, res);
});

app.get('/user/auth', function(req, res){
    userService.auth(req, res);
});

var Error = function(text){
    return {error : text};
}


app.get('*', function(req, res) {
    res.sendfile(__dirname +'/public/index.html');
});

