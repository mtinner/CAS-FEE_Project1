import $ from 'jquery';
import {home} from './home';
import {details} from './details';


//after Page is loaded
$(function () {
    var homeContainer = $('#home-container');
    var detailsContainer = $('#details-container');

    detailsContainer.hide();

    homeContainer.load('/dist/app/views/home.html', function () {
        home.init();
    });
    detailsContainer.load('/dist/app/views/details.html', function () {
        details.init();
    });
});

