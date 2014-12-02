/**
 * Module dependencies
 */

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var morgan = require('morgan');
var methodOverride = require('method-override');
var Firebase = require('firebase');
var Q = require('q');
var _ = require('underscore');

var app = module.exports = express();

console.log("NODE_ENV: " + process.env.NODE_ENV);

// HOW TO SETUP SSL IN NODE: http://stackoverflow.com/questions/11567217/unable-to-setup-https-in-express-js


var DB_URL = 'https://countainer.firebaseio.com/';

var myRootRef = new Firebase(DB_URL);
var categoriesRef = myRootRef.child('categories');
var releasesRef = myRootRef.child('releases');
var usersRef = myRootRef.child('users');

// login to firebase
myRootRef.auth("neSZtXrVOHBha4XlHwfjeI0IOEbXYsiwbN2ZNMeG", function(error) {
  if(error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Login Succeeded!");
  }
});


var CategoriesModel = null;

app.set('port', process.env.PORT || 3003);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());

app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'http') {
    return res.redirect(301, 'https://' + req.headers.host + '/');
  } else {
    return next();
  }
});



/**
 * Configuration
 */


// serve index and view partials


app.get('/debug', function (req, res) {
  res.render('index_debug');
});


app.get('/', function (req, res) {
  res.render('index');
});

app.get('/partials/:name', function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
});

  

// REST

app.get('/api/v0/categories', function(req, res) {

  getCountainerCategories()
    .then(function(data) {
      res.json(data);  
    })

  
});

app.get('/api/v0/releases', function(req, res) {

  getCountainerCategories()
    .then(getCountainerReleases)
    .then(function(data) {
      res.json(data);  
    })

  
});

app.get('/api/v0/releases/:id', function(req, res) {

  getCountainerCategories()
    .then(function(data) {
      return getDetailedCounterFromId(req.params.id)
    })
    .then(function(data) {
      res.json(data);  
    })

  
});



app.post('/api/v0/releases', function(req, res) {
  if(
      _.has(req.body,'name') &&
      _.has(req.body,'date') &&
      _.has(req.body,'category')
    ) {

    var newReleaseRef = releasesRef.push({
      name: req.body.name, 
      category:req.body.category,
      date: req.body.date
    })
    res.json(201, {created: newReleaseRef.name()})
  } else {
    res.json(400, {error: 'parameter missing'})
  }
});




app.post('/api/v0/users', function(req, res) {
  if(_.has(req.body,'name')) {
    var newUserRef = usersRef.push({
      name: req.body.name
    })
    res.json(201, {created: newUserRef.name()})
  } else {
    res.json(400, {error: 'parameter missing'})
  }
});




// privates

function getCountainerCategories() {
  var deferred = Q.defer();

  if(CategoriesModel !== null) {
    deferred.resolve(CategoriesModel)
    return deferred.promise;
  }

  // only fetch if categories are still null
  categoriesRef.once(
    'value', 
    function onSuccess(categoriesSnapshot) {
      CategoriesModel = categoriesSnapshot.val();
      deferred.resolve(CategoriesModel); 
    },
    function onError(errorData) {
      CategoriesModel = null;
      deferred.reject(errorData);
    }
  );

  return deferred.promise;
}

function getCountainerReleases() {
  var deferred = Q.defer();

  releasesRef.once(
    'value', 
    function onSuccess(releaseData) {
      var rlsData = releaseData.val();
      var result = []; // this will be the "fresh" array that will be filled with the releaes
      _.each(rlsData, function(releaseItem, keyName) {
        releaseItem.id = keyName;
        releaseItem.category = _.findWhere(CategoriesModel, {id: releaseItem.category});
        result.push(releaseItem);
      });
      deferred.resolve(result); 
    },
    function onError(errorData) {
      deferred.reject(errorData);
    }
  );

  return deferred.promise;
}

function getDetailedCounterFromId(id) {
  var deferred = Q.defer();

  releasesRef.child(id).once(
    'value', 
    function onSuccess(releaseData) {
      var rlsData = releaseData.val();

      rlsData.category = _.findWhere(CategoriesModel, {id: rlsData.category});
      deferred.resolve(rlsData); 
    },
    function onError(errorData) {
      deferred.reject(errorData);
    }
  );

  return deferred.promise;
}

startApp();


function startApp () {
  app.listen(app.get('port'), function () {
    console.log('[\x1b[34mexpress\x1b[0m] server listening on port %d in %s mode', app.get('port'), app.get('env'));
  });
}

