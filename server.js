global.rootDirectory = __dirname;

var express = require('express');
var settings = require('./server/config/ExternalSettings.js');

var app = express();
var PORT = 8080;

settings(app,"favicon");

// routing
require('./server/controllers/main.js')(app, express);

var server = app.listen(PORT, '0.0.0.0', function() {
    console.log('Chat listening on port ' + PORT);
});

