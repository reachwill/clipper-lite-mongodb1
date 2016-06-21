var express = require('express'),
    _ = require('lodash'),
    config = require('./config'),
    jwt = require('jsonwebtoken');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var app = module.exports = express.Router();


var ClipSchema = new Schema({
    "@context": String,
    "id": String,
    "type": String,
    "motivation": String,
    "body": String,
    "target": Object,
    "clipperNativeProps": Object
});

var Clip = mongoose.model('Clip', ClipSchema);

app.post('/clip/save', function(req, res) {

    if (!req.body.username) {
        return res.status(400).send("No username!");
    } else {

        //  Clip.collection.remove() //use to clear collection during dev

        var tempClip = new Clip({
            "@context": "http://www.w3.org/ns/anno.jsonld",
            "id": "http://clippertube.com/clip/" + new Date().getTime(),
            "type": "Annotation",
            "motivation": "bookmarking",
            "body": "",
            "target": {
                "source": req.body.vidUrl,
                "format": "video/youtube",
                "type": "Video",
                "selector": {
                    "type": "FragmentSelector",
                    "conformsTo": "http://www.w3.org/TR/media-frags/",
                    "value": "t=" + req.body.start + "," + req.body.end + ""
                }
            },
            "clipperNativeProps": {
                vidUrl: req.body.vidUrl,
                start: req.body.start,
                end: req.body.end,
                shareUrl: req.body.shareUrl,
                userId: req.body.userId
            }
        });

        mongoose.connect(config.dbConnector + config.clipsCollection);

        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            //console.log('were connected');
            tempClip.save(function(err, tempClip) {
                if (err) return console.error(err);

                //send back response with newly created clip
                //res.status(201).send(JSON.stringify(tempClip));

                //retrieve list of all clips for testing during dev
                Clip.find({
                    'clipperNativeProps.userId': req.body.userId
                }, function(err, clips) {
                    if (err) return console.error(err);
                    //send back response with newly created clip
                    res.status(201).send(JSON.stringify(clips));


                    for (var i = 0; i < clips.length; i++) {
                        console.log(clips[i]);
                    }
                    mongoose.connection.close(); //need to move this out of this testing function at production stage
                });

            });
        });
    }


});



app.post('/savedClips', function(req, res) {

    if (!req.body.username) {
        return res.status(400).send("No username!");
    } else {



        mongoose.connect(config.dbConnector + config.clipsCollection);

        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            //retrieve list of all clips for testing during dev
            Clip.find({
                'clipperNativeProps.userId': req.body.userId
            }, function(err, clips) {
                if (err) return console.error(err);
                //send back response with newly created clip
                res.status(201).send(JSON.stringify(clips));

                //
                // for (var i = 0; i < clips.length; i++) {
                //     console.log(clips[i]);
                // }
                mongoose.connection.close(); //need to move this out of this testing function at production stage
            });
        });
    }


});
