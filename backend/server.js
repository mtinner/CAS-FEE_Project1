'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var noteRouting = require('./routes/noteRouting');


app.get('/app', function (req, res) {
    res.sendfile('./dist/app/index.html');
});

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use('/notes', noteRouting);

app.use('/dist', express.static('./dist'));


app.listen(9000);
console.log('App listening on port 9000');