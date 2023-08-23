var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');
var logger = require('morgan');
var flash = require('connect-flash');

const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

async function connectToDb() {
  await mongoose.connect('mongodb+srv://learningNodejs:cuEz3lobPNOEP2pr@cluster0.6msjpem.mongodb.net/Twitter-Clone?retryWrites=true&w=majority');
  const PORT = 3000
  app.listen(PORT, ()=>{
      console.log(`----- listening at port ${PORT} ----- `);
  })

}
connectToDb().catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// seting dotenv configuration
require('dotenv').config()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret:'keyboard cat', saveUninitialized: true, resave: true }));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', usersRouter);

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