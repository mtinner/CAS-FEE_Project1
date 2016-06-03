var express = require('express');
var router = express.Router();
'use strict';

var NoteManager = require('./models/NoteRepository');

router.get('/', function (req, res) {
    res.status(200).send(NoteManager.getNotes());
});

router.post('/', function (req, res) {
    res.status(201).send(NoteManager.addNote(req.body));
});

router.put('/:id', function (req, res) {
    res.status(200).send(NoteManager.updateNote(req.params.id, req.body));
});

router.get('/:id', function (req, res) {
    res.status(200).send(NoteManager.getNote(req.params.id));
});

router.post('/dummynotes/:number', function (req, res) {
    NoteManager.setNumberOfDummyNotes(req.params.number);
    res.status(200).send();
});

module.exports = router;