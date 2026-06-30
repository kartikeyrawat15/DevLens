// NodeGoat-style Express bootstrap (faithful to OWASP/NodeGoat architecture).
// Session middleware lives HERE; the POST/PUT/DELETE routes live in app/routes/.
// CSRF setup is present only as commented-out code — i.e. NOT active protection.
"use strict";

var express = require("express");
var favicon = require("serve-favicon");
var bodyParser = require("body-parser");
var session = require("express-session");
var http = require("http");

var app = express();
var routes = require("./app/routes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: "session_cookie_secret",
    saveUninitialized: true,
    resave: true
}));

// Fix for A8 - CSRF
// Enable Express csurf module
// Important: this needs to stay after the session and bodyParser middlewares
// app.use(csrf());
// app.use(function(req, res, next) {
//     res.locals.csrftoken = req.csrfToken();
//     next();
// });

// Register all application routes (defines the app.post / app.put handlers)
routes(app, {});

http.createServer(app).listen(4000);
