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
    if (!window.Home) {
        window.Home = {};
    }
    window.Home.openCreateNote = home.openCreateNote;
})();

export {home};