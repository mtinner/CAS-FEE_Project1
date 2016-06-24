import $ from 'jquery';
import Handlebars from 'handlebars';
import {noteService} from './noteService';
import {main} from './main';

export const home = (function home() {

    let sortAsc = false;
    let sortAttribute = '';

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
        $('#home-content').html(template({
            notes: data,
            sort: {
                asc: sortAsc,
                attribute: sortAttribute
            }
        }));
        registerRadioEvents();
        registerCheckboxEvents();
        registerEditEvents();
        registerTableEvents();
    }

    function registerTableEvents() {
        $('#home-header-date').on('click', function () {
            const attribute = 'createdAt';
            updateView(createSorter(attribute));
            sortAttribute = attribute;
            sortAsc = !sortAsc;
        });

        $('#home-header-title').on('click', function () {
            const attribute = 'title';
            updateView(createSorter(attribute));
            sortAttribute = attribute;
            sortAsc = !sortAsc;
        });

        $('#home-header-content').on('click', function () {
            const attribute = 'text';
            updateView(createSorter(attribute));
            sortAttribute = attribute;
            sortAsc = !sortAsc;
        });

        $('#home-header-prio').on('click', function () {
            const attribute = 'priority';
            updateView(createSorter(attribute));
            sortAttribute = attribute;
            sortAsc = !sortAsc;
        });

        $('#home-header-done').on('click', function () {
            const attribute = 'done';
            sortAttribute = attribute;
            sortAsc = !sortAsc;
            updateView(createSorter(attribute));
        });
    }

    function createSorter(attribute) {
        return (a, b) => sortAsc
            ? a[attribute] > b[attribute]
            : a[attribute] < b[attribute]
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

        Handlebars.registerHelper('ifSort', function (s1, s2, options) {
            if (s1 === s2) {
                return options.fn(this);
            }
            return options.inverse(this);
        });
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
                priority: parseInt(event.target.value)
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