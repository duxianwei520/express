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
  duration: 10 * 1000, // session的过期时间，过期了就必须重新设置
  activeDuration: 10 * 1000, // 激活时间，比如设置为30分钟，那么只要30分钟内用户有服务器的交互，那么就会被重新激活。
}));


//设置跨域访问
/* 
  如果客户端在请求头的header里面不做任何设置，也就是整个请求是简单请求的话，
  那么服务端设置Access-Control-Allow-Origin的值为*号即可，
  但如果客户端设置允许客户端上传cookie的设置，比如credentials: 'include'，
  那么服务端的Access-Control-Allow-Credentials的值必须是true，否则不成功；

  如果客户端在请求头，也就是headers里面加入了自定义的字段，比如headers是
  headers: {
    Authorization_token: '111',
    Authorization_key: '222',
  },
  或者定义了Content-Type之类的，那么对浏览器来说这就是个复杂请求了，返回头就需要修改设置，
  比如Access-Control-Allow-Origin的值不能是*，而应该是req.headers.origin或者特定的域，
  Access-Control-Allow-Headers字段必须设置且应该跟客户端的headers的设置保持一致（注意不能为*）
  比如我们这里客户端在请求头里设置的是Authorization_token字段，客户端服务端必须保持一致，
  Access-Control-Allow-Methods字段必须包含options浏览器预检的请求方式，比如我们这里就是允许
  options更post还有get，
  还有一个字段设置很重要，Access-Control-Max-Age，如果不设置，那么浏览器复杂请求每次都会进行options预检
  的操作，这样还是挺恶心的，于是这里我们这是了数值是172800，也就是在两天内，当前客户端的请求除了第一次会发送options
  进行预检之后，其他的请求都不会发送options了
*/
app.all('*', function(req, res, next) {
  
  // res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  // res.header("Access-Control-Allow-Headers", "Authorization_token, Authorization_key, Content-type");
  // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  // res.header("Access-Control-Max-Age", "172800")
  // res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
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