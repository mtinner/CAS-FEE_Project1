import $ from 'jquery';


let noteService = (function () {
    var noteAPI = '/notes';

    return {
        //getNote: getNote,
        getNotes: getNotes,
        //addNote: addNote,
        updateNote: updateNote
    };

    /* function getNote(id) {
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
     }*/

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

    function updateNote(id, noteObj) {
        id = parseInt(id);
        var apiLink = `${noteAPI}/${id}`;
        return new Promise(function (resolve, reject) {
            $.ajax({
                    method: 'PUT', // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
                    contentType: 'application/json; charset=utf-8',
                    url: apiLink, // A valid URL
                    //headers: {'X-HTTP-Method-Override': 'PUT'}, // X-HTTP-Method-Override set to PUT.
                    data: JSON.stringify(noteObj) // Some data e.g. Valid JSON as a string
                })
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