import $ from 'jquery';
import {home} from './home';
import {details} from './details';


//after Page is loaded
$(function () {
    //$('#home-container').hide();
    $('#details-container').hide();
    
    $('#home-container').load('/dist/app/views/home.html', function () {
        home.registerEvents();
    });
    $('#details-container').load('/dist/app/views/details.html', function () {
        details.registerEvents(); 
    });
});

