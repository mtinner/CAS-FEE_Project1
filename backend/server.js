var express = require('express');
var app = express();
var noteRouting = require('./noteRouting');


app.use('/dist', express.static('./dist'));

app.get('/app', function (req, res) {
    res.sendfile('./dist/app/index.html');
});

app.use('/notes', noteRouting);


app.listen(9000);
console.log("App listening on port 9000");