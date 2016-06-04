import $ from 'jquery';


export const home = (function () {

    return {
        registerEvents: registerEvents
    };

    function registerEvents() {
        $('#open-details').on('click', function () {
            openDetails();
        });
    }

    function openDetails() {
        $('#home-container').hide();
        $('#details-container').show();
    }
})();