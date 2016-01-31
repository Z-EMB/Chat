module.exports = function(app, express) {
    // serve frontend from /public -- / automatically hits index.html
    app.use(express.static('public'));

    // chat API routes go here, this one is just an example
    app.post('/message', function(req, res) {
        // endpoint to send a meesage to the chat
    });

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
