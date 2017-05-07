var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//使用user路由模块
var user = require('./routes/user');
app.use('/user', user);

//使用note路由模块
var note = require('./routes/note');
app.use('/note', note);

// catch 404 and forward to error handler
app.all('*', function (req, res) {
    res.status(404);
    res.send('resource is not found');
});

module.exports = app;
