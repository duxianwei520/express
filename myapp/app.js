var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var index = require('./routes/index')
var users = require('./routes/users')
var userInfo = require('./routes/userInfo')
var login = require('./routes/login')
var register = require('./routes/register')

// var session = require('express-session')

var session = require('client-sessions')

// 引入express
var app = express()

// 设置端口
process.env.PORT = 3001

// session基本设置
app.use(session({
  cookieName: 'token',
  secret: 'nodeDemo', // 一个随机字符串，因为客户端的数据都是不安全的，所以需要进行加密
  duration: 2 * 1000, // session的过期时间，过期了就必须重新设置
  activeDuration: 2 * 1000, // 激活时间，比如设置为30分钟，那么只要30分钟内用户有服务器的交互，那么就会被重新激活。
}));


//设置跨域访问
app.all('*', function(req, res, next) {
  // console.log(req)
  // console.log(req.headers)
  // res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  // res.header("X-Powered-By",' 3.2.1')
  // res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var endFix = '.json'
app.use('/', index)
app.use('/users', users)
app.use(`/userInfo${endFix}` , userInfo)
app.use(`/login${endFix}` , login)
app.use(`/register${endFix}` , register)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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