
// call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8888;        // set our port

// ROUTES FOR OUR API
var routes = require('./routes/route');            // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8888/api)
//router.get('/', function(req, res) {
//res.json({ message: 'hooray! welcome to our api!' });   
//});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.set('superSecret', 'secret token'); // secret variable
var payload = {}
var token = jwt.sign(payload, app.get('superSecret'), {
    expiresIn: 1440 // expires in 24 hours
});

var router = routes.getRoutes(token);
// middleware to use for all requests
router.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);