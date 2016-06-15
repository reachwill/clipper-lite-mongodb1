var express = require('express'),
  _ = require('lodash'),
  config = require('./config'),
  jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var app = module.exports = express.Router();




var GroupSchema = mongoose.Schema({
  groupId:Number,
  read:Boolean,
  write:Boolean
});

var AnnotationSchema = mongoose.Schema({
  title:String,
  text:String,
  time:Number,
  priveleges:[
    //{groups:[GroupSchema]}
  ]
});

var ClipSchema = mongoose.Schema({
  title:String,
  decsription:String,
  vidUrl: String,
  start:Number,
  end:Number,
  annotations:[AnnotationSchema]
});

var CliplistSchema=mongoose.Schema({
  title:String,
  description:String,
  clips:[ClipSchema]
});

var ProjectSchema =mongoose.Schema({
  title: String,
  description:String,
  cliplists:[CliplistSchema]
});




var projectSchema = mongoose.Schema({
  projects:Array
});




var Project = mongoose.model('Project', projectSchema);



app.post('/clip/save', function(req, res) {

  if (!req.body.vidUrl) {
    return res.status(400).send("Load a video");
  }

  //WG: connect to mongodb

  mongoose.connect(config.dbConnector+config.clipsCollection);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('were connected');
  });


return;
  //User.collection.remove() //use to clear collection during dev

  //    check user does not exist
  var found = false; //boolean flag
  var username = req.body.username;

  User.count({
    name: username
  }, function(err, c) {
    if (err) return console.error(err);
    found = c > 0; //true or false

    if (!found) {
      //new user to be signed up
      var tempUser = new User({
        name: username,
        password: req.body.password, //needs bCrypting
        date: new Date()
      });
      //save to collection
      tempUser.save(function(err, tempUser) {
        if (err) return console.error(err);
        //create profile object for jwt
        var profile = {
          username: username,
          password: req.body.password
        };
        profile.id = new Date().getTime(); //ensure unique id for token
        //send back response with newly created token
        res.status(201).send({
          id_token: createToken(profile)
        });

        //retrieve list of all users for testing during dev
        User.find(function(err, users) {
          if (err) return console.error(err);
          console.log(users);
          //close the db connection
          mongoose.connection.close(); //need to move this out of this testing function at production stage
        })

      });
    } else {
      return res.status(400).send("A user with that username already exists");
    }

  });


});

app.post('/sessions/create', function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  //WG: connect to mongodb

  mongoose.connect(config.dbConnector);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('were connected');
  });


  //find if user matches username/password
  User.find({
    name: req.body.username,
    password: req.body.password
  }, function(err, users) {
    if (err) return console.error(err);
    //if results less than 1 then no matches
    if (users.length < 1) {
      return res.status(401).send("The username or password don't match");
    } else {
      //user found so send back token with response
      res.status(201).send({
        id_token: createToken(users[0])
      });
    }
    //close the db connection
    mongoose.connection.close();
  })

});
