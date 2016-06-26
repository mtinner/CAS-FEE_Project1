'use strict';

var Note = require('./../models/Note');

var noteStore = (function () {
    var notes = [],
        dummyNotes = [],
        id = 0;

    return {
        getNote: getNote,
        getNotes: getNotes,
        addNote: addNote,
        updateNote: updateNote
    };

    function getNote(id) {
        id = parseInt(id);
        return notes.concat(dummyNotes).find(function (note) {
            return note.id === id;
        })
    }

    function getNotes() {
        return notes.concat(dummyNotes);
    }

    function addNote(note) {
        var note = new Note(
            id++,
            new Date(note.dueDate),
            note.title,
            note.text,
            note.priority,
            note.done
        );
        notes.push(note);
        return note;
    }

    function updateNote(id, newNote) {
        var oldNote = getNote(id);
        if (!newNote || !oldNote) {
            throw new Exception('new and old note expected');
        }
        return Object.assign(oldNote, newNote);
    }

})();

module.exports = noteStore;