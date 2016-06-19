import $ from 'jquery';
import Handlebars from 'handlebars';
import {noteService} from './noteService';
import {main} from './main';

export const home = (function () {

    return {
        init: init,
        updateView: updateView
    };

    function init() {
        registerButtonEvents();
        updateView();
    }

    function updateView() {
        noteService.getNotes()
            .then(success, error);

        function success(data) {
            renderView(data);
        }

        function error(data) {
            alert(data);
        }
    }

    function renderView(data) {
        var source = $('#home-template').html();
        var template = Handlebars.compile(source);
        $('#home-content').html(template({notes: data}));
        registerRadioEvents();
        registerCheckboxEvents();
        registerEditEvents();
    }

    function registerButtonEvents() {
        $('#open-details').on('click', function () {
            main.openDetails();
        });

        $('#style-switcher').on('click', function () {
            toggleStyle();
        });
    }


    function registerRadioEvents() {
        $('[id^="home-prio"]:radio').change(function (event) {
            noteService.updateNote(parseInt(event.target.name), {
                priority: event.target.value
            });
        });
    }

    function registerCheckboxEvents() {
        $('[id^="home-entry"]:checkbox').change(function (event) {
            noteService.updateNote(parseInt(event.target.name), {
                done: $(this).context.checked
            });
        });
    }

    function registerEditEvents() {
        $('[id^="home-edit"]').on('click', function () {
            noteService.getNote(parseInt($(this).attr('value')))
                .then(success, error);

            function success(data) {
                main.renderDetailsView(data);
                main.openDetails();
            }

            function error(data) {
                alert(data)
            }
        });
    }

    function toggleStyle() {
        $('#style-root').toggleClass('theme-dark');
    }

})();