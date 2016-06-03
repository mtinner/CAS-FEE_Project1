import $ from 'jquery';


let createNote = (function () {

    return {
        registerEvents: registerEvents
    };

    function registerEvents() {
        $('#edit__cancel').on('click', function () {
            openHome();
        });
    }

    function openHome() {
        $('#home-container').show();
        $('#create-note-container').hide();
    }


})();

export {createNote};