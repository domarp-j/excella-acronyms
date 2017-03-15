// ====================
// Modules
// ====================
var express = require('express');
var bodyParser = require('body-parser');

var Acronym = require('./db/models/acronym')

// ====================
// App Setup
// ====================
var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// ====================
// Port
// ====================
var port = process.env.PORT || 8080;

// ====================
// API Routes
// ====================
var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'hello world!' });
});

// ====================
// Register Routes
// ====================
app.use('/api', router);

// ====================
// Run Server
// ====================
app.listen(port);
