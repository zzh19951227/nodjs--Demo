var createError = require('http-errors');
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var mysql=require("mysql");
var session=require("express-session");

// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var home=require('./routes/route');
var menu=require('./routes/menu');
var employee=require('./routes/employeeManagement');
var menuManage=require('./routes/menuManagement');

var app = express();



// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');


app.set('view engine', 'html');
app.engine(".html",ejs.renderFile);
app.set('views', path.join(__dirname, 'views'));

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(session({
    name:"root",
    secret:"root",
    resave:false,
    saveUninitialized:false
}));
app.use(express.urlencoded({ extended: false }));
app.use(function(req,res,next){ 
	var url = req.originalUrl; 
	if(url != "/login" && url !="/checkout" && !req.session.username ){ 
		return res.redirect("/login"); 
	} 
	next(); 
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home',home);
app.use('/employeeHome',menu);
app.use('/employeeManagement',employee);
app.use('/menuManagement',menuManage);



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
