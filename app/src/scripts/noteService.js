import $ from 'jquery';


let noteService = (function () {
    var noteAPI = '/notes';

    return {
        getNote: getNote,
        getNotes: getNotes
        //addNote: addNote,
        //updateNote: updateNote
    };

    function getNote(id) {
        id = parseInt(id);
        var apiLink = `${noteAPI}/${id}`;
        return new Promise(function (resolve, reject) {
            $.getJSON(apiLink, {})
                .done(function (data) {
                    resolve(data);
                })
                .fail(function () {
                    reject('Failed to get Note');
                });
        });
    }

    function getNotes() {
        return new Promise(function (resolve, reject) {
            $.getJSON(noteAPI, {})
                .done(function (data) {
                    resolve(data);
                })
                .fail(function () {
                    reject('Failed to get Note');
                });
        });
    }
})();


export {noteService};