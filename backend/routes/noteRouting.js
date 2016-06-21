'use strict';

var express = require('express');
var router = express.Router();

var NoteStore = require('./../services/NoteStore');

router.get('/', function (req, res) {
    NoteStore.getNotes(function (error, notes) {
        res.status(200).send(notes)
    });
});

router.post('/', function (req, res) {
    NoteStore.addNote(req.body, function (err, note) {
        res.status(201).send(note);
    });
});

router.put('/:id', function (req, res) {
    NoteStore.updateNote(req.params.id, req.body, function (err, note) {
        res.status(200).send(note);
    });
});

router.get('/:id', function (req, res) {
    NoteStore.getNote(req.params.id, function (err, note) {
        res.status(200).send(note);
    });
});

router.post('/dummynotes/:number', function (req, res) {
    NoteStore.setNumberOfDummyNotes(req.params.number);
    res.status(200).send();
});

module.exports = router;