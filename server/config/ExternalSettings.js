module.exports = loadSettings

function loadDefaultFavicon(app){
    var favicon = require('serve-favicon');
    app.use(favicon(global.rootDirectory +'/public/resources/favicon.png'));
};


function loadSettings(app,settingType){
    "use strict";
    if(settingType==="favicon"){
        loadDefaultFavicon(app);
    }
}

