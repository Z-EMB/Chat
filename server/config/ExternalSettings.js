module.exports = loadSettings

function loadDefaultFavicon(app){
    var favicon = require('serve-favicon');
    app.use(favicon(global.rootDirectory +'/public/resources/favicon.png'));
};


function loadSettings(app,settingType){
    "use strict";
    switch(settingType) {
        case "favicon":loadDefaultFavicon(app);
            break;
    }
}

