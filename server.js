var express = require('express');
var favicon = require('serve-favicon');
var app = express();

app.use(favicon(__dirname+'/public/resources/favicon.png'));
app.get('/*', function (req, res) {
    res.send('Hello World!');
});

app.listen(3001);
console.log('Listening on port 3001');

