'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var noteRouting = require('./noteRouting');


app.use('/dist', express.static('./dist'));

app.get('/app', function (req, res) {
    res.sendfile('./dist/app/index.html'); //TODO change to __dirname
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/notes', noteRouting);


app.listen(9000);
console.log("App listening on port 9000");