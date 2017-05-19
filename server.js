var express = require('express');
var routes = require('./routes/mainRoute');
var routes1 = require('./routes/movieRoute');
var routes2 = require('./routes/mappingRoute');
var routes3 = require('./routes/ConfirmRoute');
var routes4 = require('./routes/auth');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');

// user schema/model
var User = require('./models/user.js');


var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/MovieBooking');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("Connected to DB");
});


app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// configure passport



app.use('/api', routes);
app.use('/myapi', routes1);
app.use('/mapapi', routes2);
app.use('/conapi', routes3);
app.use('/user', routes4);

if (app.get('env') === 'development') {
  var webpackMiddleware = require("webpack-dev-middleware");
  var webpack = require('webpack');
  var config = require('./webpack.config');
  app.use(webpackMiddleware(webpack(config), {
    publicPath: "/build",
    headers: { "X-Custom-Webpack-Header": "yes" },
    stats: {
      colors: true
    }
  }));
}

app.listen(4000,function(){
  console.log('Server is listening on port 4000');
});
