global.root = __dirname;

var express = require('express');
var bodyParser = require('body-parser');
var settings = require(global.root + '/server/config/ExternalSettings.js');

var app = express();
var PORT = 8080;

settings("favicon",app);
settings("paths");

// part of express
app.use(bodyParser.json());

// routing
require(global.controllers + '/RouteRegistration.js')(app, express);

var server = app.listen(PORT, '0.0.0.0', function() {
    console.log('Chat listening on port ' + PORT);
});

