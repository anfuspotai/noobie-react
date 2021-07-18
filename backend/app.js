require('dotenv').config();


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');
const session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require('mongoose');



mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then( () => console.log('DB connected'))
.catch((err) => console.log(err));

// setting up connect-mongodb-session store
// const mongoDBstore = new MongoDBStore({
//   uri: process.env.MONGO_URL,
//   collection: "mySessions"
// });


var apiRouter = require('./routes/api');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Express-Session
app.use(
  session({
    // name: process.env.COOKIE_NAME,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    // store: mongoDBstore,
    cookie: {
      maxAge: 10000000,
      // sameSite: false,
      secure: false
    }
  })
);

app.use('/api', apiRouter);

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
  res.json({message:'ERROR 404'});
});

module.exports = app;
