module.exports = loadSettings;

function loadDefaultFavicon(app){
    var favicon = require('serve-favicon');
    app.use(favicon(global.root +'/public/resources/favicon.png'));
}

function setUpPaths(){
    global.backend = global.root + '/server';
    global.models = global.backend + '/models';
    global.controllers = global.backend + '/controllers';
    global.views = global.backend + '/views';
    global.config = global.backend + '/config';
    global.userFiles = 'public/files/';
}

function loadSettings(app){
    "use strict";
    loadDefaultFavicon(app);
    setUpPaths();
}

