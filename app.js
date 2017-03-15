// ====================
// Modules
// ====================
var express = require('express');
var bodyParser = require('body-parser');

var db = require('./db/connection');

var Acronym = require('./db/models/acronym');

// ====================
// App Setup
// ====================
var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// ====================
// Port Setup
// ====================
var port = process.env.PORT || 8080;

// ====================
// API Routes
// ====================
var router = express.Router();

router.get('/', function(request, response) {
  response.json({ message: 'Welcome to the Excella Acronyms API!' });
});

router.route('/acronyms')
  .get(function(request, response) {
    Acronym.find(function(error, acronyms) {
      if (error) response.send(error);
      response.json(acronyms);
    })
  })

  .post(function(request, response) {
    var acronym = new Acronym();

    if (!request.body.name || !request.body.meaning) {
      response.send({ message: 'Invalid parameters for acronym name and/or meaning' });
      return;
    }

    acronym.name = request.body.name;
    acronym.meaning = request.body.meaning;

    acronym.save(function(error) {
      if (error) response.send(error);
      response.json({ message: 'Added new acronym to the database' });
    });
  });

// ====================
// Register Routes
// ====================
app.use('/', router);

// ====================
// Run Server
// ====================
app.listen(port);
