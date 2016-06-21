var logger = require('morgan'),
  cors = require('cors'),
  http = require('http'),
  express = require('express'),
  errorhandler = require('errorhandler'),
  dotenv = require('dotenv'),
  bodyParser = require('body-parser');
  config = require('./config.json');

var app = express();

dotenv.load();

// Parsers
// old version of line
// app.use(bodyParser.urlencoded());
// new version of line
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.use(function(err, req, res, next) {
  // res.header("Access-Control-Allow-Origin", "localhost:3000");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(express.logger('dev'));
  app.use(errorhandler())
}

app.use(require('./anonymous-routes'));
app.use(require('./protected-routes'));
app.use(require('./user-routes'));
app.use(require('./crud-routes'));
console.log(config);
var port = process.env.PORT || config.port;

http.createServer(app).listen(port, function(err) {
  console.log('listening in http://localhost:' + port);
});
