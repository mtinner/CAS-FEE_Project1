import $ from 'jquery';
import Handlebars from 'handlebars';
import {noteService} from './noteService';
import {home} from './home';


export const details = (function () {
    var existingNote = undefined;

    return {
        init: init,
        renderView: renderView
    };

    function init() {
        var note = {
            id: 1,
            createdAt: '2016-06-19T13:33:32.451Z',
            title: 'title1',
            text: '1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            priority: '2',
            done: true
        };
        registerButtonEvents();
        renderView(note);
    }

    function renderView(data) {
        existingNote = data;
        var note = data || {
                createdAt: new Date(),
                priority: '1'
            };
        var source = $('#details-template').html();
        var template = Handlebars.compile(source);
        $('#details-content').html(template({note: note}));
    }

    function registerButtonEvents() {
        $('#details-cancel').on('click', function (event) {
            event.preventDefault();
            openHome();
        });

        $('#details-save').on('click', function (event) {
            event.preventDefault();
            var form = $('#details-form').serializeArray(),
                promise,
                newNote = {
                    title: form.find(obj => obj.name === 'title').value,
                    text: form.find(obj => obj.name === 'text').value,
                    createdAt: isNaN(Date.parse(form.find(obj => obj.name === 'createdAt').value)) ? new Date() : new Date(form[2].value),
                    priority: form.find(obj => obj.name === 'priority').value,
                    done: !!form.find(obj => obj.name === 'done')
                };
            if (existingNote) {
                promise = noteService.updateNote(existingNote.id, newNote)
            }
            else {
                promise = noteService.addNote(newNote)
            }
            promise.then(success, error);

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