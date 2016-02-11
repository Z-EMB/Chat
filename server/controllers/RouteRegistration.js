module.exports = function(app, express) {
    // serve frontend from /public -- / automatically hits index.html
    app.use(express.static('public'));
    var counter=0;
    // chat API routes go here, this one is just an example
    app.post('/message', function(req, res) {
        console.log(JSON.stringify(req.body)+ '\n\tmessage number '+counter++);
        console.log();
        res.send(req.body);
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
