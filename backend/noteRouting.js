var express = require('express');
var router = express.Router();

var Note = require('./models/Note');


router.get('/', function (req, res) {
    res.status(200).send('get Notes');
});

router.post('/', function (req, res) {
    res.status(201).send('create Notes');
});

router.put('/:id', function (req, res) {
    res.status(200).send('update Note ' + req.params.id);
});

router.get('/:id', function (req, res) {
    res.status(200).send('get Note ' + req.params.id);
});


module.exports = router;