global.root = __dirname;

// import express
var express = require('express');

// init app
var app = express();

// config
var settings = require(global.root + '/server/config/ExternalSettings.js')(app);

// http server and sockets
var server = require('http').Server(app);
var io = require('socket.io')(server);

// chat functionality
require(global.controllers + '/chatController.js')(io);

var PORT = 80;


// routing and middleware
require(global.controllers + '/mainController.js')(app, express);

server.listen(PORT,"0.0.0.0",  function() {
    console.log('Chat listening on port ' + PORT);
});
