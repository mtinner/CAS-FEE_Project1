import $ from 'jquery';


export const home = (function () {

    return {
        registerEvents: registerEvents
    };

    function registerEvents() {
        $('#open-details').on('click', function () {
            openDetails();
        });
        $('#style-switcher').on('click', function () {
            toggleStyle();
        });
    }

    function openDetails() {
        $('#home-container').hide();
        $('#details-container').show();
    }

    function toggleStyle() {
        $('#style-root').toggleClass('theme-dark');
    }

})();