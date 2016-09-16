var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_qcn57j1p:ppu6jlegk81midn7fev9mjbj0g@ds033036.mlab.com:33036/heroku_qcn57j1p')

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
    mongoose.connect(models.MONGODB_SERVER, models.MONGODB_SERVER_OPTIONS);
});
mongoose.connect(models.MONGODB_SERVER, models.MONGODB_SERVER_OPTIONS);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
