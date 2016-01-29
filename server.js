global.rootDirectory = __dirname;

var express = require('express');
var settings = require('./server/config/ExternalSettings.js');

var app = express();

settings(app,"favicon");

app.use(express.static(__dirname + '/public'));

app.get('/*', function (req, res) {
    res.sendFile(__dirname+'/public/views/index.html');
});

app.listen(3000);
console.log('Listening on port 3000');

