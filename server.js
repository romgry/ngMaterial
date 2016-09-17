var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://');

var routes = require('./routes/index');
var api = require('./routes/api');

var app = express();
//var router = express.Router();   




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');




//db connections
// MongoDB via Mongoose
var db = mongoose.connection;
db.on('connecting', function() {
    log.info('MongoDB connecting...');
});
db.on('error', function(error) {
    log.error('MongoDB connection error: ' + error);
    mongoose.disconnect();
});
db.on('connected', function() {
    log.info('MongoDB connected to: mongodb://%s:%s/%s', db.host, db.port, db.name);
});
db.once('open', function() {
    log.info('MongoDB connection opened');
});
db.on('reconnected', function () {
    log.info('MongoDB reconnected');
});
db.on('disconnected', function() {
    log.error('MongoDB disconnected !');
    //mongoose.connect(models.MONGODB_SERVER, models.MONGODB_SERVER_OPTIONS);
});
//mongoose.connect(models.MONGODB_SERVER, models.MONGODB_SERVER_OPTIONS);

//load models
var Marina = require('./backend/models/marina');




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());




// Routes
app.use(express.static(path.join(__dirname, 'client')));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/build', express.static(__dirname + '/build'));
app.use('/vendor', express.static(__dirname + '/vendor'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/bower', express.static(__dirname + '/bower_components'));
app.use('/src', express.static(__dirname + '/src'));
app.use('/html', express.static(__dirname + '/html'));
app.use('/components', express.static(__dirname + '/components'));


//app.use('/api', router);
app.use('/', routes);
app.use('/api', api);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//app.listen(port);
//console.log('Magic happens on port ' + port);


module.exports = app;
