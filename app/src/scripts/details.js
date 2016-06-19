import $ from 'jquery';
import Handlebars from 'handlebars';
import {noteService} from './noteService';
import {home} from './home';


export const details = (function () {

    return {
        init: init,
        renderView: renderView
    };

    function init() {
        renderView();
    }

    function renderView(data) {
        var note = data || {
                createdAt: new Date(),
                priority: '1'
            };
        var source = $('#details-template').html();
        var template = Handlebars.compile(source);
        $('#details-content').html(template({note: note}));
        registerButtonEvents();
    }

    function registerButtonEvents() {
        $('#details-cancel').on('click', function (event) {
            event.preventDefault();
            openHome();
        });

        $('#details-save').on('click', function (event) {
            event.preventDefault();
            var form = $('#details-form').serializeArray();
            noteService.addNote({
                    title: form.find(obj => obj.name === 'title').value,
                    text: form.find(obj => obj.name === 'text').value,
                    createdAt: isNaN(Date.parse(form.find(obj => obj.name === 'createdAt').value)) ? new Date() : new Date(form[2].value),
                    priority: form.find(obj => obj.name === 'priority').value,
                    done: !!form.find(obj => obj.name === 'done')
                })
                .then(success, error);

            function success(note) {
                $('#details-form')[0].reset();
                home.updateView();
                openHome();
                alert(`Note with Title '${note.title}' created`);
            }

            function error() {
                alert('Could not create Note')
            }
        });
    }

    function openHome() {
        $('#details-container').hide();
        $('#home-container').show();
    }
})();