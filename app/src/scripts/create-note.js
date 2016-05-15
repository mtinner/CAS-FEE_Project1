import $ from 'jquery';


let createNote = (function () {

    return {
        openHome: openHome
    };

    function openHome() {
        $("#home-container").show();
        $("#create-note-container").hide();
    }


})();

(function declarePublicFunction() {
    if (!window.Public) {
        window.Public = {};
    }
    window.Public.openHome = createNote.openHome;
})();

export {createNote};