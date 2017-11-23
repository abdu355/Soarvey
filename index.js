//root file for server
const keys = require('./config/keys');
//express application
const express = require('express'); //require express library - common JS module // import express from 'express' ES2015 module not supported by Node JS
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // for getting posted objects
//-----used for creating cookies---
const cookieSession = require('cookie-session');
const passport = require('passport');
//-----used for creating cookies---

//DB models --------
require('./models/User'); //create collection - users for MongoDB
require('./models/Survey'); //contains survey + recipient model
//--------------------
require('./services/passport'); //execute the js file

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express(); //generate a new express app - used to setup route handlers

//Middleware - cookiesession and passport preprocess requests. automatically used for every request and route in our application. can also be wired for certain routes/requests in the app
app.use(bodyParser.json()); //use bodyParser Middleware - will parse the body and allow us to reference json objects in express routes
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    keys: [keys.cookieKey]
    //cookie size limit 4 KB in contrast to express-session which is unlimited
  })
);
app.use(passport.initialize()); //tell express to start passport and use it
app.use(passport.session()); //tell express it can use passport session data
//------------------

require('./routes/authRoutes')(app); //require returns a function ( we pass app as an argument) this function was exported from authRoutes.js
require('./routes/billingRoutes')(app); //pass express app to billingRoutes
require('./routes/surveyRoutes')(app);

//----------production code
if (process.env.NODE_ENV === 'production') {
  //express will serve production assets - main.js main.css
  app.use(express.static('client/build')); //look for assets in this static build directory
  //if the above fails then get index.html like so :
  //express will serve index.html if route is not recognized
  const path = require('path');
  //fallback route handler
  app.get('*', (req, res) => {
    //send the following file: 'client/build/index.html' if route is not found on express
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
//------------------------
/*
--Request types--
get : get info
put: update props
post : send info
delete: delete info
patch: update multiple props
*/
//------Heroku Deployment--------
//step 1
const PORT = process.env.PORT || 5000; //Heroku will inject env vars in Node runtime or port 5000 if Heroku port is not defined in dev mode
//step 2
//specified engines in package.json => engines object
//step 3
//start script specifies which server file to run in package.json => scripts object
//step 4
//add .gitignore to ignore syncing node_modules
app.listen(PORT); //express tells Node to listen on port of the machine
