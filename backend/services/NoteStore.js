'use strict';
var Datastore = require('nedb');
var db = new Datastore({filename: './data/notes.db', autoload: true});

var Note = require('./../models/Note');

var noteStore = (function () {
    var notes = [],
        dummyNotes = [],
        id = 0;

    return {
        setNumberOfDummyNotes: setNumberOfDummyNotes,
        getNote: getNote,
        getNotes: getNotes,
        addNote: addNote,
        updateNote: updateNote
    };

    function setNumberOfDummyNotes(numberOfDummyNotes) {
        numberOfDummyNotes = parseInt(numberOfDummyNotes);
        if (dummyNotes.length > numberOfDummyNotes) {
            dummyNotes.splice(numberOfDummyNotes, dummyNotes.length - numberOfDummyNotes);
        }
        for (var i = dummyNotes.length; i < numberOfDummyNotes; i++) {
            dummyNotes.push(
                new Note(
                    id++,
                    new Date(),
                    'title' + i,
                    i + ' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                    Math.floor(Math.random() * (3 - 1 + 1)) + 1,
                    !(Math.floor(Math.random() * (1 - 0 + 1)) + 0)
                ));
        }
    }

    function getNote(id, callback) {
        id = parseInt(id);
        db.findOne({id: id}, function (err, doc) {
            callback(err, doc);
        });
    }

    function getNotes(callback) {
        db.find({}, function (err, docs) {
            callback(err, docs);
        });
    }

    function addNote(note, callback) {
        var note = new Note(
            id++,
            new Date(note.dueDate),
            note.title,
            note.text,
            note.priority,
            note.done
        );
        db.insert(note, function (err, newDoc) {
            if (callback) {
                callback(err, newDoc);
            }
        });
    }

    function updateNote(id, newNote, callback) {
        getNote(id, function (err, oldNote) {
            if (!newNote || !oldNote) {
                throw 'new and old note expected';
            }
            var updateNote = Object.assign(oldNote, newNote);
            db.update({_id: 'gaBLZvxATOYs226Y'}, {
                $set: {
                    dueDate: updateNote.dueDate,
                    title: updateNote.title,
                    text: updateNote.text,
                    priority: updateNote.priority,
                    done: updateNote.done
                }
            }, {}, function (err, doc) {
                if (callback) {
                    callback(err, updateNote);
                }
            });
        });
    }

})();

module.exports = noteStore;