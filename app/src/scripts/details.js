import $ from 'jquery';
import Handlebars from 'handlebars';
import {noteService} from './noteService';
import {main} from './main';


export const details = (function () {
    var existingNote = undefined;

    return {
        init: init,
        renderView: renderView
    };

    function init() {
        registerButtonEvents();
        renderView();
    }

    function renderView(data) {
        existingNote = data;
        var note = data || {
                dueDate: new Date(),
                priority: 1
            };
        var source = $('#details-template').html();
        var template = Handlebars.compile(source);
        $('#details-content').html(template({note: note}));
    }

    function registerButtonEvents() {
        $('#details-cancel').on('click', function (event) {
            event.preventDefault();
            main.openHome();
        });

        $('#details-save').on('click', function (event) {
            event.preventDefault();
            var form = $('#details-form').serializeArray(),
                promise,
                newNote = {
                    title: form.find(obj => obj.name === 'title').value,
                    text: form.find(obj => obj.name === 'text').value,
                    dueDate: isNaN(Date.parse(form.find(obj => obj.name === 'dueDate').value)) ? new Date() : new Date(form[2].value),
                    priority: parseInt(form.find(obj => obj.name === 'priority').value),
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
                main.updateHomeView();
                main.openHome();
                alert(`Note with Title '${note.title}' created or updated`);
            }

            function error() {
                alert('Could not create Note')
            }
        });
    }

})();