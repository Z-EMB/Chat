module.exports = function(app, express) {
    var bodyParser = require('body-parser');

    // serve frontend from /public -- / automatically hits index.html
    app.use(express.static('public'));

    // parse JSON from incoming requests
    app.use(bodyParser.json());

    // TODO: API routes

    // handle 404
    app.use(function(req, res) {
        res.status(404);
        // TODO: 404 page
    });

    // handle 500
    app.use(function(error, req, res, next) {
        res.status(500);
        // TODO: 500 page
    });
};