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
            
            Handlebars.registerHelper('date', function (createdAt) {
                return new Date(createdAt).toLocaleDateString();
            });
            
            $('#home-main').append(template({notes: data}));
        }

        function error(data) {
            alert(data);
        }
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