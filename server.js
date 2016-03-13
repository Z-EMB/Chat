global.root = __dirname;

// import express
var express = require('express');

// init app
var app = express();

// http server and sockets
var server = require('http').Server(app);
var io = require('socket.io')(http);

// chat functionality
require(global.controllers + '/chatController.js')(io);

// import config manager
var settings = require(global.root + '/server/config/ExternalSettings.js');

var PORT = 8080;

// config
settings("favicon",app);
settings("paths");

// routing and middleware
require(global.controllers + '/mainController.js')(app, express);

server.listen(PORT, function() {
    console.log('Chat listening on port ' + PORT);
});
