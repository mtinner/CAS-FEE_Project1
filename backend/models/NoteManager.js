'use strict';

var Note = require('./Note');

var noteManager = (function () {
    var numberOfDummyNotes = 0,
        notes = [],
        dummyNotes = [],
        id = 0;

    return {
        setNumberOfDummyNotes: setNumberOfDummyNotes,
        getNote: getNote,
        getNotes: getNotes,
        addNote: addNote,
        updateNote: updateNote
    };

    function setNumberOfDummyNotes(number) {
        numberOfDummyNotes = parseInt(number);
    }

    function getNote(id) {
        id = parseInt(id);
        return notes.concat(dummyNotes).find(function (note) {
            return note.id === id;
        })
    }

    function getNotes() {
        if (dummyNotes.length > numberOfDummyNotes) {
            dummyNotes.splice(numberOfDummyNotes, dummyNotes.length - 1)
        }
        for (var i = dummyNotes.length; i < numberOfDummyNotes; i++) {
            dummyNotes.push(
                new Note(
                    id++,
                    'title' + i,
                    i + ' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                    '2',
                    i % 2 == 0
                ));
        }
        return notes.concat(dummyNotes);
    }
    
    function addNote(note) {
        return new Note(
            id++,
            note.title,
            note.text,
            note.priority,
            note.done
        );
    }

    function updateNote(id, newNote) {
        var oldNote = getNote(id);
        if (newNote) {
            if (newNote.title) {
                oldNote.title = newNote.title;
            }
            if (newNote.text) {
                oldNote.text = newNote.text;
            }
            if (newNote.priority) {
                oldNote.priority = newNote.priority;
            }
            if (newNote.done !== undefined) {
                oldNote.done = newNote.done;
            }
        }
        return oldNote;
    }

})();

module.exports = noteManager;