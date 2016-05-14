import {getHelloWorld} from './intlService.js';
import $ from 'jquery';

console.log(`calling intl service: ${getHelloWorld()}`);


//after Page is loaded
$(function () {
    $('#home-container').load('/dist/app/views/home.html');
    $("#create-note-container").hide();
    $("#create-note-container").load('/dist/app/views/create-note.html');
});

