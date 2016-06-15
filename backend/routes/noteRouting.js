'use strict';

var express = require('express');
var router = express.Router();

var NoteStore = require('./../services/NoteStore');

router.get('/', function (req, res) {
    res.status(200).send(NoteStore.getNotes());
});

router.post('/', function (req, res) {
    res.status(201).send(NoteStore.addNote(req.body));
});

router.put('/:id', function (req, res) {
    res.status(200).send(NoteStore.updateNote(req.params.id, req.body));
});

router.get('/:id', function (req, res) {
    res.status(200).send(NoteStore.getNote(req.params.id));
});

router.post('/dummynotes/:number', function (req, res) {
    NoteStore.setNumberOfDummyNotes(req.params.number);
    res.status(200).send();
});

module.exports = router;