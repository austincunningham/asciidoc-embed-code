"use strict";
exports.__esModule = true;
// tag::allfile[]
var logger_1 = require("@raincatcher/logger");
var bodyParser = require("body-parser");
var cors = require("cors");
var express = require("express");
var path = require("path");
var index_1 = require("../src/index");
// Implementation for fetching and mapping user data
var UserRepository_1 = require("./UserRepository");
// Configuration for express session options
var sessionOpts = {
    secret: process.env.SESSION_SECRET || 'raincatcher',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        path: '/'
    }
};
// Initialize user data repository and user service
var userRepo = new UserRepository_1["default"]();
var userService = new UserRepository_1.SampleUserService();
var authService = new index_1.PassportAuth(userRepo, userService);
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
authService.init(app, sessionOpts);
app.get('/testAdminEndpoint', authService.protect('admin'), function (req, res) {
    res.json({ routeName: '/testAdminEndpoint', msg: 'authorized to access admin endpoint' });
});
app.get('/testUserEndpoint', authService.protect('user'), function (req, res) {
    res.json({ routeName: '/testUserEndpoint', msg: 'authorized to access user route' });
});
app.get('/', function (req, res) {
    var payload = { msg: 'default route', user: req.user, session: req.session };
    res.json(payload);
});
app.get('/testEndpoint', authService.protect(), function (req, res) {
    res.json({ routeName: '/testEndpoint', msg: 'user is authenticated, no role required for this resource' });
});
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});
app.post('/login', authService.authenticate('/'));
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
app.use(function (err, req, res, next) {
    logger_1.logger.error(err, { tag: 'cloud:passportauth:example' });
    res.status(500).send(err);
});
app.listen(3000, function () {
    logger_1.logger.info('Example auth app listening on port 3000', { tag: 'cloud:passportauth:example' });
});
// end::allfile[]
