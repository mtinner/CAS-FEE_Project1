var express = require('express');
var app = express();                               // create our app w/ express

app.listen(9000);
console.log("App listening on port 9000");

app.use(express.static('dist'));

app.use('/dist', express.static('dist'));

app.get('/app', function (req, res) {
    res.sendfile('dist/app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});