import $ from 'jquery';
import {home} from './home';
import {createNote} from './create-note';


//after Page is loaded
$(function () {
    $('#home-container').hide();
    //$('#create-note-container').hide();
    
    $('#home-container').load('/dist/app/views/home.html', function () {
        home.registerEvents();
    });
    $('#create-note-container').load('/dist/app/views/create-note.html', function () {
        createNote.registerEvents();
    });
});

