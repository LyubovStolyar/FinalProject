
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/itemsRouter');
var favoritesRouter = require('./routes/favRouter');
const headers = require('./middleware/headers');

var app = express();

app.use(logger('dev'));
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({ limit: '25mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(headers);
app.use('/users', usersRouter);
app.use('/addItem', itemsRouter);

app.use('/homepage/fav', favoritesRouter);
app.use('/homepage', itemsRouter);
app.use('/login', indexRouter);
app.use('/', indexRouter);

module.exports = app;
