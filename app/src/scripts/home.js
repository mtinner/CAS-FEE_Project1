import $ from 'jquery';
import Handlebars from 'handlebars';
import {noteService} from './noteService';

export const home = (function (Handlebars) {

    let sortAsc = true;

    return {
        init: init,
        updateView: updateView
    };

    function init() {
        registerButtonEvents();
        updateView();
    }

    function updateView(sorter = data => data) {
        noteService.getNotes().then(success, error);

        function success(data) {
            renderView(data.sort(sorter));
        }

        function error(data) {
            alert(data);
        }
    }

    function renderView(data) {
        var source = $('#home-template').html();
        var template = Handlebars.compile(source);
        registerHandlebarsHelper();
        $('#home-content').html(template({notes: data}));
        registerRadioEvents();
        registerCheckboxEvents();
        registerTableEvents();
    }

    function registerTableEvents() {
        $('#home-header-title').on('click', function () {
            updateView(createSorter('title'));
            sortAsc = !sortAsc;
        });
    }

    function createSorter(attribute) {
        return (a, b) => sortAsc ? a[attribute] < b[attribute] : a[attribute] > b[attribute]
    }

    function registerHandlebarsHelper() {
        Handlebars.registerHelper('date', function (createdAt) {
            return new Date(createdAt).toLocaleDateString();
        });

        Handlebars.registerHelper('ifCond', function (v1, v2, options) {
            if (v1.toString() === v2.toString()) {
                return options.fn(this);
            }
            return options.inverse(this);
        });
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
            console.log($(this).context.checked);
            noteService.updateNote(parseInt(event.target.name), {
                done: $(this).context.checked
            });
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