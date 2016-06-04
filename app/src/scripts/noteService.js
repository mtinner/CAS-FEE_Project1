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
        $.getJSON(apiLink, {})
            .done(function (data) {
                console.log(data);
            })
            .fail(function () {
                alert('Failed to get Note');
            });
    }

    function getNotes() {
        $.getJSON(noteAPI, {})
            .done(function (data) {
                console.log(data);
            })
            .fail(function () {
                alert('Failed to get Note');
            });
    }
})();


export {noteService};