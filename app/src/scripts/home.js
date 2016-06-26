import $ from 'jquery';
import Handlebars from 'handlebars';
import {noteService} from './noteService';
import {main} from './main';

export const home = (function home() {
    let localData = [];
    let sortAsc = false;
    let sortAttribute = '';
    let showFinished = false;

    const sorter = (a, b) => sortAsc
        ? a[sortAttribute] > b[sortAttribute]
        : a[sortAttribute] < b[sortAttribute];

    return {
        init: init,
        updateView: updateView
    };

    function init() {
        registerButtonEvents();
        updateView();
    }

    function updateView() {
        noteService.getNotes().then(
            data => {
                localData = data;
                renderView()
            },
            error => alert(error)
        );
    }

    function renderView(data = localData) {
        registerHandlebarsHelper();
        var source = $('#home-template').html();
        var template = Handlebars.compile(source);
        const sortedData = data.sort(sorter);
        const filteredData = showFinished
            ? sortedData
            : sortedData.filter(d => d.done === false);
        $('#home-content').html(template({
            notes: filteredData,
            sort: {
                asc: sortAsc,
                attribute: sortAttribute
            },
            showFinished: showFinished
        }));
        registerRadioEvents();
        registerCheckboxEvents();
        registerEditEvents();
        registerTableEvents();
    }

    function onSortClick(attribute) {
        sortAttribute = attribute;
        sortAsc = !sortAsc;
        renderView();
    }

    function registerTableEvents() {
        $('#home-header-date').on('click', function () {
            onSortClick('dueDate');
        });

        $('#home-header-title').on('click', function () {
            onSortClick('title');
        });

        $('#home-header-content').on('click', function () {
            onSortClick('text');
        });

        $('#home-header-prio').on('click', function () {
            onSortClick('priority');
        });

        $('#home-header-done').on('click', function () {
            onSortClick('done');
        });
    }

    function registerHandlebarsHelper() {
        Handlebars.registerHelper('date', function (date) {
            return new Date(date).toLocaleDateString();
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
        $('#home-show-finished').change(() => {
            showFinished = !showFinished;
            renderView();
        });
    }

    function registerRadioEvents() {
        $('[id^="home-prio"]:radio').change(function (event) {
            noteService.updateNote(parseInt(event.target.name), {
                priority: parseInt(event.target.value)
            }).then(updateView());
        });
    }

    function registerCheckboxEvents() {
        $('[id^="home-entry"]:checkbox').change(function (event) {
            noteService.updateNote(parseInt(event.target.name), {
                done: $(this).context.checked
            }).then(updateView());
        });
    }

    function registerEditEvents() {
        $('[id^="home-edit"]').on('click', function () {
            noteService.getNote(parseInt($(this).attr('value'))).then(
                data => {
                    main.renderDetailsView(data);
                    main.openDetails();
                },
                error => alert(error)
            );
        });
    }

    function toggleStyle() {
        $('#style-root').toggleClass('theme-dark');
    }

})();