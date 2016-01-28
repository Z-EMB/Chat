global.rootDirectory = __dirname;

var express = require('express');
var settings = require('./server/config/ExternalSettings.js');

var app = express();

settings(app,"favicon");


app.get('/*', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000);
console.log('Listening on port 3000');

