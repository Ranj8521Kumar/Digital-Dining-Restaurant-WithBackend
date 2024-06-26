var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // Correctly require express-session
var passport = require('passport'); // Require passport
const flash = require("connect-flash");//for using connect flash

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views', "pages"));
app.set('view engine', 'ejs');

app.use(flash());//for using connect flash

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "bkhbjdsbhcbhdsckjsdkchdsck",
}));
app.use(passport.initialize()); // Correctly initialize Passport
app.use(passport.session());

// Assuming serializeUser and deserializeUser functions are defined in usersRouter
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser()); // Correct the spelling

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
