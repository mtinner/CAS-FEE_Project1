import $ from 'jquery';


let home = (function () {

    return {
        openCreateNote: openCreateNote
    };

    function openCreateNote() {
        $("#home-container").hide();
        $("#create-note-container").show();
    }
})();

(function declarePublicFunction() {
    if (!window.Public) {
        window.Public = {};
    }
    window.Public.openCreateNote = home.openCreateNote;
})();

export {home};