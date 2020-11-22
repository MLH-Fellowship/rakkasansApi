var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var topicsRouter = require('./routes/topics');
var commentsRouter = require('./routes/comments');
var fallenRouter = require('./routes/fallen');
var dmorHmorRouter = require('./routes/dmorHmor');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/topics', topicsRouter);
app.use('/topics', topicsRouter);
app.use('/comments', commentsRouter);
app.use('/fallen', fallenRouter);
app.use('/dmorHmor', dmorHmorRouter);

module.exports = app;
