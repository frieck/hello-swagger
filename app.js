'use strict';

var bodyParser = require('body-parser');
var authRoutes = require('./api/routes/_authentication.router.js');
var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
let SECRET = 'X7FMpgNqJTfbhSMs8I2RC3HMNHYOFStsfsIi5rW9jaoejd2idFgt19IxjGL44FEs'
module.exports = app; // for testing

var config = {
    appRoot: __dirname // required config
};

// Define a middleware function to be used for all secured routes
let auth = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token !== SECRET) {
        res.sendStatus(401);
    } else {
        next();
    }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/s', auth);

SwaggerExpress.create(config, function(err, swaggerExpress) {
    if (err) { throw err; }

    // install middleware
    swaggerExpress.register(app);

    var port = process.env.PORT || 10010;
    app.listen(port);
});