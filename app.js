const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const dbConnection = require('./db/dbConnection.js');

var app = express();

app.use(session({
  key : 'sid', 
  secret: 'secretkey', // env에 넣자 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: false ,maxAge: new Date(Date.now() + 3600000) },
  //store: new FileStore()
}));

const passport = require('./modules/passport.js')(app);
const indexRouter = require('./routes/index');
const carouselRouter = require('./routes/carousel');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/carousel', carouselRouter);
app.use('/signin', authRouter);
app.use('/admin',adminRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
