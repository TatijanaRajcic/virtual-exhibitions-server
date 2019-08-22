const express = require("express");
const mongoose = require('mongoose');
var cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

var session    = require("express-session");
const MongoStore = require('connect-mongo')(session);

const createError = require('http-errors')

const app = express()

require('dotenv').config()

// Connection to the database "exhibitionApp"
mongoose.connect(process.env.DB, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// Seting up cors
app.use(cors({
  origin: true,
  credentials: true
}));

// configuring express session with MongoStore so that I keep my session even when I restart the server
app.use(session({
  secret: 'super secret',
  cookie: { maxAge: 600000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60
  }),
  resave: false,
  saveUninitialized: true
 }))

// protecting routes
function protect(req,res,next){
  // debugger
  if(!req.session.user) {
      next(createError(403));
  } else {
      next();
  }
}

// setting up cookie parser
app.use(cookieParser());

// Enables us to send back data to the Client side, in a json format
app.use(express.json());

// Setting up bodyparser
app.use(bodyParser.urlencoded({ extended: false }))

// users' routes
app.use('/login', require('./routes/auth/login'));
app.use('/signup', require('./routes/auth/signup'));
app.use('/logout', require('./routes/auth/logout'));
app.use("/index", require("./routes/exhibition/index"))
app.use("/exhibition", protect, require("./routes/exhibition/exhibition"));

// Establish connection
app.listen(process.env.PORT, () => console.log("My Exhibition project is running"));

// Error handling
app.use(function (err, req, res, next) {
  debugger
  if (err) {
    res.status(err.status || 500).json({message: err.message})
  } else {
    res.status(500).json({message: "Something went wrong."})
  }
})

// Setting up for deployment
app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
});

// Exporting the app
module.exports = app;