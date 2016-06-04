import $ from 'jquery';

let home = (function () {
    return {
        registerEvents: registerEvents
    };

    function registerEvents() {
        $('#open-create-note').on('click', function () {
            openCreateNote();
        });
    }

    function openCreateNote() {
        $('#home-container').hide();
        $('#create-note-container').show();
    }
})();


export {home};