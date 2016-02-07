global.root = __dirname;
global.backend = global.root + '/server';
global.models = global.backend + '/models';
global.controllers = global.backend + '/controllers';
global.views = global.backend + '/views';
global.config = global.backend + '/config';

var express = require('express');
var settings = require(global.config + '/ExternalSettings.js');

var app = express();
var PORT = 8080;

settings(app,"favicon");

// routing
require(global.controllers + '/main.js')(app, express);

var server = app.listen(PORT, '0.0.0.0', function() {
    console.log('Chat listening on port ' + PORT);
});

