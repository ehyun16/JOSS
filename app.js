var express = require('express');
var cors = require('cors');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');

var index = require('./routes/index');
var register = require('./routes/register');
var login = require('./routes/login');
var mypage = require('./routes/mypage');
var findaccount = require('./routes/findaccount');
var study = require('./routes/study');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use((request,response,next)=>
{
        global.connection = mysql.createConnection({
                host:'localhost',
                port:3307,
                user:'root',
                password:'snm666666',
                database:'test'
                });
        connection.connect();
        next();
});

app.use(cors());

app.use(session({
        secret:'secret key',
        resave: false,
        saveUninitialized:true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/register', register);
app.use('/login', login);
app.use('/mypage', mypage);
app.use('/findaccount', findaccount);
app.use('/study', study);

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

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});




module.exports = app;
