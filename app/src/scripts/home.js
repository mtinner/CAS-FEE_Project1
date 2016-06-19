import $ from 'jquery';
import Handlebars from 'handlebars';
import {noteService} from './noteService';

export const home = (function (Handlebars) {

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
            openDetails();
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
        $('[id^="home__entry"]:checkbox').change(function (event) {
            noteService.updateNote(parseInt(event.target.name), {
                done: $(this).context.checked
            });
        });
    }

    function registerEditEvents() {
        $('[id^="home-edit"]').on('click', function (event) {
            console.log(event.target.value);
        });
    }

    function openDetails() {
        $('#home-container').hide();
        $('#details-container').show();
    }

    function toggleStyle() {
        $('#style-root').toggleClass('theme-dark');
    }

})(Handlebars);