var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.set('trust proxy', true);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res){
  res.send("Home!");
});

app.get('/data', function(req,res){
  res.send('<div class="container"><form class="form-horizontal" id="login_form" action="https://pcs-fake-site.herokuapp.com/data" method="POST"><div class="form-group"><div class="col-xs-offset-4 col-xs-4 text-center"><h2>Login to Your Account</h2></div></div><div class="form-group"><div class="col-xs-offset-4 col-xs-4"><input type="text" name="username" class="form-control authen_form" id="user" placeholder="Username"></div>	</div><div class="form-group"><div class="col-xs-offset-4 col-xs-4"><input type="password" name="password" class="form-control authen_form" id="pass" placeholder="Password"></div>	</div><div class="form-group"><div class="col-xs-offset-4 col-xs-4"><button type="submit" class="form-control btn btn-primary">Login</button></div></div></form></div>');
});

app.post('/data', function(req,res){
  const ret = {};
  const username = req.body.username;
  const password = req.body.password;
  let ip = req.headers["x-forwarded-for"];
  if (ip){
    const list = ip.split(",");
    ip = list[list.length-1];
  } else {
    ip = req.connection.remoteAddress;
  }
  ret.username = username;
  ret.password = password;
  ret.ip = ip;
  res.json(ret);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});


module.exports = app;
