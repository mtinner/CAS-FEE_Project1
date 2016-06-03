import $ from 'jquery';


export const details = (function () {

    return {
        registerEvents: registerEvents
    };

    function registerEvents() {
        $('#details__cancel').on('click', function () {
            openHome();
        });
    }

    function openHome() {
        $('#details-container').hide();
        $('#home-container').show();
    }
})();