import $ from 'jquery';


const noteService = (function () {
    var noteAPI = '/notes';

    return {
        //TODO enable if used
        //getNote: getNote,
        getNotes: getNotes,
        addNote: addNote,
        updateNote: updateNote
    };


    //TODO enable if used
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

    function addNote(noteObj) {
        var json = JSON.stringify(noteObj);
        console.log(noteObj, json);
        return new Promise(function (resolve, reject) {
            $.ajax({
                    method: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    url: noteAPI,
                    data: JSON.stringify(noteObj)
                })
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