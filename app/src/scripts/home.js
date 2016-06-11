import $ from 'jquery';
import Handlebars from 'handlebars';
import {noteService} from './noteService';

export const home = (function (Handlebars) {

    return {
        init: init
    };

    function init() {
        registerEvents();

        noteService.getNotes()
            .then(success, error);

        function success(data) {
            var source = $('#home-template').html();
            var template = Handlebars.compile(source);
            registerHandlebarsHelper();
            $('#home-main').append(template({notes: data}));
        }

        function error(data) {
            alert(data);
        }
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

    function registerEvents() {
        $('#open-details').on('click', function () {
            openDetails();
        });
    }

    function openDetails() {
        $('#home-container').hide();
        $('#details-container').show();
    }


})(Handlebars);