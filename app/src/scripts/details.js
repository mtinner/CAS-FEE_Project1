import $ from 'jquery';
import {noteService} from './noteService';


export const details = (function () {

    return {
        init: init
    };

    function init() {
        registerButtonEvents();
    }


    function registerButtonEvents() {
        $('#details-cancel').on('click', function () {
            openHome();
        });

        $('#details-save').on('click', function (event) {
            event.preventDefault();
            var form = $('#detail-form').serializeArray();
            noteService.addNote({
                    title: form[0].value,
                    text: form[1].value,
                    createdAt: new Date(form[2].value),
                    priority: form[3].value,
                    done: form.length === 5
                })
                .then(success, error);

            function success(note) {
                $('#detail-form')[0].reset();
                alert(`Note with Title "${note.title}" created`);
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