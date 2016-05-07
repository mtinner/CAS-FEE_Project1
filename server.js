var express  = require('express');
var app      = express();                               // create our app w/ express

app.listen(8080);
console.log("App listening on port 8080");

app.use(express.static('resources'));
app.use(express.static('app'));

app.use('/app',express.static('app'));
app.use('/resources',express.static('resources'));

app.get('/app', function(req, res) {
    res.sendfile('app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});